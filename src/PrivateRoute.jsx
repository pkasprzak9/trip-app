import React from 'react';
import { Navigate } from 'react-router-dom';

// Jeśli jest token w local storage to zwracam UserPanel (children), jeśli nie to do strony z logowaniem
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}
