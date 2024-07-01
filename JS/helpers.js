import {
  SETTIMEOUT_SEC,
  WEATHER_API_KEY,
  PHOTO_API_KEY,
  WEATHER_API_ENDPOINT,
  PHOTO_API_ENDPOINT,
} from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Function to fetch API URLs and return data
export const Get_JSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(SETTIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// Function to fetch API URLs based on type
export function GET_API(type, city) {
  switch (type) {
    case "WeatherData":
      return `${WEATHER_API_ENDPOINT}?q=${encodeURIComponent(
        city
      )}&appid=${WEATHER_API_KEY}&units=metric`;
    case "CityPhoto":
      return `${PHOTO_API_ENDPOINT}?query=${encodeURIComponent(
        city
      )}&client_id=${PHOTO_API_KEY}`;
    default:
      throw new Error(`Unsupported API type: ${type}`);
  }
}
