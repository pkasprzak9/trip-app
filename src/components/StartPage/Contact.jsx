import React from "react";
import { Container, Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

export default function Contact() {
  return (
    <section id="contact">
      <Container fluid="md" className="py-5">
        <div className="text-center px-5">
          <h2 className="text-primary">We’re Here for You</h2>
          <p className="lead text-muted">Whatever you need, we’re just a message away. Contact us for any inquiries or support.</p>
        </div>

        <Row className="justify-content-center align-items-center mt-5 py-5">
          <Col xs="10" lg="8" xl="6">
            <Form>
              <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3">
                <Form.Control type="email" name="email" placeholder="name@example.com" required>
                </Form.Control>
              </FloatingLabel>
              <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                <Form.Control type="text" name="name" placeholder="Mario" required>
                </Form.Control>
              </FloatingLabel>
              <FloatingLabel controlId="floatingMessage" label="Your Message" className="mb-3">
                <Form.Control as="textarea" type="text" name="message" placeholder="Message" style={{height: "200px"}} required>
                </Form.Control>
              </FloatingLabel>
              <div className="text-center">
                <Button variant="primary" type="submit">
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
