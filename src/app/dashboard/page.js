import React from "react";
import WhiteButton from "@/utils/Buttons/WhiteButton";
import YellowButton from "@/utils/Buttons/YellowButton";
import PrimaryButton from "@/utils/Buttons/PrimaryButton";
import DateFormatter from "@/utils/DateFormatter/DateFormatter";
import styles from "./styles";

const Dashboard = () => {
  const boxData = [
    { text: "Total Clients", value: "32" },
    { text: "New Clients", value: "2" },
    { text: "Projects Active", value: "12" },
  ];

  const recentProjectsData = [
    {
      title: "Websites",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumptio, eaque rerum! Provident similique accusantium nemo autem.",
      createdOn: "2023-12-01T00:00:00.000+00:00",
      priority: "Medium",
      status: "Not Started",
      assignees: [],
      dueDate: "",
    },
    {
      title: "Mobile App",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumptio, eaque rerum! Provident similique accusantium nemo autem.",
      createdOn: "2023-12-01T00:00:00.000+00:00",
      priority: "High",
      status: "In Progress",
      assignees: [
        {
          name: "Golam Rabbi",
          designation: "Web Developer",
        },
      ],
      dueDate: "2024-01-31T00:00:00.000+00:00",
    },
    {
      title: "Mobile App",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumptio, eaque rerum! Provident similique accusantium nemo autem.",
      createdOn: "2023-12-01T00:00:00.000+00:00",
      priority: "Low",
      status: "Completed",
      assignees: [
        {
          name: "Golam Rabbi",
          designation: "Web Developer",
        },
        {
          name: "Sheebly Hayat",
          designation: "Designer",
        },
      ],
      dueDate: "2024-01-10T00:00:00.000+00:00",
    },
  ];

  const activityData = [
    {
      title: "John Smith",
      subTitle: "New Client",
      date: "2024-01-01T00:00:00.000+00:00",
    },
    {
      title: "Website",
      subTitle: "Project Marked as Completed sdasd asd wa asdds",
      date: "2024-01-01T00:00:00.000+00:00",
    },
    {
      title: "Website",
      subTitle: "Project Marked as Completed",
      date: "2024-01-01T00:00:00.000+00:00",
    },
    {
      title: "Website",
      subTitle: "Project Marked as Completed",
      date: "2024-01-01T00:00:00.000+00:00",
    },
    {
      title: "Website",
      subTitle: "Project Marked as Completed",
      date: "2024-01-01T00:00:00.000+00:00",
    },
    {
      title: "Website",
      subTitle: "Project Marked as Completed",
      date: "2024-01-01T00:00:00.000+00:00",
    },
    {
      title: "Website",
      subTitle: "Project Marked as Completed",
      date: "2024-01-01T00:00:00.000+00:00",
    },
    {
      title: "Website",
      subTitle: "Project Marked as Completed",
      date: "2024-01-01T00:00:00.000+00:00",
    },
    {
      title: "Website",
      subTitle: "Project Marked as Completed",
      date: "2024-01-01T00:00:00.000+00:00",
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="headers text-headerText text-[32px] font-bold">
            Welcome back, Admin
          </div>
          <div className="text-subtitleText text-[16px] font-normal">
            Track, manage and forecast your clients.
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 max-h-[50px]">
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
      <div className="grid grid-cols-3 gap-[24px]">
        <div className="col-span-2">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-[24px] my-8">
              {boxData?.map((item, index) => (
                <div
                  key={index}
                  className="px-6 py-5 border-2 border-grayBorderDashboard rounded-2xl shadow-sm"
                >
                  <div className="text-subtitleText text-[16px] font-normal">
                    {item.text}
                  </div>
                  <div className="headers text-headerText text-[32px] font-bold">
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
            <div className="headers text-[20px] mb-6">Recent Projects</div>
            {recentProjectsData?.map((item, index) => (
              <div style={styles.recentContainer} key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "70%",
                  }}
                >
                  <div className="text-[16px] headers">{item.title}</div>
                  <div className="text-[14px] text-subtitleText font-normal mb-4">
                    {item.description}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <div className="text-[12px] font-normal text-subtitleText">
                        Priority
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div className="text-[12px] font-normal text-subtitleText">
                        Status
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div className="text-[12px] font-normal text-subtitleText">
                        Assignee
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "20%",
                  }}
                >
                  <div className="text-right text-[14px] text-subtitleText font-normal">
                    Created on {DateFormatter(item.createdOn)}
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
          <div className="flex flex-col">
            <div className="px-6 py-5 border-2 border-grayBorderDashboard rounded-2xl shadow-sm my-8">
              <div className="text-subtitleText text-[16px] font-normal">
                Total Received (USD)
              </div>
              <div className="headers text-headerText text-[32px] font-bold">
                ${parseFloat("200056.02").toLocaleString()}
              </div>
            </div>
            <div>
              <div className="headers text-[20px] mb-6">Activity</div>
              <div
                style={{
                  maxHeight: "648px",
                  overflow: "auto",
                  borderRadius: "16px",
                  border: "1px solid #E4E7EC",
                  boxShadow:
                    "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
                }}
              >
                {activityData?.map((item, index) => (
                  <div
                    style={{
                      padding: "16px",
                      background: index % 2 === 0 ? "#F9FAFB" : "white",
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="text-subtitleText text-[14px] font-normal overflow-hidden w-[70%]">
                        {item.subTitle}
                      </div>
                      <div className="text-subtitleText text-[14px] font-normal w-[30%] text-right">
                        {DateFormatter(item.date)}
                      </div>
                    </div>
                    <div className="text-primary text-[16px] font-bold">
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
