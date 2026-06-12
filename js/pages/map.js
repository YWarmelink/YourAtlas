/**
 * map.js — Interactive world map (Leaflet + Natural Earth 110m)
 *
 * Click any country to change its status (visited / planned / wishlist).
 * Changes save to localStorage and sync to Google Sheets via Apps Script.
 */

/* ── CONFIG ──────────────────────────────────────────────────────────────── */
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';

/* ISO 3166-1 numeric → alpha-2 lookup (world-atlas topojson IDs) */
const ISO_NUM = {
  4:'AF',8:'AL',12:'DZ',20:'AD',24:'AO',28:'AG',31:'AZ',32:'AR',36:'AU',40:'AT',
  44:'BS',48:'BH',50:'BD',51:'AM',52:'BB',56:'BE',64:'BT',68:'BO',70:'BA',72:'BW',
  76:'BR',84:'BZ',90:'SB',96:'BN',100:'BG',104:'MM',108:'BI',112:'BY',116:'KH',
  120:'CM',124:'CA',140:'CF',144:'LK',148:'TD',152:'CL',156:'CN',158:'TW',170:'CO',
  174:'KM',178:'CG',180:'CD',188:'CR',191:'HR',192:'CU',196:'CY',203:'CZ',204:'BJ',
  208:'DK',212:'DM',214:'DO',218:'EC',222:'SV',226:'GQ',231:'ET',232:'ER',233:'EE',
  238:'FK',242:'FJ',246:'FI',250:'FR',260:'TF',262:'DJ',266:'GA',268:'GE',270:'GM',
  275:'PS',276:'DE',288:'GH',300:'GR',304:'GL',320:'GT',324:'GN',328:'GY',332:'HT',
  334:'HM',340:'HN',344:'HK',348:'HU',352:'IS',356:'IN',360:'ID',364:'IR',368:'IQ',
  372:'IE',376:'IL',380:'IT',384:'CI',388:'JM',392:'JP',398:'KZ',400:'JO',404:'KE',
  408:'KP',410:'KR',414:'KW',417:'KG',418:'LA',422:'LB',426:'LS',428:'LV',430:'LR',
  434:'LY',440:'LT',442:'LU',446:'MO',450:'MG',454:'MW',458:'MY',462:'MV',466:'ML',
  470:'MT',478:'MR',480:'MU',484:'MX',496:'MN',498:'MD',499:'ME',504:'MA',508:'MZ',
  512:'OM',516:'NA',520:'NR',524:'NP',528:'NL',540:'NC',548:'VU',554:'NZ',558:'NI',
  562:'NE',566:'NG',578:'NO',586:'PK',591:'PA',598:'PG',600:'PY',604:'PE',608:'PH',
  616:'PL',620:'PT',624:'GW',626:'TL',630:'PR',634:'QA',642:'RO',643:'RU',646:'RW',
  682:'SA',686:'SN',688:'RS',694:'SL',703:'SK',704:'VN',705:'SI',706:'SO',710:'ZA',
  716:'ZW',724:'ES',728:'SS',729:'SD',732:'EH',740:'SR',748:'SZ',752:'SE',756:'CH',
  760:'SY',762:'TJ',764:'TH',768:'TG',780:'TT',784:'AE',788:'TN',792:'TR',795:'TM',
  800:'UG',804:'UA',807:'MK',818:'EG',826:'GB',834:'TZ',840:'US',854:'BF',858:'UY',
  860:'UZ',862:'VE',887:'YE',894:'ZM',
};

/* ── CountryStateManager ─────────────────────────────────────────────────── */
class CountryStateManager {
  constructor() {
    this._sheet = {};
    this._local = {};
    try { this._local = JSON.parse(localStorage.getItem('atlas_country_overrides') || '{}'); } catch (_) {}
  }

  loadSheet(countries) {
    this._sheet = {};
    // Sheet is the single source of truth — wipe any stale localStorage on every load.
    this._local = {};
    try { localStorage.removeItem('atlas_country_overrides'); } catch (_) {}
    countries.forEach(c => {
      if (c.country_code) this._sheet[c.country_code.toUpperCase()] = c;
    });
  }

