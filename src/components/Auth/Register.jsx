import React, { useState } from "react";
import { Navbar, Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const validateFirstName = (name) => {
    if(!name.trim()) {
      return "First Name is required.";
    };
    return null;
  };

  const validateLastName = (name) => {
    if(!name.trim()) {
      return "Last Name is required.";
    };
    return null;
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required.";
    };

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return "Enter a valid email address.";
    };
    return null;
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required."
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be minimum 8 characters long."
    };
    return null;
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword.trim()) {
      return "Confirm password is required.";
    };
    if (confirmPassword !== password) {
      return "Passwords do not match.";
    };
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }));

    let error = null;
    switch (name) {
      case 'firstName':
        error = validateFirstName(formData.firstName);
        break;
      case 'lastName':
        error = validateLastName(formData.lastName);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.confirmPassword, formData.password);
        break;
      default:
        break;
    };

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  // Form Submit Validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstNameError = validateFirstName(formData.firstName);
    const lastNameError = validateLastName(formData.lastName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

    setFormErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    if (Object.values(formErrors).some(error => error !== null)) {
      return;
    };

    try {
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      }

      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      };

      const data = await response.json();
      console.log(`User registered: ${data}`);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      setFormErrors({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null
      });

      setTouched({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    };
  };

  return (
    <div className="">
      <Container fluid="md" className="justify-content-center align-items-center py-5 mt-3">
        <div className="text-center px-5">
          <h2 className="display-5">Join Pathify</h2>
          <p className="text-muted fs-3">Create your account to start planning your perfect trips.</p>
        </div>

        <Row className="mt-5 justify-content-center align-items-center">
          <Col xs="10" lg="6">
            <Form noValidate onSubmit={handleSubmit}>
              {/* First Name input with FloatingLabel */}
              <FloatingLabel
                controlId="formFirstName"
                label="First Name"
                className="mb-4">
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.firstName && !!formErrors.firstName}
                  isValid={touched.firstName && !formErrors.firstName}/>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.firstName}
                  </Form.Control.Feedback>
              </FloatingLabel>

              {/* Last Name input with FloatingLabel */}
              <FloatingLabel
                controlId="formLastName"
                label="Last Name"
                className="mb-4">
                <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.lastName && !!formErrors.lastName}
                isValid={touched.lastName && !formErrors.lastName}/>
                <Form.Control.Feedback type="invalid">
                  {formErrors.lastName}
                </Form.Control.Feedback>
              </FloatingLabel>

              {/* Email input with FloatingLabel */}
              <FloatingLabel
                controlId="formEmail"
                label="Email address"
                className="mb-4">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!formErrors.email}
                  isValid={touched.email && !formErrors.email}/>
                  <Form.Control.Feedback type="invalid">
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
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!formErrors.password}
                  isValid={touched.password && !formErrors.password}/>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                  </Form.Control.Feedback>
              </FloatingLabel>

              {/* Confirm Password input with FloatingLabel */}
              <FloatingLabel
                controlId="formConfirmPassword"
                label="Confirm Password"
                className="mb-4">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.confirmPassword && !!formErrors.confirmPassword}
                  isValid={touched.confirmPassword && !formErrors.confirmPassword}/>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.confirmPassword}
                  </Form.Control.Feedback>
              </FloatingLabel>

              {/* Submit button */}
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Sign Up
              </Button>

              <div className="text-center mt-3">
                <a href="">Already have an account?</a>
              </div>
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
