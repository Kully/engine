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


// set animation speeds
JAMES_STAND_CYCLE[0]["frameDuration"] = 20;
JAMES_STAND_CYCLE[1]["frameDuration"] = 5;
JAMES_STAND_CYCLE[2]["frameDuration"] = 5;
JAMES_STAND_CYCLE[3]["frameDuration"] = 5;

JAMES_WALK_CYCLE[0]["frameDuration"] = 5;
JAMES_WALK_CYCLE[1]["frameDuration"] = 5;
JAMES_WALK_CYCLE[2]["frameDuration"] = 7;
JAMES_WALK_CYCLE[3]["frameDuration"] = 7;

JAMES_RUN_CYCLE[0]["frameDuration"] = 6;
JAMES_RUN_CYCLE[1]["frameDuration"] = 6;
JAMES_RUN_CYCLE[2]["frameDuration"] = 6;
JAMES_RUN_CYCLE[3]["frameDuration"] = 6;
JAMES_RUN_CYCLE[4]["frameDuration"] = 6;
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


// init canvas for background layer
const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d", {alpha: false});
canvas.width = CAMERA["width"]/2;
canvas.height = CAMERA["height"]/2;

// init canvas for middleground layer
const canvas2 = document.getElementById("canvas-mg");
const ctx2 = canvas2.getContext("2d");
canvas2.width = canvas.width;
canvas2.height = canvas.height;

// determine initial camera frame
let gridXIndex = 0;
let gridYIndex = 2;
let xOffset = 0;
let yOffset = 0;

// player parameters
const playerScale = 4;
const maxSpeed = 2;
const accInc = 2;
const decInc = 2;

function draw_level()
{
    for(let x=0; x<canvas.width; x+=1)
    for(let y=0; y<canvas.height; y+=1)
    {
        // deterine which sprite block we are drawing
        let jump_in_x = Math.floor((xOffset + x) / GRID_WIDTH_PX);
        let jump_in_y = Math.floor((yOffset + y) / GRID_WIDTH_PX);
        let sprite_x = gridXIndex + jump_in_x;
        let sprite_y = gridYIndex + jump_in_y;
        let sprite_ptr = getValueFrom2DArray(LEVEL, sprite_x, sprite_y);

        // draw pixel
        let pixelColor;
        if(sprite_ptr === undefined || sprite_ptr === null)
        {
            pixelColor = COLORS["undefined"];
        }
        else
        {
            let color_x = Math.floor( ((x+xOffset)%GRID_WIDTH_PX) / (GRID_WIDTH_PX / SPRITE_WIDTH) );
            let color_y = Math.floor( ((y+yOffset)%GRID_WIDTH_PX) / (GRID_WIDTH_PX / SPRITE_WIDTH) );
            let color_idx = color_y * SPRITE_WIDTH + color_x;

            pixelColor = SPRITE_LOOKUP[sprite_ptr][color_idx];
        }
        ctx.fillStyle = pixelColor;
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
    for(let i=0; i<spriteWidth; i+=1)
    for(let j=0; j<spriteHeight; j+=1)
    {
        let pixelColor;
        if(CONTROLLER["ArrowLeft"] === 1 && CONTROLLER["ArrowRight"] === 0)
        {
            pixelColor = spriteArray[(spriteWidth - 1 - i) + j*spriteWidth]
            playerFacingLeft = 1;
        }
        else
        if(CONTROLLER["ArrowLeft"] === 0 && CONTROLLER["ArrowRight"] === 0)
        {
            if(CONTROLLER["lastLeftOrRight"] !== "ArrowRight")
            {
                pixelColor = spriteArray[(spriteWidth - 1 - i) + j*spriteWidth];
                playerFacingLeft = 1;
            }
            else
            {
                pixelColor = spriteArray[i + j*spriteWidth];
            }
        }
        else
        {
            pixelColor = spriteArray[i + j*spriteWidth];
        }

        let x = PLAYER["x"] + i * playerScale;
        let y = PLAYER["y"] + (j - spriteHeight + yShift) * playerScale;
        // x = Math.floor(x);
        // y = Math.floor(y);

        ctx2.fillStyle = pixelColor;
        ctx2.fillRect(
            x,
            y,
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
    let rightBoundary = 12*GRID_WIDTH_PX - 13;
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

    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    drawPlayer(
        spriteArray,
        spriteWidth,
        spriteHeight,
        yShift,
    );
}


draw_level();
setInterval(gameLoop, 1000 / FPS);
