import React from "react";

import TextBox from "@/components/textbox/textbox";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const Goals = (props) => {
  return (
    <>
      <div>
        <TextBox
          onChange={(e) => props?.setGoals(e.target.value)}
          placeholder="Enter Info Here..."
          value={props?.goals}
        />
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
          onClick={() => props?.setPage("description")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.goals ? true : false}
          onClick={() => props?.setPage("targetAudience")}
        />
      </div>
    </>
  );
};

export default Goals;
