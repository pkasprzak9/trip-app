// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import UserPanel from "./components/UserPanel/UserPanel";
import Dashboard from "./components/UserPanel/Dashboard";
import NewRouteForm from "./components/UserPanel/NewRouteForm";
import DisplayRoute from "./components/UserPanel/DisplayRoute";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<StartPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Private routes with layout */}
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <UserPanel />
                </PrivateRoute>
              }
            >
              {/* Nested routes inside UserPanel */}
              <Route path="" element={<Dashboard />} />
              <Route path="new" element={<NewRouteForm />} />
              <Route path="display" element={<DisplayRoute />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
