/**
 * Route Builder — UI: view switching, list/library/editor/calendar/map rendering, event binding.
 * Loads third of 4 files. Split out 2026-08 for context-efficiency reasons — no logic changes.
 * Reads only `rbRoutes` (already seeded/migrated) — never touches RB_EXPEDITION_CONTENT directly.
 */

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

// ---- list view: grouped by Grand Expedition vs. continent ----
//
// The 13 original intercontinental expeditions (rbSeedPredefinedExpeditions +co) get their own
// top group, unsorted (their creation order is already a deliberate curated order). Everything
// else — every "Major Trip"-level split route and every standalone single/multi-country route —
// gets bucketed into a continent group by looking at which continent has the most days across its
// blocks, then sorted alphabetically within that group. This scales automatically to new routes
// without needing a route-name lookup table to maintain.

const RB_GRAND_EXPEDITION_NAMES = new Set([
  'Eurasia Grand Tour 🌏', 'Pan-American Grand Tour 🌎', 'Africa Grand Tour 🌍',
  'Mediterranean Civilizations Expedition 🏛️', 'Nordic Arctic Expedition ❄️',
  'Patagonia & Antarctica Expedition 🧊', 'India & Himalaya Expedition 🏔️',
  'North America Grand Traverse 🌎', 'Oceania Grand Expedition 🌊',
  'Caribbean & Amazon Expedition 🌴', 'West & Central Africa Expedition 🌍',
  'Central European Grand Roadtrip 🚗', 'British Isles & Celtic Coast Expedition 🍀',
]);

// ISO alpha-2 code -> continent bucket, covering every country code used anywhere in this file.
// North America includes Mexico/Central America; Caribbean and South America (incl. Antarctica,
// bundled in with Patagonia's own cruise) are their own buckets, matching how the Grand
// Expeditions themselves already separate "Pan-American"/"North America"/"Caribbean & Amazon".
const RB_CONTINENT_BY_CODE = {
  // Africa
  MA: 'africa', TN: 'africa', EG: 'africa', ET: 'africa', KE: 'africa', UG: 'africa', RW: 'africa',
  TZ: 'africa', MG: 'africa', MU: 'africa', MW: 'africa', MZ: 'africa', ZM: 'africa', ZW: 'africa',
  BW: 'africa', NA: 'africa', AO: 'africa', ZA: 'africa', LS: 'africa', SZ: 'africa', CV: 'africa',
  SN: 'africa', GM: 'africa', CI: 'africa', GH: 'africa', TG: 'africa', BJ: 'africa', CM: 'africa',
  ST: 'africa', GA: 'africa',
  // Asia (incl. the Caucasus/Central Asia and the Arabian Peninsula)
  MY: 'asia', TR: 'asia', JO: 'asia', OM: 'asia', BH: 'asia', QA: 'asia', GE: 'asia', AM: 'asia',
  AZ: 'asia', KZ: 'asia', KG: 'asia', TJ: 'asia', UZ: 'asia', CN: 'asia', MN: 'asia', JP: 'asia',
  TW: 'asia', VN: 'asia', LA: 'asia', KH: 'asia', TH: 'asia', SG: 'asia', BN: 'asia', PH: 'asia',
  ID: 'asia', TL: 'asia', IN: 'asia', NP: 'asia', BT: 'asia',
  // Europe (incl. Cyprus — grouped with Greece/Italy in the Mediterranean expedition — and the
  // Nordic Arctic islands, which are politically Danish/Norwegian even where geographically remote)
  ES: 'europe', MT: 'europe', IT: 'europe', FR: 'europe', GR: 'europe', CY: 'europe', DE: 'europe',
  CH: 'europe', LI: 'europe', AT: 'europe', SM: 'europe', SI: 'europe', HR: 'europe', RS: 'europe',
  HU: 'europe', SK: 'europe', CZ: 'europe', PL: 'europe', GB: 'europe', IM: 'europe', IE: 'europe',
  GG: 'europe', JE: 'europe', BE: 'europe', BA: 'europe', ME: 'europe', AL: 'europe', MK: 'europe',
  FI: 'europe', SE: 'europe', NO: 'europe', SJ: 'europe', DK: 'europe', FO: 'europe', IS: 'europe',
  GL: 'europe',
  // North America (Canada/US/Mexico/Central America)
  CA: 'north-america', US: 'north-america', MX: 'north-america', GT: 'north-america',
  BZ: 'north-america', HN: 'north-america', SV: 'north-america', NI: 'north-america',
  CR: 'north-america', PA: 'north-america',
  // Caribbean
  CU: 'caribbean', JM: 'caribbean', CW: 'caribbean', BQ: 'caribbean', GP: 'caribbean',
  DM: 'caribbean', LC: 'caribbean', GD: 'caribbean',
  // South America (+ Antarctica, reached only via Ushuaia at the southern tip of this continent)
  CO: 'south-america', EC: 'south-america', PE: 'south-america', BO: 'south-america',
  CL: 'south-america', AR: 'south-america', BR: 'south-america', SR: 'south-america',
  AQ: 'south-america',
  // Oceania
  AU: 'oceania', NZ: 'oceania', VU: 'oceania', FJ: 'oceania', TO: 'oceania', WS: 'oceania',
  CK: 'oceania',
};

