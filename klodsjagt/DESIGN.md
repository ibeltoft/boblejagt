# KLODSJAGT — spildesign

Blokpuslespil til telefonen i browseren. Tre brikker ad gangen skal lægges på et
8×8-bræt; fyldte rækker og kolonner forsvinder. Der er ingen tidspres og ingen
faldende brikker — spillet slutter, når ingen af de tre brikker kan være der.

Målgruppe: alle fra ca. 8 år. Sessionslængde: 1–5 minutter pr. forsøg for en
almindelig spiller, målt med en auto-spiller — se afsnit 7.

Spillet ligger i sin egen mappe og deler intet med Boblejagt ud over
repositoriet. Ingen afhængigheder, ingen billed- eller lydfiler.

---

## 1. Designprincipper

| Princip | Hvad det betyder i praksis |
|---|---|
| **Ét greb** | Alt spilles med én finger: tag en brik, træk, slip. Ingen rotation, ingen menuer, ingen knapper man skal ramme midt i et træk. |
| **Se før du slipper** | Skyggen af brikken ligger på brættet, og de rækker og kolonner, der vil forsvinde, lyser op, mens man holder. Man taber aldrig et træk på at gætte forkert. |
| **Aldrig et uvindbart bræt** | Bakken trækkes om, indtil alle tre brikker kan bruges i en eller anden rækkefølge. Man taber på sine egne valg, ikke på lodtrækningen. |
| **Ingen straf for at gå fra spillet** | Stillingen gemmes efter hvert træk. Telefonen må gerne smide fanen ud. |
| **Læsbart uden at læse** | Farve og form bærer al information. Teksten er point og to knapper. |

## 2. Kerneloop

```
tre brikker i bakken  →  læg en brik  →  fyldte striber forsvinder → point
        ↑                                          ↓
   ny bakke, når alle tre er lagt   ←   kombo stiger, hvis der ryddes igen
```

Én iteration er 5–15 sekunder. Beslutningen i hvert træk er den samme lille
afvejning: rydde nu, eller holde plads fri til den store brik, der kommer.

## 3. Styring

| Handling | Telefon | Computer |
|---|---|---|
| Tag en brik | Sæt fingeren i brikkens felt i bakken | Museknap ned på brikken |
| Sigt | Træk — brikken løftes 1,5 felt op over fingeren, så den kan ses | Træk med musen |
| Læg | Slip, når skyggen står rigtigt | Slip museknappen |
| Fortryd et greb | Slip uden for brættet — brikken hopper tilbage i bakken | Samme |
| Start forfra | ↺ øverst til højre | ↺ eller R |
| Lyd til/fra | ♪ øverst til højre | ♪ eller M |

Spillet starter med navneboksen fra spilhallen: navnet står allerede skrevet,
så det er ét tryk at komme i gang — men det kan skiftes, hvis en anden har
telefonen. Rekorden går til hallens tavle (`spilhal.tavle.klodsjagt`), både
løbende og ved rundens slut, så den også fanger en spiller, der ikke slår
husets rekord. ⌂-knappen fører tilbage til hallen; stillingen er gemt.

Løftet på 1,5 felt er ikke kosmetik. Uden det dækker fingeren præcis det felt,
man sigter efter, og på en 8×8-bane er et felt kun 45 px på en iPhone 12 —
mindre end fingerspidsen. Med løftet ligger både brik og skygge over fingeren.

Hele bakkefeltet er trykfelt, ikke kun klodserne. En 1×1-brik fylder 33×33 px i
bakken; feltet omkring den er 121×167 px, altså langt over Apples anbefalede
44 px.

Brikker, der ikke kan være nogen steder på brættet, tegnes halvt gennemsigtige.
Det er den eneste advarsel om, at spillet er ved at være slut.

## 4. Brikkerne

39 former: enkeltklodser, streger på 2–5, firkanter på 2×2, 2×3 og 3×3,
hjørner på 3 og 5 celler, T, L, S og Z, og to skrå former. Ingen rotation —
hver drejning er sin egen form i listen, og trækkes med sin egen vægt.

Vægtene er sat, så små brikker er hyppigst. Derudover skrues der ned for de
store brikker, jo mere fyldt brættet er:

| Brikstørrelse | Vægt ved tomt bræt | Vægt ved 50 % fyldt bræt |
|---|---|---|
| 1–4 celler | uændret | uændret |
| 5–7 celler | ×1,0 | ×0,20 |
| 8–9 celler | ×1,0 | ×0,02 |

Uden den regel dør spillet på en 3×3-klods, man ikke kunne se komme. Med den
er et fyldt bræt stadig svært, men nederlaget kommer af egne træk.

## 5. Point

