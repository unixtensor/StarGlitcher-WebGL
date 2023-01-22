import * as UI from '../UI.js'
import * as FilterColor from './Filter-Color.js'

export function ChangeModeOfGlitch(DATA_PROPS) {
    const P_Color = DATA_PROPS.PrimaryColor
    const S_Color = DATA_PROPS.SecondaryColor
    const PrimeColor_Alpha     = `rgba(${P_Color[0]}, ${P_Color[1]}, ${P_Color[2]}, ${P_Color[3]})`
    const PrimeColor           = `rgb(${P_Color[0]}, ${P_Color[1]}, ${P_Color[2]})`
    const SecondaryColor_Alpha = `rgba(${S_Color[0]}, ${S_Color[1]}, ${S_Color[2]}, ${S_Color[3]})`
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
    const P_Color_filter_c = new FilterColor.Color(P_Color[0], P_Color[1], P_Color[2])
    const S_Color_filter_c = new FilterColor.Color(S_Color[0], S_Color[1], S_Color[2])
    const P_Color_filter   = new FilterColor.Solver(P_Color_filter_c).solve()
    const S_Color_filter   = new FilterColor.Solver(S_Color_filter_c).solve()

    UI.GlitcherShards.style.filter         = P_Color_filter.filter
    UI.GlitcherShards2.style.filter        = S_Color_filter.filter
    UI.GlitcherSparkle.style.filter        = P_Color_filter.filter
    UI.GlitcherHexagonBorders.style.filter = P_Color_filter.filter
    UI.GlitcherHexagonSpiked.style.filter  = S_Color_filter.filter
}