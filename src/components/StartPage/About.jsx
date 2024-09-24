import React from "react";
import { Container, Row, Col, Accordion, Image } from "react-bootstrap";
import styles from "../../style/components/StartPage/About.module.scss"
import aboutImage from "../../assets/images/Summer-Travel.svg";


export default function About() {
  return (
    <section id="about" className={`${styles.about} py-5`}>
      <Container fluid="md" className="mt-5 py-5">
        <div className="text-center px-5">
          <h2 className="text-primary">Discover Pathify</h2>
          <p className="lead text-muted">Pathify uses AI to craft personalized travel routes, ensuring your journey matches your preferences.</p>
        </div>
        <Row className="py-5 my-5 align-items-center justify-content-evenly">
          <Col xs="10" lg="5">
            <Image src={aboutImage} className="img-fluid"></Image>
          </Col>
          <Col lg="5">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>AI-Powered Routes</Accordion.Header>
                <Accordion.Body>
                  Our app uses state-of-the-art AI to craft routes tailored to your preferences.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Personalized Experience</Accordion.Header>
                <Accordion.Body>
                  Enjoy a unique travel experience designed just for you, based on your tastes.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Global Destinations</Accordion.Header>
                <Accordion.Body>
                  Discover destinations across the globe with routes optimized for your journey.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
