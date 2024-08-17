import React, { useState } from "react";
import { TextField, Button, Box, Alert, CircularProgress, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { signInWithGoogle } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/profile"); // O la ruta que desees después del inicio de sesión
    } catch (error) {
      setError("Error signing in. Please check your credentials and try again.");
      console.error("Error signing in:", error);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      setLoading(false);
      navigate("/profile"); // O la ruta que desees después del inicio de sesión con Google
    } catch (error) {
      setError("Error signing in with Google. Please try again.");
      console.error("Error signing in with Google:", error);
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
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
        autoComplete="current-password"
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
        {loading ? <CircularProgress size={24} /> : "Sign In"}
      </Button>
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

export default SignIn;
