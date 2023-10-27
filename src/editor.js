"use strict";

import {
	SPRITE_WIDTH,
	GRID_WIDTH_PX,
	VALID_CONTROLLER_KEYS,
} from "./constants.js";

import {
	hexToRgb,
	getValueFrom2DArray,
	isValidIndex,
	getSpriteFromHiddenCanvas,
	saveSpriteToHiddenCanvas,
} from "./helpers.js";

import {
	SPRITE_LOOKUP,
} from "./sprites.js";

import {
	CAMERA,
	CONTROLLER,
} from "./state.js";


let FPS = 20;
let CLICKED_SPRITE = undefined;
let MOUSEDOWN = false;
let TEMP_LEVEL = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


function copyLevelToClipboard(e) {
	let stringyLevel = "const LEVEL = [\r";

	for (let y = 0; y < TEMP_LEVEL.length; y += 1) {
		stringyLevel += "    [";
		for (let x = 0; x < TEMP_LEVEL[y].length; x += 1) {
			stringyLevel += TEMP_LEVEL[y][x];
			if (x != TEMP_LEVEL[y].length - 1)
				stringyLevel += ", ";
		}
		stringyLevel += "],";
		stringyLevel += "\r";
	}
	stringyLevel += "];";
	navigator.clipboard.writeText(stringyLevel);
}

function selectSpriteToPaintWith(e) {
	let xPixel = e.offsetX;
	let yPixel = e.offsetY;

	let xTile = Math.floor(xPixel / GRID_WIDTH_PX);
	CLICKED_SPRITE = slotSpriteLookup[xTile];
}

function getClickedCoordinates(e) {
	let xPixel = e.offsetX;
	let yPixel = e.offsetY;

	let xTile = Math.floor(xPixel / GRID_WIDTH_PX);
	let yTile = Math.floor(yPixel / GRID_WIDTH_PX);

	let xLevel = xTile + CAMERA["xOffset"] / GRID_WIDTH_PX;
	let yLevel = yTile + CAMERA["yOffset"] / GRID_WIDTH_PX;
	return [xLevel, yLevel];
}

function updateCanvasOnMouseDown(e) {
	MOUSEDOWN = true;
	let coords = getClickedCoordinates(e);
	let xLevel = coords[0];
	let yLevel = coords[1];

	if (isValidIndex(TEMP_LEVEL, xLevel, yLevel)) {
		TEMP_LEVEL[yLevel][xLevel] = CLICKED_SPRITE;
	}
}

function updateCanvasOnMouseMove(e) {
	let coords = getClickedCoordinates(e);
	let xLevel = coords[0];
	let yLevel = coords[1];

	if (isValidIndex(TEMP_LEVEL, xLevel, yLevel) && MOUSEDOWN) {
		TEMP_LEVEL[yLevel][xLevel] = CLICKED_SPRITE;
	}
}



let copyBtn = document.getElementById("copy-to-clipboard");

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
for (let i = 0; i < keys.length; i += 1) {
	if (keys[i] != 1) {
		spriteSlotLookup[keys[i]] = i;
		slotSpriteLookup[i] = keys[i];
	}
}
for (let ptr in spriteSlotLookup) {
	saveSpriteToHiddenCanvas(
		ctxSprites,
		ptr,
		GRID_WIDTH_PX / SPRITE_WIDTH,
		spriteSlotLookup[ptr]
	);
}


copyBtn.addEventListener("click", copyLevelToClipboard);

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

canvasSprites.addEventListener("mousedown", selectSpriteToPaintWith);
canvas.addEventListener("mousedown", updateCanvasOnMouseDown);
canvas.addEventListener("mousemove", updateCanvasOnMouseMove);
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

			let savedData = getSpriteFromHiddenCanvas(
				ctxSprites,
				spritePtr,
				spriteSlotLookup,
			);
			let tileX = x;
			let tileY = y;
			ctx.putImageData(
				savedData,
				-1 * (CAMERA["xOffset"] % GRID_WIDTH_PX) + tileX * GRID_WIDTH_PX,
				-1 * (CAMERA["yOffset"] % GRID_WIDTH_PX) + tileY * GRID_WIDTH_PX,
			);
		}
}

function gameLoop() {
	if (CONTROLLER["ArrowLeft"])
		CAMERA["xOffset"] -= GRID_WIDTH_PX;
	if (CONTROLLER["ArrowRight"])
		CAMERA["xOffset"] += GRID_WIDTH_PX;
	if (CONTROLLER["ArrowUp"])
		CAMERA["yOffset"] -= GRID_WIDTH_PX;
	if (CONTROLLER["ArrowDown"])
		CAMERA["yOffset"] += GRID_WIDTH_PX;
	drawLevel();
}

setInterval(gameLoop, 1000 / 20);