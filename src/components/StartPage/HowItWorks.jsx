import React from "react";
import { Row, Col, Carousel, Container } from "react-bootstrap";
import firstImage from "../../assets/images/Approved-Visa.svg";
import secondImage from "../../assets/images/Chat-Bot.svg";
import thirdImage from "../../assets/images/Delivery-location.svg";
import fourthImage from "../../assets/images/Outer-space.svg";

export default function HowItWorks() {
  return (
    <section id="howItWorks" className="bg-light">
      <Container fluid="md" className="py-5">
        <div className="text-center px-5">
          <h2 className="text-primary">The Future of Travel Planning</h2>
          <p className="lead text-muted">Explore How AI Simplifies Travel, Making It All About You</p>
        </div>

        <Row className="justify-content-center align-items-center py-5 mt-5">
          <Col lg="6">
            <Carousel>
              <Carousel.Item interval={4000} className="text-center px-5">
                <img src={firstImage} alt="" className="img-fluid px-5" />
                <h3 className="heading display-5">Set Your Preferences</h3>
                <p className="lead mb-5 text-muted">
                  Input your location, budget, and travel style, and we’ll handle the rest!
                </p>
              </Carousel.Item>
              <Carousel.Item interval={4000} className="text-center px-5">
                <img src={secondImage} alt="" className="img-fluid px-5" />
                <h3 className="heading display-5">AI Route Creation</h3>
                <p className="lead mb-5 text-muted">
                  Based on your preferences, our AI will generate a tailored travel route.
                </p>
              </Carousel.Item>
              <Carousel.Item interval={4000} className="text-center px-5">
                <img src={thirdImage} alt="" className="img-fluid px-5" />
                <h3 className="heading display-5">View Your Route</h3>
                <p className="lead mb-5 text-muted">
                  See your personalized route mapped out with all the stops you want to hit.
                </p>
              </Carousel.Item>
              <Carousel.Item interval={4000} className="text-center px-5">
                <img src={fourthImage} alt="" className="img-fluid px-5" />
                <h3 className="heading display-5">Save & Customize</h3>
                <p className="lead mb-5 text-muted">
                  Store your travel preferences for next time or make any necessary tweaks.
                </p>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
