#!/usr/bin/env node
/**
 * Simulates a brand-new browser loading Route Builder from scratch: runs the exact same
 * rbSeed*()/rbMigrate*() call sequence as routeBuilder.js's DOMContentLoaded handler (extracted
 * automatically, see extractCallSequence below, so it can't drift out of sync), against a plain
 * in-memory localStorage shim.
 *
 * Why this exists: grepping the JS source for Dutch words (find_dutch_text.py) also matches code
 * comments, migration `oldName:` matching keys, and old data tables that a LATER migration
 * overwrites before anything reaches the UI (see CHANGELOG.md/DRAFT_ROUTE_VERIFICATION_PLAN.md
 * for the Hawaii/Florida case this was built to catch, and the Eurasia region-notes case found
 * while investigating that). None of that is a real bug - it's dead-in-practice leftover source.
 * The only thing that actually matters is what a fresh browser ends up with in `rbRoutes` after
 * every seed and migration has run, in the app's real order. This script produces exactly that
 * final state as JSON, so find_dutch_text.py (or any other check) can be run against the TRUE
 * live content instead of the raw source file.
 *
 * Usage:
 *     node scripts/simulate_route_builder.js > /tmp/live_routes.json
 *     node scripts/simulate_route_builder.js --pretty > /tmp/live_routes.json   # human-readable
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO_ROOT = path.join(__dirname, '..');
const CORE = path.join(REPO_ROOT, 'js', 'pages', 'routeBuilderCore.js');
const CONTENT = path.join(REPO_ROOT, 'js', 'pages', 'routeBuilderContent.js');
const ORCHESTRATION = path.join(REPO_ROOT, 'js', 'pages', 'routeBuilder.js');

// In-memory localStorage shim - same interface, no persistence across runs (matches a brand-new
// browser with an empty profile, which is exactly the scenario worth checking).
function makeLocalStorage() {
  const store = new Map();
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
  };
}

// Pulls the exact ordered rbSeed*()/rbMigrate*() call sequence straight out of routeBuilder.js's
// DOMContentLoaded handler, so this harness can never silently drift out of sync with the app's
// real init order if a new seed/migration gets added later.
function extractCallSequence(orchestrationSrc) {
  const calls = [];
  const re = /^\s*(rb(?:Seed|Migrate)[A-Za-z0-9]+)\(\);\s*$/gm;
  let m;
  while ((m = re.exec(orchestrationSrc))) calls.push(m[1]);
  if (calls.length === 0) {
    throw new Error('No rbSeed*/rbMigrate* calls found - did routeBuilder.js structure change?');
  }
  return calls;
}

function main() {
  const coreSrc = fs.readFileSync(CORE, 'utf8');
  const contentSrc = fs.readFileSync(CONTENT, 'utf8');
  const orchestrationSrc = fs.readFileSync(ORCHESTRATION, 'utf8');
  const callSequence = extractCallSequence(orchestrationSrc);

  const sandbox = {
    localStorage: makeLocalStorage(),
    console,
    Date,
    Math,
    JSON,
  };
  vm.createContext(sandbox);

  vm.runInContext(coreSrc, sandbox, { filename: 'routeBuilderCore.js' });
  vm.runInContext(contentSrc, sandbox, { filename: 'routeBuilderContent.js' });

  // Mirror routeBuilder.js's own init: rbRoutes = rbLoad() (empty on a fresh browser), then run
  // every seed/migration in the exact extracted order.
  vm.runInContext('rbRoutes = rbLoad(); rbLibrary = rbLoadLibrary();', sandbox);
  for (const call of callSequence) {
    try {
      vm.runInContext(`${call}();`, sandbox, { filename: `call:${call}` });
    } catch (err) {
      console.error(`Error running ${call}(): ${err.message}`);
      process.exit(1);
    }
  }

  const finalRoutes = vm.runInContext('rbRoutes', sandbox);
  const pretty = process.argv.includes('--pretty');
  process.stdout.write(JSON.stringify(finalRoutes, null, pretty ? 2 : 0));
}

main();
