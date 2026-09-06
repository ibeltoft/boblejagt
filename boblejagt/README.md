# 🫧 Boblejagt

Et arkadespil til børn. Du styrer en lille figur med en boblekanon i en arena, hvor
grinende slimklatter kommer i bølger. Slim popper til stjerner, stjerner købes til
opgraderinger, og nye våben ligger i kister ude på banen.

**Spil det her: https://ibeltoft.github.io/spillehal/boblejagt/**

## Sådan får du det på telefonen

1. Åbn linket i Safari på iPhone eller iPad.
2. Del-ikonet → **Føj til hjemmeskærm**.
3. Drej telefonen på langs, og tryk SPIL.

Derefter ligger spillet på telefonen: eget ikon, fuld skærm uden adresselinje, og det
virker i flytilstand. Intet login, ingen konto, ingen app-butik.

## Styring

| Handling | Computer | Telefon |
|---|---|---|
| Bevæg | W A S D eller piletaster | Hold en finger på banen |
| Sigt og skyd | Musen, hold knappen (eller mellemrum) | Automatisk |
| Skift våben | 1–7 eller Q | Kort tryk i højre side |
| Pause | P eller Esc | — |
| Lyd til/fra | M | — |

## Fuld skærm

Banen går helt ud til kanten — ingen ramme, ingen runde hjørner, ingen skygge.
Kun iPhonens hak og hjemmeindikator holdes fri, for ellers æder de et stykke af
banen i landskab.

| Sådan spiller du | Hvad du får |
|---|---|
| Fra hjemmeskærmen (Føj til hjemmeskærm) | Hele skærmen, ingen adresselinje. Bedst på iPhone — Safari kan ikke fuldskærm på telefonen. |
| I en browser på Android eller computer | **FULD SKÆRM**-knappen i menuen. Den vises kun, hvor den virker. |
| I Safari på iPhone uden at installere | Banen fylder alt undtagen browserens egne bjælker. |

Holder du telefonen på højkant, fylder "drej din telefon"-skærmen nu hele
skærmen i stedet for at ligge som et lille kort på en tom side.

## Spillernavn

Ved start skriver du dit navn. Scoren fra hver runde lander på spilhallens tavle,
så forsiden kan vise, hvem der fører. Navnet huskes, så næste gang er det ét tryk.

## Indhold

7 våben, 5 fjendetyper, boss hver 5. bølge, 10 opgraderingskort. Sværhedsgraden er
balanceret med en auto-spiller — median bølge 13, ca. 5 minutter pr. forsøg.

## Filer

| Fil | Rolle |
|---|---|
| `index.html` | Hele spillet — motor, grafik, lyd, HUD, butik. Ingen afhængigheder. |
| `sw.js` | Service worker, så spillet virker uden internet efter første besøg. |
| `manifest.webmanifest` | Gør spillet installerbart på hjemmeskærmen. |
| `DESIGN.md` | Spildesignet: mekanik, balancetal, målinger og idéer til næste version. |

Spillet ligger i mappen `boblejagt/` — se repoets forside-README for, hvordan
spilhallen hænger sammen.
