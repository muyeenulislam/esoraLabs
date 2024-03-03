import React from "react";

import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const Review = (props) => {
  const review = [
    {
      id: 1,
      name: "What are the goals of the project?",
      value: props?.goals || "-",
    },
    {
      id: 2,
      name: "What is the target audience?",
      value: props?.targetAudience || "-",
    },
    {
      id: 3,
      name: "What is the geographical scope?",
      value: props?.geographicalScope || "-",
    },
    {
      id: 4,
      name: "What is the maturity of your project?",
      value: props?.maturity || "-",
    },
    {
      id: 5,
      name: "When should the project start?",
      value: props?.startTime || "-",
    },
    {
      id: 6,
      name: "When does your project need to be completed?",
      value: props?.deadline || "-",
    },
    {
      id: 7,
      name: "Does the budget cover the media costs",
      value: props?.description || "-",
    },
    {
      id: 8,
      name: "What other info should we pass along?",
      value: props?.otherInfo || "-",
    },
    {
      id: 9,
      name: "Do you have any briefing or relevant documents to share?",
      value: props?.documents || "-",
    },
  ];
  return (
    <>
      <div>
        {review?.map((item) => (
          <div
            key={item?.id}
            className={`p-6 ${
              item?.id % 2 == 0 ? "bg-transparent" : "bg-gray50"
            } flex flex-col gap-2`}
          >
            <h3 className="text-primary text-[16px] font-bold">{item?.name}</h3>
            <p className="text-subtitleText text-[14px] font-normal mb-0">
              {item?.value}
            </p>
          </div>
        ))}
        <Spacer height="80px" />
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Edit"}
          imagealign="left"
          image={"/images/edit-pencil.svg"}
        />
        <YellowButton
          text={"Submit"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
        />
      </div>
    </>
  );
};

export default Review;