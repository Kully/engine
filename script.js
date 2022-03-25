const FPS = 60;
const GRID_WIDTH_PX = 16;
const SCREEN_SCALE = 1;

const COLORS = {
	ground: "#151D3B",
	background: "#E45826",
	undefined: "#FF0000",
}

// state variables
const CONTROLLER = {
	ArrowLeft: 0,
	ArrowRight: 0,
	ArrowUp: 0,
	ArrowDown: 0,
};

const CAMERA = {
	gridXIndex: 0,
	gridYIndex: 4,
	xOffset: 0,
	yOffset: 0,
	width: 320,
	height: 224,
};

const CHARACTER = {
	x: Math.floor(CAMERA["width"] / 2),
	y: 400,
	width: 32,
	height: 64,
	speed: 0,
	color: "#FFFBE9",
};

// level data
const LEVEL = [
	[2, 2, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 1, 0, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const SPRITE_LOOKUP = {
	0: [
		"#fafafa", "#fafafa", "#fafafa", "#fafafa",
		"#fafafa", "#fafafa", "#fafafa", "#fafafa",
		"#fafafa", "#fafafa", "#fafafa", "#fafafa",
		"#fafafa", "#fafafa", "#fafafa", "#fafafa",
	],
	1: [
		"#E45826", "#E45826", "#E45826", "#E45826",
		"#E45826", "#E45826", "#E45826", "#E45826",
		"#E45826", "#E45826", "#E45826", "#E45826",
		"#E45826", "#E45826", "#E45826", "#E45826",
	],
	2: [
		"#00FF00", "#00FF00", "#00FF00", "#00FF00",
		"#00FF00", "#00FF00", "#00FF00", "#00FF00",
		"#00FF00", "#00FF00", "#00FF00", "#00FF00",
		"#00FF00", "#00FF00", "#00FF00", "#00FF00",
	]
};


function getValueFrom2DArray(array_2d, x, y)
{
	if(x < 0 || x >= array_2d.length || y < 0 || y >= array_2d.length)
		return undefined;
	return array_2d[y][x];
}


// initialize canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = CAMERA["width"];
canvas.height = CAMERA["height"];


// event listeners
document.addEventListener("keydown", function(e) {
	if(e.key === "ArrowLeft")
	{
		CONTROLLER["ArrowLeft"]	= 1;
	}
	if(e.key === "ArrowRight")
	{
		CONTROLLER["ArrowRight"] = 1;
	}
	if(e.key === "ArrowUp")
	{
		CONTROLLER["ArrowUp"] = 1;
	}
	if(e.key === "ArrowDown")
	{
		CONTROLLER["ArrowDown"] = 1;
	}
});

document.addEventListener("keyup", function(e) {
	if(e.key === "ArrowLeft")
	{
		CONTROLLER["ArrowLeft"]	= 0;
	}
	if(e.key === "ArrowRight")
	{
		CONTROLLER["ArrowRight"] = 0;
	}
	if(e.key === "ArrowUp")
	{
		CONTROLLER["ArrowUp"] = 0;
	}
	if(e.key === "ArrowDown")
	{
		CONTROLLER["ArrowDown"] = 0;
	}
});


ctx.fillStyle = COLORS["background"];
ctx.fillRect(0, 0, CAMERA["width"], CAMERA["height"]);


function draw_level()
{
	for(let x=0; x<CAMERA["width"]; x+=1)
	for(let y=0; y<CAMERA["height"]; y+=1)
	{
		// deterine which sprite block we are drawing
		let jump_in_x = Math.floor((CAMERA["xOffset"] + x) / GRID_WIDTH_PX);
		let jump_in_y = Math.floor((CAMERA["yOffset"] + y) / GRID_WIDTH_PX);
		let sprite_x = CAMERA["gridXIndex"] + jump_in_x;
		let sprite_y = CAMERA["gridYIndex"] + jump_in_y;
		let sprite_ptr = getValueFrom2DArray(LEVEL, sprite_x, sprite_y);

		// draw pixel
		let pixel_color;
		if(sprite_ptr === undefined || sprite_ptr === null)
			pixel_color = COLORS["undefined"];
		else
			pixel_color = SPRITE_LOOKUP[sprite_ptr][0];

		ctx.fillStyle = pixel_color;
		ctx.fillRect(x, y, 1, 1);
	}	
}


function play_game(e)
{
	// refresh the screen
	ctx.fillStyle = COLORS["background"];
	ctx.fillRect(0, 0, CAMERA["width"], CAMERA["height"]);

	// update character
	CHARACTER["x"] += -2 * CONTROLLER["ArrowLeft"] + 2 * CONTROLLER["ArrowRight"];

	// draw ground
	ctx.fillStyle = COLORS["ground"];
	ctx.fillRect(
		0,
		400 + CHARACTER["height"],
		CAMERA["width"],
		CAMERA["width"] - 400 - CHARACTER["height"]
	)

	// draw character
	ctx.fillStyle = CHARACTER["color"];
	ctx.fillRect(
		CHARACTER["x"],
		CHARACTER["y"],
		CHARACTER["width"],
		CHARACTER["height"],
	)
}

function free_camera_mode(e)
{
	// refresh the screen
	ctx.fillStyle = COLORS["background"];
	ctx.fillRect(0, 0, CAMERA["width"], CAMERA["height"]);

	// update camera based on controls
	CAMERA["gridXIndex"] -= CONTROLLER["ArrowLeft"]
	CAMERA["gridXIndex"] += CONTROLLER["ArrowRight"];
	CAMERA["gridYIndex"] -= CONTROLLER["ArrowUp"];
	CAMERA["gridYIndex"] += CONTROLLER["ArrowDown"];

	draw_level();
}

setInterval(free_camera_mode, 1000 / FPS);

