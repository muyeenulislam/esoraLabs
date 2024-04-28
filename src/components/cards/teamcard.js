import React from "react";
import Image from "next/image";
import { FiPhone, FiMail } from "react-icons/fi";

const TeamCard = (props) => {
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
              {props?.data?.designation}
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <div className="p-1 rounded-full mr-2 border border-grayBorder bottomIcon text-black">
            <FiPhone className="text-subtitleText bottomIcon" />
          </div>
          <div className="text-[14px] font-medium text-subtitleText userInfoText">
            {props?.data?.phoneNumber}
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
      <div className="grid grid-cols-2 gap-[1px]">
        <div>
          <div className="bg-fadedYellow2 text-primary text-[16px] headers py-3 text-center bottomSection">
            {props?.data?.projects?.length}
          </div>
          <div className="bg-primary text-white text-[12px] py-[6px] text-center rounded-bl-2xl">
            Projects Assigned
          </div>
        </div>

        <div>
          <div className="bg-fadedYellow2 text-primary text-[16px] headers py-3 text-center bottomSection">
            {props?.data?.role}
          </div>
          <div className="bg-primary text-white text-[12px] py-[6px] text-center rounded-br-2xl">
            Role
          </div>
        </div>
      </div>
      <div className="flex justify-between p-4 text-[14px] font-medium text-primary">
        {props?.children}
      </div>
    </div>
  );
};

export default TeamCard;
