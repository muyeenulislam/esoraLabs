import React from "react";

import ApiCaller from "@/config/apicaller";

import WhiteButtonTable from "@/components/buttons/whitebuttontable";
import roleData from "@/utils/mockdata/roledata";
import Loader from "@/components/loader";

const Role = (props) => {
  const handleDelete = async (item) => {
    const response = await ApiCaller.Put(`/roles/${item._id}`);
    if (response.status === 200) {
      props.getAllRoles();
    } else {
      console.log(response);
    }
  };

  return (
    <div className="border border-gray-200 shadow-clientCard rounded-2xl">
      {props?.roleLoading ? (
        <Loader />
      ) : (
        <>
          {props?.roleData?.map((item, index) => (
            <div
              key={index}
              className={`px-6 py-4 flex justify-between items-center ${
                index === roleData?.length - 1
                  ? ""
                  : "border-b border-grayBorderDashboard"
              }`}
            >
              <p className="text-[16px] font-bold text-primary m-0">
                {item?.title}
              </p>
              <WhiteButtonTable
                text="Delete"
                onClick={() => handleDelete(item)}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Role;
