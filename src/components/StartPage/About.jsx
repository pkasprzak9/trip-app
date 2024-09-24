import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import styles from "../../style/components/StartPage/About.module.scss"

export default function About() {
  return (
    <section id="about" className={`${styles.about}`}>
      <Container fluid="md" className="mt-5">
        <div className="text-center">
          <h2 className="text-primary">About</h2>
          <p className="lead text-muted">  This app leverages advanced AI algorithms to create the best travel routes tailored specifically to your preferences. Whether you're seeking adventure, relaxation, or something in between, enjoy a personalized experience every time.</p>
        </div>
        <Row className="my-5 g-0 align-items-center justify-content-center  text-center">
          {/*First Column*/}
          <Col md="4">

          </Col>
        </Row>
      </Container>
    </section>
  )
}
