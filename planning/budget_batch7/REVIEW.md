# Phase 4 batch 7 review: France & Benelux 1/2 (14 routes), 2026-10-28

Own-car drives NL<->route sit in `flight_in_cost`/`flight_out_cost` (fuel at 0.07 L/km x ~EUR 2.2/l blended + French tolls), so the "there & back" column is mostly petrol/tolls for car routes.

## (a) Totals (EUR p.p., solo, car not split)

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Ardennes (3d) | 3 | 264 | 82 | 0 | 0 | 64 | 146 | 410 | 55% |
| Belgian Coast + Bruges + Ghent (4d) | 4 | 324 | 80 | 0 | 25 | 0 | 105 | 429 | 32% |
| Belgium Bruges/Ghent/Antwerp/Ardennes (5d) | 5 | 393 | 83 | 0 | 20 | 198 | 301 | 694 | 77% |
| Alpine Roadtrip (14d) | 14 | 1123 | 413 | 0 | 0 | 226 | 639 | 1762 | 57% |
| Alsace (4d) | 4 | 288 | 180 | 0 | 0 | 46 | 226 | 514 | 78% |
| Brittany (5d) | 5 | 360 | 317 | 0 | 0 | 65 | 382 | 742 | 106% |
| Corsica + Sardinia Loop (12d) | 12 | 870 | 340 | 40 | 0 | 721 | 1101 | 1971 | 127% |
| Corsica + South of France (9d) | 9 | 732 | 310 | 45 | 10 | 395 | 760 | 1492 | 104% |
| Corsica Roadtrip Full Loop (9d) | 9 | 1305 | 430 | 0 | 0 | 0 | 430 | 1735 | 33% |
| Corsica South Loop (6d) | 6 | 840 | 400 | 0 | 0 | 0 | 400 | 1240 | 48% |
| France Paris to Cote d'Azur (12d) | 12 | 864 | 413 | 0 | 0 | 265 | 678 | 1542 | 78% |
| French + Spanish Pyrenees (9d) | 9 | 604 | 300 | 0 | 0 | 550 | 850 | 1454 | 141% |
| French Alps + Provence (9d) | 9 | 648 | 544 | 0 | 0 | 69 | 613 | 1261 | 95% |
| French Alps Ecrins (6d) | 6 | 432 | 502 | 0 | 0 | 6 | 508 | 940 | 118% |

## (b) Decisions for Youri

**Own car (car not in the daily rate, so a "Car:" extra on the first block, fuel + tolls only, no rental):**
- Ardennes, Alsace, Brittany, Paris-Nice, Alps+Provence, Ecrins, Alpine Roadtrip: all own car from NL, drive both ways. In-route km from input (straight line x 1.3); NL legs use input km_from_nl / km_back_to_nl.
- Tolls: Alsace 0 (notes: toll-free); Brittany ~30 each way (notes 25-35); Ecrins ~90 each way (notes 80-100); Alps+Provence ~200 total (notes 180-220); Ardennes/Belgium 0.
- Paris-Nice: notes say A6/A7/A8 EUR 150-180 one way; I used ~100 (class-1 car tolls for ~930 km at EUR 9/100 km motorway, plus margin). If the notes are right: +~EUR 60.
- Alpine Roadtrip: CH vignette 43.28 once, AT 10-day vignette + Arlberg + Brenner, SI 7-day vignette. Not priced (notes give no price): Zermatt/Tasch parking and shuttle, Dolomite lift passes, Slovenia Vrsic. If Zermatt is picked, add ~EUR 40-60.

**Rental / mixed:**
- Belgium 5d (Antwerp+Ardennes): route text says train for the cities, car for the Ardennes, drive back to NL. Modelled as train in (EUR 40), 2 rental days x EUR 50 from Antwerp + ~190 km fuel + EUR 60 one-way drop in NL (est). If he simply takes his own car instead: extras fall to ~EUR 40, total ~EUR 200 cheaper.
- Corsica + Sardinia: two separate rentals (Corsica 6d, Sardinia 6d) joined by a foot ferry (EUR 40, same as batch 2). Corsica 300 km (my estimate; input 200 km is straight-line x1.3 and low for winding roads), Sardinia 400 km + EUR 60 one-way drop.
- Corsica + South of France: Nice-Bastia overnight ferry foot passenger EUR 45 (sources EUR 23-48 typical, up to 87); 6 rental days in Corsica from Bastia, one-way drop at Figari EUR 60 (est), fly out Figari.
- Pyrenees: 9 rental days x EUR 48 from Toulouse, ~610 km (Toulouse-Lourdes 160, loop 120, Torla-Toulouse via Somport 330), tolls ~EUR 30, returned at Toulouse so no drop fee. If he ends in Zaragoza there's a one-way fee (not priced).
- Corsica Roadtrip 9d and Corsica South Loop 6d: `carInDailyRate` is true, so nothing added for the car.

**Flights:**
- New fares in `flights_batch7.csv`: NCE out 110, BIA out 220, AJA back 210 (3 web searches) and FSC back 200 (copy of the FSC out row, est). Reused from the CSV: TLS out/back 150, FSC out 200, CAG back 120.
- Corsican fares are all low confidence (floors EUR 140-200, connecting): +/- EUR 50 per direction.
- Belgian coast: train both ways, EUR 40 each (est, not searched).

**Extras taken from notes:** Han-sur-Lesse EUR 41.50 (rounded to 42), Strasbourg clock 3, cathedral tower 8, Haut-Koenigsbourg 10, Brittany boat trip 20 (midpoint of 15-25, optional), MAS Antwerp 12 (optional). Coo/Plopsaland cable car: no price in the notes, not added.

## (c) Data problems in the route text (not fixed)
- **Alpine Roadtrip 14d**: travel_style says own car throughout, but the last block says "fly home from Ljubljana". Modelled as driving home (1180 km); flying home would strand the car.
- **Paris to Cote d'Azur 12d**: "own car from NL to Paris" but the last block says "drop the rental off in Nice and fly back". Modelled as own car both ways (back drive Nice-NL fuel ~191 + tolls ~105). The text is internally inconsistent (own car vs rental).
- **Paris-Nice tolls**: notes give "EUR 150-180 one way, EUR 250-300 total incl. NL-Paris", which looks high against real tolls.
- **Corsica Sardinia loop / Corsica loops**: input km_in_route (200 km Corsica) is too low for a full-island loop; the "9-day full loop" shows 460 km, also low.
- **Belgium 5d**: mode guessed "public", but the route's text needs a car and ends "drive back to the Netherlands".
- **Belgian coast 4d**: "Car or train" in the route text, modelled as train.
- **Corsica + South of France**: end airport undecided in text ("Bastia/Figari/Ajaccio"); I assumed Figari.
