import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

export default class EarthComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    this.stars = [];
    this.initScene();
    this.addEarth();
    this.addStars();
    this.addLight(); // Add light to the scene
    this.animate();
    window.addEventListener("resize", () => this.onWindowResize());
  }

  initScene() {
    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 20); // Adjust camera position
    this.camera.lookAt(0, 0, 0); // Look at the center

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.container.appendChild(this.renderer.domElement);

    // OrbitControls for interaction
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = true; // Enable zooming
    this.controls.enableRotate = true; // Enable rotation
    this.controls.enablePan = true; // Enable panning
    this.controls.autoRotate = true; // Enable auto-rotation
    this.controls.autoRotateSpeed = 0.5; // Adjust auto-rotation speed

    // Position camera
    this.camera.position.z = 15;
  }

  addEarth() {
    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      "../../styles/img/2.jpg"
    );

    // Create Earth geometry and material
    const geometry = new THREE.SphereGeometry(5, 94, 64);
    const material = new THREE.MeshBasicMaterial({
      map: earthTexture,
    });

    // Create Earth mesh and add to scene
    this.earth = new THREE.Mesh(geometry, material);
    this.scene.add(this.earth);
  }

  addStars() {
    for (let i = 0; i < 1000; i++) {
      const starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeometry, starMaterial);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(300));
      star.position.set(x, y, z);

      this.scene.add(star);
      this.stars.push(star);
    }
  }

  addLight() {
    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 1); // color, intensity
    pointLight.position.set(20, 20, 20); // x, y, z position
    this.scene.add(pointLight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate the Earth
    this.earth.rotation.y += 0.001;

    // Move the stars
    this.stars.forEach((star) => {
      star.position.z += 0.01;
      if (star.position.z > 100) {
        star.position.z = -100;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }

  setPosition(x, y) {
    this.container.style.position = "absolute";
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;
  }
}
