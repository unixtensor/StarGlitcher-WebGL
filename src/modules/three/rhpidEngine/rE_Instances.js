import { Vector3, Euler } from "three"

/**
 * Union (Part0, Part1, C1, C1_Euler)
 * C0 (C0_OFFSET, C0_EULER)
 * You CANNOT use ThreeJS properties to update the object when using a Union, for rotation and position refer to Union arguments 3, position & 4, euler rotation.
 * @returns
 */
const Union = class { // C0 and C1 in this system are referencing to "Connect0" and "Connect1"
	constructor(Part0, Part1, C1 = new Vector3(), C1_EULER = new Euler()) {
		this.Part0 = Part0
		this.Part1 = Part1
		this.C1 = C1
		this.C1_EULER = C1_EULER
	}

	C0(C0_OFFSET = new Vector3(), C0_EULER = new Euler()) {
		const CON0 = new Vector3(
			this.Part0.position.x+this.C1.x+C0_OFFSET.x,
			this.Part0.position.y+this.C1.y+C0_OFFSET.y,
			this.Part0.position.z+this.C1.z+C0_OFFSET.z
		)
		const COU0 = new Euler(
			this.Part0.rotation.x+this.C1_EULER.x+C0_EULER.x,
			this.Part0.rotation.y+this.C1_EULER.y+C0_EULER.y,
			this.Part0.rotation.z+this.C1_EULER.z+C0_EULER.z
		)
		this.Part1.position.set(CON0.x,CON0.y,CON0.z)
		this.Part1.rotation.set(COU0.x+this.Part0.rotation.x,COU0.y+this.Part0.rotation.y,COU0.z+this.Part0.rotation.z)

		return [CON0, COU0]
	}
}

export {
	Union
}