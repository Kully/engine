/* State Module */

export const CONTROLLER = {
	ArrowLeft: 0,
	ArrowRight: 0,
	ArrowUp: 0,
	ArrowDown: 0,
};

export const CAMERA = {
	gridXIndex: 0,
	gridYIndex: 4,
	xOffset: 0,
	yOffset: 0,
	width: 320,
	height: 224,
};

export const PLAYER = {
	x: Math.floor(CAMERA["width"] / 2),
	y: 400,
	width: 32,
	height: 64,
	speed: 0,
	color: "#FFFBE9",
};
