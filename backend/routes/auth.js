const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// POST /api/auth
router.post('/', async (req, res) => {
  // Pobieranie danych z zapytania
  const { email, password } = req.body;

  try {
    // Sprawdzenie czy użytkownik istnieje i jeśli tak to pobranie go (razem z hasłem, co jest niezbędne do porównania haseł)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    };

    // Porównanie haseł (podanego w formularzu logowania z tym z database)
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Zwrócenie odp do klienta z danymi użytkownika (front je zapisuje w local storage i wyświetla w dashboardzie)
    res.status(200).json({
      message: 'Logged in successfully.',
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  }
  // obsługa błędów
  catch(err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
})

// eksport routera, aby użyć go w server.js
module.exports = router;
