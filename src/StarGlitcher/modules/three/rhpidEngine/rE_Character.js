import {
	BoxGeometry,
	MeshPhongMaterial,
	Mesh,
	Vector3,
    Euler,
    // Matrix4
} from 'three'
import { rE_COLOR_Inst_DEF, rE_ROOT } from './rE_Root'
import { Union } from './rE_Instances'

export const CharacterMesh = {
	Head: null,
	Torso: null,
	LeftArm: null,
	RightArm: null,
	LeftLeg: null,
	RightLeg: null,

	RIG_Joints: {
		RJ: null, NK: null,
		LS: null, RS: null,
		LH: null, RH: null
	}
}

const s_Circuit = (EXPECTED, DEFAULT) => EXPECTED === undefined ? DEFAULT : EXPECTED

function CreateLimb(Geometry, Color) {
	const Limb_Geometry = new BoxGeometry(...Geometry)
	const Limb_Material = new MeshPhongMaterial({color: Color})
	const Limb_Mesh = new Mesh(Limb_Geometry, Limb_Material)
	Limb_Mesh.castShadow = true
	Limb_Mesh.receiveShadow = true

	return Limb_Mesh
}

export class CharacterRig {
	Create(RIG_COLORS = {}) {
		if (CharacterMesh.Torso != null) {
			console.warn("Character is already initialized.")
			return CharacterMesh.Torso
		}
		const DEF_RIG_COLORS = {
			Head: s_Circuit(RIG_COLORS.Head, rE_COLOR_Inst_DEF),
			Torso: s_Circuit(RIG_COLORS.Torso, rE_COLOR_Inst_DEF),
			LeftArm: s_Circuit(RIG_COLORS.LeftArm, rE_COLOR_Inst_DEF),
			RightArm: s_Circuit(RIG_COLORS.RightArm, rE_COLOR_Inst_DEF),
			LeftLeg: s_Circuit(RIG_COLORS.LeftLeg, rE_COLOR_Inst_DEF),
			RightLeg: s_Circuit(RIG_COLORS.RightLeg, rE_COLOR_Inst_DEF)
		}

		CharacterMesh.Head = CreateLimb([2,1.8,3/1.5], DEF_RIG_COLORS.Head)
		CharacterMesh.Torso = CreateLimb([1.3,3,3], DEF_RIG_COLORS.Torso)
		CharacterMesh.LeftLeg = CreateLimb([1.3,3,3/2], DEF_RIG_COLORS.LeftLeg)
		CharacterMesh.RightLeg = CreateLimb([1.3,3,3/2], DEF_RIG_COLORS.RightLeg)
		CharacterMesh.LeftArm = CreateLimb([1.3,3,3/2], DEF_RIG_COLORS.LeftArm)
		CharacterMesh.RightArm = CreateLimb([1.3,3,3/2], DEF_RIG_COLORS.RightArm)

		CharacterMesh.RIG_Joints.RJ = new Union(rE_ROOT.MESH, CharacterMesh.Torso)
		CharacterMesh.RIG_Joints.NK = new Union(CharacterMesh.Torso, CharacterMesh.Head, new Vector3(0,2.4,0))
		CharacterMesh.RIG_Joints.LS = new Union(CharacterMesh.Torso, CharacterMesh.LeftArm, new Vector3(0,0,2.2))
		CharacterMesh.RIG_Joints.RS = new Union(CharacterMesh.Torso, CharacterMesh.RightArm, new Vector3(0,0,-2.2))
		CharacterMesh.RIG_Joints.LH = new Union(CharacterMesh.Torso, CharacterMesh.LeftLeg, new Vector3(0,-3,.7))
		CharacterMesh.RIG_Joints.RH = new Union(CharacterMesh.Torso, CharacterMesh.RightLeg, new Vector3(0,-3,-.7))

		return {Limbs: [CharacterMesh.Head, CharacterMesh.Torso, CharacterMesh.LeftLeg, CharacterMesh.RightLeg, CharacterMesh.LeftArm, CharacterMesh.RightArm]}
	}

	Joints_update() {
		if (CharacterMesh.Torso != null) {
			CharacterMesh.RIG_Joints.NK.C0()
			CharacterMesh.RIG_Joints.LS.C0()
			CharacterMesh.RIG_Joints.RS.C0()
			CharacterMesh.RIG_Joints.LH.C0()
			CharacterMesh.RIG_Joints.RH.C0()
			CharacterMesh.RIG_Joints.RJ.C0()
		} else {
			console.warn("A character must be initialized before calling \"Joints_update()\".")
		}
	}
}