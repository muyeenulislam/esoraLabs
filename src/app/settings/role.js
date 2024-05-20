import React from "react";

import WhiteButtonTable from "@/components/buttons/whitebuttontable";
import roleData from "@/utils/mockdata/roledata";

const Role = () => {
  const handleDelete = (item) => {
    console.log(item?.title);
  };

  return (
    <div className="border border-gray-200 shadow-clientCard rounded-2xl">
      {roleData?.map((item, index) => (
        <div
          key={item?.label}
          className={`px-6 py-4 flex justify-between items-center ${
            index === roleData?.length - 1
              ? ""
              : "border-b border-grayBorderDashboard"
          }`}
        >
          <p className="text-[16px] font-bold text-primary m-0">
            {item?.title}
          </p>
          <WhiteButtonTable text="Delete" onClick={() => handleDelete(item)} />
        </div>
      ))}
    </div>
  );
};

export default Role;
