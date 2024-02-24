import React, { useState } from "react";
import { Radio, Space } from "antd";
import DefaultInput from "@/components/inputs/defaultinput";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Spacer from "@/components/spacer/spacer";

import styles from "./styles";

const TargetAudience = (props) => {
  const [value, setValue] = useState("");

  return (
    <>
      <div style={{ width: "100%" }}>
        <Radio.Group
          onChange={(e) => props?.setTargetAudience(e.target.value)}
          value={props?.targetAudience}
          style={{ width: "100%" }}
        >
          <Space direction="vertical">
            <Radio
              value={"Business to Business (B2B)"}
              className={`${
                props?.targetAudience === "Business to Business (B2B)"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Business to Business (B2B)
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"Business to Consumer (B2C)"}
              className={`${
                props?.targetAudience === "Business to Consumer (B2C)"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Business to Consumer (B2C)
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"Business to Government (B2G)"}
              className={`${
                props?.targetAudience === "Business to Government (B2G)"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Business to Government (B2G)
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
          onClick={() => props?.setPage("goals")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.targetAudience ? true : false}
          onClick={() => props?.setPage("geographicalScope")}
        />
      </div>
    </>
  );
};

export default TargetAudience;
