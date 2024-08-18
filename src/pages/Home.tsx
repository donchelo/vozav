import React, { useState } from 'react';
import {
  Typography, Box, Paper, Grid, Container, styled
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FeatureDialog from '../components/FeatureDialog';
import featuresData from '../data/features.json';
import HeroSection from '../components/HeroSection'; // Importa el nuevo componente HeroSection

// Definición de iconos
import {
  Explore as ExploreIcon, Verified as VerifiedIcon, Security as SecurityIcon,
  Group as GroupIcon, Map as MapIcon, Home as HomeIcon
} from '@mui/icons-material';

const iconMapping = {
  ExploreIcon, VerifiedIcon, SecurityIcon, GroupIcon, MapIcon, HomeIcon
};

// Estilos personalizados
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

const Home: React.FC = () => {
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
    <Container maxWidth="lg" sx={{ mt: -4, mb: 4 }}>
      {/* Hero Section */}
      <HeroSection />

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
