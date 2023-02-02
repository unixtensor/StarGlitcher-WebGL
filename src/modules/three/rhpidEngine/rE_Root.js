import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { KeyMap, InputEvent } from './rE_Bind'

export const __rhpidEngine_Version = "dev0.1"
export let Root = null
export let CameraControls = null

export let start_Origin = 10
export let WalkSpeed = 35

let ROOT_move_init = false
let ROOT_binds = null

export class RootPlayer {
	constructor(SCENE, CAMERA, RENDER) {
		this.SCENE = SCENE
		this.CAMERA = CAMERA
		this.RENDER = RENDER
	}

	Create(start_Origin, Wireframe) {
		if (Root == null) {
			const Root_Geometry = new THREE.BoxGeometry(1.3,3,3)
			const Material      = new THREE.MeshStandardMaterial({
				color: 0xa3a2a5, 
				wireframe: Wireframe === undefined ? false : Wireframe
			})
			Root = new THREE.Mesh(Root_Geometry, Material)
			Root.position.y = start_Origin === undefined ? 10 : start_Origin
			this.SCENE.add(Root)

			return Root
		}
		console.warn("Root is already created on the engine level, Skipping. \n Root creation is traced to \"class RootObject.\"")
		return Root
	}

	Camera() {
		if (CameraControls == null) {
			CameraControls = new OrbitControls(this.CAMERA, this.RENDER.domElement)
			CameraControls.enablePan   = false
			CameraControls.maxDistance = 200
			CameraControls.minDistance = 5
			CameraControls.target = Root === undefined ? new THREE.Vector3() : Root.position
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
			if (f !== undefined && f == false) {
				InputEvent[k] = true
			}
		}, false)
		document.addEventListener("keyup", (ev) => {
			const k = ev.key.toLowerCase()
			const f = InputEvent[k]
			if (f !== undefined) {
				InputEvent[k] = false
			}
		}, false)
		return ROOT_binds
	}
}