import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTF } from './modules/3D/GLTFLoader'

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

const AxesHelper = new THREE.AxesHelper(20)
Scene.add(AxesHelper)

// Star Glitcher assets
const WingImport = new GLTF(Scene, './assets/3D/gltf/Wing.gltf')
const Wing = WingImport.Object(0xff0000)

console.log(Wing)

let Wings = {
    Left: [],
    Right: []
}

// WingLoader.load("./assets/3D/gltf/Wing.gltf", (gltf) => {
//     const Side = Wings.Left
//     const gltf_Mesh = gltf.scene
//     const Material = new THREE.MeshStandardMaterial({color: 0xff0000})
//     gltf_Mesh.traverse((o) => {
//         if (o.isMesh) {
//             o.position.z = 2
//             o.material = Material
//         }
//     })
//     Side.push(gltf_Mesh)
//     Scene.add(gltf_Mesh)
// })

// WingLoader.load("./assets/3D/gltf/Ring.gltf", (gltf) => {
//     const gltf_Mesh = gltf.scene
//     const Material = new THREE.MeshStandardMaterial({color: 0xff0000})
//     gltf_Mesh.traverse((o) => {
//         if (o.isMesh) o.material = Material
//     })
//     Ring = gltf_Mesh
//     Scene.add(gltf_Mesh)
// })
// --

// Character
// const LeftLeg_Geometry = new THREE.BoxGeometry(2,5,2)
// const LeftLeg_Material = new THREE.MeshStandardMaterial({color: 0xFF6347})
// const LeftLeg = new THREE.Mesh(LeftLeg_Geometry, LeftLeg_Material)

// LeftLeg.position.y = 15
// Scene.add(LeftLeg)
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