"use strict";

import {
    LEVEL,
    SPRITE_LOOKUP,
    SPRITE_WIDTH,
    GRID_WIDTH_PX,
    JAMES_STAND_CYCLE,
    JAMES_WALK_CYCLE,
    JAMES_RUN_CYCLE,
    JAMES_JUMP_CYCLE,
    BULLET_SPRITE,
} from "./data.js";

import {
    CAMERA,
    CONTROLLER,
    VALID_CONTROLLER_KEYS,
    PLAYER,
    BULLET_MANAGER,
} from "./state.js";

import {
    FPS,
    SCREEN_SCALE,
    COLORS,
    MAX_BULLETS_ON_SCREEN,
} from "./constants.js";


// set animation speeds for animations
JAMES_STAND_CYCLE[0]["frameDuration"] = 40;
JAMES_STAND_CYCLE[1]["frameDuration"] = 5;
JAMES_STAND_CYCLE[2]["frameDuration"] = 5;
JAMES_STAND_CYCLE[3]["frameDuration"] = 5;

JAMES_WALK_CYCLE[0]["frameDuration"] = 4;
JAMES_WALK_CYCLE[1]["frameDuration"] = 4;
JAMES_WALK_CYCLE[2]["frameDuration"] = 4;
JAMES_WALK_CYCLE[3]["frameDuration"] = 4;

JAMES_RUN_CYCLE[0]["frameDuration"] = 6;
JAMES_RUN_CYCLE[1]["frameDuration"] = 6;
JAMES_RUN_CYCLE[2]["frameDuration"] = 8;
JAMES_RUN_CYCLE[3]["frameDuration"] = 6;
JAMES_RUN_CYCLE[4]["frameDuration"] = 7;
JAMES_RUN_CYCLE[5]["frameDuration"] = 6;


