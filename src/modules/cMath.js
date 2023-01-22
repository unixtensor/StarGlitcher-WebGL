export function E_clamp(min, x, max) {
    return Math.max(min, Math.min(x, max))
}

export function lerp(start, end, t) {
    t=E_clamp(.0,t,1)
    return start*(1-t)+end*t
}

export function rad(x) {
	return x*Math.PI/180
}