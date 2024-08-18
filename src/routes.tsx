import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';
import QuestionManager from './pages/QuestionManager';  // Importar QuestionManager
import PrivateRoute from './components/PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/question-manager"
        element={
          <PrivateRoute>
            <QuestionManager />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
