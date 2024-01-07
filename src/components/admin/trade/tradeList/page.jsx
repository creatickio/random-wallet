"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { parseISO, format } from "date-fns";
import ModifyAITrade from "../modifyAITrade/page";
import ModifyLeverageTrade from "../modifyLeverageTrade/page";
import ModifyStandardTrade from "../modifyStandardTrade/page";

function TradeList() {
  const [trades, setTrades] = useState([]);
  const [users, setUsers] = useState([]);
  const supabase = createClientComponentClient();
  let [isOpen, setIsOpen] = useState(false);

  //   Current trade selected
  const [selectedTradeID, setSelectedTradeID] = useState();
  const [selectedTradeOption, setSelectedTradeOption] = useState();
  const [selectedUserTradeID, setSelectedUserTradeID] = useState();

  useEffect(() => {
    async function fetchTrades() {
      const { data: trades } = await supabase.from("trade").select("*");
      const { data: users } = await supabase.from("profile").select("*");

      setTrades(trades);
      setUsers(users);
    }
    fetchTrades();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      {/* active trades */}
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* header */}
        <div className="flex flex-col gap-2 py-8">
          <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
            Active trades
          </h2>
          <p className="font-light text-xl text-text">
            See and manage all trades in one place.
          </p>
        </div>
        {/* active trades table */}
        {trades.length > 0 ? (
          <table className="table-auto w-full rounded-lg border border-border">
            <thead className="text-left">
              <tr className="bg-lightlightGray">
                <th className="p-4 font-medium text-xl">First name</th>
                <th className="font-medium text-xl">Last name</th>
                <th className="font-medium text-xl">Email</th>
                <th className="font-medium text-xl">Amount inserted</th>
                <th className="font-medium text-xl">Date</th>
                <th className="font-medium text-xl">Trade option</th>
                <th className="font-medium text-xl">Status</th>
                <th className="font-medium text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {trades
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .filter((trade) => trade.trade_status === "open")
                .map((trade) => (
                  <tr key={trade.id} className="border-b border-border">
                    <td className="p-4 text-lg">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === trade.profile ? user.first_name : ""}
                          </p>
                        ))}
                      </Link>
                    </td>
                    <td className="text-lg">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === trade.profile ? user.last_name : ""}
                          </p>
                        ))}
                      </Link>
                    </td>
                    <td className="text-lg">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === trade.profile ? user.email : ""}
                          </p>
                        ))}
                      </Link>
                    </td>
                    <td className="text-lg">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        BTC {trade.amount}
                      </Link>
                    </td>
                    <td className="text-lg capitalize">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {format(parseISO(trade.created_at), "d LLLL, yyyy")}
                      </Link>
                    </td>
                    <td className="text-lg capitalize">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {" "}
                        {trade.trade_option === "ai" ? (
                          <span className="uppercase">
                            {trade.trade_option}
                          </span>
                        ) : (
                          trade.trade_option
                        )}
                      </Link>
                    </td>
                    <td className="w-[120px]">
                      <Link href={`/dashboard/trade/${trade.id}`}>
                        <span
                          className={`text-lg flex w-fit gap-1.5
                      ${
                        trade.trade_status === "close"
                          ? "bg-[#E7E9E5] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      } ${
                            trade.trade_status === "open"
                              ? "bg-[#D3FFCE] px-4 py-1 rounded-lg text-darkBlack capitalize"
                              : ""
                          }`}
                        >
                          {trade.trade_status === "open" ? (
                            <Image
                              src="/assets/icons/check.svg"
                              height={20}
                              width={20}
                              alt="Completed"
                            />
                          ) : trade.trade_status === "close" ? (
                            <Image
                              src="/assets/icons/pending.svg"
                              height={20}
                              width={20}
                              alt="Pending"
                            />
                          ) : (
                            ""
                          )}
                          {trade.trade_status}
                        </span>
                      </Link>
                    </td>
                    <td>
                      <button
                        onMouseEnter={() => {
                          setSelectedTradeID(trade.id);
                          setSelectedTradeOption(trade.trade_option);
                          setSelectedUserTradeID(trade.profile);
                        }}
                        onClick={openModal}
                        className=" bg-[#D8D8D8] p-2 rounded-lg flex gap-1 items-center justify-center"
                      >
                        <Image
                          src="/assets/icons/pen-to-square.svg"
                          height={25}
                          width={25}
                          alt="Modify"
                        />
                        Modify
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 border border-border text-xl text-center rounded-lg">
            There&apos;s no trades made yet
          </div>
        )}
      </div>
      {/* closed trades */}
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* header */}
        <div className="flex flex-col gap-2 py-8">
          <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
            Completed trades
          </h2>
          <p className="font-light text-xl text-text">
            See and manage all trades in one place.
          </p>
        </div>
        {/* active trades table */}
        {trades.length > 0 ? (
          <table className="table-auto w-full rounded-lg border border-border">
            <thead className="text-left">
              <tr className="bg-lightlightGray">
                <th className="p-4 font-medium text-xl">First name</th>
                <th className="font-medium text-xl">Last name</th>
                <th className="font-medium text-xl">Email</th>
                <th className="font-medium text-xl">Amount inserted</th>
                <th className="font-medium text-xl">Date</th>
                <th className="font-medium text-xl">Trade option</th>
                <th className="font-medium text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {trades
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .filter((trade) => trade.trade_status === "close")
                .map((trade) => (
                  <tr key={trade.id} className="border-b border-border">
                    <td className="p-4 text-lg">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === trade.profile ? user.first_name : ""}
                          </p>
                        ))}
                      </Link>
                    </td>
                    <td className="text-lg">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === trade.profile ? user.last_name : ""}
                          </p>
                        ))}
                      </Link>
                    </td>
                    <td className="text-lg">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === trade.profile ? user.email : ""}
                          </p>
                        ))}
                      </Link>
                    </td>
                    <td className="text-lg">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        BTC {trade.amount}
                      </Link>
                    </td>
                    <td className="hidden md:table-cell text-lg capitalize">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {format(parseISO(trade.created_at), "d LLLL, yyyy")}
                      </Link>
                    </td>
                    <td className="text-lg capitalize">
                      <Link
                        href={`/dashboard/trade/${trade.id}`}
                        className="block"
                      >
                        {" "}
                        {trade.trade_option === "ai" ? (
                          <span className="uppercase">
                            {trade.trade_option}
                          </span>
                        ) : (
                          trade.trade_option
                        )}
                      </Link>
                    </td>
                    <td className="w-[120px]">
                      <Link href={`/dashboard/trade/${trade.id}`}>
                        <span
                          className={`text-lg flex w-fit gap-1.5
                      ${
                        trade.trade_status === "close"
                          ? "bg-[#E7E9E5] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      } ${
                            trade.trade_status === "open"
                              ? "bg-[#D3FFCE] px-4 py-1 rounded-lg text-darkBlack capitalize"
                              : ""
                          }`}
                        >
                          {trade.trade_status === "open" ? (
                            <Image
                              src="/assets/icons/check.svg"
                              height={20}
                              width={20}
                              alt="Completed"
                            />
                          ) : trade.trade_status === "close" ? (
                            <Image
                              src="/assets/icons/pending.svg"
                              height={20}
                              width={20}
                              alt="Pending"
                            />
                          ) : (
                            ""
                          )}
                          {trade.trade_status}
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 border border-border text-xl text-center rounded-lg">
            There&apos;s no trades made yet
          </div>
        )}
      </div>

      {/* Modify Trade Modal */}
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
                <Dialog.Panel className="w-full max-w-[821px] flex flex-col gap-8 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center bg-lightlightGray p-4 rounded-2xl">
                    <p className="text-2xl">Trade view</p>
                    <div
                      onClick={closeModal}
                      className="w-8 h-8 rounded-[10px] bg-darkBlack flex items-center justify-center cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/xmark-white.svg"
                        height={32}
                        width={32}
                        alt="close"
                      />
                    </div>
                  </div>
                  {selectedTradeOption === "leverage" ? (
                    <ModifyLeverageTrade
                      selectedTradeID={selectedTradeID}
                      selectedUserTradeID={selectedUserTradeID}
                    />
                  ) : selectedTradeOption === "ai" ? (
                    <ModifyAITrade
                      selectedTradeID={selectedTradeID}
                      selectedUserTradeID={selectedUserTradeID}
                    />
                  ) : (
                    <ModifyStandardTrade
                      selectedTradeID={selectedTradeID}
                      selectedUserTradeID={selectedUserTradeID}
                    />
                  )}

                  {/* Divider */}
                  <div className="w-full bg-gray h-px"></div>
                  {/* proceed withdraw */}
                  <button
                    onClick={closeModal}
                    className="text-white bg-darkBlack font-medium text-xl rounded-full p-4 w-full flex items-center justify-center gap-4 duration-300 transition-all hover:bg-darkGray disabled:bg-darkBlack/20 disabled:cursor-not-allowed "
                  >
                    Cancel trade modification
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default TradeList;
