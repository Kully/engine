/* Physics */

import {
	isPlayerStanding,
} from "./boundaries.js";

import {
	SCALE,
} from "./constants.js";

import {
	WALK_CYCLE,
	WALK_CYCLE_FRAMES_SLOW,
	WALK_CYCLE_FRAMES_FAST,
} from "./sprites.js";

import {
	CONTROLLER,
	PLAYER,
} from "./state.js";


const CAN_RUN = false;

const ACCELERATION = 1;
const DECELERATION = 2;
const MAX_SPEED = 4;
const RUN_MAX_SPEED = 6;

const JUMP_ACCEL = 11;
const GRAVITY_ACCEL = 0.5;
const TERMINAL_VELOCITY = 130;

export function updateHorizontalSpeed() {
	let maxSpeed = MAX_SPEED;
	let walkFrameArr;
	if(CAN_RUN)
	{
		if (CONTROLLER["KeyZ"] == 1) {
			maxSpeed = RUN_MAX_SPEED;
			walkFrameArr = WALK_CYCLE_FRAMES_FAST;
		} else {
			walkFrameArr = WALK_CYCLE_FRAMES_SLOW;
		}
	}
	else
	{
		walkFrameArr = WALK_CYCLE_FRAMES_SLOW;
	}
	WALK_CYCLE[0]["frameDuration"] = walkFrameArr[0]
	WALK_CYCLE[1]["frameDuration"] = walkFrameArr[1]
	WALK_CYCLE[2]["frameDuration"] = walkFrameArr[2]
	WALK_CYCLE[3]["frameDuration"] = walkFrameArr[3]

	if (CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
		PLAYER["speed"] -= ACCELERATION;
	else
	if (CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 1)
		PLAYER["speed"] += ACCELERATION;
	else
	if (PLAYER["speed"] > 0.25)
		PLAYER["speed"] -= DECELERATION;
	else
	if (PLAYER["speed"] < -0.25)
		PLAYER["speed"] += DECELERATION;
	else
		PLAYER["speed"] = 0;

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
	PLAYER["x"] += PLAYER["speed"];
	PLAYER["x"] = Math.round(PLAYER["x"]);

	PLAYER["y"] += PLAYER["speedY"];
	PLAYER["y"] = Math.round(PLAYER["y"]);
}