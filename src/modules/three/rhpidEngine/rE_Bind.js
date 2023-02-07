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
export let Control_IgnoreY = true

export class KeyMap {
	constructor(ROOT, CAMERA) {
		this.ROOT = ROOT
		this.CAMERA = CAMERA
	}

	update() {
		// Root Mover
		if (InputEvent.w) {
			const lookVector = new Vector3(0,0,-.1).applyQuaternion(this.CAMERA.quaternion)
			const ROOT_ObjS = new Vector3()
			const CAM_ObjS = new Vector3()
			this.ROOT.getWorldPosition(ROOT_ObjS)
			this.CAMERA.getWorldPosition(CAM_ObjS)

			this.CAMERA.position.set(this.CAMERA.position.x-this.ROOT.position.x, this.ROOT.position.y-this.CAMERA.position.y, this.CAMERA.position.z-this.ROOT.position.z)
			this.ROOT.position.x += lookVector.x
			this.ROOT.position.z += lookVector.z

			if (!Control_IgnoreY)
				this.ROOT.position.y += lookVector.y
		}
		if (InputEvent.a) {
			const rightVector = new Vector3(-.1,0.0).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x += rightVector.x
			this.ROOT.position.z += rightVector.z

			if (!Control_IgnoreY)
				this.ROOT.position.y += rightVector.y
		}
		if (InputEvent.s) {
			const lookVector = new Vector3(0,0,-.1).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x -= lookVector.x
			this.ROOT.position.z -= lookVector.z

			if (!Control_IgnoreY)
				this.ROOT.position.y -= lookVector.y
		}
		if (InputEvent.d) {
			const rightVector = new Vector3(-.1,0.0).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x -= rightVector.x
			this.ROOT.position.z -= rightVector.z

			if (!Control_IgnoreY)
				this.ROOT.position.y -= rightVector.y
		}
		if (InputEvent[' ']) {
			console.log("Space Pressed")
		}
		// --

		if (CameraControls != null) {
			CameraControls.update()
		}
	}
}