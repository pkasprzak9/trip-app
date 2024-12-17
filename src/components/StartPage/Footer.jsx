import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Instagram, TwitterX, Tiktok } from "react-bootstrap-icons";

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <Container fluid="md">
        {/* SOCIALE */}
        <Row className="justify-content-center align-items-center">
          <Col xs="10" lg="6" className="text-center mt-3">
            <a href="" className="icon-link text-primary" aria-label="Facebook">
              <Facebook className="mx-3"></Facebook>
            </a>
            <a href="" className="icon-link text-primary" aria-label="Instagram">
              <Instagram className="mx-3"></Instagram>
            </a>
            <a href="" className="icon-link text-primary" aria-label="TwitterX">
              <TwitterX className="mx-3"></TwitterX>
            </a>
            <a href="" className="icon-link text-primary" aria-label="Tiktok">
              <Tiktok className="mx-3"></Tiktok>
            </a>
          </Col>
        </Row>
        {/* znak wodny czy jak to tam */}
        <Row className="justify-content-center align-items-center">
          <Col xs="10" lg="6" className="text-center mt-2 text-primary">
            <p>&copy; {new Date().getFullYear()} Pathify. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
