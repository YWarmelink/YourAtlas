#!/usr/bin/env node
/**
 * Route Builder data-quality audit (Step 1 of QUALITY_CHECK_PLAN.md).
 *
 * Builds the fresh-browser route state exactly like simulate_route_builder.js, loads the live Sheet
 * via dataService.getGrandTripsFull() like push_route_costs_to_sheet.js, runs the checks A1-D1 from
 * the plan and writes planning/quality/REPORT.md (summary) + planning/quality/findings.json (every
 * finding, the input for Step 2). Read-only: it never writes to the Sheet.
 *
 *   node scripts/quality_audit.js            # code + live Sheet
 *   node scripts/quality_audit.js --no-sheet # code only (skips D1)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const REPO_ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(REPO_ROOT, 'planning', 'quality');
const TODAY = new Date().toISOString().slice(0, 10);
const NOW_YM = TODAY.slice(0, 7);
const read = f => fs.readFileSync(path.join(REPO_ROOT, f), 'utf8');

// ---------- load the app ----------
function makeLocalStorage() {
  const store = new Map();
  return { getItem: k => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)),
           removeItem: k => store.delete(k), clear: () => store.clear() };
}

function loadApp() {
  const sandbox = { console, fetch, URLSearchParams, Date, Math, JSON, localStorage: makeLocalStorage() };
  vm.createContext(sandbox);
  for (const file of ['js/config/users.js', 'js/data/csvParser.js', 'js/utils/helpers.js', 'js/data/dataService.js',
                      'js/data/dailyRatesReference.js', 'js/pages/routeBuilderCore.js', 'js/pages/routeBuilderContent.js']) {
    vm.runInContext(read(file), sandbox, { filename: file });
  }
  vm.runInContext('rbRoutes = rbLoad(); rbLibrary = rbLoadLibrary();', sandbox);
  const re = /^\s*(rb(?:Seed|Migrate)[A-Za-z0-9]+)\(\);\s*$/gm;
  for (const m of read('js/pages/routeBuilder.js').matchAll(re)) vm.runInContext(`${m[1]}();`, sandbox);
  return sandbox;
}

// ---------- helpers ----------
const findings = [];
const add = (check, severity, route, blockIndex, message, data = {}) =>
  findings.push({ check, severity, route_id: route ? route.id : null, route: route ? route.name : null,
                  block: blockIndex, message, ...data });
const num = v => (v === '' || v === null || v === undefined || isNaN(Number(v)) ? null : Number(v));
const blockLabel = (b, i) => `#${i} ${b.country_code}`;
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september',
                'october', 'november', 'december'];

// Every text field a viewer reads: block notes/transport and destination notes, plus route-level text.
function textFields(route) {
  const out = [];
  ['description', 'notes', 'travel_style', 'climate_summary'].forEach(f => route[f] && out.push({ where: f, block: null, text: route[f] }));
  (route.blocks || []).forEach((b, i) => {
    if (b.notes) out.push({ where: 'notes', block: i, text: b.notes });
    if (b.transport_to_next) out.push({ where: 'transport_to_next', block: i, text: b.transport_to_next });
    (b.destinations || []).forEach(d => d && d.notes && out.push({ where: `destination "${d.name}"`, block: i, text: d.notes }));
  });
  return out;
}

// ---------- checks ----------
function checkEndings(routes) {
  for (const r of routes) {
    const blocks = r.blocks || [];
    blocks.forEach((b, i) => {
      const t = b.transport_to_next || '';
      const last = i === blocks.length - 1;
      if (!last && /end of (this|the) route/i.test(t) && !/continu/i.test(t)) {
        add('A1', 'high', r, i, `${blockLabel(b, i)} says "end of this route" but ${blocks.length - 1 - i} block(s) follow`, { text: t });
      }
      if (last && t && !/end of (this|the) (route|trip|expedition|road ?trip|day)|endpoint of this|return flight|fly home|flight home|back home|drive home|home from/i.test(t)) {
        add('A1', 'medium', r, i, `last block's transport doesn't end the route`, { text: t });
      }
      if (last && !t) add('A1', 'low', r, i, 'last block has no transport_to_next (how do you get home?)');
    });
  }
}

function checkStructure(routes) {
  for (const r of routes) {
    if (!(r.blocks || []).length) { add('A2', 'high', r, null, 'route has no blocks'); continue; }
    r.blocks.forEach((b, i) => {
      if (!(num(b.days) > 0)) add('A2', 'high', r, i, `${blockLabel(b, i)} has days = ${b.days}`);
      if (num(b.budget) === null) add('A2', 'high', r, i, `${blockLabel(b, i)} has no budget`);
      if (!(b.destinations || []).length) add('A2', 'medium', r, i, `${blockLabel(b, i)} has no destinations`);
      (b.destinations || []).forEach(d => {
        if (d && (num(d.lat) === null || num(d.lng) === null)) add('A2', 'medium', r, i, `${blockLabel(b, i)} destination "${d.name}" has no coordinates`);
      });
      if (num(b.lat) === null || num(b.lng) === null) add('A2', 'medium', r, i, `${blockLabel(b, i)} has no map anchor (lat/lng)`);
    });
  }
}

function checkDailyBudgets(app, routes) {
  const dec = JSON.parse(read('planning/budget_r2d/decisions.json'));
  const keepPrefixes = Object.entries(dec).filter(([, v]) => v.call !== 'ok').map(([k, v]) => [k.split('|').slice(0, 3).join('|') + '|', v]);
  for (const r of routes) {
    (r.blocks || []).forEach((b, i) => {
      const days = num(b.days), budget = num(b.budget);
      if (!days || budget === null) return;
      const row = app.rbDailyRateRow(b);
      if (!row) { add('B1', 'medium', r, i, `${blockLabel(b, i)}: no reference daily rate for ${b.country_code}`); return; }
      const rate = budget / days;
      const keep = keepPrefixes.find(([p]) => p === `${b.country_code}|${days}|${budget}|`);
      const low = rate < 0.8 * row.backpacker, high = rate > 1.5 * row.standard;
      if (!low && !high) return;
      const msg = `${blockLabel(b, i)}: €${Math.round(rate)}/day vs backpacker €${Math.round(row.backpacker)} / standard €${Math.round(row.standard)}` +
                  (row.variant ? ` (${row.variant})` : '');
      if (keep) add('B1', 'info', r, i, `${msg} — R2d kept it: ${keep[1].why}`, { rate, ref: row });
      else add('B1', 'medium', r, i, `${msg} — ${low ? 'below 0.8× backpacker' : 'above 1.5× standard'}`, { rate, ref: row });
    });
  }
}

function checkCostCompleteness(app, routes) {
  for (const r of routes) {
    const c = app.rbRouteCosts(r, 'mine');
    if (c.incompleteBlocks) add('B2', 'high', r, null, `${c.incompleteBlocks} block(s) with incomplete cost fields`);
    if (c.staleTransport) add('B2', 'medium', r, null, `${c.staleTransport} transport cost(s) stale (next block's country changed)`);
    if (num(r.flight_in_cost) === null) add('B2', 'high', r, null, 'no flight_in_cost');
    if (num(r.flight_out_cost) === null) add('B2', 'high', r, null, 'no flight_out_cost');
  }
}

function checkFareOutliers(routes) {
  for (const r of routes) {
    const fin = num(r.flight_in_cost), fout = num(r.flight_out_cost);
    [['in', fin], ['out', fout]].forEach(([d, v]) => {
      if (v === null || v === 0) return;  // 0 = overland/own car start, deliberate
      // Short Benelux/Rhineland trips carry train/fuel costs in the flight fields, not fares.
      const nearHome = (r.blocks || []).every(b => ['NL', 'BE', 'LU', 'DE', 'FR'].includes(b.country_code));
      if (v < 60) add('B3', nearHome ? 'info' : 'medium', r, null, `flight ${d} €${v} is suspiciously cheap${nearHome ? ' (near-home route: train/fuel, likely fine)' : ''}`);
      if (v > 2000) add('B3', 'medium', r, null, `flight ${d} €${v} is very expensive`);
    });
    if (fin && fout && Math.max(fin, fout) / Math.min(fin, fout) > 2) {
      add('B3', 'low', r, null, `flight in €${fin} vs out €${fout} differ more than 2× (open jaw? check)`);
    }
  }
}

function parseVisaFile() {
  const rows = {};
  for (const line of read('VISA_VACCINATION_RESEARCH.md').split(/\r?\n/)) {
    const m = line.match(/^\|\s*([A-Z]{2})\s*\|\s*([^|]*)\|/);
    if (m && m[1] !== 'country_code') rows[m[1]] = m[2].trim();
  }
  return rows;
}

function checkVisas(routes) {
  const visa = parseVisaFile();
  // R2d "keep" blocks whose reason says the visa is already inside the daily rate
  const keepVisa = new Set(Object.entries(JSON.parse(read('planning/budget_r2d/decisions.json')))
    .filter(([, v]) => v.call !== 'ok' && /visa/i.test(v.why)).map(([k]) => k.split('|').slice(0, 3).join('|')));
  const byCountry = {};
  for (const r of routes) {
    const seen = {};
    (r.blocks || []).forEach((b, i) => {
      const v = (b.extras || []).filter(x => x.category === 'visa');
      seen[b.country_code] = seen[b.country_code] || { first: i, cost: 0, has: false };
      v.forEach(x => { seen[b.country_code].cost += num(x.cost) || 0; seen[b.country_code].has = true; });
    });
    for (const [cc, s] of Object.entries(seen)) {
      if (s.has) (byCountry[cc] = byCountry[cc] || []).push({ route: r, cost: s.cost });
      const req = (visa[cc] || '').toLowerCase();
      const needsPaid = req && /e-visa|visa required|visa on arrival|eta|esta|evisa|tourist card/.test(req) && !/^visa-free/.test(req) && !/\bfree\b/.test(req);
      if (needsPaid && !s.has) {
        const b = r.blocks[s.first];
        const inRate = /visa/i.test((b.extras || []).map(x => x.label).join(' ')) || /visa[^.]{0,40}(in the|included)/i.test(b.notes || '') ||
          keepVisa.has(`${cc}|${b.days}|${b.budget}`);
        add('B4', inRate ? 'info' : 'medium', r, s.first, `${cc}: visa file says "${visa[cc].slice(0, 70)}" but the route has no visa extra`);
      }
    }
  }
  for (const [cc, list] of Object.entries(byCountry)) {
    const costs = [...new Set(list.map(x => Math.round(x.cost)))].sort((a, b) => a - b);
    if (costs.length > 1 && costs[costs.length - 1] - costs[0] > 10) {
      add('B4', 'medium', null, null, `${cc}: visa priced differently across ${list.length} routes: €${costs.join(' / €')}`,
          { country: cc, routes: list.map(x => `${x.route.name} €${x.cost}`) });
    }
  }
  return visa;
}

// Flight cost lines in RB_ROUTE_COSTS whose comment marks the fare as an estimate.
function checkEstimatedFares(routes) {
  const src = read('js/pages/routeBuilderContent.js');
  const start = src.indexOf('const RB_ROUTE_COSTS = {');
  const body = src.slice(start, src.indexOf('\n};', start));
  const byId = Object.fromEntries(routes.map(r => [r.id, r]));
  let id = null, total = 0;
  const list = [];
  for (const line of body.split(/\r?\n/)) {
    const m = line.match(/^\s{2}'([^']+)': \{/);
    if (m) { id = m[1]; continue; }
    const f = line.match(/(flight_in_cost|flight_out_cost):\s*(\d+),?\s*(\/\/.*)?$/);
    if (!f || !id) continue;
    const comment = (f[3] || '').toLowerCase();
    const est = /\best\b|estimate|low confidence|\blow\b|guess|rough/.test(comment) || !comment;
    if (!est) continue;
    const route = byId[id];
    // the live value can differ from RB_ROUTE_COSTS when the Sheet/route already had a value
    const live = route ? num(route[f[1]]) : null;
    if (live !== Number(f[2])) continue;
    total += live;
    list.push({ route, field: f[1], cost: live, comment: (f[3] || '').replace(/^\/\/\s*/, '') });
  }
  list.sort((a, b) => b.cost - a.cost);
  list.forEach(x => add('B5', 'info', x.route, null, `${x.field} €${x.cost} is an estimate: ${x.comment.slice(0, 110)}`, { cost: x.cost, field: x.field }));

  const csv = read('data/cost_reference/flights_from_ams.csv').split(/\r?\n/).filter(Boolean);
  const head = csv[0].split(',');
  const ci = head.indexOf('confidence');
  const conf = {};
  csv.slice(1).forEach(l => { const c = (l.match(/,(high|medium|low),/) || [])[1] || l.split(',')[ci]; conf[c] = (conf[c] || 0) + 1; });
  return { estimatedTotal: total, estimatedCount: list.length, csvConfidence: conf };
}

