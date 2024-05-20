"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Input,
  Modal,
  Tabs,
  Timeline,
  message,
} from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaAngleDown, FaAngleUp, FaArrowRight, FaSearch } from "react-icons/fa";

import ApiCaller from "@/config/apicaller";

import Loader from "@/components/loader";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";
import { isBefore } from "date-fns";
import ProfileDetailsMessages from "../messages";
import ProfileDetailsProjects from "../projects";
import WebsiteOverview from "./websiteoverview";
import Requirements from "./requirements";
import StatusIndicator from "@/components/statusindicator/statusindicator";
import styles from "@/app/dashboard/styles";

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
  const [selectedItemId, setSelectedItemId] = useState([]);
  const [isAssignOpen, setAssignOpen] = useState(false);
  const [markedAsUnderReview, setMarkedAsUnderReview] = useState(false);
  const [team, setTeam] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [companyProjectId, setCompanyProjectId] = useState("");
  console.log("projectdata", projectdata);
  console.log("companyProjectId", companyProjectId);

  const breadcumbData = [
    { title: "Clients", link: "/clients", active: false },
    { title: `${data?.name}`, link: `/clients/${data?._id}`, active: false },
    { title: "Project", link: `/clients/${data?._id}?tab=2`, active: false },
    { title: projectdata?.project?.services, link: "#", active: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ApiCaller.Get(`/admin/getteams`);
        const data = response?.data?.teams;
        setTeam(data);
        if (response?.status === 200) {
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        setTeams(response?.data?.data?.teams);
        const data = response?.data?.data;
        if (response?.status === 200) {
          setProjectData(data);
          setCompanyProjectId(data?.project._id);
        }
        setProjectLoading(false);
      } catch (error) {
        setProjectLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchProjectData();
  }, [projectId, selectedItemId]);

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

  const [selectedDate, setSelectedDate] = useState(null);

  const onChange = (date, dateString) => {
    setSelectedDate(date);
  };

  const handleAssign = async (_id) => {
    setSelectedItemId((prevIds) => [...prevIds, _id]);
    setShowButton(true); // Assuming setShowButton exists and is used for visibility control
    const data = {
      teamId: _id,
      projectId: projectdata.project._id,
    };
    setShowRemoveButton(true); // Assuming setShowRemoveButton exists and is used for visibility control
    const response = await ApiCaller.Post("/admin/addtoproject", data);
    // Handle response if needed
  };
  console.log("singleTeamxxxxxxxx", selectedItemId);
  // console.log("singleTeam", singleTeam);
  const handleRemove = async (_id) => {
    setSelectedItemId((prevIds) => prevIds.filter((id) => id !== _id));
    setShowButton(false); // Assuming setShowButton exists and is used for visibility control
    const data = {
      teamId: _id,
      projectId: projectdata.project._id,
    };
    const response = await ApiCaller.Put("/admin/removetoproject", data);
    // Handle response if needed
  };

  const isAssigned = (_id) => {
    return selectedItemId.includes(_id);
  };

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
        const isMatch = teams.find((team) => team._id === record._id); // Replace YOUR_ID_TO_MATCH with the ID you want to match
        return (
          <div className="flex items-center justify-end gap-3">
            {(isMatch || isAssigned(record._id)) && (
              <button
                type="button"
                className="flex items-center text-black border bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2"
                onClick={() => handleRemove(record._id)}
              >
                Remove
              </button>
            )}

            {!isMatch && !isAssigned(record._id) && (
              <button
                type="button"
                className="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => handleAssign(record._id)}
              >
                Assign <FaArrowRight className="ml-1" />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const [showTimeline, setShowTimeline] = useState(false);

  const toggleTimeline = () => {
    setShowTimeline(!showTimeline);
  };

  const handleApply = async () => {
    // Handle apply button click
    console.log("Selected Date:", selectedDate);

    if (!isBefore(selectedDate, new Date())) {
      console.log("Selected date is after today. No need to post.");
      message.error("Selected date is after today");
      return; // Exit function early
    } else {
      try {
        // Post selectedDate using Axios
        const response = await ApiCaller.Put(`/projects/${companyProjectId}`, {
          dueDate: selectedDate,
        });

        // Handle response if needed
        console.log("Post response:", response);
      } catch (error) {
        // Handle error
        console.error("Error posting selected date:", error);
      }
    }
  };

  const handleCancel = () => {
    // Handle cancel button click
    console.log("Cancelled");
  };

  const calculateTimeElapsed = (updatedAt) => {
    const now = new Date();
    const updated = new Date(updatedAt);
    const difference = now - updated;
    const seconds = Math.floor(difference / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    }
  };
  const updatedAtunderReview = projectdata?.project?.underReview?.updatedAt;
  const timeElapsedunderReview = calculateTimeElapsed(updatedAtunderReview);
  const updatedAtinProgress = projectdata?.project?.inProgress?.updatedAt;
  const timeElapsedinProgress = calculateTimeElapsed(updatedAtinProgress);

  const updatedAtcompleted = projectdata?.project?.completed?.updatedAt;
  const timeElapsedcompleted = calculateTimeElapsed(updatedAtcompleted);

  const isUnderReview = projectdata?.project?.status === "Under Review";

  const isinProgress = projectdata?.project?.status === "In Progress";
  const isDelivered = projectdata?.project?.status === "Under Review";

  // in progress modal
  const [isModalOpenInProgress, setIsModalOpenInProgress] = useState(false);
  const showModalInProgress = () => {
    setIsModalOpenInProgress(true);
  };
  const handleOkInProgress = async () => {
    try {
      const currentDate = new Date();

      // Format the date and time as required (in ISO 8601 format)
      const formattedDate = currentDate.toISOString();
      // Perform the POST request
      const response = await ApiCaller.Put(`/projects/${companyProjectId}`, {
        // Add the data you want to send in the request body
        inProgress:{
          status: true,
          updatedAt:formattedDate
        }
       
        // Add any other data you need
      });
  
      // Handle the response if needed
      console.log('POST request response:', response);
  
      // Close the modal or perform any other actions
      setIsModalOpenInProgress(false);
    } catch (error) {
      // Handle errors
      console.error('Error while making the POST request:', error);
    }
  };
  const handleCancelInProgress = () => {
    setIsModalOpenInProgress(false);
  };

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
                    className={`flex p-3 pl-5 justify-center cursor-pointer items-center gap-3 rounded-full border border-gray-300 ${
                      markedAsUnderReview ||
                      projectdata?.project?.status === "Under Review"
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
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
                  <div
                    className={`flex p-3 pl-5 justify-center cursor-pointer items-center gap-3 rounded-full border border-gray-300 
  ${isinProgress ? "bg-[#175CD3] text-white" : "bg-white"}
`}
                    onClick={showModalInProgress}
                  >
                    Mark as In Progress
                    <Image
                      height={20}
                      width={20}
                      alt=""
                      src="/images/check.svg"
                    />
                  </div>
                  <Modal
                    
                    open={isModalOpenInProgress}
                    onOk={handleOkInProgress}
                    centered={true}
                    onCancel={handleCancelInProgress}
                    footer={[
                      <div className="grid grid-cols-2 gap-3" key={1}>
                        <WhiteButton
                          text={"Cancel"}
                          onClick={handleCancelInProgress}
                        />

                        <YellowButton
                          text={"Mark as In Progress"}
                          onClick={handleOkInProgress}
                        />
                      </div>,
                    ]}
                  >
                    <div>
                      <div className="rounded-full h-[48px] w-[48px] bg-black flex items-center justify-center">
                        <Image
                          height={24}
                          width={24}
                          alt=""
                          src="/images/eye.svg"
                        />
                      </div>

                      <h1 className="  text-[20px] pb-3 mt-4 font-bold m-0">
                        Mark as In Progress
                      </h1>

                      <div>
                        <p className="text-[14px] font-semibold text-[#0B132B]">
                          You’re marking this project as In Progress, so
                          clients will be notified about this update.
                        </p>
                      </div>
                    </div>
                  </Modal>

                  <div
                    className={`flex p-3 pl-5 justify-center cursor-pointer items-center gap-3 rounded-full border border-gray-300 
                  ${isDelivered ? "bg-green-700 text-white" : "bg-white"}
`}
                  >
                    Mark as Delivered
                    <Image
                      height={20}
                      width={20}
                      alt=""
                      src="/images/check.svg"
                    />
                  </div>
                </div>
                <div
                  className="flex px-4 justify-center items-center gap-3 cursor-pointer  bg-gray-100"
                  onClick={toggleTimeline}
                  style={{ borderRadius: "50%" }}
                >
                  {showTimeline ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              </div>
              {showTimeline && (
                <div className="mt-6 mb-[-40px]">
                  <Timeline
                    items={[
                      {
                        color: "gray",
                        children: (
                          <>
                            <div className="flex gap-3">
                              <p>
                                {projectdata.project.underReview.status ? (
                                  <strong>Marked as Under Review</strong>
                                ) : null}
                              </p>
                              <span className="text-gray-500">
                                {timeElapsedunderReview}
                              </span>
                            </div>
                          </>
                        ),
                      },
                      {
                        color: "gray",
                        children: (
                          <>
                            <div className="flex gap-3">
                              <p>
                                {projectdata.project.inProgress.status ? (
                                  <strong>Marked as In Progress</strong>
                                ) : null}
                              </p>
                              <span className="text-gray-500">
                                {timeElapsedinProgress}
                              </span>
                            </div>
                          </>
                        ),
                      },
                      {
                        color: "gray",
                        children: (
                          <>
                            <div className="flex gap-3">
                              <p>
                                {projectdata.project.completed.status ? (
                                  <strong>Marked as Completed</strong>
                                ) : null}
                              </p>
                              <span className="text-gray-500">
                                {timeElapsedcompleted}
                              </span>
                            </div>
                          </>
                        ),
                      },
                    ]}
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
              {/* {showRemoveButton && ( */}
              <>
                <Divider />
                {teams.map((teamMember, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center">
                        <div className="rounded-full bg-yellow-200 flex items-center w-[48px] h-[48px] justify-center ">
                          <Image
                            height={28}
                            width={28}
                            alt=""
                            src="/images/user.svg"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-lg">
                            {teamMember?.name}
                          </h3>
                          <p className="text-gray-700 font-plus-jakarta-sans font-normal text-base leading-5">
                            {teamMember?.designation}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          className="flex items-center justify-center text-black rounded-md border bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2 me-2 mb-2"
                          onClick={() => handleRemove(teamMember._id)}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  );
                })}
                <Divider />
                <div className="flex items-center p-2">
                  <div className="w-full flex justify-between items-center">
                    <PageHeading
                      heading="Priority"
                      subHeading="Set task priority"
                    />
                    <div className=" flex gap-4">
                      {projectdata?.project?.priority === "low" ? (
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-green-600 bg-green-700">
                          low
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle-2.svg"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-[#027948] bg-[#ECFDF3] text-[#027948]">
                          Low
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle.svg"
                          />
                        </div>
                      )}
                      {projectdata?.project?.priority === "medium" ? (
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-orange-600 bg-orange-700">
                          Medium
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle-2.svg"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-[#B54708] bg-[#FFFAEB] text-[#B54708]">
                          Medium
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle.svg"
                          />
                        </div>
                      )}
                      {projectdata?.project?.priority === "high" ? (
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-red-600 bg-red-700 text-white">
                          High
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle-2.svg"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 p-3 pl-5 rounded-full border border-red-600 bg-red-200 text-red-600">
                          High
                          <Image
                            height={20}
                            width={20}
                            alt=""
                            src="/images/check-circle.svg"
                          />
                        </div>
                      )}
                    </div>
                    {/* <div>
      <StatusIndicator text={"high"} />
    </div> */}
                  </div>
                  <Divider type="vertical" className="h-[50px]" />
                  <div className="flex justify-between w-full items-center">
                    <div>
                      <PageHeading heading="Due By" subHeading="Set due date" />
                    </div>
                    <div className="flex gap-3">
                      <DatePicker
                        renderExtraFooter={() => (
                          <div className="flex justify-center items-center m-2 gap-3">
                            <button
                              className="rounded-md border  px-9"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                            <button
                              className="mr-4 px-10 bg-yellow-400 hover:bg-yellow-500 rounded-md"
                              onClick={handleApply}
                            >
                              Apply
                            </button>
                          </div>
                        )}
                        // onChange={onChange}
                        placeholder="Select Due Date"
                        className="w-64"
                        needConfirm
                      />
                      {selectedDate && isBefore(selectedDate, new Date()) && (
                        <div>overtime</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
              {/* )} */}
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
            dataSource={team}
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
