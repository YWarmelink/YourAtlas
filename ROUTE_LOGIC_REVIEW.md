# Route Logic Review — Playbook

Status: **alle 13 originele expedities klaar (2026-08)** — Eurasia Grand Tour 🌏, Patagonia &
Antarctica Expedition 🧊, India & Himalaya Expedition 🏔️, Nordic Arctic Expedition ❄️, Caribbean &
Amazon Expedition 🌴, Central European Grand Roadtrip 🚗, British Isles & Celtic Coast Expedition 🍀,
North America Grand Traverse 🌎, West & Central Africa Expedition 🌍, Oceania Grand Expedition 🌊,
Pan-American Grand Tour 🌎, Mediterranean Civilizations Expedition 🏛️ en Africa Grand Tour 🌍 (de
laatste, 2026-08). Dit document blijft staan als referentie voor hóe deze aanpak werkte, mocht een
van de 27 modulaire companion-routes uit `ROUTE_BUILDER_MODULES.md` ooit alsnog een eigen check
nodig hebben, of mocht Youri een route later opnieuw willen laten bekijken (bijvoorbeeld na een
grote inhoudelijke wijziging).

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
inhoudelijke uitkomst, en `js/pages/routeBuilderContent.js`'s `rbMigrateEurasiaRouteOverhaul()` /
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

## British Isles & Celtic Coast Expedition: wat er gebeurde (2026-08), als zevende referentie — tweede zelf-rijdende lus, en de eerste met een écht grote fix in deze ronde

Zelfde stappenplan als Central European Grand Roadtrip. Youri's persoonlijke-voorkeur-antwoord:
niets van deze route eerder bezocht, geen specifieke wensen — standaard check.

In tegenstelling tot Central European (vijf kleine fixes, geen landvolgorde-bug), had deze route wél
één echt grote fix, vergelijkbaar in omvang met Eurasia's Vietnam-Cambodja-Laos-Thailand-omdraaiing:
het 2026-07-ontwerp had Isle of Man al terecht "genest" in de Noord-Engeland-etappe (niet als losse
stop ervoor, dat was destijds al goed opgelost), maar op het verkeerde púnt binnen die etappe — ná de
laatste bestemming (Bamburgh, bij de Schotse grens) in plaats van bij het Lake District (dat vlak naast
Heysham ligt, de enige jaarronde ferryhaven naar het eiland). Dat kostte een rit helemaal terug naar
Heysham en daarna weer noordwaarts naar Edinburgh — dezelfde noord-zuid-corridor twee keer gekruist,
~250-320 km pure backtrack. Fix: de oude etappe gesplitst in een Lake District-etappe (met de Isle of
Man-zijsprong) en een Yorkshire & Northumberland-etappe die rechtstreeks doorrijdt naar Edinburgh.

**Les**: een omweg kan "goed gepositioneerd" lijken (juiste regio, juiste algemene volgorde) maar toch
fout zitten op het detailniveau van *waar precies binnen* die regio de zijsprong valt. Check niet
alleen óf een zijsprong op de juiste plek in de landvolgorde zit, maar ook of hij aan het begin of
einde van de etappe wordt gedaan — dat detail bepaalde hier het verschil tussen een vlotte lus en een
520 km-omweg.

