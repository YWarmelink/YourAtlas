#!/usr/bin/env node
/**
 * One-off (2026-10): applies rbMigrateLonghaulBufferBudgets()'s fix to the live GrandTrip* Sheet.
 * The Sheet is Route Builder's source of truth on load, so the localStorage migration alone
 * never reaches a browser that's online: every already-synced route comes back from the Sheet
 * with its old budget.
 *
 * Does exactly what a hand edit in the browser does: read the live routes through the app's own
 * dataService.getGrandTripsFull(), change the one block's budget (only when it still has the old
 * value at the new day count, so a hand-edited budget is left alone) plus the matching notes
 * sentence, then upsert the whole route with the app's own rbBuildGrandTripPayload() via the
 * `grand_trip` endpoint. The fix list is read straight from RB_LONGHAUL_BUFFER_BUDGET_FIXES in
 * routeBuilderContent.js, so it can't drift from the migration.
 *
 * Usage:
 *   node scripts/fix_longhaul_buffer_budgets_in_sheet.js          # dry run
 *   node scripts/fix_longhaul_buffer_budgets_in_sheet.js --push   # actually POST
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';
const DELAY_MS = 900; // between requests — Apps Script concurrent-execution quota

const NOTE_OLD = 'as a long-haul flight buffer (see CLAUDE.md';
const NOTE_NEW = 'as a long-haul flight buffer, block budget scaled along at the same daily rate (2026-10 fix — it had been left at the old day count) (see CLAUDE.md';

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
  const fixes = vm.runInContext('RB_LONGHAUL_BUFFER_BUDGET_FIXES', app);
  const routes = await vm.runInContext('dataService.getGrandTripsFull()', app);
  console.log(`Loaded ${routes.length} routes from the live Sheet.`);

  const toPush = [];
  for (const [routeName, code, days, oldBudget, newBudget] of fixes) {
    const route = routes.find(r => r.name === routeName);
    if (!route) { console.log(`  MISSING  ${routeName} — not in the Sheet (the browser auto-push will bring the fixed source version)`); continue; }
    const block = route.blocks.find(b => b.country_code === code && b.days === days);
    if (!block) { console.log(`  SKIP     ${routeName} — no ${code} block with ${days} days`); continue; }
    if (block.budget === newBudget) { console.log(`  DONE     ${routeName} — already €${newBudget}`); continue; }
    if (block.budget !== oldBudget) { console.log(`  SKIP     ${routeName} — budget is €${block.budget}, not the expected €${oldBudget} (hand-edited?)`); continue; }
    block.budget = newBudget;
    const notesFixed = (route.notes || '').includes(NOTE_OLD);
    if (notesFixed) route.notes = route.notes.replace(NOTE_OLD, NOTE_NEW);
    console.log(`  FIX      ${routeName} — ${code} ${days}d: €${oldBudget} → €${newBudget}${notesFixed ? ' (+ notes)' : ''}`);
    toPush.push(route);
  }

  if (!push) {
    console.log(`\nDry run — ${toPush.length} route(s) would be pushed. Re-run with --push to POST.`);
    return;
  }
  for (const route of toPush) {
    const payload = { type: 'grand_trip', ...app.rbBuildGrandTripPayload(route) };
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload), redirect: 'follow',
    });
    console.log(`  ${route.name}: ${res.status} ${(await res.text()).slice(0, 120)}`);
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  console.log('\nDone. The published CSV lags a minute or two — re-run without --push to confirm everything reads DONE.');
}

main().catch(err => { console.error(err); process.exit(1); });
