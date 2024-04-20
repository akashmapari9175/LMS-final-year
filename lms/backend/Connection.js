const mongoose = require("mongoose");

async function connectDB(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

module.exports = connectDB;
