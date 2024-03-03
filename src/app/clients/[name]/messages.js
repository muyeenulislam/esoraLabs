import React, { useState } from "react";
import { TeamData } from "@/utils/mockdata/teamdata";
import {  Divider, Radio, Space, Table, Tag } from "antd";
import { FaArrowRight } from "react-icons/fa";
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];
const columns = [
  {
    title: 'Project Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Last Message',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Sent On',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <button
              type="button"
              className="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Send a Message <FaArrowRight className="ml-1" />
            </button>
            <span className="bg-fadedYellow px-2 rounded-2xl text-[16px] font-medium">
            2
          </span>
      </Space>
    ),
  },
];

const ProfileDetailsMessages = ({ data }) => {
 // rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <div className="rounded-md shadow border my-auto border-gray-300 p-4">
        <h4 className="font-Magistral text-xl">General Message</h4>
        <div className="flex mt-8 text-md mx-4 justify-between">
          <div>
            <p className="font-light">Last Message</p>
            <p className="font-semibold">Can you share some reference</p>
          </div>
          <div>
            <p className="font-light">Sent On</p>
            <p className="font-semibold">01/27/2023</p>
          </div>
          <div>

            <button
              type="button"
              className="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Send a Message <FaArrowRight className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      <div>
      <div className="border mt-9 shadow border-gray-200 rounded-md p-4">

      <Table rowSelection={{
          type: selectionType,
          ...rowSelection,
        }} dataSource={dataSource} columns={columns} />
  </div>

      </div>
    </div>
  );
};

export default ProfileDetailsMessages;
