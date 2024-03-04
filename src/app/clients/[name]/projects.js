import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { FaArrowRight } from "react-icons/fa6";
import PrimaryTable from '@/components/table/primarytable';
import WhiteButtonTable from '@/components/buttons/whitebuttontable';
import PrimaryButtonTable from '@/components/buttons/primarybuttontable';
import Pagination from '@/components/pagination/pagination';
// const columns = [
//   {
//     title: 'Project Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Assignee',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Priority',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (_, { tags }) => (
//       <>
//         {tags.map((tag) => {
//           let color 
//           if (tag === 'High') {
//             color = 'Red';
//           } if (tag === 'Medium') {
//             color = 'Tomato';
//           }
//           if (tag === 'Low') {
//             color = 'Green';
//           }
//           return (
//             <Tag className='rounded-full' color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Status',
//     key: 'Status',
//     dataIndex: 'Status',
//     render: (_, { Status }) => (
//       <>
//         {Status.map((tag) => {
//           let color 
//           if (tag === 'In progress') {
//             color = 'blue';
//           } if (tag === 'Under Review') {
//             color = 'default';
//           }
//           if (tag === 'Completed') {
//             color="success"
//           }
//           return (
//             <Tag className='rounded-full font-semibold' color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Created On',
//     dataIndex: 'Created',
//   },
//   {
//     title: 'Due By',
//     dataIndex: 'Due',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
   
//    <button type="button" class="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
//   See Briefing <FaArrowRight class="ml-1" />
// </button>
//       </Space>
//     ),
//   },
// ];
const columns = [
  {
    title: 'Project Name',
    dataIndex: 'name',
  },
  {
    title: 'Assignee',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Priority',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color 
          if (tag === 'High') {
            color = 'Red';
          } if (tag === 'Medium') {
            color = 'Tomato';
          }
          if (tag === 'Low') {
            color = 'Green';
          }
          return (
            <Tag className='rounded-full' color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Status',
    key: 'Status',
    dataIndex: 'Status',
    render: (_, { Status }) => (
      <>
        {Status.map((tag) => {
          let color 
          if (tag === 'In progress') {
            color = 'blue';
          } if (tag === 'Under Review') {
            color = 'default';
          }
          if (tag === 'Completed') {
            color="success"
          }
          return (
            <Tag className='rounded-full font-semibold' color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Created On',
    dataIndex: 'Created',
  },
  {
    title: 'Due By',
    dataIndex: 'Due',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
   
   <button type="button" class="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
  See Briefing <FaArrowRight class="ml-1" />
</button>
      </Space>
    ),
  },
];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    tags: ['High' ],
    Status: ['Under Review'],
    Created: `01/27/2023`,
    Due:`01/27/2023`
  });
}
const ProfileDetailsProjects = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(data?.length / 10);

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
          totalPages={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default ProfileDetailsProjects;