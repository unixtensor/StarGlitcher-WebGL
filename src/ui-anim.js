let Object_1 = document.getElementById("Object-1")
let Object_2 = document.getElementById("Object-2")
let Object_3 = document.getElementById("Object-3")

function getPos(OBJ) {
	return {
		X: OBJ.getBoundingClientRect().left,
		Y: OBJ.getBoundingClientRect().top
	}
}
function setPos(OBJ, C_DATA) {
	C_DATA.NEW_X = C_DATA.NEW_X === undefined ? getPos(OBJ).X : C_DATA.NEW_X
	C_DATA.NEW_Y = C_DATA.NEW_Y === undefined ? getPos(OBJ).Y : C_DATA.NEW_Y
	OBJ.style.left = C_DATA.NEW_X+'px'
	OBJ.style.top  = C_DATA.NEW_Y+'px'
	OBJ.style.position = "absolute"

	return {X: C_DATA.NEW_X, Y: C_DATA.NEW_Y}
}
function setRot(OBJ, R_DATA) {
	R_DATA.RAD = R_DATA.RAD === undefined ? '0' : R_DATA.RAD
	OBJ.style.transform = "rotate("+R_DATA.RAD+"rad)"

	return {R: R_DATA.RAD}
}

let P_O1 = getPos(Object_1)

function E_clamp(min, x, max) {
    return Math.max(min, Math.min(x, max))
}
function lerp(start, end, t) {
    t=E_clamp(.0,t,1)
    return start*(1-t)+end*t
}
function rad(x) {
	return x*Math.PI/180
}

let delta = 0
function buhloop() {
	setTimeout(() => {
		delta+=1
		let O1_P = setPos(Object_1, {
			NEW_X: lerp(P_O1.X+550, 50*Math.cos(delta/150), .5),
			NEW_Y: lerp(P_O1.Y+550, (50/2)*Math.sin(delta/150), .5)
		}, 0)
		let O2_P = setRot(Object_1, {
			RAD: rad(5*Math.cos(delta/200))
		})
		setPos(Object_2, {
			NEW_X: lerp(O1_P.X, (O1_P.X)*Math.cos(delta/100), .5),
			NEW_Y: lerp(O1_P.Y, (O1_P.Y)*Math.sin(delta/100), .5)
		})
		setRot(Object_2, {
			RAD: (O2_P.R*(500))*Math.cos(delta/1e4+500)*Math.sin(delta/1e4+500)
		})
		setPos(Object_3, {
			NEW_X: lerp(O1_P.X, (-O1_P.X)*Math.cos(delta/100), .5),
			NEW_Y: lerp(O1_P.Y, (-O1_P.Y)*Math.sin(delta/100), .5)
		})
		setRot(Object_3, {
			RAD: (O2_P.R*(500))*Math.cos(delta/1e4+500)*Math.sin(delta/1e4+500)
		})
		buhloop()
	}, 1)
}

buhloop()