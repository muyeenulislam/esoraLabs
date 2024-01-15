import React from "react";

import Container from "@/Components/LoginLayout/Container";

const Layout = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
