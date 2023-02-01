import { lerp } from 'three/src/math/MathUtils'
import { WalkSpeed, CameraControls } from './rE_Root'
import { lookVector, rightVector } from '../threeShared'

export const InputEvent = {
	w: false,
	a: false,
	s: false,
	d: false,
	f: false
}

export class KeyMap {
	constructor(ROOT, CAMERA) {
		this.ROOT = ROOT
		this.CAMERA = CAMERA
	}

	update() {
		// Root Mover
		if (InputEvent.w) {
			this.ROOT.position.lerp(lookVector(this.CAMERA,3),.1)
			if (CameraControls !== undefined) {
				CameraControls.target = this.ROOT.position
			}
		}
		if (InputEvent.a) {
			const c_rv = rightVector(this.CAMERA, this.ROOT.scale.x/2)
			const s = this.ROOT.position
			this.ROOT.position.x = lerp(s.x,s.x+c_rv.x+.1/WalkSpeed,.1)
			this.ROOT.position.z = lerp(s.z,s.z-c_rv.z+.1/WalkSpeed,.1)
		}
		if (InputEvent.s) {
			const c_lv = lookVector(this.CAMERA, this.ROOT.scale.z/2)
			const s = this.ROOT.position
			this.ROOT.position.x = lerp(s.x,s.x+c_lv.x-.1/WalkSpeed,.1)
			this.ROOT.position.z = lerp(s.z,s.z+c_lv.z-.1/WalkSpeed,.1)
		}
		if (InputEvent.d) {

		}
		if (InputEvent.f) {
			console.log("f!")
		}
		// --
	}
}