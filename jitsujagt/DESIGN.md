# JITSUJAGT — spildesign

Taktisk puslespil til telefonen. Blokken er en struktur af materialer med hver
sin kæderegel; man vælger hvor og i hvilken rækkefølge man slår, inden for et
slagbudget. Mynterne køber teknikker, men fokus bestemmer, hvor mange man kan
bære ad gangen, og en rebirth bytter alt fremskridt for mere fokus.

Målgruppe: fra ca. 7 år, med et loft der ikke er nået af en voksen.
Sessionslængde: 1–3 minutter pr. blok, 5–12 beslutninger i hver.

---

## 1. Baggrund: hvorfor spillet blev skrevet om

Den første udgave af Jitsujagt var et tapper-spil: blokken var en livsbar, og
man trykkede den ned. Balancen var grundigt målt — og alligevel forkert på den
måde, der er værst.

En robot med reglen *"køb det billigste, du har råd til, og tryk hurtigt"*
spillede spillet optimalt. Alt andet var pynt:

| Målt på den gamle udgave | |
|---|---|
| Beslutninger pr. minut med mere end ét godt svar | **0** |
| Senseien, der blev solgt som et system | +4,1 % skade for 22,1 mio mynter |
| Hurtighed vs. Kraft | To knapper, der gangede ind i **samme** tal |
| At sigte efter det gyldne bånd | 3,80 skade/sek. At hamre blindt: **7,50** |

Den sidste er værd at dvæle ved: færdighedsmekanikken **straffede** den, der
brugte den, og perfekt-andelen svingede ikke-monotont med tryktempoet (12 % ved
3,0 tryk/sek, 33 % ved 3,5, 14 % ved 4,0), så en spiller kunne umuligt opdage
hvorfor.

Grundfejlen var strukturel, ikke numerisk: indtægten voksede 1,81× pr. world,
mens hver pris uden for Kraft var fast. **Fejl fordampede.** Fra world 28
finansierede én blok resten af spillets ikke-Kraft-økonomi for evigt.

Fejlen i *målingen* var mere lærerig: den varierede fingerhastighed
(2,2/3,5/5 tryk/sek) og holdt strategien fast. Den målte én akse ud af to og
kunne derfor pr. konstruktion ikke opdage, at der ikke var nogen strategi.

## 2. Designprincipper

| Princip | Hvad det betyder i praksis |
|---|---|
| **Se ét træk frem, tænk tre** | Forhåndsvisningen viser præcis, hvad et slag gør, mens fingeren holdes. Der er ingen skjult fysik — dybden ligger i rækkefølgen, ikke i uvidenhed. |
| **Hvert valg lukker en dør** | Fokus gør, at man kan eje alt og alligevel kun bære noget af det. Rebirth bytter alt fremskridt for mere fokus. Uden gensidig udelukkelse er "hvad køber jeg" en køreplan, ikke et valg. |
| **Generatoren garanterer beslutningen** | En struktur bliver kun godkendt, hvis grådigt spil er dårligere end optimalt. Der er altså noget at tænke over i hver eneste blok — ikke bare i gennemsnit. |
| **Sjusk koster bonus, aldrig fremskridt** | Sprænger man budgettet, får man 25 % af mynterne. Der er ingen død og ingen mur. Et barn kan slå løs og komme videre. |
| **Rang vindes, ikke købes** | Bæltet kommer af at rydde en struktur på par. Det er den eneste ting i spillet, penge ikke kan skaffe. |

## 3. Kerneloop

```
hold på en celle → se konsekvensen → slip → kæden kører → strukturen falder
        ↑                                                        ↓
        └── mynter efter hvor tæt på par ── teknikker ── fokus ──┘
                                                          ↓
                              rebirth: alt for mere fokus, bonus efter dybde
```

## 4. Materialerne og hvorfor der er dybde

| Materiale | Liv | Regel |
|---|---|---|
| Sten | 2 | Ingen |
| Træ | 1 | Splintrer langs sin fiberretning gennem sammenhængende træ |
| Is | 1 | Sprænger til alle fire naboer — **kun** hvis der var vægt ovenpå |
| Jern | — | Kan ikke skades. Sender stødet lodret videre nedad |
| Led | 1 | Bærer alt over sig; brister det, revner hele søjlen |

Oveni: en celle uden noget under sig falder, og et fald på to felter eller mere
skader både den faldende celle og den, den lander på.

