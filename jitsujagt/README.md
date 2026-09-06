# 🥋 Jitsujagt

Taktisk puslespil til telefonen i browseren. Blokken er en **struktur**, ikke
en livsbar: du vælger hvor og i hvilken rækkefølge du slår, stødet forplanter
sig gennem materialerne, og det, der mister sin bæring, falder ned og smadrer
det, det lander på. Du har et slagbudget. Der er ingen runde, der slutter —
spillet gemmer efter hvert slag.

**Spil det her: https://ibeltoft.github.io/spillehal/jitsujagt/**

## Sådan får du det på telefonen

1. Åbn linket i Safari på iPhone eller iPad.
2. Del-ikonet → **Føj til hjemmeskærm**.
3. Tryk på ikonet — spillet åbner i fuld skærm og virker i flytilstand.

## Styring

| Handling | Sådan |
|---|---|
| Se hvad et slag gør | Hold fingeren på en celle. De celler, der ryger, bliver blege |
| Slå | Slip |
| Fortryd sigtet | Træk fingeren uden for gitteret, før du slipper |
| Vælg en teknik | Tryk på den i bjælken forneden, og derefter på en celle |
| Åbn en fane | Teknikker, Worlds eller Rebirth i bunden |
| Lyd til/fra | ♪ øverst · Tilbage til hallen | ⌂ øverst |

Man slipper aldrig i blinde. Forhåndsvisningen viser altid præcis ét træk frem
— dybden ligger i de tre træk derefter.

## Materialerne

| | Materiale | Hvad det gør |
|---|---|---|
| ⬜ | **Sten** | Tåler to slag. Gør ikke andet |
| 🟧 | **Træ** | Splintrer langs sin årering — hele vejen gennem sammenhængende træ |
| 🟦 | **Is** | Sprænger til alle fire naboer, men **kun** med vægt ovenpå |
| ⬛ | **Jern** | Kan ikke slås i stykker. Sender stødet lige ned igennem |
| 🟨 | **Led** | Bærer alt over sig. Går det, revner hele søjlen |

Her ligger hele spillet: de tre kædetyper har modsatrettede forudsætninger.
Fald kræver højde, sprængning kræver vægt ovenpå, og stød kræver en ubrudt
søjle. **Du kan aldrig få dem alle tre** — og det stærkeste træk lige nu er
ofte det, der ødelægger det stærkeste træk om to slag.

## Slagbudget og bælter

Hver struktur har et **par** — det færreste antal slag, den kan ryddes på.
Budgettet er `par + 3`.

| Resultat | Mynter |
|---|---|
| Ryddet på par eller under | Fuld pris, og du rykker et bælte op |
| Inden for budgettet | `(par / slag)²` af fuld pris |
| Over budgettet | 25 % |

Bæltet kan ikke købes. Det vindes ved at rydde en struktur på par — altså ved
at kunne noget. Hvert bælte giver ét **fokus**.

## Fokus: du kan eje alt, men ikke bære alt

Teknikker købes for mynter og følger med gennem en rebirth. Men hver teknik
koster fokus at have med, og fokus er knap. Med fem fokus kan du bære Knus og
Nedslag — eller Sidespark alene. Hvert valg lukker en dør.

| Teknik | Fokus | Virkning |
|---|---|---|
| Stød | 0 | Ét slag på én celle. Altid med |
| Knus | 2 | To slag på samme celle |
| Nedslag | 2 | Rammer cellen og den under den |
| Sidespark | 3 | Rammer hele rækken |
| Lodret stød | 3 | Rammer hele søjlen nedad |
| Røntgen | 2 | Afslører fire skjulte celler — koster ikke et slag |
| Efterslag | 3 | Rydder et slag fem celler, er slaget gratis |
| Tyngde | 2 | Fald på ét felt gør også skade |

## Rebirth

Du mister mynter, bælte, world og din udrustning. Du beholder alle teknikker,
du har købt. Du får **fokus** — og bonussen vokser, jo dybere du nåede først.

Der er ingen port. Tidlig rebirth mod lidt fokus og sen rebirth mod meget er
to planer, der begge kan være rigtige. Det er spillets største beslutning.

## Rekorden på hallens tavle

Tavlen viser **magt** = `rebirth × 1000 + dybeste world × 10 + bælte`.
Fremskridtet gemmes pr. spillernavn, så to søskende kan dele en telefon.

## Filer

| Fil | Rolle |
|---|---|
| `index.html` | Hele spillet — regler, generator, grafik, lyd, gem/hent |
| `sw.js` | Service worker, så spillet virker uden internet |
| `manifest.webmanifest` | Gør spillet installerbart på hjemmeskærmen |
| `icon-*.png` | Ikon til hjemmeskærmen |
| `DESIGN.md` | Spildesignet, målemetoden og de porte, designet skulle bestå |

Balancetallene står samlet i `TUNE` øverst i `index.html`.
