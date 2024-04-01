"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

import { FiMessageSquare, FiPhone, FiUserCheck } from "react-icons/fi";

const ProfileDetailsOverview = ({ data }) => {
  return (
    <div className="border h-auto mx-[200px] mt-[32px] rounded-2xl shadow-md">
      <div className="flex justify-between  items-center p-[24px] bg-[#0B132B] rounded-t-2xl">
        <div className="flex">
          <img
            src="/images/user.svg"
            className="p-[16px] rounded-full bg-[#F7D046] mr-[16px]  "
          />
          <div>
            <div className="text-[#FFFFFF] text-[20px] font-bold">
              {data?.name}
            </div>
            <div className="text-[#FFFFFFCC] text-[16px]">
              {data?.designation}
            </div>
          </div>
        </div>
        <div className="flex">
          <button className="flex items-center bg-[#FFFFFF] text-[#52596D] px-[20px] py-[14px] border border-gray-300 rounded-[10px]  shadow">
            <FiPhone className="mr-[8px]" />
            call
          </button>
          <button className="flex items-center bg-[#FFFFFF] text-[#52596D] px-[20px] py-[14px] border border-gray-300 rounded-[10px] mx-[10px] shadow ">
            <FiMessageSquare className="mr-[8px]" />
            Message
          </button>
          <button className="flex items-center bg-[#F7D046] text-[#0B132B] px-[20px] py-[14px]   rounded-[10px] shadow ">
            <FiUserCheck className="mr-[8px]" />
            Assign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1px]">
        <div>
          <div className="bg-[#F7D046] text-[#0B132B] text-[20px] font-bold py-[24px]  text-center ">
            {data?.projectAssigned}
          </div>
          <div className="bg-[#0B132B] text-white text-[14px] py-[12px] text-center rounded-bl-2xl">
            Projects Assigned
          </div>
        </div>
        <div>
          <div className="bg-[#F7D046] text-[#0B132B] text-[20px] font-bold py-[24px]  text-center ">
            {data?.role}
          </div>
          <div className="bg-[#0B132B] text-white text-[14px] py-[12px] text-center rounded-br-2xl">
            Role
          </div>
        </div>
      </div>

      <div className="px-[24px] pt-[24px]  text-[20px] font-bold">
        Member Details
      </div>
      <div className="grid grid-cols-3 justify-between">
        <div className="px-[24px] pt-[24px] pb-[12px] ">
          <div className="text-[#52596D] text-[14px]">Full Name</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            {data?.name}
          </div>
        </div>
        <div className="px-[24px] pt-[24px] pb-[12px] ">
          <div className="text-[#52596D] text-[14px]">Designation</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            {data?.designation}
          </div>
        </div>
        <div className="px-[24px] pt-[24px] pb-[12px] ">
          <div className="text-[#52596D] text-[14px]">Email</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            {data?.email}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 justify-between">
        <div className="px-[24px]  py-[12px] ">
          <div className="text-[#52596D] text-[14px]">Phone Number</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            {data?.number}
          </div>
        </div>
        <div className="px-[24px] py-[12px] col-span-2">
          <div className="text-[#52596D] text-[14px] ">Address</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            {data?.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsOverview;
