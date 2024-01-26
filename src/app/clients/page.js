import React from "react";

import WhiteButton from "@/Components/Buttons/WhiteButton";
import YellowButton from "@/Components/Buttons/YellowButton";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SearchBar from "@/Components/SearchBar/Searchbar";
import Dropdown from "@/Components/Dropdown/Dropdown";

import { FiPhone, FiMail } from "react-icons/fi";

import styles from "./styles";

const clientData = [
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Standard",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
  {
    name: "Cody Fisher",
    company: "McDonald's",
    number: "(704) 555-0127",
    email: "quasiah@gmail.com",
    project: "12",
    spent: "$120k",
    subscription: "Pro",
  },
];
const Clients = () => {
  return (
    <div>
      <div className="flex mb-8">
        <img src="/images/dashboardIcon.svg" className="p-1" />
        <img src="/images/graySlash.svg" className="p-1" />
        <div className="py-1 px-2 text-primary bg-gray50 rounded-md text-[14px] font-bold">
          Clients
        </div>
      </div>
      <div className={`${styles.justifyBetween} mb-8`}>
        <div>
          <div className={styles.welcomeText}>Clients</div>
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
      <div className="flex justify-between mb-8">
        <div>
          <SearchBar />
        </div>
        <div>
          <Dropdown />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {clientData?.map((item, index) => (
          <div
            className="border-2 border-grayBorderDashboard rounded-2xl bg-white shadow-clientCard flex flex-col clientCard"
            key={index}
          >
            <div className="p-4 flex flex-col">
              <div className="flex mb-6">
                <img
                  src="/images/user.svg"
                  className="p-[10px] rounded-full bg-fadedYellow mr-3 userImg opacity-50"
                />

                <div>
                  <div className="text-[16px] font-bold text-primary">
                    {item.name}
                  </div>
                  <div className="text-[14px] font-normal text-subtitleText">
                    {item.company}
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="p-1 rounded-full mr-2 border border-grayBorder bottomIcon text-black">
                  <FiPhone className="text-subtitleText bottomIcon" />
                </div>
                <div className="text-[14px] font-medium text-subtitleText userInfoText">
                  {item.number}
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-1 rounded-full mr-2 border border-grayBorder bottomIcon text-black">
                  <FiMail className="text-subtitleText bottomIcon" />
                </div>
                <div className="text-[14px] font-medium text-subtitleText userInfoText">
                  {item.email}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[1px]">
              <div>
                <div className="bg-fadedYellow2 text-primary text-[16px] headers py-3 text-center bottomSection">
                  {item.project}
                </div>
                <div className="bg-primary text-white text-[12px] py-[6px] text-center rounded-bl-2xl">
                  Projects
                </div>
              </div>
              <div>
                <div className="bg-fadedYellow2 text-primary text-[16px] headers py-3 text-center bottomSection">
                  {item.spent}
                </div>
                <div className="bg-primary text-white text-[12px] py-[6px] text-center ">
                  Spent
                </div>
              </div>
              <div>
                <div className="bg-fadedYellow2 text-primary text-[16px] headers py-3 text-center bottomSection">
                  {item.subscription}
                </div>
                <div className="bg-primary text-white text-[12px] py-[6px] text-center rounded-br-2xl">
                  Subscription
                </div>
              </div>
            </div>
            <div className="p-4 text-right text-[14px] font-medium text-primary">
              View Details
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
