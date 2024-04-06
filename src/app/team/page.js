"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Modal, Select, message } from "antd";

import ApiCaller from "@/config/apicaller";

import Loader from "@/components/loader";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Pagination from "@/components/pagination/pagination";
import SearchBar from "@/components/searchbar/searchbar";
import Dropdown from "@/components/dropdown/dropdown";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import TeamCard from "@/components/cards/teamcard";
import DefaultInput from "@/components/inputs/defaultinput";

import roleData from "@/utils/mockdata/roledata";

const breadcumbData = [{ title: "Team", link: "/team", active: true }];

const Team = () => {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState("newest");
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [state, setState] = useState({
    role: "",
    name: "",
    phoneNumber: "",
    designation: "",
    email: "",
  });

  const fetchTeamData = async () => {
    try {
      setLoading(true);

      const response = await ApiCaller.Get(
        `/admin/getteams?name=${search}&limit=${limit}&offset=0`
      );

      if (response?.status === 200) {
        setData(response.data.teams);
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

  useEffect(() => {
    fetchTeamData();
  }, []);

  const handlePagination = async (pageNumber) => {
    const offset = (pageNumber - 1) * limit;

    try {
      setLoading(true);
      const response = await ApiCaller.Get(
        `/admin/getteams?name=${search}&limit=${limit}&offset=${offset}`
      );
      if (response?.status === 200) {
        setData(response.data.teams);
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

  const handleFilterChange = (e) => {
    setSortFilter(e);
  };

  const handleAdd = async () => {
    const data = {
      name: state?.name,
      email: state?.email,
      phoneNumber: state?.phoneNumber,
      password: "testPass",
      confirmPassword: "testPass",
      role: state?.role,
      designation: state?.designation,
    };

    const response = await ApiCaller.Post(`/admin/teamregister`, data);

    if (response?.status === 200) {
      setOpen(false);
      message.success("Team member added successfully");
      fetchTeamData();
    } else {
      console.log(response);
      message.error(response?.message);
    }
  };

  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <div className="flex justify-between">
        <PageHeading
          heading="Team"
          subHeading="Track, manage and forecast your team."
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
        <div style={{ width: "460px" }}>
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
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {data?.map((item, index) => (
            <TeamCard
              data={item}
              key={index}
              onClick={() => router.push(`/team/${item._id}`)}
            >
              <div>Assign</div>
              <Link href={`/team/${item._id}`}>View Details</Link>
            </TeamCard>
          ))}
        </div>
      )}
      <Spacer height="32px" />
      <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder">
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onChange={handlePagination}
        />
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
          className="add-team-member"
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
              <Spacer height="6px" />
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Phone Number
              </p>
              <Spacer height="6px" />
              <DefaultInput
                value={state.phoneNumber}
                placeholder="Enter phone number"
                onChange={(e) =>
                  setState({ ...state, phoneNumber: e.target.value })
                }
                type="number"
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
