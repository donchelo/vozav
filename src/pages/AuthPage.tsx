import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Button, 
  CircularProgress,
  Container,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const AuthPage = () => {
  const [loading, setLoading] = React.useState(false);
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google authentication failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign In
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          disabled={loading}
          sx={{ 
            py: 1.5,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in with Google'}
        </Button>
      </Paper>
    </Container>
  );
};

export default AuthPage;