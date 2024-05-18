import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-br from-[#00C6FB] via-[#005BEA] to-[#00C6FB] text-transparent bg-clip-text font-bold">
      {text}
    </span>
  );
};

export default HighlightText;
