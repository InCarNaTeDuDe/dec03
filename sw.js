var cacheName = "cache-v1";

var resourcesToCache = [
  "./index.php",
  "./home.html",
  "./images/1.png",
  "./images/2.png",
  "./images/3.png",
  "./images/4.jpg",
  "./images/5.png",
  "./images/favicon.png",
  "./images/happyboy.png",
  "./images/notif-badge.png",
  "./images/wish.png",
  "./media/audio.mp3",
  "./css/app.css",
  "https://code.jquery.com/jquery-3.4.1.min.js",
  "./js/script.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(resourcesToCache);
    })
  );
});

/* Implementing Cache first Strategy */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedItem) => {
      return (
        cachedItem ||
        fetch(event.request).then(function (response) {
          return caches.open(resourcesToCache).then(function (cache) {
            cache.put(event.request.url, response.clone());
            return response;
          });
        })
      );
    })
  );
});
