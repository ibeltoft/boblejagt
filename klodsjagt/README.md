# 🧩 Klodsjagt

Blokpuslespil til telefonen i browseren. Du får tre brikker ad gangen og lægger
dem på et 8×8-bræt. Fyldte rækker og kolonner forsvinder. Ingen tidspres, ingen
faldende brikker — det slutter, når ingen af de tre brikker kan være der.

**Spil det her: https://ibeltoft.github.io/boblejagt/klodsjagt/**

## Sådan får du det på telefonen

1. Åbn linket i Safari på iPhone eller iPad.
2. Del-ikonet → **Føj til hjemmeskærm**.
3. Tryk på ikonet — spillet åbner i fuld skærm og virker i flytilstand.

## Styring

| Handling | Telefon | Computer |
|---|---|---|
| Tag en brik | Sæt fingeren i brikkens felt i bakken | Museknap ned på brikken |
| Sigt | Træk — brikken løftes op over fingeren | Træk med musen |
| Læg | Slip, når skyggen står rigtigt | Slip museknappen |
| Fortryd greb | Slip uden for brættet | Samme |
| Start forfra | ↺ øverst til højre | ↺ eller R |
| Tilbage til hallen | ⌂ øverst til højre | ⌂ |
| Lyd til/fra | ♪ øverst til højre | ♪ eller M |

Mens du holder en brik, lyser de striber op, der vil forsvinde, hvis du slipper.
Brikker, der ikke kan være nogen steder, tegnes halvt gennemsigtige.

## Spillernavn

Ved start skriver du dit navn. Din bedste stilling lander på spilhallens tavle,
så forsiden kan vise, hvem der fører. Navnet huskes, så næste gang er det ét tryk.
⌂-knappen øverst fører tilbage til hallen — stillingen er gemt.

## Point

- 1 point pr. celle, du lægger.
- `ryddede celler × 10 × antal striber × kombo` for hver rydning.

To striber på én gang giver mere end dobbelt så meget som én, og kombo tæller
rydninger i træk — op til ×8. Stillingen og din rekord gemmes på telefonen.

## Filer

| Fil | Rolle |
|---|---|
| `index.html` | Hele spillet — regler, grafik, lyd, gem/hent. Ingen afhængigheder. |
| `sw.js` | Service worker, så spillet virker uden internet efter første besøg. |
| `manifest.webmanifest` | Gør spillet installerbart på hjemmeskærmen. |
| `icon-*.png` | Ikon til hjemmeskærmen. |
| `DESIGN.md` | Spildesignet: mekanik, balancetal, målinger og idéer til næste version. |

Balancetallene står samlet i `TUNE` øverst i `index.html`.