**Kilden til dybde er, at de tre kædetyper har modsatrettede forudsætninger:**
fald kræver højde, sprængning kræver vægt ovenpå, og stød kræver en ubrudt
lodret linje. Man kan aldrig få alle tre.

Derfor taber en grådig spiller. Det bedste mål er ofte leddet — alt over det
falder gratis ned — men leddet er også dét, der holder vægten på isen, og is
sprænger kun under tryk. Et nedfaldet bunkeslag efterlader en lav bunke uden
bæringsstruktur, og en lav bunke har ingen kæder tilbage. **Et træks værdi
afhænger af strukturens tilstand efter trækket, ikke af trækkets eget udbytte** —
og det kan ikke koges ned til én regel.

## 5. Slagbudget og belønning

Hver struktur har et `par`. Budgettet er `par + 3` (`par + 4`, hvis der er
skjulte celler).

```
mynter = grundværdi(world) × min(1,5 ; (par / slag)²)      hvis slag ≤ budget
mynter = grundværdi(world) × 0,25                          ellers
```

Kurven blev valgt ved måling, ikke ved smag. Fem kandidater blev kørt mod de
samme strukturer:

| Kurve | `G_tot` | `F_strat` | Grådig spiller inden for budget |
|---|---|---|---|
| Lineær (`par/slag`) | 1,47 | 0,425 | 100 % |
| Kvadratisk | 2,05 | 0,465 | 100 % |
| **Budget par+3, ellers 25 %** | **2,45** | **0,449** | **88 %** |
| Budget par+2, ellers 25 % | 2,96 | 0,445 | 78 % |
| Budget par+2, ellers intet | 7,99 | 0,401 | 78 % |

Den nederste giver det største gab, men rammer et barn for hårdt: hver femte
blok ville give nul. Par+3 med restbetaling er det punkt, hvor en spiller, der
bare slår løs, stadig klarer 88 % — mens den, der planlægger, får over det
dobbelte.

## 6. Fokus, teknikker og rebirth

Teknikker købes for mynter og overlever en rebirth. Men de koster **fokus** at
bære, og fokus er knap: 5 fra start, +1 pr. bælte, +1 og opefter pr. rebirth.
Det er spillets gensidige udelukkelse — den eneste grund til, at "hvad køber
jeg" ikke bare er en køreplan.

Teknikkerne er **verber, ikke tal**: de ændrer hvor stødet lander, aldrig hvor
hårdt det slår. Derfor kan en opgradering ikke gøre puslespillet irrelevant,
kun give flere måder at løse det på. Det er den direkte modgift mod den gamle
udgaves fejl, hvor Kraft var én knap uden loft, der altid var det rigtige svar.

**Rebirth har ingen port.** Bonussen er `1 + dybeste/8` fokus, så tidlig
rebirth mod lidt og sen rebirth mod meget er to konkurrerende planer.

## 7. Generatoren

Den vigtigste kode i spillet. For hver blok:

1. Træk en tilfældig struktur efter worldens materialevægte, og lad
   tyngdekraften sætte den.
2. Kør en **smal** beam-søgning (bredde 8) → `grov`.
3. Kør den grådige spiller → `graadig`.
4. Er `graadig ≤ grov`, kasseres strukturen: der er intet at tænke over.
5. Ellers køres den **præcise** søgning (bredde 40) for at få `par`.

Skridt 2–4 er ikke et gæt. Finder den smalle søgning en løsning på `grov` slag,
er det sande par højst `grov`; er den grådige spiller dårligere end `grov`, er
han med sikkerhed også dårligere end par. Forsigtningen er altså gratis i
præcision og sparer 5,5× regnetid:

| | Før forsigtning | Efter |
|---|---|---|
| World 10 | 758 ms | 200 ms |
| World 25 | 1.876 ms | 341 ms |

Oveni bliver næste blok forberedt, mens spilleren tænker over denne, så
omkostningen aldrig ses som en frossen skærm.

## 8. Måling af dybde

Dette afsnit er grunden til, at spillet blev skrevet om, og til at det denne
gang kan forsvares. Metoden adskiller to akser, som den gamle måling blandede
sammen:

| Akse | Hvad den er | Gammel måling |
|---|---|---|
| Eksekvering | fingerhastighed, timing | 3 punkter |
| **Beslutning** | hvor og i hvilken rækkefølge man slår | **1 punkt** |

### Metrikkerne

