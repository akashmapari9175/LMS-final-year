import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array to run effect only once on mount

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    navigate("/update");
  };

  return (
    <>
      <StudentNavbar />
      <div className="container mx-auto my-10">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-500 py-8 text-center relative">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1707396172424-f3293f788364?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kbGUlMjBtYWxlfGVufDB8fDB8fHww"
                alt="Profile Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <button className="text-white mt-4" onClick={handleUpdateProfile}>
              Update profile
            </button>
          </div>

          {/* Profile Body */}
          <div className="px-6 py-8">
            {userData ? (
              <div className="space-y-4">
                <p className="text-lg">
                  <strong>Full Name:</strong> {userData.fullName}
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> {userData.email}
                </p>
                <p className="text-lg">
                  <strong>Password:</strong>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4"
                    onClick={handleUpdateProfile}
                  >
                    Update Password
                  </button>
                </p>
                <p className="text-lg">
                  <strong>Date of Birth:</strong> {formatDate(userData.dob)}
                </p>
                <p className="text-lg">
                  <strong>Gender:</strong> {userData.gender}
                </p>
                <p className="text-lg">
                  <strong>Field of Interest:</strong> {userData.fieldOfInterest}
                </p>
                <p className="text-lg">
                  <strong>Bio:</strong> {userData.bio}
                </p>
              </div>
            ) : (
              <p className="text-center mt-4">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
