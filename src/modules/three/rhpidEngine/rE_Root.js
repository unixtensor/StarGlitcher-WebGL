import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { KeyMap, InputEvent } from './rE_Bind'

export const __rhpidEngine_Version = "dev0.1"
export let COLOR_Inst_DEF = 0xa3a2a5
export let Root = null
export let CameraControls = null

export let start_Origin = 10
export let WalkSpeed = 15

let ROOT_move_init = false
let ROOT_binds = null

function s_Circuit(EXPECTED, DEFAULT) {
    return EXPECTED === undefined ? DEFAULT : EXPECTED
}

export class RootPlayer {
	constructor(SCENE, CAMERA, RENDER) {
		this.SCENE = SCENE
		this.CAMERA = CAMERA
		this.RENDER = RENDER
	}

	Create(start_Origin, Wireframe) {
		if (Root == null) {
			const Root_Geometry = new THREE.BoxGeometry(1.3,3,3)
			const Material      = new THREE.MeshPhongMaterial({
				color: Wireframe === (undefined || false) ? COLOR_Inst_DEF : 0xffffff, 
				wireframe: s_Circuit(Wireframe, false)
			})
			Root = new THREE.Mesh(Root_Geometry, Material)
			Root.castShadow = true
			Root.receiveShadow = true
			Root.position.y = s_Circuit(start_Origin, 10)
			Root.add(this.CAMERA)
			this.SCENE.add(Root)

			return Root
		}
		console.warn("Root is already created on the engine level, Skipping. \n Root creation is traced to \"class RootObject.\"")
		return Root
	}
	__ForceRootSaturation() {
		if (Root != null)
			Root.material.color.setHex(0xffffff)
	}

	Camera(PRE_OVERRIDES = {}) {
		const DEF_OVERRIDE = {
			enablePan: s_Circuit(PRE_OVERRIDES.enablePan, false),
			maxDistance: s_Circuit(PRE_OVERRIDES.maxDistance, 100),
			minDistance: s_Circuit(PRE_OVERRIDES.minDistance, 3)
		}
		if (CameraControls == null) {
			CameraControls = new OrbitControls(this.CAMERA, this.RENDER.domElement)
			CameraControls.enablePan   = DEF_OVERRIDE.enablePan
			CameraControls.maxDistance = DEF_OVERRIDE.maxDistance
			CameraControls.minDistance = DEF_OVERRIDE.minDistance
			CameraControls.target = s_Circuit(Root.position, new THREE.Vector3())
		}
		return CameraControls
	}
 
	ApplyMovement() {
		if (ROOT_move_init == true) {
			console.warn("RootMovement is already initialized, using the existing root.")
			return ROOT_binds
		}
		ROOT_move_init = true
		ROOT_binds = new KeyMap(Root, this.CAMERA)
		
		document.addEventListener("keydown", (ev) => {
			const k = ev.key.toLowerCase()
			const f = InputEvent[k]
			if (f !== undefined)
				InputEvent[k] = true
		}, false)
		document.addEventListener("keyup", (ev) => {
			const k = ev.key.toLowerCase()
			const f = InputEvent[k]
			if (f !== undefined)
				InputEvent[k] = false
		}, false)
		return ROOT_binds
	}
}