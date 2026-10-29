#!/usr/bin/env node
/**
 * Step 2e (QUALITY_CHECK_PLAN.md): folds the web-verified daily rates from
 * planning/quality/step2e/result_N.json into data/cost_reference/daily_rates_by_country.csv.
 * Only rows with verdict "adjusted", or "confirmed" + "replace": true, change; their three levels and
 * all four parts per level are overwritten, and source/confidence say "Step 2e web check 2026-10".
 * "confirmed" rows only get their levels_confidence/source upgraded; "unclear" rows are left alone.
 * Dry run by default (prints old → new totals); --write saves the CSV. Afterwards run
 * build_daily_rates_reference.js and r2d_style_budgets.js --md to see which budgets move.
 *
 * Usage: node scripts/merge_step2e_rates.js [--write]
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const CSV = path.join(REPO_ROOT, 'data/cost_reference/daily_rates_by_country.csv');
const DIR = path.join(REPO_ROOT, 'planning/quality/step2e');
const write = process.argv.includes('--write');

const parse = line => {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; continue; }
    if (ch === ',' && !q) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
};
const esc = v => /[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);

const lines = fs.readFileSync(CSV, 'utf8').trim().split(/\r?\n/);
const header = parse(lines[0]);
// Some rows have unquoted commas in the last column (levels_notes): fold the overflow back into it.
// Untouched rows are written back verbatim (raw line), so only changed rows get re-serialized.
const rows = lines.slice(1).map(l => {
  const v = parse(l); const o = { _raw: l };
  header.forEach((k, i) => o[k] = v[i] ?? '');
  if (v.length > header.length) o[header[header.length - 1]] = v.slice(header.length - 1).join(',');
  return o;
});

const PARTS = {
  standard: ['standard_eur_per_day', 'accommodation', 'food', 'local_transport', 'activities'],
  backpacker: ['backpacker_eur_per_day', 'bp_accommodation', 'bp_food', 'bp_local_transport', 'bp_activities'],
  comfort: ['comfort_eur_per_day', 'cf_accommodation', 'cf_food', 'cf_local_transport', 'cf_activities'],
};
const KEYS = ['total', 'accommodation', 'food', 'local_transport', 'activities'];

const results = fs.readdirSync(DIR).filter(f => /^result_\d+\.json$/.test(f)).sort()
  .flatMap(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')).map(r => ({ ...r, file: f })));

const counts = { adjusted: 0, confirmed: 0, unclear: 0, missing: 0, problems: 0 };
for (const r of results) {
  const row = rows.find(x => x.country_code === r.code && x.variant === (r.variant || ''));
  if (!row) { console.log(`MISSING ${r.code}/${r.variant} (${r.file})`); counts.missing++; continue; }
  counts[r.verdict] = (counts[r.verdict] || 0) + 1;
  if (r.verdict === 'unclear') continue;
  row._changed = true;
  const replace = r.verdict === 'adjusted' || r.replace === true;
  if (replace) {
    const bad = Object.keys(PARTS).filter(lv => {
      const x = r[lv];
      return !x || KEYS.some(k => typeof x[k] !== 'number') || x.total !== x.accommodation + x.food + x.local_transport + x.activities;
    });
    if (bad.length || !(r.backpacker.total < r.standard.total && r.standard.total < r.comfort.total)) {
      console.log(`SKIP ${r.code}/${r.variant}: bad levels (${bad.join(',') || 'order'})`); counts.problems++; continue;
    }
    const old = Object.keys(PARTS).map(lv => row[PARTS[lv][0]]).join('/');
    for (const lv of Object.keys(PARTS)) PARTS[lv].forEach((col, i) => { row[col] = r[lv][KEYS[i]]; });
    console.log(`${r.code}${r.variant ? '/' + r.variant.split(' ')[0] : ''}: std/bp/cf ${old} → ${Object.keys(PARTS).map(lv => r[lv].total).join('/')}`);
    row.source = 'Step 2e web check 2026-10';
  }
  row.levels_source = 'Step 2e web check 2026-10: ' + (r.sources || []).slice(0, 3).join(' ');
  row.levels_confidence = r.confidence || 'medium';
  if (replace) row.confidence = r.confidence || 'medium';
  if (r.note) row.levels_notes = r.note;
}
console.log(counts);
if (write) {
  fs.writeFileSync(CSV, [header.join(','), ...rows.map(o => o._changed ? header.map(k => esc(o[k])).join(',') : o._raw)].join('\n') + '\n');
  console.log('CSV written.');
}
