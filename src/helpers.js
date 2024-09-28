/* Helper Functions */

import {
	BKGD_COLOR_MAP,
	PLAYER_COLOR_MAP,
	ENEMY2_COLOR_MAP,
	SLOTH_COLOR_MAP,
	LEVEL_COLOR_MAP,
	GOLD_COIN_COLOR_MAP,
	GREYSCALE_COLORS,
	COLOR_MAP_LOOKUP,
} from "./colors.js";

import {
	GRID_WIDTH_PX,
	SCALE,
	SCALE2,
	SPRITE_WIDTH,
	SCREEN_WIDTH_PX,
	SCREEN_HEIGHT_PX,
	DRAW_SPRITES_WITH_COLOR,
	PLAYER_SPAWN_DELAY,
	DEBUG_MODE,
} from "./constants.js";

import {
	CAMERA,
	CONTROLLER,
	PLAYER,
	ACTIVE_BULLETS,
	ENEMY2,
	SLOTH,
	CHARACTER_LOOKUP,
} from "./state.js";

import {
	SPRITE_LOOKUP,
	SPRITES,
	BKGD_SPRITES,
	INVISIBLE_SPIRTE_IDX,
	OUTOFBOUNDS_SPIRTE_IDX,
	PLAYER_SPIRTE_IDX,
} from "./data/sprites.js";


let period = 22;
let amp = 2;
let wobble = 0.4;

export function hexToNumber(hexString) {
	return parseInt(hexString, 16);
}

export function numberToHex(number) {
	return number.toString(16).padEnd(2, "0");
}

function mutatePixel(pixelColor, warpPct) {
	function perturb(hexNumber)
	{
		let num = hexToNumber(hexNumber);
		let maxColorDist = undefined;
		let rand = maxColorDist;
		if(Math.random() > (1-warpPct))
			num += rand;
		else
		if(rand + maxColorDist > 255)
			num -= rand;
		return numberToHex(num);
	}

	// extract the original components of the color
	let r = pixelColor.substring(1, 3);
	let g = pixelColor.substring(3, 5);
	let b = pixelColor.substring(5, 7);
	let alpha = pixelColor.substring(7, 9);

	let newR = r;
	let newG = g;
	let newB = b;
	if(alpha !== "00")
	{
		newR = perturb(r);
		newG = perturb(g);
		pixelColor = "#" + newR + newG + newB + alpha;
	}
	return pixelColor;
}

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

export function getWidth2DArray(array_2d) {
	return array_2d[0].length;
}

