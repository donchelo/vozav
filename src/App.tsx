import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import AppRoutes from './routes';
import LoadingScreen from './components/LoadingScreen';
import theme from './styles/theme';  // Importa el tema desde el archivo separado

const AppContent: React.FC = () => {
  const { initialized } = useAuth();

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </ThemeProvider>
);

export default App;
