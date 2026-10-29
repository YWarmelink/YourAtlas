#!/usr/bin/env node
/**
 * Step 2b (QUALITY_CHECK_PLAN.md): applies one batch of web-verified fares
 * (planning/quality/step2b/result_N.json) to the code and the fare reference.
 *  - Every route use whose verified fare differs >15% from its current cost becomes a row in
 *    RB_QUALITY_2B_FARES (routeBuilderContent.js, between the step2b markers); "unverified" legs are skipped.
 *  - data/cost_reference/flights_from_ams.csv: the airport+direction row is updated (or appended) with the
 *    verified fare, unless the existing row already has a higher confidence.
 * Dry run by default; --write saves both files. Then: simulate, `fix_route_texts_in_sheet.js fares --push`.
 *
 * Usage: node scripts/apply_step2b_fares.js <N> [--write]
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const N = process.argv[2];
const write = process.argv.includes('--write');
const DIR = path.join(REPO_ROOT, 'planning/quality/step2b');
const CONTENT = path.join(REPO_ROOT, 'js/pages/routeBuilderContent.js');
const CSV = path.join(REPO_ROOT, 'data/cost_reference/flights_from_ams.csv');
const RANK = { unverified: 0, low: 1, medium: 2, high: 3 };

const input = JSON.parse(fs.readFileSync(path.join(DIR, `input_${N}.json`), 'utf8'));
const result = JSON.parse(fs.readFileSync(path.join(DIR, `result_${N}.json`), 'utf8'));

// --- route corrections ---
let src = fs.readFileSync(CONTENT, 'utf8');
const END = '  // step2b:end';
const rows = [];
let before = 0, after = 0;
for (const r of result) {
  const leg = input.find(l => l.id === r.id);
  if (!leg) { console.log(`?? ${r.id} not in input`); continue; }
  for (const u of leg.uses) {
    before += u.cost;
    const verified = r.confidence === 'unverified' ? u.cost : ((r.by_month || {})[u.travel_month] || r.eur_one_way);
    after += Math.abs(verified - u.cost) / u.cost > 0.15 ? verified : u.cost;
    if (r.confidence === 'unverified' || Math.abs(verified - u.cost) / u.cost <= 0.15) continue;
    const line = `  [${JSON.stringify(u.route_id)}, '${u.field}', ${u.cost}, ${verified}],  // ${r.leg} (${r.confidence}, 2b-${N})`;
    if (src.includes(`[${JSON.stringify(u.route_id)}, '${u.field}', ${u.cost},`)) continue;
    rows.push(line);
    console.log(`${u.route}: ${u.field} €${u.cost} → €${verified}  (${r.leg}, ${r.confidence})`);
  }
}
console.log(`\n${rows.length} correction(s); batch total €${before} → €${after} (${after - before >= 0 ? '+' : ''}${after - before})`);

// --- flights_from_ams.csv ---
const lines = fs.readFileSync(CSV, 'utf8').replace(/\r/g, '').trim().split('\n');
const header = lines[0].split(',');
const esc = v => /[",]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
const conf = l => { const m = l.match(/,(high|medium|low),/); return m ? m[1] : 'low'; };
let csvChanged = 0;
for (const r of result) {
  if (r.confidence === 'unverified' || !r.airport_code) continue;
  const i = lines.findIndex((l, k) => k > 0 && l.startsWith(`${r.airport_code},`) && l.split(',')[3] === r.direction);
  if (i > 0 && RANK[conf(lines[i])] > RANK[r.confidence]) continue;
  const old = i > 0 ? lines[i].split(',') : [];
  const city = old[1] || r.leg.replace(/AMS-|-AMS/g, '').split(/[ (]/)[0];
  const row = [r.airport_code, city, old[2] || '', r.direction, r.eur_one_way, r.routing || '',
    'Step 2b web check: ' + (r.sources || []).slice(0, 2).join(' '), '2026-10-29', r.confidence, r.note || ''];
  if (i > 0) lines[i] = row.map(esc).join(','); else lines.push(row.map(esc).join(','));
  csvChanged++;
}
console.log(`flights_from_ams.csv: ${csvChanged} row(s) updated/added`);

if (write) {
  if (rows.length) src = src.replace(END, rows.join('\n') + '\n' + END);
  fs.writeFileSync(CONTENT, src);
  fs.writeFileSync(CSV, lines.join('\n') + '\n');
  console.log('written.');
}
