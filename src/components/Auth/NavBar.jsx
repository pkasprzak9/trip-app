import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="secondary" sticky="top" className="py-3">
      <Container fluid="lg" className="justify-content-center">
        <Navbar.Brand as={Link} to={"/"} className="fs-4 fw-bold text-primary text-center">Pathify</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
