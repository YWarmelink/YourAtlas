# Phase 4, batch 1: Grand Expeditions, review list

Extracted 2026-10-27 (5 Sonnet agents, method rules in `ROUTE_BUILDER_BUDGET_PLAN.md`, Phase 4).
**Nothing is in `RB_ROUTE_COSTS` or the Sheet yet.** `costs_batch1.js` holds the entries; after
Youri's calls below, they go into `RB_ROUTE_COSTS` → `push_route_costs_to_sheet.js` (dry run) →
`--push`. Per-route detail (every estimate, every converted price, route-text problems) is in
`review_p1.md` … `review_c3.md`; airport fares in `flights_batch1.csv`.

## Totals (per person, solo, Standard)

"Ground" = today's block budgets (daily rate × days), unchanged. "Added" = what this batch adds
on top: getting there & back + transport between blocks + local intercity + non-optional extras.

| Route | Days | Ground (today) | Getting there & back | Transport | Local | Extras | Added | All-in | Added % | Optional (not counted) | Blocks match |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Eurasia Grand Tour 🌏 | 338 | 19,844 | 700 | 2,485 | 3,016 | 2,900 | 9,101 | 28,945 | 46% | 1,220 | ok |
| India & Himalaya Expedition 🏔️ | 51 | 4,470 | 1,550 | 432 | 220 | 277 | 2,479 | 6,949 | 55% | 166 | ok |
| Patagonia & Antarctica Expedition 🧊 | 53 | 15,075 | 1,900 | 210 | 285 | 445 | 2,840 | 17,915 | 19% | 9,770 | ok |
| Pan-American Grand Tour 🌎 | 282 | 11,085 | 1,200 | 1,385 | 1,825 | 999 | 5,409 | 16,494 | 49% | 340 | ok |
| Caribbean & Amazon Expedition 🌴 | 97 | 7,450 | 1,000 | 2,330 | 415 | 831 | 4,576 | 12,026 | 61% | 0 | ok |
| West & Central Africa Expedition 🌍 | 93 | 5,160 | 950 | 1,711 | 749 | 1,100 | 4,510 | 9,670 | 87% | 0 | ok |
| Africa Grand Tour 🌍 | 288 | 33,095 | 850 | 2,360 | 2,435 | 4,743 | 10,388 | 43,483 | 31% | 0 | ok |
| Mediterranean Civilizations Expedition 🏛️ | 150 | 10,329 | 530 | 1,780 | 975 | 258 | 3,543 | 13,872 | 34% | 0 | ok |
| Nordic Arctic Expedition ❄️ | 67 | 13,950 | 800 | 1,665 | 455 | 1,373 | 4,293 | 18,243 | 31% | 720 | ok |
| North America Grand Traverse 🌎 | 69 | 12,825 | 780 | 495 | 110 | 1,347 | 2,732 | 15,557 | 21% | 0 | ok |
| Oceania Grand Expedition 🌊 | 183 | 17,943 | 2,600 | 3,455 | 1,997 | 12,854 | 20,906 | 38,849 | 117% | 1,165 | ok |
| Central European Grand Roadtrip 🚗 | 70 | 8,030 | 202 | 0 | 0 | 1,858 | 2,060 | 10,090 | 26% | 0 | ok |
| British Isles & Celtic Coast Expedition 🍀 | 115 | 13,195 | 185 | 1,015 | 20 | 1,918 | 3,138 | 16,333 | 24% | 52 | ok |
| **Total** | | 172,451 | | | | | ≈75,975 | ≈248,426 | 44% | | |

