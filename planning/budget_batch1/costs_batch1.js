// Phase 4 batch 1 (Grand Expeditions), extracted 2026-10-27 by 5 Sonnet agents. NOT yet in RB_ROUTE_COSTS:
// waiting for Youri's review (REVIEW.md). Entries go into RB_ROUTE_COSTS as-is once approved/edited.

// ---- group p1 ----
  'gt_seed_eurasia-grand-tour': {
    checked: '2026-10-27',
    flight_in_cost: 230,   // AMS-Sarajevo one way (Air Serbia/Lufthansa-type typical fare, not the EUR134 promo)
    flight_out_cost: 470,  // Singapore-Amsterdam one way (same as pilot)
    blocks: [
      { code: 'BA', transport: 25, local: 25, extras: [] },     // bus Mostar/Sarajevo-Dubrovnik; Sarajevo-Mostar-Trebinje (est)
      { code: 'HR', transport: 20, local: 0, extras: [] },      // bus Dubrovnik-Kotor (est)
      { code: 'ME', transport: 20, local: 25, extras: [] },     // bus to Tirana/Shkoder (est)
      { code: 'AL', transport: 10, local: 40, extras: [] },     // Korce-Ohrid bus (est)
      { code: 'MK', transport: 110, local: 10, extras: [] },    // flight Skopje-Istanbul (est)
      { code: 'TR', transport: 30, local: 200, extras: [        // bus Kars/Trabzon-Tbilisi; Istanbul-Aegean-Antalya-Cappadocia-Ankara-Kars (est)
        rbExtra('Sunrise hot-air balloon flight, Cappadocia', 170, 'tour', true),
      ] },
      { code: 'GE', transport: 15, local: 90, extras: [] },     // Batumi-Tbilisi-Yerevan marshrutka; Mestia marshrutkas ~17 each way
      { code: 'AM', transport: 40, local: 25, extras: [] },     // Yerevan-Tbilisi-Baku overland (est)
      { code: 'AZ', transport: 200, local: 25, extras: [        // flight Baku-Almaty (est)
        rbExtra('ASAN e-visa (USD 23)', 21, 'visa'),
      ] },
      { code: 'KZ', transport: 12, local: 50, extras: [] },     // bus Almaty-Bishkek; Almaty-Turkistan/Shymkent train (est)
      { code: 'KG', transport: 45, local: 90, extras: [] },     // shared jeep Osh-Khorog; Bishkek-Karakol-Song-Kul-Osh (est)
      { code: 'TJ', transport: 25, local: 60, extras: [         // shared taxi Dushanbe-Samarkand
        rbExtra('GBAO permit for the Pamir Highway (USD 20)', 18, 'visa'),
        rbExtra('Pamir shared 4x4 + driver (Khorog-Murghab area)', 250, 'transport'),
      ] },
      { code: 'UZ', transport: 280, local: 110, extras: [] },   // flight Tashkent-Xian (est); Afrosiyob trains + Urgench-Tashkent flight (est)
      { code: 'CN', transport: 135, local: 320, extras: [       // Trans-Mongolian train Beijing-UB (est); local reused from pilot
        rbExtra('Major entrance tickets (Great Wall, Terracotta Army, Zhangjiajie, Li River)', 150, 'park_fee'),
      ] },
      { code: 'MN', transport: 350, local: 285, extras: [       // flight UB-Tokyo (KE/MIAT typical)
        rbExtra('Gobi jeep tour (~6 days, shared 4x4, guide, ger camps)', 700, 'tour'),
      ] },
      { code: 'JP', transport: 115, local: 370, extras: [       // pilot
        rbExtra('One ryokan night with onsen + dinner (surcharge)', 80, 'tour'),
      ] },
      { code: 'TW', transport: 115, local: 111, extras: [] },   // pilot
      { code: 'VN', transport: 38, local: 210, extras: [        // pilot
        rbExtra('Ha Giang Loop with an easy rider (4 days)', 230, 'tour'),
        rbExtra('Ha Long / Lan Ha Bay cruise (2 days, 1 night)', 160, 'tour'),
      ] },
      { code: 'KH', transport: 20, local: 45, extras: [         // pilot
        rbExtra('E-visa', 30, 'visa'),
        rbExtra('Angkor 3-day pass', 53, 'park_fee'),
        rbExtra('Tuk-tuk for Angkor (3 days)', 70, 'tour'),
      ] },
      { code: 'LA', transport: 50, local: 85, extras: [         // pilot
        rbExtra('E-visa / visa on arrival', 35, 'visa'),
      ] },
      { code: 'TH', transport: 30, local: 170, extras: [] },    // speedboat Koh Lipe-Langkawi (est); local from pilot
      { code: 'MY', transport: 50, local: 45, extras: [] },     // Peninsula (pilot)
      { code: 'MY', transport: 45, local: 0, extras: [] },      // Sarawak (pilot)
      { code: 'BN', transport: 30, local: 0, extras: [
        rbExtra('Ulu Temburong NP (mandatory guided tour)', 120, 'tour'),
      ] },
      { code: 'MY', transport: 100, local: 60, extras: [        // Sabah (pilot)
        rbExtra('Kinabatangan River tour (2 days, 1 night)', 150, 'tour'),
        rbExtra('Mount Kinabalu climb (guide, permit, hut; notes EUR 250-350)', 300, 'tour', true),
        rbExtra('Sipadan diving (notes EUR 150-250/day)', 200, 'tour', true),
      ] },
      { code: 'PH', transport: 200, local: 255, extras: [       // pilot
        rbExtra('El Nido-Coron boat expedition', 265, 'tour'),
        rbExtra('Island-hopping tours (El Nido, Coron, Bohol)', 90, 'tour'),
        rbExtra('Diving course (Open Water) or fun dives', 350, 'tour', true),
      ] },
      { code: 'ID', transport: 45, local: 280, extras: [        // bus Kupang-Dili; local est (Sumatra, Sumatra-Lombok flight, Lombok-Gili, Labuan Bajo-Kupang flight)
        rbExtra('e-VOA (single, 21 days)', 30, 'visa'),
        rbExtra('Bukit Lawang jungle trek (2 days)', 120, 'tour'),
        rbExtra('Komodo boat trip (2D1N-3D2N)', 200, 'tour'),
        rbExtra('Rinjani trek (Lombok)', 200, 'tour', true),
      ] },
      { code: 'TL', transport: 330, local: 30, extras: [        // pilot
        rbExtra('Visa Application Authorisation (overland entry) + USD 30 border fee', 28, 'visa'),
        rbExtra('Getting to Jaco Island (bus + boat, or shared 4x4)', 100, 'tour'),
      ] },
      { code: 'SG', local: 0, extras: [] },
    ],
  },
  'gt_seed_india-himalaya-expedition': {
    checked: '2026-10-27',
    flight_in_cost: 650,   // AMS-Delhi one way (connecting typical; KLM nonstop EUR 850+)
    flight_out_cost: 900,  // Paro-Amsterdam one way (Paro-Delhi/Bangkok + long haul, 2 tickets)
    blocks: [
      { code: 'IN', transport: 30, local: 170, extras: [        // Varanasi-Sunauli bus + Sunauli-Pokhara bus; trains/buses Rajasthan-Manali-Rishikesh-Varanasi (est)
        rbExtra('e-Tourist visa (1-year multi-entry, USD 40)', 36, 'visa'),
        rbExtra('Jaisalmer overnight camel safari / desert camp', 45, 'tour'),
        rbExtra('Rohtang Pass permit (INR 550)', 6, 'park_fee', true),
      ] },
      { code: 'NP', transport: 402, local: 50, extras: [        // flight Kathmandu-Paro, notes USD 400-500 -> USD 450
        rbExtra('Visa on arrival, 30 days (USD 50)', 45, 'visa'),
        rbExtra('Chitwan NP entry (NPR 2,000/day x 3)', 40, 'park_fee'),
        rbExtra('Chitwan jeep/canoe safari', 50, 'tour'),
        rbExtra('Durbar Square entrance fees (Kathmandu, Patan, Bhaktapur)', 25, 'park_fee'),
      ] },
      { code: 'BT', local: 0, extras: [
        // SDF (USD 100/night) is already in the €284/day block budget per the notes: not repeated here
        rbExtra('Bhutan visa (USD 40)', 36, 'visa'),
        rbExtra('Domestic flight Paro-Bumthang (and back)', 160, 'transport', true),
      ] },
    ],
  },
  'gt_seed_patagonia-antarctica-expedition': {
    checked: '2026-10-27',
    flight_in_cost: 800,   // AMS-Puerto Montt one way (via Santiago)
    flight_out_cost: 1100, // Ushuaia-AMS one way (via Buenos Aires)
    blocks: [
      { code: 'CL', transport: 100, local: 160, extras: [      // Rio Tranquilo-Chile Chico + Los Antiguos-El Calafate buses; Carretera Austral buses/ferries (est)
        rbExtra('Marble Caves boat tour', 25, 'tour'),
        rbExtra('Cerro Castillo CONAF entry', 10, 'park_fee'),
        rbExtra('Queulat hanging glacier lagoon boat', 25, 'tour', true),
      ] },
      { code: 'AR', transport: 45, local: 70, extras: [        // Calafate-Torres del Paine bus via Cancha Carrera (est); Calafate-Perito Moreno, Calafate-Chalten
        rbExtra('Perito Moreno park entry', 30, 'park_fee'),
        rbExtra('Perito Moreno ice trek (Minitrekking / Big Ice)', 190, 'tour', true),
      ] },
      { code: 'CL', transport: 65, local: 55, extras: [        // Punta Arenas-Ushuaia bus incl. Magellan ferry (est)
        rbExtra('Torres del Paine park entry (high season)', 45, 'park_fee'),
        rbExtra('W trek refugio surcharge (full board, 4 nights)', 200, 'tour'),
        rbExtra('Isla Magdalena penguin boat trip', 55, 'tour'),
      ] },
      { code: 'AR', transport: 0, local: 0, extras: [          // boarding in Ushuaia, cruise is in the AQ block budget
        rbExtra('Tierra del Fuego NP entry', 25, 'park_fee'),
        rbExtra('Beagle Channel catamaran trip', 55, 'tour'),
        rbExtra('End of the World Train', 55, 'tour', true),
      ] },
      { code: 'AQ', local: 0, extras: [
        rbExtra('Antarctica expedition cruise (ALREADY in the block budget EUR 9,500, not counted twice)', 9500, 'tour', true),
      ] },
    ],
  },