Twee kleinere fixes erbij, zelfde categorie als Nordic Arctic/Caribbean & Amazon's meerdere-kleine-
fixes-patroon: Schotlands Highlands-volgorde had een oost-west-zigzag (Skye→Loch Ness→Applecross→
NC500), nu Skye→Applecross→NC500 (bewust beperkt tot Ullapool)→Loch Ness/Inverness; en Ierlands
afsluitende "Dublin (kort)"-stop is geschrapt (Youri's eigen keuze, via een gerichte vraag vooraf,
zelfde patroon als Patagonia's Punta Arenas-vraag) omdat de omweg (≈190 km) niet in verhouding stond
tot een bewust korte stop.

Zie `CHANGELOG.md` ("British Isles & Celtic Coast Expedition 🍀 routelogica-herziening") voor de
volledige uitkomst, en `rbMigrateBritishIslesRouteLogicOverhaul()` voor het code-patroon — deze route
gebruikt, net als zijn twee eerdere correcties, een wholesale-replace-migratie (niet een veldpatch),
omdat die twee eerdere migraties (prijsverificatie-ronde 3, routelijn-coördinaten-ronde 2) al hetzelfde
patroon vastlegden voor deze specifieke route.

## North America Grand Traverse: wat er gebeurde (2026-08), als achtste referentie — eerste keer dat een uitgebreide check "al optimaal" opleverde voor meerdere etappes tegelijk

Zelfde stappenplan. Youri: niets van deze route eerder bezocht, geen specifieke wensen.

Twee van de vier gecheckte punten bleken bij onderzoek al optimaal — expliciet geverifieerd, niet
aangenomen (zelfde discipline als Central European's Wrocław-vraagstuk): Atlantic Canada's
Halifax-hub-en-spoke-volgorde (Peggy's Cove/Lunenburg vs. Cape Breton) maakt geen verschil in totale
afstand, welke spoke ook eerst gaat; en de Canadian Rockies' vermeende Yoho-omweg en Mount
Robson-Whistler-"omweg" bleken beide onvermijdelijk/al op de kortste weg te liggen.

Twee echte fixes wel gevonden, in de VS-etappes: **Pacific Northwest** had een oost-west-zigzag
(Seattle→Olympic NP→Mount Rainier→Oregon Coast) — er loopt geen brug over Puget Sound, dus de oude
volgorde kruiste de regio drie keer. Nu Seattle→Mount Rainier→Olympic NP→zuidwaarts via de US-101.
**California Finale**: de terugrit Sequoia-San Francisco (≈270 mijl) stond nergens vermeld, alleen
"einde van de expeditie" — nu expliciet benoemd i.p.v. verzwegen.

**Les**: "check, neem niet aan" geldt ook averechts — een grondig onderzoek kan net zo goed uitwijzen
dat een vermoede omweg (Yoho, Mount Robson) helemaal geen omweg is, als dat het een echte bug
blootlegt. Beide uitkomsten zijn evenveel waard; het punt is dat je het nagerekend hebt in plaats van
op het oog geoordeeld.

**Eerste keer dit een migratie nodig had voor de split-companions zelf**: North America Grand
Traverse heeft drie 2026-07 split-companions (Oost-Canada 🍁, West-Canada: Rockies & Vancouver 🏔️,
VS Westkust Roadtrip 🌉) die nog nooit een eigen correctie hadden gehad sinds hun seed — dus dit was
de eerste keer dat ze zelf ook een migratie nodig hadden (niet alleen de hoofdexpeditie), voor zowel
de coördinaten als (bij VS Westkust Roadtrip 🌉) de Pacific Northwest/California-fix.

Zie `CHANGELOG.md` ("North America Grand Traverse 🌎 routelogica-herziening") voor de volledige
uitkomst, en `rbMigrateNorthAmericaRouteLogicOverhaul()` voor het code-patroon — wholesale-replace,
zelfde patroon als deze route's eerdere migraties, nu uitgebreid met de drie split-companions.

## West & Central Africa Expedition: wat er gebeurde (2026-08), als negende referentie — vier losse fouten, geen enkele in de landvolgorde zelf

Zelfde stappenplan. Youri: niets van deze 10 landen eerder bezocht, geen specifieke wensen.

Anders dan Central European/British Isles/North America (waar de fixes vooral tussen landen of
regio's zaten), lag hier elke fout **binnen** één land — de landvolgorde zelf (Kaapverdië→Senegal/
Gambia→Ivoorkust/Ghana/Togo/Benin→Kameroen/São Tomé/Gabon) klopte al. Vier fixes: **Senegal**'s
bestemmingen kruisten de Dakar-corridor drie keer (noord-zuid-noord-zuid) — gegroepeerd tot één
omslag. **Ghana**'s volgorde negeerde waar de grensovergang vanuit Ivoorkust (Elubo) ligt — vlak bij
Cape Coast, niet bij Accra — en backtrackte daardoor ≈330 km. **Benin** eindigde bij een inland-stop
(Abomey) terwijl de vlucht vanuit de kuststad Cotonou vertrekt. **Kameroen** had hetzelfde patroon
richting Douala (het enige gateway naar São Tomé). Plus een kleinere fix: Kaapverdië's vluchttekst
verzweeg een binnenlandse tussenstap (Fogo heeft geen brede internationale verbindingen, alles via
Praia) — en Gabon had een letterlijk naamloze derde bestemming ("regenwoud") die is ingevuld met een
concrete, geografisch passende plek (Pongara National Park, vlak bij Libreville) in plaats van
open te laten staan.

**Les**: "de landen staan in de juiste volgorde" is niet hetzelfde als "de route is geografisch
logisch" — vier van de vijf fouten hier zaten in de bestemmingsvolgorde ÍN een land, of in een
onvermelde retourrit naar het vertrekpunt, een categorie die het eerder al opdook bij North America's
Sequoia-San Francisco-terugrit. Check dit net zo grondig als de landvolgorde zelf, ook wanneer die
laatste al klopt.

Zie `CHANGELOG.md` ("West & Central Africa Expedition 🌍 routelogica-herziening") voor de volledige
uitkomst, en `rbMigrateWestCentralAfricaRouteLogicOverhaul()` voor het code-patroon — wholesale-
replace, uitgebreid naar de twee split-companions (West-Afrika Overland 🥁, Centraal-Afrika &
Eilanden 🦛) die net als North America's drie companions hiervoor nog nooit een eigen migratie
hadden gehad.

## Oceania Grand Expedition: wat er gebeurde (2026-08), als tiende referentie — een backtrack die twee bestaande transportnotities zelf al verklapten

Zelfde stappenplan. Youri: Nieuw-Zeeland en Sydney al eerder bezocht maar wil ze nog een keer doen —
geen cuts. Drie fixes, verspreid over de hele route.

**Pacific-eilanden**: Fiji→Vanuatu→Samoa→Tonga→Cook Islands sprong van Fiji naar Vanuatu (west), dan
terug oostwaarts vóórbij Fiji naar Samoa, dan weer terug naar Tonga (dat dichter bij Fiji ligt dan
Samoa) — een dubbele omweg via de Fiji-hub. Interessant detail: twee van de bestaande
transport-notities zeiden zelf al "meestal met overstap via Fiji" voor de Vanuatu-Samoa- en
Samoa-Tonga-vluchten — de tekst verklapte de omweg al, maar niemand trok de conclusie dat de volgorde
zelf het probleem was. Nu Vanuatu→Fiji→Tonga→Samoa→Cook Islands: monotoon oostwaarts, Fiji maar één
keer gepasseerd. **Les**: een transportnotitie die zelf al "via [plek die je net verliet]" zegt, is
een gratis signaal dat de volgorde fout zit — niet alleen de afstand zelf checken, maar ook of de
eigen tekst al een aanwijzing gaf.

**Tasmanië-Adelaide**: hier bleek de aanname zelf fout, niet de volgorde — "meestal met overstap in
Melbourne" klopte niet (Hobart-Adelaide is een dagelijkse directe vlucht), dus alleen de tekst is
gecorrigeerd, net als Central European's Bohemian Paradise-Wrocław-geval waar de "backtrack" ook geen
echte was.

**Nieuw-Zeeland Zuidereiland**: zelfde categorie als North America's Sequoia-San Francisco-terugrit
en West & Central Africa's Abomey/Yaoundé-gevallen — de oude volgorde eindigde bij Dunedin (ver
zuiden) terwijl de Picton-ferry in het uiterste noorden ligt, een onvermelde ≈692 km-terugrit die het
Christchurch-Kaikoura-traject een tweede keer zou berijden. Nu Christchurch→Franz Josef→Queenstown→
Milford Sound→Dunedin (zuid-lus eerst), dan Kaikoura→Abel Tasman→Picton als één doorlopende
noordwaartse rit.

Zie `CHANGELOG.md` ("Oceania Grand Expedition 🌊 routelogica-herziening") voor de volledige uitkomst,
en `rbMigrateOceaniaRouteLogicOverhaul()` voor het code-patroon — wholesale-replace, uitgebreid naar
de vier split-companions (Pacific-eilanden 🌺, Tropisch/Outback Australië 🐊, Gematigd/Zuidelijk
Australië 🍇, Nieuw-Zeeland 🥝) die nog nooit een eigen migratie hadden gehad.

## Pan-American Grand Tour: wat er gebeurde (2026-08), als elfde referentie — grootste route tot nu toe, vier losse fixes

Zelfde stappenplan. Youri had alleen Yucatán (Mexico) en Lake Atitlán/Antigua/Acatenango (Guatemala)
al eerder bezocht — verder niets, geen cuts nodig daarvoor.

Vier fixes, verspreid over de hele 15-landenroute, geen enkele in de hoofdlandvolgorde zelf: **Mexico**
had San Cristóbal de las Casas na Bacalar staan — een ≈700 km-terugrit langs Palenque, grond die de
reis al had bezocht — nu tussen Oaxaca en Palenque (standaard "Ruta Maya"-volgorde). **De Belize-
Honduras-ferry** beschreef een tussenstop bij Livingston (Guatemala) die niet bestaat — de echte
veerdiensten varen rechtstreeks; tekstfix, geen routewijziging. **Honduras** had Tegucigalpa vóór
La Ceiba/Roatán (noordkust) staan, terwijl de grensovergang naar El Salvador juist via Tegucigalpa
zuidelijk ligt — noordkust nu eerst, Tegucigalpa als laatste. **Bolivia**: Santa Cruz (oostelijk
laagland) geschrapt, Youri's eigen keuze — het kostte ≈850 km pure heen-en-terug-omweg voordat de
reis weer richting Chili kon. Interessant: de bestaande transporttekst ("via de Uyuni-zoutvlaktetour")
ging zelf al uit van vertrek vanuit Uyuni, niet Santa Cruz — exact hetzelfde soort verzwegen
aanwijzing als Oceania's "meestal via Fiji"-notities. Bevestigd zonder wijziging: Guatemala's interne
volgorde, Colombia's Medellín-Salento-Bogotá-San Agustín (al de kortste optie, geverifieerd tegen het
alternatief), en Ecuador's Otavalo/Mindo-structuur (normale hub-en-spoke vanuit Quito).

**Les**: bij een route van deze omvang (15 landen) zaten de bugs niet in de grote lijn (die klopte al)
maar verspreid als losse, kleine fouten per land — zelfde patroon als West & Central Africa. Grote
schaal is geen reden om minder grondig te controleren; het is juist waar meerdere kleine fouten zich
kunnen verstoppen.

Zie `CHANGELOG.md` ("Pan-American Grand Tour 🌎 routelogica-herziening") voor de volledige uitkomst,
en `rbMigratePanAmericanRouteLogicOverhaul()`/`rbApplyPanAmericanOverhaulToRoute()` voor het
code-patroon — field-patch + destination-sync via de gedeelde `RB_EXPEDITION_CONTENT`-tabel, zelfde
patroon als Eurasia's migratie, toegepast op de hoofdroute en alle vier split-companions (Mexico 🌵,
Midden-Amerika Loop 🌋, Andes Grand Traverse 🦙, Zuidelijke Kegel & Brazilië-finale 🧉).

