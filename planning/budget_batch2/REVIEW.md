# Phase 4 batch 2 review (Italy, San Marino & Malta), 2026-10-28

Nothing here is in RB_ROUTE_COSTS yet. Per person, solo, one-way, 2026 euros. "Getting there & back" = flights in/out, or the drive from/to NL for own-car routes.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| campania-puglia-9-days | 9 | 657 | 200 | 5 | 30 | 401 | 636 | 1293 | 97% |
| campania-naples-amalfi-coast-6-days | 6 | 438 | 210 | 27 | 74 | 0 | 311 | 749 | 71% |
| corsica-sardinia (5 days) | 5 | 363 | 330 | 40 | 0 | 290 | 660 | 1023 | 182% |
| dolomites-6-days | 6 | 438 | 220 | 0 | 0 | 444 | 664 | 1102 | 152% |
| florence-tuscany-4-days | 4 | 292 | 270 | 0 | 0 | 83 | 353 | 645 | 121% |
| france-switzerland-italy-10-14-days | 12 | 1053 | 353 | 0 | 18 | 231.5 | 602.5 | 1655.5 | 57% |
| germany-austria-italy-10-14-days | 12 | 874 | 321 | 0 | 0 | 141 | 462 | 1336 | 53% |
| grand-european-roadtrip-14-21-days | 14 | 1038 | 204 | 0 | 0 | 622 | 826 | 1864 | 80% |
| italy-roadtrip-12-days | 12 | 1092 | 200 | 0 | 0 | 896 | 1096 | 2188 | 100% |
| italy-north-to-central-12-days | 12 | 876 | 200 | 78 | 10 | 238 | 526 | 1402 | 60% |
| malta-gozo-sicily-9-days | 9 | 994 | 260 | 55 | 0 | 0 | 315 | 1309 | 32% |

## (b) Decisions for Youri

**Car calls**

| Route | Call | Evidence | If wrong |
|---|---|---|---|
| campania-puglia | Car NOT in daily rate. Rental 5 days (Salerno after Amalfi to Bari), ~560 km, drop-off fee €70 (est). | Notes: car only after the Amalfi stretch. Block budgets are only ~€73/day. | Fee is an estimate (±€40). 4 days saves €45. |
| campania-naples-amalfi | No car, despite mode=rental. | Notes: "No rental car recommended"; ferries/buses priced instead. | If you do rent, add ~€150+. |
| corsica-sardinia | Two separate rentals (FR 2 days, IT 3 days) and a foot-passenger ferry (€40). | Corsican rental contracts mostly forbid ferries; a car ferry would add ~€60-100. Route text says "rental car plus ferry". | One car on the ferry would cost roughly the same or more. |
| dolomites | Treated as fly + rent locally, NOT own car, though the data tag says own_car. Innsbruck in/out, rental 6 days, ~460 km. | Notes: driving from NL (~12-13h) "only worthwhile as a stopover trip, otherwise fly + rent". Notes say rental €35-45/day is on top of the €110/day budget. | Own car instead: drive there and back ≈ 2 × (1010 km × 0.07 × ~€2.1 + ~€25 tolls) ≈ €350 total, and no rental or flights. That is about €100 cheaper than my €594 (flights 220 + rental/fuel/tolls 374). |
| florence-tuscany | Car NOT in rate. 1 day rental = €83 (rental 45 + fuel 28 + tolls 10). | Notes say "€20-30 for the rental car/day tour", which is not a solo price. | Notes figure would cut this by ~€55. A bus tour is ~€60-90. |
| france-switzerland-italy | Own car, not in rate. 520 km. Swiss vignette €43.28; Italian tolls €30 (notes: €20-40). | Notes. | Drive NL-Chamonix ≈ €190, Milan-NL ≈ €163; French tolls are rule-of-thumb (±€30). |
| germany-austria-italy | Own car, not in rate. Austrian vignette €12.80 (notes) + Brenner A13 ≈ €11.5. | Notes. Return trip Verona-NL assumed via Brenner. | Small. |
| grand-european | Own car, not in rate. 3450 km, 6 vignettes. No rental. | Mode own_car. | If rental: 14-21 days × €45 = €630-945 more. |
| italy-roadtrip | Car NOT in rate. 12 days × €45 + one-way drop Milan-Naples €100 (est). | Notes says "~€140/day" but blocks are €91/day, so the car clearly isn't in the budget. Tolls from notes: €44.50 + €13.50. | Drop fee is the weak number (€0-150). If 9 days: -€135. |
| italy-north-to-central | Car NOT in rate. Rental 3 days (Como/Garda/Verona), drop in Verona (€40 est), ~330 km. Train for the rest. | Notes: "rental car for the lakes leg". | Skipping the car (trains/buses Como + Garda) would save ~€150 but costs ~€30 in buses. |
| malta-gozo-sicily | Car IS in daily rate: nothing added. | Notes: "~€150/day (rental car and fuel included)", carInDailyRate true. | n/a |

