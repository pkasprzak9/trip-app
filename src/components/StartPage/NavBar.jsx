import React from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="secondary" expand="lg" sticky="top">
      <Container fluid="lg">

        {/* NAVBAR BRAND NAME */}
        <Navbar.Brand href="#" className="fs-4 fw-bold text-primary">Pathify</Navbar.Brand>

        {/* NAVBAR TOGGLE BUTTON */}
        <Navbar.Toggle
          aria-label="Toggle navigation"
          aria-controls="offcanvasNavbar"
          style={{border: 'none'}}
        />

        {/* OFFCANVAS */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          role="dialog"
        >
          {/* OFFCANVAS HEADER */}
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title id="offcanvasNavbarLabel" className=" fw-bold fs-4 text-primary">Pathify</Offcanvas.Title>
          </Offcanvas.Header>

          {/* OFFCANVAS BODY */}
          <Offcanvas.Body className="d-flex flex-column flex-lg-row">
            <Nav className="justify-content-center align-items-center gap-3 flex-grow-1">
              <Nav.Link href="#about" aria-label="Learn more about Pathify">About</Nav.Link>
              <Nav.Link href="#howItWorks" aria-label="Learn how it works">How It Works</Nav.Link>
              <Nav.Link href="#benefits" aria-label="find out why us">Why Us</Nav.Link>
            </Nav>
            <Nav className="d-flex flex-row justify-content-center align-items-center mb-5 mb-lg-0">
              <Nav.Link href="#" className=" me-3 text-decoration-underline" aria-label="Login">Login</Nav.Link>
              <Button variant="primary" aria-label="Sign up">Sign Up</Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
