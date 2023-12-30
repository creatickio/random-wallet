"use client";
import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function LeverageTrade() {
  const [network, setNetwork] = useState("x2");

  return (
    <div className="flex flex-col gap-2 p-2">
      <DashboardNav firstName="Argzon" lastName="Haziraj" />
      <div className="px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center py-8">
          <Link
            href="/dashboard/trade/newtrade/standard"
            className="bg-lightlightGray flex flex-col gap-0 p-8 rounded-2xl w-full text-center md:text-left md:w-fit cursor-pointer duration-300 transition-all hover:bg-lightGray"
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
            className="bg-primary flex flex-col gap-0 p-8 rounded-2xl w-full text-center md:text-left md:w-fit cursor-pointer duration-300 transition-all"
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
          <h2 className="text-[64px] font-medium tracking-tighter text-darkBlack">
            Start a new{" "}
            <span className="font-bold border-b-4 border-primary">
              Leverage
            </span>{" "}
            trade
          </h2>
          <div className="flex flex-row justify-between gap-11">
            {/* Trade Form */}
            <div className="bg-[#F4F4F4] w-full h-full rounded-2xl p-8 flex flex-col gap-8">
              {/* amount row */}
              <div className="flex flex-col gap-2">
                <p className="text-lg">Amount:</p>
                <div className="flex gap-[10px]">
                  <input
                    className="w-full p-4 border border-border rounded-[4px] appearance-none"
                    type="number"
                    min="0.1"
                    step={0.1}
                  />{" "}
                  <button className="bg-[#BBBBBB] duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px] disabled:bg-lightlightGray disabled:cursor-not-allowed">
                    MAX
                    <Image
                      src="/assets/icons/dollar-sign-yellow.svg"
                      height={16}
                      width={16}
                      alt="Dollar Icon"
                    />
                  </button>
                </div>
              </div>
              {/* amount to earn row */}
              <div className="flex flex-col gap-2">
                <p className="text-lg">Set the amount to earn:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 w-full rounded-[4px] border border-border p-1">
                  <div
                    onClick={() => setNetwork("x2")}
                    className={
                      network === "x2"
                        ? "w-full text-center border border-border duration-300 transition-all bg-white rounded-[4px] py-3 font-semibold cursor-pointer"
                        : "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                    }
                  >
                    x2
                  </div>
                  <div
                    onClick={() => setNetwork("x5")}
                    className={
                      network === "x5"
                        ? "w-full text-center border border-border duration-300 transition-all bg-white rounded-[4px] py-3 font-semibold cursor-pointer"
                        : "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                    }
                  >
                    x5
                  </div>
                  <div
                    onClick={() => setNetwork("x10")}
                    className={
                      network === "x10"
                        ? "w-full text-center border border-border duration-300 transition-all bg-white rounded-[4px] py-3 font-semibold cursor-pointer"
                        : "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                    }
                  >
                    x10
                  </div>
                </div>
              </div>
              <button
                className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow"
                type="submit"
              >
                Start the trade
              </button>
            </div>
            {/* Right */}
            {/* tips row */}
            <div className="flex flex-col gap-2 w-4/12 shrink-0">
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
