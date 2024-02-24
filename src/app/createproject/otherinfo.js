import React from "react";
import Image from "next/image";
import { Select } from "antd";

import Dropdown from "@/components/dropdown/dropdown";
import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const clients = [
  { id: 1, name: "client 1" },
  { id: 2, name: "client 2" },
  { id: 3, name: "client 3" },
  { id: 4, name: "client 4" },
];
const OtherInfo = (props) => {
  return (
    <>
      <div></div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
          onClick={() => props?.setPage("endDate")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.otherInfo ? true : false}
          onClick={() => props?.setPage("documents")}
        />
      </div>
    </>
  );
};

export default OtherInfo;
