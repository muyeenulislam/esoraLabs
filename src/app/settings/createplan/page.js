"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Radio } from "antd";

import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import DefaultInput from "@/components/inputs/defaultinput";

import CurrencyDropdownInput from "@/components/inputs/currencydropdowninput";

const CreatePlan = () => {
  const router = useRouter();

  const [state, setState] = useState({
    name: "",
    subtitle: "",
    pricingPlan: "",
    price: "",
    currency: "USD",
    currencySymbol: "$",
    subHeading: "",
  });
  console.log(state);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeading heading="Create Plan" subHeading="Create your plan" />
        <button
          className="p-[14px] border border-gray300 rounded-[10px] text-[20px] text-[#52596D] shadow"
          onClick={() => router.push("/settings?tab=4")}
        >
          <Image
            src={"/images/black-cross.svg"}
            alt=""
            height={20}
            width={20}
          />
        </button>
      </div>
      <Spacer height="32px" />
      <div className="w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between items-center">
          <h2 className="headers text-white text-[20px] font-bold m-0">
            Enter your plan details
          </h2>
        </div>
        {/* name */}
        <div className="p-6 border-b border-grayBorderDashboard">
          <h4 className="text-[16px] text-primary font-bold m-0">
            Name of Plan
          </h4>
          <Spacer height="8px" />
          <p className="text-[14px] text-subtitleText font-normal m-0">
            Enter the name of plan in 1 or 2 words (e.g. Standard)
          </p>
          <Spacer height="16px" />
          <DefaultInput
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </div>
        {/* subheading */}
        <div className="p-6 border-b border-grayBorderDashboard">
          <h4 className="text-[16px] text-primary font-bold m-0">
            Sub-heading
          </h4>
          <Spacer height="8px" />
          <p className="text-[14px] text-subtitleText font-normal m-0">
            Enter a sub-heading to describe your plan in short
          </p>
          <Spacer height="16px" />
          <DefaultInput
            onChange={(e) => setState({ ...state, subtitle: e.target.value })}
          />
        </div>
        {/* pricing */}
        <div className="p-6 border-b border-grayBorderDashboard">
          <h4 className="text-[16px] text-primary font-bold m-0">Pricing</h4>
          <Spacer height="8px" />
          <p className="text-[14px] text-subtitleText font-normal m-0">
            Select the type of your pricing and enter the value of price
          </p>
          <Spacer height="16px" />
          <div className="grid grid-cols-3 items-center">
            <div>
              <Radio.Group
                onChange={(e) =>
                  setState({ ...state, pricingPlan: e.target.value })
                }
                value={state?.pricingPlan}
              >
                <Radio
                  value={"yearly"}
                  className="text-[16px] font-medium text-[#434A60]"
                >
                  Yearly
                </Radio>
                <Radio
                  value={"monthly"}
                  className="text-[16px] font-medium text-[#434A60]"
                >
                  Monthly
                </Radio>
              </Radio.Group>
            </div>
            <div className="col-span-2">
              <CurrencyDropdownInput state={state} setState={setState} />
            </div>
          </div>
          <Spacer height="24px" />
          <h4 className="text-[16px] text-primary font-bold m-0">
            Sub-heading
          </h4>
          <Spacer height="8px" />
          <p className="text-[14px] text-subtitleText font-normal m-0">
            Enter a sub-heading to describe your pricing in few words
          </p>
          <Spacer height="16px" />
          <DefaultInput />
        </div>
      </div>
    </div>
  );
};

export default CreatePlan;
