import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      // Make a request to your backend to send the OTP
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
        userType,
      });
      console.log(response.data);
      setSuccessMessage(response.data.message);
      setError("");
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
        newPassword,
        userType,
      });
      setEmail("");
      setOtp("");
      setNewPassword("");
      console.log(response.data);
      setSuccessMessage(response.data.message);
      setError("");
    } catch (error) {
      setError("Failed to reset password. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className=" h-screen  bg-gradient-to-br from-blue-600 to-indigo-800">
      <Navbar></Navbar>
      <div className="mt-11">
        <div className=" max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md ">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Forgot Password
          </h2>
          {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleResetPassword}>
            {/* this is for the user type for check the user type */}
            <div className="mb-4">
              <label
                htmlFor="userType"
                className="block text-sm font-medium text-gray-700"
              >
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full mt-1 py-2 px-3 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
            <div className="">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full mt-1 py-2 px-3 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <button
                  className="bg-blue-600 text-white p-2 rounded mr-2"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
                {/* <span>{successMessage}</span> */}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full mt-1 py-2 px-3 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full mt-1 py-2 px-3 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 mt-5 right-0 px-3 py-2"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* 
            <div className="text-right mt-2">
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div> */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Reset Password
            </button>
          </form>
          {/* <div className="text-center">
            <Link to="/login" className="text-gray-600 font-bold text-center">
              Login
            </Link>
          </div> */}
          <div>
            <h2 className="text-md text-center mt-4">Login Now?</h2>
            <div className="text-center">
              <Link to="/login" className="text-gray-600 font-bold text-center">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
