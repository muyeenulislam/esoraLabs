"use server";

import { redirect } from "next/navigation";

export async function navigate(url) {
  console.log(url);
  redirect(url);
}
