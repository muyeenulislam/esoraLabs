import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center py-6">
        <img src="/images/esoraLogo.svg" alt="logo" className="mr-2" />
        <img src="/images/esoraTextLogo.svg" alt="logo" />
      </div>
      <div className="h-full mb-[80px]  rounded-[50px] bg-[#36C] text-[#0B132B] relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Container;
