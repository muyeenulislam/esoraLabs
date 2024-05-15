"use client";

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import Image from "next/image";

import ApiCaller from "@/config/apicaller";

import SearchBar from "@/components/searchbar/searchbar";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";
import Pagination from "@/components/pagination/pagination";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";

import { useRouter } from "next/navigation";

const Members = (props) => {
  const route = useRouter();

  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [teamsCount, setTeamsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    fetchTeamData();
  }, [search]);

  const handleView = (id) => {
    route.push(`/settings/team/${id}`);
  };

  const fetchTeamData = async () => {
    try {
      setLoading(true);

      const response = await ApiCaller.Get(
        `/admin/getteams?name=${search}&limit=${limit}&offset=0`
      );

      if (response?.status === 200) {
        setData(response.data.teams);
        setTeamsCount(response.data.teamsCount);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching activity data:", error);
    }
  };

  const handlePagination = async (pageNumber) => {
    const offset = (pageNumber - 1) * limit;

    try {
      setLoading(true);
      const response = await ApiCaller.Get(
        `/admin/getteams?name=${search}&limit=${limit}&offset=${offset}`
      );
      if (response?.status === 200) {
        setData(response.data.teams);
        setTeamsCount(response.data.teamsCount);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response);
      }
      setOffset(offset);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching activity data:", error);
    }
  };

  const handleOpenChange = (e) => {
    setIsSelectOpen(e);
  };
  const handleRoleChange = (role, team) => {
    console.log(role);
  };

  console.log(data);

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
          className="w-full table-select capitalize"
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
          onChange={(e) => handleRoleChange(e, record)}
        >
          {props?.roleData?.map((roleData, index) => (
            <Select.Option
              key={index}
              value={roleData?.title}
              className="capitalize"
            >
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
          <WhiteButtonTable
            onClick={() => handleView(record?._id)}
            text="View"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <SearchBar
        value={search || undefined}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="h-[1px] bg-grayBorderDashboard my-4"></div>
      <div className="border border-gray-200 shadow-clientCard rounded-2xl">
        <TableWithoutCheckbox
          columns={columns}
          data={data}
          loading={loading || props?.roleLoading}
        />
        <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
          <Pagination
            totalPages={teamsCount}
            limit={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onChange={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Members;
