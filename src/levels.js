/* Levels */

export const LEVEL_LOOKUP = {
    "hub": {
        "playerX": 7,
        "playerY": 8,
        "level": [
            [4, 6, 0, 4, 4, 4, 4, 6, 5, 4, 7, 0, 5, 7, 5, 7, 5, 7, 5, 4],
            [4, 4, 0, 0, 4, 4, 4, 4, 4, 7, 0, 5, 7, 5, 7, 5, 7, 5, 4, 7],
            [0, 4, 0, 0, 0, 4, 4, 4, 4, 6, 5, 7, 5, 7, 5, 7, 5, 4, 7, 0],
            [4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 7, 0, 5],
            [0, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 0, 5, 7],
            [4, 4, 4, 4, 0, 7, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 5, 4, 4],
            [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 5, 7, 0, 0],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4],
            [0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0],
            [4, 4, 4, 4, 4, 0, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 6, 0, 5, 7],
            [4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 4, 5, 4, 4, 7, 0, 4, 4, 4, 4],
            [4, 4, 4, 7, 4, 0, 0, 4, 7, 4, 4, 7, 4, 4, 0, 5, 7, 4, 6, 0],
            [4, 4, 7, 6, 0, 0, 4, 7, 0, 4, 7, 0, 4, 7, 5, 7, 0, 5, 4, 6],
            [4, 7, 6, 5, 4, 4, 4, 5, 7, 4, 0, 5, 7, 5, 7, 0, 5, 7, 0, 4],
        ],
    },
    "leap of faith": {
        "playerX": 2,
        "playerY": 4,
        "level": [
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 41, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 4, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 4, 0, 4, 0, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 7, 7, 7, 4, 4, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 7, 7, 7, 7, 0, 9, 4, 4, 4, 7, 0, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 9, 4, 7, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 4, 0, 0, 0, 4, 4, 0, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 0, 0, 0, 0, 0, 41, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 0, 0, 41, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 4],
            [4, 4, 4, 0, 41, 4, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4],
            [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0],
            [4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 41, 0, 4, 4, 7, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4],
            [4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 41, 4, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 7, 0, 0, 0, 0, 0, 4, 4, 8, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
        ],
    },
    "smallTest": {
        "playerX": 5,
        "playerY": 4,
        "level": [
            [4, 4, 4, 4, 4, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
            [4, 4, 4, 41, 0, 10, 0, 0, 0, 4, 41, 0, 0, 0, 0, 0, 0],
            [4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ],
    },
    "new-stage": {
        "playerX": 1,
        "playerY": 1,
        "level": [
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 10, 4, 4, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4],
            [4, 4, 4, 4, 4, 0, 0, 4, 0, 4, 0, 4, 0, 4],
            [4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4],
            [0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 0, 0, 4],
            [4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4],
            [4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 4],
            [4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 0, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4],
            [4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 4],
            [4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4],
            [4, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4],
            [4, 0, 4, 0, 0, 0, 4, 4, 0, 0, 4, 4, 4, 4],
            [4, 0, 0, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4],
            [4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 8, 4],
            [4, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ],
    }
};

const levelName = "new-stage";
export const PLAYER_TILE_X = LEVEL_LOOKUP[levelName]["playerX"];
export const PLAYER_TILE_Y = LEVEL_LOOKUP[levelName]["playerY"];
export const LEVEL = LEVEL_LOOKUP[levelName]["level"];