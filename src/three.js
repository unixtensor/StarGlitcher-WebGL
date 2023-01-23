import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Scene = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)

const Renderer = new THREE.WebGLRenderer({antialias: false})
Renderer.setPixelRatio(window.devicePixelRatio)
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

const GridHelper = new THREE.GridHelper(200, 50)
Scene.add(GridHelper)

const AmbientLight = new THREE.AmbientLight(0xffffff)
Scene.add(AmbientLight)

// Star Glitcher assets
const WingLoader = new GLTFLoader()
WingLoader.load("./assets/3D/gltf/Wing.gltf", (gltf) => {
    const gltf_Mesh = gltf.scene
    Scene.add(gltf_Mesh)
})
WingLoader.load("./assets/3D/gltf/Ring.gltf", (gltf) => {
    const gltf_Mesh = gltf.scene
    Scene.add(gltf_Mesh)
})
// --

// Character
const LeftLeg_Geometry = new THREE.BoxGeometry(2,5,2)
const LeftLeg_Material = new THREE.MeshStandardMaterial({color: 0xFF6347})
const LeftLeg = new THREE.Mesh(LeftLeg_Geometry, LeftLeg_Material)

LeftLeg.position.y = 15
Scene.add(LeftLeg)
// --

Camera.position.set(-20.4, 4.7, 0.1)

const Controls = new OrbitControls(Camera, Renderer.domElement)

Renderer.setAnimationLoop((deltaTime) => {
    Controls.update()
	Renderer.render(Scene, Camera)
})

window.addEventListener("resize", () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    Renderer.setSize(window.innerWidth, window.innerHeight)
})