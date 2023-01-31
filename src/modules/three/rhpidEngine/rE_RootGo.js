import * as THREE from 'three'
import { Vector3 } from 'three'
import { lerp } from 'three/src/math/MathUtils'
import { WalkSpeed } from './rE_Root'

function lookVector(Object, Distance) {
	return new THREE.Vector3(0,0,-Distance).applyQuaternion(Object.quaternion).add(Object.position)
}
function rightVector(Object, Distance) {
	return new THREE.Vector3(-Distance,0,0).applyQuaternion(Object.quaternion).add(Object.position)
}

export class KeyMap {
	constructor(ROOT, CAMERA) {
		this.ROOT = ROOT
		this.CAMERA = CAMERA
	}

	KeyDown = {
		w: false,
		a: false,
		s: false,
		d: false
	}

	update() {
		if (KeyDown.w) {
			const c_lv = lookVector(this.CAMERA, this.ROOT.scale.z/2)
			const s = this.ROOT.position
			this.ROOT.position.x = lerp(s.x,s.x-c_lv.x+.1/WalkSpeed,.1)
			this.ROOT.position.z = lerp(s.z,s.z-c_lv.z+.1/WalkSpeed,.1)
			this.ROOT.getWorldPosition(s)
			// this.CAMERA.position.copy(s).applyQuaternion(this.CAMERA.quaternion).add(s)
			this.CAMERA.lookAt(new THREE.Vector3(50,10,-30))
		}
		if (KeyDown.a) {
			const c_rv = rightVector(this.CAMERA, this.ROOT.scale.x/2)
			const s = this.ROOT.position
			this.ROOT.position.x = lerp(s.x,s.x+c_rv.x+.1/WalkSpeed,.1)
			this.ROOT.position.z = lerp(s.z,s.z-c_rv.z+.1/WalkSpeed,.1)
			this.ROOT.getWorldPosition(s)
			this.CAMERA.position.copy(s).add(new THREE.Vector3(0,5,-5))
		}
		if (KeyDown.s) {
			const c_lv = lookVector(this.CAMERA, this.ROOT.scale.z/2)
			const s = this.ROOT.position
			this.ROOT.position.x = lerp(s.x,s.x+c_lv.x-.1/WalkSpeed,.1)
			this.ROOT.position.z = lerp(s.z,s.z+c_lv.z-.1/WalkSpeed,.1)
			this.ROOT.getWorldPosition(s)
			this.CAMERA.position.copy(s).add(new THREE.Vector3(0,5,-5))
		}
		if (KeyDown.d) {

		}	
	}
}