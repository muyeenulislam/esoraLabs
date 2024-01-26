import React from "react";

import WhiteButton from "@/Components/Buttons/WhiteButton";
import YellowButton from "@/Components/Buttons/YellowButton";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SearchBar from "@/Components/SearchBar/Searchbar";
import Dropdown from "@/Components/Dropdown/Dropdown";

import styles from "./styles";

const Clients = () => {
  return (
    <div>
      <div className="flex mb-8">
        <img src="/images/dashboardIcon.svg" className="p-1" />
        <img src="/images/graySlash.svg" className="p-1" />
        <div className="py-1 px-2 text-primary bg-gray50 rounded-md text-[14px] font-bold">
          Clients
        </div>
      </div>
      <div className={`${styles.justifyBetween} mb-8`}>
        <div>
          <div className={styles.welcomeText}>Clients</div>
          <div className={styles.welcomeSubtext}>
            Track, manage and forecast your clients.
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <WhiteButton
            image={"/images/uploadCloudIcon.svg"}
            text={"Import Brief"}
          />
          <WhiteButton
            image={"/images/plusIcon.svg"}
            text={"Create a New Project"}
          />
          <YellowButton
            image={"/images/newClientIcon.svg"}
            text={"Create a New Client"}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <SearchBar />
        </div>
        <div>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Clients;
