import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

export default class EarthComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    this.defaultCameraPosition = { x: 0, y: 0, z: 20 }; // Default camera position
    this.defaultContainerPosition = { x: 0, y: 0 }; // Default container position

    this.initScene();
    this.loadTextures()
      .then(() => {
        this.addEarth();
        this.addClouds();
        this.addStarfield();
        this.addLight();
        this.animate();
        window.addEventListener('resize', () => this.onWindowResize());
        this.addSearchFunctionality();
        this.addResetFunctionality();
        this.hideLoadingSpinner(); // Hide the spinner after everything is loaded
      })
      .catch((error) => {
        console.error('Error loading textures:', error);
        this.hideLoadingSpinner(); // Hide the spinner even if there's an error
      });
  }

  showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
  }

  hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
  }

  initScene() {
    this.showLoadingSpinner();
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(
      this.defaultCameraPosition.x,
      this.defaultCameraPosition.y,
      this.defaultCameraPosition.z
    );
    this.camera.lookAt(0, 0, 0); // Look at the center of the Earth

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    // OrbitControls for interaction
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = true; // Enable zooming
    this.controls.enableRotate = true; // Enable rotation
    this.controls.enablePan = true; // Enable panning
    this.controls.autoRotate = false; // Disable auto-rotation
    this.controls.minDistance = 8; // Minimum zoom distance
    this.controls.maxDistance = 43; // Maximum zoom distance
  }


  loadTextures() {
    const textureLoader = new THREE.TextureLoader();

    const loadTexture = (url) => {
      return new Promise((resolve, reject) => {
        textureLoader.load(
          url,
          resolve,
          undefined,
          (error) => {
            reject(new Error(`Failed to load texture: ${url}, Error: ${error.message}`));
          }
        );
      });
    };

    return Promise.all([
      loadTexture('../../../styles/img/8k_earth_nightmap.jpg'),
      loadTexture('../../../styles/img/b.jpg'),
      loadTexture('../../../styles/img/8081_earthspec10k.jpg'),
      loadTexture('../../../styles/img/storm_clouds_8k.jpg'),
      loadTexture('../../../styles/img/stars.jpg')
    ]).then((textures) => {
      this.textures = {
        earth: textures[0],
        bump: textures[1],
        specular: textures[2],
        clouds: textures[3],
        starfield: textures[4],
      };
    });
  }

 
  addEarth() {
    // Create Earth geometry and material
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: this.textures.earth,
      bumpMap: this.textures.bump,
      bumpScale: 0.05,
      roughness: 1,
      metalness: 0,
    });

    // Create Earth mesh and add to scene
    this.earth = new THREE.Mesh(geometry, material);
    this.scene.add(this.earth);
  }

  addClouds() {
    // Create clouds geometry and material
    const cloudsGeometry = new THREE.SphereGeometry(5.1, 64, 64); // Slightly larger sphere for clouds
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: this.textures.clouds,
      transparent: true,
      opacity: 0.2, // Adjust opacity for better visibility
      depthWrite: false, // To prevent rendering issues
    });

    // Create clouds mesh and add to scene
    this.clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    this.scene.add(this.clouds);
  }

  addStarfield() {
    // Create starfield geometry and material
    const starfieldGeometry = new THREE.SphereGeometry(100, 64, 64); // Large sphere for background
    const starfieldMaterial = new THREE.MeshBasicMaterial({
      map: this.textures.starfield,
      side: THREE.BackSide, // Render inside of the sphere
    });

    // Create starfield mesh and add to scene
    const starfield = new THREE.Mesh(starfieldGeometry, starfieldMaterial);
    this.scene.add(starfield);
  }

  addLight() {
    // Directional light to simulate sunlight
    const  directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increased intensity
    directionalLight.position.set(20, 20, 20);
    this.scene.add(directionalLight);

    // Ambient light for a soft glow
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Increased intensity
    this.scene.add(ambientLight);

    // Hemisphere light to softly light both top and bottom
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2); // Increased intensity
    this.scene.add(hemisphereLight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate the Earth and clouds
    this.earth.rotation.y += 0.0001;
    this.clouds.rotation.y += 0.0001;
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  setPosition(x, y) {
    this.container.style.position = 'absolute';
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;
  }

  addSearchFunctionality() {
    const searchInput = document.getElementById('input');
    searchInput.addEventListener('keypress', (event) => {
      event.preventDefault()
      if (event.key === 'Enter') {
        this.zoomToLeft();
      }
    });
  }

  zoomToLeft() {
    // Disable user controls
    this.controls.enabled = false;

    // Calculate the current distance from the camera to the Earth center
    const currentDistance = this.camera.position.distanceTo(new THREE.Vector3(0, 0, 0));

    // Define the maximum and minimum distances for zooming
    const maxZoomOutDistance = 30;
    const minZoomInDistance = 12;

    // Adjusted zoom positions based on the distance limits
    let targetCameraPosition;
    if (currentDistance > maxZoomOutDistance) {
        // Limit zoom out distance
        targetCameraPosition = { x: -10, y: 0, z: maxZoomOutDistance }; 
    } else if (currentDistance < minZoomInDistance) {
        // Limit zoom in distance
        targetCameraPosition = { x: 0, y: 0, z: 0 }; 
    } else {
        // Default zoom position if within acceptable range
        targetCameraPosition = { x: -10, y: 0, z: currentDistance };
    }

    const targetContainerPosition = currentDistance > minZoomInDistance
        ? { x: -window.innerWidth / 4, y: 0 } // Move container to the left
        : { x: 0, y: 0 }; // Keep container at the center

    // Animate camera position
    new TWEEN.Tween(this.camera.position)
        .to(targetCameraPosition, 5000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            console.log(`Current zoom level: ${this.camera.position.distanceTo(new THREE.Vector3(0, 0, 0))}`);

        })
        .start();

    // Animate container position
    new TWEEN.Tween(this.container.style)
        .to({ left: `${targetContainerPosition.x}px`, top: `${targetContainerPosition.y}px` }, 5000)
        .easing(TWEEN.Easing.Quadratic.InOut)

        .start();
}



  addResetFunctionality() {
    const resetButton = document.getElementById('label');
    resetButton.addEventListener('click', (event) => {
      event.preventDefault()
      console.log('jjj');
      this.resetEarth();
    });
  }

  resetEarth() {
    // Enable user controls after animation
    const defaultCameraPosition = this.defaultCameraPosition;
    const defaultContainerPosition = this.defaultContainerPosition;

    // Animate camera position back to default
    new TWEEN.Tween(this.camera.position)
      .to(defaultCameraPosition, 2000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .onComplete(() => {
        this.controls.enabled = true; // Re-enable user controls
      })
      .start();

    // Animate container position back to default
    new TWEEN.Tween(this.container.style)
      .to({ left: `${defaultContainerPosition.x}px`, top: `${defaultContainerPosition.y}px` }, 2000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }

}

// Create the Earth component inside the container

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}

animate();