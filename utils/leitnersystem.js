const moment = require('moment');

// Function to calculate next review date based on the box level
const getNextReviewDate = (level) => {
  const intervals = [1, 3, 7, 14, 30];  // In days
  const interval = intervals[level - 1] || 30;  // Default to 30 days for higher levels
  return moment().add(interval, 'days').toDate();
};

module.exports = { getNextReviewDate };
