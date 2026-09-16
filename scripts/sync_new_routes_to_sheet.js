#!/usr/bin/env node
/**
 * Pushes any Route Builder route that exists in the app's seeded/migrated content (per
 * simulate_route_builder.js's simulation of a fresh browser) but is missing from the live
 * GrandTrips Google Sheet — using the exact same payload shape rbBuildGrandTripPayload()
 * builds in the browser (js/pages/routeBuilderCore.js) and POSTing to the same Apps Script
 * endpoint (RB_APPS_SCRIPT_URL) the app itself uses.
 *
 * Why this exists: routeBuilder.js's rbSave() only pushes a route to the Sheet when a real UI
 * edit fires rbSave(route.id) — every rbSeed*() function calls rbSave() with no id, which only
 * writes localStorage. So a brand-new route added to routeBuilderContent.js (by Claude or by
 * hand) never reaches the Sheet on its own until someone opens it in a browser and edits a
 * field (see ROUTE_BUILDER_SYNC.md, which flags this exact gap). routeBuilder.js now also
 * auto-pushes local-only routes the next time a real browser loads the page — this script is
 * the immediate, no-browser-needed alternative: run it right after adding new routes instead
 * of waiting for a browser session.
 *
 * Usage:
 *   node scripts/sync_new_routes_to_sheet.js            # dry run — lists what WOULD be pushed
 *   node scripts/sync_new_routes_to_sheet.js --push      # actually POSTs the missing routes
 */

const { execSync } = require('child_process');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';
const GRAND_TRIPS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=132975394&single=true&output=csv';

// Mirrors rbBuildGrandTripPayload() in js/pages/routeBuilderCore.js field-for-field — keep the
// two in sync if that function's shape ever changes.
function buildGrandTripPayload(route) {
  const grand_trip = {
    grand_trip_id: route.id, name: route.name, status: route.status, start_date: route.start_date,
    description: route.description, travel_style: route.travel_style, climate_summary: route.climate_summary,
    best_starting_month: route.best_starting_month, notes: route.notes, created_at: route.created_at,
  };
  const regions = (route.regions || []).map((reg, i) => ({
    region_id: reg.id, grand_trip_id: route.id, order: i, name: reg.name,
    season: reg.season, budget: reg.budget, notes: reg.notes, collapsed: !!reg.collapsed,
  }));
  const blocks = (route.blocks || []).map((b, i) => ({
    block_id: b.id, grand_trip_id: route.id, region_id: b.region_id || '', order: i,
    country_code: b.country_code, country_name: b.country, days: b.days, budget: b.budget,
    notes: b.notes, transport_to_next: b.transport_to_next || '',
  }));
  const destinations = (route.blocks || []).flatMap(b => (b.destinations || []).map((d, i) => ({
    destination_id: d.id, block_id: b.id, order: i, name: d.name, notes: d.notes || '',
  })));
  return { grand_trip, regions, blocks, destinations };
}

// A real CSV parser is needed here, not a naive line-split: several routes' notes/description
// fields contain embedded newlines inside quoted values (multi-paragraph notes), which a plain
// line-split misreads as extra rows. Handles quotes, commas-within-quotes, and doubled-quote
// escaping; only the first field of each real row is used (grand_trip_id).
function parseIds(csvText) {
  const ids = new Set();
  let field = '';
  let inQuotes = false;
  let firstFieldOfRow = true;
  let i = 0;
  let rowIndex = -1; // -1 = header row, skip it

  const endField = () => {
    if (firstFieldOfRow) {
      if (rowIndex >= 0 && field.trim()) ids.add(field.trim());
      firstFieldOfRow = false;
    }
    field = '';
  };
  const endRow = () => {
    endField();
    firstFieldOfRow = true;
    rowIndex++;
  };

  while (i < csvText.length) {
    const c = csvText[i];
    if (inQuotes) {
      if (c === '"') {
        if (csvText[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    }
    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ',') { endField(); i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { endRow(); i++; continue; }
    field += c; i++;
  }
  if (field !== '' || !firstFieldOfRow) endRow();

  return ids;
}

async function main() {
  const push = process.argv.includes('--push');

  console.log('Running the seed/migration simulation (same as simulate_route_builder.js)...');
  const routesJson = execSync('node scripts/simulate_route_builder.js', { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 50 }).toString('utf8');
  const routes = JSON.parse(routesJson);
  console.log(`Simulated ${routes.length} total routes.`);

  console.log('Fetching the current GrandTrips sheet...');
  const sheetRes = await fetch(GRAND_TRIPS_CSV_URL, { redirect: 'follow' });
  const sheetCsv = await sheetRes.text();
  const existingIds = parseIds(sheetCsv);
  console.log(`Sheet currently has ${existingIds.size} routes.`);

  const missing = routes.filter(r => !existingIds.has(r.id));
  console.log(`\n${missing.length} route(s) missing from the Sheet:`);
  missing.forEach(r => console.log(`  - ${r.id}  (${r.name})`));

  if (!push) {
    console.log('\nDry run only — re-run with --push to actually POST these to the Sheet.');
    return;
  }

  console.log('\nPushing...');
  for (const route of missing) {
    const payload = { type: 'grand_trip', ...buildGrandTripPayload(route) };
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      console.log(`  pushed: ${route.id}`);
    } catch (err) {
      console.log(`  FAILED: ${route.id} — ${err.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 300)); // be nice to the Apps Script quota
  }
  console.log('\nDone. The published CSV can lag a minute or two behind the actual sheet — re-run with no flags shortly to confirm 0 missing.');
}

main().catch(err => { console.error(err); process.exit(1); });
