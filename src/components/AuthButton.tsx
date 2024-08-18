import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  CircularProgress 
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const AuthButton: React.FC = () => {
  const { user, signIn, signInWithGoogle, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      if (user) {
        await signOut();
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError('Google authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleAuth}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Sign Out'}
      </Button>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, margin: 'auto' }}>
      <TextField 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        label="Email" 
        variant="outlined"
        fullWidth
      />
      <TextField 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        label="Password" 
        variant="outlined"
        fullWidth
      />
      <Button 
        variant="contained" 
        onClick={handleAuth}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
      <Button 
        variant="outlined" 
        onClick={handleGoogleAuth}
        disabled={loading}
        startIcon={<GoogleIcon />}
        fullWidth
      >
        Sign In with Google
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AuthButton;