import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { AuthProvider } from "./components/context/AuthContext";
import AuthWrapper from "./components/auth/AuthWrapper";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

// Importaciones de componentes
import Layout from "./components/common/Layout";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import ServiceDetails from "./components/pages/SeviceDetails";
import Profile from "./components/pages/Profile";
import About from "./components/pages/About";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";

// Definición del tema personalizado
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
};

const theme = createTheme(themeOptions);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
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
                        <Route
                          path="services/:id"
                          element={<ServiceDetails />}
                        />
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
    </ErrorBoundary>
  );
};

export default App;