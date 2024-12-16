const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/users
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Saving new user
    await newUser.save();

    // Generating JWT
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return response with new user (without password)
    res.status(201).json({
      message: 'User registered successfully',
      user: { firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email },
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
})

module.exports = router;
