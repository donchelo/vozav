import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Vozav
      </Typography>
      <Typography variant="h5" gutterBottom>
        Discover the best local services through authentic recommendations
      </Typography>
      <Button component={Link} to="/services" variant="contained" color="primary" sx={{ mt: 2 }}>
        Explore Services
      </Button>
    </Box>
  );
};

export default Home;