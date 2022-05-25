/* State Module */

export const CONTROLLER = {
	ArrowLeft: 0,
	ArrowRight: 0,
	ArrowUp: 0,
	ArrowDown: 0,
	lastKeyUp: "ArrowRight",
};

// screen dimensions for genesis game are 320 x 224
export const CAMERA = {
	gridXIndex: 0,
	gridYIndex: 2,
	xOffset: 0,
	yOffset: 0,
	width: 600,
	height: 224,
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
