import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Progress, message } from "antd";

import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Spacer from "@/components/spacer/spacer";

import truncateString from "@/utils/truncatestring";

import styles from "./styles";

const Documents = (props) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    props?.setFileList(fileList);
  }, [fileList]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // console.log("data",props?.fileList);
  return (
    <>
      <div>
        <Upload
          accept={props?.formats ?? ".pdf, .doc, .docx, .png, .jpg, .gif"}
          listType="picture"
          fileList={fileList}
          onChange={onChange}
          showUploadList={false}
          progress={{ strokeWidth: 2, showInfo: false }}
          className={`cursor-pointer flex justify-center items-center border border-solid border-gray-200 rounded-lg ${
            fileList?.length < 5 || !props?.disabled ? "" : "opacity-45"
          }`}
          disabled={props?.disabled || (fileList?.length < 5 ? false : true)}
        >
          <div className="px-6 py-4 flex justify-center items-center flex-col">
            <div className="p-[10px] h-[40px] w-[40px] flex justify-center items-center rounded-full border-6 border-solid border-gray-50 bg-gray-100">
              <Image
                src="/images/upload-cloud.svg"
                alt="logo"
                height={20}
                width={20}
              />
            </div>
            <Spacer height="12px" />
            <p className="text-subtitleText font-normal text-[14px] m-0">
              <strong className="text-primary">Click to upload</strong> or drag
              and drop
            </p>
            <p className="text-subtitleText font-normal text-[12px] m-0">
              PDF, DOC, PNG, JPG or GIF (Maximum upload size: 2MB (max. 5
              files))
            </p>
          </div>
        </Upload>
        <Spacer height="12px" />

        {fileList?.length > 0 &&
          fileList?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row gap-3 items-center border border-primary rounded-lg p-4 mb-3"
            >
              <div className="p-2 flex justify-center items-center rounded-full bg-white border-4 border-solid border-grayBorder">
                <Image
                  src={"/images/upload-file-icon.svg"}
                  alt={item.name}
                  height={16}
                  width={16}
                />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-primary text-[14px] font-semibold mb-2"
                  title={item?.name}
                >
                  {truncateString(item?.name)}
                </p>

                <p className="text-subtitleText text-[14px] font-normal m-0">
                  {(item.size / 1024).toFixed(2)} KB - {item?.percent}% Uploaded
                </p>

                {/* <Progress percent={item?.percent} className="m-0" /> */}
              </div>
            </div>
          ))}
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
          onClick={() => props?.setPage("otherInfo")}
        />
        <YellowButton
          text="Next"
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={props?.fileList?.length === 0 ? true : false}
          onClick={() => props?.setPage("review")}
        >
          Next
        </YellowButton>
      </div>
    </>
  );
};

export default Documents;
