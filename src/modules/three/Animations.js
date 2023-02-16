import { CharacterMesh } from './rhpidEngine/rE_Character'
import { Euler, Vector3 } from 'three'

const Joints = CharacterMesh.RIG_Joints
const rad = (x) => x*Math.PI/180
const vlerp = (Vector, Alpha) => new Vector3().lerp(Vector, Alpha)

export const Animations = {
	Idle: (dt) => {
		// Joints.RS.C0(vlerp(new Vector3(0,Math.sin(dt/1e3),0), .5), new Euler(rad(5*Math.sin(dt/1e3)),0,0))
		// Joints.LS.C0(vlerp(new Vector3(0,Math.sin(dt/1e3),0), .5), new Euler(rad(-5*Math.sin(dt/1e3)),0,0))
	}
}