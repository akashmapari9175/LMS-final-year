// const mongoose = require("mongoose");

// // Define Student Schema
// const studentSchema = new mongoose.Schema({
//   fullName: { required: true, type: String },
//   email: {
//     required: true,
//     type: String,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   password: { required: true, type: String },
//   // confirmPassword: { required: true, type: String },
//   dob: { required: true, type: Date },
//   gender: { required: true, type: String },
//   fieldOfInterest: { required: true, type: String },
//   bio: { required: true, type: String },
//   userType: {
//     type: String,
//     enum: ["student", "instructor"],
//     required: true,
//   },
// });

// // Create Student model
// const Student = mongoose.model("Student", studentSchema);

// module.exports = Student;

const mongoose = require("mongoose");

// Define Course Progress Schema
const courseProgressSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  progress: { type: Number, default: 0 },
});

// Define Student Schema
const studentSchema = new mongoose.Schema({
  fullName: { required: true, type: String },
  email: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { required: true, type: String },
  dob: { required: true, type: Date },
  gender: { required: true, type: String },
  fieldOfInterest: { required: true, type: String },
  bio: { required: true, type: String },
  userType: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  courseProgress: [courseProgressSchema], // New field to store course progress
});

// Create Student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
