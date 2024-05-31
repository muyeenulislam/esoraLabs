import React, { useState } from "react";
import { useRouter } from "next/navigation";

import moment from "moment";

import PrimaryButtonTable from "@/components/buttons/primarybuttontable";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";
import Pagination from "@/components/pagination/pagination";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";

const ProfileDetailsProjects = ({ data, handleRemove }) => {
  const router = useRouter();

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      width: 200,
      render: (text, record) => <div>{record?.project?.services}</div>,
    },
    {
      title: "Last message",
      dataIndex: "lastMessage",
      width: 200,
      render: (text, record) => (
        <div>{record?.project?.lastMessage ?? "-"}</div>
      ),
    },
    {
      title: "Assigned On",
      dataIndex: "assignedOn",
      width: 200,
      render: (text, record) => (
        <div>{moment(record?.assingedOn).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      width: 250,
      render: (text, record) => (
        <div className="flex items-center justify-end gap-3">
          <WhiteButtonTable
            text={"Remove"}
            onClick={() => handleRemove(record?.project?._id)}
          />
          <PrimaryButtonTable
            text={"View Project"}
            image={"/images/arrow-right-white.svg"}
            onClick={() =>
              router.push(
                `/clients/${record?.project?.companyId}/projects?projectid=${record?.project?._id}`
              )
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="border border-gray-200 shadow-clientCard rounded-2xl">
      <TableWithoutCheckbox
        rowKey={(record) => record?._id}
        columns={columns}
        data={data?.projects}
        scroll={{ x: "1000" }}
      />
      {data?.projects?.length > 0 && (
        <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
          <Pagination
            limit={limit}
            totalPages={data?.projects?.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
export default ProfileDetailsProjects;
