import * as Root from './rE_Root'
import { Vector3 } from 'three'
import { lerp } from 'three/src/math/MathUtils'

/*
	Engine level movement, not recommended to bind anything else but movement to here;
	The keys are captured with variable FPS, binding events for single click would be difficult.
*/
export const InputEvent = {
	w: false,
	a: false,
	s: false,
	d: false,
	' ': false
}

export class KeyMap {
	constructor(ROOT, CAMERA) {
		this.ROOT = ROOT
		this.CAMERA = CAMERA
	}

	update() {
		// Root Mover
		if (InputEvent.w) {
			const lookV = new Vector3(0,0,-1).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.lerp(this.ROOT.position.add(lookV),.1)

			if (Root.CameraControls !== undefined) {
				Root.CameraControls.target = this.ROOT.position
			}
		}
		if (InputEvent.a) {
			
		}
		if (InputEvent.s) {
			
		}
		if (InputEvent.d) {

		}
		if (InputEvent[' ']) {
			console.log("Space Pressed")
		}
		// --
	}
}