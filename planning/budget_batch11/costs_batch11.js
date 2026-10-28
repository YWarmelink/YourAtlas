// ---- Phase 4 batch 11: Adriatic & Western Balkans 1/2, extracted 2026-10-28, approved by Youri (planning/budget_batch11/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS: waiting for Youri's review. Fares: flights_from_ams.csv + flights_batch11.csv (4 airports searched, rest est).
// Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km, 60% of km on motorway for distance-toll countries). Visas: none (AL/BA/RS/XK/ME visa-free for Dutch).

  'gt_seed_albania-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Tirana one way (Transavia/Ryanair/Air Serbia; Expedia EUR 89 floor, typical ~110)
    flight_out_cost: 100,  // Tirana-AMS one way (Air Serbia EUR 70 floor, typical ~100)
    blocks: [
      { code: 'AL', local: 30, extras: [] },  // no car: buses Tirana-Berat ~5, Berat-Vlore-Dhermi ~10, Himare-Tirana ~14 (est)
    ],
  },

  'gt_seed_albania-montenegro-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Tirana (as above)
    flight_out_cost: 150,  // Podgorica/Tivat-AMS one way (est, 1 stop or seasonal direct; low confidence)
    blocks: [
      { code: 'AL', transport: 0, local: 0, extras: [   // car drives it
        rbExtra('Car: rental 10 days (from leaving Tirana) × €36 (AL 33/ME 40) + fuel ≈560 km + tolls (ME 60% of km × €5/100 km) + one-way cross-border drop AL→ME ≈€100 (est)', 547, 'transport'),
        rbExtra('Car: green card Albania + Montenegro (notes: ~€30-50, midpoint)', 40, 'other'),
      ] },
      { code: 'ME', local: 0, extras: [] },
    ],
  },

  'gt_seed_albania-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Tirana
    flight_out_cost: 100,  // Tirana-AMS
    blocks: [
      { code: 'AL', local: 0, extras: [   // €40/day is only ~€5 above the R2d style rate (€35), so the car is NOT in it (orchestrator call, 2026-10-28)
        rbExtra('Car: rental 6 days × €33 + fuel ≈440 km (0.147/km); no tolls', 263, 'transport'),
      ] },
    ],
  },

  'gt_seed_albanian-riviera-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Tirana
    flight_out_cost: 100,  // Tirana-AMS
    blocks: [
      { code: 'AL', local: 40, extras: [] },  // no car: bus Tirana-Vlore ~8, coast hops Vlore-Dhermi-Himare-Saranda-Ksamil ~11, Saranda-Tirana ~18 (est)
    ],
  },

  'gt_seed_kosovo-albania-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Pristina one way (est; Wizz/Eurowings/Swiss typical, low confidence)
    flight_out_cost: 100,  // Tirana-AMS
    blocks: [
      { code: 'XK', transport: 12, local: 13, extras: [] },  // bus Prizren-Kukes/Shkoder ~12 (est); PRN-Peja ~6 + Peja-Prizren ~7 (est)
      { code: 'AL', local: 45, extras: [] },                 // Kukes-Shkoder ~10, Shkoder-Theth minibus return ~30, Shkoder-Tirana ~5 (est)
    ],
  },

  'gt_seed_bosnia-croatia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Dubrovnik one way (KLM/easyJet direct, aggregator floors ~100-110)
    flight_out_cost: 110,  // Dubrovnik-AMS one way (est)
    blocks: [
      { code: 'HR', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (after 2 days Dubrovnik) × €48 + fuel ≈530 km (own loop estimate, input said 370) + tolls (BA 60% × €4/100 km)', 414, 'transport'),
      ] },
      { code: 'BA', local: 0, extras: [] },
    ],
  },

  'gt_seed_bosnia-croatia-montenegro-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Dubrovnik (route says Split/Dubrovnik; Dubrovnik assumed)
    flight_out_cost: 150,  // Podgorica/Tivat-AMS (est)
    blocks: [
      { code: 'HR', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 9 days (from leaving Dubrovnik) × €45 + fuel ≈640 km + tolls (HR/BA/ME distance tolls, 60% of km) + one-way drop HR→ME ≈€100 (est)', 605, 'transport'),
      ] },
      { code: 'BA', transport: 0, local: 0, extras: [] },
      { code: 'ME', local: 0, extras: [] },
    ],
  },

  'gt_seed_bosnia-montenegro-budva-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 230,   // AMS-Sarajevo (flights_from_ams.csv)
    flight_out_cost: 150,  // Podgorica/Tivat-AMS (est)
    blocks: [
      { code: 'BA', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (after 2 days Sarajevo) × €39 + fuel ≈310 km + tolls (60% of km) + one-way drop BA→ME ≈€100 (est)', 420, 'transport'),
      ] },
      { code: 'ME', local: 0, extras: [] },
    ],
  },

  'gt_seed_bosnia-roadtrip-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 230,   // AMS-Sarajevo
    flight_out_cost: 220,  // Sarajevo-AMS (est, mirror of out)
    blocks: [
      { code: 'BA', local: 0, extras: [] },  // car in daily rate (notes: "~€40-50/day including the rental car"), nothing added
    ],
  },

  'gt_seed_croatia-bosnia-via-split-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Split one way (easyJet/Transavia, Expedia ~EUR 90 floor)
    flight_out_cost: 100,  // Split-AMS one way (est)
    blocks: [
      { code: 'HR', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 6 days (after 3 days Split) × €48 + fuel ≈850 km (own loop estimate, input said 310) + tolls (HR/BA 60% of km)', 418, 'transport'),
      ] },
      { code: 'BA', local: 0, extras: [
        rbExtra('Car: Bosnia rental insurance surcharge (notes: €10-15/day, midpoint) × 6 days', 75, 'other'),
      ] },
    ],
  },

  'gt_seed_montenegro-bosnia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Podgorica/Tivat (est)
    flight_out_cost: 220,  // Sarajevo-AMS (est)
    blocks: [
      { code: 'ME', transport: 0, local: 5, extras: [   // local: Tivat/Podgorica airport bus to Kotor (est)
        rbExtra('Car: rental 4 days (leave Kotor, drop on arriving Sarajevo; no car needed there) × €39 + fuel ≈330 km + tolls + one-way drop ME→BA ≈€100 (est)', 306, 'transport'),
      ] },
      { code: 'BA', local: 0, extras: [] },
    ],
  },

  'gt_seed_sarajevo-mostar-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 230,   // AMS-Sarajevo
    flight_out_cost: 220,  // Sarajevo-AMS (est)
    blocks: [
      { code: 'BA', local: 20, extras: [   // no car: notes give bus Sarajevo-Mostar ~€10, x2 (back to the airport)
        rbExtra('Tunnel of Hope (20 BAM, notes)', 10.5, 'activity'),
        rbExtra('Kravice Waterfalls entry (notes)', 10, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_serbia-montenegro-bosnia-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Belgrade one way (est; KLM/Transavia/Air Serbia)
    flight_out_cost: 150,  // Podgorica/Tivat-AMS (est)
    blocks: [
      { code: 'RS', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 10 days (from leaving Belgrade) × €38 + fuel ≈700 km + tolls (60% of km) + one-way drop RS→ME ≈€120 (est)', 608, 'transport'),
      ] },
      { code: 'BA', transport: 0, local: 0, extras: [
        rbExtra('Tara/Drina rafting (notes: ~€60/day, 1 day assumed)', 60, 'tour'),
      ] },
      { code: 'ME', local: 0, extras: [] },
    ],
  },

  'gt_seed_adriatic-roadtrip-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana (est; Transavia/Air France, low confidence)
    flight_out_cost: 150,  // Podgorica/Tivat-AMS (est)
    blocks: [
      { code: 'SI', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 13 days (from day 2) × €47 + fuel ≈1250 km (own estimate, input said 920) + SI vignette €16 + tolls (HR/ME 60% of km) + one-way drop SI→ME ≈€120 (est)', 954, 'transport'),
      ] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'ME', local: 0, extras: [] },
    ],
  },

  'gt_seed_austria-slovenia-croatia-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 195,   // OWN CAR NL-Klagenfurt ≈1170 km: fuel ≈167 (NL/DE/AT) + AT vignette 12.80 + Tauern/Katschberg ≈15 (DE free)
    flight_out_cost: 267,  // OWN CAR Zadar-NL ≈1510 km: fuel ≈209 + HR tolls 16 + SI vignette 16 (est, second one) + AT vignette 12.80 + Karawanken/Tauern ≈13
    blocks: [
      { code: 'AT', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈620 km in route + SI e-vignette €16 + Karawanken tunnel ≈€9 (est) + HR tolls (60% of 460 km × €7.5/100 km)', 124, 'transport'),
      ] },
      { code: 'SI', transport: 0, local: 0, extras: [] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'HR', transport: 0, local: 0, extras: [
        rbExtra('Plitvice Lakes entry (notes: peak season €40)', 40, 'park_fee'),
      ] },
      { code: 'HR', local: 0, extras: [] },
    ],
  },

  'gt_seed_complete-croatia-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Zagreb one way (Skyscanner/Expedia EUR 147-148 floor; KLM/Croatia Airlines)
    flight_out_cost: 110,  // Dubrovnik-AMS (est)
    blocks: [
      { code: 'HR', local: 35, extras: [   // local: Split-Hvar catamaran return ~2 × 17 (est)
        rbExtra('Car: rental 8 days (Plitvice to Dubrovnik) × €48 + fuel ≈650 km + tolls (60% × €7.5/100 km) + one-way domestic drop ≈€80 (est)', 575, 'transport'),
      ] },
    ],
  },

  'gt_seed_croatia-montenegro-bosnia-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Split
    flight_out_cost: 220,  // Sarajevo-AMS (est)
    blocks: [
      { code: 'HR', transport: 0, local: 20, extras: [   // local: Split-Dubrovnik bus ~€20 (est)
        rbExtra('Car: rental 7 days (from leaving Dubrovnik, drop on arriving Sarajevo) × €42 + fuel ≈600 km + tolls + one-way cross-border drop HR→BA ≈€100 (est)', 489, 'transport'),
      ] },
      { code: 'ME', transport: 0, local: 0, extras: [] },
      { code: 'BA', local: 0, extras: [] },
    ],
  },

  'gt_seed_croatia-coastal-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Zadar one way (est; Transavia/Ryanair seasonal)
    flight_out_cost: 110,  // Dubrovnik-AMS (est)
    blocks: [
      { code: 'HR', local: 35, extras: [   // local: Split-Hvar ferry return ~2 × 17 (est)
        rbExtra('Car: rental 6 days (day 3 Krka to Dubrovnik) × €48 + fuel ≈390 km + tolls (60% × €7.5/100 km) + one-way domestic drop ≈€80 (est)', 435, 'transport'),
      ] },
    ],
  },

  'gt_seed_croatia-north-to-south-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Zagreb
    flight_out_cost: 110,  // Dubrovnik-AMS (est)
    blocks: [
      { code: 'HR', local: 0, extras: [
        rbExtra('Car: rental 6 days (Plitvice to Dubrovnik) × €48 + fuel ≈630 km + tolls (60% × €7.5/100 km) + one-way domestic drop ≈€80 (est)', 476, 'transport'),
      ] },
    ],
  },

  'gt_seed_dubrovnik-surroundings-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Dubrovnik
    flight_out_cost: 110,  // Dubrovnik-AMS (est)
    blocks: [
      { code: 'HR', local: 8, extras: [] },  // bus to Cavtat/Trsteno day trip (est); boat/ticket prices not named in notes
    ],
  },
