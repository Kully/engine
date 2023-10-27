"use strict";

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
	putValueTo2DArray,
	isValidIndex,
} from "./helpers.js";

import {
	LEVEL,
} from "./levels.js";

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

let TEMP_LEVEL = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
let CLICKED_SPRITE = undefined;
let MOUSEDOWN = false;

let copyBtn = document.getElementById("copy-to-clipboard");
copyBtn.addEventListener("click", function(e) {
	let stringyLevel = "const LEVEL = [\r";

	for (let y = 0; y < TEMP_LEVEL.length; y += 1) {
		stringyLevel += "    [";
		for (let x = 0; x < TEMP_LEVEL[y].length; x += 1) {
			stringyLevel += TEMP_LEVEL[y][x];
			if(x != TEMP_LEVEL[y].length - 1)
				stringyLevel += ", ";
		}
		stringyLevel += "],";
		stringyLevel += "\r";
	}
	stringyLevel += "];";
	navigator.clipboard.writeText(stringyLevel);
})

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

// init canvas that holds sprite data to easily transfer
const canvasSprites = document.getElementById("canvas-sprites");
const ctxSprites = canvasSprites.getContext("2d", {
	willReadFrequently: true
});


// place sprites in sprite gallery
let levelSpriteCount = Object.keys(SPRITE_LOOKUP).length
canvasSprites.width = levelSpriteCount * GRID_WIDTH_PX;
canvasSprites.height = GRID_WIDTH_PX;
let spriteSlotLookup = {};
let slotSpriteLookup = {};
let keys = Object.keys(SPRITE_LOOKUP);
for (let i=0; i<keys.length; i+=1)
{
	if (keys[i] != 1)
	{
		spriteSlotLookup[keys[i]] = i;
		slotSpriteLookup[i] = keys[i];
	}
}
for (let ptr in spriteSlotLookup)
	saveSpriteToHiddenCanvas(ptr, GRID_WIDTH_PX / SPRITE_WIDTH, spriteSlotLookup[ptr]);


// select a sprite you want to paint with
canvasSprites.addEventListener("mousedown", function(e) {
	let xPixel = e.offsetX;
	let yPixel = e.offsetY;

	let xTile = Math.floor(xPixel / GRID_WIDTH_PX);
	CLICKED_SPRITE = slotSpriteLookup[xTile];
})

// update the sprite
canvas.addEventListener("mousedown", function(e) {
	MOUSEDOWN = true;

	let xPixel = e.offsetX;
	let yPixel = e.offsetY;

	let xTile = Math.floor(xPixel / GRID_WIDTH_PX);
	let yTile = Math.floor(yPixel / GRID_WIDTH_PX);

	let xLevel = xTile + CAMERA["xOffset"] / GRID_WIDTH_PX;
	let yLevel = yTile + CAMERA["yOffset"] / GRID_WIDTH_PX;

	if (isValidIndex(TEMP_LEVEL, xLevel, yLevel))
	{
		TEMP_LEVEL[yLevel][xLevel] = CLICKED_SPRITE;
	}
})
canvas.addEventListener("mousemove", function(e) {
	let xPixel = e.offsetX;
	let yPixel = e.offsetY;

	let xTile = Math.floor(xPixel / GRID_WIDTH_PX);
	let yTile = Math.floor(yPixel / GRID_WIDTH_PX);

	let xLevel = xTile + CAMERA["xOffset"] / GRID_WIDTH_PX;
	let yLevel = yTile + CAMERA["yOffset"] / GRID_WIDTH_PX;

	if (isValidIndex(TEMP_LEVEL, xLevel, yLevel) && MOUSEDOWN)
	{
		TEMP_LEVEL[yLevel][xLevel] = CLICKED_SPRITE;
	}
})
canvas.addEventListener("mouseup", function(e) {
	MOUSEDOWN = false;
})


function drawLevel() {
	let xTiles = canvas.width / GRID_WIDTH_PX;
	let yTiles = canvas.height / GRID_WIDTH_PX;
	for (let x = 0; x < xTiles + 1; x += 1)
		for (let y = 0; y < yTiles + 1; y += 1) {
			let shiftXPtr = Math.floor(CAMERA["xOffset"] / GRID_WIDTH_PX);
			let shiftYPtr = Math.floor(CAMERA["yOffset"] / GRID_WIDTH_PX);

			let spritePtr = getValueFrom2DArray(
				TEMP_LEVEL,
				x + shiftXPtr,
				y + shiftYPtr,
			);
			if (spritePtr === undefined) {
				spritePtr = 10;
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
	let left = GRID_WIDTH_PX * slotX;
	let top = 0;
	let width = GRID_WIDTH_PX;
	let height = GRID_WIDTH_PX;
	let savedData = ctxSprites.getImageData(left, top, width, height);
	return savedData;
}

function clearPlayerCanvas(canvas) {
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function clearLevelCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function gameLoop()
{
	if(CONTROLLER["ArrowLeft"])
		CAMERA["xOffset"] -= GRID_WIDTH_PX;
	if(CONTROLLER["ArrowRight"])
		CAMERA["xOffset"] += GRID_WIDTH_PX;
	if(CONTROLLER["ArrowUp"])
		CAMERA["yOffset"] -= GRID_WIDTH_PX;
	if(CONTROLLER["ArrowDown"])
		CAMERA["yOffset"] += GRID_WIDTH_PX;
	drawLevel();
}

setInterval(gameLoop, 1000 / 20);
