import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Typography, 
  Box, 
  Button, 
  Paper,
  useTheme,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { Home as HomeIcon, Login as LoginIcon, Explore as ExploreIcon, Verified as VerifiedIcon, Group as GroupIcon, Map as MapIcon, Security as SecurityIcon } from '@mui/icons-material';

const Home: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  // Define los elementos de contenido
  const contentItems = [
    {
      title: "Descubre y Confía",
      content: "Vozav es tu guía local para encontrar servicios de calidad, respaldados por la confianza de miles de usuarios. Descubre lo mejor de la ciudad con recomendaciones auténticas y personalizadas.",
      icon: <ExploreIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Servicios Verificados a Tu Alcance",
      content: "Accede a una plataforma centralizada con los mejores servicios locales, verificados por nuestra comunidad. La calidad y la confianza, ahora en un solo lugar.",
      icon: <VerifiedIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
    },
    {
      title: "Toma Decisiones Informadas",
      content: "Con Vozav, no pierdas tiempo buscando. Filtra, compara y elige los servicios que realmente necesitas, basándote en opiniones reales y detalladas.",
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
    },
    {
      title: "Conéctate con Tu Comunidad",
      content: "Sé parte de una comunidad que comparte tus intereses. Descubre nuevos servicios, participa en eventos locales y contribuye con tus propias recomendaciones.",
      icon: <GroupIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
    },
    {
      title: "Encuentra Servicios Cercanos",
      content: "Localiza servicios de calidad cerca de ti con nuestra integración de mapas y geolocalización. La ciudad a tu alcance, donde quiera que estés.",
      icon: <MapIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />
    },
    {
      title: "Garantía de Autenticidad",
      content: "En Vozav, cada recomendación cuenta. Verificamos la autenticidad de usuarios y reseñas para ofrecerte una experiencia confiable y segura.",
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, mt: 8, px: 4 }}>
      {/* Encabezado */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
          mb: 4
        }}
      >
        <HomeIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
        <Typography component="h1" variant="h4" gutterBottom>
          Bienvenido a Vozav
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Tu plataforma líder de recomendaciones de servicios locales
        </Typography>
        {user ? (
          <>
            <Typography variant="h6" gutterBottom>
              Bienvenido de nuevo, {user.email}!
            </Typography>
            <Button
              component={RouterLink}
              to="/dashboard"
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
            >
              Ir al Dashboard
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Inicia sesión para acceder a tu dashboard y descubrir los mejores servicios locales.
            </Typography>
            <Button
              component={RouterLink}
              to="/auth"
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              sx={{ mt: 2 }}
            >
              Iniciar Sesión
            </Button>
          </>
        )}
      </Paper>

      {/* Contenido principal */}
      <Grid container spacing={4}>
        {contentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card raised>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" component="div" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Saber más
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;