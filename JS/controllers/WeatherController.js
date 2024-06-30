import WeatherModel from "../model/WeatherModel.js";
import WeatherView from "../views/WeatherView.js";
import TopCityModel from "../model/TopCityModel.js";
import TopCityView from "../views/cityView.js";
import { addEvent } from "../utils/EventUtil.js";
const WEATHER_API_KEY = "f7d8f6fc7b4a30ec9ebc224d9f87a91f";

export default class WeatherController {
  constructor(apiKey) {
    this.weatherModel = new WeatherModel(apiKey);
    this.weatherView = new WeatherView();
    this.init();
    this.topCity();
  }

  async topCity() {
    const data = await TopCityModel(this.weatherModel.getWeatherData);
    TopCityView(data);
  }

  init() {
    const searchBtn = document.getElementById("search-btn");
    this.cityInput = document.getElementById("city"); // Define cityInput as a class property
    addEvent(searchBtn, "click", () => this.handleInput());
    addEvent(this.cityInput, "keypress", (event) => this.handleEnter(event));
  }
  async handleInput() {
    const cityName = this.cityInput.value; // Use this.cityInput here
    if (cityName) {
      try {
        const weatherData = await this.weatherModel.getWeatherData(
          cityName,
          "f7d8f6fc7b4a30ec9ebc224d9f87a91f"
        );
        this.weatherView.displayWeatherData(weatherData);

        const photoUrl = await this.weatherModel.getCityPhoto(
          weatherData.name,
          "AAhjoWEkWTjmGk4QtscUIQpse7hnPsukniGGi76upnU"
        );
        console.log(photoUrl); // Add this for debugging
        if (photoUrl) {
          this.weatherView.setBackgroundImage(photoUrl);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }

  handleEnter(event) {
    if (event.key !== "Enter") return;
    this.handleInput();
  }
}
