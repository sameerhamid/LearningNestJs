import { getSession } from "@/lib/session";
import { Role } from "@/lib/type";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await getSession();
  if (!session || !session.user) redirect("/auth/signin");
  if (session.user.role !== Role.ADMIN) redirect("/auth/signin");
  console.log("session>>>", session);
  return <div></div>;
};

export default DashboardPage;