// ---- group p2 ----
  'gt_seed_pan-american-grand-tour': {
    checked: '2026-10-27',
    flight_in_cost: 550,   // AMS-Mexico City one way (KLM direct / Aeromexico), typical ~$600-700
    flight_out_cost: 650,  // Rio (GIG) - AMS one way, typical ~$700-1100
    blocks: [
      { code: 'MX', transport: 60, local: 140, extras: [] },   // est: Bacalar-Huehuetenango via Comitan/La Mesilla ~60; ADO buses CDMX-Oaxaca-SCLC-Palenque-Merida-Tulum-Bacalar ~140
      { code: 'GT', transport: 25, local: 80, extras: [
        rbExtra('Tikal sunrise tour (entrance + guide/transport)', 60, 'tour'),   // est
      ] },
      { code: 'BZ', transport: 85, local: 120, extras: [   // ferry Placencia-Puerto Cortes est; water taxis + buses
        rbExtra('ATM cave tour (San Ignacio)', 90, 'tour'),   // est
        rbExtra('Hol Chan / Shark Ray Alley snorkel trip', 55, 'tour'),   // est
        rbExtra('Belize land-border exit fee', 22, 'other'),   // est
      ] },
      { code: 'HN', transport: 25, local: 125, extras: [
        rbExtra('Copan ruins entrance + museum', 17, 'park_fee'),   // est
      ] },
      { code: 'SV', transport: 45, local: 40, extras: [] },
      { code: 'NI', transport: 15, local: 40, extras: [
        rbExtra('Nicaragua land-border entry/exit fees', 16, 'other'),   // est
      ] },
      { code: 'CR', transport: 20, local: 160, extras: [
        rbExtra('National park/reserve entrances (Manuel Antonio, Monteverde, Arenal waterfall, Rincon de la Vieja)', 110, 'park_fee'),   // notes: $15-22 each; est 4-5 sites
      ] },
      { code: 'PA', transport: 540, local: 55, extras: [   // sailboat San Blas to Cartagena 4-5 days all-in, est
        rbExtra('Panama Canal Miraflores Locks visitor center', 18, 'activity'),
        rbExtra('Bocas del Toro island-hopping boat tour', 25, 'tour'),   // est
      ] },
      { code: 'CO', transport: 55, local: 140, extras: [   // San Agustin-Pasto-Ipiales-Tulcan-Quito
        rbExtra('Tayrona park entrance (foreigner)', 19, 'park_fee'),
        rbExtra('Ciudad Perdida (Lost City) trek 4-5 days', 340, 'tour', true),   // est; notes only mention the trailhead
      ] },
      { code: 'EC', transport: 30, local: 435, extras: [   // local: ~35 buses + ~400 Quito/Guayaquil-Galapagos return flight, est
        rbExtra('Galapagos park entrance $200 + transit card $20', 197, 'park_fee'),
      ] },
      { code: 'PE', transport: 20, local: 160, extras: [
        rbExtra('Machu Picchu train + entrance + bus', 200, 'tour'),   // notes ~150-250
        rbExtra('Cusco Boleto Turistico', 32, 'park_fee'),   // est
      ] },
      { code: 'BO', transport: 160, local: 40, extras: [] },   // transport = 3-day Uyuni jeep tour to San Pedro, notes ~140-180
      { code: 'CL', transport: 65, local: 60, extras: [   // Paso de Jama bus San Pedro-Salta est
        rbExtra('Tatio Geysers tour', 45, 'tour'),   // est
        rbExtra('Valle de la Luna entrance + tour', 30, 'tour'),   // est
      ] },
      { code: 'AR', transport: 240, local: 50, extras: [] },   // flight Salta-(Buenos Aires)-Foz do Iguacu, est
      { code: 'BR', local: 180, extras: [
        rbExtra('Iguazu Falls (Brazilian side) entrance', 18, 'park_fee'),
        rbExtra('Christ the Redeemer + Sugarloaf tickets', 45, 'activity'),
      ] },
    ],
  },
  'gt_seed_caribbean-amazon-expedition': {
    checked: '2026-10-27',
    flight_in_cost: 520,   // AMS-Havana one way (connection, no direct), avg ~$560
    flight_out_cost: 480,  // Fortaleza-AMS one way, avg ~$510
    blocks: [
      { code: 'CU', transport: 445, local: 60, extras: [   // Trinidad-Havana bus ~25 + Havana-Kingston flight ~420 (Copa/Cayman via PTY/GCM)
        rbExtra('Cuba e-Visa', 45, 'visa'),   // notes ~$50
      ] },
      { code: 'JM', transport: 450, local: 45, extras: [   // KIN-CUR flight, avg ~$526
        rbExtra("Dunn's River Falls entrance", 23, 'activity'),   // est $25
        rbExtra('Rio Grande bamboo rafting (Port Antonio)', 35, 'tour'),   // est
      ] },
      { code: 'CW', transport: 100, local: 0, extras: [] },   // CUR-BON short flight, est
      { code: 'BQ', transport: 480, local: 0, extras: [   // BON-PTP via Aruba/PTY/SJU, est (sources 480-700)
        rbExtra('Bonaire entry tax', 70, 'other'),   // notes ~EUR 70
        rbExtra('Bonaire Marine Park nature fee', 22, 'park_fee'),   // est $25
        rbExtra('Washington Slagbaai NP entrance', 14, 'park_fee'),   // est $15
      ] },
      { code: 'GP', transport: 70, local: 50, extras: [] },   // L'Express des Iles PTP-Dominica est; Saintes ferry
      { code: 'DM', transport: 85, local: 20, extras: [   // ferry Roseau-St Lucia (via Martinique) est
        rbExtra('Boiling Lake mandatory guide', 62, 'tour'),   // notes ~55-70
        rbExtra('Dominica site pass / trail fees', 15, 'park_fee'),   // est
      ] },
      { code: 'LC', transport: 250, local: 40, extras: [   // LC-GD flight, est
        rbExtra('Gros Piton guided climb', 65, 'tour'),   // est
        rbExtra('Sulphur Springs entrance', 9, 'park_fee'),   // notes EC$26 at 3.02 EC$/EUR
        rbExtra('Tet Paul Nature Trail', 9, 'park_fee'),   // est
      ] },
      { code: 'GD', transport: 250, local: 20, extras: [   // GD-Paramaribo via Port of Spain, est (trip.com ~EUR 165-300)
        rbExtra('Underwater Sculpture Park snorkel trip', 36, 'tour'),   // est
        rbExtra('Grand Etang NP entrance', 5, 'park_fee'),   // est
      ] },
      { code: 'SR', transport: 200, local: 40, extras: [   // PBM-Belem, ~$215
        rbExtra('ICF entry form fee', 36, 'visa'),   // est ~$40
        rbExtra('Upper Suriname River Maroon-village trip (3-4 days)', 330, 'tour'),   // est; notes: tours $70-120/day
        rbExtra('Brownsberg Nature Park entrance + transfer', 35, 'park_fee'),   // est
      ] },
      { code: 'BR', local: 140, extras: [
        rbExtra('Lencois Maranhenses 4x4 lagoon trip', 20, 'tour'),   // est
      ] },
    ],
  },
  'gt_seed_west-central-africa-expedition': {
    checked: '2026-10-27',
    flight_in_cost: 250,   // AMS-Sao Vicente (VXE) one way, TAP via Lisbon; round trips ~EUR 330-375 => one way ~250
    flight_out_cost: 700,  // Libreville-AMS one way (Turkish/Royal Air Maroc/Air France via hub), ~$770
    blocks: [
      { code: 'CV', transport: 240, local: 214, extras: [   // transport = Praia-Dakar flight est; local = ferries + 2 Fogo flights (~85 each, notes) + aluguer
        rbExtra('EASE pre-travel authorisation', 35, 'visa'),
      ] },
      { code: 'SN', transport: 15, local: 65, extras: [] },
      { code: 'GM', transport: 380, local: 15, extras: [   // Banjul-Abidjan flight est (ASKY via Lome/Accra)
        rbExtra('Gambia River cruise to Kunta Kinteh Island', 45, 'tour'),   // est
        rbExtra('Makasutu Culture Forest entrance', 25, 'park_fee'),   // est
      ] },
      { code: 'CI', transport: 20, local: 4, extras: [
        rbExtra('E-visa', 73, 'visa'),
      ] },
      { code: 'GH', transport: 10, local: 30, extras: [
        rbExtra('E-visa (~$260)', 232, 'visa'),
      ] },
      { code: 'TG', transport: 8, local: 4, extras: [
        rbExtra('E-visa 15 days (25,000 CFA)', 38, 'visa'),
      ] },
      { code: 'BJ', transport: 400, local: 20, extras: [   // Cotonou-Douala flight ~$444 (Expedia) / EUR 249 (Skyscanner low)
        rbExtra('E-visa', 75, 'visa'),   // file: EUR 50-100
        rbExtra('Ganvie stilt village pirogue trip', 12, 'tour'),   // est
      ] },
      { code: 'CM', transport: 358, local: 17, extras: [   // Kribi-Douala bus ~8 + Douala-Sao Tome flight ~350 est
        rbExtra('E-visa', 190, 'visa'),   // notes ~EUR 150-230
      ] },
      { code: 'ST', transport: 280, local: 180, extras: [   // ST-Libreville flight est; local = Sao Tome-Principe return flight ~160 + taxis
        rbExtra('E-visa', 40, 'visa'),   // est
      ] },
      { code: 'GA', local: 200, extras: [   // Libreville-Loango return by road/flight+boat, est
        rbExtra('Loango NP permits, guide, boat', 200, 'park_fee'),   // est; notes: $100-300+/day
        rbExtra('Pongara NP boat trip', 45, 'tour'),   // est
        rbExtra('E-visa', 90, 'visa'),   // est, fee not in file
      ] },
    ],
  },

