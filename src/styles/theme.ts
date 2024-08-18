// src/styles/theme.ts

import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',  // Configura el modo oscuro
    background: {
      default: '#121212',  // Un tono oscuro para el fondo, como casi negro
      paper: '#1E1E1E',  // Un color ligeramente más claro para los elementos tipo "paper" o superficies
    },
    primary: {
      main: '#90CAF9',  // Un azul claro que se ve bien en un fondo oscuro
      contrastText: '#FFFFFF',  // Texto en color blanco para contrastar
    },
    secondary: {
      main: '#F48FB1',  // Un rosa claro para el contraste
      contrastText: '#FFFFFF',  // Texto en color blanco para contrastar
    },
    text: {
      primary: '#FFFFFF',  // Texto principal en blanco
      secondary: '#B0BEC5',  // Texto secundario en un gris claro
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#FFFFFF',  // Asegúrate de que el texto H1 sea blanco para que contraste en el fondo oscuro
    },
    // Puedes personalizar más opciones de tipografía aquí
  },
  // Puedes añadir más configuraciones del tema como overrides, spacing, etc.
};

const theme = createTheme(themeOptions);

export default theme;
