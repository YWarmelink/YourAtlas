# Route Logic Review — Playbook

Status: **Eurasia Grand Tour 🌏 klaar (2026-08)**, de andere 12 originele expedities nog niet.
Dit document legt vast wát we bij Eurasia deden en hóe je dat 1-op-1 herhaalt — pak deze aanpak op
zodra Youri aangeeft dat hij een volgende expeditie wil laten doornemen, geen nieuwe analyse nodig.

## Wat er bij Eurasia gebeurde (de korte versie)

1. **Route-logica check**: elke transport_to_next tegen de vorige/volgende bestemming gelegd, en
   de volgorde binnen elk land op geografische logica gecontroleerd. Grootste vondst: Vietnam
   eindigde in Ho Chi Minh City (zuiden) terwijl de volgende stap "terug" bustte naar Vientiane via
   Hanoi (noorden) — 1700 km onnodige backtrack, alleen op te lossen door de **landvolgorde zelf**
   om te draaien (Vietnam-Cambodja-Laos-Thailand i.p.v. Vietnam-Laos-Cambodja-Thailand), niet door
   een losse tekstfix.
2. **Persoonlijke voorkeuren met Youri doorgenomen**: welke plekken al bezocht (Kroatië, Java/Bali),
   welke regio's hij bewust wil vermijden (Xinjiang, sociaalpolitiek), welke stijl hij wil (rondreis
   i.p.v. vaste basis in de Filipijnen, boot i.p.v. over land tussen Thailand-Maleisië).
3. **Praktische verificatie via web-onderzoek** vóór elke wijziging werd vastgelegd (vluchtroutes,
   reisadvies, grensoversteken) — nooit aangenomen.
4. **Per-destination coördinaten** toegevoegd aan elke bestemming (niet alleen één ankerpunt per
   land), en een nieuwe kaartweergave ("🔍 Gedetailleerd") gebouwd die daardoorheen tekent.
5. **Geïmplementeerd**: content-fixes in `RB_EXPEDITION_CONTENT`, dezelfde structurele fixes ook
   toegepast op de drie split-routes die dezelfde content delen (West-Eurazië Overland, Oost-Azië &
   Stille Oceaan, Zuidoost-Azië Grand Loop), en één migratiefunctie die alles patcht zonder
   hand-edits te overschrijven.

Zie `CHANGELOG.md` ("Eurasia Grand Tour 🌏 routelogica-herziening (2026-08)") voor de volledige
inhoudelijke uitkomst, en `js/pages/routeBuilder.js`'s `rbMigrateEurasiaRouteOverhaul()` /
`rbApplyEurasiaOverhaulToRoute()` voor het code-patroon.

## De technische basis staat al klaar, projectbreed — geen nieuwe code nodig

- `rbBuildBlock()` ondersteunt destinations als plain string **of** `{name, lat, lng}` object —
  dit is projectbreed, niet Eurasia-specifiek. Elke expeditie kan dus meteen per-bestemming
  coördinaten krijgen zonder verdere codewijzigingen.
- De "🔍 Gedetailleerd"-kaartweergave werkt al voor **elke** route zodra er per-bestemming
  coördinaten in zitten — niets route-specifieks daaraan, hij leest gewoon `block.destinations[].lat/lng`.
- Alle 13 originele expedities hebben al **block-level** coördinaten (één punt per land, sinds
  `rbMigrateRouteLineCoordsRound2`, 2026-07) — de "📍 Routelijn"-kaart werkt dus al overal. Wat
  ontbreekt bij de andere 12 is puur: de route-logica check + het per-destination detail.

## Stappenplan — herhaal dit per expeditie

**Stap 1 — Route-logica check.** Voor elk land in de expeditie:
- Klopt de eerste bestemming met het binnenkomstpunt (per de `transport_to_next` van het vorige land)?
- Klopt de laatste bestemming met het vertrekpunt van dit land se eigen `transport_to_next`?
- Is de volgorde ertussen geografisch logisch — geen onnodige zigzag of stille backtrack?
- Is een omweg onvermijdelijk (hub-and-spoke geografie, zoals Georgië-Batumi)? Benoem 'm dan
  expliciet in `transport_to_next` — verzwijg 'm niet.
