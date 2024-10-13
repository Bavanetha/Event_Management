// models/Registration.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Registration', registrationSchema);
