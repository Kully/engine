/* Boundaries and Collision Helpers */

import {
	GRID_WIDTH_PX,
	VALID_CONTROLLER_KEYS,
} from "./constants.js";

import {
	getValueFrom2DArray,
} from "./helpers.js";

import {
	PLAYER_TILE_X,
	PLAYER_TILE_Y,
} from "./data/levels.js";

import {
	PLAYER,
	CAMERA,
	STATE,
	CONTROLLER,
} from "./state.js";

import {
	SPRITE_LOOKUP,
} from "./data/sprites.js";


export function getPlayerGridX() {
	return (PLAYER["x"] + CAMERA["xOffset"]) / GRID_WIDTH_PX;
}

export function getPlayerGridY() {
	return (PLAYER["y"] + CAMERA["yOffset"]) / GRID_WIDTH_PX;
}

export function isPlayerStanding(level) {

	// Unexpected results if 0.5 or more.
	// The bigger the number, the further off the
	// edge the player can stand before falling.
	const STAND_LENIANCY = 0.25;

	let playerGridFloatX = getPlayerGridX();
	let playerGridFloatY = getPlayerGridY();
	let y = Math.floor(playerGridFloatY);

	let spriteXLeftPtr = getValueFrom2DArray(
		level,
		Math.max(Math.round(playerGridFloatX - STAND_LENIANCY), 0),
		y,
	);
	let spriteXRightPtr = getValueFrom2DArray(
		level,
		Math.max(Math.round(playerGridFloatX + STAND_LENIANCY), 0),
		y,
	);

	let isBoundaryBelowYou = (
		SPRITE_LOOKUP[spriteXLeftPtr]["hitbox"] === true ||
		SPRITE_LOOKUP[spriteXRightPtr]["hitbox"] === true
	);
	if (isBoundaryBelowYou && Number.isInteger(playerGridFloatY))
		return true;
	return false;
}

export function getSpritePtrPlayerInside(level) {

	let playerGridFloatX = getPlayerGridX();
	let playerGridFloatY = getPlayerGridY();

	let x = Math.round(playerGridFloatX);
	let y = Math.floor(playerGridFloatY);

	let spritePtr = getValueFrom2DArray(level, x, y);
	return spritePtr;
}


export function handleBoundaryCollision(level) {
	// set up the variables
	let playerGridX = PLAYER["x"] / GRID_WIDTH_PX;
	let playerGridY = PLAYER["y"] / GRID_WIDTH_PX;
	playerGridX += CAMERA["xOffset"] / GRID_WIDTH_PX;
	playerGridY += CAMERA["yOffset"] / GRID_WIDTH_PX;

	let xTileCurrent = Math.round(playerGridX);
	let yTileCurrent = Math.round(playerGridY);

	let xTileToYourLeft = Math.floor(playerGridX);
	let xTileToYourRight = Math.ceil(playerGridX);
	let yTileAboveYou = Math.floor(playerGridY);
	let yTileBelowYou = Math.ceil(playerGridY);

	// deal with boundaries on your left
	let spriteToLeft = level[yTileCurrent - 1][xTileToYourLeft];
	if (spriteToLeft === undefined || SPRITE_LOOKUP[spriteToLeft]["hitbox"] === true) {
		PLAYER["x"] = (xTileToYourLeft + 1) * GRID_WIDTH_PX;
		PLAYER["x"] -= CAMERA["xOffset"];
	}

	// deal with boundaries on your right
	let spiteToRight = level[yTileCurrent - 1][xTileToYourRight];
	if (spiteToRight === undefined || SPRITE_LOOKUP[spiteToRight]["hitbox"] === true) {
		PLAYER["x"] = (xTileToYourLeft) * GRID_WIDTH_PX;
		PLAYER["x"] -= CAMERA["xOffset"];
	}

	// deal with boundaries above you
	let spriteAboveYou = getValueFrom2DArray(level, xTileCurrent, yTileAboveYou - 1);
	if (spriteAboveYou === undefined || SPRITE_LOOKUP[spriteAboveYou]["hitbox"] === true) {
		PLAYER["y"] = (yTileAboveYou + 1) * GRID_WIDTH_PX;
		PLAYER["y"] -= CAMERA["yOffset"];
	}

	// deal with boundaries below you
	let currentSpritePtr = getSpritePtrPlayerInside(level);

	// reset game if you fall out of the level
	if(currentSpritePtr === undefined) {

		// reset player state
		PLAYER["x"] = GRID_WIDTH_PX * PLAYER_TILE_X - CAMERA["xOffset"];
		PLAYER["y"] = GRID_WIDTH_PX * PLAYER_TILE_Y - CAMERA["yOffset"];
		PLAYER["xSP"] = GRID_WIDTH_PX * PLAYER_TILE_X - CAMERA["xOffset"];
		PLAYER["ySP"] = GRID_WIDTH_PX * PLAYER_TILE_Y - CAMERA["yOffset"];
		PLAYER["speed"] = 0;
		PLAYER["speedSP"] = 0;
		PLAYER["speedY"] = 0;
		PLAYER["canJump"] = true;
		PLAYER["jumpJuice"] = 1;
		PLAYER["lastJumpJuice"] = 0;
		PLAYER["frameCounter"] = 0;
		PLAYER["spritePtr"] = 0;
		PLAYER["lastAnimationCycle"] = null;
		PLAYER["lastAnimationCycleCount"] = 0;
		PLAYER["wasFacingLeftLastFrame"] = false;

		// reset controller inputs
		for (let key of VALID_CONTROLLER_KEYS)
			CONTROLLER[key] = 0;
		CONTROLLER["lastKeyUp"] = "ArrowRight";
		CONTROLLER["lastLeftOrRight"] = "ArrowRight";

		STATE["resetGame"] = true;
	}
	else
	if (SPRITE_LOOKUP[currentSpritePtr]["hitbox"] === true) {
		let playerGridFloatY = getPlayerGridY();
		PLAYER["y"] = Math.floor(playerGridFloatY) * GRID_WIDTH_PX - CAMERA["yOffset"];
	}
}