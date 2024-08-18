import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      {!user ? (
        <>
          <p>Not Authenticated</p>
          <Link to="/auth">Go to Auth Page</Link>
        </>
      ) : (
        <p>Welcome, {user.email}!</p>
      )}
    </div>
  );
};

export default Home;