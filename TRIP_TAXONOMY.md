# Your Atlas — Trip Taxonomy & Categorization

**Status: FASE 1 (ontwerp) — wacht op goedkeuring voordat Fase 2 (alle trips taggen) begint.**

Dit document ontwerpt de metadata-structuur waarmee alle trips in Your Atlas (de ~13 bestaande
Grand Trips in Route Builder + hun ~75 standalone/combo-splitroutes + de ~320 nieuwe realistische
trips in `EUROPA_TRIP_IDEAS.md`) consistent gecategoriseerd kunnen worden — bruikbaar voor filteren,
vergelijken, en later een route builder/optimizer.

---

## Het onderliggende principe

Elke categorie beantwoordt precies één vraag. Zodra twee categorieën (bijna) dezelfde vraag
beantwoorden, worden ze samengevoegd. De negen vragen uit de opdracht zijn de negen "assen":

| As | Vraag | Categorieën die eronder vallen |
|---|---|---|
| **WHERE** | Waar gaat de reis heen? | Countries, Region/Area, Continent, Geographic Scope |
| **HOW LONG** | Hoeveel tijd kost het? | Duration Category, Min/Max/Ideal Duration Days |
| **HOW** | Hoe reis je? | Primary Travel Mode, Secondary Travel Modes |
| **WHAT** | Wat voor soort reis, qua vorm? | Primary Trip Type, Secondary Trip Types |
| **WHY** | Welke interesses/thema's? | Themes |
| **STYLE** | Hoe wil je het beleven? | Travel Style |
| **DIFFICULTY** | Hoe zwaar/complex? | Activity Level, Trip Complexity (twee aparte assen, expliciet niet hetzelfde) |
| **WHEN** | Wanneer is het geschikt? | Best/Good/Avoid Months |
| **COST** | Hoe duur? | Budget Level, Budget €/dag |

Plus vier categorieën die niet in de oorspronkelijke lijst stonden maar die ik toevoeg onder
**"E. Missing Categories"** — zie verderop, met motivatie waarom.

**Belangrijkste ontwerpbeslissing, vooraf**: *Geographic Scale* (dimensie L uit de opdracht) is
NIET een aparte categorie geworden. Het beantwoordt dezelfde vraag als "Destination" (WHERE) en is
samengevoegd tot één veld: **Geographic Scope**. Zie de anti-duplicatie-regels voor waarom.

---

## A. Master Taxonomy

Elke rij is één veld. "Kern" = kernveld uit de oorspronkelijke opdracht. "Nieuw" = door mij
voorgestelde toevoeging (zie sectie E voor motivatie per nieuw veld).

