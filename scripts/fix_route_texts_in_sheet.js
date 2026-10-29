#!/usr/bin/env node
/**
 * Applies a Phase 4 batch's route-text fix function (routeBuilderContent.js) to the live Sheet.
 * The Sheet is Route Builder's source of truth on load, so the localStorage migration alone never
 * reaches an online browser.
 *  - batch 3 (2026-10-28): rbFixBatch3RouteTexts() — Northern Italy Roadtrip (9 days) 🚙 back to
 *    9 days, and San Marino + Tuscany (5 days) 🍷's new Bologna block.
 *  - batch 4 (2026-10-28): rbFixBatch4RouteTexts() — notes text of Sicily + Malta (9 days) 🌋 and
 *    San Marino: Day Visit (1 day) 🛡️.
 *  - batches 5+6 (2026-10-28): rbFixBatch56RouteTexts() — Canary Islands (10-14 days) 🏝️ and
 *    Tenerife + La Gomera (7-10 days) 🏝️.
 *
 * Reads the live routes through the app's own dataService.getGrandTripsFull(), runs the app's own
 * fix function on them (a no-op once applied or when hand-edited), and upserts each changed route
 * whole with rbBuildGrandTripPayload() via the `grand_trip` endpoint (a block may be added, which
 * the bulk-update endpoints can't do). Run it BEFORE pushing these routes' costs: a full upsert
 * rebuilds the route from what the CSV shows.
 *
 * Usage: node scripts/fix_route_texts_in_sheet.js <batch> [--push]
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';
const FIXES = {
  3: { fn: 'rbFixBatch3RouteTexts', ids: ['gt_seed_northern-italy-roadtrip-9-days', 'gt_seed_san-marino-tuscany-5-days'] },
  4: { fn: 'rbFixBatch4RouteTexts', ids: ['gt_seed_sicily-malta-9-days', 'gt_seed_san-marino-day-visit-1-day'] },
  56: { fn: 'rbFixBatch56RouteTexts', ids: ['gt_seed_canary-islands-10-14-days', 'gt_seed_tenerife-la-gomera-7-10-days'] },
  78: { fn: 'rbFixBatch78RouteTexts', ids: ['gt_seed_alpine-roadtrip-14-days', 'gt_seed_france-roadtrip-paris-to-the-cote-dazur-12-days'] },
  912: { fn: 'rbFixBatch912RouteTexts', ids: ['gt_seed_switzerland-alpine-roadtrip-9-days', 'gt_seed_switzerland-northern-italy-9-days',
                                             'gt_seed_austria-slovenia-croatia-10-14-days'] },
  1320: { fn: 'rbFixBatch1320RouteTexts', ids: ['gt_seed_germany-austria-slovenia-10-14-days', 'gt_seed_scandinavia-overland',
                                               'gt_seed_channel-islands-brittany-normandyopal-coast-belgium',
                                               'gt_seed_british-isles-celtic-coast-expedition', 'gt_seed_west-eurasia-overland'] },
  2126: { fn: 'rbFixBatch2126RouteTexts', ids: [
    'gt_seed_kazakhstan-kyrgyzstan',
    'gt_seed_central-asia',
    'gt_seed_eurasia-grand-tour',
    'gt_seed_west-eurasia-overland',
    'gt_seed_botswana',
    'gt_seed_southern-africa-safari-loop',
    'gt_seed_african-islands',
    'gt_seed_east-africa-safari-classic',
    'gt_seed_tanzania',
    'gt_seed_morocco',
    'gt_seed_bolivia',
    'gt_seed_andes-grand-traverse',
    'gt_seed_central-america-loop',
    'gt_seed_mexico',
    'gt_seed_cairns-great-barrier-reef',
    'gt_seed_tropicaloutback-australia',
    'gt_seed_western-canada-rockies-vancouver',
    'gt_seed_north-america-grand-traverse',
    'gt_seed_pacific-northwest',
    'gt_seed_argentine-patagonia',
    'gt_seed_west-africa-overland',
  ] },
  // quality check 2026-10: texts, destination order and visa extras; the id list lives in the app
  quality: { fn: 'rbFixQuality202610Route', idsFn: 'rbQuality202610RouteIds' },
  // quality check option D 2026-10-29: 2e budgets, leftover costs/extras/texts
  qualityb: { fn: 'rbFixQuality202610bRoute', idsFn: 'rbQuality202610bRouteIds' },
  // quality check 2026-10-29: the unclear statements, web-checked
  qualityc: { fn: 'rbFixQuality202610cRoute', idsFn: 'rbQuality202610cRouteIds' },
  // quality check 2b: web-verified flight fares
  fares: { fn: 'rbFixQuality2bFares', idsFn: 'rbQuality2bFareRouteIds' },
  // My-plan clarification line on notes quoting standard €/day: applies by rule, so it scans every route
  myplan: { fn: 'rbFixMyPlanNotes', all: true },
};

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
  const fix = FIXES[process.argv[2]];
  if (!fix) { console.error(`usage: node scripts/fix_route_texts_in_sheet.js <${Object.keys(FIXES).join('|')}> [--push]`); process.exit(1); }
  const push = process.argv.includes('--push');
  const app = loadApp();
  const routes = await vm.runInContext('dataService.getGrandTripsFull()', app);
  const toPush = [];
  let done = 0;
  for (const id of fix.all ? routes.map(r => r.id) : (fix.ids || app[fix.idsFn]())) {
    const route = routes.find(r => r.id === id);
    if (!route) { console.log(`  MISSING  ${id}`); continue; }
    const before = route.blocks.map(b => `${b.country_code}${b.days}d/€${b.budget}`).join(' ');
    if (!app[fix.fn](route)) { done++; if (!fix.all) console.log(`  DONE     ${route.name}: ${before}`); continue; }
    console.log(`  FIX      ${route.name}: ${before} → ${route.blocks.map(b => `${b.country_code}${b.days}d/€${b.budget}`).join(' ')}`);
    toPush.push(route);
  }
  if (fix.all) console.log(`  DONE     ${done} route(s) need no change`);
  if (!push) { console.log(`\nDry run — ${toPush.length} route(s) would be upserted. Re-run with --push to POST.`); return; }
  for (const route of toPush) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, redirect: 'follow',
      body: JSON.stringify({ type: 'grand_trip', ...app.rbBuildGrandTripPayload(route) }),
    });
    console.log(`  ${route.name}: ${res.status} ${(await res.text()).slice(0, 120)}`);
    await new Promise(r => setTimeout(r, 900));
  }
  console.log('\nDone. The published CSV lags a minute or two — re-run without --push until every route reads DONE.');
}

main().catch(err => { console.error(err); process.exit(1); });
