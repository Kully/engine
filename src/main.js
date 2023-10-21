"use strict";

import {
	LEVEL,
	SPRITE_LOOKUP,
	SPRITE_WIDTH,
	GRID_WIDTH_PX,
	STAND_CYCLE,
	SKID_CYCLE,
	WALK_CYCLE,
	JUMP_CYCLE,
	WALK_CYCLE_FRAMES_SLOW,
	WALK_CYCLE_FRAMES_FAST,
	SCALE,
	SCALE2,
	DARK_PALETTE,
} from "./data.js";

import {
	hexToRgb,
	validatePixelColor,
	getValueFrom2DArray,
} from "./helpers.js";

import {
	CAMERA,
	CONTROLLER,
	FPS,
	VALID_CONTROLLER_KEYS,
	PLAYER,
} from "./state.js";


// document.addEventListener("keydown", function(e) {
// 	for (let key of VALID_CONTROLLER_KEYS) {
// 		console.log(e.code);
// 		if (e.key === key)
// 			CONTROLLER[key] = 1;
// 	}
// });

// document.addEventListener("keyup", function(e) {
// 	for (let key of VALID_CONTROLLER_KEYS) {
// 		if (e.key === key) {
// 			CONTROLLER[key] = 0;
// 			CONTROLLER["lastKeyUp"] = key;
// 		}
// 	}

// 	if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
// 		CONTROLLER["lastLeftOrRight"] = e.key;
// 	}
// });
document.addEventListener("keydown", function(e) {
	for (let key of VALID_CONTROLLER_KEYS) {
		if (e.code === key)
			CONTROLLER[key] = 1;
	}
});

document.addEventListener("keyup", function(e) {
	for (let key of VALID_CONTROLLER_KEYS) {
		if (e.code === key) {
			CONTROLLER[key] = 0;
			CONTROLLER["lastKeyUp"] = key;
		}
	}
	if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
		CONTROLLER["lastLeftOrRight"] = e.code;
	}
});


// init canvas for background layer
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = CAMERA["width"];
canvas.height = CAMERA["height"];

// init canvas for middleground layer
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = canvas.width;
canvas2.height = canvas.height;

// init canvas that holds sprite data to easily transfer
const canvasSprites = document.getElementById("canvas-sprites");
const ctxSprites = canvasSprites.getContext("2d", {
	willReadFrequently: true
});

let levelSpriteCount = Object.keys(SPRITE_LOOKUP).length
canvasSprites.width = SCALE2 * SCALE * SPRITE_WIDTH * levelSpriteCount
canvasSprites.height = SCALE2 * SCALE * SPRITE_WIDTH;


let spriteSlotLookup = {
	4: 0,
	8: 1,
	5: 2,
	7: 3,
	0: 4,
}
for (let ptr in spriteSlotLookup)
	saveSpriteToHiddenCanvas(ptr, SCALE2 * SCALE, spriteSlotLookup[ptr]);


function drawLevel() {
	let xTiles = canvas.width / (SPRITE_WIDTH * SCALE * SCALE2);
	let yTiles = canvas.height / (SPRITE_WIDTH * SCALE * SCALE2);
	for (let x = 0; x < xTiles + 1; x += 1)
		for (let y = 0; y < yTiles + 1; y += 1) {
			let shiftXPtr = Math.floor(CAMERA["xOffset"] / GRID_WIDTH_PX);
			let shiftYPtr = Math.floor(CAMERA["yOffset"] / GRID_WIDTH_PX);

			let spritePtr = getValueFrom2DArray(
				LEVEL,
				x + shiftXPtr,
				y + shiftYPtr,
			);
			if (spritePtr === undefined) {
				spritePtr = 0;
			}

			let savedData = getSpriteFromHiddenCanvas(spritePtr);
			let tileX = x;
			let tileY = y;
			ctx.putImageData(
				savedData,
				-1 * (CAMERA["xOffset"] % GRID_WIDTH_PX) + tileX * GRID_WIDTH_PX,
				-1 * (CAMERA["yOffset"] % GRID_WIDTH_PX) + tileY * GRID_WIDTH_PX,
			);
		}
}

