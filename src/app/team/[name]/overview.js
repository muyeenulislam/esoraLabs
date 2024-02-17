"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { TeamData } from "@/utils/mockdata/teamdata";

const ProfileDetailsOverview = ({ data }) => {
  return <div>{data?.name}</div>;
};

export default ProfileDetailsOverview;
