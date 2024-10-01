import React from "react";
import { useState } from "react";
import { Container, Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: null,
    email: null,
    message: null
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const validateName = name => {
    if (!name.trim()) {
      return 'Name is required.'
    };
    return null;
  };

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

  const validateMessage = message => {
    if (!message.trim()) {
      return 'Your message cannot be empty.'
    };

    return null;
  };

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
      case 'name':
        error = validateName(formData.name);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'message':
        error = validateMessage(formData.message);
        break;
      default:
        break;
    }

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    setFormErrors({
      name: nameError,
      email: emailError,
      message: messageError
    });

    setTouched({
      name: true,
      email: true,
      message: true
    });

    if (nameError || emailError || messageError) {
      return;
    }

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    // FUTURE IMPLEMENTATION
    // const sendData = () => {

    // }

    setFormData({
      name: '',
      email: '',
      message: ''
    });

    setFormErrors({
      name: null,
      email: null,
      message: null
    });

    setTouched({
      name: false,
      email: false,
      message: false
    })
  }


  return (
    <section id="contact">
      <Container fluid="md" className="py-5">
        <div className="text-center px-5">
          <h2 className="text-primary">We’re Here for You</h2>
          <p className="lead text-muted">Whatever you need, we’re just a message away. Contact us for any inquiries or support.</p>
        </div>

        <Row className="justify-content-center align-items-center mt-5 py-5">
          <Col xs="10" lg="8" xl="6">
            <Form noValidate onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="name"
                label="Name"
                className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Mario"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid = {touched.name && !!formErrors.name}
                  isValid = {touched.name && !formErrors.name}
                  aria-invalid = {touched.name && !!formErrors.name}
                  aria-describedby="name-error"/>
                <Form.Control.Feedback
                  type="invalid"
                  id="name-error">
                    {formErrors.name}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="email"
                label="Email Address"
                className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!formErrors.email}
                  isValid={touched.email && !formErrors.email}
                  aria-invalid={touched.email && !!formErrors.email}
                  aria-describedby="email-error"/>
                <Form.Control.Feedback
                  type="invalid"
                  id="email-error">
                    {formErrors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="message"
                label="Your Message"
                className="mb-3">
                <Form.Control
                  as="textarea"
                  type="text"
                  name="message"
                  placeholder="Message"
                  style={{height: "200px"}}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.message && !!formErrors.message}
                  isValid={touched.message && !formErrors.message}
                  aria-invalid={touched.message && !!formErrors.message}
                  aria-describedby="message-error"/>
                <Form.Control.Feedback
                  type="invalid"
                  id="message-error">
                    {formErrors.message}
                </Form.Control.Feedback>
              </FloatingLabel>
              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit">
                  Send Message
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
