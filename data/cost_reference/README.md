# car_costs_by_country.csv

Reference table for uniform car-cost calculation of road trips. One row per country (48), values in EUR, researched 2026-10-27.

## Columns
- country_code, country: ISO code and name.
- fuel_eur_per_l: typical Euro 95 petrol pump price, EUR/litre.
- fuel_source_date: source plus the date its price is from.
- toll_type: none | vignette | distance | mixed (significant tunnel/bridge/city tolls, no flat per-km rate; Austria also has a vignette) | urban.
- vignette_eur: price of the shortest car vignette a tourist can buy (Switzerland: annual, no shorter). Empty if none.
- toll_eur_per_100km: typical car cost per 100 km of toll motorway for distance-based systems. Empty otherwise (see notes for tunnel/bridge tolls).
- rental_eur_per_day: compact manual (Golf class), 1-2 week summer rental, basic insurance, booked ~2 months ahead. These are ESTIMATES calibrated to the Auto Rental News summer-2026 median booked rate (EUR 28.91/day for mini/economy/compact across 41 markets; Malta 12.84, Faroe Islands 111.49), not direct quotes.
- confidence: high (direct recent source) | medium | low (estimate). It rates fuel and toll data; rental is always an estimate.
- notes: special tolls, e-vignette rules, LEZ, access/dependency info.

## Sources
- EU countries fuel: EU Weekly Oil Bulletin national averages for 2026-10-19, via fuel-prices.eu.
- Non-EU fuel: GlobalPetrolPrices.com (2026-10-19), USD/litre converted to EUR at 1.1188 USD per EUR. Cross-check: its Italy figure matches the Oil Bulletin.
- Vignettes: autovig.eu vignette index (verified 10-16 Oct 2026), e-autopalyamatrica.hu, fuel-prices.eu (Austria). Distance toll rates per 100 km and many tunnel/bridge prices are estimates from general knowledge (no source gave per-km rates).

## Currency rates (ECB reference rates, 2026-10-26, per 1 EUR)
USD 1.1188, GBP 0.8382, CHF 0.9243, NOK 10.4545, SEK 11.1385, DKK 7.4747, ISK 136.40, PLN 4.4038, CZK 24.369, HUF 367.45, RON 5.3473, TRY 55.6746.
- BGN: Bulgaria adopted the euro on 2026-01-01 (legacy peg 1.95583).
- BAM: fixed peg 1.95583 per EUR.
- RSD, MKD, ALL: not fetched; no conversion needed because fuel was taken from USD prices. Use current central-bank rates if needed.

## How to use
Car fuel cost = km x 7 L/100 km / 100 x fuel_eur_per_l (i.e. km x 0.07 x fuel_eur_per_l).
Toll cost = km on toll motorway / 100 x toll_eur_per_100km, plus vignette_eur once per country, plus any special tolls listed in notes. Rental cost = days x rental_eur_per_day.

Note: 2026 fuel prices are elevated (EU weighted petrol average rose ~28% since 23 Feb 2026). Refresh fuel before a final calculation.
