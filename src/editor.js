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
	getWidth2DArray,
	getHeight2DArray,
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
let CLICKED_SPRITE_INT = 0;
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

function getPlayerSpriteIdx() {
	for (let index in SPRITE_LOOKUP) {
		if (SPRITE_LOOKUP[index]["name"] == "player")
			return index;
	}
	return -1;
}
const PLAYER_SPRITE_IDX = getPlayerSpriteIdx(SPRITE_LOOKUP);


function copyLevelToClipboard(e) {
	// Extract out where the position's initial spawn point is
	let playerX;
	let playerY;
	for(let y = 0; y < TEMP_LEVEL.length; y += 1)
	{
		if(TEMP_LEVEL[y].includes(PLAYER_SPRITE_IDX))
		{
			playerY = y;
			playerX = TEMP_LEVEL[y].indexOf(PLAYER_SPRITE_IDX);
		}
	}
	let stringyLevel = "";
	stringyLevel += `export let PLAYER_TILE_X = ${playerX};\r`
	stringyLevel += `export let PLAYER_TILE_Y = ${playerY};\r`
	stringyLevel += "export const LEVEL = [\r";

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
	CLICKED_SPRITE_INT = xTile;

	updateActiveSprite(CLICKED_SPRITE_INT);
}

function updateActiveSprite(CLICKED_SPRITE_INT) {
	CLICKED_SPRITE = slotSpriteLookup[CLICKED_SPRITE_INT];
	selection.style.left = `calc(64px * ${CLICKED_SPRITE_INT})`;
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

function getSpriteCount(spritesCanvas) {
	return spritesCanvas.width / spritesCanvas.height;
}


let copyBtn = document.getElementById("copy-to-clipboard");
const canvas = document.getElementById("canvas");
const spritesCanvas = document.getElementById("prerender-sprites-canvas");
const selection = document.getElementById("selection");
const widthSelector = document.getElementById("tile-width");
const heightSelector = document.getElementById("tile-height");

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
canvas.addEventListener("mouseup", function(e) {MOUSEDOWN = false;})

heightSelector.addEventListener("change", function(e) {
	let currentHeight = getHeight2DArray(TEMP_LEVEL);
	let currentWidth = getWidth2DArray(TEMP_LEVEL);

	let newHeight = e.target.value;
	if(newHeight > currentHeight)
	{
		for(let i=0; i < newHeight - currentHeight; i+=1)
		{
			let row = []
			for(let i=0; i<currentWidth; i+=1)
			{
				row.push(0)
			}
			TEMP_LEVEL.push(row)
		}
	}
	else
	{
		for(let i=0; i < currentHeight - newHeight; i+=1)
			TEMP_LEVEL.pop()
	}
	drawLevelLayer(ctx, spritesCtx, TEMP_LEVEL, spriteSlotLookup);
})


widthSelector.addEventListener("change", function(e) {
	let currentHeight = getHeight2DArray(TEMP_LEVEL);
	let currentWidth = getWidth2DArray(TEMP_LEVEL);

	let newWidth = e.target.value;
	if(newWidth > currentWidth)
	{
		for(let y=0; y < currentHeight; y+=1)
		{
			for(let i=0; i<newWidth - currentWidth; i+=1)
				TEMP_LEVEL[y].push(0)
		}
	}
	else
	{
		for(let y=0; y < currentHeight; y+=1)
		{
			for(let i=0; i<currentWidth - newWidth; i+=1)
				TEMP_LEVEL[y].pop()
		}
	}
	drawLevelLayer(ctx, spritesCtx, TEMP_LEVEL, spriteSlotLookup);
})


document.addEventListener("keydown", function(e) {
	if (e.code == "KeyA") {
		CLICKED_SPRITE_INT -= 1;
	} else
	if (e.code == "KeyD") {
		CLICKED_SPRITE_INT += 1;
	}

	let spriteCount = getSpriteCount(spritesCanvas);
	if (CLICKED_SPRITE_INT < 0) {
		CLICKED_SPRITE_INT = spriteCount - 1;
	}
	if (CLICKED_SPRITE_INT > spriteCount - 1) {
		CLICKED_SPRITE_INT = 0;
	}

	updateActiveSprite(CLICKED_SPRITE_INT);
})

function gameLoop() {
	if(
		document.activeElement.id === "tile-width" ||
		document.activeElement.id === "tile-height"
	)
		return;

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

updateActiveSprite(CLICKED_SPRITE_INT);
widthSelector.value = TEMP_LEVEL[0].length;
heightSelector.value = TEMP_LEVEL.length;

setInterval(gameLoop, 1000 / FPS);
