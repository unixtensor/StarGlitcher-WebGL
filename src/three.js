import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Scene = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)

const Renderer = new THREE.WebGLRenderer({antialias: false})
Renderer.setPixelRatio(window.devicePixelRatio)
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

const GridHelper = new THREE.GridHelper(200, 50)
const AmbientLight = new THREE.AmbientLight(0xffffff)
const AxesHelper = new THREE.AxesHelper(20)

const Controls = new OrbitControls(Camera, Renderer.domElement)

// Star Glitcher assets
let Wing = './assets/3D/gltf/Wing.gltf'
let Wings = {Left: [], Right: []}
const GLTF_Importer = new GLTFLoader()

GLTF_Importer.load(Wing, (gltf_obj) => {
    const Material = new THREE.MeshStandardMaterial({color: 0xff0000})
    const gltf_Mesh = gltf_obj.scene
    
    gltf_Mesh.traverse((obj) => {
        if (obj.isMesh) {
            obj.material = Material
        }
    })
    Scene.add(gltf_Mesh)
})

GLTF_Importer.load(Wing, (gltf_obj) => {
    const Material = new THREE.MeshStandardMaterial({color: 0xff0000})
    const gltf_Mesh = gltf_obj.scene
    
    gltf_Mesh.traverse((obj) => {
        if (obj.isMesh) {
            obj.material = Material
        }
    })
    Scene.add(gltf_Mesh)
})
// --

Scene.add(
    GridHelper,
    AmbientLight,
    AxesHelper
)

Camera.position.set(-20.4, 4.7, 0.1)

Renderer.setAnimationLoop((deltaTime) => {
    Controls.update()
	Renderer.render(Scene, Camera)
})

window.addEventListener("resize", () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    Renderer.setSize(window.innerWidth, window.innerHeight)
})