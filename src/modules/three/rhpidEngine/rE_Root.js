import * as THREE                from 'three'
import { OrbitControls }         from 'three/addons/controls/OrbitControls'
import { rE_KeyMap, InputEvent } from './rE_Bind'

export const __rhpidEngine_Version = "dev0.1"

export let rE_COLOR_Inst_DEF = 0xa3a2a5
export let rE_CameraControls = null

let ROOT_move_init = false
let ROOT_binds = null
const s_Circuit = (EXPECTED, DEFAULT) => EXPECTED === undefined ? DEFAULT : EXPECTED

export const rE_ROOT = {
	MESH: null,
	PROPERTIES: {
		WalkSpeed: 10,
		JumpHeight: 50,
		HipHeight: (H) => H || 1.5,
		Color: (C) => C || rE_COLOR_Inst_DEF
	}
}

export class rE_RootPlayer {
	constructor(CAMERA, RENDER) {
		this.CAMERA = CAMERA
		this.RENDER = RENDER
	}

	Create(Wireframe = false) {
		if (rE_ROOT.MESH == null) {
			const Root_Geometry = new THREE.BoxGeometry(1.3,3,3)
			const Material = new THREE.MeshBasicMaterial({
				color: Wireframe == false ? rE_COLOR_Inst_DEF : 0xffffff, 
				wireframe: Wireframe
			})
			rE_ROOT.MESH = new THREE.Mesh(Root_Geometry, Material)
			rE_ROOT.MESH.position.y = rE_ROOT.PROPERTIES.HipHeight()
			rE_ROOT.MESH.add(this.CAMERA)

			return rE_ROOT.MESH
		}
		console.warn("Root is already created on the engine level, Skipping.")
		return rE_ROOT.MESH
	}
	__ForceRootSaturation() {
		if (rE_ROOT.MESH != null)
			rE_ROOT.MESH.material.color.setHex(0xffffff)
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
			rE_CameraControls.target = s_Circuit(rE_ROOT.MESH.position, new THREE.Vector3())
		}
		return rE_CameraControls
	}
 
	ApplyMovement() {
		if (ROOT_move_init == true) {
			console.warn("RootMovement is already initialized, using the existing root.")
			return ROOT_binds
		}
		ROOT_move_init = true
		ROOT_binds = new rE_KeyMap(rE_ROOT.MESH, this.CAMERA)
		
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