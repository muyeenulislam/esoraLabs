import React from "react";

const Content = ({ children }) => {
  return (
    <div className="w-full my-[16px] p-[48px] rounded-l-3xl bg-slate-200">
      {children}
    </div>
  );
};

export default Content;
