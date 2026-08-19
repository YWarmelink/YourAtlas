/**
 * Route Builder — Core: state, config, migration/seed flags, shared cross-cutting helpers.
 * Loads first of 4 files (see routeBuilderContent.js, routeBuilderUI.js, routeBuilder.js).
 * Split out 2026-08 for context-efficiency reasons — no logic changes, pure relocation.
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
const RB_MIGRATE_FLAG_2026_08_EURASIA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_eurasia_overhaul_v2';
const RB_MIGRATE_FLAG_2026_08_PATAGONIA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_patagonia_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_HIMALAYA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_himalaya_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_NORDIC_ARCTIC_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_nordic_arctic_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_CARIBBEAN_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_caribbean_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_CENTRAL_EUROPE_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_central_europe_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_BRITISH_ISLES_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_british_isles_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_NORTH_AMERICA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_north_america_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_WEST_CENTRAL_AFRICA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_west_central_africa_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_OCEANIA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_oceania_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_PANAMERICAN_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_panamerican_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_MEDITERRANEAN_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_mediterranean_overhaul_v2';
const RB_MIGRATE_FLAG_2026_08_AFRICA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_africa_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_SPLIT_ENTRY_NOTES = 'atlas_grand_trips_migrate_2026_08_split_entry_notes_v1';
const RB_MIGRATE_FLAG_2026_08_UZ_TJ_SWAP = 'atlas_grand_trips_migrate_2026_08_uz_tj_swap_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES = 'atlas_grand_trips_seeded_standalone_countries_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH2 = 'atlas_grand_trips_seeded_standalone_countries_batch2_v1';
const RB_MIGRATE_FLAG_2026_08_LONGHAUL_BUFFER = 'atlas_grand_trips_migrate_2026_08_longhaul_buffer_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH3 = 'atlas_grand_trips_seeded_standalone_countries_batch3_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH4 = 'atlas_grand_trips_seeded_standalone_countries_batch4_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH5 = 'atlas_grand_trips_seeded_standalone_countries_batch5_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH6 = 'atlas_grand_trips_seeded_standalone_countries_batch6_v1';
const RB_SEED_FLAG_KEY_CENTRAL_ASIA_FURTHER_SPLIT = 'atlas_grand_trips_seeded_central_asia_further_split_v1';
const RB_SEED_FLAG_KEY_COMBO_BATCH7 = 'atlas_grand_trips_seeded_combo_batch7_v1';
const RB_SEED_FLAG_KEY_DOLOMITES_NORTH_ITALY = 'atlas_grand_trips_seeded_dolomites_north_italy_v1';
const RB_SEED_FLAG_KEY_US_LOOSE_TRIPS = 'atlas_grand_trips_seeded_us_loose_trips_v1';
const RB_MIGRATE_FLAG_2026_08_ALASKA_ADDITION = 'atlas_grand_trips_migrate_2026_08_alaska_addition_v1';
const RB_MIGRATE_FLAG_2026_08_CENTRAL_EUROPEAN_ENGLISH = 'atlas_grand_trips_migrate_2026_08_central_european_english_v1';
const RB_MIGRATE_FLAG_2026_08_EURASIA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_eurasia_english_v1';
const RB_MIGRATE_FLAG_2026_08_PATAGONIA_ANTARCTICA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_patagonia_antarctica_english_v1';
const RB_MIGRATE_FLAG_2026_08_INDIA_HIMALAYA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_india_himalaya_english_v1';
const RB_MIGRATE_FLAG_2026_08_NORDIC_ARCTIC_ENGLISH = 'atlas_grand_trips_migrate_2026_08_nordic_arctic_english_v1';
const RB_MIGRATE_FLAG_2026_08_PANAMERICAN_ENGLISH = 'atlas_grand_trips_migrate_2026_08_panamerican_english_v1';
const RB_MIGRATE_FLAG_2026_08_AFRICA_GRAND_TOUR_ENGLISH = 'atlas_grand_trips_migrate_2026_08_africa_grand_tour_english_v1';
const RB_MIGRATE_FLAG_2026_08_MEDITERRANEAN_ENGLISH = 'atlas_grand_trips_migrate_2026_08_mediterranean_english_v1';
const RB_MIGRATE_FLAG_2026_08_CARIBBEAN_AMAZON_ENGLISH = 'atlas_grand_trips_migrate_2026_08_caribbean_amazon_english_v1';
const RB_MIGRATE_FLAG_2026_08_BRITISH_ISLES_ENGLISH = 'atlas_grand_trips_migrate_2026_08_british_isles_english_v1';
const RB_MIGRATE_FLAG_2026_08_WEST_CENTRAL_AFRICA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_west_central_africa_english_v1';
const RB_BLOCK_COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#f97316', '#14b8a6'];
const RB_HOME_LATLNG = [52.0907, 5.1214]; // Utrecht, NL — every expedition's implicit start/end point
const RB_WORLD_TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

let rbRoutes = [];
let rbCurrentId = null;
let rbCountryOptions = []; // [{ code, name }] — pulled from the same sheet that drives the map
let rbLibrary = [];        // [{ id, name, blocks: [{country, country_code, days, budget, notes}], created_at }]
let rbSelectedLibIds = new Set();


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

function rbNewBlockId() {
  return 'blk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