  getStatus(code) { return this._local[code]?.status || this._sheet[code]?.status || null; }
  getName(code)   { return this._local[code]?.country_name || this._sheet[code]?.country_name || code; }
  getContinent(code) { return this._sheet[code]?.continent || ''; }

  setStatus(code, status) {
    const existing = this._sheet[code] || {};
    this._local[code] = { ...existing, country_code: code, status };
    try { localStorage.setItem('atlas_country_overrides', JSON.stringify(this._local)); } catch (_) {}
  }

  clearOverride(code) {
    delete this._local[code];
    try { localStorage.setItem('atlas_country_overrides', JSON.stringify(this._local)); } catch (_) {}
  }

  allEntries() {
    const codes = new Set([...Object.keys(this._sheet), ...Object.keys(this._local)]);
    return [...codes].map(code => ({
      country_code: code,
      country_name: this.getName(code),
      continent:    this.getContinent(code),
      status:       this.getStatus(code) || null,
    })).sort((a, b) => a.country_name.localeCompare(b.country_name));
  }
}

/* ── Colours ─────────────────────────────────────────────────────────────── */
const COLORS = { visited:'#10b981', planned:'#0ea5e9', wishlist:'#f59e0b', default:'#1e3a5f' };
const HOVER  = { visited:'#34d399', planned:'#38bdf8', wishlist:'#fbbf24', default:'#2d527a' };

/* ── Module state ────────────────────────────────────────────────────────── */
const stateManager = new CountryStateManager();
let leafletMap = null;
let geoLayer   = null;
let showWishlist = false;

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const resolveStatus = code => {
  const raw = stateManager.getStatus(code);
  return (!showWishlist && raw === 'wishlist') ? 'default' : (raw || 'default');
};

const featureCode = f => ISO_NUM[parseInt(f.id, 10)] || null;

const layerStyle = feature => {
  const code   = featureCode(feature);
  const status = code ? resolveStatus(code) : 'default';
  return { fillColor: COLORS[status], fillOpacity: 1, color: '#0a1628', weight: 0.6 };
};

function tooltipHtml(code, name) {
  const status = code ? stateManager.getStatus(code) : null;
  const label  = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Not visited';
  const icons  = { visited:'✅', wishlist:'⭐', planned:'🗓️' };
  return `<strong>${escapeHTML(name)}</strong><br>` +
         `${status ? (icons[status] || '') + ' ' : ''}${label}<br>` +
         `<span style="font-size:11px;color:#94a3b8">Click to edit</span>`;
}

/* ── Stats ───────────────────────────────────────────────────────────────── */
function updateStats() {
  const all      = stateManager.allEntries();
  const visited  = all.filter(c => c.status === 'visited').length;
  const wishlist = all.filter(c => c.status === 'wishlist').length;
  const planned  = all.filter(c => c.status === 'planned').length;
  document.querySelectorAll('#mapStatsVisited, #mapStatsVisited2').forEach(el => {
    el.textContent = visited;
  });
  const totalEl  = document.getElementById('mapStatsTotal');
  const detailEl = document.getElementById('mapStatsDetail');
  if (totalEl)  totalEl.textContent  = visited + planned + wishlist;
  if (detailEl) detailEl.textContent = [wishlist && `${wishlist} wishlist`, planned && `${planned} planned`].filter(Boolean).join(' · ');
}

/* ── Refresh map colours ─────────────────────────────────────────────────── */
function refreshMapColors() {
  if (!geoLayer) return;
  geoLayer.setStyle(layerStyle);
}

/* ── Google Sheet push ───────────────────────────────────────────────────── */
function pushToSheet(code, status) {
  if (!APPS_SCRIPT_URL) return;
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ country_code: code, status }),
  }).catch(e => console.warn('[map] Sheet push failed:', e));
}

