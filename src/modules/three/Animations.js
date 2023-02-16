import { CharacterMesh } from './rhpidEngine/rE_Character'
import { Euler, Vector3 } from 'three'

const Joints = CharacterMesh.RIG_Joints
const rad = (x) => x*Math.PI/180

export const Animations = {
	Idle: (dt) => {
		// Joints.RJ.C0(new Vector3(Math.cos(dt/500),2+Math.sin(dt/500),0))
	}
}