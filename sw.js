var cacheName = "cache-v1";

var resourcesToCache = [
  "/",
  "./index.php",
  "./home.html",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/1.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/2.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/3.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/4.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/5.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/happyboy.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/favicon.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/notif-badge.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/images/wish.png",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/media/audio.mp3",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/css/app.css",
  "https://code.jquery.com/jquery-3.4.1.min.js",
  "https://raw.githubusercontent.com/InCarNaTeDuDe/dec03/master/js/script.js",
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

self.addEventListener("notificationclick", function (event) {
  const notification = event.notification;
  const action = event.action;

  if (action === "be") {
    notification.close();
        clients.openWindow("https://blackcyber.herokuapp.com/send");
  } else {
        clients.openWindow("https://blackcyber.herokuapp.com/send");
    notification.close();
  }
});
