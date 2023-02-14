import { Vector3 } from 'three'
import { Physics_PROPERTIES } from './rE_Physics'
import { rE_ROOT, rE_CameraControls } from './rE_Root'

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
		if (InputEvent.w) {
			const FORWARD_Direction = new Vector3(0,0,-(Math.abs(Math.min(rE_ROOT.PROPERTIES.WalkSpeed,100)))).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x += FORWARD_Direction.x*deltaTime
			this.ROOT.position.z += FORWARD_Direction.z*deltaTime
			if (!Control_IgnoreY)
				this.ROOT.position.y += FORWARD_Direction.y*deltaTime
		}
		if (InputEvent.a) {
			const RIGHT_Direction = new Vector3(-(Math.abs(Math.min(rE_ROOT.PROPERTIES.WalkSpeed,100))),0).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x += RIGHT_Direction.x*deltaTime
			this.ROOT.position.z += RIGHT_Direction.z*deltaTime
			if (!Control_IgnoreY)
				this.ROOT.position.y += RIGHT_Direction.y*deltaTime
		}
		if (InputEvent.s) {
			const FORWARD_Direction = new Vector3(0,0,-(Math.abs(Math.min(rE_ROOT.PROPERTIES.WalkSpeed,100)))).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x -= FORWARD_Direction.x*deltaTime
			this.ROOT.position.z -= FORWARD_Direction.z*deltaTime
			if (!Control_IgnoreY)
				this.ROOT.position.y -= FORWARD_Direction.y*deltaTime
		}
		if (InputEvent.d) {
			const RIGHT_Direction = new Vector3(-(Math.abs(Math.min(rE_ROOT.PROPERTIES.WalkSpeed,100))),0,0).applyQuaternion(this.CAMERA.quaternion)
			this.ROOT.position.x -= RIGHT_Direction.x*deltaTime
			this.ROOT.position.z -= RIGHT_Direction.z*deltaTime
			if (!Control_IgnoreY)
				this.ROOT.position.y -= RIGHT_Direction.y*deltaTime
		}
		if (InputEvent[' '] && Control_IgnoreY) {
			// const [JumpHeight, HipHeight, Gravity] = [rE_ROOT.PROPERTIES.JumpHeight, rE_ROOT.PROPERTIES.HipHeight, Physics_PROPERTIES.Gravity]
			// const MAX_PHYS_Height = JumpHeight*JumpHeight/Gravity
			// const MIN_PHYS_Height = Math.log(JumpHeight)/Math.log(JumpHeight)
			
			// const FrameTime = 60
			// let JU_i = 0
			// const JumpY = async (i) => setTimeout(() => this.ROOT.position.y = this.ROOT.position.y*(1-.1)+(HipHeight+i/FrameTime)*.1, Gravity*i)

			// do {
			// 	JumpY(JU_i)
			// 	JU_i++
			// } while (JU_i<=MAX_PHYS_Height*FrameTime)
			// do {
			// 	JumpY(JU_i)
			// 	JU_i--			
			// } while (JU_i>=MIN_PHYS_Height)
		}
		// --

		if (rE_CameraControls != null)
			rE_CameraControls.update()
	}
}