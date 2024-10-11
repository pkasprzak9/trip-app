import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";
import styles from '../../style/components/StartPage/NavBar.module.scss';

export default function NavBar() {
  // Zarządzanie stanem widoczności offcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <Navbar bg="secondary" expand="lg" sticky="top">
      <Container fluid="lg">

        {/* NAVBAR BRAND */}
        <Navbar.Brand href="#" className="fs-4 fw-bold text-primary">Pathify</Navbar.Brand>

        {/* NAVBAR TOGGLE BUTTON */}
        <Navbar.Toggle
          aria-label="Toggle navigation"
          aria-controls="offcanvasNavbar"
          style={{ border: 'none' }}
          onClick={handleShowOffcanvas} // Pokazuje offcanvas po kliknięciu
        />

        {/* OFFCANVAS */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          role="dialog"
          className={styles.offcanvasBackground}
          show={showOffcanvas} // Kontroluje widoczność offcanvas
          onHide={handleCloseOffcanvas} // Zamknięcie offcanvas
        >
          {/* OFFCANVAS HEADER */}
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title id="offcanvasNavbarLabel" className="fw-bold fs-4 text-primary">Pathify</Offcanvas.Title>
          </Offcanvas.Header>

          {/* OFFCANVAS BODY */}
          <Offcanvas.Body className={`d-flex flex-column flex-lg-row ${styles.offcanvasContent}`}>
            <Nav className="justify-content-center align-items-center gap-3 flex-grow-1">
              <Nav.Link
                href="#about"
                aria-label="Learn more about Pathify"
                className={styles.navLink}
                onClick={handleCloseOffcanvas} // Zamknięcie offcanvas po kliknięciu
              >
                About
              </Nav.Link>
              <Nav.Link
                href="#howItWorks"
                aria-label="Learn how it works"
                className={styles.navLink}
                onClick={handleCloseOffcanvas}
              >
                How It Works
              </Nav.Link>
              <Nav.Link
                href="#benefits"
                aria-label="Find out why us"
                className={styles.navLink}
                onClick={handleCloseOffcanvas}
              >
                Why Us
              </Nav.Link>
            </Nav>
            <Nav className="d-flex flex-row justify-content-center align-items-center mb-5 mb-lg-0">
              <Nav.Link
                as={Link}
                to={"/login"}
                href="#"
                className={`me-3 text-decoration-underline ${styles.navLink}`}
                aria-role="button"
                aria-label="Login"
                onClick={handleCloseOffcanvas}
              >
                Login
              </Nav.Link>
              <Button
                as={Link}
                to={"/register"}
                variant="primary"
                aria-label="Sign up"
                className={styles.navButton}
                onClick={handleCloseOffcanvas}
              >
                Sign Up
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
