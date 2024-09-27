import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Gear, LightningCharge, Phone, Clock  } from "react-bootstrap-icons";

export default function Benefits() {
  return (
    <section id="benefits" className="bg-light">
      <Container fluid="md" className="py-5">
        <div className="text-center px-5">
          <h2 className="text-primary">Why Planning with Pathify Feels Different</h2>
          <p className="lead text-muted">
            Discover the key benefits that make your travel planning seamless and enjoyable.
          </p>
        </div>

        <Row className="align-items-stretch g-4 justify-content-center mt-5 py-5">
        <Col xs="10" lg="5" className="text-center">
            <LightningCharge aria-hidden="true" width={50} height={50} className="text-primary mb-3"></LightningCharge>
            <h3 className="text-primary">Speed</h3>
            <p>Plan your perfect route in seconds with the power of AI.</p>
          </Col>

          <Col xs="10" lg="5" className="text-center">
            <Gear aria-hidden="true" width={50} height={50} className="text-primary mb-3"></Gear>
            <h3 className="text-primary">Customization</h3>
            <p>Tailor your routes to fit your preferences any time you want.</p>
          </Col>

          <Col xs="10" lg="5" className="text-center">
            <Phone aria-hidden="true" width={50} height={50} className="text-primary mb-3"></Phone>
            <h3 className="text-primary">Always Accessible</h3>
            <p>Your routes and preferences are always available on your device, whenever you need them.</p>
          </Col>

          <Col xs="10" lg="5" className="text-center">
            <Clock aria-hidden="true" width={50} height={50} className="text-primary mb-3"></Clock>
            <h3 className="text-primary">Convenience</h3>
            <p>Plan and adjust your travels from anywhere, at any time.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
