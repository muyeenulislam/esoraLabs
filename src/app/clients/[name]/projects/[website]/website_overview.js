import YellowButton from "@/components/buttons/yellowbutton";
import React from "react";
import { FiMessageSquare, FiPhone } from "react-icons/fi";

const Website_overview = ({ data }) => {
  console.log("data", data);

  return (
    <div className="border h-auto mx-[200px] mt-[24px] rounded-2xl shadow-md">
      <div className=" p-[24px] bg-[#0B132B] rounded-t-2xl"></div>
      <div className="grid grid-cols-2 justify-between  bg-[#0B132B] ">
        <div className="px-[24px] pb-[24px] text-[#FFFFFF]">
          <div className="text-[24px] font-bold">Project Overview</div>
          <div className="text-[16px] font-normal">3 revisions remaining</div>
        </div>
      </div>

      <div className="grid grid-cols-2 pb-[24px] justify-between bg-gray-100">
        <div className="px-[24px] pt-[24px] pb-[12px] text-[20px] font-bold">
          <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
            Industry type
          </div>
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            Transportatione.
          </div>
        </div>
        <div className="px-[24px] pt-[24px] pb-[12px] text-[20px] font-bold">
          <div className="text-[#0B132B] font-sans pb-[12px] text-base font-normal leading-5">
            Created On
          </div>{" "}
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            01/27/2023
          </div>
        </div>
      </div>

      <div className=" p-[24px]">
        <div className="text-[#0B132B] pb-4 text-[16px] font-bold">
          Description
        </div>
        <div className=""></div>
        <div className=" text-gray-500 self-stretch text-[14px] font-sans text-base font-normal leading-5">
          Greetings, we represent a business operating in the field of mobility,
          dedicated to providing eco-friendly last mile delivery options using
          bicycles. <br />
          Our objective is to present our business clients with a digital
          platform by the end of this year that allows them to efficiently
          handle all their deliveries in an environmentally responsible manner.
          We are in search of a service provider who aligns with our ethical
          values, demonstrates prompt responsiveness, and can be relied upon for
          a lasting partnership.
        </div>
      </div>
      {data && (
        <div className="flex justify-between rounded-b-lg justify-between  bg-[#0B132B] ">
          <div className="px-[24px] pb-[24px] text-[#FFFFFF]">
            <div className="text-[24px] mt-5 font-bold">Deliverables</div>
            <div className="text-[16px] font-normal">3 revisions remaining</div>
          </div>
          <div className="p-5 mt-2">
            <YellowButton
              imagealign="left"
              image={"/images/upload-cloud.svg"}
              text={"Upload"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Website_overview;
