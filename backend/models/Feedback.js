const mongoose = require('mongoose');

// Define the Feedback Schema
const feedbackSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // This will add createdAt and updatedAt timestamps

// Create the Feedback Model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
