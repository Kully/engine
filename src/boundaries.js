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
	// const STAND_LENIANCY = 0.25;
	const STAND_LENIANCY = 0;

	let playerGridFloatX = getPlayerGridX();
	let playerGridFloatY = getPlayerGridY();
	let y = Math.floor(playerGridFloatY);

	// let spriteXLeftPtr = getValueFrom2DArray(
	// 	level,
	// 	Math.max(Math.round(playerGridFloatX - STAND_LENIANCY), 0),
	// 	y,
	// );
	// let spriteXRightPtr = getValueFrom2DArray(
	// 	level,
	// 	Math.max(Math.round(playerGridFloatX + STAND_LENIANCY), 0),
	// 	y,
	// );

	let spriteXLeftPtr = getValueFrom2DArray(
		level,
		Math.floor(playerGridFloatX),
		y,
	);
	let spriteXRightPtr = getValueFrom2DArray(
		level,
		Math.ceil(playerGridFloatX),
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
	let playerGridFloatX = getPlayerGridX();
	let playerGridFloatY = getPlayerGridY();
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
	let horizontalEjectionSpeed = 4;
	let spriteToLeft = level[yTileCurrent - 1][xTileToYourLeft];
	if (spriteToLeft === undefined || SPRITE_LOOKUP[spriteToLeft]["hitbox"] === true) {
		if(playerGridX - xTileToYourLeft < 0.2) {
			PLAYER["x"] = (xTileToYourLeft + 1) * GRID_WIDTH_PX;
			PLAYER["x"] -= CAMERA["xOffset"];
		}
		else {
			PLAYER["x"] += horizontalEjectionSpeed;
		}
	}

	// deal with boundaries on your right
	let spiteToRight = level[yTileCurrent - 1][xTileToYourRight];
	if (spiteToRight === undefined || SPRITE_LOOKUP[spiteToRight]["hitbox"] === true) {
		if(playerGridX - xTileToYourLeft < 0.2) {
			PLAYER["x"] = (xTileToYourLeft) * GRID_WIDTH_PX;
			PLAYER["x"] -= CAMERA["xOffset"];
		}
		else {
			PLAYER["x"] -= horizontalEjectionSpeed;
		}
	}

	// deal with boundaries above you
	let spriteAboveYou = getValueFrom2DArray(level, xTileCurrent, yTileAboveYou - 1);
	if (spriteAboveYou === undefined || SPRITE_LOOKUP[spriteAboveYou]["hitbox"] === true) {
		PLAYER["jumpJuice"] = 0;
		PLAYER["y"] = (yTileAboveYou + 1) * GRID_WIDTH_PX;
		PLAYER["y"] -= CAMERA["yOffset"];
	}

	// deal with boundaries below you
	let spritePtrXRound = getValueFrom2DArray(
		level,
		Math.round(playerGridFloatX),
		Math.floor(playerGridFloatY),
	);
	let spritePtrXFloor = getValueFrom2DArray(
		level,
		Math.floor(playerGridFloatX),
		Math.floor(playerGridFloatY),
	);

	if (SPRITE_LOOKUP[spritePtrXRound]["hitbox"] === true) {
		PLAYER["y"] = Math.floor(playerGridFloatY) * GRID_WIDTH_PX;
		PLAYER["y"] -= CAMERA["yOffset"];
	};

	// if any part of you touches a boundary while falling, stop falling
	if (SPRITE_LOOKUP[spritePtrXFloor]["hitbox"] === true && PLAYER["speedY"] >= 0) {
		PLAYER["y"] = Math.floor(playerGridFloatY) * GRID_WIDTH_PX;
		PLAYER["y"] -= CAMERA["yOffset"];
	};
}
