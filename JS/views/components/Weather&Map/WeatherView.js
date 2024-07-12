import {
    getTemperatureIcon,
    getWeatherIcon,
    getHumidityIcon,
    getWindSpeedIcon,
  } from "../utils/IconUtil.js";
  import { addEvent } from "../utils/EventUtil.js";
  
  class WeatherView {
    // Essential Elements
    searchInput = document.querySelector(".search-box__input");
    searchForm = document.getElementById("form");
    weatherInfo = document.querySelector(".weather-info");
  
    // Elements used Before Search
    background = document.querySelector(".container__background");
    topCitiesContainer = document.getElementById("top-cities");
    cloudsSection = document.getElementById("weather-details__hide_clouds");
    cloudsElement = document.getElementById("clouds");
    clouds_head = document.getElementById("wind-clouds_head");
  
    // Elements used after Search
    searchTitle = document.getElementById("label");
    temperatureLabel = document.getElementById("temperature");
    descriptionLabel = document.getElementById("description");
    humidityLabel = document.getElementById("humidity");
    windSpeedLabel = document.getElementById("wind-speed");
    // Icons
    Temperature_Icon = document.getElementById("wind-temperature_head");
    Humidity_Icon = document.getElementById("wind-humidity_head");
    windSpeed_Icon = document.getElementById("wind-speed_head");
    description_Icon = document.getElementById("wind-description_head");
  
    addHandlerRender(Handler) {
      addEvent(this.searchForm, "submit", (e) => {
        e.preventDefault();
        Handler(this.searchInput.value);
      });
    }
  
    displayWeatherData(data) {
      this.searchTitle.textContent = `${data.name} weather`;
      this.temperatureLabel.innerHTML = `${data.main.temp} °C`;
      this.descriptionLabel.innerHTML = `${data.weather[0].description}`;
      this.humidityLabel.innerHTML = `${data.main.humidity}%`;
      this.windSpeedLabel.innerHTML = `${data.wind.speed}`;
  
      this.Temperature_Icon.innerHTML = `Temperature <i class="${getTemperatureIcon(
        data.main.temp
      )} temp-icon"></i>`;
      this.Humidity_Icon.innerHTML = `Humidity <i class="${getHumidityIcon(
        data.main.humidity
      )} weather-icon"></i>`;
      this.windSpeed_Icon.innerHTML = `Speed <i class="${getWindSpeedIcon(
        data.wind.speed
      )} weather-icon"></i>`;
      this.description_Icon.innerHTML = `Report <i class="${getWeatherIcon(
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
      this.searchInput.value = "";
      this.searchInput.placeholder = "Search";
      this.weatherInfo.classList.replace(
        "weather-info_hidden",
        "weather-info_show"
      );
      this.background.style.display = "none";
      this.topCitiesContainer.classList.add("Hide_Container");
    }
  
    setBackgroundImage(url) {
      console.log(url);
      document.body.style.backgroundImage = `url(${url})`;
    }
  }
  
  export default new WeatherView();
  
  
  
  