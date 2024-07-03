import "./styles/sass/main.sass";
import WeatherController from "/JS/controllers/WeatherController.js";
import SuggestionController from "/JS/controllers/SuggestionController.js";

document.addEventListener("DOMContentLoaded", () => {
  const weatherController = new WeatherController();
  const suggestionController = new SuggestionController();
});
