"use strict";

import {
	LEVEL,
	SPRITE_LOOKUP,
	GRID_WIDTH_PX,
	JAMES_STAND_CYCLE,
	JAMES_WALK_CYCLE,
} from "./data.js";

import {
	CAMERA,
	CONTROLLER,
	PLAYER,
} from "./state.js";

import {
	FPS,
	SCREEN_SCALE,
	COLORS,
} from "./constants.js";



function getValueFrom2DArray(array_2d, x, y)
{
	if(x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
		return undefined;
	return array_2d[y][x];
}

let frameInput0 = document.getElementById("frame0");
let frameInput1 = document.getElementById("frame1");
let frameInput2 = document.getElementById("frame2");
let frameInput3 = document.getElementById("frame3");

const animationFrames = [4, 4, 5, 3];
JAMES_WALK_CYCLE[0]["frameDuration"] = animationFrames[0];
JAMES_WALK_CYCLE[1]["frameDuration"] = animationFrames[1];
JAMES_WALK_CYCLE[2]["frameDuration"] = animationFrames[2];
JAMES_WALK_CYCLE[3]["frameDuration"] = animationFrames[3];
frameInput0.value = animationFrames[0];
frameInput1.value = animationFrames[1];
frameInput2.value = animationFrames[2];
frameInput3.value = animationFrames[3];

frameInput0.addEventListener("change", (e) => {
	console.log(parseInt(e.target.value));
	JAMES_WALK_CYCLE[0]["frameDuration"] = parseInt(e.target.value);
})
frameInput1.addEventListener("change", (e) => {
	JAMES_WALK_CYCLE[0]["frameDuration"] = parseInt(e.target.value);
})
frameInput2.addEventListener("change", (e) => {
	JAMES_WALK_CYCLE[0]["frameDuration"] = parseInt(e.target.value);
})
frameInput3.addEventListener("change", (e) => {
	JAMES_WALK_CYCLE[0]["frameDuration"] = parseInt(e.target.value);
})

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


// initialize canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = CAMERA["width"];
canvas.height = CAMERA["height"];


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
		{
			pixel_color = COLORS["undefined"];
		}
		else
		{
			let color_x = Math.floor( (x%32) / (GRID_WIDTH_PX / SPRITE_WIDTH) );
			let color_y = Math.floor( (y%32) / (GRID_WIDTH_PX / SPRITE_WIDTH) );
			let color_idx = color_y * SPRITE_WIDTH + color_x;
			pixel_color = SPRITE_LOOKUP[sprite_ptr][color_idx];
		}

		ctx.fillStyle = pixel_color;
		ctx.fillRect(x, y, 1, 1);
	}
}


function play_game(e)
{
	// update character
	PLAYER["x"] += -2 * CONTROLLER["ArrowLeft"] + 2 * CONTROLLER["ArrowRight"];

	// draw ground
	ctx.fillStyle = COLORS["ground"];
	ctx.fillRect(
		0,
		400 + PLAYER["height"],
		CAMERA["width"],
		CAMERA["width"] - 400 - PLAYER["height"]
	)

	// draw character
	ctx.fillStyle = PLAYER["color"];
	ctx.fillRect(
		PLAYER["x"],
		PLAYER["y"],
		PLAYER["width"],
		PLAYER["height"],
	)
}

function free_camera_mode(e)
{
	// update camera based on controls
	CAMERA["gridXIndex"] -= CONTROLLER["ArrowLeft"]
	CAMERA["gridXIndex"] += CONTROLLER["ArrowRight"];
	CAMERA["gridYIndex"] -= CONTROLLER["ArrowUp"];
	CAMERA["gridYIndex"] += CONTROLLER["ArrowDown"];

	draw_level();
}

function test_controls_mode(e)
{
	let groundHeight = 20;

	ctx.fillStyle = "#CC704B";
	ctx.fillRect(
		0,
		0,
		CAMERA["width"],
		CAMERA["height"],
	);
	
	// draw ground
	ctx.fillStyle = "#614124";
	ctx.fillRect(
		0,
		CAMERA["height"] - groundHeight,
		CAMERA["width"],
		groundHeight,
	)

	// determine player's speed and acceleration
	if(CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
	{
		PLAYER["speed"] -= 0.5;
	}
	else
	if(CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 1)
	{
		PLAYER["speed"] += 0.5;
	}
	else
	{
		if(PLAYER["speed"] < 0)
		{
			PLAYER["speed"] += 0.2;
		}
		else
		if(PLAYER["speed"] > 0)
		{
			PLAYER["speed"] -= 0.2;
		}

		if(Math.abs(PLAYER["speed"]) < 0.2)
		{
			PLAYER["speed"] = 0;
		}
	}

	// throttle the speed
	let maxSpeed = 4;
	if(PLAYER["speed"] > maxSpeed)
		PLAYER["speed"] = maxSpeed;
	if(PLAYER["speed"] < -maxSpeed)
		PLAYER["speed"] = -maxSpeed;

	// move the player horizontally
	PLAYER["x"] += PLAYER["speed"];

	// decide which sprite to draw
	let spriteArray = JAMES_STAND_CYCLE["stand"]
	let spriteWidth = 16;
	let spriteHeight = 32;
	if(CONTROLLER["ArrowRight"] === 1 || CONTROLLER["ArrowLeft"] === 1)
	{
		PLAYER["walkFrameCounter"] += 1;

		// decide if we advance to next sprite in animation
		if(PLAYER["walkFrameCounter"] > JAMES_WALK_CYCLE[PLAYER["walkSpritePointer"]]["frameDuration"])
		{
			PLAYER["walkFrameCounter"] = 0;
			PLAYER["walkSpritePointer"] += 1;
			if(PLAYER["walkSpritePointer"] >= JAMES_WALK_CYCLE.length)
				PLAYER["walkSpritePointer"] = 0;
		}
		spriteArray = JAMES_WALK_CYCLE[PLAYER["walkSpritePointer"]]["sprite"];
		spriteWidth = JAMES_WALK_CYCLE[PLAYER["walkSpritePointer"]]["width"];
		spriteHeight = JAMES_WALK_CYCLE[PLAYER["walkSpritePointer"]]["height"];
	}
	else
	{
		PLAYER["walkFrameCounter"] = 0;
		spriteArray = JAMES_STAND_CYCLE["stand"];
	}

	// draw player to the screen
	let scale = 3;
	for(let i=0; i<spriteWidth; i+=1)
	for(let j=0; j<spriteHeight; j+=1)
	{
		// ctx.fillStyle = spriteArray[(spriteWidth - 1 - i) + j*spriteWidth];
		ctx.fillStyle = spriteArray[i + j*spriteWidth];
		ctx.fillRect(
			PLAYER["x"] + i*scale,
			PLAYER["y"] - (scale-1)*spriteHeight + j*scale,
			scale,
			scale,
		);
	}
}

// setInterval(play_game, 1000 / FPS);
// setInterval(free_camera_mode, 1000 / FPS);
setInterval(test_controls_mode, 1000 / FPS);
