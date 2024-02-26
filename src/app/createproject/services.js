"use client";

import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");

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
              onClick={() => {
                if (item?.status === "unavailable") {
                  setServiceName(item?.label);
                  setIsOpen(true);
                } else {
                  props?.setServices(item?.label);
                }
              }}
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
      {isOpen && (
        <Modal
          open={isOpen}
          centered={true}
          onCancel={() => setIsOpen(false)}
          closeIcon={false}
          footer={false}
        >
          <div>
            <div className="h-12 w-12 rounded-full bg-warning100 flex justify-center items-center border-8 border-warning50 ">
              <Image
                src="/images/alert-triangle.svg"
                height={24}
                width={24}
                alt=""
              />
            </div>
            <Spacer height="20px" />
            <h1 className="headers text-primary text-[20px]">
              Sorry, the service is unavailable!
            </h1>
            <Spacer height="12px" />
            <p className="font-normal text-[14px] text-subtitleText">
              You’re unable to take this{" "}
              <span className="font-bold">“{serviceName}”</span> service, due to
              your subscription about to expire in 2 days.
            </p>
            <p className="font-normal text-[14px] text-subtitleText">
              If you want to take this service, you may need to extend your
              subscription to the next month.
            </p>
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton text={"Cancel"} onClick={() => setIsOpen(false)} />
              <YellowButton text={"Extend Subscription"} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Services;
