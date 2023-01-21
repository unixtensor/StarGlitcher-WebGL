import * as UI_V from './Modules/UI-Vector.js'
import * as cMath from './Modules/cMath.js'
import * as FilterColor from './Modules/Filter-Color.js'

const Object_1 = document.getElementById("Object-1")
const Object_2 = document.getElementById("Object-2")

// UI Element Resizing
const BottomBar     = document.getElementById("Bottom-Bar")
const BottomBar_2   = document.getElementById("Bottom-Bar-2")
const Bottom_Rect   = document.getElementById("Bottom-Rect")
const Bottom_Rect_2 = document.getElementById("Bottom-Rect-2")

// Pre-Init Sizing
let w_x = window.innerWidth-UI_V.win_Offset
let w_y = window.innerHeight-UI_V.win_Offset
window.onresize = () => {
	w_x = window.innerWidth-UI_V.win_Offset
	w_y = window.innerHeight-UI_V.win_Offset

	BottomBar.style.width = w_x+'px'
    BottomBar_2.style.width = w_x+'px'

    UI_V.set_POS(Object_1, {
        NEW_Y: w_y-100,
        NEW_X: w_x-500
    })
    UI_V.set_POS(BottomBar, {
        NEW_Y: w_y-55
    })
    UI_V.set_POS(BottomBar_2, {
        NEW_Y: w_y-140
    })
    UI_V.set_POS(Bottom_Rect, {
        NEW_X: w_x/2.03,
        NEW_Y: w_y-BottomBar.offsetHeight*1.1
    })
    UI_V.set_POS(Bottom_Rect_2, {
        NEW_X: w_x/2.07,
        NEW_Y: w_y-BottomBar.offsetHeight*1.3
    })
    UI_V.set_POS(Object_2, {
        NEW_X: w_x/2.5,
        NEW_Y: (w_y-BottomBar.offsetHeight*2.2)+65
    })
}

BottomBar.style.width = w_x+'px'
BottomBar_2.style.width = w_x+'px'

UI_V.set_POS(Object_1, {
    NEW_Y: w_y-100,
    NEW_X: w_x-500
})
UI_V.set_POS(BottomBar, {
    NEW_Y: w_y-55
})
UI_V.set_POS(BottomBar_2, {
    NEW_Y: w_y-140
})
UI_V.set_POS(Bottom_Rect, {
	NEW_X: w_x/2.03,
	NEW_Y: w_y-BottomBar.offsetHeight*1.1
})
UI_V.set_POS(Bottom_Rect_2, {
	NEW_X: w_x/2.07,
	NEW_Y: w_y-BottomBar.offsetHeight*1.3
})
UI_V.set_POS(Object_2, {
	NEW_X: w_x/2.5,
	NEW_Y: (w_y-BottomBar.offsetHeight*2.2)+65
})
// ---

const lerp = cMath.lerp
const rad = cMath.rad
const P_O1 = UI_V.get_POS(Object_1)
const P_O2 = UI_V.get_POS(Object_2)
let delta = 0

function UI_FPS() {
	setTimeout(() => {
		delta+=1
		UI_V.set_POS(Object_1, {
			NEW_X: lerp(P_O1.X, 10*Math.cos(delta/150), .5),
			NEW_Y: lerp(P_O1.Y, 10*Math.sin(delta/150), .5)
		})
		UI_V.set_ROT(Object_1, {
			RAD: rad(3*Math.cos(delta/200))
		})
		UI_V.set_POS(Object_2, {
			NEW_X: lerp(P_O2.X, 10*Math.cos(delta/150), .5),
			NEW_Y: lerp(P_O2.Y, 10*Math.sin(delta/150), .5)
		})
        UI_V.set_ROT(Object_2, {
			RAD: rad(3*Math.sin(delta/200))
		})
		UI_V.set_ROT(BottomBar, {
			RAD: rad(.6*Math.cos(delta/150))
		})
		UI_V.set_ROT(BottomBar_2, {
			RAD: rad(.6*Math.sin(delta/150))
		})
		UI_V.set_ROT(Bottom_Rect, {
			RAD: rad(-delta/4)
		})
        UI_V.set_ROT(Bottom_Rect_2, {
			RAD: rad(delta/4)
		})

		UI_FPS()
	}, 1)
}

UI_FPS()