/* Animation Helpers */

import {
	CONTROLLER,
	PLAYER,
} from "./state.js";

import {
	isPlayerStanding,
} from "./boundaries.js";

import {
	SPRITES,
	PROTAGONIST,
} from "./data/sprites.js"

import {
	ENEMY_LOOKUP
} from "./data/enemy.js"

import {
	playerFacingLeft,
} from "./helpers.js";


export function findAnimationCycle(LEVEL) {
	let animationArray;
	let animationCycle;

	if (!isPlayerStanding(LEVEL)) {
		animationArray = SPRITES[PROTAGONIST]["JUMP_CYCLE"];
		animationCycle = "JUMP_CYCLE";
	} else
	if(CONTROLLER["ArrowDown"] === 1) {
		animationArray = SPRITES[PROTAGONIST]["CROUCH_CYCLE"];
		animationCycle = "CROUCH_CYCLE";
	}
	else
	if(
		playerFacingLeft() !== PLAYER["wasFacingLeftLastFrame"] ||
		(PLAYER["lastAnimationCycle"] === "TURN_CYCLE" &&
		PLAYER["lastAnimationCycleCount"] < SPRITES[PROTAGONIST]["TURN_CYCLE"][0]["frameDuration"])
	)
	{
		animationArray = SPRITES[PROTAGONIST]["TURN_CYCLE"];
		animationCycle = "TURN_CYCLE";
	}
	else
	if (
		Math.abs(PLAYER["speedSP"]) > 0 ||
		(CONTROLLER["ArrowLeft"] && !CONTROLLER["ArrowRight"]) ||
		(!CONTROLLER["ArrowLeft"] && CONTROLLER["ArrowRight"])
	) {
		if (
			   CONTROLLER["KeyZ"]
			&& CONTROLLER["ShiftLeft"] === 0
			&& CONTROLLER["ShiftRight"] === 0
			&& ENABLE_SHOOTING_WHILE_RUNNING
		) {
			animationArray = SPRITES[PROTAGONIST]["WALK_SHOOT_CYCLE"];
			animationCycle = "WALK_SHOOT_CYCLE";
		}
		else
		if(CONTROLLER["ShiftLeft"] || CONTROLLER["ShiftRight"]) {
			animationArray = SPRITES[PROTAGONIST]["WALK_CYCLE"];
			animationCycle = "WALK_CYCLE";  // replace with run cycle
		}
		else {
			animationArray = SPRITES[PROTAGONIST]["WALK_CYCLE"];
			animationCycle = "WALK_CYCLE";
		}
	} else {
		if (CONTROLLER["KeyZ"]) {
			animationArray = SPRITES[PROTAGONIST]["SHOOT_CYCLE"];
			animationCycle = "SHOOT_CYCLE";
		}
		else
		{
			animationArray = SPRITES[PROTAGONIST]["STAND_CYCLE"];
			animationCycle = "STAND_CYCLE";
		}
	}

	// manage state
	if(PLAYER["lastAnimationCycle"] !== animationCycle)
		PLAYER["lastAnimationCycleCount"] = 0
	PLAYER["lastAnimationCycle"] = animationCycle;
	PLAYER["lastAnimationCycleCount"] += 1;
	PLAYER["wasFacingLeftLastFrame"] = playerFacingLeft();
	return animationArray;
}


export function updatePlayerPointers(animationArray, spriteObject) {
	// move to first frame of animation if we reach the end
	if (spriteObject["spritePtr"] >= animationArray.length) {
		spriteObject["spritePtr"] = 0;
		spriteObject["frameCounter"] = 0;
	}

	// move through duration of a single animation frame
	spriteObject["frameCounter"] += 1;
	if (spriteObject["frameCounter"] > animationArray[spriteObject["spritePtr"]]["frameDuration"] - 1) {
		spriteObject["frameCounter"] = 0;
		spriteObject["spritePtr"] = (spriteObject["spritePtr"] + 1) % animationArray.length;
	}
}

export function updateCyclePointers(spriteObject) {
	let animationCycleName = spriteObject["animationCycleName"];
	let animationArray = ENEMY_LOOKUP[spriteObject["ptr"]][animationCycleName];

	// move to first frame of animation if we reach the end
	if (spriteObject["spritePtr"] >= animationArray.length) {
		spriteObject["spritePtr"] = 0;
		spriteObject["frameCounter"] = 0;
	}

	// move through duration of a single animation frame
	spriteObject["frameCounter"] += 1;
	if (spriteObject["frameCounter"] > animationArray[spriteObject["spritePtr"]]["frameDuration"] - 1) {
		spriteObject["frameCounter"] = 0;
		spriteObject["spritePtr"] = (spriteObject["spritePtr"] + 1) % animationArray.length;
	}
}
