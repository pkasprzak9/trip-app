// src/components/UserPanel/DisplayRoute.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, Card, Button, Container } from 'react-bootstrap';

export default function DisplayRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripPlan } = location.state || {};

  // Logowanie tripPlan dla celów debugowania
  console.log("tripPlan:", tripPlan);

  if (!tripPlan || !tripPlan.itinerary) {
    return (
      <Container className="mt-5" style={{ maxWidth: '800px' }}>
        <h2>No trip data available.</h2>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </Container>
    );
  }

  const { itinerary, summary, dateFrom, dateTo, destinations } = tripPlan;

  // Jeśli dateFrom i dateTo nie są bezpośrednio dostępne, wyciągnij je z itinerary
  const startDate = dateFrom || (itinerary.length > 0 ? itinerary[0].date : '');
  const endDate = dateTo || (itinerary.length > 0 ? itinerary[itinerary.length - 1].date : '');

  // Jeśli destinations nie są bezpośrednio dostępne, wyciągnij unikalne miejsca z aktywności
  const uniqueDestinations = destinations ||
    Array.from(new Set(itinerary.flatMap(day => day.activities.map(activity => activity.location))));

  return (
    <Container className="mt-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4 text-center">Your Trip Plan</h2>

      {/* Sekcja Wprowadzająca */}
      <Card className="mb-4">
        <Card.Body>
          <h3 className="mb-3">Introduction</h3>
          <p><strong>Trip Duration:</strong> {startDate} to {endDate}</p>
          <p><strong>Destinations:</strong> {uniqueDestinations.join(', ')}</p>
          {summary && (
            <>
              {summary.type_of_trip && (
                <p><strong>Type of Trip:</strong> {summary.type_of_trip}</p>
              )}
              {summary.key_highlights && (
                <p><strong>Key Highlights:</strong> {summary.key_highlights}</p>
              )}
              {summary.recommended_packing_list && (
                <p><strong>Recommended Packing List:</strong> {summary.recommended_packing_list}</p>
              )}
              {summary.general_trip_vibe && (
                <p><strong>General Trip Vibe:</strong> {summary.general_trip_vibe}</p>
              )}
            </>
          )}
          <hr />
          <p>Below you can see the detailed itinerary of your trip.</p>
        </Card.Body>
      </Card>

      {/* Szczegółowy Plan Podróży */}
      <Accordion defaultActiveKey="0">
        {itinerary.map((dayPlan, index) => (
          <Accordion.Item eventKey={String(index)} key={index}>
            <Accordion.Header>
              Day {dayPlan.day} – {dayPlan.date}
            </Accordion.Header>
            <Accordion.Body>
              {dayPlan.activities.map((activity, i) => (
                <Card className="mb-3" key={i}>
                  <Card.Body>
                    <Card.Title>{activity.activity}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{activity.time}</Card.Subtitle>
                    <Card.Text>
                      <strong>Location:</strong> {activity.location}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Przyciski Nawigacyjne */}
      <div className="text-center my-4">
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
        <Button variant="primary" className="ms-2" onClick={() => navigate('/dashboard/new')}>
          Generate a New Trip
        </Button>
      </div>
    </Container>
  );
}
