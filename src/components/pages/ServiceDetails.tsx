import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Paper } from "@mui/material";

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch the service details based on the id
  const service = {
    name: "Sample Service",
    description: "This is a detailed description of the sample service.",
    rating: 4.5,
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {service.name}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="body1" paragraph>
          {service.description}
        </Typography>
        <Typography variant="h6">Rating: {service.rating} / 5</Typography>
      </Paper>
    </Box>
  );
};

export default ServiceDetails;
