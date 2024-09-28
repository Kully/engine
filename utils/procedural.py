"""Create Procedural Levels and Worlds."""

import json

import math
import random

width = 30
height = 30

emptyArray = []
for h in range(height):
	row = [0 for _ in range(width)]
	emptyArray.append(row)

levelArray = []
for h in range(height):
	row = [random.choice([0, 0, 0, 0, 0, 4]) for _ in range(width)]
	levelArray.append(row)

level = {
	"playerX": math.floor(random.random() * width),
	"playerY": math.floor(random.random() * height),
	"level": levelArray,
	"enemy": emptyArray,
	"items": emptyArray,
}

json_str = json.dumps(level)
print(json_str)
