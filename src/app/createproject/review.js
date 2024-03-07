import React from "react";

import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const Review = (props) => {

  const data ={
    targetAudience:props?.targetAudience,
    goals:props?.goals,
    "services": props?.services,
    "geographicalScope": props?.geographicalScope,
    "maturityProjects": props?.maturity,
    "whenProjectStart": props?.startTime,
    "whenProjectComplete":props?.deadline,
    "info":  props?.otherInfo,
    "document": props?.fileList,
    "companyId": "1234567890",
    "status": "In Progress"
  }

console.log("filelist",props?.fileList);

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
    // {
    //   id: 10,
    //   name: "Do you have any file?",
    //   value: props?.fileList || "-",
    // },
  ];
  

   // Function to handle submission
   const handleSubmit = () => {
    // Call the onSubmit function with the review data
    props.onSubmit(data);

  };
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
     <div>
  {props?.fileList.map((item) => {
    console.log("Array", item);
    return (
      <div
        key={item?.uid}
        className={`p-6 ${
          item?.uid % 2 === 0 ? "bg-transparent" : "bg-gray50"
        } flex flex-col gap-2`}
      >
        <h3 className="text-primary text-[16px] font-bold">Do you have any briefing or relevant documents to share?</h3>
        <p className="text-subtitleText text-[14px] font-normal mb-0">
        {item?.name}
        </p>
      </div>
    )
  })}
</div>;
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
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default Review;
