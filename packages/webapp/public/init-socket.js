/* eslint-disable no-console */
import { Manager } from "socket.io-client";
import { IS_DENIED_NOTIFICATION_ALERT_SENT } from "@saas/utils/constants";

export default function initSocket(callback, siteDomain, businessSlugs) {
  const manager = new Manager("https://socket.reval.me", {
    reconnectionDelayMax: 10000,
  });
  const socket = manager.socket("/", {});
  try {
    Notification.requestPermission((result) => {
      const isAlertShown = localStorage.getItem(
        IS_DENIED_NOTIFICATION_ALERT_SENT
      );
      if ((result === "denied" || result === "default") && !isAlertShown) {
        callback(
          `برای دریافت نوتیفیکشن سفارش‌ها، باید به مرورگر دسترسی بدهید.`,
          "fail"
        );
        localStorage.setItem(IS_DENIED_NOTIFICATION_ALERT_SENT, "true");
      }
    });
  } catch (e) {
    console.error(e, "Getting Notification Permission");
  }

  manager.on("open", () => {
    socket.emit("register", businessSlugs);
  });
  socket.on("msg", ({ title, message, link }) => {
    const audio = new Audio(
      `https://hs3-cdn-saas.behtarino.com/static/little-bell.mp3`
    );
    audio.play();
    navigator.serviceWorker.ready.then((registration) => {
      try {
        if (Notification.permission === "granted")
          registration.showNotification(title, {
            body: message,
            requireInteraction: true,
            data: link,
            vibrate: [400, 100, 400, 100, 300],
            actions: [
              {
                action: "open",
                title: "مشاهده",
              },
            ],
          });
      } catch (e) {
        console.error(e, "Showing Notification");
      }
    });

    callback(`${title}\n${message}`, "success");
  });
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.log(err);
    });
  }
}
