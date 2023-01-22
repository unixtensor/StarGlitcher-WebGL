import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const Scene = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)

const Renderer = new THREE.WebGLRenderer({antialias: true})
Renderer.setPixelRatio(window.devicePixelRatio)
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

const Controls = new OrbitControls(Camera, Renderer.domElement)

const GridHelper = new THREE.GridHelper(200, 50)
Scene.add(GridHelper)

Camera.position.z = 5;

function FPS_3D() {
	requestAnimationFrame(FPS_3D);

    Controls.update()
	Renderer.render(Scene, Camera)
}

FPS_3D()