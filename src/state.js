/* State Module */

import {
	GRID_WIDTH_PX
} from "./data.js";

export const FPS = 60;

export const VALID_CONTROLLER_KEYS = [
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"ArrowDown",
	"KeyZ",
	"KeyX",
];
export const CONTROLLER = {
	ArrowLeft: 0,
	ArrowRight: 0,
	ArrowUp: 0,
	ArrowDown: 0,
	z: 0,
	x: 0,
	lastKeyUp: "ArrowRight",
	lastLeftOrRight: "ArrowRight",
};

const SCREEN_WIDTH_PX = 960;
const SCREEN_HEIGHT_PX = 540;
export const CAMERA = {
	width: SCREEN_WIDTH_PX,
	height: SCREEN_HEIGHT_PX,
	xOffset: 0,
	yOffset: 300,
	leftThresh: Math.floor(SCREEN_WIDTH_PX * 0.4),
	rightThresh: Math.floor(SCREEN_WIDTH_PX * 0.5),
	upThresh: Math.floor(SCREEN_HEIGHT_PX * 0.4),
	downThresh: Math.floor(SCREEN_HEIGHT_PX * 0.5),
};

// TODO: Make sure that PLAYER["width"] is correct
let PLAYER_TILE_X = 8;
let PLAYER_TILE_Y = 8;
export const PLAYER = {
	x: GRID_WIDTH_PX * PLAYER_TILE_X - CAMERA["xOffset"],
	y: GRID_WIDTH_PX * PLAYER_TILE_Y - CAMERA["yOffset"],
	width: 16,
	height: 16,
	speed: 0,
	speedY: 0,
	canJump: true,
	jumpJuice: 1,
	walkFrameCounter: 0,
	walkSpritePointer: 0,
};