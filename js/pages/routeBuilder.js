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
const RB_MIGRATE_FLAG_2026_07_MEDITERRANEAN = 'atlas_grand_trips_migrate_2026_07_mediterranean_v1';
const RB_CONTENT_PATCH_FLAG = 'atlas_grand_trips_content_patch_v1';
const RB_MIGRATE_FLAG_2026_07_TIMEAUDIT = 'atlas_grand_trips_migrate_2026_07_timeaudit_v1';
const RB_MIGRATE_FLAG_2026_07_BUDGET_REGIONS = 'atlas_grand_trips_migrate_2026_07_budget_regions_v1';
const RB_MIGRATE_FLAG_2026_07_EURASIA_COUNTRIES = 'atlas_grand_trips_migrate_2026_07_eurasia_countries_v1';
const RB_MIGRATE_FLAG_2026_07_OCEANIA_BUILD = 'atlas_grand_trips_migrate_2026_07_oceania_build_v1';
const RB_MIGRATE_FLAG_2026_07_CARIBBEAN_AMAZON_BUILD = 'atlas_grand_trips_migrate_2026_07_caribbean_amazon_build_v1';
const RB_MIGRATE_FLAG_2026_07_WCAFRICA_BUILD = 'atlas_grand_trips_migrate_2026_07_wcafrica_build_v1';
const RB_MIGRATE_FLAG_2026_07_ANGOLA_ADDITION = 'atlas_grand_trips_migrate_2026_07_angola_addition_v1';
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
  rbMigrateAncientToMediterranean();
  rbPatchExpeditionContent();
  rbMigrateTimeAuditCorrections();
  rbMigrateBudgetAndRegionCorrections();
  rbMigrateEurasiaCountryChanges();
  rbMigrateOceaniaExpeditionBuild();
  rbMigrateCaribbeanAmazonBuild();
  rbMigrateWestCentralAfricaBuild();
  rbMigrateAngolaIntoAfricaGrandTour();
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
    BA: { days: 7, budget: 350, destinations: ["Sarajevo", "Mostar", "Blagaj", "Trebinje"], transport_to_next: "Bus over land (Mostar/Sarajevo naar Dubrovnik of Split), rechtstreekse grensovergang, geen visum nodig" },
    HR: { days: 14, budget: 1225, destinations: ["Dubrovnik", "Split", "Hvar", "Plitvicemeren", "Zagreb"], transport_to_next: "Bus langs de kust Dubrovnik-Kotor, korte grensovergang, drukte mogelijk in hoogseizoen" },
    ME: { days: 7, budget: 450, destinations: ["Kotor", "Perast", "Budva", "Durmitor NP"], transport_to_next: "Bus Kotor/Podgorica naar Tirana of Shkodër, over land, eenvoudige grensovergang" },
    AL: { days: 10, budget: 500, destinations: ["Shkodër", "Tirana", "Berat", "Gjirokastër", "Sarandë"], transport_to_next: "Bus Tirana-Ohrid of Tirana-Skopje, over land, meerdere uren" },
    MK: { days: 7, budget: 325, destinations: ["Ohrid", "Bitola", "Skopje"], transport_to_next: "Vlucht Skopje-Istanbul (bus zou via Bulgarije/Griekenland >20 uur duren, vlucht is realistischer)" },
    TR: { days: 24, budget: 1300, destinations: ["Istanbul", "Cappadocië", "Pamukkale", "Antalya", "Efeze", "Ankara", "Kars/Trabzon"], transport_to_next: "Bus of trein vanaf Kars/Trabzon naar Tbilisi, grensovergang bij Posof/Sarpi, geen visum nodig voor Georgië" },
    GE: { days: 13, budget: 650, destinations: ["Tbilisi", "Kazbegi", "Sighnaghi", "Kutaisi", "Mestia (Svaneti)", "Batumi"], transport_to_next: "Marshrutka (deelbusje) Tbilisi-Yerevan, over land, eenvoudige grensovergang, geen visum nodig" },
    AM: { days: 8, budget: 400, destinations: ["Yerevan", "Khor Virap", "Lake Sevan", "Dilijan", "Tatev"], transport_to_next: "Geen directe grens (gesloten wegens conflict) — terugreizen via Georgië (Tbilisi) naar Baku, over land plus korte vlucht of bus" },
    AZ: { days: 7, budget: 425, destinations: ["Baku", "Gobustan", "Sheki", "Qabala"], transport_to_next: "Vlucht Baku-Almaty (de veerboot over de Kaspische Zee Baku-Aktau heeft geen vast schema en is onbetrouwbaar)" },
    KZ: { days: 12, budget: 750, destinations: ["Almaty", "Charyn Canyon", "Turkistan", "Shymkent", "Nur-Sultan"], transport_to_next: "Bus of deeltaxi Almaty-Bishkek, over land, drukke maar eenvoudige grensovergang" },
    KG: { days: 12, budget: 600, destinations: ["Bishkek", "Issyk-Kul", "Karakol", "Song-Kul", "Osh"], transport_to_next: "Deeljeep over de Pamir Highway Osh-Khorog, over land, ruw traject, GBAO-permit/visum voor Tadzjikistan nodig" },
    TJ: { days: 14, budget: 700, destinations: ["Khorog", "Pamir Highway", "Murghab", "Iskanderkul", "Dushanbe"], transport_to_next: "Bus of deeltaxi Dushanbe-Samarkand, over land, grensovergang kan tijdrovend zijn" },
    UZ: { days: 11, budget: 550, destinations: ["Tashkent", "Samarkand", "Bukhara", "Khiva"], transport_to_next: "Vlucht Tasjkent-Ürümqi (rechtstreekse verbinding; door het schrappen van Turkmenistan als tussenstop is dit nu de praktische route naar China)" },
    CN: { days: 28, budget: 1625, destinations: ["Kashgar", "Ürümqi", "Xi'an", "Chengdu", "Beijing", "Shanghai"], transport_to_next: "Trein Beijing-Ulaanbaatar (Trans-Mongolië-route), over land, visum voor Mongolië nodig" },
    MN: { days: 10, budget: 575, destinations: ["Ulaanbaatar", "Terelj NP", "Kharkhorin", "Gobiwoestijn"], transport_to_next: "Vlucht Ulaanbaatar-Tokyo (via Beijing/Seoul, geen directe vlucht en geen landroute mogelijk)" },
    JP: { days: 18, budget: 2700, destinations: ["Tokyo", "Hakone/Fuji", "Kyoto", "Nara", "Osaka", "Hiroshima"], transport_to_next: "Vlucht Osaka/Tokyo-Taipei, korte vlucht, geen visum nodig voor Taiwan" },
    TW: { days: 10, budget: 750, destinations: ["Taipei", "Taroko-kloof", "Sun Moon Lake", "Tainan", "Kenting"], transport_to_next: "Vlucht Taipei-Hanoi, geen directe ferry/landroute beschikbaar" },
    VN: { days: 18, budget: 800, destinations: ["Hanoi", "Ha Long Bay", "Hue", "Hoi An", "Da Lat", "Ho Chi Minh City"], transport_to_next: "Nachtbus Hanoi-Vientiane, over land, grensovergang bij Cau Treo, lange rit (~24u)" },
    LA: { days: 12, budget: 525, destinations: ["Luang Prabang", "Vang Vieng", "Vientiane", "Si Phan Don (4000 eilanden)"], transport_to_next: "Bus Si Phan Don/Pakse-Siem Reap, over land, grensovergang bij Nong Nokkhien/Trapeang Kriel" },
    KH: { days: 12, budget: 525, destinations: ["Siem Reap", "Angkor Wat", "Battambang", "Phnom Penh", "Koh Rong"], transport_to_next: "Bus Phnom Penh/Siem Reap-Bangkok, over land, grensovergang bij Poipet" },
    TH: { days: 18, budget: 900, destinations: ["Bangkok", "Ayutthaya", "Sukhothai", "Chiang Mai", "Krabi/eilanden"], transport_to_next: "Trein of bus Bangkok-Kuala Lumpur, over land door Zuid-Thailand naar Maleisië, eenvoudige grensovergang bij Padang Besar" },
    MY: { days: 10, budget: 500, destinations: ["Kuala Lumpur", "Cameron Highlands", "Penang", "Malacca", "Langkawi"], transport_to_next: "Vlucht Kuala Lumpur-Bandar Seri Begawan (rechtstreekse verbinding, geen praktische landroute door Oost-Maleisië/Borneo)" },
    SG: { days: 3, budget: 450, destinations: ["Marina Bay", "Chinatown", "Sentosa", "Gardens by the Bay"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Singapore (Changi) naar Nederland" },
    BN: { days: 2, budget: 200, destinations: ["Bandar Seri Begawan", "Kampong Ayer", "Ulu Temburong NP"], transport_to_next: "Vlucht Bandar Seri Begawan-Manila, meestal met overstap in Kota Kinabalu of Kuala Lumpur" },
    PH: { days: 21, budget: 950, destinations: ["Manila", "Banaue", "Palawan (El Nido)", "Cebu", "Bohol", "Siargao"], transport_to_next: "Vlucht Manila/Cebu-Jakarta of Denpasar, doorgaans met overstap in Singapore of Kuala Lumpur" },
    ID: { days: 21, budget: 875, destinations: ["Jakarta", "Yogyakarta", "Borobudur", "Ubud (Bali)", "Gili-eilanden", "Lombok", "Komodo"], transport_to_next: "Bus over land via de grensovergang Mota'ain/Batugade (vanaf Kupang, West-Timor) naar Dili, Oost-Timor — of een korte vlucht Kupang-Dili" },
    TL: { days: 7, budget: 400, destinations: ["Dili", "Atauro-eiland", "Jaco-eiland (Nino Konis Santana NP)", "Baucau", "Maubisse"], transport_to_next: "Vlucht Dili-Singapore (meestal met overstap in Denpasar/Bali of Jakarta, geen directe verbinding) — laatste etappe naar het eindpunt Singapore" },
  },
  "Pan-American Grand Tour 🌎": {
    MX: { days: 28, budget: 1000, destinations: ["Ciudad de México", "Oaxaca", "Palenque", "Mérida", "Tulum", "Bacalar", "San Cristóbal de las Casas"], transport_to_next: "Bus over land via de grensovergang La Mesilla/El Carmen naar Huehuetenango, Guatemala." },
    GT: { days: 16, budget: 400, destinations: ["Quetzaltenango (Xela)", "Lake Atitlán", "Antigua", "Ciudad de Guatemala", "Semuc Champey", "Flores & Tikal"], transport_to_next: "Bus over land vanaf Flores naar de grensovergang bij Melchor de Menchos, door naar San Ignacio, Belize." },
    BZ: { days: 10, budget: 575, destinations: ["San Ignacio", "Belize City", "Caye Caulker", "Ambergris Caye (San Pedro)", "Hopkins/Dangriga", "Placencia"], transport_to_next: "Veerboot vanaf Placencia/Dangriga (via Livingston, Guatemala) naar Puerto Cortés, Honduras." },
    HN: { days: 14, budget: 375, destinations: ["Puerto Cortés", "Copán Ruinas", "Lago de Yojoa", "Tegucigalpa", "La Ceiba", "Roatán"], transport_to_next: "Bus over land via de grensovergang El Amatillo naar El Salvador." },
    SV: { days: 10, budget: 275, destinations: ["San Salvador", "Santa Ana", "Cerro Verde & vulkanen", "Ruta de las Flores (Juayúa, Ataco)", "El Tunco", "Suchitoto"], transport_to_next: "Bus over land via Honduras (transit) naar de grensovergang El Espino/Guasaule, richting León, Nicaragua." },
    NI: { days: 15, budget: 350, destinations: ["León", "Managua", "Granada", "Isla de Ometepe", "Laguna de Apoyo", "San Juan del Sur"], transport_to_next: "Bus over land via de grensovergang Peñas Blancas naar Costa Rica." },
    CR: { days: 21, budget: 1000, destinations: ["Liberia", "La Fortuna/Arenal", "Monteverde", "Santa Teresa", "Manuel Antonio", "Puerto Viejo de Talamanca"], transport_to_next: "Bus over land via de grensovergang Sixaola/Guabito naar Bocas del Toro, Panama." },
    PA: { days: 15, budget: 625, destinations: ["Bocas del Toro", "Boquete", "Ciudad van Panama", "Casco Viejo", "Panamakanaal", "San Blas-eilanden"], transport_to_next: "Zeilboot (4-5 dagen) via de San Blas-eilanden naar Cartagena, Colombia — geen wegverbinding door de Darién Gap." },
    CO: { days: 35, budget: 1000, destinations: ["Cartagena", "Santa Marta", "Parque Tayrona", "Medellín", "Salento & Koffiezone", "Bogotá", "San Agustín"], transport_to_next: "Bus over land via Pasto naar de grensovergang Ipiales–Tulcán, door naar Quito, Ecuador." },
    EC: { days: 24, budget: 1025, destinations: ["Quito", "Otavalo", "Mindo", "Baños", "Cuenca", "Galápagos-eilanden"], transport_to_next: "Bus over land via de grensovergang Huaquillas/Tumbes naar Noord-Peru, richting Máncora." },
    PE: { days: 35, budget: 1050, destinations: ["Máncora", "Huaraz", "Lima", "Ica & Huacachina", "Arequipa", "Cusco & Vallei van de Inca's", "Puno (Titicacameer)"], transport_to_next: "Bus/boot van Puno via de grensovergang Yunguyo of Desaguadero naar Copacabana en La Paz, Bolivia." },
    BO: { days: 21, budget: 425, destinations: ["Copacabana", "La Paz", "Uyuni-zoutvlakte", "Sucre", "Potosí", "Santa Cruz"], transport_to_next: "Jeeptocht via de Uyuni-zoutvlaktetour (3 dagen) over land naar San Pedro de Atacama, Chili." },
    CL: { days: 10, budget: 400, destinations: ["San Pedro de Atacama", "Valle de la Luna", "Valle del Arcoíris", "Antofagasta", "Iquique"], transport_to_next: "Bus over land via de grensovergang Paso de Jama naar Salta/Jujuy, Argentinië." },
    AR: { days: 10, budget: 350, destinations: ["Salta", "Cafayate", "Purmamarca", "Salinas Grandes", "Tilcara", "Humahuaca"], transport_to_next: "Vlucht van Salta (via Buenos Aires) naar Foz do Iguaçu of São Paulo, Brazilië — over land is dit een reis van meerdere dagen." },
    BR: { days: 22, budget: 1000, destinations: ["Foz do Iguaçu (Iguazu-watervallen)", "Curitiba", "Ilha do Mel", "Florianópolis", "São Paulo", "Paraty", "Rio de Janeiro"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Rio de Janeiro (Galeão) of São Paulo (Guarulhos)." },
  },
  "Africa Grand Tour 🌍": {
    EG: { days: 21, budget: 1300, destinations: ["Caïro", "Gizeh", "Dahab", "Luxor", "Nijlcruise/felucca", "Aswan", "Alexandrië"], transport_to_next: "Vlucht Caïro-Addis Abeba, geen directe landroute mogelijk (via Jordanië/Oman verloopt nu via de aparte Mediterranean Civilizations Expedition)." },
    ET: { days: 20, budget: 1450, destinations: ["Addis Abeba", "Lalibela", "Simien Mountains", "Gondar", "Danakil Depressie", "Omo Valley"], transport_to_next: "Over land via grensovergang Moyale (ruig, meerdaagse busrit), of vlucht Addis Abeba-Nairobi bij twijfel over veiligheid/wegconditie." },
    KE: { days: 18, budget: 2200, destinations: ["Nairobi", "Maasai Mara", "Lake Nakuru", "Amboseli", "Mount Kenya", "Diani Beach/Mombasa"], transport_to_next: "Bus over land Nairobi-Kampala via grensovergang Busia of Malaba, goed begaanbare route." },
    UG: { days: 18, budget: 2325, destinations: ["Kampala", "Jinja", "Kibale Forest", "Queen Elizabeth NP", "Bwindi Impenetrable Forest (gorilla's)", "Murchison Falls"], transport_to_next: "Bus over land Kampala-Kigali via grensovergang Gatuna/Katuna, vlotte verbinding." },
    RW: { days: 10, budget: 2250, destinations: ["Kigali", "Volcanoes NP (gorillatrekking)", "Lake Kivu", "Nyungwe Forest"], transport_to_next: "Over land Kigali-Mwanza via grensovergang Rusumo en bootverbinding over het Victoriameer, of vlucht Kigali-Kilimanjaro/Dar es Salaam." },
    TZ: { days: 24, budget: 2800, destinations: ["Arusha", "Ngorongoro Crater", "Serengeti", "Lake Manyara", "Zanzibar", "Kilimanjaro (regio)", "Dar es Salaam"], transport_to_next: "Vlucht Zanzibar/Dar es Salaam-Antananarivo, geen land- of veerbootverbinding mogelijk." },
    MG: { days: 24, budget: 1875, destinations: ["Antananarivo", "Andasibe-Mantadia", "Avenue of the Baobabs", "Morondava", "Isalo NP", "Nosy Be"], transport_to_next: "Vlucht Antananarivo-Port Louis, geen andere optie beschikbaar." },
    MU: { days: 7, budget: 1000, destinations: ["Port Louis", "Grand Baie", "Black River Gorges NP", "Chamarel", "Île aux Cerfs"], transport_to_next: "Vlucht Port Louis-Lilongwe, meestal met overstap in Johannesburg of Nairobi." },
    MW: { days: 14, budget: 825, destinations: ["Lilongwe", "Lake Malawi (Cape Maclear)", "Liwonde NP", "Zomba Plateau", "Mount Mulanje"], transport_to_next: "Over land via grensovergang Mandimba of Zobwe/Zóbuè richting Mozambique." },
    MZ: { days: 20, budget: 1425, destinations: ["Ilha de Moçambique", "Nampula", "Tofo", "Inhambane", "Bazaruto Archipel", "Maputo"], transport_to_next: "Over land via de Tete-corridor en grensovergang Cassacatiza/Zóbuè richting Zambia." },
    ZM: { days: 16, budget: 1825, destinations: ["Lusaka", "South Luangwa NP", "Lower Zambezi NP", "Livingstone/Victoria Falls"], transport_to_next: "Over land via de grensovergang bij Victoria Falls/Livingstone naar Zimbabwe." },
    ZW: { days: 14, budget: 1275, destinations: ["Victoria Falls", "Hwange NP", "Mana Pools", "Great Zimbabwe", "Bulawayo"], transport_to_next: "Over land via grensovergang Kazungula of Plumtree richting Botswana." },
    BW: { days: 16, budget: 2525, destinations: ["Kasane", "Chobe NP", "Okavango Delta (Maun)", "Makgadikgadi Pans", "Central Kalahari"], transport_to_next: "Over land via grensovergang Mamuno/Buitepos richting Namibië." },
    NA: { days: 20, budget: 2000, destinations: ["Windhoek", "Sossusvlei/Namib-Naukluft", "Swakopmund", "Damaraland", "Etosha NP", "Fish River Canyon"], transport_to_next: "Over land via de grensovergang Oshikango/Santa Clara richting Angola." },
    AO: { days: 11, budget: 1500, destinations: ["Luanda", "Lubango", "Serra da Leba", "Tundavala-kloof", "Namibe-woestijn"], transport_to_next: "Vlucht Luanda-Kaapstad/Johannesburg (meestal met overstap) om weer aan te sluiten bij de South Africa Finale, in plaats van overland terug te reizen door Namibië." },
    ZA: { days: 24, budget: 2000, destinations: ["Kaapstad", "Winelands (Stellenbosch)", "Garden Route", "Addo Elephant Park", "Kruger NP", "Johannesburg", "Drakensberg"], transport_to_next: "Over land de enclave Lesotho in via grensovergang Maseru Bridge (of avontuurlijker via Sani Pass)." },
    LS: { days: 6, budget: 350, destinations: ["Maseru", "Malealea", "Sani Pass/Thaba-Bosiu", "Roma", "Semonkong"], transport_to_next: "Over land terug door Zuid-Afrika naar grensovergang Golela/Lavumisa richting Eswatini." },
    SZ: { days: 5, budget: 300, destinations: ["Mbabane", "Ezulwini Valley", "Mlilwane Wildlife Sanctuary", "Hlane Royal National Park"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit King Mswati III International Airport (Matsapha), eventueel via OR Tambo Johannesburg." },
  },
  "Nordic Arctic Expedition ❄️": {
    FI: { days: 8, budget: 1200, destinations: ["Helsinki", "Rovaniemi", "Inari", "Lemmenjoki National Park"], transport_to_next: "Trein of bus van Rovaniemi naar Kiruna (over land, via Zweeds Lapland)" },
    SE: { days: 6, budget: 950, destinations: ["Kiruna", "Sami-cultuur", "Abisko National Park"], transport_to_next: "Trein Kiruna–Narvik (Malmbanan/Ofotbanen, over land, spectaculaire bergroute)" },
    NO: { days: 15, budget: 2250, destinations: ["Narvik", "Lofoten", "Senja", "Tromsø", "Noordkaap"], transport_to_next: "Vlucht vanaf Tromsø naar Longyearbyen (enige realistische verbinding naar Svalbard)" },
    SJ: { days: 8, budget: 3725, destinations: ["Longyearbyen", "Bootexpedities", "Gletsjers", "Wildlife", "Middernachtzon"], transport_to_next: "Vlucht via Oslo naar Kopenhagen, aansluitend naar Vágar (Faeröer) — geen directe verbinding, dus omweg nodig" },
    FO: { days: 7, budget: 1675, destinations: ["Tórshavn", "Saksun", "Gjógv", "Kliffen", "Wandelroutes"], transport_to_next: "Korte vlucht Vágar–Reykjavik (of seizoensgebonden veerboot Smyril Line, alleen in zomer)" },
    IS: { days: 14, budget: 2800, destinations: ["Reykjavik", "Golden Circle", "Zuidkust", "Vatnajökull", "Jökulsárlón", "Snæfellsnes", "Akureyri"], transport_to_next: "Vlucht Reykjavik–Ilulissat (via Nuuk), geen veerverbinding mogelijk" },
    GL: { days: 10, budget: 3725, destinations: ["Nuuk", "Inuitcultuur", "Ilulissat", "IJsfjord", "Disko Bay", "Boottochten"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Nuuk (via Reykjavik of Kopenhagen)" },
  },
  "Patagonia & Antarctica Expedition 🧊": {
    CL: { days: 24, budget: 3200, destinations: ["Chiloé Island", "Puerto Montt", "Carretera Austral (Pumalín & Queulat)", "Puerto Río Tranquilo & Marble Caves", "Cerro Castillo", "Puerto Natales", "Torres del Paine National Park", "Punta Arenas"], transport_to_next: "Overland per bus vanaf Puerto Natales naar El Calafate (grensovergang Chili-Argentinië, ca. 5-6 uur)" },
    AR: { days: 18, budget: 2375, destinations: ["El Calafate", "Perito Moreno Glacier", "El Chaltén", "Fitz Roy & Laguna de los Tres", "Cerro Torre", "Ushuaia", "Tierra del Fuego National Park", "Beagle Channel"], transport_to_next: "Inschepen in Ushuaia voor de expeditiecruise — oversteek van de Drake Passage (ca. 2 dagen varen)" },
    AQ: { days: 11, budget: 9500, destinations: ["Expedition Cruise from Ushuaia", "South Shetland Islands", "Antarctic Peninsula", "Glaciers & Icebergs", "Penguin colonies", "Whales", "Return to Ushuaia"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Ushuaia" },
  },
  "India & Himalaya Expedition 🏔️": {
    IN: { days: 30, budget: 1275, destinations: ["Delhi", "Agra & Jaipur (Golden Triangle)", "Pushkar, Jodhpur & Jaisalmer (West-Rajasthan)", "Udaipur", "Amritsar", "Dharamshala & Manali", "Rishikesh", "Varanasi"], transport_to_next: "Bus/trein naar Sunauli en te voet de grensovergang naar Belahiya (Nepal), dan bus door naar Lumbini/Pokhara — alternatief: korte vlucht Varanasi-Kathmandu" },
    NP: { days: 21, budget: 1000, destinations: ["Lumbini", "Chitwan National Park", "Pokhara", "Annapurna Region", "Kathmandu", "Patan", "Bhaktapur"], transport_to_next: "Vlucht Kathmandu-Paro (spectaculaire Himalaya-vlucht, alleen door Drukair of Bhutan Airlines uitgevoerd, Bhutan-visum/permit vooraf regelen)" },
    BT: { days: 8, budget: 2275, destinations: ["Paro", "Thimphu", "Dochula Pass", "Punakha", "Bumthang (optioneel)", "Tiger's Nest Monastery"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Paro International Airport" },
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
    { name: 'Balkans', season: 'April–juni', budget: 2850, note: 'Mild voorjaar, voor de zomerdrukte en -hitte — sluit aan op een vroege start van de hele expeditie.', countries: [eurasia('BA', 'Bosnia and Herzegovina'), eurasia('HR', 'Croatia'), eurasia('ME', 'Montenegro'), eurasia('AL', 'Albania'), eurasia('MK', 'North Macedonia')] },
    { name: 'Turkey', season: 'Juni', budget: 1300, note: 'Aansluitend op de Balkan, nog vóór de zwaarste zomerhitte in Cappadocië en het binnenland.', countries: [eurasia('TR', 'Turkey')] },
    { name: 'Caucasus', season: 'Juni–augustus', budget: 1475, note: 'Bergpassen en Svaneti zijn dan sneeuwvrij; sluit direct aan op het Centraal-Aziatische bergseizoen.', countries: [eurasia('GE', 'Georgia'), eurasia('AM', 'Armenia'), eurasia('AZ', 'Azerbaijan')] },
    { name: 'Central Asia', season: 'Juni–september', budget: 2600, note: 'De Pamir Highway en hooggelegen passen zijn alleen in deze maanden begaanbaar — buiten dit venster ligt er sneeuw/ijs. Turkmenistan is bewust geschrapt (lastig te bezoeken/niet reëel voor deze reisstijl).', countries: [eurasia('KZ', 'Kazakhstan'), eurasia('KG', 'Kyrgyzstan'), eurasia('TJ', 'Tajikistan'), eurasia('UZ', 'Uzbekistan')] },
    { name: 'China', season: 'September', budget: 1625, note: 'Na de zomerdrukte/-hitte, ruim vóór de Mongoolse winterkou die erna komt.', countries: [eurasia('CN', 'China')] },
    { name: 'Mongolia', season: 'Eind augustus–september', budget: 575, note: 'Vóór de vrieskou vanaf oktober; de Gobi is dan nog droog en warm genoeg voor een meerdaagse 4x4-tocht.', countries: [eurasia('MN', 'Mongolia')] },
    { name: 'Japan', season: 'Oktober–november', budget: 2700, note: 'Herfstkleuren, en rustiger dan de kersenbloesem-drukte in het voorjaar.', countries: [eurasia('JP', 'Japan')] },
    { name: 'Taiwan', season: 'November', budget: 750, note: 'Droog en mild, vóór het koelere winterseizoen in het noorden van het eiland.', countries: [eurasia('TW', 'Taiwan')] },
    { name: 'Mainland Southeast Asia', season: 'December–februari', budget: 2750, note: 'Het droge seizoen op het vasteland van Zuidoost-Azië — geen moesson, aangename temperaturen. Myanmar is bewust geschrapt (lastig te bezoeken/niet reëel voor deze reisstijl).', countries: [eurasia('VN', 'Vietnam'), eurasia('LA', 'Laos'), eurasia('KH', 'Cambodia'), eurasia('TH', 'Thailand')] },
    { name: 'Maritime Southeast Asia', season: 'Februari–maart', budget: 1650, note: 'Nog droog in de meeste regio\'s, vóór de moesson die later in het voorjaar begint.', countries: [eurasia('MY', 'Malaysia'), eurasia('BN', 'Brunei'), eurasia('PH', 'Philippines')] },
    { name: 'Indonesia & Oost-Timor', season: 'Maart', budget: 1275, note: 'Droog seizoen loopt in de meeste regio\'s door tot april/mei — Bali, Gili, Lombok en Komodo nog prima begaanbaar. Oost-Timor sluit hier logisch op aan, via de landgrens bij Kupang (West-Timor).', countries: [eurasia('ID', 'Indonesia'), eurasia('TL', 'East Timor')] },
    { name: 'Singapore Finale', season: 'Maart', budget: 450, note: 'Bewuste, compacte afsluiting van de hele Eurasia-expeditie — een rustige stadsstop na Oost-Timor.', countries: [eurasia('SG', 'Singapore')] },
  ], {
    best_starting_month: 'April',
    travel_style: 'Backpacker — overland waar mogelijk (bus, trein, marshrutka/deeltaxi), vluchten alleen waar geen praktische grondroute bestaat (Baku-Almaty, de eilandsprongen in Zuidoost-Azië). Lokale guesthouses en hostels boven internationale ketens.',
    climate_summary: "Vergeleken scenario's: (1) een winterstart houdt de Balkan mild, maar sluit de Pamir Highway en Song-Kul in Centraal-Azië volledig af (onbegaanbare bergpassen) en treft Mongolië in zijn strengste vrieskou (-20 tot -30°C); (2) een zomerstart (juni-juli) is ideaal voor de Kaukasus en Centraal-Azië, maar laat de Balkan en Turkije in de drukste, heetste maanden vallen én brengt het vasteland van Zuidoost-Azië middenin het regenseizoen (juni-oktober); (3) een start begin april laat de Balkan nog in een mild voorjaar vallen, bereikt de Kaukasus/Centraal-Azië rond juni-september (bergpassen open), komt in september-oktober in China/Mongolië aan (na de zomerhitte, vóór de winterkou), bereikt Japan in oktober-november (herfstkleuren), en laat heel Zuidoost-Azië in december-maart vallen (droog seizoen). Beste keuze: start begin april in de Balkan, zodat vrijwel elke etappe van deze ~11-12 maanden durende expeditie in zijn beste seizoen valt.",
    description: 'Overland route across Eurasia, region by region — from the Balkans through the Caucasus and Central Asia to East and Southeast Asia.',
    notes: 'Imported from a ChatGPT brainstorm — country lists per region are a reasonable starting point, adjust freely. Some countries here (parts of the Balkans, Maritime SE Asia) may already be visited or planned in your Trips sheet — worth cross-checking and possibly reusing as Block Library items instead.\n\n' +
      "Tijdscontrole (2026-07): dagen per land zijn na een volledige realismecontrole opgehoogd (van 200 naar 344 dagen totaal, ~11-12 maanden) zodat elk land ook echt te ervaren is in plaats van alleen aan te doen — vooral China (12→28), Turkije (12→24), Filipijnen (10→21) en Indonesië (12→21) waren fors onderschat. Turkmenistan (3 dagen) is bewust ongewijzigd gelaten — dat is een visumgrens (transitvisum), geen onderschatting. Landen en volgorde zijn ongewijzigd gebleven; alleen de duur per land, de regio-seizoenen/-budgetten hierboven en deze klimaatredenering zijn toegevoegd. Overweeg desondanks om deze route ooit te knippen in twee losse expedities (West-Eurazië t/m Centraal-Azië, en Oost-Eurazië/Azië) — 11-12 maanden aaneengesloten is fors, ook voor langzaam reizen.\n\n" +
      "Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen (zelfde dagprijs, dus meer dagen = evenredig meer budget) — regio-budgetten hierboven zijn de nieuwe sommen.\n\n" +
      "Wijziging (2026-07): Turkmenistan en Myanmar verwijderd (lastig te bezoeken/niet reëel voor deze reisstijl), Oost-Timor toegevoegd direct na Indonesië, en Singapore verplaatst naar het allerlaatste blok van de hele expeditie als bewust eindpunt (was eerst onderdeel van Maritime Southeast Asia). Nieuw totaal: 27 landen (was 28), 336 dagen, €20.000.",
  });

  const panAm = (code, name) => rbContentFor('Pan-American Grand Tour 🌎', code, name);
  const panAmRoute = rbBuildSeedRoute('Pan-American Grand Tour 🌎', [
    { name: 'Mexico', season: 'November–december', budget: 1000, note: 'Droog seizoen, na de zomerse regens.', countries: [panAm('MX', 'Mexico')] },
    { name: 'Northern Central America', season: 'December–januari', budget: 1625, note: 'Droog seizoen, orkaanseizoen voorbij.', countries: [panAm('GT', 'Guatemala'), panAm('BZ', 'Belize'), panAm('HN', 'Honduras'), panAm('SV', 'El Salvador')] },
    { name: 'Southern Central America', season: 'Januari–februari', budget: 1975, note: 'Pacifische droge seizoen in Costa Rica/Panama — beste tijd voor de kust.', countries: [panAm('NI', 'Nicaragua'), panAm('CR', 'Costa Rica'), panAm('PA', 'Panama')] },
    { name: 'Colombia', season: 'Februari–maart', budget: 1000, note: 'Droog in zowel de Caribische regio als de koffiezone/Andes.', countries: [panAm('CO', 'Colombia')] },
    { name: 'Ecuador', season: 'Maart–april', budget: 1025, note: 'Sierra droog genoeg voor wandelen; Galápagos is jaarrond goed maar rustiger in dit seizoen.', countries: [panAm('EC', 'Ecuador')] },
    { name: 'Peru', season: 'April–mei', budget: 1050, note: 'Het Andes-droogseizoen begint — ideaal voor Cusco/Vallei van de Inca\'s en Huaraz-trekking.', countries: [panAm('PE', 'Peru')] },
    { name: 'Bolivia', season: 'Mei–juni', budget: 425, note: 'Droog seizoen, heldere Uyuni-zoutvlakte (let op: geen spiegel-effect zoals in het natte seizoen — een bewuste ruil).', countries: [panAm('BO', 'Bolivia')] },
    { name: 'Northern Chile', season: 'Juni–juli', budget: 400, note: 'Northern Chile only (Atacama, Antofagasta) — Patagonia is a separate future expedition. De Atacama is jaarrond droog; koude nachten in de Chileense winter, overdag prima.', countries: [panAm('CL', 'Chile')] },
    { name: 'Northern Argentina', season: 'Juli', budget: 350, note: 'Northern Argentina only (Salta, Jujuy) — Patagonia is a separate future expedition. Droog hoogseizoen in Salta/Jujuy, koude nachten in het hooggebergte.', countries: [panAm('AR', 'Argentina')] },
    { name: 'Southern Brazil', season: 'Juli–augustus', budget: 1000, note: 'Southern Brazil only — Northern Brazil is a separate future expedition. Zuid-Braziliaanse winter: mild en droog voor sightseeing (Iguaçu, koloniale steden), maar geen strandweer; voor strandtijd de hele reis 1-2 maanden later starten.', countries: [panAm('BR', 'Brazil')] },
  ], {
    best_starting_month: 'November',
    travel_style: 'Backpacker — lokale bussen (chicken bus tot luxere overlandbus) door Midden-Amerika en de Andes, af en toe een binnenlandse vlucht waar de afstand dat rechtvaardigt (bv. Salta-Foz do Iguaçu), zeilboot door de San Blas-eilanden i.p.v. vliegen over de Darién Gap.',
    climate_summary: "Deze route is al climate-optimized ontworpen (vandaar de novemberstart) — de region-seizoenen hierboven maken dat expliciet: elke regio krijgt de maand toebedeeld die volgt uit een geleidelijke opmars naar het zuiden vanaf 1 november, tot en met Zuid-Brazilië rond juli-augustus. De enige makke van deze opzet: bij een reis van ~9 maanden valt de kustfinale in Zuid-Brazilië (Florianópolis, stranden) in de Zuid-Amerikaanse winter — prima voor sightseeing (Iguaçu, koloniale steden), maar geen strandweer. Wie strandtijd in Brazilië belangrijk vindt, kan de hele reis 1-2 maanden later starten of een paar dagen inkorten bij de eerdere regio's zodat de finale weer in het voor- of naseizoen valt.",
    description: 'Climate-optimized route down the Americas, from Mexico to southern Brazil.',
    notes: 'Best started around November 1st (pick your target year and fill in the exact start date above). Patagonia, Antarctica, Northern Brazil, Suriname and the Caribbean are intentionally excluded — planned as separate future expeditions. Imported from a ChatGPT brainstorm — adjust country lists/regions as needed.\n\n' +
      "Tijdscontrole (2026-07): dit was al de best getempode expeditie (274→286 dagen, beperkt aangepast) — Guatemala t/m Ecuador en Bolivia kregen elk een paar dagen extra, terwijl Chili-noord en Argentinië-noord juist zijn ingekort (12→10 en 14→10) omdat één woestijnregio niet de volledige oorspronkelijke tijd nodig had; Mexico, Colombia en Peru waren al ideaal en zijn ongewijzigd. De region-niveau seizoenen hierboven volgen de novemberstart maand voor maand naar het zuiden toe; let op dat de Zuid-Brazilië-finale daardoor in de Zuid-Amerikaanse winter valt (mild, prima voor sightseeing, maar geen strandweer).\n\n" +
      "Vervolg (2026-07): budgetten per land meegeschaald met de aangepaste dagen — regio-budgetten hierboven zijn de nieuwe sommen.",
  });

  rbRoutes.push(eurasiaRoute, panAmRoute);
  rbSave();
}

function rbSeedMEAExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_MEA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_MEA, '1');

  const mea = (code, name) => rbContentFor('Africa Grand Tour 🌍', code, name);
  const meaRoute = rbBuildSeedRoute('Africa Grand Tour 🌍', [
    {
      name: 'Northeast & East Africa', season: 'Juni–september', budget: 12325,
      note: 'Egypte als historische/geografische poort, gevolgd door de Hoorn van Afrika en de Oost-Afrikaanse safarigordel — bij een junistart valt dit grotendeels in het droge seizoen (inclusief een deel van de Serengeti-trek).',
      countries: [mea('EG', 'Egypt'), mea('ET', 'Ethiopia'), mea('KE', 'Kenya'), mea('UG', 'Uganda'), mea('RW', 'Rwanda'), mea('TZ', 'Tanzania')],
    },
    {
      name: 'Islands', season: 'Oktober', budget: 2875,
      note: 'Madagaskar en Mauritius — Madagaskars beruchte trage wegen zijn hier de grootste tijdsvreter, niet de bezienswaardigheden zelf.',
      countries: [mea('MG', 'Madagascar'), mea('MU', 'Mauritius')],
    },
    {
      name: 'Southern Africa', season: 'November–januari', budget: 11375,
      note: 'Van Malawi tot Angola — grote zelfrijafstanden, vooral in Namibië; valt bij deze volgorde grotendeels in het regenseizoen (zie de klimaatredenering van de hele route). Angola toegevoegd na Namibië (grensovergang Oshikango/Santa Clara), vervolgens per vlucht terug naar Kaapstad/Johannesburg om aan te sluiten bij de South Africa Finale.',
      countries: [mea('MW', 'Malawi'), mea('MZ', 'Mozambique'), mea('ZM', 'Zambia'), mea('ZW', 'Zimbabwe'), mea('BW', 'Botswana'), mea('NA', 'Namibia'), mea('AO', 'Angola')],
    },
    {
      name: 'South Africa Finale', season: 'Februari–maart', budget: 2650,
      note: 'Zuid-Afrika, Lesotho en Eswatini als afsluiting — Kruger-wildlife spotten is in dit seizoen iets lastiger, de rest (Kaapstad, Wijnlanden, Tuinroute) blijft jaarrond aangenaam.',
      countries: [mea('ZA', 'South Africa'), mea('LS', 'Lesotho'), mea('SZ', 'Eswatini')],
    },
  ], {
    best_starting_month: 'Juni',
    travel_style: 'Overland/safaritrucks tussen parken, verplichte lokale gidsen bij gorillatrekking (Oeganda/Rwanda), mix van budgetlodges en kamperen in de nationale parken, vluchten alleen tussen Tanzania/Madagaskar/Mauritius (geen landroute mogelijk over water).',
    climate_summary: "Vergeleken scenario's: (1) een start in de Europese winter (december-januari) vermijdt Egypte's zomerhitte, maar treft Oost-Afrika dan in de korte regentijd en laat zuidelijk Afrika aan het einde van de reis in hún regenseizoen vallen (november-maart, lastiger wildlife spotten); (2) een start in juni laat Egypte nog in een aangenaam voorjaar/vroege zomer vallen, brengt Oost-Afrika (Kenia, Tanzania, Oeganda, Rwanda) rond augustus-oktober in hun droge seizoen — inclusief een deel van de Serengeti-trek — maar laat zuidelijk Afrika (Zambia t/m Zuid-Afrika) rond januari-maart vallen, middenin hún regenseizoen. Bij het behouden van de huidige landvolgorde (Egypte als start, Zuid-Afrika/Lesotho/Eswatini als afsluiting) is er geen enkele startmaand die zowel Oost- als zuidelijk Afrika in hun droge seizoen laat vallen — de twee liggen op tegengestelde droge/natte cycli t.o.v. hoe lang deze reis duurt. Beste compromis: start juni, zodat het zwaartepunt van de reis (Oost-Afrika, de eilanden en de eerste helft van zuidelijk Afrika) wél in het droge seizoen valt; alleen de laatste etappes (Namibië, Zuid-Afrika, Lesotho, Eswatini) vallen dan in het regenseizoen — nog steeds goed te doen, want de grote zelfrijafstanden in Namibië en de Kaapse Wijnlanden/Tuinroute blijven jaarrond aangenaam; alleen Kruger-wildlife spotten is dan iets lastiger dan in het droge seizoen. Wie zuidelijk Afrika liever in het droge seizoen doet, kan ooit een omgekeerde volgorde overwegen (Zuid-Afrika eerst) — dat is een aparte, toekomstige afweging en verandert de huidige route niet.",
    description: 'Overland route through East Africa, the islands, and Southern Africa, with Egypt as the northern gateway. Target duration ~12 months.',
    notes: 'Imported from a ChatGPT brainstorm — deliberately seeded with zero blocks (unlike Eurasia/Pan-American): group these 17 countries into your own blocks (e.g. East Africa, Islands, Southern Africa, South Africa finale) via the region dropdown on each country, in whatever shape makes sense once you plan it for real. Jordan and Oman used to be part of this route but were moved to what is now Mediterranean Civilizations Expedition 🏛️ so this stays purely African + Egypt as the historical/geographic gateway; Egypt itself still appears in both since it fits both themes. South Africa is already marked "visited" in your Countries sheet — worth checking before treating it as new.\n\n' +
      'Tijdscontrole (2026-07): dagen per land opgehoogd na een realismecontrole (247→277 dagen totaal) — vooral Oeganda (gorillatrekking-logistiek), Madagaskar (berucht trage wegen) en Mozambique (het land strekt zich noord-zuid enorm uit) waren onderschat. Landen en volgorde zijn ongewijzigd; alleen de duur per land en de klimaatredenering hierboven zijn toegevoegd.\n\n' +
      'Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen (zelfde dagprijs, dus meer dagen = evenredig meer budget), en de 17 landen alsnog gegroepeerd in 4 regio\'s (Northeast & East Africa, Islands, Southern Africa, South Africa Finale) met eigen seizoen/budget per regio, zoals Eurasia en Pan-American die al hadden. Landen, volgorde en dagen zijn ongewijzigd.\n\n' +
      "Toevoeging (2026-07): Angola toegevoegd aan de Southern Africa-regio, direct na Namibië (grensovergang Oshikango/Santa Clara), met een vlucht Luanda-Kaapstad/Johannesburg om weer aan te sluiten bij de South Africa Finale. Afkomstig uit de West & Central Africa-ontwerpsessie — daar paste Angola geografisch slechter (alleen per vlucht bereikbaar, geen buurlanden op die route). Let op: dit verandert niets aan het seizoenscompromis van deze regio (valt nog steeds in het regenseizoen bij de huidige juni-startmaand) — Angola deelt gewoon hetzelfde, al geaccepteerde compromis. Nieuw totaal: 18 landen (was 17), 288 dagen (was 277), €29.225 (was €27.725).",
  });

  rbRoutes.push(meaRoute);
  rbSave();
}

function rbSeedAncientCivilizationsExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_ANCIENT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_ANCIENT, '1');

  rbRoutes.push(rbBuildMediterraneanExpeditionRoute());
  rbSave();
}

/**
 * Mediterranean Civilizations Expedition — a large, region-grouped route (18 legs across 13
 * countries) built directly here rather than through RB_EXPEDITION_CONTENT, the same way North
 * America Grand Traverse is: Italy (Sicily, South Italy, Rome, Sardinia) and France (Corsica,
 * South France) each appear as multiple distinct legs, which that table (keyed
 * one-entry-per-country-code per route) can't hold. Shared by the fresh-seed path
 * (rbSeedAncientCivilizationsExpedition, still guarded by the original "ancient" seed flag —
 * this route is what that flag used to seed under its old name) and the migration path
 * (rbMigrateAncientToMediterranean), so both produce identical content.
 */
function rbBuildMediterraneanExpeditionRoute() {
  return rbBuildSeedRoute('Mediterranean Civilizations Expedition 🏛️', [
    {
      name: 'Iberia & Maghreb',
      season: 'September',
      budget: 1270,
      note: "Van Moors Spanje via Berbercultuur in Marokko naar Punisch/Romeins Tunesië — het westelijke Middellandse Zeegebied waar Feniciërs, Carthagers, Romeinen en de islamitische wereld elkaar opvolgden.",
      countries: [
        {
          code: 'ES', name: 'Spain', days: 10, budget: 600,
          destinations: ['Málaga', 'Granada (Alhambra)', 'Córdoba (Mezquita)', 'Sevilla'],
          notes: "Openingsetappe van de expeditie: Moorse en Romeinse geschiedenis in Andalusië, van de Alhambra in Granada tot de Mezquita in Córdoba. Historische binnensteden als rustige start voor de rest van de reis. Verborgen parel: Ronda, met zijn kloofbrug, als tussenstop tussen Málaga en Sevilla.",
          transport_to_next: "Veerboot Tarifa/Algeciras-Tanger (35-90 minuten, meerdere afvaarten per dag) — kortste en goedkoopste oversteek naar Afrika, geen vlucht nodig",
        },
        {
          code: 'MA', name: 'Morocco', days: 10, budget: 450,
          destinations: ['Tanger', 'Chefchaouen', 'Fes', 'Volubilis', 'Marrakech'],
          notes: "Berbercultuur, islamitische geschiedenis en Romeinse overblijfselen (Volubilis) naast elkaar. Medina's van Fes en Marrakech en de blauwe stad Chefchaouen als hoogtepunten; treinen tussen de grote steden zijn goed en goedkoop.",
          transport_to_next: "Vlucht Marrakech/Casablanca-Tunis — geen praktische land- of veerbootroute door de gesloten grens met Algerije",
        },
        {
          code: 'TN', name: 'Tunisia', days: 6, budget: 220,
          destinations: ['Tunis', 'Carthago', 'Dougga', 'El Jem', 'Sidi Bou Said'],
          notes: "Carthaagse beschaving (Carthago) en Romeins Noord-Afrika (Dougga, het amfitheater van El Jem, groter dan dat van Rome zelf) dicht bij elkaar; Sidi Bou Said als rustig, schilderachtig dorpje tussen de geschiedenis door.",
          transport_to_next: "Vlucht Tunis-Malta — geen betrouwbare jaarronde veerbootverbinding, alleen incidentele zomerdiensten",
        },
      ],
    },
    {
      name: 'Malta & Italië',
      season: 'Oktober',
      budget: 2500,
      note: "Van tempels ouder dan de piramides (Malta) via Magna Graecia en Romeins Zuid-Italië naar het hart van het Romeinse Rijk, met de Nuraghe-beschaving van Sardinië als unieke afsluiter.",
      countries: [
        {
          code: 'MT', name: 'Malta', days: 5, budget: 500,
          destinations: ['Valletta', 'Mdina', 'Gozo', 'Ġgantija-tempels', 'Hypogeum'],
          notes: "De Ġgantija-tempels en het Hypogeum zijn ouder dan de piramides van Gizeh — een van de oudste vrijstaande bouwwerken ter wereld. Daarnaast de Ridders van Malta in Valletta en Mdina, met een rustiger Gozo als tegenhanger.",
          transport_to_next: "Veerboot Valletta-Pozzallo of Valletta-Catania (Virtu Ferries, 1,5-3 uur) naar Sicilië",
        },
        {
          code: 'IT', name: 'Italy', days: 10, budget: 650,
          destinations: ['Palermo', 'Cefalù', 'Taormina', 'Syracuse', 'Agrigento (Valle dei Templi)', 'Etna'],
          notes: "Magna Graecia (Agrigento, Syracuse), Romeinse, Normandische en Arabische invloeden door elkaar op één eiland, met de Etna als natuurlijke afwisseling. Verborgen parel: het vissersdorpje Marzamemi, veel rustiger dan Taormina.",
          transport_to_next: "Veerboot over de Straat van Messina (Messina-Villa San Giovanni, 20-30 minuten) naar het vasteland, dan verder naar Napels",
        },
        {
          code: 'IT', name: 'Italy', days: 6, budget: 450,
          destinations: ['Reggio Calabria', 'Napels', 'Pompeï', 'Herculaneum'],
          notes: "Romeinse geschiedenis in het echt bevroren: Pompeï en Herculaneum, beide verwoest en geconserveerd door de Vesuvius. Napels zelf als levendige, chaotische contramal.",
          transport_to_next: "Trein Napoli-Roma (hogesnelheidstrein, circa 1 uur 10 minuten)",
        },
        {
          code: 'IT', name: 'Italy', days: 7, budget: 700,
          destinations: ['Colosseum', 'Forum Romanum', 'Pantheon', 'Vaticaan'],
          notes: "Het hart van het Romeinse Rijk en de klassieke geschiedenis waar de hele expeditie steeds weer naar teruggrijpt — Romeinse invloeden duiken ook op in Spanje, Tunesië, Turkije, Egypte en Jordanië.",
          transport_to_next: "Vlucht Rome-Cagliari, of nachtveerboot Civitavecchia-Olbia/Cagliari (circa 7-8 uur) voor wie de boot verkiest boven vliegen",
        },
        {
          code: 'IT', name: 'Italy', days: 6, budget: 500,
          destinations: ['Cagliari', 'Su Nuraxi', 'Costa Smeralda'],
          notes: "De Nuraghe-beschaving (Su Nuraxi, UNESCO) is uniek voor Sardinië en ouder dan de Romeinse aanwezigheid op het eiland. Costa Smeralda voor de kust, de rustigere Costa Verde als minder toeristisch alternatief.",
          transport_to_next: "Veerboot Santa Teresa Gallura-Bonifacio (circa 1 uur) — de kortste oversteek van de hele route",
        },
      ],
    },
    {
      name: 'Corsica & Zuid-Frankrijk',
      season: 'November',
      budget: 1050,
      note: "Twee Franse etappes die Bonifacio's kliffen en de Gallo-Romeinse monumenten van de Provence verbinden, voordat de reis via een vlucht de Egeïsche Zee oversteekt.",
      countries: [
        {
          code: 'FR', name: 'France', days: 5, budget: 450,
          destinations: ['Bonifacio', 'Ajaccio', 'Bavella'],
          notes: "Mediterrane natuur op zijn best: de kalksteenkliffen van Bonifacio, de granieten naalden van Bavella. Franse en Italiaanse invloeden lopen hier door elkaar. Verborgen parel: het Scandola natuurreservaat, alleen per boot te bezoeken.",
          transport_to_next: "Veerboot Ajaccio/Bastia-Marseille of Toulon (Corsica Ferries/La Méridionale, circa 6-10 uur, vaak als nachtboot)",
        },
        {
          code: 'FR', name: 'France', days: 6, budget: 600,
          destinations: ['Marseille', 'Arles', 'Nîmes', 'Pont du Gard'],
          notes: "Gallo-Romeinse geschiedenis (het aquaduct van de Pont du Gard, de arena's van Arles en Nîmes) in Provençaalse sfeer. Verborgen parel: de Camargue bij Arles, met wilde paarden en flamingo's, als natuurpauze.",
          transport_to_next: "Vlucht Marseille-Athene — geen praktische land- of veerbootroute gezien de afstand",
        },
      ],
    },
    {
      name: 'Griekenland & Cyprus',
      season: 'November-December',
      budget: 1550,
      note: "Van de Griekse oudheid op het vasteland via de Minoïsche beschaving van Kreta naar de Grieks-Romeins-Byzantijnse laag van Cyprus, vlak voor de oversteek naar Anatolië.",
      countries: [
        {
          code: 'GR', name: 'Greece', days: 12, budget: 700,
          destinations: ['Athene', 'Delphi', 'Olympia', 'Meteora', 'Peloponnesos'],
          notes: "Griekse oudheid, filosofie, democratie en mythologie op de belangrijkste locaties zelf: de Akropolis, het orakel van Delphi, de oorspronkelijke Olympische Spelen in Olympia. Verborgen parel: Monemvasia en Nafplio op de Peloponnesos, veel rustiger dan Athene.",
          transport_to_next: "Nachtveerboot Piraeus-Heraklion (circa 7-9 uur) naar Kreta",
        },
        {
          code: 'GR', name: 'Greece', days: 7, budget: 450,
          destinations: ['Heraklion', 'Knossos', 'Chania', 'Samariakloof'],
          notes: "De Minoïsche beschaving (Knossos) als oudste laag van de Griekse geschiedenis, gevolgd door eilandcultuur in Chania en een stevige wandeling door de Samariakloof. Verborgen parel: het roze zandstrand van Elafonisi, in het uiterste westen van het eiland.",
          transport_to_next: "Vlucht Heraklion-Larnaca (meestal met overstap in Athene) — geen betrouwbare directe veerbootverbinding",
        },
        {
          code: 'CY', name: 'Cyprus', days: 5, budget: 400,
          destinations: ['Paphos', 'Limassol', 'Nicosia'],
          notes: "Griekse, Romeinse en Byzantijnse lagen op één eiland: de mozaïeken van Paphos (UNESCO), het Romeinse theater van Kourion bij Limassol als verborgen parel, en de gedeelde hoofdstad Nicosia.",
          transport_to_next: "Vlucht Larnaca-Istanbul — rechtstreeks en kort, geen praktisch alternatief over water",
        },
      ],
    },
    {
      name: 'Anatolië',
      season: 'December',
      budget: 600,
      note: "Eén grote etappe die Byzantium, het Ottomaanse Rijk en de Romeinse steden van de Egeïsche kust samenbrengt, met Cappadocië als brug naar de rest van Anatolië.",
      countries: [
        {
          code: 'TR', name: 'Turkey', days: 20, budget: 850,
          destinations: ['Istanbul', 'Troje', 'Pergamon', 'Efeze', 'Pamukkale', 'Cappadocië'],
          notes: "Byzantijnse en Ottomaanse geschiedenis in Istanbul, Romeinse steden (Efeze, Pergamon) en oude Anatolische beschavingen (Troje) op één lijn, met de rotsformaties van Cappadocië en de kalksteenterrassen van Pamukkale als natuurlijke hoogtepunten. Verborgen parel: Assos en Aphrodisias, veel rustiger dan Efeze maar minstens zo indrukwekkend.",
          transport_to_next: "Vlucht Istanbul-Caïro — geen praktische land- of zeeroute via Syrië/Libanon",
        },
      ],
    },
    {
      name: 'Egypte & het Arabisch Schiereiland',
      season: 'December-Januari',
      budget: 2150,
      note: "Van de oud-Egyptische beschaving via de Nabateese handelsroutes van Jordanië en de Arabische handelswereld van Oman naar het moderne Qatar als bewust hedendaags slotakkoord.",
      countries: [
        {
          code: 'EG', name: 'Egypt', days: 14, budget: 650,
          destinations: ['Caïro', 'Gizeh', 'Luxor', 'Karnak', 'Aswan', 'Abu Simbel'],
          notes: "De oud-Egyptische beschaving in haar geheel: piramides (Gizeh), tempels (Karnak, Abu Simbel) en de Nijl als verbindende rode draad. Verborgen parel: de Siwa-oase, ver van de gebruikelijke route maar wel een omweg waard.",
          transport_to_next: "Veerboot Nuweiba-Aqaba (alternatief: vlucht Caïro-Amman) — kortste route naar Jordanië zonder om te vliegen via de Golf",
        },
        {
          code: 'JO', name: 'Jordan', days: 8, budget: 500,
          destinations: ['Amman', 'Jerash', 'Petra', 'Wadi Rum', 'Dode Zee'],
          notes: "Nabateese handelsroutes (Petra), Romeinse geschiedenis (Jerash) en de woestijn van Wadi Rum. December geeft aangename dagtemperaturen voor de wandeling naar de Schatkamer en voor kamperen in Wadi Rum.",
          transport_to_next: "Vlucht Amman-Muscat — geen landroute, overland via Saoedi-Arabië is visumtechnisch onpraktisch",
        },
        {
          code: 'OM', name: 'Oman', days: 7, budget: 600,
          destinations: ['Muscat', 'Nizwa', 'Jebel Shams', 'Wahiba Sands'],
          notes: "Arabische handelsroutes, forten (Nizwa) en zowel bergen (Jebel Shams, de \"Grand Canyon van Arabië\") als woestijn (Wahiba Sands) op korte afstand van elkaar. Verborgen parel: Bahla Fort en de eeuwenoude falaj-irrigatiekanalen bij Nizwa (beide UNESCO).",
          transport_to_next: "Vlucht Muscat-Doha — korte Golfvlucht; overweeg een tussenstop in Bahrein (Qal'at al-Bahrein, UNESCO) als de reis ooit wordt uitgebreid",
        },
        {
          code: 'QA', name: 'Qatar', days: 3, budget: 400,
          destinations: ['Doha'],
          notes: "Bewust modern en hedendaags als afsluiting: islamitische architectuur (Museum of Islamic Art) en musea als contrast met de duizenden jaren geschiedenis eerder in de reis.",
          transport_to_next: "Einde van de expeditie — terugvlucht vanuit Doha (Hamad International Airport) naar Nederland",
        },
      ],
    },
  ], {
    travel_style: "Backpacker — hostels met af en toe een hotel, openbaar vervoer waar mogelijk, ferry's tussen eilanden waar dat logisch is, vluchten alleen wanneer de afstand dat vereist (Marokko-Tunesië, Tunesië-Malta, Zuid-Frankrijk-Griekenland, Kreta-Cyprus, Cyprus-Turkije, Turkije-Egypte, Jordanië-Oman, Oman-Qatar).",
    best_starting_month: 'September',
    description: "Grote historische expeditie langs de beschavingen die de Mediterrane wereld hebben gevormd: van Moors Spanje via Noord-Afrika en Zuid-Europa naar de Levant en de Arabische handelswereld. Achttien etappes in zes regio's volgen Feniciërs, Carthagers, Grieken, Romeinen, Byzantijnen en de islamitische wereld door duizenden jaren geschiedenis.",
    climate_summary: "Vergeleken scenario's: (1) een start in maart/april is voor het Europese deel (Spanje t/m Turkije) prettiger dan september — milder, minder druk — maar schuift de woestijn-/Golfetappes (Egypte, Jordanië, Oman, Qatar) door naar juli-oktober, middenin het zwaarste woestijnseizoen (regelmatig 40-48°C in Wadi Rum en het binnenland van Oman); (2) een start begin september laat het Europese deel nog in het najaarszonnetje vallen, brengt Griekenland/Kreta/Cyprus/Turkije in een aangenaam najaar (minder toeristen, nog warm genoeg voor ferry's) en laat de hele Egypte-Jordanië-Oman-Qatar-etappe in december-januari vallen — het beste seizoen voor de Golf en de Egyptische/Jordaanse woestijn (dagen rond 20-28°C in plaats van 40+). Beste keuze: start begin september in Andalusië, zodat de expeditie (circa 4,5-5 maanden) medio januari in Qatar eindigt, met de zwaarste woestijnhitte overgeslagen. Let wel: eind oktober/november draaien sommige eilandveerboten (Malta-Sicilië, Piraeus-Heraklion, Corsica-Marseille) op een verminderde winterdienstregeling — check actuele vaarschema's ruim van tevoren.",
    notes: "Ingevuld vanuit een uitgebreide ChatGPT-brainstorm (\"Mediterranean Civilizations Expedition\"), uitgewerkt en gestructureerd door Claude in dezelfde stijl als de andere grote reizen — dit vervangt de eerdere, veel kleinere \"Ancient Civilizations Expedition\"/\"North Africa & Middle East Expedition 🏜️\" (Marokko, Tunesië, Egypte, Jordanië, Oman, VAE, Cyprus) volledig.\n\n" +
      "Al bezocht vs. nieuw: 8 van de 13 landen in deze route staan al als \"visited\" in je Countries-sheet — Spanje, Frankrijk, Griekenland, Italië, Malta, Marokko, Cyprus en Turkije. Alleen Tunesië, Egypte, Jordanië, Oman en Qatar zijn nog onbezocht. Dat maakt dit voor een groot deel een verdiepingsreis (specifieke oude geschiedenis binnen al bekende landen) in plaats van nieuwe-landen-afvinken — de moeite waard om in het achterhoofd te houden, geen reden om iets te schrappen.\n\n" +
      "Kosteninschatting (circa 4,5-5 maanden, 138 dagen grondkosten + losse vluchten/ferry's ertussen): solo circa €10.500-11.500 (grondbudgetten €9.120 + internationale/tussenliggende vluchten en ferry's €1.400-2.400), met 3 personen circa €7.500-8.500 per persoon door gedeelde accommodatie en lokaal vervoer.\n\n" +
      "Transportstrategie: vooral ferry's tussen eilanden en over korte zeestraten waar dat logisch is (Spanje-Marokko, Malta-Sicilië, Sicilië-vasteland, Sardinië-Corsica, Corsica-Frankrijk, Piraeus-Kreta, Egypte-Jordanië) — dat zijn ook de mooiste/goedkoopste overgangen. Vluchten alleen waar geen praktische land-/zeeroute bestaat of politieke grenzen dat onmogelijk maken (Marokko-Tunesië door de gesloten Algerijnse grens, Tunesië-Malta, Frankrijk-Griekenland, Kreta-Cyprus, Cyprus-Turkije, Turkije-Egypte, Jordanië-Oman, Oman-Qatar).\n\n" +
      "Mogelijke toevoegingen: Bahrein tussen Oman en Qatar (Qal'at al-Bahrein, UNESCO-fort, korte Golfvlucht) — dit stond al als idee genoteerd voor de oude \"North Africa & Middle East Expedition\" en past hier logischer. Algerije (Romeinse steden Timgad, Djemila, Tipasa) zou historisch goed passen tussen Marokko en Tunesië, maar is bewust weggelaten vanwege de gesloten grens met Marokko en een lastiger visumtraject. Libanon/Israël (het Fenicische kernland: Byblos, Tyrus, Sidon) zouden thematisch de sterkste aanvulling zijn — Feniciërs komen nu alleen via Carthago/Tunesië aan bod — maar zijn weggelaten vanwege reisadvies en grensgevoeligheden; heroverweeg dit apart als de situatie verandert.\n\n" +
      "Mogelijke schrapping: Qatar is de enige etappe zonder oude geschiedenis (puur modern) en qua thema de uitzondering op de rest van de route — bewust gehandhaafd als hedendaags slotakkoord zoals in de brainstorm bedoeld, maar de eerste kandidaat om te laten vervallen als de reis korter moet.\n\n" +
      "Alternatieve route: de volgorde omkeren (Qatar/Oman/Jordanië/Egypte eerst, Spanje als laatste) zou de woestijn-/Golfetappes in het vroege najaar leggen — juist het warmste, minst comfortabele moment daar — en eindigt bovendien in het kille Zuid-Europese winterseizoen. De huidige volgorde (Spanje → Qatar, start september) is voor beide uitersten van de route het gunstigst.\n\n" +
      "Dagen/budget/bestemmingen/transport hierboven zijn een eerste research-opzet, nog niet getoetst aan actuele prijzen, visumregels of persoonlijke voorkeuren — behandel dit als een eerste concept om zelf te verfijnen, geen boekbaar plan.\n\n" +
      "Tijdscontrole (2026-07): Rome (4→7 dagen — de Vaticaanse Musea alleen al zijn een volle dag, en Rome is berucht de meest onderschatte stad in reisplanningen) en de Turkije/Anatolië-etappe (14→20 dagen — Istanbul plus Troje, Pergamon, Efeze, Pamukkale én Cappadocië is een landbrede route) waren te krap. De rest van de expeditie klopte al goed. Met de extra 9 dagen (totaal nu 147 in plaats van 138) schuift het einde van half januari naar begin februari, nog steeds ruim vóór de Golf-zomerhitte — de klimaatredenering hierboven blijft dus overeind.\n\n" +
      "Vervolg (2026-07): budget voor Rome (400→700) en de Turkije/Anatolië-etappe (600→850) meegeschaald met de extra dagen; de rest van de expeditie ongewijzigd.",
  });
}

function rbSeedArcticCircleExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_ARCTIC)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_ARCTIC, '1');

  const arctic = (code, name) => rbContentFor('Nordic Arctic Expedition ❄️', code, name);
  const arcticRoute = rbBuildSeedRoute('Nordic Arctic Expedition ❄️', [
    {
      name: 'Scandinavia', season: 'Juni', budget: 4400,
      note: 'Lapland en Noorse fjorden/eilanden per trein en bus — de enige etappe van deze expeditie die nog over land te doen is.',
      countries: [arctic('FI', 'Finland'), arctic('SE', 'Sweden'), arctic('NO', 'Norway')],
    },
    {
      name: 'North Atlantic Islands', season: 'Juli–augustus', budget: 11925,
      note: 'Svalbard, Faeröer, IJsland en Groenland — stuk voor stuk losse vluchtsprongen, geen doorlopende route; reken op weerbuffers.',
      countries: [arctic('SJ', 'Svalbard'), arctic('FO', 'Faroe Islands'), arctic('IS', 'Iceland'), arctic('GL', 'Greenland')],
    },
  ], {
    best_starting_month: 'Juni',
    travel_style: 'Trein/bus in Scandinavië, vluchten voor de eilandsprongen (Svalbard, Faeröer, IJsland, Groenland) waar geen boot- of landroute bestaat, kleine guesthouses en de enkele hut/expeditieboot waar relevant.',
    climate_summary: "Vergeleken scenario's: (1) een winterstart (december-februari) levert noorderlicht op in Finland/Zweden/Noorwegen, maar sluit Svalbard-boottochten (zee-ijs), IJslands hooglandwegen en de boottochten bij Faeröer/Groenland vrijwel volledig af, met te korte en te koude dagen voor de wandelroutes; (2) een start in mei loopt nog risico op resterend zee-ijs bij Svalbard en gesloten hooglandwegen in IJsland; (3) een start begin juni treft alle zeven bestemmingen in hun enige gedeelde goede seizoen: middernachtzon in Scandinavië, toegankelijk zee-ijs en boottochten bij Svalbard, betrouwbaardere veerdiensten en wandelweer bij de Faeröer, volledig open hooglandwegen in IJsland, en de beste boottoegang tot de Diskobaai-ijsbergen bij Ilulissat in Groenland. Beste keuze: start begin juni, zodat de expeditie (circa 2-2,5 maand) eind augustus eindigt, ruim vóór de eerste herfststormen in de Noord-Atlantische regio.",
    description: 'Zomerexpeditie door het hoge noorden — van Lapland via Noorse fjorden en eilanden naar Spitsbergen, de Faeröer, IJsland en Groenland, met middernachtzon als rode draad.',
    notes: 'Imported from a ChatGPT brainstorm — originally seeded flat (no regions); Svalbard and the Faroe Islands may not yet appear in the Countries sheet dropdown — cosmetic only, the block still works. Several legs (Svalbard, Faroe, Iceland, Greenland) are flight-only hops rather than one continuous overland trip.\n\n' +
      'Tijdscontrole (2026-07): dagen per land licht opgehoogd (53→68 dagen totaal) — vooral Groenland (weersafhankelijke vluchten tussen plaatsen) en Noorwegen (Lofoten alleen al is fotografie/wandelen waard) waren krap. Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.\n\n' +
      'Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen, en de 7 landen alsnog gegroepeerd in 2 regio\'s (Scandinavia, North Atlantic Islands) met eigen seizoen/budget. Landen, volgorde en dagen zijn ongewijzigd.',
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
    best_starting_month: 'November',
    travel_style: 'Backpacker/trekking — refugios en camping in de nationale parken, lokale bussen tussen de Patagonische steden, het Antarctica-gedeelte via een georganiseerde expeditiecruise (geen andere manier om er te komen).',
    climate_summary: "Vergeleken scenario's: (1) een start in de Zuid-Amerikaanse winter (juni-augustus) sluit vrijwel alle trekkingroutes in Torres del Paine en rond El Chaltén af (sneeuw, korte dagen, gesloten refugios) en valt volledig buiten het Antarctica-vaarseizoen (alleen november-maart); (2) een start in de vroege lente (september-oktober) loopt nog risico op sneeuw op de hogere paden en valt nog vóór het vaarseizoen; (3) een start begin november valt samen met zowel het begin van het Patagonische trekkingseizoen (november-maart, refugios open, lange dagen) als het Antarctica-vaarseizoen (november-maart, met de meeste walvis-/pinguïnactiviteit in januari-februari). Beste keuze: start begin november in Chileens Patagonië, zodat de expeditie (circa 1,5-2 maand, met ruimere weerbuffers bij de trekkingetappes) in december-januari bij de Antarctica-cruise uitkomt — het hart van het seizoen.",
    description: 'Trekkingexpeditie door Chileens en Argentijns Patagonië, afgesloten met een expeditiecruise naar het Antarctisch Schiereiland.',
    notes: 'Imported from a ChatGPT brainstorm — seeded with zero blocks: group these 3 countries into your own blocks via the region dropdown whenever you\'re ready to plan it for real. Chile and Argentina here are the southern (Patagonia) portions — the northern portions already appear in Pan-American Grand Tour. Antarctica may not yet appear in the Countries sheet dropdown — cosmetic only, the block still works. The Antarctica budget reflects a real expedition-cruise price, not a backpacker estimate.\n\n' +
      'Tijdscontrole (2026-07): Chili (15→24) en Argentinië (11→18) fors opgehoogd — beide onderschatten hoe weersafhankelijk Patagonische trekking is (wind/regen annuleren regelmatig wandeldagen bij Torres del Paine en Fitz Roy/Cerro Torre); Antarctica (11 dagen) volgt de lengte van een echte expeditiecruise en blijft ongewijzigd. Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.\n\n' +
      'Vervolg (2026-07): budgetten per land (Chili en Argentinië) meegeschaald met de opgehoogde dagen; Antarctica-budget ongewijzigd (cruise-prijs, niet dagen-afhankelijk).',
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
    best_starting_month: 'Oktober',
    travel_style: 'Trein en lokale bus in India (met een binnenlandse vlucht als de afstand dat rechtvaardigt), georganiseerde trekking in Nepal met lokale gids/porter, verplichte gids en vaste dagprijs in Bhutan.',
    climate_summary: "Vergeleken scenario's: (1) een start in de Indiase zomer (april-juni) is bloedheet in Rajasthan/Delhi (regelmatig 40°C+) en valt daarna middenin de moesson (juli-september) voor zowel Noord-India als Nepal; (2) een start in de Nepalese lente (maart-april) geeft mooie rododendrons maar valt in India's heetste periode als je daar eerst doorheen reist; (3) een start begin oktober laat Noord-India net na de moesson in het aangename koele seizoen vallen (droog, heldere lucht, tot december comfortabel), en brengt je in november bij Nepal — het beste trekkingvenster van het jaar (net na de moesson, helderste zicht op de bergen, vóór winterse sneeuwval op de hoge passen) — gevolgd door Bhutan in november-december, ook nog binnen hun goede seizoen. Beste keuze: start begin oktober in Noord-India, zodat de expeditie (circa 2 maanden) medio december in Bhutan eindigt, met alle drie de landen in hun beste periode.",
    description: 'Van de grote Indiase hoogtepunten (Gouden Driehoek, Rajasthan, Varanasi) via Nepalese bergen naar het besloten koninkrijk Bhutan.',
    notes: 'Imported from a ChatGPT brainstorm — seeded with zero blocks: group these 3 countries into your own blocks via the region dropdown whenever you\'re ready to plan it for real.\n\n' +
      'Tijdscontrole (2026-07): dagen per land opgehoogd (50→59 dagen totaal) — vooral Nepal (17→21, "Annapurna Region" was vaag: als daar een basiskamptrek bij hoort is meer tijd nodig) en India-Noord (26→30, Indiase treinen/wegen lopen vaker uit dan gepland). Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.\n\n' +
      'Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen.',
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
        code: 'CA', name: 'Canada', days: 8, budget: 1200,
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
        code: 'CA', name: 'Canada', days: 10, budget: 1675,
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
        code: 'CA', name: 'Canada', days: 17, budget: 3400,
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
        code: 'CA', name: 'Canada', days: 5, budget: 875,
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
        code: 'US', name: 'United States', days: 15, budget: 3000,
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
        code: 'US', name: 'United States', days: 14, budget: 2675,
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
      'Plaats binnen de wereldreisplanning: vult Noord-Amerika in naast Eurasia Grand Tour, Pan-American Grand Tour, Africa Grand Tour en de Pacific/overige routes — samen dekken deze de grote continentale blokken van de wereldreis. Dagen/budget/bestemmingen/transport hierboven zijn een eerste research-opzet (net als bij de andere expedities), nog niet getoetst aan actuele prijzen, grensregels of persoonlijke voorkeuren — behandel dit als een eerste concept om te verfijnen, geen boekbaar plan.\n\n' +
      'Tijdscontrole (2026-07): kleine ophogingen bij vrijwel elke etappe (54→69 dagen totaal), vooral de Canadian Rockies (13→17, de eigen notitie "2-3 nachten per park" telt bij 6 parkgebieden sneller op dan gedacht) en de twee westkust-roadtrip-etappes (11→15 en 11→14, Yosemite en San Francisco verdienen allebei meer dan een paar dagen). Etappes en volgorde ongewijzigd; de juni-startmaand en klimaatredenering hierboven blijven kloppen met de extra dagen.\n\n' +
      'Vervolg (2026-07): budgetten per etappe meegeschaald met de aangepaste dagen.',
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

  rbRoutes.push(rbBuildOceaniaExpeditionRoute());
  rbSave();
}

/**
 * Oceania Grand Expedition — designed 2026-07 in a Q&A session with Claude, based on Youri's own
 * design brief (route, countries, Pacific island groups, Australia/New Zealand breakdown, travel
 * time, budget, transport, season). Region-grouped (4 regions) like Eurasia/Pan-American/
 * Mediterranean/North America, built directly here rather than through RB_EXPEDITION_CONTENT since
 * Australia and New Zealand each appear as multiple distinct legs (repeated country codes), the
 * same reason Mediterranean/North America are hand-authored. Days use the "ideal" tempo tier;
 * budgets are the midpoint between Budget Backpacker and Comfort Backpacker (Youri's own chosen
 * travel style, between the two). Shared by the fresh-seed path (rbSeedOceaniaExpedition) and the
 * migration path (rbMigrateOceaniaExpeditionBuild), so both produce identical content.
 */
function rbBuildOceaniaExpeditionRoute() {
  return rbBuildSeedRoute('Oceania Grand Expedition 🌊', [
    {
      name: 'Pacific Opener',
      season: 'Mei-juni',
      budget: 3310,
      note: 'Vijf eilandengroepen in het droge seizoen, ruim vóór het cycloonseizoen (november-april) — de rustige, ontspannen opener van de expeditie.',
      countries: [
        {
          code: 'FJ', name: 'Fiji', days: 14, budget: 875,
          destinations: ['Nadi', 'Mamanuca-eilanden', 'Yasawa-eilanden', 'Taveuni'],
          notes: "Beste backpacker-infrastructuur van de Pacific — eilandhoppen per boot (Yasawa Flyer) tussen de Mamanucas en Yasawas, snorkelen en duiken op de koraalriffen.",
          transport_to_next: 'Vlucht Nadi-Port Vila (Fiji Airways, de belangrijkste Pacific-hub)',
        },
        {
          code: 'VU', name: 'Vanuatu', days: 11, budget: 770,
          destinations: ['Port Vila', 'Mount Yasur (Tanna)', 'SS President Coolidge wrak (Espiritu Santo)', 'Blue Holes'],
          notes: "Een van de meest toegankelijke actieve vulkanen ter wereld — tot vlak bij de kraterrand van Mount Yasur. Wereldklasse wrakduik op de SS President Coolidge.",
          transport_to_next: "Vlucht Port Vila-Apia (meestal met overstap via Fiji of Auckland)",
        },
        {
          code: 'WS', name: 'Samoa', days: 9, budget: 565,
          destinations: ['Apia', 'To Sua Ocean Trench', 'Lalomanu (beach fales)', 'Upolu'],
          notes: "Authentieke Polynesische cultuur, nog weinig aangetast door massatoerisme. Beach fales zijn traditionele, budgetvriendelijke strandhutjes — precies de rustige, lokale ervaring die bij deze reisstijl past.",
          transport_to_next: "Vlucht Apia-Nuku'alofa (meestal met overstap via Fiji)",
        },
        {
          code: 'TO', name: 'Tonga', days: 8, budget: 540,
          destinations: ["Nuku'alofa", "Vava'u (zwemmen met bultrugwalvissen)", "Ha'apai"],
          notes: "Een van de weinige plekken ter wereld waar je legaal mag zwemmen met bultrugwalvissen — het beste seizoen daarvoor is juli-oktober, dus check de exacte timing bij het plannen van de startdatum.",
          transport_to_next: "Vlucht Nuku'alofa-Rarotonga (lage frequentie, ruim van tevoren boeken)",
        },
        {
          code: 'CK', name: 'Cook Islands', days: 7, budget: 560,
          destinations: ['Rarotonga', 'Aitutaki-lagune'],
          notes: "De Aitutaki-lagune is minstens zo mooi als Bora Bora, voor een fractie van de prijs — het beste prijs-kwaliteitpunt van de hele Pacific voor lagune-schoonheid.",
          transport_to_next: 'Vlucht Rarotonga-Perth (lange vlucht, meestal met overstap via Auckland of Sydney) — de grootste enkele vliegverbinding van de hele expeditie, nodig om van de Pacific naar het droge seizoen in West-Australië te komen',
        },
      ],
    },
    {
      name: 'Tropisch Australië',
      season: 'Juni-augustus',
      budget: 4905,
      note: 'Droog seizoen: de Kimberley-wegen zijn begaanbaar, geen moesson, geen kwallenseizoen bij Cairns.',
      countries: [
        {
          code: 'AU', name: 'Australia', days: 21, budget: 1840,
          destinations: ['Perth', 'Ningaloo Reef (walvishaaien)', 'Kimberley & Bungle Bungles', 'Gibb River Road', 'Broome'],
          notes: 'Ningaloo Reef en de Kimberley zijn spectaculair en kennen weinig massatoerisme — sterke match met natuur boven luxe. Wel de duurste/verste regio van de hele route qua afstanden; eerste kandidaat om in te korten als tijd/budget krap wordt.',
          transport_to_next: 'Auto over land via de Gibb River Road en Kununurra naar Darwin, of vlucht Broome-Darwin voor wie de Kimberley liever per vliegtuig oversteekt',
        },
        {
          code: 'AU', name: 'Australia', days: 14, budget: 1225,
          destinations: ['Darwin', 'Kakadu National Park', 'Litchfield National Park', 'Uluru', 'Kata Tjuta', 'Kings Canyon'],
          notes: 'Top End en Red Centre samen — de meest iconische landschappen van Australië. Juni-augustus is ook de koelste periode voor Uluru (overdag nog prima te wandelen, niet de verzengende hitte van de zomer).',
          transport_to_next: 'Vlucht Alice Springs-Cairns of Darwin-Cairns (over land zou via de outback-highways dagenlang duren)',
        },
        {
          code: 'AU', name: 'Australia', days: 21, budget: 1840,
          destinations: ['Cairns', 'Daintree Rainforest', 'Great Barrier Reef', 'Whitsundays & Whitehaven Beach', "Fraser Island / K'gari"],
          notes: 'Sterkste match met snorkelen/duiken/wildlife uit de wensenlijst. Droog seizoen betekent ook geen kwallenseizoen (dat loopt november-mei) bij Cairns.',
          transport_to_next: 'Bus of camper over land langs de oostkust (Cairns-Brisbane-Byron Bay-Sydney), de klassieke backpacker-trail',
        },
      ],
    },
    {
      name: 'Gematigd Australië',
      season: 'Augustus-september',
      budget: 3765,
      note: 'Late winter/vroege lente — koeler dan de zomerpiek (december-februari), maar goed te doen; het bewuste compromis van deze route (zie de klimaatredenering van de hele expeditie).',
      countries: [
        {
          code: 'AU', name: 'Australia', days: 12, budget: 1050,
          destinations: ['Byron Bay', 'Sydney', 'Blue Mountains'],
          notes: 'Klassieke backpacker-trail met goede infrastructuur; Sydney is te iconisch om over te slaan.',
          transport_to_next: 'Auto over land via de kust of de Hume Highway naar Melbourne',
        },
        {
          code: 'AU', name: 'Australia', days: 10, budget: 875,
          destinations: ['Great Ocean Road', 'Melbourne', 'Grampians National Park'],
          notes: 'De beste roadtrip-ervaring van het hele land — sluit perfect aan bij "roadtrips waar dat logisch is".',
          transport_to_next: 'Veerboot Spirit of Tasmania (Melbourne-Devonport) of korte vlucht naar Hobart/Launceston',
        },
        {
          code: 'AU', name: 'Australia', days: 12, budget: 1050,
          destinations: ['Cradle Mountain', 'Wineglass Bay (Freycinet)', 'Overland Track', 'Hobart'],
          notes: 'Ruige natuur, weinig massatoerisme — sterke match met deze reisstijl. Augustus-september is nog fris (soms sneeuw in het hooggebergte), dus pak warme kleding in.',
          transport_to_next: 'Vlucht Hobart-Adelaide (meestal met overstap in Melbourne)',
        },
        {
          code: 'AU', name: 'Australia', days: 9, budget: 790,
          destinations: ['Adelaide', 'Kangaroo Island', 'Barossa Valley', 'Flinders Ranges'],
          notes: "Kangaroo Island is uitstekend voor wildlife (zeeleeuwen, koala's) — de sterkste match met de wildlife-wens uit dit blok. Barossa Valley (wijn) is de eerste kandidaat om te laten vervallen als er ingekort moet worden.",
          transport_to_next: 'Vlucht Adelaide-Christchurch (meestal met overstap in Sydney of Melbourne)',
        },
      ],
    },
    {
      name: 'Nieuw-Zeeland Finale',
      season: 'September-november',
      budget: 2800,
      note: 'Voorjaar — stabiel weer, rustiger dan de zomerdrukte (december-februari); door reisgidsen vaak aangeraden als shoulder season. Het emotionele hoogtepunt van de hele expeditie, bewust als afsluiter gekozen.',
      countries: [
        {
          code: 'NZ', name: 'New Zealand', days: 21, budget: 1680,
          destinations: ['Christchurch', 'Kaikoura', 'Abel Tasman', 'Franz Josef & Fox-gletsjers', 'Queenstown', 'Milford Sound & Fiordland', 'Dunedin & Catlins'],
          notes: 'Concentreert het merendeel van de iconische Nieuw-Zeelandse natuur. Overweeg minstens één Great Walk (Milford Track, Routeburn of Kepler) als meerdaagse hut-to-hut-trek — ruim van tevoren reserveren.',
          transport_to_next: 'Veerboot Picton-Wellington, over land verder het Noordereiland in',
        },
        {
          code: 'NZ', name: 'New Zealand', days: 14, budget: 1120,
          destinations: ['Wellington', 'Tongariro Alpine Crossing', 'Rotorua', 'Coromandel', 'Bay of Islands', 'Auckland'],
          notes: 'De Tongariro Alpine Crossing is de beste dagwandeling van het land. Rotorua voor geothermische verschijnselen en Māori-cultuur.',
          transport_to_next: 'Einde van de expeditie — terugvlucht vanuit Auckland naar Nederland',
        },
      ],
    },
  ], {
    travel_style: "Backpacker tussen budget en comfort in — hostels afgewisseld met privékamers, camper/huurauto voor de roadtrip-stukken (Australië, Nieuw-Zeeland), vluchten tussen de Pacific-eilanden (geen praktisch bootalternatief), ferry's waar dat kan (Spirit of Tasmania, Picton-Wellington).",
    best_starting_month: 'Mei',
    description: 'Complete reis door Oceanië: de mooiste Pacific-eilanden als rustige opener, gevolgd door tropisch en gematigd Australië, met Nieuw-Zeeland als emotionele afsluiter. Geoptimaliseerd voor de mooiste totaalervaring, niet voor het aantal landen.',
    climate_summary: "Vergeleken scenario's: (1) de Pacific-eilanden en tropisch Australië (Kimberley, Top End, Cairns) willen allebei het droge seizoen (mei-oktober) — buiten dat venster is er cycloonrisico, moesson en afgesloten onverharde wegen; (2) Nieuw-Zeeland en gematigd Australië (Tasmanië, Victoria) willen juist hun eigen zomer (november-maart) — deze twee vensters overlappen niet en dekken samen het hele jaar. Door te beginnen bij de Pacific-eilanden (mei-juni) en tropisch Australië (juni-augustus), en te eindigen met gematigd Australië (augustus-september) en Nieuw-Zeeland (september-november), land je in het Nieuw-Zeelandse voorjaar — een door reisgidsen vaak aangeraden shoulder season met stabiel weer en minder drukte, ook al is het niet de absolute zomerpiek. Beste keuze: start begin mei bij Fiji, zodat de expeditie (circa 6 maanden) eind oktober/begin november in Nieuw-Zeeland eindigt. Alternatief: wie Nieuw-Zeeland/Tasmanië liever in hun volle zomer (december-februari) doet, kan een bewuste pauze van een paar maanden inbouwen tussen het tropische blok en Nieuw-Zeeland — dat maakt de expeditie 9-10 maanden in plaats van 6.",
    notes: "Ontworpen in een Q&A-sessie met Claude (2026-07), op basis van een conceptvragenlijst van Youri over route, landen, eilandengroepen, Australië/Nieuw-Zeeland-indeling, reistijd, budget, transport en seizoen. Dagen zijn de 'ideale' tempo-schatting (niet het krappe minimum, niet het meest rustige tempo); budgetten zijn het gemiddelde van Budget Backpacker en Comfort Backpacker (Youri's zelfgekozen reisstijl, tussen die twee in).\n\n" +
      "Bewust buiten deze route gelaten: Frans-Polynesië en Nieuw-Caledonië (mooi maar prijzig — alleen toevoegen als bewuste splurge, niet meegenomen in dit kernontwerp), en Palau, de Solomon-eilanden, Micronesië, Kiribati en Papoea-Nieuw-Guinea (geografisch een grote omweg, te duur, of logistiek te zwaar voor een soepele backpacker-flow — kandidaten voor een aparte, specialistische reis ooit).\n\n" +
      "Totaal: 183 dagen (~6 maanden), €14.780 grondkosten + circa €3.500-4.000 aan vluchten (Europa-Oceanië, Australië-interne vluchten, Australië-Nieuw-Zeeland, en losse tickets tussen elk Pacific-eiland). Nog niet getoetst aan actuele prijzen of reisadviezen — behandel dit als een eerste concept, geen boekbaar plan.",
  });
}

function rbSeedCaribbeanExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_CARIBBEAN)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_CARIBBEAN, '1');

  rbRoutes.push(rbBuildCaribbeanAmazonExpeditionRoute());
  rbSave();
}

/**
 * Caribbean & Amazon Expedition — designed 2026-07 in a Q&A session with Claude, based on a
 * ChatGPT-brainstormed country list Youri brought in (Cuba, Jamaica, the Dutch ABC islands,
 * four Lesser Antilles, Suriname, North Brazil) plus his own preferred name over ChatGPT's
 * "Caribbean & Guianas Expedition". Region-grouped (4 regions) like Eurasia/Pan-American/
 * Mediterranean/North America/Oceania. Days use the "ideal" tempo tier; budgets are the
 * midpoint between the "Goedkoop" and "Normaal" backpacker tiers from the design discussion
 * (Youri's own chosen travel style, between the two — same positioning as Oceania's
 * Budget/Comfort midpoint). Route order was reordered from the original brainstorm: the Dutch
 * ABC islands moved right after Jamaica (they sit far west of the Lesser Antilles and Suriname,
 * so visiting them after the Lesser Antilles would mean backtracking west then east again).
 * Shared by the fresh-seed path (rbSeedCaribbeanExpedition) and the migration path
 * (rbMigrateCaribbeanAmazonBuild), so both produce identical content.
 */
function rbBuildCaribbeanAmazonExpeditionRoute() {
  return rbBuildSeedRoute('Caribbean & Amazon Expedition 🌴', [
    {
      name: 'Grote Antillen',
      season: 'December',
      budget: 2160,
      note: 'Droog seizoen, ruim na het orkaanseizoen (dat loopt juni-november) — een veilige, aangename opener.',
      countries: [
        {
          code: 'CU', name: 'Cuba', days: 18, budget: 1260,
          destinations: ['Havana (Habana Vieja)', 'Trinidad', 'Cienfuegos', 'Viñales-vallei'],
          notes: "Havana en het UNESCO-koloniale Trinidad zijn de hoogtepunten; de rustige Viñales-vallei (tabak, karstlandschap) is de verborgen parel. Casas particulares (particuliere kamers) zijn de gangbare backpacker-accommodatie.",
          transport_to_next: 'Vlucht Havana-Kingston (meestal met overstap via Panama City of Miami)',
        },
        {
          code: 'JM', name: 'Jamaica', days: 12, budget: 900,
          destinations: ['Kingston', 'Blue Mountains', "Dunn's River Falls", 'Port Antonio'],
          notes: 'Blue Mountains (koffie, wandelen) en Port Antonio (rafting, watervallen, nauwelijks toeristen vergeleken met Negril/Ocho Rios) zijn de sterkste match met natuur boven luxe.',
          transport_to_next: 'Vlucht Kingston-Curaçao (meestal met overstap via Panama City of Miami)',
        },
      ],
    },
    {
      name: 'Nederlandse Caraïben',
      season: 'December-januari',
      budget: 1085,
      note: 'Droog seizoen — helderder water voor snorkelen en duiken.',
      countries: [
        {
          code: 'CW', name: 'Curaçao', days: 7, budget: 560,
          destinations: ['Willemstad (UNESCO)', 'Shete Boka National Park', 'stranden'],
          notes: 'Willemstad met zijn Nederlandse koloniale architectuur is de stedelijke tegenhanger van rustig Bonaire. Shete Boka (ruige noordkust) is de verborgen parel, veel rustiger dan de stranden.',
          transport_to_next: 'Korte vlucht Curaçao-Bonaire',
        },
        {
          code: 'BQ', name: 'Bonaire', days: 6, budget: 525,
          destinations: ['Washington Slagbaai National Park', 'duiken/snorkelen (marine park)'],
          notes: 'Wereldklasse duiken/snorkelen direct vanaf de kust. Washington Slagbaai NP (flamingo\'s, ruige natuur) is de verborgen parel, nauwelijks bezocht.',
          transport_to_next: 'Vlucht Bonaire-Guadeloupe (meestal met overstap via Aruba, Panama City of San Juan)',
        },
      ],
    },
    {
      name: 'Kleine Antillen',
      season: 'Januari-februari',
      budget: 2265,
      note: "Droog seizoen (carême) — beste moment om te wandelen in Dominica's regenwoud. De eilandvolgorde volgt de natuurlijke noord-zuid keten, en toevallig ook de veerbootlijn L'Express des Îles.",
      countries: [
        {
          code: 'GP', name: 'Guadeloupe', days: 7, budget: 615,
          destinations: ['La Soufrière (vulkaan)', 'Carbet-watervallen', 'Îles des Saintes'],
          notes: 'Franse Caraïbische cultuur gecombineerd met een actieve vulkaan. Îles des Saintes (kleine eilandjes voor de kust) is veel rustiger dan het hoofdeiland.',
          transport_to_next: "Veerboot L'Express des Îles naar Dominica (via Martinique)",
        },
        {
          code: 'DM', name: 'Dominica', days: 8, budget: 580,
          destinations: ['Boiling Lake-trektocht', 'Trafalgar Falls', 'Champagne Reef'],
          notes: '"Nature Island" — het minst ontwikkelde en meest ongerepte eiland van de vier. De Boiling Lake-trektocht is een zware hele dag op zich; reken op een rustdag ervoor of erna. Champagne Reef (vulkanische bubbels tijdens het snorkelen) is uniek.',
          transport_to_next: "Veerboot L'Express des Îles naar St Lucia",
        },
        {
          code: 'LC', name: 'Saint Lucia', days: 7, budget: 560,
          destinations: ['The Pitons', 'Sulphur Springs (drive-in vulkaan)', 'Tet Paul Nature Trail'],
          notes: 'De iconische Pitons, meer toeristisch ontwikkeld dan de andere drie. Tet Paul Nature Trail geeft hetzelfde uitzicht op de Pitons, veel rustiger dan de drukke wandelpaden.',
          transport_to_next: 'Vlucht St Lucia-Grenada (niet op de veerbootlijn)',
        },
        {
          code: 'GD', name: 'Grenada', days: 7, budget: 510,
          destinations: ['Onderwaterbeeldenpark', 'kruidenplantages (nootmuskaat)', 'Grand Etang National Park'],
          notes: 'Het minst toeristische van de vier eilanden. Grand Etang NP (regenwoud, kratermeer) is de verborgen parel.',
          transport_to_next: 'Vlucht Grenada-Suriname (meestal met overstap via Trinidad)',
        },
      ],
    },
    {
      name: 'Suriname & Amazone',
      season: 'Februari-maart',
      budget: 1445,
      note: "Suriname's korte droge tijd valt hier precies goed voor jungle-/rivierentochten. Noord-Brazilië's duinenkust (Jericoacoara/Lençóis) is dan net buiten zijn absolute piekseizoen (juni-januari) — het enige geaccepteerde compromis van de hele route.",
      countries: [
        {
          code: 'SR', name: 'Suriname', days: 11, budget: 605,
          destinations: ['Paramaribo (UNESCO)', 'Marrondorpen aan de rivier', 'Brownsberg Nature Park'],
          notes: 'Nederlandse koloniale geschiedenis in Paramaribo, gecombineerd met een rivierreis naar Marrondorpen in het binnenland — reken op 3-5 dagen voor een fatsoenlijke jungletocht naast de stad. Brownsberg (uitzicht over het Brokopondostuwmeer) is de verborgen parel.',
          transport_to_next: 'Vlucht Paramaribo-Belém (schaarse rechtstreekse verbindingen; waarschijnlijk met overstap via Cayenne, Georgetown of een Braziliaanse hub — vooraf goed checken)',
        },
        {
          code: 'BR', name: 'Brazil', days: 14, budget: 840,
          destinations: ['Belém', 'Ilha do Marajó', 'Lençóis Maranhenses', 'Jericoacoara', 'Fortaleza'],
          notes: 'De overgang van de Amazone-riviermonding (Belém, Marajó — buffels, ongerept rivierdelta-eiland) naar de compleet andere zandduinenkust (Lençóis Maranhenses, Jericoacoara) als adembenemende afsluiter. De afstanden langs de kust worden vaak onderschat.',
          transport_to_next: 'Einde van de expeditie — terugvlucht vanuit Fortaleza (of via São Paulo) naar Nederland',
        },
      ],
    },
  ], {
    travel_style: "Backpacker tussen goedkoop en normaal in — hostels en casas particulares afgewisseld met af en toe een privékamer, de veerboot L'Express des Îles waar mogelijk (Guadeloupe-Dominica-St Lucia), vluchten voor de rest van de eilandsprongen (geen praktisch bootalternatief).",
    best_starting_month: 'December',
    description: 'Reis door de Caribische wereld en de overgang naar Zuid-Amerika: koloniale geschiedenis, vulkanische natuur en eilandculturen, gevolgd door Suriname en de Amazone-riviermonding in Noord-Brazilië als afsluiter. Geoptimaliseerd voor de meest unieke plekken, niet voor het aantal eilanden.',
    climate_summary: "Vergeleken met Oceania is dit een relatief eenvoudige seizoenspuzzel: het orkaanseizoen in de Caribische Zee loopt 1 juni-30 november (piek half augustus-oktober), terwijl Suriname en Noord-Brazilië buiten de orkaangordel liggen (te dicht bij de evenaar). Bij een start op 1 december en een ideale duur van circa 97 dagen (~3,2 maanden) eindigt de expeditie begin maart — ruim binnen het droge/veilige seizoen (december-mei) voor het hele Caribische deel, zonder ooit dichtbij het orkaanseizoen te komen. Suriname's korte droge tijd (februari-maart) valt er ook nog net in. Enige compromis: Noord-Brazilië's duinenkust (Jericoacoara/Lençóis) is op zijn mooist juni-januari (droog, sterke wind voor de lagunes) — bij een decemberstart val je daar net buiten. Alternatief (3-4 maanden later starten) zou wél het beste Caribische droge seizoen missen en dichter bij het orkaanseizoen uitkomen — per saldo is 1 december de betere afweging.",
    notes: "Ontworpen in een Q&A-sessie met Claude (2026-07), op basis van een ChatGPT-brainstorm die Youri aandroeg (route, landen, tijdsindeling, budget, logistiek). Naam \"Caribbean & Amazon Expedition\" gekozen boven ChatGPT's \"Caribbean & Guianas Expedition\" — herkenbaarder en dekt zowel Suriname's binnenland als Noord-Brazilië's regenwoud/kust beter dan de vaktechnische term \"Guianas\". Dagen zijn de 'ideale' tempo-schatting; budgetten zijn het gemiddelde van het Goedkope en Normale backpackbudget uit de ontwerpdiscussie (Youri's zelfgekozen reisstijl, tussen die twee in).\n\n" +
      "Eén routewijziging t.o.v. de oorspronkelijke brainstorm: de Nederlandse ABC-eilanden (Curaçao/Bonaire) zijn verplaatst naar direct na Jamaica in plaats van na de Kleine Antillen — geografisch liggen ze fors westelijker dan de Kleine Antillen en Suriname, dus in de oorspronkelijke volgorde zou je eerst ver oostwaarts reizen en daarna weer helemaal terug naar het westen. De eilandvolgorde binnen de Kleine Antillen zelf (Guadeloupe-Dominica-St Lucia-Grenada) was al correct — dat is zowel de natuurlijke noord-zuid keten als de route van de veerboot L'Express des Îles.\n\n" +
      "Overlap-controle: geen van de tien onderdelen is geschrapt — de vier Kleine Antillen lijken oppervlakkig op elkaar maar hebben elk een eigen signatuur (Guadeloupe: Franse cultuur + vulkaan; Dominica: meest ongerepte regenwoud; St Lucia: iconische Pitons, meer ontwikkeld; Grenada: kruiden + minst toeristisch), en Suriname/Noord-Brazilië zijn complementair (rivier-regenwoud met Marroncultuur versus riviermonding-delta plus een compleet andere duinenkust).\n\n" +
      "Totaal: 97 dagen (~3,2 maanden), €6.955 grondkosten + circa €3.000-3.500 aan vluchten (Caribische eilandhop-vluchten zijn berucht prijzig per afstand door weinig concurrentie; Suriname-Noord-Brazilië is waarschijnlijk de lastigste/duurste losse verbinding). Nog niet getoetst aan actuele prijzen, visumregels of reisadviezen — behandel dit als een eerste concept, geen boekbaar plan.",
  });
}

function rbSeedWestCentralAfricaExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_WCAFRICA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_WCAFRICA, '1');

  rbRoutes.push(rbBuildWestCentralAfricaExpeditionRoute());
  rbSave();
}

