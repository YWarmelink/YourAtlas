# Past Trips — Backfill Plan

Status: **planned, not started.** Youri's current #1 priority for this repo (2026-08-28) — everything
else on `ROADMAP.md` is secondary to this until it's done.

Pick this back up by pointing Claude Code at this file, or just say "let's continue the past trips backfill."

## Why

The site's `getStats()` numbers looked wrong during a full-site walkthrough (see `CHANGELOG.md`'s
"Fixes from a full site walkthrough" entry, 2026-08-28) — turned out to be real code bugs (now
fixed), but they also exposed a real *data* gap underneath: the `Trips` sheet only has **5 rows**
(4 planned, 1 done), while Route Builder has 440 aspirational routes. For "show people what I've
actually done" and "let them explore it themselves" to mean anything, Youri's real travel history
needs to actually be in the `Trips` sheet — right now it barely is.

Youri has visited far more countries than the 5 logged trips suggest (Map's own "52 countries
visited" badge proves it) — those trips were just never entered into the `Trips` sheet.

## Decision: lightweight entries for old trips, full detail stays for new ones

Confirmed in code (`js/pages/tripDetail.js`'s `renderItinerary()`): a trip with **zero** matching
`TripItems` rows just skips rendering the Itinerary section entirely — no error, no empty/broken
UI. So a `Trips` row can stand alone with no day-by-day breakdown at all. Decision: old/past trips
get logged at **country level only** — no `TripItems` rows, since reconstructing exact
places/days for old trips is too much work and not worth it. New trips keep getting the full
day-by-day `TripItems` treatment as before, unchanged.

**This whole plan is a data-entry task in Youri's own Google Sheet — not code.** Claude Code has
no write access to the Sheet; this file is a checklist/reference for Youri to work through
himself. Once real data exists there, ask Claude Code to verify it renders correctly (same
walkthrough method as the 2026-08-28 site audit) — that part *is* something Claude Code can help
with.

## Field checklist per old trip (`Trips` sheet columns)

| Column | What goes in it |
|---|---|
| Trip ID | unique, e.g. `PAST-2019-ITALY` |
| Trip Name | e.g. "Italy Roadtrip" |
| Type | the **travel style** (Roadtrip / Backpacking / City trip / ...) — not the status |
| Country/Region | multiple countries separated by **`+`**, e.g. "Italy + Switzerland" — not `/` (see gotcha below) |
| Continent | — |
| Duration (days) | a rough estimate is fine |
| Status | `Done` |
| Start Date / End Date | rough is fine; leave blank if genuinely unknown |
| Companions | easy to remember, nice personal touch |
| Notes | one-line highlight, optional |
| cover_image / links | optional, but worth it for the "show people" goal — a photo or album link |

**Deliberately skip** for old trips if unknown: Version, Priority, Estimated Budget — all optional,
nothing breaks with them blank.

**Quick per-trip mental checklist**: Which countries? → Roughly when (year/season)? → Roughly how
many days? → With who? → One highlight? → Got a photo/album link?

## Approach: small batches, not all at once

Youri said there are "quite a lot" of old trips. Do them in small batches (chronological, or by
continent) — a handful at a time — and check how they look on the actual site before continuing,
rather than trying to get every row perfect in one sitting. Same discipline this repo has used for
every other big content batch (see `CHANGELOG.md`'s Route Builder translation/tagging history).

## Known data gotcha to fix while already in the Sheet

The existing Vietnam trip (`SEA2024`) has two small issues worth fixing at the same time, not
urgent but cheap to batch in:
- `Type` is currently `"Done"` (should be a travel style like the table above, e.g. "Backpacking")
  — `Status` already correctly carries `"Done"`.
- `Country/Region` uses `"Vietnam / Cambodja / Thailand"` — a `/` separator and a Dutch spelling
  ("Cambodja"). Harmless right now (nothing in the code currently splits on this specific field),
  but should use `+` and the English name for consistency with everything else on the site
  (`"Vietnam + Cambodia + Thailand"`).
- Trip name itself has a typo: `"Vietrnam"` → `"Vietnam"`.

## What's next

1. **Youri**: work through old trips in small batches per the checklist above, directly in the
   Google Sheet.
2. **After each batch**: ask Claude Code to verify — reload the site, check trip cards render,
   check the homepage stats moved in the expected direction, check nothing broke. Same method as
   the 2026-08-28 walkthrough (a local static server + Playwright, since the Sheet's live CSV
   can't be fetched via `file://`).
3. Once this feels substantially done, revisit the rest of `ROADMAP.md` — this was explicitly
   called out as the priority ahead of everything else there.
