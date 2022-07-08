/* State Module */

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
	gridXIndex: 0,
	gridYIndex: 2,
	xOffset: 0,
	yOffset: 0,
	width: 1920/2,
	height: 1080/2,
};

export const PLAYER = {
	x: 50,
	y: CAMERA["height"] - 20 - 32,
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
