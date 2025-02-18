const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,  // Box 1
  },
  nextReview: {
    type: Date,
    required: true,
  },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);
module.exports = Flashcard;
