import { Vector3 } from 'three'
import { WalkSpeed, CameraControls } from './rE_Root'

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
			const dir = new Vector3(this.ROOT.position.x,0,this.ROOT.position.z)
			dir.sub(this.CAMERA.position).normalize()
			this.ROOT.position.x += (WalkSpeed/500)*dir.x
			this.ROOT.position.z += (WalkSpeed/500)*dir.z
		}
		if (InputEvent.a) {
			const dir = new Vector3(this.ROOT.position.x,0,this.ROOT.position.z)
			dir.sub(this.CAMERA.position).normalize()
			this.ROOT.position.x += (WalkSpeed/500)*dir.x
		}
		if (InputEvent.s) {
			const dir = new Vector3(this.ROOT.position.x,0,this.ROOT.position.z)
			dir.sub(this.CAMERA.position).normalize()
			this.ROOT.position.x -= (WalkSpeed/500)*dir.x
			this.ROOT.position.z -= (WalkSpeed/500)*dir.z
		}
		if (InputEvent.d) {
			const dir = new Vector3(this.ROOT.position.x,0,this.ROOT.position.z)
			dir.sub(this.CAMERA.position).normalize().applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x -= (WalkSpeed/500)*dir.x
		}
		if (InputEvent[' ']) {
			console.log("Space Pressed")
		}

		if (CameraControls !== undefined) {
			CameraControls.update()
		}
		// --
	}
}