import { CharacterMesh } from './rhpidEngine/rE_Character'
import { Euler, Vector3 } from 'three'
import { WingAssets } from './Wings'

const Joints = CharacterMesh.RIG_Joints
const WingJoints = WingAssets.Union

const rad = (x) => x*Math.PI/180
const vlerp = (Vector, Alpha) => new Vector3().lerp(Vector, Alpha)

const Animations = class {
	constructor(delta) {
		this.delta = delta
	}

	Rig() {
		return {
			Idle: () => { //Use Arguments!
				//Joints.RJ.C0(vlerp(new Vector3(0,3*Math.cos(delta/1000),0), .5), new Euler(), .5)
			}
		}
	}

	Wings() {
		const Base_cos = vlerp(new Vector3(0,5*Math.cos(this.delta/10),0), .5)
		WingJoints.WingLC03.C0(Base_cos)
		WingJoints.WingLC02.C0(Base_cos.sub(new Vector3(0,1,0)))
		WingJoints.WingLC01.C0(Base_cos.sub(new Vector3(0,1,0)))
		WingJoints.WingRC01.C0(Base_cos)
		WingJoints.WingRC02.C0(Base_cos.add(new Vector3(0,1,0)))
		WingJoints.WingRC03.C0(Base_cos.add(new Vector3(0,1,0)))
		
		console.log(this.delta)
	}
}

export {Animations}