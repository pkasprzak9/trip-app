// src/components/Dashboard.jsx
import React, { useContext } from "react";
import NavBar from "./NavBar";
import { UserContext } from "../../context/UserContext";

export default function Dashboard() {
  const { userData } = useContext(UserContext);

  console.log(userData);
  return (
    <>
    <NavBar>
    </NavBar>
    <div className="text-center mt-5">
      <h1>Hello {userData.firstName} {userData.lastName}</h1>
      <h1>You're logged in!</h1>
    </div>
    </>
  );
}
