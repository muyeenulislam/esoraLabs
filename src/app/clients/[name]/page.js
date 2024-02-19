"use client";

import React, { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import Spacer from "@/components/spacer/spacer";
import { FaRegTrashAlt } from "react-icons/fa";

import { ClientData } from "@/utils/mockdata/clientdata";

import ProfileDetailsMessages from "./messages";
import ProfileDetailsOverview from "./overview";
import ProfileDetailsProjects from "./projects";

const ProfileDetails = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [data, setData] = useState({});
  const [activeKey, setActivekey] = useState("1");

  useEffect(() => {
    const name = pathname?.split("/")[2].replace(/%20/g, " ");
    const memberData = ClientData.filter((item) => item.name === name);
    setData(memberData[0]);
  }, []);

  const breadcumbData = [
    { title: "Clients", link: "/clients", active: false },
    { title: `${data?.name}`, link: "#", active: true },
  ];

  const items = [
    {
      key: "1",
      label: "Overview",
      children: <ProfileDetailsOverview data={data} />,
    },
    {
      key: "2",
      label: "Projects",
      children: <ProfileDetailsProjects data={data} />,
    },
    {
      key: "3",
      label: (
        <div>
          Messages{" "}
          <span className="bg-fadedYellow px-2 rounded-xl text-[12px] font-medium">
            2
          </span>
        </div>
      ),
      children: <ProfileDetailsMessages data={data} />,
    },
  ];
  const changeTab = (e) => {
    setActivekey(e);
  };
  const handleNextTab = () => {
    if (activeKey === "1") setActivekey("2");
    else if (activeKey === "2") setActivekey("3");
    else return;
  };

  const handlePrevTab = () => {
    if (activeKey === "3") setActivekey("2");
    else if (activeKey === "2") setActivekey("1");
    else return;
  };

  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <div className="flex justify-between">
        <div className="flex items-center">
          <Link
            href={"/clients"}
            className="border border-gray300 rounded-[10px] p-[14px] mr-[16px] shadow"
          >
            <img src="/images/arrow-left.svg" />
          </Link>
          <PageHeading
            heading={data?.name}
            subHeading="Mange your clients right from here."
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <WhiteButton
            imagealign="left"
            image={"/images/arrow-left.svg"}
            text={"Previous"}
            onClick={handlePrevTab}
          />
          <YellowButton
            imagealign="right"
            image={"/images/arrow-right.svg"}
            text={"Next"}
            onClick={handleNextTab}
          />
          <button className="p-[14px] border border-gray300 rounded-[10px] text-[20px] text-[#52596D] shadow">
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
      <Spacer height="32px" />
      <Tabs
        defaultActiveKey={"1"}
        activeKey={activeKey}
        items={items}
        onChange={changeTab}
      />
    </div>
  );
};

export default ProfileDetails;
