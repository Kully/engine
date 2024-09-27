"use strict";


import {
	handleBoundaryCollision,
	handleItemCollision,
	handleBulletCollision,
	isPlayerStanding,
} from "./boundaries.js";

import {
	FPS,
	SHOW_BACKGROUND_LAYER,
	ENABLE_SHOOTING_WHILE_RUNNING,
	GRID_WIDTH_PX,
} from "./constants.js";

import {
	createHiddenSpriteLookups,
	clearCanvas,
	playerFacingLeft,
	drawBkgdLayer,
	drawAnimatingBkgdLayer,
	drawLevelLayer,
	drawPlayerLayer,
	drawItemLayer,
	drawBullets,
} from "./helpers.js";

import {
	LEVEL,
	ITEM_LEVEL,
} from "./data/levels.js";

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
} from "./data/sprites.js";

import {
	CAMERA,
	CONTROLLER,
	PLAYER,
	ENEMY2,
	SLOTH,
	SCREENSHAKE,
	STATE,
	ACTIVE_BULLETS,
} from "./state.js";


document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

const bkgdLayerCanvas = document.getElementById("bkgd-layer-canvas");
const levelLayerCanvas = document.getElementById("level-layer-canvas");
const playerLayerCanvas = document.getElementById("player-layer-canvas");
const itemLayerCanvas = document.getElementById("item-layer-canvas");
const spritesCanvas = document.getElementById("prerender-sprites-canvas");

const bkgdLayerCtx = bkgdLayerCanvas.getContext("2d", {willReadFrequently: true});
const levelLayerCtx = levelLayerCanvas.getContext("2d", {willReadFrequently: true});
const playerLayerCtx = playerLayerCanvas.getContext("2d", {willReadFrequently: true});
const itemLayerCtx = itemLayerCanvas.getContext("2d", {willReadFrequently: true});
const spritesCtx = spritesCanvas.getContext("2d", {willReadFrequently: true});

levelLayerCanvas.width = CAMERA["width"];
levelLayerCanvas.height = CAMERA["height"];

playerLayerCanvas.width = levelLayerCanvas.width;
playerLayerCanvas.height = levelLayerCanvas.height;
itemLayerCanvas.width = levelLayerCanvas.width;
itemLayerCanvas.height = levelLayerCanvas.height;
bkgdLayerCanvas.width = levelLayerCanvas.width;
bkgdLayerCanvas.height = levelLayerCanvas.height;

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

function shakeScreenOnLand()
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

function findAnimationCycle(FRAME) {
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

function followPlayerWithCamera() {
	function _moveCamera(variable, lowThresh, highThresh, speedVar) {
		if (PLAYER[variable] > CAMERA[highThresh]) {
			let distPastThresh = Math.abs(PLAYER[variable] - CAMERA[highThresh]);
			let dist = Math.floor(distPastThresh / CAMERA["easeIn"]);
			CAMERA[variable + "Offset"] += dist;

			PLAYER[variable] -= dist;
			ENEMY2[variable] -= dist;
			SLOTH[variable] -= dist;
		} else
		if ((PLAYER[variable]) < CAMERA[lowThresh]) {
			let distPastThresh = Math.abs(PLAYER[variable] - CAMERA[lowThresh]);
			let dist = Math.floor(distPastThresh / CAMERA["easeIn"]);
			CAMERA[variable + "Offset"] -= dist;

			PLAYER[variable] += dist;
			ENEMY2[variable] += dist;
			SLOTH[variable] += dist;
		}
	}
	_moveCamera("x", "leftThresh", "rightThresh", "speed");
	_moveCamera("y", "upThresh", "downThresh", "speedY");
}

function addBulletsToScene() {
	if(
		   PLAYER["spritePtr"] === 1  // TODO: Make sure this happens on 0
		&& PLAYER["frameCounter"] === 0
		&& PLAYER["lastAnimationCycle"] === "SHOOT_CYCLE"
	)
	{
		let bulletX = PLAYER["x"] + CAMERA["xOffset"];
		let bulletY = PLAYER["y"] + CAMERA["yOffset"];
		bulletY -= 40;  // shift the bullet up to be aligned with the gun

		let bulletBaseSpeed = 12;
		let velocity;
		if(playerFacingLeft())
		{
			velocity = -1 * bulletBaseSpeed;
		}
		else
		{
			velocity = bulletBaseSpeed;
			bulletX += GRID_WIDTH_PX;
		}

		let bullet = {
			x: bulletX,
			y: bulletY,
			velocity: velocity,
		}
		if(ACTIVE_BULLETS.length < 10)
		{
			ACTIVE_BULLETS.push(bullet);
		}
	}
}

function updateBulletPositions() {
	for(let bullet of ACTIVE_BULLETS)
	{
		bullet["x"] += bullet["velocity"];
	}
}


let calcFpsValue = document.getElementById("fps");
// drawBkgdLayer(bkgdLayerCtx, true);


let FRAME = 0;
let COUNTER = 0;
let startTime;
function gameLoop(e) {
	if(STATE["resetGame"] === true)
	{
		FRAME = 0;
		COUNTER = 0;
		STATE["resetGame"] = false;
	}

	followPlayerWithCamera();

	let animationArray = findAnimationCycle(FRAME);
	updatePlayerPointers(animationArray);

	updateHorizontalSpeed(0.5, 1, 3);
	updateVerticalSpeed(LEVEL);
	translatePlayer();

	addBulletsToScene();
	updateBulletPositions();
	handleBulletCollision(LEVEL);

	handleBoundaryCollision(LEVEL);
	handleItemCollision(ITEM_LEVEL);

	shakeScreenOnLand();

	if(SHOW_BACKGROUND_LAYER)
	{
		clearCanvas(bkgdLayerCanvas, bkgdLayerCtx);
		drawAnimatingBkgdLayer(bkgdLayerCtx, FRAME);
	}

	// draw game level
	clearCanvas(levelLayerCanvas, levelLayerCtx);
	drawLevelLayer(levelLayerCtx, spritesCtx, LEVEL, spriteSlotLookup);

	// draw colletible items
	clearCanvas(itemLayerCanvas, itemLayerCtx);
	drawItemLayer(itemLayerCtx, spritesCtx, ITEM_LEVEL, spriteSlotLookup, FRAME);

	// draw players and enemies
	clearCanvas(playerLayerCanvas, playerLayerCtx);
	drawPlayerLayer(playerLayerCtx, animationArray, FRAME);

	// draw active bullets
	drawBullets(playerLayerCtx, FRAME);

	FRAME += 1;

	// calculate and update the approximate FPS
	let iterPerCalc = 2;
	if(COUNTER === 0)
		startTime = Date.now();
	else
	if(COUNTER === iterPerCalc * FPS)
	{
		let deltaTime = Date.now() - startTime;
		let calcFPS = deltaTime / 1000 / iterPerCalc * FPS;
		calcFPS = calcFPS.toFixed(2);

		let textColor = 0;
		if(calcFPS < FPS)
			textColor = "#66BB6A";
		else
			textColor = "#EF5350";

		calcFpsValue.innerHTML = `FPS: ${calcFPS}`
		calcFpsValue.style.color = textColor;
		COUNTER = -1;
	}
	COUNTER += 1;
}

setInterval(gameLoop, 1000 / FPS);
