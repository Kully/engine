/* State Module */

import {GRID_WIDTH_PX} from "./data.js";

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

// 1920x1080 = 1080p
export const CAMERA = {
	width: 960,
	height: 540,
	gridXIndex: 0,
	gridYIndex: 0,
	xOffset: 0,
	yOffset: 0,
};

export const PLAYER = {
	levelGridX: 1,
	levelGridY: 1,
	x: GRID_WIDTH_PX*7,
	y: GRID_WIDTH_PX*6,
	width: 16,
	height: 32,
	speed: 0,
	default: "#FFFBE9",
	walkFrameCounter: 0,
	walkSpritePointer: 0,
};

export const BULLET_MANAGER = {
	instances: [],
	bulleyDelayFrames: 30,
	bulletDelayCounter: 0,
	maxOnScreen: 2,
}
