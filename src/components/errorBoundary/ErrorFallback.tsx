import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface ErrorFallbackProps {
  error: Error | null;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={3}
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" paragraph>
        {error?.message || "An unexpected error occurred."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </Button>
    </Box>
  );
};

export default ErrorFallback;
