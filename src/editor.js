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
	LEVEL_LOOKUP,
} from "./data/levels.js"

import {
	handleKeyDown,
	handleKeyUp,
} from "./listeners.js"

import {
	SPRITE_LOOKUP,
} from "./data/sprites.js";

import {
	CAMERA,
	CONTROLLER,
} from "./state.js";


let FPS = 20;
let CLICKED_SPRITE_INT = 2;
let CLICKED_SPRITE = undefined;
let MOUSEDOWN = false;
let CANVAS_XLEVEL = 0;
let CANVAS_YLEVEL = 0;

const EMPTY_LEVEL = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let TEMP_LEVEL = EMPTY_LEVEL.map(innerArray => [...innerArray]);
let HOVER_LEVEL = TEMP_LEVEL.map(innerArray => [...innerArray]);

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
	stringyLevel += `"playerX": ${playerX},\r`;
	stringyLevel += `"playerY": ${playerY},\r`;
	stringyLevel += `"level": [\r`;

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
	stringyLevel += "],";
	navigator.clipboard.writeText(stringyLevel);

	// indicate to user that copying was successful
	let popupMessage = document.getElementById("popup-message");
    popupMessage.classList.remove("fadeOutAnimation");
    void popupMessage.offsetWidth;
    popupMessage.innerHTML = "Copied!";
    popupMessage.style.animationPlayState = "running";
    popupMessage.classList.add("fadeOutAnimation");
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

function resetLevel(e) {
	let currentWidth = getWidth2DArray(TEMP_LEVEL);
	let currentHeight = getHeight2DArray(TEMP_LEVEL);

	TEMP_LEVEL = [];
	for(let y=0; y<currentHeight; y+=1)
	{
		let row = []
		for(let x=0; x<currentWidth; x+=1)
		{
			row.push(0)
		}
		TEMP_LEVEL.push(row)
	}
	drawLevelLayer(ctx, spritesCtx, TEMP_LEVEL, spriteSlotLookup);
}

function loadCanvasLevel(e) {
	let name = e.target.value;

	if(name === "default") {
		TEMP_LEVEL = EMPTY_LEVEL;
	}
	else {
		TEMP_LEVEL = LEVEL_LOOKUP[name]["level"];
	}
	populateDimensionsDropdowns();
	document.getElementById('level-dropdown').blur();
}

function populateDimensionsDropdowns() {
	widthSelector.value = TEMP_LEVEL[0].length;
	heightSelector.value = TEMP_LEVEL.length;
}

function populateLevelDropdown() {
	for(name in LEVEL_LOOKUP)
	{
		let option = document.createElement("option");
		option.innerHTML = name;
		option.value = name;
		levelSelector.appendChild(option);
	}
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

	CANVAS_XLEVEL = xLevel;
	CANVAS_YLEVEL = yLevel;

	if (isValidIndex(TEMP_LEVEL, xLevel, yLevel)) {
		TEMP_LEVEL[yLevel][xLevel] = CLICKED_SPRITE;
	}
}

function displayPreviewTile() {
	if (isValidIndex(TEMP_LEVEL, CANVAS_XLEVEL, CANVAS_YLEVEL) && !MOUSEDOWN)
	{
		HOVER_LEVEL[CANVAS_YLEVEL][CANVAS_XLEVEL] = CLICKED_SPRITE;
		drawLevelLayer(hoverCtx, spritesCtx, HOVER_LEVEL, spriteSlotLookup);
		HOVER_LEVEL = TEMP_LEVEL.map(innerArray => [...innerArray]);
	}
}


function updateCanvasOnMouseMove(e) {
	let coords = getClickedCoordinates(e);
	let xLevel = coords[0];
	let yLevel = coords[1];

	CANVAS_XLEVEL = xLevel;
	CANVAS_YLEVEL = yLevel;

	if (isValidIndex(TEMP_LEVEL, xLevel, yLevel) && MOUSEDOWN) {
		TEMP_LEVEL[yLevel][xLevel] = CLICKED_SPRITE;
	}
	displayPreviewTile();
}

function getSpriteCount(spritesCanvas) {
	return spritesCanvas.width / spritesCanvas.height;
}


let resetBtn = document.getElementById("reset-btn");
let copyBtn = document.getElementById("copy-to-clipboard");
const canvas = document.getElementById("canvas");
const hoverCanvas = document.getElementById("hover-canvas");
const spritesCanvas = document.getElementById("prerender-sprites-canvas");
const selection = document.getElementById("selection");

const levelSelector = document.getElementById("level-dropdown");
const widthSelector = document.getElementById("tile-width");
const heightSelector = document.getElementById("tile-height");

const ctx = canvas.getContext("2d", {willReadFrequently: true});
const hoverCtx = hoverCanvas.getContext("2d", {willReadFrequently: true});
const spritesCtx = spritesCanvas.getContext("2d", {willReadFrequently: true});

canvas.width = CAMERA["width"];
canvas.height = CAMERA["height"];

hoverCanvas.width = CAMERA["width"];
hoverCanvas.height = CAMERA["height"];

let lookups = createHiddenSpriteLookups(spritesCanvas, spritesCtx);
let spriteSlotLookup = lookups[0];
let slotSpriteLookup = lookups[1];


copyBtn.addEventListener("click", copyLevelToClipboard);
resetBtn.addEventListener("click", resetLevel);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
spritesCanvas.addEventListener("mousedown", selectSpriteToPaintWith);
canvas.addEventListener("mousedown", updateCanvasOnMouseDown);
canvas.addEventListener("mousemove", updateCanvasOnMouseMove);
canvas.addEventListener("mouseup", function(e) {MOUSEDOWN = false;})
levelSelector.addEventListener("change", loadCanvasLevel);

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
	displayPreviewTile();
})

function gameLoop() {
	if(
		document.activeElement.id === "tile-width" ||
		document.activeElement.id === "tile-height"
	)
		return;

	if(!MOUSEDOWN)
	{
		if (CONTROLLER["ArrowLeft"])
			CAMERA["xOffset"] -= GRID_WIDTH_PX;
		if (CONTROLLER["ArrowRight"])
			CAMERA["xOffset"] += GRID_WIDTH_PX;
		if (CONTROLLER["ArrowUp"])
			CAMERA["yOffset"] -= GRID_WIDTH_PX;
		if (CONTROLLER["ArrowDown"])
			CAMERA["yOffset"] += GRID_WIDTH_PX;
	}
	drawLevelLayer(ctx, spritesCtx, TEMP_LEVEL, spriteSlotLookup);
	displayPreviewTile();
}

updateActiveSprite(CLICKED_SPRITE_INT);
populateDimensionsDropdowns();
populateLevelDropdown();

setInterval(gameLoop, 1000 / FPS);
