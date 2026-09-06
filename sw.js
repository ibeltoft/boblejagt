/* Spilhallen — service worker for forsiden.

   Den cacher kun forsidens egne filer. Hvert spil har sin egen service
   worker i sin egen mappe, og den har et snævrere scope, så den vinder
   for sine egne sider. Denne her holder fingrene fra alt, der ligger i
   en undermappe — ellers ville hallen kunne servere en gammel udgave af
   et spil, den tilfældigvis havde hentet én gang.

   Hæv VERSION når forsiden ændres. Gamle caches ryddes ved aktivering,
   også de tidligere "boblejagt-*"-caches fra dengang spillet lå i roden. */

const VERSION = "spilhal-v3";
const FILER = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

// scope-stien, fx "/boblejagt/" på GitHub Pages
const ROD = new URL("./", self.registration.scope).pathname;

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION)
      // addAll fejler helt, hvis én fil mangler — derfor én ad gangen
      .then(c => Promise.all(FILER.map(f => c.add(f).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(navne => Promise.all(navne.filter(n => n !== VERSION).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

function forsiden(url) {
  if (url.origin !== self.location.origin) return false;
  if (!url.pathname.startsWith(ROD)) return false;
  // alt med en skråstreg tilbage hører til et spil — lad spillet om det
  return !url.pathname.slice(ROD.length).includes("/");
}

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (!forsiden(new URL(e.request.url))) return;
  e.respondWith(
    caches.match(e.request).then(fundet => {
      if (fundet) {
        // opdatér i baggrunden, så næste start har den nyeste version
        fetch(e.request).then(svar => {
          if (svar && svar.ok) caches.open(VERSION).then(c => c.put(e.request, svar));
        }).catch(() => {});
        return fundet;
      }
      return fetch(e.request)
        .then(svar => {
          if (svar && svar.ok && svar.type === "basic")
            caches.open(VERSION).then(c => c.put(e.request, svar.clone()));
          return svar;
        })
        // helt offline og intet i cachen: send forsiden, så hallen altid åbner
        .catch(() => caches.match("./index.html"));
    })
  );
});
