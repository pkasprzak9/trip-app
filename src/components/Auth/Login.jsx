import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="secondary" sticky="top" className="py-3">
      <Container fluid="lg" className="justify-content-center">
        <Navbar.Brand as={Link} to={"/"} className="fs-4 fw-bold text-primary text-center">Pathify</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false
  })

  const validateEmail = email => {
    if (!email.trim()) {
      return 'Email is required.'
    };

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return 'Enter correct email address.'
    };

    return null;
  };

  const validatePassword = password => {
    if (!password.trim()) {
      return 'Password is required.';
    };
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));

    let error = null;

    switch(name) {
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
      default:
        break;
    }

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setFormErrors({
      email: emailError,
      password: passwordError
    });

    setTouched({
      email: true,
      password: true
    });

    if (emailError || passwordError) {
      return;
    };

    const dataToSend = {
      email: formData.email,
      password: formData.password
    };

    // HERE GOES THE BACKEND LOGIC
    // NEED A METHOD G+FOR CHECKING IF EMAIL ALREADY EXISTS AND THE STRENGTH OF PASSWORD

    setFormData({
      email: '',
      password: ''
    });

    setFormErrors({
      email: null,
      password: null
    });

    setTouched({
      email: false,
      password: false
    });
  };

  return (
    <div className="">
      <Container fluid="md" className="justify-content-center align-items-center py-5 mt-3">
        <div className="text-center px-5">
          <h2 className="display-5">Welcome Back!</h2>
          <p className="text-muted fs-3">Log in to explore your personalized travel routes and experiences.</p>
        </div>

        <Row className="mt-5 justify-content-center align-items-center">
          <Col xs="10" lg="6">
            <Form noValidate onSubmit={handleSubmit}>
              {/* Email input with FloatingLabel */}
              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!formErrors.email}
                  isValid={touched.email && !formErrors.email}
                  aria-invalid={touched.email && !!formData.email}
                  aria-describedby="email-error"/>
                <Form.Control.Feedback
                  type="invalid"
                  id="email-error">
                  {formErrors.email}
                </Form.Control.Feedback>
              </FloatingLabel>

              {/* Password input with FloatingLabel */}
              <FloatingLabel
                controlId="formPassword"
                label="Password"
                className="mb-4">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}/>
                <Form.Control.Feedback
                  type="invalid"
                  id="password-error">
                  {formErrors.password}
                </Form.Control.Feedback>
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
