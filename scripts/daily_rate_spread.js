#!/usr/bin/env node
/**
 * R2 prep (ROUTE_BUILDER_BUDGET_PLAN.md, Phase 4): the current ground daily rate (block budget / days)
 * per country across every route, on the TRUE live state (simulate_route_builder.js). Shows where
 * the same country is priced very differently between routes, i.e. where the R2 research matters most.
 *
 * Usage: node scripts/daily_rate_spread.js            # markdown table, widest spread first
 *        node scripts/daily_rate_spread.js --json
 */
const { execSync } = require('child_process');
const path = require('path');

const routes = JSON.parse(execSync('node scripts/simulate_route_builder.js',
  { cwd: path.join(__dirname, '..'), maxBuffer: 1024 * 1024 * 50 }).toString('utf8'));
const by = {};
routes.forEach(r => (r.blocks || []).forEach(b => {
  const d = parseInt(b.days), bud = parseFloat(b.budget);
  if (!d || !bud) return;
  (by[b.country_code] = by[b.country_code] || { country: b.country, rates: [] }).rates.push({ rate: bud / d, route: r.name, days: d });
}));
const q = (a, p) => a[Math.min(a.length - 1, Math.floor(p * (a.length - 1) + 0.5))];
const rows = Object.entries(by).map(([code, { country, rates }]) => {
  const s = rates.map(x => x.rate).sort((a, b) => a - b);
  const min = rates.find(x => x.rate === s[0]), max = rates.find(x => x.rate === s[s.length - 1]);
  return { code, country, blocks: s.length, min: Math.round(s[0]), median: Math.round(q(s, 0.5)), max: Math.round(s[s.length - 1]),
    spread: s[0] ? +(s[s.length - 1] / s[0]).toFixed(2) : null, minRoute: min.route, maxRoute: max.route };
}).sort((a, b) => b.spread - a.spread);
if (process.argv.includes('--json')) { process.stdout.write(JSON.stringify(rows, null, 1)); process.exit(0); }
console.log(`${rows.length} countries, ${rows.reduce((s, r) => s + r.blocks, 0)} blocks\n`);
console.log('| Code | Country | Blocks | Min €/day | Median | Max | Max/min | Lowest in | Highest in |\n|---|---|---|---|---|---|---|---|---|');
rows.forEach(r => console.log(`| ${r.code} | ${r.country} | ${r.blocks} | ${r.min} | ${r.median} | ${r.max} | ${r.spread} | ${r.minRoute} | ${r.maxRoute} |`));