| Handling | Point |
|---|---|
| Lægge en brik | 1 pr. celle |
| Rydde striber | `ryddede celler × 10 × antal striber × komboganger` |

To striber på én gang giver altså mere end dobbelt så meget som én: 15 celler ×
10 × 2 = 300 mod 80. Det er hele det taktiske indhold i spillet — det kan betale
sig at holde igen og bygge op til en dobbelt.

**Kombo** tæller antallet af træk i træk, der har ryddet mindst én stribe.
Ganger = kombo, dog højst 8. Et træk uden rydning nulstiller den. Det belønner
det svære: at rydde mange gange i træk kræver, at man lægger sine rester, hvor
de kan bruges igen.

## 6. Fairness-reglen

Når bakken fyldes op, trækkes tre brikker. Bakken accepteres, hvis alle tre kan
lægges efter hinanden i en eller anden rækkefølge — prøvet igennem med
tilbagesporing på en kopi af brættet, hvor striber også ryddes undervejs. Der
gøres op til 10 forsøg på at finde sådan en bakke, derefter 14 forsøg på blot at
finde en bakke, hvor mindst én brik kan være der.

Prisen er regnekraft, og den er målt: en ny bakke tager 0,0 ms i median og
1,7 ms i værste af 74 målinger. Det er usynligt selv på en gammel telefon.

Effekten på sværhedsgraden er målt ved at slå reglen fra (`TUNE.fairAlleTre = 0`)
og køre de samme 60 spil pr. linje:

| Spiller | Median træk med reglen | Uden reglen |
|---|---|---|
| Perfekt (ε = 0) | 659 | 479 |
| Rutineret (ε = 0,15) | 140 | 89 |
| Almindelig (ε = 0,35) | 56 | 47 |
| Distræt (ε = 0,6) | 23 | 25 |

Reglen forlænger altså spillet mest for dem, der spiller bedst — de er de eneste,
der kan udnytte at få alle tre brikker brugt. For den distræte spiller er
forskellen inden for støjen. Det er den rigtige retning: reglen fjerner
lodtrækningens nederlag uden at gøre spillet lettere for den, der spiller dårligt.

## 7. Målinger

Auto-spiller med en simpel vurdering (striber vægtes tungt, fyldte felter
trækker fra, sammenhængende tomme felter tæller op) og en støjknap `ε`, som er
sandsynligheden for at vælge et tilfældigt lovligt træk i stedet for det bedste.
60 spil pr. linje.

| Spiller | ε | Median træk | Median point | Bedste spil |
|---|---|---|---|---|
| Perfekt | 0 | 659 | 34.514 | 3.968 træk / 203.871 point |
| Rutineret | 0,15 | 140 | 6.887 | 674 træk / 33.129 point |
| Almindelig | 0,35 | 56 | 2.257 | 293 træk / 13.739 point |
| Distræt | 0,6 | 23 | 549 | 101 træk / 4.412 point |

Tallene svinger. Fordelingen har en meget lang hale — et enkelt godt spil kan
være 50 gange længere end medianen — så medianen flytter sig ±20 % mellem to
kørsler af 60 spil. Konklusionerne herunder holder på tværs af kørsler;
enkeltcifrene skal ikke læses som mere end en størrelsesorden.

Et træk tager 3–5 sekunder for et menneske. Den almindelige spiller lander
altså på 3–5 minutter pr. forsøg, den rutinerede på 7–12. Det er den længde, et
spil på en telefon skal have: langt nok til at være en session, kort nok til at
man trykker "spil igen".

## 8. Filer

| Fil | Rolle |
|---|---|
| `index.html` | Hele spillet — regler, grafik, lyd, gem/hent. Ingen afhængigheder. |
| `sw.js` | Service worker, så spillet virker uden internet efter første besøg. |
| `manifest.webmanifest` | Gør spillet installerbart på hjemmeskærmen. |
| `icon-*.png` | Ikon til hjemmeskærmen, tegnet med samme klodser som spillet. |
| `README.md` | Kort spillervejledning. |
| `DESIGN.md` | Dette dokument. |

Alle balancetal står samlet i `TUNE` øverst i `index.html`.

## 9. Idéer til næste version

| Idé | Hvorfor |
|---|---|
| Fortryd sidste træk (én gang pr. runde) | Det fejltræk, der koster runden, er altid ét enkelt. En fortrydelse gør et tabt spil til en lærestreg. |
| Daglig udfordring med fast startbræt | Samme bræt for alle den dag — giver en grund til at komme tilbage uden notifikationer. |
| Bombeklods hver 25. stribe | Et lille åndehul på et fastlåst bræt, uden at gøre spillet lettere generelt. |
| Lokal top-5-liste i stedet for én rekord | En enkelt rekord bliver hurtigt uopnåelig; fem pladser giver noget at kæmpe om hver runde. |
