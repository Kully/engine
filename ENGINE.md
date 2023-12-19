# Colors


### Layers

- Foreground Layer: Things that are closest to the camera.
- Player Layer: Where the player is drawn.
- Level Layer: Where collisions and colliders exist.
- Background Layer: Background environments, waves, oceans, landscapes.

The layers are separated to create contrasts for the eye. We care the most about the Object Layer, as this is where your character moves, where bullets are firing, where the powerups exist. Because our eye should be clamping down in this space, we want our color choice in this space to operate similarly.

One idea is to vary our layers' respective color palette by movements along any one of the axes of HSV space.

GREYSCALE → COLOR MAPPING → SPRITES → LEVELS → SEQUENCES


# Cycles

This section is meant to brainstorm the best way or ways of implementing animations that can play, start, and stop, wihtin the gameLoop. There are a variety of animations (or cycles) that could play in the game:

- Deciding how many frames to move if you are holding RIGHT in moving the player
- Figuring out which frame to draw a water animation loop
- Figure out how long you have been holding a button down for

The big question here is how to conceptualize these objects so as to keep the design paradigm as cohesive as possible.

# Levels

```javascript
const FIRST_CAVE = [
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
]
const GRASSY_PLAIN = [
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
]
const UNDERGROUND = [
	[0,0,0,0,0,0],
	[0,0,0,0,0,8],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
]
```

We create separate level objects to deal with the browser's cache limitations. Given the proper computing enviornment, we could theoretically have one large contiguous level (eg. 1000 x 1000 tiles) and intelligently load and unload metatiles as the player moves around.


# Spaces

There are different ways to allow a player to explore spaces. A space is any physical 3D volume that has a non-zero volume: worlds, lands, rooms, offices, beaches, cities, and galaxies are all exampls of spaces.

In the real world, humans make distinctions between spaces based on the way they (are allowed to) interact with and engage in that space.

- A Beach is a space where you build sand castles, swim in the ocean, or read a book while getting a tan.
- Offices are the place where you (try to) get shit done.
- Bedrooms are where you take ... lots of naps.

Spaces may nest within each other, and sometimes the distinction betweeon one space and other is hard to define. One example of nesting is the Beach: we can treat it both as one space, or a collection of smaller subspaces, including the _"volleyball net"_ space, the _"sand castle making"_ space, and the _"bar"_ space.

### Moving Between Spaces

Narrowing our focus to the world of video games, there are often many ways your player can interact with different spaces.

Think about video games you have played. Implicit spaces exist based on the way in which you move between them.

- Get the flagpole in SMB.
- Move around a HUB world in Super Mario Sunshine.
- Shoot a door open, and walk through it, as in the Metroid Series.
- Enter a portal in Ratchet and Clank


**Ideas**

- Maybe there are other ways of moving between spaces.
- Maybe there is another way allow people to infer what a space is.
- Maybe we can leverage the aversion of right-leaning people's dissolution of borders to create a game where your HUB world starts very small and clostrophobic, only to expand a little bit more, and then when you feel the most comfortable, you can cash out the space and the region of growing.
	- Indications of Comfort in a Space could be that you have a friend who you can chat with in the corner, who comes in and out at their own pace.

```javascript
const SCREEN_SHAKE_LOOKUPS = {
	"fallFromHigh": {
		ptr: 0,
		rule: "sequence",  // can be 'sequence' or 'func'
		array: [0, 1, 1, 2, 1, -1, 1, 2, 1, 0, 1, 2, 1],
	}
}

const WATER = {
	"lookups": {
		"waterAnimation": {
			ptr: 0,
			array: [0, 1, 2, 3, 4, 5, 6, 7],
		},
	}
}

const PLAYER = {
	...
	"lookups": {
		"horizontalSpeed": {
			ptr: 0,
			array: [0, 1, 1, 2, 1],
		},
		"walkSprite": {
			ptr: 0,
			array: [0, 1, 2,],
		},
		"standSprite": {
			ptr: 0,
			array: [0, 1],
		},
	}
}

let FRAME = 0;
gameLoop()
{
	updatePlayerPointers(FRAME);
	drawSprites();
	drawLevelLayer();
	FRAME += 1;
}
```

# Dialouge

```javascript
TEXT = "Hey, how's it going over there? What are you doing?"
```

# Retrospect: Some of the Challenges
- (Nov 26, 2023) Improving the color coding was challenging. I ported over from hard-coded colors in a list into a monochromeMapper type solution. The mental RAM required for some of the Ctlr+F sequencing was pretty tricky (6 has to go to 4, and 17 to 6, so do the 6 to 4 one first so doing 16->6 will not interfere with the next step)
