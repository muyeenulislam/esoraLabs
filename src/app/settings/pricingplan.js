"use client";

import React from "react";

import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import pricingData from "@/utils/mockdata/pricingdata";

import PricingPlanComponent from "./pricingplancomponent";

const PricingPlan = () => {
  return (
    <div>
      <Spacer height="32px" />
      <div className="w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="headers text-white text-[20px] font-bold m-0">
              Pricing Plan
            </h2>
            <p className="text-[16px] font-normal text-[#FFFFFFCC] m-0">
              Create or manage your plans
            </p>
          </div>
          <YellowButton text="Create a Plan" />
        </div>

        {pricingData?.map((item, index) => (
          <PricingPlanComponent
            item={item}
            key={item?.id}
            index={index}
            pricingData={pricingData}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingPlan;
