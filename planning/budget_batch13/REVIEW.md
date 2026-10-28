# Phase 4 batch 13: Adriatic & Western Balkans 3/3 (17 routes, 2026-10-28)

## (a) Totals per route (EUR per person, solo, one-way fares)
"There & back" = flight_in + flight_out (own-car route: the drives). Ground today = sum of block budgets.

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Serbia + Bosnia (9 days) 🛶 | 9 | 340 | 360 | 30 | 26 | 60 | 476 | 816 | 140% |
| Serbia Roadtrip (9 days) 🚙 | 9 | 360 | 270 | 0 | 0 | 334 | 604 | 964 | 168% |
| Germany + Austria + Slovenia (10-14 days) 🥨 | 12 | 812 | 347 | 0 | 0 | 149 | 496 | 1308 | 61% |
| Hungary + Austria + Slovenia (7-10 days) 🚆 | 9 | 566 | 240 | 0 | 0 | 468 | 708 | 1274 | 125% |
| Julian Alps + Soča Valley (6 days) 🚣 | 6 | 372 | 250 | 0 | 0 | 404.5 | 654.5 | 1026.5 | 176% |
| Ljubljana + Lake Bled (5 days) 🏰 | 5 | 310 | 250 | 0 | 16 | 54 | 320 | 630 | 103% |
| Slovenia + Croatia + Bosnia (10-14 days) 🗺️ | 12 | 712 | 240 | 0 | 0 | 821 | 1061 | 1773 | 149% |
| Slovenia + Italy (9 days) 🍝 | 9 | 674 | 210 | 0 | 0 | 493 | 703 | 1377 | 104% |
| Slovenia + Northern Croatia (9 days) 🌲 | 9 | 562 | 270 | 0 | 0 | 478 | 748 | 1310 | 133% |
| Slovenia Alpine Loop (6 days) 🏔️ | 6 | 372 | 250 | 0 | 0 | 343 | 593 | 965 | 159% |
| Slovenia Roadtrip (9 days) 🗺️ | 9 | 558 | 250 | 0 | 0 | 386 | 636 | 1194 | 114% |
| Kosovo (5 days) 🕍 | 5 | 150 | 250 | 0 | 22 | 0 | 272 | 422 | 181% |
| Kosovo + Albania + North Macedonia (12 days) 🧭 | 12 | 369 | 270 | 24 | 54 | 0 | 348 | 717 | 94% |
| Kosovo + Montenegro + Albania (9 days) 🗻 | 9 | 310 | 240 | 53 | 21 | 0 | 314 | 624 | 101% |
| Kosovo + North Macedonia (6 days) 🚏 | 6 | 189 | 270 | 8 | 30 | 0 | 308 | 497 | 163% |
| Kosovo + North Macedonia + Albania (9 days) 🎒 | 9 | 279 | 240 | 24 | 20 | 0 | 284 | 563 | 102% |

## Decisions for Youri
Car rule: `carInDailyRate` is false on every block in this batch, so every car is added.

**Mode overrides (the keyword guess said rental, the text names no car)** - priced as public transport:
- Serbia 6 days, Serbia + Bosnia, Ljubljana + Lake Bled 5 days, Kosovo 5 days, Kosovo + Albania + N. Macedonia, Kosovo + Montenegro + Albania. Evidence: no car/rental/drive wording; Serbia + Bosnia says "operator transfer or a rental car". If you want a car: Serbia 6 days would add about €260 (6 days × €35 + fuel 340 km + tolls), Bled about €230, Kosovo about €220.
- Kosovo + Montenegro + Albania: Peja-Plav/Gusinje-Zabljak has no real bus; the €35 is a shared-taxi chain estimate, low confidence (±€20).

