import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { message } from "antd";
import moment from "moment";

import ApiCaller from "@/config/apicaller";

import StatusIndicator from "@/components/statusindicator/statusindicator";
import PrimaryTable from "@/components/table/primarytable";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";
import PrimaryButtonTable from "@/components/buttons/primarybuttontable";
import Pagination from "@/components/pagination/pagination";

const ProfileDetailsProjects = () => {
  const pathname = usePathname();
  const router = useRouter();

  const id = pathname?.split("/")[2];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [project, setProject] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiCaller.Get(
          `/projects/company/?id=${id}&limit=${limit}$offset=${offset}`
        );

        if (response.status === 200) {
          setProject(response.data.data);
          setIsLoading(false);
        } else {
          message.error(response.data.message);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleButtonClick = (projectId) => {
    router.push(`/clients/${id}/projects/${projectId}`);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: 200,
    },
    {
      title: "Priority",
      key: "tags",
      dataIndex: "tags",
      width: 100,
      render: (text, record) => (
        <>
          <StatusIndicator text={"High"} className="w-max" />
        </>
      ),
    },
    {
      title: "Status",
      key: "Status",
      dataIndex: "Status",
      width: 100,
      render: (text, record) => (
        <>
          <StatusIndicator text={record?.status} className="w-max" />
        </>
      ),
    },
    {
      title: "Created On",
      dataIndex: "Created",
      width: 150,
      render: (text, record) => (
        <>{moment(record?.createdAt).format("DD/MM/YYYY")}</>
      ),
    },
    {
      title: "Due By",
      dataIndex: "Due",
      width: 150,
      render: (text, record) => <>{record?.whenProjectComplete}</>,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <PrimaryButtonTable
          text={"Start Briefing"}
          image={"/images/arrow-right-white.svg"}
          onClick={() => handleButtonClick(record._id)}
        />
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="border border-gray-200 shadow-clientCard rounded-2xl">
      <PrimaryTable
        rowKey={(record) => record?._id}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        columns={columns}
        data={project}
        loading={isLoading}
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
