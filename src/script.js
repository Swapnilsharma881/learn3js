import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { cameraNormalMatrix } from "three/tsl";
import { Pane } from "tweakpane";
const canvas = document.querySelector("canvas")

// Initialize the pane
const pane = new Pane();

// Initialize the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#87CEEB"); // 
scene.fog = new THREE.Fog(0xaaaaaa, 5, 15); // Light gray fog starts at 5 units, disappears at 15


// Initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const icosahedronGeometry = new THREE.IcosahedronGeometry(3, 0);


// Initialize the material
const material = new THREE.MeshPhongMaterial({ color: "red" }); // ✅ Set color in material

// Initialize the meshes
const cube = new THREE.Mesh(geometry, material);
const knot = new THREE.Mesh(torusKnotGeometry, material);
knot.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;
plane.material.side = THREE.DoubleSide;

// Add the meshes to the scene
scene.add(cube, knot, plane);

// Initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 10;

// Initialize the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas : canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement); // ✅ Append canvas automatically

// Instantiate the controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render the scene
const renderloop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