## Mediterranean Civilizations Expedition: wat er gebeurde (2026-08), als twaalfde referentie — grootste route van de hele playbook, vijf fixes verspreid over 18 etappes

Zelfde stappenplan. Youri's antwoord op de persoonlijke-voorkeur-check: de bestaande "verdiepingsreis"-
framing (8 van 13 landen al bezocht, bewust geen reden om te schrappen) blijft ongewijzigd van kracht.

Vijf fixes, drie herordeningen en twee onvermelde-terugrit-teksten — dezelfde twee categorieën die
in eerdere rondes al terugkwamen. **Sicilië**: Taormina→Syracuse→Agrigento→Etna kruiste het eiland
twee keer (Agrigento ligt ver zuidwest, Etna weer terug noordoost) — ≈195 km vermijdbare omweg,
nu Agrigento eerst, dan een doorlopende oostkust-lus. **Griekenland-vasteland**: dezelfde categorie
als Central European's Senegal-achtige drievoudige omslag — Athene→Delphi→Olympia→Meteora→
Peloponnesos wisselde drie keer tussen noord en zuid, terwijl de Piraeus-ferry vlak bij Athene ligt,
niet bij de Peloponnesos — nu één zuid-lus (Peloponnesos/Olympia) gevolgd door één noord-lus
(Delphi/Meteora), eindigend met de terugrit naar Piraeus. **Turkije/Egypte/Oman**: alle drie dezelfde
categorie als North America's Sequoia-San Francisco en West & Central Africa's Abomey/Yaoundé —
een etappe eindigt ver van het daadwerkelijke vertrekpunt zonder dat de terugrit ergens genoemd
wordt. Turkije eindigde in Cappadocië (≈730 km van Istanbul, waar de vlucht naar Caïro vertrekt) —
hier bleek de terugrit zelfs onvermijdelijk (geen Cappadocië-luchthaven vliegt direct naar Caïro),
dus niet alleen een tekstfix maar een echt ontbrekende stap. Egypte eindigde bij Abu Simbel terwijl
de Jordanië-ferry vanuit Nuweiba (Sinaï) vertrekt (≈850+450 km terug). Oman eindigde bij Wahiba Sands
terwijl de vlucht vanuit Muscat vertrekt (≈200 km/3u terug).

