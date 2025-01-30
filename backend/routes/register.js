const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

// POST /api/register
router.post('/', async (req, res) => {
  // Pobieranie danych z zapytania
  const { firstName, lastName, email, password } = req.body;

  try {
    // Sprawdzenie czy użytkownik istnieje w bazie danych
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' }); // Bad request
    };

    // Hashowanie hasła (10 rund salt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tworzenie nowego użytkownika
    // na podstawie schematu User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Zapisywanie nowego użytkownika
    await newUser.save();

    // Zwracanie odpowiedzi z użytkownikiem (bez hasła) i wygenerowanym tokenem
    res.status(201).json({
      message: 'User registered successfully',
      user: { firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
})

module.exports = router;
