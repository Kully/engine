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
const ctx = canvas.getContext("2d", {alpha: false});
canvas.width = CAMERA["width"]/2;
canvas.height = CAMERA["height"]/2;

// determine initial camera frame
let gridXIndex = 0;
let gridYIndex = 2;
let xOffset = 0;
let yOffset = 0;

// params for player speed
// const maxSpeed = 5;
// const accInc = 0.5;
// const decInc = 0.4;
const maxSpeed = 2;
const accInc = 0.25;
const decInc = 0.25;

function draw_level()
{
    for(let x=0; x<CAMERA["width"]/2; x+=1)
    for(let y=0; y<CAMERA["height"]/2; y+=1)
    {
        // deterine which sprite block we are drawing
        let jump_in_x = Math.floor((xOffset + x) / GRID_WIDTH_PX);
        let jump_in_y = Math.floor((yOffset + y) / GRID_WIDTH_PX);
        let sprite_x = gridXIndex + jump_in_x;
        let sprite_y = gridYIndex + jump_in_y;
        let sprite_ptr = getValueFrom2DArray(LEVEL, sprite_x, sprite_y);

        // draw pixel
        let pixel_color;
        if(sprite_ptr === undefined || sprite_ptr === null)
        {
            pixel_color = COLORS["undefined"];
        }
        else
        {
            let color_x = Math.floor( ((x+xOffset)%GRID_WIDTH_PX) / (GRID_WIDTH_PX / SPRITE_WIDTH) );
            let color_y = Math.floor( ((y+yOffset)%GRID_WIDTH_PX) / (GRID_WIDTH_PX / SPRITE_WIDTH) );
            let color_idx = color_y * SPRITE_WIDTH + color_x;

            pixel_color = SPRITE_LOOKUP[sprite_ptr][color_idx];
        }
        ctx.fillStyle = pixel_color;
        ctx.fillRect(x, y, 1, 1);
    }
}


function updatePlayerSpeed()
{
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
}


function translatePlayer()
{
    // move the player horizontally
    PLAYER["x"] += PLAYER["speed"];
    PLAYER["x"] = Math.round(PLAYER["x"]);
}

function drawPlayer(spriteArray, spriteWidth, spriteHeight, yShift)
{
    let playerFacingLeft = 0;
    let playerScale = 2;
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
            PLAYER["y"] - spriteHeight*playerScale + (j + yShift)*playerScale,
            playerScale,
            playerScale,
        );
    }
}

function updateSpritePointers(animationArray)
{
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
}

function findAnimationCycle()
{
    let animationArray;
    if(Math.abs(PLAYER["speed"]) > 0 || CONTROLLER["ArrowLeft"] || CONTROLLER["ArrowRight"])
    {
        if(Math.abs(PLAYER["speed"]) < maxSpeed)
            animationArray = JAMES_WALK_CYCLE;
        else
            animationArray = JAMES_RUN_CYCLE;
    }
    else
    {
        animationArray = JAMES_STAND_CYCLE;
    }
    
    return animationArray;
}


function gameLoop(e)
{
    updatePlayerSpeed();
    translatePlayer();

    // handle boundaries
    let leftBoundary = 6*GRID_WIDTH_PX;
    let rightBoundary = 12*GRID_WIDTH_PX;
    if(PLAYER["x"] <= leftBoundary)
    {
        PLAYER["x"] = leftBoundary;
    }
    if(PLAYER["x"]+PLAYER["width"] >= rightBoundary)
    {
        PLAYER["x"] = rightBoundary - PLAYER["width"];
    }

    let animationArray = findAnimationCycle();
    updateSpritePointers(animationArray);

    let spriteArray = animationArray[PLAYER["walkSpritePointer"]]["sprite"];
    let spriteWidth = animationArray[PLAYER["walkSpritePointer"]]["width"];
    let spriteHeight = animationArray[PLAYER["walkSpritePointer"]]["height"];
    let yShift = animationArray[PLAYER["walkSpritePointer"]]["yShift"];


    ctx.fillStyle = SPRITE_LOOKUP[0][0];
    ctx.fillRect(leftBoundary, 4*GRID_WIDTH_PX, rightBoundary-leftBoundary , 2*GRID_WIDTH_PX);
    drawPlayer(
        spriteArray,
        spriteWidth,
        spriteHeight,
        yShift,
    );

    // let dist = 32;
    // if(CONTROLLER["ArrowLeft"] === 1)
    //     xOffset -= 1 * dist;
    // if(CONTROLLER["ArrowRight"] === 1)
    //     xOffset += 1 * dist;
    // if(CONTROLLER["ArrowUp"] === 1)
    //     yOffset -= 1 * dist;
    // if(CONTROLLER["ArrowDown"] === 1)
    //     yOffset += 1 * dist;

    // ctx.fillStyle = "orange";
    // ctx.fillRect(PLAYER["x"], PLAYER["y"], PLAYER["width"], PLAYER["height"]);
}


draw_level();
setInterval(gameLoop, 1000 / FPS);