**Les, bevestigd voor de derde keer deze ronde**: bij een route van deze omvang zit het probleem
zelden in de grote landvolgorde (die klopte hier ook al) maar in twee terugkerende categorieën —
zigzags tussen sub-regio's binnen een land, en een etappe die eindigt op een andere plek dan waar
het vervoer naar het volgende land vandaan vertrekt. Check beide systematisch, ongeacht hoe groot
de route is.

Zie `CHANGELOG.md` ("Mediterranean Civilizations Expedition 🏛️ routelogica-herziening") voor de
volledige uitkomst, en `rbMigrateMediterraneanRouteLogicOverhaul()` voor het code-patroon —
wholesale-replace, zelfde patroon als deze route's eerdere migraties, toegepast op de hoofdroute en
alle zes split-companions (Iberia & Marokko/Tunesië 🏰, Malta & Italië 🏛️, Corsica & Zuid-Frankrijk
⛵, Griekenland & Cyprus 🏺, Anatolië 🕌, Egypte & Arabisch Schiereiland 🐪).

## Africa Grand Tour: wat er gebeurde (2026-08), als dertiende en laatste referentie — de meeste losse fixes van de hele playbook

Zelfde stappenplan. Youri had alleen Kaapstad al eerder bezocht, maar zei dat het mag blijven staan
"als het beter past" — geen cuts, standaard check verder. Deze route (18 landen, grootste van de
playbook naast Mediterranean Civilizations) leverde negen echte herordeningen op — meer dan bij elke
andere expeditie in deze reeks, en een duidelijk patroon: bijna elk land had zijn eigen, op zichzelf
staande zigzag of onvermelde terugrit, verspreid over de hele route.

