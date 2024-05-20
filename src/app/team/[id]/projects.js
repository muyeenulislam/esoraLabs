import React, { useState } from "react";
import PrimaryButtonTable from "@/components/buttons/primarybuttontable";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";
import Pagination from "@/components/pagination/pagination";
import PrimaryTable from "@/components/table/primarytable";

const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    render: (text, record) => <div>{record?.projectName}</div>,
  },
  {
    title: "Last message",
    dataIndex: "lastMessage",
    render: (text, record) => <div>{record?.lastMessage}</div>,
  },
  {
    title: "Assigned On",
    dataIndex: "assignedOn",
    render: (text, record) => <div>{record?.assignedOn}</div>,
  },
  {
    title: "",
    dataIndex: "action",
    width: 350,
    render: (text, record) => (
      <div className="flex items-center justify-end gap-3">
        <WhiteButtonTable text={"Remove"} />
        <PrimaryButtonTable
          text={"View Project"}
          image={"/images/arrow-right-white.svg"}
        />
      </div>
    ),
  },
];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    projectName: `Edward King ${i}`,
    lastMessage: "asdfgikyu wiergasdf ",
    assignedOn: `01/02/202${i}`,
    action: (
      <div className="flex items-center justify-end gap-3">
        <WhiteButtonTable text={"Remove"} />
        <PrimaryButtonTable
          text={"View Project"}
          image={"/images/arrow-right-white.svg"}
        />
      </div>
    ),
  });
}

const ProfileDetailsProjects = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [project, setProject] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);

  return (
    <div className="border border-gray-200 shadow-clientCard rounded-2xl">
      <PrimaryTable
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        columns={columns}
        data={data}
      />
      <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
        <Pagination
          limit={limit}
          totalPages={projectCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default ProfileDetailsProjects;
