/* State */

import {
	GRID_WIDTH_PX,
	SCREEN_WIDTH_PX,
	SCREEN_HEIGHT_PX,
	VALID_CONTROLLER_KEYS,
} from "./constants.js";

import {
	PLAYER_TILE_X,
	PLAYER_TILE_Y,
} from "./levels.js";


export const STATE = {resetGame: false};

export const CONTROLLER = {};
for (let key of VALID_CONTROLLER_KEYS)
	CONTROLLER[key] = 0;
CONTROLLER["lastKeyUp"] = "ArrowRight";
CONTROLLER["lastLeftOrRight"] = "ArrowRight";

export const CAMERA = {
	width: SCREEN_WIDTH_PX,
	height: SCREEN_HEIGHT_PX,
	xOffset: 0,
	yOffset: 0,
	leftThresh: Math.floor(SCREEN_WIDTH_PX * 0.4),
	rightThresh: Math.floor(SCREEN_WIDTH_PX * 0.5),
	upThresh: Math.floor(SCREEN_HEIGHT_PX * 0.4),
	downThresh: Math.floor(SCREEN_HEIGHT_PX * 0.5),
	easeIn: 8,
};

export const PLAYER = {
	x: GRID_WIDTH_PX * PLAYER_TILE_X - CAMERA["xOffset"],
	y: GRID_WIDTH_PX * PLAYER_TILE_Y - CAMERA["yOffset"],
	xSP: GRID_WIDTH_PX * PLAYER_TILE_X - CAMERA["xOffset"],
	ySP: GRID_WIDTH_PX * PLAYER_TILE_Y - CAMERA["yOffset"],
	width: 16,
	height: 16,
	speed: 0,
	speedSP: 0,
	speedY: 0,
	canJump: true,
	jumpJuice: 1,
	lastJumpJuice: 0,
	frameCounter: 0,
	spritePtr: 0,
	lastAnimationCycle: null,
	lastAnimationCycleCount: 0,
	wasFacingLeftLastFrame: false,
	accelUserValue: 0.2,   // can remove since obsolete
	maxSpeedUserValue: 3,  // can remove since obsolete
};


const LARGE_SCREENSHAKE = {
	ptr: 0,
	array: [
		[  2, 0],
		[  0, 0],
		[ -6, 0],
		[ 14, 0],
		[-12, 0],
		[  8, 0],
		[ -8, 0],
		[  8, 0],
		[ -8, 0],
		[  6, 0],
		[ -6, 0],
		[  6, 0],
		[ -4, 0],
		[  2, 0],
		[ -2, 0],
		[  1, 0],
		[ -1, 0],
	],
};
const MEDIUM_SCREENSHAKE = {
	ptr: 0,
	array: [
		[  2, 0],
		[  0, 0],
		[ -1, 0],
		[  4, 0],
		[ -6, 0],
		[  3, 0],
		[  4, 0],
		[ -4, 0],
		[  4, 0],
		[ -4, 0],
		[  3, 0],
		[ -3, 0],
		[  2, 0],
		[ -2, 0],
		[  1, 0],
		[ -1, 0],
	],
};
const SMALL_SCREENSHAKE = {
	ptr: 0,
	array: [
		[ -1, 0],
		[ 1, 0],
		[ -2, 0],
		[ 2, 0],
		[  4, 0],
		[ -4, 0],
		[  3, 0],
		[  -3, 0],
		[  1, 0],
		[ -1, 0],
	],
};
export const SCREENSHAKE = MEDIUM_SCREENSHAKE;


let ENEMY2_X = 9;
let ENEMY2_Y = 3;
export const ENEMY2 = {
	x: GRID_WIDTH_PX * ENEMY2_X - CAMERA["xOffset"],
	y: GRID_WIDTH_PX * ENEMY2_Y - CAMERA["yOffset"],
	width: 16,
	height: 16,
	frameCounter: 0,
	spritePtr: 0,
};
