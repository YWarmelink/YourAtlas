# Phase 4 batch 9: Alps & Germany 1/2 (13 routes), priced 2026-10-28

Per person, solo, one-way, 2026 euros. Optional extras (Jungfraujoch) are excluded from the Extras / Added columns.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Austria + Slovenia (9d) | 9 | 618 | 354 | 0 | 0 | 103 | 457 | 1075 | 74% |
| Austria Alpine Roadtrip (9d) | 9 | 666 | 269 | 0 | 0 | 134 | 403 | 1069 | 60% |
| Zell am See-Kaprun / Pinzgau (6d) | 6 | 444 | 298 | 0 | 0 | 68 | 366 | 810 | 82% |
| Liechtenstein + Austria + Switzerland (5d, rental) | 5 | 430 | 230 | 0 | 0 | 591 | 821 | 1251 | 191% |
| Salzburg + Berchtesgaden + Hallstatt (5d) | 5 | 368 | 299 | 0 | 0 | 73 | 372 | 740 | 101% |
| Salzburg + Grossglockner + Tyrol (6d) | 6 | 444 | 281 | 0 | 0 | 110 | 391 | 835 | 88% |
| Salzburg + Surroundings (4d) | 4 | 296 | 289 | 0 | 0 | 31 | 320 | 616 | 108% |
| Tyrol (6d) | 6 | 444 | 280 | 0 | 0 | 73 | 353 | 797 | 80% |
| Interlaken + Lauterbrunnen + Grindelwald (6d) | 6 | 708 | 255 | 0 | 0 | 51 (+293 optional) | 306 | 1014 | 43% |
| Liechtenstein + Swiss Alps (3d) | 3 | 340 | 251 | 0 | 0 | 55 | 306 | 646 | 90% |
| Zermatt / Matterhorn (6d) | 6 | 708 | 281 | 0 | 0 | 243 | 524 | 1232 | 74% |
| Switzerland + Northern Italy (9d) | 9 | 927 | 280 | 36 | 0 | 92 | 408 | 1335 | 44% |
| Switzerland Alpine Roadtrip (9d) | 9 | 1086 | 249 | 0 | 0 | 128 | 377 | 1463 | 35% |

## (b) Decisions for Youri

- **All routes: `carInDailyRate` is false.** Own-car routes (12): "there & back" = the drive NL to first stop and last stop to NL (fuel at 7 L/100 km, km from input, country split estimated by me: mostly DE at 2.179, last stretch in AT/CH/SI) plus section tolls on the way (only the Slovenia route). One in-route "Car:" extra on block 1 = fuel for km_in_route + vignettes once (AT 10-day 12.80, CH 43.28, SI 16) + section tolls. German motorways free. If the country split is off by 100 km it moves a drive by about €2-3.
- **Liechtenstein + Austria + Switzerland (rental, €591 car)**: rental 5 days (whole trip, Zurich pickup to Innsbruck drop) × €70 CH rate = 350; one-way cross-border drop fee ≈€120 (est, flagged, could be €60-250); fuel ≈370 km (I added ~120 km Zurich-Vaduz to the input's 250); CH + AT vignettes 56; Arlberg 13. Flights: AMS-ZRH 130 (new row, estimate, medium) + INN-AMS 100 (existing row). If you'd rather use trains for the 2 LI days and rent only in Austria, the car cost drops by roughly €250.
- **Own car NL arrivals for AT routes**: I assumed Austrian vignette needed on every route (Salzburg/Innsbruck/Zell all reached over A8/A12/A10). Tauern + Katschberg (22.50) counted for Austria+Slovenia both ways, Felbertauern 13.50 for Lienz-Innsbruck, Arlberg 13 for Vorarlberg-Tyrol: all are avoidable alternatives exist, each is a section-toll guess.
- **Return/excursion tickets not halved** (Königssee boat 16.90, Kitzsteinhorn ~52.50, Gornergrat CHF88 = €95, Jungfraujoch CHF271 = €293): these are round-trip excursions that you must pay in full, not one-way travel legs. Jungfraujoch flagged optional (notes call it skippable), so it is not in the added total.
- **Zermatt**: Täsch parking 6 days × CHF15 midpoint = €97 (notes give the daily price; days = whole stay since the car stays parked). Gornergrat taken, Glacier Paradise skipped (notes say pick one). Total added 524 is the biggest of the pure-own-car routes.
- **Switzerland + Northern Italy**: St. Moritz-Tirano train €36 (est, notes name no price) as the block 1 transport, but the route also says "drive", see (c). Italian tolls by the formula = €9; the notes say €20-40 for the stretch, so this may be low by about €15.
- **Tyrol**: the notes say Zillertal cable cars and Achensee boats are "€15-30 each": I added both at the midpoint 22.50, not flagged optional.
- **Hallstatt Skywalk/salt mine €29** and **Grossglockner toll €46.50** (Alpine Roadtrip + Salzburg-Grossglockner-Tyrol) taken straight from the notes (not the €42.50 pre-book price).

## (c) Data problems in the route text (reported, not fixed)

- **Austria + Slovenia** block 2 transport: "drive back to the Netherlands via Austria" fine, but the notes say Slovenia vignette needed once, the route also crosses Karawanken tunnel (9), not mentioned.
- **Switzerland + Northern Italy**: block 1 says "Ride the Bernina Express to Tirano", block 2 says "Drive back north over the Gotthard toward Ticino" from Tirano/Valtellina, which is geographically wrong (Tirano to Lugano goes via Lake Como/Menaggio or Chiavenna-Splügen, not the Gotthard). The car/train logic is unclear: if the car is left at Chur/St. Moritz the Italy leg has no car. I priced the car for the whole trip plus the one train fare.
- **Switzerland Alpine Roadtrip**: "Simplon Pass (...) into Ticino" from Andermatt is wrong (Simplon runs Valais to Italy; Andermatt to Valais is via the Furka). km_in_route 520 (straight line × 1.3) looks too low for Zurich-Lucerne-Andermatt-Zermatt-Lugano-Chur (more like 900 km), so fuel is probably understated by ~€60.
- **Liechtenstein + Austria + Switzerland**: block 1 note says "Self-driving the whole loop from the Netherlands takes ~9h", but the route is `rental` with open-jaw flights, a mismatch in mode. Two blocks have budget ~€160-200/day in the notes against actual budget of €104-110/day... (ground budget not touched). Transport-to-next on block 2 says "or drive back to Zürich and fly" (alternative).
- **Liechtenstein + Swiss Alps**: block 1 notes say flight to Zurich plus rental car, route mode says own_car (~8-9h drive). Priced as own car.
- **Several routes** (Zell am See 20 km, Zermatt 50 km, Interlaken 50 km, Tyrol 120 km) have very small km_in_route (straight-line × 1.3 between blocks), so day-trip driving is understated by a few euros each.
- **Austria Alpine Roadtrip** budget note ("Budget slightly higher here") is not reflected in the 74/day rate. Not changed.
- Zell am See route: description ("previous route above / next route below") refers to routes by position; wording stale. Not changed.
