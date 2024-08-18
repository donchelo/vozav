import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, Avatar, CircularProgress, Container } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase/config';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
}

const ProfileContent: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => (
  <Paper elevation={3} sx={{ p: 3, mt: 2, width: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
        {userProfile.name.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h5">{userProfile.name}</Typography>
    </Box>
    <Typography variant="body1" sx={{ mb: 1 }}>
      Email: {userProfile.email}
    </Typography>
    <Typography variant="body1">
      Joined: {new Date(userProfile.joinDate).toLocaleDateString()}
    </Typography>
  </Paper>
);

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrCreateUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        let profileData: UserProfile;

        if (userDocSnap.exists()) {
          const data = userDocSnap.data() as UserProfile;
          profileData = {
            name: data.name || user.displayName || 'Anonymous',
            email: data.email || user.email || 'No Email',
            joinDate: data.joinDate || user.metadata.creationTime || new Date().toISOString(),
          };
        } else {
          // Crear un nuevo perfil de usuario si no existe
          profileData = {
            name: user.displayName || 'Anonymous',
            email: user.email || 'No Email',
            joinDate: user.metadata.creationTime || new Date().toISOString(),
          };
          await setDoc(userDocRef, profileData);
        }

        setUserProfile(profileData);
      } catch (err) {
        console.error('Error fetching or creating user profile:', err);
        setError('Failed to load or create user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateUserProfile();
  }, [user]);

  return (
    <ErrorBoundary>
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">Error: {error}</Typography>
          ) : !userProfile ? (
            <Typography>Please sign in to view your profile.</Typography>
          ) : (
            <ProfileContent userProfile={userProfile} />
          )}
        </Box>
      </Container>
    </ErrorBoundary>
  );
};

export default Profile;
