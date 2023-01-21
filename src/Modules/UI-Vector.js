import * as Shared from './Shared.js'

export let win_Offset = 3 // Usually a good offset for browser true size is 3

/**
 * get_POS (OBJ, C_DATA)
 * @function
 * @param {HTMLElement} OBJ - An HTML Element, should always be a div. 
 * @returns 
 */
export function get_POS(OBJ) {
	return {
		X: OBJ.style.left,
		Y: OBJ.style.top
	}
}

/**
 * set_POS (OBJ, C_DATA)
 * @function
 * @param {HTMLElement} OBJ - An HTML Element, should always be a div. 
 * @param {Object} C_DATA   - Coordinate/Vector DATA, where in space will the element appear? {NEW_X: ?, NEW_Y: ?} (Placed in absolute)
 * @returns 
 */
export function set_POS(OBJ, C_DATA) {
	const P = get_POS(OBJ)
	C_DATA.NEW_X = Shared.s_Circuit(C_DATA.NEW_X, P.X)
	C_DATA.NEW_Y = Shared.s_Circuit(C_DATA.NEW_Y, P.Y)

	OBJ.style.left = C_DATA.NEW_X+'px'
	OBJ.style.top  = C_DATA.NEW_Y+'px'
	OBJ.style.position = 'absolute !important'

	return {X: C_DATA.NEW_X, Y: C_DATA.NEW_Y}
}

/**
 * set_ROT (OBJ, R_DATA)
 * @function
 * @param {HTMLElement} OBJ - An HTML Element, should always be a div. 
 * @param {Object} R_DATA   - Rotation DATA in radians. {RAD: ?}
 * @returns 
 */
export function set_ROT(OBJ, R_DATA) {
	R_DATA.RAD = Shared.s_Circuit(R_DATA.RAD, '0')
	OBJ.style.transform = 'rotate('+R_DATA.RAD+'rad)'

	return {R: R_DATA.RAD}
}

/**
 * set_POS_Rel (OBJ, C_DATA)
 * @function
 * @param {HTMLElement} OBJ - An HTML Element, should always be a div. 
 * @param {Object} C_DATA   - Coordinate/Vector DATA, where in space will the element appear? {NEW_X: ?, NEW_Y: ?} (Placed relative with the browser size [∆-win_Offset=3])
 * @returns
 */
export function set_POS_Rel(OBJ, C_DATA) {
	const P = get_POS(OBJ)
	C_DATA.NEW_X = Shared.s_Circuit(C_DATA.NEW_X, P.X)
	C_DATA.NEW_Y = Shared.s_Circuit(C_DATA.NEW_Y, P.Y)

	const w_xM = window.innerWidth-win_Offset-C_DATA.NEW_X
	const w_yM = window.innerHeight-win_Offset-C_DATA.NEW_Y
	OBJ.style.left = w_xM+'px'
	OBJ.style.top  = w_yM+'px'
	OBJ.style.position = 'absolute !important'

	return {X: w_xM, Y: w_yM}
}