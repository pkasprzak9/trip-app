import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import img1 from "../../assets/images/Intercontinental-transportation.svg"
import img2 from "../../assets/images/Delivery-location.svg"
import img3 from "../../assets/images/Men-planning-for-holiday.svg"
import img4 from "../../assets/images/Museum-Photography.svg"

export default function Features() {
  return (
    <section id="features">
      <Container fluid="md" className="py-5">
        <div className="text-center px-5">
          <h2 className="text-primary">Your Journey Awaits</h2>
          <p className="lead text-muted">
            Experience personalized travel like never before with Pathify's smart recommendations and tailored routes.
          </p>
        </div>

        <Row className="align-items-stretch g-5 g-lg-3 justify-content-center mt-5 py-5">
          <Col xs="8" lg="4" xl="3">
            <Card className="h-100">
              <Card.Img variant="top" src={img1} className="bg-light"/>
              <Card.Body>
                <Card.Title>Personalized Route Creation</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Craft your perfect journey effortlessly.</Card.Subtitle>
                <Card.Text>Quickly get a personalized route that matches your travel preferences.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="8" lg="4" xl="3">
            <Card className="h-100">
              <Card.Img variant="top" src={img2} className="bg-light"/>
              <Card.Body>
                <Card.Title>Map Generation</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Navigate your adventures with ease.</Card.Subtitle>
                <Card.Text>View your route on maps, making planning and navigation easier.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="8" lg="4" xl="3">
            <Card className="h-100">
              <Card.Img variant="top" src={img3} className="bg-light"/>
              <Card.Body>
                <Card.Title>Save Preferences for Future Trips</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Travel smarter with saved choices.</Card.Subtitle>
                <Card.Text>Save your preferences to travel even more easily and quickly in the future.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="8" lg="4" xl="3">
            <Card className="h-100">
              <Card.Img variant="top" src={img4} className="bg-light"/>
              <Card.Body>
                <Card.Title>Nearby Recommendations</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Uncover hidden gems on your journey.</Card.Subtitle>
                <Card.Text>Discover nearby places and attractions that can enrich your travel experience.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}