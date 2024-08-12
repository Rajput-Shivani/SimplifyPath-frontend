import axios from "axios";
import { API_URL } from "../../../utils/constants";
import AppSecureStorage from "../../../services/secureStorage";

const applicationServerPublicKey =
  "BFJt7D0LWcTo_33efXqdQ1dmeS55i_3LVkMXsI2II-cVWl8oS8B33-0WYLHYqgO__7G-c_CxrOTIWWPyVmQoIiY";
function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const checkPermission = () => {
  console.log("check permission");
  if (!("serviceWorker" in navigator)) {
    throw new Error("No support for service worker!");
  }

  if (!("Notification" in window)) {
    throw new Error("No support for notification API");
  }

  if (!("PushManager" in window)) {
    throw new Error("No support for Push API");
  }
};

const requestNotificationPermission = async () => {
  console.log("request permission");
  // const permission = "granted";
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission not granted");
  }
  return true;
};

const registerSW = async () => {
  console.log("register sw");
  const registration = await navigator.serviceWorker.register("sw.js");
  return registration;
};

const subscribeUser = async (swRegistration) => {
  try {
    console.log("subscriber user");
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    console.log("subscriber" + applicationServerKey);
    return await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    });
  } catch (error) {
    console.log("Failed to subscribe the user: ", error);
  }
};

const updateSubscriptionOnServer = async (subscription) => {
  const storage = new AppSecureStorage();
  // const url = "http://localhost:2000/api/v1/notification/save-subscription";
  const url = `${API_URL}/api/v1/notification/save-subscription`;
  try {
    const response = await axios.post(
      url,
      { subscription },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.get("token")}`,
        },
      }
    );
    console.log("response", response);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const registerServiceWorker = async () => {
  console.log("register service worker");
  //ask for permission
  checkPermission();
  await requestNotificationPermission();
  //register service worker file
  const swRegistration = await registerSW();
  //subscribe user
  const subscriber = await subscribeUser(swRegistration);
  //update connection on server
  await updateSubscriptionOnServer(subscriber);
};

export const onMessageListener = async () =>
  new Promise((resolve) => {
    const channel = new BroadcastChannel("sw-messages");
    channel.addEventListener("message", (event) => {
      const { notification, options } = event.data;
      if (document.hasFocus()) {
        channel.close();
        resolve({ title: notification.title, body: notification.body });
      } else {
        navigator.serviceWorker.getRegistration().then((registration) => {
          options.data = {
            environment: process.env.REACT_APP_ENVIRONMENT,
          };
          registration.showNotification(notification.title, options);
        });
        channel.close();
        resolve({ title: notification.title, body: notification.body });
      }
    });
  });
