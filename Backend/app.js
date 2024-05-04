const express = require('express');
const cors = require('cors'); // Import the cors middleware
const connectDB = require('./db');
const messageRoutes = require('./messageRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Use cors middleware to enable CORS

// Routes
app.use('/api/messages', messageRoutes);

module.exports = app;
