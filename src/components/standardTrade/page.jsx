"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StandardTradeComp() {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState();

  const supabase = createClientComponentClient();

  // fetch user's balance
  useEffect(() => {
    async function fetchData() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { data: user } = await supabase
        .from("profile")
        .select("*")
        .eq("id", session.user.id)
        .single();
      setBalance(user.balance);
    }
    fetchData();
  }, [supabase]);

  //   Create Standard Trade
  async function createStandardTrade(event) {
    event.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data: user } = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.user.id);
    setBalance(user.balance);

    const updates = {
      profile: session.user.id,
      trade_status: "open",
      trade_option: "standard",
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
      toast.success("Standard Trade started successfully!", {
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
              max={balance}
              step={0.1}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />{" "}
            <button
              onClick={() => setAmount(balance)}
              className="bg-[#BBBBBB] duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px] disabled:bg-lightlightGray disabled:cursor-not-allowed"
            >
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
        <button
          className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-lightGray disabled:cursor-not-allowed"
          type="submit"
          onClick={createStandardTrade}
          disabled={amount === 0}
        >
          Start the trade
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StandardTradeComp;
