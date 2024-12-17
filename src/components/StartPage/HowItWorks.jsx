import React from "react";
import { Row, Col, Carousel, Container } from "react-bootstrap";
import firstImage from "../../assets/images/Approved-Visa.svg";
import secondImage from "../../assets/images/Chat-Bot.svg";
import thirdImage from "../../assets/images/Delivery-location.svg";
import fourthImage from "../../assets/images/Outer-space.svg";

export default function HowItWorks() {
  // można w przyszłości ulepszyć o dynamiczne renderowanie treści (trzymanie w obiekcie)
  return (
    <section id="howItWorks">
      <Container fluid="md" className="py-5">
        {/* NAGŁÓWEK SEKCJI */}
        <div className="text-center px-5">
          <h2 className="text-primary">The Future of Travel Planning</h2>
          <p className="lead text-muted">Discover how AI revolutionizes travel, putting your preferences at the forefront.</p>
        </div>

        <Row className="justify-content-center align-items-center py-5 mt-5">
          {/* KARUZELA */}
          {/* domyślnie zajmuje 12 kolumn, dopiero od lg zajmuje 6 */}
          <Col lg="6">
            <Carousel aria-live="polite">
              {/* interval: czas przejścia karuzeli */}
              <Carousel.Item interval={5000} className="text-center px-5">
                {/* img-fluid dla responsywności */}
                <img src={firstImage} className="img-fluid px-5"  alt="Man at the airport looking at his phone, preparing for travel"/>
                <h3 className="heading display-5">Set Your Preferences</h3>
                <p className="lead mb-5 text-muted">
                  Enter your location, budget, and travel style, and let us take care of the rest!
                </p>
              </Carousel.Item>
              <Carousel.Item interval={5000} className="text-center px-5">
                <img src={secondImage} alt="friendly robot helping a traveler plan his trip" className="img-fluid px-5" />
                <h3 className="heading display-5">AI Route Creation</h3>
                <p className="lead mb-5 text-muted">
                  Using your preferences, our AI crafts a customized travel route just for you.
                </p>
              </Carousel.Item>
              <Carousel.Item interval={5000} className="text-center px-5">
                <img src={thirdImage} alt="traveler checking map on smartphone while sitting on a scooter" className="img-fluid px-5" />
                <h3 className="heading display-5">View Your Route</h3>
                <p className="lead mb-5 text-muted">
                  {/* Nie ma na razie tej funkcjonalności */}
                  Visualize your customized route with all your desired stops perfectly mapped.
                </p>
              </Carousel.Item>
              <Carousel.Item interval={5000} className="text-center px-5">
                <img src={fourthImage} alt="Man inside a car, orbiting a planet" className="img-fluid px-5" />
                <h3 className="heading display-5">Save & Customize</h3>
                <p className="lead mb-5 text-muted">
                  {/* Nie ma na razie tej funkcjonalności */}
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
