"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import dayjs from "dayjs";
import {
  DatePicker,
  Divider,
  Input,
  Modal,
  Tabs,
  Timeline,
  message,
} from "antd";

import { FaAngleDown, FaSearch } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";

import ApiCaller from "@/config/apicaller";

import Loader from "@/components/loader";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";
import PrimaryButton from "@/components/buttons/primarybutton";
import StatusIndicator from "@/components/statusindicator/statusindicator";

import ProfileDetailsMessages from "../messages";
import ProfileDetailsProjects from "../projects";
import WebsiteOverview from "./websiteoverview";
import Requirements from "./requirements";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const ProjectDetails = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = pathname?.split("/")[2];
  const projectId = searchParams.get("projectid");

  const [companyData, setCompanyData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isTeamLoading, setTeamLoading] = useState(false);
  const [projectdata, setProjectData] = useState({});
  const [isProjectLoading, setProjectLoading] = useState(false);
  const [activeKey, setActivekey] = useState("1");
  const [isOpen, setOpen] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState([]);
  const [isAssignOpen, setAssignOpen] = useState(false);

  const [team, setTeam] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [companyProjectId, setCompanyProjectId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const [status, setStatus] = useState({ title: "", value: "" });

  const timeElapsedunderReview = moment(
    projectdata?.underReview?.updatedAt
  )?.fromNow();
  const timeElapsedinProgress = moment(
    projectdata?.inProgress?.updatedAt
  )?.fromNow();
  const timeElapsedcompleted = moment(
    projectdata?.completed?.updatedAt
  )?.fromNow();

  const isUnderReview = projectdata?.underReview?.status === true;
  const isinProgress = projectdata?.inProgress?.status === true;
  const isDelivered = projectdata?.completed?.status === true;

  const breadcumbData = [
    { title: "Clients", link: "/clients", active: false },
    {
      title: `${companyData?.name}`,
      link: `/clients/${companyData?._id}`,
      active: false,
    },
    {
      title: "Project",
      link: `/clients/${companyData?._id}?tab=2`,
      active: false,
    },
    { title: projectdata?.services, link: "#", active: true },
  ];

  useEffect(() => {
    fetchTeamData();
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  useEffect(() => {
    fetchProjectData();
  }, [projectId, selectedItemId]);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const response = await ApiCaller.Get(`/auth/company/${id}`);
      if (response?.status === 200) {
        setCompanyData(response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const fetchTeamData = async () => {
    try {
      setTeamLoading(true);
      const response = await ApiCaller.Get(`/admin/getteams`);
      console.log("team data", response);
      if (response?.status === 200) {
        setTeam(response?.data?.teams);
      }
      setTeamLoading(false);
    } catch (error) {
      setTeamLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const fetchProjectData = async () => {
    try {
      setProjectLoading(true);
      const response = await ApiCaller.Get(`/projects/${projectId}`);
      console.log("project data", response);
      if (response?.status === 200) {
        setProjectData(response?.data?.data?.project);
        setCompanyProjectId(response?.data?.data?.project._id);
        setTeams(response?.data?.data?.teams);
      }
      setProjectLoading(false);
    } catch (error) {
      setProjectLoading(false);
      console.error("Error fetching data:", error);
    }
  };

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

  const handleAssign = async (_id) => {
    setSelectedItemId((prevIds) => [...prevIds, _id]);
    setShowButton(true);
    const data = {
      teamId: _id,
      projectId: projectdata._id,
    };
    setShowRemoveButton(true);
    const response = await ApiCaller.Post("/admin/addtoproject", data);
    console.log("handle assign", response);
    if (response.status === 200) {
      fetchProjectData();
    }
  };

  const handleRemove = async (_id) => {
    setSelectedItemId((prevIds) => prevIds.filter((id) => id !== _id));
    setShowButton(false);
    const data = {
      teamId: _id,
      projectId: projectdata._id,
    };
    const response = await ApiCaller.Put("/admin/removetoproject", data);
    console.log("handle remove", response);
    if (response.status === 200) {
      fetchProjectData();
    }
  };

  const isAssigned = (_id) => {
    return selectedItemId.includes(_id);
  };

  const toggleTimeline = () => {
    setShowTimeline(!showTimeline);
  };

  const handleDueDate = async () => {
    try {
      const response = await ApiCaller.Put(`/projects/${companyProjectId}`, {
        dueDate: selectedDate,
      });
      console.log("handle due date", response);
      if (response.status === 200) {
        message.success("Due date updated successfully");
        fetchProjectData();
      }
    } catch (error) {
      console.error("Error posting selected date:", error);
    }
  };

  const handleProjectStatus = async (status) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))?.name;
      const currentDate = new Date();

      const payload = {
        underReview: {
          status: true,
          updatedAt:
            status === "Under Review"
              ? currentDate
              : projectdata?.underReview?.updatedAt,
          updatedBy:
            status === "Under Review"
              ? user
              : projectdata?.underReview?.updatedBy,
        },
        inProgress: {
          status: status !== "Under Review",
          updatedAt:
            status === "In Progress"
              ? currentDate
              : projectdata?.inProgress?.updatedAt,
          updatedBy:
            status === "In Progress"
              ? user
              : projectdata?.inProgress?.updatedBy,
        },
        completed: {
          status: status === "Delivered",
          updatedAt:
            status === "Delivered"
              ? currentDate
              : projectdata?.completed?.updatedAt,
          updatedBy:
            status === "Delivered" ? user : projectdata?.completed?.updatedBy,
        },
        status:
          status === "Under Review"
            ? "Under Review"
            : status === "In Progress"
            ? "In Progress"
            : status === "Delivered"
            ? "Completed"
            : "Under Review",
      };

      const response = await ApiCaller.Put(
        `/projects/${companyProjectId}`,
        payload
      );
      console.log(response);
      if (response.status === 200) {
        message.success(`Project marked as ${status}`);
        fetchProjectData();
      }
      setOpen(false);
      setStatus({ title: "", value: "" });
    } catch (error) {
      setStatus({ title: "", value: "" });
      console.error("Error while making the POST request:", error);
    }
  };

  const handlePriority = async (priority) => {
    try {
      const response = await ApiCaller.Put(`/projects/${companyProjectId}`, {
        priority: priority,
      });
      console.log(response);
      if (response.status === 200) {
        message.success("Project updated successfully");
        fetchProjectData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const disabledDate = (current) => {
    return current < dayjs().startOf("day");
  };

  const items = [
    {
      key: "1",
      label: "Overview",
      children: (
        <WebsiteOverview projectdata={projectdata} companyData={companyData} />
      ),
    },
    {
      key: "2",
      label: "Requirements",
      children: (
        <Requirements
          fetchProjectData={fetchProjectData}
          projectdata={projectdata}
        />
      ),
    },
    {
      key: "3",
      label: "Files",
      children: <ProfileDetailsProjects companyData={companyData} />,
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
      children: <ProfileDetailsMessages data={companyData} />,
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
      dataIndex: "role",
      key: "role",
    },
    {
      title: " ",
      dataIndex: "action",
      width: 350,
      render: (text, record) => {
        const isMatch = teams.find((team) => team._id === record._id);
        return (
          <div className="flex items-center justify-end gap-3">
            {(isMatch || isAssigned(record._id)) && (
              <button
                text="Remove"
                className="flex items-center justify-center text-black border bg-white font-medium rounded-lg w-[105px] px-[14px] py-[6px]"
                onClick={() => handleRemove(record._id)}
              >
                Remove
              </button>
            )}

            {!isMatch && !isAssigned(record._id) && (
              <PrimaryButton
                text={"Assign"}
                image={"/images/arrow-right-white.svg"}
                onClick={() => handleAssign(record._id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  const statusData = [
    {
      title: "Mark as Under Review",
      value: "Under Review",
      styling: isUnderReview ? "bg-black text-white" : "bg-white",
    },
    {
      title: "Mark as In Progress",
      value: "In Progress",
      styling: isinProgress ? "bg-inProgressText text-white" : "bg-white",
    },
    {
      title: "Mark as Delivered",
      value: "Delivered",
      styling: isDelivered ? "bg-green-700 text-white" : "bg-white",
    },
  ];

  const priorityData = [
    {
      title: "low",
      styling:
        projectdata?.priority === "low"
          ? "flex items-center justify-center gap-2 p-3 pl-5 text-white rounded-full border border-green-600 bg-green-700"
          : "flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-green-600 bg-[#ECFDF3] text-green-700 cursor-pointer",
    },
    {
      title: "medium",
      styling:
        projectdata?.priority === "medium"
          ? "flex items-center justify-center gap-2 p-3 pl-5 rounded-full text-white border border-orange-600 bg-orange-700"
          : "flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-orange-600 bg-[#FFFAEB] text-orange-600 cursor-pointer",
    },
    {
      title: "high",
      styling:
        projectdata?.priority === "high"
          ? "flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-red-600 bg-red-700 text-white"
          : "flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-red-600 bg-red-200 text-red-600 cursor-pointer",
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
                heading={projectdata?.services}
                subHeading="Mange your project right from here."
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
              <div className="flex justify-between items-center">
                <div className="flex gap-5 mt-2 flex-wrap">
                  {statusData?.map((item, index) => (
                    <div
                      className={`flex p-3 pl-5 justify-center cursor-pointer items-center gap-3 rounded-full border border-gray-300 ${item?.styling}`}
                      onClick={() => {
                        setStatus({
                          title: item.title,
                          value: item.value,
                        });
                        setOpen(true);
                      }}
                      key={index}
                    >
                      <span className="whitespace-nowrap text-ellipsis overflow-hidden ">
                        {item?.title}
                      </span>
                      <Image
                        height={20}
                        width={20}
                        alt=""
                        src="/images/check.svg"
                      />
                    </div>
                  ))}
                </div>
                <div
                  className="flex h-[48px] w-[48px] justify-center items-center cursor-pointer bg-gray-100 rounded-full"
                  onClick={toggleTimeline}
                >
                  <FaAngleDown
                    className={`transition-transform duration-300 ${
                      showTimeline ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {showTimeline && (
                <div className="mt-6 mb-[-40px]">
                  <Timeline
                    items={[
                      projectdata.underReview.status === true && {
                        color: "gray",
                        children: (
                          <p className="flex gap-3">
                            <strong>Marked as Under Review</strong>
                            <span className="text-gray-500 ml-4">
                              {timeElapsedunderReview}
                            </span>
                          </p>
                        ),
                      },
                      projectdata.inProgress.status === true && {
                        color: "gray",
                        children: (
                          <p className="flex gap-3">
                            <strong>Marked as In Progress</strong>
                            <span className="text-gray-500 ml-4">
                              {timeElapsedinProgress}
                            </span>
                          </p>
                        ),
                      },
                      projectdata.completed.status === true && {
                        color: "gray",
                        children: (
                          <p className="flex gap-3">
                            <strong>Marked as Completed</strong>
                            <span className="text-gray-500 ml-4">
                              {timeElapsedcompleted}
                            </span>
                          </p>
                        ),
                      },
                    ].filter(Boolean)}
                  />
                </div>
              )}
              <Divider />
              <div className="flex mt-4 mb-4 my-auto text-md mx-4 item-center justify-between">
                <div>
                  <PageHeading
                    heading="Assignee"
                    subHeading={
                      teams.length > 0
                        ? `${teams.length} team member${
                            teams.length > 1 ? "s" : ""
                          } assigned`
                        : "No assignee! Assign a team member now."
                    }
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

              <Divider />
              {teams.map((teamMember, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-3"
                  >
                    <div className="flex items-center justify-center">
                      <div className="rounded-full bg-yellow-200 flex items-center w-[48px] h-[48px] justify-center">
                        <Image
                          height={28}
                          width={28}
                          alt=""
                          src="/images/user.svg"
                        />
                      </div>
                      <div className="ml-4 flex flex-col justify-center">
                        <h3 className="font-semibold text-lg m-0">
                          {teamMember?.name}
                        </h3>
                        <p className="text-gray-700 font-normal m-0">
                          {teamMember?.designation}
                        </p>
                      </div>
                    </div>

                    <button
                      className="flex items-center justify-center text-black rounded-md border bg-white  font-medium px-5 py-2"
                      onClick={() => handleRemove(teamMember._id)}
                    >
                      remove
                    </button>
                  </div>
                );
              })}
              <Divider />
              <div className="flex items-center flex-wrap md:flex-nowrap p-2 gap-2">
                <div className="w-full flex justify-between items-center gap-2 flex-wrap md:border-r md:border-r-gray-200 md:pr-2">
                  <PageHeading
                    heading="Priority"
                    subHeading="Set task priority"
                  />
                  <div className=" flex gap-4">
                    {priorityData?.map((item, index) => (
                      <div
                        className={item?.styling}
                        onClick={() =>
                          projectdata?.priority !== item?.title &&
                          handlePriority(item?.title)
                        }
                        key={index}
                      >
                        <span className="capitalize font-semibold">
                          {item?.title}
                        </span>
                        <CiCircleCheck fontSize={20} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between w-full items-center gap-2 flex-wrap">
                  <div>
                    <PageHeading heading="Due By" subHeading="Set due date" />
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <DatePicker
                      defaultValue={
                        projectdata?.dueDate
                          ? dayjs(projectdata?.dueDate, "YYYY-MM-DD")
                          : null
                      }
                      onChange={(date, dateString) =>
                        setSelectedDate(dateString)
                      }
                      placeholder="Select Due Date"
                      className="w-64"
                      allowClear={false}
                      disabledDate={disabledDate}
                    />
                    <YellowButton text={"Apply"} onClick={handleDueDate} />
                    {projectdata?.dueDate &&
                      new Date(projectdata?.dueDate) < new Date() && (
                        <StatusIndicator
                          text={"Overdue"}
                          icon={"/images/overdue-icon.svg"}
                        />
                      )}
                  </div>
                </div>
              </div>
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
          width={800}
          onCancel={() => {
            setAssignOpen(false);
          }}
          footer={[
            <button
              className=" w-full rounded-md border border-gray-300 bg-white shadow-xs flex items-center justify-center gap-2 flex-1 py-2 px-4"
              key="back"
              onClick={() => {
                setAssignOpen(false);
              }}
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
              Assign team member to this {projectdata?.services} project.
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
            rowKey={(record) => record._id}
            dataSource={team}
            loading={isTeamLoading}
            pagination={false}
            columns={columns}
            scroll={{ y: 300 }}
          />
        </Modal>
      )}
      {isOpen && (
        <Modal
          open={isOpen}
          centered={true}
          onCancel={() => {
            setOpen(false);
            setStatus({ title: "", value: "" });
          }}
          closeIcon={false}
          footer={[
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton
                text="Cancel"
                onClick={() => {
                  setOpen(false);
                  setStatus({ title: "", value: "" });
                }}
              />
              <YellowButton
                text={status?.title}
                onClick={() => handleProjectStatus(status?.value)}
              />
            </div>,
          ]}
        >
          <div>
            <div className="rounded-full h-[48px] w-[48px] bg-black flex items-center justify-center">
              <Image height={24} width={24} alt="" src="/images/eye.svg" />
            </div>

            <h1 className="  text-[20px] pb-3 mt-4 font-bold m-0">
              {status?.title}
            </h1>

            <div>
              <p className="text-[14px] font-semibold text-[#0B132B]">
                You’re marking this project as {status?.value}, so clients will
                be notified about this update.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectDetails;
