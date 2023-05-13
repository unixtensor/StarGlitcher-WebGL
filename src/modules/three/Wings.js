import { Euler, MeshPhongMaterial, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { CharacterMesh } from "./rhpidEngine/rE_Character"
import { Union } from './rhpidEngine/rE_Instances'

const GLTF_Loader = new GLTFLoader()

const s_Circuit = (EXPECTED, DEFAULT) => EXPECTED === undefined ? DEFAULT : EXPECTED
const rad = (x) => x*Math.PI/180

export const WingAssets = {
    Left: [],
    Right: [],
    Ring: null,
    Union: {
        RingC0: null,
        WingLC01: null, WingLC02: null, WingLC03: null,
        WingRC01: null, WingRC02: null, WingRC03: null
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
    WingAssets.Ring = RingObject
    return RingObject
}

export class Wings {
    async GlitcherWings(Wing_start_Colors) {
        const pre_Color = s_Circuit(Wing_start_Colors, 0xff0000)

        await CreateRing(pre_Color)
        await CreateWing(pre_Color, true)
        await CreateWing(pre_Color, true)
        await CreateWing(pre_Color, true)
        await CreateWing(pre_Color)
        await CreateWing(pre_Color)
        await CreateWing(pre_Color)

        WingAssets.Ring.scale.set(3,3,3)

        WingAssets.Union.RingC0 = new Union(CharacterMesh.Torso, WingAssets.Ring, new Vector3(-1.5,1,0), new Euler(0,0,rad(90)))
        WingAssets.Union.WingLC01 = new Union(WingAssets.Ring, WingAssets.Left[0], new Vector3(0,0,2.7), new Euler(rad(90),0,0))
        WingAssets.Union.WingLC02 = new Union(WingAssets.Ring, WingAssets.Left[1], new Vector3(0,0,4.7), new Euler(rad(90),0,0))
        WingAssets.Union.WingLC03 = new Union(WingAssets.Ring, WingAssets.Left[2], new Vector3(0,0,6.7), new Euler(rad(90),0,0))
        WingAssets.Union.WingRC01 = new Union(WingAssets.Ring, WingAssets.Right[0], new Vector3(0,0,-2.7), new Euler(rad(90),0,0))
        WingAssets.Union.WingRC02 = new Union(WingAssets.Ring, WingAssets.Right[1], new Vector3(0,0,-4.7), new Euler(rad(90),0,0))
        WingAssets.Union.WingRC03 = new Union(WingAssets.Ring, WingAssets.Right[2], new Vector3(0,0,-6.7), new Euler(rad(90),0,0))

        return [WingAssets.Ring, ...WingAssets.Left, ...WingAssets.Right]
    }

    Wing_Unions_update() {
        if (WingAssets.Union.RingC0 != null) {
            WingAssets.Union.RingC0.C0()
            WingAssets.Union.WingLC01.C0()
            WingAssets.Union.WingLC02.C0()
            WingAssets.Union.WingLC03.C0()
            WingAssets.Union.WingRC01.C0()
            WingAssets.Union.WingRC02.C0()
            WingAssets.Union.WingRC03.C0()
        } 
    }
}