import * as Root from './rE_Root'
import { Vector3 } from 'three'

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
		 	const lv = new Vector3().lerp(this.ROOT.position.add(new Vector3(0,0,-1).applyQuaternion(this.CAMERA.quaternion)),.1)
		 	console.log(lv)
		}
		if (InputEvent.a) {
			this.ROOT.position.lerp(this.ROOT.position.add(new Vector3(-1,0,0).applyQuaternion(this.CAMERA.quaternion)),.1)
		}
		if (InputEvent.s) {
			this.ROOT.position.lerp(this.ROOT.position.sub(new Vector3(0,0,-1).applyQuaternion(this.CAMERA.quaternion)),.1)
		}
		if (InputEvent.d) {
			this.ROOT.position.lerp(this.ROOT.position.sub(new Vector3(-1,0,0).applyQuaternion(this.CAMERA.quaternion)),.1)
		}
		if (InputEvent[' ']) {
			console.log("Space Pressed")
		}
		// --
	}
}