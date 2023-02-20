import { MeshPhongMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Union, CharacterMesh } from "./rhpidEngine/rE_Character"

const GLTF_Loader = new GLTFLoader()

export const WingAssets = {
    Left: [],
    Right: [],
    Ring: null,
    Union: {
        RingC0: null,
        WingLC01: null, WingLC02: null, WingLC03: null,
        WingRC01: null, WingRC02: null, WingRC02: null
    },
}

async function GLTF(GLTF_FILE) {
    return new Promise((resolve, _) => GLTF_Loader.load(GLTF_FILE, (gltf_obj) => resolve(gltf_obj))).catch((reason) => console.error(reason))
}

async function CreateWing(Color = 0xffffff, LeftSided) {
    const WingGLTF = await GLTF('/3D/Wing.gltf')
    const Side = LeftSided && WingAssets.Left || WingAssets.Right
    let WingObject = null

    WingGLTF.scene.traverse((Object) => {
        if (Object.isMesh) {
            Object.material = new MeshPhongMaterial({color: Color})
            Object.castShadow = true
            Object.receiveShadow = true
            WingObject = Object
        }
    })
    Side.push(WingObject)
    return WingObject
}

async function CreateRing(Color = 0xffffff) {
    const RingGLTF = await GLTF('/3D/Ring.gltf')
    let RingObject = null

    RingGLTF.scene.traverse((Object) => {
        if (Object.isMesh) {
            Object.material = new MeshPhongMaterial({color: Color})
            Object.castShadow = true
            Object.receiveShadow = true
            RingObject = Object
        }
    })
    return RingObject
}

export class Wings {
    async GlitcherWings() {
        WingAssets.Ring = await CreateRing(0xff0000)
        WingAssets.Left.push(await CreateRing(0xff0000, true))
        WingAssets.Left.push(await CreateRing(0xff0000, true))
        WingAssets.Left.push(await CreateRing(0xff0000, true))
        WingAssets.Right.push(await CreateRing(0xff0000))
        WingAssets.Right.push(await CreateRing(0xff0000))
        WingAssets.Right.push(await CreateRing(0xff0000))
    
       // WingAssets.Ring.rotation.x = Math.PI/2
        WingAssets.Ring.scale.set(3,3,3)
        WingAssets.Union.RingC0 = new Union(CharacterMesh.Torso, WingAssets.Ring)
        
        return [WingAssets.Ring, ...WingAssets.Left, ...WingAssets.Right]
    }

    Wing_Unions_update() {
        if (WingAssets.Union.RingC0 != null)
           WingAssets.Union.RingC0.C0()
    }
}