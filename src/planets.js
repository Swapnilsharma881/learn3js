export const sun = {
    name: "sun",  // Changed to lowercase
    texture: "sun.jpg",
    radius: 10,  // Increased Sun's radius to 5
    distance: 0,  // Sun's distance from itself is always 0
    speed: 0,  // The Sun doesn't move around any object
    rotationSpeed: 0.005,  // Rotation speed of the Sun (on its own axis)
    material: null,  // Will be assigned dynamically
    moons: []  // The Sun doesn't have moons
  };
  
  export const planets = [
    {
      name: "mercury",  // Changed to lowercase
      texture: "mercury.jpg",
      radius: 1.15,  // Increased radius to 3
      distance: 6.87,  // Mercury's distance set to 20
      speed: 0.001,
      rotationSpeed: 0.2,
      material: null,
      moons: []  
    },
    {
      name: "venus",  // Changed to lowercase
      texture: "venus.jpg",
      radius: 2.85,  // Increased radius to 3
      distance: 10.23,  // Venus's distance set to 40
      speed: 0.0008,
      rotationSpeed: 0.1,
      material: null,
      moons: []  
    },
    {
      name: "earth",  // Changed to lowercase
      texture: "earth.jpg",
      radius: 3,  // Increased radius to 3
      distance: 13,  // Earth’s distance set to 60
      speed: 0.0005,
      rotationSpeed: 0.05,
      material: null,
      moons: [
        {
          name: "moon",  // Changed to lowercase
          texture: "moon.jpg",
          radius: 0.000025,  // Scaled down radius for the Moon
          distanceFromPlanet: 0.28,  // Adjusted Moon distance
          rotationSpeed: 0.05,
          revolutionSpeed: 0.01,
          material: null
        }
      ]
    },
    {
      name: "mars",  // Changed to lowercase
      texture: "mars.jpg",
      radius: 1.59,  // Increased radius to 3
      distance: 18.23,  // Mars's distance set to 80
      speed: 0.0004,
      rotationSpeed: 0.1,
      material: null,
      moons: []  
    }
    
        
    
  ];
  