const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Connection");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Students = require("./models/Students");
const Instructor = require("./models/Instructor");
const Course = require("./models/Courses");
const cloudinary = require("cloudinary").v2;
const Lecture = require("./models/Lectures");
const multer = require("multer");
const nodemailer = require("nodemailer");
const Student = require("./models/Students");

const app = express();

app.use(express.json());
app.use(cors());

const secretKey = process.env.SECRETKEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: "Invalid user data in token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
});

// User login endpoint
app.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      userType,
      dob,
      gender,
      fieldOfInterest,
      bio,
      contactNumber,
      subject,
      qualifications,
      experience,
      languages,
      location,
    } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Validate password criteria: at least 8 characters with uppercase, lowercase, and number
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    if (
      userType === "instructor" &&
      (!contactNumber ||
        contactNumber.length !== 10 ||
        !/^\d+$/.test(contactNumber))
    ) {
      return res.status(400).json({
        error: "Instructor contact number must be exactly 10 digits long",
      });
    }

    // Check if the user already exists based on email and userType
    const existingUser = await (userType === "student"
      ? Students.findOne({ email })
      : Instructor.findOne({ email }));

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email address already registered" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (userType === "student") {
      newUser = new Students({
        fullName,
        email,
        password: hashedPassword,
        dob,
        gender,
        fieldOfInterest,
        bio,
        userType,
      });
    } else if (userType === "instructor") {
      newUser = new Instructor({
        fullName,
        contactNumber,
        email,
        password: hashedPassword,
        subject,
        qualifications,
        experience,
        languages,
        location,
        bio,
        userType,
      });
    } else {
      return res.status(400).json({ error: "Invalid userType" });
    }

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ mesfsage: "Registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
});

