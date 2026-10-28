---
name: route-builder-content
description: Use when building a new Expedition route, or updating/correcting an existing one's countries, budgets, seasons, or notes, in YourAtlas's Route Builder (route-builder.html / js/pages/routeBuilderContent.js).
---

## Before you start

Route Builder's content lives in `routeBuilderContent.js` (800KB+/9,000+ lines — never `Read` it
whole; grep for the target route's name or `rbBuild*Route`/`rbMigrate*` function, then read only
that range). It's one of 4 files (`routeBuilderCore.js`, `routeBuilderContent.js`,
`routeBuilderUI.js`, `routeBuilder.js`) — content work only ever needs `routeBuilderContent.js`;
the orchestration/migration-call-order lives in the small `routeBuilder.js`.

## Overview

Route Builder's expeditions live as either:
- `RB_EXPEDITION_CONTENT` (in `js/pages/routeBuilderContent.js`) — flat content object, used when no country repeats across legs
- a dedicated `rbBuildXRoute()` function — used once a country appears more than once across separate legs (e.g. Canada/US six times), a shape `RB_EXPEDITION_CONTENT` can't hold

## The one rule that matters: migrations

Every route seeds into `localStorage` once, gated by its own flag, on first load. Editing `RB_EXPEDITION_CONTENT` or a `rbBuildXRoute()` function only affects browsers that haven't seeded that route yet.

**Any change to an existing route — new/removed country, corrected day count, corrected budget, reordered legs, renamed route — needs both:**
1. The source-of-truth edit (the content object or build function)
2. A one-time `rbMigrateX()` function (see the existing ones in `routeBuilderContent.js` for the pattern), wired into the init call sequence in `routeBuilder.js`, that applies the same change to already-seeded data

Write the migration even if you're not sure the route has seeded anywhere yet — assume it has. A migration that finds nothing to fix is a no-op; skipping one that was needed silently strands the fix in source only (this exact bug happened once — see the README's "critical migration fix" entry).

**Never blindly overwrite a whole route in a migration** unless the change is a deliberate wholesale content replacement (like the Mediterranean Civilizations Expedition swap-in) — normally patch only the specific fields that changed, so any hand-edits made in the browser survive.

## Verifying real-world data

When adding a route or correcting an existing one's costs/practicalities, research — don't guess:
- Per-country daily cost, calibrated to Youri's own travel style (between Budget and Comfort Backpacker, not the bare-minimum floor). This is the **"My plan"** level stored in `budget`; never store a Backpacker/Standard/Comfort figure there, the app computes those (see CLAUDE.md's "Route Builder cost model")
- Visa requirements for a Dutch passport
- Current Dutch government travel advisory (nederlandwereldwijd.nl) — flag anything orange/red directly in that country's block `notes`, dated, and note it may already be stale by the time it's read
- Anything a flat day-rate misses (transport between and within countries, flights from NL, mandatory guided tours, permits, visas, a rental car): store it in the **structured cost fields**, not only in `notes`, and don't fold it into the daily rate (see "Storing costs" below)

## Storing costs

Ask the `route-price-checker` agent for the numbers; its report is laid out for this.
- `budget` = My plan daily rate × days. Changing `days` later means scaling `budget` with it.
- Everything else goes in an `RB_ROUTE_COSTS` entry in `routeBuilderContent.js`, keyed by route id,
  one entry per block in route order with its `code` (`transport`, `local`, `extras` via
  `rbExtra(label, cost, category, optional)`), plus `flight_in_cost`/`flight_out_cost` and `checked`.
  `rbMigrateApplyRouteCosts()` picks up a new route id by itself (no new flag) and fills only
  empty fields. Prose in `notes` may still explain a cost, but the number must be in a field.
- Then `node scripts/push_route_costs_to_sheet.js` (dry run) and, **only with Youri's OK**, `--push`.
  The Sheet is what a browser loads; a cost that's only in the source never shows up.
- A country new to Route Builder (no row in `data/cost_reference/daily_rates_by_country.csv`) gets
  a row there too (the agent reports it), then `node scripts/build_daily_rates_reference.js`.
  Without it the reference tiers fall back to a rough multiplier of the plan.
- A new fare from Amsterdam goes into `data/cost_reference/flights_from_ams.csv`.
- After the push, check the route's cost panel: My plan should say "✓ All costs estimated".

## Structure conventions

- Country blocks: country, days, budget, notes, "Transport to next", plus the cost fields above (`transport_cost`, `transport_cost_to`, `local_transport_cost`, `extras`, `costs_checked`)
- Regional Blocks group a contiguous run of legs — only holds together while contiguous; moving one country out of the middle splits the region into two
- Destinations: free-form places/notes per block, separate from the country-level note
- Route-level fields: Status, Travel Style, Best Starting Month, Description, Climate Summary, notes

## After a change

- Update the route's own `notes`/`climate_summary` if the change affects them
- Add a short entry to the README's "Recently fixed" (or "Needs attention next time" if left open) — factual: what changed, old vs new totals, what was verified vs what's still assumed
