export function getWeatherIcon(description) {
  const weatherIcons = {
    "clear sky": "fas fa-sun",
    "few clouds": "fas fa-cloud-sun",
    "scattered clouds": "fas fa-cloud",
    "broken clouds": "fas fa-cloud",
    "shower rain": "fas fa-cloud-showers-heavy",
    rain: "fas fa-cloud-rain",
    thunderstorm: "fas fa-bolt",
    snow: "fas fa-snowflake",
    mist: "fas fa-smog",
  };
  return weatherIcons[description] || "fas fa-cloud";
}

export function getTemperatureIcon(temp) {
  if (temp < 0) return "fas fa-thermometer-empty";
  if (temp < 10) return "fas fa-thermometer-quarter";
  if (temp < 20) return "fas fa-thermometer-half";
  if (temp < 30) return "fas fa-thermometer-three-quarters";
  return "fas fa-thermometer-full";
}

export function getWindSpeedIcon(speed) {
  if (speed < 1) return "fas fa-wind";
  if (speed < 5) return "fas fa-wind";
  if (speed < 10) return "fas fa-wind";
  return "fas fa-wind";
}

export function getHumidityIcon(humidity) {
  if (humidity < 30) return "fas fa-tint";
  if (humidity < 60) return "fas fa-tint";
  return "fas fa-tint";
}
