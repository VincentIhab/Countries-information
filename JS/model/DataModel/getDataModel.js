export function CCModel() {
    fetch("http://api.geonames.org/getJSON?geonameId=360630&username=sayed_rhab")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}


import { Get_JSON, GET_API } from "../../helpers.js";

class InfoModel {
  async getData(input) {
    try {
      const data = await Get_JSON(GET_API("Data", input));
      console.log(data);
      return data;
    } catch (err) {
      console.log("city not found");
    }
  }

  async getPhoto(name) {
    try {
      const data = await Get_JSON(GET_API("Photo", name));
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

export const DataModel = new InfoModel();