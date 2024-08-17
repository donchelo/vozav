import React, { useEffect, useState } from "react";
import { Typography, Paper, Box, Avatar, CircularProgress } from "@mui/material";
import { getCurrentUser } from "../services/firebaseService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseApp";

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const userDoc = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDoc);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
              name: userData.name || currentUser.displayName || "Anonymous",
              email: userData.email || currentUser.email || "No Email",
              joinDate: userData.joinDate || "Unknown",
            });
          } else {
            console.error("No such document!");
            setError("User data not found.");
          }
        } else {
          console.error("No user is authenticated");
          setError("No user is authenticated.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
            {user?.name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5">{user?.name}</Typography>
        </Box>
        <Typography variant="body1">Email: {user?.email}</Typography>
        <Typography variant="body1">Joined: {user?.joinDate}</Typography>
      </Paper>
    </Box>
  );
};

export default Profile;
