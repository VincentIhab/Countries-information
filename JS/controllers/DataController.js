import Model from "../model/AppModel.js";
// import WeatherView from "../views/View.js";
import TopCityModel from "../model/SearchModel/SuggestionModel.js";
import renderTopCityView from "../views/SearchView/SuggestionView.js";

export default class DataController {
  constructor() {
    this.handleUserInput()
  }

  // async topCity() {
  //   const data = await TopCityModel(WeatherModel.getWeatherData);
  //   renderTopCityView(data);
  // }
  handleUserInput(input) {
    Model.addData("cairo");
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
