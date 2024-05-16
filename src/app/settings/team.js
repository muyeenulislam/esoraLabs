"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, Modal } from "antd";

import ApiCaller from "@/config/apicaller";

import Spacer from "@/components/spacer/spacer";
import WhiteButton from "@/components/buttons/whitebutton";
import DefaultInput from "@/components/inputs/defaultinput";
import YellowButton from "@/components/buttons/yellowbutton";

import Members from "./members";
import Role from "./role";

const Team = () => {
  const [activeKey, setActivekey] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([{ label: "", value: "" }]);
  const [roleData, setRoleData] = useState([]);
  const [roleLoading, setRoleLoading] = useState(false);

  const changeTab = (e) => {
    setActivekey(e);
  };

  const handleAddMoreRoles = () => {
    setRoles([...roles, { label: "", value: "" }]);
  };

  useEffect(() => {
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

      const payload = { roles };

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
            <YellowButton text="Add Team Member" />
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
    </div>
  );
};

export default Team;
