import React from "react";
import { Typography, Paper, Box, Avatar } from "@mui/material";

const Profile: React.FC = () => {
  // In a real app, you would fetch the user's profile data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2023-01-01",
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{user.name[0]}</Avatar>
          <Typography variant="h5">{user.name}</Typography>
        </Box>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Joined: {user.joinDate}</Typography>
      </Paper>
    </Box>
  );
};

export default Profile;
