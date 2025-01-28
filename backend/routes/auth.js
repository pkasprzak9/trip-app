const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  // Pobieranie danych z formularza logowania
  const { email, password } = req.body;
  try {
    // Sprawdzenie czy użytkownik istnieje i jeśli tak to pobranie go (razem z hasłem)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    };

    // Porównanie haseł (podanego w formularzu logowania z tym z database)
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Podpisanie tokenu (ważnego przez godzinę)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Zwrócenie odp do klienta
    res.status(200).json({
      message: 'Logged in successfully.',
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  } catch(err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
})

module.exports = router;
