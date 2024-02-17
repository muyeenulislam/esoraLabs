import React from "react";
import Link from "next/link";
import Image from "next/image";

const Breadcrumb = (props) => {
  return (
    <div className="flex items-center">
      <Link href={"/dashboard"}>
        <Image
          src="/images/dashboard-icon.svg"
          className="p-1"
          alt=""
          height={24}
          width={24}
        />
      </Link>
      {props?.data?.map((item, index) => (
        <div key={index} className="flex">
          <Image
            src="/images/gray-slash.svg"
            className="p-1"
            alt=""
            height={20}
            width={20}
          />
          <Link
            className={`py-1 px-2 ${
              item?.active ? "text-primary" : "text-gray-400"
            } bg-gray50 rounded-md text-[14px] font-bold flex items-center`}
            href={item.link}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
