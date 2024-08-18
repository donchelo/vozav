import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Typography, 
  Box, 
  Button, 
  Paper,
  useTheme
} from '@mui/material';
import { Home as HomeIcon, Login as LoginIcon } from '@mui/icons-material';

const Home: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        mt: 8, 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper
      }}
    >
      <HomeIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
      <Typography component="h1" variant="h4" gutterBottom>
        Welcome to Our App
      </Typography>
      <Box sx={{ mt: 2 }}>
        {user ? (
          <>
            <Typography variant="h6" gutterBottom>
              Welcome back, {user.email}!
            </Typography>
            <Button
              component={RouterLink}
              to="/dashboard"
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
            >
              Go to Dashboard
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Please sign in to access your dashboard.
            </Typography>
            <Button
              component={RouterLink}
              to="/auth"
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              sx={{ mt: 2 }}
            >
              Go to Sign In
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default Home;