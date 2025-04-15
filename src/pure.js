/* Pure Functions */

export function hexToNumber(hexString) {
	return parseInt(hexString, 16);
}

export function numberToHex(number) {
	return number.toString(16).padEnd(2, "0");
}

export function hexToRgb(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		let r = parseInt(result[1], 16);
		let g = parseInt(result[2], 16);
		let b = parseInt(result[3], 16);
		let a = parseInt(result[4], 16);
		return [r, g, b, a];
	}
	return null;
}

export function copy2DArray(source, target) {
    for (let y = 0; y < source.length; y++) {
        for (let x = 0; x < source[y].length; x++) {
            target[y][x] = source[y][x];
        }
    }
    return target;
}

export function getValueFrom2DArray(array_2d, x, y) {
	if (x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
		return undefined;
	return array_2d[y][x];
}

export function putValueTo2DArray(array_2d, x, y, val) {
	if (x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
		return undefined;
	array_2d[y][x] = val;
	return array_2d
}

export function getWidth2DArray(array_2d) {
	return array_2d[0].length;
}

export function getHeight2DArray(array_2d) {
	return array_2d.length;
}

export function isValidIndex(array_2d, x, y) {
	if (x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
		return false;
	return true;
}

// Thus function is used to determine if two shapes on the board
// match. When this is done, we remove both from the board.
export function areEnemiesValidPair(ptr_a, ptr_b)
{
	if(Math.abs(ptr_a - ptr_b) === 1)
		return 1;
	return 0;
}