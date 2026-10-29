// ---- Phase 4 batch 21: Asia & Himalaya, extracted 2026-10-29, approved by Youri (planning/budget_batch21/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS: waiting for Youri's review. All routes priced as public transport (no car) - see REVIEW.md.
// Fares: flights_from_ams.csv + flights_batch21.csv. Domestic exit legs the route text chains to the intercontinental flight sit in flight_out_cost.

  'gt_seed_united-arab-emirates': {
    checked: '2026-10-29',
    flight_in_cost: 300,   // AMS-Dubai one way, KLM/Emirates direct (WebSearch 2026-10-29: floors EUR 175-182, Emirates USD 739; notes EUR 450-750 return)
    flight_out_cost: 280,  // Dubai-AMS direct (est from out fare)
    blocks: [
      { code: 'AE', local: 100, extras: [   // E100 Dubai-Abu Dhabi ~6 (notes) + Abu Dhabi-Al Ain bus ~5 + Liwa/Fujairah by shared taxi/ride-hail ~85 (est; no car in the rate)
        rbExtra('Burj Khalifa observation deck (notes: roughly EUR 39-63)', 51, 'activity'),
        rbExtra('Desert safari (notes: roughly EUR 62)', 62, 'tour'),
      ] },
    ],
  },

  'gt_seed_bhutan': {
    checked: '2026-10-29',
    flight_in_cost: 900,   // AMS-Paro one way via Delhi/Bangkok (Trip.com ~EUR 1350 return floor; est as 2 tickets, low)
    flight_out_cost: 900,  // Paro-AMS (flights_from_ams.csv PBH back)
    blocks: [
      { code: 'BT', local: 60, extras: [   // Paro-Thimphu-Punakha-Paro by taxi/car+driver (est); SDF is in the daily rate (notes)
        rbExtra('Bhutan visa fee USD 40 (VISA_VACCINATION_RESEARCH.md; SDF already in the daily rate)', 36, 'visa'),
        rbExtra('Bumthang side trip: flights Paro-Bumthang and back, 2 x ~EUR 80 (est, notes give no price)', 160, 'transport', true),
      ] },
    ],
  },

  'gt_seed_caucasus': {
    checked: '2026-10-29',
    flight_in_cost: 260,   // AMS-Tbilisi one way, 1 stop (notes EUR 250-400 return; est)
    flight_out_cost: 280,  // Baku-AMS one way, 1 stop (est)
    blocks: [
      { code: 'GE', transport: 30, local: 58, extras: [   // transport: Batumi-Tbilisi train ~13 + Tbilisi-Yerevan marshrutka ~17 (est); local: Kazbegi/Sighnaghi marshrutkas + Kutaisi, Mestia 2 x 17 (notes ~17 to/from), Batumi
      ] },
      { code: 'AM', transport: 42, local: 40, extras: [   // transport: Yerevan-Tbilisi marshrutka ~17 + Tbilisi-Baku bus ~25 (est; flight alternative ~70); local: Khor Virap, Goris/Tatev, Sevan, Dilijan (est)
      ] },
      { code: 'AZ', local: 28, extras: [   // Gobustan, Baku-Sheki, Sheki-Qabala, Qabala-Baku buses (est)
        rbExtra('Azerbaijan e-visa USD 23 (VISA_VACCINATION_RESEARCH.md)', 21, 'visa'),
      ] },
    ],
  },

  'gt_seed_north-india': {
    checked: '2026-10-29',
    flight_in_cost: 650,   // AMS-Delhi (flights_from_ams.csv DEL out)
    flight_out_cost: 605,  // Varanasi-Delhi ~55 (est, notes: flight ~1h20) + Delhi-AMS 550 (est from out fare / notes EUR 350-550 return)
    blocks: [
      { code: 'IN', local: 105, extras: [   // Delhi-Jaipur-Pushkar-Jodhpur-Jaisalmer-Udaipur trains/buses ~46, Udaipur-Delhi train ~15 + Delhi-Manali Volvo ~16, Manali-Rishikesh bus ~13, Rishikesh-Varanasi train ~15 (all est)
        rbExtra('India e-Tourist visa, 30 days (est ~USD 25; research file gives only the 1-year USD 40 option)', 22, 'visa'),
      ] },
    ],
  },

  'gt_seed_jordan': {
    checked: '2026-10-29',
    flight_in_cost: 260,   // AMS-Amman one way, 1 stop (notes EUR 300-700 return; est)
    flight_out_cost: 240,  // Amman-AMS (est)
    blocks: [
      { code: 'JO', local: 70, extras: [   // Jerash, Amman-Petra JETT bus ~11, Petra-Wadi Rum ~10, Wadi Rum-Dead Sea/Amman by taxi (est)
        rbExtra('Jordan Pass (notes ~50-60 JOD, midpoint 55 JOD; includes visa + Petra)', 69, 'visa'),
      ] },
    ],
  },

  'gt_seed_japan-taiwan': {
    checked: '2026-10-29',
    flight_in_cost: 520,   // AMS-Tokyo one way (WebSearch 2026-10-29: floors EUR 361-375 / USD 420-432; typical higher; notes EUR 900-1300 return)
    flight_out_cost: 450,  // Taipei-AMS (flights_from_ams.csv TPE back)
    blocks: [
      { code: 'JP', transport: 150, local: 250, extras: [   // transport: Osaka-Taipei flight (LCC/EVA ~EUR 100-180, est); local: Shinkansen Tokyo-Kyoto ~83, Hakone ~50, Kyoto-Nara-Osaka ~10, Osaka-Hiroshima-Osaka ~110 (est)
      ] },
      { code: 'TW', local: 120, extras: [   // Taipei-Hualien/Taroko ~10, onward to Sun Moon Lake ~15, HSR to Tainan ~25, Kenting ~12, HSR back to Taipei ~45 (est)
      ] },
    ],
  },

  'gt_seed_kazakhstan-kyrgyzstan': {
    checked: '2026-10-29',
    flight_in_cost: 300,   // AMS-Almaty one way via Istanbul (notes EUR 250-650 return; est)
    flight_out_cost: 320,  // Bishkek-AMS one way via Istanbul (est)
    blocks: [
      { code: 'KZ', transport: 15, local: 40, extras: [   // Shymkent-Bishkek bus (est); local: Charyn day trip ~15, Almaty-Turkistan train ~18, Turkistan-Shymkent ~5 (est)
      ] },
      { code: 'KG', local: 110, extras: [   // Issyk-Kul/Karakol marshrutkas ~18, Song-Kul shared 4x4 ~25, Kochkor-Osh ~20, Osh-Bishkek flight ~45 (est)
      ] },
    ],
  },

  'gt_seed_kyrgyzstan': {
    checked: '2026-10-29',
    flight_in_cost: 330,   // AMS-Bishkek one way via Istanbul (notes EUR 450-700 return; est)
    flight_out_cost: 320,  // Bishkek-AMS (est)
    blocks: [
      { code: 'KG', local: 110, extras: [   // same legs as in the Kazakhstan-Kyrgyzstan route (est)
      ] },
    ],
  },

  'gt_seed_south-korea': {
    checked: '2026-10-29',
    flight_in_cost: 480,   // AMS-Seoul one way (WebSearch 2026-10-29: floors EUR 314-370, USD 406-458; notes EUR 700-1100 return)
    flight_out_cost: 450,  // Seoul-AMS (Skyscanner EUR 426 floor; est)
    blocks: [
      { code: 'KR', local: 120, extras: [   // KTX Seoul-Gyeongju ~32, Gyeongju-Busan ~6, Busan-Jeju flight ~40, Jeju-Seoul flight ~40 (est)
      ] },
    ],
  },

  'gt_seed_sri-lanka': {
    checked: '2026-10-29',
    flight_in_cost: 500,   // AMS-Colombo one way, 1 stop via Gulf hub (est; low)
    flight_out_cost: 470,  // Colombo-AMS (est)
    blocks: [
      { code: 'LK', local: 40, extras: [   // buses Colombo-Sigiriya-Kandy, Kandy-Ella train ~8, Ella-Tissa, south coast, back to Colombo (est)
        rbExtra('Yala safari entry + jeep (notes ~EUR 85-90)', 88, 'tour'),
      ] },
    ],
  },

  'gt_seed_mongolia': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-Ulaanbaatar one way via Istanbul (notes EUR 600-800 return; est)
    flight_out_cost: 420,  // Ulaanbaatar-AMS (est)
    blocks: [
      { code: 'MN', local: 40, extras: [   // Terelj + Kharkhorin shared vans/buses (est)
        rbExtra('Gobi jeep tour: assumed 5 days x USD 100 (notes USD 80-120/day p.p.; day count is my assumption)', 447, 'tour'),
      ] },
    ],
  },

  'gt_seed_maldives': {
    checked: '2026-10-29',
    flight_in_cost: 520,   // AMS-Male one way, 1 stop via Gulf hub (est; low)
    flight_out_cost: 480,  // Male-AMS (est)
    blocks: [
      { code: 'MV', local: 70, extras: [   // public ferries ~3 (3 legs) + shared speedboats ~23 (2 legs), notes (est legs)
        rbExtra('Green Tax 9 nights x ~EUR 5.50 (notes)', 50, 'other'),
        rbExtra('Departure tax economy (notes ~EUR 46)', 46, 'other'),
      ] },
    ],
  },

  'gt_seed_malaysia-borneo-brunei-jungle-wildlife-21-days': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-Kuala Lumpur one way KLM direct (notes EUR 650-950 return; est)
    flight_out_cost: 472,  // Kota Kinabalu-KL ~52 (notes EUR 35-70) + KL-AMS 420 (est)
    blocks: [
      { code: 'MY', transport: 120, local: 0, extras: [] },   // KL-Bandar Seri Begawan flight (Royal Brunei/MAS ~2h; est)
      { code: 'BN', transport: 80, local: 0, extras: [       // BSB-Kota Kinabalu flight (~40 min; est)
        rbExtra('Ulu Temburong guided day tour (notes BND 140-180 ~ EUR 115-150, midpoint)', 133, 'tour'),
      ] },
      { code: 'MY', transport: 0, local: 0, extras: [] },     // transfer to Kinabalu Park is part of the climb package
      { code: 'MY', transport: 50, local: 0, extras: [] },    // park-KK transfer ~10 + Kota Kinabalu-Sandakan flight ~40 (est)
      { code: 'MY', transport: 12, local: 0, extras: [       // Sandakan/Sepilok-Sukau van (est; lodge may include)
        rbExtra('Sepilok Orang-utan centre entry RM90 (notes)', 18, 'park_fee'),
      ] },
      { code: 'MY', transport: 18, local: 0, extras: [] },    // Kinabatangan-Semporna van ~4-5h (est)
      { code: 'MY', transport: 50, local: 0, extras: [        // Semporna-Tawau van ~5 + Tawau-Kota Kinabalu flight ~45 (est)
        rbExtra('Sipadan/Mabul diving: assumed 3 dive days x EUR 200 (notes: EUR 150-250/day on top; day count is my assumption)', 600, 'activity'),
      ] },
      { code: 'MY', local: 0, extras: [] },
    ],
  },

  'gt_seed_malaysia': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-KL one way KLM direct (est)
    flight_out_cost: 420,  // KL-AMS (est)
    blocks: [
      { code: 'MY', local: 82, extras: [   // KL-Langkawi flight ~40, Langkawi-Penang ferry ~15, Penang-Cameron ~10, Cameron-Malacca ~12, Malacca-KL ~5 (est)
      ] },
    ],
  },

  'gt_seed_nepal': {
    checked: '2026-10-29',
    flight_in_cost: 480,   // AMS-Kathmandu one way, 1 stop (notes EUR 550-950 return, Nov peak; est)
    flight_out_cost: 420,  // Kathmandu-AMS (est)
    blocks: [
      { code: 'NP', local: 55, extras: [   // Kathmandu-Lumbini bus ~15, Lumbini-Chitwan ~8, Chitwan-Pokhara ~10, Annapurna trailhead ~12, Pokhara-Kathmandu ~10 (est)
        rbExtra('Nepal visa 30 days USD 50 (VISA_VACCINATION_RESEARCH.md)', 45, 'visa'),
        rbExtra('TIMS/ACAP permits (notes ~USD 50 one-off)', 45, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_gulf-states-trio': {
    checked: '2026-10-29',
    flight_in_cost: 500,   // AMS-Muscat one way KLM direct (notes EUR 1190-1300 return, raised by regional tensions; est, low)
    flight_out_cost: 420,  // Doha-AMS (flights_from_ams.csv DOH back)
    blocks: [
      { code: 'OM', transport: 140, local: 0, extras: [   // Muscat-Manama flight (est); 4x4 is in the daily rate (carInDailyRate true)
        rbExtra('Oman e-visa, 30 days (est ~OMR 20; research file gives no fee)', 46, 'visa'),
      ] },
      { code: 'BH', transport: 95, local: 0, extras: [     // Manama-Doha flight (Gulf Air/Qatar, ~1h; est)
        rbExtra('Bahrain e-visa ~USD 25 (VISA_VACCINATION_RESEARCH.md)', 22, 'visa'),
      ] },
      { code: 'QA', local: 0, extras: [] },
    ],
  },

  'gt_seed_philippines': {
    checked: '2026-10-29',
    flight_in_cost: 480,   // AMS-Manila one way KLM direct (notes EUR 700-900 return; est)
    flight_out_cost: 495,  // Cebu-Manila ~45 (est) + Manila-AMS 450 (est)
    blocks: [
      { code: 'PH', local: 260, extras: [   // Manila-Banaue-Manila buses ~20, Manila-El Nido flight ~70, Coron-Cebu ~50, Cebu-Siargao ~45, Siargao-Cebu-Bohol ~45 + ferries ~30 (all est)
        rbExtra('El Nido-Coron multi-day boat expedition (notes ~EUR 160-220 all-in, midpoint)', 190, 'tour'),
      ] },
    ],
  },

  'gt_seed_thailand': {
    checked: '2026-10-29',
    flight_in_cost: 460,   // AMS-Bangkok one way 420 (WebSearch 2026-10-29: floors EUR 344-365, typical higher) + BKK-Chiang Mai ~40 (notes: domestic connection)
    flight_out_cost: 435,  // Krabi/Phuket-Bangkok ~35 (est) + Bangkok-AMS 400 (est)
    blocks: [
      { code: 'TH', local: 86, extras: [   // Chiang Mai-Sukhothai ~10, -Ayutthaya ~14, -Bangkok ~2, Bangkok-Krabi ~30, Krabi-Koh Lipe ~30 (est)
      ] },
    ],
  },

  'gt_seed_central-asia': {
    checked: '2026-10-29',
    flight_in_cost: 300,   // AMS-Almaty one way via Istanbul (est)
    flight_out_cost: 320,  // Tashkent-AMS (flights_from_ams.csv TAS back)
    blocks: [
      { code: 'KZ', transport: 15, local: 40, extras: [] },   // Shymkent-Bishkek bus; Charyn, Almaty-Turkistan train (est)
      { code: 'KG', transport: 110, local: 60, extras: [] },  // Osh-Khorog shared jeep on the Pamir Highway ~USD 120 (notes: shared taxi from ~USD 30-40/stretch; est); local: Issyk-Kul, Karakol, Song-Kul, Kochkor-Osh (est)
      { code: 'TJ', transport: 25, local: 55, extras: [      // Dushanbe-Samarkand shared taxi (est); local: Khorog-Dushanbe ~40, Iskanderkul ~15
        rbExtra('Tajikistan e-visa + GBAO permit (notes: total ~USD 70)', 63, 'visa'),
      ] },
      { code: 'UZ', local: 65, extras: [] },                  // Samarkand-Bukhara ~10, -Khiva ~10, Urgench-Tashkent flight ~45 (est)
    ],
  },

  'gt_seed_uzbekistan-tajikistan': {
    checked: '2026-10-29',
    flight_in_cost: 330,   // AMS-Tashkent one way via Istanbul (notes EUR 500-700 return; est)
    flight_out_cost: 350,  // Dushanbe-AMS one way via Istanbul (est)
    blocks: [
      { code: 'UZ', transport: 30, local: 85, extras: [] },   // transport: Tashkent-Samarkand Afrosiyob ~20 + marshrutka to Panjakent border ~10 (est); local: Tashkent-Samarkand ~20, -Bukhara ~10, -Khiva ~10, Urgench-Tashkent flight ~45
      { code: 'TJ', local: 165, extras: [                      // Panjakent-Iskanderkul/Dushanbe ~15, Dushanbe-Khorog ~40, Khorog-Murghab ~35, Murghab-Dushanbe ~75 by shared taxi (notes: from USD 30-40 p.p.; est)
        rbExtra('Tajikistan e-visa + GBAO permit (notes: total ~USD 70)', 63, 'visa'),
      ] },
    ],
  },

  'gt_seed_bodrum-aegean-coast-6-days': {
    checked: '2026-10-29',
    flight_in_cost: 170,   // AMS-Bodrum one way, seasonal direct/1 stop (est; low)
    flight_out_cost: 160,  // Bodrum-AMS (est)
    blocks: [
      { code: 'TR', local: 0, extras: [
        rbExtra('Bodrum-Kos ferry day trip, return (notes EUR 35-60 return, midpoint)', 48, 'transport'),
      ] },
    ],
  },

  'gt_seed_izmir-aegean-coast-ephesus-cesme-5-days': {
    checked: '2026-10-29',
    flight_in_cost: 170,   // AMS-Izmir (flights_from_ams.csv ADB out)
    flight_out_cost: 160,  // Izmir-AMS (est from out fare)
    blocks: [
      { code: 'TR', local: 15, extras: [   // Izmir-Selcuk train, Selcuk-Cesme bus (est)
        rbExtra('Ephesus entry 2026 (notes EUR 40)', 40, 'park_fee'),
        rbExtra('Ephesus Terrace Houses (notes EUR 15 extra)', 15, 'park_fee'),
        rbExtra('Cesme-Chios ferry trip, return (notes EUR 25-30 one-way, midpoint x2)', 55, 'transport', true),
      ] },
    ],
  },

  'gt_seed_uzbekistan': {
    checked: '2026-10-29',
    flight_in_cost: 330,   // AMS-Tashkent one way via Istanbul (est)
    flight_out_cost: 320,  // Tashkent-AMS (flights_from_ams.csv TAS back)
    blocks: [
      { code: 'UZ', local: 85, extras: [] },   // Tashkent-Samarkand ~20, -Bukhara ~10, -Khiva ~10, Urgench-Tashkent flight ~45 (est)
    ],
  },

  'gt_seed_vietnam-cambodia': {
    checked: '2026-10-29',
    flight_in_cost: 520,   // AMS-Hanoi (flights_from_ams.csv HAN out)
    flight_out_cost: 520,  // Phnom Penh-AMS, 1-2 stops (est; low)
    blocks: [
      { code: 'VN', transport: 13, local: 180, extras: [   // transport: HCMC-Phnom Penh bus ~13 (est); local: Hanoi-HCMC flight ~50 (notes EUR 40-60), Ha Giang/Ha Long buses ~40, Da Lat ~20, Phu Quoc flights ~70 (est)
        rbExtra('Ha Giang Loop easy-rider: assumed 3 days x EUR 40 (notes EUR 35-45/day; day count is my assumption)', 120, 'tour'),
      ] },
      { code: 'KH', local: 73, extras: [   // Phnom Penh-Sihanoukville-Koh Rong ~21, -Battambang ~16, -Siem Reap ~6, Stung Treng round ~30 (est)
        rbExtra('Angkor 3-day ticket USD 62 (notes)', 55, 'park_fee'),
        rbExtra('Cambodia e-visa ~USD 36 (VISA_VACCINATION_RESEARCH.md)', 32, 'visa'),
      ] },
    ],
  },

  'gt_seed_vietnam': {
    checked: '2026-10-29',
    flight_in_cost: 520,   // AMS-Hanoi (flights_from_ams.csv HAN out)
    flight_out_cost: 480,  // HCMC-AMS, 1 stop (est; low)
    blocks: [
      { code: 'VN', local: 180, extras: [   // as in the Vietnam-Cambodia route
        rbExtra('Ha Giang Loop easy-rider: assumed 3 days x EUR 40 (notes EUR 35-45/day; day count is my assumption)', 120, 'tour'),
      ] },
    ],
  },
