"use strict";

import {
	LEVEL,
	SPRITE_LOOKUP,
} from "./data.js";

import {
	CAMERA,
	CONTROLLER,
	PLAYER,
} from "./state.js";

import {
	FPS,
	SCREEN_SCALE,
	GRID_WIDTH_PX,
	COLORS,
} from "./constants.js"


function getValueFrom2DArray(array_2d, x, y)
{
	if(x < 0 || x >= array_2d.length || y < 0 || y >= array_2d.length)
		return undefined;
	return array_2d[y][x];
}

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


// setInterval(play_game, 1000 / FPS);
setInterval(free_camera_mode, 1000 / FPS);
