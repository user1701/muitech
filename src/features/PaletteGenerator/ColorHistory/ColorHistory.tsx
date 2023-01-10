import { Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import { HistoryType } from '../types'
import ColorHistoryItem from './ColorHistoryItem';

interface ColorHistoryProps {
    history: HistoryType;
    onRemoveClick: (colorIndex: number) => () => void;
}

export const ColorHistory: React.FC<ColorHistoryProps> = ({ history, onRemoveClick }) => {
    return (
        <Grid container spacing={2} sx={{ alignContent: 'center', flexWrap: 'wrap' }}>
            {
                history.length === 0 ?
                    (
                        <Grid item xs='auto'><Typography variant='h5'>history is empty</Typography></Grid>
                    ) : (
                        history.map((color, idx) => <Grid item xs='auto'><ColorHistoryItem key={`${idx}${color}`} color={color} onRemoveClick={onRemoveClick(idx)} /></Grid>)
                    )
            }
        </Grid>
    )
}

export default ColorHistory