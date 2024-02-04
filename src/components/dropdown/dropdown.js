import React from "react";

const Dropdown = (props) => {
  return (
    <div className="realtive w-[212px] py-[10px] px-[14px] border border-gray300 shadow-sm bg-white rounded-lg ">
      <select className="w-full custom-select" {...props}>
        <option>Newest First</option>
        <option>Oldest First</option>
      </select>
    </div>
  );
};

export default Dropdown;
