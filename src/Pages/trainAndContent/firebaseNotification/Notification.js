import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "./main";

export const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  const notify = () => {
    toast(<ToastDisplay />, {
      style: {
        background: "#202346",
        color: "white",
        marginTop: "5rem",
      },
    });
  };

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    onMessageListener()
      .then((notificationData) => {
        setNotification(() => ({
          title: notificationData?.title,
          body: notificationData?.body,
        }));
      })
      .catch((err) => console.log("failed: ", err));
  }, [notification]);

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  return <Toaster />;
};

