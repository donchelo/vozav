import React from 'react';
import { Typography, Box, Button, styled, alpha } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../hooks/useAuth';
import LoginIcon from '@mui/icons-material/Login';
import logo2 from '../components/assets/logo2.png';  // Importa la imagen

// Estilos para el Hero Section
const HeroSectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default, // Usamos el color de fondo oscuro del tema
  color: theme.palette.secondary.main, // Texto en color contrastante
  padding: theme.spacing(4, 2), // Reducimos el padding superior
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}));

const HeroLogo = styled('img')(({ theme }) => ({
  width: 300, // Tamaño del logo
  height: 300,
  maxWidth: '100%',
  maxHeight: '100%',
  margin: 0, // Sin margen superior e inferior
  padding: 0, // Aseguramos que no haya padding adicional
}));

const HeroSection: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <HeroSectionWrapper>
      <HeroLogo src={logo2} alt="Vozav Logo" />
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              </Typography>
      <Typography variant="h6" paragraph>
        Tu plataforma líder de recomendaciones de servicios locales
      </Typography>
      {user ? (
        <>
          <Typography variant="h6" gutterBottom>
            Bienvenido de nuevo, {user.email}!
          </Typography>
          <Button
            component={RouterLink}
            to="/profile"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              bgcolor: 'common.white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: alpha(theme.palette.common.white, 0.9),
              },
            }}
          >
            Ir al Perfil
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" paragraph>
            Inicia sesión para acceder a tu perfil y descubrir los mejores servicios locales.
          </Typography>
          <Button
            component={RouterLink}
            to="/auth"
            variant="outlined"
            size="large"
            startIcon={<LoginIcon />}
            sx={{
              mt: 2,
              borderColor: 'common.white',
              color: 'common.white',
              '&:hover': {
                bgcolor: alpha(theme.palette.common.white, 0.1),
                borderColor: 'common.white',
              },
            }}
          >
            Iniciar Sesión
          </Button>
        </>
      )}
    </HeroSectionWrapper>
  );
};

export default HeroSection;
