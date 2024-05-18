import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Common/LandingPage";
import AboutUs from "./pages/Common/AboutUs";
import ContactUs from "./pages/Common/ContactUs";
import Login from "./pages/Common/Login";
import Register from "./pages/Common/Register";
import Student_Home from "./pages/Student/Student_Home";
import Instructor_Home from "./pages/Instructor/Instructor_Home";
import Student_Profile from "./pages/Student/Student_Profile";
import UpdateProfile from "./pages/Student/UpdateProfile";
import Instructor_Profile from "./pages/Instructor/Instructor_Profile";
import UpdateInstructorProfile from "./pages/Instructor/UpdateInstructorProfile";
import Add_Course from "./pages/Instructor/Add_Course";
import Manage_Courses from "./pages/Instructor/Manage_Courses";
import AddLecture from "./pages/Instructor/Add_Lecture";
import Course_Details from "./pages/Instructor/Course_Details";
import ForgotPassword from "./pages/Common/ForgotPassword";
import Course_Detailss from "./pages/Student/Course_Detailss";
import Enrolled_Courses from "./pages/Student/Enrolled_Courses";
import Payment from "./pages/Student/Payment";
import SearchResults from "./pages/Common/SearchResults";
import Edit_Course from "./pages/Instructor/Edit_Course";

function App() {
  // const stripePromise = loadStripe(
  //   "pk_test_51Obj0YSCbq1NQsLJooddt1DFt4nFGhogXEwlW0CaRrrBUcRJmjZ6023t49uLmTWHjfcN6n9Ur2Y8icalZ7wewUs800EOVPlaEd"
  // );

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/aboutus" element={<AboutUs></AboutUs>}></Route>
        <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/search/:query" element={<SearchResults />} />

        {/* student routes */}
        <Route path="/auth/student-home" element={<Student_Home />}></Route>
        <Route path="/profile" element={<Student_Profile />}></Route>
        <Route path="/update" element={<UpdateProfile />} />
        <Route
          path="/student/course-details/:courseId"
          element={<Course_Detailss></Course_Detailss>}
        ></Route>
        <Route
          path="/student/enrolled-courses"
          element={<Enrolled_Courses></Enrolled_Courses>}
        ></Route>
        <Route path="/payment/:courseId" element={<Payment></Payment>}></Route>

        {/* instructor routes */}
        <Route
          path="/auth/instructor-home"
          element={<Instructor_Home />}
        ></Route>

        <Route
          path="/instructor-profile"
          element={<Instructor_Profile />}
        ></Route>

        <Route
          path="/update-instructor-profile"
          element={<UpdateInstructorProfile />}
        ></Route>
        <Route path="/create-course" element={<Add_Course />}></Route>
        <Route
          path="/edit-course/:id" // Assuming you want to use '/edit-course/:id' as the route path
          element={<Edit_Course></Edit_Course>}
        />
        <Route path="/manage-courses" element={<Manage_Courses />}></Route>
        <Route path="/add-lecture/:courseId" element={<AddLecture />} />
        <Route path="/course-details/:courseId" element={<Course_Details />} />

        {/* this is for the forget password  */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        />
      </Routes>
    </>
  );
}

export default App;
