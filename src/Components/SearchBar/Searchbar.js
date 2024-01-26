import React from "react";

const SearchBar = (props) => {
  return (
    <div className="realtive w-[460px] py-[10px] px-[14px] border border-gray300 shadow-sm bg-white rounded-lg flex">
      <img src="/images/searchIcon.svg" className="mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="text-[16px] w-full outline-none"
        {...props}
      />
    </div>
  );
};

export default SearchBar;
