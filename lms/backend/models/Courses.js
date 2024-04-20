const mongoose = require("mongoose");
const Instructor = require("./Instructor");
const Lecture = require("./Lectures");
// Define the schema for the course model
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Assuming you store the image URL
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  prerequisites: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Course model based on the schema
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
