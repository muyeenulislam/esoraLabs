import React from "react";
import Image from "next/image";
import { FiPhone, FiMail } from "react-icons/fi";

const ClientCard = (props) => {
  return (
    <div
      {...props}
      className="border-2 border-grayBorderDashboard rounded-2xl bg-white shadow-clientCard flex flex-col clientCard"
    >
      <div className="p-4 flex flex-col">
        <div className="flex mb-6 items-center">
          <Image
            src="/images/user.svg"
            className="p-[10px] rounded-full bg-fadedYellow mr-3 userImg opacity-50"
            height={38}
            width={38}
            alt="user"
          />

          <div>
            <div className="text-[16px] font-bold text-primary">
              {props?.data?.name}
            </div>
            <div className="text-[14px] font-normal text-subtitleText">
              {props?.data?.company}
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <div className="p-1 rounded-full mr-2 border border-grayBorder bottomIcon text-black">
            <FiPhone className="text-subtitleText bottomIcon" />
          </div>
          <div className="text-[14px] font-medium text-subtitleText userInfoText">
            {props?.data?.number}
          </div>
        </div>
        <div className="flex items-center">
          <div className="p-1 rounded-full mr-2 border border-grayBorder bottomIcon text-black">
            <FiMail className="text-subtitleText bottomIcon" />
          </div>
          <div className="text-[14px] font-medium text-subtitleText userInfoText">
            {props?.data?.email}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[1px]">
        <div>
          <div className="bg-fadedYellow2 text-primary text-[16px] headers py-3 text-center bottomSection">
            {props?.data?.project}
          </div>
          <div className="bg-primary text-white text-[12px] py-[6px] text-center rounded-bl-2xl">
            Projects
          </div>
        </div>
        <div>
          <div className="bg-fadedYellow2 text-primary text-[16px] headers py-3 text-center bottomSection">
            {props?.data?.spent}
          </div>
          <div className="bg-primary text-white text-[12px] py-[6px] text-center ">
            Spent
          </div>
        </div>
        <div>
          <div className="bg-fadedYellow2 text-primary text-[16px] headers py-3 text-center bottomSection">
            {props?.data?.subscription}
          </div>
          <div className="bg-primary text-white text-[12px] py-[6px] text-center rounded-br-2xl">
            Subscription
          </div>
        </div>
      </div>
      <div className="p-4 text-right text-[14px] font-medium text-primary flex justify-end">
        {props?.children}
      </div>
    </div>
  );
};

export default ClientCard;
