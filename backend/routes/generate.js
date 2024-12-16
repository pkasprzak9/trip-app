const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.use(express.json());

router.post('/', async (req, res) => {
  const formData = req.body;
  console.log("Received route data:", formData);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `
            You are a travel planning assistant. Use the following preferences to create a detailed day-by-day travel plan:

            - Destinations: ${formData.destinations.map(destination => destination.city + ', ' + destination.country).join(', ')}
            - Start Date: ${formData.dateFrom || 'Not provided'}
            - End Date: ${formData.dateTo || 'Not provided'}
            - Transportation: ${formData.transportation || 'No preference'}
            - Accommodation: ${formData.accommodation || 'No preference'}
            - Special Requests: ${formData.specialRequests || 'None'}
            - Budget: ${formData.budget || 'Not specified'}
            - Interests: ${formData.interests.join(', ') || 'General'}

            The output must include:

            1. A detailed itinerary with at least 3 activities per day. Each activity should include:
                - Time, description, and location (city, country).

            2. Do not use backticks, ellipses, or other special characters. Only standard quotation marks.

            3. Format the response like this (no extra text or explanations):

            {
              "itinerary": [
                {
                  "day": 1,
                  "date": "YYYY-MM-DD",
                  "activities": [
                    {
                      "time": "HH:MM",
                      "activity": "Activity description",
                      "location": "City, Country"
                    },
                    {
                      "time": "HH:MM",
                      "activity": "Another activity description",
                      "location": "City, Country"
                    },
                    {
                      "time": "HH:MM",
                      "activity": "Third activity description",
                      "location": "City, Country"
                    }
                  ]
                }
              ]
            }

            4. After the itinerary, include a summary of the entire trip, such as:
              - Type of trip: (e.g., Adventure, Relaxation, Cultural, etc.)
              - Key highlights: The most notable aspects or experiences from the itinerary.
              - Recommended packing list: Based on the activities and destinations.
              - General trip vibe: Whether the trip feels fast-paced, relaxed, family-oriented, etc.

            Ensure valid JSON format. No extra text, comments, or special characters.
          `,
        },
        {
          role: 'user',
          content: `
            Create a travel plan based on the following preferences:
            Destinations: ${formData.destinations.map(destination => destination.city + ', ' + destination.country).join(', ')}
            Start Date: ${formData.dateFrom || 'Not provided'}
            End Date: ${formData.dateTo || 'Not provided'}
            Transportation: ${formData.transportation || 'No preference'}
            Accommodation: ${formData.accommodation || 'No preference'}
            Budget: ${formData.budget || 'Not specified'}
            Interests: ${formData.interests.join(', ') || 'General'}
            Special Requests: ${formData.specialRequests || 'None'}

            Provide the travel plan in the exact format above, with no extra text or comments.
          `,
        },
      ],
    });

    const plan = response.choices[0].message.content;
    console.log("OpenAI response:", plan);

    try {
      const parsedPlan = JSON.parse(plan);
      console.log("Parsed plan:", parsedPlan);

      res.status(200).json({
        message: 'Travel plan generated successfully!',
        tripPlan: parsedPlan,
      });
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      res.status(500).json({ message: 'Error processing data from OpenAI' });
    }
  } catch (error) {
    console.error('Error with OpenAI request:', error);
    res.status(500).json({ message: 'Error processing data with OpenAI' });
  }
});

module.exports = router;
