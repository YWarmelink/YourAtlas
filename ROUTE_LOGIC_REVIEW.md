# Route Logic Review — Playbook

Status: **Eurasia Grand Tour 🌏, Patagonia & Antarctica Expedition 🧊, India & Himalaya Expedition
🏔️, Nordic Arctic Expedition ❄️, Caribbean & Amazon Expedition 🌴 en Central European Grand Roadtrip
🚗 klaar (2026-08)**, de andere 7 originele expedities nog niet.
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

## Patagonia & Antarctica: wat er gebeurde (2026-08), als tweede referentie naast Eurasia

Zelfde stappenplan gevolgd, maar met een andere hoofdvondst dan Eurasia's landvolgorde-omdraaiing:
hier bleek een stuk van de route helemaal geen wegverbinding te hebben (Carretera Austral eindigt
bij Cochrane/Villa O'Higgins, ~250km roadless gap tot Puerto Natales — de vlucht die dit vroeger
overbrugde is sinds oktober 2025 gestaakt). Oplossing: de landvolgorde zelf uitbreiden van 3 naar 5
etappes (Chili-Noord → Argentinië-Calafate/El Chaltén → Chili-Zuid → Argentinië-Vuurland →
Antarctica) zodat de bestaande grensovergangen (Chile Chico-Los Antiguos, Cancha Carrera) het gat
overbruggen — hetzelfde onderliggende idee als Eurasia's landvolgorde-fix, alleen hier om een
ontbrekende verbinding op te lossen in plaats van een onnodige backtrack. Zie `CHANGELOG.md`
("Patagonia & Antarctica Expedition 🧊 routelogica-herziening") voor de volledige uitkomst, en
`rbMigratePatagoniaRouteLogicOverhaul()` / `rbApplyPatagoniaOverhaulToRoute()` voor het code-patroon
— vrijwel identiek aan Eurasia's `rbMigrateEurasiaRouteOverhaul()`/`rbApplyEurasiaOverhaulToRoute()`,
alleen met blocks toevoegen via `route.blocks.splice()` in plaats van herordenen.

## India & Himalaya: wat er gebeurde (2026-08), als derde referentie — soms is er geen bug

Zelfde stappenplan gevolgd, maar dit keer met een ander uitkomsttype dan Eurasia/Patagonia: de
route-logica check vond **geen** geografische fouten. Delhi's hub-met-twee-spaken-structuur
(Rajasthan zuidwest, Punjab/Himachal noord — onvermijdelijk in tegengestelde richtingen vanaf
Delhi) en Bhutans terugkeer naar Paro voor Tiger's Nest (enige internationale luchthaven, dus altijd
een retourtje) bleken via onderzoek allebei al de standaard/optimale aanpak. De echte wijzigingen
kwamen uit **stap 2** (persoonlijke-voorkeur-check): Youri had Delhi, Agra/Taj Mahal, Amritsar/
Gouden Tempel en Dharamshala/McLeod Ganj al eerder bezocht, dus die zijn uit India's bestemmingen
geschrapt (Delhi blijft als verplicht aankomstpunt). Verder alleen praktische updates uit stap 3
(TIMS-handhaving, TAAN-groepsgrootte-eis, Bhutans nieuwe GST) en stap 4 (coördinaten). Zie
`CHANGELOG.md` ("India & Himalaya Expedition 🏔️ routelogica-herziening") voor de volledige uitkomst,
en `rbMigrateHimalayaRouteLogicOverhaul()` voor het code-patroon — een pure veldpatch zonder
blocks toevoegen/verplaatsen, simpeler dan zowel Eurasia's als Patagonia's migratie omdat er geen
landvolgorde-probleem was om op te lossen.

**Les voor de resterende expedities**: ga niet ervan uit dat elke expeditie een grote landvolgorde-
fix nodig heeft zoals Eurasia/Patagonia — check gewoon de stappen, en als er niets geografisch mis
is, is dat een prima uitkomst op zich. De persoonlijke-voorkeur-check (stap 2) kan alsnog echte
content-wijzigingen opleveren, zoals hier.