| Mål | Definition | Port |
|---|---|---|
| `F_strat` | Hvor stor en del af færdighedens værdi, der ligger over en simpel tommelfingerregel: `(s_opt − s_grådig) / (s_opt − s_tilfældig)`, hvor `s = 1/slag` | ≥ 0,20 |
| `DHI` | Hvor tæt den bedste simple regel kommer på optimalt spil | ≤ 0,92 |
| `G_tot` | Tilfældig spiller mod optimal | ≥ 2,0 |
| Grådig = optimal | Andel strukturer, hvor den naive spiller allerede er optimal | < 70 % |

### Resultat på spillets egne regler

Målt på **rå** strukturer — altså også dem, generatoren ville kassere — så
tallet ikke er skønmalet af sin egen udvælgelse:

| World | Gitter | Par | Grådig | Tilfældig | `F_strat` | `DHI` | Godkendt |
|---|---|---|---|---|---|---|---|
| 1 | 4×4 | 4,9 | 6,2 | 8,9 | 0,403 | 0,817 | 58 % |
| 2 | 4×4 | 5,3 | 6,3 | 9,6 | 0,357 | 0,846 | 55 % |
| 3 | 4×4 | 5,6 | 6,3 | 9,7 | 0,222 | 0,907 | 45 % |
| 5 | 4×5 | 5,2 | 6,8 | 10,8 | 0,443 | 0,771 | 68 % |
| 8 | 5×5 | 7,5 | 8,9 | 13,1 | 0,333 | 0,865 | 63 % |
| 12 | 5×6 | 6,6 | 7,9 | 14,8 | 0,269 | 0,839 | 58 % |

Til sammenligning scorede den gamle udgave `F_strat` = 0,00 og `DHI` = 1,00.

Da spillet kun serverer strukturer, hvor grådig er dårligere end par, er den
oplevede `F_strat` højere end tabellen. Og med belønningskurven fra afsnit 5
bliver `G_tot` 2,45.

### To ting, målingen fangede undervejs

**World 1 dumpede først** med `F_strat` 0,108 og `DHI` 0,985. Årsag: is og led
lå oprindeligt i world 3 og 7, så den første world kun havde sten og træ — ingen
kæder, altså ét slag pr. celle, og grådigt spil *var* optimalt. Spillets bedste
idé lå gemt bag syv worlds. Materialerne blev flyttet frem til world 1 og 2.

**Beam-bredde 14 var for svag.** Ved world 8 fandt bredde 40 en løsning på 10
slag, hvor bredde 14 troede par var 11 — og på 6×7 fandt den slet ingen. "Par"
var altså kunstigt højt, budgettet for mildt og bæltet for let at vinde. Rettet
til bredde 40, og gitteret fik et loft på 6×6, så en blok bliver ved med at
være 5–12 beslutninger frem for 20.

### Forbehold

Målingerne bruger beam-søgning som loft, ikke bevist optimum. En stærkere
søger ville finde lavere par og dermed **højere** `F_strat` og **lavere** `DHI`
— tallene er altså et gulv, ikke et loft. Der er ikke målt på rigtige
mennesker: om en syvårig faktisk kan læse en struktur, er ikke afgjort her.

## 9. Hvad der blev bevaret fra den gamle udgave

Koden overlevede, fiktionen overlevede, økonomien blev skrottet. Bevaret:
`SPILHAL`-blokken, gem pr. spillernavn, navneboksen, iOS-opsætningen med
safe-area og touch-action, lydobjektet, service worker, manifest, ikoner,
worldnavnene med farvepar, bælterne og ét-finger-princippet.

Skrottet: Kraft som uendelig knap, Hurtighed, Kritisk, Sensei, faste
våbenpriser, rebirth-porten, timing-ringen og blok-HP som en worlds eneste
indhold.

## 10. Idéer til næste version

| Idé | Hvorfor |
|---|---|
| Daglig struktur, ens for alle | Samme blok samme dag giver en grund til at komme tilbage — og gør par til noget, man kan sammenligne. |
| Vis par-løsningen efter en sprængt blok | Man lærer mest af det træk, man ikke så. I dag får man kun at vide, at det gik galt. |
| Chef-struktur hver sjette blok | Seks ens blokke pr. world er en rytme uden accent. |
| Måling mod rigtige spillere | Alt i afsnit 8 er robotter. En ε-støjet menneskemodel er stadig en model. |
