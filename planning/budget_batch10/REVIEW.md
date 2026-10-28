# Phase 4 batch 10 — Alps & Germany 2/2 (checked 2026-10-28)

## (a) Totals per route (EUR p.p., solo, one-way costs)
| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Zurich + Lucerne + Surroundings | 5 | 650 | 280 | 0 | 60 | 125 | 465 | 1115 | 72% |
| Bavaria + Alps + Berchtesgaden | 6 | 432 | 276 | 0 | 0 | 177 | 453 | 885 | 105% |
| Bavaria: Munich + Alps | 5 | 360 | 255 | 0 | 0 | 112 | 367 | 727 | 102% |
| Berlin | 4 | 288 | 120 | 0 | 0 | 24 | 144 | 432 | 50% |
| Black Forest | 6 | 432 | 183 | 0 | 0 | 52 | 235 | 667 | 54% |
| Cologne + Bonn + Rhine | 4 | 288 | 91 | 0 | 0 | 31 | 122 | 410 | 42% |
| Dresden + Saxon Switzerland | 4 | 320 | 246 | 0 | 0 | 17 | 263 | 583 | 82% |
| German Alpine Road | 9 | 648 | 268 | 0 | 0 | 165 | 433 | 1081 | 67% |
| Germany: Berlin + Dresden + Bavaria | 9 | 664 | 180 | 70 | 40 | 117 | 407 | 1071 | 61% |
| Hamburg | 4 | 288 | 156 | 0 | 0 | 11 | 167 | 455 | 58% |
| Moselle Valley | 4 | 288 | 108 | 0 | 0 | 21 | 129 | 417 | 45% |
| Rhine + Moselle | 5 | 360 | 90 | 0 | 0 | 55 | 145 | 505 | 40% |
| Romantic Road | 6 | 432 | 211 | 0 | 0 | 52 | 263 | 695 | 61% |
| Dolomites & North Italy | 19 | 1474 | 170 | 0 | 0 | 1064 | 1234 | 2708 | 84% |
| Liechtenstein: Vaduz | 2 | 208 | 280 | 0 | 85 | 3 | 368 | 576 | 177% |

## (b) Decisions for Youri
- **Own-car routes (10 German routes)**: "there & back" = fuel only, km_from_nl / km_back_to_nl x 0.07 x EUR 2.179 (DE, motorways free, no vignette: all stay in DE). In-route driving = one "Car:" transport extra on the only/first block, fuel only. None state the car is in the daily rate, so it is added. If wrong: subtract the Car extra (EUR 5-58). Own-car fuel is not split, but a fuel-only drive is cheap vs a train; NL-Munich/Berchtesgaden/Dresden (~EUR 120-150 each way) is where the train would be comparable.
- **Dolomites & North Italy**: flies AMS-VCE (CSV rows reused), rental 17 days (Venice pickup, dropped on arrival in Venice after the San Marino-Venice leg; Venice and the last 2 days are car-free; no drop fee). 17 d x EUR 45 = 765 + fuel 1580 km (sum of the notes' leg km; input's straight-line 1440 is lower) = 223 + tolls 60% x 1580 km x 8/100 = 76 -> 1064. If the car is only wanted for the Dolomites + Tuscany (Milan/Turin/Cinque Terre by train), rental would drop sharply; the notes say car for every leg, so kept. Not in daily rate.
- **Liechtenstein** (input guessed rental): the notes' realistic access is train + bus, so priced public: flight ZRH both ways 140 + 85 local (2 x train Zurich-Sargans ~EUR 35 + bus ~EUR 7.5, est). A rental car (2 d x 70 + fuel) would be similar or higher. Passport stamp CHF 3 included as `other`.
- **Zurich-Lucerne**: Pilatus Golden Round Trip EUR 125 included (notes say pick it or Rigi; Rigi would be cheaper). Local 60 = two Swiss intercity trains (est). Flights ZRH 140 each way (WebSearch; back = same fare, est).
- **Berlin routes**: ICE NL-Berlin priced EUR 60 (notes' "from EUR 38" is the promo floor; est, low confidence). Germany 9-day: Munich-AMS flight 120 (WebSearch); Berlin-Dresden 25 and Dresden-Munich 45 are estimated advance train fares; Munich-Garmisch-Fussen local 40 est. Zugspitze (62) marked optional (notes: skip if tight) but counted in the total.
- **Choice-of-two items** priced at one option: Zugspitze full route 62 (Eibsee-only 47), Konigssee boat to St. Bartholoma 17 (full route 29.80), Black Forest spa Caracalla midpoint 28 (Friedrichsbad 36). Parking ranges at midpoints.
- **German Alpine Road**: Zugspitze/Neuschwanstein/Konigssee boat prices come from the Bavaria routes' notes (this route's notes only say "same caveats" and name the parking costs). If you want only what this route's own notes price, drop those three (98).
- **Not priced (no price in notes)**: Cologne cathedral ticket, KD Rhine cruise, Miniatur Wunderland, Burg Eltz admission (Rhine+Moselle: "if detour added"), Cinque Terre boat, city parking in Cologne.

## (c) Data problems in the route text (not fixed)
- Dolomites block 0 note: "rental car, 150 km to the Dolomites ... from +-EUR 80-200 return" is flight-price text in a ground block; no budget impact.
- Dolomites block 1 (Milan) note says "Turin ≈140 km" while the Milan-Turin leg is stated at 140; block 2 transport says La Spezia (260 km) — consistent. Input `km_in_route` (1440) differs from the notes' leg sum (1580); notes used.
- Germany 9-day route: block 1 transport says "or a short flight Dresden-Munich", but no such regular route exists to my knowledge; priced the train.
- Berchtesgaden 6-day route: block 0 transport text says "from Garmisch/Füssen" (~200 km), but blocks list Munich first; km_in_route (380) is straight-line x1.3 and plausible.
- Liechtenstein: input mode guessed "rental"; the text favours train+bus.