/**
 * West & Central Africa Expedition — designed 2026-07 in a Q&A session with Claude, based on a
 * ChatGPT-brainstormed country list Youri brought in (Cape Verde, Senegal, Gambia, Ivory Coast,
 * Ghana, Togo, Benin, Cameroon, São Tomé & Príncipe, Gabon, Angola). Region-grouped (4 regions)
 * like Eurasia/Pan-American/Mediterranean/North America/Oceania/Caribbean & Amazon. Days use the
 * "ideal" tempo tier; budgets are the midpoint between the "Goedkoop" and "Realistisch" backpacker
 * tiers from the design discussion. Two adjustments made after Youri reviewed the design: Taï
 * National Park dropped from Ivory Coast (remote, costs 3-4 extra days), and Cameroon's content
 * shifted from Mount Cameroon/Limbe (Southwest Region, an active conflict zone since 2016) to
 * Douala/Kribi/Yaoundé (stable Francophone regions). Angola was deliberately moved out to Africa
 * Grand Tour instead — see rbMigrateAngolaIntoAfricaGrandTour() — since it borders Namibia (already
 * on that route) rather than sitting here as an isolated flight-only endpoint; Gabon is now this
 * route's finale. Shared by the fresh-seed path (rbSeedWestCentralAfricaExpedition) and the
 * migration path (rbMigrateWestCentralAfricaBuild), so both produce identical content.
 */
