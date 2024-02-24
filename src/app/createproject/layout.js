import React from "react";
import Image from "next/image";

import Container from "@/components/createprojectlayout/container";

const Layout = ({ children }) => {
  return (
    <div className="flex h-[100vh] relative">
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
