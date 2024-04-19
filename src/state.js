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
	width: 16,
	height: 16,
	speed: 0,
	speedY: 0,
	canJump: true,
	jumpJuice: 1,
	frameCounter: 0,
	spritePtr: 0,
	lastAnimationCycle: null,
	lastAnimationCycleCount: 0,
	wasFacingLeftLastFrame: false,
};

let ENEMY2_X = 6;
let ENEMY2_Y = 4;
export const ENEMY2 = {
	x: GRID_WIDTH_PX * ENEMY2_X - CAMERA["xOffset"],
	y: GRID_WIDTH_PX * ENEMY2_Y - CAMERA["yOffset"],
	width: 16,
	height: 16,
	frameCounter: 0,
	spritePtr: 0,
};