function rbBuildWestCentralAfricaExpeditionRoute() {
  return rbBuildSeedRoute('West & Central Africa Expedition 🌍', [
    {
      name: 'Kaapverdische Eilanden',
      season: 'November',
      budget: 780,
      note: 'Net na het regenseizoen (augustus-oktober) — het droge seizoen loopt tot juni. Rustige, aangename opener.',
      countries: [
        {
          code: 'CV', name: 'Cape Verde', days: 13, budget: 780,
          destinations: ['Santo Antão (Ribeira Grande, Paúl-vallei)', 'São Vicente (Mindelo)', 'Fogo (Pico do Fogo-vulkaan, wijngaarden)'],
          notes: "Bewust andere eilanden dan een eerder bezoek (niet opnieuw Sal) — Santo Antão voor de dramatische wandelvalleien, São Vicente voor de muziekcultuur van Mindelo, Fogo voor de vulkaanbeklimming en wijnbouw op vulkanische grond. Onderling per veerboot (goedkoper, minder betrouwbaar schema) of Binter Cabo Verde-vlucht.",
          transport_to_next: 'Vlucht Praia/Sal-Dakar, korte oversteek naar het vasteland.',
        },
      ],
    },
    {
      name: 'Senegambia',
      season: 'November-december',
      budget: 858,
      note: 'Begin van het West-Afrikaanse droge seizoen (november-april).',
      countries: [
        {
          code: 'SN', name: 'Senegal', days: 13, budget: 618,
          destinations: ['Dakar', 'Île de Gorée', 'Saint-Louis (UNESCO)', 'Sine-Saloum-delta', 'Lompoul-woestijn'],
          notes: "Île de Gorée (slavernijgeschiedenis, korte boot vanaf Dakar) en Saint-Louis (koloniale hoofdstad) zijn de historische zwaartepunten; Sine-Saloum (mangroves, vogels) en de Lompoul-duinen geven een compleet ander natuurbeeld binnen één land.",
          transport_to_next: 'Bus/deeltaxi over land naar Gambia via de Senegambia-brug (geopend 2019, een stuk vlotter dan de vroegere veerpont).',
        },
        {
          code: 'GM', name: 'Gambia', days: 6, budget: 240,
          destinations: ['Banjul', 'Gambia-rivier (bootcruise)', 'Kunta Kinteh Island (UNESCO, slavernijgeschiedenis)', 'Makasutu Culture Forest'],
          notes: "Klein maar met een eigen, herkenbaar hoogtepunt: Kunta Kinteh Island (voorheen James Island) is een van de belangrijkste slavernij-erfgoedsites van West-Afrika.",
          transport_to_next: 'Vlucht naar Abidjan — geen praktische landroute (Guinee-Bissau, Guinee, Sierra Leone en Liberia liggen ertussen, te veel omweg/visa voor deze reisstijl).',
        },
      ],
    },
    {
      name: 'Golf van Guinee',
      season: 'December-januari',
      budget: 1634,
      note: 'Harmattan-seizoen — droog maar stoffig, de beste periode om hier te reizen.',
      countries: [
        {
          code: 'CI', name: 'Ivory Coast', days: 7, budget: 333,
          destinations: ['Abidjan (Le Plateau)', 'Grand-Bassam (UNESCO koloniale stad)'],
          notes: "Taï National Park is bewust weggelaten — prachtig, maar de afgelegen ligging kost 3-4 dagen extra reistijd voor chimpansees die ook elders in West-/Centraal-Afrika te zien zijn. Abidjan en Grand-Bassam houden dit land compact en de moeite waard.",
          transport_to_next: 'Bus over land naar Ghana via de grensovergang Elubo — een gevestigde backpacker-route.',
        },
        {
          code: 'GH', name: 'Ghana', days: 15, budget: 713,
          destinations: ['Accra', 'Cape Coast Castle', 'Elmina Castle', 'Kakum National Park (boomtoppenpad)', 'Volta-regio (Wli-watervallen, Mount Afadjato)'],
          notes: "Cape Coast en Elmina Castle zijn de zwaarste, belangrijkste slavernijgeschiedenis-sites van de hele expeditie. Ghana heeft verreweg het rijkste programma van de reis — vandaar de meeste tijd.",
          transport_to_next: 'Bus over land naar Togo via de grensovergang Aflao.',
        },
        {
          code: 'TG', name: 'Togo', days: 4, budget: 160,
          destinations: ['Lomé', 'Togoville (Vodun-cultuur, Lac Togo)'],
          notes: "Bewust kort — Togo voegt met zijn Duitse koloniale geschiedenis (vóór de latere Franse overname) wel een andere invalshoek toe dan Ghana/Benin, maar heeft weinig hoogtepunten. Ligt toch al direct op de route, dus lage extra kosten om aan te doen.",
          transport_to_next: 'Bus over land naar Benin via de grensovergang Hillacondji.',
        },
        {
          code: 'BJ', name: 'Benin', days: 9, budget: 428,
          destinations: ['Ouidah (Route des Esclaves, Door of No Return)', 'Ganvié (paalwoningdorp op het meer)', 'Abomey (koninklijke paleizen, UNESCO)'],
          notes: "Precies de combinatie die deze expeditie zoekt: oude koninkrijken (Abomey, het voormalige Dahomey), slavernijgeschiedenis (Ouidah) en levende Vodun-cultuur.",
          transport_to_next: "Vlucht Cotonou-Douala (meestal met overstap) — overland door Nigeria is voor deze reis geen optie, de enige onvermijdelijke sprong van de hele route.",
        },
      ],
    },
    {
      name: 'Centraal-Afrika & Eilanden',
      season: 'Januari-februari',
      budget: 1888,
      note: "Kameroens minst natte periode (november-februari) en Gabons korte droge seizoen (december-februari) vallen hier samen; São Tomé is de uitzondering (regenseizoen, zie de klimaatredenering van de hele route).",
      countries: [
        {
          code: 'CM', name: 'Cameroon', days: 8, budget: 380,
          destinations: ['Douala', 'Kribi (Chutes de la Lobé, zwarte stranden)', 'Yaoundé'],
          notes: 'Aangepast t.o.v. het oorspronkelijke plan: Mount Cameroon en Limbe liggen in de Zuidwest-regio, waar sinds 2016 een gewapend conflict speelt (de "Anglophone Crisis") — reisadviezen hebben dit gebied in verschillende periodes afgeraden. In plaats daarvan Douala, Kribi (de Chutes de la Lobé stromen letterlijk de zee in — uniek) en Yaoundé, allemaal in de stabielere Franstalige Littoral/Centre-regio\'s. Check de actuele situatie in het Zuidwesten vlak vóór vertrek — mocht die verbeterd zijn, dan is Mount Cameroon alsnog het overwegen waard als toevoeging.',
          transport_to_next: 'Vlucht Douala-São Tomé (regionale verbinding).',
        },
        {
          code: 'ST', name: 'São Tomé and Príncipe', days: 9, budget: 653,
          destinations: ['São Tomé (roças/plantages, regenwoud)', 'Príncipe (afgelegen, minder bezocht)'],
          notes: "Uniek in de hele Travel Atlas: Portugese koloniale plantagegeschiedenis op een klein, rustig tropisch eiland. Valt in het regenseizoen (oktober-mei) bij deze route — vooral middagbuien, geen aanhoudende moesson.",
          transport_to_next: 'Vlucht São Tomé-Libreville (regionale verbinding).',
        },
        {
          code: 'GA', name: 'Gabon', days: 9, budget: 855,
          destinations: ['Loango National Park (surfende nijlpaarden, bosolifanten op het strand)', 'Libreville', 'regenwoud'],
          notes: "Bewuste, sterke afsluiter van de hele expeditie — Loango is een van de weinige plekken ter wereld waar je olifanten en nijlpaarden op het strand ziet. Valt toevallig in zijn korte droge seizoen (december-februari) bij deze route.",
          transport_to_next: 'Einde van de expeditie — terugvlucht vanuit Libreville naar Nederland (meestal met overstap).',
        },
      ],
    },
  ], {
    travel_style: "Backpacker, geen harde tijdslimiet — hostels/eenvoudige guesthouses met af en toe een privékamer, bus/deeltaxi overland waar mogelijk (Senegal t/m Benin), vluchten voor de onvermijdelijke sprongen (Kaapverdië-Senegal, Gambia-Ivoorkust, Benin-Kameroen, en tussen Kameroen/São Tomé/Gabon).",
    best_starting_month: 'November',
    description: 'Backpack-expeditie door West- en Centraal-Afrika: Atlantische eilandcultuur, oude West-Afrikaanse koninkrijken, slavernijgeschiedenis en Centraal-Afrikaans regenwoud/wildlife. Geoptimaliseerd voor de mooiste en meest unieke ervaring, niet voor het aantal landen.',
    climate_summary: "Vergeleken scenario's: (1) een zomerstart (juni-augustus) zou Kaapverdië/Senegal t/m Benin middenin hun regenseizoen zetten (mei-oktober) — enige voordeel is dat het samenvalt met Gabons lange droge periode (juni-augustus), maar dat weegt niet op tegen de rest; (2) een start begin november laat vrijwel de hele route in zijn beste seizoen vallen: Kaapverdië net na het regenseizoen, Senegal t/m Benin in hun volledige droge seizoen (november-april, met de stoffige maar droge harmattan december-februari), Kameroen in zijn minst natte periode (november-februari), en Gabon toevallig in zijn korte droge periode (december-februari). Enige compromis: São Tomé & Príncipe's eigen droge seizoen (\"gravana\") loopt juni-september — bij een novemberstart val je daar in het regenseizoen, voornamelijk middagbuien in plaats van aanhoudende regen. Beste keuze: start begin november in Kaapverdië.",
    notes: "Ontworpen in een Q&A-sessie met Claude (2026-07), op basis van een ChatGPT-brainstorm die Youri aandroeg (route, landen, tijdschema, budget, transport, veiligheid, omvang-check). Dagen zijn de 'ideale' tempo-schatting; budgetten zijn het gemiddelde van het Goedkope backpackbudget en het Realistische budget uit de ontwerpdiscussie.\n\n" +
      "Twee aanpassingen na Youri's review van het ontwerp: (1) Taï National Park in Ivoorkust laten vervallen — afgelegen, kost 3-4 dagen extra voor chimpansees die ook elders te zien zijn; Ivoorkust blijft beperkt tot Abidjan + Grand-Bassam. (2) Kameroen aangepast: Mount Cameroon en Limbe liggen in de Zuidwest-regio, waar sinds 2016 een gewapend conflict speelt (de Anglophone Crisis) — vervangen door Douala, Kribi (Chutes de la Lobé) en Yaoundé, allemaal in de stabielere Franstalige regio's. Check de actuele veiligheidssituatie in het Zuidwesten vlak vóór vertrek.\n\n" +
      "Angola is bewust uit deze expeditie gehaald en verplaatst naar Africa Grand Tour in plaats daarvan — geografisch grenst het direct aan Namibië (al onderdeel van die route), een veel logischer aansluiting dan de geïsoleerde flight-only eindstop die het hier zou zijn. Dit verwijdert ook de onzekerste/duurste vlucht van deze route (Gabon-Angola); Gabon is nu het nieuwe, sterke eindpunt (Loango's surfende nijlpaarden). Let op: deze verplaatsing lost het seizoensprobleem niet op — Angola valt ook in Africa Grand Tour's Southern Africa-regio in het regenseizoen, hetzelfde al geaccepteerde compromis van die route.\n\n" +
      "Totaal: 93 dagen (~3,1 maanden), €5.160 grondkosten + circa €2.400-2.800 aan vluchten (Kaapverdië-Senegal, Gambia-Ivoorkust, Benin-Kameroen en de Centraal-Afrikaanse eilandsprongen zijn stuk voor stuk vluchten met weinig concurrentie, dus prijzig per afstand). Nog niet getoetst aan actuele prijzen, visumregels of reisadviezen — behandel dit als een eerste concept, geen boekbaar plan. Check vooral de veiligheidssituatie in Kameroens Zuidwest-regio vlak vóór vertrek.",
  });
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
 * One-time overhaul: the route formerly called "Ancient Civilizations Expedition" / "North Africa
 * & Middle East Expedition 🏜️" (Morocco, Tunisia, Egypt, Jordan, Oman, UAE, Cyprus — flat, zero
 * blocks) is replaced by a much larger, fully-researched "Mediterranean Civilizations Expedition
 * 🏛️" — 18 legs across 13 countries from Andalusia to Qatar, built from a detailed ChatGPT
 * brainstorm. Because the country list, region grouping and per-leg content are all different
 * (not just a rename or an empty-field patch), this fully replaces the route's blocks/regions/
 * description rather than patching empty fields — same wholesale-replace approach
 * rbMigrateExpeditionRenames() used when it split Jordan/Oman out of the Africa route. Runs once;
 * no-ops for a browser that's never seeded before (fresh seeds already get the Mediterranean
 * content directly via rbSeedAncientCivilizationsExpedition/rbBuildMediterraneanExpeditionRoute).
 */
