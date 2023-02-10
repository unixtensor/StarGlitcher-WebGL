import { Vector3 } from 'three'
import { Gravity } from './rE_Physics'
import { WalkSpeed, JumpHeight, rE_CameraControls } from './rE_Root'

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

export class rE_KeyMap {
	constructor(ROOT, CAMERA) {
		this.ROOT = ROOT
		this.CAMERA = CAMERA
	}

	update(deltaTime = 1) {
		// Root Mover
		if (InputEvent.w) {
			const lookVector = new Vector3(0,0,-(Math.abs(Math.min(WalkSpeed,100)))).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x += lookVector.x*deltaTime
			this.ROOT.position.z += lookVector.z*deltaTime
			if (!Control_IgnoreY)
				this.ROOT.position.y += lookVector.y*deltaTime
		}
		if (InputEvent.a) {
			const rightVector = new Vector3(-(Math.abs(Math.min(WalkSpeed,100))),0.0).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x += rightVector.x*deltaTime
			this.ROOT.position.z += rightVector.z*deltaTime
			if (!Control_IgnoreY)
				this.ROOT.position.y += rightVector.y*deltaTime
		}
		if (InputEvent.s) {
			const lookVector = new Vector3(0,0,-(Math.abs(Math.min(WalkSpeed,100)))).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x -= lookVector.x*deltaTime
			this.ROOT.position.z -= lookVector.z*deltaTime
			if (!Control_IgnoreY)
				this.ROOT.position.y -= lookVector.y*deltaTime
		}
		if (InputEvent.d) {
			const rightVector = new Vector3(-(Math.abs(Math.min(WalkSpeed,100))),0.0).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x -= rightVector.x*deltaTime
			this.ROOT.position.z -= rightVector.z*deltaTime
			if (!Control_IgnoreY)
				this.ROOT.position.y -= rightVector.y*deltaTime
		}
		if (InputEvent[' '] && Control_IgnoreY) {
			const MAX_PHYS_Height = JumpHeight*JumpHeight/Gravity
			const MIN_PHYS_Height = Math.log(JumpHeight)/Math.log(JumpHeight)

			for (let i = 0; i<=MAX_PHYS_Height; i++) {
				 
			}
			for (let i = 0; i>=MIN_PHYS_Height; i--) {

			}
		}
		// --

		if (rE_CameraControls != null)
			rE_CameraControls.update()
	}
}