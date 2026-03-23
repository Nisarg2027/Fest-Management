// FILE: backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// The VIP List: Only these URLs are allowed to ask your backend for data
const allowedOrigins = [
  'http://localhost:5173', // Your local React testing server
  'https://fest-management-eight.vercel.app' // Your live Vercel app
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Main Routes
app.use('/api/fests', require('./routes/fests'));
app.use('/api/equipments', require('./routes/equipments'));
app.use('/api/events', require('./routes/events'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/sponsors', require('./routes/sponsors'));
app.use('/api/judges', require('./routes/judges'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/participants', require('./routes/participants'));

// Junction/Linking Table Routes
app.use('/api/allocated', require('./routes/allocated'));
app.use('/api/assign', require('./routes/assign'));
app.use('/api/support', require('./routes/support'));
app.use('/api/evaluate', require('./routes/evaluate'));
app.use('/api/pregister', require('./routes/pregisters'));
app.use('/api/tregister', require('./routes/tregisters'));
app.use('/api/pscore', require('./routes/pscore'));
app.use('/api/tscore', require('./routes/tscore'));

// View Routes
app.use('/api/views', require('./routes/viewRoutes'));

app.get('/', (req, res) => {
  res.send('Fest Management API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));