# BOBLEJAGT — spildesign

Top-down arena-skydespil til børn. Spilleren styrer en lille boblekanon-figur i en
arena, hvor grinende slimklatter kommer i bølger. Slim popper til stjerner, stjerner
købes til opgraderinger, og nye våben findes i kister ude på banen.

Målgruppe: ca. 6–11 år. Sessionslængde: 3–11 minutter pr. forsøg (median 5,4 min),
målt med en auto-spiller — se afsnit 7.

---

## 1. Designprincipper

| Princip | Hvad det betyder i praksis |
|---|---|
| **Ingen våbenrealisme** | Bobler, sæbevand og regnbuer. Fjender popper til stjerner — intet blod, ingen død, ingen skrig. |
| **Aldrig uretfærdigt** | Fjender varsles med en ring, før de dukker op. Efter et tab er man usårlig i 1,5 sek. og blinker. |
| **Læsbart uden at læse** | Al vigtig information er form og farve: hjerter, stjerner, våbenikoner. Teksten er støtte, ikke krav. |
| **Fremgang hver runde** | Efter hver bølge er der altid noget at vælge. Man går aldrig tomhændet videre. |
| **Kort vej til at spille igen** | Ét tryk fra "prøv igen" til ny runde. Highscore huskes lokalt. |

## 2. Kerneloop

```
Bølge starter  →  bekæmp slim  →  saml stjerner + evt. våbenkiste
      ↑                                        ↓
   ny bølge   ←   vælg opgradering i butikken  ←  bølge ryddet
```

Hver iteration tager 20–40 sekunder. Det er bevidst kort: barnet får en belønning
og et valg i et tempo, der holder opmærksomheden.

## 3. Styring

| Handling | Tastatur/mus | Touch |
|---|---|---|
| Bevæg | WASD eller piletaster | Joystick i venstre side |
| Sigt | Musen | Automatisk mod nærmeste fjende |
| Skyd | Hold museknap, eller mellemrum | Automatisk, men kun mens en finger rører skærmen |
| Skift våben | 1–7, eller Q | Kort tryk i højre side af banen |
| Pause | P eller Esc | Pauseknap |

Touch-versionen sigter og skyder selv, **men kun mens en finger rører skærmen**. Det
er med vilje: for de yngste er "bevæg dig væk fra slimen" en opgave nok i sig selv.

Kravet om en finger på skærmen er ikke kosmetisk. Uden det skød spillet konstant af
sig selv, fordi touch-tilstanden blev slået til ved første berøring og aldrig slået
fra igen — en urørt telefon ryddede bølge efter bølge på egen hånd, og det så ud, som
om spillet sprang bølger over.

Holdes telefonen i portræt, pauser spillet og beder om at blive drejet — banen er
16:10, og i portræt bliver den under en tredjedel af skærmen.

Våbenskift sker med et kort tryk i højre side, ikke ved at ramme HUD-knappen. På en
iPhone i landskab er knappen kun 32×24 px på skærmen, og selv med forstørret trykfelt
nås kun 37 px mod Apples anbefalede 44 — der er ikke plads til større knapper på en
374 px høj bane. Gestussen kræver ingen præcision: et tryk under 300 ms, der flytter
sig under 24 px, skifter våben; alt andet styrer figuren som før. Knapperne i HUD'en
bliver stående som visning af, hvilket våben der er valgt.

## 4. Våben

Nye våben findes i kister, der dukker op på banen i bølge 2, 4, 6, 8, 10 og 12.
Man beholder alle fundne våben og kan skifte frit — intet våben bliver ubrugeligt,
fordi de løser forskellige problemer.

| Våben | Skade | Kadence | Særligt | Løser |
|---|---|---|---|---|
| Boblekanon | 1,2 | middel | startvåben, altid tilgængelig | balanceret |
| Trippelboble | 1,1 ×3 | langsom | tre bobler i spredning | grupper foran dig |
| Sæbestråle | 0,38 | meget hurtig | tæt strøm af små dråber | hurtige småfjender |
| Kæmpeboble | 4 | langsom | gennemborer 3 fjender | tanks og bosser |
| Regnbuering | 1,2 ×8 | langsom | skyder i alle retninger | omringet |
| Frostboble | 1,3 | middel | halverer fjendens fart | panik og bosser |
| Hoppeboble | 2 | middel | hopper 3 gange på væggene | tætte arenaer |

