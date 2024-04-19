"""Module of Utility Functions."""

import numpy as np
from PIL import Image


GREYSCALE_COLORS = [
    "#000000FF",
    "#333333FF",
    "#666666FF",
    "#999999FF",
    "#CCCCCCFF",
    "#EEEEEEFF",
]
num_of_bins = len(GREYSCALE_COLORS)


def make_sprite_unit(
    sprite_array,
    width,
    height,
    frame_duration=None,
    x_shift=None,
    y_shift=None,
):
    """..."""

    if frame_duration is None:
        frame_duration = 1
    if x_shift is None:
        x_shift = 0
    if y_shift is None:
        y_shift = 0

    unit = {
        "sprite": sprite_array,
        "width": width,
        "height": height,
        "frameDuration": frame_duration,
        "xShift": x_shift,
        "yShift": y_shift,
    }
    return unit


def get_luminance(rgb_tuple):
    """Get the luminance from a color.

    https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
    """
    return 0.2126 * rgb_tuple[0] + 0.7152 * rgb_tuple[1] + 0.0722 * rgb_tuple[2]


def hex_to_rgb(hex_color):
    """Convert a Hex Color into an R,G,B triplet."""
    hex_color = hex_color.replace("#", "")

    rgb = []
    for i in (0, 2, 4):
        decimal = int(hex_color[i : i + 2], 16)
        rgb.append(decimal)
    return tuple(rgb)


def rgb_to_hex(some_tuple):
    """Convert an RGB tuple into a hex-color."""
    return "#" + "".join([hex(value)[2:].zfill(2) for value in some_tuple])


def gridify(array, width):
    """Visually arrange a series of numbers into a grid.

    Args:
        array (list): A list of numbers.
        width (int): How many numbers make up a row in the grid.

    Returns:
        output (str): A formatted string that evaluates to a list.
    """

    max_digit_count = max([len(str(n)) for n in array])
    zfill_char = " "

    output = "[\n    "
    for idx, val in enumerate(array):
        if (idx) % width == 0 and idx != 0:
            output += "\n    "
        val_pad = " " * (max_digit_count - len(str(val))) + str(val)
        output += f"{val_pad},"
    output += "\n]"
    return output


def extract_greyscale_mapping(filename):
    """Reduce the colorway of a sprite to greyscale of 6 colors.

    This function takes a greyscale, maps the colors of the
    sprite from light to dark, then discritizes that mapping to
    the specific colors in the provided greyscale.

    Args:
        filename (str): The filename of the sprite.
    """
    img = Image.open(filename)
    width = img.width
    height = img.height

    img = img.convert(mode="L")
    img.quantize(colors=2)
    return [color for color in img.getdata()]


def invert_values(array):
    """Assume a mirror at 3 and reflect values about this."""
    return [(-1 * (val + -3)) + 3 for val in array]


def extract_spritesheet_colors(filename, sprite_size):
    """Extract the colors out of a spritesheet of sprites.

    Args:
        filename (str): The filename to open.
        sprite_size (int): The width and height in pixels of
            each sprite in the spritesheet.

    Returns:
        sprite_arr (list): An array of colors.
    """
    try:
        image = Image.open(filename)
    except FileNotFoundError:
        print(f"File '{filename}' not found.")
        return

    width, height = image.size
    if width % sprite_size != 0 or height % sprite_size != 0:
        print("Spritesheet dimensions are not divisible by sprite size.")
        return

    sprite_arr = []
    for y in range(0, height, sprite_size):
        for x in range(0, width, sprite_size):
            sprite = image.crop((x, y, x + sprite_size, y + sprite_size))
            sprite_arr.append(
                [COLORS.index(rgb_to_hex(pixel)) for pixel in sprite.getdata()]
            )
    return sprite_arr


def get_sprite_data(filename):
    """Return flattened sprite data that is compatible with the game engine."""

    img = Image.open(filename)
    width = img.width
    height = img.height

    # get the colors of a sprite
    sprite_colors = []
    data = img.getdata()
    for idx, tuple_color in enumerate(data):
        hex_color = rgb_to_hex(tuple_color)
        sprite_colors.append(hex_color)

    # We want to convert our transparent colors and our pure black colors differently.
    luminance_arr = [get_luminance(hex_to_rgb(c)) for c in sprite_colors]

    bins = list(range(0, 255, int(255 / (num_of_bins - 1))))
    bins.append(255)

    greyscale_indices = np.digitize(x=luminance_arr, bins=bins, right=True)

    color_int_lookup = {
        "#00000000": 0,
        "#000000ff": 1,
        "#472f0bff": 2,
        "#a48d6dff": 3,
        "#dc7373ff": 4,
        "#e3b3b3ff": 5,
        "#ffffffff": 6,
        "#ebcd46ff": 7, # fire 1
        "#e1622bff": 8, # fire 2
    }

    output = []
    for idx, color in enumerate(sprite_colors):
        output.append(color_int_lookup[color])
        # if color == "#00000000":
        #     output.append(0)
        # elif color == "#000000ff":
        #     output.append(1)
        # else:
        #     index = greyscale_indices[idx]
        #     output.append(index)
    output = gridify(array=output, width=width)
    return output


if __name__ == "__main__":
    print("Turn Animation")
    filename = (
        f"utils/media/sprites/Idle_Turn/Protagonist_IdleForward_01.png"
    )
    engine_sprite_blob = get_sprite_data(filename)
    print(engine_sprite_blob)

    print("Idle Animation")
    for index in range(4):
        filename = (
            f"utils/media/sprites/IdleAnim/Protagonist_IdleAnim_01_Idle_Animation_{index}.png"
        )
        engine_sprite_blob = get_sprite_data(filename)
        print(engine_sprite_blob)

    print("Jump Cycle")
    for index in range(7):
        filename = (
            f"utils/media/sprites/JumpCycle/Protagonist_JumpCycle_01_JumpCycle_{index}.png"
        )
        engine_sprite_blob = get_sprite_data(filename)
        print(engine_sprite_blob)

    print("Shoot Cycle")
    for index in range(6):
        filename = (
            f"utils/media/sprites/ShootingCycle_02/Protagonist_ShootCycle_02_ShootingAnimation_{index}.png"
        )
        engine_sprite_blob = get_sprite_data(filename)
        print(engine_sprite_blob)

    print("Walk Cycle")
    for index in range(3):
        filename = (
            f"utils/media/sprites/WalkCycle/Protagonist_WalkCycle_01_Walk Cycle_{index}.png"
        )
        engine_sprite_blob = get_sprite_data(filename)
        print(engine_sprite_blob)

    print("Walk Shoot Cycle")
    for index in range(3):
        filename = (
            f"utils/media/sprites/WalkShootCycle/Protagonist_WalkShootCycle_01_Walk Cycle_{index}.png"
        )
        engine_sprite_blob = get_sprite_data(filename)
        print(engine_sprite_blob)
