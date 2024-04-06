"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

import Loader from "@/components/loader";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import PrimaryButton from "@/components/buttons/primarybutton";
import StatusIndicator from "@/components/statusindicator/statusindicator";
import PageHeading from "@/components/pageheading/pageheading";

import { RecentProjectsData } from "@/utils/mockdata/recentprojectsdata";

import ApiCaller from "@/config/apicaller";

import styles from "./styles";

const Dashboard = () => {
  const router = useRouter();

  const [activityData, setActivityData] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [state, setState] = useState({
    totalClient: "0",
    newClient: "0",
    activeProject: "0",
    totalRevenue: "0",
  });

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setActivityLoading(true);
        const response = await ApiCaller.Get("/admin/activity");
        if (response.status === 200) {
          setActivityData(response.data.data);
          setActivityLoading(false);
        } else {
          setActivityLoading(false);
          console.log(response);
        }
      } catch (error) {
        setActivityLoading(false);
        console.error("Error fetching activity data:", error);
      }
    };

    fetchActivityData();
  }, []);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await ApiCaller.Get("/admin/overview");

        if (response.status === 200) {
          setState({
            totalClient: response.data.data.totalClient,
            newClient: response.data.data.newClient,
            activeProject: response.data.data.activeProject,
            totalRevenue: response.data.data.totalRevenue,
          });
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchOverview();
  }, []);

  const boxData = [
    { text: "Total Clients", value: state?.totalClient },
    { text: "New Clients", value: state?.newClient },
    { text: "Projects Active", value: state?.activeProject },
  ];

  return (
    <div>
      <div className={styles.justifyBetween}>
        <PageHeading
          heading="Welcome back, Admin"
          subHeading="Track, manage and forecast your clients."
        />
        <div className={styles.buttonContainer}>
          <WhiteButton
            image={"/images/upload-cloud-icon.svg"}
            text={"Import Brief"}
            imagealign="left"
          />
          <WhiteButton
            image={"/images/plus-icon.svg"}
            text={"Create a New Project"}
            imagealign="left"
            onClick={() => router.push("/createproject")}
          />
          <YellowButton
            imagealign="left"
            image={"/images/new-client-icon.svg"}
            text={"Create a New Client"}
          />
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className="col-span-2">
          <div className={styles.flexColumn}>
            <div className={styles.dataLeftSideContainer}>
              {boxData?.map((item, index) => (
                <div key={index} className={styles.leftSideBoxes}>
                  <div className={styles.boxUpperText}>{item.text}</div>
                  <div className={styles.boxLowerText}>
                    {parseFloat(item.value).toLocaleString()}{" "}
                    {item.text === "New Clients" && (
                      <span className="headers text-headerText text-[14px] font-bold">
                        (Last Month)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.smallTitle}>Recent Projects</div>
            {RecentProjectsData?.map((item, index) => (
              <div style={styles.recentContainer} key={index}>
                <div style={styles.recentLeftSide}>
                  <div className="flex flex-col gap-2">
                    <div className={styles.recentTitle}>{item.title}</div>
                    <div className={styles.recentDescription}>
                      {item?.description?.length > 200
                        ? `${item?.description?.slice(0, 200)}...`
                        : item?.description}
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <div className="mr-4">
                      <div className={styles.smallHeadings}>Priority</div>
                      <div>
                        <StatusIndicator text={item.priority} />
                      </div>
                    </div>
                    <div className="mr-4">
                      <div className={styles.smallHeadings}>Status</div>
                      <div>
                        <StatusIndicator text={item.status} />
                      </div>
                    </div>
                    <div className="mr-4">
                      {item?.assignees?.length === 0 ? (
                        <>
                          <div className={styles.smallHeadings}>Assignee</div>
                          <StatusIndicator text={"Not Assigned"} />
                        </>
                      ) : (
                        <div>
                          {item?.assignees?.length === 1 ? (
                            <div>
                              <div className={styles.smallHeadings}>
                                Assignee
                              </div>
                              <div>
                                <div className={styles.assigneeName}>
                                  {item.assignees[0].name}
                                </div>
                                <div className={styles.assigneeDesignation}>
                                  {item.assignees[0].designation}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex">
                              {item?.assignees?.map((assignee, index) => (
                                <div key={index} className="mr-6">
                                  <div className={styles.smallHeadings}>
                                    Assignee {index + 1}
                                  </div>
                                  <div>
                                    <div className={styles.assigneeName}>
                                      {assignee.name}
                                    </div>
                                    <div className={styles.assigneeDesignation}>
                                      {assignee.designation}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {item?.dueDate && (
                    <div>
                      <div className={styles.dueDateHeading}>Due by</div>
                      <div className={styles.itemsCenter}>
                        <div className={styles.dueDateValue}>
                          {moment(item.dueDate).format("DD MMMM YYYY")}
                        </div>

                        {new Date(item.dueDate) < new Date() && (
                          <StatusIndicator
                            text={"Overdue"}
                            icon={"/images/overdue-icon.svg"}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div style={styles.recentRightSide}>
                  <div className={styles.recentCreatedDate}>
                    Created on {moment(item.createdOn).format("MM/DD/YYYY")}
                  </div>
                  <div>
                    <PrimaryButton
                      text={"Start Briefing"}
                      image={"/images/arrow-right-white.svg"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div className={styles.flexColumn}>
            <div className={`${styles.leftSideBoxes} my-8`}>
              <div className={styles.boxUpperText}>Total Received (USD)</div>
              <div className={styles.boxLowerText}>
                ${parseFloat(state?.totalRevenue).toLocaleString()}
              </div>
            </div>
            <div>
              <div className={styles.smallTitle}>Activity</div>
              {activityLoading ? (
                <Loader />
              ) : (
                <div style={styles.activityContainer}>
                  {activityData?.map((item, index) => (
                    <div
                      style={{
                        padding: "16px",
                        background: index % 2 === 0 ? "#F9FAFB" : "white",
                      }}
                      className="flex flex-col gap-2"
                      key={index}
                    >
                      <div className={styles.justifyBetween}>
                        <div className={styles.activityUpperText}>
                          {item.title}
                        </div>
                        <div className={styles.activityDate}>
                          {moment(item.createdAt).format("DD MMM YYYY")}
                        </div>
                      </div>
                      <div className={styles.activityBottomText}>
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
