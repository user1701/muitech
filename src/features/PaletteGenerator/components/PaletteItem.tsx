import React from 'react'
import { Button } from '@mui/material';
import Color from './Color';

import { ColorType } from '../types'
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Stack } from '@mui/system';

interface PaletteItemProps {
    color: ColorType;
    isLiked: boolean;
    onPrimaryClick: () => void;
    onLikeClick: () => void;
}

export const PaletteItem: React.FC<PaletteItemProps> = ({ color, isLiked = false, onPrimaryClick, onLikeClick }) => {
    return (
        <div>
            <Color code={color} />
            <Stack direction='column'>
                <Button variant='outlined' onClick={onLikeClick} sx={{ width: 80 }}>
                    {isLiked ? <Favorite /> : <FavoriteBorder />}
                </Button>
                <Button variant='contained' onClick={onPrimaryClick} sx={{ width: 80 }}>
                    Primary
                </Button>
            </Stack>
        </div>
    )
}

export default PaletteItem