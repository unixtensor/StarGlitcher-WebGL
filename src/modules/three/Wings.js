import { MeshPhongMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Union, CharacterMesh } from "./rhpidEngine/rE_Character"

const GLTF_Loader = new GLTFLoader()

export const WingAssets = {
	Left: [],
	Right: [],
	Union: {
		RingC0: null,
		WingLC01: null, WingLC02: null, WingLC03: null,
		WingRC01: null, WingRC02: null, WingRC02: null
	},
    Ring: null
}

export class Wings {
	constructor() {}

	async GlitcherWings() {
		const DEF_ModeColor = 0xff0000
		WingAssets.Ring = await CreateRing(DEF_ModeColor)
		WingAssets.Left.push(CreateWing(DEF_ModeColor))
	    WingAssets.Left.push(CreateWing(DEF_ModeColor))
	    WingAssets.Left.push(CreateWing(DEF_ModeColor))
	    WingAssets.Right.push(CreateWing(DEF_ModeColor, true))
	    WingAssets.Right.push(CreateWing(DEF_ModeColor, true))
	    WingAssets.Right.push(CreateWing(DEF_ModeColor, true))
	
	    WingAssets.Union.RingC0 = new Union(CharacterMesh.Torso, WingAssets.Ring)
	}

	Wing_Unions_update() {
		WingAssets.Union.RingC0.C0()
	}
}

async function GLTF(GLTF_FILE) {
    const Asset = new Promise((resolve, _) => GLTF_Loader.load(GLTF_FILE, (gltf_obj) => resolve(gltf_obj)))
    Asset.catch((reason) => console.error(reason))
    return Asset
}

async function CreateWing(Color = 0xffffff, LeftSided) {
    const WingGLTF = await GLTF('/public/3D/Wing.gltf')
    const Side = LeftSided && WingAssets.Left || WingAssets.Right
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

async function CreateRing(Color = 0xffffff) {
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
    WingAssets.Ring = RingGLTF.scene
    return {
        GLTF: RingGLTF,
        Object: RingObject
    }
}