/**
 * Route Builder — stack country blocks into one big long-term route.
 *
 * Not part of dataService: this data doesn't exist in the trip sheet yet,
 * so routes are kept in localStorage until that structure is added.
 */

const RB_STORAGE_KEY = 'atlas_grand_trips';
const RB_LIBRARY_KEY = 'atlas_route_blocks_library';
const RB_SEED_FLAG_KEY = 'atlas_grand_trips_seeded_v1';
const RB_SEED_FLAG_KEY_MEA = 'atlas_grand_trips_seeded_mea_v1';
const RB_SEED_FLAG_KEY_ANCIENT = 'atlas_grand_trips_seeded_ancient_v1';
const RB_SEED_FLAG_KEY_ARCTIC = 'atlas_grand_trips_seeded_arctic_v1';
const RB_SEED_FLAG_KEY_PATAGONIA = 'atlas_grand_trips_seeded_patagonia_v1';
const RB_SEED_FLAG_KEY_HIMALAYA = 'atlas_grand_trips_seeded_himalaya_v1';
const RB_SEED_FLAG_KEY_NORTHAMERICA = 'atlas_grand_trips_seeded_northamerica_v1';
const RB_SEED_FLAG_KEY_OCEANIA = 'atlas_grand_trips_seeded_oceania_v1';
const RB_SEED_FLAG_KEY_CARIBBEAN = 'atlas_grand_trips_seeded_caribbean_v1';
const RB_SEED_FLAG_KEY_WCAFRICA = 'atlas_grand_trips_seeded_wcafrica_v1';
const RB_MIGRATE_FLAG_2026_07 = 'atlas_grand_trips_migrate_2026_07_v1';
const RB_MIGRATE_FLAG_2026_07_EMOJI = 'atlas_grand_trips_migrate_2026_07_emoji_v1';
const RB_CONTENT_PATCH_FLAG = 'atlas_grand_trips_content_patch_v1';
const RB_BLOCK_COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#f97316', '#14b8a6'];
const RB_WORLD_TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

let rbRoutes = [];
let rbCurrentId = null;
let rbCountryOptions = []; // [{ code, name }] — pulled from the same sheet that drives the map
let rbLibrary = [];        // [{ id, name, blocks: [{country, country_code, days, budget, notes}], created_at }]
let rbSelectedLibIds = new Set();

