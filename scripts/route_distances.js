#!/usr/bin/env node
/**
 * Driving-distance estimate per route for the full-cost backfill (ROUTE_BUILDER_BUDGET_PLAN.md,
 * Phase 4): the fallback for car routes whose notes don't give a km figure. Walks the destinations
 * in route order (a block without destinations uses its own anchor coordinate), sums the
 * great-circle distances and multiplies by a road factor (roads are ~1.3x the straight line in
 * Europe — the usual circuity figure). Also gives the legs from and back to NL, for own-car routes.
 *
 * Rough by design: no ferries/detours, and multi-day loops from one base are undercounted. A km
 * figure in the route's own notes always wins over this.
 *
 * Usage:
 *   node scripts/route_distances.js                  # every route, JSON
 *   node scripts/route_distances.js "<route name>"   # routes whose name contains the text
 */

const { execSync } = require('child_process');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const ROAD_FACTOR = 1.3;
const HOME = { name: 'Utrecht (NL)', lat: 52.0907, lng: 5.1214 };  // central NL as the home point

function km(a, b) {
  const R = 6371, rad = d => d * Math.PI / 180;
  const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const hasCoord = p => typeof p.lat === 'number' && typeof p.lng === 'number';

function routeStops(route) {
  return (route.blocks || []).flatMap(b => {
    const dests = (b.destinations || []).filter(hasCoord);
    if (dests.length) return dests.map(d => ({ name: d.name, lat: d.lat, lng: d.lng, code: b.country_code }));
    return hasCoord(b) ? [{ name: b.country, lat: b.lat, lng: b.lng, code: b.country_code }] : [];
  });
}

function main() {
  const filter = (process.argv[2] || '').toLowerCase();
  const routes = JSON.parse(execSync('node scripts/simulate_route_builder.js',
    { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 50 }).toString('utf8'));

  const out = routes.filter(r => !filter || r.name.toLowerCase().includes(filter)).map(r => {
    const stops = routeStops(r);
    let inRoute = 0;
    const perCountry = {};
    for (let i = 1; i < stops.length; i++) {
      const d = km(stops[i - 1], stops[i]) * ROAD_FACTOR;
      inRoute += d;
      perCountry[stops[i].code] = (perCountry[stops[i].code] || 0) + d;  // credited to the arrival country
    }
    const round = n => Math.round(n / 10) * 10;
    return {
      id: r.id, name: r.name, stops: stops.length,
      km_in_route: round(inRoute),
      km_from_nl: stops.length ? round(km(HOME, stops[0]) * ROAD_FACTOR) : null,
      km_back_to_nl: stops.length ? round(km(stops[stops.length - 1], HOME) * ROAD_FACTOR) : null,
      km_by_country: Object.fromEntries(Object.entries(perCountry).map(([c, v]) => [c, round(v)])),
    };
  });
  process.stdout.write(JSON.stringify(out, null, 1));
}

main();
