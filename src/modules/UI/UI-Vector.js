export let win_Offset = 3 // Usually a good offset for browser true size is 3

function s_Circuit(EXPECTED, DEFAULT) {
    return EXPECTED === undefined ? DEFAULT : EXPECTED
}

// The function return's have support for Pascal Case and lower camel case.

/**
 * get_POS (OBJ, C_DATA)
 * @function
 * @param {HTMLElement} OBJ - An HTML Element, should always be a div. 
 * @returns 
 */
export function Bounding_Rect(OBJ) {
    const Rect = OBJ.getBoundingClientRect()
	return {
		X: Rect.x, x: Rect.x,
		Y: Rect.y, y: Rect.y,
        Rect: Rect, rect: Rect
	}
}

/**
 * Vector2 (OBJ, C_DATA)
 * @function
 * @param {HTMLElement} OBJ - An HTML Element, should always be a div. 
 * @param {Object} C_DATA   - Coordinate/Vector DATA, where in space will the element appear? {NEW_X: ?, NEW_Y: ?} (Placed in absolute)
 * @returns 
 */
export function Vector2(OBJ, C_DATA) {
	C_DATA.X = s_Circuit(C_DATA.X, Bounding_Rect(OBJ).X)
	C_DATA.Y = s_Circuit(C_DATA.Y, Bounding_Rect(OBJ).Y)

	OBJ.style.left = `${C_DATA.X}px`
	OBJ.style.top =  `${C_DATA.Y}px`
    OBJ.style.setProperty("position", "absolute", "important")

	return {
        X: C_DATA.X, x: C_DATA.X,
        Y: C_DATA.Y, y: C_DATA.Y
    }
}

/**
 * set_ROT (OBJ, R_DATA)
 * @function
 * @param {HTMLElement} OBJ - An HTML Element, should always be a div. 
 * @param {Object} R_DATA   - Rotation DATA in radians. {RAD: ?}
 * @returns 
 */
export function Rotate_RAD(OBJ, R_DATA) {
	R_DATA.R = s_Circuit(R_DATA.R, '0')
	
	OBJ.style.transform = `rotate(${R_DATA.R}rad)`

	return {
        R: R_DATA.R, r: R_DATA.R
    }
}

/**
 * Vector2rel (OBJ, C_DATA)
 * @function
 * @param {HTMLElement} OBJ - An HTML Element, should always be a div. 
 * @param {Object} C_DATA   - Coordinate/Vector DATA, where in space will the element appear? {NEW_X: ?, NEW_Y: ?} (Placed relative with the browser size [∆-win_Offset=3])
 * @returns
 */
export function Vector2rel(OBJ, C_DATA) {
	C_DATA.X = s_Circuit(C_DATA.X, Bounding_Rect(OBJ).X)
	C_DATA.Y = s_Circuit(C_DATA.Y, Bounding_Rect(OBJ).Y)

	const w_xM = window.innerWidth-win_Offset-C_DATA.X
	const w_yM = window.innerHeight-win_Offset-C_DATA.Y
	OBJ.style.left = `${w_xM}px`
	OBJ.style.top  = `${w_yM}px`
    OBJ.style.setProperty("position", "absolute", "important")

	return {
        X: w_xM, x: w_xM,
        Y: w_yM, y: w_yM
    }
}