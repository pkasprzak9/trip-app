import React from "react";
import { Row, Col, Carousel, Container } from "react-bootstrap";
import firstImage from "../../assets/images/Approved-Visa.svg";
import secondImage from "../../assets/images/Chat-Bot.svg";
import thirdImage from "../../assets/images/Delivery-location.svg";
import fourthImage from "../../assets/images/Outer-space.svg";

export default function HowItWorks() {
  return (
    <section id="howItWorks">
      <Container fluid="md" className="py-5">
        <div className="text-center px-5">
          <h2 className="text-primary">The Future of Travel Planning</h2>
          <p className="lead text-muted">Discover how AI revolutionizes travel, putting your preferences at the forefront.</p>
        </div>

        <Row className="justify-content-center align-items-center py-5 mt-5">
          <Col lg="6">
            <Carousel>
              <Carousel.Item interval={4000} className="text-center px-5">
                <img src={firstImage} alt="" className="img-fluid px-5" />
                <h3 className="heading display-5">Set Your Preferences</h3>
                <p className="lead mb-5 text-muted">
                  Enter your location, budget, and travel style, and let us take care of the rest!
                </p>
              </Carousel.Item>
              <Carousel.Item interval={4000} className="text-center px-5">
                <img src={secondImage} alt="" className="img-fluid px-5" />
                <h3 className="heading display-5">AI Route Creation</h3>
                <p className="lead mb-5 text-muted">
                  Using your preferences, our AI crafts a customized travel route just for you.
                </p>
              </Carousel.Item>
              <Carousel.Item interval={4000} className="text-center px-5">
                <img src={thirdImage} alt="" className="img-fluid px-5" />
                <h3 className="heading display-5">View Your Route</h3>
                <p className="lead mb-5 text-muted">
                  Visualize your customized route with all your desired stops perfectly mapped.
                </p>
              </Carousel.Item>
              <Carousel.Item interval={4000} className="text-center px-5">
                <img src={fourthImage} alt="" className="img-fluid px-5" />
                <h3 className="heading display-5">Save & Customize</h3>
                <p className="lead mb-5 text-muted">
                  Save your preferences for future trips, or make adjustments to fit your current plans.
                </p>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
