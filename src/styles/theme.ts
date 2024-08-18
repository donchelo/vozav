// src/styles/theme.ts

import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#232222',  // Pantone 2735 C
    },
    secondary: {
      main: '#F8C2CB',  // Pantone 699 C
    },
    background: {
      default: '#FFFFFF',  // Blanco
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    // Puedes personalizar más opciones de tipografía aquí
  },
  // Puedes añadir más configuraciones del tema como overrides, spacing, etc.
};

const theme = createTheme(themeOptions);

export default theme;
