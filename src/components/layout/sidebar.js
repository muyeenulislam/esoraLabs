"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

import styles from "./styles";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    router.push("/login");
  };

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
    <div className={styles.navbarContainer}>
      <div className={styles.navbarLogoDiv}>
        <img src="/images/esoraLogo.svg" alt="logo" className="mr-2" />
        <img src="/images/esoraTextLogo.svg" alt="logo" />
      </div>
      <div className={styles.navbarItemsContainer}>
        <div>
          {navbarItemsTop?.map((item, index) => (
            <div
              className={
                pathname === item.link
                  ? styles.activeClass
                  : styles.inactiveClass
              }
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
              className={
                pathname === item.link
                  ? styles.activeClass
                  : styles.inactiveClass
              }
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

      <div className={styles.navbarAccountInfoContainer}>
        <div className={styles.navbarAccountImage}>
          <img src={dummyData.image} alt="logo" />
        </div>
        <div className={styles.flexColumn}>
          <div className={styles.font14weight600}>{dummyData.name}</div>
          <div className={`${styles.font14weight400} text-grayText`}>
            {dummyData.email}
          </div>
        </div>
      </div>
      <div className={styles.logoutContainer} onClick={handleLogout}>
        <div className={styles.logoutText}>Logout</div>
        <img src="/images/logoutIcon.svg" alt="logo" />
      </div>
    </div>
  );
};

export default Sidebar;
