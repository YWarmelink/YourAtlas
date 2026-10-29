/**
 * Route Builder — UI: view switching, list/library/editor/calendar/map rendering, event binding.
 * Loads third of 4 files. Split out 2026-08 for context-efficiency reasons — no logic changes.
 * Reads only `rbRoutes` (already seeded/migrated) — never touches RB_EXPEDITION_CONTENT directly.
 */

// ---- view switching ----

// 'overview' (read-only trip-at-a-glance: map + compact per-country list) or 'edit' (the full
// form). rbShowEditor() below picks the starting mode; the toggle button flips it from there.
let rbEditorMode = 'overview';

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
  const route = rbGetCurrent();
  // A brand-new/empty route has nothing to show in Overview, so open straight into Edit.
  rbEditorMode = (route && route.blocks && route.blocks.length) ? 'overview' : 'edit';
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
  'East & Southeast Asia Grand Tour 🐉',
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
  ID: 'asia', TL: 'asia', IN: 'asia', NP: 'asia', BT: 'asia', KR: 'asia',
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
const RB_DURATION_OPTION_LABELS = {
  Weekend: 'Weekend (2-4 days)',
  'Short Trip': 'Short Trip (5-7 days)',
  Holiday: 'Holiday (8-14 days)',
  'Extended Trip': 'Extended Trip (15-21 days)',
  Expedition: 'Expedition (22+ days)',
};

