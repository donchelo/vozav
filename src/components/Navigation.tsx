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
import logo4 from '../components/assets/logo4.png';  // Import the logo

// Navigation items interface
interface NavItem {
  text: string;
  path?: string;
  action?: () => void;
}

// About content in Markdown format
const aboutContent = `
# About Vozav

## Our Mission

Vozav transforms the discovery of local services, bringing the power of word-of-mouth to the digital world. We connect residents and tourists with the best services in the city through authentic and trustworthy recommendations.

## What Makes Us Unique?

1. **Verified Recommendations**: Real, trustworthy experiences.
2. **Smart Personalization**: Suggestions tailored to your preferences.
3. **Trusted Community**: An active, engaged local network.

## Benefits

- Save time finding reliable services.
- Make informed decisions based on real experiences.
- Discover new, quality local experiences.
- Connect with your community and contribute to its growth.

Vozav is not just a platform, it's an ecosystem where trust, community, and innovation come together to improve your everyday life.

**Vozav: Discover, Share, Trust.**
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
      <Box sx={{ my: 2 }}>
        <img src={logo4} alt="Vozav Logo" style={{ height: '20px', paddingTop: '10px' }} /> {/* Top padding added */}
      </Box>
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
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo4} alt="Vozav Logo" style={{ height: '20px', paddingTop: '8px' }} /> {/* Top padding added */}
          </Box>
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
