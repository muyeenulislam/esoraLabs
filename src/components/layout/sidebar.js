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
    image: "/images/profile-icon.svg",
    name: "Admin",
    email: "admin@example.com",
  };

  const navbarItemsTop = [
    {
      text: "Dashboard",
      image: "/images/dashboard-icon.svg",
      activeImage: "/images/dashboard-icon-active.svg",
      link: "/dashboard",
    },
    {
      text: "Clients",
      image: "/images/client-icon.svg",
      activeImage: "/images/client-icon-active.svg",
      link: "/clients",
    },
    {
      text: "Messages",
      image: "/images/message-icon.svg",
      activeImage: "/images/message-icon-active.svg",
      link: "/messages",
    },
  ];
  const navbarItemsBottom = [
    {
      text: "Activity",
      image: "/images/activity-icon.svg",
      activeImage: "/images/activity-icon-active.svg",
      link: "/activity",
    },
    {
      text: "Team",
      image: "/images/team-icon.svg",
      activeImage: "/images/team-icon-active.svg",
      link: "/team",
    },
    {
      text: "Settings",
      image: "/images/settings-icon.svg",
      activeImage: "/images/settings-icon-active.svg",
      link: "/settings",
    },
  ];

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarLogoDiv}>
        <img src="/images/esora-logo.svg" alt="logo" className="mr-2" />
        <img src="/images/esora-text-logo.svg" alt="logo" />
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
        <img src="/images/logout-icon.svg" alt="logo" />
      </div>
    </div>
  );
};

export default Sidebar;
