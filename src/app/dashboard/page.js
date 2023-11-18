import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("profile").select();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="p-2">
      <DashboardNav
        firstName={data[0].first_name}
        lastName={data[0].last_name}
      />
      <h1>
        Welcome to your dashboard, {data[0].first_name} {data[0].last_name}!
      </h1>
    </div>
  );
}
