import { Vector3 } from "three"

export function lookVector(Object, Distance) {
	return new Vector3(0,0,-Distance).applyQuaternion(Object.quaternion).add(Object.position)
}

export function rightVector(Object, Distance) {
	return new Vector3(-Distance,0,0).applyQuaternion(Object.quaternion).add(Object.position)
}