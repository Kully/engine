array = [
			  2, 2, 2, 2, 10, 10, 10, 4,
			  9, 10, 15, 3, 11, 3, 11, 1,
			  12, 3, 3, 3, 13, 2, 1, 1,
			  10, 3, 3, 2, 2, 1, 1, 1,
			  3, 3, 12, 4, 1, 1, 1, 1,
			  10, 3, 11, 1, 1, 1, 1, 1,
			  10, 10, 1, 1, 1, 1, 1, 1,
			  8, 1, 1, 1, 1, 1, 1, 1,
		]

width = 8
max_digit_count = 3
zfill_char = " "

output = "[\n    "
for idx, val in enumerate(array):
	if (idx) % width == 0 and idx != 0:
		output += "\n    "
	val_pad = " " * (max_digit_count - len(str(val))) + str(val)
	output += f"{val_pad},"
output += "\n]"
print(output)
