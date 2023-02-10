import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { rE_KeyMap, InputEvent } from './rE_Bind'

export const __rhpidEngine_Version = "dev0.1"
export let rE_COLOR_Inst_DEF = 0xa3a2a5
export let rE_Root = null
export let rE_CameraControls = null

export let start_Origin = 10
export let WalkSpeed = 10
export let JumpHeight = 50

let ROOT_move_init = false
let ROOT_binds = null

function s_Circuit(EXPECTED, DEFAULT) {
    return EXPECTED === undefined ? DEFAULT : EXPECTED
}

export class rE_RootPlayer {
	constructor(SCENE, CAMERA, RENDER) {
		this.SCENE = SCENE
		this.CAMERA = CAMERA
		this.RENDER = RENDER
	}

	Create(start_Origin, Wireframe) {
		if (rE_Root == null) {
			const Root_Geometry = new THREE.BoxGeometry(1.3,3,3)
			const Material      = new THREE.MeshPhongMaterial({
				color: Wireframe === (undefined || false) ? rE_COLOR_Inst_DEF : 0xffffff, 
				wireframe: s_Circuit(Wireframe, false)
			})
			rE_Root = new THREE.Mesh(Root_Geometry, Material)
			rE_Root.castShadow = true
			rE_Root.receiveShadow = true
			rE_Root.position.y = s_Circuit(start_Origin, 10)
			rE_Root.add(this.CAMERA)
			this.SCENE.add(rE_Root)

			return rE_Root
		}
		console.warn("Root is already created on the engine level, Skipping. \n Root creation is traced to \"class RootObject.\"")
		return rE_Root
	}
	__ForceRootSaturation() {
		if (rE_Root != null)
			rE_Root.material.color.setHex(0xffffff)
	}

	Camera(PRE_OVERRIDES = {}) {
		const DEF_OVERRIDE = {
			enablePan: s_Circuit(PRE_OVERRIDES.enablePan, false),
			maxDistance: s_Circuit(PRE_OVERRIDES.maxDistance, 100),
			minDistance: s_Circuit(PRE_OVERRIDES.minDistance, 3)
		}
		if (rE_CameraControls == null) {
			rE_CameraControls = new OrbitControls(this.CAMERA, this.RENDER.domElement)
			rE_CameraControls.enablePan   = DEF_OVERRIDE.enablePan
			rE_CameraControls.maxDistance = DEF_OVERRIDE.maxDistance
			rE_CameraControls.minDistance = DEF_OVERRIDE.minDistance
			rE_CameraControls.target = s_Circuit(rE_Root.position, new THREE.Vector3())
		}
		return rE_CameraControls
	}
 
	ApplyMovement() {
		if (ROOT_move_init == true) {
			console.warn("RootMovement is already initialized, using the existing root.")
			return ROOT_binds
		}
		ROOT_move_init = true
		ROOT_binds = new rE_KeyMap(rE_Root, this.CAMERA)
		
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