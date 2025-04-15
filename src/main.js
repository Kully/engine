"use strict";

import {
	findAnimationCycle,
	updatePlayerPointers,
	updateCyclePointers,
} from "./animation.js";

import {
	handleBoundaryCollision,
	handleItemCollision,
	handleBulletCollision,
	handleEnemyCollision,
	isPlayerStanding,
	getPlayerGridX,
	getPlayerGridY,
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
	drawEnemyLayer,
	drawItemLayer,
	drawBullets,
} from "./helpers.js";

import {
	LEVEL_LOOKUP,
	LEVEL,
	ITEM_LEVEL,
	ENEMY_LEVEL,
	INIT_ENEMY_LEVEL,
	INIT_PLAYER_X,
	INIT_PLAYER_Y,
	GRAB_LEVEL,
} from "./data/levels.js";
import {
	SPRITES,
	PROTAGONIST,
} from "./data/sprites.js"
import {
	ENEMY_LOOKUP,
} from "./data/enemy.js";;

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
	CAMERA,
	CONTROLLER,
	PLAYER,
	STATE,
	ACTIVE_BULLETS,
	ACTIVE_ENEMIES,
} from "./state.js";

import {
	getValueFrom2DArray,
	putValueTo2DArray,
	areEnemiesValidPair,
	copy2DArray,
} from "./pure.js";


// setup audio pieces
const AUDIO = {
	// "step": new Audio("assets/audio/sfx/glass_click.mp3"),
	"step": new Audio("assets/audio/sfx/step_sound_delayed_start.mp3"),
	"grab": new Audio("assets/audio/sfx/grab.mp3"),
	"drop": new Audio("assets/audio/sfx/drop.mp3"),
	"dropFail": new Audio("assets/audio/sfx/dropFail.mp3"),
	"bell": new Audio("assets/audio/sfx/final_bell.mp3"),
};


// grab hud elements
const currentScoreValue = document.getElementById("score-value");
currentScoreValue.innerHTML = STATE["currentSquaresCompleted"];

const gameOverText = document.getElementById("game-over-text");

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

const bkgdLayerCanvas = document.getElementById("bkgd-layer-canvas");
const levelLayerCanvas = document.getElementById("level-layer-canvas");
const playerLayerCanvas = document.getElementById("player-layer-canvas");
const itemLayerCanvas = document.getElementById("item-layer-canvas");
const hudCanvas = document.getElementById("hud-layer-canvas");
const spritesCanvas = document.getElementById("prerender-sprites-canvas");

const bkgdLayerCtx = bkgdLayerCanvas.getContext("2d", {willReadFrequently: true});
const levelLayerCtx = levelLayerCanvas.getContext("2d", {willReadFrequently: true});
const playerLayerCtx = playerLayerCanvas.getContext("2d", {willReadFrequently: true});
const itemLayerCtx = itemLayerCanvas.getContext("2d", {willReadFrequently: true});
const spritesCtx = spritesCanvas.getContext("2d", {willReadFrequently: true});
const hudLayerCtx = hudCanvas.getContext("2d", {willReadFrequently: true});

levelLayerCanvas.width = CAMERA["width"];
levelLayerCanvas.height = CAMERA["height"];

hudLayerCtx.width = levelLayerCanvas.width;
hudLayerCtx.height = levelLayerCanvas.height;
playerLayerCanvas.width = levelLayerCanvas.width;
playerLayerCanvas.height = levelLayerCanvas.height;
itemLayerCanvas.width = levelLayerCanvas.width;
itemLayerCanvas.height = levelLayerCanvas.height;
bkgdLayerCanvas.width = levelLayerCanvas.width;
bkgdLayerCanvas.height = levelLayerCanvas.height;

let lookups = createHiddenSpriteLookups(spritesCanvas, spritesCtx);
let spriteSlotLookup = lookups[0];
let slotSpriteLookup = lookups[1];

