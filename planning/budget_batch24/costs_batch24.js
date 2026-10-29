// ---- Phase 4 batch 24: North America & Oceania 1/2, extracted 2026-10-29, approved by Youri (planning/budget_batch24/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS. Fares: flights_from_ams.csv + flights_batch24.csv (all new fares are estimates, no WebSearch this batch).
// Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km; AU 1.46, NZ 1.86, CA 1.29 EUR/l; rental AU 55, NZ 60, CA 50 EUR/day).
// Tours/park fees are only added when the route notes name a price; none of this batch's notes do, so no tour extras.

  'gt_seed_cairns-great-barrier-reef': {
    checked: '2026-10-29',
    flight_in_cost: 1050,  // AMS-Cairns one way, 2+ stops (notes: return EUR 1,600-2,500 -> half of midpoint; est)
    flight_out_cost: 1050, // Cairns-AMS one way (same, est)
    blocks: [
      { code: 'AU', local: 285, extras: [                 // local: Greyhound Cairns-Airlie-Hervey Bay ~165 (est AUD ~270) + Hervey Bay/Brisbane-Cairns flight back ~120 (est), because the route ends with the flight home from Cairns
        rbExtra('Car: rental 4 days (Cairns/Daintree only) × €55 + fuel ≈300 km (no tolls)', 251, 'transport'),
      ] },
    ],
  },

  'gt_seed_sydneybyron-great-ocean-road': {
    checked: '2026-10-29',
    flight_in_cost: 900,   // AMS-Sydney one way, 1 stop (notes: return EUR 1,100-1,900; est)
    flight_out_cost: 850,  // Melbourne-AMS one way, 1 stop (est)
    blocks: [
      { code: 'AU', transport: 0, local: 140, extras: [   // local: Sydney-Byron Bay and back by bus/budget flight ~2 × 70 (est); Blue Mountains by train is city transport
        rbExtra('Car: rental 12 days (Sydney→Melbourne + Great Ocean Road/Grampians) × €55 + fuel ≈1,580 km + one-way drop Sydney→Melbourne ≈€150 (est, flagged)', 971, 'transport'),
      ] },
      { code: 'AU', local: 0, extras: [] },
    ],
  },

  'gt_seed_tasmania': {
    checked: '2026-10-29',
    flight_in_cost: 1100,  // AMS-Hobart one way, 2 stops (notes: return EUR 1,300-1,800; est)
    flight_out_cost: 1100, // Hobart-AMS one way (est)
    blocks: [
      { code: 'AU', local: 0, extras: [
        rbExtra('Car: rental 9 days (14 minus Overland Track walk and arrival buffer) × €55 + fuel ≈730 km, returned in Hobart (no tolls)', 570, 'transport'),
      ] },
    ],
  },

  'gt_seed_temperatesouthern-australia': {
    checked: '2026-10-29',
    flight_in_cost: 900,   // AMS-Sydney one way (as above)
    flight_out_cost: 850,  // Adelaide-AMS one way, 1 stop (est)
    blocks: [
      { code: 'AU', transport: 0, local: 140, extras: [   // local: Sydney-Byron-Sydney bus/flight (est)
        rbExtra('Car: rental 12 days (Sydney→Melbourne + Great Ocean Road/Grampians) × €55 + fuel ≈1,580 km + one-way drop Sydney→Melbourne ≈€150 (est, flagged)', 971, 'transport'),
      ] },
      { code: 'AU', transport: 90, local: 0, extras: [] }, // flight Melbourne-Hobart ~AUD 150 (notes: Spirit of Tasmania ferry or flight; est, car returned in Melbourne)
      { code: 'AU', transport: 120, local: 0, extras: [    // flight Hobart-Adelaide direct (est)
        rbExtra('Car: Tasmania rental 9 days × €55 + fuel ≈730 km, returned in Hobart', 570, 'transport'),
      ] },
      { code: 'AU', local: 80, extras: [                   // local: Kangaroo Island ferry foot passenger return (est AUD ~130)
        rbExtra('Car: Adelaide/Barossa/Flinders rental 4 days × €55 + fuel ≈500 km', 271, 'transport'),
      ] },
    ],
  },

  'gt_seed_tropicaloutback-australia': {
    checked: '2026-10-29',
    flight_in_cost: 800,   // AMS-Perth one way, 1 stop (notes: return EUR 910-1,500; est)
    flight_out_cost: 1050, // Cairns-AMS one way (est)
    blocks: [
      { code: 'AU', transport: 240, local: 0, extras: [   // flight Broome-Darwin (est AUD ~400), as batch 1 (Youri 2026-10-27: compact car Perth-Broome + flight)
        rbExtra('Car: compact rental 18 days Perth-Broome × €55 + fuel ≈2,800 km (incl. Ningaloo) + one-way fee Perth→Broome ≈€250 (est, flagged)', 1526, 'transport'),
      ] },
      { code: 'AU', transport: 280, local: 0, extras: [   // flight Alice Springs-Cairns (est AUD ~460), as batch 1
        rbExtra('Car: rental 14 days Darwin-Alice Springs × €55 + fuel ≈3,200 km + one-way fee Darwin→Alice ≈€300 (est, flagged)', 1397, 'transport'),
      ] },
      { code: 'AU', local: 285, extras: [                 // as route Cairns: buses Cairns-Hervey Bay 165 + flight back to Cairns 120 (est)
        rbExtra('Car: rental 4 days (Cairns/Daintree only) × €55 + fuel ≈300 km', 251, 'transport'),
      ] },
    ],
  },

  'gt_seed_eastern-canada': {
    checked: '2026-10-29',
    flight_in_cost: 400,   // AMS-Halifax one way (existing YHZ row)
    flight_out_cost: 380,  // Toronto-AMS one way, direct (est)
    blocks: [
      { code: 'CA', transport: 170, local: 0, extras: [   // flight Halifax-Quebec City (~CAD 250, est)
        rbExtra('eTA Canada (CAD 7, 5 years; per VISA file and block notes)', 5, 'visa'),
        rbExtra('Car: rental 6 days (Halifax/Cape Breton, Cabot Trail) × €50 + fuel ≈900 km, returned in Halifax', 381, 'transport'),
      ] },
      { code: 'CA', local: 140, extras: [] },              // trains/buses Quebec-Montreal ~40, Montreal-Ottawa ~25, Ottawa-Toronto ~35, Niagara day trip from Toronto ~40 (all est)
    ],
  },

  'gt_seed_western-canada-rockies-vancouver': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-Calgary one way, 1 stop (notes: return EUR 650-950; est)
    flight_out_cost: 650,  // Anchorage-AMS one way via Seattle/Vancouver (est)
    blocks: [
      { code: 'CA', transport: 0, local: 0, extras: [     // car in the daily rate (carInDailyRate true): only the drop fee
        rbExtra('eTA Canada (CAD 7, 5 years)', 5, 'visa'),
        rbExtra('Car: one-way drop fee Calgary→Vancouver (est CAD ~250; rental itself is in the rate; notes claim no one-way fee, flagged)', 155, 'transport'),
      ] },
      { code: 'CA', transport: 240, local: 0, extras: [] }, // flight Vancouver-Anchorage (est USD ~260)
      { code: 'US', transport: 160, local: 0, extras: [   // Alaska Railroad Denali Star Anchorage-Denali (est USD ~175 one way)
        rbExtra('ESTA (USD 40.27 since 30 Sep 2025; VISA file still says $21)', 36, 'visa'),
      ] },
      { code: 'US', transport: 225, local: 0, extras: [   // Denali-Anchorage train ~160 + Anchorage-Seward bus/train ~65 (est)
        rbExtra('Denali park shuttle bus to Wonder Lake, mandatory (notes give no price; est USD ~60)', 55, 'transport'),
      ] },
      { code: 'US', local: 70, extras: [] },              // Seward-Anchorage bus/train back before the flight home (est)
    ],
  },

  'gt_seed_fiji-vanuatu': {
    checked: '2026-10-29',
    flight_in_cost: 1500,  // AMS-Port Vila one way (existing VLI row)
    flight_out_cost: 950,  // Nadi-AMS one way, multiple stops (notes: return EUR 1,150-1,500 ending in Fiji; est)
    blocks: [
      { code: 'VU', transport: 280, local: 500, extras: [] }, // Vila-Nadi Fiji Airways (batch 1, est); local: Vila-Tanna + Vila-Santo return flights (batch 1, est)
      { code: 'FJ', local: 595, extras: [] },              // Yasawa Flyer pass ~255 + Mamanuca ferry ~45 + Nadi-Taveuni return flights ~295 (batch 1, est)
    ],
  },

  'gt_seed_fiji': {
    checked: '2026-10-29',
    flight_in_cost: 950,   // AMS-Nadi one way (est)
    flight_out_cost: 950,  // Nadi-AMS one way (est)
    blocks: [
      { code: 'FJ', local: 595, extras: [] },              // as Fiji block in Fiji & Vanuatu (the notes name the Yasawa Flyer pass + the Taveuni flight as extra costs)
    ],
  },

  'gt_seed_pacific-islands': {
    checked: '2026-10-29',
    flight_in_cost: 1500,  // AMS-Port Vila one way (existing VLI row)
    flight_out_cost: 1400, // Rarotonga-AMS one way via Auckland/Los Angeles, multiple stops (est)
    blocks: [
      { code: 'VU', transport: 280, local: 0, extras: [] }, // Vila-Nadi (batch 1, est); inDailyRate: Tanna/Santo flights + Yasur tour in the rate
      { code: 'FJ', transport: 300, local: 595, extras: [] }, // Nadi-Nuku'alofa Fiji Airways (batch 1, est); local as in Fiji & Vanuatu
      { code: 'TO', transport: 450, local: 260, extras: [] }, // Tonga-Samoa via Fiji/Auckland (batch 1, est); local: Tongatapu-Vava'u return flights (batch 1, est)
      { code: 'WS', transport: 700, local: 0, extras: [] },  // Samoa-Rarotonga via Auckland, two tickets (batch 1, est)
      { code: 'CK', local: 0, extras: [] },                // inDailyRate: Aitutaki flight + lagoon cruise
    ],
  },

  'gt_seed_new-zealand': {
    checked: '2026-10-29',
    flight_in_cost: 1200,  // AMS-Christchurch one way, 2+ stops (notes: return EUR 1,300-2,000; est)
    flight_out_cost: 1100, // Auckland-AMS one way (existing AKL row)
    blocks: [
      { code: 'NZ', transport: 55, local: 0, extras: [    // Picton-Wellington foot-passenger ferry (est NZD ~105); car returned in Picton
        rbExtra('NZeTA + International Visitor Levy (NZD ~123; per VISA file)', 63, 'visa'),
        rbExtra('Car: rental 21 days South Island × €60 + fuel ≈2,000 km + one-way drop Christchurch→Picton ≈€60 (est, flagged)', 1580, 'transport'),
      ] },
      { code: 'NZ', local: 0, extras: [
        rbExtra('Car: rental 14 days North Island × €60 + fuel ≈1,210 km + one-way drop Wellington→Auckland ≈€55 (est, flagged)', 1053, 'transport'),
      ] },
    ],
  },

  'gt_seed_new-zealand-north-island': {
    checked: '2026-10-29',
    flight_in_cost: 1200,  // AMS-Wellington one way, 2-3 stops (notes: return EUR 1,400-1,800; est)
    flight_out_cost: 1100, // Auckland-AMS one way (existing AKL row)
    blocks: [
      { code: 'NZ', local: 0, extras: [
        rbExtra('NZeTA + International Visitor Levy (NZD ~123; per VISA file)', 63, 'visa'),
        rbExtra('Car: rental 14 days (16 minus 2 arrival-buffer days) × €60 + fuel ≈1,210 km + one-way drop Wellington→Auckland ≈€55 (est, flagged)', 1053, 'transport'),
      ] },
    ],
  },
