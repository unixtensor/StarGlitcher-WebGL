import { Euler, Vector3 } from 'three'
import { CharacterMesh } from './rhpidEngine/rE_Character'
import { WingAssets } from './Wings'

const Joints = CharacterMesh.RIG_Joints
const WingJoints = WingAssets.Union

const rad = (x) => x*Math.PI/180
const vlerp = (Vector, Alpha) => new Vector3().lerp(Vector, Alpha)
// :(
// const elerp = (Euler_v, Alpha) => new Euler().lerp(Euler_v, Alpha)

const AnimationTypes = (_this) => {
	return {
		Mayhem: {
			Idle: () => {

			}
		}
	}
}

const WingDelta = 850

const Animations = class {
	constructor(deltaTime, delta) {
		this.deltaTime = deltaTime
		this.delta = delta
	}

	Rig(Mode) {
		return AnimationTypes(this)[Mode]
	}

	Wings() {
		const V = new Vector3(2*Math.cos(this.delta/WingDelta)-2, -Math.cos(this.delta/WingDelta)*1.8,0)

		WingJoints.WingLC03.C0(vlerp(V,.8), new Euler(rad((15*Math.cos(this.delta/WingDelta)-20)-10), rad(15*Math.cos(this.delta/WingDelta)-15), rad(-15*Math.cos(this.delta/WingDelta))))
		
		WingJoints.WingLC02.C0(vlerp(V,.4), new Euler(rad((5*Math.cos(this.delta/WingDelta)-10)-5), rad(15*Math.cos(this.delta/WingDelta)-15), rad(-15*Math.cos(this.delta/WingDelta))))

		WingJoints.WingLC01.C0(vlerp(V,.2), new Euler(rad((3*Math.cos(this.delta/WingDelta)-8)-3), rad(15*Math.cos(this.delta/WingDelta)-15), rad(-15*Math.cos(this.delta/WingDelta))))

		WingJoints.WingRC03.C0(vlerp(V,.8), new Euler(rad((15*Math.cos(this.delta/WingDelta)-20)-10), rad(15*Math.cos(this.delta/WingDelta)-15), rad(15*Math.cos(this.delta/WingDelta))))

		WingJoints.WingRC02.C0(vlerp(V,.4))

		WingJoints.WingRC01.C0(vlerp(V,.2))
	}
}

export {
	Animations
}