/* ── Status picker ───────────────────────────────────────────────────────── */
function showStatusPicker(code, name, clientX, clientY) {
  document.getElementById('statusPicker')?.remove();
  const current = stateManager.getStatus(code);
  const mapRect = document.getElementById('mapDiv').getBoundingClientRect();

  const picker = document.createElement('div');
  picker.id = 'statusPicker';
  picker.className = 'status-picker';

  const left = Math.min(Math.max(clientX - mapRect.left - 90, 8), mapRect.width  - 196);
  const top  = Math.min(Math.max(clientY - mapRect.top  + 14, 8), mapRect.height - 176);
  picker.style.left = left + 'px';
  picker.style.top  = top  + 'px';

  const options = [
    { key:'visited',  label:'Visited',  color:'#10b981' },
    { key:'planned',  label:'Planned',  color:'#0ea5e9' },
    { key:'wishlist', label:'Wishlist', color:'#f59e0b' },
    { key:'',         label:'Remove',   color:'#64748b' },
  ];

  picker.innerHTML = `
    <div class="sp-header">
      <span class="sp-name">${escapeHTML(name)}</span>
      <button class="sp-close" aria-label="Sluiten">×</button>
    </div>
    <div class="sp-buttons">
      ${options.map(o => `
        <button class="sp-btn${current === (o.key || null) ? ' sp-btn--active' : ''}"
                data-status="${escapeHTML(o.key)}" style="--sp-color:${o.color}">
          <span class="sp-dot" style="background:${o.color}"></span>${o.label}
        </button>`).join('')}
    </div>`;

  document.getElementById('mapDiv').appendChild(picker);
  picker.querySelector('.sp-close').addEventListener('click', () => picker.remove());

  picker.querySelectorAll('.sp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newStatus = btn.dataset.status;
      if (newStatus) {
        stateManager.setStatus(code, newStatus);
        pushToSheet(code, newStatus);
      } else {
        stateManager.clearOverride(code);
      }
      picker.remove();
      refreshMapColors();
      updateStats();
      const listEl       = document.getElementById('countryList');
      const activeFilter = document.querySelector('.country-tab.active')?.dataset.filter || 'all';
      const entries = activeFilter === 'all'
        ? stateManager.allEntries()
        : stateManager.allEntries().filter(c => c.status === activeFilter);
      if (listEl) renderCountryList(entries, listEl);
    });
  });

  const closeOnOutside = e => {
    if (!picker.contains(e.target)) {
      picker.remove();
      document.removeEventListener('pointerdown', closeOnOutside);
    }
  };
  setTimeout(() => document.addEventListener('pointerdown', closeOnOutside), 0);
}

