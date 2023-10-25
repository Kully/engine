/* Data Module */

// export const SCALE = 4;
// export const SCALE2 = 2;
// export const SPRITE_WIDTH = 8;
// export const GRID_WIDTH_PX = SCALE * SCALE2 * SPRITE_WIDTH;

const TEST_LEVEL = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,0,8,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,0,4,4,0,8,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,4,4,0,8,4,4,0,0,0,0,0,0,0,0,4,0],
	[0,0,0,0,0,0,4,4,0,0,4,4,8,0,8,0,8,0,0,0,4,0],
	[0,0,0,0,0,0,4,4,4,0,0,0,0,8,0,0,0,8,0,4,4,0],
	[0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,4,4,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

export const LARGE_LEVEL = [
	[4,4,4,7,0,0,0,0,0,0,0,0,4,0,4,0,4,4,4,7,0,4,0,4,4,4,4,4,7,0,4,0,4,0,4,4,7,0,0,0,0,0,0,0],
	[4,7,0,0,0,0,0,0,0,0,0,0,4,0,7,0,4,4,4,4,0,4,0,7,4,4,4,4,4,0,4,0,7,0,4,4,4,0,0,0,0,0,0,0],
	[4,0,0,0,8,0,0,4,4,0,0,0,0,4,0,0,0,0,4,4,0,0,4,0,0,0,4,4,4,0,0,4,0,0,0,4,4,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,0,4,4,4,4,4,4,4,4,4,4,0,0,4,4,4,4,4,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
	[4,4,7,0,0,0,0,0,0,0,0,0,4,0,0,0,0,4,0,0,0,4,0,4,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,7,0,0,0,0,0,4,0,4,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,4,4,0,4,0,0,0,0,0,0,0,0,0,0,0],
	[4,0,0,0,0,0,0,4,4,4,0,4,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,4,0,0,0,0,0,0,0,0,0,0],
	[4,8,0,0,0,4,8,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,4,7,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,7,0,0,0,0,0,4,0,0,0,4,0,4,0,4,4,4,4,0,4,0,4,0,4,4,0,0,0,4,0,4,0,4,4,4,0,4,4,0,4,4,0],
	[4,0,4,0,4,7,0,0,4,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,4,4,4,4,4,7,0,0,0,0,0,0,0,4,7,0,0,0,0,0,0,0,4,7,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,0,0,0,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,0,4,4,4,4,4,4,0,0,4,4,4,4,4,4,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
];


export const LEVEL = [
	[4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4],
	[4,4,4,4,4,4,4,4,7,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,7,4,0,4,4,4,4,0,4,4,4],
	[4,4,4,4,4,4,4,0,4,7,4,4,0,0,0,8,0,0,0,0,0,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,7,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4,7,0,0,0,0,0,0,0,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,0,0,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,0,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,0,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4],
];


export const COLOR_ARRAY = [
	"#00000000",
	"#004058",
	"#b8f8d8",
	"#01a844",
	"#015800",
	"#231955",
	"#de7c70",
	"#400426",
	"#000000",
	"#b8f9d8",
	"#b9f819",
	"#00a844",
	"#b8f819",
	"#01a944",
	"#015900",
	"#015801",
	"#01a945",
	"#f1c7c2",
];


export const DARK_PALETTE = [
	"#00000000",
	"#002137",  // background
	"#0b525b",
	"#065a60",
	"#002137",
	"#231955",
	"#065a60",  // player outfit
	"#020202",  // near black
	"#001523",
	"#272640",
	"#065a60",
	"#0b525b",
	"#797d62",
	"#272640",
	"#272640",
	"#8198A9",
	"#272640",
	"#f1dca7",  // player skin
]

export const SPRITE_LOOKUP = {
	0: {
		sprite: [
			  1,  1,  1,  1,  1,  1,  1,  1,
			  1,  1,  1,  1,  1,  1,  1,  1,
			  1,  1,  1,  1,  1,  1,  1,  1,
			  1,  1,  1,  1,  1,  1,  1,  1,
			  1,  1,  1,  1,  1,  1,  1,  1,
			  1,  1,  1,  1,  1,  1,  1,  1,
			  1,  1,  1,  1,  1,  1,  1,  1,
			  1,  1,  1,  1,  1,  1,  1,  1,
		],
		name: "bkgdTile",
		hitbox: false,
	},
	1: {
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
			  2,  2,  2,  2, 10, 10, 10, 13,
			  9, 10, 15,  3, 11,  3, 11,  4,
			 12,  3,  3,  3, 13,  2, 10,  8,
			 10,  3,  3,  2,  2,  8,  8,  8,
			  3,  3, 12,  4,  8, 11,  3,  8,
			 10,  3, 11, 11,  3,  3,  3, 14,
			 10, 10,  3,  4,  3, 16,  4,  8,
			  3,  4,  8,  8,  8,  8,  8,  4,
		],
		name: "seaweedTile",
		hitbox: true,
	},
	5: {
		sprite: [
			  1,  1,  1,  1,  1,  1,  1, 13,
			  1,  1,  1,  1,  1,  1, 11,  4,
			  1,  1,  1,  1,  1,  2, 10,  8,
			  1,  1,  1,  1,  2,  8,  8,  8,
			  1,  1,  1,  4,  8, 11,  3,  8,
			  1,  1, 11, 11,  3,  3,  3, 14,
			  1, 10,  3,  4,  3, 16,  4,  8,
			  3,  4,  8,  8,  8,  8,  8,  4,
		],
		name: "seaweedTileMissingTopLeft",
		hitbox: false,
	},
	7: {
		sprite: [
			  2,  2,  2,  2, 10, 10, 10,  4,
			  9, 10, 15,  3, 11,  3, 11,  1,
			 12,  3,  3,  3, 13,  2,  1,  1,
			 10,  3,  3,  2,  2,  1,  1,  1,
			  3,  3, 12,  4,  1,  1,  1,  1,
			 10,  3, 11,  1,  1,  1,  1,  1,
			 10, 10,  1,  1,  1,  1,  1,  1,
			  8,  1,  1,  1,  1,  1,  1,  1,
		],
		name: "seaweedTileMissingBottomRight",
		hitbox: true,
	},
	8: {
		sprite: [
			  1,  1,  1,  8,  8,  1,  1,  1,
			  1,  1,  8,  8,  8,  8,  1,  1,
			  1,  1,  8,  8,  8,  8,  1,  1,
			  1,  1,  8,  8,  8,  8,  1,  1,
			  1,  1,  8,  8,  8,  8,  1,  1,
			  1,  1,  8,  8,  8,  8,  1,  1,
			  1,  1,  8,  8,  8,  8,  1,  1,
			  1,  1,  8,  8,  8,  8,  1,  1,
		],
		name: "door",
		hitbox: false,
	},
};

export const STAND_CYCLE = [
	{
		sprite: [
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,
			  0,  0,  7,  6,  7, 17, 17,  7, 17,  7, 17,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  7, 17,  6,  7, 17,  7,  6, 17,  7,  0,  0,  0,
			  0,  0,  0,  7,  6,  7, 17, 17, 17, 17, 17,  7,  7,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  6,  6,  6,  6,  7,  0,  0,  0,  0,  0,
			  0,  0,  7,  7,  7,  6,  6,  6,  6,  6,  6,  7,  7,  0,  0,  0,
			  0,  0,  7, 17, 17,  7,  6,  6,  6,  6,  6,  7, 17,  7,  0,  0,
			  0,  0,  7, 17, 17,  7,  7,  7,  7,  7,  7,  7, 17,  7,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  7,  0,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  6,  6,  6,  7,  0,  0,  7,  6,  6,  6,  7,  0,  0,
			  0,  0,  7,  7,  7,  7,  7,  0,  0,  7,  7,  7,  7,  7,  0,  0,
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
			  0,  0,  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,
			  0,  0,  7,  7,  6,  7, 17, 17,  7, 17,  7, 17,  7,  0,  0,  0,
			  0,  7, 17,  7,  6,  7, 17,  6,  7, 17,  7,  6, 17,  7,  0,  0,
			  0,  7, 17, 17,  7,  6,  7, 17, 17, 17, 17, 17,  7,  7,  0,  0,
			  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  0,  0,  0,  7,  7, 17, 17,  7,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  7, 17, 17,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  0,  7,  7,  6,  6,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  6,  7,  6,  6,  7,  7,  7,  7,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  7,  7,  6,  6,  7,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  6,  7,  7,  7,  0,  0,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
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
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  6,  6,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  6,  6,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,
			  0,  0,  7,  6,  7,  7, 17, 17, 17, 17, 17,  7,  7,  0,  0,  0,
			  0,  0,  7,  7,  7, 17, 17,  7, 17,  7, 17,  7,  0,  0,  0,  0,
			  0,  0,  7,  7,  7, 17,  6,  7, 17,  7,  6, 17,  7,  7,  0,  0,
			  0,  7, 17, 17,  7,  7, 17, 17, 17, 17, 17,  7, 17, 17,  7,  0,
			  0,  7, 17, 17,  7,  7,  7,  7,  7,  7,  7,  7, 17, 17,  7,  0,
			  0,  7,  7,  7,  7,  7,  6,  6,  6,  6,  6,  7,  7,  7,  0,  0,
			  0,  0,  7,  7,  7,  7,  6,  6,  6,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  7,  6,  7,  7,  7,  6,  6,  7,  0,  0,
			  0,  0,  0,  7,  6,  7,  7,  7,  7,  7,  6,  6,  6,  7,  0,  0,
			  0,  0,  7,  6,  6,  7,  7,  7,  0,  7,  6,  6,  7,  0,  0,  0,
			  0,  0,  7,  6,  6,  7,  7,  0,  0,  0,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  7,  7,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
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
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,
			  0,  0,  7,  6,  7, 17, 17,  7, 17,  7, 17,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  7, 17,  6,  7, 17,  7,  6, 17,  7,  0,  0,  0,
			  0,  0,  0,  7,  6,  7, 17, 17, 17, 17, 17,  7,  7,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7, 17, 17,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7, 17, 17,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  7,  7,  6,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  6,  6,  6,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  6,  7,  7,  7,  7,  7,  7,  6,  6,  7,  0,  0,  0,
			  0,  0,  7,  7,  6,  6,  7,  0,  7,  6,  6,  7,  7,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  0,  0,  7,  7,  7,  0,  0,  0,  0,
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
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,
			  0,  0,  7,  6,  7, 17, 17,  7, 17,  7, 17,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  7, 17,  6,  7, 17,  7,  6, 17,  7,  0,  0,  0,
			  0,  0,  0,  7,  6,  7, 17, 17, 17, 17, 17,  7,  7,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  7, 17, 17,  7,  6,  6,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  7,  7, 17, 17,  7,  6,  6,  6,  7,  7,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  7,  6,  6,  6,  7,  7,  7,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  7,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  0,  0,  7,  7,  7,  7,  7,  0,  0,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: WALK_CYCLE_FRAMES_SLOW[1],
		xShift: 0,
		yShift: 0,
	},
	{
		sprite: [
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,
			  0,  0,  7,  6,  7, 17, 17,  7, 17,  7, 17,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  7, 17,  6,  7, 17,  7,  6, 17,  7,  0,  0,  0,
			  0,  0,  0,  7,  6,  7, 17, 17, 17, 17, 17,  7,  7,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  7,  7,  7,  6,  6,  6,  6,  7, 17, 17,  7,  0,  0,
			  0,  0,  7, 17, 17,  7,  6,  6,  6,  6,  6,  7, 17,  7,  0,  0,
			  0,  0,  7, 17, 17,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  6,  6,  6,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  6,  6,  6,  7,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,  0,
			  0,  0,  0,  0,  0,  7,  7,  7,  7,  0,  0,  0,  0,  0,  0,  0,
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
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,
			  0,  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  6,  6,  6,  6,  6,  6,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  6,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,
			  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,
			  0,  0,  7,  6,  7, 17, 17,  7, 17,  7, 17,  7,  0,  0,  0,  0,
			  0,  0,  7,  6,  7, 17,  6,  7, 17,  7,  6, 17,  7,  0,  0,  0,
			  0,  0,  0,  7,  6,  7, 17, 17, 17, 17, 17,  7,  7,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,
			  0,  0,  7,  7,  7,  7,  6,  6,  6,  6,  7, 17,  7,  0,  0,  0,
			  0,  0,  7,  7, 17, 17,  7,  6,  6,  6,  6,  7,  7,  0,  0,  0,
			  0,  0,  7,  7, 17, 17,  7,  6,  6,  7,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  7,  7,  7,  7,  7,  7,  7,  6,  7,  0,  0,  0,  0,
			  0,  0,  0,  0,  7,  6,  6,  6,  6,  7,  7,  7,  0,  0,  0,  0,
			  0,  0,  0,  0,  7,  7,  7,  7,  7,  7,  0,  0,  0,  0,  0,  0,
		],
		width: 16,
		height: 16,
		frameDuration: WALK_CYCLE_FRAMES_SLOW[3],
		xShift: 0,
		yShift: 0,
	},
];
