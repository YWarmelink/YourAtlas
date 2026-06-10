/**
 * map.js — Interactive world map page
 *
 * Uses amCharts 5 (free, CDN) to render a choropleth world map.
 * Data comes from dataService.getCountriesVisited() → Google Sheets CSV.
 *
 * Architecture is future-ready for in-website check-off:
 *   CountryStateManager merges sheet data with localStorage overrides.
 *   When the edit UI is added, call stateManager.setStatus(code, status)
 *   and re-render the map with rebuildStatusMap().
 */

/* =====================================================================
   CountryStateManager — merges live data with localStorage overrides
   ===================================================================== */
class CountryStateManager {
  constructor() {
    this._sheet = {};   // loaded from Google Sheets
    this._local = {};   // localStorage overrides (future edit mode)
    try {
      this._local = JSON.parse(localStorage.getItem('atlas_country_overrides') || '{}');
    } catch (_) {}
  }

  loadSheet(countries) {
    this._sheet = {};
    countries.forEach(c => {
      if (c.country_code) this._sheet[c.country_code.toUpperCase()] = c;
    });
  }

  getStatus(code) {
    return this._local[code]?.status || this._sheet[code]?.status || null;
  }

  getName(code) {
    return this._local[code]?.country_name || this._sheet[code]?.country_name || code;
  }

  getContinent(code) {
    return this._sheet[code]?.continent || '';
  }

  /** Returns a flat {CODE: status} map for the map renderer */
  buildStatusMap() {
    const result = {};
    Object.keys(this._sheet).forEach(code => {
      result[code] = this.getStatus(code);
    });
    Object.keys(this._local).forEach(code => {
      result[code] = this._local[code].status;
    });
    return result;
  }

  allEntries() {
    const codes = new Set([...Object.keys(this._sheet), ...Object.keys(this._local)]);
    return [...codes].map(code => ({
      country_code: code,
      country_name: this.getName(code),
      continent:    this.getContinent(code),
      status:       this.getStatus(code) || 'wishlist',
    })).sort((a, b) => a.country_name.localeCompare(b.country_name));
  }

  /* Future: persist a local override */
  setStatus(code, status) {
    const existing = this._sheet[code] || {};
    this._local[code] = { ...existing, country_code: code, status };
    try { localStorage.setItem('atlas_country_overrides', JSON.stringify(this._local)); } catch (_) {}
  }

  clearOverride(code) {
    delete this._local[code];
    try { localStorage.setItem('atlas_country_overrides', JSON.stringify(this._local)); } catch (_) {}
  }
}

/* =====================================================================
   Page init
   ===================================================================== */
const stateManager = new CountryStateManager();
let amchartsRoot = null;

document.addEventListener('DOMContentLoaded', async () => {
  const mapDiv    = document.getElementById('mapDiv');
  const statsEl   = document.getElementById('mapStatsVisited');
  const totalEl   = document.getElementById('mapStatsTotal');
  const listEl    = document.getElementById('countryList');

  if (!mapDiv) return;

  try {
    const countries = await dataService.getCountriesVisited();
    stateManager.loadSheet(countries);

    const statusMap = stateManager.buildStatusMap();

    /* --- stats --- */
    const visited  = countries.filter(c => c.status === 'visited').length;
    const wishlist = countries.filter(c => c.status === 'wishlist').length;
    const planned  = countries.filter(c => c.status === 'planned').length;
    if (statsEl) statsEl.textContent = visited;
    if (totalEl) totalEl.textContent = visited + planned + wishlist;

    const detailEl = document.getElementById('mapStatsDetail');
    if (detailEl) {
      detailEl.textContent =
        [wishlist  && `${wishlist} wishlist`,
         planned   && `${planned} planned`]
        .filter(Boolean).join(' · ');
    }

    /* --- map --- */
    initMap(statusMap);

    /* --- list --- */
    if (listEl) renderCountryList(stateManager.allEntries(), listEl);

    /* --- tab filter --- */
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

  } catch (e) {
    console.error('[map]', e);
    mapDiv.innerHTML = errorMsg('Could not load map data.');
  }
});

/* =====================================================================
   amCharts 5 map
   ===================================================================== */
