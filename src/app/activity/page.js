import React from "react";
import Link from "next/link";

import { ActivityData } from "@/utils/mockdata/activitydata";
import DateFormatter from "@/utils/dateformatter/dateformatter";
import PaginationButton from "@/components/buttons/paginationbutton";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";

import styles from "./styles";

const breadcumbData = [{ title: "Activity", link: "/activity" }];

const Activity = () => {
  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <PageHeading
        heading="Activity"
        subHeading="Track, manage and forecast your all messages."
      />
      <Spacer height="32px" />
      <div className="shadow-clientCard border border-grayBorderDashboard rounded-2xl">
        <div style={styles.activityContainer}>
          {ActivityData?.map((item, index) => (
            <div
              style={{
                padding: "16px",
                background: index % 2 === 0 ? "#F9FAFB" : "white",
              }}
              key={index}
              className="flex flex-col gap-2"
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
