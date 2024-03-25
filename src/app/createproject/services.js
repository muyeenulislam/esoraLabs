import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";

import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

import Spacer from "@/components/spacer/spacer";
import SearchBar from "@/components/searchbar/searchbar";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const servicesArray = [
  { label: "Websites", status: "unavailable" },
  { label: "Mobile apps", status: "available" },
  { label: "Slide decks", status: "available" },
  { label: "Trade show banners", status: "available" },
  { label: "Direct mail", status: "available" },
  { label: "Email graphics", status: "available" },
  { label: "Infographics", status: "available" },
  { label: "Logos & branding", status: "available" },
  { label: "Packaging", status: "available" },
  { label: "Wireframes", status: "available" },
  { label: "Brand guidelines", status: "available" },
  { label: "Social media graphics", status: "available" },
  { label: "Digital ads", status: "available" },
  { label: "Pitch decks", status: "available" },
  { label: "Billboards", status: "available" },
  { label: "Icons", status: "available" },
];

const Services = (props) => {
  const [servicesData, setServicesData] = useState(servicesArray);
  const [selectedServices, setSelectedServices] = useState([]);
  // const { selectedMultiServices, onSelectedServicesChange } = props;

  useEffect(()=>{
    props?.setServices(selectedServices)
  },[selectedServices])



  const handleSearch = (search) => {
    const filteredData = servicesArray.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
    setServicesData(filteredData);
  };

  const handleServiceClick = (label) => {
    const index = selectedServices.indexOf(label);
    if (index === -1) {
      setSelectedServices([...selectedServices, label]);
    } else {
      const updatedServices = [...selectedServices];
      updatedServices.splice(index, 1);
     setSelectedServices(updatedServices);
    }
  };

  console.log("selectedServices",selectedServices);
  

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
                selectedServices.includes(item.label)
                  ? "bg-primary text-white"
                  : "border border-gray300"
              } `}
              onClick={() => handleServiceClick(item.label)}
            >
              <span>{item?.label}</span>
              <span>
                {selectedServices.includes(item.label) ? (
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
          disabled={selectedServices.length === 0}
          onClick={() => props?.setPage("description")}
        />
      </div>
    </>
  );
};

export default Services;
