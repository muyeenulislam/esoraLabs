import React from "react";

import TextBox from "@/components/textbox/textbox";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const Description = (props) => {
  return (
    <>
      <div>
        <TextBox
          onChange={(e) => props?.setDescription(e.target.value)}
          placeholder="Enter Info Here..."
          value={props?.description}
        />
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
          onClick={() => props?.setPage("services")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.description ? true : false}
          onClick={() => props?.setPage("goals")}
        />
      </div>
    </>
  );
};

export default Description;
