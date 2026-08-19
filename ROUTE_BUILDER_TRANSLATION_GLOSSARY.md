# Route Builder Translation Glossary

This is a reusable Dutch→English glossary extracted from the actual diffs of the first
7 completed batches of the Route Builder Dutch-to-English translation project
(`js/pages/routeBuilder.js`, commits `21cc230`, `8840167`, `413a075`, `494562e`,
`633d1bd`, `f915791`, `ccd816c`). Every entry below is a translation actually used in
those diffs, not a general-knowledge guess.

**When to use it:** consult this file before translating a new batch, instead of
re-deriving the same recurring Dutch phrases/vocabulary from scratch. **Add newly
discovered recurring terms as you go** — if you translate a phrase that shows up in
more than one route/country and isn't listed here yet, add it so the next batch
benefits too.

Note: this glossary intentionally excludes one-off content — country/place renames
(e.g. Zuid-Afrika→South Africa) and route-specific sentences aren't reusable
vocabulary and aren't tracked here.

---

## 1. Structural / dated note markers

These are recurring section-header-style phrases that open a sentence inside a
`notes` field, almost always followed by a `(20XX-XX)` date. Keep the date suffix
exactly as-is; only translate the label itself.

| Dutch | English | Notes |
|---|---|---|
| Tijdscontrole (20XX-XX) | Time check (20XX-XX) | Used when day-counts per country were revised after a realism check. |
| Vervolg (20XX-XX) | Follow-up (20XX-XX) | Usually follows a "Time check" note, e.g. budgets rescaled after days changed. |
| Wijziging (20XX-XX) | Change (20XX-XX) | Generic "something was changed" marker. |
| Toevoeging (20XX-XX) | Addition (20XX-XX) | A country/leg was added. |
| Update (20XX-XX) | Update (20XX-XX) | Same word in both languages — kept unchanged. |
| Herzien (20XX-XX) | Revised (20XX-XX) | Used at the start of a country/region note describing a rework. |
| Omgedraaid (naar ...) (20XX-XX) | Reversed (to ...) (20XX-XX) | Country/region order reversed. |
| Prijscheck (20XX-XX) | Price check (20XX-XX) | Single-country/leg price verification, usually with a before→after correction. |
| Prijscorrectie (20XX-XX) | Price correction (20XX-XX) | Same idea as Prijscheck, used interchangeably across batches. |
| Prijzen/visum/reisadvies-verificatie (20XX-XX) | Prices/visa/travel-advisory verification (20XX-XX) *(also seen as "Price/visa/travel advisory verification")* | Route-level, whole-route verification pass across all countries. |
| Routelogica-check (20XX-XX) | Route-logic check (20XX-XX) | Small, per-leg distance/logic fix. |
| Routelogica-herziening (20XX-XX) / Grote routelogica-herziening (20XX-XX) | Route-logic revision (20XX-XX) / Major route-logic overhaul (20XX-XX) | Whole-route reordering pass; both "revision" and "overhaul" are used, pick either consistently within one note. |
| Routelogica-fix (20XX-XX, search-bevestigd) | Route-logic fix (20XX-XX, search-confirmed) | Per-country fix inside `transport_to_next`/`notes`. |
| search-bevestigd | search-confirmed | Standalone qualifier, often trailing a route-logic marker. |
| Instap: | Entry: | Opens a country's `notes` describing how to fly/travel in from the Netherlands, e.g. "Instap: vlucht Amsterdam-X ... Prijsindicatie webonderzoek 20XX-XX, momentopname." |
| Losgesplitst van X | Split off from X | Opens the `notes` of a split-route explaining its parent expedition. |
| Visum: | Visa: | Introduces visa/e-visa details for a country. |
| Reisadvies: | Travel advisory: | Introduces the Dutch government travel-advisory color/status for a country or region. |
| ⚠️ Reisadvies (20XX-XX, nog actueel): | ⚠️ Travel advisory (20XX-XX, still current): | Variant with a currency qualifier. |
| Prijsindicatie webonderzoek 20XX-XX, momentopname. | Price indication from 20XX-XX web research, a snapshot. | Recurring trailing sentence after an "Entry:" flight-cost estimate. |
| Dit is een momentopname (20XX-XX) | This is a snapshot (20XX-XX) | Standalone qualifier meaning "check again closer to departure." |
| Prijs geverifieerd (20XX-XX), klopt. | Price verified (20XX-XX), holds up. | Used when a price check confirmed the existing budget was already accurate. |
| Bewust beperkt tot X | Deliberately limited to X | E.g. a country's destination list intentionally trimmed. |
| bewust geschrapt | deliberately cut | A country/destination removed on purpose (not an oversight). |

## 2. Common transport / logistics vocabulary (`transport_to_next` fields)

| Dutch | English |
|---|---|
| vlucht | flight |
| trein | train |
| bus | bus |
| veerboot | ferry |
| auto / huurauto | car / rental car |
| grensovergang | border crossing |
| over land / overland | overland |
| aankomst | arrival |
| vertrek | departure |
| deeltaxi | shared taxi |
| dagtrip / dagtour(s) | day trip / day tour(s) |
| retour | return (as in "€300-450 retour" → "€300-450 return") |
| rivier | River (in place names, e.g. "Kinabatangan-rivier" → "Kinabatangan River") |
| kloof | Gorge (e.g. "Taroko-kloof" → "Taroko Gorge") |
| eiland(en) | Island(s) |
| meer | Lake |

## 3. Common descriptive words (climate/travel-style/description fields)

| Dutch | English |
|---|---|
| regenseizoen | rainy season |
| droog seizoen / droge seizoen / droogseizoen | dry season |
| hoogseizoen | high season |
| moesson | monsoon |
| regentijd (korte regentijd) | rains (short rains) |
| begin (+ month) | early (+ month) |
| eind (+ month) | late (+ month) |
| medio / half (+ month) | mid- (+ month) |

## 4. Safety / advisory phrasing

| Dutch | English |
|---|---|
| Reisadvies | Travel advisory |
| reis niet naar / niet reizen (reisadvies-kleurcode) | do not travel (travel-advisory color) |
| rood / oranje / geel / groen (reisadvies) | red / orange / yellow / green (travel advisory) |
| ⚠️ BELANGRIJKE REISADVIES-BEVINDING | ⚠️ IMPORTANT TRAVEL ADVISORY FINDING |

## 5. Month names (written out as free text, not date-coded)

| Dutch | English |
|---|---|
| januari | January |
| februari | February |
| maart | March |
| april | April |
| mei | May |
| juni | June |
| juli | July |
| augustus | August |
| september | September |
| oktober | October |
| november | November |
| december | December |

Month-range notation keeps the en-dash: e.g. "April–juni" → "April–June", "Februari–maart" → "February–March".

---

*Extracted from batches 1–7 (2026-08-18/19). Update this file as later batches surface new recurring terms — do not let it go stale.*