function rbMigrateAncientToMediterranean() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_MEDITERRANEAN)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_MEDITERRANEAN, '1');

  const oldNames = ['Ancient Civilizations Expedition', 'North Africa & Middle East Expedition 🏜️'];
  const idx = rbRoutes.findIndex(r => oldNames.includes(r.name));
  if (idx === -1) return;

  rbRoutes.splice(idx, 1, rbBuildMediterraneanExpeditionRoute());
  rbSave();
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

/**
 * One-time correction pass following a full realism/time audit (2026-07): the ChatGPT-brainstormed
 * day counts for most countries were unrealistically low for slow, backpacker-style travel (arrive,
 * see the highlight, leave). This forces the corrected `days` from RB_EXPEDITION_CONTENT onto
 * already-seeded blocks — an unconditional overwrite, unlike rbPatchExpeditionContent's empty-only
 * fill, because these values aren't empty, they're wrong. It also fills in the previously-blank
 * region season/budget for Eurasia/Pan-American, the previously-blank route-level travel_style/
 * best_starting_month/climate_summary for Eurasia, Africa, Nordic Arctic, Patagonia & Antarctica
 * and India & Himalaya (plus travel_style/climate_summary for Pan-American, which already had
 * best_starting_month), and patches the two hand-authored routes (Mediterranean Civilizations,
 * North America Grand Traverse) whose repeated country codes (Italy x4, France x2, Canada x4, US
 * x2) can't be matched by code alone — those two are matched by each leg's first destination
 * instead. No countries are added, removed or reordered; only durations and the season/style/
 * climate metadata around them.
 */
