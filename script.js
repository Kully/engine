"use strict";

import {
	LEVEL,
	SPRITE_LOOKUP,
	SPRITE_WIDTH,
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
		CONTROLLER["lastKeyUp"] = "ArrowLeft";
	}
	if(e.key === "ArrowRight")
	{
		CONTROLLER["ArrowRight"] = 0;
		CONTROLLER["lastKeyUp"] = "ArrowRight";
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
	// determine player's speed and acceleration
	let maxSpeed = 5;
	if(CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
	{
		PLAYER["speed"] = -maxSpeed;
	}
	else
	if(CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 1)
	{
		PLAYER["speed"] = maxSpeed;
	}
	else
	{
		PLAYER["speed"] = 0;
	}

	// throttle the speed
	if(PLAYER["speed"] > maxSpeed)
		PLAYER["speed"] = maxSpeed;
	if(PLAYER["speed"] < -maxSpeed)
		PLAYER["speed"] = -maxSpeed;

	// move the player horizontally
	PLAYER["x"] += PLAYER["speed"];
	PLAYER["x"] = Math.round(PLAYER["x"]);

	// decide which sprite to draw
	let spriteArray = JAMES_STAND_CYCLE["stand"]
	let spriteWidth = 16;
	let spriteHeight = 32;
	let xShift = 0;
	let yShift = 0;
	if(Math.abs(PLAYER["speed"]) > 0.05)
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
		yShift = JAMES_WALK_CYCLE[PLAYER["walkSpritePointer"]]["yShift"];
	}
	else
	{
		PLAYER["walkFrameCounter"] = 0;
		spriteArray = JAMES_STAND_CYCLE["stand"];
	}

	// compute boundaries and collisions
	let playerScale = 3;
	if(PLAYER["x"] <= 0)
	{
		PLAYER["x"] = 0;
	}
	if(PLAYER["x"] + spriteWidth * playerScale >= CAMERA["width"])
	{
		PLAYER["x"] = CAMERA["width"] - spriteWidth * playerScale;
	}

	// draw background
	ctx.fillStyle = COLORS["background"];
	ctx.fillRect(
		0,
		0,
		CAMERA["width"],
		CAMERA["height"],
	);

	// draw ground
	let groundHeight = 20;
	ctx.fillStyle = COLORS["ground"];
	ctx.fillRect(
		0,
		CAMERA["height"] - groundHeight,
		CAMERA["width"],
		groundHeight,
	)


	// draw player
	for(let i=0; i<spriteWidth; i+=1)
	for(let j=0; j<spriteHeight; j+=1)
	{
		if(CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
		{
			ctx.fillStyle = spriteArray[(spriteWidth - 1 - i) + j*spriteWidth];
		}
		else
		if(CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 0)
		{
			if(CONTROLLER["lastKeyUp"] !== "ArrowRight")
			{
				ctx.fillStyle = spriteArray[(spriteWidth - 1 - i) + j*spriteWidth];
			}
			else
			{
				ctx.fillStyle = spriteArray[i + j*spriteWidth];
			}
		}
		else
		{
			ctx.fillStyle = spriteArray[i + j*spriteWidth];
		}

		ctx.fillRect(
			PLAYER["x"] + i*playerScale,
			PLAYER["y"] - (playerScale-1)*spriteHeight + j*playerScale + yShift*playerScale,
			playerScale,
			playerScale,
		);
	}
}

// setInterval(free_camera_mode, 1000 / FPS);
setInterval(test_controls_mode, 1000 / FPS);
