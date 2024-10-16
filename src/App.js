import StartPage from "./components/StartPage/StartPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/UserPanel/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StartPage/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Chroniona trasa */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
