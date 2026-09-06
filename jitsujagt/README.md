# 🥋 Jitsujagt

Optrapningsspil til telefonen i browseren. Du tapper blokke i stykker, køber
træning for mynterne, klarer worlds og tager rebirth for at blive varigt
stærkere. Der er ingen runde, der slutter — spillet gemmer, og du fortsætter,
hvor du slap.

**Spil det her: https://ibeltoft.github.io/spillehal/jitsujagt/**

## Sådan får du det på telefonen

1. Åbn linket i Safari på iPhone eller iPad.
2. Del-ikonet → **Føj til hjemmeskærm**.
3. Tryk på ikonet — spillet åbner i fuld skærm og virker i flytilstand.

## Styring

| Handling | Telefon | Computer |
|---|---|---|
| Slå | Tryk et vilkårligt sted i dojoen | Klik, mellemrum eller Enter |
| Perfekt slag | Tryk, mens ringen er inde i det gule bånd | Samme |
| Åbn en fane | Tryk på Træning, Våben, Worlds eller Rebirth | Klik |
| Luk en fane | ✕ i hjørnet, eller tryk på fanen igen | ✕ eller Esc |
| Lyd til/fra | ♪ øverst til højre | ♪ eller M |
| Tilbage til hallen | ⌂ øverst til højre | ⌂ |

Hele dojoen er trykfelt — man skal ikke ramme blokken præcist.

## Sådan hænger det sammen

```
tap blokken → mynter → træning → hårdere slag → dybere worlds
     ↑                                                  ↓
     └────────── rebirth: alt nulstilles, ────────────┘
                 men skaden ganges med 3
```

- **Kombo** stiger for hvert tryk og falder tilbage, hvis du holder pause i
  mere end 1,2 sekund. Fuld kombo er ×1,9 skade.
- **Perfekt slag** giver ×3 skade og fire ekstra kombotrin. Ringen starter
  forfra, når du rammer, så perfekte slag kan trænes i takt.
- **Bæltet** er din rang. Det giver +15 % mynter pr. trin og er porten til de
  første tolv worlds.
- **Våben** er det eneste, en rebirth ikke tager fra dig. Derfor er de dyre.
- **Senseien** slår med, mens spillet er åbent. Den tjener ikke noget, mens
  telefonen ligger i lommen — det er med vilje.
- En **world**, du har klaret før, klares på én blok. Vejen tilbage til
  fronten efter en rebirth er derfor kort.

## Rekorden på hallens tavle

Tavlen viser **magt** = `rebirth × 1000 + dybeste world`. Én rebirth vejer
altså mere end tusind worlds — og det er rigtigt, for en rebirth kræver, at
man har klaret syv worlds mere end sidst.

Fremskridtet gemmes pr. spillernavn, så to søskende kan dele telefonen uden at
ødelægge hinandens træning.

## Point og tempo

Målt med en robot, der spiller spillets egen kode 3,5 gange i sekundet:

| | Første rebirth | Tap pr. blok | Rebirth 5 | Rebirth 9 |
|---|---|---|---|---|
| Tid | 7 min | 4–11 | efter 15 min | efter 50 min |

Tallene og hele balancen står i `DESIGN.md`.

## Filer

| Fil | Rolle |
|---|---|
| `index.html` | Hele spillet — regler, grafik, lyd, gem/hent. Ingen afhængigheder. |
| `sw.js` | Service worker, så spillet virker uden internet efter første besøg. |
| `manifest.webmanifest` | Gør spillet installerbart på hjemmeskærmen. |
| `icon-*.png` | Ikon til hjemmeskærmen. |
| `DESIGN.md` | Spildesignet: mekanik, balancetal, målinger og idéer til næste version. |

Balancetallene står samlet i `TUNE` øverst i `index.html`.
