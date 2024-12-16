import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import Select from 'react-select';
import { X } from "react-bootstrap-icons";

export default function NewRouteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destinations: [],
    dateFrom: '',
    dateTo: '',
    transportation: '',
    accommodation: '',
    specialRequests: '',
    budget: '',
    interests: '',
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryOptions = data
          .map(country => ({
            value: country.cca2,
            label: country.name.common
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);


  const generateRoute = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/generate-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Backend response', data);

      if (response.ok) {
        alert('Route generated successfully!');
        setFormData({
          destinations: [],
          dateFrom: '',
          dateTo: '',
          transportation: '',
          accommodation: '',
          specialRequests: '',
          budget: '',
          interests: [],
        });
      } else {
        alert('Failed to generate route');
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  // const generateRoute = () => {
  //   console.log("Generate Route function is called");
  //   console.log("Generating route with data:", formData);
  //   setFormData({
  //     destinations: [],
  //     dateFrom: '',
  //     dateTo: '',
  //     transportation: '',
  //     accommodation: '',
  //     specialRequests: '',
  //     budget: '',
  //     interests: [],
  //   });
  // };

  let stepContent;
  switch (currentStep) {
    case 1:
      stepContent = (
        <StepOne
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          countries={countries}
          cities={cities}
          setCities={setCities}
        />
      );
      break;
    case 2:
      stepContent = (
        <StepTwo
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          generateRoute={generateRoute}
        />
      );
      break;
    case 3:
      stepContent = (
        <StepThree
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          generateRoute={generateRoute}
        />
      );
      break;
    default:
      break;
  }

  return (
    <section id="routeForm">
      <Container fluid="md" className="py-5 mt-5">
        {stepContent}
      </Container>
    </section>
  );
}


function StepOne({ formData, setFormData, setCurrentStep, countries, cities, setCities }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const addDestination = () => {
    if (selectedCountry && selectedCity) {
      const newDestination = { country: selectedCountry.label, city: selectedCity.label };
      setFormData((prevData) => ({
        ...prevData,
        destinations: [...prevData.destinations, newDestination],
      }));
      setSelectedCountry(null);
      setSelectedCity(null);
    }
  };

  const removeDestination = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      destinations: prevData.destinations.filter((_, i) => i !== index),
    }));
  };

  const handleDateChange = (field, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [field]: value };

      if (field === 'dateFrom' && newData.dateTo && newData.dateTo < value) {
        newData.dateTo = '';
      }
      if (field === 'dateTo' && newData.dateFrom && value < newData.dateFrom) {
        return prevData;
      }

      return newData;
    });
  };

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);

    if (country) {
      const username = process.env.REACT_APP_GEONAMES_USERNAME;
      const response = await fetch(`http://api.geonames.org/searchJSON?country=${country.value}&username=${username}`);
      const data = await response.json();

      const cityOptions = data.geonames
        ? data.geonames
            .map((city) => ({ value: city.name, label: city.name }))
            .sort((a, b) => a.label.localeCompare(b.label))
        : [];

      setCities((prev) => ({ ...prev, [country.value]: cityOptions }));
    }
  };

  return (
    <Card>
      <Card.Header className="text-center">Step 1: Travel Details</Card.Header>
      <Card.Body>
        <div className="d-flex flex-column align-items-center mb-3">
          <div className="mb-2 text-muted">
            Select a country and then choose a city from that country for your travel destination.
          </div>
          <div className="d-flex align-items-center justify-content-center mb-2 flex-wrap">
            <Select
              value={selectedCountry}
              options={countries}
              onChange={handleCountryChange}
              placeholder="Select Country"
              className="me-2"
              styles={{ control: (base) => ({ ...base, width: '200px' }) }}
            />
            <Select
              value={selectedCity}
              options={selectedCountry ? cities[selectedCountry.value] : []}
              onChange={setSelectedCity}
              placeholder="Select City"
              isDisabled={!selectedCountry}
              className="me-2"
              styles={{ control: (base) => ({ ...base, width: '200px' }) }}
            />
            <Button variant="outline-primary" className="mt-4 mt-sm-0" onClick={addDestination} style={{ width: '80px' }}>
              + Add
            </Button>
          </div>

          <div>
            {formData.destinations.map((destination, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span>{destination.country} - {destination.city}</span>
                <Button
                  variant="light"
                  onClick={() => removeDestination(index)}
                  style={{ border: 'none' }}
                  className="bg-white"
                >
                  <X size={20} color="red" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 mb-2 text-muted">
            Select the starting and ending dates for your travel plans.
          </div>
          <div className="d-flex gap-3 mb-2">
            <Form.Control
              className="flex-grow-1"
              type="date"
              value={formData.dateFrom}
              onChange={(e) => handleDateChange('dateFrom', e.target.value)}
            />
            <Form.Control
              type="date"
              value={formData.dateTo}
              onChange={(e) => handleDateChange('dateTo', e.target.value)}
            />
          </div>

        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" onClick={() => setCurrentStep(2)}>
            Next
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function StepTwo({ formData, setFormData, setCurrentStep }) {
  const budgetRanges = [
    { value: 'low', label: 'Low Budget' },
    { value: 'medium', label: 'Medium Budget' },
    { value: 'high', label: 'High Budget' },
  ];


  const activityOptions = [
    { "value": "sightseeing", "label": "Sightseeing" },
    { "value": "hiking", "label": "Hiking" },
    { "value": "visiting_museums", "label": "Visiting museums" },
    { "value": "beach_relaxation", "label": "Beach relaxation" },
    { "value": "camping", "label": "Camping" },
    { "value": "cultural_festivals", "label": "Cultural festivals" },
    { "value": "wine_tasting", "label": "Wine tasting" },
    { "value": "culinary_tours", "label": "Culinary tours" },
    { "value": "birdwatching", "label": "Birdwatching" },
    { "value": "photography", "label": "Photography" },
    { "value": "spa_treatments", "label": "Spa treatments" },
    { "value": "city_tours", "label": "City tours" },
    { "value": "historical_sites", "label": "Historical sites" },
    { "value": "shopping", "label": "Shopping" },
    { "value": "wildlife_safaris", "label": "Wildlife safaris" },
    { "value": "adventure_sports", "label": "Adventure sports" },
    { "value": "snowboarding", "label": "Snowboarding" },
    { "value": "scuba_diving", "label": "Scuba diving" },
    { "value": "rock_climbing", "label": "Rock climbing" },
    { "value": "yoga_retreats", "label": "Yoga retreats" },
    { "value": "road_trips", "label": "Road trips" },
    { "value": "volunteering", "label": "Volunteering" },
    { "value": "music_festivals", "label": "Music festivals" },
    { "value": "art_galleries", "label": "Art galleries" },
    { "value": "hiking_national_parks", "label": "Hiking in national parks" },
    { "value": "historical_reenactments", "label": "Historical reenactments" },
    { "value": "farmers_markets", "label": "Farmers' markets" },
    { "value": "eco_tours", "label": "Eco-tours" },
    { "value": "biking", "label": "Biking" },
    { "value": "horseback_riding", "label": "Horseback riding" },
    { "value": "fishing", "label": "Fishing" }
];

  const handleBudgetChange = (selectedOption) => {
    const budgetLabel = selectedOption ? selectedOption.label : '';
    setFormData((prevData) => ({
      ...prevData,
      budget: budgetLabel,
    }));
  };


  const handleActivityChange = (selectedOptions) => {
    const activities = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData((prevData) => ({
      ...prevData,
      interests: activities,
    }));
  };

  return (
    <Card>
      <Card.Header className="text-center">Step 2: Budget and Interests</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Select
              options={budgetRanges}
              onChange={handleBudgetChange}
              placeholder="Select your budget range"
              className="mb-3"
              value={budgetRanges.find(option => option.label === formData.budget)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>What activities do you enjoy?</Form.Label>
            <Select
              options={activityOptions}
              isMulti
              placeholder="Select activities"
              className="mb-3"
              value={activityOptions.filter(option =>
                formData.interests.includes(option.value))}
              onChange={handleActivityChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
            <Button variant="primary" onClick={() => setCurrentStep(3)} className="ms-2">
              Next
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

function StepThree({ formData, setFormData, setCurrentStep,  generateRoute }) {
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const transportOptions = [
    { value: 'rental', label: 'Rental Car' },
    { value: 'public', label: 'Public Transport' },
    { value: 'walking', label: 'Walking' },
    { value: 'none', label: 'No Preference' },
  ];

  const accommodationOptions = [
    { value: 'luxury', label: 'Luxury' },
    { value: 'standard', label: 'Standard' },
    { value: 'budget', label: 'Budget' },
    { value: 'none', label: 'No Preference' },
  ];

  const tripStyleOptions = [
    { value: 'adventure', label: 'Active Adventure' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'balance', label: 'Balanced (a bit of both)' },
    { value: 'none', label: 'No Preference' },
  ];

  return (
    <Card>
      <Card.Header className="text-center">Step 3: Additional Preferences</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Preferred Transport</Form.Label>
            <Select
              options={transportOptions}
              onChange={(option) => handleChange('transport', option.value)}
              value={transportOptions.find(option => option.value === formData.transport)}
              placeholder="Select your preferred mode of transport"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Accommodation Preference</Form.Label>
            <Select
              options={accommodationOptions}
              onChange={(option) => handleChange('accommodation', option.value)}
              value={accommodationOptions.find(option => option.value === formData.accommodation)}
              placeholder="Select accommodation preference"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Travel Style</Form.Label>
            <Select
              options={tripStyleOptions}
              onChange={(option) => handleChange('tripStyle', option.value)}
              value={tripStyleOptions.find(option => option.value === formData.tripStyle)}
              placeholder="Select your preferred travel style"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Special Requests</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Any special requests for your trip? (e.g., need a guide, specific adjustments)"
              value={formData.specialRequests}
              onChange={(e) => handleChange('specialRequests', e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={() => setCurrentStep(2)}>
              Back
            </Button>
            <Button variant="primary" onClick={generateRoute} className="ms-2">
              Generate Route
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
