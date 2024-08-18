import React from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthButton: React.FC = () => {
  const { user, signIn, signOut } = useAuth();

  const handleAuth = async () => {
    if (user) {
      await signOut();
    } else {
      // Aquí deberías implementar la lógica para obtener email y password
      // Por ejemplo, podrías usar un estado local o un modal
      const email = "example@email.com";
      const password = "password123";
      try {
        await signIn(email, password);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  return (
    <button onClick={handleAuth}>
      {user ? 'Sign Out' : 'Sign In'}
    </button>
  );
};

export default AuthButton;