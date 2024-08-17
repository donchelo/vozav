import React from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    { id: 1, name: 'Plumbing', description: 'Expert plumbing services' },
    { id: 2, name: 'Electrician', description: 'Professional electrical work' },
    { id: 3, name: 'Cleaning', description: 'Top-notch cleaning services' },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Available Services
      </Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/services/${service.id}`}>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Services;