function checkNoteDailyRates(app, routes) {
  for (const r of routes) {
    (r.blocks || []).forEach((b, i) => {
      const days = num(b.days), budget = num(b.budget);
      if (!days || budget === null || !b.notes) return;
      // skip per-day park/entrance fees ("Hwange NP entrance ~€22/day"), they aren't a daily budget
      const hits = [...b.notes.matchAll(/€\s?(\d{2,4})(?:\s?(?:\/|per)\s?day)/gi)]
        .filter(m => !/(entrance|fee|park|permit|ticket|pass|NP)\W{0,3}~?$/i.test(b.notes.slice(Math.max(0, m.index - 25), m.index)))
        .map(m => Number(m[1]));
      if (!hits.length) return;
      const quoted = hits[hits.length - 1];  // the last one is the correction ("€158→€175/day")
      const rate = budget / days;
      if (Math.abs(quoted - rate) / rate <= 0.25) return;
      const row = app.rbDailyRateRow(b);
      // R2d moved budgets to "My plan" (rbMyStyleDailyRate); a note quoting a higher, older rate is then expected
      // (any variant of the country counts: "peak coast" Croatia is priced at that variant's My plan rate)
      const variants = vm.runInContext(`RB_DAILY_RATES[${JSON.stringify(b.country_code)}] || []`, app);
      const preR2d = row && (Math.abs(quoted - row.standard) / row.standard <= 0.25 ||
                             (quoted > rate && variants.some(v => Math.abs(rate - app.rbMyStyleDailyRate(v)) / app.rbMyStyleDailyRate(v) <= 0.25)));
      add('C1', preR2d ? 'low' : 'medium', r, i,
          `${blockLabel(b, i)}: notes say €${quoted}/day, budget is €${Math.round(rate)}/day` +
          (preR2d ? ' (the note quotes an older, higher level; budgets moved to "My plan" in R2d)' : ''),
          { quoted, rate: Math.round(rate), preR2d });
    });
  }
}

