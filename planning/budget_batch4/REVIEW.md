# Phase 4 batch 4 review: Italy, San Marino & Malta part 3/3 (13 routes, 39 blocks), 2026-10-28

## (a) Totals per route (EUR per person, solo, one-way items)

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Sicily (9 days) | 9 | 990 | 260 | 0 | 0 | 0 | 260 | 1250 | 26% |
| Sicily + Aeolian Islands | 4 | 291 | 280 | 24 | 72 | 0 | 376 | 667 | 129% |
| Sicily + Malta (9 days) | 9 | 1172 | 260 | 55 | 0 | 0 | 315 | 1487 | 27% |
| Sicily + Southern Italy (12 days) | 12 | 876 | 230 | 0 | 0 | 855 | 1085 | 1961 | 124% |
| Sicily East | 5 | 365 | 280 | 0 | 0 | 182 | 462 | 827 | 127% |
| Sicily Roadtrip | 9 | 635 | 260 | 0 | 0 | 485 | 745 | 1380 | 117% |
| Sicily West | 5 | 365 | 240 | 0 | 0 | 173 | 413 | 778 | 113% |
| Tuscany (6 days) | 6 | 438 | 270 | 0 | 0 | 319 | 589 | 1027 | 134% |
| Vatican Day Visit | 1 | 91 | 0 | 0 | 0 | 0 | 0 | 91 | 0% |
| Venice + Dolomites | 5 | 401 | 170 | 0 | 0 | 207 | 377 | 778 | 94% |
| Malta (4 days) | 4 | 244 | 240 | 0 | 0 | 0 | 240 | 484 | 98% |
| Malta + Gozo (6 days) | 6 | 366 | 240 | 0 | 0 | 5 | 245 | 611 | 67% |
| San Marino Day Visit | 1 | 70 | 0 | 0 | 0 | 0 | 0 | 70 | 0% |

New fares (flights_batch4.csv, 3 WebSearches): Palermo out/back 120, Malta out 120; Venice out 90 and Catania back 140 are estimates from the opposite direction. Everything else reused (CTA, MLA, NAP, FLR, VCE).

## (b) Decisions for Youri

**Car calls**
- **Sicily (9d) and Sicily + Malta, Sicily block**: car in the daily rate (notes: ~EUR 110 / ~EUR 150 per day incl. rental + fuel): nothing added. If wrong: roughly +EUR 400-480 (9 days rental + ~560 km fuel/tolls). The Palermo-Catania one-off drop fee the Sicily notes mention (~EUR 60) is NOT added, per the brief; add it if you think the daily rate excludes it.
- **Sicily Roadtrip**: 7 rental days (pickup after the 2 Palermo days, which are ZTL city), 580 km, Palermo-Catania drop fee EUR 60 (est). Full 9 days instead: +90.
- **Sicily Southern Italy**: 11 days (not day 1 in Naples), 1190 km, car ferry Villa San Giovanni-Messina EUR 35 (est), one-way drop Naples to Palermo EUR 100 (est, highest-uncertainty item). Total car EUR 855.
- **Sicily East**: 3 days (loop starts after 2 Catania days), 250 km (190 plus Syracuse-airport return). If whole 5 days: +90. **Sicily West**: 3 days (after Palermo/Monreale), 200 km. Notes say "rental car" but give no days: my call.
- **Tuscany**: keyword guess said own_car, but the notes say fly AMS-FLR + rental car "for the whole week" and explicitly reject driving from NL: treated as rental, 6 days (whole stay per notes), 260 km. Starting at day 3 would save ~EUR 90.
- **Venice + Dolomites**: 3 rental days, 380 km (notes: ~150 km each way, so I used that rather than the 230 km straight-line estimate). Tre Cime toll road/parking (~EUR 30 in reality) not added: notes name no price.
- **Sicily + Aeolian**: no car (notes: cars not allowed on the islands May-Oct, so a rental would sit in Milazzo). Priced bus Catania airport-Milazzo each way EUR 14 and hydrofoils (Milazzo-Lipari 16, Lipari-Vulcano 6, Vulcano-Stromboli 18, Stromboli-Milazzo 28), all estimates. Return legs sit in the last block's `local`. If you want a car to Milazzo with parking instead: roughly +EUR 100.
- **Malta (4d) and Malta + Gozo**: keyword said rental but the notes never mention a car; Malta bus network assumed, nothing added (a rental would be ~EUR 30/day). Gozo ferry EUR 5 foot passenger return (est).

**Other calls**
- **Vatican and San Marino day visits: flights in/out = 0**, because both notes say explicitly these are add-on days inside a longer stay (Rome / Rimini-Riccione or Emilia-Romagna), where the flight belongs to the parent route. If these are ever shown as standalone, the flight (Rome ~EUR 210 return pair; San Marino via Rimini/Bologna with connection, ~EUR 240) is missing. San Marino bus/tower/lunch are inside the notes' own EUR 40-60 day budget, so no extras.
- **Sicily + Malta flight**: Catania-Malta EUR 55 (batch 2's typical estimate; the notes' EUR 18-35 is a promo, ferry alternative EUR 37-111). Out fare is MLA, in is CTA.
- **Stromboli mandatory guide**: not priced (notes give no price and say the guided tour is already inside the daily budget). Real price ~EUR 30-35; add as extra if the budget turns out not to cover it.
- Sicily Southern Italy out flight: Palermo (route ends Palermo/Cefalu); Catania alternative would be +20.

## (c) Data problems in the route text (not fixed)
- **Sicily + Malta**: itinerary ends in the west (Agrigento/Palermo optional) but the Malta flight is "Malta-Catania"; the car would have to go back to Catania or be dropped at Palermo/Pozzallo. Route order and flight departure point don't match. Block 0 has 7 days for 8 destinations incl. optional Palermo.
- **Sicily Aeolian**: notes say "drive to Milazzo" yet also that cars can't go to the islands; budget note says ferries and the Stromboli guide are inside the ~EUR 65-85/day, so my ferry costs may partly double-count (ground EUR 291 total, ferries EUR 120 added).
- **San Marino**: notes quote the bus as "~EUR 7 one-way" and "EUR 7 round trip"; mode keyword says rental but nothing requires a car.
- **Tuscany** notes budget "~EUR 125/day incl. rental car" while the block budgets are EUR 73/day (so the car is clearly not in the rate); last block text says "drive back to Florence and fly home, or continue self-driving back to NL" (own-car variant not priced).
- **Venice + Dolomites**: distance field (230 km) is lower than the notes' own ~150 km each way.
- **Sicily Roadtrip** "7-10 days" but blocks sum to 9 days; **Sicily East/West** "4-5 days" blocks sum to 5.
