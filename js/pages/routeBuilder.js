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
const RB_SEED_FLAG_KEY_CEROADTRIP = 'atlas_grand_trips_seeded_ceroadtrip_v1';
const RB_SEED_FLAG_KEY_BRITISHISLES = 'atlas_grand_trips_seeded_britishisles_v1';
const RB_SEED_FLAG_KEY_EURASIA_SPLIT = 'atlas_grand_trips_seeded_eurasia_split_v1';
const RB_SEED_FLAG_KEY_PANAM_SPLIT = 'atlas_grand_trips_seeded_panam_split_v1';
const RB_SEED_FLAG_KEY_AFRICA_SPLIT = 'atlas_grand_trips_seeded_africa_split_v1';
const RB_SEED_FLAG_KEY_MEDITERRANEAN_SPLIT = 'atlas_grand_trips_seeded_mediterranean_split_v1';
const RB_SEED_FLAG_KEY_NORDIC_ARCTIC_SPLIT = 'atlas_grand_trips_seeded_nordic_arctic_split_v1';
const RB_SEED_FLAG_KEY_PATAGONIA_SPLIT = 'atlas_grand_trips_seeded_patagonia_split_v1';
const RB_SEED_FLAG_KEY_HIMALAYA_SPLIT = 'atlas_grand_trips_seeded_himalaya_split_v1';
const RB_SEED_FLAG_KEY_NORTHAMERICA_SPLIT = 'atlas_grand_trips_seeded_northamerica_split_v1';
const RB_SEED_FLAG_KEY_OCEANIA_SPLIT = 'atlas_grand_trips_seeded_oceania_split_v1';
const RB_SEED_FLAG_KEY_CARIBBEAN_SPLIT = 'atlas_grand_trips_seeded_caribbean_split_v1';
const RB_SEED_FLAG_KEY_WCAFRICA_SPLIT = 'atlas_grand_trips_seeded_wcafrica_split_v1';
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
const RB_MIGRATE_FLAG_2026_07_BAHRAIN_ADDITION = 'atlas_grand_trips_migrate_2026_07_bahrain_addition_v1';
const RB_MIGRATE_FLAG_2026_07_AFRICA_REORDER = 'atlas_grand_trips_migrate_2026_07_africa_reorder_v1';
const RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND1 = 'atlas_grand_trips_migrate_2026_07_price_verification_round1_v1';
const RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND2 = 'atlas_grand_trips_migrate_2026_07_price_verification_round2_v1';
const RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND3 = 'atlas_grand_trips_migrate_2026_07_price_verification_round3_v1';
const RB_MIGRATE_FLAG_2026_07_ROUTE_LINE_COORDS = 'atlas_grand_trips_migrate_2026_07_route_line_coords_v1';
const RB_MIGRATE_FLAG_2026_07_ROUTE_LINE_COORDS_ROUND2 = 'atlas_grand_trips_migrate_2026_07_route_line_coords_round2_v1';
const RB_MIGRATE_FLAG_2026_08_EURASIA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_eurasia_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_PATAGONIA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_patagonia_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_HIMALAYA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_himalaya_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_NORDIC_ARCTIC_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_nordic_arctic_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_CARIBBEAN_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_caribbean_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_CENTRAL_EUROPE_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_central_europe_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_BRITISH_ISLES_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_british_isles_overhaul_v1';
const RB_BLOCK_COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#f97316', '#14b8a6'];
const RB_HOME_LATLNG = [52.0907, 5.1214]; // Utrecht, NL — every expedition's implicit start/end point
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
  rbSeedCentralEuropeRoadtripExpedition();
  rbSeedBritishIslesExpedition();
  rbSeedEurasiaSplitExpeditions();
  rbSeedPanAmericanSplitExpeditions();
  rbSeedAfricaSplitExpeditions();
  rbSeedMediterraneanSplitExpeditions();
  rbSeedNordicArcticSplitExpeditions();
  rbSeedPatagoniaSplitExpeditions();
  rbSeedHimalayaSplitExpeditions();
  rbSeedNorthAmericaSplitExpeditions();
  rbSeedOceaniaSplitExpeditions();
  rbSeedCaribbeanSplitExpeditions();
  rbSeedWestCentralAfricaSplitExpeditions();
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
  rbMigrateBahrainIntoMediterraneanExpedition();
  rbMigrateAfricaGrandTourReorder();
  rbMigratePriceVerificationRound1();
  rbMigratePriceVerificationRound2();
  rbMigratePriceVerificationRound3();
  rbMigrateRouteLineCoords();
  rbMigrateRouteLineCoordsRound2();
  rbMigrateEurasiaRouteOverhaul();
  rbMigratePatagoniaRouteLogicOverhaul();
  rbMigrateHimalayaRouteLogicOverhaul();
  rbMigrateNordicArcticRouteLogicOverhaul();
  rbMigrateCaribbeanAmazonRouteLogicOverhaul();
  rbMigrateCentralEuropeRouteLogicOverhaul();
  rbMigrateBritishIslesRouteLogicOverhaul();
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

// ---- map view (highlights the route's countries, or draws the route as an ordered line) ----

let rbWorldGeoJSON = null;
let rbMiniMap = null;
let rbMiniMapLayer = null;
let rbMiniMapLineLayer = null;
let rbMiniMapDetailedLayer = null;
let rbMapMode = 'countries'; // 'countries' | 'line' | 'detailed'

/**
 * A handful of countries (Fiji, Russia, ...) have ring geometry that crosses the ±180° antimeridian.
 * Without this, Leaflet draws a straight line across the entire map between e.g. lng 179 and -179
 * instead of a short segment near the dateline — the stray horizontal lines Youri spotted on the
 * "Landen" map. Fix: "unwrap" each ring's longitudes so they stay continuous past ±180 instead of
 * jumping back — the map's maxBounds already extends to ±200 to accommodate exactly this, so an
 * unwrapped point (e.g. lng 181 instead of -179) still renders in its correct on-screen position.
 */
function rbFixAntimeridian(geojson) {
  const unwrapRing = ring => {
    let offset = 0;
    const out = [ring[0]];
    for (let i = 1; i < ring.length; i++) {
      const [lng, lat] = ring[i];
      let adjusted = lng + offset;
      const prevLng = out[i - 1][0];
      while (adjusted - prevLng > 180) { offset -= 360; adjusted -= 360; }
      while (prevLng - adjusted > 180) { offset += 360; adjusted += 360; }
      out.push([adjusted, lat]);
    }
    return out;
  };

  geojson.features.forEach(f => {
    if (!f.geometry) return;
    if (f.geometry.type === 'Polygon') {
      f.geometry.coordinates = f.geometry.coordinates.map(unwrapRing);
    } else if (f.geometry.type === 'MultiPolygon') {
      f.geometry.coordinates = f.geometry.coordinates.map(poly => poly.map(unwrapRing));
    }
  });
  return geojson;
}

async function rbGetWorldGeoJSON() {
  if (rbWorldGeoJSON) return rbWorldGeoJSON;
  const res = await fetch(RB_WORLD_TOPOJSON_URL);
  const worldData = await res.json();
  const geojson = topojson.feature(worldData, worldData.objects.countries);
  geojson.features = geojson.features.filter(f => parseInt(f.id, 10) !== 10); // drop Antarctica
  rbFixAntimeridian(geojson);
  rbWorldGeoJSON = geojson;
  return geojson;
}

function rbRenderMapIfVisible(route) {
  const panel = document.getElementById('rbMapPanel');
  if (panel && !panel.hidden) rbRenderMap(route);
}

function rbEnsureMiniMap(mapDiv) {
  if (!rbMiniMap) {
    rbMiniMap = L.map(mapDiv, {
      center: [20, 10], zoom: 1.3, minZoom: 1, maxZoom: 9, zoomSnap: 0.5,
      attributionControl: false, scrollWheelZoom: false,
      maxBounds: [[-85, -200], [85, 200]], maxBoundsViscosity: 0.9,
    });
  }
  return rbMiniMap;
}

function rbClearMapLayer(layer) {
  if (layer && rbMiniMap) rbMiniMap.removeLayer(layer);
  return null;
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

  rbEnsureMiniMap(mapDiv);

  if (rbMapMode === 'line') {
    rbMiniMapLayer = rbClearMapLayer(rbMiniMapLayer);
    rbMiniMapDetailedLayer = rbClearMapLayer(rbMiniMapDetailedLayer);
    rbRenderRouteLine(route, geojson);
  } else if (rbMapMode === 'detailed') {
    rbMiniMapLayer = rbClearMapLayer(rbMiniMapLayer);
    rbMiniMapLineLayer = rbClearMapLayer(rbMiniMapLineLayer);
    rbRenderDetailedRouteLine(route, geojson);
  } else {
    rbMiniMapLineLayer = rbClearMapLayer(rbMiniMapLineLayer);
    rbMiniMapDetailedLayer = rbClearMapLayer(rbMiniMapDetailedLayer);
    rbRenderCountriesLayer(route, geojson);
  }

  setTimeout(() => rbMiniMap && rbMiniMap.invalidateSize(), 30);
}

function rbRenderCountriesLayer(route, geojson) {
  const codes = new Set(route.blocks.map(b => b.country_code).filter(Boolean));

  rbMiniMapLayer = rbClearMapLayer(rbMiniMapLayer);
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

  rbMiniMap.setMaxZoom(6);
  rbMiniMap.setView([20, 10], 1.3);
}

/**
 * Draws the route as an ordered path: a dashed polyline connecting each leg's anchor point
 * (block.lat/lng — one representative coordinate per leg, e.g. its main city; not a per-destination
 * or turn-by-turn road route), with a numbered marker per stop. The line always starts and ends at
 * RB_HOME_LATLNG (Utrecht) — every expedition begins and ends with leaving/returning to the
 * Netherlands, whether by car or plane, so the loop closes there regardless of the route itself.
 * Only legs that have both lat and lng render; a route with fewer than two such legs shows an
 * empty-state message instead. See README's "Future plans" section for the plan this implements,
 * and rbBuildCentralEuropeRoadtripRoute for the reference example of adding lat/lng to a route's blocks.
 */
function rbRenderRouteLine(route, geojson) {
  const mapDiv = document.getElementById('rbMapDiv');
  const stops = route.blocks
    .map((b, i) => ({ block: b, index: i }))
    .filter(({ block }) => typeof block.lat === 'number' && typeof block.lng === 'number');

  rbMiniMapLineLayer = rbClearMapLayer(rbMiniMapLineLayer);

  if (stops.length < 2) {
    mapDiv.querySelector('.rb-map-empty')?.remove();
    const empty = document.createElement('div');
    empty.className = 'rb-map-empty';
    empty.textContent = 'Deze route heeft nog geen routelijn-gegevens (lat/lng per etappe) — nog niet elke expeditie heeft die.';
    mapDiv.appendChild(empty);
    return;
  }
  mapDiv.querySelector('.rb-map-empty')?.remove();

  const layerGroup = L.layerGroup();

  // Faint, unhighlighted country outlines as geographic context under the line.
  L.geoJSON(geojson, {
    style: { fillColor: '#e2e8f0', fillOpacity: 0.5, color: '#94a3b8', weight: 0.5 },
  }).addTo(layerGroup);

  const stopLatlngs = stops.map(({ block }) => [block.lat, block.lng]);
  const latlngs = [RB_HOME_LATLNG, ...stopLatlngs, RB_HOME_LATLNG];
  L.polyline(latlngs, { color: '#0ea5e9', weight: 3, opacity: 0.85, dashArray: '6 8' }).addTo(layerGroup);

  const homeIcon = L.divIcon({
    className: 'rb-map-stop-icon rb-map-stop-icon--home',
    html: `<span>🏠</span>`,
    iconSize: [26, 26], iconAnchor: [13, 13],
  });
  L.marker(RB_HOME_LATLNG, { icon: homeIcon })
    .bindTooltip('🇳🇱 Utrecht — vertrek & aankomst')
    .addTo(layerGroup);

  stops.forEach(({ block, index }, i) => {
    const color = RB_BLOCK_COLORS[index % RB_BLOCK_COLORS.length];
    const icon = L.divIcon({
      className: 'rb-map-stop-icon',
      html: `<span style="background:${color}">${i + 1}</span>`,
      iconSize: [22, 22], iconAnchor: [11, 11],
    });
    const flag = rbFlagFor(block);
    const days = parseInt(block.days) || 0;
    L.marker([block.lat, block.lng], { icon })
      .bindTooltip(`${flag} ${escapeHTML(block.country || '')}${days ? ` — ${days} dag${days !== 1 ? 'en' : ''}` : ''}`)
      .addTo(layerGroup);
  });

  rbMiniMapLineLayer = layerGroup.addTo(rbMiniMap);
  rbMiniMap.setMaxZoom(9);
  rbMiniMap.fitBounds(L.latLngBounds(latlngs), { padding: [30, 30] });
}

/**
 * Detailed route-line view (2026-08): draws through every destination's own coordinate
 * (block.destinations[].lat/lng) instead of just one anchor point per country — a much closer
 * approximation of the actual in-country path, not just country-to-country. Small circle markers
 * per destination (a numbered emoji marker per stop, like rbRenderRouteLine uses, would be
 * unreadable at this density — 25+ legs can mean 150+ points). Only Eurasia Grand Tour and its
 * three split routes have per-destination coordinates so far (2026-08); other routes show the
 * empty-state message, same as rbRenderRouteLine did before route-line coordinates existed at all.
 */
function rbRenderDetailedRouteLine(route, geojson) {
  const mapDiv = document.getElementById('rbMapDiv');
  const points = [];
  route.blocks.forEach((block, blockIndex) => {
    (block.destinations || []).forEach(dest => {
      if (typeof dest.lat === 'number' && typeof dest.lng === 'number') {
        points.push({ block, blockIndex, dest });
      }
    });
  });

  rbMiniMapDetailedLayer = rbClearMapLayer(rbMiniMapDetailedLayer);

  if (points.length < 2) {
    mapDiv.querySelector('.rb-map-empty')?.remove();
    const empty = document.createElement('div');
    empty.className = 'rb-map-empty';
    empty.textContent = 'Deze route heeft nog geen coördinaten per bestemming — nog niet elke expeditie heeft die.';
    mapDiv.appendChild(empty);
    return;
  }
  mapDiv.querySelector('.rb-map-empty')?.remove();

  const layerGroup = L.layerGroup();

  // Faint, unhighlighted country outlines as geographic context under the line.
  L.geoJSON(geojson, {
    style: { fillColor: '#e2e8f0', fillOpacity: 0.5, color: '#94a3b8', weight: 0.5 },
  }).addTo(layerGroup);

  const pointLatlngs = points.map(({ dest }) => [dest.lat, dest.lng]);
  const latlngs = [RB_HOME_LATLNG, ...pointLatlngs, RB_HOME_LATLNG];
  L.polyline(latlngs, { color: '#f97316', weight: 2, opacity: 0.85, dashArray: '4 6' }).addTo(layerGroup);

  const homeIcon = L.divIcon({
    className: 'rb-map-stop-icon rb-map-stop-icon--home',
    html: `<span>🏠</span>`,
    iconSize: [26, 26], iconAnchor: [13, 13],
  });
  L.marker(RB_HOME_LATLNG, { icon: homeIcon })
    .bindTooltip('🇳🇱 Utrecht — vertrek & aankomst')
    .addTo(layerGroup);

  points.forEach(({ block, blockIndex, dest }) => {
    const color = RB_BLOCK_COLORS[blockIndex % RB_BLOCK_COLORS.length];
    const flag = rbFlagFor(block);
    L.circleMarker([dest.lat, dest.lng], {
      radius: 5, weight: 1, color: '#0a1628', fillColor: color, fillOpacity: 0.9,
    })
      .bindTooltip(`${flag} ${escapeHTML(dest.name || '')}`)
      .addTo(layerGroup);
  });

  rbMiniMapDetailedLayer = layerGroup.addTo(rbMiniMap);
  rbMiniMap.setMaxZoom(12);
  rbMiniMap.fitBounds(L.latLngBounds(latlngs), { padding: [30, 30] });
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

  document.querySelectorAll('.rb-map-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (rbMapMode === btn.dataset.mode) return;
      rbMapMode = btn.dataset.mode;
      document.querySelectorAll('.rb-map-mode-btn').forEach(b => b.classList.toggle('is-active', b === btn));
      const route = rbGetCurrent();
      if (route) rbRenderMap(route);
    });
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
    // Each entry is either a plain string (most routes) or a { name, lat, lng } object (Eurasia
    // Grand Tour, since 2026-08) — the latter powers the detailed per-destination route-line view
    // (rbRenderDetailedRouteLine) instead of just the one block-level anchor (lat/lng below).
    destinations: (opts.destinations || []).map(d => (
      typeof d === 'string'
        ? { id: rbNewDestId(), name: d, notes: '' }
        : { id: rbNewDestId(), name: d.name, notes: d.notes || '', lat: d.lat ?? null, lng: d.lng ?? null }
    )),
    // Optional single anchor point for this leg (e.g. its main city), used only by the route-line
    // map view to draw an ordered path — not every route has these yet (see rbRenderRouteLine).
    lat: opts.lat ?? null,
    lng: opts.lng ?? null,
  };
}

/** A seed country entry is { code, name, days, budget, destinations: [string], transport_to_next, notes, lat, lng }. */
function rbSeedBlockOpts(c, extraOpts = {}) {
  return {
    ...extraOpts,
    days: c.days, budget: c.budget, notes: c.notes,
    transport_to_next: c.transport_to_next, destinations: c.destinations,
    lat: c.lat, lng: c.lng,
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
    BA: { days: 7, budget: 350, lat: 43.8563, lng: 18.4131, destinations: [{name:"Sarajevo",lat:43.8563,lng:18.4131}, {name:"Mostar",lat:43.3438,lng:17.8078}, {name:"Blagaj",lat:43.2489,lng:17.8942}, {name:"Trebinje",lat:42.7106,lng:18.3438}], transport_to_next: "Bus over land (Mostar/Sarajevo naar Dubrovnik of Split), rechtstreekse grensovergang, geen visum nodig" },
    HR: { days: 4, budget: 350, lat: 42.6507, lng: 18.0944, destinations: [{name:"Dubrovnik",lat:42.6507,lng:18.0944}], transport_to_next: "Bus langs de kust Dubrovnik-Kotor, korte grensovergang, drukte mogelijk in hoogseizoen", notes: "Bewust beperkt tot Dubrovnik (2026-08) — Split, Hvar, Plitvicemeren en Zagreb al eerder bezocht. Lost meteen ook een routing-mismatch op: Zagreb lag ver uit de weg voor de aansluitende bus naar Kotor." },
    ME: { days: 7, budget: 450, lat: 42.4247, lng: 18.7712, destinations: [{name:"Kotor",lat:42.4247,lng:18.7712}, {name:"Perast",lat:42.4875,lng:18.7089}, {name:"Budva",lat:42.2911,lng:18.8400}, {name:"Durmitor NP",lat:43.1461,lng:19.0413}], transport_to_next: "Bus Kotor/Podgorica naar Tirana of Shkodër, over land, eenvoudige grensovergang" },
    AL: { days: 10, budget: 500, lat: 41.3275, lng: 19.8187, destinations: [{name:"Shkodër",lat:42.0683,lng:19.5126}, {name:"Tirana",lat:41.3275,lng:19.8187}, {name:"Berat",lat:40.7058,lng:19.9522}, {name:"Gjirokastër",lat:40.0758,lng:20.1389}, {name:"Sarandë",lat:39.8756,lng:20.0053}, {name:"Korçë",lat:40.6186,lng:20.7808}], transport_to_next: "Bus Korçë-Ohrid via de grensovergang bij Kapshticë/Qafë Thanë, over land, korte rit — een veel directere oversteek dan terug via Tirana" },
    MK: { days: 7, budget: 259, lat: 41.1231, lng: 20.8016, destinations: [{name:"Ohrid",lat:41.1231,lng:20.8016}, {name:"Bitola",lat:41.0297,lng:21.3347}, {name:"Skopje",lat:41.9973,lng:21.4280}], transport_to_next: "Vlucht Skopje-Istanbul (bus zou via Bulgarije/Griekenland >20 uur duren, vlucht is realistischer)" },
    TR: { days: 24, budget: 1300, lat: 41.0082, lng: 28.9784, destinations: [{name:"Istanbul",lat:41.0082,lng:28.9784}, {name:"Efeze",lat:37.9410,lng:27.3417}, {name:"Pamukkale",lat:37.9200,lng:29.1200}, {name:"Antalya",lat:36.8969,lng:30.7133}, {name:"Cappadocië",lat:38.6431,lng:34.8289}, {name:"Ankara",lat:39.9334,lng:32.8597}, {name:"Kars/Trabzon",lat:40.6013,lng:43.0975}], transport_to_next: "Bus of trein vanaf Kars/Trabzon naar Tbilisi, grensovergang bij Posof/Sarpi, geen visum nodig voor Georgië" },
    GE: { days: 13, budget: 650, lat: 41.7151, lng: 44.8271, destinations: [{name:"Tbilisi",lat:41.7151,lng:44.8271}, {name:"Kazbegi",lat:42.6572,lng:44.6461}, {name:"Sighnaghi",lat:41.6206,lng:45.9184}, {name:"Kutaisi",lat:42.2679,lng:42.6946}, {name:"Mestia (Svaneti)",lat:43.0454,lng:42.7276}, {name:"Batumi",lat:41.6168,lng:41.6367}], transport_to_next: "Terug naar Tbilisi (trein of marshrutka vanaf Batumi, ~5-6u, drukke maar goede verbinding), dan marshrutka Tbilisi-Yerevan, over land, eenvoudige grensovergang, geen visum nodig", notes: "Mestia/Svaneti ligt qua prijsniveau boven de rest van de route (guesthouse met halfpension plus een duurdere marshrutka van/naar Mestia, ~€17) — het dagbudget werkt alleen als trip-breed gemiddelde met de goedkopere dagen elders (Tbilisi/Kutaisi/Batumi/Sighnaghi, realistisch €35-45/dag)." },
    AM: { days: 8, budget: 400, lat: 40.1792, lng: 44.4991, destinations: [{name:"Yerevan",lat:40.1792,lng:44.4991}, {name:"Khor Virap",lat:39.8817,lng:44.4453}, {name:"Tatev",lat:39.3789,lng:46.2506}, {name:"Lake Sevan",lat:40.3667,lng:45.3333}, {name:"Dilijan",lat:40.7431,lng:44.8650}], transport_to_next: "Geen directe grens (gesloten wegens conflict) — terugreizen via Georgië (Tbilisi) naar Baku, over land plus korte vlucht of bus", notes: "Blijf uit de buurt van de grensstrook met Azerbeidzjan: wegen H53/H26 bij Ijevan, de M14 langs de noordoostoever van Lake Sevan, en de M2 Yeraskh-Zangakatun/Yeraskh-Noravank (landmijnen) zijn oranje/rood (2026-07). Tatev (via Goris/Kapan) ligt dicht bij de grensregio Syunik — de standaardroute wordt als open/veilig gerapporteerd, blijf op de gebruikelijke toeristische route." },
    AZ: { days: 7, budget: 425, lat: 40.4093, lng: 49.8671, destinations: [{name:"Baku",lat:40.4093,lng:49.8671}, {name:"Gobustan",lat:40.1064,lng:49.3969}, {name:"Sheki",lat:41.1970,lng:47.1706}, {name:"Qabala",lat:40.9800,lng:47.8500}], transport_to_next: "Terug naar Baku (bus/deeltaxi vanaf Qabala/Sheki, ~3u), dan vlucht Baku-Almaty (de veerboot over de Kaspische Zee Baku-Aktau heeft geen vast schema en is onbetrouwbaar)" },
    KZ: { days: 8, budget: 500, lat: 43.2567, lng: 76.9286, destinations: [{name:"Almaty",lat:43.2567,lng:76.9286}, {name:"Charyn Canyon",lat:43.3500,lng:79.0667}, {name:"Turkistan",lat:43.2975,lng:68.2517}, {name:"Shymkent",lat:42.3417,lng:69.5901}], transport_to_next: "Bus of deeltaxi Almaty-Bishkek, over land, drukke maar eenvoudige grensovergang", notes: "Nur-Sultan/Astana bewust geschrapt (2026-08) — lag als geïsoleerde 1200 km-uitstap te ver uit de route; de rest van Kazachstan vormt nu een aaneengesloten zuidelijke lus, geen backtrack meer nodig." },
    KG: { days: 12, budget: 600, lat: 42.8746, lng: 74.5698, destinations: [{name:"Bishkek",lat:42.8746,lng:74.5698}, {name:"Issyk-Kul",lat:42.6500,lng:77.0833}, {name:"Karakol",lat:42.4907,lng:78.3936}, {name:"Song-Kul",lat:41.8333,lng:75.1333}, {name:"Osh",lat:40.5283,lng:72.7985}], transport_to_next: "Deeljeep over de Pamir Highway Osh-Khorog, over land, ruw traject, GBAO-permit/visum voor Tadzjikistan nodig" },
    TJ: { days: 14, budget: 700, lat: 38.5598, lng: 68.787, destinations: [{name:"Khorog",lat:37.4913,lng:71.5551}, {name:"Pamir Highway",lat:37.8944,lng:73.0139}, {name:"Murghab",lat:38.1706,lng:74.0114}, {name:"Iskanderkul",lat:39.0736,lng:68.3667}, {name:"Dushanbe",lat:38.5598,lng:68.7870}], transport_to_next: "Bus of deeltaxi Dushanbe-Samarkand, over land, grensovergang kan tijdrovend zijn", notes: "GBAO-vergunning voor de Pamir Highway kan direct worden toegevoegd aan de e-visa-aanvraag (vinkje aanzetten, +/-$20, totaal +/-$70). De Pamir-jeep/chauffeur (Khorog-Murghab e.o.) is een aparte, reële kostenpost bovenop het dagbudget: privé 4x4+chauffeur $150-400/dag (vaak gedeeld), gedeelde taxi vanaf ~$30-40 p.p. — regel dit via een lokale guesthouse/CBT/PECTA in Khorog. Khorog/GBAO kende in het verleden periodes van onrust (laatst 2022) — check de actuele situatie vlak voor vertrek." },
    UZ: { days: 11, budget: 550, lat: 39.627, lng: 66.9749, destinations: [{name:"Samarkand",lat:39.6270,lng:66.9749}, {name:"Bukhara",lat:39.7747,lng:64.4286}, {name:"Khiva",lat:41.3775,lng:60.3639}, {name:"Tashkent",lat:41.2995,lng:69.2401}], transport_to_next: "Vlucht Tasjkent-Xi'an, rechtstreekse verbinding (China Eastern/Loong Air, ~6x/week) — vervangt de oude Ürümqi-vlucht nu Xinjiang niet meer op de route staat", notes: "Binnenlandse vlucht Urgench (Khiva)-Tasjkent nodig om dit compact te doen (~1,5u) — de weg Khiva-Tasjkent is >30 uur en niet realistisch." },
    CN: { days: 28, budget: 1625, lat: 34.3416, lng: 108.9398, destinations: [{name:"Xi'an",lat:34.3416,lng:108.9398}, {name:"Chengdu",lat:30.5728,lng:104.0668}, {name:"Zhangjiajie",lat:29.1170,lng:110.4794}, {name:"Guilin/Yangshuo (Li-rivier)",lat:25.2736,lng:110.2900}, {name:"Shanghai",lat:31.2304,lng:121.4737}, {name:"Beijing",lat:39.9042,lng:116.4074}], transport_to_next: "Trein Beijing-Ulaanbaatar (Trans-Mongolië-route), over land, visum voor Mongolië nodig", notes: "Xinjiang (Ürümqi/Kasjgar) bewust geschrapt (2026-08) vanwege de sociaalpolitieke situatie in de Oeigoerse regio. Daarvoor in de plaats: Zhangjiajie en Guilin/Yangshuo, twee van China's bekendste natuurlandschappen, náást de al geplande hoogtepunten Xi'an (Terracotta Leger) en Chengdu (panda's)." },
    MN: { days: 10, budget: 650, lat: 47.8864, lng: 106.9057, destinations: [{name:"Ulaanbaatar",lat:47.8864,lng:106.9057}, {name:"Terelj NP",lat:47.9714,lng:107.4756}, {name:"Kharkhorin",lat:47.1975,lng:102.8317}, {name:"Gobiwoestijn",lat:43.5711,lng:104.4256}], transport_to_next: "Vlucht Ulaanbaatar-Tokyo (via Beijing/Seoul, geen directe vlucht en geen landroute mogelijk)", notes: "De Gobiwoestijn-etappe vraagt een georganiseerde jeeptour (gedeelde 4x4 + chauffeur + gids + gerkampen) — reken $80-120 per dag p.p. voor die specifieke dagen, een aparte kostenpost bovenop de rest van de reis. Binnen 100 km van de grens met Rusland/China mag niet vrij gereisd worden zonder toestemming — check dat de touroperator hier rekening mee houdt, vooral in de zuidelijke Gobi dicht bij de Chinese grens." },
    JP: { days: 18, budget: 2700, lat: 35.6762, lng: 139.6503, destinations: [{name:"Tokyo",lat:35.6762,lng:139.6503}, {name:"Hakone/Fuji",lat:35.2323,lng:139.1069}, {name:"Kyoto",lat:35.0116,lng:135.7681}, {name:"Nara",lat:34.6851,lng:135.8048}, {name:"Osaka",lat:34.6937,lng:135.5023}, {name:"Hiroshima",lat:34.3853,lng:132.4553}], transport_to_next: "Vlucht Osaka/Tokyo-Taipei, korte vlucht, geen visum nodig voor Taiwan" },
    TW: { days: 10, budget: 750, lat: 25.033, lng: 121.5654, destinations: [{name:"Taipei",lat:25.0330,lng:121.5654}, {name:"Taroko-kloof",lat:24.1588,lng:121.6222}, {name:"Sun Moon Lake",lat:23.8618,lng:120.9155}, {name:"Tainan",lat:22.9997,lng:120.2270}, {name:"Kenting",lat:21.9447,lng:120.7969}], transport_to_next: "HSR (hogesnelheidstrein) Kaohsiung-Taipei terug (~2u) vanaf Kenting, dan vlucht Taipei-Hanoi, geen directe ferry/landroute beschikbaar" },
    VN: { days: 17, budget: 750, lat: 21.0285, lng: 105.8542, destinations: [{name:"Hanoi",lat:21.0285,lng:105.8542}, {name:"Ha Giang Loop",lat:22.8256,lng:104.9784}, {name:"Ha Long Bay",lat:20.9101,lng:107.1839}, {name:"Ho Chi Minh City",lat:10.8231,lng:106.6297}, {name:"Da Lat",lat:11.9404,lng:108.4583}, {name:"Phu Quoc",lat:10.2270,lng:103.9670}], transport_to_next: "Bus/boot over de Mekongdelta van Ho Chi Minh City naar Phnom Penh, grensovergang Bavet/Moc Bai, over land — een van de klassieke backpacker-grensovergangen van de regio", notes: "Herzien (2026-08): Hue, Hoi An en Da Nang bewust geschrapt (al bezocht); Ha Giang Loop toegevoegd als hoogtepunt vanuit Hanoi. Interne vlucht Hanoi-Ho Chi Minh City (~2u, veelvuldig en goedkoop) vervangt de kustroute. Da Lat en Phu Quoc zijn uitstapjes vanuit HCMC. Extra kostenposten (niet in dagbudget): gids+motor voor de Ha Giang Loop (~€35-45/dag, meestal 'easy rider'-stijl i.p.v. zelf rijden gezien de beruchte bergwegen), interne vlucht Hanoi-HCMC (~€40-60)." },
    LA: { days: 12, budget: 525, lat: 13.9667, lng: 105.9333, destinations: [{name:"Si Phan Don (4000 eilanden)",lat:13.9667,lng:105.9333}, {name:"Pakse",lat:15.1202,lng:105.7989}, {name:"Vientiane",lat:17.9757,lng:102.6331}, {name:"Vang Vieng",lat:18.9241,lng:102.4432}, {name:"Luang Prabang",lat:19.8845,lng:102.1348}], transport_to_next: "Boot over de Mekong (2 dagen, overnachting in Pak Beng) of bus van Luang Prabang naar Huay Xai, dan de grensovergang oversteken naar Chiang Khong, Thailand" },
    KH: { days: 12, budget: 525, lat: 11.5564, lng: 104.9282, destinations: [{name:"Phnom Penh",lat:11.5564,lng:104.9282}, {name:"Koh Rong",lat:10.7000,lng:103.2000}, {name:"Battambang",lat:13.0957,lng:103.2022}, {name:"Siem Reap",lat:13.3671,lng:103.8448}, {name:"Angkor Wat",lat:13.4125,lng:103.8670}, {name:"Stung Treng",lat:13.5259,lng:105.9683}], transport_to_next: "Bus van Stung Treng naar de grensovergang bij Dom Kralor/Voen Kham (nieuwe Chinese brug, geen boot meer nodig), dan door naar Si Phan Don, Laos", notes: "Herzien (2026-08): entree nu vanuit Ho Chi Minh City (Mekongdelta-route) i.p.v. vanuit Thailand, dus de oude Poipet-grenswaarschuwing vervalt hier. Reisadvies (bijgewerkt 2026-08): geel voor het hele land; de grensovergang naar Laos bij Stung Treng kent geen verhoogd risico. Angkor Wat-toegang (3-daags ticket ~$62) is een aparte kostenpost, niet alleen eten/verblijf/lokaal vervoer." },
    TH: { days: 18, budget: 900, lat: 18.7883, lng: 98.9853, destinations: [{name:"Chiang Mai",lat:18.7883,lng:98.9853}, {name:"Sukhothai",lat:17.0067,lng:99.8264}, {name:"Ayutthaya",lat:14.3532,lng:100.5680}, {name:"Bangkok",lat:13.7563,lng:100.5018}, {name:"Krabi/eilanden",lat:8.0863,lng:98.9063}, {name:"Koh Lipe",lat:6.4794,lng:99.3006}], transport_to_next: "Speedboot Koh Lipe (Thailand) naar Langkawi (Maleisië), ~90 minuten, internationale grensovergang op zee (Bundhaya Speed Boat) — alleen half oktober t/m mei, buiten dat seizoen alleen indirect via Satun", notes: "Herzien (2026-08): binnenkomst nu vanuit Laos in het noorden (Chiang Khong), dus Chiang Mai is nu de eerste stop i.p.v. Bangkok. Reisadvies (2026-07): geel voor het hele reisgebied, met rood/oranje grensstroken bij Cambodja en in het uiterste zuiden/Myanmar-grens — niet relevant voor deze route. Visumvrij verblijf wordt mogelijk verkort van 60 naar 30 dagen (kabinetsbesluit mei 2026, nog niet gepubliceerd) — check de actuele duur vlak voor vertrek." },
    MY: { days: 10, budget: 500, lat: 6.35, lng: 99.8, destinations: [{name:"Langkawi",lat:6.3500,lng:99.8000}, {name:"Penang",lat:5.4141,lng:100.3288}, {name:"Cameron Highlands",lat:4.4700,lng:101.3800}, {name:"Malacca",lat:2.1896,lng:102.2501}, {name:"Kuala Lumpur",lat:3.1390,lng:101.6869}], transport_to_next: "Vlucht Kuala Lumpur-Kuching (Sarawak) — het vervolg van Maleisië ligt op Borneo, zie het aparte Sarawak/Sabah-blok verderop in de route" },
    SG: { days: 3, budget: 375, lat: 1.2838, lng: 103.8591, destinations: [{name:"Marina Bay",lat:1.2838,lng:103.8591}, {name:"Chinatown",lat:1.2820,lng:103.8440}, {name:"Sentosa",lat:1.2494,lng:103.8303}, {name:"Gardens by the Bay",lat:1.2816,lng:103.8636}], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Singapore (Changi) naar Nederland" },
    BN: { days: 2, budget: 240, lat: 4.9031, lng: 114.9398, destinations: [{name:"Bandar Seri Begawan",lat:4.9031,lng:114.9398}, {name:"Kampong Ayer",lat:4.8875,lng:114.9425}, {name:"Ulu Temburong NP",lat:4.5333,lng:115.1667}], transport_to_next: "Bus (Sipitang Express, 1x/dag, ~8,5u, MYR 100) of veerboot via Labuan naar Kota Kinabalu, Sabah — nu ingebed in de Borneo Overland Trail tussen Sarawak en Sabah i.p.v. losse vlucht vanuit KL", notes: "Ulu Temburong NP is alleen te bezoeken met een verplichte gids/tour (geen zelfstandig bezoek toegestaan) — reken ~BND 140-180 (~€115-150) voor die dag inclusief boot, gids, entree en lunch, een aparte kostenpost." },
    PH: { days: 21, budget: 950, lat: 14.5995, lng: 120.9842, destinations: [{name:"Manila",lat:14.5995,lng:120.9842}, {name:"Banaue",lat:16.9166,lng:121.0562}, {name:"El Nido",lat:11.1949,lng:119.4079}, {name:"Coron",lat:12.0083,lng:120.2036}, {name:"Siargao",lat:9.7897,lng:126.1578}, {name:"Bohol",lat:9.6474,lng:123.8536}, {name:"Cebu",lat:10.3157,lng:123.8854}], transport_to_next: "Vlucht Cebu-Medan (Sumatra), met overstap in Kuala Lumpur/Singapore/Jakarta — geen directe verbinding", notes: "Herzien (2026-08): rondreis i.p.v. vaste basis Manila. Meerdaagse bootexpeditie El Nido-Coron (bv. Tao Philippines-stijl) toegevoegd — extra kostenpost ~€160-220 all-in, bovenop het dagbudget. Cebu is het natuurlijke eindpunt: alle vluchten tussen Coron/Siargao/Bohol lopen sowieso via Cebu of Manila." },
    ID: { days: 21, budget: 875, lat: 3.5952, lng: 98.6722, destinations: [{name:"Medan",lat:3.5952,lng:98.6722}, {name:"Bukit Lawang",lat:3.5556,lng:98.1258}, {name:"Berastagi",lat:3.1958,lng:98.5117}, {name:"Lake Toba",lat:2.6667,lng:98.9333}, {name:"Bukittinggi",lat:-0.3056,lng:100.3692}, {name:"Lombok",lat:-8.5833,lng:116.1167}, {name:"Gili-eilanden",lat:-8.3500,lng:116.0417}, {name:"Komodo",lat:-8.4900,lng:119.8800}], transport_to_next: "Bus over land via de grensovergang Mota'ain/Batugade (vanaf Kupang, West-Timor) naar Dili, Oost-Timor — of een korte vlucht Kupang-Dili", notes: "Herzien (2026-08): Java en Bali bewust geschrapt (al bezocht), Sumatra toegevoegd (Bukit Lawang-orang-oetans, Lake Toba, Minangkabau-cultuur in Bukittinggi). Vlucht Sumatra-Lombok gaat met een overstap (waarschijnlijk Jakarta), geen directe verbinding. Komodo (boottochten) blijft de duurdere uitschieter: georganiseerde tours $75-135/dag, budget gedeelde speedboot/multi-daagse boottochten vanaf ~$40-50/dag — apart budget bovenop de rest van de route. Mount Rinjani (Lombok) is een actieve vulkaan zonder actuele eruptie-waarschuwing (2026-07) — check vlak voor vertrek." },
    TL: { days: 7, budget: 400, lat: -8.5586, lng: 125.5736, destinations: [{name:"Dili",lat:-8.5586,lng:125.5736}, {name:"Atauro-eiland",lat:-8.2500,lng:125.5833}, {name:"Jaco-eiland (Nino Konis Santana NP)",lat:-8.4333,lng:127.3333}, {name:"Baucau",lat:-8.4667,lng:126.4667}, {name:"Maubisse",lat:-8.9167,lng:125.6167}], transport_to_next: "Vlucht Dili-Singapore (meestal met overstap in Denpasar/Bali of Jakarta, geen directe verbinding) — laatste etappe naar het eindpunt Singapore", notes: "Beperkte zorginfrastructuur (ziekenhuizen kunnen vooraf contante betaling vragen, ernstige gevallen vereisen medische evacuatie naar Bali/Darwin, geen Nederlandse ambassade ter plaatse) — een goede reisverzekering is hier extra belangrijk. Vermijd 's nachts rijden buiten Dili. Jaco Island is alleen bereikbaar met een 4x4+chauffeur ($85-150/dag) — deel de kosten met anderen indien mogelijk, aparte kostenpost bovenop de rest van de route." },
  },
  "Pan-American Grand Tour 🌎": {
    MX: { days: 28, budget: 1000, lat: 19.4326, lng: -99.1332, destinations: ["Ciudad de México", "Oaxaca", "Palenque", "Mérida", "Tulum", "Bacalar", "San Cristóbal de las Casas"], transport_to_next: "Bus over land via de grensovergang La Mesilla/El Carmen naar Huehuetenango, Guatemala.", notes: "Prijs geverifieerd (2026-07), klopt. Route 199 tussen San Cristóbal en Palenque: wegbanditisme (niet politiek), niet 's nachts rijden." },
    GT: { days: 16, budget: 400, lat: 14.5586, lng: -90.7295, destinations: ["Quetzaltenango (Xela)", "Lake Atitlán", "Antigua", "Ciudad de Guatemala", "Semuc Champey", "Flores & Tikal"], transport_to_next: "Bus over land vanaf Flores naar de grensovergang bij Melchor de Menchos, door naar San Ignacio, Belize.", notes: "Prijs geverifieerd (2026-07), klopt — goedkoopste land van de route. Gebruik boten i.p.v. de weg Godínez-Panajachel bij Atitlán; Cerro de la Cruz in Antigua alleen begeleid/overdag." },
    BZ: { days: 10, budget: 720, lat: 17.4995, lng: -88.1962, destinations: ["San Ignacio", "Belize City", "Caye Caulker", "Ambergris Caye (San Pedro)", "Hopkins/Dangriga", "Placencia"], transport_to_next: "Veerboot vanaf Placencia/Dangriga (via Livingston, Guatemala) naar Puerto Cortés, Honduras.", notes: "Prijscorrectie (2026-07): €57,50→€72/dag — de vele watertaxi's tussen eilanden ($15-45 p.p. enkele reis) waren niet meegenomen." },
    HN: { days: 14, budget: 375, lat: 14.8833, lng: -88.0333, destinations: ["Puerto Cortés", "Copán Ruinas", "Lago de Yojoa", "Tegucigalpa", "La Ceiba", "Roatán"], transport_to_next: "Bus over land via de grensovergang El Amatillo naar El Salvador.", notes: "Prijs geverifieerd (2026-07), klopt. ⚠️ Tegucigalpa/La Ceiba/Puerto Cortés liggen in oranje provincies (bende-/drugsgerelateerde criminaliteit) — Roatán is de gele uitzondering." },
    SV: { days: 10, budget: 275, lat: 13.6929, lng: -89.2182, destinations: ["San Salvador", "Santa Ana", "Cerro Verde & vulkanen", "Ruta de las Flores (Juayúa, Ataco)", "El Tunco", "Suchitoto"], transport_to_next: "Bus over land via Honduras (transit) naar de grensovergang El Espino/Guasaule, richting León, Nicaragua.", notes: "Prijs geverifieerd (2026-07), klopt. Veiligheidssituatie sterk verbeterd sinds de noodtoestand (2022) tegen bendes, nu geel — let wel: arrestatie zonder aanklacht blijft mogelijk, geen Nederlandse ambassade ter plaatse." },
    NI: { days: 15, budget: 350, lat: 11.93, lng: -85.9567, destinations: ["León", "Managua", "Granada", "Isla de Ometepe", "Laguna de Apoyo", "San Juan del Sur"], transport_to_next: "Bus over land via de grensovergang Peñas Blancas naar Costa Rica.", notes: "Prijs geverifieerd (2026-07), klopt. Regelmatige demonstraties kunnen wegen naar hoofdstad/vliegveld blokkeren; geen Nederlandse ambassade ter plaatse. CA-4-landen (Guatemala/Honduras/El Salvador/Nicaragua) tellen visumtechnisch als één gebied, max. 90 dagen gecombineerd — deze route blijft daar ruim onder." },
    CR: { days: 21, budget: 1000, lat: 10.4667, lng: -84.6431, destinations: ["Liberia", "La Fortuna/Arenal", "Monteverde", "Santa Teresa", "Manuel Antonio", "Puerto Viejo de Talamanca"], transport_to_next: "Bus over land via de grensovergang Sixaola/Guabito naar Bocas del Toro, Panama.", notes: "Prijs geverifieerd (2026-07), klopt maar krap — nationale parken/tours ($15-22 entree) zijn een aparte kostenpost bovenop dit dagtarief." },
    PA: { days: 15, budget: 625, lat: 8.9824, lng: -79.5199, destinations: ["Bocas del Toro", "Boquete", "Ciudad van Panama", "Casco Viejo", "Panamakanaal", "San Blas-eilanden"], transport_to_next: "Zeilboot (4-5 dagen) via de San Blas-eilanden naar Cartagena, Colombia — geen wegverbinding door de Darién Gap.", notes: "Prijs geverifieerd (2026-07), klopt. Darién-regio (niet op route) is oranje. San Blas-boot: check zwemvesten/twee buitenboordmotoren bij de operator vooraf." },
    CO: { days: 35, budget: 1260, lat: 4.711, lng: -74.0721, destinations: ["Cartagena", "Santa Marta", "Parque Tayrona", "Medellín", "Salento & Koffiezone", "Bogotá", "San Agustín"], transport_to_next: "Bus over land via Pasto naar de grensovergang Ipiales–Tulcán, door naar Quito, Ecuador.", notes: "Prijscorrectie (2026-07): €28,57→€36/dag, zo'n 18% te krap voor 35 dagen incl. duurdere steden (Cartagena, Bogotá). Route blijft buiten de rode/oranje grenszones. San Blas-Cartagena zeilboot: zelfde operator-check als bij Panama." },
    EC: { days: 24, budget: 1650, lat: -0.1807, lng: -78.4678, destinations: ["Quito", "Otavalo", "Mindo", "Baños", "Cuenca", "Galápagos-eilanden"], transport_to_next: "Bus over land via de grensovergang Huaquillas/Tumbes naar Noord-Peru, richting Máncora.", notes: "⚠️ Prijscorrectie (2026-07): €1.025→€1.650 totaal, ~55-80% te laag. Galápagos alleen al kost sinds aug. 2024 $200 parkentree + $20 transitkaart p.p., plus $150-235/dag voor een budget boot-/landtour — voor 4-5 dagen al €800-950. Quito: pas op voor scopolamine-drogering in bars/taxi's en nep-taxi's." },
    PE: { days: 35, budget: 1050, lat: -12.0464, lng: -77.0428, destinations: ["Máncora", "Huaraz", "Lima", "Ica & Huacachina", "Arequipa", "Cusco & Vallei van de Inca's", "Puno (Titicacameer)"], transport_to_next: "Bus/boot van Puno via de grensovergang Yunguyo of Desaguadero naar Copacabana en La Paz, Bolivia.", notes: "Prijs geverifieerd (2026-07), klopt (krap). Lima onder noodtoestand (crimineel geweld); regelmatige stakingen/wegblokkades landelijk. Machu Picchu (trein+entree, ~€150-250) is een aparte kostenpost." },
    BO: { days: 21, budget: 425, lat: -16.5, lng: -68.1193, destinations: ["Copacabana", "La Paz", "Uyuni-zoutvlakte", "Sucre", "Potosí", "Santa Cruz"], transport_to_next: "Jeeptocht via de Uyuni-zoutvlaktetour (3 dagen) over land naar San Pedro de Atacama, Chili.", notes: "Prijs geverifieerd (2026-07), klopt. Noodtoestand actief sinds 20 juni 2026 (~90 dagen) tegen wegblokkades — check actuele situatie, vluchten/wegen kunnen onverwacht sluiten. Uyuni-tour (~€140-180 all-in) is een aparte kostenpost." },
    CL: { days: 10, budget: 520, lat: -22.9098, lng: -68.1997, destinations: ["San Pedro de Atacama", "Valle de la Luna", "Valle del Arcoíris", "Antofagasta", "Iquique"], transport_to_next: "Bus over land via de grensovergang Paso de Jama naar Salta/Jujuy, Argentinië.", notes: "Prijscorrectie (2026-07): €40→€52/dag — San Pedro is een van de duurste plekken van Chili. Gewapende straatroof gemeld in San Pedro/Antofagasta/Iquique/Calama/Arica, plus nep-taxi's op vliegvelden." },
    AR: { days: 10, budget: 350, lat: -24.7859, lng: -65.4117, destinations: ["Salta", "Cafayate", "Purmamarca", "Salinas Grandes", "Tilcara", "Humahuaca"], transport_to_next: "Vlucht van Salta (via Buenos Aires) naar Foz do Iguaçu of São Paulo, Brazilië — over land is dit een reis van meerdere dagen.", notes: "Prijs geverifieerd (2026-07), klopt." },
    BR: { days: 22, budget: 1166, lat: -22.9068, lng: -43.1729, destinations: ["Foz do Iguaçu (Iguazu-watervallen)", "Curitiba", "Ilha do Mel", "Florianópolis", "São Paulo", "Paraty", "Rio de Janeiro"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Rio de Janeiro (Galeão) of São Paulo (Guarulhos).", notes: "Prijscorrectie (2026-07): €45,45→€53/dag, vooral door Rio/São Paulo. Rio: vermijd favela's en verlaten stranden/straten 's nachts, extra oplettendheid tijdens Carnaval." },
  },
  "Africa Grand Tour 🌍": {
    EG: { days: 21, budget: 1365, lat: 30.0444, lng: 31.2357, destinations: ["Caïro", "Gizeh", "Dahab", "Luxor", "Nijlcruise/felucca", "Aswan", "Alexandrië"], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Caïro International Airport naar Nederland.", notes: "Prijscorrectie (2026-07): €62→€65/dag. Nijlcruise/felucca is een aparte kostenpost, niet in het dagbudget: een eenvoudige felucca (2-3 nachten) ~€115-160/nacht p.p., een standaard toeristenklasse cruiseboot (3-4 nachten Luxor-Aswan, all-in) ~€320-550 p.p. — dit laatste past het best bij Youri's stijl, reken dit apart voor die specifieke nachten (dubbeltel de dagbudget niet voor dezelfde dagen). Reisadvies: geel voor Caïro/Gizeh/Luxor/Aswan/Alexandrië/Nijlcruise en voor de Zuid-Sinaï-badplaatsen incl. Dahab zelf — voor die zone (Sharm/Dahab/Nuweiba) wordt wel aangeraden niet zelfstandig onbegeleid over land te reizen; georganiseerd vervoer erheen (kustroute of vlucht naar Sharm El Sheikh) blijft buiten het oranje/rode Centraal-/Noord-Sinaï. Visum: e-visa (visa2egypt.gov.eg), 30 dagen, prijs licht verhoogd in 2026 ($25-30 single-entry, bevestig bij aanvraag)." },
    ET: { days: 20, budget: 1750, lat: 9.025, lng: 38.7469, destinations: ["Addis Abeba", "Lalibela", "Simien Mountains", "Gondar", "Danakil Depressie", "Omo Valley"], transport_to_next: "Vlucht Addis Abeba-Caïro, geen directe landroute mogelijk (via Jordanië/Oman verloopt nu via de aparte Mediterranean Civilizations Expedition).", notes: "⚠️ Prijscorrectie (2026-07): €72,50→€87,50/dag, plus drie losse kostenposten buiten het dagbudget: een 3-daagse begeleide Danakil-tour (~€430 p.p., escorte/vergunningen inbegrepen), binnenlandse vluchten Addis Abeba-Lalibela-Gondar (~€400 totaal, zie de veiligheidsnotitie hieronder) en Simien Mountains-trekkosten (park/scout/gids/muildier, ~€175 voor 3-4 dagen). ⚠️⚠️ BELANGRIJKE REISADVIES-BEVINDING (2026-07): Lalibela, Gondar en de Simien Mountains liggen alle drie in de Amhara-regio, die het Nederlandse reisadvies momenteel volledig ROOD kleurt ('niet reizen') door het escalerende Fano-milities-tegen-regering-conflict (maart-mei 2026; wegen naar Bahir Dar omstreden; ontvoeringen van hulpverleners in Noord-Gondar). De Danakil Depressie ligt in de Afar-regio, ook ROOD, wegens instabiliteit bij de grens met Eritrea. Alleen Addis Abeba (geel) en de Omo Valley (impliciet geel) vallen buiten deze rode zones. Reisverslagen van 2026 melden dat georganiseerde fly-in-tours naar Lalibela/Gondar/Simien in de praktijk gewoon doorgaan zonder incidenten — maar dat is de inschatting van reisorganisaties, niet het officiële reisadvies, en een rode zone kan een Nederlandse reisverzekering ongeldig maken zelfs als het risico op de grond overzichtelijk aanvoelt. Youri heeft er bewust voor gekozen deze etappe te laten staan zoals gepland (Route Builder is de aspirational/someday-laag) — dit is een momentopname (juli 2026), check nederlandwereldwijd.nl zelf vlak vóór een eventuele echte reis en weeg ook de verzekeringsconsequentie mee, niet alleen het praktische risico. Visum: e-visa (evisa.gov.et), 30 dagen, prijs schommelt dit jaar ($50-82 per bron) — live bevestigen bij aanvraag." },
    KE: { days: 18, budget: 2350, lat: -1.2921, lng: 36.8219, destinations: ["Nairobi", "Maasai Mara", "Lake Nakuru", "Amboseli", "Mount Kenya", "Diani Beach/Mombasa"], transport_to_next: "Over land via grensovergang Moyale (ruig, meerdaagse busrit), of vlucht Nairobi-Addis Abeba bij twijfel over veiligheid/wegconditie.", notes: "Prijscorrectie (2026-07): €122→€131/dag (buffer tegen gestegen Maasai Mara conservancy-/entreekosten). Visum: geen vrijstelling, eTA verplicht vooraf (prijs varieert per bron, $51 single-entry/$101 multiple-entry recentst — live checken op etakenya.go.ke, dit tarief is al eerder gewijzigd). Extra inreisscreening wegens de regionale Ebola-uitbraak (alleen screening, geen belemmering). Reisadvies: geel voor de hele route; rood alleen ver in het oosten (Somalië/Ethiopië-grens, niet op deze route), oranje voor Marsabit/Moyale/Tana-delta en 'bepaalde wijken' van Nairobi/Mombasa (niet de toeristische gebieden hier)." },
    UG: { days: 18, budget: 2400, lat: 0.3476, lng: 32.5825, destinations: ["Kampala", "Jinja", "Kibale Forest", "Queen Elizabeth NP", "Bwindi Impenetrable Forest (gorilla's)", "Murchison Falls"], transport_to_next: "Bus over land Kampala-Nairobi via grensovergang Busia of Malaba, goed begaanbare route.", notes: "Prijs blijft nagenoeg gelijk (2026-07): €129→€133/dag, kleine buffer voor de nieuwe niet-restitueerbare boekingsregel hieronder — het gorillapermit ($800 hoogseizoen/$600 laagseizoen apr/mei/nov) en het chimpansee-trekkingpermit in Kibale ($250 p.p.) zaten al goed verwerkt in het bestaande budget. ⚠️ Sinds 1 maart 2026 is UWA's oude 7-dagen-optie-reservering afgeschaft — volledige, niet-restitueerbare betaling is nu verplicht bij het boeken, dus pas boeken zodra de reisdatum vaststaat. ⚠️ Veiligheid Queen Elizabeth NP/Bwindi-corridor: de DRC-grens is sinds 27 mei 2026 gesloten wegens een Ebola-uitbraak (laatste patiënt ontslagen 16 juli 2026, 42-dagen-klok loopt); daarnaast pleegden op 1 november 2025 ADF-gelieerde groepen gecoördineerde aanvallen op veiligheidsposten in Kasese, Bundibugyo en Fort Portal — dezelfde westelijke Rwenzori-corridor waar QENP en Bwindi liggen (het reisadvies noemt QENP ook al apart vanwege de dodelijke aanslag op toeristen daar in 2023). Tour-operators melden dat de trekking-sectoren (Buhoma/Ruhija/Rushaga/Nkuringo) gewoon open en veilig zijn, maar dat is branche-inschatting, geen officieel advies — blijf op de gangbare toeristische routes en vermijd de Ishasha-DRC-grensstrook. Visum: geen visum-bij-aankomst meer, alleen e-visa vooraf ($50), gele-koorts-bewijs verplicht." },
    RW: { days: 10, budget: 2470, lat: -1.9403, lng: 29.8739, destinations: ["Kigali", "Volcanoes NP (gorillatrekking)", "Lake Kivu", "Nyungwe Forest"], transport_to_next: "Bus over land Kigali-Kampala via grensovergang Gatuna/Katuna, vlotte verbinding.", notes: "Prijscorrectie (2026-07): €225→€247/dag — het gorillapermit zelf ($1.500 p.p., ongewijzigd sinds 2017) blijft de dominante kostenpost, de correctie zit in de overige 9 dagen die eerder aan de krappe kant van de bandbreedte zaten. **Lake Kivu-verduidelijking (nieuw, nog niet eerder vastgelegd):** deze route bedoelt Kibuye/Karongi, NIET Rubavu/Gisenyi — Rubavu ligt direct tegenover Goma, dat momenteel in handen is van M23-rebellen, en valt onder het oranje ('alleen noodzakelijke reizen') reisadvies voor de DRC-grensstrook. Kibuye/Karongi ligt verderop langs het meer en blijft geel. Ook de Rwanda-Burundi-grens binnen het Nyungwe-regenwoud is sinds januari 2024 gesloten (los van het M23-conflict, niet relevant voor de geplande route zelf). Visum: geen vrijstelling voor Nederlanders — visum-bij-aankomst Kigali (~$50) of e-visa via Irembo vooraf." },
    TZ: { days: 24, budget: 3100, lat: -3.3869, lng: 36.683, destinations: ["Arusha", "Ngorongoro Crater", "Serengeti", "Lake Manyara", "Zanzibar", "Kilimanjaro (regio)", "Dar es Salaam"], transport_to_next: "Over land via grensovergang Rusumo en bootverbinding over het Victoriameer naar Kigali, of vlucht Dar es Salaam/Kilimanjaro-Kigali.", notes: "Prijscorrectie (2026-07): €117→€129/dag (buffer tegen recent verhoogde parkentrees Ngorongoro/Serengeti, nu $70-83/dag/park). Visum: los e-visa nodig, $50 (Tanzania valt niet onder de East Africa Tourist Visa). Reisadvies: geel voor de hele route; alleen het Mtwara-grensgebied met Mozambique (ver in het zuiden, niet op deze route) is oranje." },
    MG: { days: 24, budget: 1650, lat: -18.8792, lng: 47.5079, destinations: ["Antananarivo", "Andasibe-Mantadia", "Avenue of the Baobabs", "Morondava", "Isalo NP", "Nosy Be"], transport_to_next: "Vlucht Antananarivo-Port Louis, geen andere optie beschikbaar.", notes: "Prijscorrectie (2026-07): €78→€69/dag (basiskosten logies/eten/lokaal vervoer bleken bij navraag lager dan aangenomen) — reken daarbovenop apart: Nosy Be is een eiland en vereist een binnenlandse vlucht (enkele reis ~€100-130, retour ~€210-250); de overige etappes (Tana-Andasibe-Morondava-Isalo) het best met een privé-4x4+chauffeur (~€50-70/dag) gezien de beruchte wegconditie — samen ~€400-500 extra. Visum: 30-dagen e-visa nodig voor deze 24-daagse trip (~€34, evisamada.gov.mg) — niet de goedkopere 15-dagen-tier. Reisadvies: geel, hele land — verhoogd risico rond Tsingy de Bemaraha (grenst aan de Morondava-regio, niet zelf bezocht) en de zuidoostelijke Anosy-regio (niet op deze route)." },
    MU: { days: 7, budget: 1000, lat: -20.1609, lng: 57.5012, destinations: ["Port Louis", "Grand Baie", "Black River Gorges NP", "Chamarel", "Île aux Cerfs"], transport_to_next: "Vlucht Port Louis-Dar es Salaam/Zanzibar (Tanzania), meestal met overstap in Johannesburg of Nairobi.", notes: "Prijs geverifieerd (2026-07), klopt (€143/dag). Île aux Cerfs wordt vaak onderbudgetteerd: een kale veerpont kost ~€20-25 maar de gangbare georganiseerde dagtour (boot+lunch) ~€50-70 p.p. — reken dit apart voor die ene dag. Reisadvies: geel — zakkenrollerij expliciet genoemd in Port Louis en Grand Baie (beide op de route); piraterijrisico voor boten offshore (relevant voor de boottocht). Visum: visumvrij, 90 dagen." },
    MW: { days: 14, budget: 875, lat: -13.9626, lng: 33.7741, destinations: ["Lilongwe", "Lake Malawi (Cape Maclear)", "Liwonde NP", "Zomba Plateau", "Mount Mulanje"], transport_to_next: "Vlucht (meestal via Johannesburg of Nairobi) naar Antananarivo, Madagaskar — geen directe verbinding vanuit Malawi.", notes: "Prijscorrectie (2026-07): €59→€62,50/dag (Liwonde NP-entree ~€25/dag tijdens die etappes). ⚠️ Visum aangescherpt: sinds 2 januari 2026 is een visum weer verplicht (was voor veel nationaliteiten vrijgesteld) — Nederlanders kunnen nog visum-bij-aankomst krijgen, maar Malawi stuurt nu aan op een e-visa vooraf (evisa.gov.mw, ~€45). Nieuwe regel: accommodatie moet in harde valuta (USD/GBP/EUR/ZAR) betaald worden, niet in Kwacha — zorg voor voldoende contant geld, kaarten zijn niet overal betrouwbaar. Mount Mulanje vereist een betaalde lokale gids (~€15-25/dag). Reisadvies: geel, hele land." },
    MZ: { days: 20, budget: 1560, lat: -23.865, lng: 35.3833, destinations: ["Ilha de Moçambique", "Nampula", "Tofo", "Inhambane", "Bazaruto Archipel", "Maputo"], transport_to_next: "Over land via grensovergang Nyamapanda of Machipanda richting Zimbabwe.", notes: "Prijscorrectie (2026-07): €71→€78/dag. Visum gewijzigd (11 feb 2026): nieuw ETA-systeem (evisa.gov.mz), ~€10, minimaal 48u vooraf aanvragen — vertrouw niet meer op visum-bij-aankomst, luchtvaartmaatschappijen controleren dit nu vooraf. Reisadvies: geel voor de hele route (Ilha de Moçambique, Nampula, Tofo, Inhambane, Bazaruto, Maputo); oranje is sinds 4 december 2025 uitgebreid naar de Nampula-provincie (Erati/Memba-districten, buurdistricten van deze etappe) door het aanhoudende Cabo Delgado-conflict — check dit vlak voor vertrek, het kan verder opschuiven. Deze etappe springt geografisch groot (Nampula-Tofo-Maputo, 1.500-2.500km) — reken 2 binnenlandse vluchten (~€300-400 totaal, LAM) en de Bazaruto-boot (~€80-140) als aparte kostenposten bovenop het dagbudget." },
    ZM: { days: 16, budget: 1825, lat: -15.3875, lng: 28.3228, destinations: ["Lusaka", "South Luangwa NP", "Lower Zambezi NP", "Livingstone/Victoria Falls"], transport_to_next: "Over land via grensovergang Mchinji/Chanida richting Malawi.", notes: "Prijs geverifieerd (2026-07), klopt (€114/dag) — mits je bij South Luangwa/Lower Zambezi voor de zelfrijd-/kampeerstijl kiest (~€65-95/dag incl. parkentree) in plaats van de all-inclusive safari-lodges (€325-465/dag, een compleet andere prijscategorie). Grensovergang Angola-Zambia bevestigd: Jimbe (Angola)/Chavuma (Zambia), een reële maar pittige route — met de hand bijgehouden immigratieregisters, niet altijd bemand, alleen kleine 4x4 (geen vrachtwagens), volledige zelfvoorziening nodig (extra banden, bergingsmateriaal, meerdaagse brandstof/eten/water); praktisch venster juni-oktober, juli-september het beste. Een lokale gids uit Zambezi-stad (~€20-40/dag) wordt aangeraden. Visum: KAZA UniVisa (~€45) dekt Zambia+Zimbabwe plus een dagtrip naar Botswana, 30 dagen, bij aankomst verkrijgbaar in Lusaka/Livingstone of aan de grens. Reisadvies: geel voor de hele route." },
    ZW: { days: 14, budget: 1275, lat: -17.9243, lng: 25.8572, destinations: ["Victoria Falls", "Hwange NP", "Mana Pools", "Great Zimbabwe", "Bulawayo"], transport_to_next: "Over land via grensovergang Kazungula of Plumtree richting Botswana.", notes: "Prijs geverifieerd (2026-07), klopt (€91/dag) voor Victoria Falls/Bulawayo/Great Zimbabwe. ⚠️ Mana Pools is een aparte, aanzienlijke kostenpost: een verplicht gegidste meerdaagse wandel-/kanosafari (3-4 dagen) kost €1.300-1.650 p.p. all-in (een afgeslankte halve-dag-optie kan al vanaf ~€100) — niet gedekt door het dagbudget. Victoria Falls-toegang (Zimbabwe-zijde) ~€46; Hwange NP-entree ~€22/dag + gegidste wandelingen extra. Visum: e-visa/visum-bij-aankomst $30. Reisadvies: geel, hele land." },
    BW: { days: 16, budget: 2800, lat: -19.9953, lng: 23.4239, destinations: ["Kasane", "Chobe NP", "Okavango Delta (Maun)", "Makgadikgadi Pans", "Central Kalahari"], transport_to_next: "Over land via grensovergang Mamuno/Buitepos richting Namibië.", notes: "Prijscorrectie (2026-07): €158→€175/dag. Botswana heeft vrijwel geen goedkoop-onafhankelijk alternatief: Central Kalahari vereist een eigen 4x4-huurauto of gegidste mobiele safari (geen openbaar vervoer/goedkoop alternatief); Okavango Delta-tarieven lopen sterk uiteen (~€140 community-trust dagtrip tot €370+ voor scenic flying camps — dit budget gaat uit van de goedkopere stijl). Chobe-entreeprijs verhoogd naar BWP 270/dag (~€19) per 1 april 2026. Visum: visumvrij, 90 dagen, ongewijzigd. Reisadvies: geel, hele land." },
    NA: { days: 20, budget: 4000, lat: -22.5609, lng: 17.0658, destinations: ["Windhoek", "Sossusvlei/Namib-Naukluft", "Swakopmund", "Damaraland", "Etosha NP", "Fish River Canyon"], transport_to_next: "Over land via de grensovergang Oshikango/Santa Clara richting Angola.", notes: "⚠️ Prijscorrectie (2026-07): €100→€200/dag — de grootste correctie van deze verificatieronde. Twee oorzaken: (1) Namibië is sinds 1 april 2025 niet meer visumvrij voor Nederlanders (reciprociteitskwestie) — e-visa/visum-bij-aankomst nu verplicht, ~N$1.600 (~€80), eenmalig; (2) een 4x4-huurauto is voor vrijwel de hele route noodzakelijk (Sossusvlei, Damaraland, Etosha en Fish River Canyon zijn zonder eigen (huur)voertuig niet praktisch te doen) — huur ~€70-90/dag. Parkentrees ook verhoogd: Etosha NAD 280 p.p. + NAD 60 voertuig (per 1 april 2026), Sossusvlei/Namib-Naukluft NAD 150 + NAD 50, Fish River Canyon NAD 160 + NAD 50 + eenmalige wandelvergunning N$540. Reisadvies: geel, hele land — waarschuwing tegen 's nachts rijden (wild op de weg)." },
    AO: { days: 11, budget: 1700, lat: -14.9077, lng: 13.4925, destinations: ["Luanda", "Lubango", "Serra da Leba", "Tundavala-kloof", "Namibe-woestijn"], transport_to_next: "Over land via een grensovergang in het zuidoosten van Angola (bijvoorbeeld bij Jimbe) richting Zambia — minder bereisde grensovergang dan de rest van deze route, vooraf extra checken op actuele begaanbaarheid.", notes: "Prijscorrectie (2026-07): €136→€155/dag. Visum: goed nieuws — sinds Presidentieel Decreet 189/23 (begin 2024) is Angola visumvrij voor EU/Nederlandse toeristen, 30 dagen per bezoek (max 90/jaar), met een gele-koorts-vaccinatiebewijs — deze 11-daagse etappe blijft daar ruim onder. Oudere bronnen die een e-visa/$120-fee noemen zijn verouderd (of komen van visumbureaus die daar garen bij spinnen) — dubbelcheck bij Angola's officiële immigratieportaal voordat je erop vertrouwt. Angola is een van Afrika's duurdere reislanden (importgoederen, dun backpacker-netwerk buiten Luanda) — dit budget gaat uit van een huurauto/chauffeur voor het Lubango/Namibe/Tundavala-gebied, waar zelfstandig reizen amper infrastructuur heeft. Reisadvies: geel voor de hele route (Cabinda en de DRC-grensstrook in Lunda-Norte zijn oranje, niet op deze route)." },
    ZA: { days: 24, budget: 2300, lat: -26.2041, lng: 28.0473, destinations: ["Kaapstad", "Winelands (Stellenbosch)", "Garden Route", "Addo Elephant Park", "Kruger NP", "Johannesburg", "Drakensberg"], transport_to_next: "Over land de enclave Lesotho in via grensovergang Maseru Bridge (of avontuurlijker via Sani Pass).", notes: "Prijscorrectie (2026-07): €83→€96/dag — inclusief Kruger NP-natuurbehoudsheffing (~R602/dag ≈ €29, SANParks) en Addo Elephant Park (~R492/dag ≈ €26) tijdens die etappes. ⚠️ Sinds 1 juli 2026 is een online 'Traveller Declaration' verplicht vóór in-/uitreis — nieuw, check dit vooraf. Reisadvies: geel, hele land — gewapende overvallen/carjacking blijven een reëel risico (vermijd nachtelijk rijden, minibus-taxi's, solo wandelen op Table Mountain/Lion's Head), hijacking-hotspot Gauteng (Johannesburg zit op deze route)." },
    LS: { days: 6, budget: 350, lat: -29.3151, lng: 27.4869, destinations: ["Maseru", "Malealea", "Sani Pass/Thaba-Bosiu", "Roma", "Semonkong"], transport_to_next: "Over land terug door Zuid-Afrika naar grensovergang Golela/Lavumisa richting Eswatini.", notes: "Prijs geverifieerd (2026-07), klopt (€58/dag). Sani Pass is alleen met 4x4 te nemen — een gegidste dagtour vanuit Durban kost ~R3.845 (~€185), een aparte kostenpost. Visum: visumvrij maar slechts 14 dagen (korter dan Zuid-Afrika's 90 en Eswatini's 30) — let op bij het plannen. Bergpassen (Sani Pass, Semonkong) kunnen in de Lesotho-winter (juni-september) door sneeuw dicht gaan — bouw speelruimte in." },
    SZ: { days: 5, budget: 325, lat: -26.45, lng: 31.2, destinations: ["Mbabane", "Ezulwini Valley", "Mlilwane Wildlife Sanctuary", "Hlane Royal National Park"], transport_to_next: "Over land via grensovergang Lomahasha/Namaacha richting Mozambique.", notes: "Prijscorrectie (2026-07): €60→€65/dag. ⚠️ Politieke situatie ernstiger dan vaak aangenomen: de regering gebruikt actief de Public Order Act/Suppression of Terrorism Act tegen dissidenten, geen verantwoording voor de crackdown op protesten in 2021, een PUDEMO-leider werd in september 2024 in ballingschap vergiftigd. Demonstraties in Mbabane/Manzini kunnen onverwacht escaleren — check lokaal nieuws vlak voor vertrek en vermijd samenscholingen. Hlane's gegidste game drives zijn niet openbaar geprijsd door Big Game Parks — reken ~€25-35 per activiteit als richtprijs, bevestig rechtstreeks." },
  },
  "Nordic Arctic Expedition ❄️": {
    FI: { days: 8, budget: 1200, lat: 66.5039, lng: 25.7294, destinations: [
      { name: 'Helsinki', lat: 60.1699, lng: 24.9384 },
      { name: 'Rovaniemi', lat: 66.5039, lng: 25.7294 },
      { name: 'Inari', lat: 68.9056, lng: 27.0286 },
      { name: 'Lemmenjoki National Park', lat: 68.7333, lng: 25.7833 },
    ], transport_to_next: "Terug naar Rovaniemi (geen directe verbinding vanaf Inari/Lemmenjoki), dan trein of bus Rovaniemi–Kiruna via de Finse/Zweedse kust (Kemi-Haparanda-Boden), 8-9,5 uur. Met een eigen huurauto is Inari-Kaaresuvanto-Karesuando-Kiruna (~6-7u) sneller en vermijdt de terugkeer naar Rovaniemi.", notes: "Prijs geverifieerd (2026-07), klopt. Routelogica (2026-08, search-bevestigd): er is geen bus/trein-verbinding van Inari/Lemmenjoki rechtstreeks naar Zweden — de enige OV-optie gaat terug via Rovaniemi, en zelfs Rovaniemi-Kiruna is met bus/trein zelf al een omweg via de kust (8-9,5u) t.o.v. de auto (4u16m direct)." },
    SE: { days: 6, budget: 950, lat: 67.8558, lng: 20.2253, destinations: [
      { name: 'Kiruna', lat: 67.8558, lng: 20.2253 },
      { name: 'Sami-cultuur (Jukkasjärvi)', lat: 67.8556, lng: 20.5928 },
      { name: 'Abisko National Park', lat: 68.3558, lng: 18.7883 },
    ], transport_to_next: "Trein Kiruna–Narvik (Malmbanan/Ofotbanen, over land, spectaculaire bergroute)", notes: "Prijs geverifieerd (2026-07), klopt." },
    NO: { days: 15, budget: 2250, lat: 69.6492, lng: 18.9553, destinations: [
      { name: 'Narvik', lat: 68.4384, lng: 17.4272 },
      { name: 'Lofoten (Svolvær)', lat: 68.2341, lng: 14.5686 },
      { name: 'Senja', lat: 69.3167, lng: 17.5333 },
      { name: 'Tromsø', lat: 69.6492, lng: 18.9553 },
      { name: 'Noordkaap (Nordkapp)', lat: 71.171, lng: 25.7858 },
    ], transport_to_next: "Korte vlucht Honningsvåg (HVG, 31 km van Nordkapp) naar Tromsø (Widerøe, ~1u05) — vermijdt de ~540 km terugrit over de weg — aansluitend vlucht Tromsø-Longyearbyen (enige realistische verbinding naar Svalbard, Alta heeft geen LYR-vlucht).", notes: "Prijs geverifieerd (2026-07), klopt. Routelogica (2026-08, search-bevestigd): Longyearbyen heeft alleen vluchten vanuit Oslo en Tromsø — teruggevlogen Honningsvåg-Tromsø i.p.v. terugrijden bespaart ~6 uur." },
    SJ: { days: 4, budget: 900, lat: 78.2232, lng: 15.6469, destinations: [
      { name: 'Longyearbyen', lat: 78.2232, lng: 15.6469 },
      { name: 'Svalbard Museum', lat: 78.2199, lng: 15.6259 },
      { name: 'Pyramiden (dagtrip per boot)', lat: 78.657, lng: 16.3606 },
    ], transport_to_next: "Vlucht Longyearbyen–Oslo–Kopenhagen (SAS/Norwegian, geen directe verbinding, ~4u10-4u15 totaal)", notes: "Ingekort (2026-08, op Youri's verzoek): van 8 dagen/€3.725 (meerdaagse gegidste bootexpeditie) naar 4 dagen/€900 — alleen Longyearbyen zelf met 1-2 dagtours (bv. de boottocht naar de verlaten mijnstad Pyramiden, of een sneeuwscooter-/hondensleetocht richting Barentsburg) i.p.v. een meerdaagse expeditieboot. Buiten Longyearbyen is een gewapende gids (ijsberen) verplicht — al inbegrepen in de dagtours." },
    DK: { days: 3, budget: 450, lat: 55.6761, lng: 12.5683, destinations: [
      { name: 'Nyhavn', lat: 55.6798, lng: 12.591 },
      { name: 'Tivoli Gardens', lat: 55.6736, lng: 12.5681 },
      { name: 'Christiania', lat: 55.6739, lng: 12.5975 },
      { name: 'Torvehallerne', lat: 55.6838, lng: 12.5713 },
    ], transport_to_next: "Vlucht Kopenhagen–Vágar (Faeröer) met Atlantic Airways, ~2u15, minstens 2x per dag jaarrond (tot 4x/dag in de zomer) — flexibeler dan de eerdere optie via Oslo (Atlantic Airways RC435, slechts 3x/week).", notes: "Toevoeging (2026-08, op Youri's verzoek — nog niet bezocht, wel al Oslo en Stockholm gezien). Kopenhagen is een van de duurdere Europese hoofdsteden; dagbudget incl. privékamer-accommodatie, gemengd restaurant/streetfood en 1 betaalde attractie per dag. Praktische keuze: dit was al de overstap richting de Faeröer (voorheen Longyearbyen-Oslo-Kopenhagen-Vágar als pure transit) — nu als volwaardige stop met eigen dagen." },
    FO: { days: 7, budget: 1675, lat: 62.0107, lng: -6.7741, destinations: [
      { name: 'Tórshavn', lat: 62.0107, lng: -6.7741 },
      { name: 'Saksun', lat: 62.2667, lng: -7.2167 },
      { name: 'Gjógv', lat: 62.3167, lng: -6.8 },
      { name: 'Vestmanna Kliffen', lat: 62.1553, lng: -7.1668 },
      'Wandelroutes',
    ], transport_to_next: "Korte vlucht Vágar–Reykjavik (of seizoensgebonden veerboot Smyril Line, alleen in zomer)", notes: "Prijs geverifieerd (2026-07), klopt. Faeröer zijn geen EU/Schengen (wel Noordse Paspoortunie) — gewoon paspoort/ID nodig bij aankomst." },
    IS: { days: 14, budget: 2800, lat: 64.1466, lng: -21.9426, destinations: [
      { name: 'Reykjavik', lat: 64.1466, lng: -21.9426 },
      { name: 'Golden Circle (Þingvellir)', lat: 64.2559, lng: -21.131 },
      { name: 'Zuidkust (Vík í Mýrdal)', lat: 63.4186, lng: -19.006 },
      { name: 'Vatnajökull', lat: 64.0165, lng: -16.9787 },
      { name: 'Jökulsárlón', lat: 64.0784, lng: -16.23 },
      { name: 'Akureyri', lat: 65.6835, lng: -18.1002 },
      { name: 'Snæfellsnes', lat: 64.9257, lng: -23.3072 },
    ], transport_to_next: "Terug naar Reykjavik (Ring Road, auto inleveren), dan directe vlucht Reykjavik (Keflavík)–Nuuk met Icelandair/Air Greenland (jaarrond) — geen veerverbinding mogelijk", notes: "Prijs geverifieerd (2026-07), klopt (incl. huurauto, vrijwel noodzakelijk). Geel reisadvies voor het Reykjanes-schiereiland vanwege aanhoudende vulkanische activiteit bij Grindavík. Routelogica (2026-08, search-bevestigd): volgorde omgedraaid — Snæfellsnes stond eerder tussen Jökulsárlón en Akureyri (een onlogische zigzag terug naar het westen); nu als laatste stop vóór de terugkeer naar Reykjavik, zoals elke standaard Ring Road-planning het doet." },
    GL: { days: 10, budget: 3725, lat: 69.2198, lng: -51.1, destinations: [
      { name: 'Nuuk', lat: 64.1836, lng: -51.7214 },
      { name: 'Inuitcultuur (Nuuk)', lat: 64.1836, lng: -51.7214 },
      { name: 'Ilulissat', lat: 69.2198, lng: -51.1 },
      { name: 'IJsfjord (Ilulissat Icefjord)', lat: 69.1833, lng: -51.05 },
      { name: 'Disko Bay', lat: 69.25, lng: -53.0 },
      { name: 'Boottochten (bv. Eqi-gletsjer)', lat: 69.8167, lng: -50.3167 },
    ], transport_to_next: "Einde van de expeditie — directe vlucht terug vanuit Ilulissat naar Reykjavik met Icelandair (seizoensgebonden, ca. juni-september; vanaf eind oktober 2026 ook jaarrond direct vanuit Kopenhagen met Air Greenland)", notes: "Prijs geverifieerd (2026-07), krap maar houdbaar — binnenlandse vluchten tussen plaatsen (Air Greenland, vrijwel monopolie) zijn een structurele, geen incidentele kostenpost, waaronder de vlucht Nuuk-Ilulissat zelf (geen wegverbinding tussen Groenlandse steden). Geen EU/Schengen (wel Rijk Denemarken) — paspoortcontrole bij aankomst/vertrek, EHIC niet geldig. Routelogica (2026-08, search-bevestigd): instap/uitstap gecorrigeerd — instap is Nuuk (jaarrond directe vlucht vanuit Reykjavik), uitstap is Ilulissat (seizoensgebonden directe vlucht terug, geen omweg via Nuuk meer)." },
  },
  "Patagonia & Antarctica Expedition 🧊": {
    // Chile-Noord: Puerto Montt is het echte vertrekpunt (Chiloé is een dagtrip vandaar, niet
    // andersom), en de etappe eindigt bij Puerto Río Tranquilo — verder zuiden op de Carretera
    // Austral (Cochrane/Villa O'Higgins) heeft geen wegverbinding naar Puerto Natales (2026-08 fix).
    CL: { days: 15, budget: 2000, lat: -41.4693, lng: -72.9424, destinations: [
      { name: 'Puerto Montt', lat: -41.4693, lng: -72.9424 },
      { name: 'Chiloé Island (dagtrip)', lat: -42.4827, lng: -73.7626 },
      { name: 'Parque Pumalín', lat: -42.6083, lng: -72.4886 },
      { name: 'Queulat National Park', lat: -44.4667, lng: -72.5667 },
      { name: 'Villa Cerro Castillo', lat: -45.85, lng: -72.15 },
      { name: 'Puerto Río Tranquilo & Marble Caves', lat: -46.6333, lng: -72.6667 },
    ], transport_to_next: "Overland via de grensovergang Chile Chico-Los Antiguos (bereikbaar vanaf Puerto Río Tranquilo via de weg langs Lago General Carrera), dan Ruta 40 zuidwaarts naar El Calafate — nodig omdat de Carretera Austral bij Cochrane/Villa O'Higgins geen wegverbinding heeft naar Puerto Natales; de vroegere vlucht Balmaceda-Punta Arenas is sinds oktober 2025 gestaakt.", notes: "Prijs geverifieerd (2026-07), klopt. Naviera Austral vaart in het hoogseizoen (jan-mrt) rechtstreeks van Quellón (zuid-Chiloé) naar Chaitén — buiten dat venster ga je terug via Puerto Montt om de Carretera Austral te beginnen." },
    // Argentinië-Calafate/El Chaltén: komt nu vóór Chili-Zuid, zodat de reis via de Cancha
    // Carrera-grensovergang rechtstreeks naar Torres del Paine kan i.p.v. via Puerto Natales (2026-08).
    AR: { days: 10, budget: 1320, lat: -50.3379, lng: -72.2648, destinations: [
      { name: 'El Calafate', lat: -50.3379, lng: -72.2648 },
      { name: 'Perito Moreno Glacier', lat: -50.4967, lng: -73.1387 },
      { name: 'El Chaltén', lat: -49.3315, lng: -72.8862 },
      { name: 'Fitz Roy & Laguna de los Tres', lat: -49.2667, lng: -72.9667 },
      { name: 'Cerro Torre', lat: -49.2833, lng: -73.1167 },
    ], transport_to_next: "Overland via de Cancha Carrera-grensovergang rechtstreeks naar Torres del Paine (~2,5-3 uur) — geen omweg via Puerto Natales nodig.", notes: "Prijs geverifieerd (2026-07), klopt. Bosbrandseizoen december-maart in Patagonië (o.a. bij El Chaltén) — check actuele situatie vlak voor vertrek. Nieuw (2026-08): Argentinië vereist sinds juli 2025 bewijs van reis-/zorgverzekering bij binnenkomst." },
    AQ: { days: 11, budget: 9500, lat: -62.2, lng: -58.6333, destinations: [
      { name: 'Expedition Cruise from Ushuaia', lat: -54.8019, lng: -68.303 },
      { name: 'South Shetland Islands', lat: -62.15, lng: -58.45 },
      { name: 'Antarctic Peninsula', lat: -64.86, lng: -62.86 },
      { name: 'Glaciers & Icebergs', lat: -65.0, lng: -63.5 },
      { name: 'Penguin colonies', lat: -64.77, lng: -62.9 },
      { name: 'Whales', lat: -64.6, lng: -62.6 },
      { name: 'Return to Ushuaia', lat: -54.8019, lng: -68.303 },
    ], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Ushuaia", notes: "Prijs geverifieerd (2026-07): €9.500 zit prima binnen de reële bandbreedte voor een instap/gedeelde-hut Antarctica-cruise (2026: ≈$8.000-12.000). 11 dagen is realistisch voor een instapniveau-expeditiecruise (2026-08, search-bevestigd)." },
  },
  "India & Himalaya Expedition 🏔️": {
    // India ingekort (2026-08): Agra/Taj Mahal, Amritsar/Gouden Tempel en Dharamshala/McLeod Ganj
    // geschrapt op Youri's verzoek — al eerder bezocht. Delhi blijft als verplicht aankomstpunt.
    IN: { days: 22, budget: 935, lat: 28.6139, lng: 77.209, destinations: [
      { name: 'Delhi (aankomst, geen extra bezienswaardigheden — al bezocht)', lat: 28.6139, lng: 77.209 },
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
      { name: 'Pushkar', lat: 26.4899, lng: 74.5511 },
      { name: 'Jodhpur', lat: 26.2389, lng: 73.0243 },
      { name: 'Jaisalmer', lat: 26.9157, lng: 70.9083 },
      { name: 'Udaipur', lat: 24.5854, lng: 73.7125 },
      { name: 'Manali', lat: 32.2432, lng: 77.1892 },
      { name: 'Rishikesh', lat: 30.0869, lng: 78.2676 },
      { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
    ], transport_to_next: "Bus/trein naar Sunauli en te voet de grensovergang naar Belahiya (Nepal), dan bus door naar Lumbini/Pokhara — alternatief: korte vlucht Varanasi-Kathmandu", notes: "Ingekort (2026-08, op Youri's verzoek — al bezocht): Agra/Taj Mahal, Amritsar/Gouden Tempel en Dharamshala/McLeod Ganj geschrapt. Delhi blijft als verplicht aankomstpunt maar zonder extra bezienswaardigheden (Rode Fort etc. al gezien). Udaipur-Manali nu rechtstreeks (trein/vlucht via Delhi) — geen tussenstop in Amritsar/Dharamshala meer nodig. Dagen/budget meegeschaald (30→22 dagen, €1.275→€935). Reisadvies Punjab-grensregio (2026-08, search-bevestigd): explosieve incidenten bij Amritsar/Jalandhar op 5 mei 2026 — verder niet relevant nu Amritsar uit de route is, maar wel een signaal om die regio sowieso te vermijden." },
    NP: { days: 21, budget: 1260, lat: 27.7172, lng: 85.324, destinations: [
      { name: 'Lumbini', lat: 27.4833, lng: 83.2767 },
      { name: 'Chitwan National Park', lat: 27.5291, lng: 84.3542 },
      { name: 'Pokhara', lat: 28.2096, lng: 83.9856 },
      { name: 'Annapurna Region', lat: 28.5308, lng: 83.8797 },
      { name: 'Kathmandu', lat: 27.7172, lng: 85.324 },
      { name: 'Patan', lat: 27.6588, lng: 85.3247 },
      { name: 'Bhaktapur', lat: 27.671, lng: 85.4298 },
    ], transport_to_next: "Vlucht Kathmandu-Paro (spectaculaire Himalaya-vlucht, alleen door Drukair of Bhutan Airlines uitgevoerd, Bhutan-visum/permit vooraf regelen)", notes: "Prijscorrectie (2026-07): €47,60→€60/dag. Annapurna-trekdagen zijn duurder dan het gemiddelde: verplichte gids (sinds 2023, geen individueel trekken meer) + porter samen al snel $50-60/dag, plus TIMS/ACAP-vergunningen (~$50 eenmalig). Update (2026-08, search-bevestigd): TIMS-kaart is officieel nog verplicht maar wordt in de praktijk niet meer gecontroleerd op Annapurna-paden (ACAP-vergunning is de enige die echt gecheckt wordt); TAAN heeft op 22 maart 2026 de eis van minimaal 2 trekkers per groep geschrapt — solo trekken met gids mag nu ook." },
    BT: { days: 8, budget: 2275, lat: 27.4728, lng: 89.639, destinations: [
      { name: 'Paro', lat: 27.4305, lng: 89.4133 },
      { name: 'Thimphu', lat: 27.4728, lng: 89.639 },
      { name: 'Dochula Pass', lat: 27.3025, lng: 89.6529 },
      { name: 'Punakha', lat: 27.5921, lng: 89.8797 },
      { name: 'Bumthang (optioneel, per vlucht Paro-Bumthang)', lat: 27.5405, lng: 90.7438 },
      { name: "Tiger's Nest Monastery", lat: 27.4919, lng: 89.3628 },
    ], transport_to_next: "Einde van de expeditie — vlucht terug vanuit Paro International Airport", notes: "Prijs geverifieerd (2026-07), klopt ruim — de verplichte Sustainable Development Fee ($100/nacht, ongewijzigd sinds 2023, gegarandeerd tot 31 augustus 2027) zit al comfortabel in dit dagtarief verwerkt. Vlucht Paro-Kathmandu (~$400-500 enkele reis) is een aparte kostenpost, niet in dit dagtarief. Nieuw (2026-08): Bhutan heft sinds 1 januari 2026 5% GST op toeristische diensten (hotels, gidsen, vervoer) — raakt niet de SDF/visumkosten zelf, maar verhoogt de effectieve daguitgaven iets. Bumthang-uitstap: op Youri's verzoek de binnenlandse vlucht Paro-Bumthang genoteerd als standaardoptie i.p.v. de lange terugrit over de weg." },
  },
};

/** Looks up the seeded content for one country within one expedition — {code, name, days, budget, destinations, transport_to_next}. */
function rbContentFor(routeName, code, name) {
  const c = (RB_EXPEDITION_CONTENT[routeName] || {})[code] || {};
  return { code, name, days: c.days, budget: c.budget, destinations: c.destinations, transport_to_next: c.transport_to_next, notes: c.notes, lat: c.lat, lng: c.lng };
}

function rbSeedPredefinedExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY, '1');

  rbRoutes.push(rbBuildEurasiaRoute(), rbBuildPanAmericanRoute());
  rbSave();
}

function rbBuildEurasiaRoute() {
  const eurasia = (code, name) => rbContentFor('Eurasia Grand Tour 🌏', code, name);
  return rbBuildSeedRoute('Eurasia Grand Tour 🌏', [
    { name: 'Balkans', season: 'April–juni', budget: 1909, note: 'Mild voorjaar, voor de zomerdrukte en -hitte — sluit aan op een vroege start van de hele expeditie.', countries: [eurasia('BA', 'Bosnia and Herzegovina'), eurasia('HR', 'Croatia'), eurasia('ME', 'Montenegro'), eurasia('AL', 'Albania'), eurasia('MK', 'North Macedonia')] },
    { name: 'Turkey', season: 'Juni', budget: 1300, note: 'Aansluitend op de Balkan, nog vóór de zwaarste zomerhitte in Cappadocië en het binnenland.', countries: [eurasia('TR', 'Turkey')] },
    { name: 'Caucasus', season: 'Juni–augustus', budget: 1475, note: 'Bergpassen en Svaneti zijn dan sneeuwvrij; sluit direct aan op het Centraal-Aziatische bergseizoen.', countries: [eurasia('GE', 'Georgia'), eurasia('AM', 'Armenia'), eurasia('AZ', 'Azerbaijan')] },
    { name: 'Central Asia', season: 'Juni–september', budget: 2350, note: 'De Pamir Highway en hooggelegen passen zijn alleen in deze maanden begaanbaar — buiten dit venster ligt er sneeuw/ijs. Turkmenistan is bewust geschrapt (lastig te bezoeken/niet reëel voor deze reisstijl), en Nur-Sultan/Astana is losgelaten (lag te ver uit de route).', countries: [eurasia('KZ', 'Kazakhstan'), eurasia('KG', 'Kyrgyzstan'), eurasia('TJ', 'Tajikistan'), eurasia('UZ', 'Uzbekistan')] },
    { name: 'China', season: 'September', budget: 1625, note: 'Na de zomerdrukte/-hitte, ruim vóór de Mongoolse winterkou die erna komt. Xinjiang is bewust geschrapt (sociaalpolitieke redenen); Zhangjiajie en Guilin/Yangshuo vervangen het.', countries: [eurasia('CN', 'China')] },
    { name: 'Mongolia', season: 'Eind augustus–september', budget: 650, note: 'Vóór de vrieskou vanaf oktober; de Gobi is dan nog droog en warm genoeg voor een meerdaagse 4x4-tocht.', countries: [eurasia('MN', 'Mongolia')] },
    { name: 'Japan', season: 'Oktober–november', budget: 2700, note: 'Herfstkleuren, en rustiger dan de kersenbloesem-drukte in het voorjaar.', countries: [eurasia('JP', 'Japan')] },
    { name: 'Taiwan', season: 'November', budget: 750, note: 'Droog en mild, vóór het koelere winterseizoen in het noorden van het eiland.', countries: [eurasia('TW', 'Taiwan')] },
    { name: 'Mainland Southeast Asia', season: 'December–februari', budget: 2700, note: 'Het droge seizoen op het vasteland van Zuidoost-Azië — geen moesson, aangename temperaturen. Myanmar is bewust geschrapt (lastig te bezoeken/niet reëel voor deze reisstijl). Volgorde omgedraaid (2026-08): Vietnam → Cambodja → Laos → Thailand, via de klassieke Mekongdelta- en Huay Xai-grensovergangen, i.p.v. de eerdere Vietnam-Laos-volgorde die een onnodige backtrack naar het noorden vereiste.', countries: [eurasia('VN', 'Vietnam'), eurasia('KH', 'Cambodia'), eurasia('LA', 'Laos'), eurasia('TH', 'Thailand')] },
    { name: 'Maritime Southeast Asia', season: 'Februari–maart', budget: 2735, note: 'Nog droog in de meeste regio\'s, vóór de moesson die later in het voorjaar begint. Maleisië is uitgebreid (2026-08) met een Borneo-etappe (Sarawak → Brunei → Sabah, de bekende "Borneo Overland Trail") tussen het schiereiland en Brunei in — Maleisië komt hierdoor twee keer voor in deze route.', countries: [
      eurasia('MY', 'Malaysia'),
      {
        code: 'MY', name: 'Malaysia', days: 6, budget: 330, lat: 1.5533, lng: 110.3592,
        destinations: [{name:'Kuching',lat:1.5533,lng:110.3592}, {name:'Bako National Park',lat:1.7167,lng:110.4667}, {name:'Mulu Caves (Gunung Mulu NP)',lat:4.0428,lng:114.8144}],
        transport_to_next: 'Bus naar Miri, dan over land de grens over naar Bandar Seri Begawan, Brunei',
        notes: 'Sarawak-etappe van de Borneo Overland Trail (2026-08) — vervolg op het schiereiland-blok hierboven, met Brunei als tussenstop voor Sabah.',
      },
      eurasia('BN', 'Brunei'),
      {
        code: 'MY', name: 'Malaysia', days: 11, budget: 715, lat: 5.9788, lng: 116.0753,
        destinations: [{name:'Kota Kinabalu',lat:5.9788,lng:116.0753}, {name:'Mount Kinabalu',lat:6.0754,lng:116.5580}, {name:'Sepilok Orang-oetan Centre',lat:5.8742,lng:117.9478}, {name:'Kinabatangan-rivier',lat:5.5000,lng:118.3667}, {name:'Semporna/Sipadan',lat:4.4816,lng:118.6120}],
        transport_to_next: 'Vlucht Kota Kinabalu-Manila (AirAsia, ~4x/week, directe verbinding, ~2u)',
        notes: 'Sabah-etappe van de Borneo Overland Trail. Extra kostenposten (niet in dagbudget): Mount Kinabalu-beklimming (verplichte gids+vergunning, ~€250-350 all-in), Sipadan-duiken (beperkte vergunningen, ~€150-250/dag).',
      },
      eurasia('PH', 'Philippines'),
    ] },
    { name: 'Indonesia & Oost-Timor', season: 'Maart', budget: 1275, note: 'Droog seizoen loopt in de meeste regio\'s door tot april/mei. Java en Bali zijn bewust geschrapt (al bezocht) — Sumatra vervangt ze. Oost-Timor sluit hier logisch op aan, via de landgrens bij Kupang (West-Timor).', countries: [eurasia('ID', 'Indonesia'), eurasia('TL', 'East Timor')] },
    { name: 'Singapore Finale', season: 'Maart', budget: 375, note: 'Bewuste, compacte afsluiting van de hele Eurasia-expeditie — een rustige stadsstop na Oost-Timor.', countries: [eurasia('SG', 'Singapore')] },
  ], {
    best_starting_month: 'April',
    travel_style: 'Backpacker — overland waar mogelijk (bus, trein, marshrutka/deeltaxi), vluchten alleen waar geen praktische grondroute bestaat (Baku-Almaty, de eilandsprongen in Zuidoost-Azië). Lokale guesthouses en hostels boven internationale ketens.',
    climate_summary: "Vergeleken scenario's: (1) een winterstart houdt de Balkan mild, maar sluit de Pamir Highway en Song-Kul in Centraal-Azië volledig af (onbegaanbare bergpassen) en treft Mongolië in zijn strengste vrieskou (-20 tot -30°C); (2) een zomerstart (juni-juli) is ideaal voor de Kaukasus en Centraal-Azië, maar laat de Balkan en Turkije in de drukste, heetste maanden vallen én brengt het vasteland van Zuidoost-Azië middenin het regenseizoen (juni-oktober); (3) een start begin april laat de Balkan nog in een mild voorjaar vallen, bereikt de Kaukasus/Centraal-Azië rond juni-september (bergpassen open), komt in september-oktober in China/Mongolië aan (na de zomerhitte, vóór de winterkou), bereikt Japan in oktober-november (herfstkleuren), en laat heel Zuidoost-Azië in december-maart vallen (droog seizoen). Beste keuze: start begin april in de Balkan, zodat vrijwel elke etappe van deze ~11-12 maanden durende expeditie in zijn beste seizoen valt.",
    description: 'Overland route across Eurasia, region by region — from the Balkans through the Caucasus and Central Asia to East and Southeast Asia.',
    notes: 'Imported from a ChatGPT brainstorm — country lists per region are a reasonable starting point, adjust freely. Some countries here (parts of the Balkans, Maritime SE Asia) may already be visited or planned in your Trips sheet — worth cross-checking and possibly reusing as Block Library items instead.\n\n' +
      "Tijdscontrole (2026-07): dagen per land zijn na een volledige realismecontrole opgehoogd (van 200 naar 344 dagen totaal, ~11-12 maanden) zodat elk land ook echt te ervaren is in plaats van alleen aan te doen — vooral China (12→28), Turkije (12→24), Filipijnen (10→21) en Indonesië (12→21) waren fors onderschat. Turkmenistan (3 dagen) is bewust ongewijzigd gelaten — dat is een visumgrens (transitvisum), geen onderschatting. Landen en volgorde zijn ongewijzigd gebleven; alleen de duur per land, de regio-seizoenen/-budgetten hierboven en deze klimaatredenering zijn toegevoegd. Overweeg desondanks om deze route ooit te knippen in twee losse expedities (West-Eurazië t/m Centraal-Azië, en Oost-Eurazië/Azië) — 11-12 maanden aaneengesloten is fors, ook voor langzaam reizen.\n\n" +
      "Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen (zelfde dagprijs, dus meer dagen = evenredig meer budget) — regio-budgetten hierboven zijn de nieuwe sommen.\n\n" +
      "Wijziging (2026-07): Turkmenistan en Myanmar verwijderd (lastig te bezoeken/niet reëel voor deze reisstijl), Oost-Timor toegevoegd direct na Indonesië, en Singapore verplaatst naar het allerlaatste blok van de hele expeditie als bewust eindpunt (was eerst onderdeel van Maritime Southeast Asia). Nieuw totaal: 27 landen (was 28), 336 dagen, €20.000.\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07, tweede route na de Mediterranean Civilizations-pilot): alle 27 landen gecheckt via web-onderzoek tegen actuele prijzen (tussen budget- en comfort-backpacker, Youri's reisstijl), visumregels en Nederlands reisadvies. Dagen ongewijzigd, alleen budgetten aangepast waar nodig. Prijscorrecties: Noord-Macedonië (€46,40→€37/dag — bleek de goedkoopste van de regio, was te hoog begroot), Mongolië (€57,50→€65/dag — de Gobi-jeeptour is een aparte kostenpost die het daggemiddelde optrekt), Brunei (€100→€120/dag — Ulu Temburong NP vereist een verplichte gids/tour), Singapore (€150→€125/dag — realistisch voor deze stijl, €150 bouwde meer marge in dan nodig). Bosnië, Kroatië, Montenegro, Albanië, Turkije, Georgië, Armenië, Azerbeidzjan, Kazachstan, Kirgizië, Tadzjikistan, Oezbekistan, China, Japan, Taiwan, Vietnam, Laos, Cambodja, Thailand, Maleisië, Filipijnen, Indonesië en Oost-Timor bleken al accuraat — geen aanpassing.\n\n" +
      "Losstaande, praktische aanvullingen (geen prijswijziging maar wel budget-relevant): Tadzjikistan (Pamir-jeep €150-300 p.p. apart, GBAO-vergunning combineerbaar met de e-visa), Mongolië (Gobi-jeeptour €75-110/dag apart), Brunei (Temburong-tour apart, zie budgetcorrectie), Indonesië (Komodo-boottochten $40-135/dag apart), Oost-Timor (Jaco Island 4x4 $85-150/dag apart, beperkte zorginfrastructuur — goede reisverzekering belangrijk). Visumcheck: Balkanlanden/Georgië/Kazachstan/Kirgizië/Oezbekistan/Turkije/Japan/Taiwan/Vietnam/Thailand/Maleisië/Brunei/Filipijnen/Singapore visumvrij (duur varieert per land); Azerbeidzjan/Tajikistan/Laos/Cambodja/Indonesië/Oost-Timor werken met een e-visa of visa-on-arrival; China is tot en met 31 december 2026 30 dagen visumvrij (unilaterale regeling) — geen apart Xinjiang-permit nodig voor Kasjgar/Ürümqi zelf.\n\n" +
      "⚠️ Actuele situatie Cambodja-Thailand grens (juli 2026): de landgrensovergang bij Poipet is momenteel gesloten door het grensconflict tussen beide landen (bestand sinds eind 2025, grens zelf blijft dicht) — deze route gebruikt die grens niet meer (zie 2026-08-wijziging hieronder). Verder geen acuut gevaarlijke situaties gevonden op deze route; wel een paar grensstroken om te vermijden (Armenië-Azerbeidzjan grensstrook, Filipijnen se Mindanao/Sulu — geen van alle op deze route zelf) — zie de losse landnotities hierboven. Dit is een momentopname (2026-07); check nederlandwereldwijd.nl zelf vlak voor vertrek.\n\n" +
      "Grote routelogica-herziening (2026-08): elke etappe gecontroleerd op instap/uitstap-consistentie (klopt de vlucht/bus daadwerkelijk met de vorige/volgende bestemming, en is de volgorde binnen elk land geografisch logisch) — zie de losse landnotities hierboven voor details per land. Belangrijkste wijzigingen: Kroatië teruggebracht tot alleen Dubrovnik (al bezocht elders); Albanië, Turkije, Georgië, Armenië, Azerbeidzjan en Oezbekistan heringedeeld voor betere aansluiting; Kazachstan zonder Nur-Sultan/Astana (te ver uit de route); Xinjiang volledig vervangen door Zhangjiajie en Guilin/Yangshuo in China (sociaalpolitieke reden); Vietnam herzien (Ha Giang Loop toegevoegd, Hue/Hoi An/Da Nang geschrapt, Da Lat en Phu Quoc als uitstapjes vanuit Ho Chi Minh City); landvolgorde Vietnam-Cambodja-Laos-Thailand omgedraaid (was Vietnam-Laos-Cambodja-Thailand); Thailand-Maleisië nu per boot (Koh Lipe-Langkawi) i.p.v. over land; Maleisië uitgebreid met een Borneo-etappe (Sarawak-Brunei-Sabah, de Borneo Overland Trail); Filipijnen omgezet naar een rondreis i.p.v. vaste basis Manila; Indonesië met Sumatra i.p.v. Java/Bali. Nieuw totaal: 27 landen, ~338 dagen, ~€19.850 (was 336 dagen/€20.000).",
  });
}

function rbBuildPanAmericanRoute() {
  const panAm = (code, name) => rbContentFor('Pan-American Grand Tour 🌎', code, name);
  return rbBuildSeedRoute('Pan-American Grand Tour 🌎', [
    { name: 'Mexico', season: 'November–december', budget: 1000, note: 'Droog seizoen, na de zomerse regens.', countries: [panAm('MX', 'Mexico')] },
    { name: 'Northern Central America', season: 'December–januari', budget: 1770, note: 'Droog seizoen, orkaanseizoen voorbij.', countries: [panAm('GT', 'Guatemala'), panAm('BZ', 'Belize'), panAm('HN', 'Honduras'), panAm('SV', 'El Salvador')] },
    { name: 'Southern Central America', season: 'Januari–februari', budget: 1975, note: 'Pacifische droge seizoen in Costa Rica/Panama — beste tijd voor de kust.', countries: [panAm('NI', 'Nicaragua'), panAm('CR', 'Costa Rica'), panAm('PA', 'Panama')] },
    { name: 'Colombia', season: 'Februari–maart', budget: 1260, note: 'Droog in zowel de Caribische regio als de koffiezone/Andes.', countries: [panAm('CO', 'Colombia')] },
    { name: 'Ecuador', season: 'Maart–april', budget: 1650, note: 'Sierra droog genoeg voor wandelen; Galápagos is jaarrond goed maar rustiger in dit seizoen.', countries: [panAm('EC', 'Ecuador')] },
    { name: 'Peru', season: 'April–mei', budget: 1050, note: 'Het Andes-droogseizoen begint — ideaal voor Cusco/Vallei van de Inca\'s en Huaraz-trekking.', countries: [panAm('PE', 'Peru')] },
    { name: 'Bolivia', season: 'Mei–juni', budget: 425, note: 'Droog seizoen, heldere Uyuni-zoutvlakte (let op: geen spiegel-effect zoals in het natte seizoen — een bewuste ruil).', countries: [panAm('BO', 'Bolivia')] },
    { name: 'Northern Chile', season: 'Juni–juli', budget: 520, note: 'Northern Chile only (Atacama, Antofagasta) — Patagonia is a separate future expedition. De Atacama is jaarrond droog; koude nachten in de Chileense winter, overdag prima.', countries: [panAm('CL', 'Chile')] },
    { name: 'Northern Argentina', season: 'Juli', budget: 350, note: 'Northern Argentina only (Salta, Jujuy) — Patagonia is a separate future expedition. Droog hoogseizoen in Salta/Jujuy, koude nachten in het hooggebergte.', countries: [panAm('AR', 'Argentina')] },
    { name: 'Southern Brazil', season: 'Juli–augustus', budget: 1166, note: 'Southern Brazil only — Northern Brazil is a separate future expedition. Zuid-Braziliaanse winter: mild en droog voor sightseeing (Iguaçu, koloniale steden), maar geen strandweer; voor strandtijd de hele reis 1-2 maanden later starten.', countries: [panAm('BR', 'Brazil')] },
  ], {
    best_starting_month: 'November',
    travel_style: 'Backpacker — lokale bussen (chicken bus tot luxere overlandbus) door Midden-Amerika en de Andes, af en toe een binnenlandse vlucht waar de afstand dat rechtvaardigt (bv. Salta-Foz do Iguaçu), zeilboot door de San Blas-eilanden i.p.v. vliegen over de Darién Gap.',
    climate_summary: "Deze route is al climate-optimized ontworpen (vandaar de novemberstart) — de region-seizoenen hierboven maken dat expliciet: elke regio krijgt de maand toebedeeld die volgt uit een geleidelijke opmars naar het zuiden vanaf 1 november, tot en met Zuid-Brazilië rond juli-augustus. De enige makke van deze opzet: bij een reis van ~9 maanden valt de kustfinale in Zuid-Brazilië (Florianópolis, stranden) in de Zuid-Amerikaanse winter — prima voor sightseeing (Iguaçu, koloniale steden), maar geen strandweer. Wie strandtijd in Brazilië belangrijk vindt, kan de hele reis 1-2 maanden later starten of een paar dagen inkorten bij de eerdere regio's zodat de finale weer in het voor- of naseizoen valt.",
    description: 'Climate-optimized route down the Americas, from Mexico to southern Brazil.',
    notes: 'Best started around November 1st (pick your target year and fill in the exact start date above). Patagonia, Antarctica, Northern Brazil, Suriname and the Caribbean are intentionally excluded — planned as separate future expeditions. Imported from a ChatGPT brainstorm — adjust country lists/regions as needed.\n\n' +
      "Tijdscontrole (2026-07): dit was al de best getempode expeditie (274→286 dagen, beperkt aangepast) — Guatemala t/m Ecuador en Bolivia kregen elk een paar dagen extra, terwijl Chili-noord en Argentinië-noord juist zijn ingekort (12→10 en 14→10) omdat één woestijnregio niet de volledige oorspronkelijke tijd nodig had; Mexico, Colombia en Peru waren al ideaal en zijn ongewijzigd. De region-niveau seizoenen hierboven volgen de novemberstart maand voor maand naar het zuiden toe; let op dat de Zuid-Brazilië-finale daardoor in de Zuid-Amerikaanse winter valt (mild, prima voor sightseeing, maar geen strandweer).\n\n" +
      "Vervolg (2026-07): budgetten per land meegeschaald met de aangepaste dagen — regio-budgetten hierboven zijn de nieuwe sommen.\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07): Belize (€57,50→€72/dag, watertaxi's tussen eilanden), Colombia (€28,57→€36/dag), Ecuador (€1.025→€1.650 totaal, Galápagos-park/transitkosten + boot-/landtour waren niet gedekt), Chili-noord (€40→€52/dag, San Pedro is duur) en Brazilië-zuid (€45,45→€53/dag, Rio/São Paulo) gecorrigeerd. Mexico, Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panama, Peru, Bolivia en Argentinië-noord bevestigd accuraat. Zie de losse landnotities hierboven voor reisadvies/visumdetails (o.a. Honduras' oranje provincies, El Salvador's noodtoestand, CA-4 gecombineerde visumlimiet, Peru/Bolivia's actuele noodtoestanden).",
  });
}

function rbSeedMEAExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_MEA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_MEA, '1');

  rbRoutes.push(rbBuildAfricaGrandTourRoute());
  rbSave();
}

/**
 * Africa Grand Tour — reordered 2026-07 to fix a real seasonal problem, at Youri's request. The
 * original north-to-south order (Egypt → East Africa → Islands → Southern Africa → South Africa
 * Finale) claimed East Africa's and Southern Africa's dry seasons were "opposite" and therefore
 * unfixable — verified via web research that this is FALSE: East Africa's dry season (June-October)
 * and Southern Africa's dry season (May-October) mostly OVERLAP. The real problem was sequencing:
 * doing both back-to-back with the Islands in between meant Southern Africa (the second of the two)
 * only arrived in November, already past the shared window and into its wet season.
 *
 * Research also surfaced a second, previously undocumented problem: Ethiopia's main rains (kiremt)
 * fall exactly June-September — the opposite of what the old route assumed when it bundled Ethiopia
 * into the same "June-September dry season" logic as Kenya/Uganda/Rwanda/Tanzania. Ethiopia's own
 * good window is October-March (peak December-February).
 *
 * Fix: reversed to a south-to-north sweep, starting in Southern Africa (which has no comparably good
 * secondary season — its wet season genuinely degrades game viewing) and ending with East Africa's
 * secondary dry pocket (January-February, still a recognized good window — southern Serengeti calving
 * season) rather than forcing Southern Africa into that trade-off instead. Ethiopia and Egypt move to
 * the very end as a "Hoorn van Afrika & Egypte" finale, landing in Ethiopia's actual good season and,
 * as a bonus, moving Egypt out of early-summer heat into its comfortable cool season. No countries
 * added or removed, no days/budget changed per country — same 18 countries, same total (288 days,
 * €29.225), just resequenced. Every new adjacency uses a real border crossing or a realistic flight
 * (see individual transport_to_next fields); the Angola-Zambia crossing is flagged as less-traveled
 * and worth extra pre-trip verification.
 */
function rbBuildAfricaGrandTourRoute() {
  const mea = (code, name) => rbContentFor('Africa Grand Tour 🌍', code, name);
  return rbBuildSeedRoute('Africa Grand Tour 🌍', [
    {
      name: 'Zuid-Afrika, Lesotho & Eswatini', season: 'Juni–begin juli', budget: 2975,
      note: 'De opener van de expeditie, met een echte internationale luchthaven als instappunt (Kaapstad/Johannesburg) — Kruger-wildlife spotten is hier op zijn best, ruim vóór het regenseizoen.',
      countries: [mea('ZA', 'South Africa'), mea('LS', 'Lesotho'), mea('SZ', 'Eswatini')],
    },
    {
      name: 'Zuidelijk Afrika', season: 'Juli–oktober', budget: 14035,
      note: "Van Mozambique tot Malawi via Zimbabwe, Botswana, Namibië, Angola en Zambia — valt bij deze volgorde vrijwel volledig in het droge seizoen (mei-oktober), met de beste wildlife-observatie juist tegen het einde (augustus-oktober). De Angola-Zambia grensovergang in het zuidoosten van Angola is minder bereisd dan de rest van deze route — vooraf extra checken.",
      countries: [mea('MZ', 'Mozambique'), mea('ZW', 'Zimbabwe'), mea('BW', 'Botswana'), mea('NA', 'Namibia'), mea('AO', 'Angola'), mea('ZM', 'Zambia'), mea('MW', 'Malawi')],
    },
    {
      name: 'Eilanden', season: 'Oktober–november', budget: 2650,
      note: 'Madagaskar en Mauritius — Madagaskars beruchte trage wegen zijn hier de grootste tijdsvreter, niet de bezienswaardigheden zelf.',
      countries: [mea('MG', 'Madagascar'), mea('MU', 'Mauritius')],
    },
    {
      name: 'Oost-Afrika', season: 'November–januari', budget: 10320,
      note: 'Tanzania, Rwanda, Oeganda en Kenia — landt in de korte regentijd (oktober-december, lichte middagbuien, goed te doen) en de daaropvolgende korte droge periode (januari-februari), inclusief het kalfseizoen van de zuidelijke Serengeti. Niet de absolute piek (juni-oktober, die valt hier samen met Zuidelijk Afrika\'s enige goede seizoen), maar een erkend sterk alternatief.',
      countries: [mea('TZ', 'Tanzania'), mea('RW', 'Rwanda'), mea('UG', 'Uganda'), mea('KE', 'Kenya')],
    },
    {
      name: 'Hoorn van Afrika & Egypte', season: 'Februari–maart', budget: 3115,
      note: "Ethiopië en Egypte als afsluiting. Ethiopië's hoofdregenseizoen (kiremt) valt juni-september — de oude volgorde zette Ethiopië daar per ongeluk middenin; hier landt het in zijn eigen goede venster (oktober-maart, piek december-februari). Egypte profiteert als bijkomend voordeel van het koelere naseizoen in plaats van de vroege zomerhitte.",
      countries: [mea('ET', 'Ethiopia'), mea('EG', 'Egypt')],
    },
  ], {
    best_starting_month: 'Juni',
    travel_style: 'Overland/safaritrucks tussen parken, verplichte lokale gidsen bij gorillatrekking (Oeganda/Rwanda), mix van budgetlodges en kamperen in de nationale parken, vluchten alleen tussen Malawi/Madagaskar/Mauritius/Tanzania (geen landroute mogelijk over water) en tussen Ethiopië en Egypte (geen praktische landroute door Soedan).',
    climate_summary: "Vergeleken scenario's, na verificatie via onderzoek (2026-07) dat de \"tegengestelde droge/natte cycli\"-aanname uit de oude volgorde onjuist was: Oost-Afrika's droge seizoen (juni-oktober) en Zuidelijk Afrika's droge seizoen (mei-oktober) overlappen juist grotendeels. Het echte probleem was de vólgorde: bij een juni-start en de oude landvolgorde (Oost-Afrika eerst, Zuidelijk Afrika pas na de eilanden) arriveerde Zuidelijk Afrika pas in november — al voorbij het gedeelde venster en middenin het regenseizoen. Bij de huidige, omgedraaide volgorde (zuid naar noord) krijgt Zuidelijk Afrika — dat geen vergelijkbaar sterk alternatief seizoen heeft — het gedeelde juni-oktober-venster, en schuift Oost-Afrika door naar november-januari: niet de absolute piek, maar wél een erkend sterk seizoen (korte regentijd plus het kalfseizoen van de zuidelijke Serengeti in januari-februari). Een bijkomende fix: Ethiopië's hoofdregenseizoen (kiremt, juni-september) werd in de oude volgorde per ongeluk gebundeld met de rest van Oost-Afrika's droge seizoen — hier landt Ethiopië op zijn eigen goede venster (oktober-maart, piek december-februari) aan het einde van de reis, samen met Egypte dat zo ook uit de vroege-zomerhitte van de oude volgorde is gehaald. Beste keuze: start begin juni in Zuid-Afrika.",
    description: 'Overland-route van zuidelijk Afrika via Oost-Afrika en de eilanden naar de Hoorn van Afrika en Egypte als finale. Beoogde duur ~9,5 maand.',
    notes: 'Oorspronkelijk geïmporteerd uit een ChatGPT-brainstorm, met Egypte als startpunt/noordelijke poort. Jordanië en Oman hoorden ooit bij deze route maar zijn verplaatst naar wat nu Mediterranean Civilizations Expedition 🏛️ is, zodat dit zuiver Afrikaans blijft + Egypte als historische/geografische aansluiting; Egypte zelf komt in beide routes voor omdat het bij beide thema\'s past. Zuid-Afrika staat al als "visited" in je Countries-sheet — de moeite waard om te checken voordat je het als nieuw behandelt.\n\n' +
      'Tijdscontrole (2026-07): dagen per land opgehoogd na een realismecontrole (247→277 dagen totaal) — vooral Oeganda (gorillatrekking-logistiek), Madagaskar (berucht trage wegen) en Mozambique (het land strekt zich noord-zuid enorm uit) waren onderschat.\n\n' +
      'Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen, en de 18 landen gegroepeerd in regio\'s met eigen seizoen/budget, zoals Eurasia en Pan-American die al hadden.\n\n' +
      "Toevoeging (2026-07): Angola toegevoegd tussen Namibië en Zambia (grensovergang Oshikango/Santa Clara vanaf Namibië, verder naar Zambia via een minder bereisde grensovergang in het zuidoosten van Angola). Afkomstig uit de West & Central Africa-ontwerpsessie — daar paste Angola geografisch slechter (alleen per vlucht bereikbaar, geen buurlanden op die route). Nieuw totaal na deze toevoeging: 18 landen (was 17), 288 dagen (was 277), €29.225 (was €27.725).\n\n" +
      "Omgedraaid naar een zuid-noord-volgorde (2026-07), op Youri's verzoek om het Oost-/Zuidelijk-Afrika-seizoenscompromis te verbeteren — zie de climate_summary hierboven voor de volledige redenering. Alle 18 landen, dagen en budgetten per land zijn ongewijzigd; alleen de volgorde, de regio-indeling/-namen, en de transport_to_next-routes (nu in omgekeerde richting, met een paar nieuwe grensovergangen waar de volgorde dat vereiste) zijn aangepast. Dit is een bewuste, volledige vervanging van de route (net als bij Mediterranean Civilizations Expedition destijds), niet een veld-patch — eventuele eigen aanpassingen die je zelf al had gemaakt aan losse velden gaan hierbij verloren.\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07, twaalfde route van deze verificatieronde, samen met British Isles de laatste twee): alle 18 landen gecheckt via web-onderzoek tegen actuele prijzen (tussen budget- en comfort-backpacker), visumregels en Nederlands reisadvies. Dagen ongewijzigd overal; alleen budgetten aangepast. Grootste correctie: Namibië (€100→€200/dag) — sinds april 2025 niet meer visumvrij voor Nederlanders, plus een 4x4-huurauto vrijwel overal op de route noodzakelijk. Ook fors omhoog: Zuid-Afrika, Mozambique, Botswana, Angola, Malawi, Tanzania, Rwanda, Kenia en Uganda (zie elk land z'n eigen notitie voor de reden — vaak een visumwijziging, gestegen parkentrees, of een kostenpost die eerder niet was meegenomen). Eén duidelijke daling: Madagaskar (€78→€69/dag — basiskosten bleken bij navraag lager, terwijl de eiland-vlucht naar Nosy Be en de privé-4x4-transfers nu apart zijn benoemd in plaats van in het dagbudget verstopt). Lesotho, Zimbabwe (basisbudget) en Mauritius bevestigd accuraat, geen wijziging. Zambia bevestigd accuraat mits de zelfrijd-/kampeerstijl bij South Luangwa/Lower Zambezi wordt aangehouden in plaats van all-inclusive safari-lodges. Nieuw totaal: €33.095 (was €29.225), 288 dagen ongewijzigd.\n\n" +
      "⚠️ Belangrijkste losstaande bevinding: Lalibela, Gondar en de Simien Mountains (Amhara-regio) en de Danakil Depressie (Afar-regio) staan momenteel volledig ROOD ('niet reizen') op het Nederlandse reisadvies door het Fano-milities-conflict resp. grensinstabiliteit met Eritrea — zie Ethiopië's eigen notitie voor de volledige uitleg. Youri heeft er bewust voor gekozen deze etappe ongewijzigd te laten (Route Builder is de aspirational/someday-laag), maar dit is een momentopname (juli 2026): check nederlandwereldwijd.nl zelf vlak vóór een eventuele echte reis. Twee andere routestukken verdienen extra aandacht bij het echt boeken: Rwanda's 'Lake Kivu'-stop is verduidelijkt naar Kibuye/Karongi (niet Rubavu/Gisenyi, dat tegenover het door M23 gehouden Goma ligt en oranje is), en Uganda's Queen Elizabeth NP/Bwindi-corridor heeft een tijdelijke DRC-grensafsluiting (Ebola-uitbraak) en een ADF-gerelateerde aanslag op nabijgelegen steden (nov 2025) — beide besproken in hun eigen landnotitie.",
  });
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
          code: 'ES', name: 'Spain', days: 10, budget: 600, lat: 37.3891, lng: -5.9845,
          destinations: ['Málaga', 'Granada (Alhambra)', 'Córdoba (Mezquita)', 'Sevilla'],
          notes: "Openingsetappe van de expeditie: Moorse en Romeinse geschiedenis in Andalusië, van de Alhambra in Granada tot de Mezquita in Córdoba. Historische binnensteden als rustige start voor de rest van de reis. Verborgen parel: Ronda, met zijn kloofbrug, als tussenstop tussen Málaga en Sevilla.",
          transport_to_next: "Veerboot Tarifa/Algeciras-Tanger (35-90 minuten, meerdere afvaarten per dag) — kortste en goedkoopste oversteek naar Afrika, geen vlucht nodig",
        },
        {
          code: 'MA', name: 'Morocco', days: 10, budget: 450, lat: 31.6295, lng: -7.9811,
          destinations: ['Tanger', 'Chefchaouen', 'Fes', 'Volubilis', 'Marrakech'],
          notes: "Berbercultuur, islamitische geschiedenis en Romeinse overblijfselen (Volubilis) naast elkaar. Medina's van Fes en Marrakech en de blauwe stad Chefchaouen als hoogtepunten; treinen tussen de grote steden zijn goed en goedkoop.",
          transport_to_next: "Vlucht Marrakech/Casablanca-Tunis — geen praktische land- of veerbootroute door de gesloten grens met Algerije",
        },
        {
          code: 'TN', name: 'Tunisia', days: 6, budget: 220, lat: 36.8065, lng: 10.1815,
          destinations: ['Tunis', 'Carthago', 'Dougga', 'El Jem', 'Sidi Bou Said'],
          notes: "Carthaagse beschaving (Carthago) en Romeins Noord-Afrika (Dougga, het amfitheater van El Jem, groter dan dat van Rome zelf) dicht bij elkaar; Sidi Bou Said als rustig, schilderachtig dorpje tussen de geschiedenis door.",
          transport_to_next: "Vlucht Tunis-Malta — geen betrouwbare jaarronde veerbootverbinding, alleen incidentele zomerdiensten",
        },
      ],
    },
    {
      name: 'Malta & Italië',
      season: 'Oktober',
      budget: 2775,
      note: "Van tempels ouder dan de piramides (Malta) via Magna Graecia en Romeins Zuid-Italië naar het hart van het Romeinse Rijk, met de Nuraghe-beschaving van Sardinië als unieke afsluiter.",
      countries: [
        {
          code: 'MT', name: 'Malta', days: 5, budget: 375, lat: 35.8989, lng: 14.5146,
          destinations: ['Valletta', 'Mdina', 'Gozo', 'Ġgantija-tempels', 'Hypogeum'],
          notes: "De Ġgantija-tempels en het Hypogeum zijn ouder dan de piramides van Gizeh — een van de oudste vrijstaande bouwwerken ter wereld. Daarnaast de Ridders van Malta in Valletta en Mdina, met een rustiger Gozo als tegenhanger.",
          transport_to_next: "Veerboot Valletta-Pozzallo of Valletta-Catania (Virtu Ferries, 1,5-3 uur) naar Sicilië",
        },
        {
          code: 'IT', name: 'Italy', days: 10, budget: 650, lat: 38.1157, lng: 13.3613,
          destinations: ['Palermo', 'Cefalù', 'Taormina', 'Syracuse', 'Agrigento (Valle dei Templi)', 'Etna'],
          notes: "Magna Graecia (Agrigento, Syracuse), Romeinse, Normandische en Arabische invloeden door elkaar op één eiland, met de Etna als natuurlijke afwisseling. Verborgen parel: het vissersdorpje Marzamemi, veel rustiger dan Taormina.",
          transport_to_next: "Veerboot over de Straat van Messina (Messina-Villa San Giovanni, 20-30 minuten) naar het vasteland, dan verder naar Napels",
        },
        {
          code: 'IT', name: 'Italy', days: 6, budget: 450, lat: 40.8518, lng: 14.2681,
          destinations: ['Reggio Calabria', 'Napels', 'Pompeï', 'Herculaneum'],
          notes: "Romeinse geschiedenis in het echt bevroren: Pompeï en Herculaneum, beide verwoest en geconserveerd door de Vesuvius. Napels zelf als levendige, chaotische contramal.",
          transport_to_next: "Trein Napoli-Roma (hogesnelheidstrein, circa 1 uur 10 minuten)",
        },
        {
          code: 'IT', name: 'Italy', days: 7, budget: 700, lat: 41.9028, lng: 12.4964,
          destinations: ['Colosseum', 'Forum Romanum', 'Pantheon', 'Vaticaan'],
          notes: "Het hart van het Romeinse Rijk en de klassieke geschiedenis waar de hele expeditie steeds weer naar teruggrijpt — Romeinse invloeden duiken ook op in Spanje, Tunesië, Turkije, Egypte en Jordanië.",
          transport_to_next: "Vlucht Rome-Cagliari, of nachtveerboot Civitavecchia-Olbia/Cagliari (circa 7-8 uur) voor wie de boot verkiest boven vliegen",
        },
        {
          code: 'IT', name: 'Italy', days: 6, budget: 600, lat: 39.2238, lng: 9.1217,
          destinations: ['Cagliari', 'Su Nuraxi', 'Costa Smeralda'],
          notes: "De Nuraghe-beschaving (Su Nuraxi, UNESCO) is uniek voor Sardinië en ouder dan de Romeinse aanwezigheid op het eiland. Costa Smeralda voor de kust, de rustigere Costa Verde als minder toeristisch alternatief.",
          transport_to_next: "Veerboot Santa Teresa Gallura-Bonifacio (circa 1 uur) — de kortste oversteek van de hele route",
        },
      ],
    },
    {
      name: 'Corsica & Zuid-Frankrijk',
      season: 'November',
      budget: 1075,
      note: "Twee Franse etappes die Bonifacio's kliffen en de Gallo-Romeinse monumenten van de Provence verbinden, voordat de reis via een vlucht de Egeïsche Zee oversteekt.",
      countries: [
        {
          code: 'FR', name: 'France', days: 5, budget: 475, lat: 41.9192, lng: 8.7386,
          destinations: ['Bonifacio', 'Ajaccio', 'Bavella'],
          notes: "Mediterrane natuur op zijn best: de kalksteenkliffen van Bonifacio, de granieten naalden van Bavella. Franse en Italiaanse invloeden lopen hier door elkaar. Verborgen parel: het Scandola natuurreservaat, alleen per boot te bezoeken.",
          transport_to_next: "Veerboot Ajaccio/Bastia-Marseille of Toulon (Corsica Ferries/La Méridionale, circa 6-10 uur, vaak als nachtboot)",
        },
        {
          code: 'FR', name: 'France', days: 6, budget: 600, lat: 43.2965, lng: 5.3698,
          destinations: ['Marseille', 'Arles', 'Nîmes', 'Pont du Gard'],
          notes: "Gallo-Romeinse geschiedenis (het aquaduct van de Pont du Gard, de arena's van Arles en Nîmes) in Provençaalse sfeer. Verborgen parel: de Camargue bij Arles, met wilde paarden en flamingo's, als natuurpauze.",
          transport_to_next: "Vlucht Marseille-Athene — geen praktische land- of veerbootroute gezien de afstand",
        },
      ],
    },
    {
      name: 'Griekenland & Cyprus',
      season: 'November-December',
      budget: 1690,
      note: "Van de Griekse oudheid op het vasteland via de Minoïsche beschaving van Kreta naar de Grieks-Romeins-Byzantijnse laag van Cyprus, vlak voor de oversteek naar Anatolië.",
      countries: [
        {
          code: 'GR', name: 'Greece', days: 12, budget: 840, lat: 37.9838, lng: 23.7275,
          destinations: ['Athene', 'Delphi', 'Olympia', 'Meteora', 'Peloponnesos'],
          notes: "Griekse oudheid, filosofie, democratie en mythologie op de belangrijkste locaties zelf: de Akropolis, het orakel van Delphi, de oorspronkelijke Olympische Spelen in Olympia. Verborgen parel: Monemvasia en Nafplio op de Peloponnesos, veel rustiger dan Athene.",
          transport_to_next: "Nachtveerboot Piraeus-Heraklion (circa 7-9 uur) naar Kreta",
        },
        {
          code: 'GR', name: 'Greece', days: 7, budget: 450, lat: 35.3387, lng: 25.1442,
          destinations: ['Heraklion', 'Knossos', 'Chania', 'Samariakloof'],
          notes: "De Minoïsche beschaving (Knossos) als oudste laag van de Griekse geschiedenis, gevolgd door eilandcultuur in Chania en een stevige wandeling door de Samariakloof. Verborgen parel: het roze zandstrand van Elafonisi, in het uiterste westen van het eiland.",
          transport_to_next: "Vlucht Heraklion-Larnaca (meestal met overstap in Athene) — geen betrouwbare directe veerbootverbinding",
        },
        {
          code: 'CY', name: 'Cyprus', days: 5, budget: 400, lat: 35.1856, lng: 33.3823,
          destinations: ['Paphos', 'Limassol', 'Nicosia'],
          notes: "Griekse, Romeinse en Byzantijnse lagen op één eiland: de mozaïeken van Paphos (UNESCO), het Romeinse theater van Kourion bij Limassol als verborgen parel, en de gedeelde hoofdstad Nicosia.",
          transport_to_next: "Vlucht Larnaca-Istanbul — rechtstreeks en kort, geen praktisch alternatief over water",
        },
      ],
    },
    {
      name: 'Anatolië',
      season: 'December',
      budget: 850,
      note: "Eén grote etappe die Byzantium, het Ottomaanse Rijk en de Romeinse steden van de Egeïsche kust samenbrengt, met Cappadocië als brug naar de rest van Anatolië.",
      countries: [
        {
          code: 'TR', name: 'Turkey', days: 20, budget: 850, lat: 41.0082, lng: 28.9784,
          destinations: ['Istanbul', 'Troje', 'Pergamon', 'Efeze', 'Pamukkale', 'Cappadocië'],
          notes: "Byzantijnse en Ottomaanse geschiedenis in Istanbul, Romeinse steden (Efeze, Pergamon) en oude Anatolische beschavingen (Troje) op één lijn, met de rotsformaties van Cappadocië en de kalksteenterrassen van Pamukkale als natuurlijke hoogtepunten. Verborgen parel: Assos en Aphrodisias, veel rustiger dan Efeze maar minstens zo indrukwekkend.",
          transport_to_next: "Vlucht Istanbul-Caïro — geen praktische land- of zeeroute via Syrië/Libanon",
        },
      ],
    },
    {
      name: 'Egypte & het Arabisch Schiereiland',
      season: 'December-Januari',
      budget: 2669,
      note: "Van de oud-Egyptische beschaving via de Nabateese handelsroutes van Jordanië en de Arabische handelswereld van Oman en de Dilmun-beschaving van Bahrein naar het moderne Qatar als bewust hedendaags slotakkoord.",
      countries: [
        {
          code: 'EG', name: 'Egypt', days: 14, budget: 784, lat: 30.0444, lng: 31.2357,
          destinations: ['Caïro', 'Gizeh', 'Luxor', 'Karnak', 'Aswan', 'Abu Simbel'],
          notes: "De oud-Egyptische beschaving in haar geheel: piramides (Gizeh), tempels (Karnak, Abu Simbel) en de Nijl als verbindende rode draad. Verborgen parel: de Siwa-oase, ver van de gebruikelijke route maar wel een omweg waard. Reisadvies (2026-07): geel voor Caïro/Gizeh/Luxor/Aswan/Abu Simbel — gewoon te bezoeken; alleen (Noord-)Sinaï buiten deze route is oranje/rood.",
          transport_to_next: "Veerboot Nuweiba-Aqaba (alternatief: vlucht Caïro-Amman) — kortste route naar Jordanië zonder om te vliegen via de Golf",
        },
        {
          code: 'JO', name: 'Jordan', days: 8, budget: 500, lat: 31.9454, lng: 35.9284,
          destinations: ['Amman', 'Jerash', 'Petra', 'Wadi Rum', 'Dode Zee'],
          notes: "Nabateese handelsroutes (Petra), Romeinse geschiedenis (Jerash) en de woestijn van Wadi Rum. December geeft aangename dagtemperaturen voor de wandeling naar de Schatkamer en voor kamperen in Wadi Rum. Praktische tip: de Jordan Pass (~50-60 JOD, ruim vooraf online kopen) bundelt toegang tot Petra/Jerash/Wadi Rum/40 andere sites en scheldt de losse 40 JOD-visumfee kwijt bij een verblijf van 3+ nachten — voordeliger dan losse tickets. ⚠️ Reisadvies (juli 2026): oranje voor heel Jordanië (normaal alleen de grensstreek met Syrië/Irak) door het regionale Iran-Israël/VS-conflict — check nederlandwereldwijd.nl vlak voor vertrek, dit kan alweer zijn gewijzigd.",
          transport_to_next: "Vlucht Amman-Muscat — geen landroute, overland via Saoedi-Arabië is visumtechnisch onpraktisch",
        },
        {
          code: 'OM', name: 'Oman', days: 7, budget: 770, lat: 23.588, lng: 58.3829,
          destinations: ['Muscat', 'Nizwa', 'Jebel Shams', 'Wahiba Sands'],
          notes: "Arabische handelsroutes, forten (Nizwa) en zowel bergen (Jebel Shams, de \"Grand Canyon van Arabië\") als woestijn (Wahiba Sands) op korte afstand van elkaar. Verborgen parel: Bahla Fort en de eeuwenoude falaj-irrigatiekanalen bij Nizwa (beide UNESCO). Prijscheck (2026-07): Jebel Shams en Wahiba Sands zijn niet met openbaar vervoer te doen — een huurauto (4x4) of tour is hier verplicht, wat het dagbudget flink optrekt t.o.v. Muscat zelf. ⚠️ Reisadvies (juli 2026): oranje voor Musandam/Duqm/Salalah/Sohar (geraakt door Iraanse aanvallen), maar geel — dit hele traject — voor Muscat/Nizwa/Jebel Shams/Wahiba Sands. Check nederlandwereldwijd.nl vlak voor vertrek, de situatie is volatiel.",
          transport_to_next: "Vlucht Muscat-Manama — korte Golfvlucht",
        },
        {
          code: 'BH', name: 'Bahrain', days: 3, budget: 300, lat: 26.2285, lng: 50.586,
          destinations: ["Qal'at al-Bahrein (Bahrein Fort)", 'Bahrain National Museum', 'Al Fateh Grand Mosque', 'Tree of Life'],
          notes: "Qal'at al-Bahrein (UNESCO) was de hoofdstad van de Dilmun-beschaving, een Bronstijd-handelsbeschaving die al rond 2000 v.Chr. tussen Mesopotamië en de Indusvallei handelde — een nog oudere laag geschiedenis dan de Nabateese en Arabische handelsroutes eerder in deze etappe. De Tree of Life, een eeuwenoude boom die op onverklaarde wijze midden in de woestijn overleeft, als natuurlijke curiositeit tussen de geschiedenis door. ⚠️ Reisadvies (juli 2026): ROOD — niet reizen. Iran voert aanvallen uit op militaire doelen in Bahrein, met waarschuwingen voor mogelijke aanslagen in centraal Manama; geen Nederlandse ambassade in Bahrein (dichtstbijzijnde: Koeweit). Op dit moment een harde no-go, geen budget-/planningskwestie — check nederlandwereldwijd.nl vlak voor vertrek, dit kan (hopelijk) weer zijn veranderd.",
          transport_to_next: "Vlucht Manama-Doha — korte Golfvlucht",
        },
        {
          code: 'QA', name: 'Qatar', days: 3, budget: 315, lat: 25.2854, lng: 51.531,
          destinations: ['Doha'],
          notes: "Bewust modern en hedendaags als afsluiting: islamitische architectuur (Museum of Islamic Art) en musea als contrast met de duizenden jaren geschiedenis eerder in de reis. ⚠️ Reisadvies (juli 2026): oranje — Qatar is geraakt door Iraanse raketten/drones gericht op Amerikaanse doelen. Reizen wordt alleen aangeraden als het noodzakelijk is. Check nederlandwereldwijd.nl vlak voor vertrek, de situatie kan alweer zijn gewijzigd.",
          transport_to_next: "Einde van de expeditie — terugvlucht vanuit Doha (Hamad International Airport) naar Nederland",
        },
      ],
    },
  ], {
    travel_style: "Backpacker — hostels met af en toe een hotel, openbaar vervoer waar mogelijk, ferry's tussen eilanden waar dat logisch is, vluchten alleen wanneer de afstand dat vereist (Marokko-Tunesië, Tunesië-Malta, Zuid-Frankrijk-Griekenland, Kreta-Cyprus, Cyprus-Turkije, Turkije-Egypte, Jordanië-Oman, Oman-Bahrein, Bahrein-Qatar).",
    best_starting_month: 'September',
    description: "Grote historische expeditie langs de beschavingen die de Mediterrane wereld hebben gevormd: van Moors Spanje via Noord-Afrika en Zuid-Europa naar de Levant en de Arabische handelswereld. Achttien etappes in zes regio's volgen Feniciërs, Carthagers, Grieken, Romeinen, Byzantijnen en de islamitische wereld door duizenden jaren geschiedenis.",
    climate_summary: "Vergeleken scenario's: (1) een start in maart/april is voor het Europese deel (Spanje t/m Turkije) prettiger dan september — milder, minder druk — maar schuift de woestijn-/Golfetappes (Egypte, Jordanië, Oman, Qatar) door naar juli-oktober, middenin het zwaarste woestijnseizoen (regelmatig 40-48°C in Wadi Rum en het binnenland van Oman); (2) een start begin september laat het Europese deel nog in het najaarszonnetje vallen, brengt Griekenland/Kreta/Cyprus/Turkije in een aangenaam najaar (minder toeristen, nog warm genoeg voor ferry's) en laat de hele Egypte-Jordanië-Oman-Qatar-etappe in december-januari vallen — het beste seizoen voor de Golf en de Egyptische/Jordaanse woestijn (dagen rond 20-28°C in plaats van 40+). Beste keuze: start begin september in Andalusië, zodat de expeditie (circa 4,5-5 maanden) medio januari in Qatar eindigt, met de zwaarste woestijnhitte overgeslagen. Let wel (nagezocht 2026-07): de veerboot Malta-Sicilië (Virtu Ferries, Pozzallo-Valletta) vaart het hele jaar door, maar met minder afvaarten in het najaar en kans op annulering bij slecht weer — dit is de echte risicoverbinding op deze route, check het actuele schema op book.virtuferries.com ruim van tevoren. Piraeus-Heraklion en de Corsicaanse oversteek (Corsica Ferries) blijken in de praktijk het hele jaar door met meerdere maatschappijen en (bijna) dagelijkse afvaarten te varen, dus daar is het risico kleiner dan gedacht — let bij Corsica wel op welke haven je gebruikt: Toulon en Bastia varen het vaakst, Marseille en Ajaccio minder frequent.",
    notes: "Ingevuld vanuit een uitgebreide ChatGPT-brainstorm (\"Mediterranean Civilizations Expedition\"), uitgewerkt en gestructureerd door Claude in dezelfde stijl als de andere grote reizen — dit vervangt de eerdere, veel kleinere \"Ancient Civilizations Expedition\"/\"North Africa & Middle East Expedition 🏜️\" (Marokko, Tunesië, Egypte, Jordanië, Oman, VAE, Cyprus) volledig.\n\n" +
      "Al bezocht vs. nieuw: 8 van de 13 landen in deze route staan al als \"visited\" in je Countries-sheet — Spanje, Frankrijk, Griekenland, Italië, Malta, Marokko, Cyprus en Turkije. Alleen Tunesië, Egypte, Jordanië, Oman en Qatar zijn nog onbezocht. Dat maakt dit voor een groot deel een verdiepingsreis (specifieke oude geschiedenis binnen al bekende landen) in plaats van nieuwe-landen-afvinken — de moeite waard om in het achterhoofd te houden, geen reden om iets te schrappen.\n\n" +
      "Kosteninschatting (circa 4,5-5 maanden, 138 dagen grondkosten + losse vluchten/ferry's ertussen): solo circa €10.500-11.500 (grondbudgetten €9.120 + internationale/tussenliggende vluchten en ferry's €1.400-2.400), met 3 personen circa €7.500-8.500 per persoon door gedeelde accommodatie en lokaal vervoer.\n\n" +
      "Transportstrategie: vooral ferry's tussen eilanden en over korte zeestraten waar dat logisch is (Spanje-Marokko, Malta-Sicilië, Sicilië-vasteland, Sardinië-Corsica, Corsica-Frankrijk, Piraeus-Kreta, Egypte-Jordanië) — dat zijn ook de mooiste/goedkoopste overgangen. Vluchten alleen waar geen praktische land-/zeeroute bestaat of politieke grenzen dat onmogelijk maken (Marokko-Tunesië door de gesloten Algerijnse grens, Tunesië-Malta, Frankrijk-Griekenland, Kreta-Cyprus, Cyprus-Turkije, Turkije-Egypte, Jordanië-Oman, Oman-Qatar).\n\n" +
      "Nog openstaande kandidaten: Algerije (Romeinse steden Timgad, Djemila, Tipasa) zou historisch goed passen tussen Marokko en Tunesië, maar is bewust weggelaten vanwege de gesloten grens met Marokko en een lastiger visumtraject. Libanon/Israël (het Fenicische kernland: Byblos, Tyrus, Sidon) zouden thematisch de sterkste aanvulling zijn — Feniciërs komen nu alleen via Carthago/Tunesië aan bod — maar zijn weggelaten vanwege reisadvies en grensgevoeligheden; heroverweeg dit apart als de situatie verandert.\n\n" +
      "Mogelijke schrapping: Qatar is de enige etappe zonder oude geschiedenis (puur modern) en qua thema de uitzondering op de rest van de route — bewust gehandhaafd als hedendaags slotakkoord zoals in de brainstorm bedoeld, maar de eerste kandidaat om te laten vervallen als de reis korter moet.\n\n" +
      "Alternatieve route: de volgorde omkeren (Qatar/Oman/Jordanië/Egypte eerst, Spanje als laatste) zou de woestijn-/Golfetappes in het vroege najaar leggen — juist het warmste, minst comfortabele moment daar — en eindigt bovendien in het kille Zuid-Europese winterseizoen. De huidige volgorde (Spanje → Qatar, start september) is voor beide uitersten van de route het gunstigst.\n\n" +
      "Dagen/budget/bestemmingen/transport hierboven zijn een eerste research-opzet, nog niet getoetst aan actuele prijzen, visumregels of persoonlijke voorkeuren — behandel dit als een eerste concept om zelf te verfijnen, geen boekbaar plan.\n\n" +
      "Tijdscontrole (2026-07): Rome (4→7 dagen — de Vaticaanse Musea alleen al zijn een volle dag, en Rome is berucht de meest onderschatte stad in reisplanningen) en de Turkije/Anatolië-etappe (14→20 dagen — Istanbul plus Troje, Pergamon, Efeze, Pamukkale én Cappadocië is een landbrede route) waren te krap. De rest van de expeditie klopte al goed. Met de extra 9 dagen (totaal nu 147 in plaats van 138) schuift het einde van half januari naar begin februari, nog steeds ruim vóór de Golf-zomerhitte — de klimaatredenering hierboven blijft dus overeind.\n\n" +
      "Vervolg (2026-07): budget voor Rome (400→700) en de Turkije/Anatolië-etappe (600→850) meegeschaald met de extra dagen; de rest van de expeditie ongewijzigd.\n\n" +
      "Toevoeging (2026-07): Bahrein toegevoegd tussen Oman en Qatar in de regio 'Egypte & het Arabisch Schiereiland' — dit stond hier al genoteerd als kandidaat sinds deze route werd gebouwd. Qal'at al-Bahrein (UNESCO) was de hoofdstad van de Dilmun-beschaving, een Bronstijd-handelsbeschaving tussen Mesopotamië en de Indusvallei — een nog oudere laag geschiedenis dan de rest van deze etappe. Nieuw totaal: 150 dagen (was 147), regiobudget 'Egypte & het Arabisch Schiereiland' €2.500 (was €2.150).\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07, pilot voor deze aanpak over alle 13 expedities): alle 13 landen gecheckt via web-onderzoek tegen actuele prijzen (bijgesteld naar Youri's reisstijl — tussen budget- en comfort-backpacker in, niet de kale bodemprijs), visumregels en Nederlands reisadvies. Dagen zijn overal ongewijzigd, alleen budgetten aangepast waar nodig. Prijscorrecties: Malta (€100→€75/dag — was te hoog), Sardinië (€83→€100/dag — eilandpremie onderschat, ligt qua prijsniveau dichter bij Rome dan bij de rest van Zuid-Italië), Corsica (€90→€95/dag — weinig hostels op het eiland, vaker aangewezen op een budgethotel), Griekenland-vasteland (€58→€70/dag — Delphi/Meteora/Peloponnesos hebben weinig hostels en de KTEL-intercitybussen zijn sinds maart 2026 zo'n 10% duurder), Egypte (€46→€56/dag — om de losse entreekosten van de grote sites, samen gemiddeld €8-12/dag, mee te nemen), Oman (€85,70→€110/dag — Jebel Shams en Wahiba Sands zijn niet met openbaar vervoer te doen, een huurauto/tour is verplicht), Bahrein (€116,70→€100/dag) en Qatar (€133,30→€105/dag — beide waren te hoog begroot voor wat er in de praktijk aan hostels/lokaal vervoer beschikbaar is). Spanje, Marokko, Tunesië, Sicilië, Napels, Rome, Provence, Kreta, Cyprus, Turkije en Jordanië bleken al accuraat — geen aanpassing.\n\n" +
      "Visumcheck: Spanje t/m Cyprus zijn EU/Schengen dus visumvrij (Cyprus is EU maar geen Schengen, dus met paspoortcontrole aan de grens); Turkije is visumvrij tot 90 dagen; Egypte vraagt een e-visa (~$30, vooraf online via visa2egypt.gov.eg, paspoort moet nog 6+ maanden geldig zijn); Jordanië werkt met visa-on-arrival, te omzeilen met de Jordan Pass (zie de losse notitie bij Jordanië hierboven); Oman is visumvrij tot 14 dagen (dekt de 7 geplande dagen ruim); Qatar is visumvrij tot 90 dagen; Bahrein werkt met een e-visa (~€22) of visa-on-arrival (~€61) — momenteel sowieso niet van toepassing gezien het reisadvies hieronder.\n\n" +
      "⚠️ Actuele reisadvies-situatie Golf-regio (juli 2026): een regionaal Iran-VS/Israël-conflict heeft geleid tot raket-/droneaanvallen op Jordanië, Oman, Qatar en Bahrein. Bahrein staat op dit moment op ROOD (niet reizen); Jordanië en Qatar op oranje voor het hele land; Oman op oranje voor Musandam/Duqm/Salalah/Sohar maar geel (dit traject) voor Muscat/Nizwa/Jebel Shams/Wahiba Sands. Er zou een pauze in de aanvallen zijn gemeld medio/eind juli 2026, dus dit kan alweer zijn veranderd — dit is uitdrukkelijk geen vaststaand feit maar een momentopname; check nederlandwereldwijd.nl zelf vlak voordat je hier ooit daadwerkelijk naartoe zou reizen. Zie ook de losse waarschuwingen bij Jordanië/Oman/Bahrein/Qatar hierboven.",
  });
}

function rbSeedArcticCircleExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_ARCTIC)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_ARCTIC, '1');

  rbRoutes.push(rbBuildArcticCircleRoute());
  rbSave();
}

function rbBuildArcticCircleRoute() {
  const arctic = (code, name) => rbContentFor('Nordic Arctic Expedition ❄️', code, name);
  return rbBuildSeedRoute('Nordic Arctic Expedition ❄️', [
    {
      name: 'Scandinavia', season: 'Juni', budget: 4400,
      note: 'Lapland en Noorse fjorden/eilanden per trein en bus — de enige etappe van deze expeditie die nog over land te doen is.',
      countries: [arctic('FI', 'Finland'), arctic('SE', 'Sweden'), arctic('NO', 'Norway')],
    },
    {
      name: 'North Atlantic Islands', season: 'Juli–augustus', budget: 9550,
      note: 'Svalbard, Denemarken, Faeröer, IJsland en Groenland — stuk voor stuk losse vluchtsprongen, geen doorlopende route; reken op weerbuffers.',
      countries: [arctic('SJ', 'Svalbard'), arctic('DK', 'Denmark'), arctic('FO', 'Faroe Islands'), arctic('IS', 'Iceland'), arctic('GL', 'Greenland')],
    },
  ], {
    best_starting_month: 'Juni',
    travel_style: 'Trein/bus in Scandinavië, vluchten voor de eilandsprongen (Svalbard, Denemarken, Faeröer, IJsland, Groenland) waar geen boot- of landroute bestaat, kleine guesthouses en de enkele hut/dagtour waar relevant.',
    climate_summary: "Vergeleken scenario's: (1) een winterstart (december-februari) levert noorderlicht op in Finland/Zweden/Noorwegen, maar sluit Svalbard-boottochten (zee-ijs), IJslands hooglandwegen en de boottochten bij Faeröer/Groenland vrijwel volledig af, met te korte en te koude dagen voor de wandelroutes; (2) een start in mei loopt nog risico op resterend zee-ijs bij Svalbard en gesloten hooglandwegen in IJsland; (3) een start begin juni treft alle acht bestemmingen in hun enige gedeelde goede seizoen: middernachtzon in Scandinavië, toegankelijk zee-ijs bij Svalbard, Kopenhagen op zijn best zonder seizoensbeperking, betrouwbaardere veerdiensten en wandelweer bij de Faeröer, volledig open hooglandwegen in IJsland, en de beste boottoegang tot de Diskobaai-ijsbergen bij Ilulissat in Groenland. Beste keuze: start begin juni, zodat de expeditie (circa 2-2,5 maand) eind augustus eindigt, ruim vóór de eerste herfststormen in de Noord-Atlantische regio.",
    description: 'Zomerexpeditie door het hoge noorden — van Lapland via Noorse fjorden en eilanden naar Spitsbergen, Kopenhagen, de Faeröer, IJsland en Groenland, met middernachtzon als rode draad.',
    notes: 'Imported from a ChatGPT brainstorm — originally seeded flat (no regions); Svalbard and the Faroe Islands may not yet appear in the Countries sheet dropdown — cosmetic only, the block still works. Several legs (Svalbard, Faroe, Iceland, Greenland) are flight-only hops rather than one continuous overland trip.\n\n' +
      'Tijdscontrole (2026-07): dagen per land licht opgehoogd (53→68 dagen totaal) — vooral Groenland (weersafhankelijke vluchten tussen plaatsen) en Noorwegen (Lofoten alleen al is fotografie/wandelen waard) waren krap. Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.\n\n' +
      'Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen, en de 7 landen alsnog gegroepeerd in 2 regio\'s (Scandinavia, North Atlantic Islands) met eigen seizoen/budget. Landen, volgorde en dagen zijn ongewijzigd.\n\n' +
      'Prijzen/visum/reisadvies-verificatie (2026-07): alle 7 bevestigd accuraat, geen budgetcorrecties nodig — dit is de duurste route van de hele Travel Atlas en dat bleek terecht. Zie de losse landnotities hierboven voor details (Groenlandse binnenlandse vluchten, Faeröer/Groenland paspoortcontrole ondanks Deens koninkrijk, Svalbard-gids, IJsland-vulkaanactiviteit).\n\n' +
      "Routelogica-herziening (2026-08): drie geografische fixes (search-bevestigd) — Finland-Zweden's transport_to_next benoemt nu expliciet de terugkeer naar Rovaniemi en de omweg via de kust (was verzwegen); Noorwegen eindigt op Noordkaap en vliegt terug naar Tromsø (Honningsvåg-Tromsø, Widerøe) i.p.v. 540km terugrijden voor de Svalbard-vlucht; IJslands Ring Road-volgorde rechtgezet (Snæfellsnes stond als een zigzag tussen Jökulsárlón en Akureyri, nu als laatste stop vóór Reykjavik); Groenlands instap/uitstap gecorrigeerd (instap Nuuk, jaarrond direct vanuit Reykjavik; uitstap Ilulissat, seizoensgebonden direct terug, geen omweg via Nuuk meer). Daarnaast twee wensen van Youri: Denemarken (Kopenhagen, 3 dagen/€450) toegevoegd tussen Svalbard en de Faeröer — nog niet bezocht, wel al Oslo en Stockholm; Svalbard ingekort van een meerdaagse gegidste bootexpeditie (8 dagen/€3.725) naar alleen Longyearbyen zelf met 1-2 dagtours (4 dagen/€900). Alle bestemmingen kregen coördinaten voor de 'Gedetailleerd'-kaartweergave. Nieuw totaal: 8 landen (was 7), 67 dagen (was 68), €13.950 (was €16.325).",
  });
}

function rbSeedPatagoniaAntarcticaExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_PATAGONIA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_PATAGONIA, '1');

  rbRoutes.push(rbBuildPatagoniaAntarcticaRoute());
  rbSave();
}

function rbBuildPatagoniaAntarcticaRoute() {
  const patagonia = (code, name) => rbContentFor('Patagonia & Antarctica Expedition 🧊', code, name);
  return rbBuildFlatSeedRoute('Patagonia & Antarctica Expedition 🧊', [
    patagonia('CL', 'Chile'),
    patagonia('AR', 'Argentina'),
    {
      code: 'CL', name: 'Chile', days: 9, budget: 1200, lat: -51.7236, lng: -72.4875,
      destinations: [
        { name: 'Puerto Natales', lat: -51.7236, lng: -72.4875 },
        { name: 'Torres del Paine National Park', lat: -50.9423, lng: -73.0357 },
        { name: 'Punta Arenas (dagtrip Isla Magdalena)', lat: -53.1638, lng: -70.9171 },
      ],
      transport_to_next: 'Vanaf Punta Arenas de veerboot over de Straat van Magellaan (Punta Delgada-Bahía Azul), dan de grensovergang bij San Sebastián en de weg naar Río Grande/Ushuaia — geen omweg via Puerto Natales meer nodig.',
      notes: "Prijs geverifieerd (2026-07), klopt. Torres del Paine-piek: refugio-overnachtingen incl. maaltijden lopen op tot $100-150/nacht — buiten het park blijft het dagtarief haalbaar. Punta Arenas is een bewuste dagtrip voor Isla Magdalena's pinguïnkolonie (alleen vandaar bereikbaar, niet vanuit Puerto Natales) — de reis gaat daarna direct verder naar Vuurland, geen terugreis naar Puerto Natales nodig (2026-08).",
    },
    {
      code: 'AR', name: 'Argentina', days: 8, budget: 1055, lat: -54.8019, lng: -68.303,
      destinations: [
        { name: 'Ushuaia', lat: -54.8019, lng: -68.303 },
        { name: 'Tierra del Fuego National Park', lat: -54.85, lng: -68.5833 },
        { name: 'Beagle Channel', lat: -54.87, lng: -67.9 },
      ],
      transport_to_next: 'Inschepen in Ushuaia voor de expeditiecruise — oversteek van de Drake Passage (ca. 2 dagen varen)',
      notes: "Vuurland-etappe, losgekoppeld van El Calafate/El Chaltén (2026-08) zodat de landvolgorde de echte grensovergangen volgt. Argentinië vereist sinds juli 2025 bewijs van reis-/zorgverzekering bij binnenkomst.",
    },
    patagonia('AQ', 'Antarctica'),
  ], {
    best_starting_month: 'November',
    travel_style: 'Backpacker/trekking — refugios en camping in de nationale parken, lokale bussen tussen de Patagonische steden, het Antarctica-gedeelte via een georganiseerde expeditiecruise (geen andere manier om er te komen).',
    climate_summary: "Vergeleken scenario's: (1) een start in de Zuid-Amerikaanse winter (juni-augustus) sluit vrijwel alle trekkingroutes in Torres del Paine en rond El Chaltén af (sneeuw, korte dagen, gesloten refugios) en valt volledig buiten het Antarctica-vaarseizoen (alleen november-maart); (2) een start in de vroege lente (september-oktober) loopt nog risico op sneeuw op de hogere paden en valt nog vóór het vaarseizoen; (3) een start begin november valt samen met zowel het begin van het Patagonische trekkingseizoen (november-maart, refugios open, lange dagen) als het Antarctica-vaarseizoen (november-maart, met de meeste walvis-/pinguïnactiviteit in januari-februari). Beste keuze: start begin november in Chileens Patagonië, zodat de expeditie (circa 1,5-2 maand, met ruimere weerbuffers bij de trekkingetappes) in december-januari bij de Antarctica-cruise uitkomt — het hart van het seizoen.",
    description: 'Trekkingexpeditie door Chileens en Argentijns Patagonië, afgesloten met een expeditiecruise naar het Antarctisch Schiereiland.',
    notes: 'Imported from a ChatGPT brainstorm — seeded with zero blocks: group these 3 countries into your own blocks via the region dropdown whenever you\'re ready to plan it for real. Chile and Argentina here are the southern (Patagonia) portions — the northern portions already appear in Pan-American Grand Tour. Antarctica may not yet appear in the Countries sheet dropdown — cosmetic only, the block still works. The Antarctica budget reflects a real expedition-cruise price, not a backpacker estimate.\n\n' +
      'Tijdscontrole (2026-07): Chili (15→24) en Argentinië (11→18) fors opgehoogd — beide onderschatten hoe weersafhankelijk Patagonische trekking is (wind/regen annuleren regelmatig wandeldagen bij Torres del Paine en Fitz Roy/Cerro Torre); Antarctica (11 dagen) volgt de lengte van een echte expeditiecruise en blijft ongewijzigd. Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.\n\n' +
      'Vervolg (2026-07): budgetten per land (Chili en Argentinië) meegeschaald met de opgehoogde dagen; Antarctica-budget ongewijzigd (cruise-prijs, niet dagen-afhankelijk).\n\n' +
      'Prijzen/visum/reisadvies-verificatie (2026-07): alle drie geverifieerd, geen aanpassingen nodig (Antarctica-cruisprijs bevestigd accuraat) — zie de losse landnotities hierboven voor details en caveats.\n\n' +
      "Grote routelogica-herziening (2026-08): route van 3 naar 5 etappes uitgebreid — Chili en Argentinië komen nu elk twee keer voor (Chili-Noord/Carretera Austral, Argentinië-Calafate/El Chaltén, Chili-Zuid/Torres del Paine, Argentinië-Vuurland/Ushuaia), zodat de landvolgorde de echte grensovergangen volgt. Grootste vondst: er is geen wegverbinding tussen het einde van de Carretera Austral (Cochrane/Villa O'Higgins) en Puerto Natales — de vlucht die dit vroeger overbrugde (Balmaceda-Punta Arenas) is sinds oktober 2025 gestaakt. Oplossing: een overland-oversteek via Argentinië (Chile Chico-Los Antiguos-grens, Ruta 40 zuidwaarts naar El Calafate/El Chaltén), gevolgd door de Cancha Carrera-grensovergang rechtstreeks naar Torres del Paine — dit maakt tegelijk de eerdere Punta Arenas-Puerto Natales-terugreis overbodig (vanaf Punta Arenas gaat de reis nu direct verder naar Vuurland via de veerboot over de Straat van Magellaan). Chiloé Island en Puerto Montt van volgorde gewisseld (Puerto Montt is het echte vertrekpunt, Chiloé een dagtrip vandaar). Alle bestemmingen kregen coördinaten (destinations zijn nu {name, lat, lng} i.p.v. platte tekst) voor de 'Gedetailleerd'-kaartweergave. Nieuw gevonden: Argentinië vereist sinds juli 2025 bewijs van reis-/zorgverzekering bij binnenkomst. Landen/dagen/budget-totaal ongewijzigd: 53 dagen, €15.075 — alleen opgesplitst in 5 etappes en heringedeeld.",
  });
}

function rbSeedHimalayaIndiaExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_HIMALAYA)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_HIMALAYA, '1');

  rbRoutes.push(rbBuildHimalayaIndiaRoute());
  rbSave();
}

function rbBuildHimalayaIndiaRoute() {
  const himalaya = (code, name) => rbContentFor('India & Himalaya Expedition 🏔️', code, name);
  return rbBuildFlatSeedRoute('India & Himalaya Expedition 🏔️', [
    himalaya('IN', 'India'), himalaya('NP', 'Nepal'), himalaya('BT', 'Bhutan'),
  ], {
    best_starting_month: 'Oktober',
    travel_style: 'Trein en lokale bus in India (met een binnenlandse vlucht als de afstand dat rechtvaardigt), georganiseerde trekking in Nepal met lokale gids/porter, verplichte gids en vaste dagprijs in Bhutan.',
    climate_summary: "Vergeleken scenario's: (1) een start in de Indiase zomer (april-juni) is bloedheet in Rajasthan/Delhi (regelmatig 40°C+) en valt daarna middenin de moesson (juli-september) voor zowel Noord-India als Nepal; (2) een start in de Nepalese lente (maart-april) geeft mooie rododendrons maar valt in India's heetste periode als je daar eerst doorheen reist; (3) een start begin oktober laat Noord-India net na de moesson in het aangename koele seizoen vallen (droog, heldere lucht, tot december comfortabel), en brengt je in november bij Nepal — het beste trekkingvenster van het jaar (net na de moesson, helderste zicht op de bergen, vóór winterse sneeuwval op de hoge passen) — gevolgd door Bhutan in november-december, ook nog binnen hun goede seizoen. Beste keuze: start begin oktober in Noord-India, zodat de expeditie (circa 2 maanden) medio december in Bhutan eindigt, met alle drie de landen in hun beste periode.",
    description: 'Rajasthan, Manali en Varanasi via Nepalese bergen naar het besloten koninkrijk Bhutan (Delhi, Agra, Amritsar en Dharamshala zijn al eerder bezocht, dus niet meer als bezienswaardigheid in deze route).',
    notes: 'Imported from a ChatGPT brainstorm — seeded with zero blocks: group these 3 countries into your own blocks via the region dropdown whenever you\'re ready to plan it for real.\n\n' +
      'Tijdscontrole (2026-07): dagen per land opgehoogd (50→59 dagen totaal) — vooral Nepal (17→21, "Annapurna Region" was vaag: als daar een basiskamptrek bij hoort is meer tijd nodig) en India-Noord (26→30, Indiase treinen/wegen lopen vaker uit dan gepland). Landen ongewijzigd; alleen duur, best_starting_month en klimaatredenering zijn toegevoegd.\n\n' +
      'Vervolg (2026-07): budgetten per land meegeschaald met de opgehoogde dagen.\n\n' +
      'Prijzen/visum/reisadvies-verificatie (2026-07): Nepal gecorrigeerd (€47,60→€60/dag, verplichte gids/porter + vergunningen op Annapurna-trekdagen niet gedekt); India en Bhutan bevestigd accuraat. Nieuw totaal: €1.260 Nepal (was €1.000). Zie de losse landnotities hierboven voor details.\n\n' +
      "Routelogica-herziening (2026-08): geen geografische fouten gevonden — Delhi als hub met twee losse etappes (Rajasthan zuidwest, Punjab/Himachal noord) en Bhutans terugkeer naar Paro voor Tiger's Nest zijn allebei al de standaard/optimale aanpak, geen bug. Wel ingekort op Youri's verzoek: Agra/Taj Mahal, Amritsar/Gouden Tempel en Dharamshala/McLeod Ganj geschrapt (al bezocht) — zie India's eigen notities voor details. Bumthang-uitstap in Bhutan nu per vlucht Paro-Bumthang i.p.v. de lange terugrit over de weg (Youri's voorkeur). Nepal-notities bijgewerkt (TIMS niet meer gecontroleerd op Annapurna-paden, TAAN-groepsgrootte-eis vervallen); Bhutan-notities bijgewerkt (nieuwe 5% GST sinds 2026). Alle bestemmingen kregen coördinaten voor de 'Gedetailleerd'-kaartweergave. Nieuw totaal: 51 dagen, €4.470 (was 59 dagen/€4.810) — het verschil komt volledig door India's inkorting.",
  });
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

  rbRoutes.push(rbBuildNorthAmericaRoute());
  rbSave();
}

function rbBuildNorthAmericaRoute() {
  return rbBuildSeedRoute('North America Grand Traverse 🌎', [
    {
      name: 'Atlantic Canada – Nova Scotia',
      season: 'Juni',
      budget: 900,
      countries: [{
        code: 'CA', name: 'Canada', days: 8, budget: 1200, lat: 44.6488, lng: -63.5752,
        destinations: ['Halifax', "Peggy's Cove", 'Lunenburg', 'Cape Breton Island & Cabot Trail'],
        transport_to_next: "Vlucht Halifax-Quebec City (~2 uur) — geen praktische overlandroute gezien de afstand door onbewoond Oost-Canada",
        notes: 'Startblok: vlucht Nederland-Halifax. Kennismaking met Canada via ruige Atlantische kust, vissersdorpjes, vuurtorens en Keltisch/Acadische cultuur op Cape Breton. Prijs geverifieerd (2026-07), klopt. eTA (bij inreis per vlucht) kost slechts ~€4,70, 5 jaar geldig.',
      }],
      note: 'Startpunt van de expeditie — vlucht Nederland-Halifax. Ruige kust, vissersdorpen en vuurtorens; geen huurauto nodig, alles is met kleine afstanden te doen vanuit Halifax.',
    },
    {
      name: 'Eastern Canada – Historic Cities',
      season: 'Juni',
      budget: 1500,
      countries: [{
        code: 'CA', name: 'Canada', days: 10, budget: 1675, lat: 46.8139, lng: -71.208,
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
        code: 'CA', name: 'Canada', days: 17, budget: 3400, lat: 51.1784, lng: -115.5708,
        destinations: ['Banff National Park', 'Lake Louise & Moraine Lake', 'Yoho National Park (Emerald Lake)', 'Icefields Parkway', 'Jasper National Park', 'Mount Robson Provincial Park', 'Whistler'],
        transport_to_next: 'Auto Whistler-Vancouver (~2 uur), huurauto inleveren in Vancouver — dezelfde huurauto blijft binnen Canada, dus geen one-way- of grenskosten',
        notes: 'Het natuurhoogtepunt van de hele expeditie: gletsjermeren, een van de mooiste wegen ter wereld (Icefields Parkway) en goede kans op wildlife (elanden, beren, bighorn sheep). Huurauto 2 wordt hier opgehaald in Calgary. Prijs geverifieerd (2026-07), klopt (mits ruim vooraf geboekt in hoogseizoen). ⚠️ Moraine Lake Road is alleen bereikbaar met de verplichte Parks Canada-shuttle (geen privéauto toegestaan) — boeking opent doorgaans medio april, beperkt aantal plekken, ruim vooraf regelen.',
      }],
      note: 'Huurauto 2 (Calgary-Vancouver). Reken op minstens 2-3 nachten per nationaal park om ook te kunnen wandelen, niet alleen doorrijden.',
    },
    {
      name: 'Vancouver',
      season: 'Juli',
      budget: 700,
      countries: [{
        code: 'CA', name: 'Canada', days: 5, budget: 875, lat: 49.2827, lng: -123.1207,
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
        code: 'US', name: 'United States', days: 15, budget: 3000, lat: 47.6062, lng: -122.3321,
        destinations: ['Seattle (Pike Place Market, Space Needle)', 'Olympic National Park (Hoh Rainforest & Hurricane Ridge)', 'Mount Rainier National Park', 'Oregon Coast (Cannon Beach, Astoria)', 'Redwood National & State Parks'],
        transport_to_next: 'Auto verder naar San Francisco (~5-6 uur vanaf de Redwoods), huurauto inleveren in San Francisco',
        notes: 'Amerikaanse natuur in het groot: regenwoud, vulkanen, ruige kustlijn en de hoogste bomen ter wereld. Huurauto 3 wordt hier opgehaald in Seattle. Prijs geverifieerd (2026-07), klopt. ESTA is per 30 sept. 2025 verhoogd naar $40,27 (was $21) — 2 jaar geldig.',
      }],
      note: 'Huurauto 3 (Seattle-San Francisco). Rustig tempo: liever 2-3 nachten bij een park dan elke dag doorrijden — dit is een kustroute, geen race.',
    },
    {
      name: 'California Finale',
      season: 'Augustus',
      budget: 2100,
      countries: [{
        code: 'US', name: 'United States', days: 14, budget: 2675, lat: 37.7749, lng: -122.4194,
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
      'Vervolg (2026-07): budgetten per etappe meegeschaald met de aangepaste dagen.\n\n' +
      "Prijzen/visum/reisadvies-verificatie (2026-07): alle 6 etappes bevestigd accuraat, geen budgetcorrecties nodig. eTA Canada ~€4,70 (5 jaar); ESTA VS onlangs verhoogd naar $40,27 (2 jaar). Moraine Lake Road: verplichte Parks Canada-shuttle, ruim vooraf boeken. Zie de losse etappe-notities hierboven voor details.",
  });
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
      budget: 4125,
      note: 'Vijf eilandengroepen in het droge seizoen, ruim vóór het cycloonseizoen (november-april) — de rustige, ontspannen opener van de expeditie.',
      countries: [
        {
          code: 'FJ', name: 'Fiji', days: 14, budget: 1050, lat: -17.7765, lng: 177.4356,
          destinations: ['Nadi', 'Mamanuca-eilanden', 'Yasawa-eilanden', 'Taveuni'],
          notes: "Beste backpacker-infrastructuur van de Pacific — eilandhoppen per boot (Yasawa Flyer) tussen de Mamanucas en Yasawas, snorkelen en duiken op de koraalriffen. Prijscorrectie (2026-07): €62,50→€75/dag (Yasawa Flyer-bootpas + vlucht naar Taveuni waren niet gedekt).",
          transport_to_next: 'Vlucht Nadi-Port Vila (Fiji Airways, de belangrijkste Pacific-hub)',
        },
        {
          code: 'VU', name: 'Vanuatu', days: 11, budget: 1045, lat: -17.7333, lng: 168.3273,
          destinations: ['Port Vila', 'Mount Yasur (Tanna)', 'SS President Coolidge wrak (Espiritu Santo)', 'Blue Holes'],
          notes: "Een van de meest toegankelijke actieve vulkanen ter wereld — tot vlak bij de kraterrand van Mount Yasur. Wereldklasse wrakduik op de SS President Coolidge. Prijscorrectie (2026-07): €70→€95/dag (binnenlandse vluchten naar Tanna/Santo + Yasur-tour waren niet gedekt; Air Vanuatu ging in 2024 failliet, vluchten zijn schaarser/duurder geworden).",
          transport_to_next: "Vlucht Port Vila-Apia (meestal met overstap via Fiji of Auckland)",
        },
        {
          code: 'WS', name: 'Samoa', days: 9, budget: 565, lat: -13.8506, lng: -171.7513,
          destinations: ['Apia', 'To Sua Ocean Trench', 'Lalomanu (beach fales)', 'Upolu'],
          notes: "Authentieke Polynesische cultuur, nog weinig aangetast door massatoerisme. Beach fales zijn traditionele, budgetvriendelijke strandhutjes — precies de rustige, lokale ervaring die bij deze reisstijl past. Prijs geverifieerd (2026-07), klopt — relatief goedkoop voor de Pacific.",
          transport_to_next: "Vlucht Apia-Nuku'alofa (meestal met overstap via Fiji)",
        },
        {
          code: 'TO', name: 'Tonga', days: 8, budget: 800, lat: -21.1393, lng: -175.2046,
          destinations: ["Nuku'alofa", "Vava'u (zwemmen met bultrugwalvissen)", "Ha'apai"],
          notes: "Een van de weinige plekken ter wereld waar je legaal mag zwemmen met bultrugwalvissen — het beste seizoen daarvoor is juli-oktober, dus check de exacte timing bij het plannen van de startdatum. Prijscorrectie (2026-07): €67,50→€100/dag, de grootste correctie van de route — vlucht naar Vava'u + de whale-swim tour zelf (vaak €150-250/dag) waren niet gedekt.",
          transport_to_next: "Vlucht Nuku'alofa-Rarotonga (lage frequentie, ruim van tevoren boeken)",
        },
        {
          code: 'CK', name: 'Cook Islands', days: 7, budget: 665, lat: -21.2367, lng: -159.7777,
          destinations: ['Rarotonga', 'Aitutaki-lagune'],
          notes: "De Aitutaki-lagune is minstens zo mooi als Bora Bora, voor een fractie van de prijs — het beste prijs-kwaliteitpunt van de hele Pacific voor lagune-schoonheid. Prijscorrectie (2026-07): €80→€95/dag (Air Rarotonga heeft een monopolie op de Aitutaki-vlucht, plus lagune-cruise).",
          transport_to_next: 'Vlucht Rarotonga-Perth (lange vlucht, meestal met overstap via Auckland of Sydney) — de grootste enkele vliegverbinding van de hele expeditie, nodig om van de Pacific naar het droge seizoen in West-Australië te komen',
        },
      ],
    },
    {
      name: 'Tropisch Australië',
      season: 'Juni-augustus',
      budget: 6300,
      note: 'Droog seizoen: de Kimberley-wegen zijn begaanbaar, geen moesson, geen kwallenseizoen bij Cairns.',
      countries: [
        {
          code: 'AU', name: 'Australia', days: 21, budget: 2520, lat: -31.9505, lng: 115.8605,
          destinations: ['Perth', 'Ningaloo Reef (walvishaaien)', 'Kimberley & Bungle Bungles', 'Gibb River Road', 'Broome'],
          notes: 'Ningaloo Reef en de Kimberley zijn spectaculair en kennen weinig massatoerisme — sterke match met natuur boven luxe. Wel de duurste/verste regio van de hele route qua afstanden; eerste kandidaat om in te korten als tijd/budget krap wordt. Prijscorrectie (2026-07): €87,62→€120/dag — de duurste regio bleek ook echt onderbegroot (walvishaai-tours, Bungle Bungles-vluchten, afgelegen roadhouse-prijzen).',
          transport_to_next: 'Auto over land via de Gibb River Road en Kununurra naar Darwin, of vlucht Broome-Darwin voor wie de Kimberley liever per vliegtuig oversteekt',
        },
        {
          code: 'AU', name: 'Australia', days: 14, budget: 1470, lat: -12.4634, lng: 130.8456,
          destinations: ['Darwin', 'Kakadu National Park', 'Litchfield National Park', 'Uluru', 'Kata Tjuta', 'Kings Canyon'],
          notes: 'Top End en Red Centre samen — de meest iconische landschappen van Australië. Juni-augustus is ook de koelste periode voor Uluru (overdag nog prima te wandelen, niet de verzengende hitte van de zomer). Prijscorrectie (2026-07): €87,50→€105/dag — Yulara/Uluru is een monopolie-resortstadje, ook budgetopties zijn er prijzig.',
          transport_to_next: 'Vlucht Alice Springs-Cairns of Darwin-Cairns (over land zou via de outback-highways dagenlang duren)',
        },
        {
          code: 'AU', name: 'Australia', days: 21, budget: 2310, lat: -16.9203, lng: 145.771,
          destinations: ['Cairns', 'Daintree Rainforest', 'Great Barrier Reef', 'Whitsundays & Whitehaven Beach', "Fraser Island / K'gari"],
          notes: 'Sterkste match met snorkelen/duiken/wildlife uit de wensenlijst. Droog seizoen betekent ook geen kwallenseizoen (dat loopt november-mei) bij Cairns. Prijscorrectie (2026-07): €87,62→€110/dag — een Whitsundays-zeiltocht of Fraser Island-tour kost al snel €250-400 op zich.',
          transport_to_next: 'Bus of camper over land langs de oostkust (Cairns-Brisbane-Byron Bay-Sydney), de klassieke backpacker-trail',
        },
      ],
    },
    {
      name: 'Gematigd Australië',
      season: 'Augustus-september',
      budget: 4130,
      note: 'Late winter/vroege lente — koeler dan de zomerpiek (december-februari), maar goed te doen; het bewuste compromis van deze route (zie de klimaatredenering van de hele expeditie).',
      countries: [
        {
          code: 'AU', name: 'Australia', days: 12, budget: 1050, lat: -33.8688, lng: 151.2093,
          destinations: ['Byron Bay', 'Sydney', 'Blue Mountains'],
          notes: 'Klassieke backpacker-trail met goede infrastructuur; Sydney is te iconisch om over te slaan. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: 'Auto over land via de kust of de Hume Highway naar Melbourne',
        },
        {
          code: 'AU', name: 'Australia', days: 10, budget: 875, lat: -37.8136, lng: 144.9631,
          destinations: ['Great Ocean Road', 'Melbourne', 'Grampians National Park'],
          notes: 'De beste roadtrip-ervaring van het hele land — sluit perfect aan bij "roadtrips waar dat logisch is". Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: 'Veerboot Spirit of Tasmania (Melbourne-Devonport) of korte vlucht naar Hobart/Launceston',
        },
        {
          code: 'AU', name: 'Australia', days: 12, budget: 1260, lat: -42.8821, lng: 147.3272,
          destinations: ['Cradle Mountain', 'Wineglass Bay (Freycinet)', 'Overland Track', 'Hobart'],
          notes: 'Ruige natuur, weinig massatoerisme — sterke match met deze reisstijl. Augustus-september is nog fris (soms sneeuw in het hooggebergte), dus pak warme kleding in. Prijscorrectie (2026-07): €87,50→€105/dag — het Overland Track-vergunning alleen al kost ~€120-150 p.p.',
          transport_to_next: 'Vlucht Hobart-Adelaide (meestal met overstap in Melbourne)',
        },
        {
          code: 'AU', name: 'Australia', days: 9, budget: 945, lat: -34.9285, lng: 138.6007,
          destinations: ['Adelaide', 'Kangaroo Island', 'Barossa Valley', 'Flinders Ranges'],
          notes: "Kangaroo Island is uitstekend voor wildlife (zeeleeuwen, koala's) — de sterkste match met de wildlife-wens uit dit blok. Barossa Valley (wijn) is de eerste kandidaat om te laten vervallen als er ingekort moet worden. Prijscorrectie (2026-07): €87,78→€105/dag — de Kangaroo Island-veerboot plus schaarse/duurdere accommodatie daar.",
          transport_to_next: 'Vlucht Adelaide-Christchurch (meestal met overstap in Sydney of Melbourne)',
        },
      ],
    },
    {
      name: 'Nieuw-Zeeland Finale',
      season: 'September-november',
      budget: 3388,
      note: 'Voorjaar — stabiel weer, rustiger dan de zomerdrukte (december-februari); door reisgidsen vaak aangeraden als shoulder season. Het emotionele hoogtepunt van de hele expeditie, bewust als afsluiter gekozen.',
      countries: [
        {
          code: 'NZ', name: 'New Zealand', days: 21, budget: 2268, lat: -45.0312, lng: 168.6626,
          destinations: ['Christchurch', 'Kaikoura', 'Abel Tasman', 'Franz Josef & Fox-gletsjers', 'Queenstown', 'Milford Sound & Fiordland', 'Dunedin & Catlins'],
          notes: 'Concentreert het merendeel van de iconische Nieuw-Zeelandse natuur. Overweeg minstens één Great Walk (Milford Track, Routeburn of Kepler) als meerdaagse hut-to-hut-trek — ruim van tevoren reserveren. Prijscorrectie (2026-07): €80→€108/dag — Milford Sound-cruise, gletsjeractiviteiten en Great Walk hut-fees waren niet gedekt; Queenstown is bovengemiddeld duur.',
          transport_to_next: 'Veerboot Picton-Wellington, over land verder het Noordereiland in',
        },
        {
          code: 'NZ', name: 'New Zealand', days: 14, budget: 1120, lat: -41.2865, lng: 174.7762,
          destinations: ['Wellington', 'Tongariro Alpine Crossing', 'Rotorua', 'Coromandel', 'Bay of Islands', 'Auckland'],
          notes: 'De Tongariro Alpine Crossing is de beste dagwandeling van het land. Rotorua voor geothermische verschijnselen en Māori-cultuur. Prijs geverifieerd (2026-07), klopt.',
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
      "Totaal: 183 dagen (~6 maanden), €14.780 grondkosten + circa €3.500-4.000 aan vluchten (Europa-Oceanië, Australië-interne vluchten, Australië-Nieuw-Zeeland, en losse tickets tussen elk Pacific-eiland). Nog niet getoetst aan actuele prijzen of reisadviezen — behandel dit als een eerste concept, geen boekbaar plan.\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07): grote bevinding — 9 van de 14 etappes waren onderbegroot, meestal doordat dure, specialistische activiteiten (walvis zwemmen, vulkaanbezoek, duurdere eilandvluchten, nationale-parkvergunningen, Milford Sound-cruises) niet in het vlakke dagtarief pasten. Pacific: Fiji (€62,50→€75), Vanuatu (€70→€95), Tonga (€67,50→€100, grootste correctie), Cook Islands (€80→€95); Samoa bevestigd accuraat. Australië: Perth/Kimberley (€87,62→€120), Darwin/Uluru (€87,50→€105), Cairns/GBR (€87,62→€110), Tasmanië (€87,50→€105), Adelaide/Kangaroo Island (€87,78→€105); Sydney-etappe en Great Ocean Road bevestigd accuraat. Nieuw-Zeeland: Zuidereiland (€80→€108, Milford Sound/gletsjers/Great Walks); Noordereiland bevestigd accuraat. Nieuw totaal: €17.943 grondkosten (was €14.780). Visum: Australië eVisitor is gratis (12 mnd geldig, max 3 mnd per bezoek); Nieuw-Zeeland NZeTA + verplichte IVL-toeristenheffing samen ~€60-63, geldig voor de hele reis. Reisadvies overal groen/routine — vooral seizoensgebonden natuurrisico's (cyclonen, bosbranden, kwallenseizoen in Noord-Australië nov-mei, niet relevant voor deze mei-november-planning).",
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
      budget: 2340,
      note: 'Droog seizoen, ruim na het orkaanseizoen (dat loopt juni-november) — een veilige, aangename opener.',
      countries: [
        {
          code: 'CU', name: 'Cuba', days: 18, budget: 1260, lat: 23.1136, lng: -82.3666,
          destinations: [
            { name: 'Havana (Habana Vieja)', lat: 23.1136, lng: -82.3666 },
            { name: 'Viñales-vallei', lat: 22.6167, lng: -83.7097 },
            { name: 'Cienfuegos', lat: 22.1496, lng: -80.4394 },
            { name: 'Trinidad', lat: 21.8047, lng: -79.9825 },
          ],
          notes: "Havana en het UNESCO-koloniale Trinidad zijn de hoogtepunten; de rustige Viñales-vallei (tabak, karstlandschap) is de verborgen parel. Casas particulares (particuliere kamers) zijn de gangbare backpacker-accommodatie. Prijs geverifieerd (2026-07), klopt. ⚠️ Reisadvies oranje (bevestigd geldig, laatst bijgewerkt 23 juni 2026): grote tekorten aan stroom/brandstof/voedsel/medicijnen, toenemende veiligheidsrisico's — de zesde landelijke stroomstoring van 2026 viel op 2 augustus. Kaarten werken niet bij pinautomaten (contant meenemen). Sinds 1 juli 2025 is de papieren tourist card vervangen door een e-Visa (~$50), gekoppeld aan het verplichte gratis D'Viajeros-formulier (invullen binnen 72u vóór aankomst). Routelogica (2026-08, search-bevestigd): volgorde omgedraaid — Viñales stond eerder als laatste stop (een dubbele omweg: eerst voorbij Cienfuegos naar Trinidad, dan terug naar Cienfuegos, dan een 4,5u oversteek naar Viñales vlak bij Havana); nu als retourtje vanuit Havana meteen aan het begin, gevolgd door Cienfuegos-Trinidad zonder kruisende routes.",
          transport_to_next: 'Terug naar Havana (~4u15 rijden vanaf Trinidad — de enige realistische internationale gateway, Santiago de Cuba zou de omweg verergeren), dan vlucht Havana-Kingston (meestal met overstap via Panama City of Miami)',
        },
        {
          code: 'JM', name: 'Jamaica', days: 12, budget: 1080, lat: 17.9714, lng: -76.7936,
          destinations: [
            { name: 'Kingston', lat: 17.9714, lng: -76.7936 },
            { name: "Dunn's River Falls (Ocho Rios)", lat: 18.4108, lng: -77.1296 },
            { name: 'Port Antonio', lat: 18.1811, lng: -76.4513 },
            { name: 'Blue Mountains (Hardwar Gap)', lat: 18.0747, lng: -76.6597 },
          ],
          notes: 'Blue Mountains (koffie, wandelen) en Port Antonio (rafting, watervallen, nauwelijks toeristen vergeleken met Negril/Ocho Rios) zijn de sterkste match met natuur boven luxe. Prijscorrectie (2026-07): €75→€90/dag, Jamaica is duurder dan aangenomen (guesthouses + entreegelden). Routelogica (2026-08, search-bevestigd): volgorde omgedraaid — Blue Mountains stond als losse heen-en-terugtrip vlak na Kingston (de kustweg naar Ocho Rios loopt daar niet doorheen); nu als bergroute-terugweg (Hardwar Gap, koffieplantages/Newcastle) vanaf Port Antonio naar Kingston, in plaats van een aparte uitstap aan het begin.',
          transport_to_next: 'Kort eindstuk Blue Mountains-Kingston (Hardwar Gap-bergroute), dan vlucht Kingston-Curaçao (meestal met overstap via Panama City of Miami)',
        },
      ],
    },
    {
      name: 'Nederlandse Caraïben',
      season: 'December-januari',
      budget: 1220,
      note: 'Droog seizoen — helderder water voor snorkelen en duiken.',
      countries: [
        {
          code: 'CW', name: 'Curaçao', days: 7, budget: 560, lat: 12.1084, lng: -68.9335,
          destinations: [
            { name: 'Willemstad (UNESCO)', lat: 12.1091, lng: -68.9316 },
            { name: 'Shete Boka National Park', lat: 12.3667, lng: -69.15 },
            { name: 'stranden (Grote Knip)', lat: 12.2167, lng: -69.15 },
          ],
          notes: 'Willemstad met zijn Nederlandse koloniale architectuur is de stedelijke tegenhanger van rustig Bonaire. Shete Boka (ruige noordkust) is de verborgen parel, veel rustiger dan de stranden. Prijs geverifieerd (2026-07), klopt. Digital Immigration Card verplicht vooraf invullen (gratis).',
          transport_to_next: 'Korte vlucht Curaçao-Bonaire',
        },
        {
          code: 'BQ', name: 'Bonaire', days: 6, budget: 660, lat: 12.25, lng: -68.4,
          destinations: [
            { name: 'Washington Slagbaai National Park', lat: 12.3167, lng: -68.4167 },
            { name: 'duiken/snorkelen (marine park)', lat: 12.15, lng: -68.2833 },
          ],
          notes: 'Wereldklasse duiken/snorkelen direct vanaf de kust. Washington Slagbaai NP (flamingo\'s, ruige natuur) is de verborgen parel, nauwelijks bezocht. Prijscorrectie (2026-07): €87,50→€110/dag (weinig budget-accommodatie, duiktrips zijn duur). Verplichte inreisbelasting ~€70 p.p. is een aparte kostenpost, niet in het dagtarief.',
          transport_to_next: 'Vlucht Bonaire-Guadeloupe (meestal met overstap via Aruba, Panama City of San Juan)',
        },
      ],
    },
    {
      name: 'Kleine Antillen',
      season: 'Januari-februari',
      budget: 2445,
      note: "Droog seizoen (carême) — beste moment om te wandelen in Dominica's regenwoud. De eilandvolgorde volgt de natuurlijke noord-zuid keten, en toevallig ook de veerbootlijn L'Express des Îles.",
      countries: [
        {
          code: 'GP', name: 'Guadeloupe', days: 7, budget: 615, lat: 16.0448, lng: -61.6654,
          destinations: [
            { name: 'La Soufrière (vulkaan)', lat: 16.0456, lng: -61.6654 },
            { name: 'Carbet-watervallen', lat: 16.0472, lng: -61.6167 },
            { name: 'Îles des Saintes', lat: 15.8667, lng: -61.5833 },
          ],
          notes: 'Franse Caraïbische cultuur gecombineerd met een actieve vulkaan. Îles des Saintes (kleine eilandjes voor de kust) is veel rustiger dan het hoofdeiland. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: "Veerboot L'Express des Îles naar Dominica (via Martinique)",
        },
        {
          code: 'DM', name: 'Dominica', days: 8, budget: 760, lat: 15.317, lng: -61.268,
          destinations: [
            { name: 'Boiling Lake-trektocht', lat: 15.3167, lng: -61.2667 },
            { name: 'Trafalgar Falls', lat: 15.3181, lng: -61.3331 },
            { name: 'Champagne Reef', lat: 15.2833, lng: -61.3833 },
          ],
          notes: '"Nature Island" — het minst ontwikkelde en meest ongerepte eiland van de vier. De Boiling Lake-trektocht is een zware hele dag op zich; reken op een rustdag ervoor of erna. Champagne Reef (vulkanische bubbels tijdens het snorkelen) is uniek. Prijscorrectie (2026-07): €72,50→€95/dag (nauwelijks hostels, guesthouses vanaf ~€60-70/nacht, verplichte gids voor Boiling Lake ~€55-70).',
          transport_to_next: "Veerboot L'Express des Îles naar St Lucia",
        },
        {
          code: 'LC', name: 'Saint Lucia', days: 7, budget: 560, lat: 13.83, lng: -61.0667,
          destinations: [
            { name: 'The Pitons', lat: 13.8167, lng: -61.0667 },
            { name: 'Sulphur Springs (drive-in vulkaan)', lat: 13.8347, lng: -61.0552 },
            { name: 'Tet Paul Nature Trail', lat: 13.8333, lng: -61.05 },
          ],
          notes: 'De iconische Pitons, meer toeristisch ontwikkeld dan de andere drie. Tet Paul Nature Trail geeft hetzelfde uitzicht op de Pitons, veel rustiger dan de drukke wandelpaden. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: 'Vlucht St Lucia-Grenada (niet op de veerbootlijn)',
        },
        {
          code: 'GD', name: 'Grenada', days: 7, budget: 510, lat: 12.08, lng: -61.728,
          destinations: [
            { name: 'Onderwaterbeeldenpark', lat: 12.0742, lng: -61.7325 },
            { name: 'kruidenplantages (nootmuskaat)', lat: 12.1667, lng: -61.7333 },
            { name: 'Grand Etang National Park', lat: 12.0833, lng: -61.6833 },
          ],
          notes: 'Het minst toeristische van de vier eilanden. Grand Etang NP (regenwoud, kratermeer) is de verborgen parel. Prijs geverifieerd (2026-07), klopt.',
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
          code: 'SR', name: 'Suriname', days: 11, budget: 605, lat: 5.852, lng: -55.2038,
          destinations: [
            { name: 'Paramaribo (UNESCO)', lat: 5.852, lng: -55.2038 },
            { name: 'Marrondorpen aan de rivier', lat: 4.4, lng: -55.0 },
            { name: 'Brownsberg Nature Park', lat: 4.95, lng: -55.1667 },
          ],
          notes: 'Nederlandse koloniale geschiedenis in Paramaribo, gecombineerd met een rivierreis naar Marrondorpen in het binnenland — reken op 3-5 dagen voor een fatsoenlijke jungletocht naast de stad. Brownsberg (uitzicht over het Brokopondostuwmeer) is de verborgen parel. Prijs geverifieerd (2026-07): waarschijnlijk net genoeg, Brownsberg/Marrondorpen-tours ($70-120/dag) drukken het gemiddelde op. Let op: "visumvrij" is niet helemaal juist — een verplicht online ICF-immigratieformulier + gelekoortsbewijs is nodig vooraf.',
          transport_to_next: 'Vlucht Paramaribo-Belém (schaarse rechtstreekse verbindingen; waarschijnlijk met overstap via Cayenne, Georgetown of een Braziliaanse hub — vooraf goed checken)',
        },
        {
          code: 'BR', name: 'Brazil', days: 14, budget: 840, lat: -2.7458, lng: -42.8339,
          destinations: [
            { name: 'Belém', lat: -1.4558, lng: -48.5039 },
            { name: 'Ilha do Marajó', lat: -0.7167, lng: -48.5167 },
            { name: 'Lençóis Maranhenses', lat: -2.5, lng: -43.0 },
            { name: 'Jericoacoara', lat: -2.7975, lng: -40.5137 },
            { name: 'Fortaleza', lat: -3.7172, lng: -38.5433 },
          ],
          notes: 'De overgang van de Amazone-riviermonding (Belém, Marajó — buffels, ongerept rivierdelta-eiland) naar de compleet andere zandduinenkust (Lençóis Maranhenses, Jericoacoara) als adembenemende afsluiter. De afstanden langs de kust worden vaak onderschat. Prijs geverifieerd (2026-07), klopt — de generieke Rio/São Paulo-veiligheidswaarschuwingen zijn niet relevant voor dit noordoostelijke traject.',
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
      "Totaal: 97 dagen (~3,2 maanden), €6.955 grondkosten + circa €3.000-3.500 aan vluchten (Caribische eilandhop-vluchten zijn berucht prijzig per afstand door weinig concurrentie; Suriname-Noord-Brazilië is waarschijnlijk de lastigste/duurste losse verbinding). Nog niet getoetst aan actuele prijzen, visumregels of reisadviezen — behandel dit als een eerste concept, geen boekbaar plan.\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07): Jamaica (€75→€90/dag), Bonaire (€87,50→€110/dag) en Dominica (€72,50→€95/dag) gecorrigeerd. Rest bevestigd accuraat. Nieuw totaal: €7.450 grondkosten (was €6.955). Zie de losse landnotities hierboven voor reisadvies/visumdetails.\n\n" +
      "Routelogica-herziening (2026-08): twee kleine geografische fixes (search-bevestigd, geen grote landvolgorde-omdraaiing nodig zoals bij Eurasia/Patagonia). Cuba's volgorde omgedraaid — Viñales stond eerder als laatste stop, wat een dubbele omweg gaf (voorbij Cienfuegos naar Trinidad, terug naar Cienfuegos, dan een 4,5u oversteek naar Viñales vlak bij Havana, waar je toch weer voor de vlucht naartoe moet); nu Havana-Viñales-Cienfuegos-Trinidad, met een duidelijk benoemde terugreis naar Havana voor de vlucht. Jamaica's volgorde omgedraaid — Blue Mountains stond als losse heen-en-terugtrip vlak na Kingston (de kustweg naar Ocho Rios loopt daar niet doorheen); nu Kingston-Ocho Rios-Port Antonio-Blue Mountains, met de Hardwar Gap-bergroute als natuurlijke terugweg naar Kingston. Cuba's reisadvies/tourist card-tekst bijgewerkt (nog steeds oranje, e-Visa ~$50 vervangt de oude tourist card sinds juli 2025, zesde landelijke stroomstoring op 2 augustus 2026). Persoonlijke-voorkeur-check: Youri heeft nog geen van de 10 landen bezocht, geen cuts nodig. Alle bestemmingen kregen coördinaten voor de 'Gedetailleerd'-kaartweergave. Landen/dagen/budget-totaal ongewijzigd: 97 dagen, €7.450 — alleen volgorde binnen Cuba en Jamaica en de coördinaten zijn nieuw.",
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
          code: 'CV', name: 'Cape Verde', days: 13, budget: 780, lat: 16.8901, lng: -24.9825,
          destinations: ['Santo Antão (Ribeira Grande, Paúl-vallei)', 'São Vicente (Mindelo)', 'Fogo (Pico do Fogo-vulkaan, wijngaarden)'],
          notes: "Bewust andere eilanden dan een eerder bezoek (niet opnieuw Sal) — Santo Antão voor de dramatische wandelvalleien, São Vicente voor de muziekcultuur van Mindelo, Fogo voor de vulkaanbeklimming en wijnbouw op vulkanische grond. Onderling per veerboot (goedkoper, minder betrouwbaar schema) of Binter Cabo Verde-vlucht. Prijs geverifieerd (2026-07), klopt — Fogo-vlucht (~€70-100 enkele reis, veerboot onbetrouwbaar) is een aparte kostenpost. Verplichte online EASE-registratie ≥5 dagen vooraf.",
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
          code: 'SN', name: 'Senegal', days: 13, budget: 618, lat: 14.7167, lng: -17.4677,
          destinations: ['Dakar', 'Île de Gorée', 'Saint-Louis (UNESCO)', 'Sine-Saloum-delta', 'Lompoul-woestijn'],
          notes: "Île de Gorée (slavernijgeschiedenis, korte boot vanaf Dakar) en Saint-Louis (koloniale hoofdstad) zijn de historische zwaartepunten; Sine-Saloum (mangroves, vogels) en de Lompoul-duinen geven een compleet ander natuurbeeld binnen één land. Prijs geverifieerd (2026-07), klopt. Oranje grensstrook bij Gambia/Guinee-Bissau/Mali/Mauritanië — niet relevant voor deze route.",
          transport_to_next: 'Bus/deeltaxi over land naar Gambia via de Senegambia-brug (geopend 2019, een stuk vlotter dan de vroegere veerpont).',
        },
        {
          code: 'GM', name: 'Gambia', days: 6, budget: 240, lat: 13.4549, lng: -16.579,
          destinations: ['Banjul', 'Gambia-rivier (bootcruise)', 'Kunta Kinteh Island (UNESCO, slavernijgeschiedenis)', 'Makasutu Culture Forest'],
          notes: "Klein maar met een eigen, herkenbaar hoogtepunt: Kunta Kinteh Island (voorheen James Island) is een van de belangrijkste slavernij-erfgoedsites van West-Afrika. Prijs geverifieerd (2026-07), klopt. Presidentsverkiezing 5 december 2026 — mogelijk onrust, check actuele situatie vlak voor vertrek.",
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
          code: 'CI', name: 'Ivory Coast', days: 7, budget: 333, lat: 5.36, lng: -4.0083,
          destinations: ['Abidjan (Le Plateau)', 'Grand-Bassam (UNESCO koloniale stad)'],
          notes: "Taï National Park is bewust weggelaten — prachtig, maar de afgelegen ligging kost 3-4 dagen extra reistijd voor chimpansees die ook elders in West-/Centraal-Afrika te zien zijn. Abidjan en Grand-Bassam houden dit land compact en de moeite waard. Prijs geverifieerd (2026-07), klopt. Rood/oranje alleen bij de Mali/Burkina Faso- en Liberia-grens — niet relevant hier.",
          transport_to_next: 'Bus over land naar Ghana via de grensovergang Elubo — een gevestigde backpacker-route.',
        },
        {
          code: 'GH', name: 'Ghana', days: 15, budget: 713, lat: 5.1053, lng: -1.2466,
          destinations: ['Accra', 'Cape Coast Castle', 'Elmina Castle', 'Kakum National Park (boomtoppenpad)', 'Volta-regio (Wli-watervallen, Mount Afadjato)'],
          notes: "Cape Coast en Elmina Castle zijn de zwaarste, belangrijkste slavernijgeschiedenis-sites van de hele expeditie. Ghana heeft verreweg het rijkste programma van de reis — vandaar de meeste tijd. Prijs geverifieerd (2026-07), klopt, inclusief entreegelden Cape Coast/Kakum.",
          transport_to_next: 'Bus over land naar Togo via de grensovergang Aflao.',
        },
        {
          code: 'TG', name: 'Togo', days: 4, budget: 160, lat: 6.1319, lng: 1.2228,
          destinations: ['Lomé', 'Togoville (Vodun-cultuur, Lac Togo)'],
          notes: "Bewust kort — Togo voegt met zijn Duitse koloniale geschiedenis (vóór de latere Franse overname) wel een andere invalshoek toe dan Ghana/Benin, maar heeft weinig hoogtepunten. Ligt toch al direct op de route, dus lage extra kosten om aan te doen. Prijs geverifieerd (2026-07), klopt. Visa-on-arrival is afgeschaft — alleen nog e-visa vooraf via het officiële evisa.gouv.tg (vermijd duurdere derde partijen).",
          transport_to_next: 'Bus over land naar Benin via de grensovergang Hillacondji.',
        },
        {
          code: 'BJ', name: 'Benin', days: 9, budget: 428, lat: 6.3667, lng: 2.0833,
          destinations: ['Ouidah (Route des Esclaves, Door of No Return)', 'Ganvié (paalwoningdorp op het meer)', 'Abomey (koninklijke paleizen, UNESCO)'],
          notes: "Precies de combinatie die deze expeditie zoekt: oude koninkrijken (Abomey, het voormalige Dahomey), slavernijgeschiedenis (Ouidah) en levende Vodun-cultuur. Prijs geverifieerd (2026-07), klopt. Rood/oranje alleen in het noorden en de Nigeria-grensstrook — niet relevant hier.",
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
          code: 'CM', name: 'Cameroon', days: 8, budget: 380, lat: 4.0511, lng: 9.7679,
          destinations: ['Douala', 'Kribi (Chutes de la Lobé, zwarte stranden)', 'Yaoundé'],
          notes: 'Aangepast t.o.v. het oorspronkelijke plan: Mount Cameroon en Limbe liggen in de Zuidwest-regio, waar sinds 2016 een gewapend conflict speelt (de "Anglophone Crisis") — reisadviezen hebben dit gebied in verschillende periodes afgeraden. In plaats daarvan Douala, Kribi (de Chutes de la Lobé stromen letterlijk de zee in — uniek) en Yaoundé, allemaal in de stabielere Franstalige Littoral/Centre-regio\'s. Check de actuele situatie in het Zuidwesten vlak vóór vertrek — mocht die verbeterd zijn, dan is Mount Cameroon alsnog het overwegen waard als toevoeging. Prijs geverifieerd (2026-07), klopt. Bevestigd: Anglophone Crisis nog steeds actief/rood in 2026 — de routekeuze blijft terecht. Verplicht e-visa vooraf (~€150-230), aparte kostenpost.',
          transport_to_next: 'Vlucht Douala-São Tomé (regionale verbinding).',
        },
        {
          code: 'ST', name: 'São Tomé and Príncipe', days: 9, budget: 653, lat: 0.3365, lng: 6.7273,
          destinations: ['São Tomé (roças/plantages, regenwoud)', 'Príncipe (afgelegen, minder bezocht)'],
          notes: "Uniek in de hele Travel Atlas: Portugese koloniale plantagegeschiedenis op een klein, rustig tropisch eiland. Valt in het regenseizoen (oktober-mei) bij deze route — vooral middagbuien, geen aanhoudende moesson. Prijs geverifieerd (2026-07), klopt. Presidentsverkiezing 19 juli 2026 — mogelijk protesten rond die periode, check lokaal nieuws vlak voor vertrek.",
          transport_to_next: 'Vlucht São Tomé-Libreville (regionale verbinding).',
        },
        {
          code: 'GA', name: 'Gabon', days: 9, budget: 855, lat: -1.95, lng: 9.7,
          destinations: ['Loango National Park (surfende nijlpaarden, bosolifanten op het strand)', 'Libreville', 'regenwoud'],
          notes: "Bewuste, sterke afsluiter van de hele expeditie — Loango is een van de weinige plekken ter wereld waar je olifanten en nijlpaarden op het strand ziet. Valt toevallig in zijn korte droge seizoen (december-februari) bij deze route. ⚠️ Prijscheck (2026-07): het krapste/riskantste budget van de route — Loango-logistiek (gids/parkfees/eventuele chartervlucht) kan oplopen tot $100-300+/dag; €95/dag is alleen haalbaar met budgetvervoer (weg/piroque) en eenvoudige kampementen. Onvoldoende harde consensus voor een vaste correctie, maar reken op een reële kans dat dit hoger uitvalt.",
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
      "Totaal: 93 dagen (~3,1 maanden), €5.160 grondkosten + circa €2.400-2.800 aan vluchten (Kaapverdië-Senegal, Gambia-Ivoorkust, Benin-Kameroen en de Centraal-Afrikaanse eilandsprongen zijn stuk voor stuk vluchten met weinig concurrentie, dus prijzig per afstand). Nog niet getoetst aan actuele prijzen, visumregels of reisadviezen — behandel dit als een eerste concept, geen boekbaar plan. Check vooral de veiligheidssituatie in Kameroens Zuidwest-regio vlak vóór vertrek.\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07): alle 10 landen bevestigd accuraat, geen budgetcorrecties (Gabon is wel het krapste/riskantste — zie de eigen notitie). Anglophone Crisis in Kameroen bevestigd nog actief. Zie de losse landnotities hierboven voor reisadvies/visumdetails.",
  });
}

function rbSeedCentralEuropeRoadtripExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_CEROADTRIP)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_CEROADTRIP, '1');

  rbRoutes.push(rbBuildCentralEuropeRoadtripRoute());
  rbSave();
}

/**
 * Central European Grand Roadtrip — designed 2026-07 in a Q&A session with Claude, based on
 * Youri's own route brief for a self-driven car trip from the Netherlands (no flights). Unlike
 * every other expedition, car costs (fuel, tolls/vignettes, parking) are shared per car regardless
 * of group size and are NOT folded into each leg's per-country budget below — that budget field is
 * per-person ground cost only (accommodation/food/activities at the "Realistisch" tier, Youri's own
 * chosen style: €70 accommodation + €35 food + €15 activities = €120/day), so it stays consistent
 * with how every other expedition's per-country budget works. Car costs are tracked once, route-wide,
 * in this note instead. Region-grouped (4 regions) like every other multi-leg expedition. Germany,
 * Italy and Czechia each appear as multiple distinct legs (repeated country codes) — same reason
 * Mediterranean/North America/Oceania are hand-authored here instead of using RB_EXPEDITION_CONTENT.
 *
 * Price/visa/travel-advisory verification (2026-07): the flat €120/day didn't hold up per-country
 * once checked — Switzerland/Liechtenstein were corrected upward (€200/€165, among the most expensive
 * countries in Europe), Croatia/Serbia/Hungary/Slovakia/Czechia-Brno/Poland/Germany-Dresden corrected
 * downward (Serbia most drastically, €120→€60), Czechia-Prague corrected upward (€130, notably pricier
 * in recent years). France/Germany-Bavaria/Austria/the Dolomieten-Italy legs/San Marino/Slovenia stayed
 * within 15% of €120 and are unchanged. See the route's own notes for the full breakdown.
 *
 * Two route-order corrections made during design, both to avoid backtracking across the same
 * longitude twice: (1) Switzerland/Liechtenstein moved before Austria instead of after — Youri's
 * original order (Bavaria→Austria→Liechtenstein→Switzerland) meant driving all the way east through
 * Austria to Grossglockner, then backtracking ~370 km west for Liechtenstein/Switzerland, then east
 * again to the Dolomites; doing Switzerland/Liechtenstein first turns that into one continuous
 * eastward run, and preserves the Lienz-Cortina link (Grossglockner Hochalpenstrasse ends 90 km from
 * the Dolomites). (2) Milan/Turin/Cinque Terre placed after the Dolomites, merged into the existing
 * Tuscany/San Marino dip, rather than right after Switzerland as Youri first proposed — his proposed
 * order would have crossed the ~12-13°E longitude band twice (once via Austria's Grossglockner/
 * Salzburg, once again via Venice/the Dolomites) and created two separate southward detours instead
 * of one combined Northern-Italy loop.
 */
function rbBuildCentralEuropeRoadtripRoute() {
  return rbBuildSeedRoute('Central European Grand Roadtrip 🚗', [
    {
      name: 'Alpenlanden',
      season: 'Juni',
      budget: 2605,
      note: 'Bergpassen en hooggelegen wandelpaden zijn pas vanaf half mei/juni volledig sneeuwvrij (Grossglockner Hochalpenstrasse opent meestal medio mei) — half juni-begin juli is het beste venster, net na de opening en nog vóór de julidrukte/-hitte in de dalen.',
      countries: [
        {
          code: 'FR', name: 'France', days: 2, budget: 240, lat: 48.5734, lng: 7.7521,
          destinations: [
            { name: 'Straatsburg', lat: 48.5734, lng: 7.7521 },
            { name: 'Colmar', lat: 48.0794, lng: 7.3585 },
            { name: 'Elzasser dorpen', lat: 48.0453, lng: 7.3079 },
          ],
          notes: 'Compacte, korte culturele opener — meer tijd voegt weinig toe gezien de rest van de reis nog moet komen. Reisadvies (2026-07): Frankrijk zit sinds maart 2024 op het hoogste dreigingsniveau (3) voor terrorisme — een landelijke basisstatus, niet Elzas-specifiek, gewoon te bezoeken met normale oplettendheid.',
          transport_to_next: 'Auto, ≈415 km naar Neuschwanstein/Garmisch via Karlsruhe-Stuttgart-Ulm-München (routelogica-check 2026-08: was als ≈300 km genoteerd, klopte niet) — geen tol of vignet nodig op dit traject.',
        },
        {
          code: 'DE', name: 'Germany', days: 4, budget: 480, lat: 47.5576, lng: 10.7498,
          destinations: [
            { name: 'Neuschwanstein', lat: 47.5576, lng: 10.7498 },
            { name: 'Garmisch-Partenkirchen', lat: 47.4917, lng: 11.0958 },
            { name: 'Zugspitze', lat: 47.4211, lng: 10.9853 },
          ],
          notes: 'Neuschwanstein verdient een halve dag zelf al (wachtrijen, kasteel + omgeving); de Zugspitze-kabelbaan is weersafhankelijk, dus een buffer helpt.',
          transport_to_next: 'Auto, ≈250 km naar Luzern, verder door naar Interlaken/Lauterbrunnen (in totaal ≈400 km vanaf Garmisch — routelogica-check 2026-08: de oorspronkelijke ≈250 km klopte alleen voor Luzern zelf, niet voor de hele stopgroep) — Zwitsers jaarvignet verplicht, koop het bij de grens.',
        },
        {
          code: 'CH', name: 'Switzerland', days: 5, budget: 1000, lat: 46.6863, lng: 7.8632,
          destinations: [
            { name: 'Luzern/Vierwoudstrekenmeer', lat: 47.0502, lng: 8.3093 },
            { name: 'Interlaken', lat: 46.6863, lng: 7.8632 },
            { name: 'Lauterbrunnen', lat: 46.5927, lng: 7.9098 },
            { name: 'Berner Oberland', lat: 46.6244, lng: 8.0413 },
          ],
          notes: 'Het Jungfrau-gebied (Lauterbrunnen/Berner Oberland) alleen al verdient meerdere wandeldagen — hoge kosten zijn een reden om het compact te houden, niet om het te haasten. Prijscheck (2026-07): Zwitserland is een van de duurste landen van Europa — het oorspronkelijke vlakke €120/dag klopte hier niet, gecorrigeerd naar €200/dag.',
          transport_to_next: 'Auto, ≈150 km naar Vaduz — geen grenscontrole (Schengen), geen aparte tol.',
        },
        {
          code: 'LI', name: 'Liechtenstein', days: 1, budget: 165, lat: 47.1410, lng: 9.5209,
          destinations: [{ name: 'Vaduz', lat: 47.1410, lng: 9.5209 }],
          notes: 'Klein land, één goede wandeling/stadswandeling volstaat ruimschoots. Prijscheck (2026-07): prijsniveau volgt Zwitserland, gecorrigeerd van €120 naar €165/dag.',
          transport_to_next: 'Auto, ≈150 km naar Innsbruck via Feldkirch/Fernpass (routelogica-check 2026-08: was als ≈120 km genoteerd, klopte niet) — Oostenrijks 10-dagenvignet nodig voor de snelwegen (€12,80, veel logischer voor een roadtrip dan het jaarvignet van €106,80).',
        },
        {
          code: 'AT', name: 'Austria', days: 6, budget: 720, lat: 47.2692, lng: 11.4041,
          destinations: [
            { name: 'Innsbruck/Tirol', lat: 47.2692, lng: 11.4041 },
            { name: 'Salzburg', lat: 47.8095, lng: 13.0550 },
            { name: 'Berchtesgaden/Königssee', lat: 47.5892, lng: 13.0632 },
            { name: 'Salzkammergut', lat: 47.5622, lng: 13.6493 },
            { name: 'Grossglockner Hochalpenstrasse', lat: 47.0742, lng: 12.8306 },
          ],
          notes: 'Vier duidelijk verschillende deelgebieden (Tirol, Salzburg-cluster, merengebied, hooggebergte-rit) — elk verdient minstens één volle dag. Berchtesgaden ligt formeel in Duitsland maar hoort qua route bij Salzburg (20 minuten rijden, routelogica-check 2026-08 bevestigd) — behandel ze als één gecombineerde stop.',
          transport_to_next: 'Auto, Grossglockner Hochalpenstrasse (aparte tolweg, ≈€38 per auto) tot Lienz, dan ≈90 km naar Cortina d\'Ampezzo — een van de mooiste rijverbindingen van de hele route.',
        },
      ],
    },
    {
      name: 'Dolomieten & Noord-Italië',
      season: 'Juli',
      budget: 2385,
      note: 'De Dolomieten meteen na de Alpenlanden-opener; Milaan/Turijn/Cinque Terre/Toscane/San Marino vormen samen één aaneengesloten lus in plaats van twee losse zuidwaartse uitstapjes (zie route-notities).',
      countries: [
        {
          code: 'IT', name: 'Italy', days: 6, budget: 720, lat: 46.5369, lng: 12.1357,
          destinations: [
            { name: 'Tre Cime', lat: 46.6198, lng: 12.3032 },
            { name: 'Lago di Braies', lat: 46.6958, lng: 12.0858 },
            { name: 'Seceda', lat: 46.5765, lng: 11.7099 },
            { name: 'Val Gardena', lat: 46.5645, lng: 11.6750 },
          ],
          notes: 'Een van de grootste hoogtepunten van de hele reis — de bekende wandelingen (Tre Cime-rondje, Seceda) zijn elk een dag op zich.',
          transport_to_next: 'Auto, ≈410 km naar Milaan — samen met de Elzas-Beieren-rit aan het begin een van de langste ritten van de hele lus (routelogica-check 2026-08: geen unieke "langste rit" meer zodra de Elzas-Beieren-afstand gecorrigeerd is, zie dat land zijn eigen notitie) — vroeg vertrekken of splitsen met een tussenstop bij Verona/Brescia. Italiaanse autostrada rekent tol per kilometer.',
        },
        {
          code: 'IT', name: 'Italy', days: 2, budget: 240, lat: 45.4642, lng: 9.1900,
          destinations: [
            { name: 'Duomo', lat: 45.4642, lng: 9.1900 },
            { name: 'Galleria', lat: 45.4656, lng: 9.1896 },
            { name: 'Navigli', lat: 45.4514, lng: 9.1739 },
            { name: 'Laatste Avondmaal', lat: 45.4661, lng: 9.1706 },
          ],
          notes: 'Eén volle dag voor de binnenstad, een tweede als je het Laatste Avondmaal (reservering vereist) wilt meepakken.',
          transport_to_next: 'Auto, ≈140 km naar Turijn via de A4/A55, tolweg.',
        },
        {
          code: 'IT', name: 'Italy', days: 2, budget: 190, lat: 45.0703, lng: 7.6869,
          destinations: [
            { name: 'Egyptisch Museum', lat: 45.0703, lng: 7.6869 },
            { name: 'Mole Antonelliana', lat: 45.0691, lng: 7.6934 },
            { name: 'historisch centrum', lat: 45.0703, lng: 7.6869 },
          ],
          notes: 'Compacte, onderschatte stad — het Egyptisch Museum (op één na grootste ter wereld) verdient zelf al een halve dag. Prijscheck (2026-07): Turijn is goedkoper dan het vlakke €120/dag-tarief, gecorrigeerd naar €95/dag.',
          transport_to_next: 'Auto tot een bewaakte parkeerplaats bij Monterosso/La Spezia (≈260 km via Alessandria/Genua — routelogica-check 2026-08: was als ≈185 km genoteerd, klopte niet) — de dorpjes zelf zijn grotendeels autovrij.',
        },
        {
          code: 'IT', name: 'Italy', days: 3, budget: 435, lat: 44.1461, lng: 9.6558,
          destinations: [
            { name: 'Monterosso', lat: 44.1461, lng: 9.6558 },
            { name: 'Vernazza', lat: 44.1355, lng: 9.6857 },
            { name: 'Corniglia', lat: 44.1197, lng: 9.7042 },
            { name: 'Manarola', lat: 44.1067, lng: 9.7275 },
            { name: 'Riomaggiore', lat: 44.0993, lng: 9.7378 },
          ],
          notes: 'De vijf dorpjes en de wandelpaden ertussen (Sentiero Azzurro) zijn het hele punt — drie dagen voor rustig wandelen plus een boottochtje. Prijscheck (2026-07): schaarse/dure accommodatie en toeristenopslag op eten duwen dit boven het vlakke €120/dag-tarief, gecorrigeerd naar €145/dag.',
          transport_to_next: 'Auto, ≈140 km naar Florence via La Spezia-Lucca-Firenze.',
        },
        {
          code: 'IT', name: 'Italy', days: 3, budget: 360, lat: 43.7696, lng: 11.2558,
          destinations: [
            { name: 'Florence', lat: 43.7696, lng: 11.2558 },
            { name: 'Siena', lat: 43.3188, lng: 11.3308 },
            { name: 'San Gimignano', lat: 43.4674, lng: 11.0431 },
            { name: 'Chianti', lat: 43.4708, lng: 11.3350 },
          ],
          notes: 'Compact gehouden ("een stukje Toscane") — Florence plus één dag Chianti/Siena/San Gimignano.',
          transport_to_next: 'Auto, ≈180 km naar San Marino — Florence en San Marino liggen dicht bij elkaar.',
        },
        {
          code: 'SM', name: 'San Marino', days: 1, budget: 120, lat: 43.9424, lng: 12.4578,
          destinations: [{ name: 'Historisch centrum', lat: 43.9424, lng: 12.4578 }],
          notes: 'Klein genoeg voor één dag, dicht bij Florence — een bewuste stop, geen omweg meer om over te twijfelen.',
          transport_to_next: 'Auto, ≈300 km naar Venetië, met een overnachting daar — de stad zelf is autovrij, park bij Tronchetto of Mestre.',
        },
        {
          code: 'IT', name: 'Italy', days: 2, budget: 320, lat: 45.4408, lng: 12.3155,
          destinations: [
            { name: 'Piazza San Marco', lat: 45.4408, lng: 12.3155 },
            { name: 'Dorsoduro', lat: 45.4302, lng: 12.3245 },
            { name: 'Murano/Burano', lat: 45.4585, lng: 12.3538 },
          ],
          notes: 'Ligt vrijwel exact op de weg terug van San Marino naar Slovenië — nauwelijks extra kilometers, dus een efficiënte toevoeging. Prijscheck (2026-07): centraal Venetië is een bekende prijs-uitschieter (accommodatie 2-3x Mestre-niveau, dure vaporetto-dagpassen) — gecorrigeerd van €120 naar €160/dag.',
          transport_to_next: 'Auto, ≈280 km naar Bled — Sloveens vignet verplicht (goedkoop dagvignet beschikbaar).',
        },
      ],
    },
    {
      name: 'Balkan',
      season: 'Juli-augustus',
      budget: 1425,
      note: 'Mei-juni en september zijn hier het prettigst en juli-augustus kan warm zijn, maar is goed te doen — de watervallen bij Plitvice hebben dan nog volop water.',
      countries: [
        {
          code: 'SI', name: 'Slovenia', days: 5, budget: 600, lat: 46.3683, lng: 14.1146,
          destinations: [
            { name: 'Bled', lat: 46.3683, lng: 14.1146 },
            { name: 'Bohinj', lat: 46.2833, lng: 13.8833 },
            { name: 'Soča-vallei', lat: 46.3833, lng: 13.6167 },
            { name: 'Triglav NP', lat: 46.3833, lng: 13.8378 },
            { name: 'grotten (Postojna/Škocjan)', lat: 45.7830, lng: 14.2018 },
          ],
          notes: 'Bled alleen al verdient meerdere dagen; de Soča-vallei en de grotten liggen er echt apart van.',
          transport_to_next: 'Auto, ≈140 km naar Plitvice/Zagreb.',
        },
        {
          code: 'HR', name: 'Croatia', days: 3, budget: 255, lat: 44.8654, lng: 15.5820,
          destinations: [
            { name: 'Plitvice', lat: 44.8654, lng: 15.5820 },
            { name: 'Zagreb', lat: 45.8150, lng: 15.9819 },
          ],
          notes: 'Plitvice verdient een volle dag (grote wandelroutes), Zagreb een korte stadstop. Update (2026-08): Kroatië is sinds maart 2026 officieel landmijnvrij verklaard — de eerdere waarschuwing over niet-geruimde zones rond Plitvice is niet langer actueel. Prijscheck (2026-07): binnenland-Kroatië (niet de kust) is goedkoper dan het vlakke €120/dag-tarief, gecorrigeerd naar €85/dag (Plitvice-entree ~€35-40 apart, niet in het dagtarief).',
          transport_to_next: 'Auto, ≈380 km naar Belgrado — Novi Sad ligt toevallig al precies onderweg, prima in één dag te doen.',
        },
        {
          code: 'RS', name: 'Serbia', days: 5, budget: 300, lat: 44.7866, lng: 20.4489,
          destinations: [
            { name: 'Belgrado', lat: 44.7866, lng: 20.4489 },
            { name: 'Tara National Park (dagtrip vanuit Belgrado, retour)', lat: 43.8931, lng: 19.4206 },
            { name: 'Novi Sad', lat: 45.2671, lng: 19.8335 },
          ],
          notes: "Servië heeft verder weinig natuurhoogtepunten op deze route — Tara NP (Drina-rivier, bekende uitkijkpunten) is een bewuste omweg die bij deze reisstijl past, in het zuidwesten van het land. Routelogica-fix (2026-08, search-bevestigd): stond eerder als laatste stop vóór het vertrek naar Boedapest — Tara NP-Boedapest is in werkelijkheid ≈520 km, niet de ≈320 km die genoteerd stond, en zou zo'n 6-7 uur extra rijden hebben gekost bovenop de al lange reis. Opgelost door Tara NP als dagtrip/retourtje vanuit Belgrado te doen (±360-400 km heen-en-terug) en daarna via het bestaande Belgrado-Novi Sad-Boedapest-traject verder te reizen — de detour-kosten van Tara NP blijven bestaan, maar de dure lange rit vanuit een uithoek van het land vervalt. ⚠️ Reisadvies (2026-07, nog actueel): er zijn regelmatig demonstraties in Servië, vooral in Belgrado en Novi Sad (aanhoudende protestbeweging sinds eind 2024) — soms wegblokkades, incidenteel geweld, hou rekening met mogelijke vertraging bij wegcontroles. Vermijd drukte/demonstraties, check actuele situatie vlak voor vertrek. Prijscheck (2026-07): Servië is veruit het goedkoopst van de Balkanlanden op deze route — het vlakke €120/dag was meer dan het dubbele van reëel, gecorrigeerd naar €60/dag.",
          transport_to_next: 'Auto, ≈90 km Belgrado-Novi Sad, dan ≈298 km Novi Sad-Boedapest (≈388 km totaal) — Novi Sad ligt al op de directe route, dus dit stuk is ongewijzigd t.o.v. eerder.',
        },
        {
          code: 'HU', name: 'Hungary', days: 3, budget: 270, lat: 47.4979, lng: 19.0402,
          destinations: [
            { name: 'Boedapest', lat: 47.4979, lng: 19.0402 },
            { name: 'thermale baden', lat: 47.5186, lng: 19.0819 },
          ],
          notes: 'Boedapest verdient een rustige stadstop mét tijd voor een thermaal bad, niet alleen de hoogtepunten afvinken. Prijscheck (2026-07): gecorrigeerd van het vlakke €120/dag naar €90/dag (inclusief een thermaal bad-bezoek, ~€25-30 op zich).',
          transport_to_next: 'Auto, ≈200 km naar Bratislava.',
        },
      ],
    },
    {
      name: 'Midden-Europa',
      season: 'Augustus-september/begin oktober',
      budget: 1615,
      note: 'Hoge Tatra blijft ruim binnen het wandelseizoen (juni-september); de terugweg door Tsjechië/Polen/Duitsland is jaarrond prettig en geeft in september mooie herfstkleuren.',
      countries: [
        {
          code: 'SK', name: 'Slovakia', days: 5, budget: 400, lat: 49.0552, lng: 20.2969,
          destinations: [
            { name: 'Bratislava', lat: 48.1486, lng: 17.1077 },
            { name: 'Hoge Tatra', lat: 49.1500, lng: 20.0500 },
            { name: 'Slovenský Raj', lat: 48.9333, lng: 20.4167 },
            { name: 'Spiš Castle', lat: 48.9958, lng: 20.7644 },
          ],
          notes: 'De Hoge Tatra vraagt echte wandeldagen; Bratislava is een korte aanvulling aan het begin. Prijscheck (2026-07): gecorrigeerd van het vlakke €120/dag naar €80/dag.',
          transport_to_next: 'Auto, Hoge Tatra-Brno ≈335 km (routelogica-check 2026-08: was als ≈300 km genoteerd, klopte niet).',
        },
        {
          code: 'CZ', name: 'Czechia', days: 1, budget: 85, lat: 49.1951, lng: 16.6068,
          destinations: [
            { name: 'Brno', lat: 49.1951, lng: 16.6068 },
            { name: 'Špilberk-burcht', lat: 49.1943, lng: 16.6034 },
          ],
          notes: 'Breekt de lange rit Hoge Tatra-Praag (was ≈450 km in één keer) in tweeën, en is zelf de moeite waard, niet alleen een technische pauze. Prijscheck (2026-07): gecorrigeerd van het vlakke €120/dag naar €85/dag — buiten Praag is Tsjechië duidelijk goedkoper.',
          transport_to_next: 'Auto, ≈200 km naar Praag.',
        },
        {
          code: 'CZ', name: 'Czechia', days: 5, budget: 650, lat: 50.0755, lng: 14.4378,
          destinations: [
            { name: 'Praag', lat: 50.0755, lng: 14.4378 },
            { name: 'Český Krumlov', lat: 48.8127, lng: 14.3175 },
            { name: 'Boheems Paradijs (Turnov)', lat: 50.5333, lng: 15.1667 },
          ],
          notes: 'Praag verdient alleen al 2-3 dagen; Český Krumlov en Boheems Paradijs zijn allebei losse dagtochten waard. Prijscheck (2026-07): Praag is de laatste jaren duidelijk duurder geworden (centrumprijzen benaderen West-Europese steden) — gecorrigeerd van €120 naar €130/dag, de enige leg in deze route die omhoog moest ondanks dat de rest van Tsjechië/Centraal-Europa juist omlaag ging.',
          transport_to_next: 'Auto, rijd na Boheems Paradijs (Turnov) rechtstreeks door naar Wrocław (≈239 km) in plaats van eerst terug naar Praag (zou ≈323 km zijn) — routelogica-check 2026-08: scheelt ≈80 km, Turnov ligt al op de route.',
        },
        {
          code: 'PL', name: 'Poland', days: 3, budget: 195, lat: 51.1079, lng: 17.0385,
          destinations: [
            { name: 'Wrocław', lat: 51.1079, lng: 17.0385 },
            { name: 'Sudeten (optioneel)', lat: 50.7500, lng: 15.7333 },
          ],
          notes: 'Wrocław is compact te doen; het Sudeten-gebergte is een leuke, niet-verplichte toevoeging. Prijscheck (2026-07): Polen is een van de goedkoopste landen op deze route — het vlakke €120/dag was fors te hoog, gecorrigeerd naar €65/dag.',
          transport_to_next: 'Auto, ≈280 km naar Dresden — Polen heft voor personenauto\'s geen tol op de meeste snelwegen (alleen vrachtverkeer via e-TOLL).',
        },
        {
          code: 'DE', name: 'Germany', days: 3, budget: 285, lat: 51.0504, lng: 13.7373,
          destinations: [
            { name: 'Dresden', lat: 51.0504, lng: 13.7373 },
            { name: 'Saksisch Zwitserland', lat: 50.9167, lng: 14.2667 },
          ],
          notes: 'Saksisch Zwitserland (rotsformaties, wandelen) verdient een volle dag naast de stadstop in Dresden. Prijscheck (2026-07): Dresden is relatief goedkoop voor Duitsland — gecorrigeerd van €120 naar €95/dag.',
          transport_to_next: 'Einde van de roadtrip — terugrit naar Nederland, ≈700 km, in één lange dag of gesplitst met een laatste overnachting onderweg.',
        },
      ],
    },
  ], {
    travel_style: "Eigen auto vanuit Nederland, geen vliegtuig — rustig rijden, natuur en cultuur boven afvinken. Accommodatie/eten/activiteiten hieronder op het Realistische niveau (hostels/eenvoudige hotels, soms privékamer — hetzelfde niveau als de rest van de reizen). Brandstof, tol/vignetten en parkeren zijn per auto gedeeld (ongeacht groepsgrootte) en staan NIET in de bedragen per land hierboven — zie de route-notities voor die aparte optelling.",
    best_starting_month: 'Juni',
    description: "Grote lus met eigen auto vanuit Nederland: Elzas, de Alpenlanden, de Dolomieten, Noord-Italië en Toscane, de Balkan en Midden-Europa — en weer terug. Rustig rijden, natuur en cultuur boven afvinken.",
    climate_summary: "Aanbevolen start: begin juni. Bergpassen en hooggelegen wandelpaden in Beieren/Oostenrijk/Zwitserland/de Dolomieten zijn pas vanaf half mei/juni volledig sneeuwvrij (Grossglockner Hochalpenstrasse opent meestal medio mei) — een meistart zou de Alpenlanden net vóór die opening zetten, een reëel risico voor het onderdeel dat de meeste tijd/aandacht krijgt. Een septemberstart lijkt aantrekkelijk (rustiger, geen zomerhitte) maar duwt bij een reis van ~10 weken de latere etappes (Hoge Tatra, Tsjechië, Polen, Duitsland) naar november-december, met een reële kans op vroege sneeuw in de Tatra. Bij een junistart krijgen de Alpen hun beste venster meteen aan het begin, Noord-Italië/Toscane vallen in juli (goed te doen, iets drukker), Servië/Hongarije in augustus, en de reis eindigt in september/begin oktober — aangenaam, met herfstkleuren in Tsjechië/Polen/Saksisch Zwitserland als bonus.",
    notes: "Ontworpen in een Q&A-sessie met Claude (2026-07), op basis van Youri's eigen routebrief voor een zelfrijdende trip vanuit Nederland (geen vliegtuig). Dagen zijn de 'ideale' tempo-schatting; per-land-budgetten zijn het Realistische dagtarief (€70 accommodatie + €35 eten + €15 activiteiten = €120/dag per persoon) keer het aantal dagen — bewust hetzelfde niveau als de rest van Youri's reizen, zodat de bedragen per land vergelijkbaar blijven met elke andere expeditie in deze Travel Atlas.\n\n" +
      "Twee routewijzigingen tijdens het ontwerp, allebei om te voorkomen dat dezelfde lengtegraad twee keer gekruist wordt: (1) Zwitserland/Liechtenstein vóór Oostenrijk in plaats van erna — scheelt ≈370 km t.o.v. Youri's oorspronkelijke volgorde (Beieren→Oostenrijk→Liechtenstein→Zwitserland), en behoudt de Lienz-Cortina-verbinding (90 km) naar de Dolomieten. (2) Milaan/Turijn/Cinque Terre ná de Dolomieten geplakt, samengevoegd met de bestaande Toscane/San Marino-dip, in plaats van vóór Oostenrijk zoals Youri eerst voorstelde — die volgorde had de ≈12-13°O-strook twee keer gekruist (via Oostenrijks Grossglockner/Salzburg, en later opnieuw via Venetië/de Dolomieten) en twee losse zuidwaartse uitstapjes gekost in plaats van één gecombineerde Noord-Italië-lus.\n\n" +
      "Autokosten (gedeeld per auto, NIET in de bedragen per land hierboven): ≈9.050 km totale rijafstand, ≈€1.110 brandstof (7L/100km, €1,75/L), ≈€335 tol/vignetten (Zwitserland vraagt een jaarvignet — CHF 40/≈€43, geen kortere optie bestaat; Oostenrijk een 10-dagenvignet — €12,80, veel logischer voor deze reisduur dan het jaarvignet van €106,80; Italië rekent per kilometer op de autostrada; Polen heft geen tol voor personenauto's), ≈€505 parkeren (steden plus een bewaakte parkeerplaats bij Cinque Terre's autoluwe dorpen) — totaal ≈€1.950 per auto, ongeacht met hoeveel personen je reist.\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07): alle 14 landen gecheckt via web-onderzoek. Grote bevinding: het vlakke €120/dag-tarief hield voor de helft van de landen niet stand — Zwitserland en Liechtenstein waren fors te laag begroot (respectievelijk €120→€200 en €120→€165, Zwitserland is een van de duurste landen van Europa), terwijl Kroatië, Servië, Hongarije, Slowakije, Tsjechië-Brno, Polen en Duitsland-Dresden juist te hoog begroot waren (Servië het felst: €120→€60, minder dan de helft). Enige uitzondering die juist omhoog moest binnen Centraal-Europa: Tsjechië-Praag (€120→€130 — Praag is de laatste jaren duidelijk duurder geworden). Frankrijk (Elzas), Duitsland (Beieren), Oostenrijk, de Dolomieten/Milaan/Toscane/San Marino en Slovenië bleven binnen 15% van €120 — geen aanpassing. Visumcheck: alle 14 landen zijn visumvrij voor een Nederlands paspoort; Slovenië/Kroatië/Hongarije/Tsjechië/Polen/Duitsland/Frankrijk/Oostenrijk zijn Schengen (geen grenscontrole), Zwitserland/Liechtenstein zijn Schengen maar geen EU, San Marino heeft een open grens met Italië, Servië is geen EU/Schengen dus met een echte paspoortcontrole aan de grens (wel visumvrij). Reisadvies: overal geel/groen, geen acuut gevaarlijke situaties — wel drie specifieke aandachtspunten toegevoegd bij de losse landen hierboven (Servië: aanhoudende protestbeweging in Belgrado/Novi Sad sinds eind 2024; Kroatië: niet-geruimde landmijnzones bij Plitvice, blijf op de paden; Frankrijk: langlopend hoogste dreigingsniveau, landelijke basisstatus).\n\n" +
      "Totaal: 45 dagen minimum / 70 dagen ideaal (~10 weken), €8.030 grondkosten per persoon solo (Realistisch tier, na de prijsverificatie hierboven — was €8.400) + €1.950 autokosten per auto. Per persoon bij 70 dagen (zelfde rekenmethode als voorheen: accommodatie-aandeel gedeeld door het aantal reizigers, eten/activiteiten blijven per persoon gelijk, autokosten gedeeld): Realistisch €9.980 solo / €6.660 met 2 / €5.555 met 3. Budget en Comfortabel zijn evenredig herschaald t.o.v. de vorige verhouding — Budget ≈€6.950 solo / ≈€4.700 met 2 / ≈€3.950 met 3, Comfortabel ≈€14.350 solo / ≈€9.600 met 2 / ≈€8.000 met 3, maar deze twee zijn niet los per land opnieuw geverifieerd zoals het Realistische tarief hierboven. Nog niet getoetst aan actuele boekingsprijzen — behandel dit als een verfijnd concept, geen boekbaar plan.\n\n" +
      "Routelogica-herziening (2026-08, search-bevestigd): geen landvolgorde-fouten gevonden — de lus (Elzas→Alpenlanden→Dolomieten/Noord-Italië→Balkan→Midden-Europa→NL) is één doorlopende rit zonder onnodige kruisingen. Wel vijf kleinere fixes: (1) drie afstanden in transport_to_next waren te laag ingeschat (Straatsburg-Garmisch ≈300→415 km, Vaduz-Innsbruck ≈120→150 km, Turijn-Cinque Terre ≈185→260 km) en gecorrigeerd; (2) Hoge Tatra-Brno bijgesteld van ≈300 naar ≈335 km; (3) de rit van Boheems Paradijs (Turnov) naar Wrocław loopt nu rechtstreeks door in plaats van eerst terug naar Praag — scheelt ≈80 km, Turnov ligt al op de route; (4) Servië's Tara National Park was als laatste stop vóór Boedapest genoteerd, maar Tara-Boedapest is in werkelijkheid ≈520 km (niet de genoteerde ≈320 km) — opgelost door Tara NP als dagtrip/retourtje vanuit Belgrado te doen, waarna de reis gewoon via Novi Sad naar Boedapest vervolgt; (5) Kroatië's landmijn-waarschuwing bij Plitvice is verwijderd — het land is sinds maart 2026 officieel landmijnvrij verklaard. Youri had al veel van deze route eerder gezien maar wilde niets inkorten voor déze trip ('moet langs de mooiste stukken gaan') — geen persoonlijke-voorkeur-cuts deze ronde. Per-bestemming coördinaten toegevoegd aan alle 14 etappes voor de 'Gedetailleerd'-kaartweergave. Landen/dagen/totale grondkosten ongewijzigd (45/70 dagen, €8.030 p.p.) — alleen volgorde-details, afstanden en notities aangepast.",
  });
}

function rbSeedBritishIslesExpedition() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_BRITISHISLES)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_BRITISHISLES, '1');

  rbRoutes.push(rbBuildBritishIslesExpeditionRoute());
  rbSave();
}

/**
 * British Isles & Celtic Coast Expedition — designed 2026-07 in a Q&A session with Claude, based on
 * a ChatGPT brainstorm Youri brought in. Self-driven (own car from the Netherlands), same style as
 * Central European Grand Roadtrip — car costs (fuel/tolls/parking/ferries) are shared per car and
 * tracked once in this note, NOT folded into each leg's per-person budget below. United Kingdom (GB)
 * appears seven times (South England, Cornwall, Wales, Lake District, Yorkshire & Northumberland,
 * Scotland, Northern Ireland) and Ireland (IE) twice (West, South & East) — repeated-country legs,
 * same reason Mediterranean/North America/Oceania/Central European Roadtrip are hand-authored here
 * instead of using RB_EXPEDITION_CONTENT. (The North England leg was originally one seven-leg block;
 * the 2026-08 route-logic review split it in two around the Isle of Man detour, see below.)
 *
 * Two route-order corrections made during design, both from real ferry-geography research (Youri's
 * brief already had the right instinct, just needed the ports checked): (1) Isle of Man moved from
 * "its own stop before North England" to a detour nested inside the North England leg — Heysham, its
 * only year-round car-ferry port, sits on the M6 corridor between North Wales and the Lake District,
 * so it was never really "before" North England to begin with. (2) Ireland is driven north-to-south
 * (Donegal → Kerry) and exits via Rosslare-Fishguard/Pembroke instead of backtracking to
 * Dublin-Holyhead — Rosslare sits right by Cork/Kilkenny in the southeast, so this avoids re-crossing
 * the country to Dublin just to leave. Exiting through Fishguard/Pembroke means transiting back through
 * South Wales/South England toward Poole/Portsmouth for the Channel Islands ferry — that's pure transit
 * through already-covered ground, not a second Wales leg.
 *
 * Isle of Man: Youri's own idea, confirmed after discussion — go as a foot passenger (Heysham-Douglas
 * fares are a fraction of the car fare) and rent a car locally for one day specifically to drive the
 * TT Mountain Road, rather than paying for a round-trip car crossing. Cheaper overall, keeps the one
 * highlight (the TT course) that genuinely needs a car, and Manx public transport/heritage railways
 * (Manx Electric Railway, Snaefell Mountain Railway) cover the rest.
 *
 * Route-logic review (2026-08, search-confirmed): the 2026-07 design got the Isle of Man's *position*
 * right (nested inside North England, not before it) but not the point *within* that leg where it
 * happens — it was sequenced after the leg's last stop (Bamburgh, near the Scottish border), forcing a
 * drive all the way back to Heysham (≈250km) and then back north to Edinburgh (≈264km), crossing the
 * same north-south corridor twice. Fixed by splitting the old single "North England" leg into a Lake
 * District leg (right next to Heysham, so Isle of Man happens there instead) and a Yorkshire &
 * Northumberland leg that continues straight on to Edinburgh (≈124km via the A1, no backtrack). Same
 * review also reordered Scotland's Highlands sub-loop (Skye→Loch Ness→Applecross was an east-west
 * zigzag, now Skye→Applecross→NC500-partial→Loch Ness/Inverness crosses the Highlands only once
 * before the direct run to Cairnryan) and dropped Ireland's brief closing "Dublin" stop (Kilkenny→
 * Dublin→Rosslare cost ≈190km more than Kilkenny→Rosslare directly, for a stop already flagged as
 * short — Youri's own call to cut it rather than keep the detour). See CHANGELOG.md and
 * ROUTE_LOGIC_REVIEW.md for the full writeup.
 *
 * Known cosmetic gap: Isle of Man (IM), Jersey (JE) and Guernsey (GG) aren't in the ISO_NUM lookup
 * used by the World map view's topojson data (js/utils/isoCountries.js) — same kind of gap as the
 * existing "country dropdown depends on the live Countries sheet" limitation. Their blocks work fine
 * everywhere else; they just won't highlight on the World map.
 */
function rbBuildBritishIslesExpeditionRoute() {
  return rbBuildSeedRoute('British Isles & Celtic Coast Expedition 🍀', [
    {
      name: 'Engeland & Wales',
      season: 'Juni',
      budget: 4275,
      note: 'De opening van de expeditie: van de kalkkliffen en historische steden van Zuid-Engeland via het ruige Cornwall naar de bergen van Wales, met Isle of Man als zijsprong vanuit het Lake District (routelogica-fix 2026-08, zie de etappes hieronder) voordat de reis via Yorkshire/Northumberland noordwaarts naar Schotland afbuigt.',
      countries: [
        {
          code: 'GB', name: 'United Kingdom', days: 10, budget: 1155, lat: 51.5074, lng: -0.1278,
          destinations: [
            { name: 'Dover (White Cliffs)', lat: 51.1279, lng: 1.3134 },
            { name: 'Canterbury', lat: 51.2802, lng: 1.0789 },
            { name: 'Londen', lat: 51.5074, lng: -0.1278 },
            { name: 'Cotswolds', lat: 51.8830, lng: -1.8433 },
            { name: 'Bath', lat: 51.3811, lng: -2.3590 },
            { name: 'Stonehenge', lat: 51.1789, lng: -1.8262 },
            { name: 'Jurassic Coast', lat: 50.6167, lng: -2.4667 },
          ],
          notes: "Brede opener met veel verschillende sferen: de krijtkliffen en kathedraal van Kent, een korte stedelijke kennismaking met Londen, de traditionele dorpjes van de Cotswolds, de Romeinse baden van Bath en de kustgeologie van de Jurassic Coast. Stonehenge is bewust als korte stop opgenomen (goed vanaf de weg te zien) — de eerste kandidaat om te laten vervallen als de reis ooit korter moet. Prijscorrectie (2026-07): €90→€116/dag gemiddeld (Londen zelf ligt hoger, ~€140/dag; de rest ~€105/dag). Nieuw: sinds 2 april 2025 is een UK ETA verplicht voor Nederlandse/EU-reizigers (~€23 p.p., sinds 8 april 2026 verhoogd van £16 naar £20 — ruim vooraf aanvragen). Cotswolds-dorpen (o.a. Bourton-on-the-Water) heffen inmiddels expliciet parkeergeld (~£1-14/dag). Dartford Crossing (indien de route hem gebruikt): eenmalig £3,50 (~€4), online betalen binnen 30 dagen. Reisadvies: groen voor het VK als geheel.",
          transport_to_next: 'Auto, ≈450 km naar Cornwall via de A30 — geen tol onderweg.',
        },
        {
          code: 'GB', name: 'United Kingdom', days: 7, budget: 875, lat: 50.2144, lng: -5.4791,
          destinations: [
            { name: 'St Ives', lat: 50.2110, lng: -5.4800 },
            { name: "Land's End", lat: 50.0657, lng: -5.7139 },
            { name: "St Michael's Mount", lat: 50.1180, lng: -5.4767 },
            { name: 'Tintagel Castle', lat: 50.6680, lng: -4.7590 },
            { name: 'South West Coast Path', lat: 50.0453, lng: -5.6497 },
          ],
          notes: 'Ruige kust en smalle wegen die tijd kosten — de South West Coast Path verdient meerdere hele wandeldagen, niet alleen uitzichtpunten vanaf de weg. St Michael\'s Mount is getijdenafhankelijk (alleen bij eb over de causeway); Tintagel draagt de Arthur-legende. Prijscorrectie (2026-07): €90→€125/dag — Cornwall rekent een reëel prijsopslag t.o.v. Devon, met in juli-augustus nog eens 60-80% extra bovenop de piekprijzen (St Ives is een bekend duur resortplaatsje).',
          transport_to_next: 'Auto, ≈300 km naar Wales via Bristol/de Severn-oeververbinding.',
        },
        {
          code: 'GB', name: 'United Kingdom', days: 8, budget: 800, lat: 53.2799, lng: -3.8278,
          destinations: [
            { name: 'Pembrokeshire Coast Path', lat: 51.6214, lng: -5.0246 },
            { name: 'Brecon Beacons/Bannau Brycheiniog', lat: 51.8836, lng: -3.4360 },
            { name: 'Snowdonia/Eryri', lat: 53.0685, lng: -4.0763 },
            { name: 'Conwy Castle', lat: 53.2799, lng: -3.8278 },
          ],
          notes: 'Snowdonia alleen al verdient 2-3 dagen voor echte wandelingen (Snowdon zelf, Cadair Idris); Brecon Beacons en de Pembrokeshire-kust zijn allebei een dag apart waard. Conwy Castle als compacte historische afsluiter. Prijs vrijwel bevestigd (2026-07): €90→€100/dag — het landelijke Wales ligt van alle Britse etappes het dichtst bij de oorspronkelijke vlakke €90/dag, met alleen een kleine correctie voor het zomerseizoen.',
          transport_to_next: 'Auto, ≈250 km naar het Lake District via Chester en de M6 — geen ferry, gewoon doorrijden naar Noord-Engeland.',
        },
        {
          code: 'GB', name: 'United Kingdom', days: 4, budget: 429, lat: 54.4609, lng: -3.0886,
          destinations: [
            { name: 'Windermere', lat: 54.3720, lng: -2.9080 },
            { name: 'Scafell Pike', lat: 54.4544, lng: -3.2100 },
            { name: 'Keswick', lat: 54.6013, lng: -3.1352 },
          ],
          notes: 'Het Lake District (wandelen) vraagt 3-4 dagen alleen al. Prijscorrectie (2026-07): €90→€107/dag, zelfde gecorrigeerde tarief als de vervolgetappe hierna (zie de notitie daar voor de routelogica-fix die deze splitsing veroorzaakte).',
          transport_to_next: "Auto naar Heysham (≈55 km vanaf Keswick/Windermere, ligt er vlak naast), dan als voetganger de ferry Heysham-Douglas (Isle of Man Steam Packet, ≈3u45, ~2x/dag jaarrond) — voetgangertarief is een fractie van het autotarief. Routelogica-fix (2026-08, search-bevestigd): Isle of Man wordt nu meteen na het Lake District bezocht in plaats van pas na de hele Noord-Engeland-etappe — dat laatste betekende een rit helemaal terug naar de hoogte van Bamburgh (≈250 km) en daarna weer noordwaarts naar Edinburgh, twee keer dezelfde noord-zuid-corridor.",
        },
        {
          code: 'IM', name: 'Isle of Man', days: 4, budget: 480, lat: 54.1509, lng: -4.4815,
          destinations: [
            { name: 'Douglas', lat: 54.1509, lng: -4.4815 },
            { name: 'Peel', lat: 54.2231, lng: -4.6959 },
            { name: 'TT Mountain Road (Snaefell)', lat: 54.2585, lng: -4.3947 },
            { name: 'Manx Electric Railway', lat: 54.1747, lng: -4.4629 },
            { name: 'Snaefell Mountain Railway', lat: 54.2136, lng: -4.3970 },
          ],
          notes: "Klein eiland met een eigen identiteit, prima te doen in vier dagen. Eén dag lokaal een auto huren specifiek om de TT Mountain Road zelf te rijden (Youri's eigen keuze na afweging — goedkoper dan de eigen auto op de ferry meenemen, en het enige onderdeel van het eiland dat echt een auto vraagt); de rest van het eiland is uitstekend te doen met de bus en de historische Manx Electric Railway/Snaefell Mountain Railway. Prijscorrectie (2026-07): €90→€100/dag basis (logies/eten), plus de eendaagse lokale autohuur voor de TT Mountain Road apart begroot op ~€85 (~€480 totaal, was €360). De keuze om de auto in Engeland te laten staan i.p.v. hem mee te nemen op de veerboot blijkt nóg voordeliger dan gedacht: een retour-autoveerboot Heysham/Liverpool-Douglas kost nu ~€390-425, tegenover ~€85 voor de lokale huurauto. Reisadvies/ETA: valt onder dezelfde UK ETA als het vasteland (geen aparte aanvraag/kosten nodig sinds de ETA-regeling op 23 april 2026 is uitgebreid naar Isle of Man/Jersey/Guernsey binnen de Common Travel Area) — wel gewoon een paspoort meenemen, geen ID-kaart.",
          transport_to_next: 'Ferry terug Douglas-Heysham (voetganger), auto weer ophalen, dan ≈80 km naar de Yorkshire Dales.',
        },
        {
          code: 'GB', name: 'United Kingdom', days: 5, budget: 536, lat: 54.9783, lng: -1.6178,
          destinations: [
            { name: 'Yorkshire Dales', lat: 54.2361, lng: -2.1500 },
            { name: 'York', lat: 53.9600, lng: -1.0873 },
            { name: 'Northumberland', lat: 55.2833, lng: -2.0167 },
            { name: 'Bamburgh Castle', lat: 55.6088, lng: -1.7086 },
          ],
          notes: "York is een volwaardige historische stad, geen tussenstop; Northumberland/Bamburgh als rustige, minder toeristische kustafsluiter voor deze etappe. Prijscorrectie (2026-07): €90→€107/dag — York ligt boven het gemiddelde, Yorkshire Dales/Northumberland/Bamburgh blijven landelijker en goedkoper. Routelogica-fix (2026-08, search-bevestigd): dit was de tweede helft van de oorspronkelijke \"Noord-Engeland\"-etappe (9 dagen, €965) — gesplitst zodat Isle of Man vanuit het Lake District bezocht wordt i.p.v. na Bamburgh, wat een dubbele noord-zuid-rit via Heysham voorkwam (Bamburgh-Heysham-Edinburgh was ≈517 km, nu is het Lake District-Heysham-Yorkshire Dales plus Bamburgh-Edinburgh samen ≈260 km). Dagen/budget proportioneel verdeeld over de twee nieuwe etappes (4+5 dagen, €429+€536 = het oorspronkelijke €965) — zelfde rekenmethode als Patagonia & Antarctica's etappe-splitsing.",
          transport_to_next: 'Auto, Bamburgh-Edinburgh ≈124 km via de A1 — rechtstreeks, geen omweg meer via Heysham (routelogica-fix 2026-08, zie de Lake District-etappe hierboven).',
        },
      ],
    },
    {
      name: 'Schotland & Noord-Ierland',
      season: 'Juli',
      budget: 3020,
      note: 'Het grootste enkelvoudige onderdeel van de hele expeditie — de Schotse Highlands en eilanden, gevolgd door de Noord-Ierse kust — en het venster waarin het start-in-juni-plan het meest telt: ruim vóór de muggenpiek van juli-augustus.',
      countries: [
        {
          code: 'GB', name: 'United Kingdom', days: 22, budget: 2510, lat: 57.4128, lng: -6.1943,
          destinations: [
            { name: 'Edinburgh', lat: 55.9533, lng: -3.1883 },
            { name: 'Cairngorms National Park', lat: 57.0833, lng: -3.6667 },
            { name: 'Glencoe', lat: 56.6836, lng: -5.1030 },
            { name: 'Glenfinnan Viaduct', lat: 56.8764, lng: -5.4297 },
            { name: 'Isle of Skye ⭐ (Old Man of Storr, Fairy Pools, Quiraing)', lat: 57.4128, lng: -6.1943 },
            { name: 'Applecross Pass', lat: 57.4358, lng: -5.6414 },
            { name: 'North Coast 500 (gedeeltelijk, tot Ullapool)', lat: 57.8951, lng: -5.1626 },
            { name: 'Loch Ness/Inverness', lat: 57.4778, lng: -4.2247 },
          ],
          notes: "Het hoogtepunt van de hele expeditie. Isle of Skye krijgt bewust 4-5 dagen in plaats van een dagtrip — Old Man of Storr, Fairy Pools en de Quiraing zijn elk een halve tot hele wandeldag. Reis hier vroeg in de zomer (eind juni-begin juli): de Schotse muggen (midges) pieken pas in juli-augustus, dus een vroege doortocht scheelt aanzienlijk. ⚠️ Prijscorrectie (2026-07): €90→€114/dag gemiddeld — dit is de etappe met de grootste interne spreiding: landelijke Highlands (Cairngorms/Glencoe/Glenfinnan/Loch Ness/Applecross/NC500) blijven dicht bij €100/dag, Isle of Skye ligt structureel hoger (~€150/dag, beperkt aanbod drijft de prijs op, ook buiten het hoogseizoen) en Edinburgh normaal ~€130/dag. ⚠️ Timing-risico: het Edinburgh Fringe Festival loopt in 2026 van 7 t/m 31 augustus en verdrievoudigt de prijzen in de stad — bij een concrete startdatum, zorg dat de Edinburgh-nachten van deze etappe vóór 7 augustus vallen. Tip: Historic Environment Scotland Explorer Pass (~£44, 14 dagen, dekt o.a. Urquhart Castle bij Loch Ness) is goedkoper dan losse tickets voor deze etappe; let op dat National Trust for Scotland een andere organisatie is dan National Trust (Engeland/Wales) — een Engelse NT-pas dekt Glencoe/Glenfinnan niet. Routelogica-fix (2026-08, search-bevestigd): volgorde was Glenfinnan→Skye→Loch Ness→Applecross→NC500 — dat kruiste de Highlands twee keer oost-west (Skye/Applecross liggen beide westkust, Loch Ness/Inverness centraal-oost). Nu Skye→Applecross (beide westkust, ≈100 km) →NC500 gedeeltelijk richting Ullapool →Loch Ness/Inverness, zodat de rit maar één keer oost overgaat, vlak vóór de rechtstreekse rit naar Cairnryan. Het NC500-gedeelte is bewust beperkt tot Ullapool (niet Durness/John o'Groats) — verder doorrijden naar het noordpuntje kost 100-140 km extra richting Cairnryan, precies de verkeerde kant op.",
          transport_to_next: 'Ferry Cairnryan-Belfast (Stena Line, ≈2u15, ~6x/dag, iets afwijkende vaartijden tussen 29 juni-30 aug 2026 — check bij een concrete boeking) — Cairnryan ligt vanaf Inverness ≈400 km naar het zuiden, een rechtstreekse rit (routelogica-fix 2026-08, geen zigzag meer via Loch Ness-Applecross-Loch Ness).',
        },
        {
          code: 'GB', name: 'United Kingdom', days: 5, budget: 510, lat: 54.5973, lng: -5.9301,
          destinations: [
            { name: 'Belfast', lat: 54.5973, lng: -5.9301 },
            { name: "Giant's Causeway", lat: 55.2408, lng: -6.5116 },
            { name: 'Causeway Coastal Route', lat: 55.2000, lng: -6.3000 },
            { name: 'Dark Hedges', lat: 55.1725, lng: -6.3345 },
          ],
          notes: 'Compact maar met meerdere unieke stops dicht bij elkaar: de basaltzuilen van de Giant\'s Causeway (uniek, geen vergelijkbare plek elders op de route), de kustweg ernaartoe, en de Dark Hedges als korte fotostop. Prijscorrectie (2026-07): €90→€102/dag — Belfast zelf ligt iets boven het gemiddelde, de kust blijft goedkoper als dagtrip. Logistieke tip: de Twaalfde Juli-optocht valt in 2026 op maandag 13 juli — verkeer rond centraal Belfast kan die dag vertraagd zijn (check de datum bij een concrete planning, verschuift jaarlijks); geen invloed op de Giant\'s Causeway/Causeway Coastal Route zelf. Reisadvies: Noord-Ierland scoort op het terrorismedreigingsniveau zelfs iets lager dan Groot-Brittannië (substantieel vs. zeer ernstig).',
          transport_to_next: 'Auto over de open landsgrens naar Donegal — geen ferry of grenscontrole nodig (Ierland/Noord-Ierland).',
        },
      ],
    },
    {
      name: 'Ierland',
      season: 'Augustus',
      budget: 2590,
      note: 'Van Donegal in het noordwesten via de westkust naar Kerry, dan zuidoost naar Rosslare — bewust noord-naar-zuid gereden om na de zuidkust direct via Rosslare te kunnen uitstappen, zonder terug te hoeven naar Dublin.',
      countries: [
        {
          code: 'IE', name: 'Ireland', days: 11, budget: 1265, lat: 53.2707, lng: -9.0568,
          destinations: [
            { name: 'Donegal', lat: 54.6538, lng: -8.1096 },
            { name: 'Connemara', lat: 53.4900, lng: -9.7500 },
            { name: 'Galway', lat: 53.2707, lng: -9.0568 },
            { name: 'Cliffs of Moher', lat: 52.9715, lng: -9.4309 },
            { name: 'Wild Atlantic Way', lat: 52.5000, lng: -9.9000 },
            { name: 'Dingle Peninsula', lat: 52.1409, lng: -10.2700 },
          ],
          notes: 'De kern van de Ierland-ervaring. Augustus is qua neerslag iets natter dan de piek van mei-juli, maar nog ruim voor het echt natte venster (oktober-januari, tot 50% meer regen op de westkust dan Dublin) — prima werkbaar voor kustwandelingen. Prijscorrectie (2026-07): €90→€115/dag — Ierland is momenteel het op één na duurste EU-land (na Denemarken), vrijwel volledig door gestegen accommodatieprijzen (landelijk gemiddeld €202/nacht in augustus 2025, ondanks dalende bezoekersaantallen). Galway is de duurdere uitschieter van deze etappe. Reisadvies: groen.',
          transport_to_next: 'Auto zuidwaarts naar Kerry, ≈180 km.',
        },
        {
          code: 'IE', name: 'Ireland', days: 11, budget: 1325, lat: 52.0599, lng: -9.5044,
          destinations: [
            { name: 'Ring of Kerry', lat: 51.8333, lng: -10.0000 },
            { name: 'Killarney National Park', lat: 52.0599, lng: -9.5044 },
            { name: 'Cork', lat: 51.8985, lng: -8.4756 },
            { name: 'Kilkenny', lat: 52.6541, lng: -7.2448 },
          ],
          notes: "Ring of Kerry en Killarney National Park vragen tijd voor de vele uitzichtpunten; Cork en Kilkenny als historische steden voordat de auto weer aan boord gaat. Prijscorrectie (2026-07): €90→€125/dag gemiddeld — Killarney is toeristisch fors opgeprijsd; Ring of Kerry/Cork/Kilkenny liggen dichter bij het Ierse basisniveau. Praktische tip: rijd de Ring of Kerry rechtsom (tegen de gangbare richting van tourbussen in) of vertrek vroeg (voor 9u) om de bussen te ontlopen. Routelogica-fix (2026-08, search-bevestigd): Dublin (kort) is geschrapt — het stond als laatste stop vóór Rosslare, maar Kilkenny-Dublin-Rosslare (77+96 mijl) kost ≈190 km meer dan rechtstreeks Kilkenny-Rosslare (57 mijl), voor een bewust 'korte' stop die de omweg niet waard was. Youri's eigen keuze (2026-08): schrappen i.p.v. de omweg accepteren. Budget navenant iets omlaag (€1.375→€1.325, Dublin's hoge dagprijs viel weg; dagen ongewijzigd op 11, Kilkenny/Cork krijgen relatief iets meer tijd). Reisadvies: groen; Ierland heeft van juli t/m december 2026 het roulerend EU-voorzitterschap, met extra beveiliging/mogelijke afsluitingen rond Dublin (niet meer relevant voor deze route nu Dublin is geschrapt).",
          transport_to_next: "Auto, Kilkenny-Rosslare ≈92 km (routelogica-fix 2026-08: rechtstreeks, geen Dublin-omweg meer), dan ferry Rosslare-Fishguard/Pembroke (Stena Line/Irish Ferries, ≈3u15-4u, dagelijks), dan doorrijden door Zuid-Wales/Zuid-Engeland (al bezocht — puur transit, geen nieuwe stops) naar Poole/Portsmouth voor de oversteek naar de Kanaaleilanden.",
        },
      ],
    },
    {
      name: 'Kanaaleilanden & Bretagne',
      season: 'Eind augustus-september',
      budget: 1865,
      note: 'Van de Britse Kroonbezittingen in het Kanaal (met hun eigen bezettingsgeschiedenis uit de Tweede Wereldoorlog) naar de Keltische cultuur en megalieten van Bretagne — het beste najaarsvenster voordat het Franse kustweer in november omslaat.',
      countries: [
        {
          code: 'GG', name: 'Guernsey', days: 2, budget: 260, lat: 49.4526, lng: -2.5348,
          destinations: [
            { name: 'St Peter Port', lat: 49.4551, lng: -2.5359 },
            { name: 'kustwandelingen', lat: 49.4700, lng: -2.5800 },
            { name: 'Duitse bezettingsbunkers (WOII)', lat: 49.4326, lng: -2.5350 },
          ],
          notes: 'Klein eiland met een eigen, minder bekende WOII-geschiedenis: de Kanaaleilanden waren de enige Britse grond die door Duitsland bezet werd — een interessant contrast met Normandië\'s bevrijdingsverhaal verderop in de route. Prijscorrectie (2026-07): €90→€130/dag. Het \'belastingparadijs\'-imago blijkt in de praktijk vooral hoge woonlasten voor lokale bewoners te betreffen, niet toeristenprijzen — Guernsey is voor eten/boodschappen zelfs iets goedkoper dan Jersey. Reisadvies: valt onder de VK-ETA-regeling (zie Isle of Man-notitie), verder groen/laag risico.',
          transport_to_next: 'Ferry naar Jersey (Condor Ferries, interinsulair, kort).',
        },
        {
          code: 'JE', name: 'Jersey', days: 3, budget: 405, lat: 49.1805, lng: -2.1049,
          destinations: [
            { name: 'kust', lat: 49.1900, lng: -2.1300 },
            { name: 'kliffen', lat: 49.1667, lng: -2.0333 },
            { name: 'stranden', lat: 49.1900, lng: -2.2200 },
            { name: 'Jersey War Tunnels (WOII)', lat: 49.1958, lng: -2.1206 },
          ],
          notes: 'Grootste en meest toeristische van de twee eilanden — beste stranden van de Kanaaleilanden, plus dezelfde bezettingsgeschiedenis als Guernsey via de War Tunnels. Prijscorrectie (2026-07): €90→€135/dag — Jersey is de duurdere van de twee Kanaaleilanden, vooral op eten/restaurants (~14% boven VK-prijzen, ~6% boven Guernsey); accommodatie piekt in juli met een gemiddelde rond £226/nacht voor hotels (goedkopere guesthouses vanaf ~£60-90 blijven beschikbaar). Jersey War Tunnels-entree ~£21 (~€25) apart van het dagbudget. Overtocht Guernsey-Jersey (Condor Ferries/Manche Îles Express) is beperkt in frequentie — check de actuele vaardagen bij het plannen, dit kan de volgorde/een extra overnachting afdwingen.',
          transport_to_next: 'Ferry Jersey-Saint-Malo (Condor Ferries, ≈1u25 snelboot) — weersgevoelig, hou een bufferdag aan.',
        },
        {
          code: 'FR', name: 'France', days: 10, budget: 1200, lat: 48.6493, lng: -2.0257,
          destinations: [
            { name: 'Saint-Malo', lat: 48.6493, lng: -2.0257 },
            { name: 'Dinan', lat: 48.4535, lng: -2.0453 },
            { name: 'Cap Fréhel', lat: 48.6836, lng: -2.3247 },
            { name: 'Côte de Granit Rose', lat: 48.8339, lng: -3.5772 },
            { name: 'Quimper', lat: 47.9960, lng: -4.0977 },
            { name: 'Pointe du Raz', lat: 48.0397, lng: -4.7331 },
            { name: 'Carnac (megalieten)', lat: 47.5834, lng: -3.0797 },
            { name: 'Quiberon', lat: 47.4844, lng: -3.1204 },
          ],
          notes: 'De langste, meest gevarieerde kustlijn van de hele expeditie — acht losstaande hoogtepunten in tien dagen is al krap, dus dit is de dichtst-gepakte etappe van de route. Carnac\'s megalieten (ouder dan Stonehenge) sluiten mooi aan op het geschiedenisthema. Volgorde geverifieerd (2026-08): Saint-Malo→Dinan→Cap Fréhel→Côte de Granit Rose→Quimper→Pointe du Raz→Carnac→Quiberon is geen zigzag maar een correcte rondgang om het Finistère-schiereiland — geen wijziging nodig. Prijscorrectie (2026-07): €90→€120/dag — de kustplaatsjes (Saint-Malo, Carnac, Quiberon) rekenen een reëel toeristisch opslag, met juni als duurste maand (~€175/nacht gemiddeld tegenover ~€100 in januari). Carnac vereist april-september een betaalde gegidste toegang (~€6 p.p., oktober-maart gratis). Reisadvies: geel (Frankrijk als geheel, verhoogd terrorismeniveau vooral in steden — de landelijke Bretonse kust zelf is laag risico); check bosbrandrisico in de zomer, kan lokaal wegen/campings sluiten.',
          transport_to_next: 'Auto, ≈240 km naar Mont Saint-Michel/Normandië (routelogica-check 2026-08: was als ≈100 km genoteerd, klopte niet — Quiberon ligt op de zuidkust, ver van Saint-Malo/Normandië, een onvermijdelijk gevolg van de volledige Bretagne-rondgang, geen losse dagrit).',
        },
      ],
    },
    {
      name: 'Normandië, Opaalkust & België',
      season: 'September',
      budget: 1445,
      note: 'De laatste Franse etappes en België als rustige afsluiter, net binnen het laatste goede najaarsvenster voordat de kust in november nat en donker wordt.',
      countries: [
        {
          code: 'FR', name: 'France', days: 7, budget: 770, lat: 49.2764, lng: -0.7025,
          destinations: [
            { name: 'Mont Saint-Michel ⭐', lat: 48.6361, lng: -1.5115 },
            { name: 'Bayeux (tijdelijke exposities)', lat: 49.2764, lng: -0.7025 },
            { name: 'Omaha Beach', lat: 49.3697, lng: -0.8560 },
            { name: 'Pointe du Hoc', lat: 49.3958, lng: -0.9897 },
            { name: 'Honfleur', lat: 49.4189, lng: 0.2333 },
            { name: 'Étretat', lat: 49.7075, lng: 0.2036 },
            { name: 'Rouen', lat: 49.4431, lng: 1.0993 },
          ],
          notes: 'Mont Saint-Michel en de D-Day-stranden verdienen elk een volle dag. De D-Day-geschiedenis vormt een mooi tegenwicht met de bezettingsgeschiedenis van de Kanaaleilanden hiervoor: bezet versus bevrijding. Prijscorrectie (2026-07): €90→€110/dag — Honfleur en Étretat zijn toeristisch opgeprijsde plaatsjes, Rouen/Bayeux zelf liggen gematigder. ⚠️ Het Tapijt van Bayeux is sinds 1 september 2025 niet te bezichtigen (2 jaar gesloten voor renovatie, heropening rond oktober 2027) — het origineel is bovendien uitgeleend aan het British Museum (10 sep 2026-11 jul 2027). Twee tijdelijke exposities in Bayeux zelf (Baron Gérard-museum, Slag om Normandië-museum) blijven wel open als alternatief. Mont Saint-Michel: parkeren ~€9,80/dag + abdij-entree ~€16 p.p. (hoogseizoen), apart van het dagbudget. D-Day Omaha Museum ~€7,90 p.p.; Pointe du Hoc is gratis (ABMC-terrein, wel een lopend behoud/veiligheidsproject 2026-medio 2027, blijft toegankelijk). Reisadvies: geel (zelfde als Bretagne); draag een paspoort/ID, een rijbewijs alleen is niet genoeg bij eventuele grenscontroles.',
          transport_to_next: 'Auto langs de kust naar de Opaalkust, ≈350 km.',
        },
        {
          code: 'FR', name: 'France', days: 3, budget: 285, lat: 50.6292, lng: 3.0573,
          destinations: [
            { name: 'Cap Blanc-Nez', lat: 50.9236, lng: 1.7100 },
            { name: 'Cap Gris-Nez', lat: 50.8564, lng: 1.5872 },
            { name: 'Lille', lat: 50.6292, lng: 3.0573 },
          ],
          notes: 'Korte, mooie kustwandeling langs de krijtkliffen van de Opaalkust, gevolgd door een korte stedelijke stop in Lille voordat de reis naar België afbuigt. Prijs vrijwel bevestigd (2026-07): €90→€95/dag — de Capes zijn vrijwel gratis toegankelijk, wat Lille\'s iets hogere stadsprijzen compenseert. Lille-centrum parkeren ~€16-17/24u (garages) — apart van het dagbudget. Reisadvies: geel, standaard.',
          transport_to_next: 'Auto, ≈110 km naar Gent.',
        },
        {
          code: 'BE', name: 'Belgium', days: 3, budget: 390, lat: 51.0543, lng: 3.7174,
          destinations: [
            { name: 'Brugge', lat: 51.2093, lng: 3.2247 },
            { name: 'Gent', lat: 51.0543, lng: 3.7174 },
          ],
          notes: 'Twee historische steden die elk minstens anderhalve dag verdienen — een rustige afsluiter voordat de laatste rit terug naar Nederland volgt. Routelogica-fix (2026-08, search-bevestigd): volgorde omgedraaid (was Gent→Brugge) — Brugge ligt westelijker dan Gent, dus Gent→Brugge→Nederland betekende eerst van huis vandaan rijden voordat je weer terugkeert; nu Brugge→Gent→Nederland, de hele laatste etappe richting Nederland (bespaart ≈25-40 km). Prijscorrectie (2026-07): €90→€130/dag — Brugge is een bevestigd duur toeristenstadje (musea ~€14 p.p., rondvaart ~€12-14), Gent ligt zo\'n 20% goedkoper (studentenstad, meer budgetgelegenheden) — dit budget middelt beide. Brugge-centrum parkeren is prijzig: garages vanaf ~€5,50/24u (station, met gratis pendelbus) tot ~€15,80+ centraal — apart begroten. Reisadvies: groen; verhoogd terrorismeniveau (3/4) concentreert zich op Brussel/Antwerpen, niet Gent/Brugge.',
          transport_to_next: 'Einde van de expeditie — terugrit naar Nederland, ≈150 km.',
        },
      ],
    },
  ], {
    travel_style: "Eigen auto vanuit Nederland, geen vliegtuig behalve waar geen ferry bestaat — rustig rijden, geen harde tijdslimiet, kwaliteit boven snelheid. Accommodatie/eten/activiteiten hieronder op het Realistische niveau (hostels/eenvoudige hotels, soms privékamer — hetzelfde niveau als de rest van de reizen). Brandstof, tol/parkeren en de zes auto-ferry's zijn per auto gedeeld (ongeacht groepsgrootte) en staan NIET in de bedragen per land hierboven — zie de route-notities voor die aparte optelling. Uitzondering: Isle of Man wordt als voetganger bezocht (zie die etappe), niet met de eigen auto.",
    best_starting_month: 'Juni',
    description: "Grote lus met eigen auto vanuit Nederland naar de Britse eilanden en terug via de Franse en Belgische kust: spectaculaire kusten, bergen, eilanden, Keltische cultuur, kastelen en historische steden door Engeland, Wales, Isle of Man, Schotland, Noord-Ierland, Ierland, de Kanaaleilanden, Bretagne, Normandië en België. Zestien etappes in vijf regio's volgen één grote lus terug naar het startpunt.",
    climate_summary: "Aanbevolen start: begin juni. Een start in september zou de zwaarste weersafhankelijke etappes (Wild Atlantic Way, Kanaaleilanden, Bretagne/Normandië) doorschuiven naar november-januari — de natste, donkerste periode van het jaar op precies de stukken die van droog weer en goed licht afhangen (Normandië haalt in november-december gemiddeld nog maar 1,5-2 uur zon per dag). Bij een junistart doorkruist de reis Schotland vóór de muggenpiek van juli-augustus (mei/begin juni/september zijn merkbaar rustiger qua midges dan het hoogseizoen), valt Ierland in augustus (droger dan het najaar, al iets natter dan de piek van mei-juli), en bereiken de Kanaaleilanden/Bretagne/Normandië hun laatste goede najaarsvenster in september, vlak voordat het Franse kustweer omslaat. De reis eindigt daarmee eind september in België, ruim vóór het natte Noord-Franse najaar.",
    notes: "Ontworpen in een Q&A-sessie met Claude (2026-07), op basis van een uitgebreide ChatGPT-brainstorm die Youri aandroeg. Ferry- en klimaatonderzoek (via web search) bevestigde dat Youri's route grotendeels al klopte; de twee correcties en de Isle of Man-beslissing staan in de functie-documentatie hierboven. Dagen zijn de 'ideale' tempo-schatting — Youri's eigen instructie was 'mag lang zijn, als het maar niet te kort voelt op plekken', dus er is bewust niet richting het minimum afgerond. Per-land-budgetten zijn het Realistische dagtarief (€90/dag per persoon) keer het aantal dagen, bewust hetzelfde niveau als de rest van Youri's reizen.\n\n" +
      "Ferrytabel (auto, enkele reis, auto+2p; onderzocht 2026-07, nog niet getoetst aan actuele prijzen): Calais/Duinkerke-Dover (P&O/DFDS/Irish Ferries, 1,5-2u, €60-150) als aanbevolen start i.p.v. IJmuiden-Newcastle (komt uit in Noordoost-Engeland, mist heel Zuid-Engeland); Heysham-Douglas (Isle of Man Steam Packet, ≈3u45, €150-250, maar hier als voetganger dus veel goedkoper); Cairnryan-Belfast (Stena Line, ≈2u15, €150-250); Rosslare-Fishguard/Pembroke (Stena Line/Irish Ferries, ≈3u15-4u, €150-250); Poole/Portsmouth-Guernsey (Condor Ferries, 3-10u, €150-400, weersgevoelig — bufferdagen inplannen); Guernsey/Jersey-Saint-Malo (Condor Ferries, ≈1,5-2u, €100-200).\n\n" +
      "Autokosten (gedeeld per auto, NIET in de bedragen per land hierboven): brandstof/tol/parkeren over ≈9.000-10.000 km geschat op €2.800-3.200; vijf auto-ferry's (alle behalve Isle of Man, die als voetganger gaat) plus de lokale dagshuurauto op Isle of Man voor de TT Mountain Road samen ≈€1.400-1.600 — totaal ≈€4.200-4.800 per auto, ongeacht groepsgrootte. Let op (2026-07): Britse brandstofprijzen liggen momenteel duidelijk boven Nederlandse pompprijzen (~€1,73/L benzine, ~€1,89/L diesel) — bij lange ritten (vooral de Schotse Highlands/NC500) mag de bovenkant van deze bandbreedte realistischer zijn dan het midden.\n\n" +
      "Prijzen/visum/reisadvies-verificatie (2026-07, dertiende en laatste route van deze verificatieronde): alle 15 etappes gecheckt via web-onderzoek tegen actuele prijzen (tussen budget- en comfort-backpacker), grensregels en Nederlands reisadvies. De vlakke €90/dag bleek — net als bij Central European Grand Roadtrip destijds — voor bijna elke etappe aan de lage kant: alleen Wales en de Opaalkust/Lille lagen al dicht bij accuraat, de overige 13 etappes kregen een correctie, meestal tussen +11% en +39%. Grootste stijgers: Cornwall (€90→€125/dag, zomerpiek), Ierland (beide etappes, €90→€115-125/dag, Ierland is nu het op één na duurste EU-land), de Kanaaleilanden (Guernsey €90→€130, Jersey €90→€135) en de Schotse Highlands/Skye-etappe (€90→€114/dag gemiddeld, met Skye zelf rond €150/dag). Nieuw grondkostentotaal: €13.245 (was €10.350), 115 dagen ongewijzigd. ⚠️ Belangrijke nieuwe bevinding: sinds 2 april 2025 is een UK ETA verplicht voor Nederlandse/EU-reizigers (~€23 p.p. sinds de verhoging van 8 april 2026) — dit geldt voor het hele Verenigd Koninkrijk-bezoek in één keer; de latere overtochten naar Isle of Man/Jersey/Guernsey vallen sinds 23 april 2026 onder dezelfde ETA (geen aparte aanvraag/kosten). Ook gevonden: het Tapijt van Bayeux is tot naar schatting oktober 2027 gesloten voor renovatie (zie Bayeux-etappe voor het alternatief), en het Edinburgh Fringe Festival (7-31 augustus 2026) kan de Schotland-etappe fors duurder maken als de concrete planning de Edinburgh-nachten in die periode laat vallen. Details en overige bevindingen (Twaalfde Juli-optocht in Noord-Ierland, Ring of Kerry-rijrichting, div. parkeer-/entreekosten) in elke etappe's eigen notities.\n\n" +
      "Totaal: 86 dagen minimum / 115 dagen ideaal (~3,8 maanden), €13.195 grondkosten per persoon solo (na de 2026-07-verificatie en de 2026-08-routelogica-fix hieronder, was €13.245) + ≈€4.200-4.800 autokosten per auto. Met 2-3 personen (gedeelde kamers) liggen de per-persoon bedragen proportioneel lager dan hierboven, zelfde verhouding als voorheen. Ferrytijden/prijzen en de UK ETA-kosten zijn nog niet allemaal tegen een concrete boekingsdatum getoetst — behandel dit als een grondig geverifieerd concept, nog geen boekbaar plan.\n\n" +
      "Routelogica-herziening (2026-08, search-bevestigd, zevende expeditie uit ROUTE_LOGIC_REVIEW.md, eerste met een echte grote fix in deze ronde): drie vondsten. (1) **Grootste fix**: Isle of Man stond weliswaar al terecht 'genest' in de Noord-Engeland-etappe (2026-07-ontwerp), maar op het verkeerde punt — ná Bamburgh (bij de Schotse grens) in plaats van bij het Lake District (vlak naast Heysham). Dat betekende een rit helemaal terug naar Heysham (≈250 km) en daarna weer noordwaarts naar Edinburgh (≈264 km) — twee keer dezelfde corridor. Opgelost door de etappe te splitsen: Lake District (met Isle of Man-zijsprong) → Yorkshire Dales/York/Northumberland/Bamburgh → rechtstreeks naar Edinburgh (≈124 km). United Kingdom komt hierdoor nu zeven keer voor i.p.v. zes. (2) Schotlands Highlands-volgorde had een oost-west-zigzag (Skye→Loch Ness→Applecross→NC500) — nu Skye→Applecross→NC500 (bewust beperkt tot Ullapool, niet doorgetrokken naar Durness/John o'Groats) →Loch Ness/Inverness, met een rechtstreekse ≈400 km-rit naar Cairnryan erna. (3) Ierlands afsluitende 'Dublin (kort)'-stop is geschrapt — Kilkenny-Dublin-Rosslare kostte ≈190 km meer dan rechtstreeks Kilkenny-Rosslare, voor een stop die toch al als kort bedoeld was; Youri's eigen keuze om te schrappen i.p.v. de omweg te accepteren. Verder bevestigd zonder wijziging: Wales' volgorde, de Bretagne-rondgang (leek een zigzag, bleek een correcte rondgang om Finistère), en Normandië's volgorde. Kleinere correcties: Quiberon-Mont Saint-Michel was ≈100 km genoteerd, is in werkelijkheid ≈240 km; Gent/Brugge omgedraaid naar Brugge→Gent (bespaart ≈25-40 km, geen omweg van huis vandaan meer op de laatste etappe). Landen/dagen ongewijzigd (86/115 dagen); grondkosten €13.245→€13.195 (Ierland's budget iets omlaag na het schrappen van Dublin's dure dagtarief).",
  });
}

// ---- Eurasia Grand Tour split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// Eurasia Grand Tour 🌏 itself already flagged this exact split in its own notes: "Overweeg
// desondanks om deze route ooit te knippen in twee losse expedities (West-Eurazië t/m
// Centraal-Azië, en Oost-Eurazië/Azië) — 11-12 maanden aaneengesloten is fors." The three
// routes below carve it into three standalone expeditions instead of two, since Oost-Azië and
// Zuidoost-Azië turned out to be distinct enough (different climate window, no overland link)
// to stand on their own too. Countries, days, budgets, region order and all per-country content
// are reused as-is from RB_EXPEDITION_CONTENT['Eurasia Grand Tour 🌏'] via rbContentFor() — the
// original Eurasia Grand Tour 🌏 expedition itself is untouched by this and keeps existing
// exactly as it was, in full, alongside these three.

function rbSeedEurasiaSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_EURASIA_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_EURASIA_SPLIT, '1');

  rbRoutes.push(rbBuildWestEurasiaOverlandRoute(), rbBuildEastAsiaPacificRoute(), rbBuildSoutheastAsiaGrandLoopRoute());
  rbSave();
}

function rbBuildWestEurasiaOverlandRoute() {
  const eurasia = (code, name) => rbContentFor('Eurasia Grand Tour 🌏', code, name);
  return rbBuildSeedRoute('West-Eurazië Overland 🐫', [
    { name: 'Balkans', season: 'April–juni', budget: 1909, note: 'Mild voorjaar, voor de zomerdrukte en -hitte — sluit aan op een vroege start van de hele expeditie.', countries: [eurasia('BA', 'Bosnia and Herzegovina'), eurasia('HR', 'Croatia'), eurasia('ME', 'Montenegro'), eurasia('AL', 'Albania'), eurasia('MK', 'North Macedonia')] },
    { name: 'Turkey', season: 'Juni', budget: 1300, note: 'Aansluitend op de Balkan, nog vóór de zwaarste zomerhitte in Cappadocië en het binnenland.', countries: [eurasia('TR', 'Turkey')] },
    { name: 'Caucasus', season: 'Juni–augustus', budget: 1475, note: 'Bergpassen en Svaneti zijn dan sneeuwvrij; sluit direct aan op het Centraal-Aziatische bergseizoen.', countries: [eurasia('GE', 'Georgia'), eurasia('AM', 'Armenia'), eurasia('AZ', 'Azerbaijan')] },
    { name: 'Central Asia', season: 'Juni–september', budget: 2350, note: 'De Pamir Highway en hooggelegen passen zijn alleen in deze maanden begaanbaar — buiten dit venster ligt er sneeuw/ijs. Turkmenistan is bewust geschrapt (lastig te bezoeken/niet reëel voor deze reisstijl), en Nur-Sultan/Astana is losgelaten (lag te ver uit de route).', countries: [eurasia('KZ', 'Kazakhstan'), eurasia('KG', 'Kyrgyzstan'), eurasia('TJ', 'Tajikistan'), eurasia('UZ', 'Uzbekistan')] },
  ], {
    best_starting_month: 'April',
    travel_style: 'Backpacker — overland waar mogelijk (bus, trein, marshrutka/deeltaxi), vlucht alleen waar geen praktische grondroute bestaat (Baku–Almaty). Lokale guesthouses en hostels boven internationale ketens.',
    climate_summary: 'Een aprilstart legt de Balkan in een mild voorjaar, bereikt Turkije in juni vlak vóór de zwaarste zomerhitte, de Kaukasus in juni-augustus (bergpassen sneeuwvrij) en Centraal-Azië in juni-september — het enige venster waarin de Pamir Highway begaanbaar is. Zie de region-notities hieronder voor de onderbouwing per etappe.',
    description: "Overland door het westelijke deel van Eurazië — van de Balkan via Turkije en de Kaukasus naar de Centraal-Aziatische 'Stans'.",
    notes: 'Losgesplitst van Eurasia Grand Tour 🌏 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md) — de oorspronkelijke expeditie noemde deze exacte knip zelf al als optie. Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Eurasia Grand Tour 🌏 (inclusief alle prijs-/visum-/reisadvies-verificaties per land); alleen de expeditiegrens is nieuw. Vervolg op deze route: Oost-Azië & Stille Oceaan 🗻. Eurasia Grand Tour 🌏 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildEastAsiaPacificRoute() {
  const eurasia = (code, name) => rbContentFor('Eurasia Grand Tour 🌏', code, name);
  return rbBuildSeedRoute('Oost-Azië & Stille Oceaan 🗻', [
    { name: 'China', season: 'September', budget: 1625, note: 'Na de zomerdrukte/-hitte, ruim vóór de Mongoolse winterkou die erna komt.', countries: [eurasia('CN', 'China')] },
    { name: 'Mongolia', season: 'Eind augustus–september', budget: 650, note: 'Vóór de vrieskou vanaf oktober; de Gobi is dan nog droog en warm genoeg voor een meerdaagse 4x4-tocht.', countries: [eurasia('MN', 'Mongolia')] },
    { name: 'Japan', season: 'Oktober–november', budget: 2700, note: 'Herfstkleuren, en rustiger dan de kersenbloesem-drukte in het voorjaar.', countries: [eurasia('JP', 'Japan')] },
    { name: 'Taiwan', season: 'November', budget: 750, note: 'Droog en mild, vóór het koelere winterseizoen in het noorden van het eiland.', countries: [eurasia('TW', 'Taiwan')] },
  ], {
    best_starting_month: 'September',
    travel_style: 'Backpacker — overland via de Trans-Mongolië-trein tussen China en Mongolië; vanaf Mongolië alleen per vliegtuig verder (geen landroute naar Japan of Taiwan mogelijk). Lokale guesthouses en hostels boven internationale ketens.',
    climate_summary: 'China in september (na de zomerhitte, vóór de Mongoolse winterkou), Mongolië eind augustus-september (de Gobi is dan nog droog en warm genoeg voor de jeeptocht), Japan in oktober-november (herfstkleuren, rustiger dan de kersenbloesem-drukte) en Taiwan in november (droog en mild, vóór het koelere winterseizoen). Als losse expeditie prima op zichzelf te starten in september, zonder eerst West-Eurazië Overland te hoeven doen.',
    description: 'Van de Zijderoute-steden van China via de Gobiwoestijn van Mongolië naar Japan en Taiwan.',
    notes: 'Losgesplitst van Eurasia Grand Tour 🌏 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Eurasia Grand Tour 🌏 (inclusief alle prijs-/visum-/reisadvies-verificaties per land); alleen de expeditiegrens is nieuw. Vervolg op West-Eurazië Overland 🐫; wordt zelf gevolgd door Zuidoost-Azië Grand Loop 🛕. Eurasia Grand Tour 🌏 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildSoutheastAsiaGrandLoopRoute() {
  const eurasia = (code, name) => rbContentFor('Eurasia Grand Tour 🌏', code, name);
  return rbBuildSeedRoute('Zuidoost-Azië Grand Loop 🛕', [
    { name: 'Mainland Southeast Asia', season: 'December–februari', budget: 2700, note: 'Het droge seizoen op het vasteland van Zuidoost-Azië — geen moesson, aangename temperaturen. Myanmar is bewust geschrapt (lastig te bezoeken/niet reëel voor deze reisstijl). Volgorde omgedraaid (2026-08): Vietnam → Cambodja → Laos → Thailand, via de klassieke Mekongdelta- en Huay Xai-grensovergangen.', countries: [eurasia('VN', 'Vietnam'), eurasia('KH', 'Cambodia'), eurasia('LA', 'Laos'), eurasia('TH', 'Thailand')] },
    { name: 'Maritime Southeast Asia', season: 'Februari–maart', budget: 2735, note: "Nog droog in de meeste regio's, vóór de moesson die later in het voorjaar begint. Maleisië is uitgebreid (2026-08) met een Borneo-etappe (Sarawak → Brunei → Sabah, de 'Borneo Overland Trail') tussen het schiereiland en Brunei in.", countries: [
      eurasia('MY', 'Malaysia'),
      {
        code: 'MY', name: 'Malaysia', days: 6, budget: 330, lat: 1.5533, lng: 110.3592,
        destinations: [{name:'Kuching',lat:1.5533,lng:110.3592}, {name:'Bako National Park',lat:1.7167,lng:110.4667}, {name:'Mulu Caves (Gunung Mulu NP)',lat:4.0428,lng:114.8144}],
        transport_to_next: 'Bus naar Miri, dan over land de grens over naar Bandar Seri Begawan, Brunei',
        notes: 'Sarawak-etappe van de Borneo Overland Trail (2026-08) — vervolg op het schiereiland-blok hierboven, met Brunei als tussenstop voor Sabah.',
      },
      eurasia('BN', 'Brunei'),
      {
        code: 'MY', name: 'Malaysia', days: 11, budget: 715, lat: 5.9788, lng: 116.0753,
        destinations: [{name:'Kota Kinabalu',lat:5.9788,lng:116.0753}, {name:'Mount Kinabalu',lat:6.0754,lng:116.5580}, {name:'Sepilok Orang-oetan Centre',lat:5.8742,lng:117.9478}, {name:'Kinabatangan-rivier',lat:5.5000,lng:118.3667}, {name:'Semporna/Sipadan',lat:4.4816,lng:118.6120}],
        transport_to_next: 'Vlucht Kota Kinabalu-Manila (AirAsia, ~4x/week, directe verbinding, ~2u)',
        notes: 'Sabah-etappe van de Borneo Overland Trail. Extra kostenposten (niet in dagbudget): Mount Kinabalu-beklimming (verplichte gids+vergunning, ~€250-350 all-in), Sipadan-duiken (beperkte vergunningen, ~€150-250/dag).',
      },
      eurasia('PH', 'Philippines'),
    ] },
    { name: 'Indonesia & Oost-Timor', season: 'Maart', budget: 1275, note: "Droog seizoen loopt in de meeste regio's door tot april/mei — Bali, Gili, Lombok en Komodo nog prima begaanbaar. Oost-Timor sluit hier logisch op aan, via de landgrens bij Kupang (West-Timor).", countries: [eurasia('ID', 'Indonesia'), eurasia('TL', 'East Timor')] },
    { name: 'Singapore Finale', season: 'Maart', budget: 375, note: 'Bewuste, compacte afsluiting — een rustige stadsstop na Oost-Timor.', countries: [eurasia('SG', 'Singapore')] },
  ], {
    best_starting_month: 'December',
    travel_style: 'Backpacker — overland op het vasteland (bus, trein), vluchten voor de eilandsprongen in maritiem Zuidoost-Azië en naar Singapore. Lokale guesthouses en hostels boven internationale ketens.',
    climate_summary: 'Het vasteland van Zuidoost-Azië in december-februari (droog seizoen, geen moesson), maritiem Zuidoost-Azië in februari-maart, Indonesië & Oost-Timor in maart (droog seizoen loopt door tot april/mei) en Singapore als bewuste, compacte afsluiter. Als losse expeditie prima op zichzelf te starten in december.',
    description: 'Een grote lus door Zuidoost-Azië: vasteland, eilanden en een compacte stadsafsluiter in Singapore.',
    notes: "Losgesplitst van Eurasia Grand Tour 🌏 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Eurasia Grand Tour 🌏 (inclusief alle prijs-/visum-/reisadvies-verificaties per land, zoals de huidige grenssluiting Cambodja-Thailand bij Poipet — zie Cambodja's eigen notitie); alleen de expeditiegrens is nieuw. Vervolg op Oost-Azië & Stille Oceaan 🗻. Eurasia Grand Tour 🌏 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.",
  });
}

// ---- Pan-American Grand Tour split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// Pan-American Grand Tour 🌎 already excludes Patagonia/Antarctica/Northern Brazil/Suriname/the
// Caribbean as "separate future expeditions" in its own notes — proof it was designed with
// modularity in mind from the start. The four routes below carve the remaining 15 countries into
// standalone pieces along the same logic. Countries, days, budgets, region order and all
// per-country content are reused as-is from RB_EXPEDITION_CONTENT['Pan-American Grand Tour 🌎']
// via rbContentFor() — the original expedition itself is untouched and keeps existing exactly as
// it was, in full, alongside these four.

function rbSeedPanAmericanSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_PANAM_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_PANAM_SPLIT, '1');

  rbRoutes.push(rbBuildMexicoRoute(), rbBuildCentralAmericaLoopRoute(), rbBuildAndesGrandTraverseRoute(), rbBuildSouthernConeAndBrazilFinaleRoute());
  rbSave();
}

function rbBuildMexicoRoute() {
  const panAm = (code, name) => rbContentFor('Pan-American Grand Tour 🌎', code, name);
  return rbBuildSeedRoute('Mexico 🌵', [
    { name: 'Mexico', season: 'November–december', budget: 1000, note: 'Droog seizoen, na de zomerse regens.', countries: [panAm('MX', 'Mexico')] },
  ], {
    best_starting_month: 'November',
    travel_style: 'Backpacker — lokale bussen en colectivos.',
    climate_summary: 'November-december is het droge seizoen, direct na de zomerse regens — het hele land is dan goed begaanbaar.',
    description: 'Van Ciudad de México via Oaxaca naar de Maya-ruïnes van Palenque.',
    notes: 'Losgesplitst van Pan-American Grand Tour 🌎 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Pan-American Grand Tour 🌎 (inclusief alle prijs-/visum-/reisadvies-verificaties, zoals de waarschuwing over Route 199). Pan-American Grand Tour 🌎 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildCentralAmericaLoopRoute() {
  const panAm = (code, name) => rbContentFor('Pan-American Grand Tour 🌎', code, name);
  return rbBuildSeedRoute('Midden-Amerika Loop 🌋', [
    { name: 'Northern Central America', season: 'December–januari', budget: 1770, note: 'Droog seizoen, orkaanseizoen voorbij.', countries: [panAm('GT', 'Guatemala'), panAm('BZ', 'Belize'), panAm('HN', 'Honduras'), panAm('SV', 'El Salvador')] },
    { name: 'Southern Central America', season: 'Januari–februari', budget: 1975, note: 'Pacifische droge seizoen in Costa Rica/Panama — beste tijd voor de kust.', countries: [panAm('NI', 'Nicaragua'), panAm('CR', 'Costa Rica'), panAm('PA', 'Panama')] },
  ], {
    best_starting_month: 'December',
    travel_style: 'Backpacker — lokale bussen (chicken bus tot luxere overlandbus), zeilboot door de San Blas-eilanden i.p.v. vliegen over de Darién Gap.',
    climate_summary: 'Een decemberstart legt Noord-Midden-Amerika (Guatemala t/m El Salvador) in het droge seizoen, ruim na het orkaanseizoen, en bereikt Zuid-Midden-Amerika (Nicaragua t/m Panama) in januari-februari — de Pacifische droge tijd, de beste periode voor de kust.',
    description: 'Van de Maya-hoogvlaktes van Guatemala via Belize, Honduras en El Salvador naar de Pacifische kust van Costa Rica en Panama.',
    notes: "Losgesplitst van Pan-American Grand Tour 🌎 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Pan-American Grand Tour 🌎; alleen de expeditiegrens is nieuw. Let op: dit blok bevat de volledige CA-4-visumzone (Guatemala/Honduras/El Salvador/Nicaragua delen één gezamenlijke 90-dagenlimiet, ook al vallen ze hier over de twee regio's hierboven) — deze route blijft ruim onder die limiet, maar hou er rekening mee als je de regio's ooit los van elkaar zou plannen. Pan-American Grand Tour 🌎 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.",
  });
}

function rbBuildAndesGrandTraverseRoute() {
  const panAm = (code, name) => rbContentFor('Pan-American Grand Tour 🌎', code, name);
  return rbBuildSeedRoute('Andes Grand Traverse 🦙', [
    { name: 'Colombia', season: 'Februari–maart', budget: 1260, note: 'Droog in zowel de Caribische regio als de koffiezone/Andes.', countries: [panAm('CO', 'Colombia')] },
    { name: 'Ecuador', season: 'Maart–april', budget: 1650, note: 'Sierra droog genoeg voor wandelen; Galápagos is jaarrond goed maar rustiger in dit seizoen.', countries: [panAm('EC', 'Ecuador')] },
    { name: 'Peru', season: 'April–mei', budget: 1050, note: "Het Andes-droogseizoen begint — ideaal voor Cusco/Vallei van de Inca's en Huaraz-trekking.", countries: [panAm('PE', 'Peru')] },
    { name: 'Bolivia', season: 'Mei–juni', budget: 425, note: 'Droog seizoen, heldere Uyuni-zoutvlakte (let op: geen spiegel-effect zoals in het natte seizoen — een bewuste ruil).', countries: [panAm('BO', 'Bolivia')] },
  ], {
    best_starting_month: 'Februari',
    travel_style: 'Backpacker — lokale bussen door de Andes, geen enkele vlucht nodig tussen deze vier landen (ononderbroken overland-corridor).',
    climate_summary: 'Een februaristart legt Colombia in zijn droge seizoen (zowel Caribische kust als koffiezone/Andes), Ecuador in maart-april (Sierra droog genoeg om te wandelen), Peru in april-mei (Andes-droogseizoen, ideaal voor Cusco en Huaraz) en Bolivia in mei-juni (heldere, droge Uyuni-zoutvlakte).',
    description: 'Ononderbroken overland door de Andes: van de Caribische kust van Colombia via Ecuador en Peru naar de Boliviaanse zoutvlaktes.',
    notes: 'Losgesplitst van Pan-American Grand Tour 🌎 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Pan-American Grand Tour 🌎 (inclusief de prijscorrectie op Ecuador voor Galápagos-kosten); alleen de expeditiegrens is nieuw. Pan-American Grand Tour 🌎 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildSouthernConeAndBrazilFinaleRoute() {
  const panAm = (code, name) => rbContentFor('Pan-American Grand Tour 🌎', code, name);
  return rbBuildSeedRoute('Zuidelijke Kegel & Brazilië-finale 🧉', [
    { name: 'Northern Chile', season: 'Juni–juli', budget: 520, note: 'Northern Chile only (Atacama, Antofagasta) — Patagonia is a separate future expedition. De Atacama is jaarrond droog; koude nachten in de Chileense winter, overdag prima.', countries: [panAm('CL', 'Chile')] },
    { name: 'Northern Argentina', season: 'Juli', budget: 350, note: 'Northern Argentina only (Salta, Jujuy) — Patagonia is a separate future expedition. Droog hoogseizoen in Salta/Jujuy, koude nachten in het hooggebergte.', countries: [panAm('AR', 'Argentina')] },
    { name: 'Southern Brazil', season: 'Juli–augustus', budget: 1166, note: 'Southern Brazil only — Northern Brazil is a separate future expedition. Zuid-Braziliaanse winter: mild en droog voor sightseeing (Iguaçu, koloniale steden), maar geen strandweer; voor strandtijd de hele reis 1-2 maanden later starten.', countries: [panAm('BR', 'Brazil')] },
  ], {
    best_starting_month: 'Juni',
    travel_style: 'Backpacker — lokale bussen, één binnenlandse vlucht van Salta naar Foz do Iguaçu/Zuid-Brazilië (de afstand rechtvaardigt dat).',
    climate_summary: 'Een junistart legt Noord-Chili (Atacama) in de Chileense winter (jaarrond droog, koude nachten), Noord-Argentinië (Salta/Jujuy) in juli (droog hoogseizoen) en Zuid-Brazilië in juli-augustus (Zuid-Braziliaanse winter: mild en droog voor sightseeing, maar geen strandweer).',
    description: 'Van de Atacama-woestijn via Noord-Argentinië naar de winterse zuidkust van Brazilië.',
    notes: "Losgesplitst van Pan-American Grand Tour 🌎 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Pan-American Grand Tour 🌎; alleen de expeditiegrens is nieuw. 'Northern Chile' en 'Northern Argentina' zijn hier letterlijk alleen het noordelijke deel van die landen — Patagonië (het zuidelijke deel) zit al in de aparte Patagonia & Antarctica Expedition 🧊, exact het 'zelfde land, ander block'-patroon uit de modularisatie-analyse. Pan-American Grand Tour 🌎 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.",
  });
}

// ---- Africa Grand Tour split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// The four routes below carve Africa Grand Tour's 18 countries along its own existing region
// boundaries (already flight-gated seams, per the route's own travel_style note) into four
// standalone expeditions. Countries, days, budgets, region order and all per-country content are
// reused as-is from RB_EXPEDITION_CONTENT['Africa Grand Tour 🌍'] via rbContentFor() — the
// original expedition itself is untouched and keeps existing exactly as it was, in full, alongside
// these four.

function rbSeedAfricaSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_AFRICA_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_AFRICA_SPLIT, '1');

  rbRoutes.push(rbBuildSouthernAfricaSafariLoopRoute(), rbBuildAfricaIslandsRoute(), rbBuildEastAfricaSafariClassicRoute(), rbBuildHornOfAfricaAndEgyptRoute());
  rbSave();
}

function rbBuildSouthernAfricaSafariLoopRoute() {
  const mea = (code, name) => rbContentFor('Africa Grand Tour 🌍', code, name);
  return rbBuildSeedRoute('Zuidelijk Afrika Safari-lus 🦁', [
    {
      name: 'Zuid-Afrika, Lesotho & Eswatini', season: 'Juni–begin juli', budget: 2975,
      note: 'De opener, met een echte internationale luchthaven als instappunt (Kaapstad/Johannesburg) — Kruger-wildlife spotten is hier op zijn best, ruim vóór het regenseizoen.',
      countries: [mea('ZA', 'South Africa'), mea('LS', 'Lesotho'), mea('SZ', 'Eswatini')],
    },
    {
      name: 'Zuidelijk Afrika', season: 'Juli–oktober', budget: 14035,
      note: "Van Mozambique tot Malawi via Zimbabwe, Botswana, Namibië, Angola en Zambia — valt bij deze volgorde vrijwel volledig in het droge seizoen (mei-oktober), met de beste wildlife-observatie juist tegen het einde (augustus-oktober). De Angola-Zambia grensovergang in het zuidoosten van Angola is minder bereisd dan de rest van deze route — vooraf extra checken.",
      countries: [mea('MZ', 'Mozambique'), mea('ZW', 'Zimbabwe'), mea('BW', 'Botswana'), mea('NA', 'Namibia'), mea('AO', 'Angola'), mea('ZM', 'Zambia'), mea('MW', 'Malawi')],
    },
  ], {
    best_starting_month: 'Juni',
    travel_style: 'Overland/safaritrucks tussen parken, mix van budgetlodges en kamperen in de nationale parken.',
    climate_summary: "Een junistart legt Zuid-Afrika/Lesotho/Eswatini in het droge seizoen vlak vóór het regenseizoen (beste Kruger-wildlife), en laat de rest van zuidelijk Afrika (Mozambique t/m Malawi) in juli-oktober vallen — vrijwel volledig het gedeelde droge seizoen van de regio (mei-oktober), met de beste wildlife-observatie tegen het einde.",
    description: 'Van Zuid-Afrika via Mozambique, Zimbabwe, Botswana, Namibië en Angola naar Zambia en Malawi — een aaneengesloten safari-lus door zuidelijk Afrika.',
    notes: 'Losgesplitst van Africa Grand Tour 🌍 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Africa Grand Tour 🌍 (inclusief de 2026-07 zuid-noord-herordening en alle prijs-/visum-/reisadvies-verificaties, zoals de Namibië-correctie); alleen de expeditiegrens is nieuw. Africa Grand Tour 🌍 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildAfricaIslandsRoute() {
  const mea = (code, name) => rbContentFor('Africa Grand Tour 🌍', code, name);
  return rbBuildSeedRoute('Afrikaanse Eilanden 🏝️', [
    {
      name: 'Eilanden', season: 'Oktober–november', budget: 2650,
      note: 'Madagaskar en Mauritius — Madagaskars beruchte trage wegen zijn hier de grootste tijdsvreter, niet de bezienswaardigheden zelf.',
      countries: [mea('MG', 'Madagascar'), mea('MU', 'Mauritius')],
    },
  ], {
    best_starting_month: 'Oktober',
    travel_style: 'Losse vluchtsprong tussen de twee eilanden (geen landroute mogelijk over water).',
    climate_summary: 'Oktober-november is een goed droog venster voor beide eilanden.',
    description: 'Twee totaal verschillende eilandbestemmingen op één as: het avontuur/natuur van Madagaskar en het strand/luxe van Mauritius.',
    notes: 'Losgesplitst van Africa Grand Tour 🌍 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen en budgetten zijn ongewijzigd overgenomen uit Africa Grand Tour 🌍. Madagaskar en Mauritius zijn allebei op zichzelf ook een sterke standalone bestemming (en een compleet ander reistype) — hier samen omdat dat vluchttechnisch handig is, niet omdat ze thematisch bij elkaar horen; voel je vrij om er ook maar één van te doen. Africa Grand Tour 🌍 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildEastAfricaSafariClassicRoute() {
  const mea = (code, name) => rbContentFor('Africa Grand Tour 🌍', code, name);
  return rbBuildSeedRoute('Oost-Afrika Safari Classic 🦒', [
    {
      name: 'Oost-Afrika', season: 'November–januari', budget: 10320,
      note: "Tanzania, Rwanda, Oeganda en Kenia — landt in de korte regentijd (oktober-december, lichte middagbuien, goed te doen) en de daaropvolgende korte droge periode (januari-februari), inclusief het kalfseizoen van de zuidelijke Serengeti. Niet de absolute piek (juni-oktober), maar een erkend sterk alternatief.",
      countries: [mea('TZ', 'Tanzania'), mea('RW', 'Rwanda'), mea('UG', 'Uganda'), mea('KE', 'Kenya')],
    },
  ], {
    best_starting_month: 'November',
    travel_style: 'Overland/safaritrucks tussen de parken, verplichte lokale gidsen bij gorillatrekking in Oeganda en Rwanda.',
    climate_summary: 'November-januari valt in de korte regentijd (lichte middagbuien, goed te doen) en de daaropvolgende korte droge periode, inclusief het kalfseizoen van de zuidelijke Serengeti — niet de absolute piek (juni-oktober) maar een erkend sterk alternatief.',
    description: 'Klassieke Oost-Afrika safari: Serengeti, Maasai Mara en gorillatrekking in Oeganda en Rwanda.',
    notes: 'Losgesplitst van Africa Grand Tour 🌍 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen uit Africa Grand Tour 🌍 (inclusief de reisadvies-notities over Rwanda\'s Lake Kivu-stop en Uganda\'s DRC-grens/Ebola-situatie — zie de landnotities). Africa Grand Tour 🌍 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildHornOfAfricaAndEgyptRoute() {
  const mea = (code, name) => rbContentFor('Africa Grand Tour 🌍', code, name);
  return rbBuildSeedRoute('Hoorn van Afrika & Egypte 🏺', [
    {
      name: 'Hoorn van Afrika & Egypte', season: 'Februari–maart', budget: 3115,
      note: "Ethiopië en Egypte als afsluiting. Ethiopië's hoofdregenseizoen (kiremt) valt juni-september, dus dit venster (oktober-maart, piek december-februari) is zijn eigen goede tijd. Egypte profiteert van het koelere naseizoen in plaats van de vroege zomerhitte.",
      countries: [mea('ET', 'Ethiopia'), mea('EG', 'Egypt')],
    },
  ], {
    best_starting_month: 'Februari',
    travel_style: 'Vlucht tussen Ethiopië en Egypte (geen praktische landroute door Soedan).',
    climate_summary: "Ethiopië landt in zijn eigen goede venster (oktober-maart, piek december-februari, buiten het kiremt-regenseizoen van juni-september) en Egypte profiteert van het koelere naseizoen.",
    description: 'Historisch Ethiopië en het oude Egypte als tweeluik.',
    notes: "Losgesplitst van Africa Grand Tour 🌍 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen en budgetten zijn ongewijzigd overgenomen uit Africa Grand Tour 🌍. Egypte komt hiermee in twéé losse Route Builder-expedities voor — ook in Mediterranean Civilizations Expedition 🏛️'s 'Egypte & Arabisch Schiereiland'-etappe — exact het 'block komt in meerdere expedities terug'-patroon uit de modularisatie-analyse. ⚠️ Ethiopië's Amhara-regio (Lalibela/Gondar/Simien) en de Danakil Depressie stonden per 2026-07 nog rood/oranje op het Nederlandse reisadvies — zie Ethiopië's eigen notitie, en check nederlandwereldwijd.nl vlak voor een echte reis. Africa Grand Tour 🌍 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.",
  });
}

// ---- Mediterranean Civilizations Expedition split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// This expedition was already the best candidate for a full split: every region transition is
// already a flight or ferry (never overland), so the six routes below simply promote each of the
// six existing regions to its own standalone expedition. Countries, days, budgets and all
// per-country content (destinations/notes/transport_to_next) are copied verbatim from
// rbBuildMediterraneanExpeditionRoute() below — this route has no shared RB_EXPEDITION_CONTENT
// entry (Italy and France each appear more than once, so per CLAUDE.md its content lives inline
// instead), so the country objects are duplicated here rather than looked up. The original
// expedition itself is untouched and keeps existing exactly as it was, in full, alongside these six.

function rbSeedMediterraneanSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_MEDITERRANEAN_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_MEDITERRANEAN_SPLIT, '1');

  rbRoutes.push(
    rbBuildIberiaMaghrebRoute(),
    rbBuildMaltaItalyRoute(),
    rbBuildCorsicaSouthFranceRoute(),
    rbBuildGreeceCyprusRoute(),
    rbBuildAnatoliaRoute(),
    rbBuildEgyptArabianPeninsulaRoute(),
  );
  rbSave();
}

function rbBuildIberiaMaghrebRoute() {
  return rbBuildSeedRoute('Iberia & Marokko/Tunesië 🏰', [
    {
      name: 'Iberia & Maghreb',
      season: 'September',
      budget: 1270,
      note: 'Van Moors Spanje via Berbercultuur in Marokko naar Punisch/Romeins Tunesië — het westelijke Middellandse Zeegebied waar Feniciërs, Carthagers, Romeinen en de islamitische wereld elkaar opvolgden.',
      countries: [
        {
          code: 'ES', name: 'Spain', days: 10, budget: 600, lat: 37.3891, lng: -5.9845,
          destinations: ['Málaga', 'Granada (Alhambra)', 'Córdoba (Mezquita)', 'Sevilla'],
          notes: 'Openingsetappe: Moorse en Romeinse geschiedenis in Andalusië, van de Alhambra in Granada tot de Mezquita in Córdoba. Historische binnensteden als rustige start. Verborgen parel: Ronda, met zijn kloofbrug, als tussenstop tussen Málaga en Sevilla.',
          transport_to_next: 'Veerboot Tarifa/Algeciras-Tanger (35-90 minuten, meerdere afvaarten per dag) — kortste en goedkoopste oversteek naar Afrika, geen vlucht nodig',
        },
        {
          code: 'MA', name: 'Morocco', days: 10, budget: 450, lat: 31.6295, lng: -7.9811,
          destinations: ['Tanger', 'Chefchaouen', 'Fes', 'Volubilis', 'Marrakech'],
          notes: "Berbercultuur, islamitische geschiedenis en Romeinse overblijfselen (Volubilis) naast elkaar. Medina's van Fes en Marrakech en de blauwe stad Chefchaouen als hoogtepunten; treinen tussen de grote steden zijn goed en goedkoop.",
          transport_to_next: 'Vlucht Marrakech/Casablanca-Tunis — geen praktische land- of veerbootroute door de gesloten grens met Algerije',
        },
        {
          code: 'TN', name: 'Tunisia', days: 6, budget: 220, lat: 36.8065, lng: 10.1815,
          destinations: ['Tunis', 'Carthago', 'Dougga', 'El Jem', 'Sidi Bou Said'],
          notes: "Carthaagse beschaving (Carthago) en Romeins Noord-Afrika (Dougga, het amfitheater van El Jem, groter dan dat van Rome zelf) dicht bij elkaar; Sidi Bou Said als rustig, schilderachtig dorpje tussen de geschiedenis door.",
          transport_to_next: 'Einde van deze route — vlucht huiswaarts vanuit Tunis (of vlucht Tunis-Malta om verder te reizen naar Malta & Italië 🏛️)',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker — hostels met af en toe een hotel, veerboot Spanje-Marokko, vlucht Marokko-Tunesië (gesloten Algerijnse grens).',
    best_starting_month: 'September',
    description: 'Van Moors Spanje via Berbercultuur in Marokko naar Punisch/Romeins Tunesië.',
    climate_summary: 'September laat dit deel nog in het najaarszonnetje vallen — mild en minder druk dan hoogzomer.',
    notes: 'Losgesplitst van Mediterranean Civilizations Expedition 🏛️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen (inclusief de 2026-07 prijs-/visum-/reisadvies-verificatie). Vervolg op deze route: Malta & Italië 🏛️. Mediterranean Civilizations Expedition 🏛️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildMaltaItalyRoute() {
  return rbBuildSeedRoute('Malta & Italië 🏛️', [
    {
      name: 'Malta & Italië',
      season: 'Oktober',
      budget: 2775,
      note: 'Van tempels ouder dan de piramides (Malta) via Magna Graecia en Romeins Zuid-Italië naar het hart van het Romeinse Rijk, met de Nuraghe-beschaving van Sardinië als unieke afsluiter.',
      countries: [
        {
          code: 'MT', name: 'Malta', days: 5, budget: 375, lat: 35.8989, lng: 14.5146,
          destinations: ['Valletta', 'Mdina', 'Gozo', 'Ġgantija-tempels', 'Hypogeum'],
          notes: 'De Ġgantija-tempels en het Hypogeum zijn ouder dan de piramides van Gizeh — een van de oudste vrijstaande bouwwerken ter wereld. Daarnaast de Ridders van Malta in Valletta en Mdina, met een rustiger Gozo als tegenhanger.',
          transport_to_next: 'Veerboot Valletta-Pozzallo of Valletta-Catania (Virtu Ferries, 1,5-3 uur) naar Sicilië',
        },
        {
          code: 'IT', name: 'Italy', days: 10, budget: 650, lat: 38.1157, lng: 13.3613,
          destinations: ['Palermo', 'Cefalù', 'Taormina', 'Syracuse', 'Agrigento (Valle dei Templi)', 'Etna'],
          notes: 'Magna Graecia (Agrigento, Syracuse), Romeinse, Normandische en Arabische invloeden door elkaar op één eiland, met de Etna als natuurlijke afwisseling. Verborgen parel: het vissersdorpje Marzamemi, veel rustiger dan Taormina.',
          transport_to_next: 'Veerboot over de Straat van Messina (Messina-Villa San Giovanni, 20-30 minuten) naar het vasteland, dan verder naar Napels',
        },
        {
          code: 'IT', name: 'Italy', days: 6, budget: 450, lat: 40.8518, lng: 14.2681,
          destinations: ['Reggio Calabria', 'Napels', 'Pompeï', 'Herculaneum'],
          notes: 'Romeinse geschiedenis in het echt bevroren: Pompeï en Herculaneum, beide verwoest en geconserveerd door de Vesuvius. Napels zelf als levendige, chaotische contramal.',
          transport_to_next: 'Trein Napoli-Roma (hogesnelheidstrein, circa 1 uur 10 minuten)',
        },
        {
          code: 'IT', name: 'Italy', days: 7, budget: 700, lat: 41.9028, lng: 12.4964,
          destinations: ['Colosseum', 'Forum Romanum', 'Pantheon', 'Vaticaan'],
          notes: 'Het hart van het Romeinse Rijk en de klassieke geschiedenis waar de hele expeditie steeds weer naar teruggrijpt — Romeinse invloeden duiken ook op in Spanje, Tunesië, Turkije, Egypte en Jordanië.',
          transport_to_next: 'Vlucht Rome-Cagliari, of nachtveerboot Civitavecchia-Olbia/Cagliari (circa 7-8 uur) voor wie de boot verkiest boven vliegen',
        },
        {
          code: 'IT', name: 'Italy', days: 6, budget: 600, lat: 39.2238, lng: 9.1217,
          destinations: ['Cagliari', 'Su Nuraxi', 'Costa Smeralda'],
          notes: 'De Nuraghe-beschaving (Su Nuraxi, UNESCO) is uniek voor Sardinië en ouder dan de Romeinse aanwezigheid op het eiland. Costa Smeralda voor de kust, de rustigere Costa Verde als minder toeristisch alternatief.',
          transport_to_next: 'Einde van deze route — vlucht huiswaarts vanuit Cagliari/Olbia (of veerboot Santa Teresa Gallura-Bonifacio om verder te reizen naar Corsica & Zuid-Frankrijk ⛵)',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker — hostels met af en toe een hotel, veerboten tussen Malta/Sicilië/Sardinië, trein Napels-Rome, vlucht of nachtveerboot Rome-Sardinië.',
    best_starting_month: 'Oktober',
    description: 'Van tempels ouder dan de piramides op Malta via Magna Graecia en Romeins Zuid-Italië naar het hart van het Romeinse Rijk, met Sardinië als unieke afsluiter.',
    climate_summary: 'Oktober is een aangenaam najaar in Zuid-Italië en op de eilanden — minder toeristen, nog warm genoeg voor de veerboten. Let op de Malta-Sicilië-veerboot (Virtu Ferries): vaart het hele jaar door maar met minder afvaarten in het najaar en kans op annulering bij slecht weer — de belangrijkste risicoverbinding op deze route.',
    notes: 'Losgesplitst van Mediterranean Civilizations Expedition 🏛️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen. Vervolg op Iberia & Marokko/Tunesië 🏰; wordt zelf gevolgd door Corsica & Zuid-Frankrijk ⛵. Mediterranean Civilizations Expedition 🏛️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildCorsicaSouthFranceRoute() {
  return rbBuildSeedRoute('Corsica & Zuid-Frankrijk ⛵', [
    {
      name: 'Corsica & Zuid-Frankrijk',
      season: 'November',
      budget: 1075,
      note: "Twee Franse etappes die Bonifacio's kliffen en de Gallo-Romeinse monumenten van de Provence verbinden.",
      countries: [
        {
          code: 'FR', name: 'France', days: 5, budget: 475, lat: 41.9192, lng: 8.7386,
          destinations: ['Bonifacio', 'Ajaccio', 'Bavella'],
          notes: 'Mediterrane natuur op zijn best: de kalksteenkliffen van Bonifacio, de granieten naalden van Bavella. Franse en Italiaanse invloeden lopen hier door elkaar. Verborgen parel: het Scandola natuurreservaat, alleen per boot te bezoeken.',
          transport_to_next: 'Veerboot Ajaccio/Bastia-Marseille of Toulon (Corsica Ferries/La Méridionale, circa 6-10 uur, vaak als nachtboot)',
        },
        {
          code: 'FR', name: 'France', days: 6, budget: 600, lat: 43.2965, lng: 5.3698,
          destinations: ['Marseille', 'Arles', 'Nîmes', 'Pont du Gard'],
          notes: "Gallo-Romeinse geschiedenis (het aquaduct van de Pont du Gard, de arena's van Arles en Nîmes) in Provençaalse sfeer. Verborgen parel: de Camargue bij Arles, met wilde paarden en flamingo's, als natuurpauze.",
          transport_to_next: 'Einde van deze route — vlucht huiswaarts vanuit Marseille (of vlucht Marseille-Athene om verder te reizen naar Griekenland & Cyprus 🏺)',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker — nachtveerboot Corsica-vasteland.',
    best_starting_month: 'November',
    description: "Twee Franse etappes die Bonifacio's kliffen en de Gallo-Romeinse monumenten van de Provence verbinden.",
    climate_summary: 'November, aan het einde van het Corsicaanse/Zuid-Franse seizoen maar nog goed begaanbaar.',
    notes: 'Losgesplitst van Mediterranean Civilizations Expedition 🏛️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen en budgetten zijn ongewijzigd overgenomen. Dit is het kortste van de zes losgesplitste blocks (11 dagen) — precies vakantie-lengte, prima als losse Trip te boeken in plaats van als Route Builder-expeditie. Vervolg op Malta & Italië 🏛️. Mediterranean Civilizations Expedition 🏛️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildGreeceCyprusRoute() {
  return rbBuildSeedRoute('Griekenland & Cyprus 🏺', [
    {
      name: 'Griekenland & Cyprus',
      season: 'November-December',
      budget: 1690,
      note: 'Van de Griekse oudheid op het vasteland via de Minoïsche beschaving van Kreta naar de Grieks-Romeins-Byzantijnse laag van Cyprus, vlak voor de oversteek naar Anatolië.',
      countries: [
        {
          code: 'GR', name: 'Greece', days: 12, budget: 840, lat: 37.9838, lng: 23.7275,
          destinations: ['Athene', 'Delphi', 'Olympia', 'Meteora', 'Peloponnesos'],
          notes: 'Griekse oudheid, filosofie, democratie en mythologie op de belangrijkste locaties zelf: de Akropolis, het orakel van Delphi, de oorspronkelijke Olympische Spelen in Olympia. Verborgen parel: Monemvasia en Nafplio op de Peloponnesos, veel rustiger dan Athene.',
          transport_to_next: 'Nachtveerboot Piraeus-Heraklion (circa 7-9 uur) naar Kreta',
        },
        {
          code: 'GR', name: 'Greece', days: 7, budget: 450, lat: 35.3387, lng: 25.1442,
          destinations: ['Heraklion', 'Knossos', 'Chania', 'Samariakloof'],
          notes: 'De Minoïsche beschaving (Knossos) als oudste laag van de Griekse geschiedenis, gevolgd door eilandcultuur in Chania en een stevige wandeling door de Samariakloof. Verborgen parel: het roze zandstrand van Elafonisi, in het uiterste westen van het eiland.',
          transport_to_next: 'Vlucht Heraklion-Larnaca (meestal met overstap in Athene) — geen betrouwbare directe veerbootverbinding',
        },
        {
          code: 'CY', name: 'Cyprus', days: 5, budget: 400, lat: 35.1856, lng: 33.3823,
          destinations: ['Paphos', 'Limassol', 'Nicosia'],
          notes: 'Griekse, Romeinse en Byzantijnse lagen op één eiland: de mozaïeken van Paphos (UNESCO), het Romeinse theater van Kourion bij Limassol als verborgen parel, en de gedeelde hoofdstad Nicosia.',
          transport_to_next: 'Einde van deze route — vlucht huiswaarts vanuit Larnaca (of vlucht Larnaca-Istanbul om verder te reizen naar Anatolië 🕌)',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker — nachtveerboot Piraeus-Heraklion, vlucht Kreta-Cyprus (geen betrouwbare veerbootverbinding).',
    best_starting_month: 'November',
    description: 'Van de Griekse oudheid op het vasteland via de Minoïsche beschaving van Kreta naar de Grieks-Romeins-Byzantijnse laag van Cyprus.',
    climate_summary: 'November-december: een aangenaam Grieks najaar, minder toeristen, nog warm genoeg voor de veerboot naar Kreta.',
    notes: 'Losgesplitst van Mediterranean Civilizations Expedition 🏛️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen en budgetten zijn ongewijzigd overgenomen. Vervolg op Corsica & Zuid-Frankrijk ⛵; wordt zelf gevolgd door Anatolië 🕌. Mediterranean Civilizations Expedition 🏛️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildAnatoliaRoute() {
  return rbBuildSeedRoute('Anatolië 🕌', [
    {
      name: 'Anatolië',
      season: 'December',
      budget: 850,
      note: 'Eén grote etappe die Byzantium, het Ottomaanse Rijk en de Romeinse steden van de Egeïsche kust samenbrengt, met Cappadocië als brug naar de rest van Anatolië.',
      countries: [
        {
          code: 'TR', name: 'Turkey', days: 20, budget: 850, lat: 41.0082, lng: 28.9784,
          destinations: ['Istanbul', 'Troje', 'Pergamon', 'Efeze', 'Pamukkale', 'Cappadocië'],
          notes: 'Byzantijnse en Ottomaanse geschiedenis in Istanbul, Romeinse steden (Efeze, Pergamon) en oude Anatolische beschavingen (Troje) op één lijn, met de rotsformaties van Cappadocië en de kalksteenterrassen van Pamukkale als natuurlijke hoogtepunten. Verborgen parel: Assos en Aphrodisias, veel rustiger dan Efeze maar minstens zo indrukwekkend.',
          transport_to_next: 'Einde van deze route — vlucht huiswaarts vanuit Istanbul (of vlucht Istanbul-Caïro om verder te reizen naar Egypte & Arabisch Schiereiland 🐪)',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker — binnenlandse bussen/vluchten door Turkije.',
    best_starting_month: 'December',
    description: 'Byzantium, het Ottomaanse Rijk en de Romeinse steden van de Egeïsche kust, met Cappadocië als brug.',
    climate_summary: 'December: mild genoeg voor Istanbul en de Egeïsche kust, en de drukte van de zomer is voorbij.',
    notes: 'Losgesplitst van Mediterranean Civilizations Expedition 🏛️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen en budget zijn ongewijzigd overgenomen (20 dagen, na de 2026-07 tijdscontrole die dit van 14 naar 20 dagen ophoogde). Vervolg op Griekenland & Cyprus 🏺. Mediterranean Civilizations Expedition 🏛️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildEgyptArabianPeninsulaRoute() {
  return rbBuildSeedRoute('Egypte & Arabisch Schiereiland 🐪', [
    {
      name: 'Egypte & het Arabisch Schiereiland',
      season: 'December-Januari',
      budget: 2669,
      note: 'Van de oud-Egyptische beschaving via de Nabateese handelsroutes van Jordanië en de Arabische handelswereld van Oman en de Dilmun-beschaving van Bahrein naar het moderne Qatar als bewust hedendaags slotakkoord.',
      countries: [
        {
          code: 'EG', name: 'Egypt', days: 14, budget: 784, lat: 30.0444, lng: 31.2357,
          destinations: ['Caïro', 'Gizeh', 'Luxor', 'Karnak', 'Aswan', 'Abu Simbel'],
          notes: 'De oud-Egyptische beschaving in haar geheel: piramides (Gizeh), tempels (Karnak, Abu Simbel) en de Nijl als verbindende rode draad. Verborgen parel: de Siwa-oase, ver van de gebruikelijke route maar wel een omweg waard. Reisadvies (2026-07): geel voor Caïro/Gizeh/Luxor/Aswan/Abu Simbel — gewoon te bezoeken; alleen (Noord-)Sinaï buiten deze route is oranje/rood.',
          transport_to_next: 'Veerboot Nuweiba-Aqaba (alternatief: vlucht Caïro-Amman) — kortste route naar Jordanië zonder om te vliegen via de Golf',
        },
        {
          code: 'JO', name: 'Jordan', days: 8, budget: 500, lat: 31.9454, lng: 35.9284,
          destinations: ['Amman', 'Jerash', 'Petra', 'Wadi Rum', 'Dode Zee'],
          notes: "Nabateese handelsroutes (Petra), Romeinse geschiedenis (Jerash) en de woestijn van Wadi Rum. December geeft aangename dagtemperaturen voor de wandeling naar de Schatkamer en voor kamperen in Wadi Rum. Praktische tip: de Jordan Pass (~50-60 JOD, ruim vooraf online kopen) bundelt toegang tot Petra/Jerash/Wadi Rum/40 andere sites en scheldt de losse 40 JOD-visumfee kwijt bij een verblijf van 3+ nachten. ⚠️ Reisadvies (juli 2026): oranje voor heel Jordanië (normaal alleen de grensstreek met Syrië/Irak) door het regionale Iran-Israël/VS-conflict — check nederlandwereldwijd.nl vlak voor vertrek, dit kan alweer zijn gewijzigd.",
          transport_to_next: 'Vlucht Amman-Muscat — geen landroute, overland via Saoedi-Arabië is visumtechnisch onpraktisch',
        },
        {
          code: 'OM', name: 'Oman', days: 7, budget: 770, lat: 23.588, lng: 58.3829,
          destinations: ['Muscat', 'Nizwa', 'Jebel Shams', 'Wahiba Sands'],
          notes: 'Arabische handelsroutes, forten (Nizwa) en zowel bergen (Jebel Shams, de "Grand Canyon van Arabië") als woestijn (Wahiba Sands) op korte afstand van elkaar. Verborgen parel: Bahla Fort en de eeuwenoude falaj-irrigatiekanalen bij Nizwa (beide UNESCO). Prijscheck (2026-07): Jebel Shams en Wahiba Sands zijn niet met openbaar vervoer te doen — een huurauto (4x4) of tour is hier verplicht. ⚠️ Reisadvies (juli 2026): oranje voor Musandam/Duqm/Salalah/Sohar, maar geel — dit hele traject — voor Muscat/Nizwa/Jebel Shams/Wahiba Sands. Check nederlandwereldwijd.nl vlak voor vertrek, de situatie is volatiel.',
          transport_to_next: 'Vlucht Muscat-Manama — korte Golfvlucht',
        },
        {
          code: 'BH', name: 'Bahrain', days: 3, budget: 300, lat: 26.2285, lng: 50.586,
          destinations: ["Qal'at al-Bahrein (Bahrein Fort)", 'Bahrain National Museum', 'Al Fateh Grand Mosque', 'Tree of Life'],
          notes: "Qal'at al-Bahrein (UNESCO) was de hoofdstad van de Dilmun-beschaving, een Bronstijd-handelsbeschaving die al rond 2000 v.Chr. tussen Mesopotamië en de Indusvallei handelde. De Tree of Life, een eeuwenoude boom die op onverklaarde wijze midden in de woestijn overleeft, als natuurlijke curiositeit. ⚠️ Reisadvies (juli 2026): ROOD — niet reizen. Iran voert aanvallen uit op militaire doelen in Bahrein, met waarschuwingen voor mogelijke aanslagen in centraal Manama; geen Nederlandse ambassade in Bahrein (dichtstbijzijnde: Koeweit). Op dit moment een harde no-go, geen budget-/planningskwestie — check nederlandwereldwijd.nl vlak voor vertrek.",
          transport_to_next: 'Vlucht Manama-Doha — korte Golfvlucht',
        },
        {
          code: 'QA', name: 'Qatar', days: 3, budget: 315, lat: 25.2854, lng: 51.531,
          destinations: ['Doha'],
          notes: '⚠️ Reisadvies (juli 2026): oranje — Qatar is geraakt door Iraanse raketten/drones gericht op Amerikaanse doelen. Reizen wordt alleen aangeraden als het noodzakelijk is. Check nederlandwereldwijd.nl vlak voor vertrek, de situatie kan alweer zijn gewijzigd. Bewust modern en hedendaags als afsluiting: islamitische architectuur (Museum of Islamic Art) als contrast met de duizenden jaren geschiedenis eerder in de reis.',
          transport_to_next: 'Einde van de expeditie — terugvlucht vanuit Doha (Hamad International Airport) naar Nederland',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker — veerboot Egypte-Jordanië, vluchten tussen Jordanië/Oman/Bahrein/Qatar (geen praktische landroute).',
    best_starting_month: 'December',
    description: 'Van het oude Egypte via de Nabateese handelsroutes van Jordanië naar de Arabische handelswereld van Oman, Bahrein en Qatar.',
    climate_summary: 'December-januari is het beste seizoen voor de Egyptische/Jordaanse woestijn en de Golf — dagen rond 20-28°C in plaats van de 40+°C van de zomer.',
    notes: "Losgesplitst van Mediterranean Civilizations Expedition 🏛️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen (inclusief alle 2026-07 reisadvies-vlaggen op Jordanië/Oman/Bahrein/Qatar — zie de landnotities). Egypte komt hiermee in twéé losse Route Builder-expedities voor — ook in Africa Grand Tour 🌍's 'Hoorn van Afrika & Egypte'-etappe — exact het 'block komt in meerdere expedities terug'-patroon uit de modularisatie-analyse. Qatar is qua thema de uitzondering op de rest van deze route (puur modern, geen oude geschiedenis) en de eerste kandidaat om te laten vervallen als de reis korter moet — zie de oorspronkelijke route-notities. Vervolg op Anatolië 🕌. Mediterranean Civilizations Expedition 🏛️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.",
  });
}

// ---- Nordic Arctic Expedition split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// This expedition's own notes already call its four North Atlantic islands "stuk voor stuk losse
// vluchtsprongen, geen doorlopende route" — proof that proximity ("all Nordic") doesn't make a
// good single block. Rather than group them into one Major Trip, all five pieces below are kept as
// five equally-weighted standalone expeditions, per the analysis's own recommendation. Countries,
// days, budgets and all per-country content are reused as-is from
// RB_EXPEDITION_CONTENT['Nordic Arctic Expedition ❄️'] via rbContentFor() — the original
// expedition itself is untouched and keeps existing exactly as it was, in full, alongside these five.

function rbSeedNordicArcticSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_NORDIC_ARCTIC_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_NORDIC_ARCTIC_SPLIT, '1');

  rbRoutes.push(
    rbBuildScandinaviaOverlandRoute(),
    rbBuildSvalbardRoute(),
    rbBuildFaroeIslandsRoute(),
    rbBuildIcelandRoute(),
    rbBuildGreenlandRoute(),
  );
  rbSave();
}

function rbBuildScandinaviaOverlandRoute() {
  const arctic = (code, name) => rbContentFor('Nordic Arctic Expedition ❄️', code, name);
  return rbBuildSeedRoute('Scandinavië Overland 🚂', [
    {
      name: 'Scandinavia', season: 'Juni', budget: 4400,
      note: 'Lapland en Noorse fjorden/eilanden per trein en bus — het enige écht overland-verbonden deel van de oorspronkelijke Nordic Arctic Expedition.',
      countries: [arctic('FI', 'Finland'), arctic('SE', 'Sweden'), arctic('NO', 'Norway')],
    },
  ], {
    best_starting_month: 'Juni',
    travel_style: 'Trein/bus door Lapland en Noorse fjorden — geen vlucht nodig binnen deze route.',
    climate_summary: 'Begin juni geeft middernachtzon in alle drie de landen en het beste weer voor de treinroute Rovaniemi-Kiruna-Narvik.',
    description: 'Van Lapland via Zweeds Lapland naar de Noorse fjorden en Lofoten, volledig per trein en bus.',
    notes: 'Losgesplitst van Nordic Arctic Expedition ❄️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen en budgetten zijn ongewijzigd overgenomen. Nordic Arctic Expedition ❄️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildSvalbardRoute() {
  const arctic = (code, name) => rbContentFor('Nordic Arctic Expedition ❄️', code, name);
  return rbBuildSeedRoute('Svalbard 🐻‍❄️', [
    { name: 'Svalbard', season: 'Juli', budget: 900, note: 'Longyearbyen zelf met 1-2 dagtours — geen meerdaagse expeditieboot meer (2026-08, op Youri\'s verzoek).', countries: [arctic('SJ', 'Svalbard')] },
  ], {
    best_starting_month: 'Juli',
    travel_style: 'Longyearbyen als basis, met 1-2 gegidste dagtours (bv. boottocht naar Pyramiden, sneeuwscooter-/hondensleetocht richting Barentsburg); buiten de plaats is een gewapende gids (ijsberen) verplicht, al inbegrepen in de tours.',
    climate_summary: 'Juli-augustus is het enige venster met toegankelijk zee-ijs, betrouwbare boottochten en middernachtzon.',
    description: 'Gletsjers, wildlife en middernachtzon op Spitsbergen, ingekort tot Longyearbyen zelf.',
    notes: 'Losgesplitst van Nordic Arctic Expedition ❄️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Nordic Arctic Expedition ❄️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.\n\n' +
      "Ingekort (2026-08, op Youri's verzoek): van 8 dagen/€3.725 (meerdaagse gegidste bootexpeditie) naar 4 dagen/€900 — alleen Longyearbyen zelf met 1-2 dagtours i.p.v. een meerdaagse expeditieboot. Coördinaten per bestemming toegevoegd.",
  });
}

function rbBuildFaroeIslandsRoute() {
  const arctic = (code, name) => rbContentFor('Nordic Arctic Expedition ❄️', code, name);
  return rbBuildSeedRoute('Faeröer 🐑', [
    { name: 'Faroe Islands', season: 'Juli–augustus', budget: 1675, note: 'Betrouwbaardere veerdiensten en het beste wandelweer in deze maanden.', countries: [arctic('FO', 'Faroe Islands')] },
  ], {
    best_starting_month: 'Juli',
    travel_style: 'Lokale bussen/veerboten tussen de eilanden.',
    climate_summary: 'Juli-augustus geeft het meest stabiele weer voor de kliffen en wandelroutes.',
    description: 'Dramatische kliffen, groene dorpjes en wandelroutes tussen Tórshavn en Gjógv.',
    notes: 'Losgesplitst van Nordic Arctic Expedition ❄️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen en budget zijn ongewijzigd overgenomen. Nordic Arctic Expedition ❄️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildIcelandRoute() {
  const arctic = (code, name) => rbContentFor('Nordic Arctic Expedition ❄️', code, name);
  return rbBuildSeedRoute('IJsland ❄️', [
    { name: 'Iceland', season: 'Juli–augustus', budget: 2800, note: 'Volledig open hooglandwegen; buiten dit venster zijn delen van het land niet bereikbaar.', countries: [arctic('IS', 'Iceland')] },
  ], {
    best_starting_month: 'Juli',
    travel_style: 'Huurauto (vrijwel noodzakelijk voor de Ring Road en het hoogland).',
    climate_summary: 'Juli-augustus houdt de hooglandwegen volledig open — daarbuiten zijn grote delen van het binnenland afgesloten.',
    description: 'De Golden Circle, de zuidkust, Vatnajökull en Snæfellsnes met de huurauto.',
    notes: "Losgesplitst van Nordic Arctic Expedition ❄️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen en budget zijn ongewijzigd overgenomen (incl. het gele reisadvies voor het Reykjanes-schiereiland door de aanhoudende vulkanische activiteit bij Grindavík). IJsland is een van de meest geboekte standalone trips ter wereld — dit blok staat volledig op zichzelf. Nordic Arctic Expedition ❄️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.",
  });
}

function rbBuildGreenlandRoute() {
  const arctic = (code, name) => rbContentFor('Nordic Arctic Expedition ❄️', code, name);
  return rbBuildSeedRoute('Groenland 🧊', [
    { name: 'Greenland', season: 'Juli–augustus', budget: 3725, note: 'Beste boottoegang tot de Diskobaai-ijsbergen bij Ilulissat.', countries: [arctic('GL', 'Greenland')] },
  ], {
    best_starting_month: 'Juli',
    travel_style: 'Binnenlandse vluchten tussen plaatsen (Air Greenland, vrijwel monopolie) — een structurele kostenpost, geen incident.',
    climate_summary: 'Juli-augustus geeft de beste boottoegang tot de ijsbergen van de Diskobaai en de meest betrouwbare binnenlandse vluchten.',
    description: 'Inuitcultuur, de IJsfjord en de ijsbergen van de Diskobaai bij Ilulissat.',
    notes: 'Losgesplitst van Nordic Arctic Expedition ❄️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen en budget zijn ongewijzigd overgenomen. Nordic Arctic Expedition ❄️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

// ---- Patagonia & Antarctica Expedition split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// This expedition's own notes already say Chile/Argentina here are only the southern (Patagonia)
// portions — the northern portions live in Pan-American Grand Tour — and that Antarctica is only
// reachable via a totally separate cruise booking. The two routes below make that split concrete:
// Antarctica in particular is the cleanest "plug-in" block in the whole analysis (no neighbouring
// countries, its own budget logic). Countries, days, budgets and all content are reused as-is from
// RB_EXPEDITION_CONTENT['Patagonia & Antarctica Expedition 🧊'] via rbContentFor() — the original
// expedition itself is untouched and keeps existing exactly as it was, in full, alongside these two.

function rbSeedPatagoniaSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_PATAGONIA_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_PATAGONIA_SPLIT, '1');

  rbRoutes.push(rbBuildPatagoniaOverlandRoute(), rbBuildAntarcticaCruiseRoute());
  rbSave();
}

function rbBuildPatagoniaOverlandRoute() {
  const patagonia = (code, name) => rbContentFor('Patagonia & Antarctica Expedition 🧊', code, name);
  return rbBuildFlatSeedRoute('Patagonië Overland 🏔️', [
    patagonia('CL', 'Chile'),
    patagonia('AR', 'Argentina'),
    {
      code: 'CL', name: 'Chile', days: 9, budget: 1200, lat: -51.7236, lng: -72.4875,
      destinations: [
        { name: 'Puerto Natales', lat: -51.7236, lng: -72.4875 },
        { name: 'Torres del Paine National Park', lat: -50.9423, lng: -73.0357 },
        { name: 'Punta Arenas (dagtrip Isla Magdalena)', lat: -53.1638, lng: -70.9171 },
      ],
      transport_to_next: 'Vanaf Punta Arenas de veerboot over de Straat van Magellaan (Punta Delgada-Bahía Azul), dan de grensovergang bij San Sebastián en de weg naar Río Grande/Ushuaia — geen omweg via Puerto Natales meer nodig.',
      notes: "Prijs geverifieerd (2026-07), klopt. Torres del Paine-piek: refugio-overnachtingen incl. maaltijden lopen op tot $100-150/nacht — buiten het park blijft het dagtarief haalbaar. Punta Arenas is een bewuste dagtrip voor Isla Magdalena's pinguïnkolonie (alleen vandaar bereikbaar, niet vanuit Puerto Natales) — de reis gaat daarna direct verder naar Vuurland, geen terugreis naar Puerto Natales nodig (2026-08).",
    },
    {
      code: 'AR', name: 'Argentina', days: 8, budget: 1055, lat: -54.8019, lng: -68.303,
      destinations: [
        { name: 'Ushuaia', lat: -54.8019, lng: -68.303 },
        { name: 'Tierra del Fuego National Park', lat: -54.85, lng: -68.5833 },
        { name: 'Beagle Channel', lat: -54.87, lng: -67.9 },
      ],
      transport_to_next: 'Aankomst in Ushuaia — eindpunt van deze standalone route (de Antarctica-cruise zit in het losse blok Antarctica-cruise 🐧, niet hier).',
      notes: "Vuurland-etappe, losgekoppeld van El Calafate/El Chaltén (2026-08) zodat de landvolgorde de echte grensovergangen volgt. Argentinië vereist sinds juli 2025 bewijs van reis-/zorgverzekering bij binnenkomst.",
    },
  ], {
    best_starting_month: 'November',
    travel_style: 'Backpacker/trekking — refugios en camping in de nationale parken, lokale bussen tussen de Patagonische steden.',
    climate_summary: 'Begin november valt samen met het begin van het Patagonische trekkingseizoen (november-maart, refugios open, lange dagen) — vóór die tijd liggen Torres del Paine en de paden rond El Chaltén nog onder de sneeuw.',
    description: 'Trekkingexpeditie door Chileens en Argentijns Patagonië: Torres del Paine, Fitz Roy en Ushuaia.',
    notes: "Losgesplitst van Patagonia & Antarctica Expedition 🧊 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen en budgetten zijn ongewijzigd overgenomen. 'Patagonië' is wereldwijd al een gewild standalone reisthema — dit blok staat volledig op zichzelf. Chili en Argentinië hier zijn nadrukkelijk alleen het zuidelijke (Patagonische) deel van die landen; het noordelijke deel zit in Pan-American Grand Tour 🌎's Andes Grand Traverse 🦙 en Zuidelijke Kegel & Brazilië-finale 🧉 — exact het 'zelfde land, ander block'-patroon uit de modularisatie-analyse. Patagonia & Antarctica Expedition 🧊 zelf blijft ongewijzigd bestaan als losse, volledige expeditie (incl. de aansluitende Antarctica-cruise 🐧).\n\n" +
      "Grote routelogica-herziening (2026-08): zelfde herziening als Patagonia & Antarctica Expedition 🧊 zelf — route van 2 naar 4 etappes (Chili-Noord, Argentinië-Calafate/El Chaltén, Chili-Zuid, Argentinië-Vuurland), zodat de landvolgorde de echte grensovergangen volgt (overland via Argentinië om de Carretera Austral-Puerto Natales-kloof te overbruggen, geen Punta Arenas-terugreis meer nodig). Zie Patagonia & Antarctica Expedition 🧊's eigen notities voor de volledige uitleg. Landen/dagen/budget-totaal ongewijzigd: 42 dagen, €5.575 — alleen opgesplitst in 4 etappes.",
  });
}

function rbBuildAntarcticaCruiseRoute() {
  const patagonia = (code, name) => rbContentFor('Patagonia & Antarctica Expedition 🧊', code, name);
  return rbBuildFlatSeedRoute('Antarctica-cruise 🐧', [
    patagonia('AQ', 'Antarctica'),
  ], {
    best_starting_month: 'December',
    travel_style: 'Uitsluitend per georganiseerde expeditiecruise vanuit Ushuaia — geen andere manier om er te komen.',
    climate_summary: 'Het vaarseizoen loopt november-maart, met de meeste walvis-/pinguïnactiviteit in januari-februari.',
    description: 'Expeditiecruise vanuit Ushuaia naar het Antarctisch Schiereiland: gletsjers, pinguïnkolonies en walvissen.',
    notes: 'Losgesplitst van Patagonia & Antarctica Expedition 🧊 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Dagen en budget (een reële cruiseprijs, geen backpacker-dagbudget) zijn ongewijzigd overgenomen. Dit is het schoonste "plug-in"-blok uit de hele modularisatie-analyse: geen buurlanden, eigen boekingscategorie, makkelijk los te boeken vanuit Ushuaia of aansluitend op Patagonië Overland 🏔️. Patagonia & Antarctica Expedition 🧊 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

// ---- India & Himalaya Expedition split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// This expedition was seeded flat, with its own notes inviting exactly this: "group these 3
// countries into your own blocks... whenever you're ready to plan it for real." The three routes
// below do that as three standalone expeditions instead of sub-blocks of one, since all three are
// strong enough to stand fully alone. Countries, days, budgets and all content are reused as-is
// from RB_EXPEDITION_CONTENT['India & Himalaya Expedition 🏔️'] via rbContentFor() — the original
// expedition itself is untouched and keeps existing exactly as it was, in full, alongside these three.

function rbSeedHimalayaSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_HIMALAYA_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_HIMALAYA_SPLIT, '1');

  rbRoutes.push(rbBuildNorthIndiaRoute(), rbBuildNepalRoute(), rbBuildBhutanRoute());
  rbSave();
}

function rbBuildNorthIndiaRoute() {
  const himalaya = (code, name) => rbContentFor('India & Himalaya Expedition 🏔️', code, name);
  return rbBuildFlatSeedRoute('Noord-India 🕌', [
    himalaya('IN', 'India'),
  ], {
    best_starting_month: 'Oktober',
    travel_style: 'Trein en lokale bus, met een binnenlandse vlucht als de afstand dat rechtvaardigt.',
    climate_summary: 'Begin oktober, net na de moesson, is Noord-India in zijn aangename koele seizoen — droog, heldere lucht, comfortabel tot in december.',
    description: 'Rajasthan, Manali en Varanasi (Delhi, Agra en Amritsar/Dharamshala zijn al eerder bezocht, dus niet meer als bezienswaardigheid in deze route).',
    notes: 'Losgesplitst van India & Himalaya Expedition 🏔️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen en budget zijn ongewijzigd overgenomen. India & Himalaya Expedition 🏔️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.\n\n' +
      "Routelogica-herziening (2026-08): zelfde ronde als de hoofdexpeditie — Agra/Taj Mahal, Amritsar/Gouden Tempel en Dharamshala/McLeod Ganj geschrapt (al bezocht door Youri), Udaipur-Manali nu rechtstreeks, coördinaten toegevoegd. Zie India & Himalaya Expedition 🏔️'s eigen notities voor de volledige uitleg. Nieuw totaal: 22 dagen, €935 (was 30 dagen/€1.275).",
  });
}

function rbBuildNepalRoute() {
  const himalaya = (code, name) => rbContentFor('India & Himalaya Expedition 🏔️', code, name);
  return rbBuildFlatSeedRoute('Nepal 🏔️', [
    himalaya('NP', 'Nepal'),
  ], {
    best_starting_month: 'November',
    travel_style: 'Georganiseerde trekking met lokale gids/porter (sinds 2023 verplicht, solo trekken mag niet meer).',
    climate_summary: 'November is het beste trekkingvenster van het jaar: net na de moesson, helderste zicht op de bergen, nog vóór winterse sneeuwval op de hoge passen.',
    description: 'Trekking in de Annapurna Region, plus Kathmandu, Pokhara en Chitwan National Park.',
    notes: 'Losgesplitst van India & Himalaya Expedition 🏔️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen en budget zijn ongewijzigd overgenomen (incl. de 2026-07 prijscorrectie voor de verplichte gids/porter op Annapurna-trekdagen). India & Himalaya Expedition 🏔️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.\n\n' +
      'Routelogica-herziening (2026-08): coördinaten per bestemming toegevoegd; TIMS wordt in de praktijk niet meer gecontroleerd op Annapurna-paden en TAAN heeft de minimum-2-trekkers-eis geschrapt (22 maart 2026) — zie India & Himalaya Expedition 🏔️\'s eigen Nepal-notities voor details.',
  });
}

function rbBuildBhutanRoute() {
  const himalaya = (code, name) => rbContentFor('India & Himalaya Expedition 🏔️', code, name);
  return rbBuildFlatSeedRoute('Bhutan 🐉', [
    himalaya('BT', 'Bhutan'),
  ], {
    best_starting_month: 'December',
    travel_style: 'Verplichte lokale gids en vaste dagprijs (Sustainable Development Fee inbegrepen).',
    climate_summary: 'November-december valt nog binnen Bhutans goede seizoen.',
    description: 'Het besloten koninkrijk Bhutan: Paro, Thimphu en Tiger\'s Nest Monastery.',
    notes: 'Losgesplitst van India & Himalaya Expedition 🏔️ als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen en budget zijn ongewijzigd overgenomen. Bhutan is qua duur en logistiek vooral interessant als verlengstuk van Nepal/India (verplichte gids + $100/nacht sustainable fee), maar staat hier ook als volwaardige eigen expeditie klaar voor wie alleen Bhutan wil doen. India & Himalaya Expedition 🏔️ zelf blijft ongewijzigd bestaan als losse, volledige expeditie.\n\n' +
      "Routelogica-herziening (2026-08): coördinaten per bestemming toegevoegd; Bumthang-uitstap nu per vlucht Paro-Bumthang i.p.v. de lange terugrit over de weg (Youri's voorkeur); nieuwe 5% GST op toeristische diensten sinds 1 januari 2026 genoteerd — zie India & Himalaya Expedition 🏔️'s eigen Bhutan-notities voor details.",
  });
}

// ---- North America Grand Traverse split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// This expedition's own transport strategy already splits itself into 3 separate rental-car legs
// plus 1 train leg specifically to dodge one-way fees and CA/US cross-border rental restrictions —
// that structure is exactly the seam the three routes below use. Countries, days, budgets, region
// order and all leg content are copied verbatim from rbBuildNorthAmericaRoute() below — this route
// has no shared RB_EXPEDITION_CONTENT entry (Canada and the US each appear as multiple distinct
// legs, so per CLAUDE.md its content lives inline instead). The original expedition itself is
// untouched and keeps existing exactly as it was, in full, alongside these three.

function rbSeedNorthAmericaSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_NORTHAMERICA_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_NORTHAMERICA_SPLIT, '1');

  rbRoutes.push(rbBuildEasternCanadaRoute(), rbBuildWesternCanadaRockiesVancouverRoute(), rbBuildUSWestCoastRoadtripRoute());
  rbSave();
}

function rbBuildEasternCanadaRoute() {
  return rbBuildSeedRoute('Oost-Canada 🍁', [
    {
      name: 'Atlantic Canada – Nova Scotia',
      season: 'Juni',
      budget: 900,
      countries: [{
        code: 'CA', name: 'Canada', days: 8, budget: 1200, lat: 44.6488, lng: -63.5752,
        destinations: ['Halifax', "Peggy's Cove", 'Lunenburg', 'Cape Breton Island & Cabot Trail'],
        transport_to_next: 'Vlucht Halifax-Quebec City (~2 uur) — geen praktische overlandroute gezien de afstand door onbewoond Oost-Canada',
        notes: 'Startblok: vlucht Nederland-Halifax. Kennismaking met Canada via ruige Atlantische kust, vissersdorpjes, vuurtorens en Keltisch/Acadische cultuur op Cape Breton. Prijs geverifieerd (2026-07), klopt. eTA (bij inreis per vlucht) kost slechts ~€4,70, 5 jaar geldig.',
      }],
      note: 'Startpunt — vlucht Nederland-Halifax. Ruige kust, vissersdorpen en vuurtorens; geen huurauto nodig, alles is met kleine afstanden te doen vanuit Halifax.',
    },
    {
      name: 'Eastern Canada – Historic Cities',
      season: 'Juni',
      budget: 1500,
      countries: [{
        code: 'CA', name: 'Canada', days: 10, budget: 1675, lat: 46.8139, lng: -71.208,
        destinations: ['Quebec City (Vieux-Québec)', 'Montreal (Old Port & Mile End)', 'Ottawa (Parliament Hill & musea)', 'Toronto (skyline, met Niagara Falls als dagtrip)'],
        transport_to_next: 'Einde van deze route — terugvlucht vanuit Toronto (of vlucht Toronto-Calgary om verder te reizen naar West-Canada: Rockies & Vancouver 🏔️)',
        notes: 'Geen lange autorit door Canada: de treinverbindingen tussen deze vier steden zijn snel en comfortabel. Franse cultuur en koloniale geschiedenis in Quebec City, eten en moderne stad in Montreal, politiek en musea in Ottawa, skyline en Niagara Falls vanuit Toronto.',
      }],
      note: 'Reizen per trein, geen huurauto in dit blok. Niagara Falls is een optionele dagtrip vanuit Toronto, geen apart blok.',
    },
  ], {
    travel_style: 'Backpacker/budget-comfort hybride — hostels en eenvoudige hotels, trein (Via Rail) tussen de historische steden, geen huurauto nodig.',
    best_starting_month: 'Juni',
    description: 'Van de ruige Atlantische kust van Nova Scotia via de trein naar de Franse/koloniale steden Quebec City, Montreal, Ottawa en Toronto.',
    climate_summary: 'Begin juni geeft lange dagen en blijft ruim vóór het Atlantische orkaanseizoen dat richting Nova Scotia in augustus-oktober oploopt.',
    notes: 'Losgesplitst van North America Grand Traverse 🌎 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen. Vervolg op deze route: West-Canada: Rockies & Vancouver 🏔️. North America Grand Traverse 🌎 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildWesternCanadaRockiesVancouverRoute() {
  return rbBuildSeedRoute('West-Canada: Rockies & Vancouver 🏔️', [
    {
      name: 'Canadian Rockies',
      season: 'Juni-Juli',
      budget: 2600,
      countries: [{
        code: 'CA', name: 'Canada', days: 17, budget: 3400, lat: 51.1784, lng: -115.5708,
        destinations: ['Banff National Park', 'Lake Louise & Moraine Lake', 'Yoho National Park (Emerald Lake)', 'Icefields Parkway', 'Jasper National Park', 'Mount Robson Provincial Park', 'Whistler'],
        transport_to_next: 'Auto Whistler-Vancouver (~2 uur), huurauto inleveren in Vancouver — dezelfde huurauto blijft binnen Canada, dus geen one-way- of grenskosten',
        notes: 'Het natuurhoogtepunt van de hele expeditie: gletsjermeren, een van de mooiste wegen ter wereld (Icefields Parkway) en goede kans op wildlife (elanden, beren, bighorn sheep). Huurauto wordt hier opgehaald in Calgary. Prijs geverifieerd (2026-07), klopt (mits ruim vooraf geboekt in hoogseizoen). ⚠️ Moraine Lake Road is alleen bereikbaar met de verplichte Parks Canada-shuttle (geen privéauto toegestaan) — boeking opent doorgaans medio april, beperkt aantal plekken, ruim vooraf regelen.',
      }],
      note: 'Huurauto (Calgary-Vancouver). Reken op minstens 2-3 nachten per nationaal park om ook te kunnen wandelen, niet alleen doorrijden.',
    },
    {
      name: 'Vancouver',
      season: 'Juli',
      budget: 700,
      countries: [{
        code: 'CA', name: 'Canada', days: 5, budget: 875, lat: 49.2827, lng: -123.1207,
        destinations: ['Stanley Park', 'Granville Island', 'North Shore (Grouse Mountain / Capilano Suspension Bridge)', 'Gastown & Kitsilano Beach'],
        transport_to_next: 'Einde van deze route — terugvlucht vanuit Vancouver (of trein/bus naar Seattle om verder te reizen naar VS Westkust Roadtrip 🌉)',
        notes: 'Laatste Canadese stop: stad tussen bergen en zee, goed te combineren met bergen (North Shore) en water (Stanley Park, Granville Island) zonder huurauto.',
      }],
      note: 'Geen huurauto nodig in Vancouver zelf.',
    },
  ], {
    travel_style: "Backpacker/budget-comfort hybride — huurauto voor de Rockies (Calgary-Vancouver, blijft binnen Canada, geen grenscomplicaties), geen auto nodig in Vancouver zelf.",
    best_starting_month: 'Juni',
    description: 'De Canadian Rockies (Banff, Lake Louise, Icefields Parkway, Jasper) gevolgd door Vancouver.',
    climate_summary: 'Juni-juli vermijdt restsneeuw en gesloten passen/wegen in de Rockies (Icefields Parkway, hooggelegen hikes) van een vroegere start.',
    notes: 'Losgesplitst van North America Grand Traverse 🌎 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen (incl. de waarschuwing over de verplichte Moraine Lake Road-shuttle). Dit is een van de meest klassieke standalone Canada-trips die er zijn. Vervolg op Oost-Canada 🍁. North America Grand Traverse 🌎 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildUSWestCoastRoadtripRoute() {
  return rbBuildSeedRoute('VS Westkust Roadtrip 🌉', [
    {
      name: 'Pacific Northwest & Northern California Roadtrip',
      season: 'Juli-Augustus',
      budget: 2200,
      countries: [{
        code: 'US', name: 'United States', days: 15, budget: 3000, lat: 47.6062, lng: -122.3321,
        destinations: ['Seattle (Pike Place Market, Space Needle)', 'Olympic National Park (Hoh Rainforest & Hurricane Ridge)', 'Mount Rainier National Park', 'Oregon Coast (Cannon Beach, Astoria)', 'Redwood National & State Parks'],
        transport_to_next: 'Auto verder naar San Francisco (~5-6 uur vanaf de Redwoods), huurauto inleveren in San Francisco',
        notes: 'Amerikaanse natuur in het groot: regenwoud, vulkanen, ruige kustlijn en de hoogste bomen ter wereld. Huurauto wordt hier opgehaald in Seattle. Prijs geverifieerd (2026-07), klopt. ESTA is per 30 sept. 2025 verhoogd naar $40,27 (was $21) — 2 jaar geldig.',
      }],
      note: 'Huurauto (Seattle-San Francisco). Rustig tempo: liever 2-3 nachten bij een park dan elke dag doorrijden — dit is een kustroute, geen race.',
    },
    {
      name: 'California Finale',
      season: 'Augustus',
      budget: 2100,
      countries: [{
        code: 'US', name: 'United States', days: 14, budget: 2675, lat: 37.7749, lng: -122.4194,
        destinations: ['San Francisco (Golden Gate Bridge, Alcatraz, Mission District)', 'Yosemite Valley', 'Sequoia & Kings Canyon National Parks'],
        transport_to_next: 'Einde van de expeditie — terugvlucht vanuit San Francisco (SFO) naar Nederland',
        notes: "Van de stad direct de bergen in: Yosemite's granieten wanden en watervallen, gevolgd door de gigantische sequoia's van Sequoia/Kings Canyon. Geen nieuwe huurauto nodig — dagtochten of een korte huurperiode volstaan vanuit San Francisco.",
      }],
      note: 'Boek Yosemite Valley-verblijf ruim van tevoren (vergunt beperkt aantal plekken in hoogseizoen). Let op bosbrandrisico/luchtkwaliteit in augustus — check actuele parkmeldingen vlak voor vertrek.',
    },
  ], {
    travel_style: "Backpacker/budget-comfort hybride — huurauto Seattle-San Francisco, rustig tempo met langere stops op mooie plekken in plaats van dagelijks verplaatsen.",
    best_starting_month: 'Juli',
    description: 'Klassieke Amerikaanse westkust-roadtrip: Seattle, Olympic en Mount Rainier National Park, de Oregon-kust en de Redwoods, met San Francisco, Yosemite en Sequoia/Kings Canyon als finale.',
    climate_summary: 'Juli-augustus blijft ruim vóór de piek van het Californische/Pacific Northwest bosbrandseizoen (vooral augustus-oktober).',
    notes: "Losgesplitst van North America Grand Traverse 🌎 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen (incl. de ESTA-prijsverhoging en de waarschuwing over bosbrandrisico in augustus). Vervolg op West-Canada: Rockies & Vancouver 🏔️. North America Grand Traverse 🌎 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.",
  });
}

// ---- Oceania Grand Expedition split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// This expedition's own climate_summary already frames it as two seasonally distinct halves
// (Pacific islands + tropical Australia want the May-October dry season; temperate Australia + NZ
// want their own November-March summer) and even suggests a deliberate multi-month pause between
// them. The four routes below go one step further and split each half into its own two pieces —
// Australia itself gets split by climate zone, the same "same country, different block" pattern
// already used for Chile/Argentina across Pan-American/Patagonia. Countries, days, budgets, region
// order and all leg content are copied verbatim from rbBuildOceaniaExpeditionRoute() below — this
// route has no shared RB_EXPEDITION_CONTENT entry (Australia and New Zealand each appear as
// multiple distinct legs, so per CLAUDE.md its content lives inline instead). The original
// expedition itself is untouched and keeps existing exactly as it was, in full, alongside these four.

function rbSeedOceaniaSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_OCEANIA_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_OCEANIA_SPLIT, '1');

  rbRoutes.push(rbBuildPacificIslandsRoute(), rbBuildTropicalOutbackAustraliaRoute(), rbBuildTemperateSouthernAustraliaRoute(), rbBuildNewZealandRoute());
  rbSave();
}

function rbBuildPacificIslandsRoute() {
  return rbBuildSeedRoute('Pacific-eilanden 🌺', [
    {
      name: 'Pacific Opener',
      season: 'Mei-juni',
      budget: 4125,
      note: 'Vijf eilandengroepen in het droge seizoen, ruim vóór het cycloonseizoen (november-april).',
      countries: [
        {
          code: 'FJ', name: 'Fiji', days: 14, budget: 1050, lat: -17.7765, lng: 177.4356,
          destinations: ['Nadi', 'Mamanuca-eilanden', 'Yasawa-eilanden', 'Taveuni'],
          notes: "Beste backpacker-infrastructuur van de Pacific — eilandhoppen per boot (Yasawa Flyer) tussen de Mamanucas en Yasawas, snorkelen en duiken op de koraalriffen. Prijscorrectie (2026-07): €62,50→€75/dag (Yasawa Flyer-bootpas + vlucht naar Taveuni waren niet gedekt).",
          transport_to_next: 'Vlucht Nadi-Port Vila (Fiji Airways, de belangrijkste Pacific-hub)',
        },
        {
          code: 'VU', name: 'Vanuatu', days: 11, budget: 1045, lat: -17.7333, lng: 168.3273,
          destinations: ['Port Vila', 'Mount Yasur (Tanna)', 'SS President Coolidge wrak (Espiritu Santo)', 'Blue Holes'],
          notes: "Een van de meest toegankelijke actieve vulkanen ter wereld — tot vlak bij de kraterrand van Mount Yasur. Wereldklasse wrakduik op de SS President Coolidge. Prijscorrectie (2026-07): €70→€95/dag (binnenlandse vluchten naar Tanna/Santo + Yasur-tour waren niet gedekt; Air Vanuatu ging in 2024 failliet, vluchten zijn schaarser/duurder geworden).",
          transport_to_next: 'Vlucht Port Vila-Apia (meestal met overstap via Fiji of Auckland)',
        },
        {
          code: 'WS', name: 'Samoa', days: 9, budget: 565, lat: -13.8506, lng: -171.7513,
          destinations: ['Apia', 'To Sua Ocean Trench', 'Lalomanu (beach fales)', 'Upolu'],
          notes: "Authentieke Polynesische cultuur, nog weinig aangetast door massatoerisme. Beach fales zijn traditionele, budgetvriendelijke strandhutjes. Prijs geverifieerd (2026-07), klopt — relatief goedkoop voor de Pacific.",
          transport_to_next: "Vlucht Apia-Nuku'alofa (meestal met overstap via Fiji)",
        },
        {
          code: 'TO', name: 'Tonga', days: 8, budget: 800, lat: -21.1393, lng: -175.2046,
          destinations: ["Nuku'alofa", "Vava'u (zwemmen met bultrugwalvissen)", "Ha'apai"],
          notes: "Een van de weinige plekken ter wereld waar je legaal mag zwemmen met bultrugwalvissen — het beste seizoen daarvoor is juli-oktober, dus check de exacte timing bij het plannen van de startdatum. Prijscorrectie (2026-07): €67,50→€100/dag, de grootste correctie van de route — vlucht naar Vava'u + de whale-swim tour zelf waren niet gedekt.",
          transport_to_next: "Vlucht Nuku'alofa-Rarotonga (lage frequentie, ruim van tevoren boeken)",
        },
        {
          code: 'CK', name: 'Cook Islands', days: 7, budget: 665, lat: -21.2367, lng: -159.7777,
          destinations: ['Rarotonga', 'Aitutaki-lagune'],
          notes: "De Aitutaki-lagune is minstens zo mooi als Bora Bora, voor een fractie van de prijs. Prijscorrectie (2026-07): €80→€95/dag (Air Rarotonga heeft een monopolie op de Aitutaki-vlucht, plus lagune-cruise).",
          transport_to_next: 'Einde van deze route — terugvlucht vanuit Rarotonga (of vlucht Rarotonga-Perth om verder te reizen naar Tropisch/Outback Australië 🐊)',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker tussen budget en comfort in — vluchten tussen de eilanden (geen praktisch bootalternatief).',
    best_starting_month: 'Mei',
    description: 'De mooiste Pacific-eilanden op een rij: Fiji, Vanuatu, Samoa, Tonga en de Cook Islands.',
    climate_summary: 'Mei-juni is het droge seizoen in de hele Pacific, ruim vóór het cycloonseizoen (november-april).',
    notes: 'Losgesplitst van Oceania Grand Expedition 🌊 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen (incl. de 2026-07 prijscorrecties op bijna elk eiland). Vervolg op deze route: Tropisch/Outback Australië 🐊. Oceania Grand Expedition 🌊 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildTropicalOutbackAustraliaRoute() {
  return rbBuildSeedRoute('Tropisch/Outback Australië 🐊', [
    {
      name: 'Tropisch Australië',
      season: 'Juni-augustus',
      budget: 6300,
      note: 'Droog seizoen: de Kimberley-wegen zijn begaanbaar, geen moesson, geen kwallenseizoen bij Cairns.',
      countries: [
        {
          code: 'AU', name: 'Australia', days: 21, budget: 2520, lat: -31.9505, lng: 115.8605,
          destinations: ['Perth', 'Ningaloo Reef (walvishaaien)', 'Kimberley & Bungle Bungles', 'Gibb River Road', 'Broome'],
          notes: 'Ningaloo Reef en de Kimberley zijn spectaculair en kennen weinig massatoerisme. Wel de duurste/verste regio van deze route qua afstanden. Prijscorrectie (2026-07): €87,62→€120/dag.',
          transport_to_next: 'Auto over land via de Gibb River Road en Kununurra naar Darwin, of vlucht Broome-Darwin voor wie de Kimberley liever per vliegtuig oversteekt',
        },
        {
          code: 'AU', name: 'Australia', days: 14, budget: 1470, lat: -12.4634, lng: 130.8456,
          destinations: ['Darwin', 'Kakadu National Park', 'Litchfield National Park', 'Uluru', 'Kata Tjuta', 'Kings Canyon'],
          notes: 'Top End en Red Centre samen — de meest iconische landschappen van Australië. Juni-augustus is ook de koelste periode voor Uluru. Prijscorrectie (2026-07): €87,50→€105/dag.',
          transport_to_next: 'Vlucht Alice Springs-Cairns of Darwin-Cairns (over land zou via de outback-highways dagenlang duren)',
        },
        {
          code: 'AU', name: 'Australia', days: 21, budget: 2310, lat: -16.9203, lng: 145.771,
          destinations: ['Cairns', 'Daintree Rainforest', 'Great Barrier Reef', 'Whitsundays & Whitehaven Beach', "Fraser Island / K'gari"],
          notes: 'Droog seizoen betekent ook geen kwallenseizoen (dat loopt november-mei) bij Cairns. Prijscorrectie (2026-07): €87,62→€110/dag.',
          transport_to_next: 'Einde van deze route — terugvlucht vanuit Cairns (of overland naar Sydney om verder te reizen naar Gematigd/Zuidelijk Australië 🍇)',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker tussen budget en comfort in — camper/huurauto voor de Kimberley en Red Centre.',
    best_starting_month: 'Juni',
    description: '"Top end" Australië: Perth en de Kimberley, Uluru en de Red Centre, en Cairns met het Great Barrier Reef.',
    climate_summary: 'Juni-augustus is het droge seizoen — begaanbare Kimberley-wegen, geen moesson, geen kwallenseizoen bij Cairns.',
    notes: 'Losgesplitst van Oceania Grand Expedition 🌊 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen, budgetten en volgorde zijn ongewijzigd overgenomen. Australië wordt hiermee opgeknipt in twee losse Route Builder-expedities naar klimaatzone (dit tropische deel en Gematigd/Zuidelijk Australië 🍇) — hetzelfde "zelfde land, ander block"-patroon als Chili/Argentinië tussen Pan-American Grand Tour 🌎 en Patagonia & Antarctica Expedition 🧊. Vervolg op Pacific-eilanden 🌺. Oceania Grand Expedition 🌊 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildTemperateSouthernAustraliaRoute() {
  return rbBuildSeedRoute('Gematigd/Zuidelijk Australië 🍇', [
    {
      name: 'Gematigd Australië',
      season: 'Augustus-september',
      budget: 4130,
      note: 'Late winter/vroege lente — koeler dan de zomerpiek (december-februari), maar goed te doen.',
      countries: [
        {
          code: 'AU', name: 'Australia', days: 12, budget: 1050, lat: -33.8688, lng: 151.2093,
          destinations: ['Byron Bay', 'Sydney', 'Blue Mountains'],
          notes: 'Klassieke backpacker-trail met goede infrastructuur; Sydney is te iconisch om over te slaan. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: 'Auto over land via de kust of de Hume Highway naar Melbourne',
        },
        {
          code: 'AU', name: 'Australia', days: 10, budget: 875, lat: -37.8136, lng: 144.9631,
          destinations: ['Great Ocean Road', 'Melbourne', 'Grampians National Park'],
          notes: 'De beste roadtrip-ervaring van het hele land. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: 'Veerboot Spirit of Tasmania (Melbourne-Devonport) of korte vlucht naar Hobart/Launceston',
        },
        {
          code: 'AU', name: 'Australia', days: 12, budget: 1260, lat: -42.8821, lng: 147.3272,
          destinations: ['Cradle Mountain', 'Wineglass Bay (Freycinet)', 'Overland Track', 'Hobart'],
          notes: 'Ruige natuur, weinig massatoerisme. Augustus-september is nog fris (soms sneeuw in het hooggebergte), dus pak warme kleding in. Prijscorrectie (2026-07): €87,50→€105/dag.',
          transport_to_next: 'Vlucht Hobart-Adelaide (meestal met overstap in Melbourne)',
        },
        {
          code: 'AU', name: 'Australia', days: 9, budget: 945, lat: -34.9285, lng: 138.6007,
          destinations: ['Adelaide', 'Kangaroo Island', 'Barossa Valley', 'Flinders Ranges'],
          notes: "Kangaroo Island is uitstekend voor wildlife (zeeleeuwen, koala's). Barossa Valley (wijn) is de eerste kandidaat om te laten vervallen als er ingekort moet worden. Prijscorrectie (2026-07): €87,78→€105/dag.",
          transport_to_next: 'Einde van deze route — terugvlucht vanuit Adelaide (of vlucht Adelaide-Christchurch om verder te reizen naar Nieuw-Zeeland 🥝)',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker tussen budget en comfort in — huurauto voor de Great Ocean Road, veerboot naar Tasmanië.',
    best_starting_month: 'Augustus',
    description: 'De oostkust van Sydney tot Melbourne, de Great Ocean Road, Tasmanië en Adelaide/Kangaroo Island.',
    climate_summary: 'Augustus-september is late winter/vroege lente — koeler dan de zomerpiek maar goed te doen, en de aansluiting op Nieuw-Zeelands eigen seizoen.',
    notes: 'Losgesplitst van Oceania Grand Expedition 🌊 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen, budgetten en volgorde zijn ongewijzigd overgenomen. Australië wordt hiermee opgeknipt in twee losse Route Builder-expedities naar klimaatzone — zie Tropisch/Outback Australië 🐊 voor de andere helft. Vervolg op Tropisch/Outback Australië 🐊; wordt zelf gevolgd door Nieuw-Zeeland 🥝. Oceania Grand Expedition 🌊 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildNewZealandRoute() {
  return rbBuildSeedRoute('Nieuw-Zeeland 🥝', [
    {
      name: 'Nieuw-Zeeland Finale',
      season: 'September-november',
      budget: 3388,
      note: 'Voorjaar — stabiel weer, rustiger dan de zomerdrukte (december-februari); door reisgidsen vaak aangeraden als shoulder season.',
      countries: [
        {
          code: 'NZ', name: 'New Zealand', days: 21, budget: 2268, lat: -45.0312, lng: 168.6626,
          destinations: ['Christchurch', 'Kaikoura', 'Abel Tasman', 'Franz Josef & Fox-gletsjers', 'Queenstown', 'Milford Sound & Fiordland', 'Dunedin & Catlins'],
          notes: 'Concentreert het merendeel van de iconische Nieuw-Zeelandse natuur. Overweeg minstens één Great Walk (Milford Track, Routeburn of Kepler) als meerdaagse hut-to-hut-trek — ruim van tevoren reserveren. Prijscorrectie (2026-07): €80→€108/dag.',
          transport_to_next: 'Veerboot Picton-Wellington, over land verder het Noordereiland in',
        },
        {
          code: 'NZ', name: 'New Zealand', days: 14, budget: 1120, lat: -41.2865, lng: 174.7762,
          destinations: ['Wellington', 'Tongariro Alpine Crossing', 'Rotorua', 'Coromandel', 'Bay of Islands', 'Auckland'],
          notes: 'De Tongariro Alpine Crossing is de beste dagwandeling van het land. Rotorua voor geothermische verschijnselen en Māori-cultuur. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: 'Einde van de expeditie — terugvlucht vanuit Auckland naar Nederland',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker tussen budget en comfort in — huurauto op beide eilanden, veerboot Picton-Wellington.',
    best_starting_month: 'September',
    description: 'Het Zuidereiland (Milford Sound, gletsjers, Queenstown) en het Noordereiland (Tongariro, Rotorua, Bay of Islands).',
    climate_summary: 'September-november is het Nieuw-Zeelandse voorjaar — een door reisgidsen vaak aangeraden shoulder season met stabiel weer en minder drukte dan de zomerpiek.',
    notes: 'Losgesplitst van Oceania Grand Expedition 🌊 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Land, dagen en budgetten zijn ongewijzigd overgenomen. Nieuw-Zeeland is een van de meest geboekte standalone trips ter wereld — dit blok staat volledig op zichzelf. Vervolg op Gematigd/Zuidelijk Australië 🍇. Oceania Grand Expedition 🌊 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

// ---- Caribbean & Amazon Expedition split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// This expedition's own notes argue against splitting it ("geen van de tien onderdelen is
// geschrapt", Suriname/Brazil framed as "complementair") — but the modularization analysis
// deliberately disagreed with that framing: the Grenada-Suriname flight is already flagged in the
// route's own notes as "waarschijnlijk de lastigste/duurste losse verbinding", and the travel style
// genuinely shifts there (island-hopping → mainland river/rainforest). The two routes below act on
// that disagreement. Countries, days, budgets, region order and all leg content are copied verbatim
// from rbBuildCaribbeanAmazonExpeditionRoute() below — this route has no shared
// RB_EXPEDITION_CONTENT entry, so the country objects are duplicated here rather than looked up.
// The original expedition itself is untouched and keeps existing exactly as it was, in full,
// alongside these two.

function rbSeedCaribbeanSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_CARIBBEAN_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_CARIBBEAN_SPLIT, '1');

  rbRoutes.push(rbBuildCaribbeanIslandsHopRoute(), rbBuildSurinameNorthernBrazilRoute());
  rbSave();
}

function rbBuildCaribbeanIslandsHopRoute() {
  return rbBuildSeedRoute('Caraïbische Eilanden-hop 🏝️', [
    {
      name: 'Grote Antillen',
      season: 'December',
      budget: 2340,
      note: 'Droog seizoen, ruim na het orkaanseizoen (dat loopt juni-november) — een veilige, aangename opener.',
      countries: [
        {
          code: 'CU', name: 'Cuba', days: 18, budget: 1260, lat: 23.1136, lng: -82.3666,
          destinations: [
            { name: 'Havana (Habana Vieja)', lat: 23.1136, lng: -82.3666 },
            { name: 'Viñales-vallei', lat: 22.6167, lng: -83.7097 },
            { name: 'Cienfuegos', lat: 22.1496, lng: -80.4394 },
            { name: 'Trinidad', lat: 21.8047, lng: -79.9825 },
          ],
          notes: "Havana en het UNESCO-koloniale Trinidad zijn de hoogtepunten; de rustige Viñales-vallei (tabak, karstlandschap) is de verborgen parel. Casas particulares (particuliere kamers) zijn de gangbare backpacker-accommodatie. Prijs geverifieerd (2026-07), klopt. ⚠️ Reisadvies oranje (bevestigd geldig, laatst bijgewerkt 23 juni 2026): grote tekorten aan stroom/brandstof/voedsel/medicijnen, toenemende veiligheidsrisico's — de zesde landelijke stroomstoring van 2026 viel op 2 augustus. Kaarten werken niet bij pinautomaten (contant meenemen). Sinds 1 juli 2025 is de papieren tourist card vervangen door een e-Visa (~$50), gekoppeld aan het verplichte gratis D'Viajeros-formulier (invullen binnen 72u vóór aankomst). Routelogica (2026-08, search-bevestigd): volgorde omgedraaid — Viñales stond eerder als laatste stop (een dubbele omweg: eerst voorbij Cienfuegos naar Trinidad, dan terug naar Cienfuegos, dan een 4,5u oversteek naar Viñales vlak bij Havana); nu als retourtje vanuit Havana meteen aan het begin, gevolgd door Cienfuegos-Trinidad zonder kruisende routes.",
          transport_to_next: 'Terug naar Havana (~4u15 rijden vanaf Trinidad — de enige realistische internationale gateway, Santiago de Cuba zou de omweg verergeren), dan vlucht Havana-Kingston (meestal met overstap via Panama City of Miami)',
        },
        {
          code: 'JM', name: 'Jamaica', days: 12, budget: 1080, lat: 17.9714, lng: -76.7936,
          destinations: [
            { name: 'Kingston', lat: 17.9714, lng: -76.7936 },
            { name: "Dunn's River Falls (Ocho Rios)", lat: 18.4108, lng: -77.1296 },
            { name: 'Port Antonio', lat: 18.1811, lng: -76.4513 },
            { name: 'Blue Mountains (Hardwar Gap)', lat: 18.0747, lng: -76.6597 },
          ],
          notes: 'Blue Mountains (koffie, wandelen) en Port Antonio (rafting, watervallen, nauwelijks toeristen vergeleken met Negril/Ocho Rios) zijn de sterkste match met natuur boven luxe. Prijscorrectie (2026-07): €75→€90/dag, Jamaica is duurder dan aangenomen (guesthouses + entreegelden). Routelogica (2026-08, search-bevestigd): volgorde omgedraaid — Blue Mountains stond als losse heen-en-terugtrip vlak na Kingston (de kustweg naar Ocho Rios loopt daar niet doorheen); nu als bergroute-terugweg (Hardwar Gap, koffieplantages/Newcastle) vanaf Port Antonio naar Kingston, in plaats van een aparte uitstap aan het begin.',
          transport_to_next: 'Kort eindstuk Blue Mountains-Kingston (Hardwar Gap-bergroute), dan vlucht Kingston-Curaçao (meestal met overstap via Panama City of Miami)',
        },
      ],
    },
    {
      name: 'Nederlandse Caraïben',
      season: 'December-januari',
      budget: 1220,
      note: 'Droog seizoen — helderder water voor snorkelen en duiken.',
      countries: [
        {
          code: 'CW', name: 'Curaçao', days: 7, budget: 560, lat: 12.1084, lng: -68.9335,
          destinations: [
            { name: 'Willemstad (UNESCO)', lat: 12.1091, lng: -68.9316 },
            { name: 'Shete Boka National Park', lat: 12.3667, lng: -69.15 },
            { name: 'stranden (Grote Knip)', lat: 12.2167, lng: -69.15 },
          ],
          notes: 'Willemstad met zijn Nederlandse koloniale architectuur is de stedelijke tegenhanger van rustig Bonaire. Shete Boka (ruige noordkust) is de verborgen parel, veel rustiger dan de stranden. Prijs geverifieerd (2026-07), klopt. Digital Immigration Card verplicht vooraf invullen (gratis).',
          transport_to_next: 'Korte vlucht Curaçao-Bonaire',
        },
        {
          code: 'BQ', name: 'Bonaire', days: 6, budget: 660, lat: 12.25, lng: -68.4,
          destinations: [
            { name: 'Washington Slagbaai National Park', lat: 12.3167, lng: -68.4167 },
            { name: 'duiken/snorkelen (marine park)', lat: 12.15, lng: -68.2833 },
          ],
          notes: "Wereldklasse duiken/snorkelen direct vanaf de kust. Washington Slagbaai NP (flamingo's, ruige natuur) is de verborgen parel, nauwelijks bezocht. Prijscorrectie (2026-07): €87,50→€110/dag (weinig budget-accommodatie, duiktrips zijn duur). Verplichte inreisbelasting ~€70 p.p. is een aparte kostenpost, niet in het dagtarief.",
          transport_to_next: 'Vlucht Bonaire-Guadeloupe (meestal met overstap via Aruba, Panama City of San Juan)',
        },
      ],
    },
    {
      name: 'Kleine Antillen',
      season: 'Januari-februari',
      budget: 2445,
      note: "Droog seizoen (carême) — beste moment om te wandelen in Dominica's regenwoud. De eilandvolgorde volgt de natuurlijke noord-zuid keten, en toevallig ook de veerbootlijn L'Express des Îles.",
      countries: [
        {
          code: 'GP', name: 'Guadeloupe', days: 7, budget: 615, lat: 16.0448, lng: -61.6654,
          destinations: [
            { name: 'La Soufrière (vulkaan)', lat: 16.0456, lng: -61.6654 },
            { name: 'Carbet-watervallen', lat: 16.0472, lng: -61.6167 },
            { name: 'Îles des Saintes', lat: 15.8667, lng: -61.5833 },
          ],
          notes: 'Franse Caraïbische cultuur gecombineerd met een actieve vulkaan. Îles des Saintes (kleine eilandjes voor de kust) is veel rustiger dan het hoofdeiland. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: "Veerboot L'Express des Îles naar Dominica (via Martinique)",
        },
        {
          code: 'DM', name: 'Dominica', days: 8, budget: 760, lat: 15.317, lng: -61.268,
          destinations: [
            { name: 'Boiling Lake-trektocht', lat: 15.3167, lng: -61.2667 },
            { name: 'Trafalgar Falls', lat: 15.3181, lng: -61.3331 },
            { name: 'Champagne Reef', lat: 15.2833, lng: -61.3833 },
          ],
          notes: '"Nature Island" — het minst ontwikkelde en meest ongerepte eiland van de vier. De Boiling Lake-trektocht is een zware hele dag op zich; reken op een rustdag ervoor of erna. Champagne Reef (vulkanische bubbels tijdens het snorkelen) is uniek. Prijscorrectie (2026-07): €72,50→€95/dag (nauwelijks hostels, guesthouses vanaf ~€60-70/nacht, verplichte gids voor Boiling Lake ~€55-70).',
          transport_to_next: "Veerboot L'Express des Îles naar St Lucia",
        },
        {
          code: 'LC', name: 'Saint Lucia', days: 7, budget: 560, lat: 13.83, lng: -61.0667,
          destinations: [
            { name: 'The Pitons', lat: 13.8167, lng: -61.0667 },
            { name: 'Sulphur Springs (drive-in vulkaan)', lat: 13.8347, lng: -61.0552 },
            { name: 'Tet Paul Nature Trail', lat: 13.8333, lng: -61.05 },
          ],
          notes: 'De iconische Pitons, meer toeristisch ontwikkeld dan de andere drie. Tet Paul Nature Trail geeft hetzelfde uitzicht op de Pitons, veel rustiger dan de drukke wandelpaden. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: 'Vlucht St Lucia-Grenada (niet op de veerbootlijn)',
        },
        {
          code: 'GD', name: 'Grenada', days: 7, budget: 510, lat: 12.08, lng: -61.728,
          destinations: [
            { name: 'Onderwaterbeeldenpark', lat: 12.0742, lng: -61.7325 },
            { name: 'kruidenplantages (nootmuskaat)', lat: 12.1667, lng: -61.7333 },
            { name: 'Grand Etang National Park', lat: 12.0833, lng: -61.6833 },
          ],
          notes: 'Het minst toeristische van de vier eilanden. Grand Etang NP (regenwoud, kratermeer) is de verborgen parel. Prijs geverifieerd (2026-07), klopt.',
          transport_to_next: 'Einde van deze route — terugvlucht vanuit Grenada (of vlucht Grenada-Suriname om verder te reizen naar Suriname & Noord-Brazilië 🌴)',
        },
      ],
    },
  ], {
    travel_style: "Backpacker tussen goedkoop en normaal in — hostels en casas particulares afgewisseld met af en toe een privékamer, de veerboot L'Express des Îles waar mogelijk (Guadeloupe-Dominica-St Lucia), vluchten voor de rest van de eilandsprongen.",
    best_starting_month: 'December',
    description: 'Caribische koloniale geschiedenis, vulkanische natuur en eilandculturen: Cuba en Jamaica, de Nederlandse ABC-eilanden, en de Kleine Antillen.',
    climate_summary: 'Het orkaanseizoen in de Caribische Zee loopt 1 juni-30 november; een decemberstart houdt de hele reis ruim binnen het droge/veilige seizoen (december-mei).',
    notes: "Losgesplitst van Caribbean & Amazon Expedition 🌴 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen (incl. de 2026-07 prijscorrecties op Jamaica/Bonaire/Dominica). Vervolg op deze route: Suriname & Noord-Brazilië 🌴. Caribbean & Amazon Expedition 🌴 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.\n\n" +
      "Routelogica-herziening (2026-08): zelfde ronde als Caribbean & Amazon Expedition 🌴 zelf — Cuba's en Jamaica's volgorde omgedraaid (geen dubbele omweg meer via Viñales resp. de Blue Mountains), coördinaten per bestemming toegevoegd. Zie Caribbean & Amazon Expedition 🌴's eigen notities voor de volledige uitleg. Landen/dagen/budget-totaal ongewijzigd.",
  });
}

function rbBuildSurinameNorthernBrazilRoute() {
  return rbBuildSeedRoute('Suriname & Noord-Brazilië 🌴', [
    {
      name: 'Suriname & Amazone',
      season: 'Februari-maart',
      budget: 1445,
      note: "Suriname's korte droge tijd valt hier precies goed voor jungle-/rivierentochten. Noord-Brazilië's duinenkust (Jericoacoara/Lençóis) is dan net buiten zijn absolute piekseizoen (juni-januari) — het enige geaccepteerde compromis van de hele oorspronkelijke route.",
      countries: [
        {
          code: 'SR', name: 'Suriname', days: 11, budget: 605, lat: 5.852, lng: -55.2038,
          destinations: [
            { name: 'Paramaribo (UNESCO)', lat: 5.852, lng: -55.2038 },
            { name: 'Marrondorpen aan de rivier', lat: 4.4, lng: -55.0 },
            { name: 'Brownsberg Nature Park', lat: 4.95, lng: -55.1667 },
          ],
          notes: 'Nederlandse koloniale geschiedenis in Paramaribo, gecombineerd met een rivierreis naar Marrondorpen in het binnenland — reken op 3-5 dagen voor een fatsoenlijke jungletocht naast de stad. Brownsberg (uitzicht over het Brokopondostuwmeer) is de verborgen parel. Prijs geverifieerd (2026-07): waarschijnlijk net genoeg, Brownsberg/Marrondorpen-tours ($70-120/dag) drukken het gemiddelde op. Let op: "visumvrij" is niet helemaal juist — een verplicht online ICF-immigratieformulier + gelekoortsbewijs is nodig vooraf.',
          transport_to_next: 'Vlucht Paramaribo-Belém (schaarse rechtstreekse verbindingen; waarschijnlijk met overstap via Cayenne, Georgetown of een Braziliaanse hub — vooraf goed checken)',
        },
        {
          code: 'BR', name: 'Brazil', days: 14, budget: 840, lat: -2.7458, lng: -42.8339,
          destinations: [
            { name: 'Belém', lat: -1.4558, lng: -48.5039 },
            { name: 'Ilha do Marajó', lat: -0.7167, lng: -48.5167 },
            { name: 'Lençóis Maranhenses', lat: -2.5, lng: -43.0 },
            { name: 'Jericoacoara', lat: -2.7975, lng: -40.5137 },
            { name: 'Fortaleza', lat: -3.7172, lng: -38.5433 },
          ],
          notes: 'De overgang van de Amazone-riviermonding (Belém, Marajó — buffels, ongerept rivierdelta-eiland) naar de compleet andere zandduinenkust (Lençóis Maranhenses, Jericoacoara) als adembenemende afsluiter. De afstanden langs de kust worden vaak onderschat. Prijs geverifieerd (2026-07), klopt — de generieke Rio/São Paulo-veiligheidswaarschuwingen zijn niet relevant voor dit noordoostelijke traject.',
          transport_to_next: 'Einde van de expeditie — terugvlucht vanuit Fortaleza (of via São Paulo) naar Nederland',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker tussen goedkoop en normaal in — rivierboten in Suriname, kustbussen in Noord-Brazilië.',
    best_starting_month: 'Februari',
    description: 'Nederlandse koloniale geschiedenis en Marroncultuur in Suriname, gevolgd door de Amazone-riviermonding en de duinenkust van Noord-Brazilië.',
    climate_summary: "Suriname's korte droge tijd (februari-maart) is ideaal voor jungle-/rivierentochten; Noord-Brazilië's duinenkust is dan net buiten zijn piekseizoen (juni-januari) — het enige compromis van dit blok.",
    notes: "Losgesplitst van Caribbean & Amazon Expedition 🌴 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen en budgetten zijn ongewijzigd overgenomen. Dit blok is bewust losgetrokken ondanks dat de oorspronkelijke route-notities het tegenovergestelde beargumenteerden (\"geen van de tien onderdelen is geschrapt\", Suriname/Brazilië \"complementair\") — de vlucht Grenada-Suriname is in diezelfde notities al aangemerkt als \"waarschijnlijk de lastigste/duurste losse verbinding\", en de reisstijl verschuift hier volledig (eilandhoppen → rivier/regenwoud op het continent). Extra relevant voor een Nederlandse reiziger gezien Suriname's koloniale band. Vervolg op Caraïbische Eilanden-hop 🏝️. Caribbean & Amazon Expedition 🌴 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.\n\n" +
      "Routelogica-herziening (2026-08): geen geografische fouten in Suriname/Brazilië zelf — coördinaten per bestemming toegevoegd voor de 'Gedetailleerd'-kaartweergave. Zie Caribbean & Amazon Expedition 🌴's eigen notities voor de fixes in Cuba/Jamaica (niet in dit blok).",
  });
}

// ---- West & Central Africa Expedition split (2026-07 modularization analysis, see ROUTE_BUILDER_MODULES.md) ----
//
// This expedition's own notes already flag Benin-Cameroon as "de enige onvermijdelijke sprong van
// de hele route" (overland through Nigeria isn't an option) — that's the natural seam the two
// routes below use. Countries, days, budgets, region order and all leg content are copied verbatim
// from rbBuildWestCentralAfricaExpeditionRoute() below — this route has no shared
// RB_EXPEDITION_CONTENT entry, so the country objects are duplicated here rather than looked up.
// The original expedition itself is untouched and keeps existing exactly as it was, in full,
// alongside these two.

function rbSeedWestCentralAfricaSplitExpeditions() {
  if (localStorage.getItem(RB_SEED_FLAG_KEY_WCAFRICA_SPLIT)) return;
  localStorage.setItem(RB_SEED_FLAG_KEY_WCAFRICA_SPLIT, '1');

  rbRoutes.push(rbBuildWestAfricaOverlandRoute(), rbBuildCentralAfricaIslandsRoute());
  rbSave();
}

function rbBuildWestAfricaOverlandRoute() {
  return rbBuildSeedRoute('West-Afrika Overland 🥁', [
    {
      name: 'Kaapverdische Eilanden',
      season: 'November',
      budget: 780,
      note: 'Net na het regenseizoen (augustus-oktober) — het droge seizoen loopt tot juni. Rustige, aangename opener.',
      countries: [
        {
          code: 'CV', name: 'Cape Verde', days: 13, budget: 780, lat: 16.8901, lng: -24.9825,
          destinations: ['Santo Antão (Ribeira Grande, Paúl-vallei)', 'São Vicente (Mindelo)', 'Fogo (Pico do Fogo-vulkaan, wijngaarden)'],
          notes: "Bewust andere eilanden dan een eerder bezoek (niet opnieuw Sal) — Santo Antão voor de dramatische wandelvalleien, São Vicente voor de muziekcultuur van Mindelo, Fogo voor de vulkaanbeklimming en wijnbouw op vulkanische grond. Onderling per veerboot (goedkoper, minder betrouwbaar schema) of Binter Cabo Verde-vlucht. Prijs geverifieerd (2026-07), klopt. Verplichte online EASE-registratie ≥5 dagen vooraf.",
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
          code: 'SN', name: 'Senegal', days: 13, budget: 618, lat: 14.7167, lng: -17.4677,
          destinations: ['Dakar', 'Île de Gorée', 'Saint-Louis (UNESCO)', 'Sine-Saloum-delta', 'Lompoul-woestijn'],
          notes: "Île de Gorée (slavernijgeschiedenis, korte boot vanaf Dakar) en Saint-Louis (koloniale hoofdstad) zijn de historische zwaartepunten; Sine-Saloum (mangroves, vogels) en de Lompoul-duinen geven een compleet ander natuurbeeld binnen één land. Prijs geverifieerd (2026-07), klopt.",
          transport_to_next: 'Bus/deeltaxi over land naar Gambia via de Senegambia-brug (geopend 2019, een stuk vlotter dan de vroegere veerpont).',
        },
        {
          code: 'GM', name: 'Gambia', days: 6, budget: 240, lat: 13.4549, lng: -16.579,
          destinations: ['Banjul', 'Gambia-rivier (bootcruise)', 'Kunta Kinteh Island (UNESCO, slavernijgeschiedenis)', 'Makasutu Culture Forest'],
          notes: "Klein maar met een eigen, herkenbaar hoogtepunt: Kunta Kinteh Island (voorheen James Island) is een van de belangrijkste slavernij-erfgoedsites van West-Afrika. Prijs geverifieerd (2026-07), klopt. Presidentsverkiezing 5 december 2026 — mogelijk onrust, check actuele situatie vlak voor vertrek.",
          transport_to_next: 'Einde van deze route — terugvlucht vanuit Banjul (of vlucht naar Abidjan om verder te reizen naar Golf van Guinee, hieronder).',
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
          code: 'CI', name: 'Ivory Coast', days: 7, budget: 333, lat: 5.36, lng: -4.0083,
          destinations: ['Abidjan (Le Plateau)', 'Grand-Bassam (UNESCO koloniale stad)'],
          notes: "Taï National Park is bewust weggelaten — prachtig, maar de afgelegen ligging kost 3-4 dagen extra reistijd. Abidjan en Grand-Bassam houden dit land compact en de moeite waard. Prijs geverifieerd (2026-07), klopt.",
          transport_to_next: 'Bus over land naar Ghana via de grensovergang Elubo — een gevestigde backpacker-route.',
        },
        {
          code: 'GH', name: 'Ghana', days: 15, budget: 713, lat: 5.1053, lng: -1.2466,
          destinations: ['Accra', 'Cape Coast Castle', 'Elmina Castle', 'Kakum National Park (boomtoppenpad)', 'Volta-regio (Wli-watervallen, Mount Afadjato)'],
          notes: "Cape Coast en Elmina Castle zijn de zwaarste, belangrijkste slavernijgeschiedenis-sites van de hele expeditie. Ghana heeft verreweg het rijkste programma, vandaar de meeste tijd. Prijs geverifieerd (2026-07), klopt.",
          transport_to_next: 'Bus over land naar Togo via de grensovergang Aflao.',
        },
        {
          code: 'TG', name: 'Togo', days: 4, budget: 160, lat: 6.1319, lng: 1.2228,
          destinations: ['Lomé', 'Togoville (Vodun-cultuur, Lac Togo)'],
          notes: "Bewust kort — Togo voegt met zijn Duitse koloniale geschiedenis wel een andere invalshoek toe dan Ghana/Benin, maar heeft weinig hoogtepunten. Prijs geverifieerd (2026-07), klopt.",
          transport_to_next: 'Bus over land naar Benin via de grensovergang Hillacondji.',
        },
        {
          code: 'BJ', name: 'Benin', days: 9, budget: 428, lat: 6.3667, lng: 2.0833,
          destinations: ['Ouidah (Route des Esclaves, Door of No Return)', 'Ganvié (paalwoningdorp op het meer)', 'Abomey (koninklijke paleizen, UNESCO)'],
          notes: "Oude koninkrijken (Abomey, het voormalige Dahomey), slavernijgeschiedenis (Ouidah) en levende Vodun-cultuur. Prijs geverifieerd (2026-07), klopt.",
          transport_to_next: "Einde van deze route — vlucht huiswaarts vanuit Cotonou (of vlucht Cotonou-Douala om verder te reizen naar Centraal-Afrika & Eilanden 🦛 — overland door Nigeria is geen optie).",
        },
      ],
    },
  ], {
    travel_style: "Backpacker, geen harde tijdslimiet — hostels/eenvoudige guesthouses, bus/deeltaxi overland (Senegal t/m Benin), vluchten alleen voor Kaapverdië-Senegal en Gambia-Ivoorkust.",
    best_starting_month: 'November',
    description: 'Atlantische eilandcultuur, oude West-Afrikaanse koninkrijken en slavernijgeschiedenis: Kaapverdië, Senegal, Gambia, Ivoorkust, Ghana, Togo en Benin.',
    climate_summary: 'Een novemberstart laat vrijwel de hele route in zijn beste seizoen vallen: Kaapverdië net na het regenseizoen, en Senegal t/m Benin in hun volledige droge seizoen (november-april, met de stoffige maar droge harmattan december-februari).',
    notes: 'Losgesplitst van West & Central Africa Expedition 🌍 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen, budgetten en volgorde zijn ongewijzigd overgenomen. Vervolg op deze route: Centraal-Afrika & Eilanden 🦛. West & Central Africa Expedition 🌍 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
  });
}

function rbBuildCentralAfricaIslandsRoute() {
  return rbBuildSeedRoute('Centraal-Afrika & Eilanden 🦛', [
    {
      name: 'Centraal-Afrika & Eilanden',
      season: 'Januari-februari',
      budget: 1888,
      note: "Kameroens minst natte periode (november-februari) en Gabons korte droge seizoen (december-februari) vallen hier samen; São Tomé is de uitzondering (regenseizoen).",
      countries: [
        {
          code: 'CM', name: 'Cameroon', days: 8, budget: 380, lat: 4.0511, lng: 9.7679,
          destinations: ['Douala', 'Kribi (Chutes de la Lobé, zwarte stranden)', 'Yaoundé'],
          notes: 'Mount Cameroon en Limbe (Zuidwest-regio) bewust vermeden vanwege de sinds 2016 actieve "Anglophone Crisis" — in plaats daarvan Douala, Kribi en Yaoundé in de stabielere Franstalige regio\'s. Bevestigd (2026-07): conflict nog steeds actief. Verplicht e-visa vooraf (~€150-230), aparte kostenpost.',
          transport_to_next: 'Vlucht Douala-São Tomé (regionale verbinding).',
        },
        {
          code: 'ST', name: 'São Tomé and Príncipe', days: 9, budget: 653, lat: 0.3365, lng: 6.7273,
          destinations: ['São Tomé (roças/plantages, regenwoud)', 'Príncipe (afgelegen, minder bezocht)'],
          notes: "Portugese koloniale plantagegeschiedenis op een klein, rustig tropisch eiland. Valt in het regenseizoen (oktober-mei) bij deze route — vooral middagbuien. Prijs geverifieerd (2026-07), klopt. Presidentsverkiezing 19 juli 2026 — check lokaal nieuws vlak voor vertrek.",
          transport_to_next: 'Vlucht São Tomé-Libreville (regionale verbinding).',
        },
        {
          code: 'GA', name: 'Gabon', days: 9, budget: 855, lat: -1.95, lng: 9.7,
          destinations: ['Loango National Park (surfende nijlpaarden, bosolifanten op het strand)', 'Libreville', 'regenwoud'],
          notes: "Een van de weinige plekken ter wereld waar je olifanten en nijlpaarden op het strand ziet. ⚠️ Prijscheck (2026-07): het krapste/riskantste budget van de route — Loango-logistiek kan oplopen tot $100-300+/dag.",
          transport_to_next: 'Einde van de expeditie — terugvlucht vanuit Libreville naar Nederland (meestal met overstap).',
        },
      ],
    },
  ], {
    travel_style: 'Backpacker — vluchten tussen Kameroen, São Tomé en Gabon (geen overland-alternatief).',
    best_starting_month: 'Januari',
    description: 'Centraal-Afrikaans regenwoud en wildlife: Kameroen, het eilandenrijk São Tomé & Príncipe en Gabon.',
    climate_summary: "Januari-februari laat Kameroens minst natte periode en Gabons korte droge seizoen samenvallen; São Tomé valt dan in zijn regenseizoen (vooral middagbuien, geen aanhoudende moesson).",
    notes: 'Losgesplitst van West & Central Africa Expedition 🌍 als onderdeel van de 2026-07 modularisatie-analyse (zie ROUTE_BUILDER_MODULES.md). Landen, dagen en budgetten zijn ongewijzigd overgenomen (incl. de waarschuwing over Kameroens Zuidwest-regio en Gabons krappe Loango-budget). Klein maar uniek: dit alleen doen als er tijd/budget is voor Centraal-Afrikaans regenwoud specifiek, los van de West-Afrikaanse geschiedenis-route ervoor. Vervolg op West-Afrika Overland 🥁. West & Central Africa Expedition 🌍 zelf blijft ongewijzigd bestaan als losse, volledige expeditie.',
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

/**
 * One-time wholesale reorder of Africa Grand Tour (2026-07), at Youri's request, to fix the
 * East-Africa/Southern-Africa seasonal compromise — see rbBuildAfricaGrandTourRoute() for the full
 * reasoning (the "opposite cycles" claim was verified false; the fix is a south-to-north resequence
 * plus moving Ethiopia/Egypt to a February-March finale). Same country list, same days/budget per
 * country, same wholesale-replace approach as rbMigrateAncientToMediterranean() — this is a full
 * resequence (new regions, new transport_to_next directions throughout), not a field patch, so it
 * replaces the whole route rather than touching individual fields. Runs once; no-ops for a browser
 * that's never seeded before (fresh seeds already get the reordered version directly via
 * rbSeedMEAExpedition/rbBuildAfricaGrandTourRoute).
 */
function rbMigrateAfricaGrandTourReorder() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_AFRICA_REORDER)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_AFRICA_REORDER, '1');

  const idx = rbRoutes.findIndex(r => r.name === 'Africa Grand Tour 🌍');
  if (idx === -1) return;

  rbRoutes.splice(idx, 1, rbBuildAfricaGrandTourRoute());
  rbSave();
}

/**
 * One-time wholesale refresh (2026-07) for the first round of the price/visa/travel-advisory
 * verification pass — covers every route touched by that pass so far. Each of these routes had its
 * per-country budgets and/or notes corrected directly in its build function's source (see each
 * route's own notes for the specific corrections and reasoning), but a browser that already seeded
 * these routes before this pass won't see any of it — the seed functions are gated by flags that
 * already fired. This migration re-runs each route's build function and wholesale-replaces the
 * existing route with it, the same pattern as rbMigrateAncientToMediterranean() and
 * rbMigrateAfricaGrandTourReorder() — full replace rather than a field patch, since hand-verifying
 * a fix-list for every single changed field across 9 routes risked transcription drift from the
 * source. Any manual edits Youri made to these specific routes' fields would be lost; no evidence
 * he's made any. Does not touch Bahrain/Africa-reorder/British Isles — those already have their own
 * migrations, and British Isles was seeded fresh with its final content from day one.
 */
function rbMigratePriceVerificationRound1() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND1)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND1, '1');

  const replacements = [
    ['Mediterranean Civilizations Expedition 🏛️', rbBuildMediterraneanExpeditionRoute],
    ['Eurasia Grand Tour 🌏', rbBuildEurasiaRoute],
    ['Central European Grand Roadtrip 🚗', rbBuildCentralEuropeRoadtripRoute],
    ['Patagonia & Antarctica Expedition 🧊', rbBuildPatagoniaAntarcticaRoute],
    ['India & Himalaya Expedition 🏔️', rbBuildHimalayaIndiaRoute],
    ['Caribbean & Amazon Expedition 🌴', rbBuildCaribbeanAmazonExpeditionRoute],
    ['West & Central Africa Expedition 🌍', rbBuildWestCentralAfricaExpeditionRoute],
    ['Nordic Arctic Expedition ❄️', rbBuildArcticCircleRoute],
    ['Pan-American Grand Tour 🌎', rbBuildPanAmericanRoute],
    ['North America Grand Traverse 🌎', rbBuildNorthAmericaRoute],
    ['Oceania Grand Expedition 🌊', rbBuildOceaniaExpeditionRoute],
  ];

  let touched = false;
  replacements.forEach(([name, buildFn]) => {
    const idx = rbRoutes.findIndex(r => r.name === name);
    if (idx === -1) return;
    rbRoutes.splice(idx, 1, buildFn());
    touched = true;
  });

  if (touched) rbSave();
}

/**
 * Second round of the price/visa/travel-advisory verification pass (2026-07) — covers Africa Grand
 * Tour, the twelfth of thirteen routes verified. Needs its own migration rather than joining
 * rbMigratePriceVerificationRound1's replacements array: that migration's flag already fired for
 * anyone who'd loaded the app during round 1, so simply adding Africa Grand Tour to its array
 * wouldn't reach an already-seeded browser — the exact migration-gap bug found and fixed during
 * round 1 itself. Same wholesale-replace pattern: Africa Grand Tour's per-country budgets and notes
 * were corrected directly in RB_EXPEDITION_CONTENT (see each country's own notes for specifics), and
 * this re-runs rbBuildAfricaGrandTourRoute() to push those corrections to already-seeded routes.
 */
function rbMigratePriceVerificationRound2() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND2)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND2, '1');

  const idx = rbRoutes.findIndex(r => r.name === 'Africa Grand Tour 🌍');
  if (idx === -1) return;

  rbRoutes.splice(idx, 1, rbBuildAfricaGrandTourRoute());
  rbSave();
}

/**
 * Third round of the price/visa/travel-advisory verification pass (2026-07) — covers British Isles
 * & Celtic Coast Expedition, the thirteenth and last route in this series. Needs its own migration
 * for the same reason as round 2 (Africa Grand Tour): British Isles was seeded fresh only the day
 * before this correction (2026-07-27), so its seed flag has almost certainly already fired for
 * Youri — editing rbBuildBritishIslesExpeditionRoute()'s source alone wouldn't reach his browser.
 * Same wholesale-replace pattern: every leg's budget and notes were corrected directly in that
 * build function (see each leg's own notes for specifics — the flat €90/day rate turned out to be
 * inaccurate for 13 of 15 legs, the same kind of flat-rate risk found earlier in Central European
 * Grand Roadtrip).
 */
function rbMigratePriceVerificationRound3() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND3)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND3, '1');

  const idx = rbRoutes.findIndex(r => r.name === 'British Isles & Celtic Coast Expedition 🍀');
  if (idx === -1) return;

  rbRoutes.splice(idx, 1, rbBuildBritishIslesExpeditionRoute());
  rbSave();
}

/**
 * Route-line map view prototype (2026-07) — adds a lat/lng anchor point to every leg of Central
 * European Grand Roadtrip so the new "Routelijn" map mode has something to draw. That route's
 * price-verification migration (round 1) already fired for Youri before these coordinates existed
 * in the source, so — same migration-gap trap as every other mid-series edit this project has hit —
 * simply adding lat/lng to rbBuildCentralEuropeRoadtripRoute() would silently do nothing for his
 * already-seeded browser without this. Only touches this one route; the other 12 don't have
 * coordinates yet (see rbRenderRouteLine's empty-state message).
 */
function rbMigrateRouteLineCoords() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_ROUTE_LINE_COORDS)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_ROUTE_LINE_COORDS, '1');

  const idx = rbRoutes.findIndex(r => r.name === 'Central European Grand Roadtrip 🚗');
  if (idx === -1) return;

  rbRoutes.splice(idx, 1, rbBuildCentralEuropeRoadtripRoute());
  rbSave();
}

/**
 * Route-line map view, round 2 (2026-07) — adds lat/lng anchor coordinates to every remaining leg
 * across the other 12 expeditions (Central European Grand Roadtrip already got its own coordinates
 * and its own migration above, as the initial prototype). Six of these routes are sourced from
 * RB_EXPEDITION_CONTENT + rbContentFor() (Eurasia, Pan-American, Africa Grand Tour, Nordic Arctic,
 * Patagonia & Antarctica, India & Himalaya) — rbContentFor() was updated to pass lat/lng through,
 * same fix shape as when it was found to be silently dropping `notes`. The other six are
 * hand-authored (Mediterranean, North America, Oceania, Caribbean & Amazon, West & Central Africa,
 * British Isles). Every one of these routes already has at least one prior migration (its original
 * build, a price-verification round, or both) that has almost certainly already fired for Youri, so
 * — same migration-gap trap hit repeatedly this project — adding coordinates to the source alone
 * would not reach his browser without this. One representative coordinate per leg (its main city or
 * best-known named destination), not a full per-destination or turn-by-turn road route.
 */
function rbMigrateRouteLineCoordsRound2() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_ROUTE_LINE_COORDS_ROUND2)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_ROUTE_LINE_COORDS_ROUND2, '1');

  const replacements = [
    ['Mediterranean Civilizations Expedition 🏛️', rbBuildMediterraneanExpeditionRoute],
    ['Eurasia Grand Tour 🌏', rbBuildEurasiaRoute],
    ['Pan-American Grand Tour 🌎', rbBuildPanAmericanRoute],
    ['Africa Grand Tour 🌍', rbBuildAfricaGrandTourRoute],
    ['Nordic Arctic Expedition ❄️', rbBuildArcticCircleRoute],
    ['Patagonia & Antarctica Expedition 🧊', rbBuildPatagoniaAntarcticaRoute],
    ['India & Himalaya Expedition 🏔️', rbBuildHimalayaIndiaRoute],
    ['North America Grand Traverse 🌎', rbBuildNorthAmericaRoute],
    ['Oceania Grand Expedition 🌊', rbBuildOceaniaExpeditionRoute],
    ['Caribbean & Amazon Expedition 🌴', rbBuildCaribbeanAmazonExpeditionRoute],
    ['West & Central Africa Expedition 🌍', rbBuildWestCentralAfricaExpeditionRoute],
    ['British Isles & Celtic Coast Expedition 🍀', rbBuildBritishIslesExpeditionRoute],
  ];

  let touched = false;
  replacements.forEach(([name, buildFn]) => {
    const idx = rbRoutes.findIndex(r => r.name === name);
    if (idx === -1) return;
    rbRoutes.splice(idx, 1, buildFn());
    touched = true;
  });

  if (touched) rbSave();
}

/**
 * Grote routelogica-herziening van de Eurasia Grand Tour (2026-08): elke etappe gecontroleerd op
 * instap/uitstap-consistentie (klopt de transport_to_next daadwerkelijk met de vorige/volgende
 * bestemming) en waar nodig heringedeeld. Patcht per land alleen de specifieke velden die dit
 * ronde veranderd zijn (destinations/transport_to_next/days/budget/notes/lat/lng) i.p.v. het hele
 * blok te overschrijven, zodat eventuele hand-edits in andere velden (status, eigen notities elders,
 * region-indeling) intact blijven — dezelfde aanpak als rbMigrateEurasiaCountryChanges() hierboven.
 * Cambodja/Laos worden bovendien van positie gewisseld (Vietnam-Cambodja-Laos-Thailand i.p.v.
 * Vietnam-Laos-Cambodja-Thailand), en Maleisië krijgt twee nieuwe blokken (Sarawak, Sabah) rond het
 * bestaande Brunei-blok — de "Borneo Overland Trail".
 *
 * Ook toegepast op de drie 2026-07 split-routes (West-Eurazië Overland 🐫, Oost-Azië & Stille
 * Oceaan 🗻, Zuidoost-Azië Grand Loop 🛕): die delen dezelfde RB_EXPEDITION_CONTENT-content via
 * rbContentFor(), maar hun blocks werden bij het (eerdere) seeden bevroren in localStorage — een
 * latere contentwijziging bereikt ze dus niet vanzelf, zelfde valkuil als eerder bij deze route
 * (zie README's "critical migration fix"-vermelding).
 */
function rbMigrateEurasiaRouteOverhaul() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_08_EURASIA_OVERHAUL)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_08_EURASIA_OVERHAUL, '1');

  const routeNames = ['Eurasia Grand Tour 🌏', 'West-Eurazië Overland 🐫', 'Oost-Azië & Stille Oceaan 🗻', 'Zuidoost-Azië Grand Loop 🛕'];
  routeNames.forEach(name => rbApplyEurasiaOverhaulToRoute(rbRoutes.find(r => r.name === name)));
}

function rbApplyEurasiaOverhaulToRoute(route) {
  if (!route) return;

  let touched = false;
  const content = RB_EXPEDITION_CONTENT['Eurasia Grand Tour 🌏'];

  // 1. Sync the corrected fields for every country touched this round (only the ones actually
  // present in this route's blocks — .find() safely no-ops for the others). A deliberate content
  // correction (not a user hand-edit), so a full field sync is appropriate here — same reasoning
  // as the price-verification-round migrations use for budget/days corrections.
  if (content) {
    ['HR', 'AL', 'TR', 'GE', 'AM', 'AZ', 'KZ', 'UZ', 'CN', 'TW', 'VN', 'KH', 'LA', 'TH', 'MY', 'BN', 'PH', 'ID'].forEach(code => {
      const block = route.blocks.find(b => b.country_code === code);
      const c = content[code];
      if (!block || !c) return;
      if (block.transport_to_next !== c.transport_to_next) { block.transport_to_next = c.transport_to_next; touched = true; }
      if (block.days !== c.days) { block.days = c.days; touched = true; }
      if (block.budget !== c.budget) { block.budget = c.budget; touched = true; }
      if (block.lat !== c.lat) { block.lat = c.lat; touched = true; }
      if (block.lng !== c.lng) { block.lng = c.lng; touched = true; }
      if (c.notes && block.notes !== c.notes) { block.notes = c.notes; touched = true; }
      // Destination entries are either plain strings (legacy) or { name, lat, lng } objects
      // (Eurasia content, since 2026-08) — normalize both sides to { name, lat, lng } before
      // comparing, so this also correctly backfills per-destination coordinates that weren't
      // there yet on an already-seeded browser.
      const normalizeDest = d => (typeof d === 'string' ? { name: d, lat: null, lng: null } : { name: d.name, lat: d.lat ?? null, lng: d.lng ?? null });
      const newDests = (c.destinations || []).map(normalizeDest);
      const oldDests = (block.destinations || []).map(normalizeDest);
      if (JSON.stringify(newDests) !== JSON.stringify(oldDests)) {
        block.destinations = newDests.map(d => ({ id: rbNewDestId(), name: d.name, notes: '', lat: d.lat, lng: d.lng }));
        touched = true;
      }
    });
  }

  // 2. Swap Cambodia and Laos: Vietnam -> Cambodja -> Laos -> Thailand (was Vietnam -> Laos -> Cambodja -> Thailand).
  const laIndex = route.blocks.findIndex(b => b.country_code === 'LA');
  const khIndex = route.blocks.findIndex(b => b.country_code === 'KH');
  if (laIndex !== -1 && khIndex !== -1 && laIndex < khIndex) {
    const [laBlock] = route.blocks.splice(laIndex, 1);
    route.blocks.splice(khIndex, 0, laBlock);
    touched = true;
  }

  // 3. Split Malaysia: insert a Sarawak block before Brunei and a Sabah block after it (the
  // "Borneo Overland Trail"). The existing Malaysia block (already patched to peninsular-only
  // content in step 1) stays where it is.
  const bnIndex = route.blocks.findIndex(b => b.country_code === 'BN');
  const hasSarawak = route.blocks.some(b => b.country_code === 'MY' && (b.destinations || []).some(d => d.name === 'Kuching'));
  if (bnIndex !== -1 && !hasSarawak) {
    const bnBlock = route.blocks[bnIndex];
    const sarawakBlock = rbBuildBlock('MY', 'Malaysia', {
      region_id: bnBlock.region_id, days: 6, budget: 330, lat: 1.5533, lng: 110.3592,
      destinations: [{name:'Kuching',lat:1.5533,lng:110.3592}, {name:'Bako National Park',lat:1.7167,lng:110.4667}, {name:'Mulu Caves (Gunung Mulu NP)',lat:4.0428,lng:114.8144}],
      transport_to_next: 'Bus naar Miri, dan over land de grens over naar Bandar Seri Begawan, Brunei',
      notes: 'Sarawak-etappe van de Borneo Overland Trail (2026-08) — vervolg op het schiereiland-blok, met Brunei als tussenstop voor Sabah.',
    });
    const sabahBlock = rbBuildBlock('MY', 'Malaysia', {
      region_id: bnBlock.region_id, days: 11, budget: 715, lat: 5.9788, lng: 116.0753,
      destinations: [{name:'Kota Kinabalu',lat:5.9788,lng:116.0753}, {name:'Mount Kinabalu',lat:6.0754,lng:116.5580}, {name:'Sepilok Orang-oetan Centre',lat:5.8742,lng:117.9478}, {name:'Kinabatangan-rivier',lat:5.5000,lng:118.3667}, {name:'Semporna/Sipadan',lat:4.4816,lng:118.6120}],
      transport_to_next: 'Vlucht Kota Kinabalu-Manila (AirAsia, ~4x/week, directe verbinding, ~2u)',
      notes: 'Sabah-etappe van de Borneo Overland Trail. Extra kostenposten (niet in dagbudget): Mount Kinabalu-beklimming (verplichte gids+vergunning, ~€250-350 all-in), Sipadan-duiken (beperkte vergunningen, ~€150-250/dag).',
    });
    route.blocks.splice(bnIndex, 0, sarawakBlock);
    route.blocks.splice(bnIndex + 2, 0, sabahBlock);
    touched = true;
  }

  // 4. Update region budgets for regions whose totals changed this round.
  (route.regions || []).forEach(region => {
    if (region.name === 'Balkans' && region.budget !== 1909) { region.budget = 1909; touched = true; }
    if (region.name === 'Central Asia' && region.budget !== 2350) { region.budget = 2350; touched = true; }
    if (region.name === 'Mainland Southeast Asia' && region.budget !== 2700) { region.budget = 2700; touched = true; }
    if (region.name === 'Maritime Southeast Asia' && region.budget !== 2735) { region.budget = 2735; touched = true; }
  });

  // 5. Note the change. Only the full expedition gets the country/day/budget totals sentence —
  // the three split routes each cover a subset, so that specific total doesn't apply to them.
  let note = 'Grote routelogica-herziening (2026-08): elke etappe gecontroleerd op instap/uitstap-consistentie (klopt de vlucht/bus daadwerkelijk met de vorige/volgende bestemming, en is de volgorde binnen elk land geografisch logisch) — zie de losse landnotities hierboven voor details per land. Belangrijkste wijzigingen: Kroatië teruggebracht tot alleen Dubrovnik (al bezocht elders); Albanië, Turkije, Georgië, Armenië, Azerbeidzjan en Oezbekistan heringedeeld voor betere aansluiting; Kazachstan zonder Nur-Sultan/Astana (te ver uit de route); Xinjiang volledig vervangen door Zhangjiajie en Guilin/Yangshuo in China (sociaalpolitieke reden); Vietnam herzien (Ha Giang Loop toegevoegd, Hue/Hoi An/Da Nang geschrapt, Da Lat en Phu Quoc als uitstapjes vanuit Ho Chi Minh City); landvolgorde Vietnam-Cambodja-Laos-Thailand omgedraaid (was Vietnam-Laos-Cambodja-Thailand); Thailand-Maleisië nu per boot (Koh Lipe-Langkawi) i.p.v. over land; Maleisië uitgebreid met een Borneo-etappe (Sarawak-Brunei-Sabah, de Borneo Overland Trail); Filipijnen omgezet naar een rondreis i.p.v. vaste basis Manila; Indonesië met Sumatra i.p.v. Java/Bali.';
  if (route.name === 'Eurasia Grand Tour 🌏') {
    note += ' Nieuw totaal: 27 landen, ~338 dagen, ~€19.850 (was 336 dagen/€20.000).';
  }
  if (route.notes && !route.notes.includes('Grote routelogica-herziening (2026-08)')) {
    route.notes += '\n\n' + note;
    touched = true;
  }

  if (touched) rbSave();
}

/**
 * Route-logic review, second expedition in the ROUTE_LOGIC_REVIEW.md playbook (2026-08) — same
 * pattern as rbMigrateEurasiaRouteOverhaul()/rbApplyEurasiaOverhaulToRoute() above: field-patch the
 * corrected content into the existing CL/AR/AQ blocks, then splice in two brand-new blocks (Chile-Zuid,
 * Argentinië-Vuurland) rather than a blind wholesale replace, so any hand-edits Youri made survive.
 * Applies to both the main expedition and its 'Patagonië Overland 🏔️' split companion (which shares
 * the same RB_EXPEDITION_CONTENT entries via rbContentFor() and needs the identical restructuring —
 * exactly the split-companion check the playbook calls out).
 */
function rbMigratePatagoniaRouteLogicOverhaul() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_08_PATAGONIA_OVERHAUL)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_08_PATAGONIA_OVERHAUL, '1');

  ['Patagonia & Antarctica Expedition 🧊', 'Patagonië Overland 🏔️'].forEach(name => (
    rbApplyPatagoniaOverhaulToRoute(rbRoutes.find(r => r.name === name))
  ));
}

function rbApplyPatagoniaOverhaulToRoute(route) {
  if (!route) return;

  let touched = false;
  const content = RB_EXPEDITION_CONTENT['Patagonia & Antarctica Expedition 🧊'];

  // 1. Sync corrected fields into the existing CL ("Chili-Noord"), AR ("Argentinië-Calafate/El
  // Chaltén") and (main expedition only) AQ blocks — same field-by-field patch as Eurasia's, so any
  // hand-edited fields Youri may have made elsewhere on these blocks aren't touched.
  if (content) {
    ['CL', 'AR', 'AQ'].forEach(code => {
      const block = route.blocks.find(b => b.country_code === code);
      const c = content[code];
      if (!block || !c) return;
      if (block.transport_to_next !== c.transport_to_next) { block.transport_to_next = c.transport_to_next; touched = true; }
      if (block.days !== c.days) { block.days = c.days; touched = true; }
      if (block.budget !== c.budget) { block.budget = c.budget; touched = true; }
      if (block.lat !== c.lat) { block.lat = c.lat; touched = true; }
      if (block.lng !== c.lng) { block.lng = c.lng; touched = true; }
      if (c.notes && block.notes !== c.notes) { block.notes = c.notes; touched = true; }
      const normalizeDest = d => (typeof d === 'string' ? { name: d, lat: null, lng: null } : { name: d.name, lat: d.lat ?? null, lng: d.lng ?? null });
      const newDests = (c.destinations || []).map(normalizeDest);
      const oldDests = (block.destinations || []).map(normalizeDest);
      if (JSON.stringify(newDests) !== JSON.stringify(oldDests)) {
        block.destinations = newDests.map(d => ({ id: rbNewDestId(), name: d.name, notes: '', lat: d.lat, lng: d.lng }));
        touched = true;
      }
    });
  }

  // 2. Insert the two new legs (Chile-Zuid, Argentinië-Vuurland) right after the existing AR block —
  // this alone turns [CL, AR, (AQ)] into [CL, AR, CL, AR, (AQ)] without needing to move anything.
  const arIndex = route.blocks.findIndex(b => b.country_code === 'AR');
  const hasSplit = route.blocks.filter(b => b.country_code === 'CL').length > 1;
  if (arIndex !== -1 && !hasSplit) {
    const clZuid = rbBuildBlock('CL', 'Chile', {
      days: 9, budget: 1200, lat: -51.7236, lng: -72.4875,
      destinations: [
        { name: 'Puerto Natales', lat: -51.7236, lng: -72.4875 },
        { name: 'Torres del Paine National Park', lat: -50.9423, lng: -73.0357 },
        { name: 'Punta Arenas (dagtrip Isla Magdalena)', lat: -53.1638, lng: -70.9171 },
      ],
      transport_to_next: 'Vanaf Punta Arenas de veerboot over de Straat van Magellaan (Punta Delgada-Bahía Azul), dan de grensovergang bij San Sebastián en de weg naar Río Grande/Ushuaia — geen omweg via Puerto Natales meer nodig.',
      notes: "Prijs geverifieerd (2026-07), klopt. Torres del Paine-piek: refugio-overnachtingen incl. maaltijden lopen op tot $100-150/nacht — buiten het park blijft het dagtarief haalbaar. Punta Arenas is een bewuste dagtrip voor Isla Magdalena's pinguïnkolonie (alleen vandaar bereikbaar, niet vanuit Puerto Natales) — de reis gaat daarna direct verder naar Vuurland, geen terugreis naar Puerto Natales nodig (2026-08).",
    });
    const arUshuaia = rbBuildBlock('AR', 'Argentina', {
      days: 8, budget: 1055, lat: -54.8019, lng: -68.303,
      destinations: [
        { name: 'Ushuaia', lat: -54.8019, lng: -68.303 },
        { name: 'Tierra del Fuego National Park', lat: -54.85, lng: -68.5833 },
        { name: 'Beagle Channel', lat: -54.87, lng: -67.9 },
      ],
      transport_to_next: route.name === 'Patagonia & Antarctica Expedition 🧊'
        ? 'Inschepen in Ushuaia voor de expeditiecruise — oversteek van de Drake Passage (ca. 2 dagen varen)'
        : 'Aankomst in Ushuaia — eindpunt van deze standalone route (de Antarctica-cruise zit in het losse blok Antarctica-cruise 🐧, niet hier).',
      notes: "Vuurland-etappe, losgekoppeld van El Calafate/El Chaltén (2026-08) zodat de landvolgorde de echte grensovergangen volgt. Argentinië vereist sinds juli 2025 bewijs van reis-/zorgverzekering bij binnenkomst.",
    });
    route.blocks.splice(arIndex + 1, 0, clZuid);
    route.blocks.splice(arIndex + 2, 0, arUshuaia);
    touched = true;
  }

  // 3. Note the change (only once, and worded per-route since the split companion excludes Antarctica).
  const isMain = route.name === 'Patagonia & Antarctica Expedition 🧊';
  const note = isMain
    ? "Grote routelogica-herziening (2026-08): route van 3 naar 5 etappes uitgebreid — Chili en Argentinië komen nu elk twee keer voor (Chili-Noord/Carretera Austral, Argentinië-Calafate/El Chaltén, Chili-Zuid/Torres del Paine, Argentinië-Vuurland/Ushuaia), zodat de landvolgorde de echte grensovergangen volgt. Grootste vondst: er is geen wegverbinding tussen het einde van de Carretera Austral (Cochrane/Villa O'Higgins) en Puerto Natales — de vlucht die dit vroeger overbrugde (Balmaceda-Punta Arenas) is sinds oktober 2025 gestaakt. Oplossing: een overland-oversteek via Argentinië (Chile Chico-Los Antiguos-grens, Ruta 40 zuidwaarts naar El Calafate/El Chaltén), gevolgd door de Cancha Carrera-grensovergang rechtstreeks naar Torres del Paine — dit maakt tegelijk de eerdere Punta Arenas-Puerto Natales-terugreis overbodig. Chiloé Island en Puerto Montt van volgorde gewisseld. Alle bestemmingen kregen coördinaten voor de 'Gedetailleerd'-kaartweergave. Nieuw gevonden: Argentinië vereist sinds juli 2025 bewijs van reis-/zorgverzekering bij binnenkomst. Landen/dagen/budget-totaal ongewijzigd: 53 dagen, €15.075 — alleen opgesplitst in 5 etappes en heringedeeld."
    : "Grote routelogica-herziening (2026-08): zelfde herziening als Patagonia & Antarctica Expedition 🧊 zelf — route van 2 naar 4 etappes, zodat de landvolgorde de echte grensovergangen volgt (overland via Argentinië om de Carretera Austral-Puerto Natales-kloof te overbruggen, geen Punta Arenas-terugreis meer nodig). Zie Patagonia & Antarctica Expedition 🧊's eigen notities voor de volledige uitleg. Landen/dagen/budget-totaal ongewijzigd: 42 dagen, €5.575 — alleen opgesplitst in 4 etappes.";
  if (route.notes && !route.notes.includes('Grote routelogica-herziening (2026-08)')) {
    route.notes += '\n\n' + note;
    touched = true;
  }

  if (touched) rbSave();
}

/**
 * Route-logic review, third expedition in the ROUTE_LOGIC_REVIEW.md playbook (2026-08). Unlike
 * Eurasia/Patagonia, no geographic reordering was needed here — India's Delhi-hub-with-two-spokes
 * structure and Bhutan's return-to-Paro-for-Tiger's-Nest pattern were both already correct. This is
 * a pure field-patch: India trimmed (Agra/Amritsar/Dharamshala cut, all already visited by Youri),
 * Nepal/Bhutan notes updated with 2026-08 regulatory changes, and per-destination coordinates added
 * to all three countries. Applies to the main expedition and all three split companions (Noord-India
 * 🕌, Nepal 🏔️, Bhutan 🐉) since they share the same RB_EXPEDITION_CONTENT entries via rbContentFor().
 */
function rbMigrateHimalayaRouteLogicOverhaul() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_08_HIMALAYA_OVERHAUL)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_08_HIMALAYA_OVERHAUL, '1');

  const content = RB_EXPEDITION_CONTENT['India & Himalaya Expedition 🏔️'];
  if (!content) return;

  const routeNames = ['India & Himalaya Expedition 🏔️', 'Noord-India 🕌', 'Nepal 🏔️', 'Bhutan 🐉'];
  routeNames.forEach(name => {
    const route = rbRoutes.find(r => r.name === name);
    if (!route) return;

    let touched = false;
    ['IN', 'NP', 'BT'].forEach(code => {
      const block = route.blocks.find(b => b.country_code === code);
      const c = content[code];
      if (!block || !c) return;
      if (block.transport_to_next !== c.transport_to_next) { block.transport_to_next = c.transport_to_next; touched = true; }
      if (block.days !== c.days) { block.days = c.days; touched = true; }
      if (block.budget !== c.budget) { block.budget = c.budget; touched = true; }
      if (block.lat !== c.lat) { block.lat = c.lat; touched = true; }
      if (block.lng !== c.lng) { block.lng = c.lng; touched = true; }
      if (c.notes && block.notes !== c.notes) { block.notes = c.notes; touched = true; }
      const normalizeDest = d => (typeof d === 'string' ? { name: d, lat: null, lng: null } : { name: d.name, lat: d.lat ?? null, lng: d.lng ?? null });
      const newDests = (c.destinations || []).map(normalizeDest);
      const oldDests = (block.destinations || []).map(normalizeDest);
      if (JSON.stringify(newDests) !== JSON.stringify(oldDests)) {
        block.destinations = newDests.map(d => ({ id: rbNewDestId(), name: d.name, notes: '', lat: d.lat, lng: d.lng }));
        touched = true;
      }
    });

    const note = name === 'India & Himalaya Expedition 🏔️'
      ? "Routelogica-herziening (2026-08): geen geografische fouten gevonden — Delhi als hub met twee losse etappes (Rajasthan zuidwest, Punjab/Himachal noord) en Bhutans terugkeer naar Paro voor Tiger's Nest zijn allebei al de standaard/optimale aanpak, geen bug. Wel ingekort op Youri's verzoek: Agra/Taj Mahal, Amritsar/Gouden Tempel en Dharamshala/McLeod Ganj geschrapt (al bezocht) — zie India's eigen notities voor details. Bumthang-uitstap in Bhutan nu per vlucht Paro-Bumthang i.p.v. de lange terugrit over de weg (Youri's voorkeur). Nepal-notities bijgewerkt (TIMS niet meer gecontroleerd op Annapurna-paden, TAAN-groepsgrootte-eis vervallen); Bhutan-notities bijgewerkt (nieuwe 5% GST sinds 2026). Alle bestemmingen kregen coördinaten voor de 'Gedetailleerd'-kaartweergave. Nieuw totaal: 51 dagen, €4.470 (was 59 dagen/€4.810) — het verschil komt volledig door India's inkorting."
      : name === 'Noord-India 🕌'
      ? "Routelogica-herziening (2026-08): zelfde ronde als de hoofdexpeditie — Agra/Taj Mahal, Amritsar/Gouden Tempel en Dharamshala/McLeod Ganj geschrapt (al bezocht door Youri), Udaipur-Manali nu rechtstreeks, coördinaten toegevoegd. Zie India & Himalaya Expedition 🏔️'s eigen notities voor de volledige uitleg. Nieuw totaal: 22 dagen, €935 (was 30 dagen/€1.275)."
      : name === 'Nepal 🏔️'
      ? "Routelogica-herziening (2026-08): coördinaten per bestemming toegevoegd; TIMS wordt in de praktijk niet meer gecontroleerd op Annapurna-paden en TAAN heeft de minimum-2-trekkers-eis geschrapt (22 maart 2026) — zie India & Himalaya Expedition 🏔️'s eigen Nepal-notities voor details."
      : "Routelogica-herziening (2026-08): coördinaten per bestemming toegevoegd; Bumthang-uitstap nu per vlucht Paro-Bumthang i.p.v. de lange terugrit over de weg (Youri's voorkeur); nieuwe 5% GST op toeristische diensten sinds 1 januari 2026 genoteerd — zie India & Himalaya Expedition 🏔️'s eigen Bhutan-notities voor details.";

    if (route.notes && !route.notes.includes('Routelogica-herziening (2026-08)')) {
      route.notes += '\n\n' + note;
      touched = true;
    }

    if (touched) rbSave();
  });
}

/**
 * Route-logic review, fourth expedition in the ROUTE_LOGIC_REVIEW.md playbook (2026-08). Four real
 * geographic/practical fixes found via search (Finland-Zweden's Rovaniemi-omweg was verzwegen,
 * Noordkaap-Tromsø moet per vlucht i.p.v. 540km terugrijden, IJslands Ring Road had een Snæfellsnes-
 * zigzag, Groenlands instap/uitstap liep via het verkeerde eiland), plus twee wensen van Youri:
 * Denemarken (Kopenhagen) toegevoegd tussen Svalbard en de Faeröer, en Svalbard ingekort van een
 * meerdaagse bootexpeditie naar alleen Longyearbyen zelf. Applies to the main expedition and all five
 * split companions (Scandinavië Overland 🚂, Svalbard 🐻‍❄️, Faeröer 🐑, IJsland ❄️, Groenland 🧊)
 * since they share the same RB_EXPEDITION_CONTENT entries via rbContentFor().
 */
function rbMigrateNordicArcticRouteLogicOverhaul() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_08_NORDIC_ARCTIC_OVERHAUL)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_08_NORDIC_ARCTIC_OVERHAUL, '1');

  const content = RB_EXPEDITION_CONTENT['Nordic Arctic Expedition ❄️'];
  if (!content) return;

  const codesByRoute = {
    'Nordic Arctic Expedition ❄️': ['FI', 'SE', 'NO', 'SJ', 'FO', 'IS', 'GL'],
    'Scandinavië Overland 🚂': ['FI', 'SE', 'NO'],
    'Svalbard 🐻‍❄️': ['SJ'],
    'Faeröer 🐑': ['FO'],
    'IJsland ❄️': ['IS'],
    'Groenland 🧊': ['GL'],
  };

  Object.entries(codesByRoute).forEach(([routeName, codes]) => {
    const route = rbRoutes.find(r => r.name === routeName);
    if (!route) return;

    let touched = false;
    codes.forEach(code => {
      const block = route.blocks.find(b => b.country_code === code);
      const c = content[code];
      if (!block || !c) return;
      if (block.transport_to_next !== c.transport_to_next) { block.transport_to_next = c.transport_to_next; touched = true; }
      if (block.days !== c.days) { block.days = c.days; touched = true; }
      if (block.budget !== c.budget) { block.budget = c.budget; touched = true; }
      if (block.lat !== c.lat) { block.lat = c.lat; touched = true; }
      if (block.lng !== c.lng) { block.lng = c.lng; touched = true; }
      if (c.notes && block.notes !== c.notes) { block.notes = c.notes; touched = true; }
      const normalizeDest = d => (typeof d === 'string' ? { name: d, lat: null, lng: null } : { name: d.name, lat: d.lat ?? null, lng: d.lng ?? null });
      const newDests = (c.destinations || []).map(normalizeDest);
      const oldDests = (block.destinations || []).map(normalizeDest);
      if (JSON.stringify(newDests) !== JSON.stringify(oldDests)) {
        block.destinations = newDests.map(d => ({ id: rbNewDestId(), name: d.name, notes: '', lat: d.lat, lng: d.lng }));
        touched = true;
      }
    });

    // Insert Denmark right after Svalbard — only the main expedition carries the full 8-country set.
    if (routeName === 'Nordic Arctic Expedition ❄️') {
      const sjIndex = route.blocks.findIndex(b => b.country_code === 'SJ');
      const hasDenmark = route.blocks.some(b => b.country_code === 'DK');
      if (sjIndex !== -1 && !hasDenmark) {
        const dk = content['DK'];
        const dkBlock = rbBuildBlock('DK', 'Denmark', {
          region_id: route.blocks[sjIndex].region_id,
          days: dk.days, budget: dk.budget, lat: dk.lat, lng: dk.lng,
          destinations: dk.destinations, transport_to_next: dk.transport_to_next, notes: dk.notes,
        });
        route.blocks.splice(sjIndex + 1, 0, dkBlock);
        touched = true;
      }

      const region = (route.regions || []).find(r => r.name === 'North Atlantic Islands');
      if (region && region.budget !== 9550) { region.budget = 9550; touched = true; }
    }

    if (routeName === 'Svalbard 🐻‍❄️') {
      const region = (route.regions || [])[0];
      if (region && region.budget !== 900) { region.budget = 900; touched = true; }
    }

    const note = routeName === 'Nordic Arctic Expedition ❄️'
      ? "Routelogica-herziening (2026-08): drie geografische fixes (search-bevestigd) — Finland-Zweden's transport_to_next benoemt nu expliciet de terugkeer naar Rovaniemi en de omweg via de kust (was verzwegen); Noorwegens etappe eindigt op Noordkaap, teruggevlogen naar Tromsø (Honningsvåg-Tromsø, Widerøe) i.p.v. 540km terugrijden voor de Svalbard-vlucht; IJslands Ring Road-volgorde rechtgezet (Snæfellsnes stond als een zigzag tussen Jökulsárlón en Akureyri, nu als laatste stop vóór Reykjavik); Groenlands instap/uitstap gecorrigeerd (instap Nuuk, jaarrond direct vanuit Reykjavik; uitstap Ilulissat, seizoensgebonden direct terug, geen omweg via Nuuk meer). Daarnaast twee wensen van Youri: Denemarken (Kopenhagen, 3 dagen/€450) toegevoegd tussen Svalbard en de Faeröer — nog niet bezocht, wel al Oslo en Stockholm; Svalbard ingekort van een meerdaagse gegidste bootexpeditie (8 dagen/€3.725) naar alleen Longyearbyen zelf met 1-2 dagtours (4 dagen/€900). Alle bestemmingen kregen coördinaten voor de 'Gedetailleerd'-kaartweergave. Nieuw totaal: 8 landen (was 7), 67 dagen (was 68), €13.950 (was €16.325)."
      : routeName === 'Scandinavië Overland 🚂'
      ? "Routelogica-herziening (2026-08): Finland-Zweden's transport_to_next benoemt nu expliciet de terugkeer naar Rovaniemi en de omweg via de kust (was verzwegen); Noorwegens vlucht Honningsvåg-Tromsø toegevoegd i.p.v. terugrijden na Noordkaap. Coördinaten per bestemming toegevoegd. Zie Nordic Arctic Expedition ❄️'s eigen notities voor de volledige uitleg. Landen/dagen/budget-totaal ongewijzigd."
      : routeName === 'Svalbard 🐻‍❄️'
      ? "Ingekort (2026-08, op Youri's verzoek): van 8 dagen/€3.725 (meerdaagse gegidste bootexpeditie) naar 4 dagen/€900 — alleen Longyearbyen zelf met 1-2 dagtours. Coördinaten per bestemming toegevoegd."
      : routeName === 'IJsland ❄️'
      ? "Routelogica-herziening (2026-08): Ring Road-volgorde rechtgezet — Snæfellsnes stond als een zigzag tussen Jökulsárlón en Akureyri, nu als laatste stop vóór de terugkeer naar Reykjavik, zoals elke standaard Ring Road-planning het doet. Coördinaten per bestemming toegevoegd."
      : routeName === 'Groenland 🧊'
      ? "Routelogica-herziening (2026-08): instap/uitstap gecorrigeerd — instap Nuuk (jaarrond direct vanuit Reykjavik), uitstap Ilulissat (seizoensgebonden direct terug, geen omweg via Nuuk meer); Nuuk-Ilulissat onderling blijft een binnenlandse Air Greenland-vlucht. Coördinaten per bestemming toegevoegd."
      : "Coördinaten per bestemming toegevoegd (2026-08).";

    const marker = routeName === 'Svalbard 🐻‍❄️' ? "Ingekort (2026-08" : "(2026-08)";
    if (route.notes && !route.notes.includes(marker)) {
      route.notes += '\n\n' + note;
      touched = true;
    }

    if (touched) rbSave();
  });
}

/**
 * Route-logic review, fifth expedition in the ROUTE_LOGIC_REVIEW.md playbook (2026-08). Two small
 * geographic fixes (Cuba's Viñales-backtrack, Jamaica's Blue Mountains detour) plus per-destination
 * coordinates added throughout. This route has no shared RB_EXPEDITION_CONTENT entry (see
 * rbBuildCaribbeanAmazonExpeditionRoute()'s own comment), so the corrected field values are inlined
 * here directly instead of looked up from a content table. Applies to the main expedition and both
 * 2026-07 split companions (Caraïbische Eilanden-hop 🏝️, Suriname & Noord-Brazilië 🌴).
 */
function rbMigrateCaribbeanAmazonRouteLogicOverhaul() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_08_CARIBBEAN_OVERHAUL)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_08_CARIBBEAN_OVERHAUL, '1');

  const fixes = {
    CU: {
      destinations: [
        { name: 'Havana (Habana Vieja)', lat: 23.1136, lng: -82.3666 },
        { name: 'Viñales-vallei', lat: 22.6167, lng: -83.7097 },
        { name: 'Cienfuegos', lat: 22.1496, lng: -80.4394 },
        { name: 'Trinidad', lat: 21.8047, lng: -79.9825 },
      ],
      notes: "Havana en het UNESCO-koloniale Trinidad zijn de hoogtepunten; de rustige Viñales-vallei (tabak, karstlandschap) is de verborgen parel. Casas particulares (particuliere kamers) zijn de gangbare backpacker-accommodatie. Prijs geverifieerd (2026-07), klopt. ⚠️ Reisadvies oranje (bevestigd geldig, laatst bijgewerkt 23 juni 2026): grote tekorten aan stroom/brandstof/voedsel/medicijnen, toenemende veiligheidsrisico's — de zesde landelijke stroomstoring van 2026 viel op 2 augustus. Kaarten werken niet bij pinautomaten (contant meenemen). Sinds 1 juli 2025 is de papieren tourist card vervangen door een e-Visa (~$50), gekoppeld aan het verplichte gratis D'Viajeros-formulier (invullen binnen 72u vóór aankomst). Routelogica (2026-08, search-bevestigd): volgorde omgedraaid — Viñales stond eerder als laatste stop (een dubbele omweg: eerst voorbij Cienfuegos naar Trinidad, dan terug naar Cienfuegos, dan een 4,5u oversteek naar Viñales vlak bij Havana); nu als retourtje vanuit Havana meteen aan het begin, gevolgd door Cienfuegos-Trinidad zonder kruisende routes.",
      transport_to_next: 'Terug naar Havana (~4u15 rijden vanaf Trinidad — de enige realistische internationale gateway, Santiago de Cuba zou de omweg verergeren), dan vlucht Havana-Kingston (meestal met overstap via Panama City of Miami)',
    },
    JM: {
      destinations: [
        { name: 'Kingston', lat: 17.9714, lng: -76.7936 },
        { name: "Dunn's River Falls (Ocho Rios)", lat: 18.4108, lng: -77.1296 },
        { name: 'Port Antonio', lat: 18.1811, lng: -76.4513 },
        { name: 'Blue Mountains (Hardwar Gap)', lat: 18.0747, lng: -76.6597 },
      ],
      notes: 'Blue Mountains (koffie, wandelen) en Port Antonio (rafting, watervallen, nauwelijks toeristen vergeleken met Negril/Ocho Rios) zijn de sterkste match met natuur boven luxe. Prijscorrectie (2026-07): €75→€90/dag, Jamaica is duurder dan aangenomen (guesthouses + entreegelden). Routelogica (2026-08, search-bevestigd): volgorde omgedraaid — Blue Mountains stond als losse heen-en-terugtrip vlak na Kingston (de kustweg naar Ocho Rios loopt daar niet doorheen); nu als bergroute-terugweg (Hardwar Gap, koffieplantages/Newcastle) vanaf Port Antonio naar Kingston, in plaats van een aparte uitstap aan het begin.',
      transport_to_next: 'Kort eindstuk Blue Mountains-Kingston (Hardwar Gap-bergroute), dan vlucht Kingston-Curaçao (meestal met overstap via Panama City of Miami)',
    },
    CW: { destinations: [
      { name: 'Willemstad (UNESCO)', lat: 12.1091, lng: -68.9316 },
      { name: 'Shete Boka National Park', lat: 12.3667, lng: -69.15 },
      { name: 'stranden (Grote Knip)', lat: 12.2167, lng: -69.15 },
    ] },
    BQ: { destinations: [
      { name: 'Washington Slagbaai National Park', lat: 12.3167, lng: -68.4167 },
      { name: 'duiken/snorkelen (marine park)', lat: 12.15, lng: -68.2833 },
    ] },
    GP: { destinations: [
      { name: 'La Soufrière (vulkaan)', lat: 16.0456, lng: -61.6654 },
      { name: 'Carbet-watervallen', lat: 16.0472, lng: -61.6167 },
      { name: 'Îles des Saintes', lat: 15.8667, lng: -61.5833 },
    ] },
    DM: { destinations: [
      { name: 'Boiling Lake-trektocht', lat: 15.3167, lng: -61.2667 },
      { name: 'Trafalgar Falls', lat: 15.3181, lng: -61.3331 },
      { name: 'Champagne Reef', lat: 15.2833, lng: -61.3833 },
    ] },
    LC: { destinations: [
      { name: 'The Pitons', lat: 13.8167, lng: -61.0667 },
      { name: 'Sulphur Springs (drive-in vulkaan)', lat: 13.8347, lng: -61.0552 },
      { name: 'Tet Paul Nature Trail', lat: 13.8333, lng: -61.05 },
    ] },
    GD: { destinations: [
      { name: 'Onderwaterbeeldenpark', lat: 12.0742, lng: -61.7325 },
      { name: 'kruidenplantages (nootmuskaat)', lat: 12.1667, lng: -61.7333 },
      { name: 'Grand Etang National Park', lat: 12.0833, lng: -61.6833 },
    ] },
    SR: { destinations: [
      { name: 'Paramaribo (UNESCO)', lat: 5.852, lng: -55.2038 },
      { name: 'Marrondorpen aan de rivier', lat: 4.4, lng: -55.0 },
      { name: 'Brownsberg Nature Park', lat: 4.95, lng: -55.1667 },
    ] },
    BR: { destinations: [
      { name: 'Belém', lat: -1.4558, lng: -48.5039 },
      { name: 'Ilha do Marajó', lat: -0.7167, lng: -48.5167 },
      { name: 'Lençóis Maranhenses', lat: -2.5, lng: -43.0 },
      { name: 'Jericoacoara', lat: -2.7975, lng: -40.5137 },
      { name: 'Fortaleza', lat: -3.7172, lng: -38.5433 },
    ] },
  };

  const routeNames = ['Caribbean & Amazon Expedition 🌴', 'Caraïbische Eilanden-hop 🏝️', 'Suriname & Noord-Brazilië 🌴'];
  routeNames.forEach(routeName => {
    const route = rbRoutes.find(r => r.name === routeName);
    if (!route) return;

    let touched = false;
    Object.entries(fixes).forEach(([code, fix]) => {
      const block = route.blocks.find(b => b.country_code === code);
      if (!block) return;
      if (fix.transport_to_next && block.transport_to_next !== fix.transport_to_next) { block.transport_to_next = fix.transport_to_next; touched = true; }
      if (fix.notes && block.notes !== fix.notes) { block.notes = fix.notes; touched = true; }
      const normalizeDest = d => (typeof d === 'string' ? { name: d, lat: null, lng: null } : { name: d.name, lat: d.lat ?? null, lng: d.lng ?? null });
      const newDests = (fix.destinations || []).map(normalizeDest);
      const oldDests = (block.destinations || []).map(normalizeDest);
      if (JSON.stringify(newDests) !== JSON.stringify(oldDests)) {
        block.destinations = newDests.map(d => ({ id: rbNewDestId(), name: d.name, notes: '', lat: d.lat, lng: d.lng }));
        touched = true;
      }
    });

    const note = routeName === 'Caribbean & Amazon Expedition 🌴'
      ? "Routelogica-herziening (2026-08): twee kleine geografische fixes (search-bevestigd) — Cuba's volgorde omgedraaid (Havana-Viñales-Cienfuegos-Trinidad i.p.v. Havana-Trinidad-Cienfuegos-Viñales, geen dubbele omweg meer) en Jamaica's volgorde omgedraaid (Kingston-Ocho Rios-Port Antonio-Blue Mountains i.p.v. Blue Mountains als losse uitstap na Kingston). Cuba's reisadvies/tourist card-tekst bijgewerkt (e-Visa vervangt tourist card sinds juli 2025). Youri had nog geen van de 10 landen bezocht, geen cuts nodig. Coördinaten per bestemming toegevoegd. Landen/dagen/budget-totaal ongewijzigd: 97 dagen, €7.450."
      : routeName === 'Caraïbische Eilanden-hop 🏝️'
      ? "Routelogica-herziening (2026-08): zelfde ronde als Caribbean & Amazon Expedition 🌴 zelf — Cuba's en Jamaica's volgorde omgedraaid, coördinaten per bestemming toegevoegd. Zie Caribbean & Amazon Expedition 🌴's eigen notities voor de volledige uitleg. Landen/dagen/budget-totaal ongewijzigd."
      : "Routelogica-herziening (2026-08): geen geografische fouten in Suriname/Brazilië zelf — coördinaten per bestemming toegevoegd. Zie Caribbean & Amazon Expedition 🌴's eigen notities voor de fixes in Cuba/Jamaica (niet in dit blok).";

    if (route.notes && !route.notes.includes('Routelogica-herziening (2026-08)')) {
      route.notes += '\n\n' + note;
      touched = true;
    }

    if (touched) rbSave();
  });
}

function rbMigrateCentralEuropeRouteLogicOverhaul() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_08_CENTRAL_EUROPE_OVERHAUL)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_08_CENTRAL_EUROPE_OVERHAUL, '1');

  // Keyed by country_code, or `${code}::${firstDestinationName}` when the code repeats
  // across legs (IT x6, DE x2, CZ x2) — firstDestinationName is the OLD (plain-string) name
  // still present in already-seeded browser data, used purely to disambiguate which leg.
  const fixes = {
    FR: {
      destinations: [
        { name: 'Straatsburg', lat: 48.5734, lng: 7.7521 },
        { name: 'Colmar', lat: 48.0794, lng: 7.3585 },
        { name: 'Elzasser dorpen', lat: 48.0453, lng: 7.3079 },
      ],
      transport_to_next: 'Auto, ≈415 km naar Neuschwanstein/Garmisch via Karlsruhe-Stuttgart-Ulm-München (routelogica-check 2026-08: was als ≈300 km genoteerd, klopte niet) — geen tol of vignet nodig op dit traject.',
    },
    'DE::Neuschwanstein': {
      destinations: [
        { name: 'Neuschwanstein', lat: 47.5576, lng: 10.7498 },
        { name: 'Garmisch-Partenkirchen', lat: 47.4917, lng: 11.0958 },
        { name: 'Zugspitze', lat: 47.4211, lng: 10.9853 },
      ],
      transport_to_next: 'Auto, ≈250 km naar Luzern, verder door naar Interlaken/Lauterbrunnen (in totaal ≈400 km vanaf Garmisch — routelogica-check 2026-08: de oorspronkelijke ≈250 km klopte alleen voor Luzern zelf, niet voor de hele stopgroep) — Zwitsers jaarvignet verplicht, koop het bij de grens.',
    },
    CH: {
      destinations: [
        { name: 'Luzern/Vierwoudstrekenmeer', lat: 47.0502, lng: 8.3093 },
        { name: 'Interlaken', lat: 46.6863, lng: 7.8632 },
        { name: 'Lauterbrunnen', lat: 46.5927, lng: 7.9098 },
        { name: 'Berner Oberland', lat: 46.6244, lng: 8.0413 },
      ],
    },
    LI: {
      destinations: [{ name: 'Vaduz', lat: 47.1410, lng: 9.5209 }],
      transport_to_next: 'Auto, ≈150 km naar Innsbruck via Feldkirch/Fernpass (routelogica-check 2026-08: was als ≈120 km genoteerd, klopte niet) — Oostenrijks 10-dagenvignet nodig voor de snelwegen (€12,80, veel logischer voor een roadtrip dan het jaarvignet van €106,80).',
    },
    AT: {
      destinations: [
        { name: 'Innsbruck/Tirol', lat: 47.2692, lng: 11.4041 },
        { name: 'Salzburg', lat: 47.8095, lng: 13.0550 },
        { name: 'Berchtesgaden/Königssee', lat: 47.5892, lng: 13.0632 },
        { name: 'Salzkammergut', lat: 47.5622, lng: 13.6493 },
        { name: 'Grossglockner Hochalpenstrasse', lat: 47.0742, lng: 12.8306 },
      ],
    },
    'IT::Tre Cime': {
      destinations: [
        { name: 'Tre Cime', lat: 46.6198, lng: 12.3032 },
        { name: 'Lago di Braies', lat: 46.6958, lng: 12.0858 },
        { name: 'Seceda', lat: 46.5765, lng: 11.7099 },
        { name: 'Val Gardena', lat: 46.5645, lng: 11.6750 },
      ],
      transport_to_next: 'Auto, ≈410 km naar Milaan — samen met de Elzas-Beieren-rit aan het begin een van de langste ritten van de hele lus (routelogica-check 2026-08: geen unieke "langste rit" meer zodra de Elzas-Beieren-afstand gecorrigeerd is, zie dat land zijn eigen notitie) — vroeg vertrekken of splitsen met een tussenstop bij Verona/Brescia. Italiaanse autostrada rekent tol per kilometer.',
    },
    'IT::Duomo': {
      destinations: [
        { name: 'Duomo', lat: 45.4642, lng: 9.1900 },
        { name: 'Galleria', lat: 45.4656, lng: 9.1896 },
        { name: 'Navigli', lat: 45.4514, lng: 9.1739 },
        { name: 'Laatste Avondmaal', lat: 45.4661, lng: 9.1706 },
      ],
    },
    'IT::Egyptisch Museum': {
      destinations: [
        { name: 'Egyptisch Museum', lat: 45.0703, lng: 7.6869 },
        { name: 'Mole Antonelliana', lat: 45.0691, lng: 7.6934 },
        { name: 'historisch centrum', lat: 45.0703, lng: 7.6869 },
      ],
      transport_to_next: 'Auto tot een bewaakte parkeerplaats bij Monterosso/La Spezia (≈260 km via Alessandria/Genua — routelogica-check 2026-08: was als ≈185 km genoteerd, klopte niet) — de dorpjes zelf zijn grotendeels autovrij.',
    },
    'IT::Monterosso': {
      destinations: [
        { name: 'Monterosso', lat: 44.1461, lng: 9.6558 },
        { name: 'Vernazza', lat: 44.1355, lng: 9.6857 },
        { name: 'Corniglia', lat: 44.1197, lng: 9.7042 },
        { name: 'Manarola', lat: 44.1067, lng: 9.7275 },
        { name: 'Riomaggiore', lat: 44.0993, lng: 9.7378 },
      ],
    },
    'IT::Florence': {
      destinations: [
        { name: 'Florence', lat: 43.7696, lng: 11.2558 },
        { name: 'Siena', lat: 43.3188, lng: 11.3308 },
        { name: 'San Gimignano', lat: 43.4674, lng: 11.0431 },
        { name: 'Chianti', lat: 43.4708, lng: 11.3350 },
      ],
    },
    SM: {
      destinations: [{ name: 'Historisch centrum', lat: 43.9424, lng: 12.4578 }],
    },
    'IT::Piazza San Marco': {
      destinations: [
        { name: 'Piazza San Marco', lat: 45.4408, lng: 12.3155 },
        { name: 'Dorsoduro', lat: 45.4302, lng: 12.3245 },
        { name: 'Murano/Burano', lat: 45.4585, lng: 12.3538 },
      ],
    },
    SI: {
      destinations: [
        { name: 'Bled', lat: 46.3683, lng: 14.1146 },
        { name: 'Bohinj', lat: 46.2833, lng: 13.8833 },
        { name: 'Soča-vallei', lat: 46.3833, lng: 13.6167 },
        { name: 'Triglav NP', lat: 46.3833, lng: 13.8378 },
        { name: 'grotten (Postojna/Škocjan)', lat: 45.7830, lng: 14.2018 },
      ],
    },
    HR: {
      destinations: [
        { name: 'Plitvice', lat: 44.8654, lng: 15.5820 },
        { name: 'Zagreb', lat: 45.8150, lng: 15.9819 },
      ],
      notes: 'Plitvice verdient een volle dag (grote wandelroutes), Zagreb een korte stadstop. Update (2026-08): Kroatië is sinds maart 2026 officieel landmijnvrij verklaard — de eerdere waarschuwing over niet-geruimde zones rond Plitvice is niet langer actueel. Prijscheck (2026-07): binnenland-Kroatië (niet de kust) is goedkoper dan het vlakke €120/dag-tarief, gecorrigeerd naar €85/dag (Plitvice-entree ~€35-40 apart, niet in het dagtarief).',
    },
    RS: {
      destinations: [
        { name: 'Belgrado', lat: 44.7866, lng: 20.4489 },
        { name: 'Tara National Park (dagtrip vanuit Belgrado, retour)', lat: 43.8931, lng: 19.4206 },
        { name: 'Novi Sad', lat: 45.2671, lng: 19.8335 },
      ],
      notes: "Servië heeft verder weinig natuurhoogtepunten op deze route — Tara NP (Drina-rivier, bekende uitkijkpunten) is een bewuste omweg die bij deze reisstijl past, in het zuidwesten van het land. Routelogica-fix (2026-08, search-bevestigd): stond eerder als laatste stop vóór het vertrek naar Boedapest — Tara NP-Boedapest is in werkelijkheid ≈520 km, niet de ≈320 km die genoteerd stond, en zou zo'n 6-7 uur extra rijden hebben gekost bovenop de al lange reis. Opgelost door Tara NP als dagtrip/retourtje vanuit Belgrado te doen (±360-400 km heen-en-terug) en daarna via het bestaande Belgrado-Novi Sad-Boedapest-traject verder te reizen — de detour-kosten van Tara NP blijven bestaan, maar de dure lange rit vanuit een uithoek van het land vervalt. ⚠️ Reisadvies (2026-07, nog actueel): er zijn regelmatig demonstraties in Servië, vooral in Belgrado en Novi Sad (aanhoudende protestbeweging sinds eind 2024) — soms wegblokkades, incidenteel geweld, hou rekening met mogelijke vertraging bij wegcontroles. Vermijd drukte/demonstraties, check actuele situatie vlak voor vertrek. Prijscheck (2026-07): Servië is veruit het goedkoopst van de Balkanlanden op deze route — het vlakke €120/dag was meer dan het dubbele van reëel, gecorrigeerd naar €60/dag.",
      transport_to_next: 'Auto, ≈90 km Belgrado-Novi Sad, dan ≈298 km Novi Sad-Boedapest (≈388 km totaal) — Novi Sad ligt al op de directe route, dus dit stuk is ongewijzigd t.o.v. eerder.',
    },
    HU: {
      destinations: [
        { name: 'Boedapest', lat: 47.4979, lng: 19.0402 },
        { name: 'thermale baden', lat: 47.5186, lng: 19.0819 },
      ],
    },
    SK: {
      destinations: [
        { name: 'Bratislava', lat: 48.1486, lng: 17.1077 },
        { name: 'Hoge Tatra', lat: 49.1500, lng: 20.0500 },
        { name: 'Slovenský Raj', lat: 48.9333, lng: 20.4167 },
        { name: 'Spiš Castle', lat: 48.9958, lng: 20.7644 },
      ],
      transport_to_next: 'Auto, Hoge Tatra-Brno ≈335 km (routelogica-check 2026-08: was als ≈300 km genoteerd, klopte niet).',
    },
    'CZ::Brno': {
      destinations: [
        { name: 'Brno', lat: 49.1951, lng: 16.6068 },
        { name: 'Špilberk-burcht', lat: 49.1943, lng: 16.6034 },
      ],
    },
    'CZ::Praag': {
      destinations: [
        { name: 'Praag', lat: 50.0755, lng: 14.4378 },
        { name: 'Český Krumlov', lat: 48.8127, lng: 14.3175 },
        { name: 'Boheems Paradijs (Turnov)', lat: 50.5333, lng: 15.1667 },
      ],
      transport_to_next: 'Auto, rijd na Boheems Paradijs (Turnov) rechtstreeks door naar Wrocław (≈239 km) in plaats van eerst terug naar Praag (zou ≈323 km zijn) — routelogica-check 2026-08: scheelt ≈80 km, Turnov ligt al op de route.',
    },
    PL: {
      destinations: [
        { name: 'Wrocław', lat: 51.1079, lng: 17.0385 },
        { name: 'Sudeten (optioneel)', lat: 50.7500, lng: 15.7333 },
      ],
    },
    'DE::Dresden': {
      destinations: [
        { name: 'Dresden', lat: 51.0504, lng: 13.7373 },
        { name: 'Saksisch Zwitserland', lat: 50.9167, lng: 14.2667 },
      ],
    },
  };

  const route = rbRoutes.find(r => r.name === 'Central European Grand Roadtrip 🚗');
  if (route) {
    const repeatedCodes = new Set(['IT', 'DE', 'CZ']);
    let touched = false;

    route.blocks.forEach(block => {
      const firstDestName = (block.destinations || [])[0] && (block.destinations || [])[0].name;
      const key = repeatedCodes.has(block.country_code) ? `${block.country_code}::${firstDestName}` : block.country_code;
      const fix = fixes[key];
      if (!fix) return;

      if (fix.transport_to_next && block.transport_to_next !== fix.transport_to_next) { block.transport_to_next = fix.transport_to_next; touched = true; }
      if (fix.notes && block.notes !== fix.notes) { block.notes = fix.notes; touched = true; }
      const normalizeDest = d => (typeof d === 'string' ? { name: d, lat: null, lng: null } : { name: d.name, lat: d.lat ?? null, lng: d.lng ?? null });
      const newDests = (fix.destinations || []).map(normalizeDest);
      const oldDests = (block.destinations || []).map(normalizeDest);
      if (JSON.stringify(newDests) !== JSON.stringify(oldDests)) {
        block.destinations = newDests.map(d => ({ id: rbNewDestId(), name: d.name, notes: '', lat: d.lat, lng: d.lng }));
        touched = true;
      }
    });

    if (route.notes && !route.notes.includes('Routelogica-herziening (2026-08)')) {
      route.notes += '\n\n' +
        "Routelogica-herziening (2026-08, search-bevestigd): geen landvolgorde-fouten gevonden — de lus (Elzas→Alpenlanden→Dolomieten/Noord-Italië→Balkan→Midden-Europa→NL) is één doorlopende rit zonder onnodige kruisingen. Wel vijf kleinere fixes: (1) drie afstanden in transport_to_next waren te laag ingeschat (Straatsburg-Garmisch ≈300→415 km, Vaduz-Innsbruck ≈120→150 km, Turijn-Cinque Terre ≈185→260 km) en gecorrigeerd; (2) Hoge Tatra-Brno bijgesteld van ≈300 naar ≈335 km; (3) de rit van Boheems Paradijs (Turnov) naar Wrocław loopt nu rechtstreeks door in plaats van eerst terug naar Praag — scheelt ≈80 km, Turnov ligt al op de route; (4) Servië's Tara National Park was als laatste stop vóór Boedapest genoteerd, maar Tara-Boedapest is in werkelijkheid ≈520 km (niet de genoteerde ≈320 km) — opgelost door Tara NP als dagtrip/retourtje vanuit Belgrado te doen, waarna de reis gewoon via Novi Sad naar Boedapest vervolgt; (5) Kroatië's landmijn-waarschuwing bij Plitvice is verwijderd — het land is sinds maart 2026 officieel landmijnvrij verklaard. Youri had al veel van deze route eerder gezien maar wilde niets inkorten voor déze trip ('moet langs de mooiste stukken gaan') — geen persoonlijke-voorkeur-cuts deze ronde. Per-bestemming coördinaten toegevoegd aan alle 14 etappes voor de 'Gedetailleerd'-kaartweergave. Landen/dagen/totale grondkosten ongewijzigd (45/70 dagen, €8.030 p.p.) — alleen volgorde-details, afstanden en notities aangepast.";
      touched = true;
    }

    if (touched) rbSave();
  }
}

/**
 * British Isles & Celtic Coast Expedition — route-logic review (2026-08), seventh expedition in the
 * ROUTE_LOGIC_REVIEW.md playbook. Uses the SAME wholesale-replace pattern this route's own prior
 * migrations already established (rbMigratePriceVerificationRound3, rbMigrateRouteLineCoordsRound2)
 * rather than a field-patch — this route has no field-patch migration precedent to preserve, and its
 * two prior corrections both replaced it wholesale via its own build function. See
 * rbBuildBritishIslesExpeditionRoute()'s own docstring for the full list of fixes (Isle of Man moved
 * to the Lake District leg instead of after Bamburgh, Scotland's Highlands zigzag reordered, Ireland's
 * Dublin detour dropped, plus minor distance corrections and per-destination coordinates).
 */
function rbMigrateBritishIslesRouteLogicOverhaul() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_08_BRITISH_ISLES_OVERHAUL)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_08_BRITISH_ISLES_OVERHAUL, '1');

  const idx = rbRoutes.findIndex(r => r.name === 'British Isles & Celtic Coast Expedition 🍀');
  if (idx === -1) return;

  rbRoutes.splice(idx, 1, rbBuildBritishIslesExpeditionRoute());
  rbSave();
}

function rbMigrateBahrainIntoMediterraneanExpedition() {
  if (localStorage.getItem(RB_MIGRATE_FLAG_2026_07_BAHRAIN_ADDITION)) return;
  localStorage.setItem(RB_MIGRATE_FLAG_2026_07_BAHRAIN_ADDITION, '1');

  const route = rbRoutes.find(r => r.name === 'Mediterranean Civilizations Expedition 🏛️');
  if (!route) return;
  if (route.blocks.some(b => b.country_code === 'BH')) return;

  const omIndex = route.blocks.findIndex(b => b.country_code === 'OM');
  if (omIndex === -1) return;

  const omBlock = route.blocks[omIndex];
  omBlock.transport_to_next = 'Vlucht Muscat-Manama — korte Golfvlucht.';

  const bahrainBlock = rbBuildBlock('BH', 'Bahrain', {
    region_id: omBlock.region_id,
    days: 3, budget: 350,
    destinations: ["Qal'at al-Bahrein (Bahrein Fort)", 'Bahrain National Museum', 'Al Fateh Grand Mosque', 'Tree of Life'],
    notes: "Qal'at al-Bahrein (UNESCO) was de hoofdstad van de Dilmun-beschaving, een Bronstijd-handelsbeschaving die al rond 2000 v.Chr. tussen Mesopotamië en de Indusvallei handelde — een nog oudere laag geschiedenis dan de Nabateese en Arabische handelsroutes eerder in deze etappe. De Tree of Life, een eeuwenoude boom die op onverklaarde wijze midden in de woestijn overleeft, als natuurlijke curiositeit tussen de geschiedenis door.",
    transport_to_next: 'Vlucht Manama-Doha — korte Golfvlucht.',
  });
  route.blocks.splice(omIndex + 1, 0, bahrainBlock);

  const arabianRegion = (route.regions || []).find(r => r.name === 'Egypte & het Arabisch Schiereiland');
  if (arabianRegion) arabianRegion.budget = 2500;

  const note = "Toevoeging (2026-07): Bahrein toegevoegd tussen Oman en Qatar in de regio 'Egypte & het Arabisch Schiereiland' — dit stond hier al genoteerd als kandidaat sinds deze route werd gebouwd. Qal'at al-Bahrein (UNESCO) was de hoofdstad van de Dilmun-beschaving, een Bronstijd-handelsbeschaving tussen Mesopotamië en de Indusvallei — een nog oudere laag geschiedenis dan de rest van deze etappe. Nieuw totaal: 150 dagen (was 147), regiobudget 'Egypte & het Arabisch Schiereiland' €2.500 (was €2.150).";
  if (route.notes && !route.notes.includes('Toevoeging (2026-07): Bahrein')) {
    route.notes += '\n\n' + note;
  }

  rbSave();
}
