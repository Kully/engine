"""Module for Calculating Padding around Sprites.

It is often the case that a sprite is defined as a grid of
pixels, but only a subset of the pixels are meaningful and
are used to render the image.

For example, a 16x16 pixel character could be thin and only
take up 10 pixels horizontally rather than the full 16.

It's important to know where the true data lies in a sprite
grid in order to make them belivably interact and collide in
their enviornment in-game.

These functions calculate the rows and/or columns of null values
in a provided sprite array. They are attached to the processed
sprite data and placed in the game for lookup.
"""


def calc_top_padding(array, width, height):
    """Calculate the top padding for a sprite."""
    padding = 0
    for idx, val in enumerate(array):
        if val != 0:
            break
        if (idx + 1) % width == 0:
            padding += 1
    return padding

def calc_bottom_padding(array, width, height):
    """Calculate the bottom padding for a sprite."""
    padding = 0
    for idx, val in enumerate(array[::-1]):
        if val != 0:
            break
        if (idx + 1) % width == 0:
            padding += 1
    return padding

def calc_left_padding(array, width, height):
    """Calculate the left padding for a sprite."""
    padding = 0
    for col_index in range(width):
        if all([ array[idx+col_index] == 0 for idx in range(0, len(array), width)]):
            padding += 1
        else:
            return padding

def calc_right_padding(array, width, height):
    """Calculate the right padding for a sprite."""
    padding = 0
    for col_index in range(width)[::-1]:
        if all([ array[idx+col_index] == 0 for idx in range(0, len(array), width)[::-1] ]):
            padding += 1
        else:
            return padding
