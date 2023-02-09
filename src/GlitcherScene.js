import * as THREE       from 'three'
import { CreateImport } from '/modules/three/GLTFImport'
import { FPS_Stats }    from './UI'
import { Skybox } from './modules/three/Skybox'
// Engine
import { RootPlayer, COLOR_Inst_DEF } from '/modules/three/rhpidEngine/rE_Root'
import { LightEngine } from './modules/three/Lighting'

// ThreeJS dependencies
const WebGL_Renderer = new THREE.WebGLRenderer({antialias: false})
WebGL_Renderer.shadowMap.enabled = true

const Scene      = new THREE.Scene()
const Camera     = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000)
const GridHelper = new THREE.GridHelper(200, 50)
const AxesHelper = new THREE.AxesHelper(20)

const Baseplate_Geometry = new THREE.BoxGeometry(300,3,300)
const Baseplate_Material = new THREE.MeshPhongMaterial({color: COLOR_Inst_DEF})
const Baseplate = new THREE.Mesh(Baseplate_Geometry, Baseplate_Material)
Baseplate.castShadow = true
Baseplate.receiveShadow = true
Baseplate.position.y = -1.5

Camera.position.set(-13,12,-0.1)

// Lighting
const Lighting = new LightEngine(Scene).Create()

// Create the skybox
const SkyBox = new Skybox('/public/Images/Skybox/', Scene).Create('Skybox', 'png')
//

// Create the mover for the player character
const RootMover      = new RootPlayer(Scene, Camera, WebGL_Renderer)
const RootObject     = RootMover.Create(1.5, false)
const CameraControls = RootMover.Camera()
const RootMove       = RootMover.ApplyMovement()
RootMover.__ForceRootSaturation()
// --

// Star Glitcher assets
const GLTFImport = new CreateImport(Scene)
const Assets = {
    WingsLeft: [],
    WingsRight: [],
    Ring: null
}

async function CreateWing(Color, LeftSided) {
    const WingGLTF = await GLTFImport.GLTF('/public/3D/Wing.gltf')
    const Side = LeftSided && Assets.WingsLeft || Assets.WingsRight
    let WingObject = null

    WingGLTF.scene.traverse((Object) => {
        if (Object.isMesh) {
            Object.material = new THREE.MeshPhongMaterial({color: Color})
            Object.castShadow = true
            Object.receiveShadow = true
            Object.position.z = LeftSided && -Side.length-1.7 || Side.length+1.7
            WingObject = Object
        }
    })
    Side.push(WingGLTF.scene)
    return {
        GLTF: WingGLTF,
        Object: WingObject
    }
}

async function CreateRing(Color) {
    const RingGLTF = await GLTFImport.GLTF('/public/3D/Ring.gltf')
    let RingObject = null

    RingGLTF.scene.traverse((Object) => {
        if (Object.isMesh) {
            Object.material = new THREE.MeshPhongMaterial({color: Color})
            Object.castShadow = true
            Object.receiveShadow = true
            RingObject = Object
        }
    })
    Assets.Ring = RingGLTF.scene
    return {
        GLTF: RingGLTF,
        Object: RingObject
    }
}

async function CreateGlitcherAssets() {
    const DEF_ModeColor = 0xff0000 //Mayhem
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

Scene.add(
    GridHelper,
    AxesHelper,
    Baseplate
)
CreateGlitcherAssets()

window.addEventListener("resize", () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

WebGL_Renderer.setPixelRatio(window.devicePixelRatio)
WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
WebGL_Renderer.domElement.style.zIndex   = 1
WebGL_Renderer.domElement.style.position = 'absolute'
document.body.appendChild(WebGL_Renderer.domElement)

WebGL_Renderer.setAnimationLoop((delta) => {
    RootMove.update()

    WebGL_Renderer.render(Scene, Camera)
    FPS_Stats.update()
})

export {
    Assets,
    CreateWing,
    CreateRing
}