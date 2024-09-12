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
    "new-stage": {
        "playerX": 1,
        "playerY": 5,
        "level": [
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 0, 0, 0, 0, 42, 0, 0, 0, 44, 0, 0, 0, 0, 4],
            [4, 0, 0, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 4],
            [4, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 4],
        ],
    },
    "seaWeedDungeon": {
        "playerX": 2,
        "playerY": 6,
        "level": [
            [47, 47, 47, 47, 47, 47, 44, 0, 0, 0, 0, 0, 0, 0, 0, 44, 44],
            [47, 47, 41, 7, 0, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 44],
            [47, 47, 461, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44],
            [47, 47, 0, 0, 0, 0, 0, 0, 0, 44, 42, 43, 44, 0, 0, 0, 44],
            [47, 461, 0, 0, 46, 0, 0, 0, 461, 44, 44, 44, 4, 0, 0, 0, 44],
            [47, 461, 8, 0, 0, 0, 0, 461, 47, 44, 44, 44, 4, 0, 0, 0, 44],
            [46, 46, 46, 46, 46, 46, 46, 47, 47, 44, 44, 44, 0, 0, 0, 44, 44],
            [47, 46, 46, 47, 46, 46, 46, 47, 47, 44, 44, 44, 4, 0, 0, 44, 44],
            [46, 46, 43, 43, 43, 43, 46, 46, 46, 46, 46, 46, 41, 0, 0, 42, 44],
            [0, 9, 44, 43, 44, 44, 44, 44, 44, 9, 41, 41, 41, 0, 0, 43, 44],
            [0, 0, 0, 0, 42, 43, 44, 44, 44, 44, 9, 41, 41, 0, 0, 9, 44],
            [0, 0, 0, 0, 0, 44, 44, 44, 44, 44, 44, 46, 41, 0, 0, 0, 44],
            [0, 0, 0, 0, 9, 44, 44, 44, 44, 44, 44, 44, 47, 0, 0, 0, 44],
            [0, 0, 0, 0, 0, 42, 44, 44, 44, 44, 44, 44, 46, 0, 0, 0, 44],
            [8, 0, 0, 0, 0, 42, 43, 44, 44, 44, 44, 43, 43, 0, 0, 0, 44],
            [46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 44],
            [0, 0, 0, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
    },
    "metroidvania": {
        "playerX": 7,
        "playerY": 1,
        "level": [
            [44, 42, 42, 44, 42, 42, 4, 4, 4, 4, 4, 4, 4, 4, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43],
            [42, 7, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 9, 4, 4, 4, 4, 4, 0, 0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 4, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43],
            [42, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 43, 43, 43, 43, 43, 43, 43, 43],
            [4, 0, 0, 0, 0, 0, 0, 46, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 43, 43, 43, 43, 43],
            [4, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 43, 43, 43],
            [4, 0, 0, 0, 0, 0, 0, 461, 47, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 43, 43],
            [43, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 43, 43],
            [44, 43, 44, 43, 43, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 0, 4, 0, 4, 0, 4, 4, 0, 0, 0, 8, 0, 43, 43],
            [44, 44, 44, 43, 43, 0, 43, 43, 43, 43, 43, 43, 43, 43, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 43, 43],
            [43, 43, 43, 43, 43, 0, 43, 43, 43, 43, 43, 43, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 43],
            [43, 43, 43, 43, 43, 0, 43, 43, 43, 43, 43, 43, 43, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 43, 43],
            [43, 43, 43, 43, 43, 0, 43, 43, 43, 43, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 43],
        ],
    }
};

const levelName = "trapped";
export const PLAYER_TILE_X = LEVEL_LOOKUP[levelName]["playerX"];
export const PLAYER_TILE_Y = LEVEL_LOOKUP[levelName]["playerY"];
export const LEVEL = LEVEL_LOOKUP[levelName]["level"];