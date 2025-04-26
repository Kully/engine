/* State */

import {
	GRID_WIDTH_PX,
	SCREEN_WIDTH_PX,
	SCREEN_HEIGHT_PX,
	VALID_CONTROLLER_KEYS,
} from "./constants.js";

import {
	COLOR_MAP_LOOKUP,
} from "./colors.js";

import {
	PLAYER_TILE_X,
	PLAYER_TILE_Y,
	LEVEL_LOOKUP,
	levelName,
} from "./data/levels.js";

import {
	getValueFrom2DArray,
} from "./pure.js"

import {
	ENEMY_LOOKUP,
} from "./data/enemy.js"


export const STATE = {
	resetGame: false,
	gameOver: false,
	lastFrameSquaresCompleted: 0,
	currentSquaresCompleted: 0,
	squaresCompletedStreak: 0,
	mostSquaresCompleted: 0,
	spawnPieceHistory: [],
	spawnPieceHistoryMax: 4,
};

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
	items: { gold: 0, },
	healthPoints: 1,
	pickedUpItemInitCoords: [-1, -1],
	pickedUpItemPtr: 0,
	hasPickedUpItemBefore: 0,
};

export const ACTIVE_ENEMIES = [];
export const HELD_ENEMIES = [];
let enemyMap = LEVEL_LOOKUP[levelName]["enemy"];
for(let rowIndex=0; rowIndex < LEVEL_LOOKUP[levelName]["enemy"][0].length; rowIndex += 1)
for(let colIndex=0; colIndex < LEVEL_LOOKUP[levelName]["enemy"].length; colIndex += 1)
{
	let ptr = getValueFrom2DArray(enemyMap, rowIndex, colIndex);
	if(ptr in ENEMY_LOOKUP)
	{
		let enemyPtr = ptr;
		let enemyName = ENEMY_LOOKUP[ptr]["name"];
		let enemyX = rowIndex;
		let enemyY = colIndex;
		let enemyObject = {
			name: enemyName,  // This is a redundant property. Included for convenience.
			ptr: enemyPtr,
			x: GRID_WIDTH_PX * enemyX - CAMERA["xOffset"],
			y: GRID_WIDTH_PX * enemyY - CAMERA["yOffset"],
			width: 16,
			height: 16,
			frameCounter: 0,
			animationCycleName: "STAND_CYCLE",
			spritePtr: 0,
			colorMap: COLOR_MAP_LOOKUP[enemyName],
			isFacingLeft: true,
		}
		ACTIVE_ENEMIES.push(enemyObject);
	}
}

export const ACTIVE_BULLETS = [];
