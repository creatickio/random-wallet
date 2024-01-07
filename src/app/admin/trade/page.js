import AdminNav from "@/components/admin/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import TradeList from "@/components/admin/trade/tradeList/page";

export default async function TradeAdmin() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session.user.id);

  if (!session) {
    redirect("/signin");
  }

  const { data: trades } = await supabase.from("trade").select("*");
  const { data: users } = await supabase.from("profile").select("*");

  const user = data[0];
  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AdminNav />
        {/* head */}
        <div className="flex flex-col gap-2 p-8 rounded-2xl bg-lightlightGray">
          <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
            Trades
          </h2>
          <p className="font-light text-xl text-text">
            See and manage all trades in one place.
          </p>
        </div>
        {/* Trades List */}
        <TradeList />
      </div>
    </div>
  );
}
