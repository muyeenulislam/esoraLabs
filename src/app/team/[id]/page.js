"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs } from "antd";
import Link from "next/link";
import Image from "next/image";

import ApiCaller from "@/config/apicaller";

import Loader from "@/components/loader";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import Spacer from "@/components/spacer/spacer";
import { FaRegTrashAlt } from "react-icons/fa";

import ProfileDetailsMessages from "./messages";
import ProfileDetailsOverview from "./overview";
import ProfileDetailsProjects from "./projects";

const ProfileDetails = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState(searchParams.get("tab") ?? "1");

  const id = pathname?.split("/")[2];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") !== activeKey) {
      params.set("tab", activeKey);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [activeKey, router]);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const payload = {
        teamId: id,
      };
      const response = await ApiCaller.Post(`/admin/getteam`, payload);
      console.log(response);

      if (response?.status === 200) {
        setData(response.data.team);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching activity data:", error);
    }
  };

  const handleRemove = async (projectId) => {
    try {
      const data = {
        teamId: id,
        projectId: projectId,
      };
      const response = await ApiCaller.Put("/admin/removetoproject", data);
      console.log(response);
      if (response?.status === 200) {
        fetchTeamData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeTab = (e) => {
    setActiveKey(e);
  };
  const handleNextTab = () => {
    if (activeKey === "1") setActiveKey("2");
    else if (activeKey === "2") setActiveKey("3");
    else return;
  };

  const handlePrevTab = () => {
    if (activeKey === "3") setActiveKey("2");
    else if (activeKey === "2") setActiveKey("1");
    else return;
  };

  const breadcumbData = [
    { title: "Team", link: "/team", active: false },
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
      label: "Assigned Projects",
      children: (
        <ProfileDetailsProjects data={data} handleRemove={handleRemove} />
      ),
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Breadcrumb data={breadcumbData} />
          <Spacer height="32px" />
          <div className="flex justify-between">
            <div className="flex items-center">
              <Link
                href={"/team"}
                className="border border-gray300 rounded-[10px] p-[14px] mr-[16px] shadow"
              >
                <Image
                  height={20}
                  width={20}
                  alt=""
                  src="/images/arrow-left.svg"
                />
              </Link>
              <PageHeading
                heading={data?.name}
                subHeading="Manage your team members right from here."
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
      )}
    </>
  );
};

export default ProfileDetails;
