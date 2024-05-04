"""Module of Utility Functions."""

import os

import numpy as np
from PIL import Image

from padding import (
    calc_top_padding,
    calc_bottom_padding,
    calc_left_padding,
    calc_right_padding,
)


GREYSCALE_COLORS = [
    "#000000FF",
    "#333333FF",
    "#666666FF",
    "#999999FF",
    "#CCCCCCFF",
    "#EEEEEEFF",
]

PLAYER_COLOR_MAP = {
    "#00000000": 0,
    "#000000ff": 1,
    "#472f0bff": 2,
    "#a48d6dff": 3,
    "#dc7373ff": 4,
    "#e3b3b3ff": 5,
    "#ffffffff": 6,
    "#ebcd46ff": 7,  # fire 1
    "#e1622bff": 8,  # fire 2
}
LEVEL_COLOR_MAP = {
    "#0E121AFF": 0,
    "#090909FF": 1,
    "#042029FF": 2,
    "#082D45FF": 3,
    "#0D5675FF": 4,
    "#1286B0FF": 5,
    "#7BDAE3FF": 6,
}


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

def get_sprite_data(filename, color_int_lookup):
    """Parse out a PNG and create an engine-friendly blob.

    Args:
        filename (str): The filename of the sprite.
        color_int_lookup (dict): A dictionary that maps colors to integers.

    Returns:
        output: ...
    """

    img = Image.open(filename)
    width = img.width
    height = img.height

    # get the colors of a sprite
    sprite_colors = []
    data = img.getdata()
    for idx, tuple_color in enumerate(data):
        hex_color = rgb_to_hex(tuple_color)
        sprite_colors.append(hex_color)

    if color_int_lookup is None:
        unique_colors = list(set(sprite_colors))
        ranked_colors = sorted(unique_colors, key=lambda x: get_luminance(hex_to_rgb(x)))
        color_int_lookup = {c:idx+1 for idx, c in enumerate(ranked_colors)}
        print(f"color_int_lookup generated: {color_int_lookup}")

    sprite = []
    for idx, color in enumerate(sprite_colors):
        try:
            sprite.append(color_int_lookup[color.lower()])
        except KeyError:
            sprite.append(color_int_lookup[color.upper()])

    output = {
        "sprite": sprite,
        "width": width,
        "height": height,
    }
    return output


def generate_sprites(color_int_lookup, path_base):
    """Traverse the sprite images in a directory and calculate the sprites.

    Args:
        color_int_lookup (dict): The dictionary that maps colors to integers.
            Make sure that you pick the right one depending on the directory
            that you have.
        path_base (str): The directory to look in.

    Returns:
        (None) This function only prints to the terminal.
    """
    for directory in os.listdir(path_base):
        path = os.path.join(path_base, directory)
        if os.path.isdir(path):
            print(f"{directory}\n{'=' * len(directory)}\n")
            for filename in sorted(os.listdir(path)):
                if filename.endswith(".png"):
                    print(f"({filename})")
                    file_pathname = os.path.join(
                        path_base,
                        directory,
                        filename,
                    )
                    sprite_object = get_sprite_data(
                        filename=file_pathname,
                        color_int_lookup=color_int_lookup,
                    )
                    array = sprite_object["sprite"]
                    width = sprite_object["width"]
                    height = sprite_object["height"]

                    pretty_sprite = gridify(array=array, width=width)
                    top = calc_top_padding(array=array, width=width, height=height)
                    bottom = calc_bottom_padding(array=array, width=width, height=height)
                    left = calc_left_padding(array=array, width=width, height=height)
                    right = calc_right_padding(array=array, width=width, height=height)
                    print(f"\nsprite: {pretty_sprite},\nwidth: {width},\nheight: {height},\ntPad: {top},\nbPad: {bottom},\nlPad: {left},\nrPad: {right},\n")
        print("")


if __name__ == "__main__":
    generate_sprites(color_int_lookup=None, path_base="utils/media/background")
    # generate_sprites(color_int_lookup=LEVEL_COLOR_MAP, path_base="utils/media/level")
    # generate_sprites(color_int_lookup=PLAYER_COLOR_MAP, path_base="utils/media/sprites")
