import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'
import Color from '../components/Color';
import { ColorType } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';

interface ColorHistoryItemProps {
    color: ColorType;
    onRemoveClick: () => void;
}

export const ColorHistoryItem: React.FC<ColorHistoryItemProps> = ({
    color,
    onRemoveClick
}) => {
    return (
        <div style={{ width: 80 }}>
            <Color code={color} />
            <Stack direction='column'>
                <Button variant='outlined' onClick={onRemoveClick} sx={{ width: 80 }}>
                    <DeleteIcon />
                </Button>
            </Stack>
        </div>
    )
}

export default ColorHistoryItem