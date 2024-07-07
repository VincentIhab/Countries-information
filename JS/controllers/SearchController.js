import CityModel from "../model/SearchModel/SearchModel.js";
import SuggestionView from "../views/SuggestionView.js";

export default class SuggestionController {
  constructor() {
    this.cityModel = new CityModel();
    this.suggestionView = new SuggestionView();
    this.init();
  }

  async init() {
    try {
      const data = await this.cityModel.fetchData();
      this.citiesAndCountries = data;
      this.fuzzySet = FuzzySet(this.citiesAndCountries);

      const cityInput = document.querySelector(".search-box__input");
      cityInput.onkeyup = () => this.displaySuggestions(cityInput.value);
    } catch (error) {
      console.error("Error fetching cities and countries:", error);
    }
  }

  displaySuggestions(input) {
    let results = [];
    if (input.length) {
      results = this.citiesAndCountries.filter((keyword) => {
        return keyword.toLowerCase().includes(input.toLowerCase());
      });
    }
    this.suggestionView.displaySuggestions(results);
  }
}
