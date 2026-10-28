// ---- Phase 4 batch 10: Alps & Germany 2/2, extracted 2026-10-28, approved by Youri (planning/budget_batch10/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch10.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km; DE fuel 2.179 = 0.1525 EUR/km, DE motorways free).
// Own car from NL: flight_in/out = the drive (fuel only, DE-only routes, no vignette).

  'gt_seed_zurich-lucerne-surroundings-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Zurich one way (SWISS/KLM direct; WebSearch 2026-10-28: Kayak EUR 142, Farecompare avg USD 144, Omio floor EUR 101)
    flight_out_cost: 140,  // Zurich-AMS one way (same fare level, est from out)
    blocks: [
      { code: 'CH', local: 60, extras: [    // Zurich-Lucerne train ~CHF 27 (est) + Lucerne-Zurich airport ~CHF 27 (est); Zurich airport-city covered by city transport in daily budget
        rbExtra('Pilatus Golden Round Trip (CHF 119.80, notes ~EUR 125; Rigi is the cheaper alternative, pick one)', 125, 'tour'),
      ] },
    ],
  },

  'gt_seed_bavaria-alps-berchtesgaden-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 127,   // own car NL->Munich ~830 km x 0.07 x 2.179 (DE, no tolls)
    flight_out_cost: 149,  // Berchtesgaden->NL ~980 km x 0.07 x 2.179
    blocks: [
      { code: 'DE', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈380 km in route (Munich-Garmisch-Fussen-Berchtesgaden loop) x 0.07 x 2.179; no tolls in DE', 58, 'transport'),
        rbExtra('Zugspitze cable car, full route (EUR 62 return; Eibsee-only EUR 47)', 62, 'activity'),   // notes (a return trip by nature)
        rbExtra('Neuschwanstein timed guided tour (EUR 17.50-21 midpoint)', 19, 'tour'),                  // notes
        rbExtra('Parking Hohenschwangau/Neuschwanstein ~EUR 8/day x 1 day', 8, 'park_fee'),               // notes
      ] },
      { code: 'DE', local: 0, extras: [
        rbExtra('Konigssee boat to St. Bartholoma (EUR 16.90 return; full route to Salet EUR 29.80)', 17, 'activity'),   // notes
        rbExtra('Parking near Konigssee EUR 5-8/day (midpoint 6.5) x 2 days', 13, 'park_fee'),             // notes
      ] },
    ],
  },

  'gt_seed_bavaria-munich-alps-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 127,   // own car NL->Munich ~830 km fuel
    flight_out_cost: 128,  // Munich->NL ~840 km fuel
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Car: fuel ≈150 km in route (Munich-Garmisch-Fussen) x 0.07 x 2.179; no tolls in DE', 23, 'transport'),
        rbExtra('Zugspitze cable car, full route (EUR 62 return; Eibsee-only EUR 47)', 62, 'activity'),   // notes
        rbExtra('Neuschwanstein timed guided tour (EUR 17.50-21 midpoint)', 19, 'tour'),                  // notes
        rbExtra('Parking Hohenschwangau/Neuschwanstein ~EUR 8/day x 1 day', 8, 'park_fee'),               // notes
      ] },
    ],
  },

  'gt_seed_berlin-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 60,    // direct ICE NL-Berlin, typical advance fare (notes "from EUR 38" is the promo floor; est typical, low confidence)
    flight_out_cost: 60,   // ICE Berlin-NL, same
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Museum Island day pass', 24, 'activity'),   // notes
      ] },
    ],
  },

  'gt_seed_black-forest-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 98,    // own car NL->Freiburg ~640 km fuel
    flight_out_cost: 85,   // Baden-Baden->NL ~560 km fuel
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Car: fuel ≈160 km in route (Freiburg-Titisee-Triberg-Baden-Baden) x 0.07 x 2.179; no tolls in DE', 24, 'transport'),
        rbExtra('Baden-Baden spa: Caracalla (EUR 21 2h-35 day pass, midpoint 28; Friedrichsbad EUR 36 is the alternative)', 28, 'activity'),   // notes, choice of two
      ] },
    ],
  },

  'gt_seed_cologne-bonn-rhine-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 35,    // own car NL->Cologne ~230 km fuel (no toll, per notes)
    flight_out_cost: 56,   // Loreley/Rudesheim->NL ~370 km fuel
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Car: fuel ≈200 km in route (Cologne-Bonn-Middle Rhine) x 0.07 x 2.179; no tolls in DE', 31, 'transport'),
      ] },   // cathedral ticket, KD cruise, parking: notes give no price, not added
    ],
  },

  'gt_seed_dresden-saxon-switzerland-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 121,   // own car NL->Dresden ~790 km fuel
    flight_out_cost: 125,  // Dresden->NL ~820 km fuel
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Car: fuel ≈30 km in route (Dresden-Saxon Switzerland trailheads) x 0.07 x 2.179; no tolls in DE', 5, 'transport'),
        rbExtra('Frauenkirche dome climb', 12, 'activity'),   // notes
      ] },
    ],
  },

  'gt_seed_german-alpine-road-deutsche-alpenstrae-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 119,   // own car NL->Lindau ~780 km fuel
    flight_out_cost: 149,  // Berchtesgaden->NL ~980 km fuel
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Car: fuel ≈340 km in route (Lindau-Fussen-Garmisch-Chiemsee-Berchtesgaden) x 0.07 x 2.179; no tolls in DE', 52, 'transport'),
        rbExtra('Zugspitze cable car, full route (price from the Bavaria routes notes)', 62, 'activity'),
        rbExtra('Neuschwanstein timed guided tour (EUR 17.50-21 midpoint, from the Bavaria routes notes)', 19, 'tour'),
        rbExtra('Konigssee boat to St. Bartholoma (EUR 16.90 return, from the Bavaria routes notes)', 17, 'activity'),
        rbExtra('Parking Hohenschwangau/Neuschwanstein ~EUR 8/day x 1 day', 8, 'park_fee'),   // notes
        rbExtra('Parking Konigssee EUR 5-8/day (midpoint 6.5) x 1 day', 7, 'park_fee'),        // notes
      ] },
    ],
  },

  'gt_seed_germany-berlin-dresden-bavaria-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 60,    // direct ICE NL-Berlin typical advance fare (est)
    flight_out_cost: 120,  // Munich-AMS one way (WebSearch 2026-10-28: Expedia USD 121 / GBP 89 floors, Ratepunk median USD 199; typical ~120)
    blocks: [
      { code: 'DE', transport: 25, local: 0, extras: [   // ICE Berlin-Dresden ~2h, ~EUR 25 advance (est)
        rbExtra('Museum Island day pass (Berlin)', 24, 'activity'),   // notes (Berlin route)
      ] },
      { code: 'DE', transport: 45, local: 0, extras: [   // Dresden-Munich train 4-4.5h, ~EUR 45 advance (est)
        rbExtra('Frauenkirche dome climb', 12, 'activity'),   // notes (Dresden route)
      ] },
      { code: 'DE', local: 40, extras: [   // Munich-Garmisch + Munich-Fussen regional trains (est)
        rbExtra('Neuschwanstein timed guided tour (EUR 17.50-21 midpoint)', 19, 'tour'),
        rbExtra('Zugspitze cable car, full route (EUR 62; notes say skip if time is tight)', 62, 'activity', true),
      ] },
    ],
  },

  'gt_seed_hamburg-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 72,    // own car NL->Hamburg ~470 km fuel
    flight_out_cost: 84,   // Hamburg->NL ~550 km fuel
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Car: fuel ≈70 km in route x 0.07 x 2.179; no tolls in DE', 11, 'transport'),
      ] },   // Elbphilharmonie plaza free/EUR 3, Miniatur Wunderland: no price in notes
    ],
  },

  'gt_seed_moselle-valley-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 55,    // own car NL->Trier ~360 km fuel
    flight_out_cost: 53,   // Burg Eltz/Cochem->NL ~350 km fuel
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Car: fuel ≈100 km in route (Trier-Bernkastel-Cochem-Burg Eltz) x 0.07 x 2.179; no tolls in DE', 15, 'transport'),
        rbExtra('Burg Eltz: parking EUR 4/car + shuttle EUR 2 p.p. (cash)', 6, 'park_fee'),   // notes
      ] },
    ],
  },

  'gt_seed_rhine-moselle-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 35,    // own car NL->Cologne ~230 km fuel
    flight_out_cost: 55,   // Trier->NL ~360 km fuel
    blocks: [
      { code: 'DE', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈360 km in route (Cologne-Rhine-Koblenz-Moselle-Trier) x 0.07 x 2.179; no tolls in DE', 55, 'transport'),
      ] },
      { code: 'DE', local: 0, extras: [] },   // Burg Eltz costs only "if that detour is added": not added
    ],
  },

  'gt_seed_romantic-road-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 84,    // own car NL->Wurzburg ~550 km fuel
    flight_out_cost: 127,  // Fussen->NL ~830 km fuel
    blocks: [
      { code: 'DE', local: 0, extras: [
        rbExtra('Car: fuel ≈340 km in route (Wurzburg-Rothenburg-Nordlingen-Augsburg-Fussen) x 0.07 x 2.179; no tolls in DE', 52, 'transport'),
      ] },
    ],
  },

  'gt_seed_dolomites-north-italy': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Venice one way (flights_from_ams.csv, VCE out)
    flight_out_cost: 80,   // Venice-AMS one way (flights_from_ams.csv, VCE back)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 17 days (Venice airport pickup, dropped on arrival in Venice, no drop fee) × €45 + fuel ≈1580 km (notes: 150+410+140+260+140+180+300) × 0.07 × 2.016 + tolls (60% of km × €8/100 km)', 1064, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'SM', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },   // Venice car-free; car already returned
    ],
  },

  'gt_seed_liechtenstein-vaduz-2-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Zurich one way (WebSearch 2026-10-28, see Zurich route)
    flight_out_cost: 140,  // Zurich-AMS one way
    blocks: [
      { code: 'LI', local: 85, extras: [   // 2 x (train Zurich-Sargans ~CHF 33 = EUR 35 + LIEmobil bus ~CHF 7 = EUR 7.5) (notes + est)
        rbExtra('Passport stamp souvenir (CHF 3)', 3, 'other'),   // notes
      ] },
    ],
  },
