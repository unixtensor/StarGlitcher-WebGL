import { Euler, MeshPhongMaterial, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { CharacterMesh } from "./rhpidEngine/rE_Character"
import { Union } from './rhpidEngine/rE_Instances'

const s_Circuit = (EXPECTED, DEFAULT) => EXPECTED === undefined ? DEFAULT : EXPECTED
const rad = (x) => x*Math.PI/180

const GLTF_Loader = new GLTFLoader()
const GLTF_cache = {
    Wing: null, 
    Ring: null,
    Ring2: null, 
    Tornado: null,
}

const WingAssets = {
    Left: [],
    Right: [],
    Ring: null,
    Union: {
        RingC0: null,
        WingLC01: null, WingLC02: null, WingLC03: null,
        WingRC01: null, WingRC02: null, WingRC03: null
    },
}

//hi
const GLTF = async (GLTF_FILE) => new Promise((resolve, _) => GLTF_Loader.load(GLTF_FILE, (gltf_obj) => resolve(gltf_obj))).catch((reason) => console.error(reason))

const load_into_gltf_cache = async (cache_req_type, gltf_path) => {
    if (GLTF_cache[cache_req_type] == null) {
        const GLTF_to_three = await GLTF(gltf_path)

        GLTF_to_three.scene.traverse((g_data) => {
            if (g_data.isMesh) {
                g_data.castShadow = true
                g_data.receiveShadow = true
                GLTF_cache[cache_req_type] = g_data
            }
        })
    }
}

const CreateWing = async (Color = 0xffffff, LeftSided) => {
    await load_into_gltf_cache("Wing", "../../../public/3D/Wing.gltf")

    const WingObject = GLTF_cache.Wing.clone()
    WingObject.material = new MeshPhongMaterial({color: Color})

    const Side = LeftSided && WingAssets.Left || WingAssets.Right
    Side.push(WingObject)

    return WingObject
}

const CreateRing = async (Color = 0xfffff) => {
    await load_into_gltf_cache("Ring", "../../../public/3D/Ring.gltf")

    const RingObject = GLTF_cache.Ring.clone()
    RingObject.material = new MeshPhongMaterial({color: Color})

    WingAssets.Ring = RingObject
    return RingObject
}

const Wings = class {
    async GlitcherWings(Wing_start_Colors) {
        const pre_Color = s_Circuit(Wing_start_Colors, 0xff0000)

        await CreateRing(pre_Color)
        await CreateWing(pre_Color, true)
        await CreateWing(pre_Color, true)
        await CreateWing(pre_Color, true)
        await CreateWing(pre_Color)
        await CreateWing(pre_Color)
        await CreateWing(pre_Color)

        WingAssets.Ring.scale.set(3,1,3)

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

export {
    Wings,
    WingAssets
}