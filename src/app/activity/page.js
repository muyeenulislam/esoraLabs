"use client";

import React, { useEffect, useState } from "react";
import DateFormatter from "@/utils/dateformatter/dateformatter";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import Pagination from "@/components/pagination/pagination";

import styles from "./styles";
import axios from "axios";
import ApiCaller from "@/config/apicaller";

const breadcumbData = [{ title: "Activity", link: "/activity", active: true }];

const Activity = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await  ApiCaller.Get('https://api.esoralabs.com/api/v1/admin/activity');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();   
  }, []);




console.log("data",data);










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
          {data?.map((item, index) => (
            <div
              style={{
                padding: "16px",
                background: index % 2 === 0 ? "#F9FAFB" : "white",
              }}
              key={index}
              className="flex flex-col gap-2"
            >
              <div className={styles.justifyBetween}>
                <div className={styles.activityUpperText}>{item.description}</div>
                <div className={styles.activityDate}>
                  {DateFormatter(item.createdAt)}
                </div>
              </div>
              <div className={styles.activityBottomText}>{item.title}</div>
            </div>
          ))}
        </div>
        <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder">
          <Pagination
            totalPages={10}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Activity;
