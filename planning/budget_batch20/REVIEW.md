# Phase 4 batch 20 review: Mediterranean, Eurasia & Europe-Asia (20 routes, 67 blocks)

Prices per person, solo, one-way, 2026 euros, checked 2026-10-28. Ground = existing block budgets (unchanged). 8 web searches (ATH, IST, TUN, XIY, HAN, CAI, TPE, TAS); 8 other new airports are estimates (low confidence). Most local/transport figures are estimates (no source), marked "(est)" in the .js.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Balkan 🐺 | 35 | 1428 | 360 | 74 | 115 | 0 | 549 | 1977 | 38% |
| East Asia & Pacific 🗻 | 66 | 3340 | 950 | 750 | 590 | 447 | 2737 | 6077 | 82% |
| Egypt & Arabian Peninsula 🐪 | 35 | 2147 | 600 | 514 | 170 | 434 | 1718 | 3865 | 80% |
| Iberia & Morocco/Tunisia 🏰 | 26 | 1270 | 300 | 210 | 150 | 0 | 660 | 1930 | 52% |
| Spain 💃 | 10 | 600 | 220 | 0 | 65 | 0 | 285 | 885 | 48% |
| Corsica & Southern France ⛵ | 11 | 792 | 320 | 55 | 80 | 0 | 455 | 1247 | 57% |
| Greece & Crete 🫒 | 19 | 1290 | 270 | 45 | 95 | 591 | 1001 | 2291 | 78% |
| Greece & Cyprus 🏺 | 24 | 1615 | 310 | 155 | 215 | 0 | 680 | 2295 | 42% |
| Malta & Italy 🏛️ | 34 | 2354 | 240 | 200 | 135 | 0 | 575 | 2929 | 24% |
| Rome & Surroundings 🍕 | 13 | 961 | 210 | 30 | 10 | 0 | 250 | 1211 | 26% |
| Sardinia 🗿 | 6 | 438 | 250 | 0 | 0 | 312 | 562 | 1000 | 128% |
| Sicily 🌋 | 10 | 650 | 260 | 0 | 0 | 553 | 813 | 1463 | 125% |
| Malta ⚔️ | 5 | 305 | 240 | 0 | 5 | 0 | 245 | 550 | 80% |
| Southeast Asia Grand Loop 🛕 | 140 | 5405 | 990 | 726 | 1200 | 1515 | 4431 | 9836 | 82% |
| Tunisia 🧿 | 8 | 293 | 390 | 0 | 26 | 0 | 416 | 709 | 142% |
| Anatolia 🕌 | 20 | 1020 | 290 | 0 | 115 | 0 | 405 | 1425 | 40% |
| Istanbul + Gallipoli & Troy (9 days) ⚔️ | 9 | 459 | 290 | 0 | 0 | 218 | 508 | 967 | 111% |
| Istanbul + Lesbos (Greek Islands) (9 days) 🛳️ | 9 | 498 | 290 | 28 | 72 | 0 | 390 | 888 | 78% |
| Turkey + Greece: Aegean Coast & Dodecanese (12 days) 🌊 | 12 | 690 | 340 | 28 | 60 | 55 | 483 | 1173 | 70% |
| West Eurasia Overland 🐫 | 132 | 5329 | 550 | 520 | 600 | 285 | 1955 | 7284 | 37% |

## (b) Decisions for Youri