| # | Veld | As | Doel | Type | Kern/Nieuw |
|---|---|---|---|---|---|
| 1 | **Trip Name** | — | Identificatie | Text | Kern |
| 2 | **Countries** | WHERE | Welk(e) land(en) | Multi-select (landenlijst) | Kern |
| 3 | **Region/Area** | WHERE | Specifiekere regio/streek | Text (vrij, semi-gestructureerd) | Kern |
| 4 | **Continent** | WHERE | Groeperen op continent | Single select | Kern |
| 5 | **Geographic Scope** | WHERE | Schaal van de reis | Single select | Kern (vervangt dimensie L) |
| 6 | **Duration Category** | HOW LONG | Vaste duur-bucket voor filters | Single select | Kern |
| 7 | **Min Duration (days)** | HOW LONG | Ondergrens van de aanbevolen duur | Number | Kern (uitbreiding op "Ideal Duration") |
| 8 | **Max Duration (days)** | HOW LONG | Bovengrens | Number | Kern (idem) |
| 9 | **Ideal Duration (days)** | HOW LONG | Één concreet aanbevolen aantal dagen | Number | Kern |
| 10 | **Primary Travel Mode** | HOW | Hoofdvervoerswijze | Single select | Kern |
| 11 | **Secondary Travel Modes** | HOW | Overige gebruikte vervoerswijzen | Multi-select | Kern |
| 12 | **Primary Trip Type** | WHAT | Hoofdvorm van de reis | Single select | Kern |
| 13 | **Secondary Trip Types** | WHAT | Overige vormen die ook van toepassing zijn | Multi-select | Kern |
| 14 | **Themes** | WHY | Waar de reis inhoudelijk om draait | Multi-select | Kern |
| 15 | **Travel Style** | STYLE | Hoe de reis beleefd wordt | Multi-select | Kern |
| 16 | **Activity Level** | DIFFICULTY | Fysieke inspanning | Single select (ordinale schaal) | Kern |
| 17 | **Trip Complexity** | DIFFICULTY | Logistieke moeilijkheid | Single select | Kern |
| 18 | **Budget Level** | COST | Relatieve prijsklasse | Single select (€ t/m €€€€) | Kern |
| 19 | **Budget €/day (indicative)** | COST | Concreet geschat dagbudget | Number of range (text "70-90") | Kern |
| 20 | **Combination Potential** | — | Combineerbaarheid met andere trips | Single select | Kern |
| 21 | **Best Months** | WHEN | Ideale reismaanden | Multi-select (Jan–Dec) | Kern |
| 22 | **Good Months** | WHEN | Prima, niet ideaal | Multi-select (Jan–Dec) | Kern |
| 23 | **Avoid Months** | WHEN | Afraden | Multi-select (Jan–Dec) | Kern |
| 24 | **Parent Expedition** | — | Link naar de Grand Trip waar dit een onderdeel/afsplitsing van is | Text/reference (optioneel) | **Nieuw** |
| 25 | **Border Complexity** | DIFFICULTY | Schengen/visum-situatie | Single select | **Nieuw** |
| 26 | **Advisory Level** | — | Actuele reisadvies-kleur | Single select (Groen/Geel/Oranje/Rood) | **Nieuw** |
| 27 | **Verification Status** | — | Hoe grondig is dit item al gecheckt | Single select | **Nieuw** |
| 28 | **Last Verified (date)** | — | Wanneer voor het laatst gecheckt | Date/Month | **Nieuw** |
| 29 | **In Route Builder?** | — | Bestaat dit al als echte `rbBuildXRoute()` in de app | Boolean | **Nieuw** |

Dat zijn 29 velden — meer dan de ~12 uit de oorspronkelijke opdracht, vooral doordat "Ideal
Duration" is uitgebreid naar een min/max/ideal-drietal (zie regel 7-9) en door de vier nieuwe
categorieën. Zie sectie E voor per-veld motivatie, en voel je vrij om er tijdens goedkeuring een
paar te schrappen — dat is precies waar de "niet te complex maken"-regel voor is.

---

## B. Controlled Vocabulary

