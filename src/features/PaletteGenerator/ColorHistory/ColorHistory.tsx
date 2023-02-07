import { Grid, Typography } from '@mui/material';
import React from 'react'
import { ColorType, HistoryType } from '../types'
import ColorItem from '../components/PaletteItem';
import DeleteIcon from '@mui/icons-material/Delete';

interface ColorHistoryProps {
    history: HistoryType;
    onPrimaryClick: (color: ColorType) => () => void;
    onRemoveClick: (colorIndex: number) => () => void;
}

export const ColorHistory: React.FC<ColorHistoryProps> = ({ history, onPrimaryClick, onRemoveClick }) => {
    return (
        <Grid container spacing={2} sx={{ alignContent: 'center', flexWrap: 'wrap' }}>
            {
                history.length === 0 ?
                    (
                        <Grid item xs='auto'><Typography variant='h5'>history is empty</Typography></Grid>
                    ) : (
                        history.map((color, idx) => <Grid key={`history${idx}${color}`} item xs='auto'>
                            <ColorItem keyModifier="history" color={color} actions={[{
                                variant: 'contained',
                                handler: onPrimaryClick(color),
                                content: 'primary'
                            }, {
                                variant: 'outlined',
                                handler: onRemoveClick(idx),
                                content: <DeleteIcon />

                            }
                            ]} />
                        </Grid>)
                    )
            }
        </Grid>
    )
}

export default ColorHistory