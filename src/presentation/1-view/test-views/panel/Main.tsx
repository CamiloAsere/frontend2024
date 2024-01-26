import React from 'react';
import AdminApp from './App';
import { AdminProvider } from './AdminProvider';

const AdminContext = () => (
  <AdminProvider>
    <AdminApp />
  </AdminProvider>
);
export default  AdminContext;