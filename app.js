// import "./styles/sass/main.sass";
// import "./styles/img/background.jpg";
// import "./styles/img/logo.png";
import WeatherController from "/JS/controllers/WeatherController.js";
import SuggestionController from "/JS/controllers/SuggestionController.js";
import chart from "/JS/model/chartModel.js";

document.addEventListener("DOMContentLoaded", () => {
  const weatherController = new WeatherController();
  const suggestionController = new SuggestionController();
  fetch("http://api.geonames.org/getJSON?geonameId=360630&username=sayed_rhab")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&titles=${"suez"}&origin=*`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const extract = pages[pageId].extract;
      console.log(extract); // This is the plain text extract of the Wikipedia article
    })
    .catch((error) =>
      console.error("Error fetching Wikipedia article:", error)
    );

  const countryCode = "EG";
  const indicators = ["NY.GDP.MKTP.CD", "SP.POP.TOTL"]; // GDP and Population
  const fetchData = async () => {
    try {
      const promises = indicators.map((indicator) =>
        fetch(
          `http://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
        ).then((response) => response.json())
      );
      const results = await Promise.all(promises);
      results.forEach((data) => {
        if (data && data[1]) {
          console.log(`${data[1][0].indicator.value} Data:`, data[1]);
        } else {
          console.error("No data found for one of the indicators.");
        }
      });
    } catch (error) {
      console.error("Error fetching World Bank data:", error);
    }
  };

  fetchData();
});
