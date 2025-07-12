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
	AUTO_REPEAT_DELAY_FRAMES,
	AUTO_REPEAT_RATE_FRAMES,
} from "./constants.js";

import {
	LEVEL_COLOR_MAP,
} from "./colors.js";

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
	"step": new Audio("assets/audio/sfx/step_sound_delayed_start.mp3"),
	"grab": new Audio("assets/audio/sfx/grab.mp3"),
	"dropFail": new Audio("assets/audio/sfx/error.mp3"),
	"bell": new Audio("assets/audio/sfx/new_wave.mp3"),
	"gameOver": new Audio("assets/audio/sfx/game_over.mp3"),
	"gameStart": new Audio("assets/audio/sfx/nazca_stereo.mp3"),
	// "musicSlow": new Audio("assets/audio/music/easyLevel.mp3"),
	// "musicFast": new Audio("assets/audio/music/hardLevel.mp3"),
	"shapeAppear": new Audio("assets/audio/sfx/step_sound_delayed_start.mp3"),
	"shapeMatch0": new Audio("assets/audio/sfx/correct_shape_match0.mp3"),
	"shapeMatch1": new Audio("assets/audio/sfx/correct_shape_match1.mp3"),
	"shapeMatch2": new Audio("assets/audio/sfx/correct_shape_match2.mp3"),
	"shapeMatch3": new Audio("assets/audio/sfx/correct_shape_match3.mp3"),
	"shapeMatch4": new Audio("assets/audio/sfx/correct_shape_match4.mp3"),
	"shapeMatch5": new Audio("assets/audio/sfx/correct_shape_match5.mp3"),
	"shapeMatch6": new Audio("assets/audio/sfx/correct_shape_match6.mp3"),
	"shapeMatch7": new Audio("assets/audio/sfx/correct_shape_match7.mp3"),
	"shapeMatch8": new Audio("assets/audio/sfx/correct_shape_match8.mp3"),
	"shapeMatch9": new Audio("assets/audio/sfx/correct_shape_match9.mp3"),
	"shapeMatch10": new Audio("assets/audio/sfx/correct_shape_match10.mp3"),
	"shapeMatch11": new Audio("assets/audio/sfx/correct_shape_match11.mp3"),
};
AUDIO["bell"].volume = 0.3;
// AUDIO["musicSlow"].volume = 0.16;
// AUDIO["musicFast"].volume = 0.16;

const MUSIC_INTERFACE = {
	ptr: 0,
	tracks: {
		"track_0": new Audio("assets/audio/music/track_0.mp3"),
		"track_1": new Audio("assets/audio/music/track_1.mp3"),
		"track_2": new Audio("assets/audio/music/track_2.mp3"),
		"track_3": new Audio("assets/audio/music/track_3.mp3"),
		"track_4": new Audio("assets/audio/music/track_4.mp3"),
		"track_5": new Audio("assets/audio/music/track_5.mp3"),
	},
}

// grab hud elements
const tutorial = document.getElementById("tutorial");
const tutorialText = document.getElementById("tutorial-text");
const tutorialCode = document.getElementById("tutorial-code");
const currentScoreValue = document.getElementById("score-value");
currentScoreValue.innerHTML = STATE["currentSquaresCompleted"];
const hitPointsValue = document.getElementById("hit-points-value");
hitPointsValue.innerHTML = PLAYER["healthPoints"];
const maxScoreValue = document.getElementById("score-value-max");
maxScoreValue.innerHTML = "/ 100";

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


// document.addEventListener("keydown", function(e) {
// 	if (e.code == "KeyA")
// 	{
// 		PLAYER["x"] -= GRID_WIDTH_PX;
// 	}
// 	if (e.code == "KeyD")
// 	{
// 		PLAYER["x"] += GRID_WIDTH_PX;
// 	}
// 	if (e.code == "KeyW")
// 	{
// 		PLAYER["y"] -= GRID_WIDTH_PX;
// 	}
// 	if (e.code == "KeyS")
// 	{
// 		PLAYER["y"] += GRID_WIDTH_PX;
// 	}
// })


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

let BLUR_AMOUNT = 3;

function blurAllLayers() {
	bkgdLayerCanvas.style.filter = `blur(${BLUR_AMOUNT}px)`;
	levelLayerCanvas.style.filter = `blur(${BLUR_AMOUNT}px)`;
	playerLayerCanvas.style.filter = `blur(${BLUR_AMOUNT}px)`;
	itemLayerCanvas.style.filter = `blur(${BLUR_AMOUNT}px)`;
}

function unblurAllLayers() {
	bkgdLayerCanvas.style.filter = "blur(0px)";
	levelLayerCanvas.style.filter = "blur(0px)";
	playerLayerCanvas.style.filter = "blur(0px)";
	itemLayerCanvas.style.filter = "blur(0px)";
}

