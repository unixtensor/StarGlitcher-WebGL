import {
	BoxGeometry,
	MeshPhongMaterial,
	Mesh,
	Vector3
} from 'three'
import { rE_COLOR_Inst_DEF, rE_Root } from './rE_Root'

export const CharacterMesh = {
	Head: null,
	Root: null,
	LeftArm: null,
	RightArm: null,
	LeftLeg: null,
	RightLeg: null
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

export class Union {
	constructor(Part0, Part1, PC0 = new Vector3(), PC1 = new Vector3()) {
		this.Part0 = Part0
		this.Part1 = Part1
		this.PC0 = PC0
		this.PC1 = PC1
	}
	C0(C0 = new Vector3()) {
		const [C0x,C0y,C0z] = [
			this.Part0.position.x+this.PC0.x+C0.x-this.Part1.position.x+this.PC1.x,
			this.Part0.position.y+this.PC0.y+C0.y-this.Part1.position.y+this.PC1.y,
			this.Part0.position.z+this.PC0.z+C0.z-this.Part1.position.z+this.PC1.z
		]
		this.Part0.position.set(C0x,C0y,C0z)
		return Vector3(C0x,C0y,C0z)
	}
	C1(C1 = new Vector3()) {
		const [C1x,C1y,C1z] = [
			this.Part1.position.x+this.PC1.x+C1.x,
			this.Part1.position.y+this.PC1.y+C1.y,
			this.Part1.position.z+this.PC1.z+C1.z
		]
		this.Part1.position.set(C1x,C1y,C1z)
		return Vector3(C1x,C1y,C1z)
	}
}

export class CharacterRig {
	constructor(ROOT) {
		this.ROOT = ROOT
	}

	Create(RIG_COLORS = {}) {
		const DEF_RIG_COLORS = {
			Head: s_Circuit(RIG_COLORS.Head, rE_COLOR_Inst_DEF),
			Torso: s_Circuit(RIG_COLORS.Torso, rE_COLOR_Inst_DEF),
			LeftArm: s_Circuit(RIG_COLORS.LeftArm, rE_COLOR_Inst_DEF),
			RightArm: s_Circuit(RIG_COLORS.RightArm, rE_COLOR_Inst_DEF),
			LeftLeg: s_Circuit(RIG_COLORS.LeftLeg, rE_COLOR_Inst_DEF),
			RightLeg: s_Circuit(RIG_COLORS.RightLeg, rE_COLOR_Inst_DEF)
		}

		const Torso = CreateLimb([1.3,3,3], DEF_RIG_COLORS.Torso)
		const LeftLeg = CreateLimb([1.3,3,3/2], DEF_RIG_COLORS.LeftLeg)
		LeftLeg.position.y = 5

		return {Limbs: [Torso, LeftLeg]}
	}

	Body_Unions_update() {

	}
}