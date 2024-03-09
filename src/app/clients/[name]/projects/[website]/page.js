"use client"
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/breadcumb/breadcrumb'
import WhiteButton from '@/components/buttons/whitebutton'
import YellowButton from '@/components/buttons/yellowbutton'
import PageHeading from '@/components/pageheading/pageheading'
import Spacer from '@/components/spacer/spacer'
import { Button, Divider, Dropdown, Modal, Select, Tabs } from 'antd'
import Link from 'next/link'
import { FaArrowRight, FaRegTrashAlt } from 'react-icons/fa'
import ProfileDetailsMessages from '../../messages'
import ProfileDetailsOverview from '../../overview'
import ProfileDetailsProjects from '../../projects'
import { usePathname } from 'next/navigation'

import { ClientData } from "@/utils/mockdata/clientdata";
import Website_overview from './website_overview'
import DefaultInput from '@/components/inputs/defaultinput'




const website = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState({});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeKey, setActivekey] = useState("1");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setOpen] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [markedAsUnderReview, setMarkedAsUnderReview] = useState(false);
  
    const breadcumbData = [
      { title: "Clients", link: "/clients", active: false },
      { title: `${data?.name}`, link: "#", active: false },
      { title: "Project", link: "/clients", active: false },
      { title: "Website", link: "/clients", active: true },
    ];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const name = pathname?.split("/")[2].replace(/%20/g, " ");
      const memberData = ClientData.filter((item) => item.name === name);
      setData(memberData[0]);
    }, []);
    const items = [
      {
        key: "1",
        label: "Overview",
        children: <Website_overview data={data} />,
      },
      {
        key: "2",
        label: "Requirements",
        children: <ProfileDetailsProjects data={data} />,
      },
      {
        key: "3",
        label: "Files",
        children: <ProfileDetailsProjects data={data} />,
      },
      {
        key: "4",
        label: (
          <div>
            Messages{" "}
            <span className="bg-fadedYellow px-2 rounded-xl text-[12px] font-medium">
              2
            </span>
          </div>
        ),
        children: <ProfileDetailsMessages data={data} />,
      },
    ];
    const changeTab = (e) => {
      setActivekey(e);
    };
    const handleNextTab = () => {
      if (activeKey === "1") setActivekey("2");
      else if (activeKey === "2") setActivekey("3");
      else return;
    };
  
    const handlePrevTab = () => {
      if (activeKey === "3") setActivekey("2");
      else if (activeKey === "2") setActivekey("1");
      else return;
    };

// 
// eslint-disable-next-line react-hooks/rules-of-hooks
const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({
    role: "",
    name: "",
    designation: "",
    email: "",
  });


  const handleFilterChange = (e) => {
    setSortFilter(e);
  };

  const handleAdd = () => {
    console.log(state);
    setOpen(false)
    setMarkedAsUnderReview(true);
  };


  return (
    <div>
 <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <div className="flex justify-between">
        <div className="flex items-center">
          <Link
            href={"/clients"}
            className="border border-gray300 rounded-[10px] p-[14px] mr-[16px] shadow"
          >
            <img src="/images/arrow-left.svg" />
          </Link>
          <PageHeading
            heading= "Websites"
            subHeading="Mange your clients right from here."
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <WhiteButton
            imagealign="left"
            image={"/images/arrow-left.svg"}
            text={"Previous"}
            onClick={handlePrevTab}
          />
          <YellowButton
            imagealign="right"
            image={"/images/arrow-right.svg"}
            text={"Next"}
            onClick={handleNextTab}
          />

{/* <Button type="primary"  onClick={showModal}>
        Open Modal
     
          <button className="p-[14px] border border-gray300 rounded-[10px] text-[20px] text-[#52596D] shadow">
            <FaRegTrashAlt />
          </button>
          </Button> */}
           {isOpen && (
        <Modal
          open={isOpen}
          centered={true}
          onCancel={() => setOpen(false)}
          closeIcon={false}
          footer={[
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton text={"Cancel"} onClick={() => setOpen(false)} />
           
                <YellowButton text={"Mark as Under Review"} onClick={handleAdd} />
           
            </div>,
          ]}
        >
          <div>
          <div className='rounded-full h-[48px] w-[48px] bg-black flex items-center justify-center'>

          <img src='/images/eye.svg' className='h-[24px] w-[24px] rounded-full'/>

          </div>

            <h1 className="  text-[20px] pb-3 mt-4 font-bold m-0">
            Mark as Under Review
            </h1>
           
            <div>
              <p className="text-[14px] font-semibold text-[#0B132B]">
              You’re marking this project as Under Review, so clients will be notified about this update.
              </p>
              
            </div>
          </div>
        </Modal>
      )}
        </div>
      </div>
    <div>
    <div className="rounded-xl shadow border mt-9 my-auto border-gray-300 p-4">
      <div className='flex  justify-between'>

    <div className='flex gap-5 mt-2 '>

   
    <div className="flex p-3 pl-5 justify-center pointer items-center gap-3 rounded-full border border-gray-300 bg-white"  onClick={() => setOpen(true)}>
    Mark as Under Review <img src='/images/check.svg' />
</div>
<div className="flex p-3 pl-5 justify-center pointer items-center gap-3 rounded-full border border-gray-300 bg-white">
Mark as In Progress<img src='/images/check.svg' />
</div>
<div className="flex p-3 pl-5 justify-center pointer items-center gap-3 rounded-full border border-gray-300 bg-white">
Mark as Delivered<img src='/images/check.svg' />
</div>
</div>
<div className="flex p-3 justify-center items-center gap-3 pointer rounded-full bg-gray-100">
<img src='/images/chevron-down.svg' />
</div>
</div>
        <Divider/>
        <div className="flex mt-4 mb-4 my-auto text-md mx-4 item-center justify-between">
          <div>
          <PageHeading
            heading= "Assignee"
            subHeading="No assignee! Assign a team member now."
          />
          </div>
          <div>

          <YellowButton
            imagealign="right"
            image={"/images/user-check.svg"}
            text={"Assign"}
            // onClick={() => setOpen(true)}
          />

  <Modal title="Basic Modal" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

          </div>
        </div>
      </div>

    </div>






      <Spacer height="32px" />
      <Tabs
        defaultActiveKey={"1"}
        activeKey={activeKey}
        items={items}
        onChange={changeTab}
      />
    </div>


    </div>
  )
}

export default website