Balancetanke: skade pr. sekund mod ét mål ligger på 3–5 for alle våben ubuffet.
Forskellen er *form* — spredning, rækkevidde, gennemboring — ikke rå styrke.
Det betyder, at et barn ikke kan vælge "forkert".

## 5. Fjender

| Fjende | Liv | Fart | Adfærd | Stjerner |
|---|---|---|---|---|
| Slimklat | 3 | langsom | går direkte mod dig | 5 |
| Hopper | 2 | hurtig, i spring | kort pause, så et ryk fremad | 8 |
| Spytter | 4 | langsom | holder afstand, spytter slimkugler | 15 |
| Tank | 12 | meget langsom | deler sig i 2 slimklatter, når den popper | 20 |
| Slimkongen (boss) | 45 + 9/bølge | langsom | tilkalder små slim, hver 5. bølge | 100 |

Introduktionsrækkefølge: slim (bølge 1), hopper (2), spytter (4), tank (5), boss (5, 10, 15 …).
Man starter med 4 hjerter og får ét tilbage inden hver bosskamp. Bossbølger har
færre almindelige fjender (`min(6, 2 + bølge/2)`), så kampen handler om bossen.
Én ny ting ad gangen, så barnet kan lære hver fjende, før den næste kommer.

Skalering pr. bølge: antal = `4 + 1,5 × bølge` (loft 40), fart `× (1 + 0,03 × bølge)` (loft ×2,2),
liv `× (1 + 0,08 × bølge + 0,0025 × bølge²)`. Alle fire tal står i `TUNE` øverst i koden. Kurven er bevidst flad i starten, så de
første 10 bølger er milde, og stejl derefter — ellers overhaler opgraderingerne (som
ganger) fjenderne (som lægger til), og spillet holder aldrig op.

## 6. Point og opgraderinger

Stjerner er både score og valuta. Fjender taber 1-stjerne-klumper, som suges mod
spilleren inden for magnetradius (så man ikke skal jagte dem).

Butikken mellem bølger viser 3 tilfældige kort. Priser stiger 60 % for hver gang det
samme kort er købt, så ingen enkelt opgradering løber løbsk.

| Kort | Effekt | Basispris | Loft |
|---|---|---|---|
| Ekstra hjerte | +1 maks. liv, og fyldes op | 40 | 8 hjerter |
| Hurtigere fødder | +12 % fart | 25 | 330 (start 215) |
| Turboboble | −11 % ladetid | 30 | ×0,55 |
| Stærkere bobler | +20 % skade | 30 | ×3 |
| Stjernemagnet | +45 % opsamlingsradius | 20 | 260 px |
| Sæbeskjold | Absorberer 1 træffer, lades op hver bølge | 45 | 3 skjolde |
| Ekstra boble | +1 projektil | 60 | +4 |
| Store bobler | +18 % boblestørrelse | 25 | ×2,2 |
| Lykketal | +25 % stjerneværdi | 35 | ×2,5 |
| Plaster | Fyld liv og skjold op | 15 | — |

Hvert kort har et loft, og et udtømt kort forsvinder fra butikken, så barnet aldrig
ser et valg, der ikke gør noget. Lofterne er ikke kosmetiske: uden dem stackede
opgraderingerne i det uendelige, og en god spiller kunne ved bølge 35 tage 21
træffere pr. bølge (12 hjerter + 9 selvopladende skjolde) og dække hele banen med
magneten. Spillet sluttede aldrig. Med lofterne slutter hvert forsøg.

Af samme grund er spillerens fart loftet (330), og hopperen får altid 5 % mere fart
end spilleren: der skal findes én fjende, man ikke kan løbe fra.

## 7. Målt balance

Balancen er ikke gættet. En simpel auto-spiller (flygter fra nærmeste fjende, samler
kister, køber altid det billigste kort) spillede spillet igennem 12 gange:

| Mål | Resultat |
|---|---|
| Bølger nået | 5, 8, 8, 10, 11, 11, 13, 36, 37, 37, 37, 38 |
| Median | bølge 13 |
| Spilletid | median 5,4 min, længste 11,5 min |
| Forsøg der aldrig sluttede | 0 af 12 |
| Score-spænd | 120 – 21.850 |

Botten sigter perfekt men bevæger sig dumt, så tallene er et gulv, ikke et loft: et
barn, der lærer banen, kommer længere. De to grupper (5–13 og 36–38) er reelle: får
man de rigtige våben og opgraderinger tidligt, ruller det. Det er med vilje — en
sjælden fantastisk tur er det, man fortæller om bagefter.