**Grootste vondst van de hele playbook: Namibië.** Fish River Canyon stond als laatste bestemming
(uiterste zuiden), terwijl de grensovergang naar Angola in het uiterste noorden ligt, vlak bij Etosha
(de voorlaatste stop). De oude volgorde reed van Etosha ≈1.150 km naar Fish River Canyon en dan
≈1.340 km bijna dezelfde weg terug — ≈2.490 km pure heen-en-terug-omweg op een route van in totaal
≈3.875 km. Simpelweg Fish River Canyon vooraan zetten in plaats van achteraan bespaart ≈1.355 km,
zo'n 35% van de rijafstand in dit land — de grootste absolute besparing die deze hele reviewreeks
heeft opgeleverd.

**Hetzelfde patroon, kleinschaliger, in acht andere landen**: Zuid-Afrika (Kruger vóór Johannesburg
i.p.v. erna, terwijl de standaardroute er dwars doorheen loopt), Lesotho (twee ver uit elkaar liggende
plekken ten onrechte als één bestemming samengevoegd), Mozambique (de etappe begon aan de andere kant
van het land dan waar hij binnenkwam), Zimbabwe (het land minstens twee keer diagonaal doorkruist),
Angola (de hoofdstad eerst bezocht in plaats van de cluster bij de instap), Zambia (dezelfde
oost-zuid-oost-fout als elders), Madagaskar (twee bestemmingen aan elkaar geknoopt die alleen via een
ruig onverhard traject verbonden zijn) en Tanzania (een bestemming vlak bij het beginpunt pas na een
verre uitstap bezocht, wat een aparte terugvlucht kostte). Oeganda en Kenia kregen dezelfde fix als
Oeganda in een eerdere ronde van dit playbook (zie North America/West Africa): de etappe begint aan
de kant die het verst van de daadwerkelijke instap/uitgang ligt.

