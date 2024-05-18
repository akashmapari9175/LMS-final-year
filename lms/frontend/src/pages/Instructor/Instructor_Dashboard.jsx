import React from "react";

const InstructorDashboard = () => {
  // Dummy data
  const profilePicture = "profile.jpg";
  const welcomeMessage = "Welcome, John Doe!";
  const totalCourses = 8;
  const enrolledStudents = 245;
  const averageRating = 4.5;
  const courseData = [
    {
      title: "Course Title 1",
      enrollmentStatus: "Open",
      enrolledStudents: 45,
      recentActivity: "3 new enrollments",
    },
    {
      title: "Course Title 2",
      enrollmentStatus: "Closed",
      enrolledStudents: 72,
      recentActivity: "5 new assignments submitted",
    },
    {
      title: "Course Title 3",
      enrollmentStatus: "Open",
      enrolledStudents: 32,
      recentActivity: "10 new messages from students",
    },
  ];
  const newEnrollments = 15;
  const completionRate = 85;
  const feedbackReceived = 28;

  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="flex items-center mb-8">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <h2 className="text-2xl font-bold">{welcomeMessage}</h2>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>Total Courses: {totalCourses}</p>
          <p>Enrolled Students: {enrolledStudents}</p>
          <p>Average Course Rating: {averageRating}</p>
        </div>
      </div>

      {/* Course Management Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Course Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courseData.map((course, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p>Enrollment Status: {course.enrollmentStatus}</p>
              <p>Enrolled Students: {course.enrolledStudents}</p>
              <p>Recent Activity: {course.recentActivity}</p>
              <div className="mt-4">
                <button className="mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300">
                  Edit
                </button>
                <button className="mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300">
                  Manage Content
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300">
                  View Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Engagement Section */}
      <div className="mb-8">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>New Enrollments: {newEnrollments}</p>
          <p>Course Completion Rate: {completionRate}%</p>
          <p>Feedback Received: {feedbackReceived}</p>
        </div>
      </div>

      {/* Analytics Section - Add charts as needed */}

      {/* Account Settings Section - Add settings buttons as needed */}

      {/* Help & Support Section - Add support buttons as needed */}

      {/* Notifications Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>New Enrollment: You have 3 new enrollments.</p>
          <p>Assignment Submission: 2 students submitted assignments.</p>
          <p>
            Course Update: Course "Introduction to JavaScript" has been updated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
