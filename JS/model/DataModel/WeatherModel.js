import { Get_JSON, GET_API } from "../../helpers.js";

class WeatherModel {
  async getWeatherData(city) {
    try {
      const data = await Get_JSON(GET_API("WeatherData", city));
      console.log(data);
      return data;
    } catch (err) {
      console.log("city not found");
    }
  }

  async getCityPhoto(city) {
    try {
      const data = await Get_JSON(GET_API("CityPhoto", city));
      if (data.results.length > 0) {
        return data.results[0].urls.regular;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error in getCityPhoto:", error.message); // Debugging
    }
  }
}

export default new WeatherModel();