function getValueFrom2DArray(array_2d, x, y)
{
    if(x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
        return undefined;
    return array_2d[y][x];
}

document.addEventListener("keydown", function(e) {
    for(let key of VALID_CONTROLLER_KEYS)
    {
        if(e.key === key)       
            CONTROLLER[key] = 1;
    }
});

document.addEventListener("keyup", function(e) {
    for(let key of VALID_CONTROLLER_KEYS)
    {
        if(e.key === key)
        {
            CONTROLLER[key] = 0;
            CONTROLLER["lastKeyUp"] = key;
        }
    }

    if(e.key === "ArrowLeft" || e.key === "ArrowRight")
    {
        CONTROLLER["lastLeftOrRight"] = e.key;
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
    CAMERA["gridXIndex"] -= CONTROLLER["ArrowLeft"];
    CAMERA["gridXIndex"] += CONTROLLER["ArrowRight"];
    CAMERA["gridYIndex"] -= CONTROLLER["ArrowUp"];
    CAMERA["gridYIndex"] += CONTROLLER["ArrowDown"];

    draw_level();
}

function test_controls_mode(e)
{
    // determine player's speed and acceleration
    let maxSpeed = 5;
    let accInc = 0.5;  // acceleration increment
    let decInc = 0.4;  // decceleration increment
    if(CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
    {
        PLAYER["speed"] -= accInc;
    }
    else
    if(CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 1)
    {
        PLAYER["speed"] += accInc;
    }
    else
    {
        if(PLAYER["speed"] > 0.4)
        {
            PLAYER["speed"] -= decInc;
        }
        else
        if(PLAYER["speed"] < -0.4)
        {
            PLAYER["speed"] += decInc;
        }
        else
        {
            PLAYER["speed"] = 0;
        }
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
    let spriteArray = JAMES_STAND_CYCLE[0]["sprite"];
    let spriteWidth = JAMES_STAND_CYCLE[0]["width"];
    let spriteHeight = JAMES_STAND_CYCLE[0]["height"];
    let xShift = JAMES_STAND_CYCLE[0]["xShift"];
    let yShift = JAMES_STAND_CYCLE[0]["yShift"];

    let animationArray;
    if(Math.abs(PLAYER["speed"]) > 0 || CONTROLLER["ArrowLeft"] || CONTROLLER["ArrowRight"])
    {
        // decide whether to walk or run
        if(Math.abs(PLAYER["speed"]) < maxSpeed)
        {
            animationArray = JAMES_WALK_CYCLE;
        }
        else
        {
            animationArray = JAMES_RUN_CYCLE;
        }
    }
    else
    {
        animationArray = JAMES_STAND_CYCLE;
    }

    console.log(PLAYER["walkSpritePointer"]);

    // determine which sprite in cycle to draw
    if(PLAYER["walkSpritePointer"] >= animationArray.length)
    {
        PLAYER["walkSpritePointer"] = 0;
        PLAYER["walkFrameCounter"] = 0;
    }
    PLAYER["walkFrameCounter"] += 1;
    if(PLAYER["walkFrameCounter"] > animationArray[PLAYER["walkSpritePointer"]]["frameDuration"] - 1)
    {
        PLAYER["walkFrameCounter"] = 0;
        PLAYER["walkSpritePointer"] = (PLAYER["walkSpritePointer"] + 1) % animationArray.length;
    }
    spriteArray = animationArray[PLAYER["walkSpritePointer"]]["sprite"];
    spriteWidth = animationArray[PLAYER["walkSpritePointer"]]["width"];
    spriteHeight = animationArray[PLAYER["walkSpritePointer"]]["height"];
    yShift = animationArray[PLAYER["walkSpritePointer"]]["yShift"];

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
    let playerFacingLeft = 0;
    for(let i=0; i<spriteWidth; i+=1)
    for(let j=0; j<spriteHeight; j+=1)
    {
        if(CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
        {
            ctx.fillStyle = spriteArray[(spriteWidth - 1 - i) + j*spriteWidth];
            playerFacingLeft = 1;
        }
        else
        if(CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 0)
        {
            if(CONTROLLER["lastLeftOrRight"] !== "ArrowRight")
            {
                ctx.fillStyle = spriteArray[(spriteWidth - 1 - i) + j*spriteWidth];
                playerFacingLeft = 1;
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


    // add bullet to the screen
    if(CONTROLLER["z"] === 1 && BULLET_MANAGER["instances"].length < 1)
    {
        let velo;
        let bulletX;
        if(playerFacingLeft === 1)
        {
            velo = -7;
            bulletX = PLAYER["x"];
        }
        else
        {
            bulletX = PLAYER["x"] + JAMES_STAND_CYCLE[0]["width"] * playerScale
            velo = 7;
        }

        let bullet_obj = {
            x: bulletX,
            y: PLAYER["y"] - 38,
            velocity: velo,
        };
        BULLET_MANAGER["instances"].push(bullet_obj);
    };
    // remove bullet if out of bounds
    if(
        BULLET_MANAGER["instances"].length > 0 &&
            (BULLET_MANAGER["instances"][0]["x"] > CAMERA["width"] || BULLET_MANAGER["instances"][0]["x"] < 0)
    )
    {
        BULLET_MANAGER["instances"] = [];
    }

    if(BULLET_MANAGER["instances"].length > 0)
    {
        for(let idx=0; idx<BULLET_MANAGER["instances"].length; idx+=1)
        {
            BULLET_MANAGER["instances"][idx]["x"] += BULLET_MANAGER["instances"][idx]["velocity"];
        }

        for(let i=0; i<BULLET_SPRITE["width"]; i+=1)
        for(let j=0; j<BULLET_SPRITE["height"]; j+=1)
        {
            if(BULLET_MANAGER["instances"][0]["velocity"] < 0)
            {
                ctx.fillStyle = BULLET_SPRITE["sprite"][(BULLET_SPRITE["width"] - 1 - i) + j*BULLET_SPRITE["width"]];
            }
            else
            {
                ctx.fillStyle = BULLET_SPRITE["sprite"][i + j*BULLET_SPRITE["width"]];
            }
            ctx.fillRect(
                BULLET_MANAGER["instances"][0]["x"]+ i*playerScale,
                BULLET_MANAGER["instances"][0]["y"]+ j*playerScale,
                playerScale,
                playerScale,
            );
        }
    }
}

// setInterval(free_camera_mode, 1000 / FPS);
setInterval(test_controls_mode, 1000 / FPS);
