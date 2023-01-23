import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const GLTF_Importer = new GLTFLoader()

export class GLTF {
	constructor(SCENE, GLTF_FILE) {
		this.SCENE = SCENE
		this.GLTF_FILE = GLTF_FILE
	}

	Object(COLOR) {
		let gltf_Mesh
		let gltf_Obj

		GLTF_Importer.load(this.GLTF_FILE, (gltf_obj) => {
			const Material = new THREE.MeshStandardMaterial({color: COLOR})
			gltf_Mesh = gltf_obj.scene
			gltf_Mesh.traverse((obj) => {
				gltf_Obj = obj
				if (obj.isMesh) {
					obj.material = Material
				}
			})
			this.SCENE.add(gltf_Mesh)
		})
		return {
			gltf_Mesh: gltf_Mesh,
			gltf_Obj: gltf_Obj
		}
	}
}