(India already reflects one correction: the Bhutan SDF, €715, was removed as an extra because
the block notes say it's already in the €284/day rate.)

## 1. Car already in the daily rate? (main double-counting risk)

| Route / stretch | Call | Evidence | If the call is wrong |
|---|---|---|---|
| Central European Grand Roadtrip (own car) | **NOT in rate** → fuel + tolls + vignettes extra €1,354 + parking €505 | travel style: "Fuel, tolls/vignettes and parking … NOT included in the per-country amounts" | none; matches the notes' own ~€1,950 |
| British Isles & Celtic Coast (own car) | **NOT in rate** → car €1,389 (9,500 km, notes say 9-10k) + parking €450 + car ferries €1,015 | travel style: "Fuel, toll/parking and the six car ferries … NOT included" | the notes estimate €2,800-3,200 car total; this batch gets ~€1,840 + ferries |
| Africa: ZA + LS + SZ | **IN rate** (weakest call) → only cross-border letters €120 + one-way drop €200 | ZA €96/day vs ~€60-70 for public transport; the gap ≈ rental + fuel | add ≈€1,500 |
| Africa: NA, AO | IN rate | notes explicit (4x4 rental €70-90/day; rental car/driver) | – |
| Africa: BW, ZM | no car; buses/transfers costed | table's 4x4 rate (€150/day) would exceed the whole daily rate | if you'd self-drive: + several €1,000 |
| Africa: MG, ET | driver NOT in rate → 4x4 + driver €450 each | notes | – |
| Africa: MZ, ZW | no car (rentals usually barred from crossing) | car table notes | – |
| Africa: TZ, KE, UG, RW | no car costed | – | **safaris (Serengeti, Mara) may be undercounted**, check `review_c1.md` |
| Mediterranean: Oman | IN rate | "rental car (4x4) or tour is mandatory, which pushes the daily budget up considerably" (€110/day) | – |
| Mediterranean: Sardinia, Corsica | no car added | no evidence in notes; €100/day, poor bus links | possible hidden car stretch |
| Nordic: Iceland | IN rate | "incl. rental car" | – |
| Nordic: Faroe | NOT in rate → 4-day rental €535 | parking mentioned; €239/day looks too low to include a car | – |
| Nordic: Norway | no car (weakest call) | €150/day ≈ Finland's; a note "avoids the 540 km drive" hints at a car | add a rental if you'd drive |
| North America: Cars 1-3 | IN rate | route breakdown "cars + fuel solo €2,500-3,500" sums into the block budgets | – |
| North America: SF/Yosemite/Sequoia | NOT in rate → 7 rental days €397 | – | – |
| Oceania: all of AU + NZ | **NOT in rate → ≈€10,000 of car rentals** (Perth-Darwin 4x4 €4,630 incl. ≈€1,000 one-way fee, Darwin-Alice €1,397, Melbourne/Tasmania/Adelaide €1,302, NZ South €1,737, NZ North €931) | the 2026-07 corrections list what the rate excludes and never mention a car; rates €87-120/day | **biggest single decision**: a compact car Perth-Broome + the Broome-Darwin flight from the notes saves >€2,500 |

## 2. Other decisions for Youri

1. **North America: flights probably already in the block budgets.** The route's notes say "the 6
   block budgets … follow this breakdown", and that breakdown includes flights €900-1,500. So
   `flight_in/out` (€780) would double-count. Options: (a) set them to 0 for this route; (b) keep
   them and lower the block budgets by the flight share (cleaner model, but changes `budget`).
   The agent also added one-way drop fees (€470) although the route text says there are none.
2. **Antarctica cruise:** the AQ block's €9,500 budget IS the cruise, so it's in the batch as an
   *optional* extra (visible, not counted). That's why "Optional" is €9,770 there.
3. **Mana Pools (Zimbabwe), €1,475:** the midpoint of the notes' €1,300-1,650; a half-day option from €100 exists.
4. **Ecuador:** Galápagos park fee (€197) + flight (in `local`, ~€400) added; the notes don't
   clearly say the €1,650 block budget includes them (agent suspected ~€200 overlap).
5. **Suriname Maroon trip (€330), Gabon Loango (~€400):** the notes say these push costs above the
   daily rate, so they may partly overlap.
6. **Visa-file disagreements:** China €0 (visa-free to 31 Dec 2026 per the visa file; the Asia pilot
   has €150), ESTA $40.27 (the visa file still says $21, so the file is outdated), Malawi (file
   USD 75 vs note ~€45, used the file), Tajikistan GBAO permit (file €18 vs notes ~USD 70),
   Zambia (file: visa-free; note recommends the KAZA UniVisa), Cameroon e-visa €190 (looks high).
7. **Eurasia reuses the Asia pilot's values** for CN…SG, but Eurasia's stays are shorter (JP 18 vs
   31 days, ID 21 vs 49). Transport and tours carry over; the `local` figures (e.g. JP €370,
   ID €545) are probably too high there.
8. **Flight fares:** low confidence for Paro, Puerto Montt, Ushuaia, Ilulissat, Halifax, the
   Oceania airports, Doha and several West-African hops. WebSearch only gives aggregator floors/
   return fares; the agents applied the "typical, not promo" rule by judgment.

## 3. Flagged items, notes problems

Each group file lists every `est` / `from×1.25` / converted number (~270 in total) and the
route-text problems noticed (not fixed), e.g. Bahrain RED on the travel advisory,
Mediterranean header counts (18 legs/13 countries vs 19 blocks), Chile north-south backtrack,
Pan-American Miami layover for Cuba, ESTA price in `VISA_VACCINATION_RESEARCH.md`.

## Cost of this batch

R1b (car table, 37 countries): 69,183 tokens. Extraction: p1 111,592 · p2 120,444 · c1 137,891 ·
c2 139,508 · c3 86,523 = **595,958 tokens** for 13 routes / 174 blocks (≈3,400 per block).
For the next batches: trim the per-block notes the agents get, pre-fetch the visa and car rows once,
put the airport searches in one parallel message, and write files with Write instead of heredocs.
