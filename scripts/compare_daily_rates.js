#!/usr/bin/env node
/**
 * R2 (ROUTE_BUILDER_BUDGET_PLAN.md, Phase 4): compares every block's ground daily rate (budget / days,
 * TRUE live state via simulate_route_builder.js) with data/cost_reference/daily_rates_by_country.csv
 * and lists the blocks that are more than ±THRESHOLD off.
 *
 * A country can have variant rows (Patagonia, safari, ...). A block is compared with the row the app
 * picks (rbDailyRateRow() in routeBuilderCore.js: place variants by destination names, the others
 * by the closest rate), and the report says which one, so a "too high" block that matches a variant
 * reads as fine. Routes whose text says the car is in the daily rate are marked, since the reference table
 * never includes a car.
 *
 * Usage: node scripts/compare_daily_rates.js [--threshold 0.25] [--json]
 */
const { execSync } = require('child_process');
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2);
const THRESHOLD = argv.includes('--threshold') ? parseFloat(argv[argv.indexOf('--threshold') + 1]) : 0.25;

function parseCsv(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/).filter(Boolean)) {
    const cells = []; let cur = '', q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) { if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; }
      else if (ch === '"') q = true; else if (ch === ',') { cells.push(cur); cur = ''; } else cur += ch;
    }
    cells.push(cur); rows.push(cells);
  }
  const [head, ...body] = rows;
  return body.map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

const confidence = {};
parseCsv(fs.readFileSync(path.join(REPO_ROOT, 'data/cost_reference/daily_rates_by_country.csv'), 'utf8'))
  .forEach(r => (confidence[`${r.country_code}|${r.variant}`] = r.confidence));
const app = { console, localStorage: { getItem: () => null, setItem: () => {} } };
vm.createContext(app);
for (const f of ['js/data/dailyRatesReference.js', 'js/pages/routeBuilderCore.js']) {
  vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, f), 'utf8'), app, { filename: f });
}

const inv = JSON.parse(execSync('node scripts/route_cost_inventory.js', { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 50 }).toString('utf8'));
const carIncluded = new Set(inv.routes.filter(r => r.carInBudget === 'included').map(r => r.id));
const routes = JSON.parse(execSync('node scripts/simulate_route_builder.js', { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 50 }).toString('utf8'));

const flagged = [], missing = new Set(); let checked = 0;
routes.forEach(r => (r.blocks || []).forEach((b, i) => {
  const d = parseInt(b.days), bud = parseFloat(b.budget);
  if (!d || !bud) return;
  const row = app.rbDailyRateRow(b);
  if (!row) { missing.add(b.country_code); return; }
  checked++;
  const rate = bud / d;
  const best = { variant: row.variant || 'base', rate: Math.round(row.standard), confidence: confidence[`${b.country_code}|${row.variant}`] || 'blend' };
  const diff = rate / best.rate - 1;
  if (Math.abs(diff) > THRESHOLD) {
    flagged.push({ route: r.name, routeId: r.id, block: i, code: b.country_code, days: d, budget: bud, rate: Math.round(rate),
      ref: best.rate, variant: best.variant, confidence: best.confidence, diff: Math.round(diff * 100), carInRate: carIncluded.has(r.id) });
  }
}));

if (argv.includes('--json')) { process.stdout.write(JSON.stringify({ checked, flagged, missing: [...missing] }, null, 1)); process.exit(0); }
const under = flagged.filter(f => f.diff < 0), over = flagged.filter(f => f.diff > 0);
console.log(`${checked} blocks checked, ${flagged.length} off by more than ±${THRESHOLD * 100}% (${under.length} below, ${over.length} above the reference)` +
  (missing.size ? `; no reference row for ${[...missing].join(', ')}` : '') + '\n');
const table = list => {
  console.log('| Country | Route | Block | Days | €/day now | Reference (variant) | Diff | Car in rate |\n|---|---|---|---|---|---|---|---|');
  list.sort((a, b) => a.code.localeCompare(b.code) || a.diff - b.diff)
    .forEach(f => console.log(`| ${f.code} | ${f.route} | ${f.block} | ${f.days} | ${f.rate} | ${f.ref} (${f.variant}, ${f.confidence}) | ${f.diff > 0 ? '+' : ''}${f.diff}% | ${f.carInRate ? 'yes' : ''} |`));
};
console.log('## Below the reference (underbudgeted)\n'); table(under);
console.log('\n## Above the reference\n'); table(over);
