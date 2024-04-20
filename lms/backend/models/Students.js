const mongoose = require("mongoose");

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
  // confirmPassword: { required: true, type: String },
  dob: { required: true, type: Date },
  gender: { required: true, type: String },
  fieldOfInterest: { required: true, type: String },
  bio: { required: true, type: String },
  userType: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
});

// Create Student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
