import React from "react";

import Sidebar from "@/Components/layout/sidebar";
import Content from "@/Components/layout/content";

const Layout = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
