import React from "react";
import { Select } from "antd";

const Dropdown = (props) => {
  return (
    <div className="w-[240px]  border border-gray300 shadow-sm bg-white rounded-lg h-full flex justify-center items-center">
      <Select className="w-full custom-select" {...props}>
        {props.children}
      </Select>
    </div>
  );
};

export default Dropdown;
