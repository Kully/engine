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


export function updateHorizontalSpeed() {
	let maxSpeed = SCALE;
	let accInc = 0.8;
	let decInc = 0.17;
	let walk_frame_arr;
	if (CONTROLLER["KeyZ"] == 1) {
		maxSpeed = 1.6 * SCALE;
		walk_frame_arr = WALK_CYCLE_FRAMES_FAST;
	} else {
		walk_frame_arr = WALK_CYCLE_FRAMES_SLOW;
	}
	WALK_CYCLE[0]["frameDuration"] = walk_frame_arr[0]
	WALK_CYCLE[1]["frameDuration"] = walk_frame_arr[1]
	WALK_CYCLE[2]["frameDuration"] = walk_frame_arr[2]
	WALK_CYCLE[3]["frameDuration"] = walk_frame_arr[3]

	if (CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
		PLAYER["speed"] -= accInc;
	else
	if (CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 1)
		PLAYER["speed"] += accInc;
	else {
		if (PLAYER["speed"] > 0.25)
			PLAYER["speed"] -= decInc;
		else
		if (PLAYER["speed"] < -0.25)
			PLAYER["speed"] += decInc;
		else
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
		PLAYER["jumpJuice"] = 1;
	} else
	if (!isPlayerStanding(level)) {
		PLAYER["jumpJuice"] -= 1;
		PLAYER["speedY"] = Math.min(PLAYER["speedY"] + 0.65, 13);
	}

	if (CONTROLLER["KeyX"] === 1 && PLAYER["jumpJuice"] > 0 && isPlayerStanding(level)) {
		PLAYER["speedY"] -= 10;
	}
}


export function translatePlayer() {
	PLAYER["x"] += PLAYER["speed"];
	PLAYER["x"] = Math.round(PLAYER["x"]);

	PLAYER["y"] += PLAYER["speedY"];
	PLAYER["y"] = Math.round(PLAYER["y"]);
}