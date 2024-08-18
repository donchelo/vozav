import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme
} from '@mui/material';
import { Dashboard as DashboardIcon, Person as PersonIcon, Assessment as AssessmentIcon, Settings as SettingsIcon } from '@mui/icons-material';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, content }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
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
          mt: 4, 
          p: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DashboardIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Typography component="h1" variant="h4">
              Dashboard
            </Typography>
          </Box>
        
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={user?.photoURL || undefined}
            alt={user?.displayName || 'User avatar'}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h5" gutterBottom>
              Welcome, {user?.displayName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
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
              icon={<SettingsIcon color="action" />} 
              content="Manage your account settings and preferences."
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;