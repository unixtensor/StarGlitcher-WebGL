import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Renderer = new THREE.WebGLRenderer({antialias: false})
Renderer.setPixelRatio(window.devicePixelRatio)
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

const Scene  = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)

const GridHelper   = new THREE.GridHelper(200, 50)
const AmbientLight = new THREE.AmbientLight(0xffffff)
const AxesHelper   = new THREE.AxesHelper(20)

const Controls = new OrbitControls(Camera, Renderer.domElement)

// Star Glitcher assets
const Wing = './assets/3D/gltf/Wing.gltf'
const Assets = {
    WingsLeft: [],
    WingsRight: [],
    Ring: null
}
const WingColor = 0xff0000 //Default Mayhem mode color

const GLTF_Importer = new GLTFLoader()
await GLTF_Importer.loadAsync(Wing, (e) => {
    console.log(e)
})
function CreateWing(LeftSided) {
    let GLTF_Scene = null
    GLTF_Importer.load(Wing, (gltf_obj) => {
        GLTF_Scene = gltf_obj.scene

        let Side = null
        if (LeftSided) {
            Side = Assets.WingsLeft
        } else {
            Side = Assets.WingsRight
        }
        GLTF_Scene.traverse((Object) => {
            if (Object.isMesh) {
                Object.material = new THREE.MeshStandardMaterial({color: WingColor})
                Object.position.z = 3
                Side.push(Object)
            }
        })
        Scene.add(GLTF_Scene)
    })
    return GLTF_Scene
}

const Wing1 = CreateWing(WingColor)
console.log(Wing1)
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

export {
    Assets
}