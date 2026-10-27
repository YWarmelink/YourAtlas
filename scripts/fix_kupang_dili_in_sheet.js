#!/usr/bin/env node
/**
 * One-off (2026-10): applies rbMigrateKupangDiliOverland()'s text fix (no direct Kupang–Dili
 * flight; overland bus + visa authorisation) to the live GrandTrip* Sheet, the source of truth
 * on load. transport_to_next isn't a bulk-updatable column, so this upserts the whole route as
 * read from the live Sheet (coordinates, notes and cost fields included), like
 * fix_longhaul_buffer_budgets_in_sheet.js. The fix itself is RB_KUPANG_DILI_FIX /
 * rbApplyKupangDiliFix() in routeBuilderContent.js, so it can't drift from the migration.
 *
 * Run it BEFORE push_route_costs_to_sheet.js on this route, or after that push is visible in the
 * published CSV — an upsert built from a CSV that doesn't show the costs yet would blank them.
 *
 * Usage:
 *   node scripts/fix_kupang_dili_in_sheet.js          # dry run
 *   node scripts/fix_kupang_dili_in_sheet.js --push   # actually POST
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
                      'js/pages/routeBuilderCore.js', 'js/pages/routeBuilderContent.js']) {
    vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, file), 'utf8'), sandbox, { filename: file });
  }
  return sandbox;
}

async function main() {
  const push = process.argv.includes('--push');
  const app = loadApp();
  const fix = vm.runInContext('RB_KUPANG_DILI_FIX', app);
  const routes = await vm.runInContext('dataService.getGrandTripsFull()', app);
  const route = routes.find(r => r.id === fix.routeId);
  if (!route) { console.log(`${fix.routeId} is not in the Sheet.`); return; }

  if (!app.rbApplyKupangDiliFix(route)) {
    const block = route.blocks.find(b => b.country_code === fix.code);
    console.log(block && block.transport_to_next === fix.newTransport
      ? 'DONE — the Sheet already has the new text.'
      : 'SKIP — the Sheet text is neither the old nor the new version (hand-edited?).');
    return;
  }
  console.log(`FIX  ${route.name}: Indonesia transport_to_next + Kupang destination note`);
  if (!push) { console.log('Dry run — re-run with --push to POST.'); return; }

  const payload = { type: 'grand_trip', ...app.rbBuildGrandTripPayload(route) };
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload), redirect: 'follow',
  });
  console.log(`  ${res.status} ${(await res.text()).slice(0, 160)}`);
  console.log('Done. The published CSV lags a minute or two — re-run without --push to confirm it reads DONE.');
}

main().catch(err => { console.error(err); process.exit(1); });
