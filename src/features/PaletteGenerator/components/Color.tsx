import { Typography, Box } from '@mui/material';
import React from 'react'
import { ColorType } from '../types'

interface ColorProps {
    code: ColorType;
}

export const Color: React.FC<ColorProps> = ({ code }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ width: 80, height: 80, backgroundColor: code }} />
            <Typography variant='body1'>{code}</Typography>
        </Box>
    )
}

export default React.memo(Color)