import StartPage from "./components/StartPage/StartPage";
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Strona Główna */}
        <Route path="/" element={<StartPage/>} />
        {/* Strona Rejestracji */}
        <Route path="/register" element={<Register />} />
        {/* Strona Logowania */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    // <>
    //   {/* <StartPage></StartPage> */}
    //   {/* <Login></Login> */}
    //   <Register></Register>
    // </>
  )
}

export default App;
