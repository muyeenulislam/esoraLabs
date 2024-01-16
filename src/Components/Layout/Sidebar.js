"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const inactiveClass =
    "flex items-center w-full p-2 text-[#CBCFDD] text-[16px] font-medium cursor-pointer";
  const activeClass =
    "flex items-center w-full p-2 text-gray-100 bg-[#222C4A] rounded-md text-[16px] font-bold cursor-pointer";

  const dummyData = {
    image: "/images/profileIcon.svg",
    name: "Admin",
    email: "admin@example.com",
  };

  const navbarItemsTop = [
    {
      text: "Dashboard",
      image: "/images/dashboardIcon.svg",
      activeImage: "/images/dashboardIconActive.svg",
      link: "/dashboard",
    },
    {
      text: "Clients",
      image: "/images/clientIcon.svg",
      activeImage: "/images/clientIconActive.svg",
      link: "/clients",
    },
    {
      text: "Messages",
      image: "/images/messageIcon.svg",
      activeImage: "/images/messageIconActive.svg",
      link: "/messages",
    },
  ];
  const navbarItemsBottom = [
    {
      text: "Activity",
      image: "/images/activityIcon.svg",
      activeImage: "/images/activityIconActive.svg",
      link: "/activity",
    },
    {
      text: "Team",
      image: "/images/teamIcon.svg",
      activeImage: "/images/teamIconActive.svg",
      link: "/team",
    },
    {
      text: "Settings",
      image: "/images/settingsIcon.svg",
      activeImage: "/images/settingsIconActive.svg",
      link: "/settings",
    },
  ];

  return (
    <div className="w-[280px] flex flex-col">
      <div className="flex justify-center py-8">
        <img src="/images/esoraLogo.svg" alt="logo" className="mr-2" />
        <img src="/images/esoraTextLogo.svg" alt="logo" />
      </div>
      <div className="px-4 flex flex-col justify-between h-full">
        <div>
          {navbarItemsTop?.map((item, index) => (
            <div
              className={pathname === item.link ? activeClass : inactiveClass}
              key={index}
              onClick={() => handleNavigation(item.link)}
            >
              <img
                src={pathname === item.link ? item.activeImage : item.image}
                alt="logo"
                className="mr-2"
              />
              <div>{item.text}</div>
            </div>
          ))}
        </div>
        <div className="pb-4 border-b-2 border-gray-600">
          {navbarItemsBottom?.map((item, index) => (
            <div
              className={pathname === item.link ? activeClass : inactiveClass}
              key={index}
              onClick={() => handleNavigation(item.link)}
            >
              <img
                src={pathname === item.link ? item.activeImage : item.image}
                alt="logo"
                className="mr-2"
              />
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex px-4 py-6  items-center w-full">
        <div className="mr-2 h-9 w-9  flex justify-center items-center rounded-full bg-[#222C4A]">
          <img src={dummyData.image} alt="logo" />
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] font-semibold">{dummyData.name}</div>
          <div className="text-[14px] font-normal text-[#CBCFDD]">
            {dummyData.email}
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-center w-full p-2 mb-6 cursor-pointer"
        onClick={handleLogout}
      >
        <div className="mr-2 text-[#CBCFDD]">Logout</div>
        <img src="/images/logoutIcon.svg" alt="logo" />
      </div>
    </div>
  );
};

export default Sidebar;
