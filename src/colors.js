/* Colors */

import {
	CHANGE_COLORS_BY_TIME
} from "./constants.js";

export const GREYSCALE_COLORS = [
	"#00000000",
	"#000000FF",
	"#333333FF",
	"#666666FF",
	"#999999FF",
	"#CCCCCCFF",
	"#EEEEEEFF",
];


/* BACKGROUND THEMES - not ordered by luminance
========================= */

export let BKGD_COLOR_MAP;
const NIGHT_BKGD_COLOR_MAP = {
	1: '#1b263bff',  // medium
	2: '#415a77ff',  // high
	3: "#0d1b2aff",  // low
};
const CYBERPUNK_BKGD_COLOR_MAP = {
	1: '#E86886ff',
	2: '#FA92CBff',
	3: '#A84B8Bff',
};
const EVE_BKGD_COLOR_MAP = {
	1: '#3b6b9cff',
	2: '#2e5a89ff',
	3: '#4e89c6ff',
};
const DAWN_BKGD_COLOR_MAP = {
	1: '#FFAB8CFF',
	2: '#CF726DFF',
	3: '#FFECA6FF',
};
const DAYTIME_BKGD_COLOR_MAP = {
	1: '#FFAB8CFF',
	2: '#FFECA6FF',
	3: '#CF726DFF',
};

/* LEVEL THEMES
========================= */

export let LEVEL_COLOR_MAP;
const LIGHT_BROWN_LEVEL_COLOR_MAP = {
	0: "#226798FF",
	1: "#19100EFF",
	2: "#290F04FF",
	3: "#451608FF",
	4: "#75270DFF",
	5: "#B03912FF",
	6: "#E38F7BFF",
};
const SEA_BLUES_LEVEL_COLOR_MAP = {
	0: "#010A0AFF",
	1: "#090909FF",
	2: "#042029FF",
	3: "#082D45FF",
	4: "#0D5659FF",
	5: "#0086B0FF",
	6: "#7BDAE3FF",
};
const DARK_GREEN_LEVEL_COLOR_MAP = {
	0: "#0E121AFF",  // #021A1AFF
	1: "#0A0A0AFF",
	2: "#042529FF",
	3: "#084543FF",
	4: "#0D7566FF",
	5: "#12B083FF",
	6: "#7BDAE3FF",
};
const CYBERPUNK_LEVEL_COLOR_MAP = {
	0: "#000000FF",
	1: "#000000FF",
	2: "#020314FF",
	3: "#560badFF",
	4: "#7209b7FF",
	5: "#b5179eFF",
	6: "#f72585FF",
}
const CORAL_LEVEL_COLOR_MAP = {
	0: '#020314ff',
	1: '#7209b7ff',
	2: '#b5179eff',
	3: '#f72585ff',
	4: "#7209b7FF",
	5: "#b5179eFF",
	6: "#f72585FF",
}


/* PLAYER THEMES
========================= */

export let PLAYER_COLOR_MAP;
const OG_PLAYER_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#000000FF",
	2: "#47300BFF",
	3: "#A48D6DFF",
	4: "#DB7272FF",
	5: "#E3B3B3FF",
	6: "#FFFFFFFF",
	7: "#ebcd46ff",  // fire 1
    8: "#e1622bff",  // fire 2
};
const DARK_PLAYER_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#000000FF",
	2: "#402b26FF",
	3: "#5f523fFF",
	4: "##B15D5DFF",
	5: "#ab8686FF",
	6: "#dededeFF",
	7: "#ebcd46ff",
    8: "#e1622bff",
};
const SCRUFFY_PLAYER_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#000000FF",
	2: "#00471DFF",
	3: "#6E4C1AFF",
	4: "#FFC27CFF",
	5: "#8B4513FF",
	6: "#FFFFFFFF",
	7: "#ebcd46ff",  // fire 1
    8: "#e1622bff",  // fire 2
};
const DARK_RED_PLAYER_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#880000FF",
	2: "#880000FF",
	3: "#880000FF",
	4: "#880000FF",
	5: "#880000FF",
	6: "#880000FF",
	7: "#ebcd46ff",  // fire 1
    8: "#e1622bff",  // fire 2
};
const BROWN_PLAYER_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#421F19ff",
	2: "#724632ff",
	3: "#8F6754ff",
	4: "#BF9886ff",
	5: "#C4A795ff",
	6: "#E5D2C3ff",
	7: "#ebcd46ff",  // fire 1
    8: "#e1622bff",  // fire 2
};
const SEAWEED_PLAYER_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#023e8aff",
	2: "#0077b6ff",
	3: "#0096c7ff",
	4: "#00b4d8ff",
	5: "#48cae4ff",
	6: "#90e0efff",
	7: "#ebcd46ff",  // fire 1
    8: "#e1622bff",  // fire 2
};
const CYBERPUNK_PLAYER_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#000000FF",
	2: "#020314FF",
	3: "#560badFF",
	4: "#7209b7FF",
	5: "#b5179eFF",
	6: "#f72585FF",
	7: "#ebcd46ff",  // fire 1
    8: "#e1622bff",  // fire 2
}
const METROID_PLAYER_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#000000FF",
	2: "#3F7F00FF",
	3: "#FF301FFF",
	4: "#FFE100FF",  // yellow cursor

	5: "#b5179eFF",
	6: "#f72585FF",
	7: "#ebcd46ff",  // fire 1
    8: "#e1622bff",  // fire 2
}


