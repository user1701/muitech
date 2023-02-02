import React, { useEffect, useState, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { PaletteGenerator } from './features';
import { ColorHistory, ColorModeType, ColorType, HistoryType, usePaletteGenerator } from './features/PaletteGenerator';
import { isLight, randomHexColor } from './features/PaletteGenerator/helpers';
import { CssBaseline, Grid } from '@mui/material';

type ThemeModeType = ColorModeType;

const HISTORY_LENGTH = 5;
const PALETTE_LENGTH = 8;
const initialPrimaryColor = randomHexColor() as ColorType;
const initialMode = isLight(initialPrimaryColor);

export default function App() {
  const [mode, setMode] = useState<ThemeModeType>(initialMode);
  const [primaryColor, setPrimaryColor] = useState<ColorType>(initialPrimaryColor);
  const [history, setHistory] = useState<HistoryType>([]);

  const { palette, liked, handlers: { likeColor, generate } } = usePaletteGenerator(PALETTE_LENGTH);


  useEffect(() => {
    setMode(isLight(primaryColor));
  }, [primaryColor]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: primaryColor,
          }
        },
      }),
    [mode, primaryColor],
  );

  const handlePrimaryButtonClick = (color: ColorType) => {
    return () => {
      setPrimaryColor(color);
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory.unshift(color);

        return newHistory.slice(0, HISTORY_LENGTH);
      })
    }
  };


  const handleRemoveClick = (colorIndex: number) => {
    return () => {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory.splice(colorIndex, 1);

        return newHistory;
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Palette generator
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant='h4' gutterBottom>Palette</Typography>
              <PaletteGenerator
                palette={palette}
                liked={liked}
                onLikeClick={likeColor}
                onPrimaryClick={handlePrimaryButtonClick}
                onGenerateClick={generate}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant='h4' gutterBottom>Color history</Typography>
              <ColorHistory history={history} onPrimaryClick={handlePrimaryButtonClick} onRemoveClick={handleRemoveClick} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
