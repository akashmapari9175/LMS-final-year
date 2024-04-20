import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Register = () => {
  const [userType, setUserType] = useState("student");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    fieldOfInterest: "",
    institution: "",
    gender: "",
    position: "",
    bio: "",
    subject: "",
    qualifications: "",
    experience: "",
    languages: "",
    location: "",
    contactNumber: "",
    userType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }

    // Validate contact number length (10 digits)
    if (formData.contactNumber.length !== 10) {
      setError("Contact number must be exactly 10 digits long");
      return;
    }

    // Validate password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate date of birth (DOB must not be in the future)
    const today = new Date();
    const dobDate = new Date(formData.dob);
    if (dobDate > today) {
      setError("Date of birth cannot be in the future");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        ...formData,
        userType: userType,
      });

      console.log("Registration successful:", response.data);
      alert("Registered Successfully");

      // Clear form fields after successful registration
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        fieldOfInterest: "",
        institution: "",
        gender: "",
        position: "",
        bio: "",
        subject: "",
        qualifications: "",
        experience: "",
        languages: "",
        location: "",
        contactNumber: "",
        userType: "",
      });

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.log("Registration error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data.error || "Registration failed");
      } else if (error.request) {
        // The request was made but no response was received
        setError("Network error. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an error
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800">
      <Navbar />
      <div className="max-w-xl mt-12 mx-auto p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              User Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={userType === "student"}
                  onChange={() => setUserType("student")}
                  className="form-radio"
                />
                <span className="ml-2">Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="instructor"
                  checked={userType === "instructor"}
                  onChange={() => setUserType("instructor")}
                  className="form-radio"
                />
                <span className="ml-2">Instructor</span>
              </label>
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="fullName" className="block mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="contactNumber" className="block mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Additional fields based on user type */}
          {userType === "student" ? (
            <>
              <div className="mb-4 col-span-2">
                <label htmlFor="dob" className="block mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="gender" className="block mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="fieldOfInterest" className="block mb-1">
                  Field of Interest
                </label>
                <input
                  type="text"
                  id="fieldOfInterest"
                  name="fieldOfInterest"
                  value={formData.fieldOfInterest}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 col-span-2">
                <label htmlFor="subject" className="block mb-1">
                  Subject/Field
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="qualifications" className="block mb-1">
                  Qualifications
                </label>
                <input
                  type="text"
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="experience" className="block mb-1">
                  Experience (Years)
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="languages" className="block mb-1">
                  Language Proficiency
                </label>
                <input
                  type="text"
                  id="languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="location" className="block mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          <div className="mb-4 col-span-2">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2"
                onClick={handleTogglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="bio" className="block mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          {error && <p className="text-red-500 col-span-2">{error}</p>}

          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>

        <h2 className="text-md text-center mt-4">Already Registered?</h2>
        <div className="text-center">
          <Link to="/login" className="text-gray-600 font-bold text-center">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
