const apiKey = "f7d8f6fc7b4a30ec9ebc224d9f87a91f";
const searchBox = document.querySelector(".search-box");
const moveHeading = document.querySelector(".moveheading_call");
const headingText = document.querySelector(".hide_heading");
const weatherInfo = document.querySelector(".weather-info");
const background = document.querySelector(".container__background");
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");

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
  if (event.key !== 'Enter') return
  handleInput()
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

  document.getElementById("city-name").textContent = data.name; 
  document.getElementById("moveheading_call").textContent = `${data.name} weather`;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${data.main.temp} °C`;
  document.getElementById(
    "description"
  ).textContent = `Description: ${data.weather[0].description}`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById(
    "wind-speed"
  ).textContent = `Wind Speed: ${data.wind.speed} m/s`;
  getCityName(data.name)
  moveElements()
  
}


function moveElements() {
  cityInput.value = ''
  cityInput.placeholder = 'Search'
  searchBox.classList.add("form_move")
  headingText.classList.add("cut-word")
  moveHeading.classList.add("moveheading")
  weatherInfo.classList.replace("weather-info_hidden", "weather-info_show")
  background.style.display = "none"
}


  
async function getCityName(City) {
  const accessKey = 'AAhjoWEkWTjmGk4QtscUIQpse7hnPsukniGGi76upnU'; 
  const url = `https://api.unsplash.com/search/photos?query=${City}&client_id=${accessKey}`;
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