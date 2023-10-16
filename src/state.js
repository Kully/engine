/* State Module */

import {GRID_WIDTH_PX} from "./data.js";

export const FPS = 60;

export const VALID_CONTROLLER_KEYS = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "z",
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
	yOffset: 0,
	velocityX: 0,
	velocityY: 0,
};

export const PLAYER = {
	x: GRID_WIDTH_PX*(2-CAMERA["gridXIndex"]) - CAMERA["xOffset"],
	y: GRID_WIDTH_PX*(8-CAMERA["gridYIndex"]) - CAMERA["yOffset"],
	width: 16,
	height: 16,
	speed: 0,
	default: "#FFFBE9",
	walkFrameCounter: 0,
	walkSpritePointer: 0,
};