Car calls (carInDailyRate is false everywhere):
- **Sardinia**: car added, 5 of 6 days x 45 + ~620 km (Cagliari-Su Nuraxi-Costa Smeralda and back, flight home from Cagliari) fuel 87, no tolls (SS131 free). EUR 312. Notes say rental car; the km in input.json (290) is a straight-line figure and too low.
- **Sicily**: car added, 8 of 10 days x 45 + ~700 km (input 540, straight line) fuel 99 + tolls 34 + one-way drop Palermo-Catania ~60 (est). EUR 553. I fly out of Catania (140) because the route ends on the east coast; if you return via Palermo (120), drop the 60 fee and save 80.
- **Greece & Crete**: car on the mainland only, 8 days x 45 + ~1200 km fuel 184 + tolls 47 = EUR 591 (notes: "public transport/rental car on the mainland"; Crete by KTEL bus, local 50). If you do the mainland by bus instead (as in Greece & Cyprus, local ~140) it saves ~450. Biggest swing in the batch.
- **Egypt & Arabian Peninsula**: only Oman gets a car: 4x4 for 4 days at EUR 60/day (est; table says 35 but the notes say Jebel Shams/Wahiba need a 4x4 or tour) + ~600 km fuel = EUR 264. Egypt/Jordan by bus (Cairo-Nuweiba bus + ferry).
- **Malta**: NO car (notes say "bus/rental car", island compact). If rented: ~3 days x 30 + fuel ~8 = ~100 extra.
- **Turkey + Greece Aegean**: NO car (notes "rental car/bus"; Izmir-Selcuk-Bodrum by bus, local 20). If rented one-way Izmir-Bodrum: ~5 days x 42 + fuel 29 + toll 10 + drop ~50 = ~300 extra.
- Keyword "rental" is wrong for none of these beyond the above; all other routes are public transport.

Other judgment calls:
- **Istanbul + Gallipoli & Troy**: tour EUR 200 + Troy 18 added. The notes say "budget ~EUR 75-85/day including the tour", but the block budget is now 459 (~EUR 51/day, R2d), so I counted the tour separately. If the budget still covers the tour, subtract 218.
- **SE Asia Grand Loop**: extras are big and mostly from notes: Mount Kinabalu 300, Sipadan 2 days x 200 = 400 (days are my est; none of these is marked optional in the notes, so none flagged optional), Komodo shared boat 3 days 121, Ha Giang 3 days 120, El Nido-Coron 190. Drop Sipadan/Kinabalu to optional if you want a smaller base (-700).
- **East Asia & Pacific**: Gobi tour 5 days x USD 100 = 447 (days est). Trans-Mongolian train 220 and Ulaanbaatar-Tokyo flight 400 are estimates. The route's end flight is Taipei-AMS (450); the Taipei-Hanoi flight in the text belongs to the grand tour, not priced.
- **West Eurasia Overland**: ends in Uzbekistan, so flight_out = Tashkent-AMS 320 (searched, low confidence). Pamir 4x4 3 days shared by 3 = 246 (est, notes give USD 150-400/day, often shared). Visas: Azerbaijan 21, GBAO permit 18 (Tajikistan itself visa-free <=30 days).
- Visas: Egypt 31, Jordan Pass 69 (covers the visa fee), Oman 48 (OMR 20, est, not in the research file), Bahrain 22, Cambodia 32, Laos 31, Indonesia 29, Azerbaijan 21, Tajik GBAO 18. Thailand/Malaysia/PH/TL/VN/etc visa-free.
- Dependent on season: Lesbos and Dodecanese ferries are June-September only (notes); it is priced as running. Corsica ferry 55 (seat, est).
- Low-confidence blocks: Casablanca-Tunis flight 170 (no Marrakech nonstop), Cebu-Medan 180, Dili-Singapore 280, Heraklion-Larnaca 110, Baku-Almaty 170, all 8 no-search airports (MRS, LCA, ADB, RHO, TUN back, IST back).
- Travel advisory (in notes, not priced): Bahrain RED, Qatar/Jordan orange. Prices assume the trip happens.

## (c) Data problems in the route text (reported, not fixed)
- West Eurasia Overland's last block (Uzbekistan) still has transport_to_next "Flight Tashkent-Xi'an" even though the route ends there. Not priced (last block).
- Greece & Cyprus text says "Car/bus back to Piraeus" from Meteora but mode is public; priced as bus.
- Egypt notes say "Siwa Oasis" as a hidden gem, not on the destination list; not priced.
- Istanbul + Gallipoli & Troy notes: "Budget ~EUR 75-85/day including the tour" is stale vs the R2d budget (see above). Same stale pattern in Istanbul + Lesbos (70-85/day) and Turkey + Greece (75-90/day).
- Input distances (km_in_route) are straight-line x 1.3 and too low for Sardinia, Sicily and Greece & Crete (I used my own road estimates, listed above); for Egypt & Arabian Peninsula they include flown legs and are unusable.
- Malta & Italy block 2 (Italy, 6d) starts at "Reggio Calabria" while Sicily's text ends with the strait ferry; priced the Reggio-Naples train in the Sicily block's transport.
