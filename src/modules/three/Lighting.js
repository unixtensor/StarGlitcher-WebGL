import * as THREE from 'three'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

function s_Circuit(EXPECTED, DEFAULT) {
    return EXPECTED === undefined ? DEFAULT : EXPECTED
}

export class LightEngine {
	constructor(SCENE) {
		this.SCENE = SCENE
	}

	Create(DATA_PROPS = {}) {
		// Property structure as shown and its defaults:
		const PROPS = {
			Ambient: {
				Color: s_Circuit(DATA_PROPS.AmbientColor, 0xffffff),
				Intensity: s_Circuit(DATA_PROPS.Intensity, .8)
			}
		}

		const AmbientLight = new THREE.AmbientLight(PROPS.Color, PROPS.Intensity)
		// const DirectionalLight = new THREE.DirectionalLight(0xffffff, .5)
		// DirectionalLight.position.set(50,300,50)
		// DirectionalLight.castShadow = true
		// DirectionalLight.shadow.camera.top = 50
		// DirectionalLight.shadow.camera.bottom = -50
		// DirectionalLight.shadow.camera.left = 50
		// DirectionalLight.shadow.camera.right = -50

		this.SCENE.add(
			AmbientLight,
			// DirectionalLight,
			// new THREE.DirectionalLightHelper(DirectionalLight, 3),
			// new THREE.CameraHelper(DirectionalLight.shadow.camera),
		)
		return {
			
		}
	}
}