**Other judgment calls**
- **Flights**: every airport was new. All are "typical, not floor" numbers picked above the aggregator floors. Low-confidence: Figari (connecting only), Bari, Olbia (seasonal), Innsbruck (seasonal), Florence back.
- **Catania-Malta**: €55 is an estimate for a Ryanair/KM Malta flight; no fare was found. The Virtu Pozzallo-Valletta ferry is €70-110 foot passenger (Directferries/Ferryscanner), and it needs a transfer to Pozzallo.
- **Gozo ferry** (~€4.65 return) not added: notes say it is already folded into the Malta block.
- **Aiguille du Midi**: €77.5 = midpoint of €75-80, kept as the return price (not halved: it is a return product) and flagged optional.
- **Dolomites lift passes**: notes say "€10-25/day" but not how many days. I assumed 2 lift days per base (4 × €17.50 = €70).
- **Not priced (not in notes)**: Täsch parking (~CHF 15/day), Tre Cime/Braies parking and toll road, Rome/Florence ZTL/city parking, Neuschwanstein/Zugspitze tickets, Pompeii ticket.
- **Zermatt shuttle** (€18 return, est) added as `local` because the route is car-free there.
- **Grand European**: added SK vignette (€8.10, est) because Budapest-Prague transits Slovakia. Also bought a second CZ vignette (€9.44) for the drive home.
- **Several short intercity prices are estimates** (Circumvesuviana €5, Capri ferries €22/24, Florence-Siena €10, Siena-Rome €30, Verona-Bologna €18, Bologna-Florence €20).
- **Distance rule**: for the NL drives I used 80% motorway for tolls (long-haul), not the 60% rule used in-route.

## (c) Data problems in route text (reported, not fixed)

- **campania-naples-amalfi**: `mode` = rental, but the notes say no rental car.
- **dolomites-6-days**: `mode` = own_car, but the route text says fly in and rent a car, and the notes recommend that too. B0's "transport_to_next" is "Drive via Valparola/Falzarego to Cortina" but the block list puts the Valparola/Falzarego passes on B1.
- **florence-tuscany**: the stop list mixes sights ("Florence — Uffizi Gallery") with day trips; the 4 days are all one block. Notes give no price for the car/tour beyond a vague "€20-30".
- **italy-roadtrip**: notes say budget "~€140/day" but the blocks total €91/day; it also assumes Naples/Pompeii and Amalfi each get 2 days of car with no parking cost.
- **corsica-sardinia**: B1's `transport_to_next` is "End of this route" but the notes say Olbia flights are seasonal Aug-Oct only. Route text implies a car on the ferry, which rental firms usually forbid.
- **italy-north-to-central**: B3 (Siena/Val d'Orcia) "High-speed train to Rome (~1h30)" is not realistic from Siena (no HS station). The route needs a change in Florence or Chiusi.
- **malta-gozo-sicily**: B1 says the Gozo ferry is "folded into the Malta days above", but it is the Malta block itself.
- **grand-european**: `km_by_country` lacks SK although Budapest to Prague crosses it.
