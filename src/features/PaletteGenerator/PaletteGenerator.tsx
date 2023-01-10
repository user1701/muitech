import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React from 'react'
import PaletteItem from './components/PaletteItem';
import { ColorType, LikedType, PaletteType } from './types'

interface PaletteGeneratorProps {
    palette: PaletteType;
    liked: LikedType;
    onGenerateClick: () => void;
    onLikeClick: (idx: number) => () => void;
    onPrimaryClick: (color: ColorType) => () => void;
}

export const PaletteGenerator: React.FC<PaletteGeneratorProps> = ({
    palette,
    liked,
    onGenerateClick = () => { },
    onLikeClick,
    onPrimaryClick
}) => {
    return (
        <>
            <Stack direction='row' spacing={3}>
                {palette.map((color, idx) => <PaletteItem
                    color={color}
                    isLiked={liked[idx]}
                    onLikeClick={onLikeClick(idx)}
                    onPrimaryClick={onPrimaryClick(color)}
                    key={`${color}${idx}`}
                />)}
                <Button size='large' variant='contained' onClick={onGenerateClick}>
                    <Typography variant='button'>Generate</Typography>
                </Button>
            </Stack>
        </>
    )
}

export default PaletteGenerator