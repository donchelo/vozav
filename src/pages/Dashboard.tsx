import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthButton from '../components/AuthButton';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { Dashboard as DashboardIcon, Person as PersonIcon, Assessment as AssessmentIcon } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  const DashboardCard = ({ title, icon, content }: { title: string, icon: React.ReactNode, content: string }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 8, 
          p: 4, 
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <DashboardIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
          <Typography component="h1" variant="h4">
            Dashboard
          </Typography>
        </Box>
        <Typography variant="h6" gutterBottom>
          Welcome, {user?.email}!
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard 
              title="Profile" 
              icon={<PersonIcon color="primary" />} 
              content="View and edit your profile information."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard 
              title="Analytics" 
              icon={<AssessmentIcon color="secondary" />} 
              content="Check your latest statistics and performance metrics."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard 
              title="Settings" 
              icon={<DashboardIcon color="action" />} 
              content="Manage your account settings and preferences."
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <AuthButton />
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;