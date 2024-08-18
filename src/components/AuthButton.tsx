import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button, CircularProgress } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const AuthButton = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (user) {
        await signOut();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleAuth}
      disabled={loading}
      startIcon={!user && <GoogleIcon />}
      sx={{ minWidth: 200 }}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : user ? (
        'Sign Out'
      ) : (
        'Sign In with Google'
      )}
    </Button>
  );
};

export default AuthButton;