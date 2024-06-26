const apiKey = "f7d8f6fc7b4a30ec9ebc224d9f87a91f";
const searchBox = document.querySelector(".search-box");
const moveHeading = document.querySelector(".moveheading_call");
const headingText = document.querySelector(".hide_heading");
const weatherInfo = document.querySelector(".weather-info");
const background = document.querySelector(".container__background");
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");
const topCitiesContainer = document.getElementById("top-cities");

function addEvent(element, event, callback) {
  if (element && typeof element.addEventListener === 'function') {
    element.addEventListener(event, callback);
  } else {
    console.error('Invalid element provided:', element);
  }
}

function handleInput() {
  const cityName = cityInput.value;
  if (cityName) {
      getWeatherData(cityName);
  }
}

function handleEnter(event) {
  if (event.key !== 'Enter') return;
  handleInput();
}

addEvent(searchBtn, 'click', handleInput);
addEvent(cityInput, 'keypress', handleEnter);

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    console.log(response);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeatherData(data);
    
  } catch (error) {
    alert(error.message);
  }
}

function displayWeatherData(data) {
  console.log(data);

  document.getElementById("moveheading_call").textContent = `${data.name} weather`;
  document.getElementById("temperature").innerHTML = `${data.main.temp} °C`;
  document.getElementById("description").innerHTML = `${data.weather[0].description}`;
  document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
  document.getElementById("wind-speed").innerHTML = `${data.wind.speed}`;
  document.getElementById("clouds").innerHTML = `${data.clouds.all === 0 ? `No clouds` : `${data.clouds.all} clouds`}`;
  const {lon ,lat} = [data.coord]
  const country = data.sys.country
  document.getElementById("wind-temperature_head").innerHTML = `Temperature <i class="${getTemperatureIcon(data.main.temp)} temp-icon"></i>`;
  document.getElementById("wind-humidity_head").innerHTML = `Humidity <i class="${getHumidityIcon(data.main.humidity)} weather-icon"></i>`;
  document.getElementById("wind-speed_head").innerHTML = `Speed <i class="${getWindSpeedIcon(data.wind.speed)} weather-icon"></i>`;
  document.getElementById("wind-description_head").innerHTML = `Report <i class="${getWeatherIcon(data.weather[0].description)} weather-icon"></i>`;
  

  getCityName(data.name);
  moveElements();
}

function moveElements() {
  cityInput.value = '';
  cityInput.placeholder = 'Search';
  searchBox.classList.add("form_move");
  headingText.classList.add("cut-word");
  moveHeading.classList.add("moveheading");
  weatherInfo.classList.replace("weather-info_hidden", "weather-info_show");
  background.style.display = "none";
  topCitiesContainer.classList.add('cut-word')
}

async function getCityName(city) {
  const accessKey = 'AAhjoWEkWTjmGk4QtscUIQpse7hnPsukniGGi76upnU'; 
  const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch photo');
    }
    const data = await response.json();
    if (data.results.length > 0) {
      const photoUrl = data.results[0].urls.regular;
      document.body.style.backgroundImage = `url(${photoUrl})`;
    } else {
      alert('No photos found for this city.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function getWeatherIcon(description) {
  const weatherIcons = {
    "clear sky": "fas fa-sun",
    "few clouds": "fas fa-cloud-sun",
    "scattered clouds": "fas fa-cloud",
    "broken clouds": "fas fa-cloud",
    "shower rain": "fas fa-cloud-showers-heavy",
    "rain": "fas fa-cloud-rain",
    "thunderstorm": "fas fa-bolt",
    "snow": "fas fa-snowflake",
    "mist": "fas fa-smog"
  };
  return weatherIcons[description] || "fas fa-cloud";
}

function getTemperatureIcon(temp) {
  if (temp < 0) return "fas fa-thermometer-empty";
  if (temp < 10) return "fas fa-thermometer-quarter";
  if (temp < 20) return "fas fa-thermometer-half";
  if (temp < 30) return "fas fa-thermometer-three-quarters";
  return "fas fa-thermometer-full";
}

function getWindSpeedIcon(speed) {
  if (speed < 1) return "fas fa-wind";
  if (speed < 5) return "fas fa-wind";
  if (speed < 10) return "fas fa-wind";
  return "fas fa-wind";
}

function getHumidityIcon(humidity) {
  if (humidity < 30) return "fas fa-tint-slash";
  if (humidity < 60) return "fas fa-tint";
  return "fas fa-tint";
}

async function displayTopCitiesWeather(cities) {
  for (const city of cities) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`City not found: ${city}`);
      }
      const data = await response.json();
      const cityWeatherElement = document.createElement('div');
      const weatherIconClass = getWeatherIcon(data.weather[0].description);
      const tempIconClass = getTemperatureIcon(data.main.temp);
      const windIconClass = getWindSpeedIcon(data.wind.speed);
      const humidityIconClass = getHumidityIcon(data.main.humidity);

      cityWeatherElement.innerHTML = `
        <h4>${data.name}</h4>
        <p> <span class="re">${data.main.temp} <i class="${tempIconClass} temp-icon w-icon"></i><span class="add_det">°C</span></span><span class="st">Temperature</span></p>
        <p> <span class="re">${data.weather[0].description}<i class="${weatherIconClass} weather-icon w-icon"></i></span><span class="st">Report</span></p>
        <p> <span class="re">${data.main.humidity}<span class="add_det">%</span><i class="${humidityIconClass} humidity-icon w-icon"></i></span><span class="st">Humidity</span></p>
        <p> <span class="re">${data.wind.speed} <span class="add_det">m/s</span><i class="${windIconClass} wind-icon w-icon"></i></span><span class="st">Wind Speed</span></p>
      `;
      topCitiesContainer.appendChild(cityWeatherElement);
    } catch (error) {
      console.error('Error fetching city weather:', error.message);
    }
  }
}

const topCities = ["San Francisco", "Amsterdam", "London", "Cairo", "Barcelona", "Tokyo"];
displayTopCitiesWeather(topCities);
