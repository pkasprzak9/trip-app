import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import headerImage from "../../assets/images/Travel-Agency-For-Traveling.svg";
import styles from "../../style/components/StartPage/Header.module.scss"

export default function Header() {
  return (
    <div className="bg-secondary py-5 pb-lg-0">
      <Container fluid="md py-5">
        <Row className="justify-content-center align-items-center py-5 px-1">
          <Col lg="6" className="text-center text-lg-start">
            <h1>
              <div className="display-3 mb-3 text-primary">Discover Your Next Adventure</div>
              <div className="display-5 text-muted">
              Personalized travel routes powered by AI to make your journey unforgettable.
              </div>
            </h1>
            <Button size="lg" variant="outline-primary" className="mt-5 me-3">Learn More</Button>
            <Button size="lg" className="mt-5">Start Now</Button>
          </Col>
          <Col lg="6" className="d-none d-lg-block">
            <img src={headerImage} className="img-fluid" alt="" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
