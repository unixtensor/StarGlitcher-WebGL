import * as THREE       from 'three'
import { FPS_Stats, Start_GlitchUI }    from './UI-Engine'
import { Skybox }       from './modules/three/Skybox'
import { LightEngine }  from './modules/three/Lighting'
import { Wings }        from './modules/three/Wings'
import { Animations }   from './modules/three/Animations'
// Engine
import { rE_RootPlayer } from '/modules/three/rhpidEngine/rE_Root'
import { CharacterRig }  from './modules/three/rhpidEngine/rE_Character'

// ThreeJS dependencies
const WebGL_Renderer = new THREE.WebGLRenderer({antialias: false})
WebGL_Renderer.shadowMap.enabled = true

const Scene              = new THREE.Scene()
const Camera             = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000)
const Baseplate_Geometry = new THREE.BoxGeometry(500,3,500)
const Baseplate_Material = new THREE.MeshPhongMaterial({color: 0x656366})
const Baseplate          = new THREE.Mesh(Baseplate_Geometry, Baseplate_Material)
Baseplate.castShadow = true
Baseplate.receiveShadow = true
Baseplate.position.y = -1.5

// Create the environment
const Lighting = new LightEngine(Scene).Create()
const SkyBox   = new Skybox('/Images/Skybox/', Scene).Create('Skybox', 'png')

// Create the mover for the player character
const RootMover      = new rE_RootPlayer(Camera, WebGL_Renderer)
const RootObject     = RootMover.Create(true)
const CameraControls = RootMover.Camera()
const RootMove       = RootMover.ApplyMovement()

// Character
const CharacterNew = new CharacterRig()
const Character    = CharacterNew.Create({
    Torso: 0xff275b
})

// Wing Assets
const CharWings = new Wings()
const GlitcherAssets = CharWings.GlitcherWings()
// Wait for the gltf interpreter to build the wings
await GlitcherAssets

const Clock = new THREE.Clock()

// Add all Mesh's and visual data to the workspace
Scene.add(
    Baseplate,
    SkyBox,
    RootObject,
    ...Character.Limbs,
    ...Lighting.Sources,
)
GlitcherAssets.then((v) => Scene.add(...v)).catch((r) => console.error("Couldn't load the GlitcherAssets,", r))

Camera.position.set(-13,12,-0.1)

WebGL_Renderer.setAnimationLoop((delta) => {
    const deltaTime = Clock.getDelta()
    const AnimMan = new Animations(deltaTime, delta)

    RootMove.update(deltaTime)
    
    CharacterNew.Joints_update()
    CharWings.Wing_Unions_update()

    AnimMan.Rig("Mayhem").Idle()
    AnimMan.Wings()

    WebGL_Renderer.render(Scene, Camera)
    FPS_Stats.update()
})

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

Start_GlitchUI()