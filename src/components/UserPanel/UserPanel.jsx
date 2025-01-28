import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Container } from "react-bootstrap";

export default function UserPanel() {
  return (
    <>
      <NavBar />
      <Container className="mt-5">
        {/* Generowanie podstron UserPanel Outletem (tego co pisałeś w App.js) */}
        <Outlet />
      </Container>
    </>
  );
}
