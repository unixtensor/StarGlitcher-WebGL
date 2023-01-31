import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { KeyMap } from './rE_RootGo'

export const __rhpidEngine_Version = "dev0.1"
export let Root = null
export let CameraControls = null

export let start_Origin = 10
export let WalkSpeed = 35

let ROOT_move_init = false

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
			if (Root != null) {
				this.CAMERA.position.set(Root.position.x,Root.position.y,Root.position.z)
			} else {
				Camera.position.set(-20.4, 4.7, 0.1)
			}
		}
		return CameraControls
	}
 
	ApplyMovement() {
		if (ROOT_move_init == true) {
			console.warn("RootMovement is already initialized, using the existing root.")
			return
		}
		ROOT_move_init = true
		const Binds = new KeyMap(Root, this.CAMERA)
		
		document.addEventListener("keydown", (ev) => {
			const f = Binds.Bindings[ev.key.toLowerCase()]
			if (f) f()
		})
		document.addEventListener("keyup", (ev) => {
			const f = Binds.Bindings[ev.key.toLowerCase()]
			if (f) f()	
		})
	}
}