function rbMigrateTimeAuditCorrections() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_TIMEAUDIT)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_TIMEAUDIT, '1');

  const TABLE_DRIVEN_ROUTES = [
    'Eurasia Grand Tour 🌏', 'Pan-American Grand Tour 🌎', 'Africa Grand Tour 🌍',
    'Nordic Arctic Expedition ❄️', 'Patagonia & Antarctica Expedition 🧊', 'India & Himalaya Expedition 🏔️',
  ];

  const EURASIA_REGION_META = {
    'Balkans': { season: 'April–juni', budget: 2850, note: 'Mild voorjaar, voor de zomerdrukte en -hitte — sluit aan op een vroege start van de hele expeditie.' },
    'Turkey': { season: 'Juni', budget: 1300, note: 'Aansluitend op de Balkan, nog vóór de zwaarste zomerhitte in Cappadocië en het binnenland.' },
    'Caucasus': { season: 'Juni–augustus', budget: 1475, note: 'Bergpassen en Svaneti zijn dan sneeuwvrij; sluit direct aan op het Centraal-Aziatische bergseizoen.' },
    'Central Asia': { season: 'Juni–september', budget: 2900, note: 'De Pamir Highway en hooggelegen passen zijn alleen in deze maanden begaanbaar — buiten dit venster ligt er sneeuw/ijs.' },
    'China': { season: 'September', budget: 1625, note: 'Na de zomerdrukte/-hitte, ruim vóór de Mongoolse winterkou die erna komt.' },
    'Mongolia': { season: 'Eind augustus–september', budget: 575, note: 'Vóór de vrieskou vanaf oktober; de Gobi is dan nog droog en warm genoeg voor een meerdaagse 4x4-tocht.' },
    'Japan': { season: 'Oktober–november', budget: 2700, note: 'Herfstkleuren, en rustiger dan de kersenbloesem-drukte in het voorjaar.' },
    'Taiwan': { season: 'November', budget: 750, note: 'Droog en mild, vóór het koelere winterseizoen in het noorden van het eiland.' },
    'Mainland Southeast Asia': { season: 'December–februari', budget: 3275, note: 'Het droge seizoen op het vasteland van Zuidoost-Azië — geen moesson, aangename temperaturen.' },
    'Maritime Southeast Asia': { season: 'Februari–maart', budget: 2100, note: "Nog droog in de meeste regio's, vóór de moesson die later in het voorjaar begint." },
    'Indonesia': { season: 'Maart', budget: 875, note: "Droog seizoen loopt in de meeste regio's door tot april/mei — Bali, Gili, Lombok en Komodo nog prima begaanbaar." },
  };

  const PANAM_REGION_META = {
    'Mexico': { season: 'November–december', budget: 1000, note: 'Droog seizoen, na de zomerse regens.' },
    'Northern Central America': { season: 'December–januari', budget: 1625, note: 'Droog seizoen, orkaanseizoen voorbij.' },
    'Southern Central America': { season: 'Januari–februari', budget: 1975, note: 'Pacifische droge seizoen in Costa Rica/Panama — beste tijd voor de kust.' },
    'Colombia': { season: 'Februari–maart', budget: 1000, note: 'Droog in zowel de Caribische regio als de koffiezone/Andes.' },
    'Ecuador': { season: 'Maart–april', budget: 1025, note: "Sierra droog genoeg voor wandelen; Galápagos is jaarrond goed maar rustiger in dit seizoen." },
    'Peru': { season: 'April–mei', budget: 1050, note: "Het Andes-droogseizoen begint — ideaal voor Cusco/Vallei van de Inca's en Huaraz-trekking." },
    'Bolivia': { season: 'Mei–juni', budget: 425, note: 'Droog seizoen, heldere Uyuni-zoutvlakte (let op: geen spiegel-effect zoals in het natte seizoen — een bewuste ruil).' },
    'Northern Chile': { season: 'Juni–juli', budget: 400, note: 'Northern Chile only (Atacama, Antofagasta) — Patagonia is a separate future expedition. De Atacama is jaarrond droog; koude nachten in de Chileense winter, overdag prima.' },
    'Northern Argentina': { season: 'Juli', budget: 350, note: 'Northern Argentina only (Salta, Jujuy) — Patagonia is a separate future expedition. Droog hoogseizoen in Salta/Jujuy, koude nachten in het hooggebergte.' },
    'Southern Brazil': { season: 'Juli–augustus', budget: 1000, note: 'Southern Brazil only — Northern Brazil is a separate future expedition. Zuid-Braziliaanse winter: mild en droog voor sightseeing (Iguaçu, koloniale steden), maar geen strandweer; voor strandtijd de hele reis 1-2 maanden later starten.' },
  };

  const ROUTE_LEVEL_META = {
    'Eurasia Grand Tour 🌏': {
      best_starting_month: 'April',
      travel_style: 'Backpacker — overland waar mogelijk (bus, trein, marshrutka/deeltaxi), vluchten alleen waar geen praktische grondroute bestaat (Baku-Almaty, de eilandsprongen in Zuidoost-Azië). Lokale guesthouses en hostels boven internationale ketens.',
      climate_summary: "Vergeleken scenario's: (1) een winterstart houdt de Balkan mild, maar sluit de Pamir Highway en Song-Kul in Centraal-Azië volledig af (onbegaanbare bergpassen) en treft Mongolië in zijn strengste vrieskou (-20 tot -30°C); (2) een zomerstart (juni-juli) is ideaal voor de Kaukasus en Centraal-Azië, maar laat de Balkan en Turkije in de drukste, heetste maanden vallen én brengt het vasteland van Zuidoost-Azië middenin het regenseizoen (juni-oktober); (3) een start begin april laat de Balkan nog in een mild voorjaar vallen, bereikt de Kaukasus/Centraal-Azië rond juni-september (bergpassen open), komt in september-oktober in China/Mongolië aan (na de zomerhitte, vóór de winterkou), bereikt Japan in oktober-november (herfstkleuren), en laat heel Zuidoost-Azië in december-maart vallen (droog seizoen). Beste keuze: start begin april in de Balkan, zodat vrijwel elke etappe van deze ~11-12 maanden durende expeditie in zijn beste seizoen valt.",
      notesAppend: "Tijdscontrole (2026-07): dagen per land zijn na een volledige realismecontrole opgehoogd (van 200 naar 344 dagen totaal, ~11-12 maanden) zodat elk land ook echt te ervaren is in plaats van alleen aan te doen — vooral China (12→28), Turkije (12→24), Filipijnen (10→21) en Indonesië (12→21) waren fors onderschat. Turkmenistan (3 dagen) is bewust ongewijzigd gelaten — dat is een visumgrens (transitvisum), geen onderschatting. Landen en volgorde zijn ongewijzigd gebleven; alleen de duur per land, de regio-seizoenen/-budgetten hierboven en deze klimaatredenering zijn toegevoegd. Overweeg desondanks om deze route ooit te knippen in twee losse expedities (West-Eurazië t/m Centraal-Azië, en Oost-Eurazië/Azië) — 11-12 maanden aaneengesloten is fors, ook voor langzaam reizen.",
    },
    'Pan-American Grand Tour 🌎': {
      travel_style: 'Backpacker — lokale bussen (chicken bus tot luxere overlandbus) door Midden-Amerika en de Andes, af en toe een binnenlandse vlucht waar de afstand dat rechtvaardigt (bv. Salta-Foz do Iguaçu), zeilboot door de San Blas-eilanden i.p.v. vliegen over de Darién Gap.',
      climate_summary: "Deze route is al climate-optimized ontworpen (vandaar de novemberstart) — de region-seizoenen hierboven maken dat expliciet: elke regio krijgt de maand toebedeeld die volgt uit een geleidelijke opmars naar het zuiden vanaf 1 november, tot en met Zuid-Brazilië rond juli-augustus. De enige makke van deze opzet: bij een reis van ~9 maanden valt de kustfinale in Zuid-Brazilië (Florianópolis, stranden) in de Zuid-Amerikaanse winter — prima voor sightseeing (Iguaçu, koloniale steden), maar geen strandweer. Wie strandtijd in Brazilië belangrijk vindt, kan de hele reis 1-2 maanden later starten of een paar dagen inkorten bij de eerdere regio's zodat de finale weer in het voor- of naseizoen valt.",
      notesAppend: "Tijdscontrole (2026-07): dit was al de best getempode expeditie (274→286 dagen, beperkt aangepast) — Guatemala t/m Ecuador en Bolivia kregen elk een paar dagen extra, terwijl Chili-noord en Argentinië-noord juist zijn ingekort (12→10 en 14→10) omdat één woestijnregio niet de volledige oorspronkelijke tijd nodig had; Mexico, Colombia en Peru waren al ideaal en zijn ongewijzigd. De region-niveau seizoenen hierboven volgen de novemberstart maand voor maand naar het zuiden toe; let op dat de Zuid-Brazilië-finale daardoor in de Zuid-Amerikaanse winter valt (mild, prima voor sightseeing, maar geen strandweer).",
    },
    'Africa Grand Tour 🌍': {
      best_starting_month: 'Juni',
      travel_style: 'Overland/safaritrucks tussen parken, verplichte lokale gidsen bij gorillatrekking (Oeganda/Rwanda), mix van budgetlodges en kamperen in de nationale parken, vluchten alleen tussen Tanzania/Madagaskar/Mauritius (geen landroute mogelijk over water).',
      climate_summary: "Vergeleken scenario's: (1) een start in de Europese winter (december-januari) vermijdt Egypte's zomerhitte, maar treft Oost-Afrika dan in de korte regentijd en laat zuidelijk Afrika aan het einde van de reis in hún regenseizoen vallen (november-maart, lastiger wildlife spotten); (2) een start in juni laat Egypte nog in een aangenaam voorjaar/vroege zomer vallen, brengt Oost-Afrika (Kenia, Tanzania, Oeganda, Rwanda) rond augustus-oktober in hun droge seizoen — inclusief een deel van de Serengeti-trek — maar laat zuidelijk Afrika (Zambia t/m Zuid-Afrika) rond januari-maart vallen, middenin hún regenseizoen. Bij het behouden van de huidige landvolgorde (Egypte als start, Zuid-Afrika/Lesotho/Eswatini als afsluiting) is er geen enkele startmaand die zowel Oost- als zuidelijk Afrika in hun droge seizoen laat vallen — de twee liggen op tegengestelde droge/natte cycli t.o.v. hoe lang deze reis duurt. Beste compromis: start juni, zodat het zwaartepunt van de reis (Oost-Afrika, de eilanden en de eerste helft van zuidelijk Afrika) wél in het droge seizoen valt; alleen de laatste etappes (Namibië, Zuid-Afrika, Lesotho, Eswatini) vallen dan in het regenseizoen — nog steeds goed te doen, want de grote zelfrijafstanden in Namibië en de Kaapse Wijnlanden/Tuinroute blijven jaarrond aangenaam; alleen Kruger-wildlife spotten is dan iets lastiger dan in het droge seizoen. Wie zuidelijk Afrika liever in het droge seizoen doet, kan ooit een omgekeerde volgorde overwegen (Zuid-Afrika eerst) — dat is een aparte, toekomstige afweging en verandert de huidige route niet.",
      notesAppend: 'Tijdscontrole (2026-07): dagen per land opgehoogd na een realismecontrole (247→277 dagen totaal) — vooral Oeganda (gorillatrekking-logistiek), Madagaskar (berucht trage wegen) en Mozambique (het land strekt zich noord-zuid enorm uit) waren onderschat. Landen en volgorde zijn ongewijzigd; alleen de duur per land en de klimaatredenering hierboven zijn toegevoegd.',
    },
    'Nordic Arctic Expedition ❄️': {
      best_starting_month: 'Juni',
      travel_style: 'Trein/bus in Scandinavië, vluchten voor de eilandsprongen (Svalbard, Faeröer, IJsland, Groenland) waar geen boot- of landroute bestaat, kleine guesthouses en de enkele hut/expeditieboot waar relevant.',
      climate_summary: "Vergeleken scenario's: (1) een winterstart (december-februari) levert noorderlicht op in Finland/Zweden/Noorwegen, maar sluit Svalbard-boottochten (zee-ijs), IJslands hooglandwegen en de boottochten bij Faeröer/Groenland vrijwel volledig af, met te korte en te koude dagen voor de wandelroutes; (2) een start in mei loopt nog risico op resterend zee-ijs bij Svalbard en gesloten hooglandwegen in IJsland; (3) een start begin juni treft alle zeven bestemmingen in hun enige gedeelde goede seizoen: middernachtzon in Scandinavië, toegankelijk zee-ijs en boottochten bij Svalbard, betrouwbaardere veerdiensten en wandelweer bij de Faeröer, volledig open hooglandwegen in IJsland, en de beste boottoegang tot de Diskobaai-ijsbergen bij Ilulissat in Groenland. Beste keuze: start begin juni, zodat de expeditie (circa 2-2,5 maand) eind augustus eindigt, ruim vóór de eerste herfststormen in de Noord-Atlantische regio.",
      description: 'Zomerexpeditie door het hoge noorden — van Lapland via Noorse fjorden en eilanden naar Spitsbergen, de Faeröer, IJsland en Groenland, met middernachtzon als rode draad.',
      notesAppend: 'Tijdscontrole (2026-07): dagen per land licht opgehoogd (53→68 dagen totaal) — vooral Groenland (weersafhankelijke vluchten tussen plaatsen) en Noorwegen (Lofoten alleen al is fotografie/wandelen waard) waren krap. Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.',
    },
    'Patagonia & Antarctica Expedition 🧊': {
      best_starting_month: 'November',
      travel_style: 'Backpacker/trekking — refugios en camping in de nationale parken, lokale bussen tussen de Patagonische steden, het Antarctica-gedeelte via een georganiseerde expeditiecruise (geen andere manier om er te komen).',
      climate_summary: "Vergeleken scenario's: (1) een start in de Zuid-Amerikaanse winter (juni-augustus) sluit vrijwel alle trekkingroutes in Torres del Paine en rond El Chaltén af (sneeuw, korte dagen, gesloten refugios) en valt volledig buiten het Antarctica-vaarseizoen (alleen november-maart); (2) een start in de vroege lente (september-oktober) loopt nog risico op sneeuw op de hogere paden en valt nog vóór het vaarseizoen; (3) een start begin november valt samen met zowel het begin van het Patagonische trekkingseizoen (november-maart, refugios open, lange dagen) als het Antarctica-vaarseizoen (november-maart, met de meeste walvis-/pinguïnactiviteit in januari-februari). Beste keuze: start begin november in Chileens Patagonië, zodat de expeditie (circa 1,5-2 maand, met ruimere weerbuffers bij de trekkingetappes) in december-januari bij de Antarctica-cruise uitkomt — het hart van het seizoen.",
      description: 'Trekkingexpeditie door Chileens en Argentijns Patagonië, afgesloten met een expeditiecruise naar het Antarctisch Schiereiland.',
      notesAppend: 'Tijdscontrole (2026-07): Chili (15→24) en Argentinië (11→18) fors opgehoogd — beide onderschatten hoe weersafhankelijk Patagonische trekking is (wind/regen annuleren regelmatig wandeldagen bij Torres del Paine en Fitz Roy/Cerro Torre); Antarctica (11 dagen) volgt de lengte van een echte expeditiecruise en blijft ongewijzigd. Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.',
    },
    'India & Himalaya Expedition 🏔️': {
      best_starting_month: 'Oktober',
      travel_style: 'Trein en lokale bus in India (met een binnenlandse vlucht als de afstand dat rechtvaardigt), georganiseerde trekking in Nepal met lokale gids/porter, verplichte gids en vaste dagprijs in Bhutan.',
      climate_summary: "Vergeleken scenario's: (1) een start in de Indiase zomer (april-juni) is bloedheet in Rajasthan/Delhi (regelmatig 40°C+) en valt daarna middenin de moesson (juli-september) voor zowel Noord-India als Nepal; (2) een start in de Nepalese lente (maart-april) geeft mooie rododendrons maar valt in India's heetste periode als je daar eerst doorheen reist; (3) een start begin oktober laat Noord-India net na de moesson in het aangename koele seizoen vallen (droog, heldere lucht, tot december comfortabel), en brengt je in november bij Nepal — het beste trekkingvenster van het jaar (net na de moesson, helderste zicht op de bergen, vóór winterse sneeuwval op de hoge passen) — gevolgd door Bhutan in november-december, ook nog binnen hun goede seizoen. Beste keuze: start begin oktober in Noord-India, zodat de expeditie (circa 2 maanden) medio december in Bhutan eindigt, met alle drie de landen in hun beste periode.",
      description: 'Van de grote Indiase hoogtepunten (Gouden Driehoek, Rajasthan, Varanasi) via Nepalese bergen naar het besloten koninkrijk Bhutan.',
      notesAppend: 'Tijdscontrole (2026-07): dagen per land opgehoogd (50→59 dagen totaal) — vooral Nepal (17→21, "Annapurna Region" was vaag: als daar een basiskamptrek bij hoort is meer tijd nodig) en India-Noord (26→30, Indiase treinen/wegen lopen vaker uit dan gepland). Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.',
    },
  };

  const MEDITERRANEAN_LEG_FIXES = [
    { firstDestination: 'Colosseum', days: 7 },
    { countryCode: 'TR', days: 20 },
  ];
  const MEDITERRANEAN_NOTES_APPEND = "Tijdscontrole (2026-07): Rome (4→7 dagen — de Vaticaanse Musea alleen al zijn een volle dag, en Rome is berucht de meest onderschatte stad in reisplanningen) en de Turkije/Anatolië-etappe (14→20 dagen — Istanbul plus Troje, Pergamon, Efeze, Pamukkale én Cappadocië is een landbrede route) waren te krap. De rest van de expeditie klopte al goed. Met de extra 9 dagen (totaal nu 147 in plaats van 138) schuift het einde van half januari naar begin februari, nog steeds ruim vóór de Golf-zomerhitte — de klimaatredenering hierboven blijft dus overeind.";

  const NORTH_AMERICA_LEG_FIXES = [
    { firstDestination: 'Halifax', days: 8 },
    { firstDestination: 'Quebec City (Vieux-Québec)', days: 10 },
    { firstDestination: 'Banff National Park', days: 17 },
    { firstDestination: 'Stanley Park', days: 5 },
    { firstDestination: 'Seattle (Pike Place Market, Space Needle)', days: 15 },
    { firstDestination: 'San Francisco (Golden Gate Bridge, Alcatraz, Mission District)', days: 14 },
  ];
  const NORTH_AMERICA_NOTES_APPEND = 'Tijdscontrole (2026-07): kleine ophogingen bij vrijwel elke etappe (54→69 dagen totaal), vooral de Canadian Rockies (13→17, de eigen notitie "2-3 nachten per park" telt bij 6 parkgebieden sneller op dan gedacht) en de twee westkust-roadtrip-etappes (11→15 en 11→14, Yosemite en San Francisco verdienen allebei meer dan een paar dagen). Etappes en volgorde ongewijzigd; de juni-startmaand en klimaatredenering hierboven blijven kloppen met de extra dagen.';

  rbRoutes.forEach(route => {
    let touched = false;

    // 1. Per-country day corrections for the 6 table-driven expeditions.
    if (TABLE_DRIVEN_ROUTES.includes(route.name)) {
      const content = RB_EXPEDITION_CONTENT[route.name];
      if (content) {
        route.blocks.forEach(block => {
          const c = content[block.country_code];
          if (c && c.days != null && block.days !== c.days) {
            block.days = c.days;
            touched = true;
          }
        });
      }
    }

    // 2. Mediterranean & North America: fixed by leg fingerprint (repeated country codes elsewhere).
    if (route.name === 'Mediterranean Civilizations Expedition 🏛️') {
      MEDITERRANEAN_LEG_FIXES.forEach(fix => {
        const block = route.blocks.find(b =>
          (fix.firstDestination && (b.destinations || [])[0] && (b.destinations || [])[0].name === fix.firstDestination) ||
          (fix.countryCode && !fix.firstDestination && b.country_code === fix.countryCode)
        );
        if (block && block.days !== fix.days) { block.days = fix.days; touched = true; }
      });
      if (route.notes && !route.notes.includes('Tijdscontrole (2026-07)')) {
        route.notes += '\n\n' + MEDITERRANEAN_NOTES_APPEND;
        touched = true;
      }
    }

    if (route.name === 'North America Grand Traverse 🌎') {
      NORTH_AMERICA_LEG_FIXES.forEach(fix => {
        const block = route.blocks.find(b => (b.destinations || [])[0] && (b.destinations || [])[0].name === fix.firstDestination);
        if (block && block.days !== fix.days) { block.days = fix.days; touched = true; }
      });
      if (route.notes && !route.notes.includes('Tijdscontrole (2026-07)')) {
        route.notes += '\n\n' + NORTH_AMERICA_NOTES_APPEND;
        touched = true;
      }
    }

    // 3. Region-level season/budget/notes for Eurasia & Pan-American (only fills blanks).
    if (route.name === 'Eurasia Grand Tour 🌏' || route.name === 'Pan-American Grand Tour 🌎') {
      const regionMeta = route.name === 'Eurasia Grand Tour 🌏' ? EURASIA_REGION_META : PANAM_REGION_META;
      (route.regions || []).forEach(region => {
        const meta = regionMeta[region.name];
        if (!meta) return;
        if (region.season === '' || region.season == null) { region.season = meta.season; touched = true; }
        if (region.budget === '' || region.budget == null) { region.budget = meta.budget; touched = true; }
        if (!region.notes) { region.notes = meta.note; touched = true; }
      });
    }

    // 4. Route-level travel_style / best_starting_month / climate_summary / description (only fills blanks).
    const routeMeta = ROUTE_LEVEL_META[route.name];
    if (routeMeta) {
      if (!route.best_starting_month && routeMeta.best_starting_month) { route.best_starting_month = routeMeta.best_starting_month; touched = true; }
      if (!route.travel_style && routeMeta.travel_style) { route.travel_style = routeMeta.travel_style; touched = true; }
      if (!route.climate_summary && routeMeta.climate_summary) { route.climate_summary = routeMeta.climate_summary; touched = true; }
      if (!route.description && routeMeta.description) { route.description = routeMeta.description; touched = true; }
      if (routeMeta.notesAppend && route.notes && !route.notes.includes('Tijdscontrole (2026-07)')) {
        route.notes += '\n\n' + routeMeta.notesAppend;
        touched = true;
      }
    }

    if (touched) rbSave();
  });
}

