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

    UI_V.Vector2(BottomBar, {
        Y: w_y-50,
    })
    UI_V.Vector2(BottomBar_2, {
        Y: w_y-140
    })
    UI_V.Vector2(Bottom_Rect, {
        X: w_x/2.03,
        Y: w_y-BottomBar.offsetHeight*1.1
    })
    UI_V.Vector2(Bottom_Rect_2, {
        X: w_x/2.07,
        Y: w_y-BottomBar.offsetHeight*1.3
    })
    UI_V.Vector2(GlitcherShards, {
        X: w_x-600,
        Y: w_y-580
    })
    UI_V.Vector2(GlitcherShards2, {
        X: w_x-500,
        Y: w_y-480
    })
    UI_V.Vector2(GlitcherSparkle, {
        X: w_x-550,
        Y: w_y-550
    })
    UI_V.Vector2(GlitcherHexagonBorders, {
        X: w_x-450,
        Y: w_y-450
    })
    UI_V.Vector2(GlitcherHexagonSpiked, {
        X: w_x-350,
        Y: w_y-350
    })
})
BottomBar.style.width   = `${w_x}px`
BottomBar_2.style.width = `${w_x}px`

UI_V.Vector2(BottomBar, {
    Y: w_y-50,
})
UI_V.Vector2(BottomBar_2, {
    Y: w_y-140
})
UI_V.Vector2(Bottom_Rect, {
	X: w_x/2.03,
	Y: w_y-BottomBar.offsetHeight*1.1
})
UI_V.Vector2(Bottom_Rect_2, {
	X: w_x/2.07,
	Y: w_y-BottomBar.offsetHeight*1.3
})
UI_V.Vector2(GlitcherShards, {
    X: w_x-600,
    Y: w_y-580
})
UI_V.Vector2(GlitcherShards2, {
    X: w_x-500,
    Y: w_y-480
})
UI_V.Vector2(GlitcherSparkle, {
    X: w_x-550,
    Y: w_y-550
})
UI_V.Vector2(GlitcherHexagonBorders, {
    X: w_x-450,
    Y: w_y-450
})
UI_V.Vector2(GlitcherHexagonSpiked, {
    X: w_x-350,
    Y: w_y-350
})
// ---

let delta = 0

function UI_FPS() {
     setTimeout(() => {
        delta+=1
        const l = GlitchMode.innerHTML.length
        UI_V.Vector2rel(Object_1, {
            X: cMath.lerp((1400-(l+100)), Math.cos(delta/120)*20, .5),
            Y: cMath.lerp(250, Math.sin(delta/120)*10, .5)
        })
        UI_V.Rotate_RAD(Object_1, {
            R: cMath.rad(3*Math.cos(delta/100))
        })
        UI_V.Vector2rel(Object_2, {
            X: cMath.lerp(w_x+400, Math.sin(delta/200)*20, .5),
            Y: cMath.lerp(310, Math.cos(delta/200)*15, .5)
        })
        UI_V.Rotate_RAD(Object_2, {
            R: cMath.rad(3*Math.sin(delta/200))
        })
        UI_V.Rotate_RAD(BottomBar, {
            R: cMath.rad(.8*Math.cos(delta/120))
        })
        UI_V.Rotate_RAD(BottomBar_2, {
            R: cMath.rad(.8*Math.sin(delta/120))
        })
        UI_V.Rotate_RAD(Bottom_Rect, {
            R: cMath.rad(-(delta*SpinRate)/4)
        })
        UI_V.Rotate_RAD(Bottom_Rect_2, {
            R: cMath.rad((delta*SpinRate)/4)
        })
        UI_V.Rotate_RAD(GlitcherShards, {
            R: cMath.rad((delta*SpinRate)/6)
        })
        UI_V.Rotate_RAD(GlitcherShards2, {
            R: cMath.rad(-(delta*SpinRate)/6)
        })
        UI_V.Rotate_RAD(GlitcherSparkle, {
            R: cMath.rad((delta*SpinRate)/6)
        })
        UI_V.Rotate_RAD(GlitcherHexagonBorders, {
            R: cMath.rad((delta*SpinRate)/6)
        })
        UI_V.Rotate_RAD(GlitcherHexagonSpiked, {
            R: cMath.rad(-(delta*SpinRate)/6)
        })
        UI_FPS()
    }, 1)
}

UI_FPS()
UIGlitcherTheme.ChangeModeOfGlitch(ModesOfGlitch.default[0])