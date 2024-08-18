import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthButton from '../components/AuthButton';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Is Authenticated</p>
      <p>Welcome, {user?.email}!</p>
      <AuthButton />
    </div>
  );
};

export default Dashboard;