import React, { useState } from "react";
import Image from "next/image";
import Pagination from "@/components/pagination/pagination";

import Spacer from "@/components/spacer/spacer";
import WhiteButton from "@/components/buttons/whitebutton";

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
];

const Services = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(servicesArray?.length / 10);

  return (
    <div>
      <Spacer height="32px" />
      <div className="w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="headers text-white text-[20px] font-bold m-0">
              Services
            </h2>
            <p className="text-[16px] font-normal text-[#FFFFFFCC] m-0">
              Add and manage your services
            </p>
          </div>
          <WhiteButton text="Add a Service" />
        </div>
        {servicesArray?.map((item) => (
          <div
            key={item?.label}
            className="px-6 py-4 flex justify-between items-center border-b border-grayBorderDashboard"
          >
            <p className="text-[16px] font-bold text-primary m-0">
              {item?.label}
            </p>
            <Image
              src="./images/arrow-half-right.svg"
              height={24}
              width={24}
              alt=""
            />
          </div>
        ))}
        <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
