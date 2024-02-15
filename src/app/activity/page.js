import React from "react";

import { ActivityData } from "@/utils/mockdata/activitydata";
import DateFormatter from "@/utils/dateformatter/dateformatter";
import PaginationButton from "@/components/buttons/paginationbutton";
import styles from "./styles";
import Link from "next/link";

const Activity = () => {
  return (
    <div>
      <div className="flex mb-8">
        <Link href={"/dashboard"}>
          <img src="/images/dashboard-icon.svg" className="p-1" />
        </Link>
        <img src="/images/gray-slash.svg" className="p-1" />
        <div className="py-1 px-2 text-primary bg-gray50 rounded-md text-[14px] font-bold">
          Activity
        </div>
      </div>
      <div className="mb-8">
        <div className={styles.welcomeText}>Activity</div>
        <div className={styles.welcomeSubtext}>
          Track, manage and forecast your all messages.
        </div>
      </div>
      <div className="shadow-clientCard border border-grayBorderDashboard rounded-2xl">
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
                <div className={styles.activityUpperText}>{item.subTitle}</div>
                <div className={styles.activityDate}>
                  {DateFormatter(item.date)}
                </div>
              </div>
              <div className={styles.activityBottomText}>{item.title}</div>
            </div>
          ))}
        </div>
        <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder">
          <div className="flex">
            <PaginationButton text={"Previous"} />
            <div className="w-3"></div>
            <PaginationButton text={"Next"} />
          </div>
          <div className="text-subtitleText text-[14px] font-normal">
            Page <span className="font-medium">1</span> of{" "}
            <span className="font-medium">4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
