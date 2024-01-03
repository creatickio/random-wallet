import AdminNav from "@/components/admin/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format, set } from "date-fns";

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
                </tr>
              </thead>
              <tbody>
                {trades
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
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
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
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
      </div>
    </div>
  );
}
