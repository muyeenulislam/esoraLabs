"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Select } from "antd";

import ApiCaller from "@/config/apicaller";

import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import SearchBar from "@/components/searchbar/searchbar";
import Dropdown from "@/components/dropdown/dropdown";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import ClientCard from "@/components/cards/clientcard";
import Pagination from "@/components/pagination/pagination";

const breadcumbData = [{ title: "Clients", link: "/clients", active: true }];

const Clients = () => {
  const router = useRouter();

  const [sortFilter, setSortFilter] = useState("newest");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [clientData, setClientData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await ApiCaller.Get(
          `/auth/company?name=${search}&limit=${limit}&offset=${offset}`
        );
        setClientData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClientData();
  }, []);

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
            onClick={() => router.push("/createproject")}
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
        <div style={{ width: "460px" }}>
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
        {clientData?.map((item, index) => (
          <ClientCard data={item} key={index}>
            <Link href={`/clients/${item._id}`}>View Details</Link>
          </ClientCard>
        ))}
      </div>
      <Spacer height="32px" />
      <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder">
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Clients;
