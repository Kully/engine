/* Screenshake Objects */


const LARGE_SCREENSHAKE = {
	ptr: 0,
	array: [
		[  2, 0],
		[  0, 0],
		[ -6, 0],
		[ 14, 0],
		[-12, 0],
		[  8, 0],
		[ -8, 0],
		[  8, 0],
		[ -8, 0],
		[  6, 0],
		[ -6, 0],
		[  6, 0],
		[ -4, 0],
		[  2, 0],
		[ -2, 0],
		[  1, 0],
		[ -1, 0],
	],
};
const MEDIUM_SCREENSHAKE = {
	ptr: 0,
	array: [
		[  2, 0],
		[  0, 0],
		[ -1, 0],
		[  4, 0],
		[ -6, 0],
		[  3, 0],
		[  4, 0],
		[ -4, 0],
		[  4, 0],
		[ -4, 0],
		[  3, 0],
		[ -3, 0],
		[  2, 0],
		[ -2, 0],
		[  1, 0],
		[ -1, 0],
	],
};
const SMALL_SCREENSHAKE = {
	ptr: 0,
	array: [
		[ -1, 0],
		[ 1, 0],
		[ -2, 0],
		[ 2, 0],
		[  4, 0],
		[ -4, 0],
		[  3, 0],
		[  -3, 0],
		[  1, 0],
		[ -1, 0],
	],
};
const NO_SCREENSHAKE = {
	ptr: 0,
	array: [
		[0, 0],
	],
};
export const SCREENSHAKE = NO_SCREENSHAKE;


export function shakeScreenOnLand()
{
	if(PLAYER["jumpJuice"] === 1 && PLAYER["lastJumpJuice"] < -38)
	{
		if(SCREENSHAKE["ptr"] > SCREENSHAKE["array"].length - 1)
			SCREENSHAKE["ptr"] = 0;
	}

	if(SCREENSHAKE["ptr"] <= SCREENSHAKE["array"].length - 1)
	{
		let ptr = SCREENSHAKE["ptr"];
		let dx = SCREENSHAKE["array"][ptr][0];

		CAMERA["xOffset"] += dx;
		playerLayerCtx.translate(-dx, 0);

		SCREENSHAKE["ptr"] += 1;
	}
}
