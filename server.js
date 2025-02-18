const express = require('express');
const cors = require('cors'); // Importing CORS
const connectDB = require('./config/db');
const flashcardRoutes = require('./routes/flashcardRoutes');
const userRoutes = require('./routes/userRoutes'); // Routes for user authentication
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// Use CORS middleware
app.use(cors({ origin: "https://flashcar-frontend.vercel.app", credentials: true }));


// Connect to MongoDB
connectDB();

// Routes
app.use('/api', flashcardRoutes);
app.use('/api/users', userRoutes); // Add user authentication routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