// ---- group c1 ----
// Group c1, checked 2026-10-27. FX: USD 1.1188/EUR, ZAR 20/EUR (assumed), JOD 1.26 EUR, OMR 2.32 EUR, BHD 2.37 EUR.
'gt_seed_africa-grand-tour': {
  checked: '2026-10-27',
  flight_in_cost: 620,   // Amsterdam-Cape Town one way (typical, via hub)
  flight_out_cost: 230,  // Cairo-Amsterdam one way
  blocks: [
    // ZA+LS+SZ: ONE rental stretch (Cape Town to Eswatini, ~35 days) judged to be IN the daily rate (see review); only the extras below are added
    { code: 'ZA', transport: 0, local: 0, extras: [
      rbExtra('Cross-border letters for Lesotho + Eswatini (ZAR 2 x ~1,000) + border road fees', 120, 'transport'),  // est
      rbExtra('One-way drop fee: Cape Town rental dropped near Eswatini/Nelspruit (cannot go on to Mozambique)', 200, 'transport'),  // est
    ] },
    { code: 'LS', transport: 0, local: 0, extras: [
      rbExtra('Sani Pass guided 4x4 day tour (ZAR 3,845)', 190, 'tour'),  // 3845/20; notes call it a separate cost
    ] },
    { code: 'SZ', transport: 15, local: 0, extras: [   // bus Mbabane-Maputo, est
      rbExtra('Hlane guided game drive (~EUR 25-35)', 30, 'activity'),
    ] },
    { code: 'MZ', transport: 90, local: 350, extras: [   // transport: Nampula-Zimbabwe long-distance bus/shuttle, est; local: 2 domestic flights (LAM, EUR 300-400)
      rbExtra('Mozambique eTA (evisa.gov.mz)', 10, 'visa'),
      rbExtra('Bazaruto dhow/boat trip (EUR 80-140)', 110, 'tour'),
    ] },
    { code: 'ZW', transport: 35, local: 80, extras: [   // transport: Vic Falls-Kasane shuttle, est; local: buses Harare-Great Zimbabwe-Bulawayo-Hwange-Vic Falls, est
      rbExtra('Visa on arrival / e-visa (USD 30-55 midpoint)', 38, 'visa'),
      rbExtra('Mana Pools guided multi-day walking/canoe safari (EUR 1,300-1,650 all-in)', 1475, 'tour'),
    ] },
    { code: 'BW', transport: 60, local: 90, extras: [] },   // transport: bus/shuttle Maun/Ghanzi-Windhoek, est; local: Kasane-Maun-Gweta buses/transfers, est
    // NA: 4x4 rental explicitly inside the EUR 200/day (note: rental EUR 70-90/day), local = 0
    { code: 'NA', transport: 60, local: 0, extras: [   // transport: bus Ondangwa/Oshikango-Lubango, est
      rbExtra('Namibia visa on arrival (NAD 1,600)', 82, 'visa'),
      rbExtra('One-way drop fee for Windhoek rental dropped in the north (AO rentals not allowed across)', 120, 'transport'),  // est
    ] },
    // transport: 2-3 days 4x4 + driver Lubango/Menongue to Jimbe (table: EUR 250-350/day), est, biggest unknown; local: Lubango-Luanda-Lubango flights, est
    { code: 'AO', transport: 600, local: 220, extras: [] },
    { code: 'ZM', transport: 25, local: 150, extras: [] },   // transport: bus Mfuwe/Chipata-Lilongwe; local: buses Chavuma-Lusaka-Livingstone-Lusaka-Mfuwe, est
    { code: 'MW', transport: 380, local: 40, extras: [   // transport: flight Lilongwe-Antananarivo via JNB/NBO, est
      rbExtra('Malawi e-visa (USD 75)', 67, 'visa'),
    ] },
    { code: 'MG', transport: 230, local: 430, extras: [   // transport: flight Tana-Mauritius, est; local: Nosy Be return flight 230 (EUR 210-250) + Morondava return flight ~200 (est)
      rbExtra('Madagascar 30-day e-visa', 34, 'visa'),
      rbExtra('Private 4x4 + driver Tana-Andasibe and Tana-Isalo (EUR 400-500)', 450, 'transport'),
    ] },
    { code: 'MU', transport: 380, local: 0, extras: [   // transport: flight to Dar/Zanzibar via JNB/NBO, est
      rbExtra('Ile aux Cerfs organised day tour (EUR 50-70)', 60, 'tour'),
    ] },
    { code: 'TZ', transport: 85, local: 170, extras: [   // transport: Dar-Kigali bus (Rusumo) est; local: JRO-ZNZ flight ~110, ZNZ-Dar ferry ~30, Arusha buses, est
      rbExtra('Tanzania e-visa (USD 50)', 45, 'visa'),
    ] },
    { code: 'RW', transport: 20, local: 15, extras: [   // transport: bus Kigali-Kampala/Kabale, est
      rbExtra('Rwanda e-visa / VOA (USD 50)', 45, 'visa'),
    ] },
    { code: 'UG', transport: 30, local: 90, extras: [   // transport: bus Kampala-Nairobi, est
      rbExtra('Uganda e-visa (USD 50)', 45, 'visa'),
    ] },
    { code: 'KE', transport: 80, local: 90, extras: [   // transport: Nanyuki-Moyale-Addis buses, est
      rbExtra('Kenya eTA (USD 51)', 46, 'visa'),
    ] },
    { code: 'ET', transport: 270, local: 510, extras: [   // transport: Addis-Cairo flight, est; local: flights Addis-Lalibela-Gondar-Addis ~400 + Omo/Jinka-Addis ~110 est
      rbExtra('Ethiopia e-visa (USD 62)', 55, 'visa'),
      rbExtra('Danakil 3-day guided tour (escort/permits incl.)', 430, 'tour'),
      rbExtra('Simien Mountains trek (park/scout/guide/mule, 3-4 days)', 175, 'tour'),
      rbExtra('Omo Valley 4x4 + driver + guide (~4 days)', 450, 'transport'),  // est
    ] },
    { code: 'EG', local: 200, extras: [   // local: trains Cairo-Luxor-Aswan, Aswan-Cairo flight, Dahab/Alexandria buses, Abu Simbel, est
      rbExtra('Egypt e-visa (USD 25-45 midpoint)', 31, 'visa'),
      rbExtra('Nile cruise Luxor-Aswan, tourist class 3-4 nights (EUR 320-550)', 435, 'tour'),
    ] },
  ],
},
'gt_seed_mediterranean-civilizations-expedition': {
  checked: '2026-10-27',
  flight_in_cost: 110,   // Amsterdam-Malaga one way (typical, KLM/easyJet/Transavia)
  flight_out_cost: 420,  // Doha-Amsterdam one way
  blocks: [
    { code: 'ES', transport: 65, local: 70, extras: [] },   // transport: bus Seville-Algeciras ~25 + ferry Algeciras-Tangier ~40
    { code: 'MA', transport: 140, local: 60, extras: [] },  // transport: flight Marrakech/Casablanca-Tunis, est
    { code: 'TN', transport: 110, local: 25, extras: [] },  // transport: flight Tunis-Malta, est
    { code: 'MT', transport: 65, local: 0, extras: [] },    // Virtu ferry Valletta-Pozzallo/Catania, est
    { code: 'IT', transport: 5, local: 90, extras: [] },    // Sicily: Messina-Reggio strait ferry; buses/trains
    { code: 'IT', transport: 35, local: 45, extras: [] },   // Reggio-Naples train ~40 + Circumvesuviana; Naples-Rome high-speed
    { code: 'IT', transport: 75, local: 0, extras: [] },    // Rome-Cagliari flight, est
    { code: 'IT', transport: 20, local: 45, extras: [] },   // Sardinia: ARST buses; Santa Teresa-Bonifacio ferry
    { code: 'FR', transport: 70, local: 50, extras: [] },   // Corsica: bus; Ajaccio-Marseille deck ferry, est
    { code: 'FR', transport: 100, local: 35, extras: [] },  // Marseille-Athens flight, est
    { code: 'GR', transport: 50, local: 150, extras: [] },  // Piraeus-Heraklion deck ferry; Peloponnese/Olympia/Delphi/Meteora buses/trains, est
    { code: 'GR', transport: 140, local: 55, extras: [] },  // Heraklion-Larnaca via Athens flight, est
    { code: 'CY', transport: 90, local: 30, extras: [] },   // Larnaca-Istanbul flight, est
    { code: 'TR', transport: 200, local: 110, extras: [] }, // Kayseri-Istanbul ~50 + Istanbul-Cairo ~150, est; local buses Istanbul-Troy-Pergamon-Ephesus-Pamukkale-Cappadocia
    { code: 'EG', transport: 155, local: 125, extras: [     // Aswan-Cairo flight ~70 + bus Cairo-Nuweiba ~20 + ferry Nuweiba-Aqaba USD 75
      rbExtra('Egypt e-visa (USD 25-45 midpoint)', 31, 'visa'),
    ] },
    { code: 'JO', transport: 180, local: 85, extras: [     // Amman-Muscat flight, est
      rbExtra('Jordan Pass (JOD 50-60; visa fee waived, Petra/Jerash/Wadi Rum entries)', 69, 'visa'),
      rbExtra('Wadi Rum jeep tour + camp night', 90, 'tour'),  // est
    ] },
    // OM: rental 4x4/tour judged IN the daily rate (EUR 110/day)
    { code: 'OM', transport: 170, local: 0, extras: [      // Muscat-Manama flight, est
      rbExtra('Oman e-visa (30 days, ~OMR 20)', 46, 'visa'),  // est
    ] },
    { code: 'BH', transport: 110, local: 0, extras: [      // Manama-Doha flight, est
      rbExtra('Bahrain e-visa (14 days, ~BHD 9.5)', 22, 'visa'),
    ] },
    { code: 'QA', local: 0, extras: [] },
  ],
},

