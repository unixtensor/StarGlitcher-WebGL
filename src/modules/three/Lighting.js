import * as THREE from 'three'

function s_Circuit(EXPECTED, DEFAULT) {
    return EXPECTED === undefined ? DEFAULT : EXPECTED
}

export class LightEngine {h
	constructor(SCENE) {
		this.SCENE = SCENE
	}

	Create(DATA_PROPS) {
		// Property structure as shown and its defaults:
		const PROPS = {
			Ambient: {
				Color: s_Circuit(DATA_PROPS.AmbientColor, 0x404040),
				Intensity: s_Circuit(DATA_PROPS.Intensity, .5)
			}
		}

		const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5)
		const DirectionalLight = new THREE.DirectionalLight(0xffffff, .5)
		DirectionalLight.position.set(50,300,50)
		DirectionalLight.castShadow = true
		DirectionalLight.shadow.camera.top = 50
		DirectionalLight.shadow.camera.bottom = -50
		DirectionalLight.shadow.camera.left = 50
		DirectionalLight.shadow.camera.right = -50
		//DirectionalLight.shadow.bias = 1e-7
		DirectionalLight.shadow.camera.near = 50
		//DirectionalLight.shadow.camera.far = 100

		this.SCENE.add(
			AmbientLight,
			DirectionalLight,
			new THREE.DirectionalLightHelper(DirectionalLight, 3),
			new THREE.CameraHelper(DirectionalLight.shadow.camera)
		)
	}
}