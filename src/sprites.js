/* Sprites */

export const SPRITE_LOOKUP = {
	0: {
		sprite: [
			  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  0,
		],
		name: "invisible",
		hitbox: false,
	},
	4: {
		sprite: [
			  3,  3,  3,  3, 3, 3, 3, 3,
			  3, 3, 3,  3, 3,  3, 3,  3,
			 3,  3,  3,  3, 3,  3, 3,  3,
			 3,  3,  3,  3,  3,  3,  3,  3,
			  3,  3, 3,  3,  3, 3,  3,  3,
			 3,  3, 3, 3,  3,  3,  3, 3,
			 3, 3,  3,  3,  3, 3,  3,  3,
			  3,  3,  3,  3,  3,  3,  3,  3,
		],
		name: "seaweedTile",
		hitbox: true,
	},
	5: {
		sprite: [
			  0,  0,  0,  0,  0,  0,  0, 3,
			  0,  0,  0,  0,  0,  0, 3,  3,
			  0,  0,  0,  0,  0,  3, 3,  3,
			  0,  0,  0,  0,  3,  3,  3,  3,
			  0,  0,  0,  3,  3, 3,  3,  3,
			  0,  0, 3, 3,  3,  3,  3, 3,
			  0, 3,  3,  3,  3, 3,  3,  3,
			  3,  3,  3,  3,  3,  3,  3,  3,
		],
		name: "seaweedTileMissingTopLeft",
		hitbox: true,
	},
	6: {
		sprite: [
			  3,  0,  0,  0,  0,  0,  0,  0,
			  3, 3,  0,  0,  0,  0,  0,  0,
			 3,  3,  3,  0,  0,  0,  0,  0,
			 3,  3,  3,  3,  0,  0,  0,  0,
			  3,  3, 3,  3,  3,  0,  0,  0,
			 3,  3, 3, 3,  3,  3,  0,  0,
			 3, 3,  3,  3,  3, 3,  3,  0,
			  3,  3,  3,  3,  3,  3,  3,  3,
		],
		name: "seaweedTileMissingTopRight",
		hitbox: true,
	},
	7: {
		sprite: [
			  3,  3,  3,  3, 3, 3, 3,  3,
			  3, 3, 3,  3, 3,  3, 3,  3,
			 3,  3,  3,  3, 3,  3,  3,  0,
			 3,  3,  3,  3,  3,  3,  0,  0,
			  3,  3, 3,  3,  3,  0,  0,  0,
			 3,  3, 3,  3,  0,  0,  0,  0,
			 3, 3,  3,  0,  0,  0,  0,  0,
			  3,  3,  0,  0,  0,  0,  0,  0,
		],
		name: "seaweedTileMissingBottomRight",
		hitbox: true,
	},
	9: {
		sprite: [
			  3,  3,  3,  3, 3, 3, 3, 3,
			  0, 3, 3,  3, 3,  3, 3,  3,
			  0,  0,  3,  3, 3,  3, 3,  3,
			  0,  0,  0,  3,  3,  3,  3,  3,
			  0,  0,  0,  0,  3, 3,  3,  3,
			  0,  0,  0,  0,  0,  3,  3, 3,
			  0,  0,  0,  0,  0,  0,  3,  3,
			  0,  0,  0,  0,  0,  0,  0,  3,
		],
		name: "seaweedTileMissingBottomLeft",
		hitbox: true,
	},
	8: {
		sprite: [
			  0,  0,  0,  1,  1,  0,  0,  0,
			  0,  0,  1,  1,  1,  1,  0,  0,
			  0,  0,  1,  1,  1,  1,  0,  0,
			  0,  0,  1,  1,  1,  1,  0,  0,
			  0,  0,  1,  1,  1,  1,  0,  0,
			  0,  0,  1,  1,  1,  1,  0,  0,
			  0,  0,  1,  1,  1,  1,  0,  0,
			  0,  0,  1,  1,  1,  1,  0,  0,
		],
		name: "door",
		hitbox: false,
	},
};

