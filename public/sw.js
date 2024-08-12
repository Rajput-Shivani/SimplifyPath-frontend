("use strict");
self.addEventListener("push", function (event) {
  console.log(event);
  console.log("[Service Worker] Push Received.");
  if (!event.data) return;
  console.log(event.data.json());
  let notification = event.data.json();
  const options = {
    body: notification.body,
    icon: "images/icon.png",
    badge: "images/badge.png",
  };
  const channel = new BroadcastChannel("sw-messages");
  event.waitUntil(channel.postMessage({ notification, options }));
});
self.addEventListener("notificationclick", function (event) {
  console.log(event);
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  if (event.notification.data.environment === "staging") {
    clients.openWindow("https://staging-app.simplifypath.com");
  } else {
    clients.openWindow("https://app.simplifypath.com");
  }
});
