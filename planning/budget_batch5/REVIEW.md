# Phase 4 batch 5: Iberia 1/2 (24 routes), 2026-10-28

Per person, solo, one-way fares, 2026 euros. Ground budgets unchanged. Fares: `flights_batch5.csv` (+ AGP from `flights_from_ams.csv`). No route has the car in its daily rate (`carInDailyRate` false everywhere), so every rental/own car is added as a "Car:" extra.

## (a) Totals
| Route | days | ground today | there & back | transport | local | extras | added | all-in | added % |
|---|--|--|--|--|--|--|--|--|--|
| Andorra (4 days) 🏔️ | 4 | 300 | 220 | 0 | 66 | 0 | 286 | 586 | 95% |
| Andorra + French Pyrenees: Ariège (6 days) ♨️ | 6 | 441 | 300 | 0 | 0 | 372 | 672 | 1113 | 152% |
| Andalusia Roadtrip (9 days) 🚗 | 9 | 549 | 220 | 0 | 0 | 490 | 710 | 1259 | 129% |
| Andalusia: Seville + Granada (5 days) 🏰 | 5 | 305 | 220 | 0 | 62 | 0 | 282 | 587 | 92% |
| Andorra + Spanish Pyrenees: Grand Circuit (9 days) 🏔️ | 9 | 591 | 220 | 0 | 0 | 513 | 733 | 1324 | 124% |
| Asturias + Cantabria (6 days) 🌲 | 6 | 366 | 250 | 0 | 0 | 355 | 605 | 971 | 165% |
| Balearic Islands (7-10 days) 🏝️ | 8 | 488 | 225 | 120 | 0 | 50 | 395 | 883 | 81% |
| Barcelona (4 days) 🎨 | 4 | 244 | 220 | 0 | 0 | 0 | 220 | 464 | 90% |
| Basque Country: San Sebastián + Bilbao (6 days) 🐟 | 6 | 366 | 220 | 0 | 30 | 0 | 250 | 616 | 68% |
| Canary Islands (10-14 days) 🏝️ | 13 | 845 | 240 | 127 | 30 | 40 | 437 | 1282 | 52% |
| Catalonia + Pyrenees (9 days) ⛰️ | 9 | 549 | 220 | 0 | 0 | 387 | 607 | 1156 | 111% |
| Galicia: Santiago de Compostela + Coast (6 days) 🐚 | 6 | 366 | 280 | 0 | 45 | 0 | 325 | 691 | 89% |
| Gibraltar + Andalusia: Costa del Sol (4 days) 🐒 | 4 | 268 | 220 | 0 | 0 | 225 | 445 | 713 | 166% |
| Gran Canaria (5-7 days) 🏝️ | 6 | 360 | 240 | 0 | 20 | 0 | 260 | 620 | 72% |
| Gran Canaria + Tenerife (7-10 days) 🏝️ | 8 | 520 | 240 | 45 | 20 | 40 | 345 | 865 | 66% |
| Ibiza (4-5 days) 🏝️ | 5 | 305 | 220 | 0 | 10 | 0 | 230 | 535 | 75% |
| Lanzarote + Fuerteventura (5-7 days) 🏝️ | 6 | 330 | 240 | 27 | 10 | 0 | 277 | 607 | 84% |
| Madrid (4 days) 🖼️ | 4 | 244 | 260 | 0 | 26 | 32 | 318 | 562 | 130% |
| Mallorca + Menorca (7-10 days) 🏝️ | 8 | 488 | 255 | 50 | 20 | 179 | 504 | 992 | 103% |
| Mallorca: Serra de Tramuntana Loop (6 days) 🏔️ | 6 | 366 | 230 | 0 | 0 | 277 | 507 | 873 | 139% |
| Menorca (4-5 days) 🏝️ | 5 | 305 | 280 | 0 | 0 | 219 | 499 | 804 | 164% |
| Northern Spain Roadtrip (12 days) 🛣️ | 12 | 732 | 250 | 0 | 0 | 731 | 981 | 1713 | 134% |
| Northern Spain: Basque Interior + Rioja (9 days) 🍷 | 9 | 549 | 220 | 0 | 0 | 460 | 680 | 1229 | 124% |
| Porto + Northern Spain (10-14 days) 🏔️ | 12 | 736 | 215 | 25 | 20 | 566 | 826 | 1562 | 112% |


"there & back" = flight in + flight out. Transport = legs between blocks; local = intercity bus/train inside a block; extras = car + tours/fees.

## (b) Decisions for Youri
**Car calls (rental days / km / in rate?). All "not in rate".**
- Andorra 4d: NO car, Alsa bus BCN-Andorra 2 × ~33 (est). Keyword said rental; notes list bus first, 4 days in a tiny country. If you want a car: ~4 × 50 + 400 km fuel ≈ €250 instead of €66.
- Andorra + Ariège: 6 days from Toulouse (fly TLS, round trip), ≈450 km, €372. Notes offer BCN/Girona instead; BCN would be ~€40 cheaper on flights but +300 km of driving.
- Andalusia roadtrip: 9 days, 1,040 km (notes), tolls 0 per notes, €490.
- Andorra + Spanish Pyrenees: 9 days, ≈900 km is MY estimate (input 430 km is straight-line and misses BCN-Andorra and the return), €497 + €16 mandatory Aigüestortes shuttle (price not in notes, est). Off by ±100 km = ±€13.
- Asturias + Cantabria: open-jaw BIO in / OVD out (my choice: route ends in Oviedo), 6 days, ≈400 km, one-way drop €60 (est). Round trip from BIO would drop the fee but add ~300 km (~€40) and flight out 110 instead of 140.
- Catalonia + Pyrenees: 7 of 9 days (2 city days in Barcelona without car), 600 km, 60% on tolled road (AP-7 etc.), €387.
- Gibraltar + Costa del Sol: 4 days, ≈400 km (input 320), AP-7 tolls €15 est, €225. Gibraltar on foot.
- Mallorca + Menorca: car on Mallorca only, 4 days, €179; Menorca by bus (notes mention car only for Mallorca). A Menorca car would add ~€150-200.
- Mallorca Tramuntana: 6 days, ≈300 km (own estimate, input 100 km is straight-line), €277.
- Menorca: 5 days × €40 = €200 + fuel; island rentals in season are often €50-70/day (rate is the mainland ES average). Medium risk, +€50-150.
- Northern Spain roadtrip: 12 days, BIO→SCQ one-way drop ≈€100 (est; notes confirm a fee), ≈1,050 km, €731.
- Basque interior + Rioja: 9 days, ≈600 km, €460.
- Porto + N Spain: I did NOT price a cross-border car (typical one-way PT→ES fee €150-250). Notes suggest the alternative: bus Porto-Santiago €25 (est) and rent in Santiago for 8 days + drop Santiago→Bilbao €100 (est), ≈1,010 km, €566. If you prefer one car from Porto: ~€40 × 10 + fee ~€180 + fuel = ~€700.
- Seville+Granada, Madrid, Barcelona, Basque coast, Galicia: public transport, no car.

**Other judgment calls**
- Flights: reusable typical fares, same both directions unless open-jaw. Seville+Granada flies in/out of Málaga (no direct NL flight to Seville) with train/bus legs in `local` (€62, est).
- Teide cable car (Canaries, GC+Tenerife): notes say "~€40 return"; kept at €40 not halved because you ride up and down. Halving would be -€20 per route.
- Madrid: AVE Segovia notes say €12-14 (midpoint 13), counted both ways = €26; if that is already a return fare, -€13. Paseo del Arte €32 included (notes say "worth it", not optional).
- Formentera day trip (Balearic): €50 return midpoint, optional.
- Inter-island legs (Binter flights ~€45-55, Playa Blanca-Corralejo ferry €27, Palma-Ciutadella ferry €50, Menorca-Ibiza flight €70) are estimates, no price in notes, not searched. Fuerteventura-AMS fare not searched (est €120).
- Not priced because notes give no price: Fuente Dé cable car, Cíes ferry, Timanfaya bus tour (mandatory, ~€18-20 pp in reality), Sóller train, Cremallera de Núria, Gibraltar cable car, Alhambra tickets.

## (c) Data problems in the route text (not fixed)
- Canary Islands: block 0 `transport_to_next` says "on to Lanzarote", but block 1 is Gran Canaria and block 2 Lanzarote; the transport texts are shifted one block (Tenerife→GC, GC→Lanzarote, Lanzarote→Fuerteventura). Block 0 notes also name "Santa Cruz and Teide" while block 1 notes name Las Palmas.
- Andorra routes: Budget text "€110-130/day" vs block rates 75/day (Andorra 4 days budget 300 = €75/day) and 75/day in the Ariège route (notes say ~€120-125). Ground budgets look low against their own notes (not changed, per brief).
- Andalusia roadtrip notes say budget "~€95/day + €30-40/day rental" but block budget is €61/day (549/9); Basque coast notes ~€105/day vs 61/day. Several blocks run at ~€61/day against notes of €80-115.
- Gibraltar block: notes mention Schengen entry from 15 July 2026 (reported, not verified).
- Distances in input.json are straight-line × 1.3 and are too low for these routes (Pyrenees, Mallorca, Gibraltar); I overrode them with my own estimates, stated above.