/**
 * Second correction pass (2026-07), a follow-up to rbMigrateTimeAuditCorrections(): rescales
 * every per-country/per-leg budget to match the corrected days (same daily rate, so more days =
 * proportionally more budget — rounded to the nearest €25 to match the existing data's
 * granularity), and groups the two remaining flat expeditions (Africa Grand Tour, Nordic Arctic
 * Expedition) into named regions with their own season/budget, matching the Eurasia/Pan-American
 * pattern. Uses its own flag (not reusing RB_MIGRATE_FLAG_2026_07_TIMEAUDIT) because that migration
 * may already have run — on this browser or any other — before these budget/region corrections
 * existed, in which case its empty-only region fill would have already written the old budget
 * numbers; those need a force-overwrite here, not another empty check. No countries, legs or their
 * order are added, removed or changed — only budgets and the region groupings around them.
 */
function rbMigrateBudgetAndRegionCorrections() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_BUDGET_REGIONS)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_BUDGET_REGIONS, '1');

  const TABLE_DRIVEN_ROUTES = [
    'Eurasia Grand Tour 🌏', 'Pan-American Grand Tour 🌎', 'Africa Grand Tour 🌍',
    'Nordic Arctic Expedition ❄️', 'Patagonia & Antarctica Expedition 🧊', 'India & Himalaya Expedition 🏔️',
  ];

  const EURASIA_REGION_BUDGET = {
    'Balkans': 2850, 'Turkey': 1300, 'Caucasus': 1475, 'Central Asia': 2900, 'China': 1625,
    'Mongolia': 575, 'Japan': 2700, 'Taiwan': 750, 'Mainland Southeast Asia': 3275,
    'Maritime Southeast Asia': 2100, 'Indonesia': 875,
  };
  const PANAM_REGION_BUDGET = {
    'Mexico': 1000, 'Northern Central America': 1625, 'Southern Central America': 1975,
    'Colombia': 1000, 'Ecuador': 1025, 'Peru': 1050, 'Bolivia': 425,
    'Northern Chile': 400, 'Northern Argentina': 350, 'Southern Brazil': 1000,
  };

  const MEDITERRANEAN_BUDGET_FIXES = [
    { firstDestination: 'Colosseum', budget: 700 },
    { countryCode: 'TR', budget: 850 },
  ];
  const MEDITERRANEAN_VERVOLG_NOTE = 'Vervolg (2026-07): budget voor Rome (400→700) en de Turkije/Anatolië-etappe (600→850) meegeschaald met de extra dagen; de rest van de expeditie ongewijzigd.';

  const NORTH_AMERICA_BUDGET_FIXES = [
    { firstDestination: 'Halifax', budget: 1200 },
    { firstDestination: 'Quebec City (Vieux-Québec)', budget: 1675 },
    { firstDestination: 'Banff National Park', budget: 3400 },
    { firstDestination: 'Stanley Park', budget: 875 },
    { firstDestination: 'Seattle (Pike Place Market, Space Needle)', budget: 3000 },
    { firstDestination: 'San Francisco (Golden Gate Bridge, Alcatraz, Mission District)', budget: 2675 },
  ];
  const NORTH_AMERICA_VERVOLG_NOTE = 'Vervolg (2026-07): budgetten per etappe meegeschaald met de aangepaste dagen.';

  const AFRICA_REGION_DEFS = [
    {
      name: 'Northeast & East Africa', season: 'Juni–september', budget: 12325,
      note: 'Egypte als historische/geografische poort, gevolgd door de Hoorn van Afrika en de Oost-Afrikaanse safarigordel — bij een junistart valt dit grotendeels in het droge seizoen (inclusief een deel van de Serengeti-trek).',
      codes: ['EG', 'ET', 'KE', 'UG', 'RW', 'TZ'],
    },
    {
      name: 'Islands', season: 'Oktober', budget: 2875,
      note: 'Madagaskar en Mauritius — Madagaskars beruchte trage wegen zijn hier de grootste tijdsvreter, niet de bezienswaardigheden zelf.',
      codes: ['MG', 'MU'],
    },
    {
      name: 'Southern Africa', season: 'November–januari', budget: 9875,
      note: 'Van Malawi tot Namibië — grote zelfrijafstanden, vooral in Namibië; valt bij deze volgorde grotendeels in het regenseizoen (zie de klimaatredenering van de hele route).',
      codes: ['MW', 'MZ', 'ZM', 'ZW', 'BW', 'NA'],
    },
    {
      name: 'South Africa Finale', season: 'Februari–maart', budget: 2650,
      note: 'Zuid-Afrika, Lesotho en Eswatini als afsluiting — Kruger-wildlife spotten is in dit seizoen iets lastiger, de rest (Kaapstad, Wijnlanden, Tuinroute) blijft jaarrond aangenaam.',
      codes: ['ZA', 'LS', 'SZ'],
    },
  ];
  const AFRICA_VERVOLG_NOTE = "Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen (zelfde dagprijs, dus meer dagen = evenredig meer budget), en de 17 landen alsnog gegroepeerd in 4 regio's (Northeast & East Africa, Islands, Southern Africa, South Africa Finale) met eigen seizoen/budget per regio, zoals Eurasia en Pan-American die al hadden. Landen, volgorde en dagen zijn ongewijzigd.";

  const NORDIC_REGION_DEFS = [
    {
      name: 'Scandinavia', season: 'Juni', budget: 4400,
      note: 'Lapland en Noorse fjorden/eilanden per trein en bus — de enige etappe van deze expeditie die nog over land te doen is.',
      codes: ['FI', 'SE', 'NO'],
    },
    {
      name: 'North Atlantic Islands', season: 'Juli–augustus', budget: 11925,
      note: 'Svalbard, Faeröer, IJsland en Groenland — stuk voor stuk losse vluchtsprongen, geen doorlopende route; reken op weerbuffers.',
      codes: ['SJ', 'FO', 'IS', 'GL'],
    },
  ];
  const NORDIC_VERVOLG_NOTE = "Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen, en de 7 landen alsnog gegroepeerd in 2 regio's (Scandinavia, North Atlantic Islands) met eigen seizoen/budget. Landen, volgorde en dagen zijn ongewijzigd.";

  function appendVervolg(route, note) {
    if (route.notes && !route.notes.includes('Vervolg (2026-07)')) {
      route.notes += '\n\n' + note;
      return true;
    }
    return false;
  }

  /** Groups an already-flat route's existing blocks into named regions by country code, in place — no block added/removed/reordered. No-ops if the route already has regions (manually added, or an earlier run of this same migration). */
  function buildRegionsForFlatRoute(route, regionDefs) {
    if ((route.regions || []).length) return false;
    route.regions = regionDefs.map(rd => ({
      id: rbNewRegionId(), name: rd.name, season: rd.season, budget: rd.budget, notes: rd.note, collapsed: false,
    }));
    route.blocks.forEach(block => {
      const idx = regionDefs.findIndex(rd => rd.codes.includes(block.country_code));
      if (idx !== -1) block.region_id = route.regions[idx].id;
    });
    return true;
  }

  rbRoutes.forEach(route => {
    let touched = false;

    // 1. Force-overwrite per-country/per-leg budgets for the 6 table-driven expeditions.
    if (TABLE_DRIVEN_ROUTES.includes(route.name)) {
      const content = RB_EXPEDITION_CONTENT[route.name];
      if (content) {
        route.blocks.forEach(block => {
          const c = content[block.country_code];
          if (c && c.budget != null && block.budget !== c.budget) { block.budget = c.budget; touched = true; }
        });
      }
    }

    // 2. Mediterranean & North America: budget fixes by leg fingerprint (repeated country codes elsewhere).
    if (route.name === 'Mediterranean Civilizations Expedition 🏛️') {
      MEDITERRANEAN_BUDGET_FIXES.forEach(fix => {
        const block = route.blocks.find(b =>
          (fix.firstDestination && (b.destinations || [])[0] && (b.destinations || [])[0].name === fix.firstDestination) ||
          (fix.countryCode && !fix.firstDestination && b.country_code === fix.countryCode)
        );
        if (block && block.budget !== fix.budget) { block.budget = fix.budget; touched = true; }
      });
      if (appendVervolg(route, MEDITERRANEAN_VERVOLG_NOTE)) touched = true;
    }

    if (route.name === 'North America Grand Traverse 🌎') {
      NORTH_AMERICA_BUDGET_FIXES.forEach(fix => {
        const block = route.blocks.find(b => (b.destinations || [])[0] && (b.destinations || [])[0].name === fix.firstDestination);
        if (block && block.budget !== fix.budget) { block.budget = fix.budget; touched = true; }
      });
      if (appendVervolg(route, NORTH_AMERICA_VERVOLG_NOTE)) touched = true;
    }

    // 3. Region-level budget force-refresh for Eurasia & Pan-American (season/notes untouched — those didn't change).
    if (route.name === 'Eurasia Grand Tour 🌏' || route.name === 'Pan-American Grand Tour 🌎') {
      const budgets = route.name === 'Eurasia Grand Tour 🌏' ? EURASIA_REGION_BUDGET : PANAM_REGION_BUDGET;
      (route.regions || []).forEach(region => {
        const b = budgets[region.name];
        if (b != null && region.budget !== b) { region.budget = b; touched = true; }
      });
      const vervolgNote = route.name === 'Eurasia Grand Tour 🌏'
        ? "Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen (zelfde dagprijs, dus meer dagen = evenredig meer budget) — regio-budgetten hierboven zijn de nieuwe sommen."
        : "Vervolg (2026-07): budgetten per land meegeschaald met de aangepaste dagen — regio-budgetten hierboven zijn de nieuwe sommen.";
      if (appendVervolg(route, vervolgNote)) touched = true;
    }

    // 4. Group Africa Grand Tour & Nordic Arctic Expedition into regions (only if still flat).
    if (route.name === 'Africa Grand Tour 🌍') {
      if (buildRegionsForFlatRoute(route, AFRICA_REGION_DEFS)) touched = true;
      if (appendVervolg(route, AFRICA_VERVOLG_NOTE)) touched = true;
    }
    if (route.name === 'Nordic Arctic Expedition ❄️') {
      if (buildRegionsForFlatRoute(route, NORDIC_REGION_DEFS)) touched = true;
      if (appendVervolg(route, NORDIC_VERVOLG_NOTE)) touched = true;
    }

    // 5. Patagonia & Antarctica / India & Himalaya: budget-only vervolg note (no region change — too few legs to benefit).
    if (route.name === 'Patagonia & Antarctica Expedition 🧊') {
      if (appendVervolg(route, 'Vervolg (2026-07): budgetten per land (Chili en Argentinië) meegeschaald met de opgehoogde dagen; Antarctica-budget ongewijzigd (cruise-prijs, niet dagen-afhankelijk).')) touched = true;
    }
    if (route.name === 'India & Himalaya Expedition 🏔️') {
      if (appendVervolg(route, 'Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen.')) touched = true;
    }

    if (touched) rbSave();
  });
}

