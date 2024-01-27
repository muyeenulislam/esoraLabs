import React from "react";
import WhiteButton from "@/Components/Buttons/WhiteButton";
import YellowButton from "@/Components/Buttons/YellowButton";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import DateFormatter from "@/utils/DateFormatter/DateFormatter";
import DateFormatterLong from "@/utils/DateFormatter/DateFormatterLong";
import DateFormatterWithSlash from "@/utils/DateFormatter/DateFormatterWithSlash";
import StatusIndicator from "@/Components/StatusIndicators/StatusIndicator";
import { ActivityData } from "@/utils/MockData/ActivityData";
import { RecentProjectsData } from "@/utils/MockData/RecentProjectsData";
import styles from "./styles";

const Dashboard = () => {
  const boxData = [
    { text: "Total Clients", value: "32" },
    { text: "New Clients", value: "2" },
    { text: "Projects Active", value: "12" },
  ];

  return (
    <div>
      <div className={styles.justifyBetween}>
        <div>
          <div className={styles.welcomeText}>Welcome back, Admin</div>
          <div className={styles.welcomeSubtext}>
            Track, manage and forecast your clients.
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <WhiteButton
            image={"/images/uploadCloudIcon.svg"}
            text={"Import Brief"}
          />
          <WhiteButton
            image={"/images/plusIcon.svg"}
            text={"Create a New Project"}
          />
          <YellowButton
            image={"/images/newClientIcon.svg"}
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
                  <div className={styles.recentTitle}>{item.title}</div>
                  <div className={styles.recentDescription}>
                    {item?.description?.length > 200
                      ? `${item?.description?.slice(0, 200)}...`
                      : item?.description}
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
                          {DateFormatterLong(item.dueDate)}
                        </div>

                        {new Date(item.dueDate) < new Date() && (
                          <StatusIndicator
                            text={"Overdue"}
                            icon={"/images/overdueIcon.svg"}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div style={styles.recentRightSide}>
                  <div className={styles.recentCreatedDate}>
                    Created on {DateFormatterWithSlash(item.createdOn)}
                  </div>
                  <div>
                    <PrimaryButton
                      text={"Start Briefing"}
                      image={"/images/arrowRightWhite.svg"}
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
                ${parseFloat("200056.02").toLocaleString()}
              </div>
            </div>
            <div>
              <div className={styles.smallTitle}>Activity</div>
              <div style={styles.activityContainer}>
                {ActivityData?.map((item, index) => (
                  <div
                    style={{
                      padding: "16px",
                      background: index % 2 === 0 ? "#F9FAFB" : "white",
                    }}
                    key={index}
                  >
                    <div className={styles.justifyBetween}>
                      <div className={styles.activityUpperText}>
                        {item.subTitle}
                      </div>
                      <div className={styles.activityDate}>
                        {DateFormatter(item.date)}
                      </div>
                    </div>
                    <div className={styles.activityBottomText}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
