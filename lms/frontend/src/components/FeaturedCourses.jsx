import React from "react";
import { motion } from "framer-motion";

const FeaturedCourses = ({ courses, onCourseClick }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 ml-8">Featured Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 p-8  lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <motion.div
            key={course._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              {/* <p className="text-gray-700 mb-2">{course.description}</p> */}

              <p className="text-gray-600 mb-2">Price: ₹{course.price}</p>
              <p className="text-gray-600 mb-2">
                Duration: {course.duration} weeks
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => onCourseClick(course._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 transition duration-300"
                >
                  View Demo
                </button>
                <button
                  onClick={() => onCourseClick(course._id)}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Enroll
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;
// import React from "react";
// import { motion } from "framer-motion";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const FeaturedCourses = ({ courses, onCourseClick }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4 ml-8">Featured Courses</h2>
//       <Slider {...settings}>
//         {courses.map((course) => (
//           <div key={course._id}>
//             <motion.div
//               className="bg-white rounded-lg shadow-md overflow-hidden mx-4"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <img
//                 src={course.imageUrl}
//                 alt={course.title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-bold mb-2">{course.title}</h3>
//                 <p className="text-gray-600 mb-2">Price: ₹{course.price}</p>
//                 <p className="text-gray-600 mb-2">
//                   Duration: {course.duration} weeks
//                 </p>
//                 <div className="flex justify-between mt-4">
//                   <button
//                     onClick={() => onCourseClick(course._id)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 transition duration-300"
//                   >
//                     View Demo
//                   </button>
//                   <button
//                     onClick={() => onCourseClick(course._id)}
//                     className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
//                   >
//                     Enroll
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default FeaturedCourses;
