"""Format an array of numbers so they overlap neatly so numbers line up."""

array = [0, 1, 2, 3, 4, 5, 6, 7, 0, 10, 200, 30, 4, 5, 6, 7]

width = 8
max_digit_count = max([len(str(n)) for n in array])
zfill_char = " "

output = "[\n    "
for idx, val in enumerate(array):
    if (idx) % width == 0 and idx != 0:
        output += "\n    "
    val_pad = " " * (max_digit_count - len(str(val))) + str(val)
    output += f"{val_pad},"
output += "\n]"
print(output)