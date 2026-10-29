// ---- Phase 4 batch 25: North America & Oceania 2/2, extracted 2026-10-29, approved by Youri (planning/budget_batch25/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch25.csv (mostly estimates, low confidence, 0 web searches).
// Car: data/cost_reference/car_costs_by_country.csv (US EUR 45/day, fuel 1.09/l; NZ EUR 60/day, fuel 1.86/l; 7 L/100 km). USD at 1.1188.

  'gt_seed_new-zealand-south-island': {
    checked: '2026-10-29',
    flight_in_cost: 1150,  // AMS-Christchurch one way, 1-2 stops via Asia/Gulf/US (est from AKL back 1100 in reference file; notes: return EUR 1300-2000)
    flight_out_cost: 1100, // Christchurch-AMS one way (est, same logic; low confidence)
    blocks: [
      { code: 'NZ', local: 0, extras: [
        rbExtra('NZeTA (NZD 17 app) + International Visitor Levy NZD 100 = NZD 117 (VISA_VACCINATION_RESEARCH.md, NZD at ~EUR 0.50)', 58, 'visa'),
        rbExtra('Car: rental 21 days (23 minus 2 buffer days) × €60 + fuel ≈2,700 km (loop CHC-Franz Josef-Queenstown-Milford-Dunedin-Catlins-Kaikoura-Abel Tasman-CHC, est) × €0.13/km + no tolls, no drop fee (return to Christchurch)', 1611, 'transport'),
      ] },
    ],
  },

  'gt_seed_papua-new-guinea': {
    checked: '2026-10-29',
    flight_in_cost: 1000,  // AMS-Port Moresby one way, 2 stops via Singapore/Australia (est; notes: return EUR 1470-2020; low confidence)
    flight_out_cost: 950,  // Port Moresby-AMS one way (est)
    blocks: [
      { code: 'PG', local: 1360, extras: [   // 8 domestic hub flights via Port Moresby × €170 (notes: €140-200 each, midpoint); Tufi/Alotau assumed linked by one boat/land hop
        rbExtra('eVisa Easy Visitor Permit (USD 50)', 45, 'visa'),
        rbExtra('Sepik River guided canoe/village charter, 3 days × €210 (notes: €140-280/day; days est)', 630, 'tour'),
        rbExtra('Goroka Highlands guided vehicle+guide+village fee, 2 days × €165 (notes: €95-235/day; days est)', 330, 'tour'),
      ] },
    ],
  },

  'gt_seed_palau': {
    checked: '2026-10-29',
    flight_in_cost: 900,   // AMS-Koror one way, 2 stops via Manila/Seoul/Taipei (est; notes: return EUR 1300-1750; includes the USD 100 Pristine Paradise fee; low confidence)
    flight_out_cost: 850,  // Koror-AMS one way (est)
    blocks: [
      { code: 'PW', local: 0, extras: [
        rbExtra('Rock Islands Permit incl. Jellyfish Lake (USD 100, 5 days)', 89, 'park_fee'),
        rbExtra('2-tank boat dives, 5 dive days × €152.50 (notes: €140-165/day on top of the daily rate; number of days est)', 763, 'activity'),
      ] },
    ],
  },

  'gt_seed_california': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-San Francisco one way, KLM/United direct (est from SFO back 380; summer out higher)
    flight_out_cost: 380,  // San Francisco-AMS one way (flights_from_ams.csv)
    blocks: [
      { code: 'US', local: 0, extras: [
        rbExtra('ESTA (USD 40.27)', 36, 'visa'),
        rbExtra('Car: rental 6 days (Yosemite + Sequoia loop; SF days car-free, est) × €45 + fuel ≈1,000 km (SF-Yosemite-Sequoia-SF, est; notes: last leg alone 270 mi) + no tolls, no drop fee', 346, 'transport'),
        rbExtra('America the Beautiful Non-Resident Annual Pass (as US Southwest, ~€230; cheaper than 2+ parks at USD 35 + 100 non-resident surcharge each; added in orchestrator review)', 230, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_florida': {
    checked: '2026-10-29',
    flight_in_cost: 380,   // AMS-Miami one way, KLM direct (est; typical return ~EUR 750)
    flight_out_cost: 360,  // Miami-AMS one way (est)
    blocks: [
      { code: 'US', transport: 0, local: 0, extras: [
        rbExtra('ESTA (USD 40.27)', 36, 'visa'),
        rbExtra('Car: rental 7 days (Miami to Key West and back, Everglades/Keys blocks) × €45 + fuel ≈680 km (est) + SunPass/toll fees ≈€10 (est)', 377, 'transport'),
      ] },
      { code: 'US', transport: 0, local: 0, extras: [] },
      { code: 'US', transport: 0, local: 0, extras: [] },
      { code: 'US', local: 0, extras: [] },
    ],
  },

  'gt_seed_hawaii': {
    checked: '2026-10-29',
    flight_in_cost: 750,   // AMS-Honolulu one way, 1 stop via US hub (est; typical return ~EUR 1,300-1,500; low confidence)
    flight_out_cost: 800,  // Lihue-AMS one way via Honolulu/US hub (est)
    blocks: [
      { code: 'US', transport: 70, local: 0, extras: [   // Honolulu-Kahului, Hawaiian/Southwest ~USD 60-90 advance (est)
        rbExtra('ESTA (USD 40.27)', 36, 'visa'),
      ] },
      { code: 'US', transport: 70, local: 0, extras: [   // Kahului-Lihue (est)
        rbExtra('Car: Maui 5 days + Kauai 5 days (Oahu car-free, TheBus) × €75 (est; notes: weekly rates USD 1,154-2,015 in 2026 scarcity) + fuel ≈600 km × €0.11/km (Hawaii fuel ≈+50%) + no tolls, no drop fee', 817, 'transport'),
      ] },
      { code: 'US', local: 0, extras: [] },
    ],
  },

  'gt_seed_pacific-northwest': {
    checked: '2026-10-29',
    flight_in_cost: 420,   // AMS-Seattle one way, KLM direct (est; notes: return EUR 880-1,090)
    flight_out_cost: 380,  // San Francisco-AMS one way (flights_from_ams.csv; route ends at the Redwoods, car dropped in SF)
    blocks: [
      { code: 'US', local: 0, extras: [
        rbExtra('ESTA (USD 40.27)', 36, 'visa'),
        rbExtra('Car: rental 13 days (15 minus 2 Seattle city days) × €45 + fuel ≈2,200 km (Seattle-Rainier-Olympic-Astoria-Redwoods-SF, est) + one-way drop Seattle-SF ≈€200 (est, flagged; USD 100-500+) + no tolls', 953, 'transport'),
        rbExtra('America the Beautiful Non-Resident Annual Pass (as US Southwest, ~€230; cheaper than 2+ parks at USD 35 + 100 non-resident surcharge each; added in orchestrator review)', 230, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_us-northeast': {
    checked: '2026-10-29',
    flight_in_cost: 400,   // AMS-Washington Dulles one way, KLM direct (est; typical return ~EUR 750-850)
    flight_out_cost: 380,  // Boston-AMS one way, direct (est)
    blocks: [
      { code: 'US', transport: 35, local: 0, extras: [   // Amtrak DC-Philadelphia Saver ~USD 30-45 (est)
        rbExtra('ESTA (USD 40.27)', 36, 'visa'),
      ] },
      { code: 'US', transport: 30, local: 0, extras: [] },   // Amtrak Philadelphia-New York Saver ~USD 30-40 (est)
      { code: 'US', transport: 45, local: 0, extras: [] },   // Amtrak New York-Boston Saver ~USD 40-60 (est)
      { code: 'US', local: 0, extras: [] },
    ],
  },

  'gt_seed_us-southwest': {
    checked: '2026-10-29',
    flight_in_cost: 560,   // AMS-Las Vegas one way, 1 stop (est; notes: connecting, 13-15 h)
    flight_out_cost: 560,  // Phoenix-AMS one way, 1 stop (est)
    blocks: [
      { code: 'US', transport: 0, local: 0, extras: [
        rbExtra('ESTA (USD 40.27)', 36, 'visa'),
        rbExtra('America the Beautiful Non-Resident Annual Pass (notes: ~€230; replaces USD 35 + 100 surcharge at Zion/Bryce/Grand Canyon)', 230, 'park_fee'),
        rbExtra("Car: rental 12 days Las Vegas-Phoenix × €45 + fuel ≈1,640 km (Vegas-Zion 270 + the notes' hours between stops, est) + one-way drop Phoenix ≈€180 (notes: placeholder USD 150-250, flagged) + no tolls", 845, 'transport'),
      ] },
      { code: 'US', transport: 0, local: 0, extras: [] },
      { code: 'US', transport: 0, local: 0, extras: [
        rbExtra('Antelope Canyon mandatory Navajo guide tour (USD 80.50)', 72, 'tour'),
      ] },
      { code: 'US', transport: 0, local: 0, extras: [
        rbExtra('Navajo Nation entry (notes: USD 8-10 pp + USD 15/vehicle, midpoint USD 24; not covered by the pass)', 21, 'park_fee'),
      ] },
      { code: 'US', transport: 0, local: 0, extras: [] },
      { code: 'US', local: 0, extras: [
        rbExtra('Red Rock Pass, Sedona trailhead parking (USD 5/day × 2 days)', 9, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_us-west-coast-roadtrip': {
    checked: '2026-10-29',
    flight_in_cost: 420,   // AMS-Seattle one way, KLM direct (est)
    flight_out_cost: 380,  // San Francisco-AMS one way (flights_from_ams.csv)
    blocks: [
      { code: 'US', transport: 0, local: 0, extras: [
        rbExtra('ESTA (USD 40.27)', 36, 'visa'),
        rbExtra('Car: rental 1 = Seattle pickup 15 days × €45 + fuel ≈2,200 km + one-way drop SF ≈€200 (est, flagged) = 1,043; rental 2 = SF short rental 6 days (Yosemite/Sequoia) × €45 + fuel ≈1,000 km = 346; no tolls', 1389, 'transport'),
        rbExtra('America the Beautiful Non-Resident Annual Pass (as US Southwest, ~€230; cheaper than 2+ parks at USD 35 + 100 non-resident surcharge each; added in orchestrator review)', 230, 'park_fee'),
      ] },
      { code: 'US', local: 0, extras: [] },
    ],
  },