export function getHeight2DArray(array_2d) {
	return array_2d.length;
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

/*
	Depending on the layer, decide what
	the color map should be.
*/
export function decideColorMap(spritePtr)
{
	if(spritePtr >= 900 && spritePtr <= 907)
		return GOLD_COIN_COLOR_MAP;
	return LEVEL_COLOR_MAP;
}

export function saveSpriteToHiddenCanvas(spritesCtx, spritePtr, colorMap, scale, slotX) {
	let spriteData = SPRITE_LOOKUP[spritePtr]["sprite"];
	for (let i = 0; i < spriteData.length; i += 1) {
		let imageData = spritesCtx.createImageData(2 * SCALE, 2 * SCALE);
		let colorPtr = spriteData[i];
		let pixelColor = colorMap[colorPtr]

		if(colorPtr === 0)  // TODO: Justify the 0 here
			pixelColor = "#00000000";

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
		let colorMap = decideColorMap(ptr);
		saveSpriteToHiddenCanvas(
			spritesCtx,
			ptr,
			colorMap,
			GRID_WIDTH_PX / SPRITE_WIDTH,
			spriteSlotLookup[ptr],
		);
	}
	return [spriteSlotLookup, slotSpriteLookup];
}

function getShiftPtr(eitherXOrY)
{
	let shiftPtr;
	if (CAMERA[eitherXOrY + "Offset"] >= 0)
		shiftPtr = Math.floor(CAMERA[eitherXOrY + "Offset"] / GRID_WIDTH_PX);
	else
		shiftPtr = Math.ceil(CAMERA[eitherXOrY + "Offset"] / GRID_WIDTH_PX);
	return shiftPtr;
}

export function drawLevelLayer(
	levelLayerCtx,
	spritesCtx,
	level,
	spriteSlotLookup,
	doesWobble,
	FRAME,
) {
	let xTiles = SCREEN_WIDTH_PX / GRID_WIDTH_PX;
	let yTiles = SCREEN_HEIGHT_PX / GRID_WIDTH_PX;
	for (let x = 0; x < xTiles + 1; x += 1)
		for (let y = 0; y < yTiles + 1; y += 1) {
			let shiftXPtr = getShiftPtr("x");
			if(doesWobble)
			{
				let period = 30;
				let amp = 1;
				let wobble = 0;
				shiftXPtr += Math.floor( amp * Math.sin(wobble * y + FRAME/period) );
			}
			let shiftYPtr = getShiftPtr("y");
			let spritePtr = getValueFrom2DArray(
				level,
				x + shiftXPtr,
				y + shiftYPtr,
			);

			// don't show anything
			if (spritePtr === undefined) {
				spritePtr = OUTOFBOUNDS_SPIRTE_IDX;
			}

			// show spawn tile in edit mode but hide during gameplay
			if (SPRITE_LOOKUP[spritePtr]["name"] === "player") {
				if(window.location.href.endsWith("editor.html"))
				{
					spritePtr = PLAYER_SPIRTE_IDX;
				}
				else
				if(window.location.href.endsWith("index.html"))
				{
					spritePtr = INVISIBLE_SPIRTE_IDX;
				}
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


export function drawItemLayer(itemLayerCtx, spritesCtx, level, spriteSlotLookup, FRAME) {
	let xTiles = SCREEN_WIDTH_PX / GRID_WIDTH_PX;
	let yTiles = SCREEN_HEIGHT_PX / GRID_WIDTH_PX;
	for (let x = 0; x < xTiles + 1; x += 1)
		for (let y = 0; y < yTiles + 1; y += 1) {
			let shiftXPtr = getShiftPtr("x");
			let shiftYPtr = getShiftPtr("y");
			let spritePtr = getValueFrom2DArray(
				level,
				x + shiftXPtr,
				y + shiftYPtr,
			);


			if (spritePtr === undefined) {
				spritePtr = OUTOFBOUNDS_SPIRTE_IDX;
			}

			// animate the rotating gold coins
			if(
				   spritePtr !== OUTOFBOUNDS_SPIRTE_IDX &&
				   SPRITE_LOOKUP[spritePtr]["name"] == "gold"
			)
			{
				if(FRAME % 10 === 0)
				{
					SPRITE_LOOKUP[spritePtr]["currentFrame"] = 0;
					spritePtr = SPRITE_LOOKUP[spritePtr]["nextPtr"];

					// print the next animation frame of the gold coin
					putValueTo2DArray(
						level,
						x + shiftXPtr,
						y + shiftYPtr,
						spritePtr,
					)
				}
			}

			if (spritePtr === undefined) {
				spritePtr = OUTOFBOUNDS_SPIRTE_IDX;
			}
			if(spritePtr !== OUTOFBOUNDS_SPIRTE_IDX && spritePtr !== INVISIBLE_SPIRTE_IDX) {
				let savedData = getSpriteFromHiddenCanvas(
					spritesCtx,
					spritePtr,
					spriteSlotLookup,
				);
				let tileX = x;
				let tileY = y;
				let putImageDataX = tileX * GRID_WIDTH_PX - (CAMERA["xOffset"] % GRID_WIDTH_PX);
				let putImageDataY = tileY * GRID_WIDTH_PX - (CAMERA["yOffset"] % GRID_WIDTH_PX);
				itemLayerCtx.putImageData(
					savedData,
					putImageDataX,
					putImageDataY,
				);
			}
		}
}

export function drawBkgdLayer(bkgdLayerCtx, isMosaic=false) {
	let spriteArray = BKGD_SPRITES["DARK_SKY"][0]["sprite"];
	let spriteWidth = BKGD_SPRITES["DARK_SKY"][0]["width"];
	let spriteHeight = BKGD_SPRITES["DARK_SKY"][0]["height"];

	let step = 1;
	if(isMosaic)
		step = 2
	for (let i = 0; i < spriteWidth; i += step)
	for (let j = 0; j < spriteHeight; j += step)
	{
		let colorPtr = spriteArray[i + j * spriteWidth];

		let pixelColor;
		if (DRAW_SPRITES_WITH_COLOR)
			pixelColor = BKGD_COLOR_MAP[colorPtr];
		else
			pixelColor = GREYSCALE_COLORS[colorPtr];

		let x = i * SCALE;
		let y = j * SCALE;
		bkgdLayerCtx.fillStyle = pixelColor;
		bkgdLayerCtx.fillRect(
			x,
			y,
			SCALE,
			SCALE,
		);
	}
}

export function playerFacingLeft()
{
	if (CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0) {
		return true;
	} else
	if (CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 0) {
		if (CONTROLLER["lastLeftOrRight"] !== "ArrowRight") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

export function drawAnimatingBkgdLayer(bkgdLayerCtx, FRAME) {
	let squareWidth = 8;
	for (let i = 0; i < SCREEN_WIDTH_PX; i += squareWidth)
	for (let j = 0; j < SCREEN_HEIGHT_PX; j += squareWidth)
	{
		// -- inside of some water
		let g = j + Math.sin(i + 0.0002 * j * FRAME) * 80;
		// let g = j + Math.sin( 0.0005 * j * FRAME) * 20;

		g = Math.round(g);
		if(g > 255)
			g = 255
		if(g < 0)
			g = 0

		g = Math.round(
			-1 * (g - (255 / 2) ) + (255/2)
		);
		let pixelColor = `rgb(12,10,${g})`;
		bkgdLayerCtx.fillStyle = pixelColor;
		bkgdLayerCtx.fillRect(
			i,
			j,
			squareWidth,
			squareWidth,
		);
	}

}


export function drawEnemy(playerLayerCtx, spriteName, doesWobble, FRAME)
{
	// removed the `let` on these variables since already declared
	let spriteArray = SPRITES[spriteName]["STAND_CYCLE"][0]["sprite"];
	let spriteWidth = SPRITES[spriteName]["STAND_CYCLE"][0]["width"];
	let spriteHeight = SPRITES[spriteName]["STAND_CYCLE"][0]["height"];

	let enemyFacingRight = true;
	for (let i = 0; i < spriteWidth; i += 1)
		for (let j = 0; j < spriteHeight; j += 1) {
			let colorPtr;

			if(enemyFacingRight)
				colorPtr = spriteArray[i + j * spriteWidth];
			else
				colorPtr = spriteArray[(spriteWidth - 1 - i) + j * spriteWidth];

			let pixelColor;
			if (DRAW_SPRITES_WITH_COLOR) {
				let colorMap = COLOR_MAP_LOOKUP[spriteName]
				pixelColor = colorMap[colorPtr];
			}
			else {
				pixelColor = GREYSCALE_COLORS[colorPtr];
			}

			let x = CHARACTER_LOOKUP[spriteName]["x"] + i * SCALE;
			let y = CHARACTER_LOOKUP[spriteName]["y"] + (j - spriteHeight) * SCALE;
			if(doesWobble)
				x += Math.floor( amp * Math.sin(wobble * j + FRAME/period) );

			playerLayerCtx.fillStyle = pixelColor;
			playerLayerCtx.fillRect(
				x,
				y,
				SCALE,
				SCALE,
			);
		}
}


export function drawAnimatingEnemy(playerLayerCtx, spriteName, animationArray, doesWobble, FRAME)
{
	let spriteArray = animationArray[CHARACTER_LOOKUP[spriteName]["spritePtr"]]["sprite"];
	let spriteWidth = animationArray[CHARACTER_LOOKUP[spriteName]["spritePtr"]]["width"];
	let spriteHeight = animationArray[CHARACTER_LOOKUP[spriteName]["spritePtr"]]["height"];

	let enemyFacingRight = true;
	for (let i = 0; i < spriteWidth; i += 1)
		for (let j = 0; j < spriteHeight; j += 1) {
			let colorPtr;

			if(enemyFacingRight)
				colorPtr = spriteArray[i + j * spriteWidth];
			else
				colorPtr = spriteArray[(spriteWidth - 1 - i) + j * spriteWidth];

			let pixelColor;
			if (DRAW_SPRITES_WITH_COLOR) {
				let colorMap = COLOR_MAP_LOOKUP[spriteName]
				pixelColor = colorMap[colorPtr];
			}
			else {
				pixelColor = GREYSCALE_COLORS[colorPtr];
			}

			let x = CHARACTER_LOOKUP[spriteName]["x"] + i * SCALE;
			let y = CHARACTER_LOOKUP[spriteName]["y"] + (j - spriteHeight) * SCALE;
			if(doesWobble)
				x += Math.floor( amp * Math.sin(wobble * j + FRAME/period) );

			playerLayerCtx.fillStyle = pixelColor;
			playerLayerCtx.fillRect(
				x,
				y,
				SCALE,
				SCALE,
			);
		}
}

export function drawPlayerLayer(playerLayerCtx, animationArray, enemyAnimationArray, FRAME) {
	let spriteArray = animationArray[PLAYER["spritePtr"]]["sprite"];
	let spriteWidth = animationArray[PLAYER["spritePtr"]]["width"];
	let spriteHeight = animationArray[PLAYER["spritePtr"]]["height"];

	for (let i = 0; i < spriteWidth; i += 1)
		for (let j = 0; j < spriteHeight; j += 1) {
			let colorPtr;

			if(playerFacingLeft())
				colorPtr = spriteArray[(spriteWidth - 1 - i) + j * spriteWidth];
			else
				colorPtr = spriteArray[i + j * spriteWidth];

			let pixelColor;
			if (DRAW_SPRITES_WITH_COLOR)
				pixelColor = PLAYER_COLOR_MAP[colorPtr];
			else
				pixelColor = GREYSCALE_COLORS[colorPtr];

			// color the corner pixels in red for debugging
			if(DEBUG_MODE)
			{
				if(i === 0 && j === 0)
					pixelColor = "#FF0000FF";
				if(i === spriteWidth - 1 && j === 0)
					pixelColor = "#FF0000FF";
				if(i === 0 && j === spriteHeight - 1)
					pixelColor = "#FF0000FF";
				if(i === spriteWidth - 1 && j === spriteHeight - 1)
					pixelColor = "#FF0000FF";
			}

			// spawn the player in via a glitchy effect
			let warpPct;
			if(FRAME < PLAYER_SPAWN_DELAY) {
				warpPct = 1;
			}
			else {
				warpPct = 1 - (FRAME - PLAYER_SPAWN_DELAY) / 35;
			}
			warpPct = Math.min(1, warpPct);
			pixelColor = mutatePixel(pixelColor, warpPct);

			let x = PLAYER["x"] + i * SCALE;
			let y = PLAYER["y"] + (j - spriteHeight) * SCALE;

			playerLayerCtx.fillStyle = pixelColor;
			playerLayerCtx.fillRect(
				x,
				y,
				SCALE,
				SCALE,
			);
		}

	drawEnemy(playerLayerCtx, "enemy2", false, FRAME);
	drawAnimatingEnemy(playerLayerCtx, "sloth", enemyAnimationArray, false, FRAME);
}

export function drawBullets(playerLayerCtx, FRAME)
{
	for(let bullet of ACTIVE_BULLETS)
	{
		let spriteArray = SPRITES["bullet"]["IDLE_CYCLE"][0]["sprite"];
		let spriteWidth = SPRITES["bullet"]["IDLE_CYCLE"][0]["width"];
		let spriteHeight = SPRITES["bullet"]["IDLE_CYCLE"][0]["height"];

		let bulletX = bullet["x"];
		let bulletY = bullet["y"];

		for (let i = 0; i < spriteWidth; i += 1)
			for (let j = 0; j < spriteHeight; j += 1) {
				let colorPtr = spriteArray[i + j * spriteWidth];

				let pixelColor;
				if (DRAW_SPRITES_WITH_COLOR)
					pixelColor = PLAYER_COLOR_MAP[colorPtr];
				else
					pixelColor = GREYSCALE_COLORS[colorPtr];

				let x = (bulletX - CAMERA["xOffset"]) + i * SCALE;
				let y = (bulletY - CAMERA["yOffset"]) + (j - spriteHeight) * SCALE;

				playerLayerCtx.fillStyle = pixelColor;
				playerLayerCtx.fillRect(
					x,
					y,
					SCALE,
					SCALE,
				);
			}
	}
}
