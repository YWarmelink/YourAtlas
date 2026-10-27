#!/usr/bin/env node
/**
 * Inventory for the full-cost backfill (ROUTE_BUILDER_BUDGET_PLAN.md, Phase 4): per route, how it
 * is travelled and what the existing text already says about costs, so each batch (and the
 * reference tables it relies on) starts from facts instead of rereading 450 routes.
 *
 * Runs on the TRUE live state (simulate_route_builder.js's fresh-browser replay) and prints JSON:
 *   routes[]: id, name, days, blocks (code/country/days), mode ('own_car' | 'rental' | 'public'),
 *             entry / exit text (first block's "Entry:" sentence / last block's transport_to_next),
 *             carInBudget ('included' | 'excluded' | 'unknown', from the route's own wording, with
 *             the matching snippet), costed (already in RB_ROUTE_COSTS)
 *   carCountries: country codes appearing in own_car / rental routes, with route counts
 * The classification is a keyword heuristic — a starting point for a batch, never the answer.
 *
 * Usage: node scripts/route_cost_inventory.js > inventory.json
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');

const OWN_CAR = /own car|your own car|drive (down )?from (the )?netherlands|by car from (the )?netherlands|driving from (the )?netherlands/i;
const RENTAL = /rental car|rent(ed|ing)? a car|car rental|hire car|car hire|campervan|motorhome|4x4 rental|self-drive/i;
const INCLUDED = /(?:(?:budget|daily rate|per day|\/day)[^.¶]{0,80}(?:incl\w*|including)[^.¶]{0,40}(?:car|fuel|petrol|rental))|(?:(?:car|fuel|petrol|rental)[^.¶]{0,60}(?:included|in the daily|in the budget))/i;
const EXCLUDED = /(?:car|fuel|petrol|rental|toll)[^.¶]{0,60}(?:not included|not in the (?:daily )?budget|excluded|on top|separate cost)/i;

function snippet(text, re) {
  const m = re.exec(text);
  return m ? text.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60).replace(/\s+/g, ' ') : '';
}

function main() {
  const routes = JSON.parse(execSync('node scripts/simulate_route_builder.js',
    { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 50 }).toString('utf8'));
  const sandbox = { console, localStorage: { getItem: () => null, setItem: () => {} } };
  vm.createContext(sandbox);
  for (const f of ['js/pages/routeBuilderCore.js', 'js/pages/routeBuilderContent.js']) {
    vm.runInContext(fs.readFileSync(path.join(REPO_ROOT, f), 'utf8'), sandbox, { filename: f });
  }
  const costed = new Set(Object.keys(vm.runInContext('RB_ROUTE_COSTS', sandbox)));

  const carCountries = {};
  const out = routes.map(r => {
    const blocks = r.blocks || [];
    const text = [r.travel_style, r.description, r.notes, ...blocks.flatMap(b => [b.notes, b.transport_to_next])]
      .filter(Boolean).join(' ¶ ');
    const mode = OWN_CAR.test(text) ? 'own_car' : RENTAL.test(text) ? 'rental' : 'public';
    const first = (blocks[0] || {}).notes || '';
    const entry = (first.match(/Entry:[^¶]*?(?:\.\s|$)/) || [''])[0] || snippet(first, /flight|own car|train|ferry/i);
    const last = blocks[blocks.length - 1] || {};
    let carInBudget = 'n/a', carEvidence = '';
    if (mode !== 'public') {
      if (INCLUDED.test(text)) { carInBudget = 'included'; carEvidence = snippet(text, INCLUDED); }
      else if (EXCLUDED.test(text)) { carInBudget = 'excluded'; carEvidence = snippet(text, EXCLUDED); }
      else carInBudget = 'unknown';
      new Set(blocks.map(b => b.country_code)).forEach(c => { carCountries[c] = (carCountries[c] || 0) + 1; });
    }
    return {
      id: r.id, name: r.name, days: blocks.reduce((s, b) => s + (parseInt(b.days) || 0), 0),
      blocks: blocks.map(b => `${b.country_code}:${b.days}d`).join(' '),
      mode, entry: entry.trim().slice(0, 300), exit: (last.transport_to_next || '').slice(0, 300),
      carInBudget, carEvidence, costed: costed.has(r.id),
    };
  });

  const summary = {
    routes: out.length,
    byMode: out.reduce((m, r) => (m[r.mode] = (m[r.mode] || 0) + 1, m), {}),
    carInBudget: out.reduce((m, r) => (m[r.carInBudget] = (m[r.carInBudget] || 0) + 1, m), {}),
    costed: out.filter(r => r.costed).length,
  };
  const sortedCar = Object.fromEntries(Object.entries(carCountries).sort((a, b) => b[1] - a[1]));
  process.stdout.write(JSON.stringify({ summary, carCountries: sortedCar, routes: out }, null, 1));
}

main();
