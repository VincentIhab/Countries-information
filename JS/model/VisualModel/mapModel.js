class Map {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  constructor() {
    // this._getLocalStorage();
  }
  getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }

  loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    // this.#map.on('click', this._showForm.bind(this));

    // this.#workouts.forEach(work => {
    //   this._renderWorkoutMarker(work);
    // });
  }
  // Add a tile layer (base map)
  // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   attribution:
  //     'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   maxZoom: 18,
  // }).addTo(map);

  // Example: Add a marker
  // L.marker([51.5, -0.09])
  //   .addTo(map)
  //   .bindPopup("A marker example!")
  //   .openPopup();
  // if (navigator.geolocation)
  //   navigator.geolocation.getCurrentPosition(
  //     this.loadMap.bind(this),
  //     function () {
  //       alert("Could not get your position");
  //     }
  //   );

  //   loadMap(position) {
  //     const { latitude } = position.coords;
  //     const { longitude } = position.coords;
  //     // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

  //     const coords = [51.505, -0.09];

  //     this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

  //     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //       attribution:
  //         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //       maxZoom: 18,
  //     }).addTo(this.#map);
  // }

  // _moveToPopup(e) {
  //     // BUGFIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
  //     if (!this.#map) return;

  //     const workoutEl = e.target.closest('.workout');

  //     if (!workoutEl) return;

  //     const workout = this.#workouts.find(
  //       work => work.id === workoutEl.dataset.id
  //     );

  //     this.#map.setView(workout.coords, this.#mapZoomLevel, {
  //       animate: true,
  //       pan: {
  //         duration: 1,
  //       },
  //     });

  //     // using the public interface
  //     // workout.click();
  // }
  // Handling clicks on map
  // this.#map.on("click", this._showForm.bind(this));
  // _renderWorkoutMarker(workout) {
  //     L.marker(workout.coords)
  //       .addTo(this.#map)
  //       .bindPopup(
  //         L.popup({
  //           maxWidth: 250,
  //           minWidth: 100,
  //           autoClose: false,
  //           closeOnClick: false,
  //           className: `${workout.type}-popup`,
  //         })
  //       )
  //       .setPopupContent(
  //         `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
  //       )
  //       .openPopup();
  //   }
}

export default new Map();
