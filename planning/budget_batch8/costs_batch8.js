// ---- Phase 4 batch 8: France & Benelux 2/2, extracted 2026-10-28, approved by Youri (planning/budget_batch8/REVIEW.md) ----
// Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km; FR 2.229, BE 1.989, NL 2.391, LU 1.788 EUR/l; FR toll 60% of km x 9/100 km; BE/LU/NL free).
// Own-car NL legs: NL 80 km + BE 190 km (Antwerp/Brussels/Lille corridor) then the remaining km in the destination country (est splits).
// Fares: flights_from_ams.csv + flights_batch8.csv.

  'gt_seed_french-atlantic-coast-la-rochelle-to-biarritz-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 187,   // own car NL-La Rochelle ~970 km (notes): fuel ~149 (NL80/BE190/FR700) + FR tolls 700x60%x9/100=38
    flight_out_cost: 281,  // Biarritz-NL ~1420 km (input; fuel ~219 NL80/BE190/FR1150 + tolls 62). Notes say ~250-300 TOTAL tolls round trip; formula gives ~125 (see REVIEW)
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈460 km in route + tolls (60% of km × €9/100 km), own car', 97, 'transport'),
      ] },
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Bordeaux garage parking 3 days × ~€25 (notes €20-30/day; est)', 75, 'other'),
      ] },
      { code: 'FR', transport: 0, local: 0, extras: [] },
      { code: 'FR', local: 0, extras: [] },
    ],
  },

  'gt_seed_loire-valley-castles-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 146,   // own car NL-Amboise ~620 km (notes 590-650): fuel ~94 + tolls ~52 (notes €45-60 one way, midpoint)
    flight_out_cost: 151,  // Blois-NL ~650 km est: fuel ~99 + tolls ~52 (same notes figure)
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈230 km in route + tolls (60% of km × €9/100 km), own car', 48, 'transport'),
        rbExtra('Castle entries, 3-4 castles (notes €50-70 pp, midpoint)', 60, 'activity'),
      ] },
      { code: 'FR', local: 0, extras: [] },
    ],
  },

  'gt_seed_monaco-cote-dazur-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Nice one way (WebSearch 2026-10-28; typical between budget floors and KLM)
    flight_out_cost: 90,   // Nice-AMS one way (WebSearch 2026-10-28)
    blocks: [
      { code: 'FR', transport: 6, local: 15, extras: [] },   // train Nice-Monaco €4-8 (notes, midpoint); local: coastal train/bus day trips Eze/Villefranche/Menton/Cannes (est)
      { code: 'MC', local: 6, extras: [                      // train back Monaco-Nice (same price)
        rbExtra('Casino de Monte-Carlo entry (18+, ID)', 20, 'activity'),
        rbExtra('Oceanographic Museum (~€10 per notes, check 2026 price)', 10, 'activity'),
      ] },
    ],
  },

  'gt_seed_monaco-nice-provence-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Nice
    flight_out_cost: 90,   // Nice-AMS (route returns to Nice)
    blocks: [
      { code: 'FR', transport: 6, local: 0, extras: [] },     // train Nice-Monaco (~€4-8, as in the 4-day route)
      { code: 'MC', transport: 0, local: 6, extras: [         // train back Monaco-Nice
        rbExtra('Car: rental 3 days (Provence days 3-5, pickup Nice) × €48 + fuel ≈500 km + tolls (60% of km × €9/100 km); returns to Nice, no drop fee', 249, 'transport'),
        rbExtra('Casino de Monte-Carlo entry (18+, ID)', 20, 'activity'),
        rbExtra('Oceanographic Museum (~€10 per notes, check 2026 price)', 10, 'activity'),
      ] },
      { code: 'FR', local: 0, extras: [] },
    ],
  },

  'gt_seed_monaco-monte-carlo-2-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Nice
    flight_out_cost: 90,   // Nice-AMS
    blocks: [
      { code: 'FR', transport: 6, local: 0, extras: [] },     // train Nice-Monaco (€4-8 per sister routes)
      { code: 'MC', local: 6, extras: [                       // train back to Nice
        rbExtra('Casino de Monte-Carlo entry (18+, ID)', 20, 'activity'),
        rbExtra('Oceanographic Museum (~€10 per sister route notes)', 10, 'activity'),
      ] },
    ],
  },

  'gt_seed_normandy-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 152,   // own car NL-Honfleur ~700 km (notes: Amsterdam-Bayeux ~697): fuel ~107 + tolls ~45 (notes €35-55 one way)
    flight_out_cost: 180,  // Mont-Saint-Michel-NL ~880 km est (not in notes; input says 790): fuel ~135 + tolls ~45 (est same as in)
    blocks: [
      { code: 'FR', local: 0, extras: [
        rbExtra('Car: fuel ≈260 km in route + tolls (60% of km × €9/100 km), own car', 55, 'transport'),
        rbExtra('Guided D-Day tour (notes €93 half-day / €168 full day, midpoint; tour is redundant with own car, see REVIEW)', 131, 'tour'),
        rbExtra('Mont Saint-Michel parking (notes €6.80-9.80, midpoint)', 8, 'park_fee'),
        rbExtra('Mont Saint-Michel abbey entry (notes €13-16, midpoint)', 15, 'activity'),
      ] },
    ],
  },

  'gt_seed_paris-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 80,    // train AMS-Paris Nord one way (notes: from €35, often €55-135; typical booked ahead ~80, est)
    flight_out_cost: 80,   // train Paris-AMS (same)
    blocks: [
      { code: 'FR', local: 0, extras: [
        rbExtra('Louvre (notes €22-32, midpoint)', 27, 'activity'),
        rbExtra('Eiffel Tower (notes €14.80-36.70, midpoint)', 26, 'activity'),
      ] },
    ],
  },

  'gt_seed_provence-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 248,   // own car NL-Avignon ~1090 km (notes): fuel ~168 (NL80/BE190/FR820) + tolls ~80 (notes €70-90 one way)
    flight_out_cost: 267,  // Arles-NL ~1180 km est: fuel ~182 + tolls ~85
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈220 km in route + tolls (60% of km × €9/100 km), own car', 46, 'transport'),
        rbExtra('Hill-village parking (Gordes €4/day + Les Baux ~€5 first hour/meter, notes)', 9, 'other'),
      ] },
      { code: 'FR', local: 0, extras: [
        rbExtra('Carrières des Lumières (notes €16-17, midpoint)', 17, 'activity'),
        rbExtra('Camargue boat/horseback trip (notes €25-40, midpoint)', 33, 'tour'),
      ] },
    ],
  },

  'gt_seed_south-of-france-provence-to-cote-dazur-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 277,   // own car NL-Avignon ~1150 km (notes): fuel ~177 + tolls ~100 (notes €90-110)
    flight_out_cost: 346,  // Nice-NL ~1410 km est: fuel ~218 + tolls ~128 (Nice-Avignon 27.5 + Avignon-NL 100, notes)
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈460 km in route + A8 tolls Avignon-Nice ~€27.5 (notes €25-30), own car', 100, 'transport'),
      ] },
      { code: 'FR', transport: 0, local: 0, extras: [] },
      { code: 'FR', local: 0, extras: [
        rbExtra('Nice city-centre garage parking 3 days × ~€29.5 (notes €24-35/day; est)', 89, 'other'),
      ] },
    ],
  },

  'gt_seed_luxembourg-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 53,    // own car NL-Luxembourg ~370 km (input; NL100/BE180/LU90), fuel only (BE/LU free)
    flight_out_cost: 47,   // Luxembourg-NL ~330 km (input), fuel only
    blocks: [
      { code: 'LU', local: 0, extras: [
        rbExtra('Car: fuel ≈70 km in route, own car', 9, 'transport'),
        rbExtra('Bock Casemates (notes €11)', 11, 'activity'),
        rbExtra('Vianden castle (notes €11-13, midpoint)', 12, 'activity'),
      ] },
    ],
  },

  'gt_seed_luxembourg-ardennes-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 46,    // own car NL-Bastogne ~310 km (input), fuel only
    flight_out_cost: 51,   // Vianden-NL ~350 km via Belgium (input), fuel only
    blocks: [
      { code: 'BE', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈140 km in route, own car', 18, 'transport'),
        rbExtra('Bastogne War Museum (notes €22)', 22, 'activity'),
        rbExtra('Bastogne parking (notes €7.50)', 8, 'park_fee'),
      ] },
      { code: 'LU', local: 0, extras: [
        rbExtra('Vianden castle (notes €11-13 on sister route, midpoint)', 12, 'activity'),
      ] },
    ],
  },

  'gt_seed_south-netherlands-belgian-ardennes-luxembourg-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 32,    // own car NL-Maastricht ~190 km (input), fuel only
    flight_out_cost: 54,   // Vianden-NL ~370 km (input), fuel only
    blocks: [
      { code: 'NL', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈230 km in route (NL/BE/LU), own car', 30, 'transport'),
        rbExtra('Sint-Pietersberg caves guided tour (notes ~€9.95)', 10, 'tour'),
      ] },
      { code: 'BE', transport: 0, local: 0, extras: [] },
      { code: 'LU', local: 0, extras: [] },
    ],
  },
