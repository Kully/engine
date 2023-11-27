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
	createHiddenSpriteLookups,
	drawLevelLayer,
} from "./helpers.js";

import {
	handleKeyDown,
	handleKeyUp,
} from "./listeners.js"

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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
const canvas = document.getElementById("canvas");
const spritesCanvas = document.getElementById("prerender-sprites-canvas");

const ctx = canvas.getContext("2d");
const spritesCtx = spritesCanvas.getContext("2d", {
	willReadFrequently: true
});

canvas.width = CAMERA["width"];
canvas.height = CAMERA["height"];

let lookups = createHiddenSpriteLookups(spritesCanvas, spritesCtx);
let spriteSlotLookup = lookups[0];
let slotSpriteLookup = lookups[1];


copyBtn.addEventListener("click", copyLevelToClipboard);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
spritesCanvas.addEventListener("mousedown", selectSpriteToPaintWith);
canvas.addEventListener("mousedown", updateCanvasOnMouseDown);
canvas.addEventListener("mousemove", updateCanvasOnMouseMove);
canvas.addEventListener("mouseup", function(e) {
	MOUSEDOWN = false;
})

function gameLoop() {
	if (CONTROLLER["ArrowLeft"])
		CAMERA["xOffset"] -= GRID_WIDTH_PX;
	if (CONTROLLER["ArrowRight"])
		CAMERA["xOffset"] += GRID_WIDTH_PX;
	if (CONTROLLER["ArrowUp"])
		CAMERA["yOffset"] -= GRID_WIDTH_PX;
	if (CONTROLLER["ArrowDown"])
		CAMERA["yOffset"] += GRID_WIDTH_PX;
	drawLevelLayer(ctx, spritesCtx, TEMP_LEVEL, spriteSlotLookup);
}

setInterval(gameLoop, 1000 / FPS);