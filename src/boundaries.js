/* Boundaries and Collision Helpers */

import {
	GRID_WIDTH_PX,
} from "./constants.js";

import {
	getValueFrom2DArray,
} from "./helpers.js";

import {
	PLAYER,
	CAMERA,
} from "./state.js";

import {
	SPRITE_LOOKUP,
} from "./sprites.js";


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

	let xTileRounded = Math.round(playerGridX);
	let yTileRounded = Math.round(playerGridY);

	let xTileToYourLeft = Math.floor(playerGridX);
	let xTileToYourRight = Math.ceil(playerGridX);
	let yTileAboveYou = Math.floor(playerGridY);
	let yTileBelowYou = Math.ceil(playerGridY);

	// deal with boundaries on your left
	let spriteToLeft = level[yTileRounded - 1][xTileToYourLeft];
	if (spriteToLeft === undefined || SPRITE_LOOKUP[spriteToLeft]["hitbox"] === true) {
		PLAYER["x"] = (xTileToYourLeft + 1) * GRID_WIDTH_PX;
		PLAYER["x"] -= CAMERA["xOffset"];
	}

	// deal with boundaries on your right
	let boundaryOnRight = false;
	if (!Number.isInteger(playerGridY)) {
		let tileRight = level[yTileRounded - 1][xTileToYourRight];
		if (SPRITE_LOOKUP[tileRight]["hitbox"] === true) {
			boundaryOnRight = true;
		}
	} else {
		let tileRightAbove = level[yTileAboveYou - 1][xTileToYourRight];
		let tileRightBelow = level[yTileBelowYou - 1][xTileToYourRight];

		if (SPRITE_LOOKUP[tileRightAbove]["hitbox"] === true || SPRITE_LOOKUP[tileRightBelow]["hitbox"] === true) {
			boundaryOnRight = true;
		}
	}
	if (boundaryOnRight) {
		PLAYER["x"] = (xTileToYourLeft) * GRID_WIDTH_PX;
		PLAYER["x"] -= CAMERA["xOffset"];
	}


	// deal with boundaries above you
	let spriteAboveYou = getValueFrom2DArray(level, xTileRounded, yTileAboveYou - 1);
	if (spriteAboveYou === undefined || SPRITE_LOOKUP[spriteAboveYou]["hitbox"] === true) {
		PLAYER["y"] = (yTileAboveYou + 1) * GRID_WIDTH_PX;
		PLAYER["y"] -= CAMERA["yOffset"];
	}

	// deal with boundaries below you
	let currentSpritePtr = getSpritePtrPlayerInside(level);
	if (SPRITE_LOOKUP[currentSpritePtr]["hitbox"] === true) {
		let playerGridFloatY = getPlayerGridY();
		PLAYER["y"] = Math.floor(playerGridFloatY) * GRID_WIDTH_PX - CAMERA["yOffset"];
	}
}