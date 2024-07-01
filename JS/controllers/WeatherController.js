import WeatherModel from "../model/WeatherModel.js";
import WeatherView from "../views/WeatherView.js";
import TopCityModel from "../model/TopCityModel.js";
import renderTopCityView from "../views/cityView.js";

export default class WeatherController {
  constructor() {
    this.topCity();
    WeatherView.addHandlerRender(this.handleRequest);
  }

  async topCity() {
    const data = await TopCityModel(WeatherModel.getWeatherData);
    renderTopCityView(data);
  }

  async handleRequest(SearchInput) {
    if (!SearchInput) return;
    try {
      const weatherData = await WeatherModel.getWeatherData(SearchInput);

      WeatherView.displayWeatherData(weatherData);

      const photoUrl = await WeatherModel.getCityPhoto(weatherData.name);

      if (photoUrl) {
        WeatherView.setBackgroundImage(photoUrl);
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
