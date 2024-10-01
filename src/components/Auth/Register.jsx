import React from "react";
import { Navbar, Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { Apple, Google } from "react-bootstrap-icons";

function NavBar() {
  return (
    <Navbar bg="secondary" className="py-3">
      <Container fluid="lg" className="justify-content-center">
        <Navbar.Brand href="#" className="fs-4 fw-bold text-primary text-center">Pathify</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

function RegisterForm() {
  return (
    <div className="">
      <Container fluid="md" className="justify-content-center align-items-center py-5 mt-3">
        <div className="text-center px-5">
          <h2 className="display-5">Join Pathify</h2>
          <p className="text-muted fs-3">Create your account to start planning your perfect trips.</p>
        </div>

        <Row className="mt-5 justify-content-center align-items-center">
          <Col xs="10" lg="6">
            <Form>
              {/* First Name input with FloatingLabel */}
              <FloatingLabel controlId="formFirstName" label="First Name" className="mb-4">
                <Form.Control type="text" placeholder="First Name" required />
              </FloatingLabel>

              {/* Last Name input with FloatingLabel */}
              <FloatingLabel controlId="formLastName" label="Last Name" className="mb-4">
                <Form.Control type="text" placeholder="Last Name" required />
              </FloatingLabel>

              {/* Email input with FloatingLabel */}
              <FloatingLabel controlId="formEmail" label="Email address" className="mb-4">
                <Form.Control type="email" placeholder="Email" required />
              </FloatingLabel>

              {/* Password input with FloatingLabel */}
              <FloatingLabel controlId="formPassword" label="Password" className="mb-4">
                <Form.Control type="password" placeholder="Password" required />
              </FloatingLabel>

              {/* Confirm Password input with FloatingLabel */}
              <FloatingLabel controlId="formConfirmPassword" label="Confirm Password" className="mb-4">
                <Form.Control type="password" placeholder="Confirm Password" required />
              </FloatingLabel>

              {/* Submit button */}
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function Register() {
  return (
    <>
      <NavBar />
      <RegisterForm />
    </>
  );
}
