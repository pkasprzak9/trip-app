import React from "react";
import { useState } from "react";
import { Container, Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

export default function Contact() {
  // Dane formularza
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Błędy walidacji
  const [formErrors, setFormErrors] = useState({
    name: null,
    email: null,
    message: null
  });

  // Czy użytkownik odwiedził pole
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  // Czy imię nie jest puste
  const validateName = name => {
    if (!name.trim()) {
      return 'Name is required.'
    };
    return null;
  };

  // Czy poprawna forma mail i czy nie puste (regex)
  const validateEmail = email => {
    if (!email.trim()) {
      return 'Email is required.'
    };

    const emailRegex = /\S+@\S+\.\S+/;  // regex
    if (!emailRegex.test(email)) {
      return 'Enter correct email address.'
    };

    return null;
  };

  // Czy wiadomość nie pusta
  const validateMessage = message => {
    if (!message.trim()) {
      return 'Your message cannot be empty.'
    };

    return null;
  };

  // aktualizacja stanów formularza
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // ustawienie pól jako dotknięte i ich walidacja
  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));

    let error = null;

    // walidacja pól
    // jeśli jest ok to zwraca wiadomość - error
    // jesli jest ok to zwraca null
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

    // aktualizuje stan z błędami
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }))
  };

  // obsługa submita
  const handleSubmit = (e) => {
    e.preventDefault();

    // walidacja pól
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    // ustawienie errorów jak są jakieś
    setFormErrors({
      name: nameError,
      email: emailError,
      message: messageError
    });

    // ustawienie pól jako dotknięte
    setTouched({
      name: true,
      email: true,
      message: true
    });

    // jak jest jakiś błąd to przerywamy (jak któreś z pól nie jest nulem)
    if (nameError || emailError || messageError) {
      return;
    }

    // Dane do wysłania
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    // FUTURE IMPLEMENTATION
    // const sendData = () => {

    // }

    // Reset formularza jak się wszystko powiedzie
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
        {/* NAGŁÓWEK SEKCJI */}
        <div className="text-center px-5">
          <h2 className="text-primary">We’re Here for You</h2>
          <p className="lead text-muted">Whatever you need, we’re just a message away. Contact us for any inquiries or support.</p>
        </div>

        <Row className="justify-content-center align-items-center mt-5 py-5">
          {/* 10/11 -> 8/11 -> 6/11 */}
          <Col xs="10" lg="8" xl="6">
            {/* noValidate: wyłącza domyślną walidację przeglądarki */}
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
                  onBlur={handleBlur} // uruchamia funkcję po opuszczeniu pola
                  isInvalid = {touched.name && !!formErrors.name} // na czerwono
                  isValid = {touched.name && !formErrors.name} // na zielono
                  aria-invalid = {touched.name && !!formErrors.name}
                  aria-describedby="name-error"/>
                {/* wyświetla komunikat z błędem w przypadku invalid */}
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
