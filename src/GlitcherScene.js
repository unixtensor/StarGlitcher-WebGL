import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { CreateImport } from './modules/three/GLTFImport'
// Engine
import { RootObject } from './modules/three/rhpidEngine/rE_Root'
import {} from './modules/three/rhpidEngine/rE_RootBind'

const Renderer = new THREE.WebGLRenderer({
    antialias: false
})
Renderer.setPixelRatio(window.devicePixelRatio)
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

const Scene  = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)

const GridHelper   = new THREE.GridHelper(200, 50)
const AmbientLight = new THREE.AmbientLight(0xffffff)
const AxesHelper   = new THREE.AxesHelper(20)

const Controls = new OrbitControls(Camera, Renderer.domElement)
Controls.enablePan   = false
Controls.maxDistance = 200
Controls.minDistance = 5

// Star Glitcher assets
const GLTFImport = new CreateImport(Scene)
const Assets = {
    WingsLeft: [],
    WingsRight: [],
    Ring: null
}
const DEF_ModeColor = 0xff0000 //Mayhem

async function CreateWing(Color, LeftSided) {
    const WingGLTF = await GLTFImport.GLTF('/public/3D/gltf/Wing.gltf')
    const Side = LeftSided && Assets.WingsLeft || Assets.WingsRight
    let WingObject = null

    WingGLTF.scene.traverse((Object) => {
        WingObject = Object
        const l = Side.length
        Object.material = new THREE.MeshStandardMaterial({color: Color})
        Object.position.z = LeftSided && -l-1.7 || l+1.7
    })
    Side.push(WingGLTF.scene)
    return {
        GLTF: WingGLTF,
        Object: WingObject
    }
}

async function CreateRing(Color) {
    const RingGLTF = await GLTFImport.GLTF('/public/3D/gltf/Ring.gltf')
    let RingObject = null

    RingGLTF.scene.traverse((Object) => {
        RingObject = Object
        Object.material = new THREE.MeshStandardMaterial({color: Color})
    })
    Assets.Ring = RingGLTF.scene
    return {
        GLTF: RingGLTF,
        Object: RingObject
    }
}

async function CreateWings() {
    const Ring  = await CreateRing(DEF_ModeColor)
    const Wing1 = await CreateWing(DEF_ModeColor)
    const Wing2 = await CreateWing(DEF_ModeColor)
    const Wing3 = await CreateWing(DEF_ModeColor)
    const Wing4 = await CreateWing(DEF_ModeColor, true)
    const Wing5 = await CreateWing(DEF_ModeColor, true)
    const Wing6 = await CreateWing(DEF_ModeColor, true)
    Ring.Object.rotation.z = Math.PI/2
    Ring.Object.position.y = 1.5
    Ring.Object.scale.set(3,3,3)
}
CreateWings()

//Create the mover for the player character
const Mover = new RootObject(Scene).Create()


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
    Assets,
    CreateWing,
    CreateRing
}