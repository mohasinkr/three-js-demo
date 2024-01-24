// import React, { useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const My3DComponent = () => {
//   useEffect(() => {
//     // Set up Three.js scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0xaaaaaa); // Set to a light gray color, change as needed
//     document.body.appendChild(renderer.domElement);

//     // Load 3D model with animations
//     const loader = new GLTFLoader();
//     loader.load('/3d_pyramid.glb', (gltf) => {
//       const model = gltf.scene;
//       const animations = gltf.animations;

//       // Add the model to the scene
//       scene.add(model);

//       // Create a mixer to control all animations
//       const mixer = new THREE.AnimationMixer(model);

//       // Create an array to store all animation actions
//       const actions = animations.map(animation => mixer.clipAction(animation));

//       // Play all animation actions simultaneously
//       actions.forEach(action => action.play());

//       // Set up camera position
//       camera.position.z = 5;

//       // Initialize the clock
//       const clock = new THREE.Clock();

//       // Update the mixer in your render loop
//       const animate = () => {
//         requestAnimationFrame(animate);

//         const delta = clock.getDelta();
//         mixer.update(delta);

//         renderer.render(scene, camera);
//       };

//       animate();
//     });
//   }, []); // Ensure that the useEffect runs only once when the component mounts

//   return null; // Adjust as needed based on your component structure
// };

// export default My3DComponent;


// import React, { useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const My3DComponent = () => {
//   useEffect(() => {
//     // Set up Three.js scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Load 3D model with animations
//     const loader = new GLTFLoader();
//     loader.load('/3d_pyramid.glb', (gltf) => {
//       const model = gltf.scene;
//       const animations = gltf.animations;

//       // Add the model to the scene
//       scene.add(model);

//       // Create a mixer to control all animations
//       const mixer = new THREE.AnimationMixer(model);

//       // Create an array to store all animation actions
//       const actions = animations.map(animation => mixer.clipAction(animation));

//       // Play all animation actions simultaneously
//       actions.forEach(action => action.play());

//       // Set up camera position
//       camera.position.z = 5;

//       // Initialize the clock
//       const clock = new THREE.Clock();

//       // Use a basic shader for testing
//       const material = new THREE.ShaderMaterial({
//         vertexShader: `
//           void main() {
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           }
//         `,
//         fragmentShader: `
//           void main() {
//             gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//           }
//         `,
//       });

//       // Apply the shader material to the model
//       model.traverse((child) => {
//         if (child.isMesh) {
//           child.material = material;
//         }
//       });

//       // Update the mixer in your render loop
//       const animate = () => {
//         requestAnimationFrame(animate);

//         const delta = clock.getDelta();
//         mixer.update(delta);

//         renderer.render(scene, camera);
//       };

//       // Event listener to resize renderer on window resize
//       window.addEventListener('resize', () => {
//         const newWidth = window.innerWidth;
//         const newHeight = window.innerHeight;
//         camera.aspect = newWidth / newHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(newWidth, newHeight);
//       });

//       // Start the animation loop
//       animate();
//     });
//   }, []); // Ensure that the useEffect runs only once when the component mounts

//   return null; // Adjust as needed based on your component structure
// };

// export default My3DComponent;


import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const My3DComponent = () => {
  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load 3D model with animations
    const loader = new GLTFLoader();
    loader.load('/3d_pyramid.glb', (gltf) => {
      const model = gltf.scene;
      const animations = gltf.animations;

      // Add the model to the scene
      scene.add(model);

      // Create a mixer to control all animations
      const mixer = new THREE.AnimationMixer(model);

      // Create an array to store all animation actions
      const actions = animations.map(animation => mixer.clipAction(animation));

      // Play all animation actions simultaneously
      actions.forEach(action => action.play());

      // Set up camera position
      camera.position.z = 5;

      // Initialize the clock
      const clock = new THREE.Clock();

      // Add ambient light to the scene
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Add directional light to the scene
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      // Use a Phong material with a custom shader for testing
      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color("rgb(0, 168, 168)")},
        },
        vertexShader: `
          varying vec3 vNormal;

          void main() {
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 color;

          void main() {
            float intensity = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0)));
            gl_FragColor = vec4(color * intensity, 1.0);
          }
        `,
      });

      // Apply the shader material to the model
      model.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
        }
      });

      // Update the mixer in your render loop
      const animate = () => {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        mixer.update(delta);

        renderer.render(scene, camera);
      };

      // Event listener to resize renderer on window resize
      window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      });

      // Start the animation loop
      animate();
    });
  }, []); // Ensure that the useEffect runs only once when the component mounts

  return null; // Adjust as needed based on your component structure
};

export default My3DComponent;
