# Phase 4 batch 23 review: Caribbean, Amazon & Pan-American (22 routes, 60 blocks)

Prices per person, solo, one-way, 2026 euros, checked 2026-10-29. Ground = existing block budgets (unchanged). 0 web searches: all 22 new airport fares are estimates (low confidence, derived from the "return" ranges in the route notes, roughly 55-60% of the mid-point). Almost every local/transport figure is an estimate (marked "(est)" in the .js). No car anywhere in the batch.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Bolivia 🧂 | 17 | 459 | 1180 | 0 | 55 | 160 | 1395 | 1854 | 304% |
| Northern Brazil 🪁 | 14 | 658 | 960 | 0 | 115 | 0 | 1075 | 1733 | 163% |
| Southern Cone & Brazil Finale 🧉 | 42 | 2166 | 1170 | 295 | 225 | 0 | 1690 | 3856 | 78% |
| Suriname & Northern Brazil 🌴 | 25 | 1263 | 1230 | 420 | 145 | 25 | 1820 | 3083 | 144% |
| Andes Grand Traverse 🦙 | 111 | 4629 | 1040 | 75 | 759 | 360 | 2234 | 6863 | 48% |
| Colombia ☕ | 35 | 1260 | 910 | 0 | 157 | 0 | 1067 | 2327 | 85% |
| Central America Loop 🌋 | 101 | 4016 | 950 | 239 | 505 | 50 | 1744 | 5760 | 43% |
| Costa Rica 🦥 | 21 | 1000 | 920 | 0 | 182 | 50 | 1152 | 2152 | 115% |
| Caribbean Islands Hop 🏝️ | 72 | 5324 | 1120 | 1500 | 155 | 178 | 2953 | 8277 | 55% |
| Cuba 🎷 | 18 | 774 | 1020 | 0 | 80 | 45 | 1145 | 1919 | 148% |
| ABC Islands 🦩 | 18 | 1750 | 965 | 191 | 0 | 88 | 1244 | 2994 | 71% |
| Curaçao & Bonaire 🤿 | 13 | 1325 | 955 | 95 | 0 | 70 | 1120 | 2445 | 85% |
| Guadeloupe & Dominica 🍃 | 15 | 1375 | 1070 | 65 | 30 | 63 | 1228 | 2603 | 89% |
| Ecuador 🐢 | 24 | 1650 | 1020 | 0 | 434 | 0 | 1454 | 3104 | 88% |
| Guatemala 🦜 | 16 | 544 | 980 | 0 | 135 | 0 | 1115 | 1659 | 205% |
| Jamaica 🎵 | 12 | 780 | 940 | 0 | 45 | 0 | 985 | 1765 | 126% |
| Saint Lucia & Grenada 🌰 | 14 | 1070 | 1100 | 180 | 0 | 0 | 1280 | 2350 | 120% |
| Mexico 🌵 | 28 | 1316 | 1000 | 0 | 152 | 0 | 1152 | 2468 | 88% |
| Nicaragua 🌅 | 15 | 465 | 860 | 0 | 40 | 0 | 900 | 1365 | 194% |
| Panama 🚢 | 15 | 625 | 900 | 0 | 55 | 0 | 955 | 1580 | 153% |
| Peru 🦙 | 35 | 1260 | 980 | 0 | 205 | 200 | 1385 | 2645 | 110% |
| Suriname 🛶 | 11 | 605 | 1450 | 0 | 30 | 25 | 1505 | 2110 | 249% |

(The high added % on short, cheap-country routes is mostly the long-haul flight, not a pricing error.)

## (b) Decisions for Youri

Car: none. `carInDailyRate` is false everywhere; no route text drives a car. Costa Rica was keyword-guessed "rental", but its own text says local buses with a rental car "optional", so it is priced on buses/shuttles. If you want a car there: ~10 days x €60 + ~600 km fuel (~€65) + a one-way drop = roughly +€700, minus ~€100 of shuttles.

