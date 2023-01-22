import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const Container = document.getElementById("WebGL")

const Scene = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)

const Renderer = new THREE.WebGLRenderer()
Renderer.setSize(window.innerWidth, window.innerHeight)
Container.appendChild(Renderer.domElement)

const Controls = new OrbitControls(Camera, Renderer.domElement)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
Scene.add( cube );

Camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

    Controls.update()
	Renderer.render( Scene, Camera );
}
animate();