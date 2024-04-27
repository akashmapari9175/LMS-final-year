const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("./Courses");
// Define the Lecture schema
const lectureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

// Create the Lecture model
const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
