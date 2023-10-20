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
	"z",
	"x",
];
export const CONTROLLER = {
	ArrowLeft: 0,
	ArrowRight: 0,
	ArrowUp: 0,
	ArrowDown: 0,
	z: 0,
	lastKeyUp: "ArrowRight",
	lastLeftOrRight: "ArrowRight",
};

export const CAMERA = {
	width: 960,
	height: 540,
	gridXIndex: 0,
	gridYIndex: 0,
	xOffset: 0,
	yOffset: 300,
	leftThresh: Math.floor(960 * 0.4),
	rightThresh: Math.floor(960 * 0.5),
};

// TODO: Make sure that PLAYER["width"] is correct
let PLAYER_TILE_X = 8;
let PLAYER_TILE_Y = 8;
export const PLAYER = {
	x: GRID_WIDTH_PX * (PLAYER_TILE_X - CAMERA["gridXIndex"]) - CAMERA["xOffset"],
	y: GRID_WIDTH_PX * (PLAYER_TILE_Y - CAMERA["gridYIndex"]) - CAMERA["yOffset"],
	width: 16,
	height: 16,
	speed: 0,
	speedY: 0,
	canJump: true,
	default: "#FFFBE9",
	walkFrameCounter: 0,
	walkSpritePointer: 0,
};