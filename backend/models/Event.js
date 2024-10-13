const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    venue: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);