function checkStaleDates(routes) {
  const kw = /\b(until|through|suspended|closed|closure|state of emergency|temporar\w*|reopen\w*|expected|planned|scheduled|will (?:open|close|start|end|resume|change|rise|increase)|from now|as of|currently|strike|protest|unrest|curfew|outbreak|road ?works?|renovation)\b/i;
  const dateRe = new RegExp(`\\b(?:(?:early|mid|late|end of|end|beginning of)[- ])?(${MONTHS.join('|')}|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\\.?\\s+(20\\d\\d)\\b|\\b(20\\d\\d)-(\\d\\d)\\b`, 'gi');
  for (const r of routes) {
    for (const t of textFields(r)) {
      for (const sentence of t.text.split(/(?<=[.!?])\s+(?=[A-Z⚠])/)) {
        if (!kw.test(sentence)) continue;
        const dates = [...sentence.matchAll(dateRe)].map(m => {
          if (m[3]) return `${m[3]}-${m[4]}`;
          const mi = MONTHS.findIndex(x => x.startsWith(m[1].toLowerCase().slice(0, 3)));
          return `${m[2]}-${String(mi + 1).padStart(2, '0')}`;
        });
        if (!dates.length) continue;
        const latest = dates.sort().pop();
        // Research snapshots ("price indication from 2026-08", "Route-logic check (2026-08...") are dated on purpose.
        if (/price (indication|correction|verified)|web research|route-logic (check|fix)|snapshot|search-confirmed|verified \(/i.test(sentence) && !/until|suspended|closed|emergency|temporar|reopen|strike|curfew/i.test(sentence)) continue;
        if (latest >= NOW_YM) continue;
        // Internal edit-history notes are dated on purpose.
        if (/^(⚠️\s*)?(Time check|Built \(|Update \(|Note \(|Route-logic|Verified|Five smaller fixes|Translated)/i.test(sentence.trim())) continue;
        // medium = looks forward in time (so may no longer hold); low = a dated fact that is probably still true
        add('C2', /until|expir|is running|reopening|will |expected|scheduled|planned to|currently|still (?:only )?(?:closed|partial)|remains? closed|closed indefinitely|state of emergency|no confirmed/i.test(sentence) ? 'medium' : 'low',
            r, t.block, `${t.where}: dated ${latest}, now past`, { text: sentence.trim(), field: t.where });
      }
    }
  }
}

// Known false positives: real place names (Grote Knip, Kleine Scheidegg) and Augustus (the emperor).
function dutchHits(out) {
  let route = null, real = 0;
  for (const line of out.split(/\r?\n/)) {
    const h = line.match(/^=== (.+) ===$/);
    if (h) { route = h[1]; continue; }
    const m = line.match(/^\s+(\S+) \[([^\]]+)\]: (.*)$/);
    if (!m || /^(grote|kleine|augustus)$/i.test(m[2])) continue;
    real++;
    add('C3', 'medium', { id: null, name: route }, null, `${m[1]}: Dutch word "${m[2]}"`, { text: m[3].slice(0, 300) });
  }
  if (!real) add('C3', 'info', null, null, 'Dutch-text scan: no real hits (only known place-name false positives)');
  return real;
}

function checkDutch(simPath) {
  try {
    // exit code 1 just means "hits found"; the script prints emoji, so force UTF-8 on Windows
    return dutchHits(execFileSync(process.platform === 'win32' ? 'python' : 'python3',
      [path.join(REPO_ROOT, 'scripts', 'find_dutch_in_live_content.py'), simPath, '--detail'],
      { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } }));
  } catch (e) {
    if (e.stdout) return dutchHits(e.stdout);
    add('C3', 'low', null, null, `Dutch-text scan failed to run: ${String(e.message).slice(0, 120)}`);
    return [];
  }
}

async function checkSheetParity(app, routes) {
  const live = await vm.runInContext('dataService.getGrandTripsFull()', app);
  const byId = Object.fromEntries(live.map(r => [r.id, r]));
  const codeIds = new Set(routes.map(r => r.id));
  const counts = {};
  const bump = k => (counts[k] = (counts[k] || 0) + 1);
  const norm = v => (v === undefined || v === null ? '' : String(v)).replace(/\r\n/g, '\n').trim();
  const same = (a, b) => (num(a) !== null && num(b) !== null ? Math.abs(num(a) - num(b)) < 0.01 : norm(a) === norm(b));
  for (const r of routes) {
    const s = byId[r.id];
    if (!s) { add('D1', 'high', r, null, 'route exists in code but not in the Sheet'); bump('missing in Sheet'); continue; }
    if (norm(s.name) !== norm(r.name)) { add('D1', 'medium', r, null, `name differs: Sheet "${s.name}"`); bump('name'); }
    ['flight_in_cost', 'flight_out_cost'].forEach(f => {
      if (!same(s[f], r[f])) { add('D1', 'medium', r, null, `${f}: code ${r[f]} vs Sheet ${s[f]}`); bump(f); }
    });
    const cb = r.blocks || [], sb = s.blocks || [];
    const codeSeq = cb.map(b => `${b.country_code}${b.days}`).join(' '), sheetSeq = sb.map(b => `${b.country_code}${b.days}`).join(' ');
    if (codeSeq !== sheetSeq) { add('D1', 'high', r, null, `blocks differ: code [${codeSeq}] vs Sheet [${sheetSeq}]`); bump('block sequence'); continue; }
    cb.forEach((b, i) => {
      const x = sb[i];
      const fields = ['budget', 'transport_to_next', 'notes', 'local_transport_cost', 'transport_cost'];
      fields.forEach(f => {
        if (!same(b[f], x[f]) && norm(b[f]).replace(/^"/, '') === norm(x[f]).replace(/^"/, '')) {
          add('D1', 'low', r, i, `${blockLabel(b, i)} ${f}: the Sheet dropped the leading quote (CSV round trip)`); bump(`${f} (leading quote)`); return;
        }
        if (!same(b[f], x[f])) { add('D1', f === 'budget' ? 'high' : 'medium', r, i, `${blockLabel(b, i)} ${f} differs`, { code: norm(b[f]).slice(0, 160), sheet: norm(x[f]).slice(0, 160) }); bump(f); }
      });
      const ex = a => JSON.stringify((a || []).map(e => [e.category, num(e.cost), !!e.optional]));
      if (ex(b.extras) !== ex(x.extras)) { add('D1', 'medium', r, i, `${blockLabel(b, i)} extras differ`); bump('extras'); }
      if ((b.destinations || []).length !== (x.destinations || []).length) { add('D1', 'medium', r, i, `${blockLabel(b, i)} destination count differs`); bump('destinations'); }
    });
  }
  live.filter(s => !codeIds.has(s.id)).forEach(s => { add('D1', 'info', s, null, 'route exists only in the Sheet (hand-made or removed from code)'); bump('only in Sheet'); });
  return { sheetRoutes: live.length, counts };
}

// ---------- report ----------
function writeReport(meta) {
  const sev = ['high', 'medium', 'low', 'info'];
  const checks = ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'D1'];
  const names = { A1: 'Route endings', A2: 'Structure', B1: 'Daily budget vs reference', B2: 'Cost completeness',
                  B3: 'Fare outliers', B4: 'Visa consistency', B5: 'Estimated fares (to verify)', C1: '€/day in notes vs budget',
                  C2: 'Stale dated statements', C3: 'Leftover Dutch text', D1: 'Sheet vs code parity' };
  let md = `# Quality audit — ${TODAY}\n\nGenerated by \`node scripts/quality_audit.js\` (Step 1 of \`QUALITY_CHECK_PLAN.md\`). ` +
           `${meta.routes} routes / ${meta.blocks} blocks in the code${meta.sheet ? `, ${meta.sheet.sheetRoutes} in the live Sheet` : ' (Sheet skipped)'}. ` +
           `Every finding is in \`findings.json\`.\n\n## Summary\n\n| Check | | high | medium | low | info |\n|---|---|---|---|---|---|\n`;
  for (const c of checks) {
    const f = findings.filter(x => x.check === c);
    md += `| ${c} | ${names[c]} | ${sev.map(s => f.filter(x => x.severity === s).length || '').join(' | ')} |\n`;
  }
  md += `\nEstimated fares still in use: ${meta.fares.estimatedCount} flight legs, €${meta.fares.estimatedTotal.toLocaleString('en')} in total. ` +
        `flights_from_ams.csv confidence: ${Object.entries(meta.fares.csvConfidence).map(([k, v]) => `${k} ${v}`).join(', ')}.\n`;
  if (meta.sheet) md += `\nSheet parity, differences per field: ${Object.entries(meta.sheet.counts).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}.\n`;
  for (const c of checks) {
    const f = findings.filter(x => x.check === c).sort((a, b) => sev.indexOf(a.severity) - sev.indexOf(b.severity));
    if (!f.length) continue;
    md += `\n## ${c} — ${names[c]} (${f.length})\n\n`;
    const limit = c === 'B5' ? 40 : 60;
    f.slice(0, limit).forEach(x => {
      md += `- **${x.severity}** ${x.route ? `${x.route}: ` : ''}${x.message}` +
            (x.text ? `\n  > ${x.text.replace(/\n/g, ' ').slice(0, 240)}` : '') +
            (x.code !== undefined ? `\n  code: \`${x.code}\` / Sheet: \`${x.sheet}\`` : '') + '\n';
    });
    if (f.length > limit) md += `- … ${f.length - limit} more in findings.json\n`;
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'REPORT.md'), md);
  fs.writeFileSync(path.join(OUT_DIR, 'findings.json'), JSON.stringify({ date: TODAY, meta, findings }, null, 1));
}

