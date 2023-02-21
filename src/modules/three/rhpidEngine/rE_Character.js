import {
	BoxGeometry,
	MeshPhongMaterial,
	Mesh,
	Vector3,
    Euler,
    Matrix4
} from 'three'
import { rE_COLOR_Inst_DEF, rE_ROOT } from './rE_Root'

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

// C0 and C1 in this system are referencing to "Connect0" and "Connect1"
export class Union {
	constructor(Part0, Part1, C1 = new Vector3(), C1_EULER = new Euler()) {
		this.Part0 = Part0
		this.Part1 = Part1
		this.C1 = C1
		this.C1_EULER = C1_EULER
	}

	C0(C0_OFFSET = new Vector3(), C0_EULER = new Euler()) {
		this.Part0.updateMatrixWorld()
		this.Part1.updateMatrixWorld()
		
		const [P0_rot, P1_rot] = [new Matrix4(), new Matrix4()]
		const [P0_E, P1_E] = [
			new Euler().setFromRotationMatrix(P0_rot), 
			new Euler().setFromRotationMatrix(P1_rot)
		]
		const CON0 = new Vector3(
			this.Part0.position.x+this.C1.x+C0_OFFSET.x,
			this.Part0.position.y+this.C1.y+C0_OFFSET.y,
			this.Part0.position.z+this.C1.z+C0_OFFSET.z
		).applyQuaternion(this.Part0.quaternion)
		const COU0 = new Euler(
			this.Part0.rotation.x+this.C1_EULER.x+C0_EULER.x,
			this.Part0.rotation.y+this.C1_EULER.y+C0_EULER.y,
			this.Part0.rotation.z+this.C1_EULER.z+C0_EULER.z
		)
		this.Part1.position.set(CON0.x,CON0.y,CON0.z)
		this.Part1.rotation.set(COU0.x,COU0.y,COU0.z)
	
		console.log(P0_E)

		return [CON0, COU0]
	}
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