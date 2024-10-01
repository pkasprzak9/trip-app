import React from "react";
import { Navbar, Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="secondary" sticky="top" className="py-3">
      <Container fluid="lg" className="justify-content-center">
        <Navbar.Brand href="#" className="fs-4 fw-bold text-primary text-center">Pathify</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

function LoginForm() {
  return (
    <div className="">
      <Container fluid="md" className="justify-content-center align-items-center py-5 mt-3">
        <div className="text-center px-5">
          <h2 className="display-5">Welcome Back!</h2>
          <p className="text-muted fs-3">Log in to explore your personalized travel routes and experiences.</p>
        </div>

        <Row className="mt-5 justify-content-center align-items-center">
          <Col xs="10" lg="6">
            <Form>
              {/* Email input with FloatingLabel */}
              <FloatingLabel controlId="formEmail" label="Email address" className="mb-4">
                <Form.Control type="email" placeholder="Email" required />
              </FloatingLabel>

              {/* Password input with FloatingLabel */}
              <FloatingLabel controlId="formPassword" label="Password" className="mb-4">
                <Form.Control type="password" placeholder="Password" required />
              </FloatingLabel>

              {/* Submit button */}
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Log In
              </Button>

              {/* Forgot Password description and link */}
              <div className="text-center">
                <p className="text-muted">Forgot your password?
                  <a href="#" className="text-primary text-decoration-none ms-2">Click here to reset it</a>.
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function Login() {
  return (
    <>
      <NavBar />
      <LoginForm />
    </>
  );
}
