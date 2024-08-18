import React, { useState } from "react";
import { TextField, Button, Box, Alert, CircularProgress, Typography } from "@mui/material";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../services/firebaseService"; // Importar la función de Google

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerUser(email, password);
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      setError("Error signing up. Please try again.");
      console.error("Error signing up:", error);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle(); // Llamar a la función de Google Sign-In
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      setError("Error signing in with Google. Please try again.");
      console.error("Error signing in with Google:", error);
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
      <Typography align="center" sx={{ mt: 2 }}>Or</Typography>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign in with Google"}
      </Button>
    </Box>
  );
};

export default SignUp;
