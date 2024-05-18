// import React from "react";
// import {
//   FaSearch,
//   FaUser,
//   FaChalkboardTeacher,
//   FaCertificate,
// } from "react-icons/fa";

// const HowItWorks = () => {
//   return (
//     <div className="py-12 bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
//           How It Works
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <StepCard
//             icon={<FaSearch className="h-12 w-12 text-indigo-500" />}
//             title="Browse Courses"
//             description="Explore a wide range of courses on various topics."
//           />
//           <StepCard
//             icon={<FaUser className="h-12 w-12 text-indigo-500" />}
//             title="Sign Up"
//             description="Create your account to get started with Learnify."
//           />
//           <StepCard
//             icon={<FaChalkboardTeacher className="h-12 w-12 text-indigo-500" />}
//             title="Learn & Engage"
//             description="Enroll in courses, watch lectures, and engage with instructors."
//           />
//           <StepCard
//             icon={<FaCertificate className="h-12 w-12 text-indigo-500" />}
//             title="Earn Certificates"
//             description="Complete courses and receive certificates of completion."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const StepCard = ({ icon, title, description }) => {
//   return (
//     <div className="flex items-start">
//       <div className="bg-white h-20 w-20 rounded-full flex justify-center items-center shadow-md">
//         {icon}
//       </div>
//       <div className="ml-4">
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default HowItWorks;

import React from "react";
import {
  FaSearch,
  FaUser,
  FaChalkboardTeacher,
  FaCertificate,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <StepCard
            icon={<FaSearch className="h-12 w-12 text-indigo-500" />}
            title="Browse Courses"
            description="Explore a wide range of courses on various topics."
          />
          <StepCard
            icon={<FaUser className="h-12 w-12 text-indigo-500" />}
            title="Sign Up"
            description="Create your account to get started with Learnify."
          />
          <StepCard
            icon={<FaChalkboardTeacher className="h-12 w-12 text-indigo-500" />}
            title="Learn & Engage"
            description="Enroll in courses, watch lectures, and engage with instructors."
          />
          <StepCard
            icon={<FaCertificate className="h-12 w-12 text-indigo-500" />}
            title="Earn Certificates"
            description="Complete courses and receive certificates of completion."
          />
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white h-24 w-24 rounded-full flex justify-center items-center shadow-md mb-4">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorks;
