import React from "react";
import Image from "next/image";
import { Select } from "antd";

import Dropdown from "@/components/dropdown/dropdown";
import Spacer from "@/components/spacer/spacer";
import SearchBar from "@/components/searchbar/searchbar";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const Services = (props) => {
  return (
    <>
      <div>
        <SearchBar />
        <div className="h-[1px] my-4 bg-[#D9D9D9]"></div>
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
          onClick={() => props?.setPage("clientSelect")}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          // disabled={props?.services?.length === 0 ? true : false}
          onClick={() => props?.setPage("description")}
        />
      </div>
    </>
  );
};

export default Services;