const RB_CONTINENT_GROUPS = [
  { key: 'grand', label: 'Grand Expeditions', dot: 'grand' },
  { key: 'africa', label: 'Africa', dot: 'africa' },
  { key: 'asia', label: 'Asia', dot: 'asia' },
  { key: 'europe', label: 'Europe', dot: 'europe' },
  { key: 'north-america', label: 'North America', dot: 'north-america' },
  { key: 'caribbean', label: 'Caribbean', dot: 'caribbean' },
  { key: 'south-america', label: 'South America', dot: 'south-america' },
  { key: 'oceania', label: 'Oceania', dot: 'oceania' },
];

function rbRouteGroupKey(route) {
  if (RB_GRAND_EXPEDITION_NAMES.has(route.name)) return 'grand';

  const daysByContinent = {};
  (route.blocks || []).forEach(b => {
    const continent = RB_CONTINENT_BY_CODE[b.country_code] || 'other';
    daysByContinent[continent] = (daysByContinent[continent] || 0) + (parseInt(b.days) || 0);
  });

  let best = 'other';
  let bestDays = -1;
  Object.entries(daysByContinent).forEach(([continent, days]) => {
    if (days > bestDays) { best = continent; bestDays = days; }
  });
  return best;
}

// ---- tag filter panel (Trip Taxonomy — see TRIP_TAXONOMY.md) ----
//
// Each entry describes one dropdown. `keys` are the normalizeHeader()'d CSV column(s) it reads —
// two keys means "Primary + Secondary" are combined into a single filter (e.g. Travel Mode).
// `order` gives an explicit ordinal sort (duration/activity/budget tiers etc); omit it for a
// plain alphabetical sort. Grouped by axis (the same WHERE/HOW LONG/HOW/WHAT/WHY/STYLE/
// DIFFICULTY/WHEN/COST structure TRIP_TAXONOMY.md itself uses), plus a STATUS and FAMILY group
// for the fields that don't map onto one of the nine taxonomy axes.
const RB_TAXONOMY_FILTERS = [
  { axis: 'WHERE', label: 'Country', keys: ['countries'] },
  { axis: 'WHERE', label: 'Continent', keys: ['continent'], splitContinent: true,
    order: ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Caribbean', 'Oceania', 'Antarctica'] },
  { axis: 'WHERE', label: 'Geographic Scope', keys: ['geographic_scope'],
    order: ['City', 'Single Region', 'Single Country', 'Multi-Region (same country)', 'Multi-Country', 'Grand Tour / Continental'] },
  { axis: 'HOW LONG', label: 'Duration', keys: ['duration_category'],
    order: ['Weekend', 'Short Trip', 'Holiday', 'Extended Trip', 'Expedition'] },
  { axis: 'HOW', label: 'Travel Mode', keys: ['primary_travel_mode', 'secondary_travel_modes'] },
  { axis: 'WHAT', label: 'Trip Type', keys: ['primary_trip_type', 'secondary_trip_types'] },
  { axis: 'WHAT', label: 'Combination Potential', keys: ['combination_potential'],
    order: ['Standalone', 'Combinable', 'Gateway / Building Block'] },
  { axis: 'WHY', label: 'Theme', keys: ['themes'] },
  { axis: 'STYLE', label: 'Travel Style', keys: ['travel_style'] },
  { axis: 'DIFFICULTY', label: 'Activity Level', keys: ['activity_level'],
    order: ['Relaxed', 'Light', 'Moderate', 'Active', 'Very Active'] },
  { axis: 'DIFFICULTY', label: 'Trip Complexity', keys: ['trip_complexity'], order: ['Easy', 'Moderate', 'Complex'] },
  { axis: 'DIFFICULTY', label: 'Border Complexity', keys: ['border_complexity'],
    order: ['Schengen-only', 'Simple non-Schengen', 'Complex'] },
  { axis: 'WHEN', label: 'Month', keys: ['best_months', 'good_months'],
    order: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
  { axis: 'COST', label: 'Budget Level', keys: ['budget_level'], order: ['€', '€€', '€€€', '€€€€'] },
  { axis: 'STATUS', label: 'Advisory Level', keys: ['advisory_level'], normalize: rbNormalizeAdvisoryLevel,
    order: ['Green', 'Yellow', 'Orange', 'Red'] },
  { axis: 'STATUS', label: 'Verification Status', keys: ['verification_status'], order: ['Verified', 'Needs Review', 'Draft'] },
  { axis: 'FAMILY', label: 'Grand Expedition', keys: ['parent_expedition'] },
];
const RB_FILTER_AXIS_ORDER = ['WHERE', 'HOW LONG', 'HOW', 'WHAT', 'WHY', 'STYLE', 'DIFFICULTY', 'WHEN', 'COST', 'STATUS', 'FAMILY'];

let rbActiveFilters = {}; // filter label -> selected value (empty/absent = no filter on that field)
let rbSearchQuery = '';

/**
 * `Advisory Level` mixes clean Green/Yellow/Orange/Red tags with legacy Dutch values (Geel/
 * Groen/Oranje) and long free-text safety notes ("Red — Bahrain is on 'do not travel'…").
 * Only a recognized leading color word becomes a filter value — everything else is left out of
 * the dropdown (the nuance still lives in the route's own notes, same as TRIP_TAXONOMY.md
 * already treats Photography-as-theme: filter on the reliable signal, not free text).
 */
function rbNormalizeAdvisoryLevel(raw) {
  const lead = (raw || '').split(/[—-]/)[0].trim().toLowerCase();
  const map = { green: 'Green', groen: 'Green', geel: 'Yellow', yellow: 'Yellow', orange: 'Orange', oranje: 'Orange', red: 'Red', rood: 'Red' };
  return map[lead] || null;
}

/** "Europe & Africa" / "Europe/Africa/Asia" / "Americas (Central & South America)" -> individual continents. */
function rbSplitContinent(raw) {
  const cleaned = raw.replace(/\([^)]*\)/g, '').trim();
  if (/^americas$/i.test(cleaned)) return ['North America', 'South America'];
  return cleaned.split(/[&/]/).map(s => s.trim()).filter(Boolean);
}

/** Extracts this field's value(s) for one taxonomy row as a deduped array of clean tokens. */
function rbFilterFieldValues(row, field) {
  let tokens = field.keys
    .map(k => row[k] || '')
    .join(';')
    .split(';')
    .map(s => s.trim().replace(/\s*\/\s*/g, ' / '))
    .filter(s => s && s !== '—' && s !== '-');
  if (field.splitContinent) tokens = tokens.flatMap(rbSplitContinent);
  if (field.normalize) tokens = tokens.map(field.normalize).filter(Boolean);
  return [...new Set(tokens)];
}

function rbSortFilterValues(values, field) {
  const order = field.order || (field.label === 'Grand Expedition' ? [...RB_GRAND_EXPEDITION_NAMES] : null);
  if (!order) return values.slice().sort((a, b) => a.localeCompare(b));
  return values.slice().sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

/** Builds (or rebuilds) the tag filter panel's dropdowns from whatever taxonomy data loaded. */
function rbInitFilterPanel() {
  const panel = document.getElementById('rbFilterPanel');
  if (!panel) return;

  if (!rbTaxonomyLoaded || !Object.keys(rbTaxonomyByName).length) {
    panel.innerHTML = `<p class="rb-filter-empty">Trip tags aren't available right now, so filtering by tag is disabled — search by name above still works.</p>`;
    return;
  }

  const rows = Object.values(rbTaxonomyByName);
  const byAxis = {};
  RB_TAXONOMY_FILTERS.forEach(field => {
    const set = new Set();
    rows.forEach(row => rbFilterFieldValues(row, field).forEach(v => set.add(v)));
    if (!set.size) return;
    (byAxis[field.axis] = byAxis[field.axis] || []).push({ field, values: rbSortFilterValues([...set], field) });
  });

  panel.innerHTML = RB_FILTER_AXIS_ORDER.filter(axis => byAxis[axis]).map(axis => `
    <div class="rb-filter-group">
      <div class="rb-filter-group-title">${escapeHTML(axis)}</div>
      ${byAxis[axis].map(({ field, values }) => `
        <select class="filter-select rb-filter-select" data-filter-label="${escapeHTML(field.label)}">
          <option value="">${escapeHTML(field.label)} (all)</option>
          ${values.map(v => `<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join('')}
        </select>`).join('')}
    </div>`).join('');
}

function rbUpdateFilterBadge() {
  const activeCount = Object.values(rbActiveFilters).filter(Boolean).length;
  const badge = document.getElementById('rbFilterBadge');
  const clearBtn = document.getElementById('rbFilterClearBtn');
  if (badge) { badge.hidden = !activeCount; badge.textContent = String(activeCount); }
  if (clearBtn) clearBtn.hidden = !activeCount;
}

/** True if `route` should show given the current search text + active tag filters. */
function rbRouteMatchesFilters(route) {
  if (rbSearchQuery && !(route.name || '').toLowerCase().includes(rbSearchQuery)) return false;

  const activeEntries = Object.entries(rbActiveFilters).filter(([, v]) => v);
  if (!activeEntries.length) return true;

  const row = rbTaxonomyByName[rbTaxonomyKey(route.name)];
  if (!row) return false; // no taxonomy data for this route — can't confirm a match once filters are active

  return activeEntries.every(([label, value]) => {
    const field = RB_TAXONOMY_FILTERS.find(f => f.label === label);
    return field && rbFilterFieldValues(row, field).includes(value);
  });
}

function rbRenderList() {
  const grid = document.getElementById('routeListGrid');
  const count = document.getElementById('routeListCount');
  const filtered = rbRoutes.filter(rbRouteMatchesFilters);
  const filtersActive = rbSearchQuery || Object.values(rbActiveFilters).some(Boolean);

  if (count) {
    count.textContent = filtersActive
      ? `${filtered.length} of ${rbRoutes.length} route${rbRoutes.length !== 1 ? 's' : ''}`
      : `${rbRoutes.length} route${rbRoutes.length !== 1 ? 's' : ''}`;
  }

  if (!rbRoutes.length) {
    grid.innerHTML = `
      <div class="empty-message" style="grid-column:1/-1;padding:3rem 1rem">
        <span class="empty-icon">🧭</span>
        <p>No big routes yet. Click "+ New Route" to start stacking countries into a long trip.</p>
      </div>`;
    return;
  }

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-message" style="grid-column:1/-1;padding:3rem 1rem">
        <span class="empty-icon">🔍</span>
        <p>No routes match these filters. Try clearing one or use "✕ Clear filters".</p>
      </div>`;
    return;
  }

  const byGroup = {};
  filtered.forEach(route => {
    const key = rbRouteGroupKey(route);
    (byGroup[key] = byGroup[key] || []).push(route);
  });

  const sections = RB_CONTINENT_GROUPS.map(({ key, label, dot }) => {
    const routes = byGroup[key];
    if (!routes || !routes.length) return '';
    if (key !== 'grand') routes.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    return `
      <div class="rb-group">
        <div class="rb-group-header">
          <div class="rb-group-dot rb-group-dot-${dot}"></div>
          <div class="rb-group-title">${escapeHTML(label)}</div>
          <div class="rb-group-count">${routes.length} route${routes.length !== 1 ? 's' : ''}</div>
        </div>
        <div class="rb-list-grid">${routes.map(rbBuildRouteCard).join('')}</div>
      </div>`;
  });

  // Anything that didn't map to a known continent (shouldn't normally happen) still needs to be
  // shown rather than silently dropped — fall back to a plain, unlabeled grid for those.
  const other = byGroup.other;
  if (other && other.length) {
    sections.push(`<div class="rb-list-grid">${other.map(rbBuildRouteCard).join('')}</div>`);
  }

  grid.innerHTML = sections.join('');
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

  document.getElementById('rbSearchInput').addEventListener('input', e => {
    rbSearchQuery = e.target.value.toLowerCase().trim();
    rbRenderList();
  });

  document.getElementById('rbFilterToggleBtn').addEventListener('click', () => {
    const panel = document.getElementById('rbFilterPanel');
    panel.hidden = !panel.hidden;
  });

  document.getElementById('rbFilterPanel').addEventListener('change', e => {
    const select = e.target.closest('.rb-filter-select');
    if (!select) return;
    rbActiveFilters[select.dataset.filterLabel] = select.value;
    rbUpdateFilterBadge();
    rbRenderList();
  });

  document.getElementById('rbFilterClearBtn').addEventListener('click', () => {
    rbActiveFilters = {};
    document.querySelectorAll('.rb-filter-select').forEach(sel => { sel.value = ''; });
    rbUpdateFilterBadge();
    rbRenderList();
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

