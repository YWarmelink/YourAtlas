#!/usr/bin/env node
/**
 * Phase 4 route batches (ROUTE_BUILDER_BUDGET_PLAN.md, planning/budget_batches/BATCHES.md): writes
 * planning/budget_batch<N>/input.json for one batch — every route of the batch with its TRUE live
 * data (simulate_route_builder.js), its travel mode and car wording (route_cost_inventory.js), its
 * distances (route_distances.js), and per block whether the car is already in the daily rate
 * (an R2d "keep" call for a car, planning/budget_r2d/decisions.json). The pricing agent then
 * needs no other route source.
 *
 * Usage: node scripts/budget_batch_input.js <batch number>
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const n = parseInt(process.argv[2]);
const batch = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'planning/budget_batches/batches.json'), 'utf8')).find(b => b.batch === n);
if (!batch) { console.error(`no batch ${process.argv[2]} in planning/budget_batches/batches.json`); process.exit(1); }

const run = cmd => JSON.parse(execSync(cmd, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 50 }).toString('utf8'));
const app = { console, localStorage: { getItem: () => null, setItem: () => {} } };
vm.createContext(app);
for (const f of ['js/data/dailyRatesReference.js', 'js/pages/routeBuilderCore.js']) {
  vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, f), 'utf8'), app, { filename: f });
}
const decisions = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'planning/budget_r2d/decisions.json'), 'utf8'));
const live = run('node scripts/simulate_route_builder.js');
const inv = Object.fromEntries(run('node scripts/route_cost_inventory.js').routes.map(r => [r.id, r]));
const dist = Object.fromEntries(run('node scripts/route_distances.js').map(d => [d.id, d]));

const routes = batch.routes.map(({ id }) => {
  const r = live.find(x => x.id === id), iv = inv[id] || {};
  if (!r) throw new Error(`route ${id} not in the live state`);
  return {
    id, name: r.name, mode: iv.mode, carInBudgetWording: iv.carInBudget, carEvidence: iv.carEvidence,
    travel_style: r.travel_style, description: r.description, notes: r.notes, distance: dist[id] || null,
    blocks: r.blocks.map((b, i) => {
      const ref = app.rbDailyRateRow(b);
      // R2d kept a block whose car is in its rate under the key of its (unchanged) budget.
      const d = ref && decisions[[b.country_code, parseInt(b.days), parseFloat(b.budget), ref.variant || 'base'].join('|')];
      return {
        index: i, country_code: b.country_code, country: b.country, days: b.days, budget: b.budget,
        dailyRate: Math.round(b.budget / b.days), carInDailyRate: !!(d && d.call === 'keep' && /\bcar\b|4x4|rental/i.test(d.why)),
        // What else R2d said is in the rate (ferries, domestic flights, tours): don't price it again.
        inDailyRate: d && d.call === 'keep' ? d.why : null,
        notes: b.notes, transport_to_next: b.transport_to_next,
        destinations: (b.destinations || []).map(x => ({ name: x.name, lat: x.lat, lng: x.lng })),
      };
    }),
  };
});

const dir = path.join(REPO_ROOT, `planning/budget_batch${n}`);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'input.json'), JSON.stringify({ batch: n, group: batch.group, routes }, null, 1));
console.log(`planning/budget_batch${n}/input.json: ${routes.length} routes, ${routes.reduce((s, r) => s + r.blocks.length, 0)} blocks`);
routes.forEach(r => console.log(`  ${r.name} | ${r.mode} | car in rate: ${r.blocks.filter(b => b.carInDailyRate).map(b => b.country_code).join(',') || '-'}`));