const RB_TAXONOMY_FILTERS = [
  { axis: 'WHERE', label: 'Country', keys: ['countries'] },
  { axis: 'WHERE', label: 'Continent', keys: ['continent'], splitContinent: true,
    order: ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Caribbean', 'Oceania', 'Antarctica'] },
  { axis: 'WHERE', label: 'Geographic Scope', keys: ['geographic_scope'],
    order: ['City', 'Single Region', 'Single Country', 'Multi-Region (same country)', 'Multi-Country', 'Grand Tour / Continental'] },
  { axis: 'HOW LONG', label: 'Duration', keys: ['duration_category'],
    order: ['Weekend', 'Short Trip', 'Holiday', 'Extended Trip', 'Expedition'], optionLabels: RB_DURATION_OPTION_LABELS },
  { axis: 'HOW', label: 'Travel Mode', keys: ['primary_travel_mode', 'secondary_travel_modes'], multi: true },
  { axis: 'WHAT', label: 'Trip Type', keys: ['primary_trip_type', 'secondary_trip_types'], multi: true },
  { axis: 'WHAT', label: 'Combination Potential', keys: ['combination_potential'],
    order: ['Standalone', 'Combinable', 'Gateway / Building Block'] },
  { axis: 'WHY', label: 'Theme', keys: ['themes'], multi: true },
  { axis: 'STYLE', label: 'Travel Style', keys: ['travel_style'], multi: true },
  { axis: 'DIFFICULTY', label: 'Activity Level', keys: ['activity_level'],
    order: ['Relaxed', 'Light', 'Moderate', 'Active', 'Very Active'] },
  { axis: 'DIFFICULTY', label: 'Trip Complexity', keys: ['trip_complexity'], order: ['Easy', 'Moderate', 'Complex'] },
  { axis: 'DIFFICULTY', label: 'Border Complexity', keys: ['border_complexity'],
    order: ['Schengen-only', 'Simple non-Schengen', 'Complex'] },
  { axis: 'WHEN', label: 'Best Time to Visit', keys: ['best_months', 'good_months'], multi: true,
    order: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
  { axis: 'COST', label: 'Budget Level', keys: ['budget_level'], order: ['€', '€€', '€€€', '€€€€'] },
  { axis: 'STATUS', label: 'Safety Status', keys: ['advisory_level'], normalize: rbNormalizeAdvisoryLevel,
    order: ['Green', 'Yellow', 'Orange', 'Red'] },
  { axis: 'STATUS', label: 'Research Verified', keys: ['verification_status'], order: ['Verified', 'Needs Review', 'Draft'] },
  { axis: 'FAMILY', label: 'Part of Expedition', keys: ['parent_expedition'] },
];
const RB_FILTER_AXIS_ORDER = ['WHERE', 'HOW LONG', 'HOW', 'WHAT', 'WHY', 'STYLE', 'DIFFICULTY', 'WHEN', 'COST', 'STATUS', 'FAMILY'];

let rbActiveFilters = {}; // filter label -> array of selected values (empty/absent = no filter on that field)
let rbSearchQuery = '';

/**
 * The `Safety Status` filter reads `advisory_level`, which mixes clean Green/Yellow/Orange/Red
 * tags with legacy Dutch values (Geel/Groen/Oranje) and long free-text safety notes ("Red —
 * Bahrain is on 'do not travel'…"). Only a recognized leading color word becomes a filter value —
 * everything else is left out of the dropdown (the nuance still lives in the route's own notes,
 * same as TRIP_TAXONOMY.md already treats Photography-as-theme: filter on the reliable signal,
 * not free text).
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
  const order = field.order || (field.label === 'Part of Expedition' ? [...RB_GRAND_EXPEDITION_NAMES] : null);
  if (!order) return values.slice().sort((a, b) => a.localeCompare(b));
  return values.slice().sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

/** Display text for one option — usually the value itself, but e.g. Duration adds a day range. */
function rbOptionLabel(field, value) {
  return (field.optionLabels && field.optionLabels[value]) || value;
}

/** One dropdown's markup — a native `<select>` for single-value fields, a checkbox menu for `multi` ones. */
function rbBuildFilterControlHTML(field, values) {
  if (field.multi) {
    return `
      <div class="rb-multiselect" data-filter-label="${escapeHTML(field.label)}">
        <button type="button" class="filter-select rb-multiselect-toggle">${escapeHTML(field.label)} (all)</button>
        <div class="rb-multiselect-menu" hidden>
          ${values.map(v => `
            <label class="rb-multiselect-option">
              <input type="checkbox" value="${escapeHTML(v)}">
              <span>${escapeHTML(rbOptionLabel(field, v))}</span>
            </label>`).join('')}
        </div>
      </div>`;
  }
  return `
    <select class="filter-select rb-filter-select" data-filter-label="${escapeHTML(field.label)}">
      <option value="">${escapeHTML(field.label)} (all)</option>
      ${values.map(v => `<option value="${escapeHTML(v)}">${escapeHTML(rbOptionLabel(field, v))}</option>`).join('')}
    </select>`;
}

/** Builds (or rebuilds) the tag filter panel's controls from whatever taxonomy data loaded. */
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
      ${byAxis[axis].map(({ field, values }) => rbBuildFilterControlHTML(field, values)).join('')}
    </div>`).join('');
}

/** Updates a multi-select's toggle button text ("Theme (all)" / "Theme (2)") and active styling. */
function rbUpdateMultiselectToggleLabel(wrap, label, selected) {
  const btn = wrap.querySelector('.rb-multiselect-toggle');
  if (!btn) return;
  btn.textContent = selected.length ? `${label} (${selected.length})` : `${label} (all)`;
  btn.classList.toggle('rb-multiselect-toggle--active', selected.length > 0);
}

function rbUpdateFilterBadge() {
  const activeCount = Object.values(rbActiveFilters).filter(v => v && v.length).length;
  const badge = document.getElementById('rbFilterBadge');
  const clearBtn = document.getElementById('rbFilterClearBtn');
  if (badge) { badge.hidden = !activeCount; badge.textContent = String(activeCount); }
  if (clearBtn) clearBtn.hidden = !activeCount;
}

/** True if `route` should show given the current search text + active tag filters. */
function rbRouteMatchesFilters(route) {
  if (rbSearchQuery && !(route.name || '').toLowerCase().includes(rbSearchQuery)) return false;

  const activeEntries = Object.entries(rbActiveFilters).filter(([, v]) => v && v.length);
  if (!activeEntries.length) return true;

  const row = rbTaxonomyByName[rbTaxonomyKey(route.name)];
  if (!row) return false; // no taxonomy data for this route — can't confirm a match once filters are active

  // Across different filters: every active filter must match (AND). Within one multi-select
  // filter: any one selected value matching is enough (OR) — e.g. Theme = [Hiking, Beaches]
  // matches a route tagged with either.
  return activeEntries.every(([label, selected]) => {
    const field = RB_TAXONOMY_FILTERS.find(f => f.label === label);
    if (!field) return true;
    const routeValues = rbFilterFieldValues(row, field);
    return selected.some(v => routeValues.includes(v));
  });
}

function rbRenderList() {
  const grid = document.getElementById('routeListGrid');
  const count = document.getElementById('routeListCount');
  const filtered = rbRoutes.filter(rbRouteMatchesFilters);
  const filtersActive = rbSearchQuery || Object.values(rbActiveFilters).some(v => v && v.length);

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
  const tax = rbTaxonomyByName[rbTaxonomyKey(route.name)];
  const tagsHTML = tax ? rbBuildRouteCardTagsHTML(tax) : '';
  // Card-only metric: unique countries, not block count — a route can hold more blocks than
  // countries when one country is split across stages (e.g. Eurasia Grand Tour's Malaysia:
  // peninsula + a separate Borneo leg = 2 blocks, 1 country). The editor view still shows the
  // real block-by-block breakdown; this is just the list-view tile summary.
  const countryCount = new Set((route.blocks || []).map(b => b.country_code || b.country)).size;
  return `
    <div class="route-card" data-route-id="${route.id}">
      <button class="route-card-delete" data-action="delete" title="Delete route">✕</button>
      <span class="badge ${rbStatusBadgeClass(status)} route-card-status">${escapeHTML(status)}</span>
      <div class="route-card-bar">${rbBuildSegmentsHTML(route.blocks, true)}</div>
      <div class="route-card-body">
        <div class="route-card-name">${escapeHTML(route.name || 'Untitled Route')}</div>
        <div class="route-card-meta">
          <span>🌍 ${countryCount} countr${countryCount !== 1 ? 'ies' : 'y'}</span>
          <span>📅 ${totalDays} days</span>
          <span>~${months} mo</span>
          ${rbRouteCardBudgetHTML(route)}
        </div>
        ${tagsHTML}
      </div>
      <div class="route-card-open">Open →</div>
    </div>`;
}

/** All-in total at the chosen tier, or the daily-cost total while nothing else is estimated —
 *  labelled, so a partial number never passes for a complete one. */
function rbRouteCardBudgetHTML(route) {
  const c = rbRouteCosts(route, rbCostTier);
  if (!c.rows.ground && !c.hasCosts) return '';
  const label = !c.hasCosts ? 'daily costs' : c.complete ? 'all-in' : 'incomplete';
  return `<span title="${RB_COST_TIERS[rbCostTier].label} level">💶 ${rbEuro(c.hasCosts ? c.total : c.rows.ground)} <span class="route-card-budget-note">${label}</span></span>`;
}

/** Budget / Primary Trip Type / Best Time to Visit chips — the 3 taxonomy fields Youri picked to
 *  preview on the card itself, so browsing the list doesn't require opening every route. */
function rbBuildRouteCardTagsHTML(tax) {
  const chips = [];
  const budget = (tax.budget_level || '').trim();
  if (budget) chips.push(`<span class="badge badge-budget">${escapeHTML(budget)}</span>`);

  const tripType = (tax.primary_trip_type || '').trim();
  if (tripType && tripType !== '—') chips.push(`<span class="badge badge-type">${escapeHTML(tripType)}</span>`);

  const bestTime = rbFormatBestMonths(tax.best_months);
  if (bestTime) chips.push(`<span class="badge badge-best-time">☀️ ${escapeHTML(bestTime)}</span>`);

  return chips.length ? `<div class="route-card-tags">${chips.join('')}</div>` : '';
}

const RB_MONTH_ABBR = {
  January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr', May: 'May', June: 'Jun',
  July: 'Jul', August: 'Aug', September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec',
};
const RB_MONTH_ORDER = Object.keys(RB_MONTH_ABBR);

/**
 * "June; July; August" -> "Jun–Aug". Detects a calendar-contiguous run (handles a Dec->Feb
 * wraparound, common for southern-hemisphere summer routes) and collapses it to a compact range;
 * a non-contiguous spread (e.g. "April; September") is shown as a comma list instead, since a
 * range would wrongly imply the gap between them is also a good time to go.
 */
function rbFormatBestMonths(raw) {
  const months = (raw || '').split(';').map(s => s.trim()).filter(s => s && s !== '—' && s !== '-');
  if (!months.length) return '';
  const abbr = months.map(m => RB_MONTH_ABBR[m] || m);
  if (abbr.length === 1) return abbr[0];

  const indices = months.map(m => RB_MONTH_ORDER.indexOf(m));
  const isContiguous = indices.every((idx, i) => {
    if (idx === -1) return false;
    if (i === 0) return true;
    return (idx - indices[i - 1] + 12) % 12 === 1;
  });
  return isContiguous ? `${abbr[0]}–${abbr[abbr.length - 1]}` : abbr.join(', ');
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
  document.getElementById('rbStartDateInput').value = sheetDateToISO(route.start_date);
  document.getElementById('rbStatusInput').value = route.status || 'Idea';
  document.getElementById('rbTravelStyleInput').value = route.travel_style || '';
  document.getElementById('rbBestMonthInput').value = route.best_starting_month || '';
  document.getElementById('rbDescriptionInput').value = route.description || '';
  document.getElementById('rbClimateInput').value = route.climate_summary || '';
  document.getElementById('rbRouteNotesInput').value = route.notes || '';
  const tc = route.trip_costs || {};
  document.getElementById('rbFlightInInput').value = route.flight_in_cost ?? '';
  document.getElementById('rbFlightOutInput').value = route.flight_out_cost ?? '';
  document.getElementById('rbInsuranceInput').value = tc.insurance_per_month ?? '';
  document.getElementById('rbBufferInput').value = tc.buffer_pct ?? '';
  document.getElementById('rbInsuranceInput').placeholder =
    `auto: €${RB_TRIP_COST_DEFAULTS.insurance_per_month} over ${RB_TRIP_COST_DEFAULTS.insurance_min_days} days`;
  document.getElementById('rbBufferInput').placeholder = `default ${RB_TRIP_COST_DEFAULTS.buffer_pct}`;
  document.title = `${route.name || 'Route Builder'} | Youri's Travel Atlas`;

  document.getElementById('rbEditorCard').dataset.rbMode = rbEditorMode;
  document.getElementById('rbModeToggleBtn').textContent = rbEditorMode === 'overview' ? '✎ Edit Route' : '👁️ Overview';

  rbRenderBlocks(route);
  rbRenderOverviewBlocks(route);
  rbRefreshDerived(route);
  rbRenderInsertSelect();
  rbRenderCalendarIfVisible(route);
  rbRenderMapIfVisible(route);
  rbRenderVisaPanelIfVisible(route);
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
        <span class="rb-region-stat" title="${RB_REGION_COST_TITLE}">💶 ${rbEuro(rbRegionCost(blocks))}</span>
        <input type="text" class="rb-input rb-input-sm rb-region-season" placeholder="Best season" value="${escapeHTML(region.season || '')}">
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

        ${rbBlockCostsHTML(b, idx, route)}

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

// ---- full-cost budget (ROUTE_BUILDER_BUDGET_PLAN.md; math lives in rbRouteCosts(), Core) ----

const RB_COST_TIER_KEY = 'atlas_rb_cost_tier';
let rbCostTier = (() => {
  try { const t = localStorage.getItem(RB_COST_TIER_KEY); return RB_COST_TIERS[t] ? t : 'mine'; } catch (_) { return 'mine'; }
})();

const RB_EXTRA_CATEGORY_LABELS = {
  activity: 'Activity', tour: 'Tour', park_fee: 'Park fee', visa: 'Visa', transport: 'Transport', other: 'Other',
};

// What each tier means, shown under the tier buttons — so a reference level is never mistaken
// for the route's own plan.
const RB_COST_TIER_HINTS = {
  mine: 'Your own planned budget per country, as stored on the route.',
  backpacker: 'Reference: dorm beds or the cheapest room, cheap eats, public transport.',
  standard: 'Reference: simple hotels or a private room, mostly local restaurants.',
  comfort: 'Reference: 3-4★ hotels, sit-down meals, taxis and paid tours.',
};

const RB_COST_ROW_LABELS = [
  ['ground', 'Daily costs', 'accommodation, food, local getting around, small activities'],
  ['transport', 'Transport', 'between countries + intercity within them'],
  ['flights', 'Getting there & back', 'flight, train or own car from NL'],
  ['extras', 'Tours & fees', 'tours, park fees, boat trips'],
  ['visas', 'Visas', ''],
  ['insurance', 'Travel insurance', 'long trips only, per month'],
];

const RB_REGION_COST_TITLE = 'Sum of this region’s countries: daily costs + transport + extras (My plan level, no NL flights/insurance/buffer)';

const rbEuro = n => '€' + Math.round(n || 0).toLocaleString('nl-NL');

/** A region's budget is the sum of its blocks (decision 5) — not the old free-typed region.budget. */
function rbRegionCost(blocks) {
  const c = rbRouteCosts({ blocks }, 'mine');
  return c.rows.ground + c.rows.transport + c.rows.extras + c.rows.visas;
}

function rbCountryNameForCode(route, code) {
  const b = (route.blocks || []).find(x => x.country_code === code);
  return b ? b.country : code;
}

// Editing a cost counts as checking it; the date input can still be changed by hand.
function rbStampCostsChecked(block) {
  const d = new Date();
  block.costs_checked = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function rbSyncCostsCheckedInput(row, block) {
  const el = row.querySelector('.rb-cost-checked');
  if (el && el !== document.activeElement) el.value = block.costs_checked || '';
}

function rbBlockCostsHTML(b, idx, route) {
  const next = route.blocks[idx + 1];
  const extras = Array.isArray(b.extras) ? b.extras : null;
  const val = v => (v === '' || v == null) ? '' : v;
  const stale = rbTransportCostStale(route.blocks, idx);
  const categoryOptions = sel => RB_EXTRA_CATEGORIES.map(c =>
    `<option value="${c}"${c === sel ? ' selected' : ''}>${RB_EXTRA_CATEGORY_LABELS[c]}</option>`).join('');

  return `
    <div class="rb-costs">
      <div class="rb-costs-label">Costs outside the daily budget <span class="rb-optional">empty = not estimated yet, 0 = none</span></div>
      <div class="rb-costs-grid">
        ${next ? `
          <div class="rb-field">
            <label>Transport to ${escapeHTML(next.country || 'next')} (€)</label>
            <input type="number" min="0" class="rb-input rb-input-sm rb-cost-transport" placeholder="?" value="${val(b.transport_cost)}">
          </div>` : ''}
        <div class="rb-field">
          <label>Transport within country (€)</label>
          <input type="number" min="0" class="rb-input rb-input-sm rb-cost-local" placeholder="?" value="${val(b.local_transport_cost)}">
        </div>
        <div class="rb-field">
          <label>Costs checked</label>
          <input type="date" class="rb-input rb-input-sm rb-cost-checked" value="${escapeHTML(b.costs_checked || '')}">
        </div>
      </div>
      ${stale ? `<div class="rb-cost-warning">⚠️ This transport cost was priced to ${escapeHTML(rbCountryNameForCode(route, b.transport_cost_to))}, but the next country is now ${escapeHTML(next.country || '?')}. Check it and re-enter it.</div>` : ''}
      <div class="rb-extra-list">
        ${(extras || []).map((x, i) => `
          <div class="rb-extra-row" data-extra-index="${i}">
            <input type="text" class="rb-input rb-input-sm rb-extra-label" placeholder="e.g. Gobi jeep tour, park fee, e-visa" value="${escapeHTML(x.label || '')}">
            <input type="number" min="0" class="rb-input rb-input-sm rb-extra-cost" placeholder="€" value="${val(x.cost)}">
            <select class="rb-input rb-input-sm rb-extra-category">${categoryOptions(x.category || 'other')}</select>
            <label class="rb-extra-optional" title="Optional extras are listed but not counted in the total"><input type="checkbox" class="rb-extra-opt"${x.optional ? ' checked' : ''}> optional</label>
            <button class="rb-icon-btn rb-icon-btn-danger" data-action="remove-extra" title="Remove extra">✕</button>
          </div>`).join('')}
        ${extras && !extras.length ? '<div class="rb-costs-none">No extras for this country.</div>' : ''}
      </div>
      <div class="rb-extra-actions">
        <button class="rb-destination-add" data-action="add-extra">+ Add tour / fee / visa</button>
        ${extras ? '' : '<button class="rb-destination-add" data-action="no-extras">No extras needed</button>'}
      </div>
    </div>`;
}

function rbRenderCostPanel(route) {
  const panel = document.getElementById('rbCostPanel');
  if (!panel) return;
  if (!route.blocks.length) { panel.innerHTML = ''; return; }
  const c = rbRouteCosts(route, rbCostTier);

  const tierButtons = Object.entries(RB_COST_TIERS).map(([key, t]) =>
    `<button class="rb-map-mode-btn${key === rbCostTier ? ' is-active' : ''}" data-cost-tier="${key}">${t.label}</button>`).join('');
  const rows = RB_COST_ROW_LABELS.map(([key, label, hint]) => `
    <div class="rb-cost-row">
      <span class="rb-cost-row-label">${label}${hint ? ` <span class="rb-cost-row-hint">${hint}</span>` : ''}</span>
      <span class="rb-cost-row-value">${c.rows[key] ? rbEuro(c.rows[key]) : '—'}</span>
    </div>`).join('');

  const gaps = [];
  if (c.incompleteBlocks) gaps.push(`${c.incompleteBlocks} of ${c.blockCount} countr${c.blockCount === 1 ? 'y' : 'ies'} not costed yet`);
  if (c.flightsMissing) gaps.push('NL flights not estimated');
  if (c.staleTransport) gaps.push(`${c.staleTransport} transport cost${c.staleTransport === 1 ? '' : 's'} priced to a different next country`);
  const tierHint = RB_COST_TIER_HINTS[rbCostTier] + (RB_COST_TIERS[rbCostTier].ref
    ? ` Daily costs = the country's reference rate × days; the other costs are scaled from your plan.${c.fallbackBlocks
      ? ` ${c.fallbackBlocks} countr${c.fallbackBlocks === 1 ? 'y has' : 'ies have'} no reference rate yet and ${c.fallbackBlocks === 1 ? 'is' : 'are'} scaled from your plan too.` : ''}`
    : '');
  const status = !c.hasCosts
    ? `<div class="rb-cost-status is-partial">Only the daily costs are estimated for this route so far. Transport, flights, tours and visas aren't in this total yet.</div>`
    : gaps.length
      ? `<div class="rb-cost-status is-partial">⚠️ Incomplete: ${gaps.join(' · ')}. The real total will be higher.</div>`
      : `<div class="rb-cost-status is-complete">✓ All costs estimated</div>`;

  panel.innerHTML = `
    <div class="rb-cost-head">
      <span class="rb-cost-title">💶 Trip cost <span class="rb-cost-row-hint">per person</span></span>
      <div class="rb-cost-tiers">${tierButtons}<button class="rb-map-mode-btn" data-cost-export title="Download this route's budget as a CSV (opens in Excel)">⬇ Export</button></div>
    </div>
    <div class="rb-cost-tier-hint">${tierHint}</div>
    <div class="rb-cost-rows">
      ${rows}
      <div class="rb-cost-row">
        <span class="rb-cost-row-label">Buffer <span class="rb-cost-row-hint">${c.bufferPct}% for the unexpected</span></span>
        <span class="rb-cost-row-value">${rbEuro(c.buffer)}</span>
      </div>
      <div class="rb-cost-row rb-cost-total">
        <span class="rb-cost-row-label">Total${c.days ? ` <span class="rb-cost-row-hint">${rbEuro(c.perDay)}/day all-in</span>` : ''}</span>
        <span class="rb-cost-row-value">${rbEuro(c.total)}</span>
      </div>
      ${c.optional ? `<div class="rb-cost-row rb-cost-optional"><span class="rb-cost-row-label">Optional extras <span class="rb-cost-row-hint">not in the total</span></span><span class="rb-cost-row-value">+${rbEuro(c.optional)}</span></div>` : ''}
    </div>
    ${status}`;
}

/** "⬇ Export" in the cost panel: the route's budget as a CSV download (rbRouteBudgetCsv(), Core). */
function rbDownloadBudgetCsv(route) {
  const url = URL.createObjectURL(new Blob([rbRouteBudgetCsv(route)], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(route.name || 'route').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '')}-budget.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---- overview mode: read-only trip-at-a-glance list (map lives in the HTML alongside it) ----

// Block ids whose "Details" (budget + per-destination notes) are expanded in Overview. Kept
// in memory only, so it survives re-renders and switching routes but not a page reload.
const rbOverviewExpanded = new Set();

function rbOverviewHasDetails(b) {
  return (b.destinations || []).some(d => d.name && d.notes) || rbOverviewBudgetLine(b) !== ''
    || rbCostNum(b.transport_cost) !== null || rbCostNum(b.local_transport_cost) !== null || (b.extras || []).length > 0;
}

/** Overview "Details" lines for the costs outside the daily budget (Standard level, as entered). */
function rbOverviewCostLines(b, idx, route) {
  const lines = [];
  const next = route.blocks[idx + 1];
  const transport = rbCostNum(b.transport_cost), local = rbCostNum(b.local_transport_cost);
  if (next && transport !== null) lines.push(`🚌 To ${escapeHTML(next.country || 'next')}: ${rbEuro(transport)}`);
  if (local) lines.push(`🚆 Within the country: ${rbEuro(local)}`);
  (b.extras || []).forEach(x => lines.push(
    `🎟️ ${escapeHTML(x.label || RB_EXTRA_CATEGORY_LABELS[x.category] || 'Extra')}: ${rbEuro(rbCostNum(x.cost))}${x.optional ? ' <span class="rb-cost-row-hint">(optional)</span>' : ''}`));
  if (rbTransportCostStale(route.blocks, idx)) lines.push(`<span class="rb-cost-warning-inline">⚠️ Transport cost was priced to ${escapeHTML(rbCountryNameForCode(route, b.transport_cost_to))}, not ${escapeHTML(next.country || '?')}</span>`);
  if (b.costs_checked && lines.length) lines.push(`<span class="rb-cost-row-hint">Costs checked ${escapeHTML(b.costs_checked)}</span>`);
  return lines;
}

function rbOverviewBudgetLine(b) {
  const budget = parseFloat(b.budget);
  if (isNaN(budget)) return '';
  const days = parseInt(b.days) || 0;
  return `💶 €${Math.round(budget).toLocaleString('en')} total${days > 0 ? ` · ±€${Math.round(budget / days)}/day` : ''}`;
}

function rbRenderOverviewBlocks(route) {
  const container = document.getElementById('rbOverviewBlocks');
  if (!container) return;

  if (!route.blocks.length) {
    container.innerHTML = `
      <div class="empty-message" style="padding:2.5rem 1rem">
        <span class="empty-icon">🧱</span>
        <p>No countries yet. Switch to "Edit Route" to add your first stop.</p>
      </div>`;
    return;
  }

  const ranges = rbComputeRanges(route.blocks);
  route.regions = route.regions || [];

  const expandable = route.blocks.filter(rbOverviewHasDetails);
  const allOpen = expandable.length > 0 && expandable.every(b => rbOverviewExpanded.has(b.id));
  let html = expandable.length ? `
    <div class="rb-overview-toolbar">
      <button class="btn btn-outline btn-sm" data-ov-action="toggle-all">${allOpen ? '▾ Collapse all' : '▸ Expand all'}</button>
    </div>` : '';
  let i = 0;
  while (i < route.blocks.length) {
    const b = route.blocks[i];
    const region = b.region_id && route.regions.find(r => r.id === b.region_id);

    if (region) {
      let j = i;
      while (j < route.blocks.length && route.blocks[j].region_id === region.id) j++;
      const groupBlocks = route.blocks.slice(i, j);
      const groupRanges = ranges.slice(i, j);
      const totalDays = groupBlocks.reduce((s, bl) => s + (parseInt(bl.days) || 0), 0);
      html += `
        <div class="rb-overview-region">
          <div class="rb-overview-region-header">
            <span class="rb-overview-region-name">${escapeHTML(region.name || 'Region')}</span>
            <span class="rb-overview-region-stat">📅 ${totalDays} days · <span title="${RB_REGION_COST_TITLE}">💶 ${rbEuro(rbRegionCost(groupBlocks))}</span>${region.season ? ` · 🌤️ ${escapeHTML(region.season)}` : ''}</span>
          </div>
          ${region.notes ? `<div class="rb-overview-region-note">${escapeHTML(region.notes)}</div>` : ''}
          ${groupBlocks.map((bl, k) => rbRenderOverviewBlockRow(bl, groupRanges[k], route)).join('')}
        </div>`;
      i = j;
    } else {
      html += rbRenderOverviewBlockRow(b, ranges[i], route);
      i++;
    }
  }

  container.innerHTML = html;
}

function rbRenderOverviewBlockRow(b, r, route) {
  const idx = route.blocks.findIndex(x => x.id === b.id);
  const color = RB_BLOCK_COLORS[idx % RB_BLOCK_COLORS.length];
  const flag = rbFlagFor(b);
  const name = b.country || 'Country';
  const rangeLabel = r.days > 0 ? `Day ${r.start}${r.end !== r.start ? '–' + r.end : ''} · ${r.days}d` : '—';
  const destNames = (b.destinations || []).map(d => d.name).filter(Boolean);
  const hasDetails = rbOverviewHasDetails(b);
  const open = hasDetails && rbOverviewExpanded.has(b.id);
  const budgetLine = rbOverviewBudgetLine(b);
  const destNotes = (b.destinations || []).filter(d => d.name && d.notes);
  const costLines = open ? rbOverviewCostLines(b, idx, route) : [];

  return `
    <div class="rb-overview-block" style="--block-color:${color}">
      <div class="rb-overview-block-flag">${flag}</div>
      <div class="rb-overview-block-body">
        <div class="rb-overview-block-top">
          <span class="rb-overview-block-name">${escapeHTML(name)}</span>
          <span class="rb-overview-block-meta">
            <span class="rb-overview-block-range">${rangeLabel}</span>
            ${hasDetails ? `<button class="rb-overview-details-btn" data-ov-action="toggle" data-block-id="${b.id}" aria-expanded="${open}">${open ? '▾' : '▸'} Details</button>` : ''}
          </span>
        </div>
        ${destNames.length ? `<div class="rb-overview-block-dests">📍 ${destNames.map(n => escapeHTML(n)).join(' · ')}</div>` : ''}
        ${b.notes ? `<div class="rb-overview-block-note">${escapeHTML(b.notes)}</div>` : ''}
        ${b.transport_to_next ? `<div class="rb-overview-block-transport">→ ${escapeHTML(b.transport_to_next)}</div>` : ''}
        ${open ? `
          <div class="rb-overview-details">
            ${budgetLine ? `<div class="rb-overview-details-budget">${budgetLine}</div>` : ''}
            ${costLines.map(l => `<div class="rb-overview-cost-line">${l}</div>`).join('')}
            ${destNotes.map(d => `
              <div class="rb-overview-dest-note"><span class="rb-overview-dest-name">${escapeHTML(d.name)}</span> — ${escapeHTML(d.notes)}</div>`).join('')}
          </div>` : ''}
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
  const hasGround = route.blocks.some(b => rbCostNum(b.budget) !== null);
  const costs = rbRouteCosts(route, rbCostTier);
  const budgetLabel = !costs.hasCosts ? 'daily costs only' : costs.complete ? 'all-in' : 'all-in, incomplete';

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
        <div class="overview-item-label">Budget · ${budgetLabel}</div>
        <div class="overview-item-value">${hasGround || costs.hasCosts ? rbEuro(costs.hasCosts ? costs.total : costs.rows.ground) : '—'}</div>
      </div>`;
  }
  rbRenderCostPanel(route);

  rbRenderCalendarIfVisible(route);
  rbRenderMapIfVisible(route);
  rbRenderVisaPanelIfVisible(route);
}

// ---- visa & vaccinations panel: one card per unique country in the route, in route order ----

function rbRenderVisaPanelIfVisible(route) {
  const panel = document.getElementById('rbVisaPanel');
  if (panel && !panel.hidden) rbRenderVisaPanel(route);
}

function rbRenderVisaPanel(route) {
  const panel = document.getElementById('rbVisaPanel');
  if (!panel) return;

  const seen = new Set();
  const countries = [];
  (route.blocks || []).forEach(b => {
    if (!b.country_code || seen.has(b.country_code)) return;
    seen.add(b.country_code);
    countries.push({ code: b.country_code, name: b.country || b.country_code });
  });

  if (!countries.length) {
    panel.innerHTML = `<div class="empty-message" style="padding:2rem 1rem"><span class="empty-icon">🩺</span><p>Add country blocks to see visa &amp; vaccination info here.</p></div>`;
    return;
  }

  // Two-tier disclosure (the route-wide summary itself is no longer gated behind a click — it
  // was the redundant tier: opening the panel used to show a collapsed head with nothing
  // visible until clicked, when the summary is exactly the thing worth seeing immediately).
  // Now: the summary always shows as soon as the panel opens; one click reveals the
  // per-country compact-row list; each row expands into that country's full field list.
  // Without this, opening the panel on a many-country route (a 25-leg grand tour, say) dumped
  // every country's full visa/vaccine/health text at once with no route-wide picture of "how
  // many visas do I actually need to arrange". Purely view-state (not persisted, not route
  // data), so it's plain DOM show/hide on click, not rbSave()/rbRenderEditor() like a real
  // route edit would use.
  panel.innerHTML = `
    <div class="rb-visa-summary-head">
      <div class="rb-visa-summary-title">🩺 Visa &amp; vaccination overview — ${countries.length} ${countries.length === 1 ? 'country' : 'countries'}</div>
      <div class="rb-visa-summary-body">${buildRouteHealthSummaryHTML(countries, rbCountryDetails)}</div>
    </div>
    <button class="rb-visa-list-toggle" type="button" data-action="toggle-visa-list">
      <span class="rb-visa-list-chevron">▸</span>
      <span>Show all countries (${countries.length})</span>
    </button>
    <div class="rb-visa-country-list" hidden>
      ${countries.map(c => `
        <div class="rb-visa-country">
          <button class="rb-visa-country-toggle" type="button" data-action="toggle-visa-country">
            <span class="rb-visa-country-chevron">▸</span>
            <span class="rb-visa-country-name">${escapeHTML(c.name)}</span>
            <span class="rb-visa-country-summary">${buildCountryHealthSummaryHTML(rbCountryDetails[c.code])}</span>
          </button>
          <div class="rb-visa-country-body" hidden>${buildCountryHealthHTML(rbCountryDetails[c.code])}</div>
        </div>`).join('')}
    </div>`;

  if (!panel.dataset.bound) {
    panel.dataset.bound = '1';
    panel.addEventListener('click', (e) => {
      const listBtn = e.target.closest('[data-action="toggle-visa-list"]');
      if (listBtn) {
        const list = panel.querySelector('.rb-visa-country-list');
        const chevron = listBtn.querySelector('.rb-visa-list-chevron');
        list.hidden = !list.hidden;
        chevron.textContent = list.hidden ? '▸' : '▾';
        return;
      }

      const btn = e.target.closest('[data-action="toggle-visa-country"]');
      if (!btn) return;
      const card = btn.closest('.rb-visa-country');
      const body = card.querySelector('.rb-visa-country-body');
      const chevron = btn.querySelector('.rb-visa-country-chevron');
      body.hidden = !body.hidden;
      chevron.textContent = body.hidden ? '▸' : '▾';
    });
  }
}

// ---- calendar view ----

function rbRenderCalendarIfVisible(route) {
  const panel = document.getElementById('rbCalendarPanel');
  if (panel && !panel.hidden) rbRenderCalendar(route);
}

function rbRenderCalendar(route) {
  const panel = document.getElementById('rbCalendarPanel');
  if (!panel) return;

  const start = parseSheetDate(route.start_date);
  if (!start) {
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
 * "Countries" map. Fix: "unwrap" each ring's longitudes so they stay continuous past ±180 instead of
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
  // The map panel lives inside the Overview-only section — only render it while that's showing,
  // both to avoid wasted work and because Leaflet can't size itself into a display:none div.
  if (rbEditorMode === 'overview') rbRenderMap(route);
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
 * Only legs that have both lat and lng render; a route with none of those shows an empty-state
 * message instead. A single-leg route still draws fine — it's just the home→country→home
 * out-and-back line — so the empty state only needs to guard against zero stops, not two. See
 * README's "Future plans" section for the plan this implements, and rbBuildCentralEuropeRoadtripRoute
 * for the reference example of adding lat/lng to a route's blocks.
 */
function rbRenderRouteLine(route, geojson) {
  const mapDiv = document.getElementById('rbMapDiv');
  const stops = route.blocks
    .map((b, i) => ({ block: b, index: i }))
    .filter(({ block }) => typeof block.lat === 'number' && typeof block.lng === 'number');

  rbMiniMapLineLayer = rbClearMapLayer(rbMiniMapLineLayer);

  if (stops.length < 1) {
    mapDiv.querySelector('.rb-map-empty')?.remove();
    const empty = document.createElement('div');
    empty.className = 'rb-map-empty';
    empty.textContent = 'This route doesn\'t have route-line data yet (lat/lng per leg) — not every expedition has it yet.';
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
  L.polyline(stopLatlngs, { color: '#0ea5e9', weight: 3, opacity: 0.85, dashArray: '6 8' }).addTo(layerGroup);
  rbAddFaintHomeLegs(layerGroup, stopLatlngs, '#0ea5e9');

  const homeIcon = L.divIcon({
    className: 'rb-map-stop-icon rb-map-stop-icon--home',
    html: `<span>🏠</span>`,
    iconSize: [26, 26], iconAnchor: [13, 13],
  });
  L.marker(RB_HOME_LATLNG, { icon: homeIcon })
    .bindTooltip('🇳🇱 Nederland — vertrek & aankomst')
    .addTo(layerGroup);

  const stopLabel = block => {
    const days = parseInt(block.days) || 0;
    return `${rbFlagFor(block)} ${escapeHTML(block.country || '')}${days ? ` — ${days} dag${days !== 1 ? 'en' : ''}` : ''}`;
  };
  // Legs sharing an anchor point (e.g. a country visited twice) share one "2 · 5" marker.
  groupStopsByPlace(stops.map(s => ({ ...s, lat: s.block.lat, lng: s.block.lng }))).forEach(group => {
    const color = RB_BLOCK_COLORS[group.entries[0].stop.index % RB_BLOCK_COLORS.length];
    const label = group.entries.map(e => e.index + 1).join(' · ');
    const tooltip = group.entries.length > 1
      ? group.entries.map(e => `${e.index + 1}. ${stopLabel(e.stop.block)}`).join('<br>')
      : stopLabel(group.entries[0].stop.block);
    L.marker([group.lat, group.lng], { icon: L.divIcon(stopMarkerIconOptions('rb-map-stop-icon', label, color)) })
      .bindTooltip(tooltip)
      .addTo(layerGroup);
  });

  rbMiniMapLineLayer = layerGroup.addTo(rbMiniMap);
  rbMiniMap.setMaxZoom(9);
  rbFitToStops(stopLatlngs);
}

/** Fits the map to the route's own stops; a single stop gets a country-level view instead of max zoom. */
function rbFitToStops(latlngs) {
  const bounds = L.latLngBounds(latlngs);
  if (bounds.getNorthEast().equals(bounds.getSouthWest())) rbMiniMap.setView(latlngs[0], 5);
  else rbMiniMap.fitBounds(bounds, { padding: [40, 40] });
}

/**
 * The legs from home to the first stop and from the last stop back home, drawn faint — the
 * view fits the route's own stops (not home), so these usually run off-screen; drawing them
 * at full strength made every non-European route shrink to a corner of the map. Same
 * treatment as the Trips map (atlasRenderRouteLine in js/utils/routeMap.js).
 */
function rbAddFaintHomeLegs(layerGroup, latlngs, color) {
  [[RB_HOME_LATLNG, latlngs[0]], [latlngs[latlngs.length - 1], RB_HOME_LATLNG]].forEach(leg => {
    L.polyline(leg, { color, weight: 2, opacity: 0.35, dashArray: '2 8' }).addTo(layerGroup);
  });
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

  // A single point still draws fine (home→point→home), so only zero points is truly empty —
  // same fix as rbRenderRouteLine's identical off-by-one (see its docstring).
  if (points.length < 1) {
    mapDiv.querySelector('.rb-map-empty')?.remove();
    const empty = document.createElement('div');
    empty.className = 'rb-map-empty';
    empty.textContent = 'This route doesn\'t have per-destination coordinates yet — not every expedition has them yet.';
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
  L.polyline(pointLatlngs, { color: '#f97316', weight: 2, opacity: 0.85, dashArray: '4 6' }).addTo(layerGroup);
  rbAddFaintHomeLegs(layerGroup, pointLatlngs, '#f97316');

  const homeIcon = L.divIcon({
    className: 'rb-map-stop-icon rb-map-stop-icon--home',
    html: `<span>🏠</span>`,
    iconSize: [26, 26], iconAnchor: [13, 13],
  });
  L.marker(RB_HOME_LATLNG, { icon: homeIcon })
    .bindTooltip('🇳🇱 Nederland — vertrek & aankomst')
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
  rbFitToStops(pointLatlngs);
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

// ---- export ----

// Flat, per-tab shape matching ROUTE_BUILDER_SYNC.md's planned GrandTrip*/BlockLibrary*
// sheet tabs 1:1, so a future Apps Script bulk-import can consume this JSON directly
// without a format redesign. Doubles as a manual backup: localStorage is the only copy
// of every route today, this is copy-pasteable elsewhere until Sheet sync exists.
function rbBuildRoutesExport() {
  // Field mapping lives once in rbBuildGrandTripPayload() (routeBuilderCore.js), shared
  // with the fire-and-forget per-route sync push — flatten each route the same way, then
  // regroup from [{grand_trip, regions, blocks, destinations}, ...] into 4 flat arrays.
  const perRoute = rbRoutes.map(rbBuildGrandTripPayload);
  const grandTrips = perRoute.map(p => p.grand_trip);
  const grandTripRegions = perRoute.flatMap(p => p.regions);
  const grandTripBlocks = perRoute.flatMap(p => p.blocks);
  const grandTripDestinations = perRoute.flatMap(p => p.destinations);

  const blockLibrary = rbLibrary.map(l => ({
    library_id: l.id, name: l.name, created_at: l.created_at,
  }));

  // Saved Library blocks keep their own destinations nested (not flattened into a
  // separate tab) and have no persistent per-item id yet — see ROUTE_BUILDER_SYNC.md,
  // BlockLibraryItems has no destinations column today; Phase B should decide whether
  // to add one or keep this nested-JSON shape.
  const blockLibraryItems = rbLibrary.flatMap(l => (l.blocks || []).map((b, i) => ({
    item_id: `${l.id}_${i}`, library_id: l.id, order: i,
    country_code: b.country_code, country_name: b.country, days: b.days, budget: b.budget,
    notes: b.notes, transport_to_next: b.transport_to_next || '', ...rbBlockCostCells(b),
    destinations: (b.destinations || []).map(d => ({ name: d.name, notes: d.notes || '' })),
  })));

  return {
    exported_at: new Date().toISOString(),
    grand_trips: grandTrips,
    grand_trip_regions: grandTripRegions,
    grand_trip_blocks: grandTripBlocks,
    grand_trip_destinations: grandTripDestinations,
    block_library: blockLibrary,
    block_library_items: blockLibraryItems,
  };
}

function rbCopyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for file:// (no secure-context Clipboard API there).
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  } finally {
    document.body.removeChild(ta);
  }
}

function rbExportRoutesAsJSON() {
  const json = JSON.stringify(rbBuildRoutesExport(), null, 2);
  rbCopyTextToClipboard(json)
    .then(() => alert(`Copied ${rbRoutes.length} route(s) + ${rbLibrary.length} library block(s) as JSON to your clipboard.`))
    .catch(() => {
      // Clipboard write failed (permissions/unsupported) — fall back to a manual-copy prompt.
      prompt('Copy this JSON manually (Ctrl+A, Ctrl+C):', json);
    });
}

// ---- events ----

function rbBindEvents() {
  document.getElementById('exportRoutesBtn').addEventListener('click', rbExportRoutesAsJSON);

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
    rbSave(route.id);
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
      rbSave(id);
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

  // Opens/closes one multi-select's checkbox menu — closes any other open menu first (only one
  // at a time), and stops the click from immediately reaching the document-level "close on
  // outside click" handler below.
  document.getElementById('rbFilterPanel').addEventListener('click', e => {
    const toggle = e.target.closest('.rb-multiselect-toggle');
    if (!toggle) return;
    const menu = toggle.closest('.rb-multiselect').querySelector('.rb-multiselect-menu');
    const willOpen = menu.hidden;
    document.querySelectorAll('.rb-multiselect-menu').forEach(m => { m.hidden = true; });
    menu.hidden = !willOpen;
    e.stopPropagation();
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.rb-multiselect')) return;
    document.querySelectorAll('.rb-multiselect-menu').forEach(m => { m.hidden = true; });
  });

  document.getElementById('rbFilterPanel').addEventListener('change', e => {
    const select = e.target.closest('.rb-filter-select');
    if (select) {
      rbActiveFilters[select.dataset.filterLabel] = select.value ? [select.value] : [];
      rbUpdateFilterBadge();
      rbRenderList();
      return;
    }

    const checkbox = e.target.closest('.rb-multiselect-option input[type="checkbox"]');
    if (!checkbox) return;
    const wrap = checkbox.closest('.rb-multiselect');
    const label = wrap.dataset.filterLabel;
    const selected = [...wrap.querySelectorAll('input[type="checkbox"]:checked')].map(c => c.value);
    rbActiveFilters[label] = selected;
    rbUpdateMultiselectToggleLabel(wrap, label, selected);
    rbUpdateFilterBadge();
    rbRenderList();
  });

  document.getElementById('rbFilterClearBtn').addEventListener('click', () => {
    rbActiveFilters = {};
    document.querySelectorAll('.rb-filter-select').forEach(sel => { sel.value = ''; });
    document.querySelectorAll('.rb-multiselect').forEach(wrap => {
      wrap.querySelectorAll('input[type="checkbox"]').forEach(c => { c.checked = false; });
      rbUpdateMultiselectToggleLabel(wrap, wrap.dataset.filterLabel, []);
    });
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
      transport_to_next: b.transport_to_next, lat: b.lat ?? null, lng: b.lng ?? null, ...rbCopyBlockCosts(b),
      destinations: (b.destinations || []).map(d => ({ name: d.name, notes: d.notes, lat: d.lat ?? null, lng: d.lng ?? null })),
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
      lat: b.lat ?? null, lng: b.lng ?? null, ...rbCopyBlockCosts(b),
      destinations: (b.destinations || []).map(d => ({ id: rbNewDestId(), name: d.name, notes: d.notes || '', lat: d.lat ?? null, lng: d.lng ?? null })),
    }));
    route.blocks.push(...copies);
    rbSave(route.id);
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
    rbSave(route.id);
    rbCurrentId = null;
    rbShowList();
  });

  document.getElementById('rbNameInput').addEventListener('input', e => {
    const route = rbGetCurrent();
    if (!route) return;
    route.name = e.target.value;
    rbSave(route.id);
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
      rbSave(route.id);
    });
  });

  const handleStartDateChange = e => {
    const route = rbGetCurrent();
    if (!route) return;
    route.start_date = e.target.value;
    rbSave(route.id);
    rbRenderCalendarIfVisible(route);
  };
  document.getElementById('rbStartDateInput').addEventListener('input', handleStartDateChange);
  document.getElementById('rbStartDateInput').addEventListener('change', handleStartDateChange);

  // Route-level costs. Empty stays '' (not estimated), never 0.
  const costNumber = el => el.value === '' ? '' : parseFloat(el.value);
  const handleRouteCostChange = () => {
    const route = rbGetCurrent();
    if (!route) return;
    route.flight_in_cost = costNumber(document.getElementById('rbFlightInInput'));
    route.flight_out_cost = costNumber(document.getElementById('rbFlightOutInput'));
    const insurance = costNumber(document.getElementById('rbInsuranceInput'));
    const buffer = costNumber(document.getElementById('rbBufferInput'));
    route.trip_costs = insurance === '' && buffer === '' ? null : {
      ...(insurance === '' ? {} : { insurance_per_month: insurance }),
      ...(buffer === '' ? {} : { buffer_pct: buffer }),
    };
    rbSave(route.id);
    rbRefreshDerived(route);
  };
  ['rbFlightInInput', 'rbFlightOutInput', 'rbInsuranceInput', 'rbBufferInput'].forEach(id =>
    document.getElementById(id).addEventListener('input', handleRouteCostChange));

  document.getElementById('rbCostPanel').addEventListener('click', e => {
    const route = rbGetCurrent();
    if (route && e.target.closest('[data-cost-export]')) { rbDownloadBudgetCsv(route); return; }
    const btn = e.target.closest('[data-cost-tier]');
    if (!btn || !route) return;
    rbCostTier = btn.dataset.costTier;
    try { localStorage.setItem(RB_COST_TIER_KEY, rbCostTier); } catch (_) {}
    rbRefreshDerived(route);
  });

  document.getElementById('toggleCalendarBtn').addEventListener('click', e => {
    const panel = document.getElementById('rbCalendarPanel');
    const route = rbGetCurrent();
    if (!panel || !route) return;
    panel.hidden = !panel.hidden;
    e.target.textContent = panel.hidden ? '📅 Show Calendar' : '📅 Hide Calendar';
    if (!panel.hidden) rbRenderCalendar(route);
  });

  document.getElementById('toggleVisaBtn').addEventListener('click', e => {
    const panel = document.getElementById('rbVisaPanel');
    const route = rbGetCurrent();
    if (!panel || !route) return;
    panel.hidden = !panel.hidden;
    e.target.textContent = panel.hidden ? '🩺 Show Visa & Vaccinations' : '🩺 Hide Visa & Vaccinations';
    if (!panel.hidden) rbRenderVisaPanel(route);
  });

  document.getElementById('rbModeToggleBtn').addEventListener('click', () => {
    rbEditorMode = rbEditorMode === 'overview' ? 'edit' : 'overview';
    rbRenderEditor();
  });

  // Overview "Details" toggles — one delegated listener, since the list is re-rendered wholesale.
  document.getElementById('rbOverviewBlocks').addEventListener('click', e => {
    const btn = e.target.closest('[data-ov-action]');
    const route = rbGetCurrent();
    if (!btn || !route) return;
    if (btn.dataset.ovAction === 'toggle') {
      const id = btn.dataset.blockId;
      if (rbOverviewExpanded.has(id)) rbOverviewExpanded.delete(id); else rbOverviewExpanded.add(id);
    } else if (btn.dataset.ovAction === 'toggle-all') {
      const ids = route.blocks.filter(rbOverviewHasDetails).map(b => b.id);
      const allOpen = ids.every(id => rbOverviewExpanded.has(id));
      ids.forEach(id => (allOpen ? rbOverviewExpanded.delete(id) : rbOverviewExpanded.add(id)));
    }
    rbRenderOverviewBlocks(route);
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
    rbSave(route.id);
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
        rbSave(route.id);
        return;
      }

      const extraRow = e.target.closest('.rb-extra-row');
      if (extraRow) {
        const extra = (block.extras || [])[parseInt(extraRow.dataset.extraIndex, 10)];
        if (!extra) return;
        const cl = e.target.classList;
        if (cl.contains('rb-extra-label')) extra.label = e.target.value;
        else if (cl.contains('rb-extra-cost')) extra.cost = e.target.value === '' ? '' : parseFloat(e.target.value);
        else if (cl.contains('rb-extra-category')) extra.category = e.target.value;
        else if (cl.contains('rb-extra-opt')) extra.optional = e.target.checked;
        else return;
        rbStampCostsChecked(block);
        rbSyncCostsCheckedInput(row, block);
        rbSave(route.id);
        rbRefreshDerived(route);
        return;
      }

      if (e.target.classList.contains('rb-input-country')) {
        block.country_code = e.target.value;
        block.country = e.target.selectedOptions[0]?.textContent || '';
        // The previous block's "Transport to X" label and stale-price warning depend on this.
        if (e.type === 'change') { rbSave(route.id); rbRenderEditor(); return; }
      } else if (e.target.classList.contains('rb-cost-transport')) {
        block.transport_cost = e.target.value === '' ? '' : parseFloat(e.target.value);
        const next = route.blocks[route.blocks.indexOf(block) + 1];
        block.transport_cost_to = block.transport_cost === '' ? '' : (next?.country_code || '');
        rbStampCostsChecked(block);
      } else if (e.target.classList.contains('rb-cost-local')) {
        block.local_transport_cost = e.target.value === '' ? '' : parseFloat(e.target.value);
        rbStampCostsChecked(block);
      } else if (e.target.classList.contains('rb-cost-checked')) {
        block.costs_checked = e.target.value;
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

      rbSyncCostsCheckedInput(row, block);
      rbSave(route.id);
      rbRefreshDerived(route);
      return;
    }

    const regionGroup = e.target.closest('.rb-region-group');
    if (regionGroup) {
      const region = (route.regions || []).find(r => r.id === regionGroup.dataset.regionId);
      if (!region) return;

      if (e.target.classList.contains('rb-region-name-input')) region.name = e.target.value;
      else if (e.target.classList.contains('rb-region-season')) region.season = e.target.value;
      else if (e.target.classList.contains('rb-region-notes')) region.notes = e.target.value;
      else return;

      rbSave(route.id);
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
    rbSave(route.id);
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
      rbSave(route.id);
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
    } else if (action === 'add-extra') {
      route.blocks[idx].extras = Array.isArray(route.blocks[idx].extras) ? route.blocks[idx].extras : [];
      route.blocks[idx].extras.push({ label: '', cost: '', category: 'tour', optional: false });
    } else if (action === 'remove-extra') {
      const i = parseInt(btn.closest('.rb-extra-row').dataset.extraIndex, 10);
      route.blocks[idx].extras.splice(i, 1);  // last one removed → [] = "estimated, none"
      rbStampCostsChecked(route.blocks[idx]);
    } else if (action === 'no-extras') {
      route.blocks[idx].extras = [];
      rbStampCostsChecked(route.blocks[idx]);
    } else if (action === 'remove-destination') {
      const destRow = btn.closest('.rb-destination-row');
      const destId = destRow && destRow.dataset.destId;
      route.blocks[idx].destinations = (route.blocks[idx].destinations || []).filter(d => d.id !== destId);
    } else {
      return;
    }

    rbSave(route.id);
    rbRenderEditor();
  });
}

