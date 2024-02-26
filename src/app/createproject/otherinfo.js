import React from "react";

import TextBox from "@/components/textbox/textbox";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const OtherInfo = (props) => {
  return (
    <>
      <div>
        <TextBox
          onChange={(e) => props?.setOtherInfo(e.target.value)}
          placeholder="Enter Info Here..."
          value={props?.otherInfo}
        />
      </div>
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
