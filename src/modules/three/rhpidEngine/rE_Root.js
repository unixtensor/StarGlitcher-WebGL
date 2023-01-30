import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export const CameraControls = new OrbitControls(Camera, WebGL_Renderer.domElement)
CameraControls.enablePan    = false
CameraControls.maxDistance  = 200
CameraControls.minDistance  = 5

export const __rhpidEngine_Version = "dev0.1"
export let Root = null
export let WalkSpeed = 35

let ROOT_init = false

export class RootObject {
	constructor(SCENE) {
		this.SCENE = SCENE
	}

	Create(Wireframe) {
		if (Root == null) {
			const Root_Geometry = new THREE.BoxGeometry(1.3,3,3)
			const Material      = new THREE.MeshStandardMaterial({
				color: 0xa3a2a5, 
				wireframe: Wireframe === undefined ? false : Wireframe
			})
			Root = new THREE.Mesh(Root_Geometry, Material)
			this.SCENE.add(Root)
			return Root
		}
		console.warn("Root is already created on the engine level, Skipping. \n Root creation is traced to \"class RootObject.\"")
		return Root
	}
}

export class RootMovement {
	constructor(ROOT) {
		if (ROOT_init == true) {
			console.warn("RootMovement is already initialized, using the existing root.")
			return
		}
		ROOT_init = true
		this.KeyMap = {
			KeyDown: {
				w: () => {
					ROOT.position.z+=1
				},
				a: () => {

				},
				s: () => {

				},
				d: () => {

				},
				" ": () => {

				}
			},
			KeyUp: {

			}
		}
		document.addEventListener("keydown", (ev) => {
			const f = this.KeyMap.KeyDown[ev.key.toLowerCase()]
			if (f) f()
		})
		document.addEventListener("keyup", (ev) => {
			const f = this.KeyMap.KeyUp[ev.key.toLowerCase()]
			if (f) f()	
		})
	}

	// Properties
	WalkSpeed = 35
	// -----

	
}

// document.addEventListener("keydown", (ev) => {
// 	const Bind = KeyMap.KeyDown[ev.key]
// 	if (Bind) Bind()
// })

// document.addEventListener("keyup", (ev) => {
	
// })