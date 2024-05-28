"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, Modal, Dropdown, Select } from "antd";

import ApiCaller from "@/config/apicaller";

import Spacer from "@/components/spacer/spacer";
import WhiteButton from "@/components/buttons/whitebutton";
import DefaultInput from "@/components/inputs/defaultinput";
import YellowButton from "@/components/buttons/yellowbutton";

import roleDatas from "@/utils/mockdata/roledata";
import Members from "./members";
import Role from "./role";

const Team = () => {
  const [activeKey, setActivekey] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([{ label: "", value: "" }]);
  const [roleData, setRoleData] = useState([]);
  const [roleLoading, setRoleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const changeTab = (e) => {
    setActivekey(e);
  };

  const handleAddMoreRoles = () => {
    setRoles([...roles, { label: "", value: "" }]);
  };

  const [role, setRole] = useState()

  const fetchRoleData = async () => {
    try {
      setLoading(true);

      const response = await ApiCaller.Get(
        `/roles`
      );

      if (response?.status === 200) {
        setRole(response.data.roles);
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
    fetchRoleData()
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    try {
      setRoleLoading(true);
      const response = await ApiCaller.Get(`/roles`);
      if (response.status === 200) {
        setRoleData(response.data.roles);
      } else {
        console.log(response);
      }
      setRoleLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddRole = async () => {
    try {
      setRoleLoading(true);

      const filteredRoles = roles.filter((item) => item.label !== "");
      const payload = { roles: filteredRoles };

      const response = await ApiCaller.Post(`/roles`, payload);

      if (response?.status === 200) {
        setTimeout(() => {
          getAllRoles();
        }, 2000);
      } else {
        setRoleLoading(false);
        console.log(response);
      }
      setIsOpen(false);
      setRoles([{ label: "", value: "" }]);
    } catch (error) {
      setLoading(false);
      console.error("Error adding role data:", error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Members",
      children: <Members roleData={roleData} roleLoading={roleLoading} />,
    },
    {
      key: "2",
      label: "Role",
      children: (
        <Role
          roleData={roleData}
          roleLoading={roleLoading}
          getAllRoles={getAllRoles}
        />
      ),
    },
  ];

  //  add team member
  const [isAddTeamMemberOpen, setIsAddTeamMemberOpen] = useState(false);
  const [formState, setFormState] = useState({
    role: "",
    name: "",
    designation: "",
    email: "",
    phoneNumber: "",
  });

  const showAddTeamMemberModal = () => {
    setIsAddTeamMemberOpen(true);
  };

  const handleAddTeamMemberCancel = () => {
    setIsAddTeamMemberOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleAddTeamMember = async () => {
    console.log("formState", formState);
    try {
      const response = await ApiCaller.Post(`/admin/teamregister`, formState);

    if (response?.status === 200) {
      message.success("Team member added successfully");
      // defaultState();
      // fetchTeamData();
      window.location.reload();
    } else {
      console.log(response);
      setLoading(false);
      message.error(response?.message);
    }
    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };
  return (
    <div>
      <Spacer height="32px" />
      <div className="w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="headers text-white text-[20px] font-bold m-0">
              Team
            </h2>
            <p className="text-[16px] font-normal text-[#FFFFFFCC] m-0">
              Add and manage your services
            </p>
          </div>
          <div className="flex gap-4">
            <WhiteButton text="Add Role" onClick={() => setIsOpen(true)} />
            <YellowButton
              text="Add Team Member"
              onClick={showAddTeamMemberModal}
            />
          </div>
        </div>
        <div className="p-6">
          <Tabs
            defaultActiveKey={"1"}
            activeKey={activeKey}
            items={items}
            onChange={changeTab}
          />
        </div>
      </div>
      {isOpen && (
        <Modal
          open={isOpen}
          centered={true}
          onCancel={() => setIsOpen(false)}
          closeIcon={false}
          footer={[
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton text={"Cancel"} onClick={() => setIsOpen(false)} />
              <YellowButton text={"Add"} onClick={handleAddRole} />
            </div>,
          ]}
          className="add-team-member"
        >
          <div>
            <h1 className="headers text-primary text-[20px] m-0">Add Role</h1>
            <Spacer height="32px" />
            {roles?.map((role, index) => (
              <>
                <DefaultInput
                  placeholder="Enter Role Name"
                  onChange={(e) => {
                    let newValue = [...roles];

                    newValue[index].label = e.target.value;
                    newValue[index].value = e.target.value;
                    setRoles(newValue);
                  }}
                  key={index}
                  value={role?.value}
                />
                <Spacer height="16px" />
              </>
            ))}
            <div
              className="flex gap-2 justify-center items-center"
              onClick={handleAddMoreRoles}
            >
              <Image
                src="/images/plus-icon.svg"
                alt=""
                height={20}
                width={20}
              />
              <p className="text-[16px] font-medium text-subtitleText m-0">
                Add another role field
              </p>
            </div>
            <Spacer height="32px" />
          </div>
        </Modal>
      )}
      <Modal
        open={isAddTeamMemberOpen}
        centered={true}
        onCancel={handleAddTeamMemberCancel}
        closeIcon={false}
        footer={[
          <div className="grid grid-cols-2 gap-3" key={1}>
            <WhiteButton text={"Cancel"} onClick={handleAddTeamMemberCancel} />
            <YellowButton text={"Add Member"} onClick={handleAddTeamMember} />
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
            <p className="text-[14px] font-semibold text-[#0B132B] m-0">Role</p>
            <Spacer height="6px" />
            {/* <Dropdown
              placeholder="Select Role"
              // value={state?.role || undefined}
              // onChange={(e) => setState({ ...state, role: e })}
            >
              {roleDatas?.map((item, index) => (
                <Select.Option value={item.value} key={index}>
                  {item?.title}
                </Select.Option>
              ))}
            </Dropdown> */}
            <Select
              
              defaultValue={formState.role} // Set the default value to the selected role
              style={{
                width: 420,
                height: "600px", // Increase the height as needed
                // padding:"30px"
              }}
              onChange={(value) => handleInputChange("role", value)} // Handle selection change
            >
              {roleData.map((role) => (
                <Select.Option key={role._id} value={role.title}>
                  {role.title}
                </Select.Option>
              ))}
            </Select>
            <Spacer height="6px" />
            <p className="text-[14px] font-semibold text-[#0B132B] m-0">Member Name</p>
            <Spacer height="6px" />
            <DefaultInput
              placeholder="Enter member name"
              value={formState.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <Spacer height="6px" />
            <p className="text-[14px] font-semibold text-[#0B132B] m-0">Designation</p>
            <Spacer height="6px" />
            <DefaultInput
              placeholder="Enter Designation"
              value={formState.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
            />
            <Spacer height="6px" />
            <p className="text-[14px] font-semibold text-[#0B132B] m-0">Email</p>
            <Spacer height="6px" />
            <DefaultInput
              placeholder="Enter email"
              value={formState.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <Spacer height="6px" />
            <p className="text-[14px] font-semibold text-[#0B132B] m-0">
              Phone Number
            </p>
            <Spacer height="6px" />
            <DefaultInput
              placeholder="Enter phone number"
              value={formState.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              type="number"
            />
            <Spacer height="32px" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Team;
