// models/Interview.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  level: { type: String, enum: ['easy', 'medium', 'hard'], required: true }
});

const JobSchema = new mongoose.Schema({
  emailId: String,
  jobTitle: String,
  jdSnapshot: String, // optional: save the JD text if needed
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobSchema', JobSchema);
