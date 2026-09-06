/* Jitsujagt — service worker.
   Formålet er ét: efter første besøg skal spillet kunne startes fra
   hjemmeskærmen uden internet. Alt indhold er statisk og ligger i én
   HTML-fil, så en simpel "cache først"-strategi er nok.

   Hæv VERSION når index.html ændres — så henter telefonen den nye version
   næste gang den er online, og smider den gamle cache ud. */

const VERSION = "jitsujagt-v1";
const FILER = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

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

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
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
        // helt offline og intet i cachen: send startsiden, så appen altid åbner
        .catch(() => caches.match("./index.html"));
    })
  );
});
