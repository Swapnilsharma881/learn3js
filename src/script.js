import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { min } from "three/tsl";
import { Pane } from "tweakpane";

const canvas = document.querySelector("canvas");

// Initialize the pane
const pane = new Pane();

// Scene
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// Camera setup
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.x = -5;


// Texture Loader
const textureLoader = new THREE.TextureLoader();
const textures = {};

const loadTextures = () => {
            const folders = [
              "badlands-boulders-bl",
              "space-cruiser-panels2-bl",
              "whispy-grass-meadow-bl",
            ];

            const texturePrefixes = {
              "badlands-boulders-bl": "badlands-boulders",
              "space-cruiser-panels2-bl": "space-cruiser-panels2",
              "whispy-grass-meadow-bl": "wispy-grass-meadow",
            };

            const textureTypes = ["albedo", "height", "metallic", "normal", "roughness", "ao"];

            folders.forEach((folder) => {
              const prefix = texturePrefixes[folder];
              textures[folder] = {};

              textureTypes.forEach((type) => {
                const path = `/textures/${folder}/${prefix}_${type}.png`;
                textures[folder][type] = textureLoader.load(path);
              });
            });
  };
loadTextures();

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
            max: 2,
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

  };
initializeLight()
// Geometries
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);


// Materials
const spaceMatarial = new THREE.MeshStandardMaterial({}); 
const grassMatarial = new THREE.MeshStandardMaterial({}); 
const badlandsMatarial = new THREE.MeshStandardMaterial({}); 


console.log(textures)




// Meshes
const geometries = [sphereGeometry, sphereGeometry, sphereGeometry];
const materials = [spaceMatarial,grassMatarial,badlandsMatarial];
const meshes = geometries.map((geometry,index) => new THREE.Mesh(geometry, materials[index]));

// Adding Meshes
const [space, grass, badlands] = meshes;

//space material
  const spacePane = pane.addFolder({
    title : 'space',
    expanded : true
  })
  space.material.map = textures["space-cruiser-panels2-bl"].albedo;
  space.material.metalnessMap = textures["space-cruiser-panels2-bl"].metallic;
  space.material.roughnessMap = textures["space-cruiser-panels2-bl"].roughness;
  space.material.normalMapMap = textures["space-cruiser-panels2-bl"].normal;
  space.material.displacementMap = textures["space-cruiser-panels2-bl"].height;
  space.material.aoMap = textures["space-cruiser-panels2-bl"].ao;
  space.material.needsUpdate = true;
  
  spacePane.addBinding(space.material,"metalness" , {min : 0,max :1,step:0.01})
  spacePane.addBinding(space.material,"roughness" , {min : 0,max :1,step:0.01})
  spacePane.addBinding(space.material,"displacementScale" , {min : 0,max :1,step:0.01})
  spacePane.addBinding(space.material,"aoMapIntensity" , {min : 0,max :1,step:0.01})




// grass material
const grassPane = pane.addFolder({
  title : 'grass',
  expanded : true
})
  grass.material.map = textures["whispy-grass-meadow-bl"].albedo;
  grass.material.metalnessMap = textures["whispy-grass-meadow-bl"].metallic;
  grass.material.roughnessMap = textures["whispy-grass-meadow-bl"].roughness;
  grass.material.normalMapMap = textures["whispy-grass-meadow-bl"].normal;
  grass.material.displacementMap = textures["whispy-grass-meadow-bl"].height;
  grass.material.aoMap = textures["whispy-grass-meadow-bl"].ao;
  grass.material.needsUpdate = true;

  grassPane.addBinding(grass.material,"metalness" , {min : 0,max :1,step:0.01})
  grassPane.addBinding(grass.material,"roughness" , {min : 0,max :1,step:0.01})
  grassPane.addBinding(grass.material,"displacementScale" , {min : 0,max :1,step:0.01})
  grassPane.addBinding(grass.material,"aoMapIntensity" , {min : 0,max :1,step:0.01})
//badlands material
const badlandsPane = pane.addFolder({
  title : 'badlands',
  expanded : true
})
badlands.material.map = textures["badlands-boulders-bl"].albedo;
  badlands.material.metalnessMap = textures["badlands-boulders-bl"].metallic;
  badlands.material.roughnessMap = textures["badlands-boulders-bl"].roughness;
  badlands.material.normalMapMap = textures["badlands-boulders-bl"].normal;
  badlands.material.displacementMap = textures["badlands-boulders-bl"].height;
  badlands.material.aoMap = textures["badlands-boulders-bl"].ao;
  badlands.material.needsUpdate = true;

  badlandsPane.addBinding(badlands.material,"metalness" , {min : 0,max :1,step:0.01})
  badlandsPane.addBinding(badlands.material,"roughness" , {min : 0,max :1,step:0.01})
  badlandsPane.addBinding(badlands.material,"displacementScale" , {min : 0,max :1,step:0.01})
  badlandsPane.addBinding(badlands.material,"aoMapIntensity" , {min : 0,max :1,step:0.01})


const group = new THREE.Group();
group.add(space,grass,badlands);
space.position.setX(-1.5)
badlands.position.setX(1.5)
scene.add(group);



















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
