import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { CreateImport } from '/modules/three/GLTFImport'
// Engine
import { RootObject, RootMovement } from '/modules/three/rhpidEngine/rE_Root'
import { tick_Profile } from '/modules/three/rhpidEngine/rE_Tick'

const WebGL_Renderer = new THREE.WebGLRenderer({antialias: false})
WebGL_Renderer.setPixelRatio(window.devicePixelRatio)
WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
WebGL_Renderer.domElement.style.zIndex   = 1
WebGL_Renderer.domElement.style.position = 'absolute'

const Scene        = new THREE.Scene()
const Camera       = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)
const GridHelper   = new THREE.GridHelper(200, 50)
const AmbientLight = new THREE.AmbientLight(0xffffff)
const AxesHelper   = new THREE.AxesHelper(20)
const Controls     = new OrbitControls(Camera, WebGL_Renderer.domElement)
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
    const WingGLTF = await GLTFImport.GLTF('/3D/gltf/Wing.gltf')
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
    const RingGLTF = await GLTFImport.GLTF('/3D/gltf/Ring.gltf')
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

async function CreateGlitcherAssets() {
    const Ring = await CreateRing(DEF_ModeColor)
    Ring.Object.rotation.z = Math.PI/2
    Ring.Object.position.y = 1.5
    Ring.Object.scale.set(3,3,3)

    CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor, true)
    CreateWing(DEF_ModeColor, true)
    CreateWing(DEF_ModeColor, true)
}

//Create the mover for the player character
const Mover = new RootObject(Scene).Create()

// --

Scene.add(
    GridHelper,
    AmbientLight,
    AxesHelper
)
Camera.position.set(-20.4, 4.7, 0.1)

WebGL_Renderer.setAnimationLoop((deltaTime) => {
    Controls.update()
	WebGL_Renderer.render(Scene, Camera)
})
window.addEventListener("resize", () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
})

CreateGlitcherAssets()
document.body.appendChild(WebGL_Renderer.domElement)

export {
    Assets,
    CreateWing,
    CreateRing
}