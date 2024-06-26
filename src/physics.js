/* Physics */

import {
	isPlayerStanding,
	getPlayerGridX,
	getPlayerGridY,
} from "./boundaries.js";

import {
	SCALE,
	GRID_WIDTH_PX,
} from "./constants.js";

import {
	getValueFrom2DArray,
} from "./helpers.js";

import {
	SPRITE_LOOKUP,
} from "./sprites.js";

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
	if (PLAYER["lastAnimationCycle"] === "CROUCH_CYCLE")
		PLAYER["speed"] = 0;
	else
	if (CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
		PLAYER["speed"] -= accel;
	else
	if (CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 1)
		PLAYER["speed"] += accel;
	else
	if (PLAYER["speed"] > 0)
		PLAYER["speed"] -= decel;
	else
	if (PLAYER["speed"] < 0)
		PLAYER["speed"] += decel;

	// ensure that you stop moving
	if (
		(
			lastSpeed !== 0 &&
			PLAYER["speed"] !== 0
		) &&
		(
			Math.sign(lastSpeed) != Math.sign(PLAYER["speed"])
		)
	) {
		PLAYER["speed"] = 0;
	}

	// throttle the speed
	if (PLAYER["speed"] > maxSpeed)
		PLAYER["speed"] = maxSpeed;
	if (PLAYER["speed"] < -maxSpeed)
		PLAYER["speed"] = -maxSpeed;
}

export function updateVerticalSpeed(level) {
	if (isPlayerStanding(level)) {
		PLAYER["speedY"] = 0;
	}
	if (CONTROLLER["KeyX"] === 0 & isPlayerStanding(level)) {
		let x = Math.round(getPlayerGridX());
		let y = Math.ceil(getPlayerGridY() - 2);
		let tileAboveYou = getValueFrom2DArray(
			level, x, y,
		);

		// prevent jumping if there is a tile above you
		if(SPRITE_LOOKUP[tileAboveYou]["hitbox"] === false)
		{
			PLAYER["lastJumpJuice"] = PLAYER["jumpJuice"];
			PLAYER["jumpJuice"] = 1;
		}
	} else
	if (!isPlayerStanding(level)) {
		PLAYER["lastJumpJuice"] = PLAYER["jumpJuice"];
		PLAYER["jumpJuice"] -= 1;
		PLAYER["speedY"] = Math.min(PLAYER["speedY"] + GRAVITY_ACCEL, TERMINAL_VELOCITY);
	}

	if (CONTROLLER["KeyX"] === 1 && PLAYER["jumpJuice"] > 0 && isPlayerStanding(level)) {
		PLAYER["speedY"] -= JUMP_ACCEL;
	}
}

export function translatePlayer() {
	PLAYER["x"] += PLAYER["speed"];
	PLAYER["x"] = Math.floor(PLAYER["x"]);

	PLAYER["y"] += PLAYER["speedY"];
	PLAYER["y"] = Math.round(PLAYER["y"]);
}
