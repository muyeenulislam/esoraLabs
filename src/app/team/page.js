"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Modal, Select } from "antd";

import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import PaginationButton from "@/components/buttons/paginationbutton";
import SearchBar from "@/components/searchbar/searchbar";
import Dropdown from "@/components/dropdown/dropdown";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import TeamCard from "@/components/cards/teamcard";
import DefaultInput from "@/components/inputs/defaultinput";

import { TeamData } from "@/utils/mockdata/teamdata";
import roleData from "@/utils/mockdata/roledata";

const breadcumbData = [{ title: "Team", link: "/team", active: true }];

const Team = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState("newest");
  const [search, setSearch] = useState("");

  const [state, setState] = useState({
    role: "",
    name: "",
    designation: "",
    email: "",
  });

  const handleFilterChange = (e) => {
    setSortFilter(e);
  };

  const handleAdd = () => {
    console.log(state);
  };
  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <div className="flex justify-between">
        <PageHeading
          heading="Clients"
          subHeading="Track, manage and forecast your clients."
        />
        <div className="max-h-6">
          <YellowButton
            image={"/images/new-client-icon.svg"}
            text={"Add Team Member"}
            onClick={() => setOpen(true)}
            imagealign="left"
          />
        </div>
      </div>
      <Spacer height="32px" />
      <div className="flex justify-between">
        <div>
          <SearchBar onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="w-[240px]">
          <Dropdown value={sortFilter} onChange={handleFilterChange}>
            <Select.Option value={"newest"}>Newest First</Select.Option>
            <Select.Option value={"oldest"}>Oldest First</Select.Option>
          </Dropdown>
        </div>
      </div>
      <Spacer height="32px" />
      <div className="grid grid-cols-3 gap-6">
        {TeamData?.map((item, index) => (
          <TeamCard data={item} key={index}>
            <div>Assign</div>
            <Link href={`/team/${item.name}`}>View Details</Link>
          </TeamCard>
        ))}
      </div>
      <Spacer height="32px" />
      <div className="pt-[11px] pb-4 flex items-center justify-between border-t border-t-grayBorder">
        <div className="flex">
          <PaginationButton text={"Previous"} />
          <div className="w-3"></div>
          <PaginationButton text={"Next"} />
        </div>
        <div className="text-subtitleText text-[14px] font-normal">
          Page <span className="font-medium">1</span> of{" "}
          <span className="font-medium">4</span>
        </div>
      </div>
      {isOpen && (
        <Modal
          open={isOpen}
          centered={true}
          onCancel={() => setOpen(false)}
          closeIcon={false}
          footer={[
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton text={"Cancel"} onClick={() => setOpen(false)} />
              <YellowButton text={"Add Member"} onClick={handleAdd} />
            </div>,
          ]}
        >
          <div>
            <h1 className="headers text-headerText text-[20px] font-bold m-0">
              Add Team Member
            </h1>
            <Spacer height="32px" />
            <div>
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Role
              </p>
              <Spacer height="6px" />
              <Dropdown
                placeholder="Select Role"
                value={state?.role || undefined}
                onChange={(e) => setState({ ...state, role: e })}
              >
                {roleData?.map((item, index) => (
                  <Select.Option value={item.value} key={index}>
                    {item?.title}
                  </Select.Option>
                ))}
              </Dropdown>
              <Spacer height="6px" />
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Member Name
              </p>
              <Spacer height="6px" />
              <DefaultInput
                value={state.name}
                placeholder="Enter member name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
              <Spacer height="6px" />
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Designation
              </p>
              <Spacer height="6px" />
              <DefaultInput
                value={state.designation}
                placeholder="Enter Designation"
                onChange={(e) =>
                  setState({ ...state, designation: e.target.value })
                }
              />
              <Spacer height="6px" />
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Email
              </p>
              <Spacer height="6px" />
              <DefaultInput
                value={state.email}
                placeholder="Enter email"
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
              <Spacer height="32px" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Team;
