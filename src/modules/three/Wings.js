import { MeshPhongMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Union } from "./rhpidEngine/rE_Character"

const GLTF_Loader = new GLTFLoader()

export const Assets = {
    WingsLeft: [],
    WingsRight: [],
    Ring: null
}

async function GLTF(GLTF_FILE) {
    const Asset = new Promise((resolve, _) => GLTF_Loader.load(GLTF_FILE, (gltf_obj) => resolve(gltf_obj)))
    Asset.catch((reason) => console.error(reason))
    return Asset
}

export class Wings {
	async CreateWing(Color = 0xffffff, LeftSided) {
	    const WingGLTF = await GLTF('/public/3D/Wing.gltf')
	    const Side = LeftSided && Assets.WingsLeft || Assets.WingsRight
	    let WingObject = null

	    WingGLTF.scene.traverse((Object) => {
	        if (Object.isMesh) {
	            Object.material = new MeshPhongMaterial({color: Color})
	            Object.castShadow = true
	            Object.receiveShadow = true
	            Object.position.z = LeftSided && -Side.length-1.7 || Side.length+1.7
	            WingObject = Object
	        }
	    })
	    Side.push(WingGLTF.scene)
	    return {
	        GLTF: WingGLTF,
	        Object: WingObject
	    }
	}

	async CreateRing(Color = 0xffffff) {
	    const RingGLTF = await GLTF('/public/3D/Ring.gltf')
	    let RingObject = null

	    RingGLTF.scene.traverse((Object) => {
	        if (Object.isMesh) {
	            Object.material = new MeshPhongMaterial({color: Color})
	            Object.castShadow = true
	            Object.receiveShadow = true
	            RingObject = Object
	        }
	    })
	    Assets.Ring = RingGLTF.scene
	    return {
	        GLTF: RingGLTF,
	        Object: RingObject
	    }
	}
}

export async function GlitcherWings() {
	const Ring = await CreateWing(0xff0000)
	CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor, true)
    CreateWing(DEF_ModeColor, true)
    CreateWing(DEF_ModeColor, true)
}