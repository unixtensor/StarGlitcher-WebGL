import * as UI_V from './modules/UI/UI-Vector'
import * as cMath from './modules/cMath'
import * as ModesOfGlitch from './modules/ModesOfGlitch'
import * as UIGlitcherTheme from './modules/UI/UI-GlitcherTheme'

export let Object_1 = document.getElementById("Object-1")
export let Object_2 = document.getElementById("Object-2")

export let Text_GlitcherMode = document.getElementById("Text-GlitcherMode")
export let Text_StarGlitcher = document.getElementById("Text-StarGlitcher")

export let BottomBar     = document.getElementById("Bottom-Bar")
export let BottomBar_2   = document.getElementById("Bottom-Bar-2")
export let Bottom_Rect   = document.getElementById("Bottom-Rect")
export let Bottom_Rect_2 = document.getElementById("Bottom-Rect-2")

export let GlitcherShards         = document.getElementById("GlitcherShards")
export let GlitcherShards2        = document.getElementById("GlitcherShards2")
export let GlitcherSparkle        = document.getElementById("GlitcherSparkle")
export let GlitcherHexagonBorders = document.getElementById("GlitcherHexagonBorders")
export let GlitcherHexagonSpiked  = document.getElementById("GlitcherHexagonSpiked")

export let SpinRate = 1

const GlitchMode = document.getElementById("Text-GlitcherMode")

// This must be called before animations and placing - Note to self for later
document.querySelectorAll("div, h1, img").forEach((value) => {
    value.style.display = "block"
})

// Pre-Init Sizing
// Object's (Animating UI frames) are not needed here since they rely using relative positioning inside their fps loop.
let w_x = window.innerWidth-UI_V.win_Offset
let w_y = window.innerHeight-UI_V.win_Offset

window.addEventListener("resize", () => {
	w_x = window.innerWidth-UI_V.win_Offset
	w_y = window.innerHeight-UI_V.win_Offset

	BottomBar.style.width   = `${w_x}px`
    BottomBar_2.style.width = `${w_x}px`

    UI_V.set_POS(BottomBar, {
        NEW_Y: w_y-50,
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
    UI_V.set_POS(GlitcherShards, {
        NEW_X: w_x-600,
        NEW_Y: w_y-580
    })
    UI_V.set_POS(GlitcherShards2, {
        NEW_X: w_x-500,
        NEW_Y: w_y-480
    })
    UI_V.set_POS(GlitcherSparkle, {
        NEW_X: w_x-550,
        NEW_Y: w_y-550
    })
    UI_V.set_POS(GlitcherHexagonBorders, {
        NEW_X: w_x-450,
        NEW_Y: w_y-450
    })
    UI_V.set_POS(GlitcherHexagonSpiked, {
        NEW_X: w_x-350,
        NEW_Y: w_y-350
    })
})
BottomBar.style.width   = `${w_x}px`
BottomBar_2.style.width = `${w_x}px`

UI_V.set_POS(BottomBar, {
    NEW_Y: w_y-50,
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
UI_V.set_POS(GlitcherShards, {
    NEW_X: w_x-600,
    NEW_Y: w_y-580
})
UI_V.set_POS(GlitcherShards2, {
    NEW_X: w_x-500,
    NEW_Y: w_y-480
})
UI_V.set_POS(GlitcherSparkle, {
    NEW_X: w_x-550,
    NEW_Y: w_y-550
})
UI_V.set_POS(GlitcherHexagonBorders, {
    NEW_X: w_x-450,
    NEW_Y: w_y-450
})
UI_V.set_POS(GlitcherHexagonSpiked, {
    NEW_X: w_x-350,
    NEW_Y: w_y-350
})
// ---

let delta = 0

function UI_FPS() {
     setTimeout(() => {
        delta+=1
        const l = GlitchMode.innerHTML.length
        UI_V.set_POS_Relative(Object_1, {
            NEW_X: cMath.lerp((1400-(l+100)), Math.cos(delta/80)*20, .5),
            NEW_Y: cMath.lerp(250, Math.sin(delta/80)*10, .5)
        })
        UI_V.set_ROT(Object_1, {
            RAD: cMath.rad(3*Math.cos(delta/100))
        })
        UI_V.set_POS_Relative(Object_2, {
            NEW_X: cMath.lerp(w_x+400, Math.sin(delta/80)*20, .5),
            NEW_Y: cMath.lerp(310, Math.cos(delta/80)*15, .5)
        })
        UI_V.set_ROT(Object_2, {
            RAD: cMath.rad(3*Math.sin(delta/200))
        })
        UI_V.set_ROT(BottomBar, {
            RAD: cMath.rad(.8*Math.cos(delta/80))
        })
        UI_V.set_ROT(BottomBar_2, {
            RAD: cMath.rad(.8*Math.sin(delta/80))
        })
        UI_V.set_ROT(Bottom_Rect, {
            RAD: cMath.rad(-(delta*SpinRate)/3)
        })
        UI_V.set_ROT(Bottom_Rect_2, {
            RAD: cMath.rad((delta*SpinRate)/3)
        })
        UI_V.set_ROT(GlitcherShards, {
            RAD: cMath.rad((delta*SpinRate)/4)
        })
        UI_V.set_ROT(GlitcherShards2, {
            RAD: cMath.rad(-(delta*SpinRate)/4)
        })
        UI_V.set_ROT(GlitcherSparkle, {
            RAD: cMath.rad((delta*SpinRate)/4)
        })
        UI_V.set_ROT(GlitcherHexagonBorders, {
            RAD: cMath.rad((delta*SpinRate)/4)
        })
        UI_V.set_ROT(GlitcherHexagonSpiked, {
            RAD: cMath.rad(-(delta*SpinRate)/4)
        })
        UI_FPS()
    }, 1)
}

UI_FPS()
UIGlitcherTheme.ChangeModeOfGlitch(ModesOfGlitch.default[0])