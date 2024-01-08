import React from "react";
import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TradeViewComp from "@/components/tradeView/page";

export default async function TradeView() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }

  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session.user.id);

  const user = data[0];
  return (
    <div className="flex flex-col gap-2 p-2">
      <DashboardNav firstName={user.first_name} lastName={user.last_name} />
      <div className="px-4 md:px-8">
        {/* Content */}
        <TradeViewComp />
      </div>
    </div>
  );
}
