import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SignIn from "../auth/SignIn";

const SignInPage: React.FC = () => {
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
          Sign in
        </Typography>
        <SignIn />
        <Link component={RouterLink} to="/signup" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </Container>
  );
};

export default SignInPage;
