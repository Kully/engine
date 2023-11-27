/* Helper Functions */

import {
	PLAYER_COLOR_MAP,
	LEVEL_COLOR_MAP,
	GREYSCALE_COLORS,
} from "./colors.js";

import {
	GRID_WIDTH_PX,
	SCALE,
	SCALE2,
	SPRITE_WIDTH,
	SCREEN_WIDTH_PX,
	SCREEN_HEIGHT_PX,
	DRAW_SPRITES_WITH_COLOR,
} from "./constants.js";

import {
	CAMERA,
	CONTROLLER,
	PLAYER,
} from "./state.js";

import {
	SPRITE_LOOKUP,
} from "./sprites.js";


let INVALID_SPIRTE_INDEX = 0;


export function hexToRgb(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		let r = parseInt(result[1], 16);
		let g = parseInt(result[2], 16);
		let b = parseInt(result[3], 16);
		let a = parseInt(result[4], 16);
		return [r, g, b, a];
	}
	return null;
}

export function getValueFrom2DArray(array_2d, x, y) {
	if (x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
		return undefined;
	return array_2d[y][x];
}

export function isValidIndex(array_2d, x, y) {
	if (x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
		return false;
	return true;
}


export function putValueTo2DArray(array_2d, x, y, val) {
	if (x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
		return undefined;
	array_2d[y][x] = val;
	return array_2d
}


export function clearCanvas(canvas, ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function getSpriteFromHiddenCanvas(spritesCtx, spritePtr, spriteSlotLookup) {
	let slotX = spriteSlotLookup[spritePtr]
	let left = GRID_WIDTH_PX * slotX;
	let top = 0;
	let width = GRID_WIDTH_PX;
	let height = GRID_WIDTH_PX;
	let savedData = spritesCtx.getImageData(left, top, width, height);
	return savedData;
}

export function saveSpriteToHiddenCanvas(spritesCtx, spritePtr, scale, slotX) {
	let spriteData = SPRITE_LOOKUP[spritePtr]["sprite"];
	for (let i = 0; i < spriteData.length; i += 1) {
		let imageData = spritesCtx.createImageData(2 * SCALE, 2 * SCALE);
		let colorPtr = spriteData[i];

		let pixelColor;
		if (DRAW_SPRITES_WITH_COLOR)
			pixelColor = LEVEL_COLOR_MAP[colorPtr];
		else
			pixelColor = GREYSCALE_COLORS[colorPtr];

		let rgbArray = hexToRgb(pixelColor);

		for (let j = 0; j < SPRITE_WIDTH * SPRITE_WIDTH; j += 1) {
			imageData.data[4 * j + 0] = rgbArray[0];
			imageData.data[4 * j + 1] = rgbArray[1];
			imageData.data[4 * j + 2] = rgbArray[2];
			imageData.data[4 * j + 3] = rgbArray[3];
		}
		let x = SCALE * SPRITE_WIDTH * slotX + SCALE * (i % SPRITE_WIDTH);
		let y = 0 + SCALE * (Math.floor(i / SPRITE_WIDTH));
		spritesCtx.putImageData(imageData, SCALE2 * x, SCALE2 * y);
	}
}


export function createHiddenSpriteLookups(spritesCanvas, spritesCtx) {
	let levelSpriteCount = Object.keys(SPRITE_LOOKUP).length
	spritesCanvas.width = levelSpriteCount * GRID_WIDTH_PX;
	spritesCanvas.height = GRID_WIDTH_PX;
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
			spritesCtx,
			ptr,
			GRID_WIDTH_PX / SPRITE_WIDTH,
			spriteSlotLookup[ptr]
		);
	}
	return [spriteSlotLookup, slotSpriteLookup];
}

export function drawLevelLayer(levelLayerCtx, spritesCtx, level, spriteSlotLookup) {
	let xTiles = SCREEN_WIDTH_PX / GRID_WIDTH_PX;
	let yTiles = SCREEN_HEIGHT_PX / GRID_WIDTH_PX;
	for (let x = 0; x < xTiles + 1; x += 1)
		for (let y = 0; y < yTiles + 1; y += 1) {
			let shiftXPtr;
			if (CAMERA["xOffset"] >= 0)
				shiftXPtr = Math.floor(CAMERA["xOffset"] / GRID_WIDTH_PX);
			else
				shiftXPtr = Math.ceil(CAMERA["xOffset"] / GRID_WIDTH_PX);

			let shiftYPtr;
			if (CAMERA["yOffset"] >= 0)
				shiftYPtr = Math.floor(CAMERA["yOffset"] / GRID_WIDTH_PX);
			else
				shiftYPtr = Math.ceil(CAMERA["yOffset"] / GRID_WIDTH_PX);

			let spritePtr = getValueFrom2DArray(
				level,
				x + shiftXPtr,
				y + shiftYPtr,
			);
			if (spritePtr === undefined) {
				spritePtr = INVALID_SPIRTE_INDEX;
			}

			let savedData = getSpriteFromHiddenCanvas(
				spritesCtx,
				spritePtr,
				spriteSlotLookup,
			);
			let tileX = x;
			let tileY = y;
			let putImageDataX = tileX * GRID_WIDTH_PX - (CAMERA["xOffset"] % GRID_WIDTH_PX);
			let putImageDataY = tileY * GRID_WIDTH_PX - (CAMERA["yOffset"] % GRID_WIDTH_PX);
			levelLayerCtx.putImageData(
				savedData,
				putImageDataX,
				putImageDataY,
			);
		}
}

export function drawPlayerLayer(playerLayerCtx, animationArray) {
	let spriteArray = animationArray[PLAYER["walkSpritePointer"]]["sprite"];
	let spriteWidth = animationArray[PLAYER["walkSpritePointer"]]["width"];
	let spriteHeight = animationArray[PLAYER["walkSpritePointer"]]["height"];
	let yShift = animationArray[PLAYER["walkSpritePointer"]]["yShift"];

	let playerFacingLeft = 0;
	for (let i = 0; i < spriteWidth; i += 1)
		for (let j = 0; j < spriteHeight; j += 1) {
			let colorPtr;
			if (CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0) {
				colorPtr = spriteArray[(spriteWidth - 1 - i) + j * spriteWidth]
				playerFacingLeft = 1;
			} else
			if (CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 0) {
				if (CONTROLLER["lastLeftOrRight"] !== "ArrowRight") {
					colorPtr = spriteArray[(spriteWidth - 1 - i) + j * spriteWidth];
					playerFacingLeft = 1;
				} else {
					colorPtr = spriteArray[i + j * spriteWidth];
				}
			} else {
				colorPtr = spriteArray[i + j * spriteWidth];
			}

			let pixelColor;
			if (DRAW_SPRITES_WITH_COLOR)
				pixelColor = PLAYER_COLOR_MAP[colorPtr];
			else
				pixelColor = GREYSCALE_COLORS[colorPtr];

			let x = PLAYER["x"] + i * SCALE;
			let y = PLAYER["y"] + (j - spriteHeight + yShift) * SCALE;
			playerLayerCtx.fillStyle = pixelColor;
			playerLayerCtx.fillRect(
				x,
				y,
				SCALE,
				SCALE,
			);
		}
}