1. **Flights are all estimates (22 new airports, low confidence, no searches).** Biggest levers: Suriname 750/700 (KLM direct, notes 1100-1800 return), La Paz 600/580, Grenada back 600, Dominica back 650. A real search could move each by +-100-150.
2. **Galápagos flights counted in Ecuador `local` (~€390 return, Ecuador + Andes routes).** The block's `inDailyRate` says only park fee + boat/land tour are in the rate, not the flights Quito/Guayaquil-Galápagos. If the €1,650 already covers them, subtract €390.
3. **Central America Loop ends in Panama City (flight home PTY), not the San Blas sailboat to Cartagena** in the last block's text. If the sailboat is taken: ~+€500 (4-5 day boat, no price in notes) and fly home from Cartagena instead.
4. **Belize water taxis ($15-45 each) assumed inside the €72/day** (notes: 2026-07 correction added them). Only buses are in `local`. If not in the rate: +~€70.
5. **Caribbean hops (Hop route, transport €1,500):** Havana-Kingston 300, Kingston-Curaçao 320, Bonaire-Guadeloupe 450, DM-St Lucia ferry 90, St Lucia-Grenada 180: all estimates; the Bonaire-Guadeloupe and Havana/Kingston legs are the least certain (±€100). Ferry Guadeloupe-Dominica 65 (est).
6. **ABC / Curaçao & Bonaire: flight home priced as Curaçao-AMS 420 + the Bonaire-Curaçao hop 95 inside `flight_out_cost`** (route text says fly back via Curaçao). KLM also flies Bonaire direct; if you do, subtract ~€95 minus any fare difference.
7. **Extras taken from notes:** Uyuni tour 160 (140-180), Machu Picchu 200 (150-250), Cuba e-Visa 45 ($50), Bonaire tax 70, Aruba ED card 18 ($20), Boiling Lake guide 63 (55-70), Costa Rica parks 3 x ~€17 = 50 (my count of 3 is an assumption). Suriname ICF fee 25 is an estimate (the research file mentions a fee but no amount). Not priced (no price in notes): San Blas boat tour (~€100-250 if you add one), Tikal, Iguazú, Valle de la Luna, Saintes ferry besides the €30 local.
8. **Overland transfers in Central America** (Ticabus etc.) and Colombia/Peru/Brazil bus figures are typical fares from memory (±30%).

## (c) Data problems in the route text (reported, not fixed)

- **Andes Grand Traverse, Bolivia block:** `transport_to_next` says "Jeep trip via the 3-day Uyuni Salt Flat tour overland to San Pedro de Atacama" but it is the last block; and Bolivia's order ends in Potosí (not Uyuni), so the standalone Bolivia/Andes routes end 500+ km from La Paz where the flight home is. Priced as a night bus Potosí-La Paz in `local`.
- **Central America Loop, Panama block:** `transport_to_next` is the San Blas sailboat to Cartagena although the route has no next block (see decision 3).
- **Mexico:** last-block `transport_to_next` says bus to Huehuetenango, Guatemala (copied from the Grand Tour); the standalone route has no Guatemala leg. Priced as bus Bacalar-Cancún + flight from Cancún.
- **Southern Cone & Brazil Finale, Chile block:** destinations end in Iquique, but `transport_to_next` is the Paso de Jama bus, which leaves from San Pedro de Atacama (backtrack ~1,000 km Iquique-San Pedro). Priced with the backtrack (€30 extra in transport).
- **Caribbean Islands Hop, Cuba block:** the Cuba route text runs Havana-Viñales-Cienfuegos-Trinidad, then back to Havana (4h15) for the flight: priced that way (Trinidad-Havana bus).
- **Colombia:** ends San Agustín; the text sends you back to Bogotá, which makes a 10-12 h bus before the flight home (priced).
- **Peru / Andes Peru block:** Máncora-Huaraz-Lima order has no direct Máncora-Huaraz bus (via Trujillo or Lima, ~20 h); priced at ~€45.
- **Guatemala route:** text says the return flight leaves "from Flores/Guatemala City"; priced Flores-Guatemala City (€55) + GUA-AMS.
- **ABC Islands route notes** say Aruba is 5 days but the day allocation is described as "first-cut"; days unchanged here.
