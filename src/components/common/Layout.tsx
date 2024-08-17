// src/components/common/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Vozav
          </Typography>
          <Box component="nav">
            <Link to="/services" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Services</Link>
            <Link to="/profile" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Profile</Link>
            <Link to="/about" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>About</Link>
          </Box>
          {/* Botón de Sign In */}
          <Button color="inherit" onClick={handleSignIn}>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Vozav. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