export const STAND_CYCLE = [
	{
		sprite: [
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,
			  0,  0,  4,  5,  4, 6, 6,  4, 6,  4, 6,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  4, 6,  5,  4, 6,  4,  5, 6,  4,  0,  0,  0,
			  0,  0,  0,  4,  5,  4, 6, 6, 6, 6, 6,  4,  4,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  5,  5,  5,  5,  4,  0,  0,  0,  0,  0,
			  0,  0,  4,  4,  4,  5,  5,  5,  5,  5,  5,  4,  4,  0,  0,  0,
			  0,  0,  4, 6, 6,  4,  5,  5,  5,  5,  5,  4, 6,  4,  0,  0,
			  0,  0,  4, 6, 6,  4,  4,  4,  4,  4,  4,  4, 6,  4,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  4,  0,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  5,  5,  5,  4,  0,  0,  4,  5,  5,  5,  4,  0,  0,
			  0,  0,  4,  4,  4,  4,  4,  0,  0,  4,  4,  4,  4,  4,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: 100,
		xShift: 0,
		yShift: 0,
	},
];


export const SKID_CYCLE = [
	{
		sprite: [
			  0,  0,  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,
			  0,  0,  4,  4,  5,  4, 6, 6,  4, 6,  4, 6,  4,  0,  0,  0,
			  0,  4, 6,  4,  5,  4, 6,  5,  4, 6,  4,  5, 6,  4,  0,  0,
			  0,  4, 6, 6,  4,  5,  4, 6, 6, 6, 6, 6,  4,  4,  0,  0,
			  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  0,  0,  0,  4,  4, 6, 6,  4,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4, 6, 6,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  0,  4,  4,  5,  5,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  5,  4,  5,  5,  4,  4,  4,  4,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  4,  4,  5,  5,  4,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  5,  4,  4,  4,  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: 100,
		xShift: 0,
		yShift: 0,
	},
];



export const JUMP_CYCLE = [
	{
		sprite: [
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  5,  5,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  5,  5,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,
			  0,  0,  4,  5,  4,  4, 6, 6, 6, 6, 6,  4,  4,  0,  0,  0,
			  0,  0,  4,  4,  4, 6, 6,  4, 6,  4, 6,  4,  0,  0,  0,  0,
			  0,  0,  4,  4,  4, 6,  5,  4, 6,  4,  5, 6,  4,  4,  0,  0,
			  0,  4, 6, 6,  4,  4, 6, 6, 6, 6, 6,  4, 6, 6,  4,  0,
			  0,  4, 6, 6,  4,  4,  4,  4,  4,  4,  4,  4, 6, 6,  4,  0,
			  0,  4,  4,  4,  4,  4,  5,  5,  5,  5,  5,  4,  4,  4,  0,  0,
			  0,  0,  4,  4,  4,  4,  5,  5,  5,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  5,  4,  4,  4,  5,  5,  4,  0,  0,
			  0,  0,  0,  4,  5,  4,  4,  4,  4,  4,  5,  5,  5,  4,  0,  0,
			  0,  0,  4,  5,  5,  4,  4,  4,  0,  4,  5,  5,  4,  0,  0,  0,
			  0,  0,  4,  5,  5,  4,  4,  0,  0,  0,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  4,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: undefined,
		xShift: 0,
		yShift: 0,
	}
];

export const WALK_CYCLE_FRAMES_SLOW = [10, 3, 10, 3];
export const WALK_CYCLE_FRAMES_FAST = [5, 2, 5, 2];
export const WALK_CYCLE = [
	{
		sprite: [
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,
			  0,  0,  4,  5,  4, 6, 6,  4, 6,  4, 6,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  4, 6,  5,  4, 6,  4,  5, 6,  4,  0,  0,  0,
			  0,  0,  0,  4,  5,  4, 6, 6, 6, 6, 6,  4,  4,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4, 6, 6,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4, 6, 6,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  4,  4,  5,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  5,  5,  5,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  5,  4,  4,  4,  4,  4,  4,  5,  5,  4,  0,  0,  0,
			  0,  0,  4,  4,  5,  5,  4,  0,  4,  5,  5,  4,  4,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  0,  0,  4,  4,  4,  0,  0,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: WALK_CYCLE_FRAMES_SLOW[0],
		xShift: 0,
		yShift: 0,
	},
	{
		sprite: [
			  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,
			  0,  0,  4,  5,  4, 6, 6,  4, 6,  4, 6,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  4, 6,  5,  4, 6,  4,  5, 6,  4,  0,  0,  0,
			  0,  0,  0,  4,  5,  4, 6, 6, 6, 6, 6,  4,  4,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  4, 6, 6,  4,  5,  5,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  4,  4, 6, 6,  4,  5,  5,  5,  4,  4,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  5,  5,  5,  4,  4,  4,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  4,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  4,  4,  4,  4,  4,  0,  0,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: WALK_CYCLE_FRAMES_SLOW[1],
		xShift: 0,
		yShift: 0,
	},
	{
		sprite: [
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,
			  0,  0,  4,  5,  4, 6, 6,  4, 6,  4, 6,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  4, 6,  5,  4, 6,  4,  5, 6,  4,  0,  0,  0,
			  0,  0,  0,  4,  5,  4, 6, 6, 6, 6, 6,  4,  4,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  4,  4,  4,  5,  5,  5,  5,  4, 6, 6,  4,  0,  0,
			  0,  0,  4, 6, 6,  4,  5,  5,  5,  5,  5,  4, 6,  4,  0,  0,
			  0,  0,  4, 6, 6,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  5,  5,  5,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  5,  5,  5,  4,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  4,  4,  4,  4,  0,  0,  0,  0,  0,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: WALK_CYCLE_FRAMES_SLOW[2],
		xShift: 0,
		yShift: 0,
	},
	{
		sprite: [
			  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,
			  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  5,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,
			  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,
			  0,  0,  4,  5,  4, 6, 6,  4, 6,  4, 6,  4,  0,  0,  0,  0,
			  0,  0,  4,  5,  4, 6,  5,  4, 6,  4,  5, 6,  4,  0,  0,  0,
			  0,  0,  0,  4,  5,  4, 6, 6, 6, 6, 6,  4,  4,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,
			  0,  0,  4,  4,  4,  4,  5,  5,  5,  5,  4, 6,  4,  0,  0,  0,
			  0,  0,  4,  4, 6, 6,  4,  5,  5,  5,  5,  4,  4,  0,  0,  0,
			  0,  0,  4,  4, 6, 6,  4,  5,  5,  4,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  5,  4,  0,  0,  0,  0,
			  0,  0,  0,  0,  4,  5,  5,  5,  5,  4,  4,  4,  0,  0,  0,  0,
			  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: WALK_CYCLE_FRAMES_SLOW[3],
		xShift: 0,
		yShift: 0,
	},
];