## Nordic Arctic Expedition ❄️: wat er gebeurde (2026-08), als vierde referentie — meerdere kleine fixes i.p.v. één grote

Zelfde stappenplan, maar met vier kleinere geografische/praktische fixes tegelijk in plaats van één
grote landvolgorde-omdraaiing: (1) Finland-Zweden's `transport_to_next` verzweeg de terugkeer naar
Rovaniemi (geen directe OV-verbinding vanaf Inari/Lemmenjoki); (2) Noorwegen eindigde op Noordkaap
terwijl de Svalbard-vlucht vanuit Tromsø vertrekt — opgelost met een korte vlucht Honningsvåg-Tromsø
i.p.v. terugrijden; (3) IJslands Ring Road had een Snæfellsnes-zigzag; (4) Groenlands instap/uitstap
liep via het verkeerde eiland (nu Nuuk in, Ilulissat uit). Stap 2 (persoonlijke voorkeur) leverde
twee concrete wijzigingen op: Denemarken (Kopenhagen) toegevoegd — Youri had alleen Oslo en Stockholm
al gezien, geen van deze 7 landen dus echt overgeslagen, maar hij wilde Kopenhagen er graag bij
(praktisch: dit was toch al de vluchtovergang richting de Faeröer); Svalbard ingekort van een
meerdaagse gegidste bootexpeditie naar alleen Longyearbyen zelf. Zie `CHANGELOG.md` ("Nordic Arctic
Expedition ❄️ routelogica-herziening") voor de volledige uitkomst, en
`rbMigrateNordicArcticRouteLogicOverhaul()` voor het code-patroon — een veldpatch zoals Himalaya's,
plus één nieuw blok (Denemarken) net als Bahrein's toevoeging aan Mediterranean Civilizations eerder.

**Les voor de resterende expedities**: een expeditie kan best meerdere kleine, losse routing-fixes
tegelijk nodig hebben zonder dat er één grote landvolgorde-omdraaiing bij zit — behandel élke etappe
apart op zijn eigen merites in plaats van te zoeken naar "de ene grote bug" zoals bij Eurasia/
Patagonia.

## Caribbean & Amazon Expedition 🌴: wat er gebeurde (2026-08), als vijfde referentie

Zelfde stappenplan, en zoals Nordic Arctic weer meerdere kleine losse fixes in plaats van één grote
landvolgorde-omdraaiing: Cuba's Viñales-vallei stond als laatste stop (een dubbele omweg — voorbij
Cienfuegos naar Trinidad, terug naar Cienfuegos, dan een 4,5u oversteek naar Viñales vlak bij Havana,
waar de vlucht toch weer vandaan gaat) — opgelost door Viñales meteen na Havana te plannen als
retourtje. Jamaica's Blue Mountains stonden als losse heen-en-terugtrip vlak na Kingston (de kustweg
naar Ocho Rios loopt daar niet doorheen) — opgelost door de Blue Mountains via de Hardwar Gap-
bergroute als terugweg vanaf Port Antonio te gebruiken in plaats van een aparte uitstap. Stap 2
(persoonlijke voorkeur) leverde deze keer niets op — Youri had nog geen van de 10 landen bezocht.
Stap 3 (praktische verificatie) was voor dit hele blok al in juli 2026 gedaan (prijzen/visum/
reisadvies) — alleen Cuba's reisadvies/tourist card-tekst is deze ronde bijgewerkt (e-Visa vervangt
de tourist card sinds juli 2025, stroomuitval-situatie bevestigd nog actueel). Zie `CHANGELOG.md`
("Caribbean & Amazon Expedition 🌴 routelogica-herziening") voor de volledige uitkomst, en
`rbMigrateCaribbeanAmazonRouteLogicOverhaul()` voor het code-patroon — deze route heeft geen gedeelde
`RB_EXPEDITION_CONTENT`-tabel (hand-authored, zie de route's eigen build-functie), dus de migratie
patcht de velden direct in plaats van via `rbContentFor()`.

## Central European Grand Roadtrip: wat er gebeurde (2026-08), als zesde referentie — eerste zelf-rijdende lus, en waarom "backtrack" op de kaart soms geen echte backtrack is

Zelfde stappenplan, eerste keer toegepast op een zelf-rijdende lus (geen land-tot-land grens-
oversteken zoals bij de backpacking-routes hierboven — hier gaat het puur om rijafstanden en
volgorde). Youri's persoonlijke-voorkeur-antwoord was expliciet: veel van deze route al eerder
gezien, maar niet inkorten voor déze trip — "moet langs de mooiste stukken gaan" — dus stap 2
leverde geen cuts op, in tegenstelling tot Himalaya/Nordic Arctic.

De landvolgorde zelf bleek al goed (Elzas→Alpenlanden→Dolomieten/Noord-Italië→Balkan→Midden-Europa→
NL, één doorlopende rit). Vijf kleinere fixes gevonden, search-bevestigd met echte rijafstanden
i.p.v. hemelsbreed geschat: drie onderschatte transport_to_next-afstanden (Straatsburg-Garmisch,
Vaduz-Innsbruck, Turijn-Cinque Terre), Hoge Tatra-Brno bijgesteld, en de Boheems Paradijs-Wrocław-rit
loopt nu rechtstreeks door i.p.v. eerst terug naar Praag.

**Belangrijke les, tegengesteld aan de eigen intuïtie tijdens deze review**: Praag(14,4°O)→
Wrocław(17,0°O)→Dresden(13,7°O) *ziet* eruit als een backtrack (je "kruist" Praags lengtegraad twee
keer). Onderzoek naar echte rijafstanden weerlegde dat: Wrocław ligt simpelweg als uitschieter naast
de Poprad-Brno-Praag-Dresden-lijn, dus hem ergens anders inpassen (bijv. vóór Brno) kost een
vergelijkbare of grotere omweg (getest: ~30 km méér, niet minder). Conclusie: check straight-line-
"backtracks" altijd tegen echte rijafstanden voor je herordent — een geografisch logisch ogende fix
kan op de weg zelf duurder uitpakken. De écht bruikbare fix hier was subtieler: niet de landvolgorde
veranderen, maar het vertrekpunt (Turnov i.p.v. centraal Praag) voor de laatste sprong naar Wrocław.

**Tweede vondst, zelfde categorie als Caribbean & Amazon's Tara-NP-achtige detour-check**: Servië's
Tara National Park stond als laatste stop vóór Boedapest — de genoteerde "~320 km" bleek in
werkelijkheid ~520 km, een uithoek-naar-hoofdroute-sprong die zwaar onderschat was. Fix: Tara NP als
dagtrip/retourtje vanuit Belgrado, niet als doorreis-eindpunt. Les: bij elke "bewuste omweg +1 dag"-
achtige noot in een route (vergelijkbaar met Tajikistans Pamir-jeep/Mongolias Gobi-tour elders) is het
de moeite waard om de aansluitende rit ná de omweg ook te verifiëren, niet alleen de omweg zelf.

Zie `CHANGELOG.md` ("Central European Grand Roadtrip 🚗 routelogica-herziening") voor de volledige
uitkomst, en `rbMigrateCentralEuropeRouteLogicOverhaul()` voor het code-patroon — deze route is
hand-authored (geen gedeelde `RB_EXPEDITION_CONTENT`-tabel, Italië komt 6x voor, Duitsland/Tsjechië
elk 2x), dus de migratie matcht blokken op land-code + eerste bestemmingsnaam, zelfde aanpak als
Mediterranean/North America's "leg fingerprint"-patroon uit de eerdere prijsverificatie-ronde.

## De overige 7 originele expedities

In willekeurige volgorde van omvang (kleiner = sneller te doen, geen inhoudelijke prioriteit):

- **British Isles & Celtic Coast Expedition 🍀** — ook zelf-rijdende lus, zelfde soort logica als
  Central European Grand Roadtrip hierboven.
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