/* ── Leaflet map ─────────────────────────────────────────────────────────── */
async function initMap() {
  const mapDivEl = document.getElementById('mapDiv');
  if (!mapDivEl || typeof L === 'undefined') {
    if (mapDivEl) mapDivEl.innerHTML = errorMsg('Map library not loaded.');
    return;
  }

  // Load world topojson
  let worldData;
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    worldData = await res.json();
  } catch (e) {
    mapDivEl.innerHTML = errorMsg('Could not load map data.');
    return;
  }

  // Convert topojson → GeoJSON
  const geojson = topojson.feature(worldData, worldData.objects.countries);

  // Remove Antarctica only.
  geojson.features = geojson.features.filter(f => parseInt(f.id, 10) !== 10);

  // French Guiana is baked into France's MultiPolygon (feature 250).
  // Split it out as a separate feature with no ID so it renders as "not visited"
  // and is not clickable, independent of France's status.
  const splitFeatures = [];
  geojson.features.forEach(feature => {
    if (parseInt(feature.id, 10) !== 250 || feature.geometry?.type !== 'MultiPolygon') {
      splitFeatures.push(feature);
      return;
    }
    feature.geometry.coordinates.forEach(polygon => {
      const lons   = polygon[0].map(c => c[0]);
      const avgLon = lons.reduce((a, b) => a + b, 0) / lons.length;
      splitFeatures.push({
        type:       'Feature',
        id:         avgLon < -15 ? null : 250, // overseas piece → no ISO mapping → always default colour
        geometry:   { type: 'Polygon', coordinates: polygon },
        properties: feature.properties,
      });
    });
  });
  geojson.features = splitFeatures;

  // Fix antimeridian for Leaflet: make coordinates continuous so Russia doesn't
  // render as a horizontal band across the top of the map.
  geojson.features.forEach(feature => {
    const geom = feature.geometry;
    if (!geom) return;
    const processRing = ring => {
      for (let i = 1; i < ring.length; i++) {
        const d = ring[i][0] - ring[i - 1][0];
        if (d > 180)  ring[i][0] -= 360;
        else if (d < -180) ring[i][0] += 360;
      }
    };
    const geoms = geom.type === 'GeometryCollection' ? geom.geometries : [geom];
    geoms.forEach(g => {
      if (!g?.coordinates) return;
      if (g.type === 'Polygon') g.coordinates.forEach(processRing);
      else if (g.type === 'MultiPolygon') g.coordinates.forEach(p => p.forEach(processRing));
    });
  });

  // Build Leaflet map
  const map = L.map('mapDiv', {
    center: [20, 0],
    zoom: 2,
    minZoom: 1,
    maxZoom: 8,
    zoomSnap: 0.5,
    attributionControl: false,
    maxBounds: [[-85, -200], [85, 200]],
    maxBoundsViscosity: 0.9,
    scrollWheelZoom: true,
  });
  leafletMap = map;

  geoLayer = L.geoJSON(geojson, {
    style: layerStyle,
    onEachFeature(feature, layer) {
      const code = featureCode(feature);
      const name = feature.properties?.name || code || '';
      layer.on('mouseover', function () {
        const s = code ? resolveStatus(code) : 'default';
        this.setStyle({ fillColor: HOVER[s] || HOVER.default });
        this.bringToFront();
      });
      layer.on('mouseout', function () {
        geoLayer.resetStyle(this);
      });
      layer.on('click', function (e) {
        if (!code) return;
        showStatusPicker(code, name, e.originalEvent.clientX, e.originalEvent.clientY);
      });
    },
  }).addTo(map);

  // Clear the loading spinner now
  mapDivEl.querySelector('.loading-spinner')?.remove();
}

/* ── Country list ────────────────────────────────────────────────────────── */
function renderCountryList(entries, container) {
  if (!entries.length) { container.innerHTML = emptyMsg('No countries found.'); return; }
  container.innerHTML = entries.map(c => `
    <div class="country-item" id="country-item-${escapeHTML(c.country_code)}">
      <div class="country-item-dot ${c.status || 'not-visited'}"></div>
      <div class="country-item-name">${escapeHTML(c.country_name)}</div>
      <div class="country-item-continent">${escapeHTML(c.continent || '')}</div>
    </div>`).join('');
}

/* ── Page init ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  const mapDiv = document.getElementById('mapDiv');
  const listEl = document.getElementById('countryList');
  if (!mapDiv) return;

  try {
    const countries = await dataService.getCountriesVisited();
    stateManager.loadSheet(countries);
    updateStats();
    await initMap();
    if (listEl) renderCountryList(stateManager.allEntries(), listEl);

    document.querySelectorAll('.country-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.country-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        const entries = filter === 'all'
          ? stateManager.allEntries()
          : stateManager.allEntries().filter(c => c.status === filter);
        if (listEl) renderCountryList(entries, listEl);
      });
    });

    function syncWishlistUI() {
      const legendItem = document.getElementById('legendWishlist');
      const btn        = document.getElementById('wishlistToggleBtn');
      if (legendItem) legendItem.classList.toggle('legend-item--off', !showWishlist);
      if (btn) {
        btn.classList.toggle('wishlist-toggle--on', showWishlist);
        btn.querySelector('.wishlist-toggle-state').textContent = showWishlist ? 'On' : 'Off';
      }
    }

    syncWishlistUI(); // apply default (off)

    document.getElementById('legendWishlist')?.addEventListener('click', () => {
      showWishlist = !showWishlist;
      syncWishlistUI();
      refreshMapColors();
    });

    document.getElementById('wishlistToggleBtn')?.addEventListener('click', () => {
      showWishlist = !showWishlist;
      syncWishlistUI();
      refreshMapColors();
    });

  } catch (e) {
    console.error('[map]', e);
    mapDiv.innerHTML = errorMsg('Could not load map data.');
  }
});
