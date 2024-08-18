import React, { useEffect, useState } from "react";
import { Typography, Paper, Box, Avatar, CircularProgress, Container } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
}

const centerBoxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 64px)",
};

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading, error: authError } = useAuth();

  const fetchUserProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      console.log("Fetching user profile for UID:", user.uid);
      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        console.log("User document exists");
        const userData = userSnap.data() as UserProfile;
        setUserProfile({
          name: userData.name || user.displayName || "Anonymous",
          email: userData.email || user.email || "No Email",
          joinDate: userData.joinDate || new Date().toISOString(),
        });
      } else {
        console.log("User document does not exist");
        setUserProfile({
          name: user.displayName || "Anonymous",
          email: user.email || "No Email",
          joinDate: user.metadata.creationTime || new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to fetch user profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchUserProfile();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={centerBoxStyle}>
          <CircularProgress />
          <Typography variant="body1">Loading your profile...</Typography>
        </Box>
      </Container>
    );
  }

  if (authError) {
    return (
      <Container maxWidth="sm">
        <Box sx={centerBoxStyle}>
          <Typography color="error">Authentication error: {authError.message}</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box sx={centerBoxStyle}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!user || !userProfile) {
    return (
      <Container maxWidth="sm">
        <Box sx={centerBoxStyle}>
          <Typography>Please sign in to view your profile.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="sm">
        <Box sx={{ ...centerBoxStyle, py: 4 }}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mt: 2, width: '100%' }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                {userProfile.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5">{userProfile.name}</Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>Email: {userProfile.email}</Typography>
            <Typography variant="body1">Joined: {new Date(userProfile.joinDate).toLocaleDateString()}</Typography>
          </Paper>
        </Box>
      </Container>
    </ErrorBoundary>
  );
};

export default Profile;