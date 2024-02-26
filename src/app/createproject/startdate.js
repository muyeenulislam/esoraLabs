import React, { useState } from "react";
import { Radio, Space } from "antd";
import DefaultInput from "@/components/inputs/defaultinput";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Spacer from "@/components/spacer/spacer";

import styles from "./styles";

const StartDate = (props) => {
  const [value, setValue] = useState(null);

  return (
    <>
      <div style={{ width: "100%" }}>
        <Radio.Group
          onChange={(e) => props?.setStartTime(e.target.value)}
          value={props?.startTime}
          style={{ width: "100%" }}
        >
          <Space direction="vertical">
            <Radio
              value={"As soon as possible"}
              className={`${
                props?.startTime === "As soon as possible"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              As soon as possible
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"2- 4 weeks"}
              className={`${
                props?.startTime === "2- 4 weeks"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              2- 4 weeks
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"More than 1 month"}
              className={`${
                props?.startTime === "More than 1 month"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              More than 1 month
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"More than 3 months"}
              className={`${
                props?.startTime === "More than 3 months"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              More than 3 months
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"I don't have any start date"}
              className={`${
                props?.startTime === "I don't have any start date"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              I don&apos;t have any start date
            </Radio>
            <Spacer height="12px" />
            <Radio value={value}>
              <DefaultInput
                placeholder="Others (Please Specify)"
                onChange={(e) => setValue(e.target.value)}
              />
            </Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
          onClick={() => props?.setPage("maturity")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.startTime ? true : false}
          onClick={() => props?.setPage("endDate")}
        />
      </div>
    </>
  );
};

export default StartDate;
