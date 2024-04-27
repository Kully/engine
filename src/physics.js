/* Physics */

import {
	isPlayerStanding,
} from "./boundaries.js";

import {
	SCALE,
} from "./constants.js";

import {
	CONTROLLER,
	PLAYER,
} from "./state.js";


const JUMP_ACCEL = 8;
const GRAVITY_ACCEL = 0.5;
const TERMINAL_VELOCITY = 130;

export function updateHorizontalSpeed(accel, decel, maxSpeed) {
	// enable running mode
	if(CONTROLLER["ShiftLeft"] === 1 || CONTROLLER["ShiftRight"] === 1)
		maxSpeed *= 2;

	let lastSpeed = PLAYER["speed"];

	// accelerate the player
	// if (CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
	// 	PLAYER["speed"] -= accel;
	// else
	// if (CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 1)
	// 	PLAYER["speed"] += accel;
	// else
	// if (PLAYER["speed"] > 0)
	// 	PLAYER["speed"] -= decel;
	// else
	// if (PLAYER["speed"] < 0)
	// 	PLAYER["speed"] += decel;
	


	if (CONTROLLER["ArrowLeft"] === 1)
	{
		PLAYER["speedSP"] -= accel;
	}
	if (CONTROLLER["ArrowRight"] === 1)
	{
		PLAYER["speedSP"] += accel;
	}

	if(CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 0)
	{
		if (PLAYER["speedSP"] > 0)
			PLAYER["speedSP"] -= decel;
		else
		if (PLAYER["speedSP"] < 0)
			PLAYER["speedSP"] += decel;
	}

	// ensure that you stop moving

	if (
		(
			lastSpeed !== 0 &&
			PLAYER["speedSP"] !== 0
		) &&
		(
			Math.sign(lastSpeed) != Math.sign(PLAYER["speedSP"])
		)
	) {
		PLAYER["speedSP"] = 0;
	}

	// throttle the speed
	if (PLAYER["speedSP"] > maxSpeed)
		PLAYER["speedSP"] = maxSpeed;
	if (PLAYER["speedSP"] < -maxSpeed)
		PLAYER["speedSP"] = -maxSpeed;
}

export function updateVerticalSpeed(level) {
	if (isPlayerStanding(level)) {
		PLAYER["speedY"] = 0;
	}
	if (CONTROLLER["KeyX"] === 0 & isPlayerStanding(level)) {
		PLAYER["jumpJuice"] = 1;
	} else
	if (!isPlayerStanding(level)) {
		PLAYER["jumpJuice"] -= 1;
		PLAYER["speedY"] = Math.min(PLAYER["speedY"] + GRAVITY_ACCEL, TERMINAL_VELOCITY);
	}

	if (CONTROLLER["KeyX"] === 1 && PLAYER["jumpJuice"] > 0 && isPlayerStanding(level)) {
		PLAYER["speedY"] -= JUMP_ACCEL;
	}
}

export function translatePlayer() {
	PLAYER["speed"] = PLAYER["speedSP"];
	PLAYER["xSP"] += PLAYER["speedSP"];       // true subpixel pos update
	PLAYER["x"] = Math.round(PLAYER["xSP"]);  // this is what you see on the screen

	// PLAYER["x"] += PLAYER["speed"];
	// PLAYER["x"] = Math.floor(PLAYER["x"]);

	PLAYER["y"] += PLAYER["speedY"];
	PLAYER["y"] = Math.round(PLAYER["y"]);
}
