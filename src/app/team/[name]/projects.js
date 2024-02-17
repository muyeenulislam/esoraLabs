"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const ProfileDetailsProjects = ({ data }) => {
  const pathname = usePathname();

  return <div>{data?.projectAssigned}</div>;
};

export default ProfileDetailsProjects;
