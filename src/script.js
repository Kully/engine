"use strict";

import {
    LEVEL,
    SPRITE_LOOKUP,
    SPRITE_WIDTH,
    GRID_WIDTH_PX,
    STAND_CYCLE,
    WALK_CYCLE,
    JUMP_CYCLE,
    SCALE,
} from "./data.js";

import {
    CAMERA,
    CONTROLLER,
    VALID_CONTROLLER_KEYS,
    PLAYER,
} from "./state.js";

import {
    FPS,
    COLORS,
} from "./constants.js";


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
const ctx = canvas.getContext("2d");
canvas.width = CAMERA["width"];
canvas.height = CAMERA["height"];

// init canvas for middleground layer
const canvas2 = document.getElementById("canvas-mg");
const ctx2 = canvas2.getContext("2d");
canvas2.width = canvas.width;
canvas2.height = canvas.height;

// player parameters
const playerScale = SCALE;
const maxSpeed = SCALE;
const accInc = SCALE;
const decInc = SCALE;

function drawLevel()
{
    for(let x=0; x<canvas.width; x+=1)
    for(let y=0; y<canvas.height; y+=1)
    {
        // deterine which sprite block we are drawing
        let jump_in_x = Math.floor((CAMERA["xOffset"] + x) / GRID_WIDTH_PX);
        let jump_in_y = Math.floor((CAMERA["yOffset"] + y) / GRID_WIDTH_PX);
        let sprite_x = CAMERA["gridXIndex"] + jump_in_x;
        let sprite_y = CAMERA["gridYIndex"] + jump_in_y;
        let sprite_ptr = getValueFrom2DArray(LEVEL, sprite_x, sprite_y);

        // draw pixel
        let pixelColor;
        if(sprite_ptr === undefined || sprite_ptr === null)
        {
            pixelColor = COLORS["undefined"];
        }
        else
        {
            let color_x = Math.floor( ((x+CAMERA["xOffset"])%GRID_WIDTH_PX) / (GRID_WIDTH_PX / SPRITE_WIDTH) );
            let color_y = Math.floor( ((y+CAMERA["yOffset"])%GRID_WIDTH_PX) / (GRID_WIDTH_PX / SPRITE_WIDTH) );
            let color_idx = color_y * SPRITE_WIDTH + color_x;

            pixelColor = SPRITE_LOOKUP[sprite_ptr]["sprite"][color_idx];
        }

        if((pixelColor.endsWith("FF") && pixelColor.length === 9) || pixelColor.length === 7)
        {
            ctx.fillStyle = pixelColor;
            ctx.fillRect(x, y, 1, 1);
        }
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
    	animationArray = WALK_CYCLE;
    }
    else
    {
        animationArray = STAND_CYCLE;
    }
    
    return animationArray;
}


function gameLoop(e)
{
    updatePlayerSpeed();
    translatePlayer();

    // handle boundaries
    let playerGridX = PLAYER["x"] / GRID_WIDTH_PX;
    let playerGridY = PLAYER["y"] / GRID_WIDTH_PX;

    let spritePtrInsidePlayer = LEVEL[playerGridY - 1][Math.floor(playerGridX)];
    let spritePtrRightPlayer = LEVEL[playerGridY - 1][Math.floor( (PLAYER["x"]+ playerScale*PLAYER["width"]) / GRID_WIDTH_PX )];

    if(SPRITE_LOOKUP[spritePtrInsidePlayer]["hitbox"] === true)
    {
        PLAYER["x"] = Math.floor(playerGridX + 1) * GRID_WIDTH_PX;
    }
    if(SPRITE_LOOKUP[spritePtrRightPlayer]["hitbox"] === true)
    {
        PLAYER["x"] = Math.floor(playerGridX) * GRID_WIDTH_PX;
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

drawLevel();
setInterval(gameLoop, 1000 / FPS);
