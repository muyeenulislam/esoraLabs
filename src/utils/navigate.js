"use server";

import { redirect } from "next/navigation";

export async function navigate(url) {
  redirect(url);
}
