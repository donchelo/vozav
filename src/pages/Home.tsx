import React, { useState } from 'react';
import {
  Typography, Box, Button, Paper, useTheme, Grid, Container, styled, alpha
} from '@mui/material';
import {
  Home as HomeIcon, Login as LoginIcon, Explore as ExploreIcon, Verified as VerifiedIcon,
  Group as GroupIcon, Map as MapIcon, Security as SecurityIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FeatureDialog from '../components/FeatureDialog';
import featuresData from '../data/features.json';

// Definición de iconos
const iconMapping = {
  ExploreIcon, VerifiedIcon, SecurityIcon, GroupIcon, MapIcon, HomeIcon
};

// Estilos personalizados
const StyledIcon = styled(Box)(({ theme }) => ({
  fontSize: 64,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
}));

const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(6, 4),
  color: theme.palette.common.white,
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const Home: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<typeof featuresData[0] | null>(null);

  const handleOpenDialog = (feature: typeof featuresData[0]) => {
    setSelectedFeature(feature);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedFeature(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Hero Section */}
      <GradientBox>
        <StyledIcon>
          <HomeIcon fontSize="inherit" />
        </StyledIcon>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Bienvenido a Vozav
        </Typography>
        <Typography variant="h5" paragraph>
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
      </GradientBox>

      {/* Features Grid */}
      <Grid container spacing={4}>
        {featuresData.map((item, index) => {
          const IconComponent = iconMapping[item.icon as keyof typeof iconMapping];
          const color = theme.palette[item.color as keyof typeof theme.palette];
          const colorMain = typeof color === 'object' && color !== null && 'main' in color ? color.main : undefined;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard onClick={() => handleOpenDialog(item)} elevation={3}>
                <IconComponent sx={{ fontSize: 48, color: colorMain || theme.palette.text.primary, mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom align="center">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {item.content}
                </Typography>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Feature Dialog */}
      {selectedFeature && (
        <FeatureDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          title={selectedFeature.title}
          content={selectedFeature.content}
          detailedContent={selectedFeature.detailedContent}
          Icon={iconMapping[selectedFeature.icon as keyof typeof iconMapping]}
        />
      )}
    </Container>
  );
};

export default Home;