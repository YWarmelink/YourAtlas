#!/usr/bin/env node
/**
 * Deletes routes listed in RB_REMOVED_ROUTE_IDS (routeBuilderCore.js) that still have rows in the
 * Sheet. The app already hides them on load; this removes the leftover rows themselves (the route
 * plus its regions/blocks/destinations, via the Apps Script `grand_trip_delete` action).
 *
 *   node scripts/delete_removed_routes_from_sheet.js          # dry run: lists what would go
 *   node scripts/delete_removed_routes_from_sheet.js --push   # deletes (needs Youri's OK)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';

function loadApp() {
  const sandbox = { console, fetch, URLSearchParams, Date, Math, JSON, localStorage: { getItem: () => null, setItem: () => {} } };
  vm.createContext(sandbox);
  for (const file of ['js/config/users.js', 'js/data/csvParser.js', 'js/utils/helpers.js', 'js/data/dataService.js',
                      'js/pages/routeBuilderCore.js']) {
    vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, file), 'utf8'), sandbox, { filename: file });
  }
  return sandbox;
}

async function main() {
  const push = process.argv.includes('--push');
  const app = loadApp();
  const removed = vm.runInContext('[...RB_REMOVED_ROUTE_IDS]', app);
  const live = await vm.runInContext('dataService.getGrandTripsFull()', app);
  const targets = live.filter(r => removed.includes(r.id));
  if (!targets.length) { console.log('Nothing to delete: no removed route is left in the Sheet.'); return; }
  targets.forEach(r => console.log(`  DELETE   ${r.id} — ${r.name} (${(r.blocks || []).length} blocks)`));
  if (!push) { console.log(`\nDry run — ${targets.length} route(s) would be deleted. Re-run with --push to POST.`); return; }
  for (const r of targets) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, redirect: 'follow',
      body: JSON.stringify({ type: 'grand_trip_delete', grand_trip_id: r.id }),
    });
    console.log(`  ${r.id}: ${res.status} ${(await res.text()).slice(0, 120)}`);
    await new Promise(done => setTimeout(done, 900));
  }
  console.log('\nDone. The published CSV lags a minute or two — re-run without --push to confirm.');
}

main().catch(err => { console.error(err); process.exit(1); });
