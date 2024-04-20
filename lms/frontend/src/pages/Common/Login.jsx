import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
const Login = () => {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        userType,
        email,
        password,
      });

      // Extract token from response data
      const { token } = response.data;

      // Store token in local storage
      localStorage.setItem("token", token);

      console.log("Login successful:", response.data);

      // Clear form fields and error after successful login
      setEmail("");
      setPassword("");
      setError("");

      // Navigate user based on userType
      if (userType === "student") {
        navigate("/auth/student-home");
      } else if (userType === "instructor") {
        navigate("/auth/instructor-home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="bg-white p-8 rounded-md shadow-lg w-[400px]">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
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
                className="w-full mt-1 py-2 px-3 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4 col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 py-2 px-3 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-600 mb-1">
              Register to access your account.
            </p>
            <Link to="/register" className="text-gray-600 font-bold  mb-4">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
