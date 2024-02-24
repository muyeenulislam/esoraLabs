import React, { useState } from "react";

import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

import SearchBar from "@/components/searchbar/searchbar";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const servicesArray = [
  { label: "Websites" },
  { label: "Mobile apps" },
  { label: "Slide decks" },
  { label: "Trade show banners" },
  { label: "Direct mail" },
  { label: "Email graphics" },
  { label: "Infographics" },
  { label: "Logos & branding" },
  { label: "Packaging" },
  { label: "Wireframes" },
  { label: "Brand guidelines" },
  { label: "Social media graphics" },
  { label: "Digital ads" },
  { label: "Pitch decks" },
  { label: "Billboards" },
  { label: "Icons" },
];

const Services = (props) => {
  const [servicesData, setServicesData] = useState(servicesArray);

  const handleSearch = (search) => {
    const filteredData = servicesArray.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
    setServicesData(filteredData);
  };

  return (
    <>
      <div>
        <SearchBar onChange={(e) => handleSearch(e.target.value)} />
        <div className="h-[1px] my-4 bg-[#D9D9D9]"></div>
        <div className="flex flex-wrap gap-2">
          {servicesData?.map((item) => (
            <div
              key={item?.label}
              className={`flex gap-3 py-3 pl-5 pr-3 rounded-[48px] cursor-pointer ${
                props?.services === item?.label
                  ? "bg-primary text-white"
                  : "border border-gray300"
              } `}
              onClick={() => props?.setServices(item?.label)}
            >
              <span>{item?.label}</span>
              <span>
                {props?.services === item?.label ? (
                  <FaCheckCircle />
                ) : (
                  <FaRegCheckCircle />
                )}
              </span>
            </div>
          ))}
        </div>
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
          disabled={!props?.services ? true : false}
          onClick={() => props?.setPage("description")}
        />
      </div>
    </>
  );
};

export default Services;
