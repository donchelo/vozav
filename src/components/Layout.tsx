import React from 'react';
import { Box, Container } from '@mui/material';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        © {new Date().getFullYear()} Your App Name. All rights reserved.
      </Box>
    </Box>
  );
};

export default Layout;