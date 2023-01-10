import React, { useEffect, useState, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { PaletteGenerator } from './features';
import { ColorHistory, ColorModeType, ColorType, HistoryType } from './features/PaletteGenerator';
import { generatePalette, isLightColor, randomHexColor, randomHexColorWithArray } from './features/PaletteGenerator/helpers';
import { CssBaseline, Grid } from '@mui/material';

type ThemeModeType = ColorModeType;
type PaletteType = ColorType[];
type LikedType = boolean[];

const HISTORY_LENGTH = 5;
const PALETTE_LENGTH = 8;
const initialLiked = Array(PALETTE_LENGTH).fill(false);
const initialPalette = randomHexColorWithArray(PALETTE_LENGTH) as PaletteType;
const initialPrimaryColor = randomHexColor() as ColorType;
const initialMode = isLightColor(initialPrimaryColor);

export default function App() {
  const [mode, setMode] = useState<ThemeModeType>(initialMode);
  const [primaryColor, setPrimaryColor] = useState<ColorType>(initialPrimaryColor);
  const [palette, setPalette] = useState<PaletteType>(initialPalette);
  const [liked, setLiked] = useState<LikedType>(initialLiked);
  const [history, setHistory] = useState<HistoryType>([]);


  useEffect(() => {
    setMode(isLightColor(primaryColor));
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

  const handleLikeButtonClick = (colorIndex: number) => {
    return () => {
      setLiked((prevLiked) => {
        const newLiked = [...prevLiked];
        newLiked[colorIndex] = !liked[colorIndex];

        return newLiked;
      });
    }

  };

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

  const handleGeneratePaletteClick = () => {
    setPalette(generatePalette(palette, liked));
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
                onLikeClick={handleLikeButtonClick}
                onPrimaryClick={handlePrimaryButtonClick}
                onGenerateClick={handleGeneratePaletteClick}
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
