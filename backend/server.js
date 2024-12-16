const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');
const generateRoutes = require('./routes/generate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/register', registerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/generate-route', generateRoutes)

// MongoDB CONNECTION
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (err) {
    console.log(`Connection error: ${err}`)
  }
}
connectToDatabase();
