import React from 'react';
import { Navigate } from 'react-router-dom';

// Sprawdzenie czy użytkownik jest zalogowany. Flaga o zalogowaniu jest w local storage. W przyszłości można pomyśleć o wykorzystaniu tokena.
export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/login" />;
}
