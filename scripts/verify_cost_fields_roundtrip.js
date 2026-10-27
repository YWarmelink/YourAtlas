#!/usr/bin/env node
/**
 * Round-trip check for the full-cost budget fields (ROUTE_BUILDER_BUDGET_PLAN.md, Phase 1):
 * a route written with rbBuildGrandTripPayload() must come back from getGrandTripsFull() with
 * every cost field intact — the Sheet merge on load wipes anything that doesn't survive this.
 *
 * Default (offline, no network): builds the payload for a test route, turns the rows into CSV
 * the way the Dutch-locale Sheet publishes them (decimal comma, day-first dates), and reads them
 * back through the app's own parseCSV() + getGrandTripsFull().
 *
 * --live (needs the redeployed Apps Script, WRITES TO THE SHEET): upserts the test route
 * `gt_test_cost_roundtrip` (in RB_REMOVED_ROUTE_IDS, so no browser ever shows it), reads it back
 * from the published CSV, then exercises blocks_bulk_update / grand_trips_bulk_update on it and
 * reads again, and finally deletes it. Also checks the real routes' count and coordinates are
 * unchanged. The published CSV lags a minute or two, so each read polls.
 *
 * Usage:
 *   node scripts/verify_cost_fields_roundtrip.js
 *   node scripts/verify_cost_fields_roundtrip.js --live
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';
const TEST_ID = 'gt_test_cost_roundtrip';
const POLL_MS = 20000;
const POLL_TRIES = 15;

function loadApp() {
  const sandbox = { console, fetch, URLSearchParams, Date, Math, JSON, localStorage: { getItem: () => null, setItem: () => {} } };
  vm.createContext(sandbox);
  for (const file of ['js/config/users.js', 'js/data/csvParser.js', 'js/utils/helpers.js', 'js/data/dataService.js',
                      'js/pages/routeBuilderCore.js']) {
    vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, file), 'utf8'), sandbox, { filename: file });
  }
  return sandbox;
}

// Covers the cases that can go wrong: '' vs 0, decimals, [] vs null, text with commas/quotes/
// newlines in a JSON cell, a label starting with "=", and a date the Sheet turns into a real date.
function testRoute() {
  return {
    id: TEST_ID, name: 'Cost round-trip test (auto-deleted)', status: 'Idea', start_date: '',
    description: '', travel_style: '', climate_summary: '', best_starting_month: '', notes: '',
    created_at: '2026-10-27T00:00:00.000Z',
    flight_in_cost: 612.5, flight_out_cost: 0, trip_costs: { insurance_per_month: 95, buffer_pct: 10 },
    regions: [],
    blocks: [
      { id: 'blk_test_1', country: 'Japan', country_code: 'JP', region_id: '', days: 14, budget: 1680,
        notes: '', transport_to_next: 'flight', lat: 35.6762, lng: 139.6503,
        transport_cost: 145.75, transport_cost_to: 'KR', local_transport_cost: 0,
        extras: [
          { label: 'JR Pass, 14 days ("green")', cost: 520, category: 'transport', optional: false },
          { label: '=Fuji climb\nguide', cost: 89.9, category: 'tour', optional: true },
        ],
        costs_checked: '2026-10-27', destinations: [] },
      { id: 'blk_test_2', country: 'South Korea', country_code: 'KR', region_id: '', days: 7, budget: 630,
        notes: '', transport_to_next: '', lat: null, lng: null,
        transport_cost: '', transport_cost_to: '', local_transport_cost: '', extras: [], costs_checked: '',
        destinations: [] },
      { id: 'blk_test_3', country: 'Taiwan', country_code: 'TW', region_id: '', days: 5, budget: 450,
        notes: '', transport_to_next: '', lat: null, lng: null, destinations: [] },  // no cost fields at all
    ],
  };
}

const ROUTE_FIELDS = ['flight_in_cost', 'flight_out_cost', 'trip_costs'];
const BLOCK_FIELDS = ['transport_cost', 'transport_cost_to', 'local_transport_cost', 'extras', 'costs_checked'];

// What a field should read back as: '' for empty numbers/strings, null for empty lists/objects.
function expected(v, field) {
  if (field === 'extras' || field === 'trip_costs') return v === undefined || v === '' ? null : v;
  return v === undefined || v === null ? '' : v;
}

function compare(want, got) {
  const errors = [];
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  ROUTE_FIELDS.forEach(f => {
    if (!eq(expected(want[f], f), got[f])) errors.push(`route.${f}: want ${JSON.stringify(expected(want[f], f))}, got ${JSON.stringify(got[f])}`);
  });
  if (want.blocks.length !== got.blocks.length) errors.push(`block count: want ${want.blocks.length}, got ${got.blocks.length}`);
  want.blocks.forEach((b, i) => BLOCK_FIELDS.forEach(f => {
    const g = (got.blocks[i] || {})[f];
    if (!eq(expected(b[f], f), g)) errors.push(`block[${i}].${f}: want ${JSON.stringify(expected(b[f], f))}, got ${JSON.stringify(g)}`);
  }));
  return errors;
}

// ---- offline: payload rows -> Dutch-locale CSV -> parseCSV -> getGrandTripsFull ----

function sheetCell(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number') return String(v).replace('.', ',');           // decimal comma
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);                          // Sheets turns it into a date
  if (iso) return `${+iso[3]}-${+iso[2]}-${iso[1]}`;
  return v;
}

function toCSV(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const esc = s => /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  return [headers.join(','), ...rows.map(r => headers.map(h => esc(sheetCell(r[h]))).join(','))].join('\n');
}

async function offline(app) {
  const route = testRoute();
  const p = app.rbBuildGrandTripPayload(route);
  const tables = {
    grand_trips: [p.grand_trip], grand_trip_regions: p.regions,
    grand_trip_blocks: p.blocks, grand_trip_destinations: p.destinations,
  };
  const ds = vm.runInContext('dataService', app);  // a top-level const, not a sandbox property
  ds._load = async key => app.parseCSV(toCSV(tables[key] || []));
  const back = (await ds.getGrandTripsFull()).find(r => r.id === TEST_ID);
  return compare(route, back);
}

// ---- live ----

async function post(body) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(body), redirect: 'follow',
  });
  const text = await res.text();
  console.log(`  ${body.type}: ${res.status} ${text.slice(0, 160)}`);
  if (!/^(ok|updated)/.test(text)) throw new Error(`Apps Script answered: ${text.slice(0, 300)}`);
  return text;
}

async function readLive() {
  return vm.runInContext('dataService.getGrandTripsFull()', loadApp());  // fresh sandbox = no cache
}

async function pollUntil(label, check) {
  for (let i = 1; i <= POLL_TRIES; i++) {
    const routes = await readLive();
    const res = check(routes);
    if (res === true) { console.log(`  ${label}: OK (try ${i})`); return routes; }
    console.log(`  ${label}: not yet (${res}), waiting...`);
    await new Promise(r => setTimeout(r, POLL_MS));
  }
  throw new Error(`${label}: still failing after ${POLL_TRIES} tries`);
}

const coordCount = routes => routes.reduce((n, r) => n + r.blocks.filter(b => typeof b.lat === 'number').length, 0);

async function live(app) {
  const before = (await readLive()).filter(r => r.id !== TEST_ID);
  console.log(`Live Sheet before: ${before.length} routes, ${coordCount(before)} blocks with coordinates.`);

  const route = testRoute();
  console.log('\n1. Upsert the test route');
  await post({ type: 'grand_trip', ...app.rbBuildGrandTripPayload(route) });
  await pollUntil('read back after upsert', routes => {
    const got = routes.find(r => r.id === TEST_ID);
    if (!got) return 'test route not visible yet';
    const errors = compare(route, got);
    return errors.length ? errors.join('; ') : true;
  });

  console.log('\n2. Bulk-update cost fields on the existing rows');
  route.flight_out_cost = 704;
  route.trip_costs = { insurance_per_month: 110, buffer_pct: 12.5 };
  route.blocks[1].transport_cost = 98;
  route.blocks[1].transport_cost_to = 'TW';
  route.blocks[1].extras = [{ label: 'DMZ tour', cost: 75, category: 'tour', optional: true }];
  route.blocks[1].costs_checked = '2026-10-28';
  const routeCells = app.rbRouteCostCells(route);
  const blockCells = app.rbBlockCostCells(route.blocks[1]);
  await post({ type: 'grand_trips_bulk_update', updates: [{ grand_trip_id: TEST_ID, flight_out_cost: routeCells.flight_out_cost, trip_costs: routeCells.trip_costs }] });
  await post({ type: 'blocks_bulk_update', updates: [{ grand_trip_id: TEST_ID, block_order: 1, ...blockCells }] });
  await pollUntil('read back after bulk update', routes => {
    const got = routes.find(r => r.id === TEST_ID);
    const errors = got ? compare(route, got) : ['test route missing'];
    return errors.length ? errors.join('; ') : true;
  });

  console.log('\n3. Delete the test route');
  await post({ type: 'grand_trip_delete', grand_trip_id: TEST_ID });
  const after = await pollUntil('test route gone', routes => routes.some(r => r.id === TEST_ID) ? 'still there' : true);

  console.log(`\nLive Sheet after: ${after.length} routes, ${coordCount(after)} blocks with coordinates.`);
  if (after.length !== before.length || coordCount(after) !== coordCount(before)) {
    throw new Error('real routes changed during the test — check the Sheet');
  }
}

async function main() {
  const app = loadApp();
  const errors = await offline(app);
  if (errors.length) {
    console.log('OFFLINE round-trip FAILED:');
    errors.forEach(e => console.log('  ' + e));
    process.exit(1);
  }
  console.log('Offline round-trip: all cost fields survive (payload -> Dutch-locale CSV -> getGrandTripsFull).');

  if (process.argv.includes('--live')) {
    await live(app);
    console.log('\nLive round-trip: PASSED.');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
