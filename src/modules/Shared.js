/*
    Basic shared functions
    Shared and used across multiple scripts
*/

/**
 * s_Circuit (EXPECTED, DEFAULT)
 * @function
 * @param {Boolean|String|Array|Object|Number|HTMLElement} EXPECTED - A value that is expected to be defined.
 * @param {Boolean|String|Array|Object|Number|HTMLElement} DEFAULT  - The fall back value if EXPECTED parameter is undefined.
 * @returns
 */
export function s_Circuit(EXPECTED, DEFAULT) {
	return EXPECTED === undefined ? DEFAULT : EXPECTED
}