function moveCamera(player, activeEnemies) {
	let combinedAnima = [player];
	combinedAnima.push(...activeEnemies)
	function _moveCamera(variable, lowThresh, highThresh, speedVar) {
		if (PLAYER[variable] > CAMERA[highThresh]) {
			let distPastThresh = Math.abs(PLAYER[variable] - CAMERA[highThresh]);
			let dist = Math.floor(distPastThresh / CAMERA["easeIn"]);
			CAMERA[variable + "Offset"] += dist;

			for (let obj of combinedAnima)
				obj[variable] -= dist;
		} else
		if ((PLAYER[variable]) < CAMERA[lowThresh]) {
			let distPastThresh = Math.abs(PLAYER[variable] - CAMERA[lowThresh]);
			let dist = Math.floor(distPastThresh / CAMERA["easeIn"]);
			CAMERA[variable + "Offset"] -= dist;

			for (let obj of combinedAnima)
				obj[variable] += dist;
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

function isPlayerOutOfBounds()
{
	if(PLAYER["x"] / GRID_WIDTH_PX === 0)
		return 1;
	if(PLAYER["x"] / GRID_WIDTH_PX === 13)
		return 1;
	if(PLAYER["y"] / GRID_WIDTH_PX === 1)
		return 1;
	if(PLAYER["y"] / GRID_WIDTH_PX === 8)
		return 1;
	return 0;
}


let calcFpsValue = document.getElementById("fps");
// drawBkgdLayer(bkgdLayerCtx, true);


document.addEventListener("keydown", function(e) {
	if (e.code == "KeyA")
	{
		PLAYER["x"] -= GRID_WIDTH_PX;
		AUDIO["step"].currentTime = 0;
		AUDIO["step"].play();
	}
	if (e.code == "KeyD")
	{
		PLAYER["x"] += GRID_WIDTH_PX;
		AUDIO["step"].currentTime = 0;
		AUDIO["step"].play();
	}
	if (e.code == "KeyW")
	{
		PLAYER["y"] -= GRID_WIDTH_PX;
		AUDIO["step"].currentTime = 0;
		AUDIO["step"].play();
	}
	if (e.code == "KeyS")
	{
		PLAYER["y"] += GRID_WIDTH_PX;
		AUDIO["step"].currentTime = 0;
		AUDIO["step"].play();
	}
})


function findNumberOfEmptySpots() {
	let emptySpots = 0;
	for(let y = 1; y < ENEMY_LEVEL.length - 1; y++) {
		for(let x = 1; x < ENEMY_LEVEL[0].length - 1; x++) {
			if(getValueFrom2DArray(ENEMY_LEVEL, x, y) === 0) {
				emptySpots++;
			}
		}
	}
	return emptySpots;
}

// spawn variables
let spawnInterval = 100;
let spawnBoostPerItemsMatched = 10;
let spawnIntervalDecrement = 10;
let spawnIntervalMinimum = 20;
let spawnFrameCounter = 0;

let FRAME = 0;
let COUNTER = 0;
let startTime;
function gameLoop(e) {
	if(STATE["gameOver"] === true)
	{
		FRAME = 0;
		COUNTER = 0;
		STATE["currentSquaresCompleted"] = 0;
		STATE["lastFrameSquaresCompleted"] = 0;
		STATE["mostSquaresCompleted"] = 0;
		STATE["squaresCompletedStreak"] = 0;

		// make the level empty
		for(let y = 1; y < ENEMY_LEVEL.length - 1; y++) {
			for(let x = 1; x < ENEMY_LEVEL[0].length - 1; x++) {
				putValueTo2DArray(ENEMY_LEVEL, x, y, 0);
			}
		}

		// escape the game over loop only once you press Enter
		console.log(CONTROLLER["Enter"])
		if(CONTROLLER["Enter"] === 1)
		{
			// clear the board
			copy2DArray(INIT_ENEMY_LEVEL, ENEMY_LEVEL);
			PLAYER["x"] = INIT_PLAYER_X * GRID_WIDTH_PX;
			PLAYER["y"] = INIT_PLAYER_Y * GRID_WIDTH_PX;

			// reset the HUD elements
			gameOverText.style.visibility = "hidden";
			currentScoreValue.innerHTML = STATE["currentSquaresCompleted"];

			// clear the level and player layers
			clearCanvas(levelLayerCanvas, levelLayerCtx);
			clearCanvas(playerLayerCanvas, playerLayerCtx);

			STATE["gameOver"] = false;
		}
		return;
	}

	if(false)
		moveCamera(PLAYER, ACTIVE_ENEMIES);

	// increase the spawn every wave (every 10 points)
	if(STATE["lastFrameSquaresCompleted"] !== STATE["currentSquaresCompleted"])
	{
		if(STATE["currentSquaresCompleted"] > 0 && STATE["currentSquaresCompleted"] % spawnBoostPerItemsMatched === 0)
		{
			spawnInterval = Math.max(spawnIntervalMinimum, spawnInterval - spawnIntervalDecrement);
		}
	}

	// keep track of the last frame's squares completed
	STATE["lastFrameSquaresCompleted"] = STATE["currentSquaresCompleted"];

	// end the game if there are no more empty slots
	if(findNumberOfEmptySpots() <= 1)
	{
		STATE["gameOver"] = true;
		gameOverText.style.visibility = "visible";

		// clearCanvas(levelLayerCanvas, levelLayerCtx);
		// clearCanvas(playerLayerCanvas, playerLayerCtx);
	}

	// spawn new items into the board
	if(STATE["currentSquaresCompleted"] > 0 && spawnFrameCounter === 1) // add an arbitrary 5-frame spawn buffer
	{
		// Find a random empty spot
		const emptySpot = findRandomEmptySpot();
		if (emptySpot) {
			const [x, y] = emptySpot;

			// get a random item type
			const enemyTypes = [3, 4];
			const randomEnemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

			// place the item in the level
			putValueTo2DArray(ENEMY_LEVEL, x, y, randomEnemyType);
		}
	}

	// update player cycles
	let animationArray = findAnimationCycle(LEVEL);
	updatePlayerPointers(animationArray, PLAYER);

	// update enemy cycles
	for(let enemyObject of ACTIVE_ENEMIES)
		updateCyclePointers(enemyObject);

	// Mechanics of the game are presented here
	if(
		   CONTROLLER["KeyK"] === 1
		&& PLAYER["pickedUpItemInitCoords"][0] === -1
		&& PLAYER["pickedUpItemInitCoords"][1] === -1
	)
	{
		// If you are trying to hold a new enemy
		let playerX = getPlayerGridX(PLAYER["x"]);
		let playerY = getPlayerGridY(PLAYER["y"]) - 1;
		let enemyIndex = getValueFrom2DArray(ENEMY_LEVEL, playerX, playerY);
		if(enemyIndex !== 0)
		{
			PLAYER["pickedUpItemInitCoords"] = [playerX, playerY];
			// swap enemy from enemy layer to grab layer
			putValueTo2DArray(LEVEL_LOOKUP["level"]["enemy"], playerX, playerY, 0);
			putValueTo2DArray(LEVEL_LOOKUP["level"]["grab"], playerX, playerY, enemyIndex);
			PLAYER["pickedUpItemPtr"] = enemyIndex;
			AUDIO["grab"].currentTime = 0;
			AUDIO["grab"].play();
		}
	}
	else
	if(
		CONTROLLER["KeyK"] === 1
		&& PLAYER["pickedUpItemInitCoords"][0] !== -1
		&& PLAYER["pickedUpItemInitCoords"][1] !== -1
	)
	{
		let playerX = getPlayerGridX(PLAYER["x"]);
		let playerY = getPlayerGridY(PLAYER["y"]) - 1;

		if(PLAYER["pickedUpItemPtr"] !== -1 && !isPlayerOutOfBounds())
		{
			putValueTo2DArray(
				LEVEL_LOOKUP["level"]["grab"],
				PLAYER["pickedUpItemInitCoords"][0],
				PLAYER["pickedUpItemInitCoords"][1],
				0
			);
			putValueTo2DArray(
				LEVEL_LOOKUP["level"]["grab"],
				playerX,
				playerY,
				PLAYER["pickedUpItemPtr"],
			);
			PLAYER["pickedUpItemInitCoords"] = [playerX, playerY];
		}
	}
	else
	if(
		CONTROLLER["KeyK"] === 0
		&& PLAYER["pickedUpItemPtr"] !== -1
	)
	{
		// decide if we can place the enemy back on the enemy layer
		let playerX = getPlayerGridX(PLAYER["x"]);
		let playerY = getPlayerGridY(PLAYER["y"]) - 1;

		let itemAbovePtr = getValueFrom2DArray(LEVEL_LOOKUP["level"]["grab"], playerX, playerY)
		let itemBelowPtr = getValueFrom2DArray(LEVEL_LOOKUP["level"]["enemy"], playerX, playerY)
		if(areEnemiesValidPair(itemBelowPtr, itemAbovePtr))
		{
			// remove both items, trigger SFX, and increment score
			putValueTo2DArray(LEVEL_LOOKUP["level"]["grab"], playerX, playerY, 0);
			putValueTo2DArray(LEVEL_LOOKUP["level"]["enemy"], playerX, playerY, 0);

			// manage score state
			STATE["currentSquaresCompleted"] += 1;
			STATE["squaresCompletedStreak"] += 1;
			if(STATE["currentSquaresCompleted"] > STATE["mostSquaresCompleted"])
				STATE["mostSquaresCompleted"] += 1;
			currentScoreValue.innerHTML = STATE["currentSquaresCompleted"];
			AUDIO["drop"].currentTime = 0;
			AUDIO["drop"].play();

			// chime a bell one level X9
			if(STATE["currentSquaresCompleted"] % 10 === 0)
			{
				AUDIO["bell"].currentTime = 0;
				AUDIO["bell"].play();
			}
		}
		else
		if(itemBelowPtr === 0)
		{
			// simply drop the piece
			putValueTo2DArray(LEVEL_LOOKUP["level"]["grab"], playerX, playerY, 0);
			putValueTo2DArray(LEVEL_LOOKUP["level"]["enemy"], playerX, playerY, PLAYER["pickedUpItemPtr"]);
		}
		else
		{
			// TODO: return piece to its original spawned location (or somewhere else)
			putValueTo2DArray(LEVEL_LOOKUP["level"]["grab"], playerX, playerY, 0);
			putValueTo2DArray(LEVEL_LOOKUP["level"]["enemy"], playerX, playerY, PLAYER["pickedUpItemPtr"]);
			STATE["squaresCompletedStreak"] = 0;
			AUDIO["dropFail"].currentTime = 0;
			AUDIO["dropFail"].play();
		}

		// reset params to tell us that we are not holding anything
		PLAYER["pickedUpItemInitCoords"] = [-1, -1];
		PLAYER["pickedUpItemPtr"] = -1;
	}

	addBulletsToScene();
	updateBulletPositions();
	handleBulletCollision(LEVEL);

	// make sure the cursor stays within the arena
	if(PLAYER["x"] / GRID_WIDTH_PX === 0)
		PLAYER["x"] = GRID_WIDTH_PX * 1;
	if(PLAYER["x"] / GRID_WIDTH_PX === 13)
		PLAYER["x"] = GRID_WIDTH_PX * 12;
	if(PLAYER["y"] / GRID_WIDTH_PX === 1)
		PLAYER["y"] = GRID_WIDTH_PX * 2;
	if(PLAYER["y"] / GRID_WIDTH_PX === 8)
		PLAYER["y"] = GRID_WIDTH_PX * 7;

	if(SHOW_BACKGROUND_LAYER)
	{
		clearCanvas(bkgdLayerCanvas, bkgdLayerCtx);
		drawAnimatingBkgdLayer(bkgdLayerCtx, FRAME);
	}

	// draw game level
	clearCanvas(levelLayerCanvas, levelLayerCtx);
	drawLevelLayer(levelLayerCtx, spritesCtx, LEVEL, spriteSlotLookup, false, FRAME);

	// draw players, playfield, and held objects
	clearCanvas(playerLayerCanvas, playerLayerCtx);
	drawEnemyLayer(playerLayerCtx, ENEMY_LEVEL, FRAME);
	drawEnemyLayer(playerLayerCtx, GRAB_LEVEL, FRAME);
	drawPlayerLayer(playerLayerCtx, animationArray, FRAME);


	// increment the global frame counter
	FRAME += 1;

	// increment the spawn frame counter
	spawnFrameCounter += 1;
	if(spawnFrameCounter >= spawnInterval)
	{
		spawnFrameCounter = 0;
	}

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

function findRandomEmptySpot() {
	const maxAttempts = 100; // Prevent infinite loops
	let attempts = 0;
	
	while (attempts < maxAttempts) {
		// Generate random coordinates within the level bounds, excluding edges
		const x = Math.floor(Math.random() * (ENEMY_LEVEL[0].length - 2)) + 1; // Exclude x=0 and x=13
		const y = Math.floor(Math.random() * (ENEMY_LEVEL.length - 2)) + 1; // Exclude y=0 and y=7
		
		// Check if the spot is empty
		if (getValueFrom2DArray(ENEMY_LEVEL, x, y) === 0) {
			return [x, y];
		}
		attempts++;
	}
	
	// If no empty spot found, return null
	return null;
}
