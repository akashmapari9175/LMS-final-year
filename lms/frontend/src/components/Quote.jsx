import React from "react";
import HighlightText from "./HighLightText";

const Quote = () => {
  return (
    <div className=" text-xl md:text-3xl font-semibold mx-auto py-5 pb-20 text-center text-black">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HighlightText text={"combines technology"} />,{" "}
      <span className="bg-gradient-to-br from-[#00C6FB] via-[#005BEA] to-[#00C6FB] text-transparent bg-clip-text font-bold">
        expertise
      </span>
      , and community to create an
      <span className="bg-gradient-to-br from-[#00C6FB] via-[#005BEA] to-[#00C6FB] text-transparent bg-clip-text font-bold">
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;