// spawn variables
let spawnInterval;
let spawnFrameCounter = 0;

let FRAME = 0;
let COUNTER = 0;
let startTime;


function screenShake(canvases, amount = 8, duration = 8, decay = 0.8) {
    canvases.forEach(canvas => {
        let originalTransform = canvas.style.transform;
        let frame = 0;

        let shake = () => {
            if (frame >= duration) {
                canvas.style.transform = originalTransform;
                return;
            }

            let xShake = (Math.random() * 2 - 1) * amount * Math.pow(decay, frame);
            let yShake = (Math.random() * 2 - 1) * amount * Math.pow(decay, frame);

            canvas.style.transform = `translate(${xShake}px, ${yShake}px)`;
            frame++;
            requestAnimationFrame(shake);
        };

        shake();
    });
}

let AUTO_REPEAT_FRAME_COUNTER = 0;
function gameLoop(e) {
	// Manually increase the frames down for keys outside the EventListener
	// The reason for this is to by pass the DAS of the operating system
	const movementKeys = ["KeyA", "KeyD", "KeyW", "KeyS"];
	for (const key of movementKeys) {
		CONTROLLER[`${key}_framesDown`] = CONTROLLER[key] === 1 ? CONTROLLER[`${key}_framesDown`] + 1 : 0;
	}

	// Begin Auto-Repeat mode if any of the movement keys have been held down for long enough
	let isAutoRepeat = false;
	for (const key of movementKeys)
	{
		if(CONTROLLER[`${key}_framesDown`] >= AUTO_REPEAT_DELAY_FRAMES)
		{
			isAutoRepeat = true;
			break;
		}
	}

	if(isAutoRepeat)
	{
		if(AUTO_REPEAT_FRAME_COUNTER % AUTO_REPEAT_RATE_FRAMES === 0)
		{
			if (CONTROLLER["KeyA_framesDown"] > 0)
				PLAYER["x"] -= GRID_WIDTH_PX;
			if (CONTROLLER["KeyD_framesDown"] > 0)
				PLAYER["x"] += GRID_WIDTH_PX;
			if (CONTROLLER["KeyW_framesDown"] > 0)
				PLAYER["y"] -= GRID_WIDTH_PX;
			if (CONTROLLER["KeyS_framesDown"] > 0)
				PLAYER["y"] += GRID_WIDTH_PX;
		}
		AUTO_REPEAT_FRAME_COUNTER += 1;
	}
	else
	{
		if (CONTROLLER["KeyA_framesDown"] === 1)
			PLAYER["x"] -= GRID_WIDTH_PX;
		if (CONTROLLER["KeyD_framesDown"] === 1)
			PLAYER["x"] += GRID_WIDTH_PX;
		if (CONTROLLER["KeyW_framesDown"] === 1)
			PLAYER["y"] -= GRID_WIDTH_PX;
		if (CONTROLLER["KeyS_framesDown"] === 1)
			PLAYER["y"] += GRID_WIDTH_PX;
		AUTO_REPEAT_FRAME_COUNTER = 0;
	}

	if(STATE["gameOver"] === true)
	{
		// reset the game state and restart
		FRAME = 0;
		COUNTER = 0;
		STATE["currentSquaresCompleted"] = 0;
		STATE["lastFrameSquaresCompleted"] = 0;
		STATE["mostSquaresCompleted"] = 0;
		STATE["squaresCompletedStreak"] = 0;

		PLAYER["healthPoints"] = 0;
		hitPointsValue.innerHTML = PLAYER["healthPoints"];

		// make the level empty
		for(let y = 1; y < ENEMY_LEVEL.length - 1; y++) {
			for(let x = 1; x < ENEMY_LEVEL[0].length - 1; x++) {
				putValueTo2DArray(ENEMY_LEVEL, x, y, 0);
			}
		}

		// reset the music
		// AUDIO["musicSlow"].pause();
		// AUDIO["musicFast"].pause();
		// AUDIO["musicSlow"].currentTime = 0;
		// AUDIO["musicFast"].currentTime = 0;

		// escape the game over loop only once you press Enter
		if(CONTROLLER["Enter"] === 1)
		{
			// clear the board
			copy2DArray(INIT_ENEMY_LEVEL, ENEMY_LEVEL);
			PLAYER["x"] = INIT_PLAYER_X * GRID_WIDTH_PX;
			PLAYER["y"] = INIT_PLAYER_Y * GRID_WIDTH_PX;

			// reset the HUD elements
			gameOverText.style.visibility = "hidden";
			currentScoreValue.innerHTML = STATE["currentSquaresCompleted"];
			unblurAllLayers();
			// clear the level and player layers
			clearCanvas(levelLayerCanvas, levelLayerCtx);
			clearCanvas(playerLayerCanvas, playerLayerCtx);

			STATE["gameOver"] = false;

			// Play Game Start Sound
			AUDIO["gameStart"].currentTime = 0;
			AUDIO["gameStart"].play();

			PLAYER["healthPoints"] = 3;
			hitPointsValue.innerHTML = PLAYER["healthPoints"];

			// reset the max score in the HUD
			maxScoreValue.innerHTML = "/ 100";

			// reset other counters and state variables
			spawnInterval = 80;
			spawnFrameCounter = 0;
			STATE["spawnPieceHistory"] = [];
		}
		return;
	}

	if(false)
		moveCamera(PLAYER, ACTIVE_ENEMIES);

	if(STATE["lastFrameSquaresCompleted"] !== STATE["currentSquaresCompleted"])
	{
		// Update the Music
		if(STATE["currentSquaresCompleted"] === 1)
		{
			AUDIO["musicSlow"].currentTime = 0;
			AUDIO["musicSlow"].play();
		}
		else
		if(STATE["currentSquaresCompleted"] === 76)
		{
			// AUDIO["musicSlow"].pause();
		}
		else
		if(STATE["currentSquaresCompleted"] === 80)
		{
			// AUDIO["musicFast"].currentTime = 0;
			// AUDIO["musicFast"].play();
			// AUDIO["musicFast"].loop = true;
		}

		if(STATE["currentSquaresCompleted"] === 1)
			spawnInterval = 80;
		else
		if(STATE["currentSquaresCompleted"] === 10)
			spawnInterval = 70;
		else
		if(STATE["currentSquaresCompleted"] === 20)
			spawnInterval = 50;
		else
		if(STATE["currentSquaresCompleted"] === 30)
			spawnInterval = 40;
		else
		if(STATE["currentSquaresCompleted"] === 40)
			spawnInterval = 28;
		else
		if(STATE["currentSquaresCompleted"] === 50)
			spawnInterval = 110;
		else
		if(STATE["currentSquaresCompleted"] >= 51 && STATE["currentSquaresCompleted"] < 80)
		{
			spawnInterval = Math.max(spawnInterval - 3, 23);
		}
		else
		if(STATE["currentSquaresCompleted"] >= 80 && STATE["currentSquaresCompleted"] < 90)
		{
			spawnInterval = 23;
		}
		else
		if(STATE["currentSquaresCompleted"] >= 90 && STATE["currentSquaresCompleted"] < 100)
		{
			spawnInterval = 18;
		}
		else
		if(STATE["currentSquaresCompleted"] === 100)
		{
			spawnInterval = 100;
		}
		else
		if(STATE["currentSquaresCompleted"] > 100 && STATE["currentSquaresCompleted"] <= 150)
		{
			let thisMinInterval = 21;
			let progress = (STATE["currentSquaresCompleted"] - 100) / 50;
			let curve = Math.log(progress * 9 + 1) / Math.log(10);
			spawnInterval = Math.round(100 - (curve * (100 - thisMinInterval)));
		}
		else
		if(STATE["currentSquaresCompleted"] > 150 && STATE["currentSquaresCompleted"] <= 200)
		{
			let thisMinInterval = 19;
			let progress = (STATE["currentSquaresCompleted"] - 150) / 50;
			let curve = Math.log(progress * 9 + 1) / Math.log(10);
			spawnInterval = Math.round(100 - (curve * (100 - thisMinInterval)));
		}
		else
		if(STATE["currentSquaresCompleted"] > 200)
		{
			spawnInterval = 18;
		}
	}

	if (STATE["currentSquaresCompleted"] >= 100)
		maxScoreValue.innerHTML = "/ ???";
	else
		maxScoreValue.innerHTML = "/ 100";

	if(STATE["currentSquaresCompleted"] === 0)
	{
		if(FRAME > 250)
		{
			tutorial.style.opacity = 1;
		}
		if(FRAME > 800 && PLAYER["hasPickedUpItemBefore"] === 0)
		{
			tutorialText.innerHTML = "Press and Hold a Shape with ";
			tutorialCode.innerHTML = "K";
		}
		else
		if(FRAME > 2000 && PLAYER["hasPickedUpItemBefore"] === 1)
		{
			tutorialText.innerHTML = "Carry to the other shape and drop with ";
			tutorialCode.innerHTML = "K";
		}
	}
	else
	{
		tutorialText.innerHTML = "";
		tutorialCode.innerHTML = "";
	}

	// load in new assets based on your matches
	if(STATE["currentSquaresCompleted"] === 0)
	{
		document.documentElement.className = 'bg-0';
	}
	else if(STATE["currentSquaresCompleted"] === 1)
	{
		// regenerate new sprites for palette swap
		LEVEL_COLOR_MAP[1] = "#f72585FF";
		let [spriteSlotLookup, slotSpriteLookup] = createHiddenSpriteLookups(spritesCanvas, spritesCtx);
		document.documentElement.className = 'bg-1';
	}
	else if(STATE["currentSquaresCompleted"] % 10 === 0 && STATE["currentSquaresCompleted"] < 100)
	{
		let imgIndex = Math.floor(STATE["currentSquaresCompleted"] / 10) + 1;
		if(imgIndex >= 9)
			imgIndex = 9;
		document.documentElement.className = `bg-${imgIndex}`;
	}
	else if(STATE["currentSquaresCompleted"] >= 100)
	{
		document.documentElement.className = 'bg-11';
	}

	// keep track of the last frame's squares completed
	STATE["lastFrameSquaresCompleted"] = STATE["currentSquaresCompleted"];

	// Activate Game Over Mode
	if(findNumberOfEmptySpots() <= 1 || PLAYER["healthPoints"] <= 0)
	{
		STATE["gameOver"] = true;
		gameOverText.style.visibility = "visible";
		AUDIO["gameOver"].currentTime = 0;
		AUDIO["gameOver"].play();
		blurAllLayers();
	}

	// spawn new items into the board
	if(STATE["currentSquaresCompleted"] > 0 && spawnFrameCounter === 1) // add an arbitrary 5-frame spawn buffer
	{
		// Find a random empty spot
		const emptySpot = findRandomEmptySpot();
		if (emptySpot) {
			const [x, y] = emptySpot;

			// Play Shape Appear Sound
			AUDIO["shapeAppear"].currentTime = 0;
			AUDIO["shapeAppear"].play();

			// Get a random item type
			const enemyTypes = Object.keys(ENEMY_LOOKUP);
			
			// Get opposite piece 90% of the time compared to last piece
			let randomEnemyType;
			if (STATE["spawnPieceHistory"].length > 0) {
				const lastPiece = STATE["spawnPieceHistory"][STATE["spawnPieceHistory"].length - 1];
				const oppositeIndex = lastPiece === enemyTypes[0] ? 1 : 0;

				if (Math.random() < 0.9) {
					randomEnemyType = enemyTypes[oppositeIndex];
				} else {
					randomEnemyType = lastPiece;
				}
			} else {
				// For first piece, randomly choose
				randomEnemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
			}

			// place the item in the level
			putValueTo2DArray(ENEMY_LEVEL, x, y, randomEnemyType);

			// Always keep that last few pieces placed on the board
			STATE["spawnPieceHistory"].push(randomEnemyType);
			if(STATE["spawnPieceHistory"].length > STATE["spawnPieceHistoryMax"])
				STATE["spawnPieceHistory"].shift();
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
			PLAYER["hasPickedUpItemBefore"] = 1;
			AUDIO["grab"].currentTime = 0;
			AUDIO["grab"].volume = 0.8;
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

			// Play the correct shape match sound
			let shapeMatchIndex = Math.floor((STATE["currentSquaresCompleted"] - 1) / 10) + 1;
			let maxShapeMatchIndex = 11;
			shapeMatchIndex = Math.min(shapeMatchIndex, maxShapeMatchIndex);
			if(shapeMatchIndex >= 0) {
				AUDIO[`shapeMatch${shapeMatchIndex}`].currentTime = 0;
				AUDIO[`shapeMatch${shapeMatchIndex}`].play();
			}

			// Screen shake effect when dropping correctly
			screenShake([levelLayerCanvas, playerLayerCanvas, bkgdLayerCanvas], 4, 12, 0.9);

			// chime a bell one level X9
			if(STATE["currentSquaresCompleted"] % 10 === 0 || STATE["currentSquaresCompleted"] === 1)
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
			putValueTo2DArray(LEVEL_LOOKUP["level"]["grab"], playerX, playerY, 0);
			putValueTo2DArray(LEVEL_LOOKUP["level"]["enemy"], playerX, playerY, PLAYER["pickedUpItemPtr"]);
			STATE["squaresCompletedStreak"] = 0;
			
			// Decrease players health points and display
			PLAYER["healthPoints"] -= 1;
			hitPointsValue.innerHTML = PLAYER["healthPoints"];

			// Play the audio
			AUDIO["dropFail"].currentTime = 0;
			AUDIO["dropFail"].play();

			// Screen shake effect when dropping incorrectly
			// screenShake([levelLayerCanvas, playerLayerCanvas, bkgdLayerCanvas], 4, 8, 0.8);
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

	// always make sure the tutorial is on top of the cursor
	let tutorialMargin = 10;
	let left = PLAYER["x"];
	let top = PLAYER["y"] - 64;  // bump up by one tile's height (64px) to put text on top of cursor
	top -= tutorialMargin;
	tutorial.style.transform = `translate(${left}px, ${top}px)`;

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
