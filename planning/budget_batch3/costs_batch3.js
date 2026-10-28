// ---- Phase 4 batch 3: Italy, San Marino & Malta part 2/3, extracted 2026-10-28, approved by Youri (planning/budget_batch3/REVIEW.md) ----
// Fares: data/cost_reference/flights_from_ams.csv + planning/budget_batch2/flights_batch2.csv + flights_batch3.csv.
// Car: car_costs_by_country.csv IT: 7 L/100 km x 2.016 = 0.141 EUR/km fuel; tolls 60% of km x 8/100 km = 0.048 EUR/km; rental 45/day.

  'gt_seed_northern-italy-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Milan Malpensa (batch 2 fare)
    flight_out_cost: 100,  // Malpensa-AMS (reuse out fare; est)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Milan day 1, car picked up when leaving
        rbExtra('Car: rental 5 days (after the Milan day) × €45 + fuel/tolls ≈300 km (0.189/km); notes say rental is on top of the daily budget', 282, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_northern-italy-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Milan Malpensa (batch 2)
    flight_out_cost: 80,   // Venice-AMS: easyJet/KLM typical (WebSearch 2026-10-28; floors EUR 31-33, USD 54-100)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Milan 2d, car from Como onward
        rbExtra('Car: rental 6 days (Como to Venice, dropped at Venice) × €45 + one-way drop ≈€60 (est, flagged) + fuel/tolls ≈690 km (0.189/km)', 460, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },     // car drives to Venice, dropped at Mestre
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_puglia-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Bari: Skyscanner floor 80, Expedia USD 103, typical higher (WebSearch 2026-10-28; est)
    flight_out_cost: 90,   // Bari-AMS (batch 2 fare)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 5 days (after the Bari day) × €45 + fuel/tolls ≈250 km (0.189/km; Puglia roads mostly free, so slightly high)', 272, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_rome-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Rome FCO: Expedia EUR 129 / USD 119-141 / Kayak GBP 116 (WebSearch 2026-10-28)
    flight_out_cost: 100,  // FCO-AMS (batch 2 fare)
    blocks: [
      { code: 'IT', local: 0, extras: [] },                    // city trip, no car (notes), no priced extras
    ],
  },

  'gt_seed_rome-tuscany-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Rome FCO (see rome-4-days)
    flight_out_cost: 100,  // Rome FCO-AMS (notes: fly home via Rome)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Rome 3d no car; car picked up after Rome
        rbExtra('Car: rental 6 days (after Rome, dropped in Florence) × €45 + one-way drop ≈€50 (est, flagged) + fuel/tolls ≈430 km (0.189/km)', 401, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 45, extras: [] },                   // Florence-Rome Fiumicino train home ≈€30 + Leonardo Express €14 (est)
    ],
  },

  'gt_seed_rome-vatican-city-in-depth-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Rome FCO
    flight_out_cost: 100,  // FCO-AMS
    blocks: [
      { code: 'IT', local: 0, extras: [
        rbExtra('Vatican day: Necropolis/Scavi + Vatican Museums + dome climb', 75, 'tour'),   // notes: "extra ~€60-90 for the three extras together", midpoint
        rbExtra('Vatican Gardens guided tour (optional)', 36, 'tour', true),                  // notes: €32-40, midpoint
      ] },
    ],
  },

  'gt_seed_san-marino-emilia-romagna-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Bologna: Expedia EUR 136 / USD 135 floors, KLM USD 201 (WebSearch 2026-10-28)
    flight_out_cost: 120,  // Bologna-AMS (est, same as in; Lufthansa USD 143)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 3 days (after the Bologna day) × €45 + fuel/tolls ≈150 km IT (0.189/km) + ≈20 km SM fuel', 166, 'transport'),
      ] },
      { code: 'SM', local: 0, extras: [
        rbExtra('San Marino towers/museum add-on', 12.5, 'activity'),   // notes ~€10-15, midpoint
        rbExtra('San Marino parking', 6, 'other'),                      // notes: €4.50 (3-5h) to €8 (full day); half-to-1 day, midpoint
      ] },
    ],
  },

  'gt_seed_san-marino-tuscany-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Bologna (see above)
    flight_out_cost: 130,  // Florence-AMS (batch 2 fare; open-jaw)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Bologna day without car; rental picked up when leaving
        rbExtra('Car: rental 4 days (Bologna to Florence) × €45 + one-way drop ≈€100 (notes €50-150, midpoint) + fuel/tolls ≈365 km incl. Bologna-San Marino (0.189/km)', 349, 'transport'),
      ] },
      { code: 'SM', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_sardinia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Olbia (reuse back fare; seasonal; est)
    flight_out_cost: 130,  // Olbia-AMS (batch 2 fare)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 9 days × €45 + fuel ≈550 km (Sardinia has almost no tolls, so none added)', 483, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_sardinia-north-4-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Olbia (see above)
    flight_out_cost: 130,  // Olbia-AMS (batch 2)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 5 days × €45 + fuel ≈120 km (est; straight-line 50 km too low: Olbia-Palau-Costa Smeralda and back)', 242, 'transport'),
      ] },
      { code: 'IT', transport: 16, local: 0, extras: [] },    // Palau-La Maddalena foot ferry, there and back (WebSearch Ferryscanner: EUR 8-10.50 each way, est 8)
      { code: 'IT', local: 0, extras: [
        rbExtra('La Maddalena archipelago boat trip', 55, 'tour'),   // notes name no price; typical day tour ~€50-60 (est)
      ] },
    ],
  },

  'gt_seed_sardinia-roadtrip-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Cagliari: Skyscanner floor 88, Expedia USD 133-149, mostly connecting (WebSearch 2026-10-28)
    flight_out_cost: 130,  // Olbia-AMS (batch 2); route ends in Olbia
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Cagliari 2d without car
        rbExtra('Car: rental 7 days (after Cagliari) × €45 + one-way drop Cagliari→Olbia ≈€60 (est, flagged) + fuel ≈470 km (no Sardinian tolls)', 441, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 16, local: 0, extras: [] },    // Palau-La Maddalena foot ferry both ways (est 8 each)
      { code: 'IT', local: 0, extras: [
        rbExtra('La Maddalena archipelago boat trip', 55, 'tour'),   // est (see sardinia-north)
      ] },
    ],
  },

  'gt_seed_sardinia-south-4-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Cagliari
    flight_out_cost: 120,  // Cagliari-AMS (est, slightly below out)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Cagliari 2d on foot, car after
        rbExtra('Car: rental 3 days (after Cagliari) × €45 + fuel ≈110 km (est; Nora, Chia, back)', 151, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },
