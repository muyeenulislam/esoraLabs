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

const breadcumbData = [{ title: "Team", link: "/team", active: true }];

const Team = () => {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState("newest");
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [teamsCount, setTeamsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [role, setRole] = useState([]);
  const [state, setState] = useState({
    role: "",
    name: "",
    phoneNumber: "",
    designation: "",
    email: "",
  });

  useEffect(() => {
    fetchTeamData();
  }, [search, sortFilter]);

  useEffect(() => {
    fetchRoleData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);

      const response = await ApiCaller.Get(
        `/admin/getteams?name=${search}&limit=${limit}&offset=0&sort=${sortFilter}`
      );
      console.log(response);
      if (response?.status === 200) {
        setData(response.data.teams);
        setTeamsCount(response.data.teamsCount);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching activity data:", error);
    }
  };

  const fetchRoleData = async () => {
    try {
      setRoleLoading(true);

      const response = await ApiCaller.Get(`/roles`);

      console.log(response);
      if (response?.status === 200) {
        setRole(response.data.roles);
      }
      setRoleLoading(false);
    } catch (error) {
      setRoleLoading(false);
      console.error("Error fetching activity data:", error);
    }
  };

  const defaultState = () => {
    setState({
      role: "",
      name: "",
      phoneNumber: "",
      designation: "",
      email: "",
    });
  };

  const handlePagination = async (pageNumber) => {
    const offset = (pageNumber - 1) * limit;

    try {
      setLoading(true);
      const response = await ApiCaller.Get(
        `/admin/getteams?name=${search}&limit=${limit}&offset=${offset}&sort=${sortFilter}`
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

  const handleFilterChange = (e) => {
    setSortFilter(e);
  };

  const handleAdd = async () => {
    setLoading(true);
    setOpen(false);
    const data = {
      name: state?.name,
      email: state?.email,
      phoneNumber: state?.phoneNumber,
      role: state?.role,
      designation: state?.designation,
    };
    const response = await ApiCaller.Post(`/admin/teamregister`, data);
    console.log(response);

    if (response?.status === 200) {
      message.success("Team member added successfully");
      defaultState();
      fetchTeamData();
    } else {
      setLoading(false);
      console.error(response?.message);
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
      <div className="flex justify-between gap-5">
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
        <>
          {data?.length === 0 ? (
            <div className="text-center">No Data</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </>
      )}
      <Spacer height="32px" />
      {data?.length > 0 && (
        <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder">
          <Pagination
            totalPages={teamsCount}
            limit={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onChange={handlePagination}
          />
        </div>
      )}
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
                {role?.map((item, index) => (
                  <Select.Option value={item?.title} key={index}>
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