async function main() {
  const app = loadApp();
  const routes = JSON.parse(JSON.stringify(vm.runInContext('rbRoutes', app)));
  const simPath = path.join(OUT_DIR, 'live_routes.tmp.json');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(simPath, JSON.stringify(routes, null, 2));

  checkEndings(routes);
  checkStructure(routes);
  checkDailyBudgets(app, routes);
  checkCostCompleteness(app, routes);
  checkFareOutliers(routes);
  checkVisas(routes);
  const fares = checkEstimatedFares(routes);
  checkNoteDailyRates(app, routes);
  checkStaleDates(routes);
  checkDutch(simPath);
  fs.unlinkSync(simPath);
  const sheet = process.argv.includes('--no-sheet') ? null : await checkSheetParity(app, routes);

  const meta = { routes: routes.length, blocks: routes.reduce((s, r) => s + (r.blocks || []).length, 0), fares, sheet };
  writeReport(meta);
  const tally = {};
  findings.forEach(f => { const k = `${f.check} ${f.severity}`; tally[k] = (tally[k] || 0) + 1; });
  console.log(`${findings.length} findings → planning/quality/REPORT.md`);
  console.log(Object.entries(tally).map(([k, v]) => `${k}: ${v}`).join('\n'));
}

main().catch(e => { console.error(e); process.exit(1); });