// ---- group c2 ----
// Group c2 (car routes). FX used: USD 1.1188, CAD 1.60, AUD 1.65, NZD 1.95, NOK 11.5, SEK 11, DKK 7.46, FJD 2.55 per EUR.
'gt_seed_nordic-arctic-expedition': {
  checked: '2026-10-27',
  flight_in_cost: 150,   // AMS-HEL one way (KLM/Finnair/airBaltic, typical not promo)
  flight_out_cost: 650,  // Ilulissat-Reykjavik (~500, est) + Reykjavik-AMS (~150); no through fare found
  blocks: [
    { code: 'FI', transport: 130, local: 145, extras: [   // transport: Inari-Rovaniemi bus 60 + Rovaniemi-Kiruna bus/train 70 (est)
      // local: Helsinki-Rovaniemi night train 60, Rovaniemi-Inari bus 60, Inari-Lemmenjoki 25 (all est)
      rbExtra('Lemmenjoki river boat-taxi to the gold-panning area (Kultahamina)', 60, 'tour', true),
    ] },
    { code: 'SE', transport: 40, local: 25, extras: [    // Kiruna-Narvik train; Kiruna-Jukkasjarvi/Abisko local trains+bus
      rbExtra('LKAB Kiruna mine tour (~SEK 600, est)', 55, 'tour'),
      rbExtra('ICEHOTEL 365 visit, Jukkasjarvi (est)', 32, 'activity'),
    ] },
    { code: 'NO', transport: 295, local: 285, extras: [  // transport: Wideroe HVG-Tromso ~130 + SAS Tromso-Longyearbyen ~165 (est)
      // local: Narvik-Svolvaer 45, Lofoten-Senja 80, Senja-Tromso 35, Tromso-Alta 45, Alta-Honningsvag 55, to North Cape 22 (est)
      rbExtra('Narvik Fjellheisen cable car (est)', 30, 'activity'),
      rbExtra('Tromso Fjellheisen cable car (est)', 37, 'activity'),
      rbExtra('North Cape plateau entry (~NOK 335)', 29, 'park_fee'),
      rbExtra('Tromso whale-watching / fjord boat tour (est)', 130, 'tour', true),
    ] },
    { code: 'SJ', transport: 300, local: 0, extras: [     // Longyearbyen-Oslo-Copenhagen SAS (est)
      rbExtra('Pyramiden day boat trip from Longyearbyen (guide incl.)', 170, 'tour'),
      rbExtra('Second day tour (glacier/kayak/wheeled dog-sled, est)', 150, 'tour', true),
    ] },
    { code: 'DK', transport: 200, local: 0, extras: [     // Atlantic Airways CPH-Vagar ~DKK 1500 (est)
      rbExtra('Tivoli Gardens entry (~DKK 155)', 21, 'activity'),
    ] },
    { code: 'FO', transport: 250, local: 0, extras: [     // Vagar-Reykjavik Atlantic Airways (est)
      rbExtra('Car: 4 rental days x 110 + fuel ~350 km + tunnel tolls', 535, 'transport'),
      rbExtra('Vestmanna Cliffs boat tour (~DKK 500)', 67, 'tour'),
      rbExtra('Sorvagsvatn / Traelanipa trail fee (~DKK 200, per notes)', 27, 'park_fee'),
      rbExtra('Saksun access/parking fee (est)', 10, 'park_fee'),
    ] },
    { code: 'IS', transport: 450, local: 0, extras: [     // Keflavik-Nuuk Icelandair/Air Greenland (est); rental car in the daily rate
      rbExtra('Vatnajokull guided glacier hike (est)', 90, 'tour'),
      rbExtra('Silfra snorkelling (est)', 150, 'tour', true),
      rbExtra('Akureyri/Eyjafjordur whale watching (est)', 95, 'tour', true),
    ] },
    { code: 'GL', local: 0, extras: [   // local 0: domestic Nuuk-Ilulissat flight judged to be in the daily rate (see review); alternative ~470
      rbExtra('Eqi Glacier boat excursion from Ilulissat (est)', 270, 'tour'),
      rbExtra('Disko Bay boat tour (whales/icebergs, est)', 135, 'tour', true),
    ] },
  ],
},
'gt_seed_north-america-grand-traverse': {
  checked: '2026-10-27',
  flight_in_cost: 400,   // AMS-Halifax one way, typical economy with a connection
  flight_out_cost: 380,  // San Francisco-AMS one way (~USD 425)
  blocks: [
    { code: 'CA', transport: 230, local: 0, extras: [     // Halifax-Quebec flight (est CAD 370); car 1 in the daily rate
      rbExtra('eTA Canada (CAD 7, 5 years; per route notes)', 5, 'visa'),
    ] },
    { code: 'CA', transport: 220, local: 110, extras: [   // Toronto-Calgary flight (est CAD 350); Via Rail Quebec-Montreal-Ottawa-Toronto (est CAD 175)
      rbExtra('Niagara Falls day trip (bus + boat, est)', 50, 'tour'),
    ] },
    { code: 'CA', transport: 0, local: 0, extras: [       // Whistler-Vancouver driven; car 2 in the daily rate
      rbExtra('Parks Canada Discovery Pass (CAD ~75; also covers Cape Breton Highlands)', 47, 'park_fee'),
      rbExtra('One-way drop fee Calgary-Vancouver car 2 (est CAD ~320; route text says none)', 200, 'transport'),
      rbExtra('Moraine Lake / Lake Louise Parks Canada shuttle (est)', 5, 'park_fee'),
      rbExtra('Maligne Lake cruise to Spirit Island (est CAD 90)', 56, 'tour'),
      rbExtra('Columbia Icefield Glacier Adventure (est CAD ~105)', 65, 'tour'),
      rbExtra('Whistler PEAK 2 PEAK gondola (est CAD ~95)', 60, 'activity'),
    ] },
    { code: 'CA', transport: 45, local: 0, extras: [      // Amtrak Cascades Vancouver-Seattle ~USD 50
      rbExtra('Capilano Suspension Bridge / Grouse Mountain (est CAD ~70)', 44, 'activity'),
    ] },
    { code: 'US', transport: 0, local: 0, extras: [        // Seattle-SF driven; car 3 in the daily rate
      rbExtra('ESTA (USD 40.27 since 30 Sep 2025; VISA file still says $21)', 36, 'visa'),
      rbExtra('America the Beautiful annual pass (USD 80; covers Rainier, Olympic, Yosemite, Sequoia)', 72, 'park_fee'),
      rbExtra('One-way drop fee Seattle-San Francisco car 3 (est USD ~300; route text says none)', 270, 'transport'),
    ] },
    { code: 'US', local: 0, extras: [
      rbExtra('Car: 7 rental days x 45 + fuel ~1,075 km (SF-Yosemite-Sequoia-SF)', 397, 'transport'),
      rbExtra('Alcatraz ticket (est USD ~45)', 40, 'activity'),
    ] },
  ],
},
'gt_seed_oceania-grand-expedition': {
  checked: '2026-10-27',
  flight_in_cost: 1500,  // AMS-Port Vila one way via Asia/Sydney/Nadi (aggregators USD 1,200-3,100)
  flight_out_cost: 1100, // Auckland-AMS one way (aggregators USD 1,000-1,700 typical)
  blocks: [
    { code: 'VU', transport: 280, local: 500, extras: [   // Vila-Nadi Fiji Airways (est); local: Vila-Tanna + Vila-Santo return flights (est)
      rbExtra('Mount Yasur tour (entry + 4WD transfer, est)', 100, 'tour'),
      rbExtra('SS President Coolidge wreck dives, 2 dives (est)', 120, 'tour', true),
    ] },
    { code: 'FJ', transport: 300, local: 600, extras: [   // local: Yasawa Flyer pass ~255, Mamanuca ferry ~45, Nadi-Taveuni return flights ~295 (est)
      rbExtra('Sawa-i-Lau cave visit (est)', 15, 'tour'),
      rbExtra('Bouma Heritage Park entry (est)', 8, 'park_fee'),
    ] },
    { code: 'TO', transport: 450, local: 260, extras: [    // Tonga-Samoa via Fiji/Auckland (est); local: Tongatapu-Vava'u return flights (est)
      rbExtra("Humpback whale swim tour, Vava'u (EUR 150-250 per notes)", 200, 'tour'),
      rbExtra("Ha'apai flights (est)", 180, 'transport', true),
    ] },
    { code: 'WS', transport: 700, local: 0, extras: [      // Samoa-Rarotonga via Auckland (est, two tickets)
      rbExtra('To Sua Ocean Trench entry (est)', 10, 'park_fee'),
    ] },
    { code: 'CK', transport: 750, local: 205, extras: [    // Rarotonga-Auckland-Perth (est); local: Air Rarotonga Aitutaki return (est NZD 400)
      rbExtra('Aitutaki lagoon cruise incl. One Foot Island (est NZD 150)', 77, 'tour'),
    ] },
    { code: 'AU', transport: 0, local: 0, extras: [        // Perth-Darwin by car (notes' main option), car returned in Darwin
      rbExtra('Car: 4x4 21 days x 150 + fuel ~4,700 km + one-way fee Perth-Darwin ~1,000', 4630, 'transport'),
      rbExtra('Ningaloo whale shark swim (AUD ~450, est)', 275, 'tour'),
      rbExtra('Bungle Bungles scenic flight (AUD ~400, est)', 240, 'tour'),
      rbExtra('Rottnest Island ferry (est)', 73, 'tour'),
      rbExtra('Cable Beach camel ride (est)', 30, 'activity', true),
    ] },
    { code: 'AU', transport: 280, local: 0, extras: [      // Alice Springs-Cairns flight (est AUD 460)
      rbExtra('Car: 14 days x 55 + fuel ~3,200 km + one-way fee Darwin-Alice ~300', 1397, 'transport'),
      rbExtra('Kakadu entry (AUD 40)', 24, 'park_fee'),
      rbExtra('Yellow Water billabong cruise (est AUD 100)', 60, 'tour'),
      rbExtra('Uluru-Kata Tjuta 3-day pass (AUD 50)', 30, 'park_fee'),
    ] },
    { code: 'AU', transport: 25, local: 220, extras: [     // Brisbane-Byron bus; local: Cairns-Airlie-Hervey Bay-Brisbane buses (est AUD ~330)
      rbExtra('Whitsundays sailing trip (EUR 250-400 per notes)', 325, 'tour'),
      rbExtra("Fraser Island / K'gari tour (EUR 250-400 per notes)", 325, 'tour'),
      rbExtra('Great Barrier Reef day trip from Cairns (est)', 150, 'tour'),
      rbExtra('Daintree / Cape Tribulation day tour (est)', 90, 'tour'),
    ] },
    { code: 'AU', transport: 90, local: 70, extras: [      // Sydney-Melbourne flight (notes say drive; see review); local: Byron-Sydney bus 60 + Blue Mountains train 10
      rbExtra('Sydney Opera House tour (est)', 30, 'activity'),
      rbExtra('Blue Mountains Scenic World (est)', 30, 'activity'),
      rbExtra('Harbour Bridge Climb (AUD ~400, est)', 245, 'tour', true),
    ] },
    { code: 'AU', transport: 75, local: 0, extras: [       // Melbourne-Launceston/Hobart flight (est), notes: ferry or flight
      rbExtra('Car: 7 days x 55 + fuel ~800 km (Great Ocean Road + Grampians loop)', 467, 'transport'),
    ] },
    { code: 'AU', transport: 100, local: 60, extras: [     // Hobart-Adelaide direct flight (est); local: Overland Track end shuttle Lake St Clair-Launceston (est)
      rbExtra('Car: 6 days x 55 + fuel ~700 km + one-way fee Launceston-Hobart ~40', 442, 'transport'),
      rbExtra('Overland Track permit (EUR 120-150 per notes)', 135, 'park_fee'),
      rbExtra('Tasmania Parks Pass (est)', 55, 'park_fee'),
      rbExtra('MONA entry (est)', 24, 'activity'),
    ] },
    { code: 'AU', transport: 350, local: 82, extras: [     // Adelaide-Christchurch via Sydney/Melbourne (est); local: Kangaroo Island passenger ferry return (est)
      rbExtra('Car: 5 days x 55 + fuel ~1,150 km (Barossa + Flinders Ranges)', 393, 'transport'),
      rbExtra('Kangaroo Island 1-day wildlife tour (est)', 180, 'tour'),
    ] },
    { code: 'NZ', transport: 55, local: 0, extras: [        // Picton-Wellington foot-passenger ferry (est NZD 105); car returned in Picton
      rbExtra('NZeTA + International Visitor Levy (NZD ~123; per route notes ~EUR 60-63)', 63, 'visa'),
      rbExtra('Car: 21 days x 60 + fuel ~3,200 km + one-way fee Christchurch-Picton ~60', 1737, 'transport'),
      rbExtra('Milford Sound cruise (est NZD ~130)', 65, 'tour'),
      rbExtra('Kaikoura whale watching (est NZD ~170)', 87, 'tour'),
      rbExtra('Abel Tasman water taxi (est)', 40, 'tour'),
      rbExtra('Great Walk huts, Routeburn 2 nights (est)', 150, 'tour', true),
      rbExtra('Franz Josef glacier heli-hike (est NZD ~500)', 255, 'tour', true),
      rbExtra('Kawarau bungy (est NZD ~230)', 118, 'activity', true),
    ] },
    { code: 'NZ', local: 0, extras: [
      rbExtra('Car: 11 days x 60 + fuel ~1,700 km + one-way fee Wellington-Auckland ~50', 931, 'transport'),
      rbExtra('Tongariro Alpine Crossing shuttle (est NZD ~40)', 20, 'transport'),
      rbExtra('Rotorua Maori cultural experience + geothermal entry (est)', 90, 'tour'),
      rbExtra('Waitangi Treaty Grounds (est)', 36, 'activity'),
      rbExtra('Hole in the Rock cruise, Bay of Islands (est NZD ~130)', 67, 'tour', true),
    ] },
  ],
},

