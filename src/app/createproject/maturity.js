import React, { useState } from "react";
import { Radio, Space } from "antd";

import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Spacer from "@/components/spacer/spacer";

import styles from "./styles";

const Maturity = (props) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <Radio.Group
          onChange={(e) => props?.setMaturity(e.target.value)}
          value={props?.maturity}
          style={{ width: "100%" }}
        >
          <Space direction="vertical">
            <Radio
              value={"Concept and initiation"}
              className={`${
                props?.maturity === "Concept and initiation"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Concept and initiation
              <br></br>
              <span className="text-[14px] text-subtitleText font-normal">
                I&apos;m still defining the project idea and main concepts
              </span>
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"Planning"}
              className={`${
                props?.maturity === "Planning"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Planning
              <br></br>
              <span className="text-[14px] text-subtitleText font-normal">
                I&apos;m defining the project planning, scope and budget
              </span>
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"Execution"}
              className={`${
                props?.maturity === "Execution"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Execution
              <br></br>
              <span className="text-[14px] text-subtitleText font-normal">
                I&apos;m ready to start the execution of the project
              </span>
            </Radio>
            <Spacer height="12px" />
            <Radio
              value={"Monitoring and update"}
              className={`${
                props?.maturity === "Monitoring and update"
                  ? "text-[16px] text-primary font-semibold"
                  : "text-[16px] text-subtitleText font-medium"
              } `}
            >
              Monitoring and update
              <br></br>
              <span className="text-[14px] text-subtitleText font-normal">
                The project already started and I need extra ressources
              </span>
            </Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
          onClick={() => props?.setPage("geographicalScope")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.maturity ? true : false}
          onClick={() => props?.setPage("startDate")}
        />
      </div>
    </>
  );
};

export default Maturity;
