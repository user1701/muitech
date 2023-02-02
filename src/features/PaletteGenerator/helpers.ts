import { ColorModeType, ColorType, LikedType, PaletteType } from './types';

// Detect mode based on color brightness
export function isLight(color: ColorType): ColorModeType {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 0 + 2), 16);
    const g = parseInt(hex.substring(2, 2 + 2), 16);
    const b = parseInt(hex.substring(4, 4 + 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 155 ? 'light' : 'dark';
}

// Generate random hex color
export function randomHexColor() {
    return (
        '#' +
        ((Math.random() * 0xffffff) << 0)
            .toString(16)
            .padStart(6, '0')
            .toUpperCase()
    );
}

// Generate random hex color with array
export function randomHexColorWithArray(arrayLength: number) {
    if (arrayLength === undefined) return [];

    const randomArray = [];
    for (let x = 0; x < arrayLength; x++) {
        const hexColor = randomHexColor();
        randomArray.push(hexColor);
    }
    return randomArray;
}

// Generate new colors for not liked ones
export function generatePalette(
    palette: PaletteType,
    liked: LikedType
): PaletteType {
    if (liked.every((like) => like === true)) {
        return palette;
    }

    return palette.map((color, idx) =>
        liked[idx] ? color : randomHexColor()
    ) as PaletteType;
}
