import React, { useState } from 'react';
import { generatePalette, randomHexColorWithArray } from '../helpers';
import { LikedType, PaletteType } from '../types';

export function usePaletteGenerator(paletteLength: number) {
    const initialLiked = Array(paletteLength).fill(false);
    const initialPalette = randomHexColorWithArray(
        paletteLength
    ) as PaletteType;

    const [palette, setPalette] = useState<PaletteType>(initialPalette);
    /**
     * liked is the mask for palette,
     * it's an array of boolean values
     * which indicates what array element should not be changed
     * if the mask value is true then return current color otherwise generate new one
     **/
    const [liked, setLiked] = useState<LikedType>(initialLiked);

    function generate() {
        setPalette(generatePalette(palette, liked));
    }

    function likeColor(colorIndex: number) {
        return () => {
            if (colorIndex === undefined) {
                console.warn(`likeColor: color index is undefined`);
                return;
            }

            if (colorIndex > paletteLength) {
                console.warn(`likeColor: wrong colorIndex(${colorIndex})`);
                return;
            }

            setLiked((prevLiked) => {
                const newLiked = [...prevLiked];
                newLiked[colorIndex] = !liked[colorIndex];

                return newLiked;
            });
        };
    }

    return {
        palette,
        liked,
        handlers: {
            generate,
            likeColor,
        },
    };
}
