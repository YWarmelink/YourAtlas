#!/usr/bin/env node
/**
 * One-off (2026-10-28): applies rbFixBatch3RouteTexts() (routeBuilderContent.js) to the live Sheet —
 * Northern Italy Roadtrip (9 days) 🚙 back to 9 days, and San Marino + Tuscany (5 days) 🍷's new
 * Bologna block. The Sheet is Route Builder's source of truth on load, so the localStorage
 * migration alone never reaches an online browser.
 *
 * Reads the live routes through the app's own dataService.getGrandTripsFull(), runs the app's own
 * fix function on them (a no-op once applied or when hand-edited), and upserts each changed route
 * whole with rbBuildGrandTripPayload() via the `grand_trip` endpoint (a block is added, which the
 * bulk-update endpoints can't do). Run it BEFORE pushing these routes' costs: a full upsert
 * rebuilds the route from what the CSV shows.
 *
 * Usage: node scripts/fix_batch3_routes_in_sheet.js [--push]
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';
const IDS = ['gt_seed_northern-italy-roadtrip-9-days', 'gt_seed_san-marino-tuscany-5-days'];

function loadApp() {
  const sandbox = { console, fetch, URLSearchParams, Date, Math, JSON, localStorage: { getItem: () => null, setItem: () => {} } };
  vm.createContext(sandbox);
  for (const file of ['js/config/users.js', 'js/data/csvParser.js', 'js/utils/helpers.js', 'js/data/dataService.js',
                      'js/pages/routeBuilderCore.js', 'js/pages/routeBuilderContent.js']) {
    vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, file), 'utf8'), sandbox, { filename: file });
  }
  return sandbox;
}

async function main() {
  const push = process.argv.includes('--push');
  const app = loadApp();
  const routes = await vm.runInContext('dataService.getGrandTripsFull()', app);
  const toPush = [];
  for (const id of IDS) {
    const route = routes.find(r => r.id === id);
    if (!route) { console.log(`  MISSING  ${id}`); continue; }
    const before = route.blocks.map(b => `${b.country_code}${b.days}d/€${b.budget}`).join(' ');
    if (!app.rbFixBatch3RouteTexts(route)) { console.log(`  DONE     ${route.name}: ${before}`); continue; }
    console.log(`  FIX      ${route.name}: ${before} → ${route.blocks.map(b => `${b.country_code}${b.days}d/€${b.budget}`).join(' ')}`);
    toPush.push(route);
  }
  if (!push) { console.log(`\nDry run — ${toPush.length} route(s) would be upserted. Re-run with --push to POST.`); return; }
  for (const route of toPush) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, redirect: 'follow',
      body: JSON.stringify({ type: 'grand_trip', ...app.rbBuildGrandTripPayload(route) }),
    });
    console.log(`  ${route.name}: ${res.status} ${(await res.text()).slice(0, 120)}`);
    await new Promise(r => setTimeout(r, 900));
  }
  console.log('\nDone. The published CSV lags a minute or two — re-run without --push until both read DONE.');
}

main().catch(err => { console.error(err); process.exit(1); });
