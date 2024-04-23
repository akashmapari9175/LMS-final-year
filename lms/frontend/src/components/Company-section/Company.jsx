// // import React from "react";
// // import { Container, Row, Col } from "reactstrap";

// // const Company = () => {
// //   return (
// //     <section>
// //       <Container>
// //         <Row>
// //           <Col lg="2" md="3" sm="4" xs="6">
// //             <h3 className="d-flex align-items-center gap-1">
// //               <i className="ri-vimeo-line"></i> Vimeo
// //             </h3>
// //           </Col>

// //           <Col lg="2" md="3" sm="4" xs="6">
// //             <h3 className="d-flex align-items-center gap-1">
// //               <i className="ri-pinterest-line"></i> Pinterest
// //             </h3>
// //           </Col>

// //           <Col lg="2" md="3" sm="4" xs="6">
// //             <h3 className="d-flex align-items-center gap-1">
// //               <i className="ri-dribbble-line"></i> Dribble
// //             </h3>
// //           </Col>

// //           <Col lg="2" md="3" sm="4" xs="6">
// //             <h3 className="d-flex align-items-center gap-1">
// //               <i className="ri-apple-fill"></i> Apple
// //             </h3>
// //           </Col>

// //           <Col lg="2" md="3" sm="4" xs="6">
// //             <h3 className="d-flex align-items-center gap-1">
// //               <i className="ri-finder-fill"></i> Finder
// //             </h3>
// //           </Col>

// //           <Col lg="2" md="3" sm="4" xs="6">
// //             <h2 className="d-flex align-items-center gap-1">
// //               <i className="ri-google-fill"></i> Google
// //             </h2>
// //           </Col>
// //         </Row>
// //       </Container>
// //     </section>
// //   );
// // };

// // export default Company;

// import React from "react";
// import { Container, Row, Col } from "reactstrap";

// const Company = () => {
//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="2" md="3" sm="4" xs="6" className="flex items-center gap-1">
//             <i className="ri-vimeo-line"></i>
//             <h3>Vimeo</h3>
//           </Col>

//           <Col lg="2" md="3" sm="4" xs="6" className="flex items-center gap-1">
//             <i className="ri-pinterest-line"></i>
//             <h3>Pinterest</h3>
//           </Col>

//           <Col lg="2" md="3" sm="4" xs="6" className="flex items-center gap-1">
//             <i className="ri-dribbble-line"></i>
//             <h3>Dribble</h3>
//           </Col>

//           <Col lg="2" md="3" sm="4" xs="6" className="flex items-center gap-1">
//             <i className="ri-apple-fill"></i>
//             <h3>Apple</h3>
//           </Col>

//           <Col lg="2" md="3" sm="4" xs="6" className="flex items-center gap-1">
//             <i className="ri-finder-fill"></i>
//             <h3>Finder</h3>
//           </Col>

//           <Col lg="2" md="3" sm="4" xs="6" className="flex items-center gap-1">
//             <i className="ri-google-fill"></i>
//             <h2>Google</h2>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Company;
import React from "react";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assets/images/about-us.png";
import CountUp from "react-countup";

const AboutUs = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img rounded-lg overflow-hidden">
              <img src={aboutImg} alt="" className="w-full" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content pl-10 md:pl-0">
              <h2 className="font-semibold text-3xl md:text-4xl mb-4">
                About Us
              </h2>
              <p className="mb-6 text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi cupiditate animi deserunt libero nesciunt corporis
                explicabo nobis ex quo molestiae!
              </p>

              <div className="about__counter">
                <div className="flex gap-5 items-center mb-4">
                  <div>
                    <span className="text-2xl font-semibold text-green-600">
                      <CountUp start={0} end={25} duration={2} suffix="K" />
                    </span>
                    <p className="text-base font-semibold text-gray-700">
                      Completed Projects
                    </p>
                  </div>

                  <div>
                    <span className="text-2xl font-semibold text-green-600">
                      <CountUp start={0} end={12} duration={2} suffix="M" />
                    </span>
                    <p className="text-base font-semibold text-gray-700">
                      Patients Around World
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <div>
                    <span className="text-2xl font-semibold text-green-600">
                      <CountUp start={0} end={95} duration={2} suffix="M" />
                    </span>
                    <p className="text-base font-semibold text-gray-700">
                      Ideas Raised Funds
                    </p>
                  </div>

                  <div>
                    <span className="text-2xl font-semibold text-green-600">
                      <CountUp start={0} end={5} duration={2} suffix="K" />
                    </span>
                    <p className="text-base font-semibold text-gray-700">
                      Categories Served
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