Knapperne til at genbalancere står samlet i `TUNE` øverst i `index.html`.

## 8. Banens størrelse

Banen er 600 enheder høj, og **bredden følger skærmens format** (`W_MIN` 640 til
`W_MAX` 1700). En fast bane på 960×600 gav sorte bjælker i siderne på alt, der ikke
er 16:10 — en iPhone i landskab er ca. 2,2:1, så spillet brugte kun 598 af 844 px.

Højden holdes fast, fordi alle lodrette positioner i menu, butik og HUD er målt til
den. Alt vandret er derimod centreret (`W/2`) eller højreforankret (`W - 20`), så det
tilpasser sig af sig selv. Butikkens kort krymper med smalle baner, så de tre kort
altid står side om side.

| Skærm | Plads | Bane | Ubrugt |
|---|---|---|---|
| iPhone 14/15 landskab | 828×374 | 1328×600 | 0×0 px |
| iPhone Pro Max landskab | 1116×494 | 1355×600 | 0×0 px |
| iPad landskab | 1008×744 | 813×600 | 0×0 px |
| Stor desktop | 1904×1040 | 1098×600 | 1×0 px |

Antallet af fjender følger **ikke** banens bredde. Det blev prøvet og målt: skalering
efter areal gav median bølge 8, kvadratrod gav 9, ingen skalering gav 11 — mod 13 på
referencebanen. Spillerens ildkraft er den bindende faktor, ikke pladsen, så flere
fjender på en bredere bane gør spillet sværere frem for ens.

## 9. iPhone og iPad

Fire ting i iOS kræver særlig håndtering, og de er alle løst i koden:

| Problem | Løsning |
|---|---|
| `<meta>` i markup ignoreres, hvis siden indlejres i en anden sides `<body>` — uden viewport-tagget tegner Safari siden 980 px bred, og al touch-styring rammer forkert | Alle head-tags sættes programmatisk ved opstart (`iosOpsaetning`) |
| `touch-action` nedarves ikke, så et dobbelttryk midt i spillet zoomer | `touch-action:none` sat direkte på `<canvas>` |
| iOS starter altid lyd i tilstanden `suspended` og lukker den kun op inde i en rigtig brugerhandling | `ctx.resume()` kaldes fra `Sound.init()`, der udløses af tryk og tastetryk |
| Notch og runde hjørner spiser af banen i landskab | `#wrap` har `env(safe-area-inset-*)`-padding, og skaleringen måler den faktiske plads inde i elementet frem for `innerWidth` |

Derudover lytter spillet på `orientationchange` og `visualViewport`-ændringer, fordi
iOS drejer skærmen først og melder den nye størrelse bagefter.

**Sådan kommer spillet på telefonen**

1. Åbn det udgivne link i Safari på iPhone.
2. Del-ikonet → *Føj til hjemmeskærm*. Så kører spillet i fuld skærm uden adresselinje
   (`apple-mobile-web-app-capable`), og barnet kan ikke navigere væk ved et uheld.
3. Drej telefonen på langs.

Alternativt uden hosting: kør `python3 -m http.server 8000` i mappen på computeren og
åbn `http://<computerens-ip>:8000` på telefonen — kræver samme wi-fi og at computeren
er tændt.

## 10. Filer

- `index.html` — hele spillet: motor, grafik, lyd, HUD, butik. Ingen afhængigheder.
- `sw.js` — service worker. **Hæv `VERSION` ved hver ændring**, ellers bliver
  telefonen ved med at vise den gamle version fra sin cache.
- `manifest.webmanifest`, `icon-*.png` — installering på hjemmeskærmen.
- `DESIGN.md` — dette dokument.

## 11. Idéer til næste iteration

1. **Baner med forhindringer** — kasser og vandpytter, der ændrer taktikken.
2. **Co-op på samme tastatur** — spiller 2 på piletaster + Enter. Stor gevinst for søskende.
3. **Vælg din figur** — 3–4 figurer med små forskelle (hurtig/stærk/sej), rent kosmetisk plus én stat.
4. **Daglig udfordring** — fast seed, så to børn kan sammenligne score på samme bane.
5. **Boss-varianter** — Frostkongen (fryser gulvet), Spytterdronningen (mange projektiler).
6. **Lyd og musik** — rigtige samplede pop-lyde i stedet for genererede toner.
