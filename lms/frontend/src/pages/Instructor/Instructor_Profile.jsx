import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InstructorNavbar from "../../components/InstructorNavbar";

const Instructor_Profile = () => {
  const navigate = useNavigate();
  const [instructorData, setInstructorData] = useState(null);

  const fetchInstructorData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        "http://localhost:5000/instructor-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setInstructorData(response.data);
    } catch (error) {
      console.log("Error fetching instructor data:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    fetchInstructorData();
  }, []); // Empty dependency array to run effect only once on mount

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    navigate("/update-instructor-profile"); // Assuming this navigation route exists for updating the profile
  };

  return (
    <>
      <InstructorNavbar />
      <div className="container mx-auto my-10 ">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-500 py-8 text-center relative">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1706694668136-ce3eac60643f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
                alt="Profile Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <button className="text-white mt-4" onClick={handleUpdateProfile}>
              {" "}
              Update profile
            </button>
          </div>
          <div className="px-6 py-8">
            {instructorData ? (
              <div className="space-y-4">
                <p className="text-lg">
                  <strong>Full Name:</strong> {instructorData.fullName}
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> {instructorData.email}
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
                  <strong>Contact Number:</strong>{" "}
                  {instructorData.contactNumber}
                </p>
                <p className="text-lg">
                  <strong>Subject:</strong> {instructorData.subject}
                </p>
                <p className="text-lg">
                  <strong>Qualifications:</strong>{" "}
                  {instructorData.qualifications}
                </p>
                <p className="text-lg">
                  <strong>Experience:</strong> {instructorData.experience}
                </p>
                <p className="text-lg">
                  <strong>Languages:</strong>{" "}
                  {instructorData.languages.join(", ")}
                </p>
                <p className="text-lg">
                  <strong>Location:</strong> {instructorData.location}
                </p>
                <p className="text-lg">
                  <strong>Bio:</strong> {instructorData.bio}
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

export default Instructor_Profile;
