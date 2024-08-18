  import React from 'react';
  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import { ThemeProvider, CssBaseline } from '@mui/material';
  import { createTheme } from '@mui/material/styles';
  import Layout from './components/common/Layout';
  import Home from './components/pages/Home';
  import Profile from './components/pages/Profile';
  import SignInPage from './components/pages/SignInPage';
  import SignUpPage from './components/pages/SignUpPage';
  import About from './components/pages/About';
  import Services from './components/pages/Services';
  import ServiceDetails from './components/pages/ServiceDetails';
  import AuthWrapper from './components/auth/AuthWrapper';
  import { AuthProvider } from './components/context/AuthContext';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const App: React.FC = () => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              <Route
                path="*"
                element={
                  <AuthWrapper>
                    <Layout>
                      <Routes>
                        <Route index element={<Home />} />
                        <Route path="services" element={<Services />} />
                        <Route path="services/:id" element={<ServiceDetails />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="about" element={<About />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Layout>
                  </AuthWrapper>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    );
  };

  export default App;