import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const GLTF_Loader = new GLTFLoader()

export class CreateImport {
    constructor(SCENE) {
        this.SCENE = SCENE
    }
    
    async GLTF(GLTF_FILE) {
        const Asset = new Promise((resolve, _) => {
            GLTF_Loader.load(GLTF_FILE, (gltf_obj) => {
                this.SCENE.add(gltf_obj.scene)
                resolve(gltf_obj)
            })
        })
        Asset.catch((reason) => console.error(reason))
        return Asset
    }
}