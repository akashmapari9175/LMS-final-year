const mongoose = require("mongoose");

// Define the schema for the instructor model
const instructorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of email
    trim: true, // Trims whitespace from email
    lowercase: true, // Converts email to lowercase
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["student", "instructor"],
  },
});

// Create and export the Instructor model based on the schema
const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
