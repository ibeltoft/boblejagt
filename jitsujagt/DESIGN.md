# JITSUJAGT — spildesign

Optrapningsspil til telefonen i browseren. Man tapper blokke i stykker, køber
træning for mynterne, klarer worlds og tager rebirth for at blive varigt
stærkere. Der er ingen runde, der slutter: spillet gemmer efter hver blok, og
man fortsætter, hvor man slap.

Målgruppe: alle fra ca. 7 år. Sessionslængde: 2–8 minutter pr. rebirth efter
den første, målt med en robot, der spiller spillets egen kode — se afsnit 8.

Spillet ligger i sin egen mappe og deler intet med de to andre spil ud over
repositoriet og `SPILHAL`-blokken. Ingen afhængigheder, ingen billed- eller
lydfiler.

---

## 1. Designprincipper

| Princip | Hvad det betyder i praksis |
|---|---|
| **Én finger, ét tryk** | Hele dojoen er trykfelt. Man skal ikke ramme blokken, kun skærmen. Alt andet — køb, rejser, rebirth — ligger i fire faner i bunden, uden for slagområdet. |
| **Altid noget at købe** | Kraft har intet loft og bliver aldrig for dyr i mere end et minut. Fanen får en gul prik, når der er råd til noget, så man ikke skal åbne alle fire for at opdage det. |
| **Fremskridt kan ikke tabes** | Der er ingen død, ingen timer, ingen straf. Det eneste, man giver fra sig, er det, man selv vælger at give fra sig i en rebirth. |
| **Tallene skal kunne læses** | 12,4 mio, ikke 12.400.000. Blokkens revner viser livet, så man ikke behøver læse tallet under den. |
| **Rebirth skal føles som en gave** | Man mister mynter, træning og bælte — men de første mange worlds smadres bagefter på ét slag. Vejen tilbage er kort, og det er hele pointen. |

## 2. Kerneloop

```
tap blokken → mynter → træning → hårdere slag → dybere worlds → flere mynter
     ↑                                                                ↓
     └──────── rebirth: alt nulstilles undtagen våben, ──────────────┘
               men skaden ganges med 3 for altid
```

Én blok er 3–9 slag, altså 1–3 sekunder. En world er 10 blokke. En rebirth er
7 worlds mere, end den forrige krævede.

## 3. Styring

| Handling | Telefon | Computer |
|---|---|---|
| Slå | Tryk et vilkårligt sted i dojoen | Klik, mellemrum eller Enter |
| Perfekt slag | Tryk, mens ringen er inde i det gule bånd | Samme |
| Åbn/luk en fane | Tryk på fanen | Klik, eller Esc for at lukke |
| Lyd til/fra | ♪ øverst til højre | ♪ eller M |
| Tilbage til hallen | ⌂ øverst til højre | ⌂ |

Spillet starter med navneboksen fra spilhallen. Navnet er ikke kun pynt her:
**fremskridtet gemmes pr. navn** (`jitsujagt-v1.<navn>`), så to søskende kan
dele en telefon uden at ødelægge hinandens træning. Magten går løbende til
hallens tavle (`spilhal.tavle.jitsujagt`).

## 4. Blokken og de perfekte slag

En ring krymper ind mod blokken på 0,9 sekund og starter forfra. De sidste
13 % af vejen er et gyldent bånd. Rammer man der, giver slaget **×3 skade og
fire ekstra kombotrin** — og ringen starter forfra med det samme, så perfekte
slag kan sættes i takt.

Det er spillets eneste færdighed, og den er bygget til ikke at straffe: et
almindeligt tryk gør altid fuld skade. Man kan spille hele spillet uden at
ramme et eneste perfekt slag; det tager bare længere tid.

**Komboen** stiger med ét trin pr. tryk op til 60 og falder helt bort, hvis
man holder pause i mere end 1,2 sekund. Fuld kombo er ×1,9. Sammen med de
perfekte slag betyder det, at en spiller, der tapper i takt, slår omkring
dobbelt så hårdt som en, der ikke gør.

## 5. Økonomien

Hele balancen hviler på ét regnestykke:

