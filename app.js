// import "./styles/sass/main.sass";
// import "./styles/img/background.jpg";
// import "./styles/img/logo.png";
import controllers from "/JS/controllers/Controller.js";
// import fetchData from "./JS/model/DataModel/DataChartModel.js"
import EarthComponent from "./JS/model/VisualModel/thereDModel.js";

document.addEventListener("DOMContentLoaded", () => {
  const earth = new EarthComponent("earth-container");
  earth.setPosition(0, 0);
  // mapModel.getPosition();
  controllers();
});
