import React from "react";
import { Accordion, Col, Container, Image, Row } from "react-bootstrap";
import aboutImage from "../../assets/images/Summer-Travel.svg";
import styles from "../../style/components/StartPage/About.module.scss";


export default function About() {
  return (
    <section id="about" className={`${styles.about} bg-light`}>
      <Container fluid="md" className="py-5">
        {/* NAGŁÓWEK SEKCJI */}
        <div className="text-center px-5">
          <h2 className="text-primary">Discover Pathify</h2>
          <p className="lead text-muted">Pathify leverages AI to create personalized travel routes, ensuring every trip is perfectly aligned with your preferences.</p>
        </div>
        {/* Na dużych ekranach druga kolumna (akordeon) jest wyświetlany obok pierwszej (obrazek). Na mniejszych obrazek zajmuje 10 kolumn, więc akordeon nie ma miejsce i jest wyświetlany pod spodem. */}
        <Row className="py-5 mt-5 align-items-center justify-content-evenly">
          {/* OBRAZEK */}
          <Col xs="10" lg="5" className="mb-5 mb-lg-0">
          {/* img-fluid: obrazek dostosowuje się do kontenera */}
            <Image src={aboutImage} className="img-fluid" alt="girl sitting on a beach enjoying the sun"></Image>
          </Col>
          {/* AKORDEON */}
          <Col lg="5">
          {/* defaultActiveKey: domyślnie otwarty element w akordeonie */}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>AI-Powered Routes</Accordion.Header>
                <Accordion.Body>
                  Unlock the potential of AI to find routes designed just for you. With Pathify, every trip becomes an adventure!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Personalized Experience</Accordion.Header>
                <Accordion.Body>
                  Enjoy personalized suggestions that match your unique preferences. Your perfect escape is only a tap away!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Global Destinations</Accordion.Header>
                <Accordion.Body>
                  Discover stunning destinations worldwide, with routes tailored just for you. Embark on an adventure designed to inspire!
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
