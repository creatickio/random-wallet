"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeverageTradeComp() {
  const [amount, setAmount] = useState(0);
  const [network, setNetwork] = useState("x2");

  //   Create Leverage Trade
  async function createLeverageTrade(event) {
    event.preventDefault();
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const updates = {
      profile: session.user.id,
      trade_status: "open",
      trade_option: "leverage",
      leverage_options: network,
      amount: amount,
    };

    const { error } = await supabase.from("trade").insert(updates);

    if (error) {
      toast.error(`${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Leverage Trade started successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div className="w-full h-fit">
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
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
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
          <div className="grid grid-cols-3 gap-1 w-full rounded-[4px] border border-border p-1">
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
          className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-lightGray disabled:cursor-not-allowed"
          type="submit"
          onClick={createLeverageTrade}
          disabled={amount === 0}
        >
          Start the trade
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LeverageTradeComp;
