import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";

import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

import ApiCaller from "@/config/apicaller";

import Spacer from "@/components/spacer/spacer";
import SearchBar from "@/components/searchbar/searchbar";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import Loader from "@/components/loader";

import styles from "./styles";

const Services = (props) => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedServices, setSelectedServices] = useState(
    props?.services || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props?.setServices(selectedServices);
  }, [selectedServices]);

  useEffect(() => {
    fetchServicesData();
  }, []);

  const handleSearch = (search) => {
    if (!search) {
      fetchServicesData();
    } else {
      const filteredData = servicesData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setServicesData(filteredData);
    }
  };

  const handleServiceClick = (title) => {
    if (selectedServices === title) {
      setSelectedServices("");
    } else {
      setSelectedServices(title);
    }
  };

  const fetchServicesData = async () => {
    try {
      setLoading(true);

      const response = await ApiCaller.Get(`/services`);

      if (response?.status === 200) {
        setServicesData(response?.data?.services);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching services data:", error);
    }
  };

  console.log(selectedServices);
  return (
    <>
      <div>
        <SearchBar onChange={(e) => handleSearch(e.target.value)} />
        <div className="h-[1px] my-4 bg-[#D9D9D9]"></div>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap gap-2">
            {servicesData?.map((item) => (
              <div
                key={item?.title}
                className={`flex gap-3 py-3 pl-5 pr-3 rounded-[48px] cursor-pointer ${
                  selectedServices.includes(item.title)
                    ? "bg-primary text-white"
                    : "border border-gray300"
                } `}
                onClick={() => handleServiceClick(item.title)}
              >
                <span>{item?.title}</span>
                <span>
                  {selectedServices.includes(item.title) ? (
                    <FaCheckCircle />
                  ) : (
                    <FaRegCheckCircle />
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
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
