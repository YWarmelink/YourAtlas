# Phase 4 batch 17: Nordics 1/2 (21 routes), 2026-10-28

No WebSearch was used: every new fare is an estimate (flights_batch17.csv, confidence medium/low). All euros are per person, one way, solo, 2026.

## (a) Totals

"There & back" = flight in + out. "Extras" excludes optional ones (shown as +opt).

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Copenhagen 4d | 4 | 384 | 180 | 0 | 0 | 0 | 180 | 564 | 47% |
| Copenhagen + Zealand 5d | 5 | 480 | 180 | 0 | 38 | 101 | 319 | 799 | 66% |
| Denmark 6d | 6 | 576 | 180 | 0 | 93 | 0 | 273 | 849 | 47% |
| Denmark + South Sweden 9d | 9 | 820 | 180 | 13 | 51 | 243 | 487 | 1307 | 59% |
| Åland 5d | 5 | 410 | 270 | 0 | 0 | 0 | 270 | 680 | 66% |
| Finland Roadtrip 12d | 12 | 960 | 340 | 0 | 0 | 852 | 1192 | 2152 | 124% |
| Finnish Lapland 9d | 9 | 720 | 380 | 0 | 0 | 369 (+115 opt) | 749 | 1469 | 104% |
| Helsinki 4d | 4 | 310 | 300 | 0 | 0 | 0 | 300 | 610 | 97% |
| Helsinki + Lake District 6d | 6 | 525 | 300 | 0 | 0 | 290 | 590 | 1115 | 112% |
| South Finland 9d | 9 | 765 | 300 | 0 | 66 | 24 | 390 | 1155 | 51% |
| Faroe Islands 6d | 6 | 660 | 560 | 0 | 0 | 594 | 1154 | 1814 | 175% |
| Greenland 10d | 10 | 3725 | 1225 | 0 | 300 | 0 | 1525 | 5250 | 41% |
| Faroe + Iceland 9d | 9 | 1080 | 400 | 270 | 27 | 675 | 1372 | 2452 | 127% |
| Iceland Extended 14d | 14 | 1610 | 240 | 0 | 0 | 1377 | 1617 | 3227 | 100% |
| Iceland Ring Road 12d | 12 | 1560 | 240 | 0 | 0 | 1089 | 1329 | 2889 | 85% |
| Iceland South Coast 9d | 9 | 1170 | 240 | 0 | 27 | 716 | 983 | 2153 | 84% |
| Reykjavík + Golden Circle 5d | 5 | 575 | 240 | 0 | 27 | 368 | 635 | 1210 | 110% |
| South Iceland 6d | 6 | 690 | 240 | 0 | 27 | 400 | 667 | 1357 | 97% |
| Bergen + Ålesund 12d | 12 | 1320 | 250 | 0 | 0 | 1276 | 1526 | 2846 | 116% |
| Bergen + Fjords 6d | 6 | 660 | 240 | 0 | 110 | 50 | 400 | 1060 | 61% |
| Fjord Norway 9d | 9 | 990 | 250 | 0 | 0 | 1070 (+51 opt) | 1320 | 2310 | 133% |

(The input holds 21 routes, not 23.)

## (b) Decisions for Youri

Car calls (`carInDailyRate` is false everywhere, so every car is added; rental days = trip days minus city-only days):