/**
 * Country-composition change for Eurasia Grand Tour (2026-07), per Youri's explicit request:
 * remove Turkmenistan and Myanmar (hard to visit / not realistic for this travel style), insert
 * East Timor right after Indonesia (geographically adjacent, reachable via the Kupang/Batugade
 * land border), and move Singapore from the middle of Maritime Southeast Asia to the very last
 * block of the whole expedition as a deliberate finale. Unlike the earlier migrations (which only
 * changed field values), this one actually adds/removes/reorders blocks — so it force-rewrites the
 * block array instead of using an empty-check, and creates a new "Singapore Finale" region. Own
 * flag since this must run regardless of what the earlier migrations already did.
 */
function rbMigrateEurasiaCountryChanges() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_EURASIA_COUNTRIES)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_EURASIA_COUNTRIES, '1');

  const route = rbRoutes.find(r => r.name === 'Eurasia Grand Tour 🌏');
  if (!route) return;

  let touched = false;
  const content = RB_EXPEDITION_CONTENT['Eurasia Grand Tour 🌏'];

  // 1. Remove Turkmenistan and Myanmar entirely.
  const beforeCount = route.blocks.length;
  route.blocks = route.blocks.filter(b => b.country_code !== 'TM' && b.country_code !== 'MM');
  if (route.blocks.length !== beforeCount) touched = true;

  // 2. Pull Singapore out of its current spot — it gets re-appended at the very end below.
  const sgIndex = route.blocks.findIndex(b => b.country_code === 'SG');
  let sgBlock = null;
  if (sgIndex !== -1) {
    sgBlock = route.blocks.splice(sgIndex, 1)[0];
    touched = true;
  }

  // 3. Insert East Timor right after Indonesia, in the same region, if not already present.
  const idIndex = route.blocks.findIndex(b => b.country_code === 'ID');
  let tlBlock = route.blocks.find(b => b.country_code === 'TL');
  if (!tlBlock && idIndex !== -1 && content && content.TL) {
    tlBlock = rbBuildBlock('TL', 'East Timor', rbSeedBlockOpts(content.TL, { region_id: route.blocks[idIndex].region_id }));
    route.blocks.splice(idIndex + 1, 0, tlBlock);
    touched = true;
  }

  // 4. Rename the "Indonesia" region to include Timor, and create a new final region for Singapore.
  (route.regions || []).forEach(region => {
    if (region.name === 'Indonesia') {
      region.name = 'Indonesia & Oost-Timor';
      region.budget = 1275;
      touched = true;
    }
    if (region.name === 'Central Asia') { region.budget = 2600; touched = true; }
    if (region.name === 'Mainland Southeast Asia') { region.budget = 2750; touched = true; }
    if (region.name === 'Maritime Southeast Asia') { region.budget = 1650; touched = true; }
  });

  if (sgBlock) {
    let singaporeRegion = (route.regions || []).find(r => r.name === 'Singapore Finale');
    if (!singaporeRegion) {
      singaporeRegion = {
        id: rbNewRegionId(), name: 'Singapore Finale', season: 'Maart', budget: 450,
        notes: 'Bewuste, compacte afsluiting van de hele Eurasia-expeditie — een rustige stadsstop na Oost-Timor.',
        collapsed: false,
      };
      route.regions = route.regions || [];
      route.regions.push(singaporeRegion);
      touched = true;
    }
    if (sgBlock.region_id !== singaporeRegion.id) { sgBlock.region_id = singaporeRegion.id; touched = true; }
    route.blocks.push(sgBlock);
  }

  // 5. Force-refresh transport_to_next (and days/budget) for every block whose route-order context changed.
  if (content) {
    ['UZ', 'TH', 'MY', 'ID', 'TL', 'SG'].forEach(code => {
      const block = route.blocks.find(b => b.country_code === code);
      const c = content[code];
      if (!block || !c) return;
      if (block.transport_to_next !== c.transport_to_next) { block.transport_to_next = c.transport_to_next; touched = true; }
      if (block.days !== c.days) { block.days = c.days; touched = true; }
      if (block.budget !== c.budget) { block.budget = c.budget; touched = true; }
      if ((!block.destinations || !block.destinations.length) && c.destinations && c.destinations.length) {
        block.destinations = c.destinations.map(d => ({ id: rbNewDestId(), name: d, notes: '' }));
        touched = true;
      }
    });
  }

  // 6. Note the change.
  const note = 'Wijziging (2026-07): Turkmenistan en Myanmar verwijderd (lastig te bezoeken/niet reëel voor deze reisstijl), Oost-Timor toegevoegd direct na Indonesië, en Singapore verplaatst naar het allerlaatste blok van de hele expeditie als bewust eindpunt. Nieuw totaal: 27 landen (was 28), 336 dagen, €20.000.';
  if (route.notes && !route.notes.includes('Wijziging (2026-07)')) {
    route.notes += '\n\n' + note;
    touched = true;
  }

  if (touched) rbSave();
}

