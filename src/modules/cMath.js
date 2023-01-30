export class cMath {
    E_clamp(min, x, max) {
        return Math.max(min, Math.min(x, max))
    }
    lerp(start, end, t) {
        return start*(1-t)+end*t
    }
    rad(x) {
        return x*Math.PI/180
    }
}