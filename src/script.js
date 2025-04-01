import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import { sun, planets } from "./planets.js";

const canvas = document.querySelector("canvas");

// Initialize the pane
const pane = new Pane();

// Scene
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;
camera.position.x = 0;

// Texture Loader
const textureLoader = new THREE.TextureLoader();
function initializeLight() {
  // ✅ Ambient Light with Tweakpane Controls
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  // ✅ Point Light with Tweakpane Controls
  const pointLight = new THREE.PointLight(0xffffff, 0.1);
  pointLight.position.set(0, 0, 5);
  scene.add(pointLight);

  // Light GUI Controls
  const lightFolder = pane.addFolder({ title: "Lights" });

  lightFolder.addBinding(ambientLight, "intensity", {
    min: 0,
    max: 2,
    step: 0.01,
    label: "Ambient Intensity",
  });

  lightFolder.addBinding(pointLight, "intensity", {
    min: 0,
    max: 5,
    step: 0.1,
    label: "Point Intensity",
  });

  lightFolder.addBinding(pointLight.position, "x", {
    min: -10,
    max: 10,
    step: 0.1,
    label: "Point Light X",
  });

  lightFolder.addBinding(pointLight.position, "y", {
    min: -10,
    max: 10,
    step: 0.1,
    label: "Point Light Y",
  });

  lightFolder.addBinding(pointLight.position, "z", {
    min: -10,
    max: 10,
    step: 0.1,
    label: "Point Light Z",
  });
}
initializeLight();

console.log(sun,planets)
async function loadTextures() {
  try {
    const response = await fetch("http://localhost:3000/textures-list");
    const files = await response.json();
    return files; // Returning files if needed
  } catch (error) {
    console.error("Error fetching textures:", error);
  }
}
const texturePath = await loadTextures(); // This will execute the async function
console.log(texturePath)


const textureMap = (texture) => {
    return textureLoader.load(texturePath[texture])
}

//sun
const sunGeometry = new THREE.SphereGeometry(sun.radius,32,32)
const sunMaterial = new THREE.MeshBasicMaterial({
  map : textureMap("sun"), 
}) 
const sunMesh = new THREE.Mesh(sunGeometry,sunMaterial)
scene.add(sunMesh)

const meshes = planets.map((planet,index) => {
  console.log(planet.radius)
  const geometry = new THREE.SphereGeometry(planet.radius,32,32)
  const material = new THREE.MeshStandardMaterial({
    map : textureMap(planet.name)
  })
  const mesh = new THREE.Mesh(geometry,material)
  mesh.position.x = planet.distance * 5
  return mesh
})

meshes.forEach(element => {
  scene.add(element)
});
























// Initialize the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
function resetControls() {
  controls.reset();
}
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetControls);

// Render loop
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};
renderloop();
