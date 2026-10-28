// Phase 4 batch 2 (Italy, San Marino & Malta), extracted 2026-10-28. NOT yet in RB_ROUTE_COSTS:
// waiting for Youri's review (REVIEW.md). Entries go into RB_ROUTE_COSTS as-is once approved/edited.
// Fares: flights_from_ams.csv + flights_batch2.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km).

  'gt_seed_campania-puglia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Naples one way (easyJet/Transavia/ITA typical; WebSearch 2026-10-28)
    flight_out_cost: 90,   // Bari-AMS one way (Expedia/Ratepunk USD 64-76 floors, typical higher; est)
    blocks: [
      { code: 'IT', transport: 5, local: 0, extras: [] },       // Circumvesuviana Naples-Sorrento (~4.5, est)
      { code: 'IT', transport: 0, local: 30, extras: [          // Sorrento-Positano-Amalfi ferry/SITA bus + Salerno transfer to car pickup (est)
        rbExtra('Car: rental 5 days (from Salerno after Amalfi) × €45 + one-way drop Bari ≈€70 (est) + fuel ≈560 km + tolls (60% of km × €8/100 km)', 401, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_campania-naples-amalfi-coast-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Naples (as above)
    flight_out_cost: 100,  // Naples-AMS one way (WebSearch 2026-10-28; Skyscanner/Expedia floors 62-90, typical ~100)
    blocks: [
      { code: 'IT', transport: 5, local: 0, extras: [] },       // Circumvesuviana Naples-Sorrento (~4.5, est)
      { code: 'IT', transport: 22, local: 50, extras: [] },     // ferry Sorrento-Capri ~22 (est); Amalfi Coast bus/ferry hops Sorrento-Positano-Amalfi-Ravello (est)
      { code: 'IT', local: 24, extras: [] },                    // ferry Capri-Naples back to the airport (~24, est)
    ],
  },

  'gt_seed_corsica-sardinia-south-corsica-north-sardinia-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 200,   // AMS-Figari one-way, 1 stop via Paris/Geneva/Basel (Farecompare avg USD 167, floors USD 208-290; est)
    flight_out_cost: 130,  // Olbia-AMS direct, seasonal Aug-Oct (Omio easyJet GBP 119 / Transavia GBP 160; est)
    blocks: [
      { code: 'FR', transport: 40, local: 0, extras: [          // Bonifacio-Santa Teresa ferry, foot passenger (Directferries avg €37, AFerry €43-84)
        rbExtra('Car: Corsica rental 2 days × €48 + fuel ≈80 km (no tolls)', 109, 'transport'),
      ] },
      { code: 'IT', local: 0, extras: [
        rbExtra('Car: Sardinia rental 3 days × €45 + one-way drop Olbia ≈€30 (est) + fuel ≈110 km', 181, 'transport'),
      ] },
    ],
  },

  'gt_seed_dolomites-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Innsbruck one way (Transavia direct, seasonal; Skyscanner floor €84, typical higher; est)
    flight_out_cost: 100,  // Innsbruck-AMS one way (Expedia floor USD 74; est)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 6 days × €45 + fuel ≈460 km (INN-Ortisei, loop, Cortina-INN) + tolls A13 Brenner/A22 ≈€40 (est)', 374, 'transport'),
        rbExtra('Lift passes Val Gardena/Alpe di Siusi, 2 days × €17.50 (notes: €10-25/day)', 35, 'activity'),
      ] },
      { code: 'IT', local: 0, extras: [
        rbExtra('Lift passes Cortina area, 2 days × €17.50 (notes: €10-25/day)', 35, 'activity'),
      ] },
    ],
  },

  'gt_seed_florence-tuscany-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Florence one way (KLM/ITA/Vueling; Expedia/Skyscanner floors USD 136-168; est)
    flight_out_cost: 130,  // Florence-AMS one way (est)
    blocks: [
      { code: 'IT', local: 0, extras: [
        rbExtra('Car: one-day rental × €45 + fuel ≈200 km + tolls (60% × €8/100 km) for the Siena-Chianti-San Gimignano-Pisa day (notes say €20-30 "car/day tour")', 83, 'transport'),
      ] },
    ],
  },

  'gt_seed_france-switzerland-italy-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 190,   // drive NL-Chamonix ~910 km via BE/LU/FR: fuel ≈142 (7 L/100 × ~€2.2) + FR tolls ≈48 (80% motorway × €9/100 km)
    flight_out_cost: 163,  // drive Milan-NL ~1030 km via Gotthard/DE: fuel ≈159 + Italian tolls ≈4; Swiss vignette already counted in route
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈520 km (FR 10/CH 270/IT 250) + Swiss vignette €43.28 + Italian autostrade ≈€30 (notes: €20-40)', 154, 'transport'),
        rbExtra('Aiguille du Midi cable car (notes: ~€75-80 return; optional splurge)', 77.5, 'activity', true),
      ] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'CH', transport: 0, local: 18, extras: [] },      // Täsch-Zermatt shuttle train return (~CHF 8.50 each way, est; notes mention car-free Zermatt, no price)
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_germany-austria-italy-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 128,   // drive NL-Munich ~830 km, German Autobahn, fuel only
    flight_out_cost: 193,  // drive Verona-NL ~1110 km via Brenner: fuel ≈163 + IT tolls ≈18 + A13 Brenner ≈€11.5
    blocks: [
      { code: 'DE', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈670 km (DE 140/AT 80/IT 450) + Austrian vignette €12.80 (notes) + A13 Brenner toll ≈€11.5 (est) + Italian autostrade (60% × €8/100 km)', 141, 'transport'),
      ] },
      { code: 'DE', transport: 0, local: 0, extras: [] },
      { code: 'AT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_grand-european-roadtrip-14-21-days': {
    checked: '2026-10-28',
    flight_in_cost: 61,    // drive NL-Rüdesheim ~400 km, fuel only
    flight_out_cost: 143,  // drive Prague-NL ~890 km: fuel ≈134 + new CZ vignette €9.44 (1-day from route is expired)
    blocks: [
      { code: 'DE', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈3450 km (DE/AT/CH/IT/SI/HR/HU/CZ) ≈€470 + vignettes AT 12.80, CH 43.28, SI 16, HU 15.10, CZ 9.44, SK 8.10 (Budapest-Prague transit, est) + IT/HR motorway tolls ≈€47', 622, 'transport'),
      ] },
      { code: 'AT', transport: 0, local: 0, extras: [] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'SI', transport: 0, local: 0, extras: [] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'HU', transport: 0, local: 0, extras: [] },
      { code: 'CZ', local: 0, extras: [] },
    ],
  },

  'gt_seed_italy-roadtrip-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Milan Malpensa one way (easyJet/KLM; Skyscanner floor €63; est)
    flight_out_cost: 100,  // Naples-AMS (as route 2)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 12 days × €45 + one-way drop Naples ≈€100 (est) + fuel ≈1320 km + tolls ≈€70 (notes: Milan-Rome €44.50 + Rome-Naples €13.50; Turin-Milan est)', 896, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_italy-north-to-central-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Milan Malpensa (as above)
    flight_out_cost: 100,  // Rome FCO-AMS one way (Expedia €78 floor; est)
    blocks: [
      { code: 'IT', transport: 18, local: 0, extras: [          // train Verona-Bologna (est)
        rbExtra('Car: lakes leg, rental 3 days × €45 + one-way drop Verona ≈€40 (est) + fuel ≈330 km + tolls (60% × €8/100 km)', 238, 'transport'),
      ] },
      { code: 'IT', transport: 20, local: 0, extras: [] },      // HS train Bologna-Florence (est)
      { code: 'IT', transport: 10, local: 0, extras: [] },      // bus/train Florence-Siena (est)
      { code: 'IT', transport: 30, local: 10, extras: [] },     // Siena-Rome train via Chiusi (est); local bus Siena-Pienza (est)
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_malta-gozo-sicily-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Catania one way (Expedia USD 109-190; est)
    flight_out_cost: 120,  // Malta-AMS one way (KM Malta €87-113 floors, typical higher; est)
    blocks: [
      { code: 'IT', transport: 55, local: 0, extras: [] },      // Ryanair/KM Catania-Malta (est, no fare found); Virtu ferry foot pax €70-110 alt. Sicily car is in the daily rate -> nothing
      { code: 'MT', local: 0, extras: [] },                     // Cirkewwa-Mgarr Gozo ferry (~€4.65 return) not added: notes say folded into Malta days
    ],
  },
