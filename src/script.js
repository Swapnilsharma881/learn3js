import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { cameraNormalMatrix } from "three/tsl";
import { Pane } from "tweakpane";
const canvas = document.querySelector("canvas")

// Initialize the pane
const pane = new Pane();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#222"); // 

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 10;


// Light
// const light = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(0, 5, 10);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);


// Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const icosahedronGeometry = new THREE.IcosahedronGeometry(3, 0);

// Material
const color = "#F2EFE7"
const basicMaterial = new THREE.MeshBasicMaterial({ color: color }); // ✅ Set color in material
const standardMaterial = new THREE.MeshStandardMaterial({color : color})
const physicalMaterial = new THREE.MeshPhysicalMaterial({color : color})
const phongMaterial = new THREE.MeshPhongMaterial({ color: color }); // ✅ Set color in material
const lambertMatterial = new THREE.MeshLambertMaterial({ color: color }); // ✅ Set color in material


// Meshes
const geometry = [boxGeometry,torusKnotGeometry]
const materials = [basicMaterial,standardMaterial]
const meshes  = materials.map((material, index) => {
  const mesh = new THREE.Mesh(geometry[1],material);
  mesh.position.set(
    Math.random() * 10 - 4, // X between -5 and 5
    Math.random() * 10 - 4, // Y between -5 and 5
    Math.random() * 10 - 5  // Z between -5 and 5
  );
  scene.add(mesh)
  return mesh
})































// Initialize the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas : canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Control logic
let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
function resetControls() {
  controls.reset(); 
}
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetControls);


//render logic
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
