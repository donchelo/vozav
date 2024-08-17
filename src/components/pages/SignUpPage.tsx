import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SignUp from "../auth/SignUp";

const SignUpPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <SignUp />
        <Link component={RouterLink} to="/signin" variant="body2">
          {"Already have an account? Sign In"}
        </Link>
      </Box>
    </Container>
  );
};

export default SignUpPage;
