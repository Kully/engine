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
	let spritePtr = getSpritePtrPlayerInside(level);
	let isBoundaryBelowYou = (SPRITE_LOOKUP[spritePtr]["hitbox"] === true);

	let playerGridFloatY = getPlayerGridY();
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


export function handleXBoundaryCollision(level) {
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

	// deal with boundary on your left
	let spriteToLeft = level[yTileCurrent - 1][xTileToYourLeft];
	if (spriteToLeft === undefined || SPRITE_LOOKUP[spriteToLeft]["hitbox"] === true) {
		PLAYER["x"] = (xTileToYourLeft + 1) * GRID_WIDTH_PX;
		PLAYER["x"] -= CAMERA["xOffset"];
	}

	// deal with boundary on your right
	let spiteToRight = level[yTileCurrent - 1][xTileToYourRight];
	if (spiteToRight === undefined || SPRITE_LOOKUP[spiteToRight]["hitbox"] === true) {
		PLAYER["x"] = (xTileToYourLeft) * GRID_WIDTH_PX;
		PLAYER["x"] -= CAMERA["xOffset"];
	}

	// prevent jumping through blocks
	let spriteAboveYou = getValueFrom2DArray(level, xTileCurrent, yTileAboveYou - 1);
	if (spriteAboveYou === undefined || SPRITE_LOOKUP[spriteAboveYou]["hitbox"] === true) {
		PLAYER["y"] = (yTileAboveYou + 1) * GRID_WIDTH_PX;
		PLAYER["y"] -= CAMERA["yOffset"];
	}
}

export function handleYBoundaryCollision(level) {
	let currentSpritePtr = getSpritePtrPlayerInside(level);
	if (SPRITE_LOOKUP[currentSpritePtr]["hitbox"] === true) {
		let playerGridFloatY = getPlayerGridY();
		PLAYER["y"] = Math.floor(playerGridFloatY) * GRID_WIDTH_PX - CAMERA["yOffset"];
	}
}