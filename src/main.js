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
	STAND_CYCLE,
	SKID_CYCLE,
	WALK_CYCLE,
	JUMP_CYCLE,
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

	clearCanvas(canvas, ctx);
	clearCanvas(canvas2, ctx2);
	drawLevel(ctx, ctxSprites, LEVEL, spriteSlotLookup);
	drawPlayer(ctx2, animationArray);
	FRAME += 1;
}

setInterval(gameLoop, 1000 / FPS);