| Route | Rental days | Km | Calculation | If wrong |
|---|---|---|---|---|
| Copenhagen + Zealand | 1 (Møns Klint day) | 250 | 55 + 46 fuel | Notes say the car day costs €40-60 more: matches |
| Denmark + S Sweden | 4 (Skåne, from Malmö) | 200 | 220 + 23 | DK block has no car (trains) |
| Finland Roadtrip | 10 | 1120 | 550 + 182 + 120 drop | Drop fee Rovaniemi is a guess; round trip via Helsinki saves ~€120 but adds ~830 km (~€135) |
| Finnish Lapland | 6 | 240 | 330 + 39 | km_in_route looks low (real Rovaniemi-Levi-Ylläs-back is ~400 km, +€26) |
| Helsinki + Lake District | 4 | 430 | 220 + 70 | |
| Faroe 6d | 5 | 120 | 550 + 17 + 27 tunnels | Rate is the €110/day file value; tunnel toll is unsure (Vágar tunnel may be free, -€27). Input said own_car; the notes say rental, so rental |
| Faroe + Iceland | FO 2 / IS 4 | 30 / 300 | 224 / 363 | Input km IS 1280 includes the FO-IS leg, replaced by ~300 km |
| Iceland Ring Road | 11 | 1400 | 880 + 199 + 10 tunnel | Notes give 1,332 km |
| Iceland Extended | 13 | 2300 | 1040 + 327 + 10 | Priced the Westfjords (2WD) option; the highland 4x4 option would add ~€650 (4x4 ~€130/day) |
| Iceland South Coast | 7 | 1100 | 560 + 156 | km_in_route 560 is a one-way path; I added the Golden Circle and the return from Höfn |
| Reykjavík + GC | 3 | 280 | 240 + 40 | |
| South Iceland | 4 | 560 | 320 + 80 | km_in_route 290 is one-way; added GC loop and the way back from Vík |
| Bergen + Ålesund | 10 | 900 | 750 + 200 drop + 176 fuel + 150 tolls/ferries | km_in_route 570 omits the Atlantic Ocean Road; drop fee and ferry count are estimates (±€100) |
| Fjord Norway | 8 | 770 | 600 + 200 drop + 150 + 120 tolls/ferries | Priced one-way to Ålesund (flight out AES 130). A loop back to Bergen drops the €200 fee but adds ~500 km (~€100) |

Other judgment calls:
- **Åland**: no direct flights; priced as AMS-Stockholm (~100) + Stockholm-Mariehamn ferry (~35) each way.
- **Greenland**: flight in 575 = half the midpoint of the notes' €900-1,400 return. Flight out reuses the existing JAV back row (650); the notes' own last-leg figure (€600-950 return) would give ~390, so out is possibly ~€260 high. Domestic Nuuk-Ilulissat 300 is an estimate (low confidence). Eqi boat trips have no price in the notes, so none added.
- **Faroe + Iceland**: priced as flights FAE-CPH-KEF (270 on the FO block) instead of the Norröna ferry, because the ferry combo needs ~10 days and lands in Seyðisfjörður, 650 km from Reykjavík.
- **Blue Lagoon** (Reykjavík + GC and Faroe + Iceland): "from €65-75" midpoint 70 × 1.25 = €88, flagged. The Faroe + Iceland notes themselves give no price, I reused the sibling route's.
- **Not priced because the notes give no price**: Vestmanna boat tour (Faroe, 2 routes), Húsavík whale watching, LEGO House, Eqi boat trips, Nærøyfjord cruise (bundled into the €110 local estimate for Bergen + Fjords).
- Bergen + Fjords: Flåm Railway NOK 570 = €50 at 11.5 NOK/EUR. Preikestolen and Trolltunga parking are in Fjord Norway as optional (the notes call both detours optional); they are not in "Added".
- Finnish Lapland husky/aurora tour: the notes call these "pricey add-ons" (€80-150), so one is added as optional.
- Iceland Flybus KEF-Reykjavík (27) on routes with a city base; skipped on Ring Road and Extended where the car is collected at the airport.

## (c) Data problems in the route text (not fixed)

- `km_in_route` (straight-line path) undercounts the driving on several Iceland routes (South Iceland 290, South Coast 560) and Bergen + Ålesund (570); Faroe + Iceland counts the FO-IS crossing as 1280 km of Iceland driving.
- Faroe Islands 6d: mode guessed `own_car`, but the text says rental car.
- Finnish Lapland: Rovaniemi-Levi-Ylläs implies ~400 km, input says 240.
- Faroe + Iceland: the notes' Norröna combo (≥1 week Iceland + 3 days-1 week Faroe, from ~€810) does not fit the 3 + 6 days.
- Greenland notes: entry "from ±€900-1,400 return" are "from" prices, so one-way may be somewhat higher than 575.
