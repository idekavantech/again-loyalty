/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */

// eslint-disable-next-line no-undef

// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });
self.addEventListener("install", (event) => {
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

// self.addEventListener("push", function (event) {
//   let notificationTitle = "Hello";
//   const notificationOptions = {
//     body: "Thanks for sending this push msg.",
//   };

//   if (event.data) {
//     const dataText = event.data.text();
//     notificationTitle = "Received Payload";
//     notificationOptions.body = `Push data: '${dataText}'`;
//   }

//   event.waitUntil(
//     self.registration.showNotification(notificationTitle, notificationOptions)
//   );
// });

// self.addEventListener("notificationclick", function (event) {
//   event.notification.close();

//   let clickResponsePromise = Promise.resolve();
//   if (event.notification.data && event.notification.data.url) {
//     clickResponsePromise = clients.openWindow(event.notification.data.url);
//   }

//   event.waitUntil(clickResponsePromise);
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });
