import React, { useState } from "react";
import { Radio, Space } from "antd";
import DefaultInput from "@/components/inputs/defaultinput";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Spacer from "@/components/spacer/spacer";

import styles from "./styles";

const EndDate = (props) => {
  const [value, setValue] = useState(null);

  return (
    <>
      <div style={{ width: "100%" }}>
        <Radio.Group
          onChange={(e) => props?.setDeadline(e.target.value)}
          value={props?.deadline}
          style={{ width: "100%" }}
        >
          <Space direction="vertical">
            <Radio
              value={"Less than a month"}
              className={`${
                props?.deadline === "Less than a month"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Less than a month
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"1 - 3 months"}
              className={`${
                props?.deadline === "1 - 3 months"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              1 - 3 months
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"3 - 6 months"}
              className={`${
                props?.deadline === "3 - 6 months"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              3 - 6 months
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"6 - 12 months"}
              className={`${
                props?.deadline === "6 - 12 months"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              6 - 12 months
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"More than 12 months"}
              className={`${
                props?.deadline === "More than 12 months"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              More than 12 months
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
          onClick={() => props?.setPage("startDate")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.deadline ? true : false}
          onClick={() => props?.setPage("otherInfo")}
        />
      </div>
    </>
  );
};

export default EndDate;
