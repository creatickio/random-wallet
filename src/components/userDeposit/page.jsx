"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDeposit() {
  const [balance, setBalance] = useState();
  const [companyBtcAddress, setCompanyBtcAddress] = useState();
  const [network, setNetwork] = useState("btc");
  const [defaultBtc, setDefaultBtc] = useState(null);
  const [userQRCode, setUserQRCode] = useState("/assets/image-placeholder.png");
  const [adminQRCode, setAdminQRCode] = useState(
    "/assets/image-placeholder.png"
  );

  const currentBtc = useRef();

  console.log("User QR Code: ", userQRCode);
  console.log("Admin QR Code: ", adminQRCode);

  function copyToClipboard() {
    navigator.clipboard.writeText(currentBtc.current.value);
    toast.success("BTC Address copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log("BTC copied");
  }

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
      const { data: defaultBTC } = await supabase.from("settings").select("*");

      setDefaultBtc(defaultBTC[0].default_btc_address);

      const user = data[0];
      setBalance(user.balance);
      setUserQRCode(user.qr_code_url);
      setAdminQRCode(defaultBTC[0].qr_code_url);
      setCompanyBtcAddress(user.company_btc_address);
    }
    getData();
  }, []);

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
      {/* btc address row */}
      <div className="flex flex-col gap-2">
        <p className="text-lg">BTC Address:</p>
        <div className="flex gap-[10px]">
          <input
            className="w-full p-4 border border-border rounded-[4px]"
            type="text"
            value={!companyBtcAddress ? defaultBtc : companyBtcAddress}
            ref={currentBtc}
          />{" "}
          <button
            onClick={(e) => {
              copyToClipboard();
            }}
            className="bg-lightlightGray duration-300 transition-all rounded-[4px] font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px]"
          >
            Copy{" "}
            <Image
              src="/assets/icons/copy.svg"
              height={16}
              width={16}
              alt="Copy Icon"
            />
          </button>
        </div>
        <div className="flex flex-col items-center md:flex-row gap-8 mt-8">
          {userQRCode || adminQRCode ? (
            <div className="w-full flex items-center justify-center lg:w-[400px]">
              {userQRCode ? (
                <Image
                  src={userQRCode}
                  height={260}
                  width={260}
                  loading="lazy"
                  alt="Bitcoin address qr code"
                />
              ) : (
                <Image
                  src={adminQRCode}
                  height={260}
                  width={260}
                  loading="lazy"
                  alt="Bitcoin address qr code"
                />
              )}
            </div>
          ) : (
            ""
          )}

          <div className="bg-[#F4F4F4] flex flex-col gap-8 items-left justify-center p-8 rounded-2xl">
            <div className="w-[50px] h-[50px] bg-darkBlack/20 rounded-full flex items-center justify-center">
              <Image
                src="/assets/icons/info.svg"
                height={16}
                width={6}
                alt="Information"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-2xl">
                Send only BTC to this address!
              </h3>
              <p className="text-lg">
                Sending coin or token other than BTC to this Address may result
                in the loss of your deposit.
              </p>
            </div>
          </div>
        </div>
      </div>
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
  );
}

export default UserDeposit;
