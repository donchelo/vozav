import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Avatar,
  useTheme
} from '@mui/material';

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
      </Paper>
    </Container>
  );
};

export default Profile;