document.addEventListener('DOMContentLoaded', async () => {
  rbRoutes = rbLoad();
  rbLibrary = rbLoadLibrary();
  rbSeedPredefinedExpeditions();
  rbSeedMEAExpedition();
  rbSeedAncientCivilizationsExpedition();
  rbSeedArcticCircleExpedition();
  rbSeedPatagoniaAntarcticaExpedition();
  rbSeedHimalayaIndiaExpedition();
  rbSeedNorthAmericaExpedition();
  rbSeedOceaniaExpedition();
  rbSeedCaribbeanExpedition();
  rbSeedWestCentralAfricaExpedition();
  rbMigrateExpeditionRenames();
  rbMigrateExpeditionEmojiNames();
  rbPatchExpeditionContent();
  rbBindEvents();

  try {
    const countries = await dataService.getCountriesVisited();
    rbCountryOptions = countries
      .filter(c => c.country_code && c.country_name)
      .map(c => ({ code: c.country_code, name: c.country_name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (_) {
    rbCountryOptions = [];
  }

  document.getElementById('rbLoading').hidden = true;
  rbShowList();
});

/** Flag emoji from an ISO alpha-2 code — works for any country, not just a curated list. */
function rbFlagFromCode(code) {
  if (!code || code.length !== 2) return '🏳️';
  const points = code.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...points);
}

function rbFlagFor(block) {
  if (block.country_code) return rbFlagFromCode(block.country_code);
  return getTripFlag({ trip_name: block.country, country_region: block.country });
}

// ---- storage ----

function rbLoad() {
  try {
    const raw = localStorage.getItem(RB_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function rbSave() {
  try { localStorage.setItem(RB_STORAGE_KEY, JSON.stringify(rbRoutes)); } catch (_) {}
}

function rbLoadLibrary() {
  try {
    const raw = localStorage.getItem(RB_LIBRARY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function rbSaveLibrary() {
  try { localStorage.setItem(RB_LIBRARY_KEY, JSON.stringify(rbLibrary)); } catch (_) {}
}

function rbGetCurrent() {
  return rbRoutes.find(r => r.id === rbCurrentId) || null;
}

function rbNewLibId() {
  return 'lib_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function rbNewRegionId() {
  return 'rg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function rbNewDestId() {
  return 'dest_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

// ---- view switching ----

function rbHideAllViews() {
  document.getElementById('routeListView').hidden = true;
  document.getElementById('routeEditorView').hidden = true;
  document.getElementById('routeLibraryView').hidden = true;
}

function rbShowList() {
  rbHideAllViews();
  document.getElementById('routeListView').hidden = false;
  document.title = "Route Builder | Youri's Travel Atlas";
  rbRenderList();
}

function rbShowEditor() {
  rbHideAllViews();
  document.getElementById('routeEditorView').hidden = false;
  rbRenderEditor();
}

function rbShowLibrary() {
  rbHideAllViews();
  document.getElementById('routeLibraryView').hidden = false;
  document.title = "Block Library | Youri's Travel Atlas";
  rbSelectedLibIds.clear();
  rbRenderLibrary();
}

// ---- list view ----

function rbRenderList() {
  const grid = document.getElementById('routeListGrid');
  const count = document.getElementById('routeListCount');
  if (count) count.textContent = `${rbRoutes.length} route${rbRoutes.length !== 1 ? 's' : ''}`;

  if (!rbRoutes.length) {
    grid.innerHTML = `
      <div class="empty-message" style="grid-column:1/-1;padding:3rem 1rem">
        <span class="empty-icon">🧭</span>
        <p>No big routes yet. Click "+ New Route" to start stacking countries into a long trip.</p>
      </div>`;
    return;
  }

  grid.innerHTML = rbRoutes.map(rbBuildRouteCard).join('');
}

function rbBuildRouteCard(route) {
  const totalDays = rbTotalDays(route);
  const months = totalDays ? (totalDays / 30).toFixed(1) : '0';
  const status = route.status || 'Idea';
  return `
    <div class="route-card" data-route-id="${route.id}">
      <button class="route-card-delete" data-action="delete" title="Delete route">✕</button>
      <span class="badge ${rbStatusBadgeClass(status)} route-card-status">${escapeHTML(status)}</span>
      <div class="route-card-bar">${rbBuildSegmentsHTML(route.blocks, true)}</div>
      <div class="route-card-body">
        <div class="route-card-name">${escapeHTML(route.name || 'Untitled Route')}</div>
        <div class="route-card-meta">
          <span>🧱 ${route.blocks.length} block${route.blocks.length !== 1 ? 's' : ''}</span>
          <span>📅 ${totalDays} days</span>
          <span>~${months} mo</span>
        </div>
      </div>
      <div class="route-card-open">Open →</div>
    </div>`;
}

function rbStatusBadgeClass(status) {
  const map = { Idea: 'rb-status-idea', Planning: 'rb-status-planning', Active: 'rb-status-active', Completed: 'rb-status-completed' };
  return map[status] || 'rb-status-idea';
}

// ---- library view ----

function rbRenderLibrary() {
  const grid = document.getElementById('libraryGrid');
  const countEl = document.getElementById('libraryCount');
  if (countEl) countEl.textContent = `${rbLibrary.length} saved block${rbLibrary.length !== 1 ? 's' : ''}`;
  rbUpdateMergeButton();

  if (!rbLibrary.length) {
    grid.innerHTML = `
      <div class="empty-message" style="grid-column:1/-1;padding:3rem 1rem">
        <span class="empty-icon">📚</span>
        <p>No saved blocks yet. Open a route and click "💾 Save as Block" to add one here.</p>
      </div>`;
    return;
  }

  grid.innerHTML = rbLibrary.map(item => {
    const totalDays = item.blocks.reduce((s, b) => s + (parseInt(b.days) || 0), 0);
    const selected = rbSelectedLibIds.has(item.id);
    return `
      <div class="lib-card${selected ? ' lib-card--selected' : ''}" data-lib-id="${item.id}">
        <label class="lib-card-select">
          <input type="checkbox" class="lib-card-checkbox" ${selected ? 'checked' : ''}>
        </label>
        <div class="lib-card-actions">
          <button class="lib-icon-btn" data-action="rename-lib" title="Rename block">✎</button>
          <button class="lib-icon-btn lib-icon-btn-danger" data-action="delete-lib" title="Delete block">✕</button>
        </div>
        <div class="route-card-bar">${rbBuildSegmentsHTML(item.blocks, true)}</div>
        <div class="route-card-body">
          <div class="route-card-name">${escapeHTML(item.name)}</div>
          <div class="route-card-meta">
            <span>🧱 ${item.blocks.length} countr${item.blocks.length === 1 ? 'y' : 'ies'}</span>
            <span>📅 ${totalDays} days</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function rbUpdateMergeButton() {
  const btn = document.getElementById('mergeLibBtn');
  if (btn) btn.disabled = rbSelectedLibIds.size < 2;
}

// ---- editor view ----

function rbRenderEditor() {
  const route = rbGetCurrent();
  if (!route) { rbShowList(); return; }

  document.getElementById('rbNameInput').value = route.name || '';
  document.getElementById('rbStartDateInput').value = route.start_date || '';
  document.getElementById('rbStatusInput').value = route.status || 'Idea';
  document.getElementById('rbTravelStyleInput').value = route.travel_style || '';
  document.getElementById('rbBestMonthInput').value = route.best_starting_month || '';
  document.getElementById('rbDescriptionInput').value = route.description || '';
  document.getElementById('rbClimateInput').value = route.climate_summary || '';
  document.getElementById('rbRouteNotesInput').value = route.notes || '';
  document.title = `${route.name || 'Route Builder'} | Youri's Travel Atlas`;

  rbRenderBlocks(route);
  rbRefreshDerived(route);
  rbRenderInsertSelect();
  rbRenderCalendarIfVisible(route);
  rbRenderMapIfVisible(route);
}

function rbRenderInsertSelect() {
  const sel = document.getElementById('insertBlockSelect');
  if (!sel) return;

  if (!rbLibrary.length) {
    sel.innerHTML = `<option value="" selected disabled>No saved blocks yet</option>`;
    sel.disabled = true;
    return;
  }

  sel.disabled = false;
  sel.innerHTML = `<option value="" selected disabled>+ Insert a saved block…</option>` +
    rbLibrary.map(l => `<option value="${l.id}">${escapeHTML(l.name)} (${l.blocks.length} countr${l.blocks.length === 1 ? 'y' : 'ies'})</option>`).join('');
}

function rbRenderBlocks(route) {
  const container = document.getElementById('rbBlocks');

  if (!route.blocks.length) {
    container.innerHTML = `
      <div class="empty-message" style="padding:2.5rem 1rem">
        <span class="empty-icon">🧱</span>
        <p>No blocks yet. Add your first country below.</p>
      </div>`;
    return;
  }

  const ranges = rbComputeRanges(route.blocks);
  route.regions = route.regions || [];

  let html = '';
  let i = 0;
  while (i < route.blocks.length) {
    const b = route.blocks[i];
    const region = b.region_id && route.regions.find(r => r.id === b.region_id);

    if (region) {
      let j = i;
      while (j < route.blocks.length && route.blocks[j].region_id === region.id) j++;
      html += rbRenderRegionGroup(region, route.blocks.slice(i, j), ranges.slice(i, j), route);
      i = j;
    } else {
      html += rbRenderBlockRow(b, ranges[i], route);
      i++;
    }
  }

  container.innerHTML = html;
}

function rbRenderRegionGroup(region, blocks, ranges, route) {
  const totalDays = blocks.reduce((s, b) => s + (parseInt(b.days) || 0), 0);
  const rowsHTML = blocks.map((b, k) => rbRenderBlockRow(b, ranges[k], route)).join('');

  return `
    <div class="rb-region-group" data-region-id="${region.id}">
      <div class="rb-region-header">
        <button class="rb-region-toggle" data-action="toggle-region" title="${region.collapsed ? 'Expand' : 'Collapse'}">${region.collapsed ? '▸' : '▾'}</button>
        <input type="text" class="rb-region-name-input" value="${escapeHTML(region.name)}" placeholder="Region name">
        <span class="rb-region-stat">🧱 ${blocks.length} countr${blocks.length === 1 ? 'y' : 'ies'}</span>
        <span class="rb-region-stat">📅 ${totalDays} days</span>
        <input type="text" class="rb-input rb-input-sm rb-region-season" placeholder="Best season" value="${escapeHTML(region.season || '')}">
        <input type="number" class="rb-input rb-input-sm rb-region-budget" placeholder="Budget est." value="${region.budget === '' || region.budget == null ? '' : region.budget}">
        <button class="rb-icon-btn rb-icon-btn-danger" data-action="delete-region" title="Delete region (countries stay, just ungrouped)">✕</button>
      </div>
      <input type="text" class="rb-input rb-region-notes" placeholder="Region notes… (optional)" value="${escapeHTML(region.notes || '')}">
      <div class="rb-region-body"${region.collapsed ? ' hidden' : ''}>
        ${rowsHTML}
      </div>
    </div>`;
}

function rbRenderBlockRow(b, r, route) {
  const flag = rbFlagFor(b);
  const idx = route.blocks.findIndex(x => x.id === b.id);
  const color = RB_BLOCK_COLORS[idx % RB_BLOCK_COLORS.length];
  const rangeLabel = r.days > 0 ? `Day ${r.start}${r.end !== r.start ? '–' + r.end : ''}` : '—';
  const destinations = b.destinations || [];
  const regionOptions = (route.regions || []).map(rg =>
    `<option value="${rg.id}"${b.region_id === rg.id ? ' selected' : ''}>${escapeHTML(rg.name)}</option>`
  ).join('');

  return `
    <div class="rb-block" data-block-id="${b.id}" style="--block-color:${color}">
      <div class="rb-block-order">${idx + 1}</div>
      <div class="rb-block-main">
        <div class="rb-block-top">
          <div class="rb-block-fields">
            <div class="rb-field rb-field-country">
              <label>Country</label>
              <div class="rb-country-input">
                <span class="rb-flag">${flag}</span>
                ${rbCountrySelectHTML(b)}
              </div>
            </div>
            <div class="rb-field rb-field-days">
              <label>Days</label>
              <input type="number" min="1" class="rb-input rb-input-days" value="${b.days || ''}">
            </div>
            <div class="rb-field rb-field-budget">
              <label>Budget <span class="rb-optional">optional</span></label>
              <input type="number" min="0" class="rb-input rb-input-budget" placeholder="TBD" value="${b.budget === '' || b.budget == null ? '' : b.budget}">
            </div>
          </div>
          <div class="rb-block-range">${rangeLabel}</div>
        </div>

        <div class="rb-field rb-field-notes">
          <label>Note <span class="rb-optional">optional</span></label>
          <textarea class="rb-input rb-input-notes" placeholder="Short note about this leg… cities, visa, ideas">${escapeHTML(b.notes || '')}</textarea>
        </div>

        <div class="rb-field rb-field-transport">
          <label>Transport to next <span class="rb-optional">optional</span></label>
          <input type="text" class="rb-input rb-input-transport" placeholder="e.g. flight, overnight bus, ferry…" value="${escapeHTML(b.transport_to_next || '')}">
        </div>

        <div class="rb-destinations">
          <div class="rb-destinations-label">Destinations <span class="rb-optional">optional</span></div>
          <div class="rb-destination-list">
            ${destinations.map(d => `
              <div class="rb-destination-row" data-dest-id="${d.id}">
                <input type="text" class="rb-input rb-input-sm rb-dest-name" placeholder="Place name" value="${escapeHTML(d.name)}">
                <input type="text" class="rb-input rb-input-sm rb-dest-note" placeholder="Note (optional)" value="${escapeHTML(d.notes || '')}">
                <button class="rb-icon-btn rb-icon-btn-danger" data-action="remove-destination" title="Remove destination">✕</button>
              </div>`).join('')}
          </div>
          <button class="rb-destination-add" data-action="add-destination">+ Add destination</button>
        </div>
      </div>
      <div class="rb-block-actions">
        <select class="rb-input rb-input-sm rb-region-select" title="Assign to region">
          <option value="">No region</option>
          ${regionOptions}
          <option value="__new__">+ New region…</option>
        </select>
        <div class="rb-block-actions-icons">
          <button class="rb-icon-btn" data-action="up" ${idx === 0 ? 'disabled' : ''} title="Move up">↑</button>
          <button class="rb-icon-btn" data-action="down" ${idx === route.blocks.length - 1 ? 'disabled' : ''} title="Move down">↓</button>
          <button class="rb-icon-btn rb-icon-btn-danger" data-action="remove" title="Remove block">✕</button>
        </div>
      </div>
    </div>`;
}

function rbCountrySelectHTML(block) {
  const hasMatch = rbCountryOptions.some(c => c.code === block.country_code);
  const options = rbCountryOptions.map(c =>
    `<option value="${escapeHTML(c.code)}"${block.country_code === c.code ? ' selected' : ''}>${escapeHTML(c.name)}</option>`
  ).join('');
  const placeholder = `<option value=""${!hasMatch ? ' selected' : ''} disabled>${rbCountryOptions.length ? '— Choose a country —' : 'No countries found in sheet'}</option>`;
  return `<select class="rb-input rb-input-country">${placeholder}${options}</select>`;
}

/** Updates everything derived from block data without re-rendering inputs (keeps focus/cursor intact). */
function rbRefreshDerived(route) {
  const bar = document.getElementById('rbTimelineBar');
  if (bar) bar.innerHTML = rbBuildSegmentsHTML(route.blocks, false);

  const ranges = rbComputeRanges(route.blocks);
  route.blocks.forEach((b, i) => {
    const row = document.querySelector(`.rb-block[data-block-id="${b.id}"]`);
    if (!row) return;
    const r = ranges[i];
    const rangeEl = row.querySelector('.rb-block-range');
    if (rangeEl) rangeEl.textContent = r.days > 0 ? `Day ${r.start}${r.end !== r.start ? '–' + r.end : ''}` : '—';
    const flagEl = row.querySelector('.rb-flag');
    if (flagEl) flagEl.textContent = rbFlagFor(b);
  });

  const totalDays = rbTotalDays(route);
  const countries = new Set(route.blocks.map(b => (b.country || '').trim().toLowerCase()).filter(Boolean)).size;
  const budgets = route.blocks.map(b => b.budget).filter(v => v !== '' && v != null && !isNaN(v));
  const totalBudget = budgets.length ? budgets.reduce((s, v) => s + parseFloat(v), 0) : null;

  const summary = document.getElementById('rbSummary');
  if (summary) {
    summary.innerHTML = `
      <div class="overview-item">
        <div class="overview-item-label">Total Days</div>
        <div class="overview-item-value">${totalDays}</div>
      </div>
      <div class="overview-item">
        <div class="overview-item-label">~ Months</div>
        <div class="overview-item-value">${totalDays ? (totalDays / 30).toFixed(1) : '0'}</div>
      </div>
      <div class="overview-item">
        <div class="overview-item-label">Countries</div>
        <div class="overview-item-value">${countries}</div>
      </div>
      <div class="overview-item">
        <div class="overview-item-label">Budget</div>
        <div class="overview-item-value">${totalBudget !== null ? formatBudget(totalBudget) : '—'}</div>
      </div>`;
  }

  rbRenderCalendarIfVisible(route);
  rbRenderMapIfVisible(route);
}

// ---- calendar view ----

function rbRenderCalendarIfVisible(route) {
  const panel = document.getElementById('rbCalendarPanel');
  if (panel && !panel.hidden) rbRenderCalendar(route);
}

function rbRenderCalendar(route) {
  const panel = document.getElementById('rbCalendarPanel');
  if (!panel) return;

  if (!route.start_date) {
    panel.innerHTML = `<div class="empty-message" style="padding:2rem 1rem"><span class="empty-icon">📅</span><p>Set a start date above to see this route on a calendar.</p></div>`;
    return;
  }

  const totalDays = rbTotalDays(route);
  if (!totalDays) {
    panel.innerHTML = `<div class="empty-message" style="padding:2rem 1rem"><span class="empty-icon">📅</span><p>Add blocks with a duration to see the calendar.</p></div>`;
    return;
  }

  const ranges = rbComputeRanges(route.blocks);
  const dayBlockIndex = [];
  route.blocks.forEach((b, i) => {
    const r = ranges[i];
    if (r.days <= 0) return;
    for (let d = r.start; d <= r.end; d++) dayBlockIndex[d - 1] = i;
  });

  const start = new Date(route.start_date + 'T00:00:00');
  const end = new Date(start);
  end.setDate(end.getDate() + totalDays - 1);

  const months = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cursor <= lastMonth) {
    months.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  panel.innerHTML = months.map(m => rbRenderMonthGrid(m, start, totalDays, route.blocks, dayBlockIndex)).join('');
}

function rbRenderMonthGrid(monthDate, routeStart, totalDays, blocks, dayBlockIndex) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Monday-first
  const monthLabel = firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  let cells = '';
  for (let i = 0; i < startWeekday; i++) cells += `<div class="rb-cal-cell rb-cal-cell--empty"></div>`;

  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(year, month, day);
    const routeDay = Math.round((cellDate - routeStart) / 86400000) + 1;

    let style = '';
    let title = '';
    let flagHTML = '';

    if (routeDay >= 1 && routeDay <= totalDays && dayBlockIndex[routeDay - 1] != null) {
      const bi = dayBlockIndex[routeDay - 1];
      const block = blocks[bi];
      const color = RB_BLOCK_COLORS[bi % RB_BLOCK_COLORS.length];
      style = `style="background:${color}22;border-color:${color}"`;
      title = `title="${escapeHTML(block.country || 'Country')} — day ${routeDay}"`;
      const isFirstDayOfBlock = routeDay === 1 || dayBlockIndex[routeDay - 2] !== bi;
      if (isFirstDayOfBlock) flagHTML = `<span class="rb-cal-flag">${rbFlagFor(block)}</span>`;
    }

    cells += `<div class="rb-cal-cell" ${style} ${title}><span class="rb-cal-daynum">${day}</span>${flagHTML}</div>`;
  }

  return `
    <div class="rb-cal-month">
      <div class="rb-cal-month-label">${monthLabel}</div>
      <div class="rb-cal-grid">
        <div class="rb-cal-weekday">Mo</div><div class="rb-cal-weekday">Tu</div><div class="rb-cal-weekday">We</div>
        <div class="rb-cal-weekday">Th</div><div class="rb-cal-weekday">Fr</div><div class="rb-cal-weekday">Sa</div><div class="rb-cal-weekday">Su</div>
        ${cells}
      </div>
    </div>`;
}

// ---- map view (highlights the route's countries on the world map) ----

let rbWorldGeoJSON = null;
let rbMiniMap = null;
let rbMiniMapLayer = null;

async function rbGetWorldGeoJSON() {
  if (rbWorldGeoJSON) return rbWorldGeoJSON;
  const res = await fetch(RB_WORLD_TOPOJSON_URL);
  const worldData = await res.json();
  const geojson = topojson.feature(worldData, worldData.objects.countries);
  geojson.features = geojson.features.filter(f => parseInt(f.id, 10) !== 10); // drop Antarctica
  rbWorldGeoJSON = geojson;
  return geojson;
}

function rbRenderMapIfVisible(route) {
  const panel = document.getElementById('rbMapPanel');
  if (panel && !panel.hidden) rbRenderMap(route);
}

async function rbRenderMap(route) {
  const mapDiv = document.getElementById('rbMapDiv');
  if (!mapDiv) return;

  if (typeof L === 'undefined' || typeof topojson === 'undefined') {
    mapDiv.innerHTML = errorMsg('Map library not loaded.');
    return;
  }

  let geojson;
  try {
    geojson = await rbGetWorldGeoJSON();
  } catch (_) {
    mapDiv.innerHTML = errorMsg('Could not load map data.');
    return;
  }

  if (!rbMiniMap) {
    rbMiniMap = L.map(mapDiv, {
      center: [20, 10], zoom: 1.3, minZoom: 1, maxZoom: 6, zoomSnap: 0.5,
      attributionControl: false, scrollWheelZoom: false,
      maxBounds: [[-85, -200], [85, 200]], maxBoundsViscosity: 0.9,
    });
  }

  const codes = new Set(route.blocks.map(b => b.country_code).filter(Boolean));

  if (rbMiniMapLayer) rbMiniMap.removeLayer(rbMiniMapLayer);
  rbMiniMapLayer = L.geoJSON(geojson, {
    style: feature => {
      const code = ISO_NUM[parseInt(feature.id, 10)];
      const highlighted = code && codes.has(code);
      return {
        fillColor: highlighted ? '#0ea5e9' : '#cbd5e1',
        fillOpacity: highlighted ? 0.85 : 0.45,
        color: '#0a1628',
        weight: 0.5,
      };
    },
  }).addTo(rbMiniMap);

  setTimeout(() => rbMiniMap && rbMiniMap.invalidateSize(), 30);
}

// ---- shared helpers ----

function rbTotalDays(route) {
  return route.blocks.reduce((s, b) => s + (parseInt(b.days) || 0), 0);
}

function rbComputeRanges(blocks) {
  let cursor = 1;
  return blocks.map(b => {
    const days = parseInt(b.days) || 0;
    const start = cursor;
    const end = days > 0 ? cursor + days - 1 : cursor;
    if (days > 0) cursor = end + 1;
    return { start, end, days };
  });
}

function rbBuildSegmentsHTML(blocks, mini) {
  const totalDays = blocks.reduce((s, b) => s + (parseInt(b.days) || 0), 0);
  if (!blocks.length || totalDays <= 0) {
    return `<div class="rb-bar-empty">${mini ? '' : 'Add blocks to see your route timeline'}</div>`;
  }

  return blocks.map((b, i) => {
    const days = parseInt(b.days) || 0;
    const grow = days > 0 ? days : 0.001;
    const color = RB_BLOCK_COLORS[i % RB_BLOCK_COLORS.length];
    const flag = rbFlagFor(b);
    const name = b.country || 'Country';
    const label = mini ? '' : `<span class="rb-bar-seg-flag">${flag}</span><span class="rb-bar-seg-text">${escapeHTML(name)}</span>`;
    return `<div class="rb-bar-seg${mini ? ' rb-bar-seg--mini' : ''}" style="flex-grow:${grow};background:${color}" title="${escapeHTML(name)} — ${days} day${days !== 1 ? 's' : ''}">${label}</div>`;
  }).join('');
}

function rbNewBlockId() {
  return 'blk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

// ---- events ----

function rbBindEvents() {
  document.getElementById('newRouteBtn').addEventListener('click', () => {
    const route = {
      id: 'gt_' + Date.now(),
      name: '',
      status: 'Idea',
      start_date: '',
      description: '',
      travel_style: '',
      climate_summary: '',
      best_starting_month: '',
      notes: '',
      created_at: new Date().toISOString(),
      regions: [],
      blocks: [],
    };
    rbRoutes.unshift(route);
    rbSave();
    rbCurrentId = route.id;
    rbShowEditor();
  });

  document.getElementById('routeListGrid').addEventListener('click', e => {
    const card = e.target.closest('.route-card');
    if (!card) return;
    const id = card.dataset.routeId;
    const actionBtn = e.target.closest('[data-action]');

    if (actionBtn && actionBtn.dataset.action === 'delete') {
      const route = rbRoutes.find(r => r.id === id);
      if (!confirm(`Delete "${route?.name || 'this route'}"? This cannot be undone.`)) return;
      rbRoutes = rbRoutes.filter(r => r.id !== id);
      rbSave();
      rbRenderList();
      return;
    }

    rbCurrentId = id;
    rbShowEditor();
  });

  document.getElementById('backToListBtn').addEventListener('click', () => {
    rbCurrentId = null;
    rbShowList();
  });

  document.getElementById('openLibraryBtn').addEventListener('click', rbShowLibrary);
  document.getElementById('backFromLibraryBtn').addEventListener('click', rbShowList);

  document.getElementById('saveAsBlockBtn').addEventListener('click', () => {
    const route = rbGetCurrent();
    if (!route || !route.blocks.length) { alert('Add at least one country block first.'); return; }
    const name = prompt('Name for this saved block:', route.name || 'New Block');
    if (!name) return;
    const blocks = route.blocks.map(b => ({
      country: b.country, country_code: b.country_code, days: b.days, budget: b.budget, notes: b.notes,
      transport_to_next: b.transport_to_next, destinations: (b.destinations || []).map(d => ({ name: d.name, notes: d.notes })),
    }));
    rbLibrary.unshift({ id: rbNewLibId(), name, blocks, created_at: new Date().toISOString() });
    rbSaveLibrary();
    rbRenderInsertSelect();
    alert(`Saved "${name}" to your Block Library.`);
  });

  document.getElementById('insertBlockSelect').addEventListener('change', e => {
    const libId = e.target.value;
    const route = rbGetCurrent();
    const item = rbLibrary.find(l => l.id === libId);
    if (!libId || !route || !item) return;

    const copies = item.blocks.map(b => ({
      id: rbNewBlockId(), country: b.country, country_code: b.country_code,
      days: b.days, budget: b.budget, notes: b.notes, transport_to_next: b.transport_to_next || '',
      destinations: (b.destinations || []).map(d => ({ id: rbNewDestId(), name: d.name, notes: d.notes || '' })),
    }));
    route.blocks.push(...copies);
    rbSave();
    rbRenderEditor();
  });

  document.getElementById('libraryGrid').addEventListener('click', e => {
    const card = e.target.closest('.lib-card');
    if (!card) return;
    const id = card.dataset.libId;
    const renameBtn = e.target.closest('[data-action="rename-lib"]');
    const delBtn = e.target.closest('[data-action="delete-lib"]');

    if (renameBtn) {
      const item = rbLibrary.find(l => l.id === id);
      if (!item) return;
      const name = prompt('Rename this block:', item.name);
      if (!name) return;
      item.name = name;
      rbSaveLibrary();
      rbRenderLibrary();
      return;
    }

    if (delBtn) {
      const item = rbLibrary.find(l => l.id === id);
      if (!confirm(`Delete saved block "${item?.name || ''}"? This cannot be undone.`)) return;
      rbLibrary = rbLibrary.filter(l => l.id !== id);
      rbSelectedLibIds.delete(id);
      rbSaveLibrary();
      rbRenderLibrary();
      return;
    }

    if (rbSelectedLibIds.has(id)) rbSelectedLibIds.delete(id);
    else rbSelectedLibIds.add(id);
    rbRenderLibrary();
  });

  document.getElementById('mergeLibBtn').addEventListener('click', () => {
    const selected = rbLibrary.filter(l => rbSelectedLibIds.has(l.id));
    if (selected.length < 2) return;
    const defaultName = selected.map(l => l.name).join(' + ');
    const name = prompt('Name for the combined block:', defaultName);
    if (!name) return;
    const blocks = selected.flatMap(l => l.blocks.map(b => ({ ...b })));
    rbLibrary.unshift({ id: rbNewLibId(), name, blocks, created_at: new Date().toISOString() });
    rbSelectedLibIds.clear();
    rbSaveLibrary();
    rbRenderLibrary();
  });

  document.getElementById('deleteRouteBtn').addEventListener('click', () => {
    const route = rbGetCurrent();
    if (!route) return;
    if (!confirm(`Delete "${route.name || 'this route'}"? This cannot be undone.`)) return;
    rbRoutes = rbRoutes.filter(r => r.id !== route.id);
    rbSave();
    rbCurrentId = null;
    rbShowList();
  });

  document.getElementById('rbNameInput').addEventListener('input', e => {
    const route = rbGetCurrent();
    if (!route) return;
    route.name = e.target.value;
    rbSave();
  });

  const RB_DETAIL_FIELD_MAP = {
    rbStatusInput: 'status', rbTravelStyleInput: 'travel_style', rbBestMonthInput: 'best_starting_month',
    rbDescriptionInput: 'description', rbClimateInput: 'climate_summary', rbRouteNotesInput: 'notes',
  };
  Object.keys(RB_DETAIL_FIELD_MAP).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', e => {
      const route = rbGetCurrent();
      if (!route) return;
      route[RB_DETAIL_FIELD_MAP[id]] = e.target.value;
      rbSave();
    });
  });

  const handleStartDateChange = e => {
    const route = rbGetCurrent();
    if (!route) return;
    route.start_date = e.target.value;
    rbSave();
    rbRenderCalendarIfVisible(route);
  };
  document.getElementById('rbStartDateInput').addEventListener('input', handleStartDateChange);
  document.getElementById('rbStartDateInput').addEventListener('change', handleStartDateChange);

  document.getElementById('toggleCalendarBtn').addEventListener('click', e => {
    const panel = document.getElementById('rbCalendarPanel');
    const route = rbGetCurrent();
    if (!panel || !route) return;
    panel.hidden = !panel.hidden;
    e.target.textContent = panel.hidden ? '📅 Show Calendar' : '📅 Hide Calendar';
    if (!panel.hidden) rbRenderCalendar(route);
  });

  document.getElementById('toggleMapBtn').addEventListener('click', e => {
    const panel = document.getElementById('rbMapPanel');
    const route = rbGetCurrent();
    if (!panel || !route) return;
    panel.hidden = !panel.hidden;
    e.target.textContent = panel.hidden ? '🗺️ Show Map' : '🗺️ Hide Map';
    if (!panel.hidden) rbRenderMap(route);
  });

  document.getElementById('addBlockBtn').addEventListener('click', () => {
    const route = rbGetCurrent();
    if (!route) return;
    route.blocks.push({ id: rbNewBlockId(), country: '', country_code: '', region_id: '', days: 7, budget: '', notes: '', transport_to_next: '', destinations: [] });
    rbSave();
    rbRenderEditor();
  });

  const handleFieldChange = e => {
    if (e.target.classList.contains('rb-region-select')) return; // handled by its own 'change'-only listener below

    const route = rbGetCurrent();
    if (!route) return;

    const row = e.target.closest('.rb-block');
    if (row) {
      const block = route.blocks.find(b => b.id === row.dataset.blockId);
      if (!block) return;

      const destRow = e.target.closest('.rb-destination-row');
      if (destRow) {
        const dest = (block.destinations || []).find(d => d.id === destRow.dataset.destId);
        if (!dest) return;
        if (e.target.classList.contains('rb-dest-name')) dest.name = e.target.value;
        else if (e.target.classList.contains('rb-dest-note')) dest.notes = e.target.value;
        else return;
        rbSave();
        return;
      }

      if (e.target.classList.contains('rb-input-country')) {
        block.country_code = e.target.value;
        block.country = e.target.selectedOptions[0]?.textContent || '';
      } else if (e.target.classList.contains('rb-input-days')) {
        block.days = e.target.value === '' ? '' : (parseInt(e.target.value) || 0);
      } else if (e.target.classList.contains('rb-input-budget')) {
        block.budget = e.target.value === '' ? '' : parseFloat(e.target.value);
      } else if (e.target.classList.contains('rb-input-notes')) {
        block.notes = e.target.value;
      } else if (e.target.classList.contains('rb-input-transport')) {
        block.transport_to_next = e.target.value;
      } else {
        return;
      }

      rbSave();
      rbRefreshDerived(route);
      return;
    }

    const regionGroup = e.target.closest('.rb-region-group');
    if (regionGroup) {
      const region = (route.regions || []).find(r => r.id === regionGroup.dataset.regionId);
      if (!region) return;

      if (e.target.classList.contains('rb-region-name-input')) region.name = e.target.value;
      else if (e.target.classList.contains('rb-region-season')) region.season = e.target.value;
      else if (e.target.classList.contains('rb-region-budget')) region.budget = e.target.value === '' ? '' : parseFloat(e.target.value);
      else if (e.target.classList.contains('rb-region-notes')) region.notes = e.target.value;
      else return;

      rbSave();
    }
  };

  document.getElementById('rbBlocks').addEventListener('input', handleFieldChange);
  document.getElementById('rbBlocks').addEventListener('change', handleFieldChange);

  document.getElementById('rbBlocks').addEventListener('change', e => {
    if (!e.target.classList.contains('rb-region-select')) return;
    const row = e.target.closest('.rb-block');
    const route = rbGetCurrent();
    if (!row || !route) return;
    const block = route.blocks.find(b => b.id === row.dataset.blockId);
    if (!block) return;

    const value = e.target.value;
    if (value === '__new__') {
      const name = prompt('Name for this region:');
      if (!name) { rbRenderEditor(); return; }
      route.regions = route.regions || [];
      const region = { id: rbNewRegionId(), name, season: '', budget: '', notes: '', collapsed: false };
      route.regions.push(region);
      block.region_id = region.id;
    } else {
      block.region_id = value;
    }
    rbSave();
    rbRenderEditor();
  });

  document.getElementById('rbBlocks').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const route = rbGetCurrent();
    if (!route) return;

    if (btn.dataset.action === 'toggle-region' || btn.dataset.action === 'delete-region') {
      const groupEl = btn.closest('.rb-region-group');
      const region = groupEl && (route.regions || []).find(r => r.id === groupEl.dataset.regionId);
      if (!region) return;

      if (btn.dataset.action === 'toggle-region') {
        region.collapsed = !region.collapsed;
      } else {
        if (!confirm(`Delete region "${region.name}"? Countries inside stay in the route, just ungrouped.`)) return;
        route.blocks.forEach(b => { if (b.region_id === region.id) b.region_id = ''; });
        route.regions = route.regions.filter(r => r.id !== region.id);
      }
      rbSave();
      rbRenderEditor();
      return;
    }

    const row = btn.closest('.rb-block');
    if (!row) return;
    const idx = route.blocks.findIndex(b => b.id === row.dataset.blockId);
    if (idx === -1) return;

    const action = btn.dataset.action;
    if (action === 'remove') {
      route.blocks.splice(idx, 1);
    } else if (action === 'up' && idx > 0) {
      [route.blocks[idx - 1], route.blocks[idx]] = [route.blocks[idx], route.blocks[idx - 1]];
    } else if (action === 'down' && idx < route.blocks.length - 1) {
      [route.blocks[idx + 1], route.blocks[idx]] = [route.blocks[idx], route.blocks[idx + 1]];
    } else if (action === 'add-destination') {
      route.blocks[idx].destinations = route.blocks[idx].destinations || [];
      route.blocks[idx].destinations.push({ id: rbNewDestId(), name: '', notes: '' });
    } else if (action === 'remove-destination') {
      const destRow = btn.closest('.rb-destination-row');
      const destId = destRow && destRow.dataset.destId;
      route.blocks[idx].destinations = (route.blocks[idx].destinations || []).filter(d => d.id !== destId);
    } else {
      return;
    }

    rbSave();
    rbRenderEditor();
  });
}

// ---- predefined expeditions (seeded once, from a ChatGPT brainstorm) ----

function rbBuildBlock(countryCode, countryName, opts = {}) {
  return {
    id: rbNewBlockId(),
    country: countryName,
    country_code: countryCode,
    region_id: opts.region_id || '',
    days: opts.days ?? '',
    budget: opts.budget ?? '',
    notes: opts.notes || '',
    transport_to_next: opts.transport_to_next || '',
    destinations: (opts.destinations || []).map(d => ({ id: rbNewDestId(), name: d, notes: '' })),
  };
}

/** A seed country entry is { code, name, days, budget, destinations: [string], transport_to_next, notes }. */
function rbSeedBlockOpts(c, extraOpts = {}) {
  return {
    ...extraOpts,
    days: c.days, budget: c.budget, notes: c.notes,
    transport_to_next: c.transport_to_next, destinations: c.destinations,
  };
}

function rbBuildSeedRoute(name, regionDefs, extra = {}) {
  const regions = regionDefs.map(rd => ({
    id: rbNewRegionId(), name: rd.name, season: rd.season || '', budget: rd.budget ?? '', notes: rd.note || '', collapsed: false,
  }));

  const blocks = [];
  regionDefs.forEach((rd, i) => {
    rd.countries.forEach(c => {
      blocks.push(rbBuildBlock(c.code, c.name, rbSeedBlockOpts(c, { region_id: regions[i].id })));
    });
  });

  return {
    id: 'gt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    name,
    status: 'Idea',
    start_date: '',
    description: extra.description || '',
    travel_style: extra.travel_style || '',
    climate_summary: extra.climate_summary || '',
    best_starting_month: extra.best_starting_month || '',
    notes: extra.notes || '',
    created_at: new Date().toISOString(),
    regions,
    blocks,
  };
}

function rbBuildFlatSeedRoute(name, countries, extra = {}) {
  const blocks = countries.map(c => rbBuildBlock(c.code, c.name, rbSeedBlockOpts(c)));

  return {
    id: 'gt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    name,
    status: 'Idea',
    start_date: '',
    description: extra.description || '',
    travel_style: extra.travel_style || '',
    climate_summary: extra.climate_summary || '',
    best_starting_month: extra.best_starting_month || '',
    notes: extra.notes || '',
    created_at: new Date().toISOString(),
    regions: [],
    blocks,
  };
}

// Per-country content (days, budget, destinations, transport to the next leg) for every seeded
// expedition, keyed by expedition name then ISO country code. Single source of truth used both
// when seeding a fresh route and when patching an already-seeded one (see rbPatchExpeditionContent).
const RB_EXPEDITION_CONTENT = {
  "Eurasia Grand Tour 🌏": {
    BA: { days: 4, budget: 200, destinations: ["Sarajevo", "Mostar", "Blagaj", "Trebinje"], transport_to_next: "Bus over land (Mostar/Sarajevo naar Dubrovnik of Split), rechtstreekse grensovergang, geen visum nodig" },
    HR: { days: 8, budget: 700, destinations: ["Dubrovnik", "Split", "Hvar", "Plitvicemeren", "Zagreb"], transport_to_next: "Bus langs de kust Dubrovnik-Kotor, korte grensovergang, drukte mogelijk in hoogseizoen" },
    ME: { days: 4, budget: 250, destinations: ["Kotor", "Perast", "Budva", "Durmitor NP"], transport_to_next: "Bus Kotor/Podgorica naar Tirana of Shkodër, over land, eenvoudige grensovergang" },
    AL: { days: 5, budget: 250, destinations: ["Shkodër", "Tirana", "Berat", "Gjirokastër", "Sarandë"], transport_to_next: "Bus Tirana-Ohrid of Tirana-Skopje, over land, meerdere uren" },
    MK: { days: 4, budget: 180, destinations: ["Ohrid", "Bitola", "Skopje"], transport_to_next: "Vlucht Skopje-Istanbul (bus zou via Bulgarije/Griekenland >20 uur duren, vlucht is realistischer)" },
    TR: { days: 12, budget: 650, destinations: ["Istanbul", "Cappadocië", "Pamukkale", "Antalya", "Efeze", "Ankara", "Kars/Trabzon"], transport_to_next: "Bus of trein vanaf Kars/Trabzon naar Tbilisi, grensovergang bij Posof/Sarpi, geen visum nodig voor Georgië" },
    GE: { days: 7, budget: 350, destinations: ["Tbilisi", "Kazbegi", "Sighnaghi", "Kutaisi", "Mestia (Svaneti)", "Batumi"], transport_to_next: "Marshrutka (deelbusje) Tbilisi-Yerevan, over land, eenvoudige grensovergang, geen visum nodig" },
    AM: { days: 5, budget: 250, destinations: ["Yerevan", "Khor Virap", "Lake Sevan", "Dilijan", "Tatev"], transport_to_next: "Geen directe grens (gesloten wegens conflict) — terugreizen via Georgië (Tbilisi) naar Baku, over land plus korte vlucht of bus" },
    AZ: { days: 5, budget: 300, destinations: ["Baku", "Gobustan", "Sheki", "Qabala"], transport_to_next: "Vlucht Baku-Almaty (de veerboot over de Kaspische Zee Baku-Aktau heeft geen vast schema en is onbetrouwbaar)" },
    KZ: { days: 8, budget: 500, destinations: ["Almaty", "Charyn Canyon", "Turkistan", "Shymkent", "Nur-Sultan"], transport_to_next: "Bus of deeltaxi Almaty-Bishkek, over land, drukke maar eenvoudige grensovergang" },
    KG: { days: 7, budget: 350, destinations: ["Bishkek", "Issyk-Kul", "Karakol", "Song-Kul", "Osh"], transport_to_next: "Deeljeep over de Pamir Highway Osh-Khorog, over land, ruw traject, GBAO-permit/visum voor Tadzjikistan nodig" },
    TJ: { days: 8, budget: 400, destinations: ["Khorog", "Pamir Highway", "Murghab", "Iskanderkul", "Dushanbe"], transport_to_next: "Bus of deeltaxi Dushanbe-Samarkand, over land, grensovergang kan tijdrovend zijn" },
    UZ: { days: 8, budget: 400, destinations: ["Tashkent", "Samarkand", "Bukhara", "Khiva"], transport_to_next: "Bus/taxi over land naar Turkmenabat, grensovergang met vooraf geregeld Turkmeens transitvisum verplicht" },
    TM: { days: 3, budget: 300, destinations: ["Ashgabat", "Darvaza (Gaskrater)", "Konye-Urgench", "Merv"], transport_to_next: "Vlucht Ashgabat-Urumqi (geen grens met China; overland zou moeten via Oezbekistan/Kirgizië, transitvisum laat maar kort verblijf toe)" },
    CN: { days: 12, budget: 700, destinations: ["Kashgar", "Ürümqi", "Xi'an", "Chengdu", "Beijing", "Shanghai"], transport_to_next: "Trein Beijing-Ulaanbaatar (Trans-Mongolië-route), over land, visum voor Mongolië nodig" },
    MN: { days: 6, budget: 350, destinations: ["Ulaanbaatar", "Terelj NP", "Kharkhorin", "Gobiwoestijn"], transport_to_next: "Vlucht Ulaanbaatar-Tokyo (via Beijing/Seoul, geen directe vlucht en geen landroute mogelijk)" },
    JP: { days: 12, budget: 1800, destinations: ["Tokyo", "Hakone/Fuji", "Kyoto", "Nara", "Osaka", "Hiroshima"], transport_to_next: "Vlucht Osaka/Tokyo-Taipei, korte vlucht, geen visum nodig voor Taiwan" },
    TW: { days: 6, budget: 450, destinations: ["Taipei", "Taroko-kloof", "Sun Moon Lake", "Tainan", "Kenting"], transport_to_next: "Vlucht Taipei-Hanoi, geen directe ferry/landroute beschikbaar" },
    VN: { days: 10, budget: 450, destinations: ["Hanoi", "Ha Long Bay", "Hue", "Hoi An", "Da Lat", "Ho Chi Minh City"], transport_to_next: "Nachtbus Hanoi-Vientiane, over land, grensovergang bij Cau Treo, lange rit (~24u)" },
    LA: { days: 7, budget: 300, destinations: ["Luang Prabang", "Vang Vieng", "Vientiane", "Si Phan Don (4000 eilanden)"], transport_to_next: "Bus Si Phan Don/Pakse-Siem Reap, over land, grensovergang bij Nong Nokkhien/Trapeang Kriel" },
    KH: { days: 7, budget: 300, destinations: ["Siem Reap", "Angkor Wat", "Battambang", "Phnom Penh", "Koh Rong"], transport_to_next: "Bus Phnom Penh/Siem Reap-Bangkok, over land, grensovergang bij Poipet" },
    TH: { days: 10, budget: 500, destinations: ["Bangkok", "Ayutthaya", "Sukhothai", "Chiang Mai", "Krabi/eilanden"], transport_to_next: "Vlucht Bangkok-Yangon (overland grensovergangen voor toeristen beperkt/onbetrouwbaar)" },
    MM: { days: 7, budget: 300, destinations: ["Yangon", "Bagan", "Mandalay", "Inle Lake"], transport_to_next: "Vlucht Yangon-Kuala Lumpur (geen praktische overland route; check actuele reisadviezen wegens politieke situatie)" },
    MY: { days: 8, budget: 400, destinations: ["Kuala Lumpur", "Cameron Highlands", "Penang", "Malacca", "Langkawi"], transport_to_next: "Trein of bus Kuala Lumpur-Singapore, over land, eenvoudige grensovergang" },
    SG: { days: 3, budget: 450, destinations: ["Marina Bay", "Chinatown", "Sentosa", "Gardens by the Bay"], transport_to_next: "Vlucht Singapore-Bandar Seri Begawan, geen directe landroute/ferry praktisch" },
    BN: { days: 2, budget: 200, destinations: ["Bandar Seri Begawan", "Kampong Ayer", "Ulu Temburong NP"], transport_to_next: "Vlucht Bandar Seri Begawan-Manila, meestal met overstap in Kota Kinabalu of Kuala Lumpur" },
    PH: { days: 10, budget: 450, destinations: ["Manila", "Banaue", "Palawan (El Nido)", "Cebu", "Bohol", "Siargao"], transport_to_next: "Vlucht Manila/Cebu-Jakarta of Denpasar, doorgaans met overstap in Singapore of Kuala Lumpur" },
    ID: { days: 12, budget: 500, destinations: ["Jakarta", "Yogyakarta", "Borobudur", "Ubud (Bali)", "Gili-eilanden", "Lombok", "Komodo"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Denpasar (Bali) of Jakarta" },
  },
  "Pan-American Grand Tour 🌎": {
    MX: { days: 28, budget: 1000, destinations: ["Ciudad de México", "Oaxaca", "Palenque", "Mérida", "Tulum", "Bacalar", "San Cristóbal de las Casas"], transport_to_next: "Bus over land via de grensovergang La Mesilla/El Carmen naar Huehuetenango, Guatemala." },
    GT: { days: 14, budget: 350, destinations: ["Quetzaltenango (Xela)", "Lake Atitlán", "Antigua", "Ciudad de Guatemala", "Semuc Champey", "Flores & Tikal"], transport_to_next: "Bus over land vanaf Flores naar de grensovergang bij Melchor de Menchos, door naar San Ignacio, Belize." },
    BZ: { days: 8, budget: 450, destinations: ["San Ignacio", "Belize City", "Caye Caulker", "Ambergris Caye (San Pedro)", "Hopkins/Dangriga", "Placencia"], transport_to_next: "Veerboot vanaf Placencia/Dangriga (via Livingston, Guatemala) naar Puerto Cortés, Honduras." },
    HN: { days: 12, budget: 320, destinations: ["Puerto Cortés", "Copán Ruinas", "Lago de Yojoa", "Tegucigalpa", "La Ceiba", "Roatán"], transport_to_next: "Bus over land via de grensovergang El Amatillo naar El Salvador." },
    SV: { days: 8, budget: 220, destinations: ["San Salvador", "Santa Ana", "Cerro Verde & vulkanen", "Ruta de las Flores (Juayúa, Ataco)", "El Tunco", "Suchitoto"], transport_to_next: "Bus over land via Honduras (transit) naar de grensovergang El Espino/Guasaule, richting León, Nicaragua." },
    NI: { days: 14, budget: 320, destinations: ["León", "Managua", "Granada", "Isla de Ometepe", "Laguna de Apoyo", "San Juan del Sur"], transport_to_next: "Bus over land via de grensovergang Peñas Blancas naar Costa Rica." },
    CR: { days: 18, budget: 850, destinations: ["Liberia", "La Fortuna/Arenal", "Monteverde", "Santa Teresa", "Manuel Antonio", "Puerto Viejo de Talamanca"], transport_to_next: "Bus over land via de grensovergang Sixaola/Guabito naar Bocas del Toro, Panama." },
    PA: { days: 12, budget: 500, destinations: ["Bocas del Toro", "Boquete", "Ciudad van Panama", "Casco Viejo", "Panamakanaal", "San Blas-eilanden"], transport_to_next: "Zeilboot (4-5 dagen) via de San Blas-eilanden naar Cartagena, Colombia — geen wegverbinding door de Darién Gap." },
    CO: { days: 35, budget: 1000, destinations: ["Cartagena", "Santa Marta", "Parque Tayrona", "Medellín", "Salento & Koffiezone", "Bogotá", "San Agustín"], transport_to_next: "Bus over land via Pasto naar de grensovergang Ipiales–Tulcán, door naar Quito, Ecuador." },
    EC: { days: 22, budget: 950, destinations: ["Quito", "Otavalo", "Mindo", "Baños", "Cuenca", "Galápagos-eilanden"], transport_to_next: "Bus over land via de grensovergang Huaquillas/Tumbes naar Noord-Peru, richting Máncora." },
    PE: { days: 35, budget: 1050, destinations: ["Máncora", "Huaraz", "Lima", "Ica & Huacachina", "Arequipa", "Cusco & Vallei van de Inca's", "Puno (Titicacameer)"], transport_to_next: "Bus/boot van Puno via de grensovergang Yunguyo of Desaguadero naar Copacabana en La Paz, Bolivia." },
    BO: { days: 20, budget: 400, destinations: ["Copacabana", "La Paz", "Uyuni-zoutvlakte", "Sucre", "Potosí", "Santa Cruz"], transport_to_next: "Jeeptocht via de Uyuni-zoutvlaktetour (3 dagen) over land naar San Pedro de Atacama, Chili." },
    CL: { days: 12, budget: 480, destinations: ["San Pedro de Atacama", "Valle de la Luna", "Valle del Arcoíris", "Antofagasta", "Iquique"], transport_to_next: "Bus over land via de grensovergang Paso de Jama naar Salta/Jujuy, Argentinië." },
    AR: { days: 14, budget: 500, destinations: ["Salta", "Cafayate", "Purmamarca", "Salinas Grandes", "Tilcara", "Humahuaca"], transport_to_next: "Vlucht van Salta (via Buenos Aires) naar Foz do Iguaçu of São Paulo, Brazilië — over land is dit een reis van meerdere dagen." },
    BR: { days: 22, budget: 1000, destinations: ["Foz do Iguaçu (Iguazu-watervallen)", "Curitiba", "Ilha do Mel", "Florianópolis", "São Paulo", "Paraty", "Rio de Janeiro"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Rio de Janeiro (Galeão) of São Paulo (Guarulhos)." },
  },
  "Africa Grand Tour 🌍": {
    EG: { days: 21, budget: 1300, destinations: ["Caïro", "Gizeh", "Dahab", "Luxor", "Nijlcruise/felucca", "Aswan", "Alexandrië"], transport_to_next: "Vlucht Caïro-Addis Abeba, geen directe landroute mogelijk (via Jordanië/Oman verloopt nu via de aparte Ancient Civilizations Expedition)." },
    ET: { days: 18, budget: 1300, destinations: ["Addis Abeba", "Lalibela", "Simien Mountains", "Gondar", "Danakil Depressie", "Omo Valley"], transport_to_next: "Over land via grensovergang Moyale (ruig, meerdaagse busrit), of vlucht Addis Abeba-Nairobi bij twijfel over veiligheid/wegconditie." },
    KE: { days: 18, budget: 2200, destinations: ["Nairobi", "Maasai Mara", "Lake Nakuru", "Amboseli", "Mount Kenya", "Diani Beach/Mombasa"], transport_to_next: "Bus over land Nairobi-Kampala via grensovergang Busia of Malaba, goed begaanbare route." },
    UG: { days: 14, budget: 1800, destinations: ["Kampala", "Jinja", "Kibale Forest", "Queen Elizabeth NP", "Bwindi Impenetrable Forest (gorilla's)", "Murchison Falls"], transport_to_next: "Bus over land Kampala-Kigali via grensovergang Gatuna/Katuna, vlotte verbinding." },
    RW: { days: 8, budget: 1800, destinations: ["Kigali", "Volcanoes NP (gorillatrekking)", "Lake Kivu", "Nyungwe Forest"], transport_to_next: "Over land Kigali-Mwanza via grensovergang Rusumo en bootverbinding over het Victoriameer, of vlucht Kigali-Kilimanjaro/Dar es Salaam." },
    TZ: { days: 24, budget: 2800, destinations: ["Arusha", "Ngorongoro Crater", "Serengeti", "Lake Manyara", "Zanzibar", "Kilimanjaro (regio)", "Dar es Salaam"], transport_to_next: "Vlucht Zanzibar/Dar es Salaam-Antananarivo, geen land- of veerbootverbinding mogelijk." },
    MG: { days: 18, budget: 1400, destinations: ["Antananarivo", "Andasibe-Mantadia", "Avenue of the Baobabs", "Morondava", "Isalo NP", "Nosy Be"], transport_to_next: "Vlucht Antananarivo-Port Louis, geen andere optie beschikbaar." },
    MU: { days: 7, budget: 1000, destinations: ["Port Louis", "Grand Baie", "Black River Gorges NP", "Chamarel", "Île aux Cerfs"], transport_to_next: "Vlucht Port Louis-Lilongwe, meestal met overstap in Johannesburg of Nairobi." },
    MW: { days: 12, budget: 700, destinations: ["Lilongwe", "Lake Malawi (Cape Maclear)", "Liwonde NP", "Zomba Plateau", "Mount Mulanje"], transport_to_next: "Over land via grensovergang Mandimba of Zobwe/Zóbuè richting Mozambique." },
    MZ: { days: 14, budget: 1000, destinations: ["Ilha de Moçambique", "Nampula", "Tofo", "Inhambane", "Bazaruto Archipel", "Maputo"], transport_to_next: "Over land via de Tete-corridor en grensovergang Cassacatiza/Zóbuè richting Zambia." },
    ZM: { days: 14, budget: 1600, destinations: ["Lusaka", "South Luangwa NP", "Lower Zambezi NP", "Livingstone/Victoria Falls"], transport_to_next: "Over land via de grensovergang bij Victoria Falls/Livingstone naar Zimbabwe." },
    ZW: { days: 12, budget: 1100, destinations: ["Victoria Falls", "Hwange NP", "Mana Pools", "Great Zimbabwe", "Bulawayo"], transport_to_next: "Over land via grensovergang Kazungula of Plumtree richting Botswana." },
    BW: { days: 14, budget: 2200, destinations: ["Kasane", "Chobe NP", "Okavango Delta (Maun)", "Makgadikgadi Pans", "Central Kalahari"], transport_to_next: "Over land via grensovergang Mamuno/Buitepos richting Namibië." },
    NA: { days: 18, budget: 1800, destinations: ["Windhoek", "Sossusvlei/Namib-Naukluft", "Swakopmund", "Damaraland", "Etosha NP", "Fish River Canyon"], transport_to_next: "Over land via grensovergang Vioolsdrif/Noordoewer richting Zuid-Afrika (zelf rijden)." },
    ZA: { days: 24, budget: 2000, destinations: ["Kaapstad", "Winelands (Stellenbosch)", "Garden Route", "Addo Elephant Park", "Kruger NP", "Johannesburg", "Drakensberg"], transport_to_next: "Over land de enclave Lesotho in via grensovergang Maseru Bridge (of avontuurlijker via Sani Pass)." },
    LS: { days: 6, budget: 350, destinations: ["Maseru", "Malealea", "Sani Pass/Thaba-Bosiu", "Roma", "Semonkong"], transport_to_next: "Over land terug door Zuid-Afrika naar grensovergang Golela/Lavumisa richting Eswatini." },
    SZ: { days: 5, budget: 300, destinations: ["Mbabane", "Ezulwini Valley", "Mlilwane Wildlife Sanctuary", "Hlane Royal National Park"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit King Mswati III International Airport (Matsapha), eventueel via OR Tambo Johannesburg." },
  },
  "North Africa & Middle East Expedition 🏜️": {
    MA: { days: 12, budget: 550, destinations: ["Casablanca", "Chefchaouen", "Fès", "Atlasgebergte", "Aït Ben Haddou", "Merzouga (Sahara)", "Marrakech", "Essaouira"], transport_to_next: "Vlucht van Marrakech of Casablanca naar Tunis — geen praktische veerbootverbinding, directe vluchten beperkt maar standaard route" },
    TN: { days: 7, budget: 230, destinations: ["Tunis", "Carthago", "Sidi Bou Said", "Dougga", "El Jem", "Tozeur", "Sahara"], transport_to_next: "Vlucht van Tunis naar Caïro — geen praktische land- of veerbootroute vanwege de grenssituatie via Libië" },
    EG: { days: 14, budget: 650, destinations: ["Caïro", "Piramides van Gizeh", "Saqqara", "Luxor", "Karnak", "Vallei der Koningen", "Aswan", "Abu Simbel"], transport_to_next: "Veerboot van Nuweiba naar Aqaba (alternatief: vlucht Caïro–Amman)" },
    JO: { days: 8, budget: 500, destinations: ["Wadi Rum", "Petra", "Dana Biosphere Reserve", "Dode Zee", "Amman", "Jerash"], transport_to_next: "Vlucht van Amman naar Muscat — geen landroute, aangezien overland via Saoedi-Arabië visumtechnisch onpraktisch is" },
    OM: { days: 7, budget: 600, destinations: ["Muscat", "Nizwa", "Jebel Akhdar", "Wahiba Sands", "Wadi Shab", "Sur"], transport_to_next: "Over land naar de Verenigde Arabische Emiraten via de grensovergang bij Hatta — eenvoudige doorreis, geen visum nodig" },
    AE: { days: 5, budget: 700, destinations: ["Hatta", "Dubai", "Woestijn", "Abu Dhabi"], transport_to_next: "Vlucht van Dubai naar Larnaca — geen directe verbinding over land of zee" },
    CY: { days: 5, budget: 450, destinations: ["Larnaca", "Nicosia", "Troodos Mountains", "Paphos"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Larnaca" },
  },
  "Nordic Arctic Expedition ❄️": {
    FI: { days: 6, budget: 900, destinations: ["Helsinki", "Rovaniemi", "Inari", "Lemmenjoki National Park"], transport_to_next: "Trein of bus van Rovaniemi naar Kiruna (over land, via Zweeds Lapland)" },
    SE: { days: 5, budget: 800, destinations: ["Kiruna", "Sami-cultuur", "Abisko National Park"], transport_to_next: "Trein Kiruna–Narvik (Malmbanan/Ofotbanen, over land, spectaculaire bergroute)" },
    NO: { days: 12, budget: 1800, destinations: ["Narvik", "Lofoten", "Senja", "Tromsø", "Noordkaap"], transport_to_next: "Vlucht vanaf Tromsø naar Longyearbyen (enige realistische verbinding naar Svalbard)" },
    SJ: { days: 6, budget: 2800, destinations: ["Longyearbyen", "Bootexpedities", "Gletsjers", "Wildlife", "Middernachtzon"], transport_to_next: "Vlucht via Oslo naar Kopenhagen, aansluitend naar Vágar (Faeröer) — geen directe verbinding, dus omweg nodig" },
    FO: { days: 5, budget: 1200, destinations: ["Tórshavn", "Saksun", "Gjógv", "Kliffen", "Wandelroutes"], transport_to_next: "Korte vlucht Vágar–Reykjavik (of seizoensgebonden veerboot Smyril Line, alleen in zomer)" },
    IS: { days: 12, budget: 2400, destinations: ["Reykjavik", "Golden Circle", "Zuidkust", "Vatnajökull", "Jökulsárlón", "Snæfellsnes", "Akureyri"], transport_to_next: "Vlucht Reykjavik–Ilulissat (via Nuuk), geen veerverbinding mogelijk" },
    GL: { days: 7, budget: 2600, destinations: ["Nuuk", "Inuitcultuur", "Ilulissat", "IJsfjord", "Disko Bay", "Boottochten"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Nuuk (via Reykjavik of Kopenhagen)" },
  },
  "Patagonia & Antarctica Expedition 🧊": {
    CL: { days: 15, budget: 2000, destinations: ["Chiloé Island", "Puerto Montt", "Carretera Austral (Pumalín & Queulat)", "Puerto Río Tranquilo & Marble Caves", "Cerro Castillo", "Puerto Natales", "Torres del Paine National Park", "Punta Arenas"], transport_to_next: "Overland per bus vanaf Puerto Natales naar El Calafate (grensovergang Chili-Argentinië, ca. 5-6 uur)" },
    AR: { days: 11, budget: 1450, destinations: ["El Calafate", "Perito Moreno Glacier", "El Chaltén", "Fitz Roy & Laguna de los Tres", "Cerro Torre", "Ushuaia", "Tierra del Fuego National Park", "Beagle Channel"], transport_to_next: "Inschepen in Ushuaia voor de expeditiecruise — oversteek van de Drake Passage (ca. 2 dagen varen)" },
    AQ: { days: 11, budget: 9500, destinations: ["Expedition Cruise from Ushuaia", "South Shetland Islands", "Antarctic Peninsula", "Glaciers & Icebergs", "Penguin colonies", "Whales", "Return to Ushuaia"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Ushuaia" },
  },
  "India & Himalaya Expedition 🏔️": {
    IN: { days: 26, budget: 1100, destinations: ["Delhi", "Agra & Jaipur (Golden Triangle)", "Pushkar, Jodhpur & Jaisalmer (West-Rajasthan)", "Udaipur", "Amritsar", "Dharamshala & Manali", "Rishikesh", "Varanasi"], transport_to_next: "Bus/trein naar Sunauli en te voet de grensovergang naar Belahiya (Nepal), dan bus door naar Lumbini/Pokhara — alternatief: korte vlucht Varanasi-Kathmandu" },
    NP: { days: 17, budget: 800, destinations: ["Lumbini", "Chitwan National Park", "Pokhara", "Annapurna Region", "Kathmandu", "Patan", "Bhaktapur"], transport_to_next: "Vlucht Kathmandu-Paro (spectaculaire Himalaya-vlucht, alleen door Drukair of Bhutan Airlines uitgevoerd, Bhutan-visum/permit vooraf regelen)" },
    BT: { days: 7, budget: 2000, destinations: ["Paro", "Thimphu", "Dochula Pass", "Punakha", "Bumthang (optioneel)", "Tiger's Nest Monastery"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Paro International Airport" },
  },
};

/** Looks up the seeded content for one country within one expedition — {code, name, days, budget, destinations, transport_to_next}. */
function rbContentFor(routeName, code, name) {
  const c = (RB_EXPEDITION_CONTENT[routeName] || {})[code] || {};
  return { code, name, days: c.days, budget: c.budget, destinations: c.destinations, transport_to_next: c.transport_to_next };
}

function rbSeedPredefinedExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY, '1');

  const eurasia = (code, name) => rbContentFor('Eurasia Grand Tour 🌏', code, name);
  const eurasiaRoute = rbBuildSeedRoute('Eurasia Grand Tour 🌏', [
    { name: 'Balkans', countries: [eurasia('BA', 'Bosnia and Herzegovina'), eurasia('HR', 'Croatia'), eurasia('ME', 'Montenegro'), eurasia('AL', 'Albania'), eurasia('MK', 'North Macedonia')] },
    { name: 'Turkey', countries: [eurasia('TR', 'Turkey')] },
    { name: 'Caucasus', countries: [eurasia('GE', 'Georgia'), eurasia('AM', 'Armenia'), eurasia('AZ', 'Azerbaijan')] },
    { name: 'Central Asia', countries: [eurasia('KZ', 'Kazakhstan'), eurasia('KG', 'Kyrgyzstan'), eurasia('TJ', 'Tajikistan'), eurasia('UZ', 'Uzbekistan'), eurasia('TM', 'Turkmenistan')] },
    { name: 'China', countries: [eurasia('CN', 'China')] },
    { name: 'Mongolia', countries: [eurasia('MN', 'Mongolia')] },
    { name: 'Japan', countries: [eurasia('JP', 'Japan')] },
    { name: 'Taiwan', countries: [eurasia('TW', 'Taiwan')] },
    { name: 'Mainland Southeast Asia', countries: [eurasia('VN', 'Vietnam'), eurasia('LA', 'Laos'), eurasia('KH', 'Cambodia'), eurasia('TH', 'Thailand'), eurasia('MM', 'Myanmar')] },
    { name: 'Maritime Southeast Asia', countries: [eurasia('MY', 'Malaysia'), eurasia('SG', 'Singapore'), eurasia('BN', 'Brunei'), eurasia('PH', 'Philippines')] },
    { name: 'Indonesia', countries: [eurasia('ID', 'Indonesia')] },
  ], {
    description: 'Overland route across Eurasia, region by region — from the Balkans through the Caucasus and Central Asia to East and Southeast Asia.',
    notes: 'Imported from a ChatGPT brainstorm — country lists per region are a reasonable starting point, adjust freely. Some countries here (parts of the Balkans, Maritime SE Asia) may already be visited or planned in your Trips sheet — worth cross-checking and possibly reusing as Block Library items instead.',
  });

  const panAm = (code, name) => rbContentFor('Pan-American Grand Tour 🌎', code, name);
  const panAmRoute = rbBuildSeedRoute('Pan-American Grand Tour 🌎', [
    { name: 'Mexico', countries: [panAm('MX', 'Mexico')] },
    { name: 'Northern Central America', countries: [panAm('GT', 'Guatemala'), panAm('BZ', 'Belize'), panAm('HN', 'Honduras'), panAm('SV', 'El Salvador')] },
    { name: 'Southern Central America', countries: [panAm('NI', 'Nicaragua'), panAm('CR', 'Costa Rica'), panAm('PA', 'Panama')] },
    { name: 'Colombia', countries: [panAm('CO', 'Colombia')] },
    { name: 'Ecuador', countries: [panAm('EC', 'Ecuador')] },
    { name: 'Peru', countries: [panAm('PE', 'Peru')] },
    { name: 'Bolivia', countries: [panAm('BO', 'Bolivia')] },
    { name: 'Northern Chile', countries: [panAm('CL', 'Chile')], note: 'Northern Chile only (Atacama, Antofagasta) — Patagonia is a separate future expedition.' },
    { name: 'Northern Argentina', countries: [panAm('AR', 'Argentina')], note: 'Northern Argentina only (Salta, Jujuy) — Patagonia is a separate future expedition.' },
    { name: 'Southern Brazil', countries: [panAm('BR', 'Brazil')], note: 'Southern Brazil only — Northern Brazil is a separate future expedition.' },
  ], {
    best_starting_month: 'November',
    description: 'Climate-optimized route down the Americas, from Mexico to southern Brazil.',
    notes: 'Best started around November 1st (pick your target year and fill in the exact start date above). Patagonia, Antarctica, Northern Brazil, Suriname and the Caribbean are intentionally excluded — planned as separate future expeditions. Imported from a ChatGPT brainstorm — adjust country lists/regions as needed.',
  });

  rbRoutes.push(eurasiaRoute, panAmRoute);
  rbSave();
}

function rbSeedMEAExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_MEA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_MEA, '1');

  const mea = (code, name) => rbContentFor('Africa Grand Tour 🌍', code, name);
  const meaRoute = rbBuildFlatSeedRoute('Africa Grand Tour 🌍', [
    mea('EG', 'Egypt'), mea('ET', 'Ethiopia'), mea('KE', 'Kenya'),
    mea('UG', 'Uganda'), mea('RW', 'Rwanda'), mea('TZ', 'Tanzania'), mea('MG', 'Madagascar'), mea('MU', 'Mauritius'),
    mea('MW', 'Malawi'), mea('MZ', 'Mozambique'), mea('ZM', 'Zambia'), mea('ZW', 'Zimbabwe'), mea('BW', 'Botswana'),
    mea('NA', 'Namibia'), mea('ZA', 'South Africa'), mea('LS', 'Lesotho'), mea('SZ', 'Eswatini'),
  ], {
    description: 'Overland route through East Africa, the islands, and Southern Africa, with Egypt as the northern gateway. Target duration ~12 months.',
    notes: 'Imported from a ChatGPT brainstorm — deliberately seeded with zero blocks (unlike Eurasia/Pan-American): group these 17 countries into your own blocks (e.g. East Africa, Islands, Southern Africa, South Africa finale) via the region dropdown on each country, in whatever shape makes sense once you plan it for real. Jordan and Oman used to be part of this route but were moved to Ancient Civilizations Expedition so this stays purely African + Egypt as the historical/geographic gateway; Egypt itself still appears in both since it fits both themes. South Africa is already marked "visited" in your Countries sheet — worth checking before treating it as new.',
  });

  rbRoutes.push(meaRoute);
  rbSave();
}

function rbSeedAncientCivilizationsExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_ANCIENT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_ANCIENT, '1');

  const ancient = (code, name) => rbContentFor('North Africa & Middle East Expedition 🏜️', code, name);
  const ancientRoute = rbBuildFlatSeedRoute('North Africa & Middle East Expedition 🏜️', [
    ancient('MA', 'Morocco'), ancient('TN', 'Tunisia'), ancient('EG', 'Egypt'), ancient('JO', 'Jordan'),
    ancient('OM', 'Oman'), ancient('AE', 'United Arab Emirates'), ancient('CY', 'Cyprus'),
  ], {
    notes: 'Seeded with zero blocks — group these 7 countries into your own blocks via the region dropdown on each country whenever you\'re ready to plan it for real.',
  });

  rbRoutes.push(ancientRoute);
  rbSave();
}

function rbSeedArcticCircleExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_ARCTIC)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_ARCTIC, '1');

  const arctic = (code, name) => rbContentFor('Nordic Arctic Expedition ❄️', code, name);
  const arcticRoute = rbBuildFlatSeedRoute('Nordic Arctic Expedition ❄️', [
    arctic('FI', 'Finland'), arctic('SE', 'Sweden'), arctic('NO', 'Norway'), arctic('SJ', 'Svalbard'),
    arctic('FO', 'Faroe Islands'), arctic('IS', 'Iceland'), arctic('GL', 'Greenland'),
  ], {
    notes: 'Imported from a ChatGPT brainstorm — seeded with zero blocks: group these 7 countries into your own blocks via the region dropdown whenever you\'re ready to plan it for real. Svalbard and the Faroe Islands may not yet appear in the Countries sheet dropdown — cosmetic only, the block still works. Several legs (Svalbard, Faroe, Iceland, Greenland) are flight-only hops rather than one continuous overland trip.',
  });

  rbRoutes.push(arcticRoute);
  rbSave();
}

function rbSeedPatagoniaAntarcticaExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_PATAGONIA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_PATAGONIA, '1');

  const patagonia = (code, name) => rbContentFor('Patagonia & Antarctica Expedition 🧊', code, name);
  const patagoniaRoute = rbBuildFlatSeedRoute('Patagonia & Antarctica Expedition 🧊', [
    patagonia('CL', 'Chile'), patagonia('AR', 'Argentina'), patagonia('AQ', 'Antarctica'),
  ], {
    notes: 'Imported from a ChatGPT brainstorm — seeded with zero blocks: group these 3 countries into your own blocks via the region dropdown whenever you\'re ready to plan it for real. Chile and Argentina here are the southern (Patagonia) portions — the northern portions already appear in Pan-American Grand Tour. Antarctica may not yet appear in the Countries sheet dropdown — cosmetic only, the block still works. The Antarctica budget reflects a real expedition-cruise price, not a backpacker estimate.',
  });

  rbRoutes.push(patagoniaRoute);
  rbSave();
}

function rbSeedHimalayaIndiaExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_HIMALAYA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_HIMALAYA, '1');

  const himalaya = (code, name) => rbContentFor('India & Himalaya Expedition 🏔️', code, name);
  const himalayaRoute = rbBuildFlatSeedRoute('India & Himalaya Expedition 🏔️', [
    himalaya('IN', 'India'), himalaya('NP', 'Nepal'), himalaya('BT', 'Bhutan'),
  ], {
    notes: 'Imported from a ChatGPT brainstorm — seeded with zero blocks: group these 3 countries into your own blocks via the region dropdown whenever you\'re ready to plan it for real.',
  });

  rbRoutes.push(himalayaRoute);
  rbSave();
}

/**
 * North America Grand Traverse is a single-country-pair route (Canada then the US) built from
 * six legs rather than six different countries, so it's seeded directly here instead of through
 * RB_EXPEDITION_CONTENT — that table is keyed one-entry-per-country-code per route, which can't
 * hold four distinct Canada legs and two distinct US legs at once.
 */
function rbSeedNorthAmericaExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_NORTHAMERICA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_NORTHAMERICA, '1');

  const northAmericaRoute = rbBuildSeedRoute('North America Grand Traverse 🌎', [
    {
      name: 'Atlantic Canada – Nova Scotia',
      season: 'Juni',
      budget: 900,
      countries: [{
        code: 'CA', name: 'Canada', days: 6, budget: 900,
        destinations: ['Halifax', "Peggy's Cove", 'Lunenburg', 'Cape Breton Island & Cabot Trail'],
        transport_to_next: "Vlucht Halifax-Quebec City (~2 uur) — geen praktische overlandroute gezien de afstand door onbewoond Oost-Canada",
        notes: 'Startblok: vlucht Nederland-Halifax. Kennismaking met Canada via ruige Atlantische kust, vissersdorpjes, vuurtorens en Keltisch/Acadische cultuur op Cape Breton.',
      }],
      note: 'Startpunt van de expeditie — vlucht Nederland-Halifax. Ruige kust, vissersdorpen en vuurtorens; geen huurauto nodig, alles is met kleine afstanden te doen vanuit Halifax.',
    },
    {
      name: 'Eastern Canada – Historic Cities',
      season: 'Juni',
      budget: 1500,
      countries: [{
        code: 'CA', name: 'Canada', days: 9, budget: 1500,
        destinations: ['Quebec City (Vieux-Québec)', 'Montreal (Old Port & Mile End)', 'Ottawa (Parliament Hill & musea)', 'Toronto (skyline, met Niagara Falls als dagtrip)'],
        transport_to_next: "Trein (Via Rail) Quebec City-Montreal-Ottawa-Toronto, daarna vlucht Toronto-Calgary (~4 uur) om de huurauto voor de Rockies op te halen",
        notes: 'Geen lange autorit door Canada: de treinverbindingen tussen deze vier steden zijn snel en comfortabel. Franse cultuur en koloniale geschiedenis in Quebec City, eten en moderne stad in Montreal, politiek en musea in Ottawa, skyline en Niagara Falls vanuit Toronto.',
      }],
      note: 'Reizen per trein, geen huurauto in dit blok. Niagara Falls is een optionele dagtrip vanuit Toronto, geen apart blok.',
    },
    {
      name: 'Canadian Rockies',
      season: 'Juni-Juli',
      budget: 2600,
      countries: [{
        code: 'CA', name: 'Canada', days: 13, budget: 2600,
        destinations: ['Banff National Park', 'Lake Louise & Moraine Lake', 'Yoho National Park (Emerald Lake)', 'Icefields Parkway', 'Jasper National Park', 'Mount Robson Provincial Park', 'Whistler'],
        transport_to_next: 'Auto Whistler-Vancouver (~2 uur), huurauto inleveren in Vancouver — dezelfde huurauto blijft binnen Canada, dus geen one-way- of grenskosten',
        notes: 'Het natuurhoogtepunt van de hele expeditie: gletsjermeren, een van de mooiste wegen ter wereld (Icefields Parkway) en goede kans op wildlife (elanden, beren, bighorn sheep). Huurauto 2 wordt hier opgehaald in Calgary.',
      }],
      note: 'Huurauto 2 (Calgary-Vancouver). Reken op minstens 2-3 nachten per nationaal park om ook te kunnen wandelen, niet alleen doorrijden.',
    },
    {
      name: 'Vancouver',
      season: 'Juli',
      budget: 700,
      countries: [{
        code: 'CA', name: 'Canada', days: 4, budget: 700,
        destinations: ['Stanley Park', 'Granville Island', 'North Shore (Grouse Mountain / Capilano Suspension Bridge)', 'Gastown & Kitsilano Beach'],
        transport_to_next: "Trein (Amtrak Cascades) of bus Vancouver-Seattle (~4 uur) — eenvoudige grensovergang; in Seattle wordt huurauto 3 voor de VS-roadtrip opgehaald",
        notes: 'Laatste Canadese stop: stad tussen bergen en zee, goed te combineren met bergen (North Shore) en water (Stanley Park, Granville Island) zonder huurauto.',
      }],
      note: 'Geen huurauto nodig in Vancouver zelf. Onderzoek trein vs. bus vs. korte vlucht naar Seattle — trein is het meest schilderachtig en simpelst qua grens.',
    },
    {
      name: 'Pacific Northwest & Northern California Roadtrip',
      season: 'Juli-Augustus',
      budget: 2200,
      countries: [{
        code: 'US', name: 'United States', days: 11, budget: 2200,
        destinations: ['Seattle (Pike Place Market, Space Needle)', 'Olympic National Park (Hoh Rainforest & Hurricane Ridge)', 'Mount Rainier National Park', 'Oregon Coast (Cannon Beach, Astoria)', 'Redwood National & State Parks'],
        transport_to_next: 'Auto verder naar San Francisco (~5-6 uur vanaf de Redwoods), huurauto inleveren in San Francisco',
        notes: 'Amerikaanse natuur in het groot: regenwoud, vulkanen, ruige kustlijn en de hoogste bomen ter wereld. Huurauto 3 wordt hier opgehaald in Seattle.',
      }],
      note: 'Huurauto 3 (Seattle-San Francisco). Rustig tempo: liever 2-3 nachten bij een park dan elke dag doorrijden — dit is een kustroute, geen race.',
    },
    {
      name: 'California Finale',
      season: 'Augustus',
      budget: 2100,
      countries: [{
        code: 'US', name: 'United States', days: 11, budget: 2100,
        destinations: ['San Francisco (Golden Gate Bridge, Alcatraz, Mission District)', 'Yosemite Valley', 'Sequoia & Kings Canyon National Parks'],
        transport_to_next: 'Einde van de expeditie — terugvlucht vanuit San Francisco (SFO) naar Nederland',
        notes: "Van de stad direct de bergen in: Yosemite's granieten wanden en watervallen, gevolgd door de gigantische sequoia's van Sequoia/Kings Canyon. Geen nieuwe huurauto nodig — dagtochten of een korte huurperiode volstaan vanuit San Francisco.",
      }],
      note: 'Boek Yosemite Valley-verblijf ruim van tevoren (vergunt beperkt aantal plekken in hoogseizoen). Let op bosbrandrisico/luchtkwaliteit in augustus — check actuele parkmeldingen vlak voor vertrek.',
    },
  ], {
    travel_style: "Backpacker/budget-comfort hybride — hostels, eenvoudige hotels en cabins, huurauto's alleen waar ze echt waarde toevoegen (Rockies, Pacific Northwest, Californië), rustig tempo met langere stops op mooie plekken in plaats van dagelijks verplaatsen.",
    best_starting_month: 'June',
    description: "Grote Noord-Amerika-expeditie die Atlantic Canada, de historische Oost-Canadese steden, de Canadian Rockies, Vancouver en een West-Amerikaanse kust-roadtrip tot en met Californië combineert — natuur, nationale parken, wildlife, historische steden, kustgebieden en roadtripgevoel in één doorlopende route van oost naar west.",
    climate_summary: 'Vergeleken scenario\'s: (1) mei-juni loopt risico op restsneeuw en gesloten passen/wegen in de Rockies (Icefields Parkway, hooggelegen hikes) en een nog fris/mistig Nova Scotia; (2) juni-juli vermijdt beide en blijft ruim vóór de piek van het Californische/Pacific Northwest bosbrandseizoen (vooral augustus-oktober) en vóór het Atlantische orkaanseizoen dat richting Nova Scotia in augustus-oktober oploopt; (3) september geeft mooie herfstkleuren (Rockies-lariksen, Oost-Canada) maar verhoogt het risico op vroege sneeuw/wegsluitingen in de Rockies en valt samen met een groter deel van het orkaan- en bosbrandseizoen. Beste keuze: start begin juni in Nova Scotia, zodat de expeditie (6-8 weken) eindigt in Californië rond eind juli/begin augustus — nog vóór het zwaarste bosbrand- en orkaanseizoen, met open bergpassen en lange dagen voor de roadtrip-etappes.',
    notes: 'Ingevuld vanuit een ChatGPT-brainstorm, uitgewerkt en gestructureerd door Claude in dezelfde stijl als de andere grote reizen.\n\n' +
      'Transportstrategie (bewust 3 losse huurauto\'s + 1 treinetappe i.p.v. één grote huurauto): Huurauto 1 blijft binnen Nova Scotia (rondrit terug naar Halifax, geen one-way-kosten). Oost-Canadese steden per trein (Via Rail), geen auto nodig. Huurauto 2 van Calgary naar Vancouver (blijft in Canada, geen grenscomplicaties). Huurauto 3 van Seattle naar San Francisco (blijft in de VS). Zo worden dure one-way-fees, een grensoverschrijdende huurauto (CA/VS grensregels voor huurauto\'s zijn vaak beperkt of duur) en onnodige kilometers vermeden.\n\n' +
      'Budgetindicatie (6-8 weken): solo ca. €9.000-10.000, met 3 personen ca. €6.500-7.500 per persoon. Richting verdeling: vluchten €900-1.500 (internationale vluchten + Halifax-Quebec + Toronto-Calgary), auto\'s + benzine solo €2.500-3.500 (gedeeld €900-1.300 p.p.), accommodatie €2.000-2.800, eten €1.800-2.500, activiteiten/parkfees €500-1.000. De 6 blok-budgetten hierboven (900+1.500+2.600+700+2.200+2.100 = €10.000) volgen deze verdeling voor de solo-variant.\n\n' +
      'Voordelen: unieke combinatie van Atlantische kust, Franse/koloniale steden, wereldberoemde bergnatuur, Pacific-kustlijn en Californische parken in één samenhangende expeditie; backpacker-tempo met ruimte om langer te blijven op hoogtepunten; auto alleen ingezet waar die echt waarde toevoegt.\n' +
      'Nadelen: drie aparte huurauto-etappes vragen meer planning dan één doorlopende huurauto; hoog totaalbudget vergeleken met andere blokken (Noord-Amerika is duurder dan bv. Zuidoost-Azië of de Balkan); juli-augustus is hoogseizoen in de Rockies en Californische parken (drukte, hogere prijzen, Yosemite-vergunningen tijdig regelen).\n\n' +
      'Plaats binnen de wereldreisplanning: vult Noord-Amerika in naast Eurasia Grand Tour, Pan-American Grand Tour, Africa Grand Tour en de Pacific/overige routes — samen dekken deze de grote continentale blokken van de wereldreis. Dagen/budget/bestemmingen/transport hierboven zijn een eerste research-opzet (net als bij de andere expedities), nog niet getoetst aan actuele prijzen, grensregels of persoonlijke voorkeuren — behandel dit als een eerste concept om te verfijnen, geen boekbaar plan.',
  });

  rbRoutes.push(northAmericaRoute);
  rbSave();
}

/**
 * Backbone-only expeditions: name, emoji and an empty block list, seeded so they show up in the
 * route list ready to receive country blocks once the countries/islands for each are decided.
 */
function rbSeedOceaniaExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_OCEANIA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_OCEANIA, '1');

  const oceaniaRoute = rbBuildFlatSeedRoute('Oceania Grand Expedition 🌊', [], {
    notes: "Backbone only — no countries/islands decided yet. Add blocks yourself via the country dropdown (or type a custom entry if a Pacific island nation isn't in the Countries sheet) once you've picked which of Polynesia/Melanesia/Micronesia — and possibly Australia/New Zealand — to include.",
  });

  rbRoutes.push(oceaniaRoute);
  rbSave();
}

function rbSeedCaribbeanExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_CARIBBEAN)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_CARIBBEAN, '1');

  const caribbeanRoute = rbBuildFlatSeedRoute('Caribbean Expedition 🏝️', [], {
    notes: "Backbone only — no islands decided yet. Add blocks yourself via the country dropdown once you've picked which islands to include.",
  });

  rbRoutes.push(caribbeanRoute);
  rbSave();
}

function rbSeedWestCentralAfricaExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_WCAFRICA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_WCAFRICA, '1');

  const wcAfricaRoute = rbBuildFlatSeedRoute('West & Central Africa Expedition 🌍', [], {
    notes: "Backbone only — no countries decided yet. Add blocks yourself via the country dropdown once you've picked which West/Central African countries to include.",
  });

  rbRoutes.push(wcAfricaRoute);
  rbSave();
}

/**
 * One-time rename + restructure for expeditions already seeded into a browser before this round
 * of feedback: renames three expeditions, and splits Jordan/Oman out of the Africa route into
 * Ancient Civilizations Expedition (which already has its own JO/OM entries). Runs once, only
 * touches routes whose name still matches the old value, and no-ops entirely for a browser that's
 * never seeded before (fresh seeds already use the new names/countries directly).
 */
function rbMigrateExpeditionRenames() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07, '1');

  const renames = {
    'Middle East & Africa Expedition': 'Africa Grand Tour',
    'Arctic Circle Expedition': 'Nordic Arctic Expedition',
    'Himalaya & India Expedition': 'India & Himalaya Expedition',
  };

  let changed = false;
  rbRoutes.forEach(route => {
    if (renames[route.name]) {
      route.name = renames[route.name];
      changed = true;
    }
    if (route.name === 'Africa Grand Tour') {
      const before = route.blocks.length;
      route.blocks = route.blocks.filter(b => b.country_code !== 'JO' && b.country_code !== 'OM');
      if (route.blocks.length !== before) changed = true;
    }
  });

  if (changed) rbSave();
}

