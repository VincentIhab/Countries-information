import {
  getTemperatureIcon,
  getWeatherIcon,
  getHumidityIcon,
  getWindSpeedIcon,
} from "../utils/IconUtil.js";

export default function renderTopCityView(data) {
  const topCitiesContainer = document.getElementById("top-cities");
  data.map((data) => {
    const cityWeatherElement = document.createElement("div");
    const weatherIconClass = getWeatherIcon(data.weather[0].description);
    const tempIconClass = getTemperatureIcon(data.main.temp);
    const windIconClass = getWindSpeedIcon(data.wind.speed);
    const humidityIconClass = getHumidityIcon(data.main.humidity);
    cityWeatherElement.innerHTML = `<h4><span>${data.name}</span><i class="${weatherIconClass} weather-icon"></i></h4>
            <p> <span class="re"><i class="${tempIconClass} temp-icon w-icon ml"></i>${data.main.temp} <span class="add_det">°C</span></span><span class="st">Temp</span></p>
            <p> <span class="re"><i class="${weatherIconClass} weather-icon w-icon"></i>${data.weather[0].description}</span><span class="st">Sky</span></p>
            <p> <span class="re"><i class="${humidityIconClass} humidity-icon w-icon ml"></i>${data.main.humidity}<span class="add_det">%</span></span><span class="st">Humidity</span></p>
            <p> <span class="re"><i class="${windIconClass} wind-icon w-icon"></i>${data.wind.speed} <span class="add_det">m/s</span></span><span class="st">Speed</span></p>
          `;
    topCitiesContainer.appendChild(cityWeatherElement);
  });
}
