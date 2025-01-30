import React, { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Modal, ModalHeader, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

<NavBar />
// Główny komponent
function RegisterForm() {
  // Każde miejsce z formularza rejestracji ma swoje miejsce w formData
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Każde miejsce z formularza ma swoje błędy (ustawione początkowo na null)
  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null
  });

  // Każde miejsce z formularza ma swój stan sprawdzający czy użytkownik opuścił pole (początkowo false)
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  // feedbackMessage → Wyświetla komunikaty (np. błąd rejestracji)
  // showModal → Pokazuje lub ukrywa modal z komunikatem
  // isSubmitting → Zapobiega wielokrotnemu wysyłaniu formularza
  // sUserLoaded → Wskazuje, czy użytkownik jest już zalogowany (przekierowanie na dashboard)
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // Obsługuje nawigację po walidacji
  const navigate = useNavigate();

  // METODY WALIDUJĄCE POLA FORMULARZA
  // KAŻDE Z PÓL ZWRACA NULL W PRZYPADKU UDANEJ WALIDACJI
  // ALBO WIADOMOŚĆ Z BŁĘDEM W PRZYPADKU NIEUDANEJ WALIDACJI
  // walidacja imienia
  const validateFirstName = (name) => {
    if(!name.trim()) {
      return "First Name is required.";
    };
    return null;
  };

  // walidacja nazwiska
  const validateLastName = (name) => {
    if(!name.trim()) {
      return "Last Name is required.";
    };
    return null;
  };

  // walidacja maila
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

  // walidacja hasła
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

  // walidacja potwierdzenia hasła
  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword.trim()) {
      return "Confirm password is required.";
    };
    if (confirmPassword !== password) {
      return "Passwords do not match.";
    };
    return null;
  };

  // Aktualizuje stan formData w miarę wpisywania danych
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // oznacza pole jako "dotknięte" w touched kiedy użytkownik je opuści
  // oraz waliduje wtedy każde z pól
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

  // OBSŁUGA WYSYŁANIA FORMULARZA
  const handleSubmit = async (e) => {
    // Zapobiega przeładowaniu strony po wysłaniu formularza
    e.preventDefault();

    // Zapobiega wielokrotnemu wysyłaniu
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Ponowne sprawdzanie (gdyby ktoś kliknął przed
    // dotknięciem któregokolwiek z pól) wszystkich pól przed wysłaniem
    // jeśli walidacja jest ok, to przypisywany jest null, a jeśli
    // nie jest ok, to string z błędem
    const firstNameError = validateFirstName(formData.firstName);
    const lastNameError = validateLastName(formData.lastName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

    // ustawia stan z błędami
    setFormErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    // jeśli chociaż jedna zmienna w formErrors nie jest nullem to
    // formularz nie jest wysyłany
    if (Object.values(formErrors).some(error => error !== null)) {
      return;
    };

    // KOMUNIKACJA Z BACKENDEM
    try {
      // pobiera dane z formularza do wysłania
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      }

      // wysyłanie żądania na serwer
      const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      // obsługa błędów serwera
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Failed to register');
      };

      // zapisywanie tokenu i danych użytkownika w localstorage
      // i ustawianie isUserLoaded na true
      const data = await response.json();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsUserLoaded(true);

      // Resetowanie formularza po udanej rejestracji
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
    }
    // obsługa błędów
    catch (err) {
      console.log(`${err}`);
      setFeedbackMessage(err.message); // to się będzie wyświetlało w modalu
      setShowModal(true); // pokazuje modal z komunikatem o błędzie
    };
    // ustawia flagę na false, gdyby użytkownik chciał wysłać ponownie formularz w przyszłości
    setIsSubmitting(false);
  };

  // Przekierowuje na dashboard po udanej rejestracji
  useEffect(() => {
    if (isUserLoaded) {
      navigate("/dashboard");
      setIsUserLoaded(false);
    }
  }, [isUserLoaded, navigate]);

  // zwracanie głównego komponentu
  return (
    <Container fluid="md" className="justify-content-center align-items-center py-5 mt-5">
      {/* NAGŁÓWEK */}
      <div className="text-center px-5">
        <h2 className="display-5">Join Pathify</h2>
        <p className="text-muted fs-3">Create your account to start planning your perfect trips.</p>
      </div>

      {/* FORMULARZ */}
      <Row className="mt-5 justify-content-center align-items-center">
        <Col xs="10" lg="6">
          <Form noValidate onSubmit={handleSubmit}>
            {/* Pole z pierwszym imieniem */}
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

            {/* Pole z drugim imieniem */}
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

            {/* Pole z hasłem */}
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

            {/* Pole z potwierdzeniem hasła  */}
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

            {/* przycisk submit */}
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign Up
            </Button>

            {/* link do logowania */}
            <div className="text-center mt-3">
              <Link to={"/login"}>Already have an account?</Link>
            </div>
          </Form>

          {/* MODAL */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <ModalHeader closeButton className="bg-secondary">
              <Modal.Title>
                Registration Status
              </Modal.Title>
            </ModalHeader>
            <Modal.Body>
              {feedbackMessage}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

// EKSPORT KOMPONENTU
export default function Register() {
  return (
    <>
      <NavBar />
      <RegisterForm/>
    </>
  );
}
