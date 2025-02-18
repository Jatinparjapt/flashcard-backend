const express = require('express');
const { createFlashcard, getFlashcards, updateFlashcard, deleteFlashcard } = require('../controllers/flashcardController');
const authenticate = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Protect the routes with JWT authentication middleware
router.post('/flashcards', authenticate, createFlashcard);
router.get('/flashcards', authenticate, getFlashcards);
router.put('/flashcards/:id', authenticate, updateFlashcard);
router.delete('/flashcards/:id', authenticate, deleteFlashcard);

module.exports = router;
