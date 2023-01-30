import * as UI          from '../../UI'
import * as FilterColor from './Filter-Color'

export function ChangeModeOfGlitch(DATA_PROPS) {
    const P_Color = DATA_PROPS.PrimaryColor
    const S_Color = DATA_PROPS.SecondaryColor
    const PrimeColor_Alpha     = `rgba(${P_Color[0]}, ${P_Color[1]}, ${P_Color[2]}, .5)`
    const PrimeColor           = `rgb(${P_Color[0]}, ${P_Color[1]}, ${P_Color[2]})`
    const SecondaryColor_Alpha = `rgba(${S_Color[0]}, ${S_Color[1]}, ${S_Color[2]}, .5)`
    const SecondaryColor       = `rgb(${S_Color[0]}, ${S_Color[1]}, ${S_Color[2]})`

    UI.BottomBar.style.border              = `2px solid ${PrimeColor}`
    UI.BottomBar.style.backgroundColor     = PrimeColor_Alpha
    UI.BottomBar_2.style.border            = `2px solid ${SecondaryColor}`
    UI.BottomBar_2.style.backgroundColor   = SecondaryColor_Alpha
    UI.Bottom_Rect.style.border            = `3px solid ${PrimeColor}`
    UI.Bottom_Rect.style.backgroundColor   = SecondaryColor_Alpha
    UI.Bottom_Rect_2.style.border          = `3px solid ${PrimeColor}`
    UI.Bottom_Rect_2.style.backgroundColor = SecondaryColor_Alpha
    UI.Text_GlitcherMode.style.color       = PrimeColor
    UI.Text_GlitcherMode.style.textShadow  = `-3px 0 ${SecondaryColor}, 0 3px ${SecondaryColor}, 3px 0 ${SecondaryColor}, 0 -3px ${SecondaryColor}`
    UI.Text_StarGlitcher.style.color       = SecondaryColor
    UI.Text_StarGlitcher.style.textShadow  = `-3px 0 ${PrimeColor}, 0 3px ${PrimeColor}, 3px 0 ${PrimeColor}, 0 -3px ${PrimeColor}`

    UI.Text_GlitcherMode.innerHTML = DATA_PROPS.Name.toUpperCase()

    // Turn PNG's colorful
    // Uncaught ReferenceError: can't access lexical declaration 'Color' before initialization
    const P_Color_filter = FilterColor.ColorPNG(P_Color[0], P_Color[1], P_Color[2])
    const S_Color_filter = FilterColor.ColorPNG(S_Color[0], S_Color[1], S_Color[2])

    UI.GlitcherShards.style.filter         = S_Color_filter
    UI.GlitcherShards2.style.filter        = P_Color_filter
    UI.GlitcherSparkle.style.filter        = S_Color_filter
    UI.GlitcherHexagonBorders.style.filter = S_Color_filter
    UI.GlitcherHexagonSpiked.style.filter  = P_Color_filter
}