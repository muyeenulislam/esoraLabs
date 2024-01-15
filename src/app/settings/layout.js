import React from "react";

import Sidebar from "@/Components/Layout/Sidebar";
import Content from "@/Components/Layout/Content";

const Layout = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
