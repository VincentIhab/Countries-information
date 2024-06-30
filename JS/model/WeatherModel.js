export default class WeatherModel {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getWeatherData(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    return await response.json();
  }

  async getCityPhoto(city, accessKey) {
    const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`;
    try {
      console.log(`Fetching photo for city: ${city} with URL: ${url}`); // Debugging
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch photo");
      }
      const data = await response.json();
      if (data.results.length > 0) {
        return data.results[0].urls.regular;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error in getCityPhoto:", error.message); // Debugging
      throw error;
    }
  }
}