function initMap(statusMap) {
  if (typeof am5 === 'undefined') {
    document.getElementById('mapDiv').innerHTML =
      `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,.4);font-size:1rem">
         Map library not loaded. Check your internet connection.
       </div>`;
    return;
  }

  const COLORS = {
    visited:  0x10b981,
    planned:  0x0ea5e9,
    wishlist: 0xf59e0b,
    default:  0x1e3a5f,
  };

  const HOVER = {
    visited:  0x34d399,
    planned:  0x38bdf8,
    wishlist: 0xfbbf24,
    default:  0x2d527a,
  };

  const root = am5.Root.new('mapDiv');
  amchartsRoot = root;

  root.setThemes([am5themes_Animated.new(root)]);

  const chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: 'rotateX',
      panY: 'translateY',
      projection: am5map.geoNaturalEarth1(),
      homeZoomLevel: 1,
      maxZoomLevel: 16,
    })
  );

  /* Background fill */
  chart.chartContainer.get('background').setAll({
    fill: am5.color(0x0a1220),
    fillOpacity: 1,
  });

  /* Country polygons */
  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ['AQ'],
    })
  );

  polygonSeries.mapPolygons.template.setAll({
    interactive: true,
    stroke: am5.color(0x0a1628),
    strokeWidth: 0.6,
    tooltipText: '',
  });

  /* Dynamic fill based on status */
  polygonSeries.mapPolygons.template.adapters.add('fill', (_fill, target) => {
    const id = (target.dataItem?.get('id') || '').toUpperCase();
    const status = statusMap[id] || 'default';
    return am5.color(COLORS[status] || COLORS.default);
  });

  /* Hover state */
  polygonSeries.mapPolygons.template.states.create('hover', {});
  polygonSeries.mapPolygons.template.adapters.add('hoverFill', (_fill, target) => {
    const id = (target.dataItem?.get('id') || '').toUpperCase();
    const status = statusMap[id] || 'default';
    return am5.color(HOVER[status] || HOVER.default);
  });

  /* Tooltip */
  const tooltip = am5.Tooltip.new(root, {
    getFillFromSprite: false,
    autoTextColor: false,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
  });

  tooltip.get('background').setAll({
    fill: am5.color(0x1e293b),
    fillOpacity: 0.96,
    stroke: am5.color(0x334155),
    strokeWidth: 1,
    cornerRadiusTL: 8, cornerRadiusTR: 8,
    cornerRadiusBL: 8, cornerRadiusBR: 8,
  });

  tooltip.label.setAll({
    fill: am5.color(0xf8fafc),
    fontSize: 13,
    fontFamily: 'Inter, sans-serif',
  });

  polygonSeries.mapPolygons.template.set('tooltip', tooltip);

  polygonSeries.mapPolygons.template.adapters.add('tooltipText', (_text, target) => {
    const id   = (target.dataItem?.get('id') || '').toUpperCase();
    const name = target.dataItem?.get('name') || id;
    const status = statusMap[id];
    const label = status
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : 'Not visited';
    const icons = { visited: '✅', wishlist: '⭐', planned: '🗓', default: '' };
    return `[bold]${name}[/]\n${icons[status] || ''} ${label}`;
  });

  /* Click → highlight country item in list */
  polygonSeries.mapPolygons.template.events.on('click', ev => {
    const id = (ev.target.dataItem?.get('id') || '').toUpperCase();
    if (!id) return;
    const el = document.getElementById('country-item-' + id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      el.style.boxShadow = '0 0 0 2px var(--atlas-blue)';
      setTimeout(() => { el.style.boxShadow = ''; }, 1500);
    }
  });

  /* Zoom controls */
  chart.set('zoomControl', am5map.ZoomControl.new(root, {
    x: am5.p100,
    centerX: am5.p100,
  }));

  chart.appear(1000, 100);
}

/* =====================================================================
   Country list below map
   ===================================================================== */
function renderCountryList(entries, container) {
  if (!entries.length) {
    container.innerHTML = emptyMsg('No countries found.');
    return;
  }

  container.innerHTML = entries.map(c => `
    <div class="country-item" id="country-item-${escapeHTML(c.country_code)}">
      <div class="country-item-dot ${c.status || 'visited'}"></div>
      <div class="country-item-name">${escapeHTML(c.country_name)}</div>
      <div class="country-item-continent">${escapeHTML(c.continent || '')}</div>
    </div>`).join('');
}
