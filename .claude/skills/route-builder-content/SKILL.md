---
name: route-builder-content
description: Use when building a new Expedition route, or updating/correcting an existing one's countries, budgets, seasons, or notes, in YourAtlas's Route Builder (route-builder.html / js/pages/routeBuilder.js).
---

## Overview

Route Builder's expeditions live as either:
- `RB_EXPEDITION_CONTENT` (in `js/pages/routeBuilder.js`) — flat content object, used when no country repeats across legs
- a dedicated `rbBuildXRoute()` function — used once a country appears more than once across separate legs (e.g. Canada/US six times), a shape `RB_EXPEDITION_CONTENT` can't hold

## The one rule that matters: migrations

Every route seeds into `localStorage` once, gated by its own flag, on first load. Editing `RB_EXPEDITION_CONTENT` or a `rbBuildXRoute()` function only affects browsers that haven't seeded that route yet.

**Any change to an existing route — new/removed country, corrected day count, corrected budget, reordered legs, renamed route — needs both:**
1. The source-of-truth edit (the content object or build function)
2. A one-time `rbMigrateX()` function (see the existing ones in `routeBuilder.js` for the pattern) that applies the same change to already-seeded data

Write the migration even if you're not sure the route has seeded anywhere yet — assume it has. A migration that finds nothing to fix is a no-op; skipping one that was needed silently strands the fix in source only (this exact bug happened once — see the README's "critical migration fix" entry).

**Never blindly overwrite a whole route in a migration** unless the change is a deliberate wholesale content replacement (like the Mediterranean Civilizations Expedition swap-in) — normally patch only the specific fields that changed, so any hand-edits made in the browser survive.

## Verifying real-world data

When adding a route or correcting an existing one's costs/practicalities, research — don't guess:
- Per-country daily cost, calibrated to Youri's own travel style (between Budget and Comfort Backpacker, not the bare-minimum floor)
- Visa requirements for a Dutch passport
- Current Dutch government travel advisory (nederlandwereldwijd.nl) — flag anything orange/red directly in that country's block `notes`, dated, and note it may already be stale by the time it's read
- Anything a flat day-rate misses (mandatory guided tours, permits, inter-island flights) — call these out as separate `notes`, don't fold them silently into the daily rate

## Structure conventions

- Country blocks: country, days, budget, notes, "Transport to next"
- Regional Blocks group a contiguous run of legs — only holds together while contiguous; moving one country out of the middle splits the region into two
- Destinations: free-form places/notes per block, separate from the country-level note
- Route-level fields: Status, Travel Style, Best Starting Month, Description, Climate Summary, notes

## After a change

- Update the route's own `notes`/`climate_summary` if the change affects them
- Add a short entry to the README's "Recently fixed" (or "Needs attention next time" if left open) — factual: what changed, old vs new totals, what was verified vs what's still assumed
