import {
  getTemperatureIcon,
  getWeatherIcon,
  getHumidityIcon,
  getWindSpeedIcon,
} from "../utils/IconUtil.js";
import { addEvent } from "../utils/EventUtil.js";

class WeatherView {
  constructor() {
    this.searchBox = document.querySelector(".search-box");
    this.moveHeading = document.querySelector(".moveheading_call");
    this.headingText = document.querySelector(".hide_heading");
    this.weatherInfo = document.querySelector(".weather-info");
    this.background = document.querySelector(".container__background");
    this.cityInput = document.getElementById("city");
    this.topCitiesContainer = document.getElementById("top-cities");
    this.cloudsSection = document.getElementById(
      "weather-detiles__hide_clouds"
    );
    this.cloudsElement = document.getElementById("clouds");
    this.clouds_head = document.getElementById("wind-clouds_head");
    this.searchBtn = document.getElementById("search-btn");
  }

  addHandlerRender(Handler) {
    addEvent(this.searchBtn, "click", () => Handler(this.cityInput.value));
    addEvent(this.cityInput, "keypress", (event) => {
      if (event.key !== "Enter") return;
      Handler(this.cityInput.value);
    });
  }

  displayWeatherData(data) {
    document.getElementById(
      "moveheading_call"
    ).textContent = `${data.name} weather`;
    document.getElementById("temperature").innerHTML = `${data.main.temp} °C`;
    document.getElementById(
      "description"
    ).innerHTML = `${data.weather[0].description}`;
    document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
    document.getElementById("wind-speed").innerHTML = `${data.wind.speed}`;

    document.getElementById(
      "wind-temperature_head"
    ).innerHTML = `Temperature <i class="${getTemperatureIcon(
      data.main.temp
    )} temp-icon"></i>`;
    document.getElementById(
      "wind-humidity_head"
    ).innerHTML = `Humidity <i class="${getHumidityIcon(
      data.main.humidity
    )} weather-icon"></i>`;
    document.getElementById(
      "wind-speed_head"
    ).innerHTML = `Speed <i class="${getWindSpeedIcon(
      data.wind.speed
    )} weather-icon"></i>`;
    document.getElementById(
      "wind-description_head"
    ).innerHTML = `Report <i class="${getWeatherIcon(
      data.weather[0].description
    )} weather-icon"></i>`;

    if (data.clouds && data.clouds.all) {
      this.cloudsSection.style.display = "block";
      this.cloudsElement.innerHTML = ` ${data.clouds.all}`;
      this.clouds_head.innerHTML = `Clouds`;
    } else {
      this.cloudsSection.style.display = "none";
      this.cloudsElement.innerHTML = "";
      this.clouds_head.innerHTML = "";
    }

    this.moveElements();
  }

  moveElements() {
    this.cityInput.value = "";
    this.cityInput.placeholder = "Search";
    this.searchBox.classList.add("form_move");
    this.headingText.classList.add("cut-word");
    this.moveHeading.classList.add("moveheading");
    this.weatherInfo.classList.replace(
      "weather-info_hidden",
      "weather-info_show"
    );
    this.background.style.display = "none";
    this.topCitiesContainer.classList.add("cut-word");
  }

  setBackgroundImage(url) {
    console.log(url);
    document.body.style.backgroundImage = `url(${url})`;
  }
}

export default new WeatherView();
