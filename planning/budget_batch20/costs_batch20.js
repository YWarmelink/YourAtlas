// ---- Phase 4 batch 20: Mediterranean, Eurasia & Europe-Asia, extracted 2026-10-28, approved by Youri (planning/budget_batch20/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch20.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km).
// Local/transport figures are estimates at Youri's level (buses, trains, shared taxis); "(est)" = no source found.

  'gt_seed_balkan': {
    checked: '2026-10-28',
    flight_in_cost: 230,   // AMS-Sarajevo one way (flights_from_ams SJJ out)
    flight_out_cost: 130,  // Skopje-AMS one way (flights_from_ams SKP back)
    blocks: [
      { code: 'BA', transport: 25, local: 25, extras: [] },   // bus Mostar/Sarajevo-Dubrovnik ~20-30 (est); Sarajevo-Mostar bus/train ~10 + Trebinje/Blagaj hops (est)
      { code: 'HR', transport: 15, local: 0, extras: [] },    // bus Dubrovnik-Kotor ~12-17 (est)
      { code: 'ME', transport: 22, local: 25, extras: [] },   // Kotor-Tirana/Shkoder bus ~22 (est); Kotor-Perast-Budva ~6 + Kotor-Zabljak (Durmitor) ~15 (est)
      { code: 'AL', transport: 12, local: 45, extras: [] },   // Korce-Ohrid bus ~12 (est); Shkoder-Tirana-Berat-Gjirokaster-Sarande-Korce buses (est)
      { code: 'MK', local: 20, extras: [] },                  // Ohrid-Bitola-Skopje buses (est)
    ],
  },

  'gt_seed_east-asia-pacific': {
    checked: '2026-10-28',
    flight_in_cost: 500,   // AMS-Xi'an one way (WebSearch 2026-10-28: Expedia USD 401-465, ebookers EUR 593-699 floors; typical ~500)
    flight_out_cost: 450,  // Taipei-AMS one way (WebSearch 2026-10-28: Skyscanner EUR 279, Orbitz USD 342 floors; typical 450, est)
    blocks: [
      { code: 'CN', transport: 220, local: 280, extras: [] },  // Trans-Mongolian Beijing-Ulaanbaatar 2nd class ~200-250 (est); Xi'an-Chengdu-Zhangjiajie-Guilin-Shanghai-Beijing HSR/trains (est)
      { code: 'MN', transport: 400, local: 0, extras: [        // flight Ulaanbaatar-Tokyo via Beijing/Seoul ~400 (est)
        rbExtra('Gobi Desert jeep tour: shared 4x4 + driver + guide + ger camps, 5 days (est) × USD 100/day (midpoint of 80-120)', 447, 'tour'),
      ] },
      { code: 'JP', transport: 130, local: 200, extras: [] },  // flight Osaka-Taipei LCC ~130 (est); Tokyo-Hakone-Kyoto-Osaka-Hiroshima-Osaka mix of shinkansen/night bus, no JR pass (est)
      { code: 'TW', local: 110, extras: [] },                  // Taipei-Taroko-Sun Moon Lake-Tainan-Kenting-Taipei trains/HSR/buses (est)
    ],
  },

  'gt_seed_egypt-arabian-peninsula': {
    checked: '2026-10-28',
    flight_in_cost: 180,   // AMS-Cairo one way (WebSearch 2026-10-28: Expedia USD 116-123, Kayak GBP 166 floors; KLM direct typical ~180)
    flight_out_cost: 420,  // Doha-AMS one way (flights_from_ams DOH back)
    blocks: [
      { code: 'EG', transport: 84, local: 90, extras: [        // bus Cairo-Nuweiba ~12 + fast ferry Nuweiba-Aqaba ~USD 80 (est); Cairo-Luxor-Aswan trains ~33, Abu Simbel minibus ~15, Aswan-Cairo ~40 (est)
        rbExtra('Egypt e-visa (USD 25-45, midpoint 35)', 31, 'visa'),
      ] },
      { code: 'JO', transport: 160, local: 80, extras: [       // flight Amman-Muscat ~160 (est); Amman-Jerash-Petra-Wadi Rum-Aqaba-Amman buses/shared taxis (est)
        rbExtra('Jordan Pass 55 JOD (notes 50-60; also waives the 40 JOD visa fee)', 69, 'visa'),
      ] },
      { code: 'OM', transport: 170, local: 0, extras: [        // flight Muscat-Manama ~170 (est)
        rbExtra('Oman e-visa (OMR ~20, est)', 48, 'visa'),
        // 4x4 rental/tour for Jebel Shams/Wahiba is IN the daily rate (R2d kept this block for that; orchestrator call 2026-10-28, the agent had a €264 car extra)
      ] },
      { code: 'BH', transport: 100, local: 0, extras: [        // flight Manama-Doha ~100 (est)
        rbExtra('Bahrain e-visa (BD ~9.5)', 22, 'visa'),
      ] },
      { code: 'QA', local: 0, extras: [] },
    ],
  },

  'gt_seed_iberia-moroccotunisia': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Malaga one way (flights_from_ams AGP out)
    flight_out_cost: 190,  // Tunis-AMS one way (WebSearch 2026-10-28: Expedia USD 204/GBP 96, Kayak typical USD 188-315; no nonstop)
    blocks: [
      { code: 'ES', transport: 40, local: 70, extras: [] },   // ferry Tarifa-Tangier ~40 (FRS typical); Malaga-Granada-Cordoba-Seville trains/buses + Seville-Tarifa bus (est)
      { code: 'MA', transport: 170, local: 55, extras: [] },  // flight Casablanca-Tunis ~170 (est, low confidence; Marrakech has no direct); Tangier-Chefchaouen-Fes-Volubilis-Marrakech bus/train (est)
      { code: 'TN', local: 25, extras: [] },                  // Tunis-Dougga-El Jem louages/train (est)
    ],
  },

  'gt_seed_spain': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Malaga (AGP out)
    flight_out_cost: 110,  // Malaga-AMS (AGP back)
    blocks: [
      { code: 'ES', local: 65, extras: [] },                  // Malaga-Granada-Cordoba-Seville-Malaga buses/trains (est)
    ],
  },

  'gt_seed_corsica-southern-france': {
    checked: '2026-10-28',
    flight_in_cost: 200,   // AMS-Figari (FSC out)
    flight_out_cost: 120,  // Marseille-AMS one way (est: Transavia/KLM direct; no search)
    blocks: [
      { code: 'FR', transport: 55, local: 35, extras: [] },   // ferry Ajaccio/Bastia-Marseille reclining seat ~55 (est); Bonifacio-Ajaccio bus ~25 + Bavella hops (est)
      { code: 'FR', local: 45, extras: [] },                  // Marseille-Arles-Nimes-Pont du Gard-Marseille trains/bus (est)
    ],
  },

  'gt_seed_greece-crete': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Athens one way (WebSearch 2026-10-28: Aegean from EUR 129-189, Kayak GBP 80-105 floors; typical 140)
    flight_out_cost: 130,  // Athens-AMS (WebSearch 2026-10-28; Heraklion-Athens leg is in the last block's local)
    blocks: [
      { code: 'GR', transport: 45, local: 0, extras: [        // flight Athens-Heraklion ~45 (est; return EUR 60-90 in notes)
        rbExtra('Car: rental 8 days (mainland only: Peloponnese-Olympia-Delphi-Meteora-Athens) × €45 + fuel ≈1200 km + tolls (60% × €6.5/100 km)', 591, 'transport'),
      ] },
      { code: 'GR', local: 95, extras: [] },                  // Crete KTEL buses + Agia Roumeli-Sfakion boat ~50 (est); flight Heraklion-Athens ~45 (est)
    ],
  },

  'gt_seed_greece-cyprus': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Athens
    flight_out_cost: 170,  // Larnaca-AMS one way (est, no search)
    blocks: [
      { code: 'GR', transport: 45, local: 140, extras: [] },  // night ferry Piraeus-Heraklion deck/seat ~45 (est); mainland buses Athens-Nafplio-Olympia-Delphi-Meteora-Athens (est)
      { code: 'GR', transport: 110, local: 50, extras: [] },  // flight Heraklion-Larnaca via Athens ~110 (est, low); Crete buses + Samaria boat (est)
      { code: 'CY', local: 25, extras: [] },                  // Cyprus intercity buses ~3-6 each (est)
    ],
  },

  'gt_seed_malta-italy': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Malta (MLA out)
    flight_out_cost: 120,  // Cagliari-AMS (CAG back)
    blocks: [
      { code: 'MT', transport: 60, local: 5, extras: [] },    // ferry Valletta-Pozzallo (Virtu) ~60 (est); Gozo ferry ~5 (est)
      { code: 'IT', transport: 50, local: 75, extras: [] },   // Messina strait foot ferry ~4 + train Reggio-Naples ~45 (est); Sicily buses/trains Palermo-Cefalu-Agrigento-Syracuse-Taormina-Etna (est)
      { code: 'IT', transport: 30, local: 10, extras: [] },   // HSR Naples-Rome advance ~30 (est); Circumvesuviana Pompeii/Herculaneum
      { code: 'IT', transport: 60, local: 0, extras: [] },    // flight Rome-Cagliari ~60 (est)
      { code: 'IT', local: 45, extras: [] },                  // Cagliari-Su Nuraxi bus + Cagliari-Olbia/Costa Smeralda train/bus (est)
    ],
  },

  'gt_seed_rome-surroundings': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Naples (NAP out)
    flight_out_cost: 100,  // Rome-AMS (FCO back)
    blocks: [
      { code: 'IT', transport: 30, local: 10, extras: [] },   // HSR Naples-Rome ~30 (est); Circumvesuviana
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_sardinia': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Cagliari (CAG out)
    flight_out_cost: 120,  // Cagliari-AMS (CAG back)
    blocks: [
      { code: 'IT', local: 0, extras: [
        rbExtra('Car: rental 5 days × €45 + fuel ≈620 km (Cagliari-Su Nuraxi-Costa Smeralda and back) + no tolls (SS131 free)', 312, 'transport'),
      ] },
    ],
  },

  'gt_seed_sicily': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Palermo (PMO out)
    flight_out_cost: 140,  // Catania-AMS (CTA back; route ends on the east coast)
    blocks: [
      { code: 'IT', local: 0, extras: [
        rbExtra('Car: rental 8 days × €45 + fuel ≈700 km + tolls (60% × €8/100 km) + one-way drop Palermo-Catania ≈€60 (est)', 553, 'transport'),
      ] },
    ],
  },

  'gt_seed_malta': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Malta (MLA out)
    flight_out_cost: 120,  // Malta-AMS (MLA back)
    blocks: [
      { code: 'MT', local: 5, extras: [] },                   // Gozo ferry ~5 (est); buses per the notes (bus/car), no car added
    ],
  },

  'gt_seed_southeast-asia-grand-loop': {
    checked: '2026-10-28',
    flight_in_cost: 520,   // AMS-Hanoi one way (WebSearch 2026-10-28: Kayak USD 390, Expedia USD 440 floors; typical 520)
    flight_out_cost: 470,  // Singapore-AMS (SIN back, reuse)
    blocks: [
      { code: 'VN', transport: 15, local: 175, extras: [      // bus/boat HCMC-Phnom Penh ~15 (est); Hanoi-Ha Giang/Ha Long buses, flights Hanoi-HCMC ~50 (notes 40-60), HCMC-Phu Quoc return ~70, Da Lat buses (est)
        rbExtra('Ha Giang Loop guide + motorbike 3 days (est) × €40 (notes 35-45)', 120, 'tour'),
      ] },
      { code: 'KH', transport: 9, local: 70, extras: [        // bus Stung Treng-Don Kralor-Si Phan Don ~9 (est); Phnom Penh-Koh Rong-Battambang-Siem Reap-Stung Treng (est)
        rbExtra('Angkor Wat 3-day ticket USD 62', 55, 'park_fee'),
        rbExtra('Cambodia e-visa USD 36', 32, 'visa'),
      ] },
      { code: 'LA', transport: 30, local: 45, extras: [       // Mekong slow boat/bus Luang Prabang-Huay Xai ~30 (est); Si Phan Don-Pakse-Vientiane-Vang Vieng-Luang Prabang (est)
        rbExtra('Laos e-visa USD 35', 31, 'visa'),
      ] },
      { code: 'TH', transport: 30, local: 100, extras: [] },  // speedboat Koh Lipe-Langkawi ~30 (est); Chiang Mai-Sukhothai-Ayutthaya-Bangkok, flight Bangkok-Krabi, Krabi-Lipe (est)
      { code: 'MY', transport: 40, local: 40, extras: [] },   // flight KL-Kuching ~40 (est); Langkawi-Penang ferry + buses (est)
      { code: 'MY', transport: 12, local: 105, extras: [] },  // bus Miri-Bandar Seri Begawan ~12 (est); Bako, Kuching-Miri bus, Miri-Mulu return flights ~70 (est)
      { code: 'BN', transport: 20, local: 0, extras: [        // Sipitang Express MYR 100
        rbExtra('Ulu Temburong NP mandatory guided day (BND 140-180, notes ~€115-150, midpoint)', 132, 'tour'),
      ] },
      { code: 'MY', transport: 90, local: 55, extras: [       // flight Kota Kinabalu-Manila ~90 (est); KK-Sepilok-Kinabatangan-Semporna-KK (est)
        rbExtra('Mount Kinabalu climb (guide + permit, notes €250-350 all-in, midpoint)', 300, 'activity'),
        rbExtra('Sipadan diving 2 days (est) × €200 (notes 150-250/day)', 400, 'activity'),
      ] },
      { code: 'PH', transport: 180, local: 280, extras: [     // Cebu-Medan via KL/Singapore/Jakarta ~180 (est, low); Banaue night buses, flights Manila-El Nido/Coron-Siargao/Cebu (est)
        rbExtra('El Nido-Coron multi-day boat expedition (notes €160-220, midpoint)', 190, 'tour'),
      ] },
      { code: 'ID', transport: 20, local: 310, extras: [      // bus Kupang-Dili ~20 (est); Sumatra buses, flight Padang-Lombok via Jakarta ~120, Lombok-Labuan Bajo ~70, Komodo-Kupang ~60 (est)
        rbExtra('Komodo shared boat trip 3 days (est) × USD 45 (notes 40-50/day budget option)', 121, 'tour'),
        rbExtra('Indonesia e-VOA (IDR 500,000)', 29, 'visa'),
      ] },
      { code: 'TL', transport: 280, local: 20, extras: [      // flight Dili-Singapore via Denpasar/Jakarta ~280 (est, low); Dili-Baucau-Maubisse buses (est)
        rbExtra('Jaco Island 4x4 + driver 1 day (notes USD 85-150, midpoint 118)', 105, 'tour'),
      ] },
      { code: 'SG', local: 0, extras: [] },
    ],
  },

  'gt_seed_tunisia': {
    checked: '2026-10-28',
    flight_in_cost: 200,   // AMS-Tunis one way (WebSearch 2026-10-28; typical with connection)
    flight_out_cost: 190,  // Tunis-AMS
    blocks: [
      { code: 'TN', local: 26, extras: [] },                  // louages/train Tunis-Dougga-El Jem-Tunis (est)
    ],
  },

  'gt_seed_anatolia': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Istanbul one way (WebSearch 2026-10-28: Kayak USD 134, Air Serbia from EUR 134; typical 150)
    flight_out_cost: 140,  // Istanbul-AMS
    blocks: [
      { code: 'TR', local: 115, extras: [] },                 // buses Istanbul-Canakkale-Bergama-Selcuk-Pamukkale-Cappadocia ~70 (est) + domestic flight Cappadocia-Istanbul ~45 (est)
    ],
  },

  'gt_seed_istanbul-gallipoli-troy-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Istanbul
    flight_out_cost: 140,  // Istanbul-AMS
    blocks: [
      { code: 'TR', local: 0, extras: [
        rbExtra('2-day Istanbul-Gallipoli-Troy tour all-in (notes €150-250, midpoint)', 200, 'tour'),
        rbExtra('Troy entry (notes €15-20, midpoint)', 18, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_istanbul-lesbos-greek-islands-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Istanbul
    flight_out_cost: 140,  // Istanbul-AMS
    blocks: [
      { code: 'TR', transport: 28, local: 22, extras: [] },   // ferry Ayvalik-Lesbos (notes €20-35, midpoint); bus Istanbul-Ayvalik ~22 (est)
      { code: 'GR', local: 50, extras: [] },                  // return Lesbos-Ayvalik ferry ~28 + bus Ayvalik-Istanbul ~22 (est) to fly home
    ],
  },

  'gt_seed_turkey-greece-aegean-coast-dodecanese-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Izmir one way (est, no search)
    flight_out_cost: 170,  // Rhodes-AMS one way (est, seasonal; low confidence)
    blocks: [
      { code: 'TR', transport: 28, local: 20, extras: [       // ferry Bodrum-Kos (notes €20-35, midpoint); Izmir-Selcuk-Bodrum buses (est)
        rbExtra('Ephesus entry 2026 (incl. Ephesus Experience museum)', 40, 'park_fee'),
        rbExtra('Terrace Houses, Ephesus', 15, 'park_fee'),
      ] },
      { code: 'GR', local: 40, extras: [] },                  // Kos-Rhodes ferry ~40 (est)
    ],
  },

  'gt_seed_west-eurasia-overland': {
    checked: '2026-10-28',
    flight_in_cost: 230,   // AMS-Sarajevo (SJJ out)
    flight_out_cost: 320,  // Tashkent-AMS one way (WebSearch 2026-10-28: Expedia USD 335, Skyscanner EUR 198-493; no nonstop; typical 320)
    blocks: [
      { code: 'BA', transport: 25, local: 25, extras: [] },   // as Balkan
      { code: 'HR', transport: 15, local: 0, extras: [] },
      { code: 'ME', transport: 22, local: 25, extras: [] },
      { code: 'AL', transport: 12, local: 45, extras: [] },
      { code: 'MK', transport: 90, local: 20, extras: [] },   // flight Skopje-Istanbul ~90 (est)
      { code: 'TR', transport: 25, local: 110, extras: [] },  // bus/train Kars/Trabzon-Tbilisi ~25 (est); Istanbul-Ephesus-Pamukkale-Antalya-Cappadocia-Ankara buses + night train Ankara-Kars (est)
      { code: 'GE', transport: 25, local: 65, extras: [] },   // Batumi-Tbilisi ~10 + marshrutka Tbilisi-Yerevan ~15 (est); Kazbegi/Sighnaghi/Kutaisi + Mestia marshrutka ~€17 each way (notes)
      { code: 'AM', transport: 45, local: 40, extras: [] },   // Yerevan-Tbilisi ~15 + Tbilisi-Baku bus ~30 (est); Khor Virap/Tatev/Sevan/Dilijan (est)
      { code: 'AZ', transport: 170, local: 25, extras: [     // flight Baku-Almaty ~170 (est, low); Gobustan/Sheki/Qabala (est)
        rbExtra('Azerbaijan e-visa USD 23', 21, 'visa'),
      ] },
      { code: 'KZ', transport: 10, local: 50, extras: [] },   // shared taxi Almaty-Bishkek ~10 (est); Charyn tour-share, Almaty-Turkistan-Shymkent-Almaty (est)
      { code: 'KG', transport: 60, local: 60, extras: [] },   // shared jeep Osh-Khorog ~60 (est); Bishkek-Karakol, Song-Kul 4x4 share, Song-Kul-Osh (est)
      { code: 'TJ', transport: 21, local: 60, extras: [      // shared taxi Dushanbe-Samarkand ~21 (est); Khorog-Dushanbe shared taxi + Iskanderkul (est)
        rbExtra('Pamir 4x4 + driver Khorog-Murghab-Khorog 3 days, shared by 3 (notes USD 150-400/day, midpoint 275; est)', 246, 'tour'),
        rbExtra('GBAO permit USD 20', 18, 'visa'),
      ] },
      { code: 'UZ', local: 75, extras: [] },                  // Samarkand-Bukhara-Khiva train/taxi ~22 + flight Urgench-Tashkent ~55 (est)
    ],
  },
