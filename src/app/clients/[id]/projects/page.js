"use client";

import React, { useEffect, useState } from "react";
import { DatePicker, Divider, Input, Modal, Tabs } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaSearch } from "react-icons/fa";

import ApiCaller from "@/config/apicaller";

import Loader from "@/components/loader";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";

import ProfileDetailsMessages from "../messages";
import ProfileDetailsProjects from "../projects";
import WebsiteOverview from "./websiteoverview";
import Requirements from "./requirements";

const ProjectDetails = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = pathname?.split("/")[2];
  const projectId = searchParams.get("projectid");

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [projectdata, setProjectData] = useState({});
  const [isProjectLoading, setProjectLoading] = useState(false);
  const [activeKey, setActivekey] = useState("1");
  const [isOpen, setOpen] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [isAssignOpen, setAssignOpen] = useState(false);
  const [markedAsUnderReview, setMarkedAsUnderReview] = useState(false);

  const breadcumbData = [
    { title: "Clients", link: "/clients", active: false },
    { title: `${data?.name}`, link: `/clients/${data?._id}`, active: false },
    { title: "Project", link: `/clients/${data?._id}?tab=2`, active: false },
    { title: projectdata?.services, link: "#", active: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ApiCaller.Get(`/auth/company/${id}`);
        const data = response?.data?.data;
        if (response?.status === 200) {
          setData(data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setProjectLoading(true);
        const response = await ApiCaller.Get(`/projects/${projectId}`);
        const data = response?.data?.data;
        if (response?.status === 200) {
          setProjectData(data);
        }
        setProjectLoading(false);
      } catch (error) {
        setProjectLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  const items = [
    {
      key: "1",
      label: "Overview",
      children: <WebsiteOverview projectdata={projectdata} />,
    },
    {
      key: "2",
      label: "Requirements",
      children: <Requirements data={data} />,
    },
    {
      key: "3",
      label: "Files",
      children: <ProfileDetailsProjects data={data} />,
    },
    {
      key: "4",
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

  const handleAdd = () => {
    setOpen(false);
    setMarkedAsUnderReview(true);
  };

  const handleAssignOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAssignOpen(false);
    }, 3000);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: "Engineering Lead (Backend)",
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Member",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "age",
      key: "age",
    },
    {
      title: " ",
      dataIndex: "action",
      width: 350,
      render: (text, record) => (
        <div className="flex items-center justify-end gap-3">
          {!showRemoveButton && (
            <button
              type="button"
              className="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => setShowRemoveButton(true)}
            >
              Assign <FaArrowRight className="ml-1" />
            </button>
          )}
          {showRemoveButton && (
            <button
              type="button"
              className="flex items-center text-black border bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2"
              onClick={() => setShowRemoveButton(false)}
            >
              Remove
            </button>
          )}
          {/* <WhiteButtonTable onClick={handleView} text="View" /> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      {isLoading || isProjectLoading ? (
        <Loader />
      ) : (
        <div>
          <Breadcrumb data={breadcumbData} />
          <Spacer height="32px" />
          <div className="flex justify-between">
            <div className="flex items-center">
              <Link
                href={"/clients"}
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
                heading="Websites"
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
            </div>
          </div>
          <div>
            <div className="rounded-xl shadow border mt-9 my-auto border-gray-300 p-4">
              <div className="flex  justify-between">
                <div className="flex gap-5 mt-2 ">
                  <div
                    className="flex p-3 pl-5 justify-center pointer items-center gap-3 rounded-full border border-gray-300 bg-white"
                    onClick={() => setOpen(true)}
                  >
                    Mark as Under Review{" "}
                    <Image
                      height={20}
                      width={20}
                      alt=""
                      src="/images/check.svg"
                    />
                  </div>
                  <div className="flex p-3 pl-5 justify-center pointer items-center gap-3 rounded-full border border-gray-300 bg-white">
                    Mark as In Progress
                    <Image
                      height={20}
                      width={20}
                      alt=""
                      src="/images/check.svg"
                    />
                  </div>
                  <div className="flex p-3 pl-5 justify-center pointer items-center gap-3 rounded-full border border-gray-300 bg-white">
                    Mark as Delivered
                    <Image
                      height={20}
                      width={20}
                      alt=""
                      src="/images/check.svg"
                    />
                  </div>
                </div>
                <div className="flex p-3 justify-center items-center gap-3 pointer rounded-full bg-gray-100">
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src="/images/chevron-down.svg"
                  />
                </div>
              </div>
              <Divider />
              <div className="flex mt-4 mb-4 my-auto text-md mx-4 item-center justify-between">
                <div>
                  <PageHeading
                    heading="Assignee"
                    subHeading="No assignee! Assign a team member now."
                  />
                </div>
                <div>
                  <YellowButton
                    imagealign="right"
                    image={"/images/user-check.svg"}
                    text={"Assign"}
                    onClick={() => setAssignOpen(true)}
                  />
                </div>
              </div>
              {showRemoveButton && (
                <>
                  <Divider />

                  <div className="flex justify-between p-3">
                    <div className="flex items-center">
                      <div className="rounded-full bg-yellow-200 flex items-center w-[48px] h-[48px] justify-center ">
                        <Image
                          height={28}
                          width={28}
                          alt=""
                          src="/images/user.svg"
                        />
                      </div>
                      <div className="ml-4 ">
                        <h3 className="font-semibold  text-lg">Mohiuddin</h3>
                        <p className="text-gray-700 font-plus-jakarta-sans font-normal text-base leading-5">
                          MERN Stack Developer
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="flex items-center justify-center text-black rounded-md border bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2 me-2 mb-2"
                        onClick={() => setShowRemoveButton(false)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <Divider />
                  <div className="flex items-center p-2">
                    <div className="w-full flex justify-between items-center">
                      <PageHeading
                        heading="Priority"
                        subHeading="Set task priority"
                      />
                      <div className=" flex gap-4">
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-green-300 bg-green-50">
                          low
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle.svg"
                          />
                        </div>
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-red-300 bg-red-50">
                          Medium
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle.svg"
                          />
                        </div>
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-red-600 bg-red-500 text-white">
                          High
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <Divider type="vertical" className="h-[50px]" />
                    <div className="flex justify-between w-full items-center">
                      <div>
                        <PageHeading
                          heading="Due By"
                          subHeading="Set due date"
                        />
                      </div>
                      <div>
                        <DatePicker
                          onChange={onChange}
                          needConfirm
                          placeholder="Select Due Date"
                          className="w-64"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
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
      {isAssignOpen && (
        <Modal
          open={isAssignOpen}
          centered
          onOk={handleAssignOk}
          width={800}
          onCancel={() => setAssignOpen(false)}
          footer={[
            <button
              className=" w-full rounded-md border border-gray-300 bg-white shadow-xs flex items-center justify-center gap-2 flex-1 py-2 px-4"
              key="back"
              onClick={() => setAssignOpen(false)}
            >
              Close
            </button>,
          ]}
        >
          <h1 className="  text-[20px] pb-3 mt-4 font-bold m-0">
            Assign Team Member
          </h1>
          <div>
            <p className="text-[14px] font-semibold text-[#0B132B]">
              Assign team member to this “Websites” project.
            </p>
          </div>
          <Input
            size="large"
            className="mt-4"
            placeholder="Search by email or name"
            prefix={<FaSearch className="text-gray-300 mr-2" />}
          />
          <Divider />
          <TableWithoutCheckbox
            dataSource={dataSource}
            pagination={false}
            columns={columns}
          />
        </Modal>
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

              <YellowButton text={"Mark as Under Review"} onClick={handleAdd} />
            </div>,
          ]}
        >
          <div>
            <div className="rounded-full h-[48px] w-[48px] bg-black flex items-center justify-center">
              <Image height={24} width={24} alt="" src="/images/eye.svg" />
            </div>

            <h1 className="  text-[20px] pb-3 mt-4 font-bold m-0">
              Mark as Under Review
            </h1>

            <div>
              <p className="text-[14px] font-semibold text-[#0B132B]">
                You’re marking this project as Under Review, so clients will be
                notified about this update.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectDetails;
