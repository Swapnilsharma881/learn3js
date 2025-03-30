import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { cameraNormalMatrix, texture } from "three/tsl";
import { Pane } from "tweakpane";
const canvas = document.querySelector("canvas")

// Initialize the pane
const pane = new Pane();

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#000000"); // 
const axesHelper = new THREE.AxesHelper( 4 );
scene.add( axesHelper );

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Camera
const camera = new THREE.PerspectiveCamera(
  150,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;
camera.position.y = 10;


// Light
const light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(5, 0, 0);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

// Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const sphereGeometry = new THREE.SphereGeometry(.5,32,32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32);

// Material
const basicMaterial = new THREE.MeshBasicMaterial({  }); // ✅ Set color in material
const standardMaterial = new THREE.MeshStandardMaterial({})
const physicalMaterial = new THREE.MeshPhysicalMaterial({})
const phongMaterial = new THREE.MeshPhongMaterial({  }); // ✅ Set color in material
const lambertMatterial = new THREE.MeshLambertMaterial({  }); // ✅ Set color in material

// Texture
const testexture = textureLoader.load("/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png");
testexture.repeat.set(2,2)

testexture.wrapS = THREE.MirroredRepeatWrapping
testexture.wrapT = THREE.MirroredRepeatWrapping

testexture.wrapS = THREE.RepeatWrapping
testexture.wrapT = THREE.RepeatWrapping

basicMaterial.map = testexture

// Meshes
const geometries = [boxGeometry,planeGeometry,cylinderGeometry,torusKnotGeometry,sphereGeometry]
const materials = [basicMaterial]
const meshes  = geometries.map((geometry, index) => {
  const mesh = new THREE.Mesh(geometry,materials[0]);
  mesh.position.set(
    0,0,0
  );
  return mesh
})


//Change Mesh Props
const cube = meshes[0]
const plane = meshes[1]
const cylinder = meshes[2]
const torus = meshes[3]
const sphere = meshes[4]

// plane.position.x = 1.5;
cylinder.position.y = 1.5;
torus.position.y = -1.5;
sphere.position.x = -1.5;
// plane.rotation.x = Math.PI

//Adding Meshes
const group = new THREE.Group()
group.add(plane)

scene.add(group)




































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