function saveSpriteToHiddenCanvas(spritePtr, scale, slotX) {
	let spriteData = SPRITE_LOOKUP[spritePtr]["sprite"];
	for (let i = 0; i < spriteData.length; i += 1) {
		let imageData = ctxSprites.createImageData(2 * SCALE, 2 * SCALE);
		let colorPtr = spriteData[i];
		let hex = DARK_PALETTE[colorPtr];
		let rgbArray = hexToRgb(hex);

		for (let j = 0; j < SPRITE_WIDTH * SPRITE_WIDTH; j += 1) {
			imageData.data[4 * j + 0] = rgbArray[0];
			imageData.data[4 * j + 1] = rgbArray[1];
			imageData.data[4 * j + 2] = rgbArray[2];
			imageData.data[4 * j + 3] = rgbArray[3];
		}
		let x = SCALE * SPRITE_WIDTH * slotX + SCALE * (i % SPRITE_WIDTH);
		let y = 0 + SCALE * (Math.floor(i / SPRITE_WIDTH));
		ctxSprites.putImageData(imageData, SCALE2 * x, SCALE2 * y);
	}
}

function getSpriteFromHiddenCanvas(spritePtr) {
	let slotX = spriteSlotLookup[spritePtr]

	let left = SCALE2 * slotX * SCALE * SPRITE_WIDTH;
	let top = 0 * SCALE * SPRITE_WIDTH;
	let width = SCALE2 * SCALE * SPRITE_WIDTH;
	let height = SCALE2 * SCALE * SPRITE_WIDTH;
	let savedData = ctxSprites.getImageData(left, top, width, height);
	return savedData;
}

