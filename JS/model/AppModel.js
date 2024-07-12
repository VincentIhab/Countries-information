// import {DataModel,CCModel} from "./DataModel/getDataModel.js";
// import DataChartModel from "./DataModel/DataChartModel.js";
// import CCNewsModel from "./DataModel/CCNewsModel.js";
// import CCWiki from "./DataModel/CCWikipediaModel.js";
import PubSub from '../utils/PubSub.js';
import { Get_JSON, GET_API } from "../helpers.js";


import SearchModel from "./SearchModel/SearchModel.js"
import SuggestionModel from "./SearchModel/SuggestionModel.js";

import mapModel from "./VisualModel/mapModel.js";
import thereDmodel from "./VisualModel/thereDModel.js";



const EVENTS = {
  DATA_ADDED: 'dataAdded',
  DATA_DELETED: 'dataDeleted',
  DATA_DELETED_ALL: 'dataDeletedAll',
  HISTORY_UPDATED: 'historyUpdated',
};

class AppModel {
  constructor() {
    this.appData = {
      search: {
        query: '',
        id: '',
        countryCode: ''
      },
      data: {
        mapCoords: [],
        ccId: '',
        news: [],
        wikiData: '',
        weather: {},
        searchUrlImage: '',
      },
      history: JSON.parse(localStorage.getItem('appHistory')) || []
    };
    this.CCModel() 
  }

  generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  async addData(input) {
    try {
      const dataUrl = GET_API("Data", "suez");
      const data = await Get_JSON(dataUrl);
      console.log(data);

      if (!data) throw new Error("Invalid input");

      const newsUrl = GET_API("News", data.sys.country); 
      const wikiUrl = GET_API("Wiki", data.name); 
      const photoUrl = GET_API("Photo", data.name); 
      const geoNames = GET_API("GeoNames", data.id); 

      const [news, wikiData, photo, geo] = await Promise.all([
        Get_JSON(newsUrl),
        Get_JSON(wikiUrl),
        Get_JSON(photoUrl),
        Get_JSON(geoNames),
      ]);

      console.log(geo);
      //data structure

      const newEntry = {
        search: {
          query: input,
          id: this.generateUniqueId(),
          countryCode: data.sys.country,
        },
        data: {
          mapCoords: '',
          searchUrlImage: '',
          countryId: 'ss',
          news: [],
          wikiData: '',
          weather: '',
          population: ''
        }
      };

      // add mapCoords 
      newEntry.data.mapCoords = data.coord
      // add countryId 
      newEntry.data.countryId = data.id
      // add weather data
      newEntry.data.weather = {
        temp: data.main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        clouds: data.clouds.all
      }

      // Set news data 
      news.articles.forEach((article) => {
        newEntry.data.news.push({
          Title: article.title,
          description: article.description,
          url: article.url
        });
      });

      // add wikiData
      const pages = wikiData.query.pages;
      const pageId = Object.keys(pages)[0];
      const extract = pages[pageId].extract;
      newEntry.data.wikiData = extract;

      // add Image Url
      if (photo.results.length > 0) {
        newEntry.data.searchUrlImage = photo.results[0].urls.regular;
      } else {
        return null;
      }



      console.log(newEntry);

      this.appData.history.push(newEntry);
      this.updateLocalStorage();
      PubSub.publish(EVENTS.DATA_ADDED, newEntry);
    } catch (err) {
      console.error(err);
    }
  }

  CCModel() {
  }

  deleteDataById(id) {
    this.appData.history = this.appData.history.filter(item => item.search.id !== id);
    this.updateLocalStorage();
    PubSub.publish(EVENTS.DATA_DELETED, id);
  }

  deleteAllData() {
    this.appData.history = [];
    this.updateLocalStorage();
    PubSub.publish(EVENTS.DATA_DELETED_ALL);
  }

  updateLocalStorage() {
    localStorage.setItem('appHistory', JSON.stringify(this.appData.history));
    PubSub.publish(EVENTS.HISTORY_UPDATED, this.appData.history);
  }

  getHistory() {
    return this.appData.history;
  }
}

export default new AppModel()
    








