import CCModel from "./DataModel/CCModel.js";
import CCDatachartModel from "./DataModel/CCDatachartModel.js";
import CCNewsModel from "./DataModel/CCNewsModel.js";
import CCWiki from "./DataModel/CCWikipediaModel.js";
import WeatherModel from "./DataModel/WeatherModel.js";

import SearchModel from "./SearchModel/SearchModel.js"
import SuggestionModel from "./SearchModel/SuggestionModel.js";

import mapModel from "./VisualModel/mapModel.js";
import thereDmodel from "./VisualModel/thereDModel.js";

export const appData = {
    search: {
       query: '',
       results: [],
       page: 1,
       searchImage: '',
       id: '',
       countryCode: ''
    },
    data: {
       map: [],
       news: [],
       info: '',
       weather: {},
    },
    history: []
}

export async function data () {
    
    const data = await WeatherModel.getWeatherData("cairo")
    appData.data.map = data.coord;
    appData.search.id = data.id
    appData.search.countryCode = data.sys.country
    appData.search.query = data.name
    console.log(appData);
    
    // const searchImage =  WeatherModel.getWeatherData(country)
    // const searchdata =  CCModel(appData.data.id);
    // const newsData =  CCNewsModel(appData.search.country)
    // const WikiData =  CCWiki(country)
    // CCDatachartModel(countryCode = appData.data.CountryCode)

}

