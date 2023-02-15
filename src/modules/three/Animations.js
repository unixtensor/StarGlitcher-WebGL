import { CharacterMesh } from './rhpidEngine/rE_Character'
import { Vector3 } from 'three'

const Joints = CharacterMesh.RIG_Joints
const rad = (x) => x*Math.PI/180

export const Animations = {
	Idle: (dt) => {
		Joints.RJ.C0(new Vector3(0,Math.cos(dt/100),0))
	}
}