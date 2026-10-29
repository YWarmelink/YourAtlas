# Step 2b review, batch 3

Web search budget ran out after ~20 searches; L41, L43, L52, L58, L59, L60 are unverified (eur_one_way = current cost). All other fares come from aggregator snapshots (mostly Expedia/Skyscanner/Trip.com floors, undated), so treat as medium at best.

| id | leg | current -> verified | change | confidence |
|---|---|---|---|---|
| L41 | Manzini-AMS | 680 -> 680 | 0% | unverified |
| L42 | AMS-Tashkent | 330/330 -> 370 | +12% | medium |
| L43 | Ilulissat-Reykjavik | 650 -> 650 | 0% | unverified |
| L44 | Antananarivo-AMS | 650 -> 640 | -2% | medium |
| L45 | AMS-Windhoek | 650 -> 620 | -5% | medium |
| L46 | AMS-Harare | 650 -> 600 | -8% | medium |
| L47 | Dominica-AMS | 650 -> 700 | +8% | low |
| L48 | Anchorage-AMS | 650 -> 520 | -20% | medium |
| L49 | AMS-Georgetown | 650 -> 600 | -8% | low |
| L50 | Bishkek-AMS | 320/320 -> 290 | -9% | medium |
| L51 | Windhoek-AMS | 620 -> 540 | -13% | medium |
| L52 | Varanasi-Delhi + DEL-AMS | 605 -> 605 | 0% | unverified |
| L53 | Mauritius-AMS (Nov) | 600 -> 410 | -32% | medium |
| L54 | AMS-Mauritius | 600 -> 380 | -37% | medium |
| L55 | Mauritius-AMS (Sep) | 600 -> 410 | -32% | medium |
| L56 | AMS-Maputo (May) | 600 -> 560 | -7% | medium |
| L57 | AMS-Maputo (Apr) | 600 -> 560 | -7% | medium |
| L58 | AMS-Mahe | 600 -> 600 | 0% | unverified |
| L59 | Dar es Salaam-AMS | 600 -> 600 | 0% | unverified |
| L60 | AMS-Lusaka | 600 -> 600 | 0% | unverified |

Unsure: L47 and L49 (sources inconsistent, wide range); L53/L55 share one fare by rule though months differ; Mauritius sources are mostly floors (Saudia via Jeddah, 20h+), so typical may be a bit higher; Skyscanner IE Windhoek-AMS EUR 764 looked like a return and was ignored. No leg needed by_month (differences <15%).
