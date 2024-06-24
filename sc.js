const apiKey = "f7d8f6fc7b4a30ec9ebc224d9f87a91f";
const searchBox = document.querySelector(".search-box");
const moveHeading = document.querySelector(".moveheading_call");
const headingText = document.querySelector(".hide_heading");
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");

searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value;
  if (cityName) {
    getWeatherData(cityName);
  }
});

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
  document.getElementById("moveheading_call").textContent = `${data.name} city weather`;
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
  moveElements()
  
}


function moveElements() {
  cityInput.value = ''
  cityInput.placeholder = 'Search'
  searchBox.classList.add("form_move")
  headingText.classList.add("cut-word")
  moveHeading.classList.add("moveheading")

}