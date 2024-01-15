import React from "react";

const Content = ({ children }) => {
  return (
    <div className="w-full my-[16px] p-[48px] rounded-l-3xl bg-[#FFF] text-[#0B132B]">
      {children}
    </div>
  );
};

export default Content;
