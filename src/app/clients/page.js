"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Select } from "antd";

import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import PaginationButton from "@/components/buttons/paginationbutton";

import SearchBar from "@/components/searchbar/searchbar";
import Dropdown from "@/components/dropdown/dropdown";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import ClientCard from "@/components/cards/clientcard";

import { ClientData } from "@/utils/mockdata/clientdata";

const breadcumbData = [{ title: "Clients", link: "/clients", active: true }];

const Clients = () => {
  const [sortFilter, setSortFilter] = useState("newest");
  const [search, setSearch] = useState("");

  const handleFilterChange = (e) => {
    setSortFilter(e);
  };

  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <div className="flex justify-between">
        <PageHeading
          heading="Clients"
          subHeading="Track, manage and forecast your clients."
        />
        <div className="grid grid-cols-3 gap-3 max-h-[50px]">
          <WhiteButton
            image={"/images/upload-cloud-icon.svg"}
            imagealign="left"
            text={"Import Brief"}
          />
          <WhiteButton
            image={"/images/plus-icon.svg"}
            text={"Create a New Project"}
            imagealign="left"
          />
          <YellowButton
            imagealign="left"
            image={"/images/new-client-icon.svg"}
            text={"Create a New Client"}
          />
        </div>
      </div>
      <Spacer height="32px" />
      <div className="flex justify-between">
        <div>
          <SearchBar onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-[240px]">
          <Dropdown value={sortFilter} onChange={handleFilterChange}>
            <Select.Option value={"newest"}>Newest First</Select.Option>
            <Select.Option value={"oldest"}>Oldest First</Select.Option>
          </Dropdown>
        </div>
      </div>
      <Spacer height="32px" />
      <div className="grid grid-cols-3 gap-6">
        {ClientData?.map((item, index) => (
          <ClientCard data={item} key={index}>
            <div>View Details</div>
          </ClientCard>
        ))}
      </div>
      <Spacer height="32px" />
      <div className="pt-[11px] pb-4 flex items-center justify-between border-t border-t-grayBorder">
        <div className="flex">
          <PaginationButton text={"Previous"} />
          <div className="w-3"></div>
          <PaginationButton text={"Next"} />
        </div>
        <div className="text-subtitleText text-[14px] font-normal">
          Page <span className="font-medium">1</span> of{" "}
          <span className="font-medium">4</span>
        </div>
      </div>
    </div>
  );
};

export default Clients;