**Car calls (rental days are pickup after the city days, drop at the airport/end city):**
- Serbia Roadtrip: 7 days × €35, 600 km (input), RS tolls 60% × €4/100 = €334.
- Germany + Austria + Slovenia (own car): in = 830 km DE fuel €127; in-route 720 km (AT 370, SI 340) fuel €89 + Tauern/Katschberg €22.5 + Karawanken €9 + AT 10-day vignette €12.80 + SI vignette €16 = €149; back = 1240 km fuel €179 + tolls on the way home €41 = €220 (SI/AT/DE split of the 1240 km is my estimate). The route text says "fly home from Ljubljana", which cannot be with an own car, so I priced the drive home. If wrong: swap €220 for a one-way fare, but then the car stays in Slovenia.
- Hungary + Austria + Slovenia: 7 days × €35 (HU rate), 630 km from the notes (250 + 380; the input's 700 is straight-line), one-way cross-border drop ≈€100 (est, flagged), vignettes HU 15.10 + AT 12.80 + SI 16 = €468.
- Julian Alps + Soca: 6 days × €45, 250 km (input 60 km is only the in-route straight line; I added airport legs), vignette 16 = €317. Plus Vogel cable car €22.5 (return price, kept whole because both ways are ridden) and one rafting/canyoning activity €65 (notes: €50-80 per activity). Both are not marked optional in the notes.
- Slovenia + Croatia + Bosnia: 10 days × €45, 1160 km (input 860 + Sarajevo-Dubrovnik ≈300 for the return the notes describe), drop Dubrovnik + Bosnia cross-border fee ≈€170 (est, flagged; some firms forbid Bosnia). Total €821, the most expensive car in the batch. Flight out of Dubrovnik (€110, reached via the Peljesac bridge); Split would be €100.
- Slovenia + Italy: 7 days × €45, 500 km, drop Venice ≈€80 (est) = €493.
- Slovenia + Northern Croatia: 7 days × €45, 410 km, drop Zagreb ≈€80 (est) = €478.
- Slovenia Alpine Loop: 5 days × €45, 300 km (input 170 is straight-line; loop plus airport legs), plus one rafting/canyoning €65 = €278 + €65.
- Slovenia Roadtrip: 7 days × €45, 450 km (input 230 is straight-line; coast loop), = €386.
- Rafting in Serbia + Bosnia: notes say ~€60/day for a 2-day stop; I priced one rafting day (€60). If both days: +€60.

**Flights:** only BUD (Budapest, out) is new: €120 (KLM nonstop typical; floors ignored). Everything else reuses flights_from_ams.csv. Every fare marked low there (LJU, SKP, PRN back etc.) stays low.

**Visas:** none (Schengen/EU, and visa-free 90 days for XK, ME, AL, MK, RS, BA per VISA_VACCINATION_RESEARCH.md).

**Not priced / left at 0:** Sarajevo and Pristina rafting/Via Ferrata/Rugova cable car (notes name no price), Venice access fee, city parking, Bohinj bus (optional day trip, no price in notes), Sarajevo-Mostar etc. small buses are estimates.

## Data problems in the route texts (reported, not fixed)
- Germany + Austria + Slovenia: transport_to_next on the last block says "fly home from Ljubljana" but the route is an own-car route.
- Input `km_in_route` is straight-line × 1.3: understates loops and airport legs on all single-region Slovenia routes (60 km for a 6-day Julian Alps trip), and Slovenia + Croatia + Bosnia omits the drive back to Dubrovnik.
- Slovenia + Croatia + Bosnia: text says "fly home from Split or Dubrovnik"; priced Dubrovnik.
- Julian Alps: block notes say "fly home from Ljubljana" while the stops are all in the mountains (no day for the return drive noted).
- Hungary + Austria + Slovenia: notes say "7-10 days", blocks sum to 9; Vienna note says Austria's border-control regime "currently running through 15 September 2026", already past on 2026-10-28.
- Kosovo + North Macedonia: ends in Ohrid but flight home is from Skopje; added the Ohrid-Skopje bus to local.
