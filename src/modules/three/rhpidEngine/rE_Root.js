import * as THREE from 'three'

export let Root = null

export class RootObject {
	constructor(SCENE, CAMERA) {
		this.SCENE = SCENE
		this.CAMERA = CAMERA
	}
	Create() {
		if (Root == null) {
			const Root_Geometry = new THREE.BoxGeometry(1.3,3,3)
			const Material      = new THREE.MeshStandardMaterial({color: 0xa3a2a5})
			const Root_Mesh     = new THREE.Mesh(Root_Geometry, Material)

			Root_Mesh.position.y = 10
			this.SCENE.add(Root_Mesh)
			return Root
		}
		console.warn("Root is already created on the engine level, Skipping. \n Root creation is traced to \"class RootObject.\"")
		return Root
	}

}