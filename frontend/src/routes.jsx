// src/routes.jsx
import React from 'react';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Reservations from './pages/Reservations';
import Customers from './pages/Customers';
import Layout from './components/layout/Layout';
import { useAuth } from './hooks/useAuth';

const Routes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Routes;