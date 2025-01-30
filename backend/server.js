const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Pozwala na akceptację żądań z innych domen tj. frontu działającego na innym serwerze
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');
const generateRoutes = require('./routes/generate');
require('dotenv').config(); // Wczytuje zmienne środowiskowe

// TWORZENIE INSTANCJI SERWERA EXPRESS
const app = express();
const PORT = process.env.PORT || 5000; // 5001 || 5000

// MIDDLEWARE
// cors() -> pozwala na komunikację frontu z backendem
// express.json() -> pozwala na przetwarzanie przychodzących danych w formacie JSON
app.use(cors());
app.use(express.json());

// DEFINIOWANIE TRAS API
app.use('/api/register', registerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/generate-route', generateRoutes)

// POŁĄCZENIE Z MONGO DB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // GLOBALNY KONTEKST DLA CAŁEJ APLIKACJI
    console.log('Connected to MongoDB.');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (err) {
    console.log(`Connection error: ${err}`)
  }
}
connectToDatabase();
