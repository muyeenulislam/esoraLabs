"use client";

import React from "react";
import Image from "next/image";

import { FiMessageSquare, FiPhone } from "react-icons/fi";

const ProfileDetailsOverview = ({ data }) => {
  return (
    <div className="border h-auto mx-[200px] mt-[32px] rounded-2xl shadow-md">
      <div className="flex justify-between  items-center p-[24px] bg-[#0B132B] rounded-t-2xl">
        <div className="flex">
          <Image
            src="/images/user.svg"
            className="p-[16px] rounded-full bg-[#F7D046] mr-[16px]"
            height={60}
            width={60}
            alt=""
          />
          <div>
            <div className="text-[#FFFFFF] text-[20px] font-bold">
              {data?.name}
            </div>
            <div className="text-[#FFFFFFCC] text-[16px]">{data?.company}</div>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center bg-[#FFFFFF] text-[#52596D] px-[20px] py-[14px] border border-gray-300 rounded-[10px] mr-[10px] shadow">
            <FiPhone className="mr-[8px]" />
            Call
          </div>
          <div className="flex items-center bg-[#FFFFFF] text-[#52596D] px-[20px] py-[14px] border border-gray-300 rounded-[10px] shadow ">
            <FiMessageSquare className="mr-[8px]" /> Send a Message
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-between border-t border-gray-300 bg-[#0B132B] ">
        <div className="px-[24px] pt-[25px] pb-[12px] text-[#FFFFFF]">
          <div className="text-[14px] font-normal">Name</div>
          <div className="text-[16px] font-bold">{data?.name}</div>
        </div>
        <div className="px-[24px] pt-[25px] pb-[12px] text-[#FFFFFF]">
          <div className="text-[14px] font-normal">Position</div>
          <div className="text-[16px] font-bold">{data?.jobPosition}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 bg-[#0B132B] ">
        <div className="px-[24px] pt-[12px] pb-[24px] text-[#FFFFFF]">
          <div className="text-[14px] font-normal">Phone Number</div>
          <div className="text-[16px] font-bold">{data?.phoneNumber}</div>
        </div>
        <div className="px-[24px] pt-[12px] pb-[24px] text-[#FFFFFF]">
          <div className="text-[14px] font-normal">Email Address</div>
          <div className="text-[16px] font-bold">{data?.email}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[1px]">
        <div>
          <div className="bg-[#F7D046] text-[#0B132B] text-[20px] font-bold py-[24px]  text-center ">
            {/* {data?.project} */}
            12
          </div>
          <div className="bg-[#0B132B] text-white text-[14px] py-[12px] text-center rounded-bl-2xl">
            Projects
          </div>
        </div>
        <div>
          <div className="bg-[#F7D046] text-[#0B132B] text-[20px] font-bold py-[24px]  text-center ">
            {/* {data?.spent} */}
            123k
          </div>
          <div className="bg-[#0B132B] text-white text-[14px] py-[12px] text-center ">
            Spent
          </div>
        </div>
        <div>
          <div className="bg-[#F7D046] text-[#0B132B] text-[20px] font-bold py-[24px]  text-center ">
            {data?.subscriptionStatus}
          </div>
          <div className="bg-[#0B132B] text-white text-[14px] py-[12px] text-center rounded-br-2xl">
            Subscription
          </div>
        </div>
      </div>

      <div className="px-[24px] pt-[24px] pb-[12px] text-[20px] font-bold">
        Company Details
      </div>
      <div className="grid grid-cols-2 justify-between">
        <div className="px-[24px] pt-[12px] pb-[12px] ">
          <div className="text-[#52596D] text-[14px]">Company Name</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            {data?.company}
          </div>
        </div>
        <div className="px-[24px] pt-[12px] pb-[12px] ">
          <div className="text-[#52596D] text-[14px]">Industry type</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            Transportation
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-between">
        <div className="px-[24px]  py-[12px] ">
          <div className="text-[#52596D] text-[14px]">Company Size</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            {data?.size}
          </div>
        </div>
        <div className="px-[24px] py-[12px] ">
          <div className="text-[#52596D] text-[14px]">Company Website</div>
          <div className="text-[#0B132B] text-[16px] font-bold">
            {data?.website}
          </div>
        </div>
      </div>
      <div className="pt-[12px] pb-[24px] px-[24px]">
        <div className="text-[#52596D] text-[14px]">Location</div>
        <div className="text-[#0B132B] text-[16px] font-bold">
          {data?.location}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsOverview;
