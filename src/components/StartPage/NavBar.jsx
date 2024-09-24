import React from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="secondary" expand="lg">
      <Container fluid="lg">
        <Navbar.Brand href="#" className="fs-4 fw-bold text-primary">Pathify</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" style={{border: 'none'}}/>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title id="offcanvasNavbarLabel" className=" fw-bold fs-4 text-primary">Pathify</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column flex-lg-row">
            <Nav className="justify-content-center align-items-center gap-3 flex-grow-1 pe-3">
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#">Features</Nav.Link>
              <Nav.Link href="#">Pricing</Nav.Link>
            </Nav>
            <Nav className="d-flex flex-row justify-content-center align-items-center mb-5 mb-lg-0">
              <Nav.Link href="#" className=" me-3">Login</Nav.Link>
              <Button variant="primary">Sign Up</Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
