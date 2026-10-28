# Phase 4 batch 3 review: Italy, San Marino & Malta part 2/3 (12 routes, 41 blocks)

Extracted 2026-10-28. Per person, solo, one-way fares, 2026 euros. Optional extras are not counted in the totals.

## (a) Totals per route

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
|---|---|---|---|---|---|---|---|---|---|
| northern-italy-6-days | 6 | 438 | 200 | 0 | 0 | 282 | 482 | 920 | 110% |
| northern-italy-roadtrip-9-days | 11 | 803 | 180 | 0 | 0 | 460 | 640 | 1443 | 80% |
| puglia-6-days | 6 | 438 | 200 | 0 | 0 | 272 | 472 | 910 | 108% |
| rome-4-days | 4 | 292 | 210 | 0 | 0 | 0 | 210 | 502 | 72% |
| rome-tuscany-9-days | 9 | 819 | 210 | 0 | 45 | 401 | 656 | 1475 | 80% |
| rome-vatican-city-in-depth-4-days | 4 | 364 | 210 | 0 | 0 | 75 | 285 | 649 | 78% |
| san-marino-emilia-romagna-4-days | 4 | 289 | 240 | 0 | 0 | 184.5 | 424.5 | 713.5 | 147% |
| san-marino-tuscany-5-days | 5 | 362 | 250 | 0 | 0 | 368 | 618 | 980 | 171% |
| sardinia-9-days | 9 | 657 | 260 | 0 | 0 | 483 | 743 | 1400 | 113% |
| sardinia-north-4-5-days | 5 | 376 | 260 | 16 | 0 | 297 | 573 | 949 | 152% |
| sardinia-roadtrip-7-10-days | 9 | 642 | 260 | 16 | 0 | 496 | 772 | 1414 | 120% |
| sardinia-south-4-5-days | 5 | 349 | 250 | 0 | 0 | 151 | 401 | 750 | 115% |

## (b) Decisions for Youri

Car rates used (Italy): rental €45/day, fuel 0.141 €/km, tolls 0.048 €/km, so 0.189 €/km on toll roads. No route states that the car is in the daily rate (Northern Italy 6 days says rental is "on top"), so every car route has one Car extra on its first driving block.

| Route | Rental days | km | Call | If wrong |
|---|---|---|---|---|
| Northern Italy 6d | 5 | 300 | Car from after the Milan day; loop ends in Milan. Mode says own_car but the notes recommend flying + local rental, so priced as rental. | Own car from NL instead: about 2,100 km round trip of fuel+tolls, similar to flight plus rental. |
| Northern Italy Roadtrip | 6 | 690 | Car from Como, dropped at Venice (Verona-Venice drive assumed, not train). One-way drop €60 (est). | Train Verona-Venice: about -€45 rental, +€15 train. |
| Puglia 6d | 5 | 250 | Car after the Bari day. Puglia roads are mostly toll-free, so tolls slightly high (about €10). | Negligible. |
| Rome 4d | 0 | 0 | City trip, no car (notes). | None. |
| Rome + Tuscany | 6 | 430 | Car picked up after Rome, dropped Florence, drop fee €50 (est). Flying home from FCO, so Florence-Rome train + Leonardo Express as €45 `local` on the last block. | Flying home from Florence instead: fare 130 vs 100, no train, -€15 net, no extra fare row. |
| Rome + Vatican | 0 | 0 | No car. Notes give "€60-90 for the three extras together" (Scavi, Museums, dome); midpoint €75 as one tour extra, Gardens (€32-40) optional €36. | If €60-90 excludes the Museums ticket, add about €17-22. |
| San Marino + Emilia-Romagna | 3 | 170 | Car after the Bologna day; parking €6 (midpoint of €4.50-8) and towers €12.50 as extras. | Small. |
| San Marino + Tuscany | 5 | 230 | Bologna pickup, Florence drop, one-way drop €100 (notes €50-150). Open-jaw flights BLQ in, FLR out. | Drop fee ±€50. |
| Sardinia 9d | 9 | 550 | Whole trip, no tolls added (Sardinia has almost no motorway). | August rental can be €70+/day: +€225. |
| Sardinia North | 5 | 120 | Straight-line 50 km is too low for Olbia-Palau-Costa Smeralda, used 120 (est). Palau-La Maddalena foot ferry €8 each way (Ferryscanner), boat trip €55 (est, notes name no price). | Boat trip ±€15. |
| Sardinia Roadtrip | 7 | 470 | Cagliari 2 days without car; one-way drop Cagliari→Olbia €60 (est). Ferry and boat trip as in North. | Open-jaw out of Cagliari: no drop fee, -€60. |
| Sardinia South | 3 | 110 | Car after the Cagliari days, 110 km est (Nora, Chia). | Full 5 days: +€90. |

Other judgment calls:
- Flights: new fares in `flights_batch3.csv` (5 web searches + a ferry search). Low-confidence ones: CAG (mostly connecting, June-Oct seasonal), BRI out, OLB out (reuse of the back fare), BLQ back / CAG back (estimated from the out fare).
- Sardinia routes fly the seasonal Olbia/Cagliari routes (April-October/July-October per notes); fares off-season will differ.
- Rental €45/day is the reference-file rate; high-season Sardinia and Lake Como run higher.

## (c) Data problems in the route text (not fixed)

- Northern Italy Roadtrip (9 days): the blocks add up to 11 days (2+1+2+1+2+3), not 9. Notes also mention a "(10-day version)" and Venice "2-3 days".
- Northern Italy 6 days: mode guessed own_car, but the notes advise flying and renting; no price for the lake ferries is given.
- Sardinia North/Roadtrip: block 2 "boat trip" gives no price; the transport text "boat crossing" does not say whether the car crosses (assumed foot ferry, car parked at Palau).
- San Marino + Tuscany: block 0 is country SM with a 1-day stay but its notes describe Bologna/Emilia-Romagna content; the Bologna day has no block of its own.
- Rome + Vatican: "the three extras together" is ambiguous (which three).
- Sardinia North/Roadtrip: transport text mentions a "Sicily/Sardinia short trips batch" in Sardinia South notes (stale reference).
