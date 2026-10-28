#!/usr/bin/env node
/**
 * R2d (ROUTE_BUILDER_BUDGET_PLAN.md, Phase 4): moves every block's ground `budget` to Youri's own
 * style (rbMyStyleDailyRate() in routeBuilderCore.js: backpacker + 40/30/20% of the step up to
 * standard) and sorts each block into one of three groups:
 *   keep    already within ±TOLERANCE of the style rate: left alone
 *   auto    a plain block: budget → style rate × days (days never change)
 *   review  something the reference rate doesn't cover may be in the rate, so Youri decides:
 *           a variant row (safari, big city, peak coast, ...), a car in the daily rate (by the
 *           route's own wording, or a costed route whose cars aren't all separate "Car: ..."
 *           extras), or a price check in the notes that names something included (tours, fees,
 *           a cruise, a car, ...), or a rate more than 2× the style rate (something's likely in it)
 * Blocks that would go UP are in "auto" (a higher budget is the safe side) but listed separately.
 * Runs on the TRUE live state (simulate_route_builder.js).
 *
 * Review calls live in planning/budget_r2d/decisions.json, one per unique block content
 * ("code|days|budget|variant", shared content repeats across routes): "ok" = style rate,
 * "keep" = leave as it is, a number = own €/day. A review row without a call stays unchanged.
 *
 * Usage: node scripts/r2d_style_budgets.js [--tolerance 0.15] [--json] [--md] [--plan]
 *   --json  every row   --md  the review list as Markdown   --plan  the changes to apply (JSON)
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2);
const TOLERANCE = argv.includes('--tolerance') ? parseFloat(argv[argv.indexOf('--tolerance') + 1]) : 0.15;
const PRICE_CHECK = /[^.]*(?:price (?:check|correction|verif)|corrected to €)[^.]*\.?/i;
const INCLUDES = /incl|cruise|tour|park|safari|\bcar\b|rental|4x4|ferry|flight|boat|guide|permit|entrance|fees?\b|trek|dive/i;

const run = cmd => JSON.parse(execSync(cmd, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 50 }).toString('utf8'));
const app = { console, localStorage: { getItem: () => null, setItem: () => {} } };
vm.createContext(app);
for (const f of ['js/data/dailyRatesReference.js', 'js/pages/routeBuilderCore.js']) {
  vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, f), 'utf8'), app, { filename: f });
}

const inv = Object.fromEntries(run('node scripts/route_cost_inventory.js').routes.map(r => [r.id, r]));
const routes = run('node scripts/simulate_route_builder.js');

// A costed route's car is fully separate once it has a "Car: ..." extra and no bare one-way drop
// fee (a drop fee alone means the rental itself is still in the daily rate, batch 1's calls).
const costs = vm.runInContext('RB_ROUTE_COSTS', (() => {
  const c = { console, localStorage: app.localStorage }; vm.createContext(c);
  for (const f of ['js/pages/routeBuilderCore.js', 'js/pages/routeBuilderContent.js']) vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, f), 'utf8'), c);
  return c;
})());
const carSeparate = new Set(Object.entries(costs).filter(([, e]) => {
  const labels = (e.blocks || []).flatMap(b => (b.extras || []).filter(x => x.category === 'transport').map(x => x.label));
  return labels.some(l => /^Car:/.test(l)) && !labels.some(l => /drop fee/i.test(l));
}).map(([id]) => id));

const rows = [];
routes.forEach(r => (r.blocks || []).forEach((b, i) => {
  const days = parseInt(b.days), budget = parseFloat(b.budget);
  if (!days || !budget) return;
  const ref = app.rbDailyRateRow(b);
  if (!ref) return;
  const rate = budget / days, style = Math.round(app.rbMyStyleDailyRate(ref));
  const diff = rate / style - 1;
  const info = inv[r.id] || {};
  const reasons = [];
  if (ref.variant) reasons.push(`variant: ${ref.variant}`);
  if (info.mode && info.mode !== 'public' && info.carInBudget === 'included') reasons.push('car in the daily rate');
  if (info.costed && info.mode && info.mode !== 'public' && !carSeparate.has(r.id)) reasons.push('car may be in the rate (costed route)');
  const check = ((b.notes || '').match(PRICE_CHECK) || [''])[0].trim();
  if (check && INCLUDES.test(check)) reasons.push('price check names inclusions');
  if (diff > 1) reasons.push('more than 2× the style rate');
  const group = Math.abs(diff) <= TOLERANCE ? 'keep' : reasons.length ? 'review' : 'auto';
  rows.push({
    routeId: r.id, route: r.name, block: i, blockId: b.id, code: b.country_code, country: b.country, days,
    budget, rate: Math.round(rate), style, newBudget: style * days, diff: Math.round(diff * 100),
    ref: { variant: ref.variant || 'base', backpacker: Math.round(ref.backpacker), standard: Math.round(ref.standard) },
    mode: info.mode, group, reasons, note: check.slice(0, 220),
  });
}));

const DECISIONS = path.join(REPO_ROOT, 'planning/budget_r2d/decisions.json');
const decisions = fs.existsSync(DECISIONS) ? JSON.parse(fs.readFileSync(DECISIONS, 'utf8')) : {};
rows.forEach(x => {
  x.key = [x.code, x.days, x.budget, x.ref.variant].join('|');
  if (x.group === 'auto') x.finalBudget = x.newBudget;
  else if (x.group === 'review') {
    const d = decisions[x.key];
    x.call = d ? d.call : null; x.why = d ? d.why : '';
    x.finalBudget = x.call === 'ok' ? x.newBudget : typeof x.call === 'number' ? x.call * x.days : x.budget;
  } else x.finalBudget = x.budget;
});

const by = g => rows.filter(x => x.group === g);
const sum = (list, k) => list.reduce((s, x) => s + x[k], 0);
const summary = {
  blocks: rows.length, keep: by('keep').length, auto: by('auto').length, review: by('review').length,
  groundNow: sum(rows, 'budget'),
  groundAfterAuto: sum(rows, 'budget') - sum(by('auto'), 'budget') + sum(by('auto'), 'newBudget'),
  groundIfAllReviewAccepted: sum(by('keep'), 'budget') + sum(by('auto'), 'newBudget') + sum(by('review'), 'newBudget'),
  groundWithDecisions: sum(rows, 'finalBudget'),
  undecided: by('review').filter(x => x.call === null).length,
  reviewReasons: by('review').flatMap(x => x.reasons.map(s => s.replace(/^variant: .*/, 'variant'))).reduce((m, s) => (m[s] = (m[s] || 0) + 1, m), {}),
};

