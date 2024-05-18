import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Footer from "../../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/send-email",
        formData
      );

      // Check if the response status is OK (2xx)
      setFormData({ name: "", email: "", message: "" });
      if (response.status === 200) {
        console.log("Email sent successfully");
        // Optionally, you can handle success response here
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error.message);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
        <div className="max-w-4xl w-full mx-8 ">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Contact Us
          </h1>
          <div className="flex flex-col md:flex-row">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-md shadow-lg w-full md:w-1/2 mb-8 md:mb-0"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  placeholder="Your message"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="bg-gradient-to-r from-blue-800 to-indigo-400 text-white rounded-md w-full md:w-1/2 px-8 py-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Our Location
              </h2>
              {/* Add your map component here */}
              <div className="h-40 bg-gray-400 rounded-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.3542851823327!2d77.32167797498012!3d19.17972218204631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d6fbe138ad81%3A0x9e88bbe86ec52250!2sMGM&#39;s%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1714317460078!5m2!1sen!2sin"
                  style={{ border: "0" }}
                  className="h-40 w-[384px] rounded-lg"
                  allowfullscreen="true"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="block mt-4">
                  <FaMapMarkerAlt className=" mr-2 inline-block " />
                  <span className="mt-5 ">
                    Mgm's college of engineering nanded
                  </span>
                </div>
                <div className="block mt-4">
                  <FaPhone className="inline-block mr-2" />
                  <span className="mt-2 ">contact us: 9876542312</span>
                </div>

                <div className="block mt-4">
                  <FaEnvelope className="inline-block mr-2" />
                  <span className="mt-2">email: learnify@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
