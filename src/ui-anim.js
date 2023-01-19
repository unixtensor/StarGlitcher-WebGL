import * as UI_V from './Modules/UI-Vector.js'
import * as cMath from './Modules/cMath.js'

let Object_1 = document.getElementById("Object-1")
let Object_2 = document.getElementById("Object-2")
let Object_3 = document.getElementById("Object-3")

// UI Element Resizing
let BottomBar   = document.getElementById("Bottom-Bar")
let Bottom_Rect = document.getElementById("Bottom-Rect")

window.onresize = () => {
	const w_x = window.innerWidth-UI_V.win_Offset
	const w_y = window.innerHeight-UI_V.win_Offset

	BottomBar.style.width = w_x+'px'
	UI_V.set_POS(Bottom_Rect, {
		NEW_X: (w_x/2)-UI_V.win_Offset,
		NEW_Y: w_y-BottomBar.offsetHeight*1.5
	})
}
// Pre-Init Sizing
const w_x = window.innerWidth-UI_V.win_Offset
const w_y = window.innerHeight-UI_V.win_Offset

BottomBar.style.width = w_x+'px'
UI_V.set_POS(Bottom_Rect, {
	NEW_X: (w_x/2)-UI_V.win_Offset,
	NEW_Y: w_y-BottomBar.offsetHeight*1.5
})
UI_V.set_POS(Object_1, {
	NEW_X: w_x,
	NEW_Y: w_y
})
// ---

const lerp = cMath.lerp
const rad = cMath.rad

let P_O1 = UI_V.get_POS(Object_1)
let delta = 0

function UI_FPS() {
	setTimeout(() => {
		delta+=1
		let O1_P = UI_V.set_POS_Rel(Object_1, {
			NEW_X: lerp(P_O1.X, 50*Math.cos(delta/150), .5),
			NEW_Y: lerp(P_O1.Y, (50/2)*Math.sin(delta/150), .5)
		}, 0)
		let O2_P = UI_V.set_ROT(Object_1, {
			RAD: rad(5*Math.cos(delta/200))
		})
		UI_V.set_POS(Object_2, {
			NEW_X: lerp(O1_P.X, O1_P.X*Math.cos(delta/100), .5),
			NEW_Y: lerp(O1_P.Y, O1_P.Y*Math.sin(delta/100), .5)
		})
		UI_V.set_ROT(Object_2, {
			RAD: (O2_P.R*500)*Math.cos(delta/1e4+500)*Math.sin(delta/1e4+500)
		})
		UI_V.set_POS(Object_3, {
			NEW_X: lerp(O1_P.X, -O1_P.X*Math.cos(delta/100), .5),
			NEW_Y: lerp(O1_P.Y, -O1_P.Y*Math.sin(delta/100), .5)
		})
		UI_V.set_ROT(Object_3, {
			RAD: (O2_P.R*500)*Math.cos(delta/1e4+500)*Math.sin(delta/1e4+500)
		})

		UI_V.set_ROT(BottomBar, {
			RAD: rad(1.5*Math.cos(delta/200))
		})
		UI_V.set_ROT(Bottom_Rect, {
			RAD: rad(delta/2)
		})

		UI_FPS()
	}, 1)
}

UI_FPS()