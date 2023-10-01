from PIL import Image


def tuple_to_hex(some_tuple):
    return "#" + "".join([hex(value)[2:].zfill(2) for value in some_tuple])

def extract_spritesheet_colors(filename, sprite_size):
    try:
        image = Image.open(filename)
    except FileNotFoundError:
        print(f"File '{filename}' not found.")
        return

    width, height = image.size
    if width % sprite_size != 0 or height % sprite_size != 0:
        print("Spritesheet dimensions are not divisible by sprite size.")
        return

    sprite_colors = []

    for y in range(0, height, sprite_size):
        for x in range(0, width, sprite_size):
            sprite = image.crop((x, y, x + sprite_size, y + sprite_size))
            sprite_colors.append([
                tuple_to_hex(pixel) for pixel in sprite.getdata()
            ])

    return sprite_colors

if __name__ == "__main__":
    spritesheet_filename = "yoey-sprite-sheet.png"
    sprite_size = 16

    extracted_sprites = extract_spritesheet_colors(spritesheet_filename, sprite_size)

    if extracted_sprites:
        for i, color_arr in enumerate(extracted_sprites):
            print(f"Sprite {i + 1}\n")
            print(color_arr)
            print("\n")
