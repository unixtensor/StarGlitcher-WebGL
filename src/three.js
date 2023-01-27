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
const GLTF_Importer = new GLTFLoader()
const WingColor = 0xff0000 //Mayhem

async function CreateWing(LeftSided) {
    const Asset = new Promise((resolve, reject) => {
        GLTF_Importer.load(Wing, (gltf_obj) => {
            let Side = LeftSided && Assets.WingsLeft || Assets.WingRight
            
            gltf_obj.scene.traverse((Object) => {
                if (Object.isMesh) {
                    Object.material = new THREE.MeshStandardMaterial({color: WingColor})

                    Object.position.z = 3
                    Side.push(Object)
                }
            })
            Scene.add(gltf_obj.scene)
            resolve(gltf_obj)
        })
    })
    Asset.catch((reason) => console.error(reason))
    return Asset
}

const Wing1 = await CreateWing(WingColor)
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