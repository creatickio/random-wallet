"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserWithdraw() {
  const [balance, setBalance] = useState();
  const [userBtcAddress, setUserBtcAddress] = useState();
  const [network, setNetwork] = useState("btc");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    async function getData() {
      const supabase = createClientComponentClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", session.user.id);

      const user = data[0];
      setBalance(user.balance);
      setUserBtcAddress(user.btcAddress);
    }
    getData();
  }, []);

  async function pasteFromClipboard(e) {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log("Clipboard content: ", text);
        setUserBtcAddress(text);
        toast.success("BTC Address pasted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
        toast.error(`Failed to read clipboard contents: ${err}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }

  return (
    <div className="px-4 py-8 md:p-8 flex flex-col gap-6 border border-border rounded-lg text-darkBlack">
      <ToastContainer />
      {/* coin row */}
      <div className="flex flex-col gap-2">
        <p className="text-lg">Coin:</p>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex text-white font-semibold items-center px-6 py-3 bg-darkBlack rounded gap-[10px]">
              <Image
                src="/assets/icons/btc.svg"
                height={32}
                width={32}
                alt="Bitcoin"
              />
              Bitcoin
            </div>
            <p className="text-xs">BTC</p>
          </div>
          <div className="font-semibold">
            <span>Total Balance:</span>
            <span>{balance} BTC</span>
          </div>
        </div>
      </div>
      {/* deposit row */}
      <div className="flex flex-col gap-2">
        <p className="text-lg">Deposit Network:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full rounded-[4px] border border-border p-1">
          <div
            onClick={() => setNetwork("btc")}
            className={
              network === "btc"
                ? "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                : "w-full text-center border border-border duration-300 transition-all rounded-[4px] py-3 font-semibold cursor-pointer"
            }
          >
            BTC
          </div>
          <div
            onClick={() => setNetwork("bep2")}
            className={
              network === "bep2"
                ? "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                : "w-full text-center border border-border duration-300 transition-all rounded-[4px] py-3 font-semibold cursor-pointer"
            }
          >
            BEP2
          </div>
          <div
            onClick={() => setNetwork("bep20")}
            className={
              network === "bep20"
                ? "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                : "w-full text-center border border-border duration-300 transition-all rounded-[4px] py-3 font-semibold cursor-pointer"
            }
          >
            BEP20 (BSC)
          </div>
          <div
            onClick={() => setNetwork("rrc20")}
            className={
              network === "rrc20"
                ? "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                : "w-full text-center border border-border duration-300 transition-all rounded-[4px] py-3 font-semibold cursor-pointer"
            }
          >
            RRC20
          </div>
        </div>
      </div>
      {/* withdraw address row */}
      <div className="flex flex-col gap-2">
        <p className="text-lg">Withdraw Address:</p>
        <div className="flex gap-[10px]">
          <input
            className="w-full p-4 border border-border rounded-[4px]"
            type="text"
            value={userBtcAddress}
            onChange={(e) => setUserBtcAddress(e.target.value)}
          />{" "}
          <button
            onClick={() => pasteFromClipboard()}
            className="bg-lightlightGray duration-300 transition-all justify-center items-center rounded-[4px] font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px]"
          >
            Paste
            <Image
              src="/assets/icons/paste.svg"
              height={16}
              width={16}
              alt="Paste Icon"
            />
          </button>
        </div>
      </div>
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
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />{" "}
          <button className="bg-lightlightGray duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px]">
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
      {/* proceed withdraw */}
      <button className="text-darkBlack bg-primary font-medium text-xl rounded-full p-6 flex items-center justify-center gap-4 duration-300 transition-all hover:bg-yellow">
        Proceed withdraw
        <Image
          src="/assets/icons/arrow-right.svg"
          height={16}
          width={16}
          alt="Arrow Right"
        />
      </button>
      {/* tips row */}
      <div className="flex flex-col gap-2">
        <p className="text-lg">Tips:</p>
        <ul className="bg-[#F4F4F4] p-8 flex flex-col gap-8 rounded-2xl text-lg">
          <li className="flex gap-[10px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
            If you have deposited please pay attention to the text message site
            letters and emails we send to you.
          </li>
          <li className="flex gap-[10px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
            Coins will be deposited after 1 network confirmation.
          </li>
          <li className="flex gap-[10px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
            Until 2 confirmations are made an equivalent amount of your assets
            will be temporarily unavailable for withdraw.
          </li>
        </ul>
      </div>
    </div>
  );
}
