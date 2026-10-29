// ---- Phase 4 batch 26: South America, Patagonia & West/Central Africa, extracted 2026-10-29, approved by Youri (planning/budget_batch26/REVIEW.md) ----
// Fares: flights_from_ams.csv (PMC out, USH back, VXE out, LBV back) + flights_batch26.csv. No web searches this batch: all new fares are estimates (low confidence).
// USD -> EUR at 0.87. Car costs: none (all routes public transport / tours).

  'gt_seed_antarctica-cruise': {
    checked: '2026-10-29',
    flight_in_cost: 1100,   // AMS-Ushuaia one way via Buenos Aires + domestic leg (mirror of USH back; est, December high season)
    flight_out_cost: 1100,  // Ushuaia-AMS one way via Buenos Aires (flights_from_ams.csv USH back, low)
    blocks: [
      { code: 'AQ', local: 0, extras: [] },   // cruise IS the daily rate (inDailyRate); nothing added
    ],
  },

  'gt_seed_argentine-patagonia': {
    checked: '2026-10-29',
    flight_in_cost: 1000,   // AMS-El Calafate one way via Buenos Aires + domestic (notes: return EUR 1,200-1,800; est)
    flight_out_cost: 1100,  // Ushuaia-AMS (flights_from_ams.csv USH back, low)
    blocks: [
      { code: 'AR', transport: 100, local: 60, extras: [] },   // flight El Calafate-Ushuaia (Aerolineas/Flybondi, est 100; the route text says "overland to Torres del Paine", a parent-route leftover); El Calafate-El Chalten bus return (est 2 x 30)
      { code: 'AR', local: 0, extras: [] },
    ],
  },

  'gt_seed_chilean-patagonia': {
    checked: '2026-10-29',
    flight_in_cost: 800,    // AMS-Puerto Montt one way via Santiago (flights_from_ams.csv PMC out, low)
    flight_out_cost: 900,   // Punta Arenas-AMS one way via Santiago (flights_batch26.csv PUQ back, est)
    blocks: [
      { code: 'CL', transport: 130, local: 130, extras: [] },  // transport: Chile Chico-Los Antiguos 5 + Ruta 40 bus Los Antiguos-El Calafate ~95 + El Calafate-Puerto Natales ~30 (est), per the route text; local: Carretera Austral buses/ferries Puerto Montt-Chaiten-Coyhaique-Rio Tranquilo + Chiloe day trip (est)
      { code: 'CL', local: 55, extras: [] },                   // Puerto Natales-Torres del Paine bus return ~25 + Punta Arenas day-trip bus return ~22 + local hops (est)
    ],
  },

  'gt_seed_patagonia-overland': {
    checked: '2026-10-29',
    flight_in_cost: 800,    // AMS-Puerto Montt one way via Santiago (flights_from_ams.csv PMC out, low)
    flight_out_cost: 1100,  // Ushuaia-AMS (flights_from_ams.csv USH back, low)
    blocks: [
      { code: 'CL', transport: 95, local: 130, extras: [] },  // Chile Chico-Los Antiguos ~5 + Ruta 40 bus to El Calafate ~90 (est); local = Carretera Austral buses/ferry + Chiloe (est)
      { code: 'AR', transport: 30, local: 60, extras: [] },   // bus El Calafate-Torres del Paine/Puerto Natales ~30 (est); El Calafate-El Chalten bus return (est)
      { code: 'CL', transport: 65, local: 55, extras: [] },   // bus + Strait of Magellan ferry + border Punta Arenas-Ushuaia ~65 (est); Torres bus + Punta Arenas day trip (est)
      { code: 'AR', local: 0, extras: [] },
    ],
  },

  'gt_seed_west-africa-overland': {
    checked: '2026-10-29',
    flight_in_cost: 250,    // AMS-Sao Vicente one way via Lisbon (flights_from_ams.csv VXE out, low)
    flight_out_cost: 550,   // Cotonou-AMS one way via hub (flights_batch26.csv COO back, est)
    blocks: [
      { code: 'CV', transport: 230, local: 100, extras: [          // Fogo-Praia Binter ~60 + Praia-Dakar ~170 (est); local = Santo Antao ferry ~10 x2, Sao Vicente-Fogo Binter ~70, island buses ~10 (est)
        rbExtra('EASE pre-travel registration Cape Verde (VISA file ~EUR 35)', 35, 'visa'),
      ] },
      { code: 'SN', transport: 12, local: 45, extras: [] },        // bus/shared taxi Sine-Saloum to Banjul ~12 (est); Dakar-Lompoul-Saint-Louis-Sine-Saloum (est)
      { code: 'GM', transport: 330, local: 15, extras: [] },       // flight Banjul-Abidjan (ASKY/Air Cote dIvoire via hub, est, low); Banjul/Serrekunda minibuses (est)
      { code: 'CI', transport: 25, local: 8, extras: [            // bus Abidjan-Elubo-Cape Coast ~15+10 (est); Abidjan-Grand-Bassam shared taxi (est)
        rbExtra('Cote dIvoire e-visa (VISA file ~EUR 73)', 73, 'visa'),
      ] },
      { code: 'GH', transport: 8, local: 25, extras: [             // bus Accra/Volta-Aflao-Lome ~8 (est); Cape Coast-Accra-Volta buses (est)
        rbExtra('Ghana e-visa (VISA file ~USD 260 = EUR 226)', 226, 'visa'),
      ] },
      { code: 'TG', transport: 12, local: 5, extras: [             // bus Lome-Cotonou-Abomey ~12 (est)
        rbExtra('Togo e-visa 15-day tier (VISA file ~25,000 CFA)', 38, 'visa'),
      ] },
      { code: 'BJ', local: 20, extras: [                           // Abomey-Ouidah-Cotonou/Ganvie shared taxis (est)
        rbExtra('Benin e-visa (VISA file EUR 50-100, midpoint)', 75, 'visa'),
      ] },
    ],
  },

  'gt_seed_guyana': {
    checked: '2026-10-29',
    flight_in_cost: 650,    // KLM AMS-Georgetown one way (notes: return ~EUR 740-1,460; est)
    flight_out_cost: 600,   // KLM Georgetown-AMS nonstop one way (est)
    blocks: [
      { code: 'GY', local: 230, extras: [                          // bush/domestic flights Georgetown-Rupununi return (est USD 130 each way; set to 0 if the lodge packages include them)
        rbExtra('Kaieteur Falls day trip: bush flight + guided walk (notes EUR 250-330 all-in, midpoint)', 290, 'tour'),
        rbExtra('Interior lodges Iwokrama/Atta/Karanambu: 4 lodge days x EUR 300 (notes EUR 230-370/day, midpoint; 4 days = my call) minus the 4 x EUR 62 daily rate already in the block budget (no double count)', 952, 'tour'),
      ] },
    ],
  },

  'gt_seed_peru-bolivia-andes-salt-flats-20-days': {
    checked: '2026-10-29',
    flight_in_cost: 550,    // AMS-Lima one way with a connection (notes: return EUR 800-950; est)
    flight_out_cost: 650,   // La Paz-AMS one way with a connection (est, La Paz pricier than Lima)
    blocks: [
      { code: 'PE', transport: 70, local: 0, extras: [] },        // flight Lima-Cusco LATAM/Sky/JetSMART booked ahead (est)
      { code: 'PE', transport: 3, local: 0, extras: [] },         // collectivo Cusco-Pisac (est)
      { code: 'PE', transport: 63, local: 15, extras: [] },       // train Ollantaytambo-Aguas Calientes Expedition USD 72 (notes); Pisac/Ollantaytambo/Chinchero-Moray collectivos+taxi (est)
      { code: 'PE', transport: 88, local: 0, extras: [           // train back ~70 (est) + tourist bus Cusco-Puno ~18 (est)
        rbExtra('Machu Picchu entrance ~S/163 = USD 55 (notes)', 48, 'park_fee'),
      ] },
      { code: 'PE', transport: 10, local: 0, extras: [] },        // bus Puno-Copacabana incl. border (est)
      { code: 'BO', transport: 6, local: 0, extras: [] },         // bus Copacabana-La Paz incl. Tiquina ferry (est)
      { code: 'BO', transport: 17, local: 0, extras: [] },        // overnight bus La Paz-Uyuni (est)
      { code: 'BO', transport: 17, local: 0, extras: [            // bus Uyuni-La Paz (est)
        rbExtra('Uyuni 3-day/2-night jeep tour (notes USD 150-280, midpoint USD 215)', 187, 'tour'),
      ] },
      { code: 'BO', local: 0, extras: [] },
    ],
  },

  'gt_seed_senegambia': {
    checked: '2026-10-29',
    flight_in_cost: 350,    // AMS-Dakar one way (notes: return EUR 500-900; est)
    flight_out_cost: 320,   // Banjul-AMS one way, winter TUI fly/Corendon (est)
    blocks: [
      { code: 'SN', transport: 15, local: 45, extras: [] },       // bus/shared taxi Sine-Saloum-Banjul incl. border (est); Dakar-Lompoul-Saint-Louis-Sine-Saloum (est)
      { code: 'GM', local: 15, extras: [
        rbExtra('Gambia airport security fee on exit via Banjul (notes ~USD 20)', 17, 'other'),
      ] },
    ],
  },

  'gt_seed_central-africa-islands': {
    checked: '2026-10-29',
    flight_in_cost: 480,    // AMS-Douala one way via Paris/Brussels (notes: return EUR 700-1,150; est)
    flight_out_cost: 700,   // Libreville-AMS one way (flights_from_ams.csv LBV back, medium)
    blocks: [
      { code: 'CM', transport: 336, local: 16, extras: [          // bus Kribi-Douala ~6 + flight Douala-Sao Tome via hub ~330 (est, low); Douala-Yaounde-Kribi buses (est)
        rbExtra('Cameroon e-visa (notes EUR 150-230, midpoint)', 190, 'visa'),
      ] },
      { code: 'ST', transport: 250, local: 130, extras: [         // flight Sao Tome-Libreville (est, low); Sao Tome-Principe flights return ~120 + taxis (est)
        rbExtra('Sao Tome e-visa (no fee in VISA file; est)', 75, 'visa'),
      ] },
      { code: 'GA', local: 0, extras: [
        rbExtra('Loango logistics 3 days x USD 200 (notes USD 100-300+/day, midpoint; 3 days = my call; transfers assumed inside)', 522, 'tour'),
        rbExtra('Gabon e-visa (no fee in VISA file; est)', 115, 'visa'),
      ] },
    ],
  },

  'gt_seed_uruguay': {
    checked: '2026-10-29',
    flight_in_cost: 560,    // AMS-Montevideo one way, one stop (notes: return EUR 850-1,100; est)
    flight_out_cost: 520,   // Montevideo-AMS one way (est)
    blocks: [
      { code: 'UY', local: 70, extras: [                           // buses Montevideo-Colonia-Punta del Este-Cabo Polonio-Punta del Diablo-Montevideo (est)
        rbExtra('Estancia (working ranch) stay, 1 night all-inclusive (notes EUR 130-215, midpoint)', 172, 'other', true),
        rbExtra('Carmelo/Canelones wine tour (notes EUR 45-90, midpoint)', 68, 'tour', true),
      ] },
    ],
  },
