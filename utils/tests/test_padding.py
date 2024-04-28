"""Test Suite for the Padding Utility Functions."""

import pytest

from utils import (
	calc_top_padding,
	calc_bottom_padding,
	calc_left_padding,
	calc_right_padding,
)

@pytest.fixture
def ranger_sprite():
	array = [
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	    0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,
	    0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,
	    0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,
	    0,0,0,0,0,5,1,4,1,0,0,0,0,0,0,0,
	    0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,0,
	    0,0,0,0,0,3,3,5,3,0,0,0,0,0,0,0,
	    0,0,0,0,0,3,3,6,1,1,1,1,1,0,0,0,
	    0,0,0,0,0,3,1,1,1,1,5,1,0,0,0,0,
	    0,0,0,0,0,5,5,1,6,1,0,0,0,0,0,0,
	    0,0,0,0,0,0,1,3,6,3,0,0,0,0,0,0,
	    0,0,0,0,0,0,0,3,1,3,0,0,0,0,0,0,
	    0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
	    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
	    0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,
	    0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
	]
	width = 16
	height = 16
	return {"array": array, "width": width, "height": height}

@pytest.fixture
def tiny_sprite():
	array = [
		0, 0,
		1, 0,
	]
	width = 2
	height = 2
	return {"array": array, "width": width, "height": height}

@pytest.fixture
def nonsquare_sprite():
	array = [
		0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 0, 0,
		0, 0, 1, 0, 1, 0, 0,
		0, 0, 1, 1, 1, 0, 0,
		0, 1, 0, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
	]
	width = 7
	height = 9
	return {"array": array, "width": width, "height": height}


# Test Ranger Sprite

def test_ranger_calc_top_padding(ranger_sprite):
	actual = calc_top_padding(
		array=ranger_sprite["array"],
		width=ranger_sprite["width"],
		height=ranger_sprite["height"],
	)
	expected = 1
	assert actual == expected

def test_ranger_calc_bottom_padding(ranger_sprite):
	actual = calc_bottom_padding(
		array=ranger_sprite["array"],
		width=ranger_sprite["width"],
		height=ranger_sprite["height"],
	)
	expected = 0
	assert actual == expected

def test_ranger_calc_left_padding(ranger_sprite):
	actual = calc_left_padding(
		array=ranger_sprite["array"],
		width=ranger_sprite["width"],
		height=ranger_sprite["height"],
	)
	expected = 3
	assert actual == expected

def test_ranger_calc_right_padding(ranger_sprite):
	actual = calc_right_padding(
		array=ranger_sprite["array"],
		width=ranger_sprite["width"],
		height=ranger_sprite["height"],
	)
	expected = 3
	assert actual == expected


# Test Tiny Sprite

def test_tiny_calc_top_padding(tiny_sprite):
	actual = calc_top_padding(
		array=tiny_sprite["array"],
		width=tiny_sprite["width"],
		height=tiny_sprite["height"],
	)
	expected = 1
	assert actual == expected

def test_tiny_calc_bottom_padding(tiny_sprite):
	actual = calc_bottom_padding(
		array=tiny_sprite["array"],
		width=tiny_sprite["width"],
		height=tiny_sprite["height"],
	)
	expected = 0
	assert actual == expected

def test_tiny_calc_left_padding(tiny_sprite):
	actual = calc_left_padding(
		array=tiny_sprite["array"],
		width=tiny_sprite["width"],
		height=tiny_sprite["height"],
	)
	expected = 0
	assert actual == expected

def test_tiny_calc_right_padding(tiny_sprite):
	actual = calc_right_padding(
		array=tiny_sprite["array"],
		width=tiny_sprite["width"],
		height=tiny_sprite["height"],
	)
	expected = 1
	assert actual == expected


# Test Non-Square Sprite

def test_nonsquare_calc_top_padding(nonsquare_sprite):
	actual = calc_top_padding(
		array=nonsquare_sprite["array"],
		width=nonsquare_sprite["width"],
		height=nonsquare_sprite["height"],
	)
	expected = 0
	assert actual == expected

def test_nonsquare_calc_bottom_padding(nonsquare_sprite):
	actual = calc_bottom_padding(
		array=nonsquare_sprite["array"],
		width=nonsquare_sprite["width"],
		height=nonsquare_sprite["height"],
	)
	expected = 2
	assert actual == expected

def test_nonsquare_calc_left_padding(nonsquare_sprite):
	actual = calc_left_padding(
		array=nonsquare_sprite["array"],
		width=nonsquare_sprite["width"],
		height=nonsquare_sprite["height"],
	)
	expected = 1
	assert actual == expected

def test_nonsquare_calc_right_padding(nonsquare_sprite):
	actual = calc_right_padding(
		array=nonsquare_sprite["array"],
		width=nonsquare_sprite["width"],
		height=nonsquare_sprite["height"],
	)
	expected = 2
	assert actual == expected