| Størrelse | Værdi | Følger af |
|---|---|---|
| Blok-HP i world *w* | `70 × 2^(w-1)` | en world er dobbelt så hård |
| Mynter pr. blok | `4 × 1,81^(w-1)` | |
| Kraft: skade | `×1,25` pr. niveau | |
| Kraft: pris | `×1,30` pr. niveau | |
| Kraft-niveauer pr. world | `ln 2 / ln 1,25 = 3,11` | HP fordobles |
| Prisen på de niveauer | `1,30^3,11 = 2,26×` pr. world | |
| Mynterne stiger kun | `1,81×` pr. world | |
| **Muren** | `2,26 / 1,81 = 1,25×` dyrere pr. world | forskellen |

Det sidste tal er hele designet. Havde mynterne fulgt priserne præcist
(1,81 → 2,26), ville hver world tage lige lang tid for evigt, og der ville
aldrig være en grund til at tage rebirth. Nu bliver hver world 25 % dyrere end
den forrige, og på et tidspunkt står man stille — indtil rebirth.

En rebirth ganger skaden med 3. Det svarer til `ln 3 / ln 1,25 = 4,9` worlds
gratis. Resten skal trænes, og det er derfor kravet stiger **7** worlds pr.
rebirth. Se afsnit 9 for, hvad 5 og 8 gør ved spillet.

De øvrige opgraderinger har alle et loft og giver tilsammen kun ×23 skade.
Det er med vilje: de er krydderi, ikke kurven. En tidlig udgave gav dem ×240
tilsammen, og så væltede de treadmillen fuldstændig — se afsnit 9.

## 6. Rebirth og mestrede worlds

| Ved en rebirth | |
|---|---|
| Væk | mynter, kraft, hurtighed, kritisk, sensei, bælte, position |
| Beholdt | **våben**, mestrede worlds, rebirth-bonussen |
| Nyt | skade `×3` oveni — for altid |

**En world, man har klaret før, klares på én blok.** Uden den regel var vejen
tilbage til fronten 10 blokke × 20 worlds = 200 tomme tryk, hvor alt dør på
ét slag. Med den er den 20 tryk og tager et halvt minut — en kort
magtdemonstration i stedet for en grind.

World-bonussen (4 × en bloks mynter) udbetales kun **første gang i dette liv**,
man klarer en world. Ellers ville det bedste træk være at blive stående i en
mestret world: den klares jo på én blok, og bonussen ville komme for hver
eneste blok, altså fem gange normal indtægt.

## 7. Worlds, bælter og våben

**Worlds** har tyve navne med hver sit farvepar. Efter den tyvende køres rækken
om med et rundetal (`Havedojoen II`), så stigen aldrig får en ende. Det er ikke
dovenskab: et loft på stigen gør rebirth-bonussen gratis, og så degenererer
spillet til ét tap pr. blok — det er målt, se afsnit 9.

**Bælter** er rangen i dette liv: tolv trin fra hvidt til regnbue, +15 % mynter
pr. trin, og porten til de første tolv worlds. Efter world 12 er man mester, og
der er ingen porte. Bæltet nulstilles ved rebirth og købes hurtigt op igen.

**Våben** er det eneste, en rebirth ikke tager fra dig — seks stykker fra næver
til dragefist, tilsammen ×5,6 skade. Derfor er de dyre, og derfor er de det,
man sparer op til hen over flere liv.

**Senseien** slår med, mens spillet er åbent, og kun da. Der er ingen indtjening,
mens telefonen ligger i lommen. Det er et bevidst valg: spillet skal ikke
belønne, at man tjekker telefonen, men at man spiller.

## 8. Målinger

En robot spiller spillets **egen kode** — samme `index.html`, som bliver sendt
af sted — og køber altid det billigste, den har råd til. Den sigter ikke efter
de perfekte slag, så tallene er et gulv: et menneske, der rammer båndet,
kommer hurtigere frem.

**3,5 tryk i sekundet (almindelig spiller):**

| Rebirth | Tid | Blokke | Tap pr. blok (median / p90) | Nået til world |
|---|---|---|---|---|
| 1 | 7,1 min | 174 | 8 / 12 | 16 |
| 2 | 2,2 min | 76 | 4 / 13 | 23 |
| 3 | 1,2 min | 80 | 3 / 5 | 30 |
| 5 | 1,5 min | 95 | 3 / 6 | 44 |
| 7 | 2,3 min | 109 | 5 / 8 | 58 |
| 9 | 3,3 min | 118 | 6 / 11 | 72 |

I alt 24 minutter til rebirth 9 og magt 9.072.

**Tre spillertyper, tid til hver rebirth (minutter):**

