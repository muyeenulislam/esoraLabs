"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { TeamData } from "@/utils/mockdata/teamdata";

const ProfileDetails = () => {
  const pathname = usePathname();
  const [data, setData] = useState({});

  useEffect(() => {
    const name = pathname?.split("/")[2].replace("%20", " ");
    const memberData = TeamData.filter((item) => item.name === name);

    setData(memberData[0]);
  }, []);

  return <div>ProfileDetails</div>;
};

export default ProfileDetails;
