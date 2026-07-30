# Route Builder — Modularisatie-analyse

**Mega Expedition → Major Trip → Travel Block**

Datum: 2026-07-30 · Bron: `js/pages/routeBuilder.js` (alle 13 `rbBuildXRoute()`-functies + `RB_EXPEDITION_CONTENT`), `CHANGELOG.md`, `ROUTE_BUILDER_SYNC.md`, `CLAUDE.md`, `ROADMAP.md` in de YourAtlas-repo.

**Status: alleen analyse. Er is niets in code of data aangepast.**

**Update (2026-07-30) — jouw keuzes op de 4 open vragen:**
- **Naamgeving:** houd het simpel — twee praktische lagen (grote expedities die in de Route Builder blijven, en kleinere losse tripjes), genoemd naar hun regio. De Route/Region/Leg/Module-terminologie hieronder blijft staan als *technische* aantekening voor als je dit ooit echt bouwt, maar is geen naamgeving die je nu al hoeft door te voeren.
- **Auto-roadtrips (Central European Grand Roadtrip, British Isles):** blijven ongesplitst. Geen wijziging nodig.
- **Compatible/incompatible blocks:** nog niet vastleggen — je wilt eerst gewoon meer opties en ideeën zien, geen volledig scoresysteem.
- **Sheet-sync:** niet nu meekoppelen — de sheets worden later sowieso helemaal herzien.
- **Nieuw inzicht dat je toevoegde:** een aantal van de hieronder genoemde blocks zijn eigenlijk al **vakantie-lengte** (een paar weken, geen maanden) — die wil je niet alleen als Route Builder-onderdeel zien, maar ook overwegen als gewone **Trip** in je Trips-lijst. Zie het nieuwe hoofdstuk [Vakantie-schaal vs. expeditie-schaal](#vakantie-schaal-vs-expeditie-schaal--meer-opties) hieronder.

---

## Leeswijzer

Dit document beantwoordt de ChatGPT-prompt die je had voorbereid, maar dan uitgevoerd tegen je **echte** route-data in plaats van in het algemeen. Alle landen, dagen, budgetten, seizoenen en transport-notities hieronder komen letterlijk uit je 13 bestaande expedities — er is niets nieuws verzonnen.

Springpunten:
1. [Methode](#methode)
2. [Per-expeditie analyse](#per-expeditie-analyse) — alle 13, inclusief de twee waar je om extra aandacht vroeg (Eurasia, Pan-America)
3. [Patronen die al in je data zaten](#patronen-die-al-in-je-data-zaten) — hergebruik/overlap
4. [Vakantie-schaal vs. expeditie-schaal — meer opties](#vakantie-schaal-vs-expeditie-schaal--meer-opties) — welke blocks al vakantie-lengte zijn, en meer losse tripjes
5. [Recommended hierarchy](#recommended-hierarchy)
6. [Route Builder implementation](#route-builder-implementation) — hoe dit technisch past
7. [Migration plan](#migration-plan)
8. [Openstaand](#openstaand)

---

## Methode

Voor elke expeditie is gekeken naar: de bestaande `regions[]`-indeling (waar aanwezig), de per-land `days`/`budget`/`transport_to_next`/`notes`, en — heel belangrijk — expliciete uitspraken die jij (of de ChatGPT-brainstorms die je zelf al gebruikte) al in de `notes`/`climate_summary`-velden had staan over splitsen, uitsluiten of "dit is eigenlijk een aparte reis". Die citaten worden letterlijk aangehaald, want dat is het sterkste bewijs dat er al is.

Classificatie per Travel Block, zoals gevraagd:
- **Sterk** — kan prima als zelfstandige reis, eigen identiteit, logische start/eind, goede duur, eigen highlights.
- **Medium** — kan zelfstandig, maar is vooral interessant als onderdeel van iets groters.
- **Sub** — te klein/te dun om als zelfstandige reis te verkopen; wel een nuttige bouwsteen.

Belangrijk voorbehoud: twee van de dertien expedities (**Central European Grand Roadtrip** en **British Isles & Celtic Coast Expedition**) zijn **eigen-auto-vanuit-Nederland**-lussen, geen fly-in-per-regio expedities. Dat verandert wat "modulariseren" betekent — zie hun aparte behandeling.

---

## Per-expeditie analyse

### 1. Eurasia Grand Tour 🌏 *(extra aandacht, zoals gevraagd)*

**Huidige scope:** 27 landen, 336 dagen (~11-12 maanden), ~€20.000, Balkan → Kaukasus → Centraal-Azië → Oost-Azië → Zuidoost-Azië, backpacker/overland.

**Waarom opsplitsen — en dit staat al letterlijk in je eigen data:**
> *"Overweeg desondanks om deze route ooit te knippen in twee losse expedities (West-Eurazië t/m Centraal-Azië, en Oost-Eurazië/Azië) — 11-12 maanden aaneengesloten is fors, ook voor langzaam reizen."*

Dat is exact wat deze analyse zou hebben voorgesteld, dus dit is de duidelijkste "ja, splits dit"-case van alle 13. De 11 regio's die er al in zitten zijn vrijwel kant-en-klare Travel Blocks — er hoeft weinig heringedeeld te worden, vooral samengevoegd tot een tussenlaag.

**Beste modularisatie — 3 Major Trips, elk zelf weer opgebouwd uit Travel Blocks:**

| Major Trip | Regio's erin | Dagen | Budget | Seizoen |
|---|---|---|---|---|
| **West-Eurazië Overland** | Balkan, Turkije, Kaukasus, Centraal-Azië | 146 | €8.159 | april–september |
| **Oost-Azië & Stille Oceaan** | China, Mongolië, Japan, Taiwan | 66 | €5.725 | augustus–november |
| **Zuidoost-Azië Grand Loop** | Mainland SEA, Maritime SEA, Indonesië & Oost-Timor, Singapore | 124 | €6.090 | november–maart |

**Travel Blocks binnen West-Eurazië Overland:**

| Block | Landen | Dagen | Seizoen | Start/eind | Sterkte |
|---|---|---|---|---|---|
| Balkan | BA, HR, ME, AL, MK | 45 | april–juni | Sarajevo → Skopje (vlucht naar Istanbul) | **Sterk** — al een klassieke standalone backpackroute |
| Turkije | TR | 24 | juni | Istanbul → Kars/Trabzon | **Medium** — sterk land, maar 1 land/24 dagen is dun als "major trip"; werkt goed als brug tussen Balkan en Kaukasus |
| Kaukasus | GE, AM, AZ | 28 | juni–augustus | Tbilisi → Baku (vlucht naar Almaty) | **Sterk** — Georgië/Armenië/Azerbeidzjan is al een bekende standalone trip |
| Centraal-Azië ("de Stans") | KZ, KG, TJ, UZ | 49 | juni–september | Almaty → Tashkent (vlucht naar Ürümqi) | **Sterk** — visum/seizoen-gebonden aan de Pamir Highway, precies het soort eigen-identiteit-block dat je zoekt |

**Travel Blocks binnen Oost-Azië & Stille Oceaan:**

| Block | Landen | Dagen | Sterkte |
|---|---|---|---|
| China & Mongolië (Silk Road–Gobi) | CN, MN | 38 | **Medium/Sterk** — overland verbonden via de Trans-Mongolië-trein, samen één logisch geheel |
| Japan & Taiwan | JP, TW | 28 | **Sterk** — klassieke Oost-Azië combinatie, visumvrij, geen haken |

**Travel Blocks binnen Zuidoost-Azië Grand Loop:**

| Block | Landen | Dagen | Sterkte |
|---|---|---|---|
| Mainland Southeast Asia | VN, LA, KH, TH | 60 | **Sterk** — dé klassieke SEA-backpackroute, bestaat al als concept wereldwijd |
| Maritime/Island SEA | MY, BN, PH, ID, TL | 61 | **Sterk** — eiland-hoppen, iets minder mainstream (Brunei/Oost-Timor zijn niche) maar prima zelfstandig |
| Singapore Finale | SG | 3 | **Sub** — te kort om alleen te doen, werkt alleen als bewuste afsluiter van iets groters |

---

### 2. Pan-American Grand Tour 🌎 *(extra aandacht, zoals gevraagd)*

**Huidige scope:** 15 landen, 286 dagen, €11.166, Mexico → Midden-Amerika → Andes → Zuidelijke Kegel/Brazilië.

**Waarom opsplitsen — ook dit staat al in je eigen data, en is zelfs al *voor-gepland*:**
> *"Patagonia, Antarctica, Northern Brazil, Suriname and the Caribbean are intentionally excluded — planned as separate future expeditions."*

Dit is het sterkste bewijs in de hele dataset dat je (via de ChatGPT-brainstorm) al modulair dacht toen deze route werd ontworpen: Chili en Argentinië zijn hier bewust **alleen het noordelijke deel** — het zuidelijke deel (Patagonië) zit al in een aparte expeditie. Dat is precies het "hetzelfde land, ander block"-patroon dat je nu wilt formaliseren.

**Beste modularisatie:**

| Major Trip | Landen | Dagen | Budget | Sterkte |
|---|---|---|---|---|
| **Mexico** | MX | 28 | €1.000 | **Sterk** — een van de meest geboekte standalone bestemmingen ter wereld |
| **Midden-Amerika Loop** | GT, BZ, HN, SV, NI, CR, PA | 101 | €3.745 | **Sterk** — klassieke Midden-Amerika backpackroute |
| **Andes Grand Traverse** | CO, EC, PE, BO | 115 | €4.385 | **Sterk** — ononderbroken overland corridor, geen enkele vlucht nodig tussen deze 4 landen |
| **Zuidelijke Kegel & Brazilië-finale** | CL (noord), AR (noord), BR (zuid) | 42 | €2.036 | **Medium** — zie kanttekening hieronder |

Kanttekening bij de laatste: "Northern Chile" en "Northern Argentina" zijn ieder maar 10 dagen — te dun om apart te verkopen (ze zíjn letterlijk alleen het topje van die landen, San Pedro de Atacama en Salta). Logisch is die twee samen te voegen tot één **Sub-block "Andes-woestijnoversteek"** (20 dagen, Atacama + Salta, al fysiek dezelfde woestijnstreek over de grens heen), met Zuid-Brazilië (22 dagen, Iguaçu/Florianópolis/Rio) als apart, iets steviger **Medium-block**.

Binnen Midden-Amerika Loop zijn er twee sub-blocks (Noordelijk: GT/BZ/HN/SV, Zuidelijk: NI/CR/PA) — let op: dit knipt dwars door de **CA-4-visumzone** (Guatemala/Honduras/El Salvador/Nicaragua delen één 90-dagen-stempel), want Nicaragua zit in het zuidelijke blok terwijl de andere drie CA-4-landen noordelijk zitten. Geen probleem voor de huidige route (blijft ruim onder de 90 dagen), maar wel iets om in de gaten te houden als je ooit de blokgrenzen dáár zou leggen.

Binnen Andes Grand Traverse zijn Colombia (35d, **Sterk**, al hip als standalone), Peru (35d, **Sterk**, Machu Picchu draagt het alleen al) en in mindere mate Ecuador (24d, **Medium/Sterk**, vooral door Galápagos) en Bolivia (21d, **Medium**, wordt vaker als verlengstuk van Peru geboekt dan alleen) elk zelf ook Travel Blocks.

---

### 3. Africa Grand Tour 🌍

**Huidige scope:** 18 landen, 288 dagen, €33.095. Sinds de 2026-07 herordening: Zuid-Afrika/Lesotho/Eswatini → Zuidelijk-Afrika-lus → Eilanden → Oost-Afrika → Hoorn van Afrika & Egypte.

**Waarom opsplitsen:** de vluchten-only overgangen liggen al vast in de data (*"vluchten alleen tussen Malawi/Madagaskar/Mauritius/Tanzania... en tussen Ethiopië en Egypte"*), en er is zelfs al een precedent van een eerdere daadwerkelijke splitsing: Jordanië en Oman zaten hier ooit in en zijn verplaatst naar wat nu Mediterranean Civilizations Expedition is — *"Egypte zelf komt in beide routes voor omdat het bij beide thema's past."* Dat is letterlijk een block dat al in twee Mega Expeditions wordt hergebruikt.

| Major Trip | Landen | Dagen | Sterkte |
|---|---|---|---|
| **Zuidelijk Afrika Safari-lus** | ZA, LS, SZ, MZ, ZW, BW, NA, AO, ZM, MW | 146 | **Sterk** — dé klassieke Zuidelijk-Afrika overland safari |
| **Eilanden** | MG, MU | 31 | **Medium** — zie kanttekening |
| **Oost-Afrika Safari Classic** | TZ, RW, UG, KE | 70 | **Sterk** — gorilla's + Serengeti, een van de meest geboekte Afrika-trips die er is |
| **Hoorn van Afrika & Egypte** | ET, EG | 41 | **Medium** — zie kanttekening |

Binnen Zuidelijk Afrika Safari-lus:

| Block | Landen | Dagen | Sterkte |
|---|---|---|---|
| Zuid-Afrika & Bergkoninkrijkjes | ZA, LS, SZ | 35 | **Sterk** |
| Victoria Falls & Kalahari-lus | MZ, ZW, BW | 50 | **Sterk/Medium** |
| Namibië & Angola | NA, AO | 31 | **Medium** — Namibië alleen is al een zeer populaire zelfstandige zelfrij-trip; Angola is de avontuurlijke bonus die het minder "instap-vriendelijk" maakt |
| Zambia & Malawi | ZM, MW | 30 | **Medium** |

Kanttekening bij **Eilanden**: Madagaskar (24d, **Sterk** — iconische natuur, staat prima alleen) en Mauritius (7d, **Sterk maar totaal ander reistype** — strand/luxe versus Madagaskar's avontuur/natuur) zitten hier vooral samen omdát het vluchttechnisch handig is, niet omdat ze thematisch bij elkaar horen. Ze verdienen het om als twee losse Sterke blocks behandeld te worden die toevallig vaak gecombineerd worden, niet als één samengesteld block.

Kanttekening bij **Hoorn van Afrika & Egypte**: Egypte (21d) is een van de meest bezochte standalone bestemmingen ter wereld — **Sterk**, hoort eigenlijk niet "onder" iets anders. Ethiopië (20d) is ook **Sterk** als eigen historisch circuit, maar staat momenteel deels rood/oranje op het reisadvies (Amhara/Afar). Deze twee zitten samen vooral voor vluchtefficiëntie, niet voor diepe thematische eenheid.

---

### 4. Mediterranean Civilizations Expedition 🏛️

**Huidige scope:** 18 etappes/13 landen (Italië 5x, Griekenland 2x, Frankrijk 2x), 150 dagen, ~€10.329. Van Andalusië tot Qatar.

**Waarom opsplitsen:** dit is de expeditie die **het minst ooit één aaneengesloten reis was** — elke regio-overgang is al een vlucht of veerboot, er is nooit een doorlopende overland-lijn geweest. Je eigen notitie noemt zelfs al een concrete kandidaat om te schrappen:
> *"Qatar is de enige etappe zonder oude geschiedenis... bewust gehandhaafd als hedendaags slotakkoord... maar de eerste kandidaat om te laten vervallen als de reis korter moet."*

Van de 13 expedities is dit de beste kandidaat om **elke bestaande regio te promoveren tot eigen Major Trip** — ze staan toch al los van elkaar:

| Major Trip (= bestaande regio) | Landen | Dagen | Sterkte |
|---|---|---|---|
| Iberia & Marokko/Tunesië | ES, MA, TN | 26 | **Sterk** |
| Malta & Italië | MT, IT (Sicilië/Napels/Rome/Sardinië) | 34 | **Sterk** |
| Corsica & Zuid-Frankrijk | FR (Corsica), FR (Provence) | 11 | **Sub** — te kort voor "major trip"-status, werkt beter als bolt-on |
| Griekenland & Cyprus | GR, GR (Kreta), CY | 24 | **Sterk** |
| Anatolië | TR | 20 | **Sterk** |
| Egypte & Arabisch Schiereiland | EG, JO, OM, BH, QA | 35 | **Medium** — zie hieronder |

Egypte & Arabisch Schiereiland is zelf het meest gemengd: Egypte (14d, **Sterk**, en identiek aan het Egypte-block uit Africa Grand Tour — zie [overlap](#patronen-die-al-in-je-data-zaten)) en Jordanië (8d, **Sterk**, Petra draagt het alleen al) zijn allebei prima zelfstandig. Oman/Bahrein/Qatar samen (13d) vormen een duidelijk **Medium/optioneel "Golfstaten"-blok** — precies het deel dat nu ook het zwaarst reisadvies-belast is (Bahrein rood, Jordanië/Qatar oranje, Oman deels oranje per de laatste check). Dat sluit direct aan bij je eigen "Qatar eerste kandidaat om te schrappen"-notitie — ik zou die logica doortrekken naar de hele Golf-driehoek.

---

### 5. Nordic Arctic Expedition ❄️

**Huidige scope:** 7 landen, 68 dagen, €16.325 (duurste route van de hele set).

**Waarom opsplitsen:** dit is eigenlijk **al** 5 losse dingen die met een noordelijk thema aan elkaar zijn geregen. Je eigen notitie zegt het letterlijk:
> *"Svalbard, Faeröer, IJsland en Groenland — stuk voor stuk losse vluchtsprongen, geen doorlopende route."*

Dit is hét voorbeeld uit de oorspronkelijke prompt ("twee kleinere geografische gebieden mogen samen één block vormen, of andersom") maar dan omgekeerd: geografische nabijheid (allemaal "noordelijk") zorgt hier juist NIET voor één logisch geheel.

| Block | Landen | Dagen | Sterkte |
|---|---|---|---|
| Scandinavië Overland | FI, SE, NO | 29 | **Sterk** — enige écht overland-verbonden deel |
| Svalbard | SJ | 8 | **Sterk** — bucket-list arctic trip op zich |
| Faeröer | FO | 7 | **Sterk** — populaire eigen hiking-bestemming |
| IJsland | IS | 14 | **Sterk** — een van de meest geboekte standalone trips ter wereld |
| Groenland | GL | 10 | **Sterk** — duur, maar eigen identiteit |

Advies: presenteer dit niet als één Major Trip met vier sub-onderdelen, maar als **vijf gelijkwaardige, los te boeken blocks** die je desgewenst combineert — precies het "build your own expedition"-scenario uit je prompt.

---

### 6. Patagonia & Antarctica Expedition 🧊

**Huidige scope:** 3 etappes, 53 dagen, €15.075.

**Waarom opsplitsen:** je eigen notitie zegt al expliciet dat Chili/Argentinië hier alléén het zuidelijke deel zijn (het noordelijke deel zit in Pan-American — zie [overlap](#patronen-die-al-in-je-data-zaten)), en dat Antarctica alleen per cruise bereikbaar is, los van de rest.

| Block | Landen | Dagen | Sterkte |
|---|---|---|---|
| Patagonië Overland | CL (zuid), AR (zuid) | 42 | **Sterk** — "Patagonië" is wereldwijd al een gewild standalone reisthema |
| Antarctica-cruise | AQ | 11 | **Sterk, en het schoonste "plug-in"-block van de hele set** — eigen boekingscategorie, eigen budget-logica (cruiseprijs, geen dagbudget), makkelijk aan te haken achter Patagonië of los vanuit Ushuaia te boeken |

---

### 7. India & Himalaya Expedition 🏔️

**Huidige scope:** 3 landen, 59 dagen, €4.810 — **nog flat/zonder regio's** in de code; je eigen notitie nodigt daar zelf al toe uit ("groepeer deze 3 landen... wanneer je er klaar voor bent").

| Block | Landen | Dagen | Sterkte |
|---|---|---|---|
| Noord-India | IN | 30 | **Sterk** — Golden Triangle/Rajasthan is een van de meest klassieke standalone trips |
| Nepal | NP | 21 | **Sterk** — enorm populaire eigen bestemming |
| Bhutan | BT | 8 | **Medium** — verplichte gids + $100/nacht sustainable fee maken het duur en kort; wordt vrijwel altijd als verlengstuk van Nepal/India geboekt, zelden alleen |

Dit is een mooi voorbeeld waar de analyse zelf het werk doet dat de app nog niet had gedaan.

---

### 8. North America Grand Traverse 🌎

**Huidige scope:** 6 etappes, 69 dagen, ~€10.000. Zelfrij-strategie is al bewust in 3 losse huurauto's + 1 treinetappe geknipt — dat geeft de Travel Blocks vrijwel gratis:

| Major Trip | Etappes | Dagen | Sterkte |
|---|---|---|---|
| Oost-Canada | Nova Scotia, Historische Steden | 18 | **Medium** — leuk, maar dun voor "major trip" |
| West-Canada: Rockies & Vancouver | Canadian Rockies, Vancouver | 22 | **Sterk** — Banff/Jasper/Vancouver is een klassieke standalone Canada-trip |
| VS Westkust Roadtrip | Pacific NW & N-Californië, Californië-finale | 29 | **Sterk** — klassieke Highway 1-achtige roadtrip |

---

### 9. Oceania Grand Expedition 🌊

**Huidige scope:** 14 etappes, 183 dagen, €17.943 (bijgewerkt na prijscorrectie). Je eigen `climate_summary` beschrijft al de knip zo expliciet dat ik hem nauwelijks hoef te herformuleren:
> *"de Pacific-eilanden en tropisch Australië willen allebei het droge seizoen (mei-oktober)... Nieuw-Zeeland en gematigd Australië willen juist hun eigen zomer (november-maart) — deze twee vensters overlappen niet."* Er staat zelfs al een concrete "bouw een pauze in"-suggestie in de notes.

| Major Trip | Etappes | Dagen | Sterkte |
|---|---|---|---|
| Pacific-eilanden & Tropisch Australië | Fiji/Vanuatu/Samoa/Tonga/Cook Isl. + Perth-Kimberley/Darwin-RedCentre/Cairns | 105 | zie sub-blocks |
| Gematigd Australië & Nieuw-Zeeland | Sydney-Byron/GreatOceanRoad/Tasmanië/Adelaide + NZ Zuid/Noord | 78 | zie sub-blocks |

Vier sterke blocks eronder — en let op: **Australië zelf wordt hier al opgeknipt in twee blocks** (Tropisch vs. Gematigd), hetzelfde patroon als Chili/Argentinië in Pan-American/Patagonia:

| Block | Sterkte |
|---|---|
| Pacific-eilanden (Fiji t/m Cook Islands) | **Sterk** — klassieke Zuid-Pacific eiland-hop |
| Tropisch/Outback Australië | **Sterk** — "top end" Australië is al een gangbare eigen tripvorm |
| Gematigd/Zuidelijk Australië (incl. Tasmanië) | **Sterk** — klassieke oostkust+Tasmanië trip |
| Nieuw-Zeeland | **Sterk** — een van de meest geboekte standalone trips wereldwijd |

---

### 10. Caribbean & Amazon Expedition 🌴

**Huidige scope:** 10 etappes, 97 dagen, €7.450 (bijgewerkt na prijscorrectie).

**Kritische noot:** je eigen notities verdedigen expliciet dat dit *niet* gesplitst moet worden ("geen van de tien onderdelen is geschrapt", Suriname/Brazilië "complementair"). Toch is de vlucht Grenada→Suriname zelf al aangemerkt als *"waarschijnlijk de lastigste/duurste losse verbinding"* van de hele route, en het reistype verschuift daar volledig (eiland-hoppen → rivier/regenwoud op het continent). Ik ben het hier bewust oneens met de eigen framing: logistiek en reisstijl wijzen wél op een knip, ook al was die niet zo bedoeld.

| Major Trip | Landen | Dagen | Sterkte |
|---|---|---|---|
| Caraïbische Eilanden-hop | CU, JM, CW, BQ, GP, DM, LC, GD | 72 | **Sterk** |
| Suriname & Noord-Brazilië | SR, BR | 25 | **Medium** — vooral relevant voor een Nederlandse reiziger (Suriname-band), kort maar met eigen identiteit |

Binnen de Eilanden-hop: Cuba (**Sterk**, wereldberoemd standalone) en Jamaica (**Sterk**) zijn zelf ook prima losse blocks; de Nederlandse Caraïben (Curaçao/Bonaire, **Medium**, vooral herkenbaar voor Nederlandse reizigers) en de Kleine Antillen (Guadeloupe/Dominica/StLucia/Grenada, **Medium/Sterk**) zijn iets minder mainstream maar intern coherent.

---

### 11. West & Central Africa Expedition 🌍

**Huidige scope:** 10 etappes, 93 dagen, €5.160. De enige *"onvermijdelijke sprong"* in de eigen notities is Benin→Kameroen (geen overland door Nigeria) — dat is meteen de natuurlijke naad:

| Major Trip | Landen | Dagen | Sterkte |
|---|---|---|---|
| West-Afrika Overland | CV, SN, GM, CI, GH, TG, BJ | 67 | **Sterk** |
| Centraal-Afrika & Eilanden | CM, ST, GA | 26 | **Medium** — klein maar uniek (regenwoud/wildlife, moeilijk elders te vinden) |

Binnen West-Afrika Overland is Kaapverdië zelf ook los te trekken (alleen per vlucht verbonden met het vasteland-deel, 13 dagen) — een verdere **Medium/Sub**-kandidaat als je het fijnmaziger wilt maken.

---

### 12. Central European Grand Roadtrip 🚗 — *dit is de expeditie die ik afraad om te splitsen zoals hij nu is opgebouwd*

**Huidige scope:** 21 etappes/14 landen, 70 dagen, eigen auto vanuit Nederland, geen vliegtuig.

**Waarom (grotendeels) niet opsplitsen:** dit is de enige expeditie waar je eigen notities *actief* tegen knippen/herordenen pleiten — de `climate_summary` legt uit dat een latere start de latere etappes (Hoge Tatra/Tsjechië/Polen/Duitsland) in de sneeuw duwt, en de routing-notes verdedigen expliciet waarom bepaalde etappes juist NIET los van elkaar zijn gepland (Milaan/Turijn/Cinque Terre bewust samengevoegd i.p.v. twee losse uitstapjes). Belangrijker: het is een **lus vanuit huis** — "de Balkan doen" betekent hier letterlijk "er met de auto vanuit Nederland naartoe rijden", niet instappen op een vliegveld. Zonder die auto-vanuit-huis-aanname is elk stuk in principe wel los te boeken (vlieg naar Ljubljana, huur een auto, doe de Balkan), maar dat is een **andere reis met een ander vervoersmodel**, niet gewoon "hetzelfde block eruit lichten".

Als je dat tóch wilt: de meest herbruikbare kandidaten zijn **Dolomieten & Noord-Italië** (19 dagen — Sterk, als "vlieg naar Milaan, huur een auto") en **Balkan** (16 dagen — Medium, als "vlieg naar Zagreb/Ljubljana, huur een auto"). Alpenlanden en Midden-Europa zijn zwakkere kandidaten omdat ze meer als overgangsetappes zijn ontworpen dan als bestemming op zich.

---

### 13. British Isles & Celtic Coast Expedition 🍀

**Huidige scope:** 15 etappes, 115 dagen, ook eigen auto vanuit Nederland — zelfde vervoerskanttekening als hierboven, maar hier werkt het beter, omdat de losse landsdelen zelf al beroemde standalone roadtrip-bestemmingen zijn:

| Major Trip (bij herdenken als vlieg+huur i.p.v. doorrijden) | Etappes | Dagen | Sterkte |
|---|---|---|---|
| Engeland, Wales & Isle of Man | South England, Cornwall, Wales, North England, Isle of Man | 38 | **Sterk** |
| Schotland & Noord-Ierland | Scotland, Northern Ireland | 27 | **Sterk** — Schotland-roadtrip is al een zeer bekend eigen concept |
| Ierland | West-Ierland, Zuid&Oost-Ierland | 22 | **Sterk** — misschien wel de meest geboekte standalone Europese roadtrip die er is |
| Kanaaleilanden, Bretagne & Normandië/Opaalkust/België | Guernsey, Jersey, Bretagne, Normandië, Opaalkust&Lille, België | 28 | **Medium** |

Let op één harde technische beperking die de agent-analyse blootlegde: in de huidige auto-route kun je van Ierland NIET rechtstreeks naar Frankrijk — je rijdt eerst via Rosslare terug door Zuid-Wales/Zuid-Engeland (al bezocht, pure transit) naar Poole/Portsmouth. Dat is prima voor de huidige doorlopende lus, maar betekent dat "Ierland" en "Frankrijk/België" **niet** onafhankelijk van elkaar bereikbaar zijn met dít vervoersplan — alleen los te trekken als je per blok een eigen vlucht+huurauto aanneemt in plaats van doorrijden.

---

## Patronen die al in je data zaten

Deze patronen bestonden al vóór deze analyse — de analyse legt ze alleen bloot:

1. **Egypte zit al in twee Mega Expedities** (Africa Grand Tour én Mediterranean Civilizations Expedition) — dit is letterlijk het "block komt in meerdere grotere expedities terug"-scenario uit je prompt, en het bestaat al.
2. **Chili/Argentinië zijn al opgeknipt naar breedtegraad** over twee Mega Expedities (Pan-American = noord, Patagonia & Antarctica = zuid) — hetzelfde idee, maar dan binnen één land i.p.v. hetzelfde blok letterlijk herhaald.
3. **Australië is al opgeknipt** binnen één Mega Expeditie (Oceania: Tropisch vs. Gematigd) — zelfde patroon, kleinere schaal.
4. **Antarctica-cruise is het schoonste "plug-in"-block** van de hele set: geen buurlanden, eigen budgetlogica, makkelijk overal aan te haken.
5. **Bhutan en Isle of Man zijn bewuste Sub-blocks**: ze zijn nooit bedoeld om alleen te staan (Isle of Man zit al genest ín de Noord-Engeland-etappe), en dat is prima — niet alles hoeft gepromoveerd te worden.
6. **Geografische nabijheid ≠ goed block**: de Nordic Arctic-eilanden (Svalbard/Faeröer/IJsland/Groenland) zijn "allemaal noordelijk" maar logistiek volledig onafhankelijk — precies de valkuil die je zelf al benoemde in de oorspronkelijke prompt.
7. **Reisadvies-gevoelige blocks clusteren toevallig**: de Golfstaten (Mediterranean Civilizations) en delen van Ethiopië/Amhara (Africa Grand Tour) staan momenteel oranje/rood. Dat is geen reden om ze te schrappen, maar wél een argument om een block's status/risico als aparte, actuele metadata bij te houden in plaats van verstopt in een notitie-tekst — zie hieronder.

---

## Vakantie-schaal vs. expeditie-schaal — meer opties

Jouw punt: sommige splitsingen zijn en blijven expeditie-schaal (maanden, hoort in de Route Builder). Maar zodra een stuk klein genoeg is om als een normale vakantie te doen, is het ook interessant als losse **Trip** in je Trips-lijst — niet alleen als onderdeel van een Route Builder-expeditie.

Werkdefinitie hieronder (puur een richtlijn, pas 'm aan zoals het voor jou voelt): **tot ~28 dagen = vakantie-schaal / kandidaat voor de Trips-lijst.** Alles langer blijft expeditie-schaal. Twee dingen per expeditie: (1) welke van de eerder genoemde blocks eigenlijk al vakantie-lengte zijn — die had ik hierboven "Sterk"/"Medium" genoemd zonder erbij te zeggen dat ze ook gewoon een losse vakantie kunnen zijn — en (2) extra, kleinere tripjes die ik nog niet had genoemd, gewoon om meer opties te hebben. Geen van deze weglaat/verplicht iets in de grote expedities; de grote versies blijven gewoon bestaan.

### Eurasia Grand Tour 🌏
- **Al vakantie-lengte:** Turkije (24d), Kaukasus (28d), Japan & Taiwan (28d)
- **Extra opties uit de grotere blocks:** Oezbekistan alleen (11d — Samarkand/Bukhara/Khiva, klassieke Zijderoute-stedentrip), Kirgizië alleen (12d, trekking rond Issyk-Kul/Song-Kul), Kirgizië & Kazachstan samen (24d), Mongolië alleen (10d, incl. Gobi-jeeptour), Vietnam alleen (18d), Thailand alleen (18d), Vietnam & Cambodja (30d, net erover), Filipijnen alleen (21d), Maleisië alleen (10d)

### Pan-American Grand Tour 🌎
- **Al vakantie-lengte:** Ecuador (24d, inclusief Galápagos), Bolivia (21d), Andes-woestijnoversteek Noord-Chili & Noord-Argentinië (20d), Zuid-Brazilië (22d)
- **Extra opties:** Costa Rica alleen (21d — waarschijnlijk je meest "klassieke" losse vakantie-kandidaat uit deze hele expeditie), Panama alleen (15d), Nicaragua alleen (15d), Guatemala alleen (16d)
- Colombia (35d) en Peru (35d) zijn in de expeditie bewust rustig gepland; als losse vakantie zou je die highlights (Cartagena/Medellín, resp. Cusco/Machu Picchu/Lima) realistisch ook in 2-3 weken doen — dus prima Trips-kandidaten als je ze wat comprimeert.

### Africa Grand Tour 🌍
- **Al vakantie-lengte:** Zuid-Afrika alleen (24d), Namibië alleen (20d — populaire zelfrij-vakantie), Zimbabwe alleen (14d, Victoria Falls), Botswana alleen (16d), Mozambique alleen (20d), Zambia & Malawi (30d, net erover), Mauritius alleen (7d), Egypte alleen (21d), Ethiopië alleen (20d)
- **Extra opties:** Rwanda gorilla-trekking alleen (10d — kort, prijzig, maar een heel realistische bucket-list vakantie op zich), Kenia alleen (18d, Maasai Mara), Tanzania alleen (24d, Serengeti/Zanzibar), Madagaskar alleen (24d)

### Mediterranean Civilizations Expedition 🏛️
- **Al vakantie-lengte — en dit is de duidelijkste "aha": het Sub-block dat ik eerder te klein noemde voor een Major Trip is juist perfect als losse vakantie:** Corsica & Zuid-Frankrijk (11d), plus Spanje alleen (10d), Marokko alleen (10d), Sicilië alleen (10d), Rome & omgeving (13d), Sardinië alleen (6d), Griekenland vasteland & Kreta (19d), Cyprus alleen (5d), Turkije/Anatolië (20d), Jordanië alleen (8d), Golfstaten-trio Oman/Bahrein/Qatar (13d, met de huidige reisadvies-kanttekening)

### Nordic Arctic Expedition ❄️
- **Vrijwel de hele expeditie is al vakantie-schaal, los van elkaar:** Svalbard (8d), Faeröer (7d), IJsland (14d), Groenland (10d), Scandinavië (29d, net erover). Dit is denk ik de expeditie met de meeste direct-bruikbare Trip-kandidaten van de hele set.

### Patagonia & Antarctica Expedition 🧊
- **Al vakantie-lengte:** de **Antarctica-cruise (11 dagen)** — waarschijnlijk je meest realistische, direct te boeken bucket-list vakantie uit deze hele analyse. Ook: Argentijns Patagonië alleen (El Calafate/El Chaltén/Ushuaia, 18d).
- Chileens Patagonië alleen (24d) is er net overheen, maar zou met een iets strakkere planning ook prima als 3-weekse vakantie kunnen.

### India & Himalaya Expedition 🏔️
- **Al vakantie-lengte:** Nepal alleen (21d), Bhutan alleen (8d, prijzig maar kort en uniek)
- **Extra optie:** Golden Triangle & Rajasthan highlights (comprimeerde versie van Noord-India, realistisch ~18-21d i.p.v. de 30d uit de expeditie)

### North America Grand Traverse 🌎
- **Al vakantie-lengte:** Oost-Canada (18d), West-Canada Rockies & Vancouver (22d), Pacific Northwest alleen (15d), Californië alleen (14d)

### Oceania Grand Expedition 🌊
- **Extra opties uit de grotere blocks:** Fiji alleen (14d), Fiji & Vanuatu (25d), Cairns & Great Barrier Reef (21d), Sydney/Byron & Great Ocean Road (22d), Tasmanië alleen (12d), Nieuw-Zeeland Zuidereiland alleen (21d), Nieuw-Zeeland Noordereiland alleen (14d)

### Caribbean & Amazon Expedition 🌴
- **Al vakantie-lengte:** Cuba alleen (18d), Jamaica alleen (12d), Curaçao & Bonaire samen (13d — extra relevant met directe KLM-vluchten), Suriname alleen (11d — extra relevant gezien de Nederlandse band)
- **Extra opties:** Guadeloupe & Dominica (15d), Saint Lucia & Grenada (14d)

### West & Central Africa Expedition 🌍
- **Al vakantie-lengte:** Kaapverdië alleen (13d), Senegambia (19d), Ghana alleen (15d)
- **Extra opties:** Gabon alleen (9d, Loango-wildlife), São Tomé & Príncipe alleen (9d)

### Central European Grand Roadtrip 🚗 & British Isles & Celtic Coast Expedition 🍀
Deze twee blijven zoals afgesproken ongesplitst als expeditie. Puur ter info, zonder dat het ergens toe hoeft te leiden: individuele etappes als Dolomieten (6d) of Cornwall (7d) zijn op zichzelf ook vakantie-lengte, maar omdat de hele constructie draait om één auto-lus vanuit huis, laat ik dat hier verder rusten.

---

## Recommended hierarchy

Volledige boom voor de twee expedities met extra aandacht (Eurasia, Pan-America) plus Africa; voor de overige 10 staat de boom al in de tabellen hierboven.

```
Eurasia Grand Tour 🌏
├── West-Eurazië Overland (146d)
│   ├── Balkan (Sterk)
│   ├── Turkije (Medium)
│   ├── Kaukasus (Sterk)
│   └── Centraal-Azië / "de Stans" (Sterk)
├── Oost-Azië & Stille Oceaan (66d)
│   ├── China & Mongolië (Medium/Sterk)
│   └── Japan & Taiwan (Sterk)
└── Zuidoost-Azië Grand Loop (124d)
    ├── Mainland Southeast Asia (Sterk)
    ├── Maritime/Island SEA (Sterk)
    └── Singapore Finale (Sub, alleen als afsluiter)

Pan-American Grand Tour 🌎
├── Mexico (28d, Sterk — ook zelfstandig Major Trip)
├── Midden-Amerika Loop (101d)
│   ├── Noordelijk (GT/BZ/HN/SV)
│   └── Zuidelijk (NI/CR/PA)
├── Andes Grand Traverse (115d)
│   ├── Colombia (Sterk)
│   ├── Ecuador (Medium/Sterk)
│   ├── Peru (Sterk)
│   └── Bolivia (Medium)
└── Zuidelijke Kegel & Brazilië-finale (42d)
    ├── Andes-woestijnoversteek: N-Chili + N-Argentinië (Sub)
    └── Zuid-Brazilië (Medium)

Africa Grand Tour 🌍
├── Zuidelijk Afrika Safari-lus (146d)
│   ├── Zuid-Afrika & Bergkoninkrijkjes (Sterk)
│   ├── Victoria Falls & Kalahari-lus (Sterk/Medium)
│   ├── Namibië & Angola (Medium)
│   └── Zambia & Malawi (Medium)
├── Eilanden (31d)
│   ├── Madagaskar (Sterk, los reistype)
│   └── Mauritius (Sterk, los reistype)
├── Oost-Afrika Safari Classic (70d, Sterk)
└── Hoorn van Afrika & Egypte (41d)
    ├── Ethiopië (Sterk, huidige reisadvies-kanttekening)
    └── Egypte (Sterk — óók onderdeel van Mediterranean Civilizations Expedition)
```

---

## Route Builder implementation

### De belangrijkste technische bevinding: naamgevings-botsing

Je huidige datamodel (uit `ROUTE_BUILDER_SYNC.md`) is:

```
Route → Regions[] (rendering-only label, geen eigen ordening)
      → Blocks[] (= één land, met days/budget/destinations/transport_to_next)
           → Destinations[]
```

In de bestaande code betekent **"block" al iets anders dan in jouw prompt**: in code is een block altijd **één land**. In je prompt is een "Travel Block" meestal een **groep landen** (Balkan, Noord-Andes, etc.) — dat is in de bestaande code een **Region**, niet een block.

Advies: geen van beide namen hergebruiken voor het nieuwe concept. Voorstel:
- Bestaande **Route** = jouw **Mega Expedition** (ongewijzigd)
- Bestaande **Region** blijft gewoon Region (rendering-groepering binnen één route, ongewijzigd)
- Bestaande **Block** hernoemen in documentatie/gesprek naar **Leg** (voorkomt verwarring, code hoeft niet per se te wijzigen)
- **Nieuw:** **Module** — dit is jouw "Travel Block"/"Major Trip": een benoembare, herbruikbare, potentieel zelfstandige groep van aaneengesloten Legs (vaak samenvallend met één Region, soms meerdere Regions samen).

### Hergebruik in plaats van nieuw bouwen: Block Library → Module Library

Je hebt al **exact** de juiste bouwsteen: **Block Library** (`atlas_route_blocks_library`) kan al een selectie landen opslaan, als losse kopie invoegen in een andere route, en 2+ opgeslagen blocks samenvoegen tot één nieuw block. Dat is letterlijk het "Build your own expedition"-scenario uit je prompt — het bestaat al, alleen nog vlak (geen region-structuur, geen metadata).

Twee gerichte uitbreidingen, geen nieuw systeem:
1. **Bij opslaan in de Library, optioneel de region-groepering meenemen** in plaats van altijd plat te trekken naar losse landen — nodig zodra een Module meerdere Regions beslaat (bv. heel "West-Eurazië Overland").
2. **Metadata-velden toevoegen aan Library-items** (zie tabel hieronder) — dit is puur additief, raakt de bestaande Route/Region/Block/Destination-structuur niet aan.

Dit sluit ook naadloos aan op wat al gepland stond in `ROUTE_BUILDER_SYNC.md` (de nog-te-bouwen `BlockLibrary`/`BlockLibraryItems`-sheettabbladen) — dit werk kun je in dezelfde ontwerp-sessie meenemen zodra je de Sheet-sync oppakt, in plaats van het er later nog eens bij te frommelen.

### Metadata per Travel Block/Module — gemapt op bestaand vs. nieuw

| Veld uit je prompt | Bestaat al als | Actie |
|---|---|---|
| `block_id` | `library_id` (Block Library) | hergebruiken |
| `parent_expedition` | — | **nieuw**, informatief veld (welke Mega Expedition dit block oorspronkelijk uit komt), beperkt hergebruik niet |
| `region` | region-naam binnen de route | hergebruiken |
| `countries` | lijst van Legs binnen het block | hergebruiken |
| `duration` | som van Leg `days` | **berekenen, niet apart opslaan** (zelfde principe als `rbComputeRanges` nu al hanteert — één bron van waarheid) |
| `season` | region-niveau `season`-veld (bestaat al!) | hergebruiken |
| `start_locations` / `end_locations` | — | **nieuw**, klein tekstveld, meestal af te leiden uit eerste/laatste Leg maar handig als los veld |
| `route_order` | Leg `order`-index | hergebruiken |
| `standalone_score` / `logistics_score` / `intensity` | — | **nieuw** — dit is exact de Sterk/Medium/Sub-classificatie uit dit document; begin met handmatig invullen, niet berekenen |
| `budget` | som van Leg `budget` | **berekenen**, zelfde reden als `duration` |
| `prerequisites` | — | **nieuw**, vrije tekst (bv. "eigen auto nodig", "GBAO-permit vooraf regelen"); de meeste blocks laten dit leeg |
| `compatible_blocks` / `incompatible_blocks` | — | **nieuw, maar begin hier niet aan** — voor een persoonlijke tool is een volledige compatibiliteitsmatrix bijhouden veel onderhoud voor weinig winst |
| `possible_next_blocks` / `possible_previous_blocks` | af te leiden uit bestaande `transport_to_next`-tekst | **nieuw veld, maar goedkoop te vullen** — je hebt de transportlogica al letterlijk in de notities staan, dit is grotendeels overtypen/structureren, geen nieuw denkwerk |

### UI-concept

- Per Mega Expeditie (Route) een sectie **"Mogelijke standalone trips"**: kaarten per Module (uit de Library, getagd met `parent_expedition` = deze route), met acties "Bekijk als losse reis" / "Start hier een nieuwe route mee" / "Voeg toe aan huidige route".
- **"Build your own expedition"** = de bestaande "merge 2+ saved blocks"-actie, uitgebreid zodat 'ie ook de interne region-structuur van elk Module behoudt in plaats van alles plat te slaan tot losse landen.

### Eén technisch aandachtspunt

6 van de 13 routes halen hun landcontent uit het gedeelde `RB_EXPEDITION_CONTENT`-object (Eurasia, Pan-American, Africa, Nordic Arctic, Patagonia & Antarctica, India & Himalaya) — voor Modules uit die routes kan content in theorie letterlijk gedeeld worden (zoals Egypte nu al). De overige 7 routes hebben hun landcontent **inline** in hun eigen `rbBuildXRoute()`-functie, meestal juist omdát een land er meerdere keren in voorkomt met verschillende dagen/budget per keer (Italië 5x, UK 6x, etc.). Voor Modules uit die routes moet content altijd als **onafhankelijke kopie** behandeld worden — nooit live gekoppeld — exact de "copies, not live-linked"-keuze die Block Library nu al maakt.

---

## Migration plan

Zoals gevraagd: **er is in deze stap niets aangepast.** Onderstaand is wat een eventuele latere implementatie zou raken.

**Welke bestaande expedities aangepast moeten worden:** geen enkele, wat betreft landen/dagen/budget/volgorde. Op een paar plekken zou je twee bestaande Regions conceptueel willen samenvoegen tot één Module (bv. Northern Chile + Northern Argentina → "Andes-woestijnoversteek"), maar dat is een nieuwe groepering ernaast, geen wijziging van de onderliggende Legs.

**Welke nieuwe blocks/modules aangemaakt moeten worden:** ruwweg 45-50 kandidaat-Modules (Sterk + Medium) over alle 13 expedities heen, plus een handvol Sub-blocks — de volledige lijst staat in de tabellen hierboven per expeditie.

**Welke bestaande data hergebruikt kan worden:** vrijwel alles — elk dag/budget/bestemmingen/transport/notitie-veld dat al in `RB_EXPEDITION_CONTENT` en de 13 `rbBuildXRoute()`-functies staat. Er hoeft geen nieuwe reisinhoud verzonnen te worden.

**Welke data samengevoegd moet worden:** alleen op Module-niveau (nieuwe, additieve records) — nooit op Leg-niveau. Voorbeeld: de "Andes-woestijnoversteek"-Module verwijst naar de bestaande Chili- en Argentinië-Legs uit Pan-American, zonder die Legs zelf te wijzigen.

**Wat NIET aangepast moet worden:** alle 13 `blocks[]`- en `regions[]`-arrays zoals ze nu zijn (landen, dagen, budgetten, volgorde, transport_to_next, reisadvies-notities), en het bestaande migratie-systeem (`rbMigrateX()`-patroon) — dat blijft ongemoeid totdat er daadwerkelijk code verandert.

---

## Openstaand

Status (2026-07-30): alle openstaande vragen zijn voor nu beantwoord.

- **Drempel vakantie-schaal:** ~28 dagen is prima, gehandhaafd.
- **Trips-lijst overlap:** de vakantie-schaal opties hierboven blijven voorlopig een **ideeën-lijstje**, geen concrete rijen in de Trips-sheet — dat gebeurt pas als er echt een reis in zicht komt.
- **Verder brainstormen:** voor nu voldoende materiaal om zelf mee verder te denken. Dit document is dus niet "af" in de zin van afgerond, maar een levend ideeën-naslagwerk: pak het weer op wanneer je hier verder aan wilt werken (nieuwe Route Builder-expeditie plannen, een losse vakantie uit een van de "al vakantie-lengte"-opties boeken, of de technische implementatie uit [Route Builder implementation](#route-builder-implementation) daadwerkelijk oppakken).
