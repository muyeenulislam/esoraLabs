"use client";

import React from "react";
import Image from "next/image";

import { FiMessageSquare, FiPhone, FiUserCheck } from "react-icons/fi";

import Spacer from "@/components/spacer/spacer";

const ProfileDetailsOverview = ({ data }) => {
  const dataArr = [
    { title: "Full Name", value: data?.name },
    { title: "Designation", value: data?.designation },
    { title: "Email", value: data?.email },
    { title: "Phone Number", value: data?.phoneNumber },
    { title: "Address", value: data?.address },
  ];

  return (
    <div className="border h-auto mx-[100px] lg:mx-[150px] mt-[32px] rounded-2xl shadow-md">
      <div className="flex justify-between flex-wrap gap-2 items-center p-[24px] bg-[#0B132B] rounded-t-2xl">
        <div className="flex">
          <Image
            height={60}
            width={60}
            alt=""
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
        <div className="flex gap-2 flex-wrap">
          <button className="flex items-center bg-[#FFFFFF] text-[#52596D] px-[20px] py-[14px] border border-gray-300 rounded-[10px]  shadow">
            <FiPhone className="mr-[8px]" />
            call
          </button>
          <button className="flex items-center bg-[#FFFFFF] text-[#52596D] px-[20px] py-[14px] border border-gray-300 rounded-[10px] shadow ">
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
            {data?.projects?.length}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between">
        {dataArr?.map((item, index) => (
          <div className="px-[24px] pt-[24px] pb-[12px]" key={index}>
            <div className="text-[#52596D] text-[14px]">{item?.title}</div>
            <div className="text-[#0B132B] text-[16px] font-bold">
              {item?.value ?? "N/A"}
            </div>
          </div>
        ))}
      </div>
      <Spacer height="24px" />
    </div>
  );
};

export default ProfileDetailsOverview;
