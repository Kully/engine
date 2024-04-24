/* Sprites */

export const SPRITE_LOOKUP = {
	0: {
		sprite: [
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
		],
		name: "invisible",
		hitbox: false,
	},
	3: {
		sprite: [
			1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
		],
		name: "outofbounds",
		hitbox: false,
	},
	4: {
		sprite: [
			3, 3, 1, 3, 3, 3, 2, 3,
			1, 3, 1, 1, 1, 1, 3, 2,
			3, 3, 3, 3, 2, 3, 2, 3,
			3, 3, 3, 1, 3, 2, 3, 3,
			3, 1, 1, 3, 2, 2, 1, 1,
			1, 2, 3, 3, 3, 2, 2, 2,
			2, 3, 3, 3, 3, 3, 2, 2,
			3, 3, 3, 3, 3, 3, 2, 2,
		],
		name: "seaweedTile",
		hitbox: true,
	},
	41: {
		sprite: [
			4, 4, 5, 3, 3, 3, 4, 3,
			4, 3, 3, 3, 3, 3, 3, 3,
			4, 3, 4, 4, 3, 3, 3, 3,
			5, 3, 3, 4, 3, 5, 4, 4,
			3, 3, 3, 3, 3, 4, 4, 3,
			4, 5, 3, 3, 3, 3, 3, 3,
			3, 4, 3, 3, 3, 3, 4, 3,
			5, 3, 3, 3, 4, 4, 4, 4,
		],
		name: "seaweedTile",
		hitbox: true,
	},
	5: {
		sprite: [
			0, 0, 0, 0, 0, 0, 0, 3,
			0, 0, 0, 0, 0, 0, 3, 3,
			0, 0, 0, 0, 0, 3, 3, 3,
			0, 0, 0, 0, 3, 3, 3, 3,
			0, 0, 0, 3, 3, 3, 3, 3,
			0, 0, 3, 3, 3, 3, 3, 3,
			0, 3, 3, 3, 3, 3, 3, 3,
			3, 3, 3, 3, 3, 3, 3, 3,
		],
		name: "seaweedTileMissingTopLeft",
		hitbox: true,
	},
	6: {
		sprite: [
			3, 0, 0, 0, 0, 0, 0, 0,
			3, 3, 0, 0, 0, 0, 0, 0,
			3, 3, 3, 0, 0, 0, 0, 0,
			3, 3, 3, 3, 0, 0, 0, 0,
			3, 3, 3, 3, 3, 0, 0, 0,
			3, 3, 3, 3, 3, 3, 0, 0,
			3, 3, 3, 3, 3, 3, 3, 0,
			3, 3, 3, 3, 3, 3, 3, 3,
		],
		name: "seaweedTileMissingTopRight",
		hitbox: true,
	},
	7: {
		sprite: [
			3, 3, 3, 3, 3, 3, 3, 3,
			3, 3, 3, 3, 3, 3, 3, 3,
			3, 3, 3, 3, 3, 3, 3, 0,
			3, 3, 3, 3, 3, 3, 0, 0,
			3, 3, 3, 3, 3, 0, 0, 0,
			3, 3, 3, 3, 0, 0, 0, 0,
			3, 3, 3, 0, 0, 0, 0, 0,
			3, 3, 0, 0, 0, 0, 0, 0,
		],
		name: "seaweedTileMissingBottomRight",
		hitbox: true,
	},
	8: {
		sprite: [
			0, 0, 0, 6, 6, 0, 0, 0,
			0, 0, 6, 6, 6, 6, 0, 0,
			0, 0, 6, 6, 6, 6, 0, 0,
			0, 0, 6, 6, 6, 6, 0, 0,
			0, 0, 6, 6, 6, 6, 0, 0,
			0, 0, 6, 6, 6, 6, 0, 0,
			0, 0, 6, 6, 6, 6, 0, 0,
			0, 0, 6, 6, 6, 6, 0, 0,
		],
		name: "door",
		hitbox: false,
	},
	9: {
		sprite: [
			3, 3, 3, 3, 3, 3, 3, 3,
			0, 3, 3, 3, 3, 3, 3, 3,
			0, 0, 3, 3, 3, 3, 3, 3,
			0, 0, 0, 3, 3, 3, 3, 3,
			0, 0, 0, 0, 3, 3, 3, 3,
			0, 0, 0, 0, 0, 3, 3, 3,
			0, 0, 0, 0, 0, 0, 3, 3,
			0, 0, 0, 0, 0, 0, 0, 3,
		],
		name: "seaweedTileMissingBottomLeft",
		hitbox: true,
	},
	10: {
		sprite: [
			0, 4, 0, 0, 0, 0, 4, 0,
			4, 0, 0, 0, 0, 0, 0, 4,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 4, 4, 0, 0, 0,
			0, 0, 0, 4, 4, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			4, 0, 0, 0, 0, 0, 0, 4,
			0, 4, 0, 0, 0, 0, 4, 0,
		],
		name: "player",
		hitbox: false,
	},
};

