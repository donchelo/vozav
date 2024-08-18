import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthButton: React.FC = () => {
  const { user, signIn, signInWithGoogle, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (user) {
      await signOut();
    } else {
      try {
        await signIn(email, password);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  if (user) {
    return <button onClick={handleAuth}>Sign Out</button>;
  }

  return (
    <div>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleAuth}>Sign In</button>
      <button onClick={handleGoogleAuth}>Sign In with Google</button>
    </div>
  );
};

export default AuthButton;