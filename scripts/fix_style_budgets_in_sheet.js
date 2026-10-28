#!/usr/bin/env node
/**
 * R2d (2026-10-28): applies rbMigrateStyleBudgets()'s fix to the live GrandTrip* Sheet. The Sheet
 * is Route Builder's source of truth on load, so the localStorage migration alone never reaches a
 * browser that's online (same reason as fix_longhaul_buffer_budgets_in_sheet.js).
 *
 * Reads the live routes through the app's own dataService.getGrandTripsFull(), finds each block
 * with the app's own rbStyleBudgetBlock() (only a block that still has the old budget at the same
 * day count, so a hand edit is left alone), and writes ONLY the `budget` cell with the
 * `blocks_bulk_update` endpoint — no full-route upserts, nothing else in the row is touched.
 * The fix list is RB_STYLE_BUDGET_FIXES in routeBuilderContent.js, so it can't drift from the
 * migration. After --push it re-reads the published CSV until a pass finds nothing left.
 *
 * Needs the Apps Script version that allows `budget` in blocks_bulk_update (2026-10-28).
 *
 * Usage:
 *   node scripts/fix_style_budgets_in_sheet.js          # dry run
 *   node scripts/fix_style_budgets_in_sheet.js --push   # actually POST
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

async function plan(app, verbose) {
  const fixes = vm.runInContext('RB_STYLE_BUDGET_FIXES', app);
  const routes = await vm.runInContext('dataService.getGrandTripsFull()', app);
  const updates = [], count = { fix: 0, done: 0, skip: 0, missing: 0 };
  for (const [id, list] of Object.entries(fixes)) {
    const route = routes.find(r => r.id === id);
    if (!route) { count.missing++; if (verbose) console.log(`  MISSING  ${id} — not in the Sheet`); continue; }
    list.forEach(f => {
      const [i, code, days, from, to] = f;
      const b = app.rbStyleBudgetBlock(route, f);
      if (b) { updates.push({ grand_trip_id: id, block_order: route.blocks.indexOf(b), budget: to }); count.fix++; return; }
      if (app.rbStyleBudgetBlock(route, [i, code, days, to])) { count.done++; return; }
      count.skip++;
      const cur = route.blocks[i];
      if (verbose) console.log(`  SKIP     ${route.name} #${i} ${code} ${days}d — Sheet has ${cur ? `${cur.country_code} ${cur.days}d €${cur.budget}` : 'no block'}, expected €${from}`);
    });
  }
  return { routes: routes.length, updates, count };
}

async function post(updates) {
  for (let i = 0; i < updates.length; i += CHUNK) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, redirect: 'follow',
      body: JSON.stringify({ type: 'blocks_bulk_update', updates: updates.slice(i, i + CHUNK) }),
    });
    const text = await res.text();
    console.log(`  blocks_bulk_update [${i}-${Math.min(i + CHUNK, updates.length) - 1}]: ${res.status} ${text.slice(0, 200)}`);
    if (!/^updated: \d+, unresolved: 0/.test(text)) throw new Error(`Apps Script answered: ${text.slice(0, 500)}`);
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
}

async function main() {
  const push = process.argv.includes('--push');
  const app = loadApp();
  const first = await plan(app, true);
  const c = first.count;
  console.log(`\n${first.routes} routes in the Sheet: ${c.fix} block budget(s) to change, ${c.done} already done, ` +
    `${c.skip} skipped (budget differs from the expected old value), ${c.missing} route(s) missing.`);
  if (!push) { console.log('Dry run — re-run with --push to POST.'); return; }
  if (!first.updates.length) { console.log('Nothing to push.'); return; }

  await post(first.updates);
  console.log('\nVerifying against the published CSV (it lags a minute or two)...');
  for (let i = 1; i <= POLL_TRIES; i++) {
    const again = await plan(loadApp(), false);
    if (!again.updates.length) { console.log(`Verified: ${again.count.done} done, nothing left to change.`); return; }
    console.log(`  try ${i}: ${again.updates.length} update(s) not visible yet, waiting...`);
    await new Promise(r => setTimeout(r, POLL_MS));
  }
  throw new Error('updates still not visible after polling — check the Sheet');
}

main().catch(err => { console.error(err); process.exit(1); });