const RANGER_STAND_CYCLE = [80, 2, 15, 2];
const RANGER_JUMP_CYCLE = [12, 7, 10, 7, 7, 5, 90000];
const RANGER_TURN_CYCLE = [1]; // 5
// const RANGER_WALK_FRAMES = [10, 10, 10];
const RANGER_WALK_FRAMES = [6, 7, 8];
const RANGER_WALK_SHOOT_FRAMES = RANGER_WALK_FRAMES;
const RANGER_SHOOT_FRAMES = [4, 4, 4, 4, 12, 15];

const RANGER_SPRITES = {
	STAND_CYCLE: [
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_STAND_CYCLE[0],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_STAND_CYCLE[1],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_STAND_CYCLE[2],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_STAND_CYCLE[3],
			xShift: 0,
			yShift: 0,
		},
	],
	JUMP_CYCLE: [
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_JUMP_CYCLE[0],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_JUMP_CYCLE[1],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_JUMP_CYCLE[2],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,3,3,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_JUMP_CYCLE[3],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,3,3,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_JUMP_CYCLE[4],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,3,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,3,3,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,6,6,6,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_JUMP_CYCLE[5],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,3,3,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,3,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_JUMP_CYCLE[6],
			xShift: 0,
			yShift: 0,
		},
	],
	TURN_CYCLE: [
		{
			sprite: [
			    0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,5,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,5,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,3,1,3,3,0,0,0,0,0,
			    0,0,0,0,0,0,5,3,5,5,5,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_TURN_CYCLE[0],
			xShift: 0,
			yShift: 0,
		},
	],
	WALK_CYCLE: [
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_WALK_FRAMES[0],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_WALK_FRAMES[1],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_WALK_FRAMES[2],
			xShift: 0,
			yShift: 0,
		},
	],
	SHOOT_CYCLE: [
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_SHOOT_FRAMES[0],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,7,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_SHOOT_FRAMES[1],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,8,7,
			    0,0,0,0,0,3,1,1,1,1,1,1,1,8,7,8,
			    0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,7,
			    0,0,0,0,0,0,1,3,6,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_SHOOT_FRAMES[2],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,
			    0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,
			    0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,3,3,5,3,0,0,0,0,0,0,0,
			    0,0,0,0,0,3,3,6,1,1,1,1,1,0,0,0,
			    0,0,0,0,0,3,1,1,1,1,5,1,0,0,0,0,
			    0,0,0,0,0,5,5,1,6,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,1,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_SHOOT_FRAMES[3],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,
			    0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,
			    0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,5,4,0,0,1,1,0,0,0,0,
			    0,0,0,0,0,0,3,5,1,1,1,0,0,0,0,0,
			    0,0,0,0,0,3,3,1,1,1,5,0,0,0,0,0,
			    0,0,0,0,0,5,5,5,3,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,3,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_SHOOT_FRAMES[4],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,3,6,1,1,1,1,1,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,5,5,1,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_SHOOT_FRAMES[5],
			xShift: 0,
			yShift: 0,
		},
	],
	WALK_SHOOT_CYCLE: [
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,5,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,1,1,1,1,7,0,
			    0,0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,
			    0,0,0,0,0,0,0,1,6,3,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_WALK_SHOOT_FRAMES[0],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,
			    0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,5,4,0,0,0,0,0,8,7,
			    0,0,0,0,0,3,1,1,1,1,1,1,1,8,7,8,
			    0,0,0,0,0,5,5,1,1,1,5,1,0,0,0,7,
			    0,0,0,0,0,0,1,3,6,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,3,6,3,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_WALK_SHOOT_FRAMES[1],
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,
			    0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,
			    0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,3,3,5,1,1,1,1,1,0,0,0,
			    0,0,0,0,0,3,1,1,1,1,5,1,0,0,0,0,
			    0,0,0,0,0,5,5,1,3,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,1,6,3,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,3,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: RANGER_WALK_SHOOT_FRAMES[2],
			xShift: 0,
			yShift: 0,
		},
	],
};

