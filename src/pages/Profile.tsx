import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Avatar, 
  Button, 
  useTheme 
} from '@mui/material';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 4, 
          p: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={user?.photoURL || undefined}
            alt={user?.displayName || 'User avatar'}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h5" gutterBottom>
              Welcome, {user?.displayName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        {/* Enlace a QuestionManager */}
        <Box sx={{ mt: 4 }}>
          <Button 
            component={Link} 
            to="/question-manager" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ 
              width: '100%',
              textTransform: 'none',
              padding: '16px'
            }}
          >
            Go to Question Manager
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
