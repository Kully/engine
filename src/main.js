"use strict";


import {
	handleXBoundaryCollision,
	handleYBoundaryCollision,
	isPlayerStanding,
} from "./boundaries.js";

import {
	DARK_PALETTE,
} from "./colors.js";

import {
	SPRITE_WIDTH,
	GRID_WIDTH_PX,
	SCALE,
	SCALE2,
	FPS,
	VALID_CONTROLLER_KEYS,
} from "./constants.js";

import {
	hexToRgb,
	validatePixelColor,
	getValueFrom2DArray,
	createHiddenSpriteLookups,
	clearCanvas,
	drawLevel,
	drawPlayer,
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
	SPRITE_LOOKUP,
	STAND_CYCLE,
	SKID_CYCLE,
	WALK_CYCLE,
	JUMP_CYCLE,
	WALK_CYCLE_FRAMES_SLOW,
	WALK_CYCLE_FRAMES_FAST,
} from "./sprites.js";

import {
	CAMERA,
	CONTROLLER,
	PLAYER,
} from "./state.js";


document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

const canvas = document.getElementById("canvas");
const canvas2 = document.getElementById("canvas2");
const canvasSprites = document.getElementById("canvas-sprites");

const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctxSprites = canvasSprites.getContext("2d", {
	willReadFrequently: true
});

canvas.width = CAMERA["width"];
canvas.height = CAMERA["height"];
canvas2.width = canvas.width;
canvas2.height = canvas.height;

let lookups = createHiddenSpriteLookups(canvasSprites, ctxSprites);
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
		animationArray = JUMP_CYCLE;
	} else
	if (Math.abs(PLAYER["speed"]) > 0 || CONTROLLER["ArrowLeft"] || CONTROLLER["ArrowRight"]) {
		if (PLAYER["speed"] > 0 && CONTROLLER["ArrowLeft"] && !CONTROLLER["ArrowRight"] && CONTROLLER["KeyZ"]) {
			animationArray = SKID_CYCLE;
		} else
		if (PLAYER["speed"] < 0 && !CONTROLLER["ArrowLeft"] && CONTROLLER["ArrowRight"] && CONTROLLER["KeyZ"]) {
			animationArray = SKID_CYCLE;
		} else {
			animationArray = WALK_CYCLE;
		}
	} else {
		animationArray = STAND_CYCLE;
	}

	return animationArray;
}


function followPlayerWithCamera() {
	function _moveCamera(variable, lowThresh, highThresh, speedVar) {
		if (PLAYER[variable] > CAMERA[highThresh] && PLAYER[speedVar] > 0) {
			let delta = Math.abs(PLAYER[variable] - CAMERA[highThresh]);
			CAMERA[variable + "Offset"] += delta;
			PLAYER[variable] = CAMERA[highThresh];
		} else
		if ((PLAYER[variable]) < CAMERA[lowThresh] && PLAYER[speedVar] < 0) {
			let delta = Math.abs(PLAYER[variable] - CAMERA[lowThresh]);
			CAMERA[variable + "Offset"] -= delta;
			PLAYER[variable] = CAMERA[lowThresh];
		}
	}
	_moveCamera("x", "leftThresh", "rightThresh", "speed");
	_moveCamera("y", "upThresh", "downThresh", "speedY");
}

function gameLoop(e) {
	followPlayerWithCamera();

	updateHorizontalSpeed();
	updateVerticalSpeed(LEVEL);
	translatePlayer();

	handleYBoundaryCollision(LEVEL);
	handleXBoundaryCollision(LEVEL);

	let animationArray = findAnimationCycle();
	updatePlayerPointers(animationArray);

	clearCanvas(canvas, ctx);
	clearCanvas(canvas2, ctx2);
	drawLevel(ctx, ctxSprites, LEVEL, spriteSlotLookup);
	drawPlayer(ctx2, animationArray);
}

setInterval(gameLoop, 1000 / FPS);