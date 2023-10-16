/* Helper Functions */


export function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255] : null;
}

export function validatePixelColor(color, COLOR_ARRAY)
{
    if(color.toString().startsWith("#"))
        return color;
    else
        return COLOR_ARRAY[color];
}

export function getValueFrom2DArray(array_2d, x, y)
{
    if(x < 0 || x >= array_2d[0].length || y < 0 || y >= array_2d.length)
        return undefined;
    return array_2d[y][x];
}
