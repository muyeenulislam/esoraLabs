import React, { useState } from "react";
import { Radio, Space } from "antd";
import DefaultInput from "@/components/inputs/defaultinput";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Spacer from "@/components/spacer/spacer";

import styles from "./styles";

const GeographicalScope = (props) => {
  const [value, setValue] = useState(null);
  return (
    <>
      <div style={{ width: "100%" }}>
        <Radio.Group
          onChange={(e) => props?.setGeographicalScope(e.target.value)}
          value={props?.geographicalScope}
          style={{ width: "100%" }}
        >
          <Space direction="vertical">
            <Radio
              value={"Local"}
              className={`${
                props?.geographicalScope === "Local"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Local
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"Regional"}
              className={`${
                props?.geographicalScope === "Regional"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Regional
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"National"}
              className={`${
                props?.geographicalScope === "National"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              National
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"International"}
              className={`${
                props?.geographicalScope === "International"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              International
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
          onClick={() => props?.setPage("targetAudience")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.geographicalScope ? true : false}
          onClick={() => props?.setPage("maturity")}
        />
      </div>
    </>
  );
};

export default GeographicalScope;
