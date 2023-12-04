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
	STAND_CYCLE,
	SKID_CYCLE,
	WALK_CYCLE,
	JUMP_CYCLE,
	SPRITES,
} from "./sprites.js";

import {
	CAMERA,
	CONTROLLER,
	PLAYER,
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
	if (PLAYER["walkSpritePointer"] >= animationArray.length) {
		PLAYER["walkSpritePointer"] = 0;
		PLAYER["walkFrameCounter"] = 0;
	}
	PLAYER["walkFrameCounter"] += 1;
	if (PLAYER["walkFrameCounter"] > animationArray[PLAYER["walkSpritePointer"]]["frameDuration"] - 1) {
		PLAYER["walkFrameCounter"] = 0;
		PLAYER["walkSpritePointer"] = (PLAYER["walkSpritePointer"] + 1) % animationArray.length;
	}
}

function findAnimationCycle() {
	let animationArray;
	if (!isPlayerStanding(LEVEL)) {
		animationArray = SPRITES["ranger"]["JUMP_CYCLE"];
	} else
	if (Math.abs(PLAYER["speed"]) > 0 || CONTROLLER["ArrowLeft"] || CONTROLLER["ArrowRight"]) {
		if (SPRITES["ranger"]["SKID_CYCLE"]) {
			if (PLAYER["speed"] > 0 && CONTROLLER["ArrowLeft"] && !CONTROLLER["ArrowRight"] && CONTROLLER["KeyZ"]) {
				animationArray = SKID_CYCLE;
			} else
			if (PLAYER["speed"] < 0 && !CONTROLLER["ArrowLeft"] && CONTROLLER["ArrowRight"] && CONTROLLER["KeyZ"]) {
				animationArray = SKID_CYCLE;
			} else {
				animationArray = WALK_CYCLE;
			}
		} else {
			animationArray = SPRITES["ranger"]["WALK_CYCLE"];
		}
	} else {
		animationArray = SPRITES["ranger"]["STAND_CYCLE"];
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
		} else
		if ((PLAYER[variable]) < CAMERA[lowThresh]) {
			let distPastThresh = Math.abs(PLAYER[variable] - CAMERA[lowThresh]);
			let dist = Math.floor(distPastThresh / CAMERA["easeIn"]);
			CAMERA[variable + "Offset"] -= dist;
			PLAYER[variable] += dist;
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
	drawPlayerLayer(playerLayerCtx, animationArray);
	FRAME += 1;
}

setInterval(gameLoop, 1000 / FPS);