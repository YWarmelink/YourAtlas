/**
 * map.js — Interactive world map (Leaflet + Natural Earth 110m)
 *
 * Click any country to change its status (visited / planned / wishlist).
 * Changes save to localStorage and sync to Google Sheets via Apps Script.
 */

/* ── CONFIG ──────────────────────────────────────────────────────────────── */
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';

/* ISO_NUM (numeric → alpha-2 for world-atlas topojson IDs) comes from js/utils/isoCountries.js */

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
  const detailEl = document.getElementById('mapStatsDetail');
  if (detailEl) detailEl.textContent = [wishlist && `${wishlist} wishlist`, planned && `${planned} planned`].filter(Boolean).join(' · ');
}

/* ── Country list: filter tabs + the title's live count ─────────────────────
   The title must always match whichever tab is active, not just the "All" count — otherwise
   clicking "Visited" still shows the all-countries total, which is exactly what looked wrong. */
const FILTER_LABELS = { all: 'All Countries', visited: 'Visited Countries', wishlist: 'Wishlist Countries', planned: 'Planned Countries' };

function filteredEntries(filter) {
  const all = stateManager.allEntries();
  return filter === 'all' ? all : all.filter(c => c.status === filter);
}

function currentFilter() {
  return document.querySelector('.country-tab.active')?.dataset.filter || 'all';
}

function updateListTitle(filter) {
  const titleEl = document.getElementById('countryListTitle');
  if (!titleEl) return;
  titleEl.textContent = `${FILTER_LABELS[filter] || 'Countries'} (${filteredEntries(filter).length})`;
}

function refreshCountryList(filter) {
  updateListTitle(filter);
  const listEl = document.getElementById('countryList');
  if (listEl) renderCountryList(filteredEntries(filter), listEl);
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
      refreshCountryList(currentFilter());
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
/* ── Continents Explored breakdown (moved here from the now-retired countries.html, 2026-08) ── */
const CONTINENT_TOTALS = { Europe: 44, Asia: 48, Africa: 54, Americas: 35, Oceania: 14 };
const CONTINENT_COLORS = {
  Europe:   '#3b82f6',
  Asia:     '#ef4444',
  Africa:   '#f59e0b',
  Americas: '#10b981',
  Oceania:  '#8b5cf6',
};

function simplifyContinent(raw) {
  const c = (raw || '').toLowerCase();
  if (c.includes('europe'))  return 'Europe';
  if (c.includes('asia'))    return 'Asia';
  if (c.includes('africa'))  return 'Africa';
  if (c.includes('ocean') || c.includes('australia')) return 'Oceania';
  if (c.includes('america') || c.includes('caribbean')) return 'Americas';
  return 'Other';
}

function buildBreakdown(visited) {
  const counts = {};
  visited.filter(c => c.status === 'visited').forEach(c => {
    const cont = simplifyContinent(c.continent);
    counts[cont] = (counts[cont] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = sorted[0]?.[1] || 1;
  const totalVisited = sorted.reduce((s, [, n]) => s + n, 0);

  return `
    <div class="continent-breakdown">
      <div class="breakdown-header">
        <h2 class="breakdown-title">Continents Explored</h2>
        <span class="breakdown-total">${totalVisited} countries visited in total</span>
      </div>
      <div class="breakdown-bars">
        ${sorted.map(([cont, count]) => {
          const total  = CONTINENT_TOTALS[cont] || count;
          const pct    = Math.round(count / total * 100);
          const barW   = Math.round(count / maxCount * 100);
          const color  = CONTINENT_COLORS[cont] || '#64748b';
          return `
            <div class="breakdown-row">
              <div class="breakdown-label">
                <span class="breakdown-cont-dot" style="background:${color}"></span>
                <span class="breakdown-cont-name">${cont}</span>
              </div>
              <div class="breakdown-bar-wrap">
                <div class="breakdown-bar" style="width:${barW}%;background:${color}"></div>
              </div>
              <span class="breakdown-stats">${count} <span class="breakdown-of">/ ~${total}</span></span>
              <span class="breakdown-pct">${pct}%</span>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

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
  if (!mapDiv) return;

  try {
    const countries = await dataService.getCountriesVisited();
    stateManager.loadSheet(countries);
    updateStats();
    await initMap();
    refreshCountryList('all');

    const breakdownEl = document.getElementById('continentBreakdown');
    if (breakdownEl && countries.length) breakdownEl.innerHTML = buildBreakdown(countries);

    document.querySelectorAll('.country-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.country-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        refreshCountryList(btn.dataset.filter);
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
