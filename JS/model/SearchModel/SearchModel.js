export default class CityModel {
  async fetchData() {
    const response = await fetch("../../cities_and_countries.json");
    const data = await response.json();
    return data;
  }
}
