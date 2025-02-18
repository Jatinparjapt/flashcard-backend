const Flashcard = require('../models/FlashCard.js');
const { getNextReviewDate } = require('../utils/leitnersystem.js');

// Create a new flashcard
const createFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const nextReview = getNextReviewDate(1); // Start with Box 1
    const flashcard = new Flashcard({ question, answer, nextReview });
    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(400).json({ message: 'Error creating flashcard', error });
  }
};

// Get all flashcards
const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching flashcards', error });
  }
};

// Update a flashcard (move to next level if correct)
const updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    const { correct } = req.body;  // boolean value indicating if the answer was correct
    if (correct) {
      flashcard.level = Math.min(flashcard.level + 1, 5); // Max level 5
    } else {
      flashcard.level = 1; // Reset to Box 1
    }
    flashcard.nextReview = getNextReviewDate(flashcard.level);
    await flashcard.save();

    res.status(200).json(flashcard);
  } catch (error) {
    res.status(400).json({ message: 'Error updating flashcard', error });
  }
};

// Delete a flashcard
const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findByIdAndDelete(id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.status(200).json({ message: 'Flashcard deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting flashcard', error });
  }
};

module.exports = { createFlashcard, getFlashcards, updateFlashcard, deleteFlashcard };
