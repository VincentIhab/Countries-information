// import "./styles/sass/main.sass";
// import "./styles/img/background.jpg";
// import "./styles/img/logo.png";
import WeatherController from "/JS/controllers/WeatherController.js";
import SuggestionController from "/JS/controllers/SuggestionController.js";
import chart from "/JS/model/chartModel.js";
import mapModel from "./JS/model/mapModel.js";

document.addEventListener("DOMContentLoaded", () => {
  // mapModel.getPosition();
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

  const apiKey = "e44e2e87863b4f50b4c8de75b7ac1422";
  const country = "US";
  const url2 = `https://newsapi.org/v2/everything?q=${country}&apiKey=${apiKey}`;

  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.articles);
      data.articles.forEach((article) => {
        console.log(`Title: ${article.title}`);
        console.log(`Description: ${article.description}`);
        console.log(`URL: ${article.url}`);
        console.log("---");
      });
    })
    .catch((error) => console.error("Error:", error));
});