const ENEMY2_SPRITES = {
	STAND_CYCLE: [
		{
			sprite: [
			    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,3,2,3,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,
			    0,0,0,1,0,0,0,0,2,0,0,0,0,1,0,0,
			    0,0,0,0,1,1,2,2,2,2,2,1,1,0,0,0,
			    0,0,0,0,0,0,1,2,2,2,1,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,1,2,2,2,1,0,0,0,0,0,
			    0,0,0,0,0,2,0,0,1,0,0,2,0,0,0,0,
			    0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
			    0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,
			    0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,
			],
			width: 16,
			height: 16,
			frameDuration: 80,
			xShift: 0,
			yShift: 0,
		},
	]
};

const NEPTUNE_SPRITES = {
	STAND_CYCLE: [
		{
			sprite: [
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
				0, 0, 4, 5, 4, 6, 6, 4, 6, 4, 6, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 4, 6, 5, 4, 6, 4, 5, 6, 4, 0, 0, 0,
				0, 0, 0, 4, 5, 4, 6, 6, 6, 6, 6, 4, 4, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 5, 5, 5, 5, 4, 0, 0, 0, 0, 0,
				0, 0, 4, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 0, 0, 0,
				0, 0, 4, 6, 6, 4, 5, 5, 5, 5, 5, 4, 6, 4, 0, 0,
				0, 0, 4, 6, 6, 4, 4, 4, 4, 4, 4, 4, 6, 4, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 5, 5, 5, 4, 0, 0, 4, 5, 5, 5, 4, 0, 0,
				0, 0, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 0, 0,
			],
			width: 16,
			height: 16,
			frameDuration: 100,
			xShift: 0,
			yShift: 0,
		},
	],
	SKID_CYCLE: [
		{
			sprite: [
				0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0,
				0, 0, 4, 4, 5, 4, 6, 6, 4, 6, 4, 6, 4, 0, 0, 0,
				0, 4, 6, 4, 5, 4, 6, 5, 4, 6, 4, 5, 6, 4, 0, 0,
				0, 4, 6, 6, 4, 5, 4, 6, 6, 6, 6, 6, 4, 4, 0, 0,
				0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 0, 0, 0, 4, 4, 6, 6, 4, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 6, 6, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 0, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 5, 4, 5, 5, 4, 4, 4, 4, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 4, 4, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 5, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			],
			width: 16,
			height: 16,
			frameDuration: 100,
			xShift: 0,
			yShift: 0,
		},
	],
	JUMP_CYCLE: [
		{
			sprite: [
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
				0, 0, 4, 5, 4, 4, 6, 6, 6, 6, 6, 4, 4, 0, 0, 0,
				0, 0, 4, 4, 4, 6, 6, 4, 6, 4, 6, 4, 0, 0, 0, 0,
				0, 0, 4, 4, 4, 6, 5, 4, 6, 4, 5, 6, 4, 4, 0, 0,
				0, 4, 6, 6, 4, 4, 6, 6, 6, 6, 6, 4, 6, 6, 4, 0,
				0, 4, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 0,
				0, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 4, 4, 4, 0, 0,
				0, 0, 4, 4, 4, 4, 5, 5, 5, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 5, 4, 4, 4, 5, 5, 4, 0, 0,
				0, 0, 0, 4, 5, 4, 4, 4, 4, 4, 5, 5, 5, 4, 0, 0,
				0, 0, 4, 5, 5, 4, 4, 4, 0, 4, 5, 5, 4, 0, 0, 0,
				0, 0, 4, 5, 5, 4, 4, 0, 0, 0, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			],
			width: 16,
			height: 16,
			frameDuration: undefined,
			xShift: 0,
			yShift: 0,
		},
	],
	WALK_CYCLE: [
		{
			sprite: [
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
				0, 0, 4, 5, 4, 6, 6, 4, 6, 4, 6, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 4, 6, 5, 4, 6, 4, 5, 6, 4, 0, 0, 0,
				0, 0, 0, 4, 5, 4, 6, 6, 6, 6, 6, 4, 4, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 6, 6, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 6, 6, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 4, 4, 5, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 5, 5, 5, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 5, 4, 4, 4, 4, 4, 4, 5, 5, 4, 0, 0, 0,
				0, 0, 4, 4, 5, 5, 4, 0, 4, 5, 5, 4, 4, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 0, 0, 0, 0,
			],
			width: 16,
			height: 16,
			frameDuration: 10,
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
				0, 0, 4, 5, 4, 6, 6, 4, 6, 4, 6, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 4, 6, 5, 4, 6, 4, 5, 6, 4, 0, 0, 0,
				0, 0, 0, 4, 5, 4, 6, 6, 6, 6, 6, 4, 4, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 6, 6, 4, 5, 5, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 6, 6, 4, 5, 5, 5, 4, 4, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 5, 5, 5, 4, 4, 4, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 4, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0,
			],
			width: 16,
			height: 16,
			frameDuration: 3,
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
				0, 0, 4, 5, 4, 6, 6, 4, 6, 4, 6, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 4, 6, 5, 4, 6, 4, 5, 6, 4, 0, 0, 0,
				0, 0, 0, 4, 5, 4, 6, 6, 6, 6, 6, 4, 4, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 4, 4, 4, 5, 5, 5, 5, 4, 6, 6, 4, 0, 0,
				0, 0, 4, 6, 6, 4, 5, 5, 5, 5, 5, 4, 6, 4, 0, 0,
				0, 0, 4, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 5, 5, 5, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0,
			],
			width: 16,
			height: 16,
			frameDuration: 10,
			xShift: 0,
			yShift: 0,
		},
		{
			sprite: [
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
				0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
				0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
				0, 0, 4, 5, 4, 6, 6, 4, 6, 4, 6, 4, 0, 0, 0, 0,
				0, 0, 4, 5, 4, 6, 5, 4, 6, 4, 5, 6, 4, 0, 0, 0,
				0, 0, 0, 4, 5, 4, 6, 6, 6, 6, 6, 4, 4, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0,
				0, 0, 4, 4, 4, 4, 5, 5, 5, 5, 4, 6, 4, 0, 0, 0,
				0, 0, 4, 4, 6, 6, 4, 5, 5, 5, 5, 4, 4, 0, 0, 0,
				0, 0, 4, 4, 6, 6, 4, 5, 5, 4, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 5, 4, 0, 0, 0, 0,
				0, 0, 0, 0, 4, 5, 5, 5, 5, 4, 4, 4, 0, 0, 0, 0,
				0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0,
			],
			width: 16,
			height: 16,
			frameDuration: 3,
			xShift: 0,
			yShift: 0,
		},
	],
};


export const SPRITES = {
	"ranger": RANGER_SPRITES,
	"neptune": NEPTUNE_SPRITES,
	"enemy2": ENEMY2_SPRITES,
};

export const PROTAGONIST = "ranger";