function updateHorizontalSpeed() {
	let maxSpeed = SCALE;
	let accInc = 0.5;
	let decInc = 0.25;
	let walk_frame_arr;
	if (CONTROLLER["KeyZ"] == 1) {
		maxSpeed = 2 * SCALE;
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

function updateVerticalSpeed() {
	if (isPlayerStanding()) {
		PLAYER["speedY"] = 0;
	}
	if (CONTROLLER["KeyX"] === 0 & isPlayerStanding()) {
		PLAYER["jumpJuice"] = 1;
	} else
	if (!isPlayerStanding()) {
		PLAYER["jumpJuice"] -= 1;
		PLAYER["speedY"] = Math.min(PLAYER["speedY"] + 0.65, 13);
	}

	if (CONTROLLER["KeyX"] === 1 && PLAYER["jumpJuice"] > 0 && isPlayerStanding()) {
		PLAYER["speedY"] -= 10;
	}
}

function updatePlayerSpeed() {
	updateHorizontalSpeed();
	updateVerticalSpeed();
}


function translatePlayer() {
	// move the player horizontally
	PLAYER["x"] += PLAYER["speed"];
	PLAYER["x"] = Math.round(PLAYER["x"]);

	// move the player vertically
	PLAYER["y"] += PLAYER["speedY"];
	PLAYER["y"] = Math.round(PLAYER["y"]);
}

function drawPlayer(animationArray) {
	let spriteArray = animationArray[PLAYER["walkSpritePointer"]]["sprite"];
	let spriteWidth = animationArray[PLAYER["walkSpritePointer"]]["width"];
	let spriteHeight = animationArray[PLAYER["walkSpritePointer"]]["height"];
	let yShift = animationArray[PLAYER["walkSpritePointer"]]["yShift"];

	let playerFacingLeft = 0;
	for (let i = 0; i < spriteWidth; i += 1)
		for (let j = 0; j < spriteHeight; j += 1) {
			let pixelColor;
			if (CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0) {
				pixelColor = spriteArray[(spriteWidth - 1 - i) + j * spriteWidth]
				playerFacingLeft = 1;
			} else
			if (CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 0) {
				if (CONTROLLER["lastLeftOrRight"] !== "ArrowRight") {
					pixelColor = spriteArray[(spriteWidth - 1 - i) + j * spriteWidth];
					playerFacingLeft = 1;
				} else {
					pixelColor = spriteArray[i + j * spriteWidth];
				}
			} else {
				pixelColor = spriteArray[i + j * spriteWidth];
			}
			pixelColor = validatePixelColor(pixelColor, DARK_PALETTE);

			let x = PLAYER["x"] + i * SCALE;
			let y = PLAYER["y"] + (j - spriteHeight + yShift) * SCALE;
			ctx2.fillStyle = pixelColor;
			ctx2.fillRect(
				x,
				y,
				SCALE,
				SCALE,
			);
		}
}

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
	if (!isPlayerStanding()) {
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

function handleXBoundaryCollision() {
	// handle boundaries
	let playerGridX = PLAYER["x"] / GRID_WIDTH_PX;
	let playerGridY = PLAYER["y"] / GRID_WIDTH_PX;
	playerGridX += CAMERA["xOffset"] / GRID_WIDTH_PX;
	playerGridY += CAMERA["yOffset"] / GRID_WIDTH_PX;
	let yTileCurrent = Math.floor(playerGridY);

	let xTileToYourLeft = Math.floor(playerGridX);
	let xTileToYourRight = Math.ceil(playerGridX);
	let xTileCurrent = Math.round(playerGridX);
	// deal with boundary on your left
	let spriteToLeft = LEVEL[yTileCurrent - 1][xTileToYourLeft];
	if (SPRITE_LOOKUP[spriteToLeft]["hitbox"] === true) {
		PLAYER["x"] = (xTileToYourLeft + 1) * GRID_WIDTH_PX;
		PLAYER["x"] -= CAMERA["xOffset"];
	}

	// deal with boundary on your right
	let spiteToRight = LEVEL[yTileCurrent - 1][xTileToYourRight];
	if (SPRITE_LOOKUP[spiteToRight]["hitbox"] === true) {
		PLAYER["x"] = (xTileToYourLeft) * GRID_WIDTH_PX;
		PLAYER["x"] -= CAMERA["xOffset"];
	}
}

function handleYBoundaryCollision() {
	let currentSpritePtr = getSpritePtrPlayerInside();
	if (SPRITE_LOOKUP[currentSpritePtr]["hitbox"] === true) {
		let playerGridFloatY = getPlayerGridY();
		PLAYER["y"] = Math.floor(playerGridFloatY) * GRID_WIDTH_PX - CAMERA["yOffset"];
	}

	let playerGridFloatY = getPlayerGridY();
	let a = (PLAYER["y"] + CAMERA["yOffset"]) / GRID_WIDTH_PX;
	let y = Math.floor(a) - 1;

	let playerGridFloatX = getPlayerGridX();
	let x = Math.round(playerGridFloatX);

	let spritePtr = getValueFrom2DArray(LEVEL, x, y);
	if(SPRITE_LOOKUP[spritePtr]["hitbox"] === true)
	{
		PLAYER["y"] = Math.floor(playerGridFloatY + 1) * GRID_WIDTH_PX - CAMERA["yOffset"];
	}
}

function clearPlayerCanvas(canvas) {
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function clearLevelCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function preScreenShake(maxPixels) {
	const dx = Math.floor(Math.random() * maxPixels);
	const dy = Math.floor(Math.random() * maxPixels);

	ctx.save();
	ctx2.save();

	ctx.translate(dx, dy);
	ctx2.translate(dx, dy);
}

function postScreenShake() {
	ctx.restore();
	ctx2.restore();
}


function getPlayerGridX() {
	return (PLAYER["x"] + CAMERA["xOffset"]) / GRID_WIDTH_PX;
}

function getPlayerGridY() {
	return (PLAYER["y"] + CAMERA["yOffset"]) / GRID_WIDTH_PX;
}

function isPlayerStanding() {
	let spritePtr = getSpritePtrPlayerInside();
	let isBoundaryBelowYou = (SPRITE_LOOKUP[spritePtr]["hitbox"] === true);

	let playerGridFloatY = getPlayerGridY();
	if (isBoundaryBelowYou && Number.isInteger(playerGridFloatY))
		return true;
	return false;
}

function getSpritePtrPlayerInside() {

	let playerGridFloatX = getPlayerGridX();
	let playerGridFloatY = getPlayerGridY();

	let x = Math.round(playerGridFloatX);
	let y = Math.floor(playerGridFloatY);

	let spritePtr = getValueFrom2DArray(LEVEL, x, y);
	return spritePtr;
}


function gameLoop(e) {
	followPlayerWithCamera();
	updatePlayerSpeed();
	translatePlayer();

	handleYBoundaryCollision();
	handleXBoundaryCollision();

	let animationArray = findAnimationCycle();
	updatePlayerPointers(animationArray);

	clearPlayerCanvas();
	clearLevelCanvas();
	drawLevel();
	drawPlayer(animationArray);
}

setInterval(gameLoop, 1000 / FPS);