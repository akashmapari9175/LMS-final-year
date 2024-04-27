import React from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import Counter from "../../components/Counter";
const LandingPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <Counter></Counter>
      {/* Unique Selling Proposition (USP) */}
      <div className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg mb-6">
            Highlight your unique selling points here.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {/* Feature 1 */}
            <div className="border-2 p-6 m-6 text-justify">
              <h3 className="text-xl font-bold mb-2">Feature 1</h3>
              <p>
                Description of feature 1 Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed consequat turpis quis justo consectetur, id
                lacinia nisl facilisis. Sed porttitor, libero ac sodales
                ullamcorper.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border-2 p-6 m-6 text-justify">
              <h3 className="text-xl font-bold mb-2">Feature 2</h3>
              <p>
                Description of feature 2 Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
                non arcu vel nisl condimentum euismod. Curabitur sit amet turpis
                risus.
              </p>
            </div>

            {/* Feature 3 */}
            <div className=" border-2 p-6 m-6 text-justify">
              <h3 className="text-xl font-bold mb-2">Feature 3</h3>
              <p>
                Description of feature 3 Fusce sed libero non mi semper commodo.
                Donec sed augue at justo auctor malesuada. Ut a turpis justo.
                Praesent non erat at metus tincidunt convallis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compelling Benefits */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Benefits of Our Service</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Benefit 1 */}
            <div className="border-2 p-6 m-6 text-justify">
              <h3 className="text-xl font-bold mb-2">Benefit 1</h3>
              <p>
                Description of benefit 1 Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed consequat turpis quis justo consectetur, id
                lacinia nisl facilisis. Sed porttitor, libero ac sodales
                ullamcorper.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="border-2 p-6 m-6 text-justify">
              <h3 className="text-xl font-bold mb-2">Benefit 2</h3>
              <p>
                Description of benefit 2 Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
                non arcu vel nisl condimentum euismod. Curabitur sit amet turpis
                risus.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="border-2 p-6 m-6 text-justify">
              <h3 className="text-xl font-bold mb-2">Benefit 3</h3>
              <p>
                Description of benefit 3 Fusce sed libero non mi semper commodo.
                Donec sed augue at justo auctor malesuada. Ut a turpis justo.
                Praesent non erat at metus tincidunt convallis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strong Call to Action (CTA) */}
      <div className="bg-gray-800 text-white py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">Sign up today for exclusive benefits!</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full">
            Sign Up Now
          </button>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">&copy; Learnify. All rights reserved.</p>
          <div className="flex justify-center mt-4">
            <a href="#" className="text-gray-400 hover:text-white px-3">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white px-3">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white px-3">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
