"use client";

import React, { useState } from "react";
import { Select } from "antd";
import Image from "next/image";

import SearchBar from "@/components/searchbar/searchbar";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";
import Pagination from "@/components/pagination/pagination";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";

import settingsTeamData from "@/utils/mockdata/settingsteamdata";
import roleData from "@/utils/mockdata/roledata";

const Members = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(settingsTeamData?.length / 10);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex flex-col">
          <p className="m-0 text-primary text-[14px] font-bold">
            {record?.name}
          </p>
          <p className="m-0 text-subtitleText text-[14px] font-normal">
            {record?.email}
          </p>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => (
        <Select
          className="w-full table-select"
          value={record?.role}
          showSearch
          suffixIcon={
            <Image
              src={"/images/table-dropdown-icon.svg"}
              height={20}
              width={20}
              alt=""
              className={isSelectOpen ? "rotate-180" : ""}
            />
          }
          onDropdownVisibleChange={handleOpenChange}
        >
          {roleData?.map((roleData, index) => (
            <Select.Option key={index} value={roleData?.value}>
              {roleData?.title}
            </Select.Option>
          ))}
        </Select>
      ),
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
          <WhiteButtonTable text="View" />
        </div>
      ),
    },
  ];

  const handleOpenChange = (open) => {
    setIsSelectOpen(open);
  };

  return (
    <div>
      <SearchBar
        value={search || undefined}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="h-[1px] bg-grayBorderDashboard my-4"></div>
      <div className="border border-gray-200 shadow-clientCard rounded-2xl">
        <TableWithoutCheckbox columns={columns} data={settingsTeamData} />
        <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Members;