| Spiller | r1 | r2 | r3 | r5 | r7 | r9 |
|---|---|---|---|---|---|---|
| Ivrig (5 tryk/sek) | 5,4 | 1,8 | 1,0 | 1,3 | 1,8 | 2,5 |
| Almindelig (3,5) | 7,1 | 2,2 | 1,2 | 1,5 | 2,3 | 3,3 |
| Rolig (2,2) | 17,4 | 5,5 | 2,7 | 3,6 | 5,3 | 7,8 |

Kurven er med vilje en flad U: det første liv er langt, fordi man skal opdage
spillet; midterlivene er korte, fordi våbnene lander der; derefter vokser
løbene stille og roligt igen. Medianen for tap pr. blok holder sig mellem 3 og
13 hele vejen, og den tungeste tiendedel når højst 18 — spillet bliver aldrig
til ét tap pr. blok, og det bliver aldrig til en mur.

Tallene svinger ikke: robotten spiller uden tilfældighed ud over de kritiske
slag, og to kørsler af det samme ligger inden for et par tiendedele af et
minut. Til gengæld er de et gulv, ikke et gennemsnit — de perfekte slag er
ikke med.

## 9. Fem forsøg, der ikke virkede

Balancen er ikke gættet frem. Den blev fundet ved at bygge modellen om fem
gange, og hver gang målte simuleringen præcis, hvordan det gik galt. De står
her, fordi de er den egentlige begrundelse for tallene:

| Forsøg | Hvad der skete | Hvad det lærte |
|---|---|---|
| **Loft på 12 worlds** | Rebirth-bonussen blev gratis, når stigen var kørt til ende. 736 rebirths på tre timer, hver blok død på ét tap. | Lineært indhold kan ikke følge med geometrisk styrke. Stigen skal være uendelig. |
| **Rebirth ganger også mynterne** | Opgraderinger blev permanent billigere. Løb 2 og frem kollapsede til ét tap pr. blok. | Rebirth må kun gange skaden. |
| **Bæltet som møntport** | Efter en rebirth var man stærk, men fattig. Porten tvang 40 trivielle blokke igennem pr. world. | En port, man ikke kan betale, er en grind. Bæltet blev en rang. |
| **Permanent world-adgang** | Man kunne stå i en dyb world med enorm indtægt og faste priser. 736 rebirths, world 741. | Rebirth skal koste positionen — ellers er den gratis. |
| **Stærke bonusser (×240)** | Fart, kritisk, sensei og våben leverede tilsammen otte worlds gratis, koncentreret i world 5–16. Tap pr. blok faldt fra 25 til 0,1. | De afgrænsede bonusser skal være krydderi (×23), ikke kurven. |

Og to tal, der blev fundet ved at måle i stedet for at regne: kravet pr.
rebirth skal være 7. Ved 5 kollapser løbene til et halvt minut med 68 % ét-tap-blokke;
ved 8 vokser de til over 13 minutter med 23 tap pr. blok. Regnestykket i
afsnit 5 pegede på 5 — virkeligheden sagde 7, fordi kraft-niveauerne hober sig
op inde i et liv.

## 10. Filer

| Fil | Rolle |
|---|---|
| `index.html` | Hele spillet — regler, grafik, lyd, gem/hent. Ingen afhængigheder. |
| `sw.js` | Service worker, så spillet virker uden internet efter første besøg. |
| `manifest.webmanifest` | Gør spillet installerbart på hjemmeskærmen. |
| `icon-*.png` | Ikon til hjemmeskærmen, tegnet programmatisk i samme farver som spillet. |
| `README.md` | Kort spillervejledning. |
| `DESIGN.md` | Dette dokument. |

Alle balancetal står samlet i `TUNE` øverst i `index.html`.

## 11. Idéer til næste version

| Idé | Hvorfor |
|---|---|
| Rebirth, når man vil, med en bonus efter hvor dybt man nåede | Kravet er i dag et fast tal. Kunne man tage rebirth tidligt mod en mindre bonus, ville valget være spillerens i stedet for spillets. |
| Chef-blok i hver tiende world | Ti ens blokke pr. world er en rytme uden accent. En chef med dobbelt liv og en belønning ville give worlden en slutning. |
| Daglig træning: ét gratis våbentrin om dagen | Våbnene er det, man venter længst på. Et lille dagligt skub ville give en grund til at komme tilbage — uden notifikationer. |
| Bælteprøve i stedet for bæltekøb | Bæltet købes i dag for mynter. En prøve — fx »ram tre perfekte slag i træk« — ville gøre rangen til noget, man kan. |
