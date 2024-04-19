"use strict";


import {
	handleBoundaryCollision,
	isPlayerStanding,
} from "./boundaries.js";

import {
	FPS,
} from "./constants.js";

import {
	createHiddenSpriteLookups,
	clearCanvas,
	drawLevelLayer,
	drawPlayerLayer,
} from "./helpers.js";

import {
	LEVEL,
} from "./levels.js";

import {
	handleKeyDown,
	handleKeyUp,
} from "./listeners.js";

import {
	updateHorizontalSpeed,
	updateVerticalSpeed,
	translatePlayer,
} from "./physics.js"

import {
	PROTAGONIST,
	SPRITES,
} from "./sprites.js";

import {
	CAMERA,
	CONTROLLER,
	PLAYER,
	ENEMY2,
} from "./state.js";


document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

const levelLayerCanvas = document.getElementById("level-layer-canvas");
const playerLayerCanvas = document.getElementById("player-layer-canvas");
const spritesCanvas = document.getElementById("prerender-sprites-canvas");

const levelLayerCtx = levelLayerCanvas.getContext("2d");
const playerLayerCtx = playerLayerCanvas.getContext("2d");
const spritesCtx = spritesCanvas.getContext("2d", {
	willReadFrequently: true
});

levelLayerCanvas.width = CAMERA["width"];
levelLayerCanvas.height = CAMERA["height"];
playerLayerCanvas.width = levelLayerCanvas.width;
playerLayerCanvas.height = levelLayerCanvas.height;

let lookups = createHiddenSpriteLookups(spritesCanvas, spritesCtx);
let spriteSlotLookup = lookups[0];
let slotSpriteLookup = lookups[1];

function updatePlayerPointers(animationArray) {
	// move to first frame of animation if we reach the end
	if (PLAYER["spritePtr"] >= animationArray.length) {
		PLAYER["spritePtr"] = 0;
		PLAYER["frameCounter"] = 0;
	}

	// move through duration of a single animation frame
	PLAYER["frameCounter"] += 1;
	if (PLAYER["frameCounter"] > animationArray[PLAYER["spritePtr"]]["frameDuration"] - 1) {
		PLAYER["frameCounter"] = 0;
		PLAYER["spritePtr"] = (PLAYER["spritePtr"] + 1) % animationArray.length;
	}
}

function findAnimationCycle() {
	let animationArray;
	if (!isPlayerStanding(LEVEL)) {
		animationArray = SPRITES[PROTAGONIST]["JUMP_CYCLE"];
	} else
	if (
		Math.abs(PLAYER["speed"]) > 0 ||
		(CONTROLLER["ArrowLeft"] && !CONTROLLER["ArrowRight"]) ||
		(!CONTROLLER["ArrowLeft"] && CONTROLLER["ArrowRight"])
	) {
		if (CONTROLLER["KeyZ"]) {
			animationArray = SPRITES[PROTAGONIST]["WALK_SHOOT_CYCLE"];
		}
		else {
			animationArray = SPRITES[PROTAGONIST]["WALK_CYCLE"];
		}
	} else {
		if (CONTROLLER["KeyZ"]) {
			animationArray = SPRITES[PROTAGONIST]["SHOOT_CYCLE"];
		}
		else
		{
			animationArray = SPRITES[PROTAGONIST]["STAND_CYCLE"];
		}
	}

	return animationArray;
}

function followPlayerWithCamera() {
	function _moveCamera(variable, lowThresh, highThresh, speedVar) {
		if (PLAYER[variable] > CAMERA[highThresh]) {
			let distPastThresh = Math.abs(PLAYER[variable] - CAMERA[highThresh]);
			let dist = Math.floor(distPastThresh / CAMERA["easeIn"]);
			CAMERA[variable + "Offset"] += dist;

			PLAYER[variable] -= dist;
			ENEMY2[variable] -= dist;
		} else
		if ((PLAYER[variable]) < CAMERA[lowThresh]) {
			let distPastThresh = Math.abs(PLAYER[variable] - CAMERA[lowThresh]);
			let dist = Math.floor(distPastThresh / CAMERA["easeIn"]);
			CAMERA[variable + "Offset"] -= dist;

			PLAYER[variable] += dist;
			ENEMY2[variable] += dist;
		}
	}
	_moveCamera("x", "leftThresh", "rightThresh", "speed");
	_moveCamera("y", "upThresh", "downThresh", "speedY");
}

let FRAME = 0;

function gameLoop(e) {
	followPlayerWithCamera();

	updateHorizontalSpeed();
	updateVerticalSpeed(LEVEL);
	translatePlayer();

	handleBoundaryCollision(LEVEL);

	let animationArray = findAnimationCycle();
	updatePlayerPointers(animationArray);

	clearCanvas(levelLayerCanvas, levelLayerCtx);
	clearCanvas(playerLayerCanvas, playerLayerCtx);
	drawLevelLayer(levelLayerCtx, spritesCtx, LEVEL, spriteSlotLookup);
	drawPlayerLayer(playerLayerCtx, animationArray, FRAME);
	FRAME += 1;
}

setInterval(gameLoop, 1000 / FPS);