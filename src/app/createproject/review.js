import React from "react";
import Image from "next/image";

import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Loader from "@/components/loader";

import truncateString from "@/utils/truncatestring";

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
  ];

  const removeFile = (file) => {
    const newFileList = props?.fileList.filter((item) => item.uid !== file.uid);
    props?.setFileList(newFileList);
  };

  return (
    <>
      {props?.isLoading ? (
        <Loader />
      ) : (
        <div>
          {review?.map((item) => (
            <div
              key={item?.id}
              className={`p-6 ${
                item?.id % 2 == 0 ? "bg-transparent" : "bg-gray50"
              } flex flex-col gap-2`}
            >
              <h3 className="text-primary text-[16px] font-bold">
                {item?.name}
              </h3>
              <p className="text-subtitleText text-[14px] font-normal mb-0">
                {item?.value}
              </p>
            </div>
          ))}
          <div className={`p-6 bg-gray50 flex flex-col gap-2`}>
            <h3 className="text-primary text-[16px] font-bold">
              Do you have any briefing or relevant documents to share?
            </h3>
            {props?.fileList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row gap-3 items-center border border-primary rounded-lg p-4 mb-3"
                >
                  <div className="p-2 flex justify-center items-center rounded-full bg-white border-4 border-solid border-grayBorder">
                    <Image
                      src={"/images/upload-file-icon.svg"}
                      alt={item.name}
                      height={20}
                      width={20}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <p
                      className="text-primary text-[14px] font-semibold mb-2"
                      title={item?.name}
                    >
                      {truncateString(item?.name)}
                    </p>

                    <p className="text-subtitleText text-[14px] font-normal m-0">
                      {(item.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="flex  gap-2">
                    <div className="p-[6px] flex justify-center items-center rounded-full bg-grayBorder">
                      <Image
                        src={"/images/download-icon.svg"}
                        alt={item.name}
                        height={26}
                        width={26}
                      />
                    </div>
                    <div className="p-[6px] flex justify-center items-center rounded-full bg-grayBorder">
                      <Image
                        src={"/images/trash-2.svg"}
                        alt={item.name}
                        height={26}
                        width={26}
                        onClick={() => removeFile(item)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Spacer height="80px" />
        </div>
      )}
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
          disabled={props?.isLoading}
          onClick={props?.handleSubmit}
        />
      </div>
    </>
  );
};

export default Review;
