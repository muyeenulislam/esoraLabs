import React, { useState } from "react";
import { Table } from "antd";
import PrimaryButtonTable from "@/components/buttons/primarybuttontable";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";
import Pagination from "@/components/pagination/pagination";
const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
  },
  {
    title: "Last message",
    dataIndex: "lastMessage",
  },
  {
    title: "Assigned On",
    dataIndex: "assignedOn",
  },
  {
    title: "",
    dataIndex: "action",
    width: 350,
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
  const [currentPage, setCurrentPage] = useState(1);

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
  };

  return (
    <div className="border border-gray-200 shadow-clientCard rounded-2xl">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default ProfileDetailsProjects;
