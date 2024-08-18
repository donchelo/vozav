import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AuthButton from './AuthButton';
import LogoAvatar from './LogoAvatar';
import ReactMarkdown from 'react-markdown';

// Definimos la interfaz para los elementos de navegación
interface NavItem {
  text: string;
  path?: string;
  action?: () => void;
}

// Contenido de about en formato Markdown
const aboutContent = `
# Acerca de Vozav

## Nuestra Misión

Vozav transforma el descubrimiento de servicios locales, llevando el poder del "voz a voz" al mundo digital. Conectamos a residentes y turistas con los mejores servicios de la ciudad a través de recomendaciones auténticas y confiables.

## ¿Qué nos hace únicos?

1. **Recomendaciones Verificadas**: Experiencias reales y confiables.
2. **Personalización Inteligente**: Sugerencias adaptadas a tus preferencias.
3. **Comunidad de Confianza**: Una red local activa y comprometida.

## Beneficios

- Ahorra tiempo encontrando servicios confiables.
- Toma decisiones informadas basadas en experiencias reales.
- Descubre nuevas experiencias locales de calidad.
- Conéctate con tu comunidad y contribuye a su crecimiento.

Vozav no es solo una plataforma, es un ecosistema donde la confianza, la comunidad y la innovación se unen para mejorar tu vida cotidiana.

**Vozav: Descubre, Comparte, Confía.**
`;

const Navigation: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const navItems: NavItem[] = [
    { text: 'Home', path: '/' },
    { text: 'About', action: () => handleDialogOpen(aboutContent, 'About Vozav') }
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDialogOpen = (content: string, title: string) => {
    setDialogContent(content);
    setDialogTitle(title);
    setDialogOpen(true);
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.action) {
      item.action();
    }
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const renderDrawerContent = () => (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: 'background.paper', height: '100%' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
        vozav
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Button
              onClick={() => handleNavItemClick(item)}
              component={item.path ? RouterLink : 'button'}
              to={item.path}
              sx={{ 
                textAlign: 'center', 
                width: '100%', 
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                },
              }}
            >
              <ListItemText primary={item.text} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderNavButtons = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {navItems.map((item) => (
        <Button
          key={item.text}
          color="inherit"
          onClick={() => handleNavItemClick(item)}
          component={item.path ? RouterLink : 'button'}
          to={item.path}
          sx={{
            mx: 1,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {item.text}
        </Button>
      ))}
      <AuthButton />
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.secondary.main }} elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoAvatar />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            vozav
          </Typography>
          <Typography variant="subtitle2" sx={{ display: { xs: 'none', sm: 'block' }, mr: 2, fontStyle: 'italic' }}>
            El poder del voz a voz
          </Typography>
          {!isMobile && renderNavButtons()}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {renderDrawerContent()}
        </Drawer>
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle id="dialog-title" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent dividers>
          <ReactMarkdown>{dialogContent}</ReactMarkdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navigation;
