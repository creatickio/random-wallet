"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserWithdraw() {
  const [balance, setBalance] = useState();
  const [userBtcAddress, setUserBtcAddress] = useState();
  const [network, setNetwork] = useState("btc");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isWithdrawEnabled, setWithdrawEnabled] = useState();
  let [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  console.log("Is Withdraw Enabled:", isWithdrawEnabled);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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

      const user = data[0];
      setBalance(user.balance);
      setWithdrawEnabled(user.withdrawEnabled);
      setUserBtcAddress(user.btcAddress);
    }
    getData();
  }, []);

  async function pasteFromClipboard(e) {
    navigator.clipboard
      .readText()
      .then((text) => {
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

  //   Create withdraw
  async function createWithdraw(event) {
    event.preventDefault();
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: user } = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.user.id);

    const updates = {
      profile: session.user.id,
      withdraw_address: userBtcAddress,
      amount: withdrawAmount,
    };

    const newBalance = {
      id: session.user.id,
      balance: balance - withdrawAmount,
    };

    const { error } = await supabase.from("withdraw").upsert(updates);

    if (error) {
      toast.error("Withdraw was unsuccessfull. Please try again!", {
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
      // remove the withdraw amount from balance
      const { error } = await supabase.from("profile").upsert(newBalance);
      // close the modal
      closeModal();
      toast.success("Withdraw initiated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.refresh();
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", session.user.id);

      const user = data[0];
      setBalance(user.balance);
    }
  }

  useEffect(() => {
    if (
      withdrawAmount < 0.1 ||
      withdrawAmount > balance ||
      withdrawAmount === ""
    ) {
      setAmountError(`Please write an amount between 0,1 and ${balance} BTC`);
    } else {
      setAmountError("");
    }
  }, [withdrawAmount, balance]);

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
            disabled={!isWithdrawEnabled}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />{" "}
          <button
            onClick={() => setWithdrawAmount(balance)}
            disabled={!isWithdrawEnabled}
            className="bg-lightlightGray duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px] disabled:bg-lightlightGray disabled:cursor-not-allowed"
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
        {/* Amount error */}
        {isWithdrawEnabled
          ? amountError && <p className="text-red-600">{amountError}</p>
          : ""}
      </div>
      {/* proceed withdraw */}
      {isWithdrawEnabled ? (
        <button
          disabled={amountError}
          onClick={openModal}
          className="text-darkBlack bg-primary font-medium text-xl rounded-full p-6 flex items-center justify-center gap-4 duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed "
        >
          Proceed withdraw
          <Image
            src="/assets/icons/arrow-right.svg"
            height={16}
            width={16}
            alt="Arrow Right"
          />
        </button>
      ) : (
        <div className="p-6 rounded-2xl bg-red-300">
          You are not allowed to withdraw just yet. Please contact our support
          to enable the withdraw
        </div>
      )}

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

      {/* Withdraw Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center bg-lightlightGray p-4 rounded-2xl">
                    <p className="text-2xl">Confirm withdraw</p>{" "}
                    <div
                      className="w-8 h-8 rounded-[10px] bg-darkBlack flex items-center justify-center cursor-pointer"
                      onClick={closeModal}
                    >
                      <Image
                        src="/assets/icons/xmark-white.svg"
                        height={32}
                        width={32}
                        alt="close"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-8 mt-8">
                    <div className="flex flex-col gap-[10px]">
                      <p className="text-xl font-bold text-darkBlack">
                        Please enter your account password
                      </p>
                      <input
                        className="w-full p-4 border border-border rounded-[4px]"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                    {/* Divider */}
                    <div className="w-full bg-gray h-px"></div>
                    {/* proceed withdraw */}
                    <button
                      onClick={createWithdraw}
                      className="text-darkBlack bg-primary font-medium text-xl rounded-full p-6 flex items-center justify-center gap-4 duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed "
                    >
                      Proceed withdraw
                      <Image
                        src="/assets/icons/arrow-right.svg"
                        height={16}
                        width={16}
                        alt="Arrow Right"
                      />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
