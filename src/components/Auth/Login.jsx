import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import NavBar from "./NavBar";

// GŁÓWNA FUNKCJA
function LoginForm() {

  // STAN FORMULARZA
  // Przechowuje wartości pól
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  // Przechowuje błędy walidacji
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null
  })

  // Śledzi czy pole było kliknięte
  const [touched, setTouched] = useState({
    email: false,
    password: false
  })


  // feedbackMessage -> komunikat o błędzie lub sukcesie
  // isSubmitting -> zapobiega wielokrotnemu kliknięciu w submit
  // flaga do przekierowania po udanym logowaniu
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // do przekierowania po udanym logowaniu
  const navigate = useNavigate();


  // FUNKCJE WALIDACJI
  // walidacja maila
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

  // walidacja hasła
  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required.";
    }
    return null;
  };

  // OBSŁUGA ZMIAN W FORMULARZU
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // OBSŁUGA BLUR
  // (wyjście z pola) w formularzu
  // razem z walidacją po opuszczeniu
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));

    // walidacja, która zwraca wiadomość z błędem albo null
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

    // aktualizuje stan z błędami o ewentualne nowe
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }))
  }

  // OBSŁUGA WYSŁANIA FORMULARZA
  const handleSubmit = async (e) => {
    // blokuje domyślne odświeżenie strony po wysłaniu
    e.preventDefault();

    // zapobiega wielokrotnemu wysłaniu tych samych danych
    if (isSubmitting) return;
    setIsSubmitting(true);

    // walidacja przed wysłaniem (blur może nie obsłużyć jak użytkownik nie odwiedzi żadnego z pól formularza)
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

    // jak są błędy to formularz nie zostaje wysłany
    if (Object.values(formErrors).some(error => error !== null)) {
      return;
    };

    try {
      // pobieranie danych z formularza do wysłania
      const dataToSend = {
        email: formData.email,
        password: formData.password
      };

      // wysyłanie żądania na serwer
      const response = await fetch('http://localhost:5001/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      // obsługa błędów serwera
      if (!response.ok) {
        const responseData = await response.json();
        setFeedbackMessage(responseData.message || 'Login failed. Please try again.');
      };

      // zapisywanie użytkownika z odpowiedzi
      // zmiana flagi na zalogowanego
      // ustawianie isUserLoaded na true
      const data = await response.json();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsUserLoaded(true);

      // Resetowanie formularza po udanym logowaniu
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
      setFeedbackMessage('');

    }
    // obsługa błędów
    catch(err) {
      console.log(err);
      setFeedbackMessage('An error occurred. Please try again later.');
    }
    // ustawia flagę na false, gdyby użytkownik chciał wysłać ponownie formularz w przyszłości
    setIsSubmitting(false);
  };

  // przekierowuje na dashboard po udanym logowaniu
  useEffect(() => {
    if(isUserLoaded) {
      navigate('/dashboard');
      setIsUserLoaded(false);
    }
  }, [isUserLoaded, navigate]);


  // zwracanie głównego komponentu
  return (
    <div className="">
      <Container fluid="md" className="justify-content-center align-items-center py-5 mt-3">
        {/* NAGŁÓWEK */}
        <div className="text-center px-5">
          <h2 className="display-5">Welcome Back!</h2>
          <p className="text-muted fs-3">Log in to explore your personalized travel routes and experiences.</p>
        </div>

        {/* FORMULARZ */}
        <Row className="mt-5 justify-content-center align-items-center">
          <Col xs="10" lg="6">
            <Form noValidate onSubmit={handleSubmit}>
              {/* POLE Z MAILEM */}
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

              {/* POLE Z HASŁEM */}
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

              {/* PRZYCISK SUBMIT*/}
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Log In
              </Button>

              {/* SEKCJA ZAPOMNIAŁEM HASŁA (FUNKCJONALNOŚĆ DO ZAIMPLEMENTOWANIA) */}
              <div className="text-center">
                <p className="text-muted">Forgot your password?
                  <a href="#" className="text-primary text-decoration-none ms-2">Click here to reset it</a>.
                </p>
              </div>

              {/* WIADOMOŚĆ Z FEEDBACKIEM (MOŻNA POMYŚLEĆ O MODALU TAK JAK W REJESTRACJI) */}
              {feedbackMessage && (
                <div className="text-danger text-center my-3">
                  {feedbackMessage}
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// EKSPORT FUNKCJI
export default function Login() {
  return (
    <>
      <NavBar />
      <LoginForm />
    </>
  );
}
