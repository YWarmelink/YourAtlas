// ---- Phase 4 batch 14: Greece, Cyprus & Turkey, extracted 2026-10-28, approved by Youri (planning/budget_batch14/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch14.csv (new rows are estimates, no WebSearch). Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km).
// GR fuel 2.191, toll 6.5/100km, rental 45/day; CY fuel 1.76, rental 35/day, no tolls.

  'gt_seed_cyprus-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Larnaca one way (Transavia/Aegean/easyJet typical; est)
    flight_out_cost: 150,  // Larnaca-AMS one way (est)
    blocks: [
      { code: 'CY', local: 0, extras: [
        rbExtra('Car: rental 6 days × €35 + fuel ≈240 km (no tolls)', 240, 'transport'),   // 210 + 240×0.07×1.76 = 29.6
      ] },
    ],
  },

  'gt_seed_cyprus-greece-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Larnaca (est)
    flight_out_cost: 110,  // Athens-AMS one way (est)
    blocks: [
      { code: 'CY', transport: 75, local: 12, extras: [] },   // flight Larnaca-Athens: notes "from ~€120 return" × 1.25 / 2 = 75 (flagged, "from" price); local: Larnaca-Paphos intercity bus ~€12 (est)
      { code: 'GR', local: 34, extras: [                      // Athens-Aegina ferry day trip ~€17 each way (est)
        rbExtra('Acropolis timed-entry ticket (hhticket.gr, Apr-Oct)', 30, 'activity'),   // notes (Athens route): €30 summer
      ] },
    ],
  },

  'gt_seed_cyprus-roadtrip-including-northern-cyprus-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Larnaca (est)
    flight_out_cost: 150,  // Larnaca-AMS (est)
    blocks: [
      { code: 'CY', local: 0, extras: [] },   // carInDailyRate true: car adds nothing. North-Cyprus insurance (~€20) only if rental firm allows the car across: not added
    ],
  },

  'gt_seed_athens-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Athens one way (Transavia/Aegean/KLM typical; est)
    flight_out_cost: 110,  // Athens-AMS (est)
    blocks: [
      { code: 'GR', local: 14, extras: [                 // Cape Sounion KTEL bus ~€7 each way (est)
        rbExtra('Acropolis timed-entry ticket (hhticket.gr, Apr-Oct)', 30, 'activity'),   // notes: €30 summer
      ] },
    ],
  },

  'gt_seed_athens-day-trips-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Athens (est)
    flight_out_cost: 110,  // Athens-AMS (est)
    blocks: [
      { code: 'GR', local: 0, extras: [
        rbExtra('Car: rental 3 days (Sounion, Delphi, Nafplio/Mycenae/Epidaurus) × €45 + fuel ≈410 km + tolls (60% × €6.5/100 km)', 214, 'transport'),   // 135 + 62.9 + 16
        rbExtra('Acropolis timed-entry ticket (hhticket.gr, Apr-Oct)', 30, 'activity'),   // notes (standalone Athens): €30
        rbExtra('Delphi site+museum combo', 12, 'activity'),                               // notes ~€12 summer
        rbExtra('Mycenae/Epidaurus combo', 20, 'activity'),                                // notes ~€20 summer
      ] },
    ],
  },

  'gt_seed_athens-peloponnese-extended-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Athens (est)
    flight_out_cost: 110,  // Athens-AMS (est)
    blocks: [
      { code: 'GR', local: 0, extras: [
        rbExtra('Car: rental 9 days (after 3 Athens days) × €45 + fuel ≈710 km + tolls (60% × €6.5/100 km)', 542, 'transport'),   // 405 + 108.9 + 27.7
        rbExtra('Acropolis timed-entry ticket (hhticket.gr, Apr-Oct)', 30, 'activity'),   // notes (standalone Athens): €30
        rbExtra('Olympia site+museum combo', 20, 'activity'),                              // notes ~€20 summer
      ] },
    ],
  },

  'gt_seed_corfu-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Corfu one way (TUI fly direct, seasonal; typical, est)
    flight_out_cost: 140,  // Corfu-AMS (est)
    blocks: [
      { code: 'GR', transport: 0, local: 0, extras: [] },
      { code: 'GR', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 4 days (from leaving Corfu Town) × €45 + fuel ≈40 km (input distance) (no tolls)', 186, 'transport'),   // 180 + 6.1
      ] },
      { code: 'GR', local: 0, extras: [] },
    ],
  },

  'gt_seed_crete-roadtrip-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Chania one way (seasonal direct, typical; est)
    flight_out_cost: 140,  // Chania-AMS (est)
    blocks: [
      { code: 'GR', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 9 days × €45 + fuel ≈310 km + tolls (60% × €6.5/100 km; Chania-Heraklion road plazas)', 465, 'transport'),   // 405 + 47.5 + 12.1; no drop fee (fly home from Chania)
      ] },
      { code: 'GR', transport: 0, local: 0, extras: [] },
      { code: 'GR', transport: 0, local: 0, extras: [] },
      { code: 'GR', transport: 0, local: 0, extras: [] },
      { code: 'GR', local: 0, extras: [] },
    ],
  },

  'gt_seed_cyclades-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Santorini one way (seasonal direct/one-stop, typical; est)
    flight_out_cost: 110,  // Athens-AMS (est)
    blocks: [
      { code: 'GR', transport: 38, local: 0, extras: [] },   // ferry Santorini-Naxos ~€38 (est)
      { code: 'GR', transport: 15, local: 0, extras: [] },   // ferry Naxos-Paros ~€15 (est)
      { code: 'GR', local: 40, extras: [] },                 // ferry Paros-Piraeus ~€40 (est) to fly home from Athens
    ],
  },

  'gt_seed_cyclades-island-hopping-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Santorini (est)
    flight_out_cost: 110,  // Athens-AMS (est)
    blocks: [
      { code: 'GR', transport: 20, local: 0, extras: [] },   // ferry Santorini-Ios ~€20 (est)
      { code: 'GR', transport: 20, local: 0, extras: [] },   // ferry Ios-Naxos ~€20 (est)
      { code: 'GR', transport: 15, local: 0, extras: [] },   // ferry Naxos-Paros ~€15 (est)
      { code: 'GR', transport: 40, local: 0, extras: [] },   // ferry Paros-Milos ~€40 (est)
      { code: 'GR', local: 45, extras: [] },                 // ferry Milos-Piraeus conventional ~€45 (est) to fly home from Athens
    ],
  },

  'gt_seed_greece-roadtrip-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Athens (est)
    flight_out_cost: 110,  // Athens-AMS (est)
    blocks: [
      { code: 'GR', local: 0, extras: [          // carInDailyRate true: car adds nothing
        rbExtra('Acropolis timed-entry ticket (hhticket.gr, Apr-Oct)', 30, 'activity'),   // notes (standalone Athens): €30
      ] },
    ],
  },

  'gt_seed_greek-islands-paros-naxos-santorini-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Athens (est)
    flight_out_cost: 110,  // Athens-AMS (est)
    blocks: [
      { code: 'GR', local: 0, extras: [] },     // ferries + the hop back to Athens are IN the daily rate: R2d kept this block's €125/day for that reason (orchestrator call, 2026-10-28; the agent had €165 here)
    ],
  },

  'gt_seed_ionian-islands-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Kefalonia one way (seasonal charter/low-cost; est)
    flight_out_cost: 150,  // Zakynthos-AMS one way (seasonal direct; est)
    blocks: [
      { code: 'GR', transport: 15, local: 0, extras: [   // foot-passenger ferry Kefalonia-Zakynthos ~€15 (est); a separate car is rented on each island
        rbExtra('Car: rental 6 days (3 per island, separate rentals) × €45 + fuel ≈180 km (no tolls)', 298, 'transport'),   // 270 + 27.6
      ] },
      { code: 'GR', local: 0, extras: [] },
    ],
  },

  'gt_seed_northern-greece-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Thessaloniki one way (est)
    flight_out_cost: 140,  // Thessaloniki-AMS (flights_from_ams.csv SKG back)
    blocks: [
      { code: 'GR', local: 0, extras: [
        rbExtra('Car: rental 7 days (after 2 Thessaloniki days) × €45 + fuel ≈750 km + tolls (60% × €6.5/100 km; Egnatia)', 459, 'transport'),   // 315 + 115 + 29.3
        rbExtra('Meteora monasteries, 3 × €3', 9, 'activity'),   // notes ~€3 per monastery; 3 visited assumed
      ] },
    ],
  },

  'gt_seed_peloponnese-loop-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Athens (est)
    flight_out_cost: 110,  // Athens-AMS (est)
    blocks: [
      { code: 'GR', local: 0, extras: [
        rbExtra('Car: rental 7 days (after 2 Athens days) × €45 + fuel ≈580 km + tolls (60% × €6.5/100 km)', 427, 'transport'),   // 315 + 88.9 + 22.6
        rbExtra('Mystras site ticket', 16, 'activity'),                                  // notes €12-20 midpoint
        rbExtra('Epidaurus festival ticket', 33, 'activity', true),                      // notes €10-55 midpoint; optional
      ] },
    ],
  },

  'gt_seed_rhodes-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 180,   // AMS-Rhodes one way (easyJet/Transavia/TUI direct, seasonal; est)
    flight_out_cost: 170,  // Rhodes-AMS (est)
    blocks: [
      { code: 'GR', transport: 0, local: 0, extras: [
        rbExtra('Palace of the Grand Master ticket', 20, 'activity'),   // notes: €20
      ] },
      { code: 'GR', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 4 days (from leaving Rhodes Old Town) × €45 + fuel ≈110 km (no tolls)', 197, 'transport'),   // 180 + 16.9
      ] },
      { code: 'GR', local: 0, extras: [] },
    ],
  },

  'gt_seed_southern-europe-highlights-roadtrip-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Lisbon one way (flights_from_ams.csv)
    flight_out_cost: 150,  // Santorini-AMS one way (seasonal direct/one-stop; est)
    blocks: [
      { code: 'PT', transport: 30, local: 0, extras: [] },   // ALSA bus Lisbon-Seville ~€30 (est)
      { code: 'ES', transport: 100, local: 0, extras: [] },  // flight Seville-Rome with connection (est)
      { code: 'IT', transport: 80, local: 0, extras: [] },   // flight Rome-Athens (est)
      { code: 'GR', transport: 70, local: 0, extras: [      // Athens-Santorini flight/hs ferry ~€70 (est), optional leg
        rbExtra('Acropolis timed-entry ticket (hhticket.gr, Apr-Oct)', 30, 'activity'),   // notes (standalone Athens): €30
      ] },
      { code: 'GR', local: 0, extras: [] },
    ],
  },

  'gt_seed_istanbul-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Istanbul one way (KLM/Turkish/Pegasus; est)
    flight_out_cost: 130,  // Istanbul-AMS (est)
    blocks: [
      { code: 'TR', local: 0, extras: [
        rbExtra('Hagia Sophia upper gallery', 25, 'activity'),                   // notes: €25
        rbExtra('Topkapi Palace + Harem + Hagia Irene combo', 55, 'activity'),   // notes: €55
      ] },
    ],
  },

  'gt_seed_istanbul-thrace-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Istanbul (est)
    flight_out_cost: 130,  // Istanbul-AMS (est)
    blocks: [
      { code: 'TR', local: 25, extras: [] },   // Edirne day trip bus return: notes one-way €10-15 → 12.5 × 2
    ],
  },
