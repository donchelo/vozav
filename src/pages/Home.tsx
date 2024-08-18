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
  CardActions,
  Container,
  styled
} from '@mui/material';
import {
  Home as HomeIcon,
  Login as LoginIcon,
  Explore as ExploreIcon,
  Verified as VerifiedIcon,
  Group as GroupIcon,
  Map as MapIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

// Styled components for consistent styling
const StyledIcon = styled(Box)(({ theme }) => ({
  fontSize: 48,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

// Content items array
const contentItems = [
  {
    title: "Descubre y Confía",
    content: "Vozav es tu guía local para encontrar servicios de calidad, respaldados por la confianza de miles de usuarios. Descubre lo mejor de la ciudad con recomendaciones auténticas y personalizadas.",
    icon: ExploreIcon,
    color: 'primary'
  },
  {
    title: "Servicios Verificados a Tu Alcance",
    content: "Accede a una plataforma centralizada con los mejores servicios locales, verificados por nuestra comunidad. La calidad y la confianza, ahora en un solo lugar.",
    icon: VerifiedIcon,
    color: 'secondary'
  },
  {
    title: "Toma Decisiones Informadas",
    content: "Con Vozav, no pierdas tiempo buscando. Filtra, compara y elige los servicios que realmente necesitas, basándote en opiniones reales y detalladas.",
    icon: SecurityIcon,
    color: 'success'
  },
  {
    title: "Conéctate con Tu Comunidad",
    content: "Sé parte de una comunidad que comparte tus intereses. Descubre nuevos servicios, participa en eventos locales y contribuye con tus propias recomendaciones.",
    icon: GroupIcon,
    color: 'warning'
  },
  {
    title: "Encuentra Servicios Cercanos",
    content: "Localiza servicios de calidad cerca de ti con nuestra integración de mapas y geolocalización. La ciudad a tu alcance, donde quiera que estés.",
    icon: MapIcon,
    color: 'info'
  },
  {
    title: "Garantía de Autenticidad",
    content: "En Vozav, cada recomendación cuenta. Verificamos la autenticidad de usuarios y reseñas para ofrecerte una experiencia confiable y segura.",
    icon: SecurityIcon,
    color: 'error'
  }
] as const;

const Home: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Header */}
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
        <StyledIcon>
          <HomeIcon />
        </StyledIcon>
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

      {/* Main content */}
      <Grid container spacing={4}>
        {contentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <StyledCardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <item.icon sx={{ fontSize: 40, color: theme.palette[item.color].main }} />
                </Box>
                <Typography variant="h5" component="div" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>
              </StyledCardContent>
              <CardActions>
                <Button size="small" color={item.color}>
                  Saber más
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;