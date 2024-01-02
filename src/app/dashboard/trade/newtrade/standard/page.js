import DashboardNav from "@/components/dashboard/nav/page";
import StandardTradeComp from "@/components/standardTrade/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function StandardTrade() {
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
  const user = data[0];
  return (
    <div className="flex flex-col gap-2 p-2">
      <DashboardNav firstName={user.first_name} lastName={user.last_name} />
      <div className="px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center py-8">
          <Link
            href="/dashboard/trade/newtrade/standard"
            className="bg-primary flex flex-col gap-0 p-8 rounded-2xl w-full text-center md:text-left md:w-fit cursor-pointer duration-300 transition-all"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-3xl lg:text-4xl">
              Standard Trade
            </h2>
            <p className="font-light text-text text-base lg:text-xl">
              Get started to the trading world
            </p>
          </Link>
          <Link
            href="/dashboard/trade/newtrade/ai"
            className="bg-lightlightGray flex flex-col gap-0 p-8 rounded-2xl w-full text-center md:text-left md:w-fit cursor-pointer duration-300 transition-all hover:bg-lightGray"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-3xl lg:text-4xl">
              AI Trade
            </h2>
            <p className="font-light text-text text-base lg:text-xl">
              Let the Artificial Intelligence do your trades
            </p>
          </Link>
          <Link
            href="/dashboard/trade/newtrade/leverage"
            className="bg-lightlightGray flex flex-col gap-0 p-8 rounded-2xl w-full text-center md:text-left md:w-fit cursor-pointer duration-300 transition-all hover:bg-lightGray"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-3xl lg:text-4xl">
              Leverage Trade
            </h2>
            <p className="font-light text-text text-base lg:text-xl">
              Maximum earnings using this option
            </p>
          </Link>
        </div>
        {/* Content */}
        <div className="max-w-[1172px] mx-auto flex flex-col gap-16">
          <h2 className="text-[32px] text-center md:text-left md:text-[64px] font-medium tracking-tighter text-darkBlack">
            Start a new{" "}
            <span className="font-bold border-b-4 border-primary">
              Standard
            </span>{" "}
            trade
          </h2>
          <div className="flex flex-col md:flex-row justify-between gap-11">
            {/* Trade Form */}
            <StandardTradeComp />
            {/* Right */}
            {/* tips row */}
            <div className="flex flex-col gap-2 w-full md:w-4/12 shrink-0">
              <p className="text-lg">Tips:</p>
              <ul className="bg-[#F4F4F4] p-8 flex flex-col gap-8 rounded-2xl text-lg">
                <li className="flex gap-[10px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
                  If you have deposited please pay attention to the text message
                  site letters and emails we send to you.
                </li>
                <li className="flex gap-[10px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
                  Coins will be deposited after 1 network confirmation.
                </li>
                <li className="flex gap-[10px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
                  Until 2 confirmations are made an equivalent amount of your
                  assets will be temporarily unavailable for withdraw.
                </li>
                <li className="flex gap-[10px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
                  <span>
                    You could check the blockchain records and deposit status at{" "}
                    <span className="font-bold">Deposit Records.</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
