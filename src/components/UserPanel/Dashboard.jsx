// src/components/UserPanel/Dashboard.jsx
import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dashboardImage from "../../assets/images/Men-planning-for-holiday.svg"; // Replace with your image path

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const firstName = user?.firstName || 'User';
  const lastName = user?.lastName || '';

  return (
    <Container className="mt-5 text-center">
      <Row className="align-items-center">
        {/* Image Section */}
        <Col md={6} className="mb-4 mb-md-0">
          <Image
            src={dashboardImage} // Replace with your own image source
            alt="Dashboard Illustration"
            fluid
            rounded
          />
        </Col>

        {/* Welcome Section */}
        <Col md={6}>
          <h2>Welcome, {firstName} {lastName}!</h2>
          <p>Ready to create a new route tailored to your interests?</p>
          <Button
            variant="primary"
            onClick={() => navigate('/dashboard/new')}
            size="lg"
          >
            Generate New Route
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