if (argv.includes('--plan')) {
  const changes = rows.filter(x => x.finalBudget !== x.budget).map(x =>
    ({ routeId: x.routeId, block: x.block, blockId: x.blockId, code: x.code, days: x.days, from: x.budget, to: x.finalBudget }));
  process.stdout.write(JSON.stringify({ summary, changes }, null, 1)); process.exit(0);
}
if (argv.includes('--json')) { process.stdout.write(JSON.stringify({ summary, rows }, null, 1)); process.exit(0); }
if (!argv.includes('--md')) { console.log(JSON.stringify(summary, null, 1)); process.exit(0); }

const eur = n => '€' + Math.round(n).toLocaleString('en-US');
const out = [];
out.push(`# R2d review list: block budgets → Youri's style`, '',
  `Generated by \`node scripts/r2d_style_budgets.js --md\` (${new Date().toISOString().slice(0, 10)}). Style rate per day = backpacker + 40% (standard < €60) / 30% (€60-100) / 20% (> €100) of the step up to standard (\`rbMyStyleDailyRate()\`). Days never change.`, '',
  `- ${summary.blocks} blocks: **${summary.keep} keep** (within ±${TOLERANCE * 100}%), **${summary.auto} auto** (plain blocks, go to the style rate), **${summary.review} review** (below).`,
  `- Ground costs, all routes: now ${eur(summary.groundNow)} → after the auto group ${eur(summary.groundAfterAuto)} → if every review row is accepted too ${eur(summary.groundIfAllReviewAccepted)}.`,
  `- With the calls below: **${eur(summary.groundWithDecisions)}** (${Math.round((summary.groundWithDecisions / summary.groundNow - 1) * 100)}%).`,
  `- Review reasons: ${Object.entries(summary.reviewReasons).map(([k, v]) => `${k} ${v}`).join(', ')}.`, '',
  `**How to review:** one row per unique block (shared content repeats across routes, "Routes" says where). The Proposal column is Claude's first pass: \`ok\` = take the style rate, \`keep\` = leave as it is (something the reference doesn't cover is in the rate), or an own €/day. Change a call by telling Claude, or by editing \`planning/budget_r2d/decisions.json\`. "keep" rows with a car in the rate shrink later, once the standalone batches move the car into a separate extra.`, '');
const groups = {};
by('review').forEach(x => (groups[x.key] = groups[x.key] || []).push(x));
const fmtCall = x => x.call === null ? '—' : typeof x.call === 'number' ? `€${x.call}/day` : x.call;
for (const [title, test] of [['Keep (something extra is in the rate)', c => c === 'keep'], ['Own amount', c => typeof c === 'number'],
  ['OK: to the style rate', c => c === 'ok'], ['No call yet', c => c === null]]) {
  const list = Object.values(groups).filter(l => test(l[0].call));
  if (!list.length) continue;
  out.push(`## ${title} (${list.length})`, '', '| Country | Days | €/day now | → style | Ref bp / std (variant) | Proposal | Why | Routes | Note |', '|---|---|---|---|---|---|---|---|---|');
  list.forEach(l => {
    const x = l[0];
    out.push(`| ${x.country} | ${x.days} | ${x.rate} | ${x.style} | ${x.ref.backpacker} / ${x.ref.standard} (${x.ref.variant}) | **${fmtCall(x)}** | ${x.why || x.reasons.join('; ')} | ${[...new Set(l.map(y => y.route))].join(', ')} | ${x.note.replace(/\|/g, '/')} |`);
  });
  out.push('');
}
out.push('## Auto group: blocks that go UP (for reference)', '', '| Route | # | Country | Days | €/day now | → style |', '|---|---|---|---|---|---|');
by('auto').filter(x => x.diff < 0).sort((a, b) => a.diff - b.diff).forEach(x => out.push(`| ${x.route} | ${x.block} | ${x.country} | ${x.days} | ${x.rate} | ${x.style} |`));
out.push('');
out.push('## Auto group, per country (for reference, no call needed)', '', '| Country | Blocks | Avg €/day now | Style €/day | Ground now | After |', '|---|---|---|---|---|---|');
const auto = by('auto'), codes = [...new Set(auto.map(x => x.code))].sort();
codes.forEach(c => {
  const l = auto.filter(x => x.code === c), d = sum(l, 'days');
  out.push(`| ${l[0].country} (${c}) | ${l.length} | ${Math.round(sum(l, 'budget') / d)} | ${Math.round(sum(l, 'newBudget') / d)} | ${eur(sum(l, 'budget'))} | ${eur(sum(l, 'newBudget'))} |`);
});
console.log(out.join('\n'));