/**
 * Builds out the Oceania Grand Expedition (2026-07): it was seeded as backbone-only (zero blocks)
 * long before this design existed, so a fresh-seed re-run won't pick up the new content — this
 * wholesale-replaces the route the same way rbMigrateAncientToMediterranean() did for Mediterranean
 * Civilizations Expedition. Only touches the route if it's still empty (respects any blocks Youri
 * may have added by hand in the meantime).
 */
function rbMigrateOceaniaExpeditionBuild() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_OCEANIA_BUILD)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_OCEANIA_BUILD, '1');

  const idx = rbRoutes.findIndex(r => r.name === 'Oceania Grand Expedition 🌊');
  if (idx === -1) return;
  if (rbRoutes[idx].blocks.length > 0) return;

  rbRoutes.splice(idx, 1, rbBuildOceaniaExpeditionRoute());
  rbSave();
}

/**
 * Builds out the Caribbean & Amazon Expedition (2026-07): seeded as backbone-only under the name
 * "Caribbean Expedition 🏝️" long before this design existed, so it needs both a rename and a
 * wholesale content replace — same pattern as rbMigrateOceaniaExpeditionBuild(), just matched by
 * the old name since the name itself changed too. Only touches the route if it's still empty
 * (respects any blocks Youri may have added by hand in the meantime).
 */
function rbMigrateCaribbeanAmazonBuild() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_CARIBBEAN_AMAZON_BUILD)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_CARIBBEAN_AMAZON_BUILD, '1');

  const oldNames = ['Caribbean Expedition 🏝️', 'Caribbean & Amazon Expedition 🌴'];
  const idx = rbRoutes.findIndex(r => oldNames.includes(r.name));
  if (idx === -1) return;
  if (rbRoutes[idx].blocks.length > 0) return;

  rbRoutes.splice(idx, 1, rbBuildCaribbeanAmazonExpeditionRoute());
  rbSave();
}

/**
 * Builds out the West & Central Africa Expedition (2026-07): seeded as backbone-only (zero blocks)
 * long before this design existed, so a fresh-seed re-run won't pick up the new content — same
 * wholesale-replace pattern as rbMigrateOceaniaExpeditionBuild(). Only touches the route if it's
 * still empty (respects any blocks Youri may have added by hand in the meantime).
 */
function rbMigrateWestCentralAfricaBuild() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_WCAFRICA_BUILD)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_WCAFRICA_BUILD, '1');

  const idx = rbRoutes.findIndex(r => r.name === 'West & Central Africa Expedition 🌍');
  if (idx === -1) return;
  if (rbRoutes[idx].blocks.length > 0) return;

  rbRoutes.splice(idx, 1, rbBuildWestCentralAfricaExpeditionRoute());
  rbSave();
}

/**
 * Adds Angola to Africa Grand Tour's "Southern Africa" region (2026-07), right after Namibia —
 * they share a real overland border crossing (Oshikango/Santa Clara). Angola was originally part
 * of the West & Central Africa Expedition brainstorm but was moved here instead: geographically it
 * has real neighbors in this route rather than being an isolated flight-only endpoint there. This
 * does NOT fix any seasonal mismatch — Southern Africa here already falls in the rainy season by
 * this route's own design (see its climate_summary), and Angola shares that same accepted
 * trade-off, not a better one. From Angola, fly to Cape Town/Johannesburg to rejoin the South
 * Africa Finale rather than backtracking overland through Namibia.
 */
function rbMigrateAngolaIntoAfricaGrandTour() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_ANGOLA_ADDITION)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_ANGOLA_ADDITION, '1');

  const route = rbRoutes.find(r => r.name === 'Africa Grand Tour 🌍');
  if (!route) return;
  if (route.blocks.some(b => b.country_code === 'AO')) return;

  const naIndex = route.blocks.findIndex(b => b.country_code === 'NA');
  if (naIndex === -1) return;

  const naBlock = route.blocks[naIndex];
  naBlock.transport_to_next = 'Over land via de grensovergang Oshikango/Santa Clara richting Angola.';

  const angolaBlock = rbBuildBlock('AO', 'Angola', {
    region_id: naBlock.region_id,
    days: 11, budget: 1500,
    destinations: ['Luanda', 'Lubango', 'Serra da Leba', 'Tundavala-kloof', 'Namibe-woestijn'],
    notes: "Toegevoegd vanuit de West & Central Africa-ontwerpsessie (2026-07) — hier past het geografisch beter (grenst direct aan Namibië) dan als geïsoleerde flight-only eindstop in die andere expeditie. Gestabiliseerd sinds het einde van de burgeroorlog (2002); grootste uitdaging is kosten/bureaucratie (Luanda is berucht duur), niet acute onveiligheid.",
    transport_to_next: 'Vlucht Luanda-Kaapstad/Johannesburg (meestal met overstap) om weer aan te sluiten bij de South Africa Finale, in plaats van overland terug te reizen door Namibië.',
  });
  route.blocks.splice(naIndex + 1, 0, angolaBlock);

  const southernRegion = (route.regions || []).find(r => r.name === 'Southern Africa');
  if (southernRegion) southernRegion.budget = 11375;

  const note = "Toevoeging (2026-07): Angola toegevoegd aan de Southern Africa-regio, direct na Namibië (grensovergang Oshikango/Santa Clara), met een vlucht Luanda-Kaapstad/Johannesburg om weer aan te sluiten bij de South Africa Finale. Afkomstig uit de West & Central Africa-ontwerpsessie — daar paste Angola geografisch slechter (alleen per vlucht bereikbaar, geen buurlanden op die route). Let op: dit verandert niets aan het seizoenscompromis van deze regio (valt nog steeds in het regenseizoen bij de huidige juni-startmaand) — Angola deelt gewoon hetzelfde, al geaccepteerde compromis. Nieuw totaal: 288 dagen (was 277), €29.225 (was €27.725).";
  if (route.notes && !route.notes.includes('Toevoeging (2026-07): Angola')) {
    route.notes += '\n\n' + note;
  }

  rbSave();
}
