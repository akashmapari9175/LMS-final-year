import React from "react";
import LearningGrid from "../../components/LeariningGrid";
import Quote from "../../components/Quote";
import HighlightText from "../../components/HighLightText";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Counter from "../../components/Counter";
import img1 from "../../assets/images/about-us.png";
import img2 from "../../assets/images/graphics-design.png";
import img3 from "../../assets/images/why-choose-us.png";
import img4 from "../../assets/images/kids-learning.png";

const AboutUs = () => {
  return (
    <div>
      <Navbar className="fixed top-0 z-50" />
      <section className="bg-richblack-700 mt-5">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-black">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Learnify is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="z-0 absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1
                className="bg-gradient-to-br from-[#00C6FB] via-[#005BEA] to-[#00C6FB] bg-clip-text
 text-4xl font-semibold text-transparent lg:w-[70%] "
              >
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%] text-justify">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%] text-justify">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div>
              <img
                src={img4}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#5953fe]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%] text-justify">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%] text-justify">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Counter />
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
      </section>

      <div className="relative mx-auto my-8 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

// import React from "react";
// import Navbar from "../../components/Navbar";

// const AboutUs = () => {
//   return (
//     <>
//       <Navbar></Navbar>
//       <div className="bg-gray-100 min-h-screen">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="text-center">
//             <h1 className="text-3xl font-extrabold text-gray-900">About Us</h1>
//             <p className="mt-4 text-lg text-gray-600">
//               Learnify is your ultimate destination for online learning. We
//               strive to provide high-quality educational content across various
//               domains to help learners worldwide achieve their goals and unlock
//               their potential.
//             </p>
//           </div>
//           <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Our Mission
//               </h2>
//               <p className="text-gray-600">
//                 Our mission is to make quality education accessible to everyone,
//                 regardless of their background or location. We believe that
//                 education has the power to transform lives, and we're committed
//                 to empowering learners worldwide.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Our Vision
//               </h2>
//               <p className="text-gray-600">
//                 Our vision is to create a global community of lifelong learners
//                 who are passionate about acquiring knowledge and skills. We
//                 envision a future where learning is seamless, engaging, and
//                 enjoyable for everyone.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AboutUs;