- Overweeg of de **landvolgorde zelf** (niet alleen de bestemmingen binnen één land) beter kan.

**Stap 2 — Persoonlijke voorkeur-check met Youri.** Zelfde vragen als bij Eurasia:
- Welke plekken heeft hij al bezocht en wil hij overslaan?
- Zijn er regio's die hij liever vermijdt (sociaalpolitiek of anderszins)?
- Wil hij ergens de "mooiste"/meest iconische versie i.p.v. wat er nu in staat (zoals Zhangjiajie/
  Guilin i.p.v. Xinjiang)?
- Vaste basis of rondreis? Boot/trein/vlucht-voorkeur ergens?

**Stap 3 — Praktische verificatie.** Onderzoeken, niet aannemen: vluchtroutes/frequentie,
grensoversteken, actueel reisadvies (nederlandwereldwijd.nl). Zelfde norm als de
`route-builder-content` skill al voorschrijft voor prijzen/visa.

**Stap 4 — Per-destination coördinaten toevoegen.** Zelfde patroon als Eurasia:
`destinations: [{name: "...", lat: ..., lng: ...}, ...]` i.p.v. plain strings.

**Stap 5 — Implementeren.**
- Content-fixes in `RB_EXPEDITION_CONTENT[expeditienaam]` — of in de route se eigen
  `rbBuildXRoute()` zelf als een land meerdere keren voorkomt (zoals Canada/Italië/Australië/
  Chili/Argentinië elders in dit bestand — die gebruiken geen gedeelde content-tabel).
- **Check op split-companions** (zie `CHANGELOG.md`'s "Route naming history" en de 2026-07
  split-secties): deelt deze expeditie content met standalone companion-routes? Zo ja, dezelfde
  structurele fixes daar ook toepassen — hun blocks zijn bevroren bij het seeden, een latere
  contentwijziging bereikt ze niet vanzelf (exact de valkuil die dit sessie bij Zuidoost-Azië
  Grand Loop 🛕 werd gevonden).
- Eén migratiefunctie per expeditie (`rbMigrateXRouteLogicOverhaul`, zelfde patroon als
  `rbMigrateEurasiaRouteOverhaul`): patcht per land alleen de gewijzigde velden, nooit blind
  overschrijven, zodat hand-edits in de browser overleven.
- `node --check` na elke ronde edits.
- Korte entry in `CHANGELOG.md`'s "Recently fixed".

## De overige 12 originele expedities

In willekeurige volgorde van omvang (kleiner = sneller te doen, geen inhoudelijke prioriteit):

- **Patagonia & Antarctica Expedition 🧊** — 3 landen, kleinste kandidaat.
- **India & Himalaya Expedition 🏔️** — 3 landen.
- **Nordic Arctic Expedition ❄️** — 7 landen, grotendeels vluchtsprongen (minder routing-risico).
- **Central European Grand Roadtrip 🚗** — zelf-rijdende lus vanuit NL, ander soort logica
  (geen land-tot-land grensoversteken zoals bij backpacking-routes).
- **British Isles & Celtic Coast Expedition 🍀** — idem, zelf-rijdende lus.
- **Caribbean & Amazon Expedition 🌴**
- **West & Central Africa Expedition 🌍**
- **North America Grand Traverse 🌎** — let op: Canada/VS komen meerdere keren voor (eigen
  bouwfunctie, geen gedeelde contenttabel) — zelfde patroon als het nieuwe Maleisië-blok bij Eurasia.
- **Oceania Grand Expedition 🌊** — let op: Australië komt tweemaal voor (klimaatzones).
- **Pan-American Grand Tour 🌎** — groot (15 landen), plus 4 split-companions.
- **Mediterranean Civilizations Expedition 🏛️** — grootst (18 etappes), plus 6 split-companions.
- **Africa Grand Tour 🌍** — groot (18 landen), plus 4 split-companions.

De 27 modulaire companion-routes uit `ROUTE_BUILDER_MODULES.md` hebben lagere prioriteit — die
delen content met hun origineel, dus worden grotendeels gratis meegefixed zodra het origineel is
gedaan (zie stap 5's split-companion-check hierboven).
