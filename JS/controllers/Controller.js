import SearchController from "./SearchController.js";
import DataController from "./DataController.js";
// import chart from "/JS/model/chartModel.js";

export default function controllers() {
  // const earth = new EarthComponent("earth-container");
  // earth.setPosition(0, 0);
  // mapModel.getPosition();

  new SearchController();
  new DataController();
}