// ---- group c3 ----
  'gt_seed_central-european-grand-roadtrip': {
    checked: '2026-10-27',
    flight_in_cost: 95,   // drive NL-Strasbourg ~620 km fuel only (no tolls)
    flight_out_cost: 107,  // drive Dresden-NL ~700 km, German Autobahn, fuel only
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈7730 km driving in the loop + tolls/vignettes (CH, AT, SI, HU, SK, CZ, Grossglockner, Italian/Croatian/Serbian motorways)', 1353, 'transport'),
        rbExtra('Car: parking (cities, guarded lot near Cinque Terre) per the route notes', 505, 'other'),
      ] },
      { code: 'DE', transport: 0, local: 0, extras: [] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'LI', transport: 0, local: 0, extras: [] },
      { code: 'AT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'SM', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'SI', transport: 0, local: 0, extras: [] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'RS', transport: 0, local: 0, extras: [] },
      { code: 'HU', transport: 0, local: 0, extras: [] },
      { code: 'SK', transport: 0, local: 0, extras: [] },
      { code: 'CZ', transport: 0, local: 0, extras: [] },
      { code: 'CZ', transport: 0, local: 0, extras: [] },
      { code: 'PL', transport: 0, local: 0, extras: [] },
      { code: 'DE', local: 0, extras: [] },
    ],
  },
  'gt_seed_british-isles-celtic-coast-expedition': {
    checked: '2026-10-27',
    flight_in_cost: 164,   // drive NL-Calais ~400 km fuel (~€59) + Calais/Dover car+driver ferry €105 (€60-150 midpoint)
    flight_out_cost: 21,  // drive Ghent-NL ~150 km fuel
    blocks: [
      { code: 'GB', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈8950 km driving in the loop + tolls (Dartford, Irish and French motorway tolls)', 1389, 'transport'),
        rbExtra('Car: parking (Cotswolds, London area, Lille, Bruges, Mont Saint-Michel etc, est)', 450, 'other'),
        rbExtra('UK ETA (~GBP 20), covers whole UK incl. IoM/Jersey/Guernsey', 24, 'visa'),
      ] },
      { code: 'GB', transport: 0, local: 0, extras: [] },
      { code: 'GB', transport: 0, local: 0, extras: [] },
      { code: 'GB', transport: 50, local: 0, extras: [] },
      { code: 'IM', transport: 50, local: 20, extras: [] },
      { code: 'GB', transport: 0, local: 0, extras: [] },
      { code: 'GB', transport: 200, local: 0, extras: [
        rbExtra('Historic Environment Scotland Explorer Pass (~GBP 44, 14 days)', 52, 'park_fee', true),
      ] },
      { code: 'GB', transport: 0, local: 0, extras: [] },
      { code: 'IE', transport: 0, local: 0, extras: [] },
      { code: 'IE', transport: 475, local: 0, extras: [] },
      { code: 'GG', transport: 90, local: 0, extras: [] },
      { code: 'JE', transport: 150, local: 0, extras: [
        rbExtra('Jersey War Tunnels entry (~GBP 21)', 25, 'activity'),
      ] },
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Carnac guided megalith access (Apr-Sep)', 6, 'park_fee'),
      ] },
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Mont Saint-Michel abbey entry (~EUR 16) + Omaha museum (~EUR 8)', 24, 'park_fee'),
      ] },
      { code: 'FR', transport: 0, local: 0, extras: [] },
      { code: 'BE', local: 0, extras: [] },
    ],
  },
