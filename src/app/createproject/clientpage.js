import React from "react";
import Image from "next/image";
import { Select } from "antd";

import Dropdown from "@/components/dropdown/dropdown";
import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";

import styles from "./styles";

const ClientPage = (props) => {
  const handleClientSelect = (selectedValue) => {
    const company = JSON.parse(selectedValue);
    props?.setClientName(company?.name);
    props?.setCompanyId(company?._id);
  };

  return (
    <>
      <div>
        <div>
          <p className={styles.labelStyle}>Client</p>
          <Dropdown
            onChange={handleClientSelect}
            value={props?.clientName || undefined}
            placeholder="Select Client"
          >
            {props?.clientList?.map((item) => (
              <Select.Option value={JSON.stringify(item)} key={item?._id}>
                {item.name}
              </Select.Option>
            ))}
          </Dropdown>
        </div>
        <div className="h-[1px] my-4 bg-[#D9D9D9]"></div>
        <div className="px-6 pb-4 flex flex-col items-center">
          <p className="mb-0">Or</p>
          <Spacer height="32px" />
          <Image
            src={"/images/addproject-addclienticon.svg"}
            height={80}
            width={80}
            alt="add project"
          />
          <Spacer height="32px" />
          <h3 className="headers font-bold text-[18px] text-primary">
            Create client
          </h3>
          <Spacer height="8px" />
          <p className="mb-0 text-[14px] text-subtitleText">
            Not found your client, then create a new client.
          </p>
          <Spacer height="32px" />
          <YellowButton
            imagealign="left"
            image={"/images/new-client-icon.svg"}
            text={"Create a New Client"}
          />
        </div>
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
        />
        <YellowButton
          text={"Next"}
          imagealign="right"
          image={"/images/arrow-right.svg"}
          disabled={!props?.clientName ? true : false}
          onClick={() => {
            props?.setPage("services");
          }}
        />
      </div>
    </>
  );
};

export default ClientPage;
