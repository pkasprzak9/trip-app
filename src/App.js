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
    <>
      {/* odpowiada za śledzenie url */}
      <Router>
        {/* definiuje trasy */}
        <Routes>
          {/* Publiczne trasy */}
          <Route path="/" element={<StartPage />} />
          {/* Tutaj można podpisać token i zapisać go w local storage */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Prywatne trasy */}
          <Route
            path="/dashboard/*"
            element={
              // sprawdzam czy jest token w local storage i jeśli tak to renderuje UserPanel
              <PrivateRoute>
                <UserPanel />
              </PrivateRoute>
            }
          >
            {/* zagnieżdżone strony w UserPanel */}
            <Route path="" element={<Dashboard />} />
            <Route path="new" element={<NewRouteForm />} />
            <Route path="display" element={<DisplayRoute />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
