# Phase 4 batch 26 review: South America, Patagonia & West/Central Africa

Priced 2026-10-29. No web searches: all new fares are estimates (low confidence, in `flights_batch26.csv`).
Existing airport rows reused: PMC out, USH back, VXE out, LBV back. USD to EUR at 0.87. No car on any route.
Optional extras (Uruguay estancia, wine tour) are NOT in the totals below.

## (a) Totals per route (EUR, per person, one way each)

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Antarctica Cruise | 11 | 9500 | 2200 | 0 | 0 | 0 | 2200 | 11700 | 23% |
| Argentine Patagonia | 18 | 1138 | 2100 | 100 | 60 | 0 | 2260 | 3398 | 199% |
| Chilean Patagonia | 24 | 1551 | 1700 | 130 | 185 | 0 | 2015 | 3566 | 130% |
| Patagonia Overland | 42 | 2689 | 1900 | 190 | 245 | 0 | 2335 | 5024 | 87% |
| West Africa Overland | 67 | 2814 | 800 | 617 | 218 | 447 | 2082 | 4896 | 74% |
| Guyana | 9 | 558 | 1250 | 0 | 230 | 1490 | 2970 | 3528 | 532% |
| Peru + Bolivia (20 days) | 20 | 624 | 1200 | 274 | 15 | 235 | 1724 | 2348 | 276% |
| Senegambia | 19 | 816 | 670 | 15 | 60 | 17 | 762 | 1578 | 93% |
| Central Africa & Islands | 26 | 1315 | 1180 | 586 | 146 | 902 | 2814 | 4129 | 214% |
| Uruguay | 10 | 570 | 1080 | 0 | 70 | 0 | 1150 | 1720 | 202% |

## (b) Decisions for Youri

1. **Guyana lodges (+1,200).** The notes say the interior is sold as all-inclusive lodge packages (EUR 230-370/day) "as separate line items". I assumed 4 lodge days (Iwokrama/Atta 2 + Karanambu 2) at EUR 300, plus Kaieteur EUR 290 (midpoint of 250-330). The ground budget (EUR 62/day) also still covers those 4 days, so there is some double counting. Fewer lodge days: -300 each. Also `local` 230 = Georgetown-Rupununi bush flights (est USD 130 each way); if the packages include the flights, set it to 0.
2. **Central Africa: Loango (+522) and flights.** Notes give "USD 100-300+/day"; I took USD 200 x 3 days (my call, transfers assumed inside). Douala-Sao Tome (330) and Sao Tome-Libreville (250) are thin-route estimates, low confidence and could be +-100 each. Visa fees: Cameroon 190 (notes). Sao Tome 75 and Gabon 115 are NOT in the VISA file: my estimates.
3. **West Africa: Banjul-Abidjan flight (330, est).** The route text lists Gambia-Ivory Coast as a flight, but Gambia's `transport_to_next` text says "End of this route" (see c). Cape Verde to Dakar is priced as Fogo-Praia 60 + Praia-Dakar 170 (est). Visa extras total 447 (CV 35, CI 73, GH 226, TG 38, BJ 75): Ghana's e-visa (~USD 260) is the big one. Gambia airport security fee (USD 20, named only in the Senegambia notes) is not added here, since this route's notes don't mention it (+17 if you want it).
4. **Chile Chico to El Calafate to Puerto Natales (130 / 95 / 30).** Priced as the route text says: Ruta 40 bus Los Antiguos-El Calafate ~90 (est, long rough ride) + El Calafate-Puerto Natales ~30. If wrong, +-40.
5. **Patagonia in the Argentine-only route.** I priced El Calafate-Ushuaia as a flight (100, est) because the text's "overland to Torres del Paine" does not fit (see c). Bus alternative would be far longer.
6. **Peru + Bolivia.** Machu Picchu train priced at Expedition class (USD 72 per notes, EUR 63); Vistadome would be +37 each way. Entrance EUR 48 (USD 55 per notes). The shuttle bus Aguas Calientes-Machu Picchu (~USD 12 each way) and the Boleto Turistico are not in the notes, so NOT added (+~20 if wanted). Uyuni jeep tour USD 215 midpoint = 187.
7. **Flights.** Long-haul one-ways are estimates from the notes' return ranges (halved plus a one-way premium), notably FTE 1000, USH out 1100, PUQ back 900, LPB back 650. Antarctica adds 2,200 in flights to a 9,500 cruise (the cruise "IS the rate", nothing else added).
8. **Uruguay optional extras** (estancia 172, wine tour 68) flagged optional, excluded from the totals.
9. **Not added (no price in notes):** Torres del Paine / Perito Moreno park fees, Marble Caves boat, Cabo Polonio 4x4 transfer, Isla Magdalena boat, Uros/Taquile boats, Isla del Sol boat, Gorée ferry. Together roughly +150-250 on the Patagonia/Uruguay/Peru routes. Ground budgets stay untouched (e.g. Torres del Paine refugios of USD 100-150/night vs EUR 69/day is the notes' own warning).

## (c) Data problems in the route text (reported, not fixed)

- **Argentine Patagonia, block 0** `transport_to_next`: "Overland via the Cancha Carrera border crossing straight to Torres del Paine". This is a leftover from the Patagonia Overland parent: the standalone route has no Chilean block, the next stop is Ushuaia (Tierra del Fuego).
- **Argentine Patagonia, block 1** `transport_to_next`: "flight Ushuaia-Buenos Aires, then a return flight" is the end of route; fine as flight_out, but it sits in a `transport_to_next` field of the last block.
- **West Africa Overland, block 2 (Gambia)** `transport_to_next`: "End of this route - return flight from Banjul (or flight to Abidjan...)": the route continues to Ivory Coast, so it reads like a leftover from the Senegambia split.
- **West Africa Overland, block 6 (Benin)**: mentions flight Cotonou-Douala to continue to Central Africa; not priced (route ends in Cotonou, flight home).
- **Chilean Patagonia / Patagonia Overland, block 0**: the text sends you into Argentina (El Calafate) before returning to Puerto Natales; in the Chilean-only route this requires crossing back into Chile at Cancha Carrera. Not mentioned in its own notes.
- **Chilean Patagonia notes** say "domestic connection to Puerto Montt (+-19-21 hours total)" vs Patagonia Overland "+-14-16 hours": inconsistent for the same flight.
- **Central Africa, block 1 (Sao Tome)**: notes say it falls in the rainy season (Oct-May) while the entry best period is Jan-Feb: not an error, just a tight season note.
- **Peru + Bolivia**: the Cusco block's `transport_to_next` ("Car/bus to the Sacred Valley") and the Machu Picchu block's "train back to Cusco (the buffer day happens here)" are fine; but the La Paz block notes carry an expired state-of-emergency date (Sept 2026) already in the past.
