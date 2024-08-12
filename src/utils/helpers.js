// import { toast } from "react-toastify";

import AppSecureStorage from "../services/secureStorage";

export const formatTime = (timestamp) => {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "Invalid Time";
    }

    // Formatting time in "h:mm A" format (e.g., 6:30 PM)
    return date
      .toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        hourCycle: "h24", // Use 24-hour format for compatibility
      })
      .toUpperCase();
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Error";
  }
};
export const addDateAndTime = (timestamps) => {
  let previousDate = null;
  let timestampWithDay = [];
  timestamps?.forEach((timestampObj) => {
    let timestamp = new Date(timestampObj.timestamp);
    let currentDate = timestamp.toLocaleDateString("en-Us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (currentDate !== previousDate) {
      let currentDay = timestamp.toLocaleString("en-Us", { weekday: "long" });
      let dayWithDate = `${currentDate}, ${currentDay}`;
      timestampWithDay.push({
        day: dayWithDate,
        timestamp: timestampObj.timestamp,
        sentby: "manually",
      });
    }
    timestampWithDay.push(timestampObj);
    previousDate = currentDate;
  });
  return timestampWithDay;
};

export const flattenObject = (obj, parentKey = "") => {
  let result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key; // Corrected interpolation
      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};
const storage = new AppSecureStorage();
export const unauthorizedError = (navigate) => {
  navigate("/");
  storage.clearStorage();
  // toast.error(
  //   "Your session has expired. Please proceed to log in again to continue accessing our services."
  // );
};

export const sortData = (data, key, direction) => {
  if (!Array.isArray(data)) {
    return [];
  }

  const sortedData = [...data];
  sortedData.sort((a, b) => {
    let aValue =
      key === "permissions" ? Object.keys(a[key] || {}).join(", ") : a[key];
    let bValue =
      key === "permissions" ? Object.keys(b[key] || {}).join(", ") : b[key];

    if (key === "verified") {
      aValue = a.verified ? "Verified" : "Unverified";
      bValue = b.verified ? "Verified" : "Unverified";
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });
  return sortedData;
};
