// import React from "react";
// import { Container, Row, Col } from "reactstrap";

// import heroImge from "../../assets/images/hero-img1.png";

// const HeroSection = () => {
//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="6" md="6">
//             <div className="hero__content">
//               <h2 className="mb-4 font-semibold text-2xl leading-tight">
//                 Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
//               </h2>
//               <p className="mb-5">
//                 Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
//                 Aut saepe voluptatum earum delectus <br /> deserunt id iste,
//                 quas officiis et repellat!
//               </p>
//               <div className="w-60 border border-teal-200 rounded-full flex justify-between items-center mt-4">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="py-1 pl-4 w-4/5 border-none outline-none"
//                 />
//                 <button className="btn px-4 py-1 rounded-full bg-teal-500 text-white">
//                   Search
//                 </button>
//               </div>
//             </div>
//           </Col>

//           <Col lg="6" md="6" className="flex justify-center">
//             <img src={heroImge} alt="" className="" />
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default HeroSection;
import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/images/hero-img1.png";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Aut saepe voluptatum earum delectus <br /> deserunt id iste,
                quas officiis et repellat!
              </p>
            </div>
            <div className="search">
              <input type="text" placeholder="Search" />
              <button className="btn">Search</button>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