/**
 * One-time follow-up rename round: adds the emoji suffix to every expedition name, and renames
 * "Ancient Civilizations Expedition" to the clearer "North Africa & Middle East Expedition 🏜️"
 * (same countries, just a name that says which region it actually covers). Keyed on the names as
 * they existed right before this round, so it correctly picks up routes whether they went through
 * rbMigrateExpeditionRenames() first (in the same page load) or were already on the intermediate
 * names from a previous visit. No-ops for a browser that's never seeded before — fresh seeds
 * already use the final emoji names directly.
 */
function rbMigrateExpeditionEmojiNames() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_EMOJI)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_EMOJI, '1');

  const renames = {
    'Eurasia Grand Tour': 'Eurasia Grand Tour 🌏',
    'Pan-American Grand Tour': 'Pan-American Grand Tour 🌎',
    'Africa Grand Tour': 'Africa Grand Tour 🌍',
    'North America Grand Traverse': 'North America Grand Traverse 🌎',
    'India & Himalaya Expedition': 'India & Himalaya Expedition 🏔️',
    'Patagonia & Antarctica Expedition': 'Patagonia & Antarctica Expedition 🧊',
    'Nordic Arctic Expedition': 'Nordic Arctic Expedition ❄️',
    'Ancient Civilizations Expedition': 'North Africa & Middle East Expedition 🏜️',
  };

  let changed = false;
  rbRoutes.forEach(route => {
    if (renames[route.name]) {
      route.name = renames[route.name];
      changed = true;
    }
  });

  if (changed) rbSave();
}

/**
 * One-time patch that fills in days/budget/destinations/transport_to_next for every block of
 * every seeded expedition already in localStorage, using RB_EXPEDITION_CONTENT. Only touches
 * fields that are still empty, so any manual edits you've already made are left alone. This
 * covers routes seeded before this content existed — fresh seeds get it directly via rbContentFor.
 */
function rbPatchExpeditionContent() {
  if (localStorage.getItem(RB_CONTENT_PATCH_FLAG)) return;
  localStorage.setItem(RB_CONTENT_PATCH_FLAG, '1');

  rbRoutes.forEach(route => {
    const content = RB_EXPEDITION_CONTENT[route.name];
    if (!content) return;

    route.blocks.forEach(block => {
      const c = content[block.country_code];
      if (!c) return;
      if (block.days === '' || block.days == null) block.days = c.days;
      if (block.budget === '' || block.budget == null) block.budget = c.budget;
      if (!block.transport_to_next) block.transport_to_next = c.transport_to_next;
      if (!block.destinations || !block.destinations.length) {
        block.destinations = (c.destinations || []).map(d => ({ id: rbNewDestId(), name: d, notes: '' }));
      }
    });
  });

  rbSave();
}
