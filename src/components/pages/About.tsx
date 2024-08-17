import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        About Vozav
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="body1" paragraph>
          Vozav is the leading platform for local service recommendations, transforming the way people discover and choose services in their city.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to connect users with quality local services through authentic and trustworthy recommendations from the community.
        </Typography>
        <Typography variant="body1">
          Join Vozav today and start discovering the best services your city has to offer!
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;