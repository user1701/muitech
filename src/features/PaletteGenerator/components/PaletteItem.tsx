import React from 'react'
import { Button, ButtonProps } from '@mui/material';
import Color from './Color';

import { ColorType } from '../types'
import { Stack } from '@mui/system';

interface ActionItem {
    variant: ButtonProps['variant'],
    handler: () => void,
    content: JSX.Element | string
}

interface PaletteItemProps {
    color: ColorType;
    actions: ActionItem[] | undefined
    keyModifier?: string;
}

export const PaletteItem: React.FC<PaletteItemProps> = ({ color, actions, keyModifier = 'btn' }) => {
    return (
        <div>
            <Color code={color} />
            {Boolean(actions?.length) && (
                <Stack direction='column'>
                    {actions?.map(({ variant, handler, content }, idx) => <Button key={`${color}${keyModifier}${idx}`} variant={variant} onClick={handler} sx={{ width: 80, marginBottom: 1 }}>
                        {content}
                    </Button>)}
                </Stack>)}
        </div>
    )
}

export default PaletteItem