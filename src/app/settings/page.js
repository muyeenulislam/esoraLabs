"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs } from "antd";

import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";

import General from "./general";
import Services from "./services";
import Team from "./team";
import PricingPlan from "./pricingplan";

const Settings = () => {
  const searchParams = useSearchParams();

  const [activeKey, setActivekey] = useState(searchParams.get("tab") ?? "1");

  const breadcumbData = [
    { title: "Settings", link: "/settings", active: true },
  ];

  const items = [
    {
      key: "1",
      label: "General",
      children: <General />,
    },
    {
      key: "2",
      label: "Services",
      children: <Services />,
    },
    {
      key: "3",
      label: "Team",
      children: <Team />,
    },
    {
      key: "4",
      label: "Pricing Plan",
      children: <PricingPlan />,
    },
  ];
  const changeTab = (e) => {
    setActivekey(e);
  };

  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <PageHeading heading="Settings" subHeading="Manage your settings here" />
      <Spacer height="32px" />
      <Tabs
        defaultActiveKey={"1"}
        activeKey={activeKey}
        items={items}
        onChange={changeTab}
      />
    </div>
  );
};

export default Settings;
