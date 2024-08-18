import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;