### Geographic Scope (single select)
- **City** — één stad
- **Single Region** — één streek/gebied binnen een land (bv. "Toscane", "Skåne")
- **Single Country** — één land, meerdere regio's
- **Multi-Region (same country)** — meerdere regio's/steden binnen één land, niet per se een lus
- **Multi-Country** — 2-4 landen
- **Grand Tour / Continental** — 5+ landen of een epische multi-maanden route (komt overeen met
  Route Builder's bestaande "Grand Trip"-begrip)

### Duration Category (single select)
- **Weekend** — 2-4 dagen
- **Short Trip** — 5-7 dagen
- **Holiday** — 8-14 dagen
- **Extended Trip** — 15-21 dagen
- **Expedition** — 22+ dagen

*(Dit is exact de indeling die je zelf voorstelde — hij sluit ook precies aan bij hoe de content in
`EUROPA_TRIP_IDEAS.md` en Route Builder al is opgebouwd, dus geen wijziging nodig.)*

### Primary/Secondary Travel Mode (multi-select, gedeelde lijst)
- Flight
- Car / Rental Car
- Train
- Interrail / Rail Pass
- Bus / Coach
- Ferry / Boat
- Cruise
- Hiking / Trekking
- Cycling
- Local Public Transport *(alleen relevant als dat een genoemd onderdeel is, niet standaard voor
  elke citytrip)*

*(Geen aparte "Mixed"-waarde nodig — als er 2+ modes geselecteerd zijn, is het per definitie
gemengd. "Camper/RV" bewust niet toegevoegd tenzij je dat als reisvorm gebruikt — makkelijk later
bij te voegen.)*

### Primary/Secondary Trip Type (single voor Primary, multi voor Secondary — gedeelde lijst)
- **City Trip** — één stad staat centraal
- **Roadtrip** — zelf rijden, meerdere stops
- **Rail Trip** — trein/Interrail-gedreven multi-stop reis
- **Island Trip** — één eiland of eilandengroep
- **Beach / Relaxation Trip** — rust/strand staat centraal
- **Hiking / Trekking Trip** — meerdaagse trektocht is de kern van de reis
- **Backpacking Trip** — low-budget, flexibel, vaak langere reis met wisselende accommodatie
- **Adventure Trip** — activiteiten-gedreven (rafting, ijsklimmen, sneeuwscooter, duiken), meer dan
  alleen wandelen
- **Nature Trip** — natuur staat centraal maar in een rustiger tempo (nationale parken bekijken,
  wildlife spotten, geen primaire trektocht)
- **Cruise Trip** — boot/veerbootreis is de structuur van de trip
- **Grand Expedition** — multi-maanden, multi-land epische reis (komt overeen met Route Builder's
  bestaande Grand Trips)

*(History/Culture/Nature-als-onderwerp zitten expres NIET in deze lijst — dat is een Theme, geen
Trip Type. Trip Type beschrijft de **vorm**, Theme beschrijft de **inhoud**. Zie de anti-
duplicatie-regels.)*

### Themes (multi-select)
- History
- Culture
- Architecture
- Religion
- Food & Drink
- Nightlife
- Nature
- Mountains
- Coast & Sea
- Beaches
- Islands
- Hiking
- Wildlife
- Winter & Snow
- Cities
- Small Towns & Villages
- Castles & Palaces
- Volcanoes & Geology
- Lakes
- Local Life / Off-the-beaten-path
- Adventure & Adrenaline
- Photography *(terughoudend gebruiken — zie regel hieronder)*

### Travel Style (multi-select)
- Independent
- Guided / Organized
- Slow Travel
- Fast-Paced
- Relaxed
- Social
- Outdoor-Focused

*(Budget/Luxury zitten hier bewust NIET in — dat is Budget Level, dimensie COST. Ook "Adventure"
zit hier niet in — dat is al een Trip Type. Zie anti-duplicatie-regels.)*

### Activity Level (single select, ordinaal)
Relaxed → Light → Moderate → Active → Very Active

### Trip Complexity (single select) — zie sectie C voor de precieze regels
Easy → Moderate → Complex

### Budget Level (single select) — gekalibreerd op de €/dag-cijfers die al in dit hele project
WebSearch-geverifieerd zijn:
- **€** — tot ~€60/dag *(bv. Balkan-binnenland, Bosnië/Servië/Noord-Macedonië/Kosovo)*
- **€€** — ~€60-100/dag *(de meeste West-/Zuid-/Centraal-Europese trips)*
- **€€€** — ~€100-140/dag *(eilanden, Scandinavische steden, duurdere combo's)*
- **€€€€** — €140+/dag *(Noorwegen, IJsland, Zwitserland, Svalbard, expeditie-niveau)*

### Combination Potential (single select)
- **Standalone** — niet ontworpen om aan iets anders vast te plakken
- **Combinable** — kan uitgebreid/gecombineerd worden met een aangrenzende trip
- **Gateway / Building Block** — is expliciet een afgeleid onderdeel van een grotere Grand
  Expedition (gebruik samen met veld 24, Parent Expedition)

*(De oorspronkelijke opdracht had 4 waarden inclusief "Best Combined" — die is samengevoegd met
"Easily Combinable" tot gewoon "Combinable", omdat het verschil in de praktijk niet betrouwbaar te
bepalen is.)*

### Border Complexity (single select, nieuw)
- **Schengen-only** — geen grenscontrole, geen visum
- **Simple non-Schengen** — visumvrij/ETA maar wel een echte grenscontrole (bv. VK, Ierland,
  Montenegro, Servië)
- **Complex** — visum nodig, of meerdere niet-Schengen-grenzen, of een grensgebied met een reëel
  aandachtspunt (bv. Kosovo-Servië-grensvolgorde, Noord-Cyprus)

### Advisory Level (single select, nieuw) — 1-op-1 de kleurcodes van nederlandwereldwijd.nl
Groen / Geel / Oranje / Rood *(met optioneel een tekstveld voor de reden, zoals dit hele document
al consequent doet)*

### Verification Status (single select, nieuw)
- **Verified** — WebSearch-gecheckt (budget/seizoen/praktische feiten), zoals alle 320 items in
  `EUROPA_TRIP_IDEAS.md` nu zijn
- **Draft** — bestaat, nog niet gecheckt
- **Needs Review** — was ooit geverifieerd maar de data kan gedateerd zijn (zie Last Verified)

---

## C. Rules

**Wanneer is iets een Roadtrip (Trip Type)?** Zelf rijden is de kern van de logistiek — meerdere
stops, geen vaste basis. Een city trip met één dagtrip per huurauto is geen Roadtrip.

**Wanneer is iets Multi-Country (Geographic Scope)?** Zodra het veld Countries 2+ waarden heeft.
Dit is dus altijd *afgeleid* van het Countries-veld, nooit een losse handmatige keuze — voorkomt
inconsistentie tussen de twee velden.

**Wanneer is iets een Expedition (Duration Category én mogelijk Trip Type)?** 22+ dagen. Als het
bovendien over meerdere landen gaat én bedoeld is als aspirational "someday"-reis (zoals Route
Builder's Grand Trips), krijgt het ook Primary Trip Type = Grand Expedition.

**Wanneer is iets Adventure Trip vs. Hiking/Trekking Trip vs. Nature Trip?** Dit zijn de drie meest
verwarrende buren, dus expliciete regel:
- **Hiking/Trekking Trip**: de kern is een meerdaagse trektocht zelf (bv. Tour du Mont Blanc,
  Laugavegur, Samaria-kloof als hoofdactiviteit).
- **Adventure Trip**: een mix van adrenaline-activiteiten (rafting, ijsklimmen, sneeuwscooter,
  duiken) die verder gaat dan puur wandelen.
- **Nature Trip**: natuur staat centraal maar in een rustiger tempo — nationale parken bekijken,
  wildlife spotten vanuit de auto/boot, geen primaire fysieke uitdaging.

Een trip mag Hiking als *Theme* hebben zonder Hiking/Trekking Trip als Primary Type te zijn (bv.
een Roadtrip met één stevige dagwandeling als onderdeel).

**Wanneer City Trip én Cultural — hoe zit dat?** "Cultural Trip" bestaat niet als Trip Type (zie
anti-duplicatie-regels) — dat wordt Primary Type = City Trip + Theme = Culture/History/Architecture.

**Wanneer krijgt een reis een Theme toegekend?** Alleen als het een substantieel onderdeel van de
reis is, niet omdat het toevallig ergens voorkomt. *("Rome heeft parken" → geen Nature-theme. "Deze
reis draait gedeeltelijk om natuur" → wel.)*

**Primary vs. Secondary Trip Type**: Primary = de vorm die de reis het meest bepaalt (vaak
letterlijk af te lezen aan hoe de titel al is opgebouwd, bv. "Slovenië Alpine Loop" = Roadtrip,
niet Nature Trip als primary). Secondary = andere vormen die ook echt van toepassing zijn, niet
elke denkbare associatie.

**Wanneer Photography als Theme?** Alleen als de reis specifiek rond fotomomenten is ontworpen (bv.
noorderlicht-jacht, wildlife-fotografie-safari) — niet zomaar toekennen omdat een bestemming
fotogeniek is.

---

## D. Anti-duplication rules

Deze samenvoegingen zijn al doorgevoerd in de vocabulaire hierboven, expliciet genoemd zodat het
bij Fase 2 niet opnieuw ter discussie komt:

| Wat je zou kunnen tegenkomen | Wordt | Waarom |
|---|---|---|
| Nature / Nature & Wildlife / Outdoor Nature / Wilderness | **Nature** (+ Wildlife als thema als dieren echt de focus zijn) | Vier woorden voor hetzelfde begrip |
| Ancient History / Medieval History / Military History / Archaeology | **History** | Te granulair voor een bruikbaar filter; het verschil hoort in de vrije route-beschrijving, niet in de taxonomie |
| Cultural Trip / Historical Trip / Nature Trip *(als Trip Type)* | **Theme**, niet Trip Type | Trip Type beschrijft de vorm (hoe de reis is gestructureerd), niet het onderwerp |
| Multi-country Trip *(als Trip Type)* | **Geographic Scope = Multi-Country** | Beschrijft waar, niet wat voor soort reis — hoort bij WHERE, niet WHAT |
| Geographic Scale *(dimensie L)* | Samengevoegd met **Geographic Scope** (WHERE) | Beantwoordde exact dezelfde vraag als Destination |
| Budget / Luxury *(als Travel Style)* | **Budget Level** (COST-as) | Kostenniveau is een aparte dimensie, geen belevingsstijl |
| Adventure *(als Travel Style)* | Al gedekt door **Trip Type = Adventure Trip** | Voorkomt dat dezelfde eigenschap op twee plekken staat |
| Off-the-beaten-path *(als Travel Style)* | **Theme = Local Life / Off-the-beaten-path** | Dit gaat over wat je ziet, niet hoe je reist |
| Easily Combinable / Best Combined | Samengevoegd tot **Combinable** | Onderscheid in de praktijk niet betrouwbaar te maken |
| Best/Good/Possible/Poor Months (4 lijsten) | **Best/Good/Avoid** (3 lijsten) | Alles wat niet in een van de drie staat is impliciet "mogelijk maar niet bijzonder" — een vierde lijst voegt niets toe |

---

## E. Missing Categories — voorgestelde toevoegingen

Getoetst aan: *"als deze database 500-1000 reizen bevat, wat wil ik dan kunnen filteren dat nu
ontbreekt?"* Vier toevoegingen die ik er echt bij vind horen, elk met concrete aanleiding uit dit
project zelf:

**24. Parent Expedition** — Your Atlas heeft al een reëel bestaande structuur waarin ~75
standalone/combo-routes letterlijk afsplitsingen zijn van de 13 Grand Trips in Route Builder (zie
`ROUTE_BUILDER_MODULES.md`). Zonder dit veld gaat die relatie verloren zodra alles in één platte
tabel staat. Met dit veld kun je straks filteren op "alle onderdelen van de Eurasia Grand Tour" of
juist net zo makkelijk zien welke Grand Trip nog geen enkele losse Combinable-afsplitsing heeft.

**25. Border Complexity** — een groot deel van het recente werk in `EUROPA_TRIP_IDEAS.md` (batches
8, 9, 10, 12, 13, 14, 15) bestond letterlijk uit het uitzoeken van Schengen/niet-Schengen/ETA/
visum-situaties. Dat is precies het soort informatie dat je wilt kunnen filteren ("laat me alleen
grensvrije trips zien voor een lang weekend") maar dat nu alleen als lopende tekst in elke
route-notitie staat.

**26. Advisory Level** — dit hele project heeft consequent groen/geel/oranje/rood-classificaties
uit nederlandwereldwijd.nl verwerkt (Reykjanes geel, Noord-Kosovo oranje, Transnistrië rood,
Griekenland geel voor bosbranden, etc.). Een los filterbaar veld voorkomt dat je dat straks weer
per route-tekst moet nalezen, en laat je in één oogopslag zien welke trips een actuele
veiligheidsnuance hebben.

**27/28. Verification Status + Last Verified (date)** — dit hele document (`EUROPA_TRIP_IDEAS.md`)
onderscheidt al expliciet "WebSearch-geverifieerd" van "nog ruw", en veel van de gevonden feiten
zijn tijdgevoelig (veerdienstregelingen, tarieven, vulkaanactiviteit, protesten). Zonder een
datumveld weet je over een jaar niet meer welke trips een refresh nodig hebben.

**29. In Route Builder?** — dit is exact het onderscheid dat net in dit gesprek voor verwarring
zorgde: een trip kan volledig uitgewerkt en geverifieerd zijn in de database/markdown, zonder dat
hij al als echte `rbBuildXRoute()` in de app staat. Een simpele boolean maakt dat verschil voor
altijd expliciet i.p.v. iets dat je moet onthouden of opnieuw moet navragen.

Ik heb bewust **niet** toegevoegd: een apart "Language spoken"-veld, een "Currency"-veld, of een
"Visa cost"-veld — die zijn te instabiel/gedetailleerd voor een taxonomie-niveau-veld en horen
beter thuis in de vrije routebeschrijving zelf (zoals nu al gebeurt).

---

## F. Vijf voorbeeldtrips volgens deze structuur

Ter illustratie, met echte trips uit dit project:

### 1. Ardennen (3 dagen) — `EUROPA_TRIP_IDEAS.md`, Benelux-batch
| Veld | Waarde |
|---|---|
| Countries | België |
| Region/Area | Ardennen (La Roche-en-Ardenne, Han-sur-Lesse, Coo) |
| Continent | Europa |
| Geographic Scope | Single Region |
| Duration Category | Weekend |
| Min/Max/Ideal Duration | 3 / 3 / 3 |
| Primary Travel Mode | Car / Rental Car |
| Primary Trip Type | Roadtrip |
| Secondary Trip Types | Nature Trip |
| Themes | Nature, Small Towns & Villages |
| Travel Style | Independent, Relaxed |
| Activity Level | Light |
| Trip Complexity | Easy |
| Budget Level | €€ (~€80-95/dag) |
| Combination Potential | Combinable (met andere Benelux-trips) |
| Best Months | Mei–Sep |
| Border Complexity | Schengen-only |
| Advisory Level | Groen |
| Verification Status | Verified |
| In Route Builder? | Nee (staat alleen in EUROPA_TRIP_IDEAS.md) |

### 2. Slovenië Alpine Loop (5-7 dagen) — `EUROPA_TRIP_IDEAS.md`, batch 11-stijl content
| Veld | Waarde |
|---|---|
| Countries | Slovenië |
| Geographic Scope | Single Country |
| Duration Category | Short Trip |
| Min/Max/Ideal | 5 / 7 / 6 |
| Primary Travel Mode | Car / Rental Car |
| Primary Trip Type | Roadtrip |
| Secondary Trip Types | Nature Trip, Hiking/Trekking Trip |
| Themes | Nature, Mountains, Lakes, Hiking |
| Travel Style | Independent, Outdoor-Focused |
| Activity Level | Active |
| Trip Complexity | Moderate (bergpas-logistiek, seizoensgebonden verkeersregime) |
| Budget Level | €€ (~€100-140/dag) |
| Border Complexity | Schengen-only |
| Advisory Level | Groen |

### 3. IJsland Ring Road (10-14 dagen) — batch 11
| Veld | Waarde |
|---|---|
| Countries | IJsland |
| Geographic Scope | Single Country |
| Duration Category | Holiday |
| Min/Max/Ideal | 10 / 14 / 12 |
| Primary Travel Mode | Car / Rental Car |
| Primary Trip Type | Roadtrip |
| Secondary Trip Types | Nature Trip |
| Themes | Nature, Coast & Sea, Volcanoes & Geology, Wildlife |
| Travel Style | Independent, Outdoor-Focused, Slow Travel |
| Activity Level | Moderate |
| Trip Complexity | Moderate |
| Budget Level | €€€€ (~€115-140/dag) |
| Border Complexity | Schengen-only |
| Advisory Level | Geel (Reykjanes vulkanisch, relevant als vertrekpunt Keflavík erbij komt) |
| Verification Status | Verified |

### 4. Kosovo + Albanië (7-10 dagen) — batch 8-content
| Veld | Waarde |
|---|---|
| Countries | Kosovo, Albanië |
| Geographic Scope | Multi-Country |
| Duration Category | Short Trip / Holiday-grens |
| Min/Max/Ideal | 7 / 10 / 8 |
| Primary Travel Mode | Bus / Coach |
| Secondary Travel Modes | Car / Rental Car |
| Primary Trip Type | Backpacking Trip |
| Secondary Trip Types | Roadtrip |
| Themes | History, Culture, Mountains, Local Life |
| Travel Style | Independent, Slow Travel |
| Activity Level | Light |
| Trip Complexity | Moderate (niet-Schengen, geen Servië-grensvolgorde-issue op deze specifieke route) |
| Budget Level | € (~€25-35/dag) |
| Border Complexity | Simple non-Schengen |
| Advisory Level | Groen (met de bekende uitzondering Noord-Kosovo, niet op deze route) |

### 5. Eurasia Grand Tour 🌏 (336 dagen) — bestaande Route Builder Grand Trip
| Veld | Waarde |
|---|---|
| Countries | 27 landen |
| Geographic Scope | Grand Tour / Continental |
| Duration Category | Expedition |
| Min/Max/Ideal | 336 / 336 / 336 |
| Primary Travel Mode | Train, Bus, Flight *(gemengd, geen één hoofdmodus)* |
| Primary Trip Type | Grand Expedition |
| Themes | History, Culture, Nature, Mountains, Cities, Local Life |
| Travel Style | Independent, Slow Travel, Backpacker-achtig |
| Activity Level | Moderate |
| Trip Complexity | Complex |
| Budget Level | €€ gemiddeld (varieert fors per land) |
| Combination Potential | Gateway/Building Block *(heeft zelf meerdere Combinable-afsplitsingen, bv. Centraal-Azië-splitroute)* |
| Parent Expedition | — *(is zelf de Grand Trip, geen onderdeel van iets groters)* |
| In Route Builder? | **Ja** |
| Verification Status | Verified (route-logic + prijs-verificatie beide afgerond, 2026-08) |

Dit voorbeeld laat meteen zien waarom veld 29 (In Route Builder?) zo waardevol is: exact hetzelfde
soort trip (een epische multi-land reis) kan zowel "Ja" (Eurasia Grand Tour, al gebouwd) als "Nee"
(elk van de ~320 nieuwe EUROPA_TRIP_IDEAS-items, nog niet gebouwd) zijn — zonder dit veld is dat
onderscheid onzichtbaar in de tabel.

---

## Openstaande vraag voor jou

Dit zijn 29 velden. Dat is bewust compleet, maar mogelijk meer dan je wilt bijhouden per trip.
Kandidaten om te schrappen als het je te veel wordt (in volgorde van "makkelijkst te missen"):
**Photography** als Theme (smalle toepassing), **Secondary Travel Modes** (Primary alleen kan ook),
**Good Months** (Best + Avoid dekt het meeste al), **Border Complexity** als je liever bij de
Advisory-notitie in de routetekst blijft.

Laat weten of deze structuur klopt, wat je wilt schrappen/toevoegen, en dan begin ik pas met Fase 2
(alle bestaande trips hiermee taggen).
