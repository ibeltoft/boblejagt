# 🕹️ Konrad's spillehal

Tre spil i browseren, bygget til telefonen. Forsiden er en hal: man vælger spil,
og rekorden for hvert spil står på kortet.

**Åbn hallen: https://ibeltoft.github.io/spillehal/**

| Spil | Hvad det er | Link |
|---|---|---|
| 🫧 **Boblejagt** | Arkadespil til børn — pop slimklatter, saml stjerner, find nye våben | [boblejagt/](https://ibeltoft.github.io/spillehal/boblejagt/) |
| 🧩 **Klodsjagt** | Blokpuslespil — læg tre brikker ad gangen og ryd striber | [klodsjagt/](https://ibeltoft.github.io/spillehal/klodsjagt/) |
| 🥋 **Jitsujagt** | Optrapning — smadr blokke, træn din jitsu, klar worlds, tag rebirth | [jitsujagt/](https://ibeltoft.github.io/spillehal/jitsujagt/) |

Repoet hedder `spillehal`, så adresserne bliver `/spillehal/<spil>/`. Det er
samtidig prisen: den gamle adresse `ibeltoft.github.io/boblejagt/` findes ikke
længere — GitHub Pages sender ikke videre efter en omdøbning. Genveje på
hjemmeskærmen, der peger på den gamle adresse, skal lægges på igen.

## Sådan får du det på telefonen

1. Åbn hallens link i Safari på iPhone eller iPad.
2. Del-ikonet → **Føj til hjemmeskærm**.
3. Tryk på ikonet — hallen åbner i fuld skærm og virker i flytilstand.

Hvert spil kan også lægges på hjemmeskærmen for sig, hvis man helst vil starte
direkte i ét spil. De har hver sit ikon og sin egen service worker.

## Spillernavn og rekorder

Man skriver sit navn, før man spiller. Navnet huskes, så det er ét tryk næste
gang — men det står der, så en anden kan overtage telefonen og få sin egen
rekord. Alt ligger i browserens `localStorage` på den enhed, man spiller på;
intet sendes nogen steder hen.

| Nøgle | Indhold |
|---|---|
| `spilhal.spiller` | Navnet på den, der spiller nu. Højst 14 tegn. |
| `spilhal.tavle.<spil-id>` | Tavlen for ét spil: `[{navn, point, dato}]`, sorteret faldende, højst 10 pladser. |

De to første spil skriver point til tavlen. Jitsujagt har ingen runde, der
slutter, og skriver i stedet **magt** = `rebirth × 1000 + dybeste world`. Det
er stadig bare et tal, der skal være størst muligt, så tavlen behøver ikke
vide forskel. Jitsujagt gemmer derudover selve fremskridtet pr. spillernavn i
`jitsujagt-v1.<navn>`, så to søskende kan dele en telefon.

Tavlen har **én plads pr. navn** — den bedste. Derfor kan et spil skrive til den
løbende uden at fylde den med den samme spillers dårlige forsøg.

Koden til det ligger som en `SPILHAL`-blok øverst i hver `index.html` — den
samme blok fire steder. Det er bevidst: hvert spil skal blive ved med at være
én fil uden afhængigheder, så det kan åbnes, kopieres og caches for sig.
Ændrer man kontrakten, skal alle fire steder rettes.

## Struktur

```
index.html              forsiden: valg af spil, spillernavn, rekorder
sw.js                   forsidens service worker (rører ikke undermapper)
manifest.webmanifest    gør hallen installerbar
icon-*.png              hallens ikon
boblejagt/              spil: alle filer, eget ikon, egen service worker
klodsjagt/              spil: samme opskrift
jitsujagt/              spil: samme opskrift
```

Forsidens service worker holder sig fra alt i en undermappe. Hvert spil har sin
egen med et snævrere scope, så et spil aldrig kan blive serveret fra hallens
cache — og en opdatering af ét spil rører ikke de andre.

## Sådan tilføjes et spil

1. Lav en mappe med `index.html`, `sw.js`, `manifest.webmanifest` og ikoner —
   kopiér opskriften fra `klodsjagt/`.
2. Kopiér `SPILHAL`-blokken og navneboksens markup ind i spillets `index.html`.
3. Kald `SPILHAL.gem("<spil-id>", spillerNavn, point)`, når en runde slutter.
4. Tilføj spillet til listen `SPIL` øverst i rodens `index.html`.
5. Hæv `VERSION` i rodens `sw.js` — ellers viser en cachet forside ikke det
   nye spil.

Ingen build, ingen afhængigheder, ingen pakkefiler. Alt er statiske filer, som
GitHub Pages serverer direkte.
