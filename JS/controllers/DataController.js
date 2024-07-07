import WeatherModel from "../model/DataModel/WeatherModel.js";
import {data} from "../model/Model.js";
import WeatherView from "../views/WeatherView.js";
import TopCityModel from "../model/SearchModel/SuggestionModel.js";
import renderTopCityView from "../views/cityView.js";

export default class WeatherController {
  constructor() {
    this.topCity();
    WeatherView.addHandlerRender(this.handleRequest);
    data()
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
