import React from "react";

const Sidebar = () => {
  const dummyData = {
    image: "/images/profileIcon.svg",
    name: "Admin",
    email: "admin@example.com",
  };

  const navbarItemsTop = [
    { text: "Dashboard", image: "/images/dashboardIcon.svg" },
    { text: "Clients", image: "/images/clientIcon.svg" },
    { text: "Messages", image: "/images/messageIcon.svg" },
  ];
  const navbarItemsBottom = [
    { text: "Activity", image: "/images/activityIcon.svg" },
    { text: "Team", image: "/images/teamIcon.svg" },
    { text: "Settings", image: "/images/settingsIcon.svg" },
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
            <div className="flex items-center w-full p-2" key={index}>
              <img src={item.image} alt="logo" className="mr-2" />
              <div>{item.text}</div>
            </div>
          ))}
        </div>
        <div className="pb-4 border-b-2 border-gray-600">
          {navbarItemsBottom?.map((item, index) => (
            <div className="flex items-center w-full p-2" key={index}>
              <img src={item.image} alt="logo" className="mr-2" />
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
      <div className="flex items-center justify-center w-full p-2 mb-6">
        <div className="mr-2 text-[#CBCFDD]">Logout</div>
        <img src="/images/logoutIcon.svg" alt="logo" />
      </div>
    </div>
  );
};

export default Sidebar;
