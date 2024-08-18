import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const value = { user, signIn, signOut, signInWithGoogle, initialized };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};