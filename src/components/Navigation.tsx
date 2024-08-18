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
import theme from '../styles/theme'; // Asegúrate de importar el theme

// Contenidos de about y contact
const aboutContent = `En vozav, creemos en el poder del voz a voz digital...`; // (agrega el contenido completo)
const contactContent = `En vozav, valoramos cada palabra que viene de nuestra comunidad...`; // (agrega el contenido completo)

const Navigation: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', action: () => handleDialogOpen(aboutContent, 'About vozav') },
    { text: 'Contact', action: () => handleDialogOpen(contactContent, 'Contact Us') },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: 'background.paper', height: '100%' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
        vozav
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Button
              onClick={item.action || (() => {})}
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

  return (
    <>
      <AppBar position="static" color="primary" elevation={0}>
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
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={item.action}
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
          )}
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
          {drawer}
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
          <Typography id="dialog-description" style={{ whiteSpace: 'pre-line', color: 'text.primary' }}>
            {dialogContent}
          </Typography>
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