**Ethiopië** kreeg, net als Turkije/Egypte/Oman bij Mediterranean Civilizations, geen herordening maar
een onvermelde-terugrit-fix: de vlucht Omo Valley-Addis Abeba (nodig omdat er geen directe
internationale vlucht vanaf Omo Valley bestaat) stond nergens in de route vermeld.

**Les, bevestigd voor de vierde keer in deze playbook**: hoe groter de route, hoe waarschijnlijker het
is dat de fouten niet in één grote landvolgorde-bug zitten, maar verspreid als losse, op zichzelf
staande problemen per land — elk met zijn eigen oorzaak (samengevoegde bestemmingen, een verkeerd
geplaatste uitstap, een onvermelde terugrit). Systematisch elk land los controleren op instap/uitstap-
consistentie en interne volgorde blijft de enige manier om dit soort routes goed te doen, ongeacht hoe
vertrouwd de landvolgorde zelf al aanvoelt.

Zie `CHANGELOG.md` ("Africa Grand Tour 🌍 routelogica-herziening") voor de volledige uitkomst, en
`rbMigrateAfricaGrandTourRouteLogicOverhaul()`/`rbApplyAfricaGrandTourOverhaulToRoute()` voor het
code-patroon — field-patch + destination-sync via de gedeelde `RB_EXPEDITION_CONTENT`-tabel, zelfde
patroon als Eurasia's en Pan-American's migraties, toegepast op de hoofdroute en alle vier
split-companions (Zuidelijk Afrika Safari-lus 🦁, Afrikaanse Eilanden 🏝️, Oost-Afrika Safari
Classic 🦒, Hoorn van Afrika & Egypte 🏺).

**Hiermee is de route-logic review compleet: alle 13 originele expedities zijn gecontroleerd.** De 27
modulaire companion-routes uit `ROUTE_BUILDER_MODULES.md` deelden content met hun origineel en zijn
daardoor grotendeels gratis meegefixed onderweg (zie elke expeditie-sectie hierboven voor welke
companions per ronde zijn meegenomen).
