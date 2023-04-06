/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js"
);

self.__WB_DISABLE_DEV_LOGS = true;

self.addEventListener("install", () => {
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  // );
  self.skipWaiting();
});

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (
            client.url === event.notification.data && // If the page is already open then just focus the window
            "focus" in client
          )
            return client.focus();
        }
        if (clients.openWindow)
          return clients.openWindow(event.notification.data);
      })
  );
});

workbox.core.clientsClaim();

workbox.routing.registerRoute(
  /.*\.(?:ttf|woff2|woff)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "fonts",
  })
);

workbox.routing.registerRoute(
  new RegExp(".*.js"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "scripts",
  })
);

workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "styles",
  })
);

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "images",
  })
);

// const cacheName = "MyFancyCacheName_v1";
//
// self.addEventListener("fetch", (event) => {
//   if (event.request.destination === "image") {
//     event.respondWith(
//       caches.open(cacheName).then((cache) => {
//         return cache.match(event.request).then((cachedResponse) => {
//           const fetchedResponse = fetch(event.request).then(
//             (networkResponse) => {
//               cache.put(event.request, networkResponse.clone());
//
//               return networkResponse;
//             }
//           );
//
//           return cachedResponse || fetchedResponse;
//         });
//       })
//     );
//   } else {
//     return;
//   }
// });
