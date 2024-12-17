import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import headerImage from "../../assets/images/Travel-Agency-For-Traveling.svg";

export default function Header() {
  return (
    <div className="bg-secondary pt-lg-5 pb-5 pb-lg-0">
      <Container fluid="md py-5">
        <Row className="justify-content-center align-items-center py-5">
        <Col xs={10} lg={6} className="text-center text-lg-start">
            <h1 className="display-3 mb-3 text-primary">Discover Your Next Adventure</h1>
            <p className="display-5 text-muted">Personalized travel routes powered by AI to make your journey unforgettable.</p>
            <Button as="a" href="#about" size="lg" variant="outline-primary" className="mt-5 me-3">Learn More</Button>
            {/* Tutaj znowu jest LINK bo używam React Router do nawigowania między stronami */}
            <Button size="lg" className="mt-5" as={Link} to={"/register"}>Start Now</Button>
          </Col>
          {/* Na małych ekranach ukrywam grafikę (d-none) */}
          <Col xs="8" lg="6" className="d-none d-lg-block mb-5 mb-lg-0">
            <img src={headerImage} className="img-fluid" alt="Man standing in front of the earth globe with map in his hand" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
