/* Objects */

export const BULLET_SPRITES = {
    IDLE_CYCLE: [
        {
            sprite: [
                5,3,
                4,5,
            ],
            width: 2,
            height: 2,
            tPad: 0,
            bPad: 0,
            lPad: 0,
            rPad: 0,
            frameDuration: 0,
            xShift: 0,
            yShift: 0,
        },
    ]
};


const COIN_IDLE_FRAMES = [
    16,
    10,
    6,
    10,
];
const COIN_SPRITES = {
    STAND_CYCLE: [
        {
            sprite: [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,3,3,1,1,0,0,0,0,0,0,
                0,0,0,0,0,3,2,2,2,2,1,0,0,0,0,0,
                0,0,0,0,3,2,2,3,3,2,2,1,0,0,0,0,
                0,0,0,0,3,2,3,2,2,1,2,1,0,0,0,0,
                0,0,0,0,3,2,3,2,2,1,2,1,0,0,0,0,
                0,0,0,0,3,2,2,1,1,2,2,1,0,0,0,0,
                0,0,0,0,0,3,2,2,2,2,1,0,0,0,0,0,
                0,0,0,0,0,0,3,3,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            width: 16,
            height: 16,
            frameDuration: COIN_IDLE_FRAMES[0],
            tPad: 0,
            bPad: 0,
            lPad: 3,
            rPad: 0,
            xShift: 0,
            yShift: 0,
        },
        {
            sprite: [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,3,3,2,2,0,0,0,0,0,0,
                0,0,0,0,0,3,3,2,2,2,2,0,0,0,0,0,
                0,0,0,0,0,3,3,2,3,2,2,0,0,0,0,0,
                0,0,0,0,0,3,3,2,3,1,2,0,0,0,0,0,
                0,0,0,0,0,3,3,2,3,1,2,0,0,0,0,0,
                0,0,0,0,0,3,3,2,3,2,2,0,0,0,0,0,
                0,0,0,0,0,3,3,2,2,2,2,0,0,0,0,0,
                0,0,0,0,0,0,3,3,2,2,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            width: 16,
            height: 16,
            frameDuration: COIN_IDLE_FRAMES[1],
            tPad: 0,
            bPad: 0,
            lPad: 3,
            rPad: 0,
            xShift: 0,
            yShift: 0,
        },
        {
            sprite: [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,
                0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,
                0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,
                0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,
                0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,
                0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,
                0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            width: 16,
            height: 16,
            frameDuration: COIN_IDLE_FRAMES[2],
            tPad: 0,
            bPad: 0,
            lPad: 3,
            rPad: 0,
            xShift: 0,
            yShift: 0,
        },
        {
            sprite: [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,2,2,3,3,0,0,0,0,0,0,
                0,0,0,0,0,2,2,2,2,3,3,0,0,0,0,0,
                0,0,0,0,0,2,2,3,2,3,3,0,0,0,0,0,
                0,0,0,0,0,2,1,3,2,3,3,0,0,0,0,0,
                0,0,0,0,0,2,1,3,2,3,3,0,0,0,0,0,
                0,0,0,0,0,2,2,3,2,3,3,0,0,0,0,0,
                0,0,0,0,0,2,2,2,2,3,3,0,0,0,0,0,
                0,0,0,0,0,0,2,2,3,3,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            width: 16,
            height: 16,
            frameDuration: COIN_IDLE_FRAMES[3],
            tPad: 0,
            bPad: 0,
            lPad: 3,
            rPad: 0,
            xShift: 0,
            yShift: 0,
        },
        {
            sprite: [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,3,3,0,0,0,0,0,0,
                0,0,0,0,0,1,2,2,2,2,3,0,0,0,0,0,
                0,0,0,0,1,2,2,3,3,2,2,3,0,0,0,0,
                0,0,0,0,1,2,1,2,2,3,2,3,0,0,0,0,
                0,0,0,0,1,2,1,2,2,3,2,3,0,0,0,0,
                0,0,0,0,1,2,2,1,1,2,2,3,0,0,0,0,
                0,0,0,0,0,1,2,2,2,2,3,0,0,0,0,0,
                0,0,0,0,0,0,1,1,3,3,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            width: 16,
            height: 16,
            frameDuration: COIN_IDLE_FRAMES[0],
            tPad: 0,
            bPad: 0,
            lPad: 3,
            rPad: 0,
            xShift: 0,
            yShift: 0,
        },
        {
            sprite: [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,2,2,0,0,0,0,0,0,
                0,0,0,0,0,1,1,2,2,2,2,0,0,0,0,0,
                0,0,0,0,0,1,1,2,1,2,2,0,0,0,0,0,
                0,0,0,0,0,1,1,2,1,3,2,0,0,0,0,0,
                0,0,0,0,0,1,1,2,1,3,2,0,0,0,0,0,
                0,0,0,0,0,1,1,2,1,2,2,0,0,0,0,0,
                0,0,0,0,0,1,1,2,2,2,2,0,0,0,0,0,
                0,0,0,0,0,0,1,1,2,2,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            width: 16,
            height: 16,
            frameDuration: COIN_IDLE_FRAMES[1],
            tPad: 0,
            bPad: 0,
            lPad: 3,
            rPad: 0,
            xShift: 0,
            yShift: 0,
        },
        {
            sprite: [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            width: 16,
            height: 16,
            frameDuration: COIN_IDLE_FRAMES[2],
            tPad: 0,
            bPad: 0,
            lPad: 3,
            rPad: 0,
            xShift: 0,
            yShift: 0,
        },
        

        {
            sprite: [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,2,2,1,1,0,0,0,0,0,0,
                0,0,0,0,0,2,2,2,2,1,1,0,0,0,0,0,
                0,0,0,0,0,2,2,1,2,1,1,0,0,0,0,0,
                0,0,0,0,0,2,3,1,2,1,1,0,0,0,0,0,
                0,0,0,0,0,2,3,1,2,1,1,0,0,0,0,0,
                0,0,0,0,0,2,2,1,2,1,1,0,0,0,0,0,
                0,0,0,0,0,2,2,2,2,1,1,0,0,0,0,0,
                0,0,0,0,0,0,2,2,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            width: 16,
            height: 16,
            frameDuration: COIN_IDLE_FRAMES[3],
            tPad: 0,
            bPad: 0,
            lPad: 3,
            rPad: 0,
            xShift: 0,
            yShift: 0,
        },
    ],
}
