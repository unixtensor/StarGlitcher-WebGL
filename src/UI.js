import * as UI_V            from '/modules/UI/UI-Vector'
import * as UIGlitcherTheme from '/modules/UI/UI-GlitcherTheme'
import { ModeOfGlitch }     from '/modules/UI/ModesOfGlitch'
import Stats                from 'three/examples/jsm/libs/stats.module'

const Object_1               = document.getElementById("Object-1")
const Object_2               = document.getElementById("Object-2")
const Text_GlitcherMode      = document.getElementById("Text-GlitcherMode")
const Text_StarGlitcher      = document.getElementById("Text-StarGlitcher")
const BottomBar              = document.getElementById("Bottom-Bar")
const BottomBar_2            = document.getElementById("Bottom-Bar-2")
const Bottom_Rect            = document.getElementById("Bottom-Rect")
const Bottom_Rect_2          = document.getElementById("Bottom-Rect-2")
const GlitcherShards         = document.getElementById("GlitcherShards")
const GlitcherShards2        = document.getElementById("GlitcherShards2")
const GlitcherSparkle        = document.getElementById("GlitcherSparkle")
const GlitcherHexagonBorders = document.getElementById("GlitcherHexagonBorders")
const GlitcherHexagonSpiked  = document.getElementById("GlitcherHexagonSpiked")
const GlitchMode             = document.getElementById("Text-GlitcherMode")

const GlitcherUIs = `
#Object-1,
#Object-2,
#Text-GlitcherMode,
#Text-StarGlitcher,
#Bottom-Bar,
#Bottom-Bar-2,
#Bottom-Rect,
#Bottom-Rect-2,
#GlitcherShards,
#GlitcherShards2,
#GlitcherSparkle,
#GlitcherHexagonBorders,
#GlitcherHexagonSpiked,
#Text-GlitcherMode
`
let SpinRate = 1
let delta = 0
let UI_ENABLED = true

// Create FPS stats
const FPS_Stats = new Stats()
// --

function lerp(start, end, t) {
    return start*(1-t)+end*t
}
function rad(x) {
    return x*Math.PI/180
}

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
}, false)

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
    Y: w_y-BottomBar.offsetHeight-165
})
UI_V.Vector2(Bottom_Rect_2, {
    X: w_x/2.07,
    Y: w_y-BottomBar.offsetHeight-200
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

document.addEventListener('contextmenu', event => event.preventDefault(), false)
// ---

function UI_FPS() {
     setTimeout(() => {
        delta+=1
        const l = GlitchMode.innerHTML.length
        UI_V.Vector2rel(Object_1, {
            X: lerp((1400-(l+100)), Math.cos(delta/120)*20, .5),
            Y: lerp(250, Math.sin(delta/120)*10, .5)
        })
        UI_V.Rotate_RAD(Object_1, {
            R: rad(3*Math.cos(delta/100))
        })
        UI_V.Vector2rel(Object_2, {
            X: lerp(w_x+400, Math.sin(delta/200)*20, .5),
            Y: lerp(310, Math.cos(delta/200)*15, .5)
        })
        UI_V.Rotate_RAD(Object_2, {
            R: rad(3*Math.sin(delta/200))
        })
        UI_V.Rotate_RAD(BottomBar, {
            R: rad(.8*Math.cos(delta/120))
        })
        UI_V.Rotate_RAD(BottomBar_2, {
            R: rad(.8*Math.sin(delta/120))
        })
        UI_V.Rotate_RAD(Bottom_Rect, {
            R: rad(-(delta*SpinRate)/4)
        })
        UI_V.Rotate_RAD(Bottom_Rect_2, {
            R: rad((delta*SpinRate)/4)
        })
        UI_V.Rotate_RAD(GlitcherShards, {
            R: rad((delta*SpinRate)/6)
        })
        UI_V.Rotate_RAD(GlitcherShards2, {
            R: rad(-(delta*SpinRate)/6)
        })
        UI_V.Rotate_RAD(GlitcherSparkle, {
            R: rad((delta*SpinRate)/6)
        })
        UI_V.Rotate_RAD(GlitcherHexagonBorders, {
            R: rad((delta*SpinRate)/6)
        })
        UI_V.Rotate_RAD(GlitcherHexagonSpiked, {
            R: rad(-(delta*SpinRate)/6)
        })
        UI_FPS()
    }, 1)
}
if (UI_ENABLED) {
    UI_FPS()
    document.querySelectorAll(GlitcherUIs).forEach((value) => {
        value.style.display = "block"
    })   
}
UIGlitcherTheme.ChangeModeOfGlitch(ModeOfGlitch[0])
document.body.appendChild(FPS_Stats.dom)

export {
    Object_1,
    Object_2,
    Text_GlitcherMode,
    Text_StarGlitcher,
    BottomBar,
    BottomBar_2,
    Bottom_Rect,
    Bottom_Rect_2,
    GlitcherShards,
    GlitcherShards2,
    GlitcherSparkle,
    GlitcherHexagonBorders,
    GlitcherHexagonSpiked,
    FPS_Stats
}