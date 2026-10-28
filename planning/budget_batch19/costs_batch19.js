// ---- Phase 4 batch 19: British Isles (UK, Ireland, Crown Dependencies), extracted 2026-10-28, approved by Youri (planning/budget_batch19/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS: waiting for Youri's review. Fares: flights_batch19.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km).
// Fuel/km: GB 0.146, IE 0.138, FR 0.156, BE 0.139, IM 0.147. £1 = €1.17 (as in the notes). UK ETA ~£20 = €23 (VISA_VACCINATION_RESEARCH.md), once per route, covers UK+IM+JE+GG.

  'gt_seed_channel-islands-brittany-normandyopal-coast-belgium': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Guernsey, 1 stop via London/Southampton (notes: from ~€145 return; typical one-way est)
    flight_out_cost: 0,    // one-way rental drop in Amsterdam: the car drives home, fuel+drop fee are in the Car extra
    blocks: [
      { code: 'GG', transport: 35, local: 0, extras: [       // Guernsey-Jersey inter-island ferry (est)
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years, covers Guernsey/Jersey too)', 23, 'visa'),
      ] },
      { code: 'JE', transport: 55, local: 0, extras: [] },   // Jersey-Saint-Malo fast ferry, foot passenger (est)
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 23 days (Saint-Malo to Amsterdam drop) × €48 + one-way cross-border drop ≈€200 (est) + fuel ≈1,660 km FR + 340 km BE/NL + tolls (60% of FR km × €9/100 km)', 1700, 'transport'),
      ] },
      { code: 'FR', transport: 0, local: 0, extras: [] },
      { code: 'FR', transport: 0, local: 0, extras: [] },
      { code: 'BE', local: 0, extras: [] },
    ],
  },

  'gt_seed_cotswolds-bath-southwest-england-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Bristol (easyJet/KLM, est; London ≈ same)
    flight_out_cost: 100,  // Bristol-AMS (est)
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: rental 6 days × €50 + fuel ≈590 km (round trip from Bristol, no drop fee)', 386, 'transport'),
        rbExtra('Roman Baths timed entry ~£28 (notes)', 33, 'activity'),
      ] },
    ],
  },

  'gt_seed_edinburgh-3-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Edinburgh (WebSearch 2026-10-28: floors €90-92, typical higher)
    flight_out_cost: 110,
    blocks: [
      { code: 'GB', local: 10, extras: [                      // Stirling train return day trip (est)
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Edinburgh Castle online ticket £19.50 (notes ~€22)', 22, 'activity'),
      ] },
    ],
  },

  'gt_seed_england-wales-northern-ireland-roadtrip-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 136,   // own car: fuel NL→Hook of Holland ≈10 + Stena HoH-Harwich €66 (notes) + car supplement ≈60 (est, flagged)
    flight_out_cost: 335,  // own car home: Belfast-Cairnryan ferry with car ≈100 (est) + ≈680 km Cairnryan-Harwich fuel ≈99 + Harwich-HoH €66 + car ≈60 + NL fuel ≈10
    blocks: [
      { code: 'GB', transport: 0, local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years, also covers Northern Ireland)', 23, 'visa'),
        rbExtra('Car (own): fuel ≈1,100 km GB + ≈170 km IE transit + Holyhead-Dublin ferry with car ≈€97 (€27 notes + ≈70 car, est) + IE/Dublin tolls ≈€15 (est)', 296, 'transport'),
      ] },
      { code: 'GB', local: 0, extras: [
        rbExtra("Giant's Causeway entry £9 incl. parking (notes)", 11, 'activity'),
      ] },
    ],
  },

  'gt_seed_england-wales-isle-of-man': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-London (notes from ~€70-85; typical est)
    flight_out_cost: 85,   // Newcastle-AMS (notes from ~€30-90)
    blocks: [
      { code: 'GB', transport: 0, local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years, covers Isle of Man)', 23, 'visa'),
        rbExtra('Car: rental 35 days (from day 3, after London) × €50 + one-way drop Newcastle ≈€100 (est) + fuel ≈2,490 km (no tolls)', 2214, 'transport'),
      ] },
      { code: 'GB', transport: 0, local: 0, extras: [] },
      { code: 'GB', transport: 0, local: 0, extras: [] },
      { code: 'GB', transport: 45, local: 0, extras: [] },   // Heysham-Douglas foot passenger (est)
      { code: 'IM', transport: 45, local: 0, extras: [] },   // Douglas-Heysham foot passenger (est)
      { code: 'GB', local: 0, extras: [] },
    ],
  },

  'gt_seed_highlands-isle-of-skye-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Inverness (WebSearch 2026-10-28: GBP 111-153; direct KLM/BA)
    flight_out_cost: 150,
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: rental 9 days × €50 + fuel ≈650 km (my estimate, calc 370 km too low; round trip Inverness, no drop fee; Skye Bridge free)', 545, 'transport'),
      ] },
    ],
  },

  'gt_seed_london-3-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-London (WebSearch 2026-10-28: $75-110 budget carriers; typical)
    flight_out_cost: 100,
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
      ] },
    ],
  },

  'gt_seed_northern-ireland-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Belfast (easyJet/KLM, est)
    flight_out_cost: 100,
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: rental 6 days × €50 + fuel ≈130 km (calc; no drop fee, returned in Belfast)', 319, 'transport'),
        rbExtra("Giant's Causeway entry £9 incl. parking (notes)", 11, 'activity'),
      ] },
    ],
  },

  'gt_seed_orkney-shetland-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Aberdeen direct (KLM, est)
    flight_out_cost: 230,  // Lerwick/Kirkwall-AMS via Aberdeen/Edinburgh: Loganair ≈110 + AMS ≈120 (est, low confidence)
    blocks: [
      { code: 'GB', local: 95, extras: [                      // NorthLink Aberdeen-Kirkwall foot ≈50 + Kirkwall-Lerwick ≈45 (est, notes give no price)
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: local rental on the islands 5 days × €50 + fuel ≈300 km (est; no car on the ferry)', 294, 'transport'),
      ] },
    ],
  },

  'gt_seed_outer-hebrides-lewis-harris-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Inverness
    flight_out_cost: 150,  // Inverness-AMS (car returns by Stornoway-Ullapool)
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: rental 6 days × €50 + fuel ≈450 km (my estimate, calc 150 too low) + CalMac Uig-Tarbert with car ≈€80 (est) + Stornoway-Ullapool with car ≈€110 (est)', 556, 'transport'),
      ] },
    ],
  },

  'gt_seed_scotland-northern-ireland': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Edinburgh
    flight_out_cost: 100,  // Belfast-AMS (notes from ~€22-60; typical est)
    blocks: [
      { code: 'GB', transport: 0, local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years, covers Northern Ireland)', 23, 'visa'),
        rbExtra('Car: rental 24 days (from day 4, after Edinburgh) × €50 + Cairnryan-Belfast ferry with car ≈€130 (est) + one-way drop Belfast ≈€100 (est) + fuel ≈1,210 km (calc)', 1607, 'transport'),
      ] },
      { code: 'GB', local: 0, extras: [] },
    ],
  },

  'gt_seed_scotland-extended-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Edinburgh
    flight_out_cost: 110,  // Edinburgh-AMS (loop ends in Edinburgh)
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: rental 12 days × €50 + fuel ≈1,600 km (NC500 = 516 miles/830 km per notes + Edinburgh-Inverness + Skye/Glencoe; no drop fee)', 834, 'transport'),
      ] },
    ],
  },

  'gt_seed_scotland-roadtrip-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,
    flight_out_cost: 110,
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: rental 8 days × €50 + fuel ≈800 km (my estimate, calc 430 too low; loop back to Edinburgh, no drop fee)', 517, 'transport'),
      ] },
    ],
  },

  'gt_seed_scottish-highlands-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Inverness
    flight_out_cost: 150,
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: rental 6 days × €50 + fuel ≈500 km (my estimate, calc 270 too low; loop from Inverness)', 373, 'transport'),
      ] },
    ],
  },

  'gt_seed_wales-snowdonia-coast-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Manchester (KLM/easyJet, est)
    flight_out_cost: 100,
    blocks: [
      { code: 'GB', local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years)', 23, 'visa'),
        rbExtra('Car: rental 6 days × €50 + fuel ≈800 km (Manchester-Snowdonia-Pembrokeshire-back; my estimate, calc 320 too low)', 417, 'transport'),
        rbExtra('Snowdon Mountain Railway return ticket £45-62 midpoint (notes; no one-way price, not halved)', 63, 'activity'),
      ] },
    ],
  },

  'gt_seed_dublin-3-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Dublin (WebSearch 2026-10-28: lows €58, typical higher)
    flight_out_cost: 90,
    blocks: [
      { code: 'IE', local: 25, extras: [                      // Wicklow/Glendalough day-trip bus return (est)
        rbExtra('Book of Kells timed entry €21.50-25 midpoint (notes)', 23, 'activity'),
        rbExtra('Guinness Storehouse €30-45 midpoint (notes)', 38, 'activity'),
      ] },
    ],
  },

  'gt_seed_ireland': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Dublin
    flight_out_cost: 100,  // Cork-AMS (KLM direct, notes from ~€40-70; typical est)
    blocks: [
      { code: 'IE', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 22 days × €50 + one-way drop Cork ≈€80 (est) + fuel ≈1,700 km (my estimate, calc 840 too low) + tolls ≈€25 (est)', 1440, 'transport'),
      ] },
      { code: 'IE', local: 0, extras: [] },
    ],
  },

  'gt_seed_ireland-complete-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,
    flight_out_cost: 90,   // Dublin-AMS (loop returns to Dublin)
    blocks: [
      { code: 'IE', local: 0, extras: [
        rbExtra('Car: rental 12 days × €50 + fuel ≈1,600 km (my estimate, calc 1,030 too low; loop back to Dublin) + tolls ≈€25 (est)', 846, 'transport'),
        rbExtra('UK ETA for the optional Northern Ireland side trip (~£20)', 23, 'visa', true),
      ] },
    ],
  },

  'gt_seed_ireland-roadtrip-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Dublin
    flight_out_cost: 100,  // Shannon-AMS (est)
    blocks: [
      { code: 'IE', local: 0, extras: [
        rbExtra('Car: rental 9 days × €50 + one-way drop Shannon ≈€60 (est) + fuel ≈1,000 km (my estimate, calc 650 too low) + tolls ≈€15 (est)', 663, 'transport'),
      ] },
    ],
  },

  'gt_seed_west-ireland-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Shannon (est)
    flight_out_cost: 100,
    blocks: [
      { code: 'IE', local: 0, extras: [
        rbExtra('Car: rental 6 days × €50 + fuel ≈400 km (Shannon-Galway-Connemara-Cliffs; my estimate, calc 200 too low; no drop fee)', 355, 'transport'),
        rbExtra('Cliffs of Moher visitor centre €10-12 midpoint incl. parking (notes)', 11, 'activity'),
      ] },
    ],
  },

  'gt_seed_wild-atlantic-way-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Dublin (then drive to Donegal)
    flight_out_cost: 100,  // Cork-AMS
    blocks: [
      { code: 'IE', local: 0, extras: [
        rbExtra('Car: rental 9 days × €50 + one-way drop Cork ≈€80 (est) + fuel ≈1,500 km (incl. Dublin-Donegal ≈270 km; my estimate, calc 700 too low) + tolls ≈€20 (est)', 757, 'transport'),
      ] },
    ],
  },

  'gt_seed_isle-of-man-3-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Douglas via Manchester/London (AMS-MAN ≈100 + MAN-IOM ≈70, est)
    flight_out_cost: 170,
    blocks: [
      { code: 'IM', transport: 0, local: 0, extras: [
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years, covers Isle of Man)', 23, 'visa'),
        rbExtra('Car: local rental 4 days × €60 + fuel ≈80 km', 252, 'transport'),
      ] },
      { code: 'IM', local: 0, extras: [] },
    ],
  },

  'gt_seed_jersey-guernsey-channel-islands-4-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Guernsey, 1 stop via UK (est)
    flight_out_cost: 130,  // Jersey-AMS KLM seasonal direct (est)
    blocks: [
      { code: 'GG', transport: 60, local: 0, extras: [         // Aurigny inter-island flight ~20 min (est)
        rbExtra('UK ETA (Dutch passport, ~£20, valid 2 years, covers Jersey/Guernsey)', 23, 'visa'),
      ] },
      { code: 'JE', local: 0, extras: [] },
    ],
  },