app.post("/login", async (req, res) => {
  const { userType, email, password } = req.body;

  try {
    // Find the user based on email and userType
    const user = await (userType === "student"
      ? Students.findOne({ email })
      : Instructor.findOne({ email }));

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    // this is jwt token 
    const token = jwt.sign({ userId: user._id, email }, secretKey, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Profile endpoint for students
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // const student = await Students.findById(userId).select("-password");
    const student = await Students.findById(userId);

    if (!student) {
      return res.status(404).json({ error: "Student profile not found" });
    }
    // console.log(student);
    res.json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Profile endpoint for instructors
app.get("/instructor-profile", verifyToken, async (req, res) => {
  try {
    const instructorId = req.user.userId;

    // const instructor = await Instructor.findById(instructorId).select(
    //   "-password"
    // );
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor profile not found" });
    }

    res.json(instructor);
  } catch (error) {
    console.error("Error fetching instructor profile:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update student profile endpoint
app.put("/update", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const updatedFields = req.body;
    // console.log(updatedFields);

    // //first we convert the updated password to the hashpassword
    // const hashedPassword = await bcrypt.hash(updatedFields.password, 10);

    // const student = await Students.findByIdAndUpdate(userId, updatedFields, {
    //   new: true,
    // });
    // Hash the updated password
    const hashedPassword = await bcrypt.hash(updatedFields.password, 10);

    // Update the password field in updatedFields with the hashed password
    updatedFields.password = hashedPassword;

    // Update the student document in the database with the updatedFields
    const student = await Students.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    // console.log(student);
    res.status(200).json({
      message: "Student profile updated successfully",
      data: student,
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update instructor profile endpoint
app.put("/update-instructor-profile", verifyToken, async (req, res) => {
  try {
    const instructorId = req.user.userId;
    const updatedFields = req.body;

    const hashedPassword = await bcrypt.hash(updatedFields.password, 10);

    // Update the password field in updatedFields with the hashed password
    updatedFields.password = hashedPassword;


    const instructor = await Instructor.findByIdAndUpdate(
      instructorId,
      updatedFields,
      { new: true }
    );

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.status(200).json({
      message: "Instructor profile updated successfully",
      data: instructor,
    });
  } catch (error) {
    console.error("Error updating instructor profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create course endpoint
app.post("/create-course", verifyToken, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      duration,
      price,
      prerequisites,
      imageUrl,
    } = req.body;
    const instructorId = req.user.userId;
    // console.log(instructorId);
    const newCourse = new Course({
      title,
      description,
      category,
      duration,
      price,
      prerequisites,
      imageUrl,
      instructor: instructorId,
    });

    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get courses managed by a specific instructor
app.get("/manage-courses", verifyToken, async (req, res) => {
  const instructorId = req.user.userId;

  try {
    const courses = await Course.find({ instructor: instructorId });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete course endpoint
app.delete("/manage-courses/:id", verifyToken, async (req, res) => {
  const courseId = req.params.id;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST route to add a new lecture to a course
// app.post("/add-lecture/:courseId", verifyToken, async (req, res) => {
//   try {
//     const { title, description, videoUrl } = req.body;
//     const { courseId } = req.params; // Extract courseId from URL params
//     console.log(courseId);

//     // Check if required fields are present
//     if (!title || !description || !videoUrl || !courseId) {
//       return res.status(400).json({
//         message: "Title, description, videoUrl, and courseId are required",
//       });
//     }

//     // Check if the course exists
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // Create a new lecture associated with the specified course
//     const newLecture = new Lecture({
//       title,
//       description,
//       videoUrl,
//       course: courseId, // Associate the lecture with the specified course
//     });

//     // Save the new lecture
//     await newLecture.save();

//     // Add the lecture to the course's lectures array
//     course.lectures.push(newLecture._id);
//     await course.save();

//     res.status(201).json({
//       message: "Lecture added successfully",
//       lecture: newLecture,
//     });
//   } catch (error) {
//     console.error("Error adding lecture:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// app.get("/course-details/:courseId", async (req, res) => {
//   const { courseId } = req.params;
//   try {
//     const lectures = await Lecture.find({ course: courseId });

//     if (!lectures || lectures.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No lectures found for this course" });
//     }

//     res.status(200).json({ lectures });
//   } catch (error) {
//     console.error("Error fetching lectures:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
app.post("/add-lecture/:courseId", verifyToken, async (req, res) => {
  try {
    const { title, description, videoUrl, section } = req.body;
    const { courseId } = req.params;

    if (!title || !description || !videoUrl || !courseId || !section) {
      return res.status(400).json({
        message:
          "Title, description, videoUrl, courseId, and section are required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newLecture = new Lecture({
      title,
      description,
      videoUrl,
      course: courseId,
      section,
    });

    await newLecture.save();

    course.lectures.push(newLecture._id);
    await course.save();

    res.status(201).json({
      message: "Lecture added successfully",
      lecture: newLecture,
    });
  } catch (error) {
    console.error("Error adding lecture:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/course-details/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    // Fetch all lectures for the specified course
    const lectures = await Lecture.find({ course: courseId });

    if (!lectures || lectures.length === 0) {
      return res
        .status(404)
        .json({ message: "No lectures found for this course" });
    }

    // Group lectures by section
    const lecturesBySection = {};
    lectures.forEach((lecture) => {
      const sectionName = lecture.section || "Uncategorized";
      if (!lecturesBySection[sectionName]) {
        lecturesBySection[sectionName] = [];
      }
      lecturesBySection[sectionName].push(lecture);
    });

    // Convert object to array of sections
    const sections = Object.keys(lecturesBySection).map((sectionName) => ({
      name: sectionName,
      lectures: lecturesBySection[sectionName],
    }));

    res.status(200).json({ sections });
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/student/course-details/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    // Fetch all lectures for the specified course
    const lectures = await Lecture.find({ course: courseId });

    if (!lectures || lectures.length === 0) {
      return res
        .status(404)
        .json({ message: "No lectures found for this course" });
    }

    // Group lectures by section
    const lecturesBySection = {};
    lectures.forEach((lecture) => {
      const sectionName = lecture.section || "Uncategorized";
      if (!lecturesBySection[sectionName]) {
        lecturesBySection[sectionName] = [];
      }
      lecturesBySection[sectionName].push(lecture);
    });

    // Convert object to array of sections
    const sections = Object.keys(lecturesBySection).map((sectionName) => ({
      name: sectionName,
      lectures: lecturesBySection[sectionName],
    }));

    res.status(200).json({ sections });
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Routes
app.get("/auth/student-home", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
    // console.log(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    /*
      Configure your email transport settings here.
      For example, for Gmail, you can use the following:
      */
    service: "gmail",
    auth: {
      user: "akashofficial9933@gmail.com",
      pass: "vugiitapckvmzwxa",
    },
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: `"Contact Form" <${email}>`,
    to: "akashofficial9933@gmail.com", // Change this to your email address
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

//thsi is for the forget password

// const express = require("express");
const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
const randomize = require("randomatic");

// const app = express();

// // Middleware
app.use(bodyParser.json());

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akashofficial9933@gmail.com",
    pass: "vugiitapckvmzwxa",
  },
});

// Import your database model here
// already imported as Student

// Temporary storage for OTPs (in a real-world scenario, use a database for storage)
const otpStorage = {};

// Endpoint to handle sending OTP
app.post("/send-otp", async (req, res) => {
  const { email,userType } = req.body;

  try {
    // Check if the email exists in the database
    const user = await (userType === "student"
      ? Students.findOne({ email })
      : Instructor.findOne({ email }));

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // our preveous code only for the student
    // const student = await Student.findOne({ email });
    // if (!student) {
    //   return res.status(404).json({ message: "student not found." });
    // }

    // Generate a 4-digit code
    const otp = randomize("0", 4);

    // Store the OTP in temporary storage
    otpStorage[email] = otp;

    // Send the OTP to the user's email
    const mailOptions = {
      from: "akashofficial9933@gmail.com",
      to: email,
      subject: "OTP for Password Reset",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send OTP." });
      }
      console.log("OTP sent:", info.response);
      // Store the OTP in a database or in memory for verification later
      // For simplicity, we'll just send the OTP back to the client for now
      res.json({ otp });
    });
  } catch (error) {
    console.log("Error finding user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Assuming this is the correct route for handling OTP verification
app.post("/verify-otp", async (req, res) => {
  const { email, otp, newPassword,userType } = req.body;

  try {
    const user = await (userType === "student"
      ? Students.findOne({ email })
      : Instructor.findOne({ email }));

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Find the user by email  // thsi is our previous code only for the student 
    // const student = await Student.findOne({ email });
    // if (!student) {
    //   return res.status(404).json({ message: "User not found." });
    // }

    // Retrieve the OTP from temporary storage
    const storedOtp = otpStorage[email];

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP not found." });
    }

    // Check if the entered OTP matches the stored OTP
    if (otp !== storedOtp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // Delete the OTP from temporary storage
    delete otpStorage[email];

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // await student.save();
      await user.save();

    // For demonstration purposes, we'll just send a success message
    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.log("Error finding student:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/student/count", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching students count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/course/count", async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching courses count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/instructor/count", async (req, res) => {
  try {
    const count = await Instructor.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching instructors count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// catergory request on the home page
app.get("/categories", async (req, res) => {
  try {
    const categories = await Course.distinct("category"); // Assuming 'category' is the field in your Course model that stores category information
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// filteration route on the home page
app.post("/courses/filter", async (req, res) => {
  const { selectedCategory } = req.body;
  try {
    let filteredCourses;
    if (selectedCategory === "All") {
      filteredCourses = await Course.find();
    } else {
      filteredCourses = await Course.find({ category: selectedCategory });
    }
    res.json(filteredCourses);
  } catch (error) {
    console.error("Error filtering courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/course-details/:lectureId", async (req, res) => {
  const { lectureId } = req.params;

  try {
    // Find the lecture by ID
    const lecture = await Lecture.findById(lectureId);

    // Check if the lecture exists
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Delete the lecture
    await Lecture.findByIdAndDelete(lectureId);
    // console.log(lectureId);

    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    console.error("Error deleting lecture:", error.message);
    res.status(500).json({ error: "Failed to delete lecture" });
  }
});

// Route to create a Checkout Session

app.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query; // Access the route parameter

    const regex = new RegExp(query, "i"); // Case-insensitive search
    const searchResults = await Course.find({ title: regex });

    res.json({ results: searchResults });
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/courses/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Failed to update course" });
  }
});

app.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Failed to fetch course" });
  }
});

// MongoDB connection
connectDB(
  "mongodb+srv://akashmapari:root@cluster0.3bxf127.mongodb.net/?retryWrites=true&w=majority&appName=lms"
)
  .then(() => console.log("Database connected successfully!"))
  .catch((error) => console.log("Database connection error!", error));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