/* ENEMY SPRITES
========================= */

export let ENEMY2_COLOR_MAP;
export const OG_ENEMY2_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#0F4061FF",
	2: "#135985FF",
	3: "#80161DFF",
	4: "#FF0000FF",
	5: "#FF0000FF",
	6: "#FF0000FF",
};
export const LIGHT_ENEMY2_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#290F04FF",
	2: "#B03912FF",
	3: "#E38F7BFF",
	4: "#00b4d8ff",
	5: "#48cae4ff",
	6: "#90e0efff",
};


export let SLOTH_COLOR_MAP;
export const OG_SLOTH_COLOR_MAP = {0: '#00000000', 1: '#421B1BFF', 2: '#771717ff', 3: '#9d2020ff', 4: '#893f11ff', 5: '#b04e12ff', 6: '#f3c612ff'}
// export const OG_SLOTH_COLOR_MAP = {
// 	0: GREYSCALE_COLORS[0],
// 	1: '#000000FF',
// 	2: '#771717ff',
// 	3: '#9d2020ff',
// 	4: '#893f11ff',
// 	5: '#b04e12ff',
// 	6: '#303030ff',
// 	7: '#f3c612ff',
// }

export let TRIANGLE_COLOR_MAP;
export const PINK_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: '#F878F8FF',
	2: '#F878F9FF',
	3: '#F978F8FF',
	4: '#F879F8FF',
	5: '#F879F9FF',
}


/* OBJECT THEMES
========================= */

export const GOLD_COIN_COLOR_MAP = {
	0: GREYSCALE_COLORS[0],
	1: "#d82800FF",
	2: "#fc9838FF",
	3: "#fcfcfcFF",
}


// set colors depending on the time of day
const now = new Date();
const hour = now.getHours();

export let COLOR_MAP_LOOKUP;
if(CHANGE_COLORS_BY_TIME)
{
	if(hour < 7 || hour > 20)
	{
		LEVEL_COLOR_MAP = SEA_BLUES_LEVEL_COLOR_MAP;
		PLAYER_COLOR_MAP = OG_PLAYER_COLOR_MAP;
		ENEMY2_COLOR_MAP = OG_ENEMY2_COLOR_MAP;
		BKGD_COLOR_MAP = NIGHT_BKGD_COLOR_MAP;
	}
	else
	{
		LEVEL_COLOR_MAP = CYBERPUNK_LEVEL_COLOR_MAP;
		PLAYER_COLOR_MAP = OG_PLAYER_COLOR_MAP;
		ENEMY2_COLOR_MAP = LIGHT_ENEMY2_COLOR_MAP;
		BKGD_COLOR_MAP = DAWN_BKGD_COLOR_MAP;
	}
}
else
{
	LEVEL_COLOR_MAP = DARK_GREEN_LEVEL_COLOR_MAP;
	PLAYER_COLOR_MAP = METROID_PLAYER_COLOR_MAP;
	ENEMY2_COLOR_MAP = OG_ENEMY2_COLOR_MAP;
	SLOTH_COLOR_MAP = OG_SLOTH_COLOR_MAP;
	BKGD_COLOR_MAP = NIGHT_BKGD_COLOR_MAP;
	TRIANGLE_COLOR_MAP = PINK_COLOR_MAP;

	COLOR_MAP_LOOKUP = {
		"enemy2": ENEMY2_COLOR_MAP,
		"sloth": SLOTH_COLOR_MAP,
		"triangle_left": TRIANGLE_COLOR_MAP,
		"triangle_right": TRIANGLE_COLOR_MAP,
	}
}
