import * as THREE from 'three'

export let Root = null
export let WalkSpeed = 35

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
			const Root_Mesh = new THREE.Mesh(Root_Geometry, Material)

			Root = Root_Mesh
			Root.position.y = 10
			this.SCENE.add(Root)
			return Root
		}
		console.warn("Root is already created on the engine level, Skipping. \n Root creation is traced to \"class RootObject.\"")
		return Root
	}
}

export class RootMovement {
	constructor(ROOT) {
		this.ROOT = ROOT
	}
	
	KeyMap = {
		KeyDown: {
			w: () => {
				
			},
			a: () => {

			},
			s: () => {

			},
			d: () => {

			}
		},
		KeyUp: {

		}
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