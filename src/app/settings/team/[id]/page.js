"use client";

import React, { useState } from "react";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import Spacer from "@/components/spacer/spacer";
import Members from "../../members";
import Role from "../../role";
import PageHeading from "@/components/pageheading/pageheading";
import settingsTeamData from "@/utils/mockdata/settingsteamdata";
import roleData from "@/utils/mockdata/roledata";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";
import Pagination from "@/components/pagination/pagination";
import { Select, Space, Tag } from "antd";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Team = () => {
  const [totalPage, setTotalPage] = useState(settingsTeamData?.length / 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const router = useRouter()

  const handleCancel = () => {
    router.push('/settings');
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
    },

    {
      title: "Priority",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color;
            if (tag === "High") {
              color = "Red";
            }
            if (tag === "Medium") {
              color = "Tomato";
            }
            if (tag === "Low") {
              color = "Green";
            }
            return (
              <Tag className="rounded-full" color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Status",
      key: "Status",
      dataIndex: "Status",
      render: (_, { Status }) => (
        <>
          {Status.map((tag) => {
            let color;
            if (tag === "In progress") {
              color = "blue";
            }
            if (tag === "Under Review") {
              color = "default";
            }
            if (tag === "Completed") {
              color = "success";
            }
            return (
              <Tag
                className="rounded-full font-semibold"
                color={color}
                key={tag}
              >
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Assigned At",
      dataIndex: "Created",
    },
    {
      title: "Due By",
      dataIndex: "Due",
    },
    {
      title: " ",
      dataIndex: "action",
      width: 350,
      render: (text, record) => (
        <div className="flex items-center justify-end gap-3">
          <p className="m-0 text-subtitleText text-[14px] font-medium">
            Delete
          </p>
 
            <WhiteButtonTable onCli text="View" />
     
        </div>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      address: `London, Park Lane no. ${i}`,
      tags: ["High"],
      Status: ["Under Review"],
      Created: `01/27/2023`,
      Due: `01/27/2023`,
    });
  }

  return (
    <div>
      <Spacer height="32px" />
      <div className="flex items-start justify-between">
        <PageHeading
          heading="Md Mohiuddin"
          subHeading="Mange your team members right from here."
        />
        <div className="flex space-x-4">
          <button  className="px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-xs p-4">
            {" "}
            <img src="/images/trash-2.svg" />{" "}
          </button>
          <button onClick={handleCancel}  className="px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-xs p-4">
            <img src="/images/x.svg" />
          </button>
        </div>
      </div>
      <Spacer height="32px" />
      <Spacer height="32px" />
      <div className="w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="headers text-white text-[20px] font-bold m-0">
              Md Mohiuddin
            </h2>
            <p className="text-[16px] mt-4 font-normal text-[#FFFFFFCC] m-0">
              Joined at 11 January, 2023
            </p>
          </div>
          <div className="flex gap-4">
            <WhiteButton text="Send Message" onClick={() => setIsOpen(true)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 12.5C17.5 12.942 17.3244 13.366 17.0118 13.6785C16.6993 13.9911 16.2754 14.1667 15.8333 14.1667H5.83333L2.5 17.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V12.5Z"
                  stroke="#434A60"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </WhiteButton>
            <YellowButton text="Assign a Task" />
          </div>
        </div>
        <div className="flex justify-between p-6  bg-[#F9FAFB] items-center flex-1">
          <div>
            <div className="text-gray-700 font-sans text-base font-normal leading-5">
              Role
            </div>
            <div className="overflow-hidden leading-6 truncate font-bold text-black font-sans text-xl">
              Engineering Lead (Backend)
            </div>
          </div>
          <div className="mr-64">
            <div className="text-gray-700 font-sans text-base font-normal leading-5">
              Email
            </div>
            <div className="overflow-hidden leading-6 truncate font-bold text-black font-sans text-xl">
              mohiuddin@gmail.com
            </div>
          </div>
        </div>
        <div className="p-[24px]">
          <div className="overflow-hidden  leading-6 truncate font-bold text-black font-sans text-xl">
            About
          </div>
          <div className="text-gray-700 mt-5 font-sans text-base font-normal leading-5">
            Greetings, we represent a business operating in the field of
            mobility, dedicated to providing eco-friendly last mile delivery
            options using bicycles. Our objective is to present our business
            clients with a digital platform by the end of this year that allows
            them to efficiently handle all their deliveries in an
            environmentally responsible manner. We are in search of a service
            provider who aligns with our ethical values, demonstrates prompt
            responsiveness, and can be relied upon for a lasting partnership.
          </div>
        </div>

        <div className="flex p-[24px] bg-[#F9FAFB]  flex-col">
          <h2 className="headers mb-6 text-[#0B132B] text-[20px] font-bold m-0">
            Assigned Tasks
          </h2>

          <div className="border border-gray-200 shadow-clientCard rounded-2xl">
            <TableWithoutCheckbox columns={columns} data={data} />
            <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
              <Pagination
                totalPages={totalPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;