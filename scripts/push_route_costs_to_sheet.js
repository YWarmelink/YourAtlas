#!/usr/bin/env node
/**
 * Pushes RB_ROUTE_COSTS (routeBuilderContent.js) into the live GrandTrip* Sheet — the Sheet is what
 * a browser actually loads, so the rbMigrateApplyRouteCosts() localStorage migration alone never
 * shows up for an online browser (same reason as fix_longhaul_buffer_budgets_in_sheet.js).
 *
 * Reads the live routes through the app's own dataService.getGrandTripsFull(), runs the app's own
 * rbApplyRouteCosts() on them (fills only fields that are still empty, so anything entered by hand
 * in the browser wins), and writes just the changed cost columns with the `blocks_bulk_update` /
 * `grand_trips_bulk_update` endpoints — no full-route upserts, nothing else in the row is touched.
 * After --push it re-reads the published CSV until a second pass finds nothing left to fill.
 *
 * Usage:
 *   node scripts/push_route_costs_to_sheet.js                 # dry run, every route in RB_ROUTE_COSTS
 *   node scripts/push_route_costs_to_sheet.js --push          # actually POST
 *   node scripts/push_route_costs_to_sheet.js --route <id>    # limit to one route (either mode)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';
const CHUNK = 250;        // updates per request
const DELAY_MS = 900;     // between requests — Apps Script concurrent-execution quota
const POLL_MS = 20000;
const POLL_TRIES = 15;

function loadApp() {
  const sandbox = { console, fetch, URLSearchParams, Date, Math, JSON, localStorage: { getItem: () => null, setItem: () => {} } };
  vm.createContext(sandbox);
  for (const file of ['js/config/users.js', 'js/data/csvParser.js', 'js/utils/helpers.js', 'js/data/dataService.js',
                      'js/pages/routeBuilderCore.js', 'js/pages/routeBuilderContent.js']) {
    vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, file), 'utf8'), sandbox, { filename: file });
  }
  return sandbox;
}

// Runs rbApplyRouteCosts() against fresh live data; returns the updates still needed.
async function plan(onlyRoute) {
  const app = loadApp();
  const costs = vm.runInContext('RB_ROUTE_COSTS', app);
  const live = await vm.runInContext('dataService.getGrandTripsFull()', app);
  const blockUpdates = [], routeUpdates = [], report = [];

  for (const id of Object.keys(costs)) {
    if (onlyRoute && id !== onlyRoute) continue;
    const route = live.find(r => r.id === id);
    if (!route) { report.push(`  MISSING  ${id} — not in the Sheet`); continue; }
    const res = app.rbApplyRouteCosts(route, costs[id]);
    res.changedBlocks.forEach(i => blockUpdates.push({ grand_trip_id: id, block_order: i, ...app.rbBlockCostCells(route.blocks[i]) }));
    if (res.changedRoute) {
      const cells = app.rbRouteCostCells(route);
      routeUpdates.push({ grand_trip_id: id, flight_in_cost: cells.flight_in_cost, flight_out_cost: cells.flight_out_cost });
    }
    const total = Math.round(app.rbRouteCosts(route, 'mine').total);
    report.push(`  ${res.changedBlocks.length || res.changedRoute ? 'FILL' : 'DONE'}     ${route.name}: ` +
      `${res.changedBlocks.length} block(s)${res.changedRoute ? ' + flights' : ''} → My plan total €${total}`);
    res.skipped.forEach(s => report.push(`           skipped ${s}`));
  }
  return { blockUpdates, routeUpdates, report };
}

async function post(type, updates) {
  for (let i = 0; i < updates.length; i += CHUNK) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, redirect: 'follow',
      body: JSON.stringify({ type, updates: updates.slice(i, i + CHUNK) }),
    });
    const text = await res.text();
    console.log(`  ${type} [${i}-${Math.min(i + CHUNK, updates.length) - 1}]: ${res.status} ${text.slice(0, 200)}`);
    if (!/^updated: \d+, unresolved: 0/.test(text)) throw new Error(`Apps Script answered: ${text.slice(0, 500)}`);
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
}

async function main() {
  const push = process.argv.includes('--push');
  const ri = process.argv.indexOf('--route');
  const onlyRoute = ri !== -1 ? process.argv[ri + 1] : null;

  const first = await plan(onlyRoute);
  first.report.forEach(l => console.log(l));
  console.log(`\n${first.blockUpdates.length} block update(s), ${first.routeUpdates.length} route update(s).`);
  if (!push) { console.log('Dry run — re-run with --push to POST.'); return; }
  if (!first.blockUpdates.length && !first.routeUpdates.length) { console.log('Nothing to push.'); return; }

  await post('blocks_bulk_update', first.blockUpdates);
  if (first.routeUpdates.length) await post('grand_trips_bulk_update', first.routeUpdates);

  console.log('\nVerifying against the published CSV (it lags a minute or two)...');
  for (let i = 1; i <= POLL_TRIES; i++) {
    const again = await plan(onlyRoute);
    const left = again.blockUpdates.length + again.routeUpdates.length;
    if (!left) { again.report.forEach(l => console.log(l)); console.log('\nVerified: nothing left to fill.'); return; }
    console.log(`  try ${i}: ${left} update(s) not visible yet, waiting...`);
    await new Promise(r => setTimeout(r, POLL_MS));
  }
  throw new Error('updates still not visible after polling — check the Sheet');
}

main().catch(err => { console.error(err); process.exit(1); });
