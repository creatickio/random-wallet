import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ConvertedPrice from "@/components/convertedPrice/page";
import { parseISO, format } from "date-fns";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("profile").select();
  const { data: deposits } = await supabase.from("deposits").select();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(deposits);
  if (!session) {
    redirect("/signin");
  }

  const user = data[0];
  const btcBalance = user.balance;
  const selectedCurrency = user.currency;

  const cryptoFetch = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency}`
  );
  const cryptoData = await cryptoFetch.json();
  const btcPrice = cryptoData.bitcoin;

  ("use server");
  function getCovertedPrice() {
    if (selectedCurrency === "EUR") {
      return (
        <div className="flex gap-2">
          <span>€</span>
          <span>{(btcBalance * btcPrice.eur).toLocaleString()}</span>
        </div>
      );
    } else if (selectedCurrency === "CHF") {
      return (
        <div className="flex gap-2">
          <span>₣</span>
          <span>{(btcBalance * btcPrice.chf).toLocaleString()}</span>
        </div>
      );
    } else if (selectedCurrency === "GBP") {
      return (
        <div className="flex gap-2">
          <span>£</span>
          <span>{(btcBalance * btcPrice.gbp).toLocaleString()}</span>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2">
          <span>$</span>
          <span>{(btcBalance * btcPrice.usd).toLocaleString()}</span>
        </div>
      );
    }
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <DashboardNav firstName={user.first_name} lastName={user.last_name} />
      {/* header */}
      <div className="px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* left side */}
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-fit">
          {/* Welcome message */}
          <div className="rounded-2xl p-8 flex flex-col gap-2 w-full lg:w-fit bg-lightlightGray border border-border">
            <p className="text-xl text-text font-light">Welcome</p>
            <p className="text-darkBlack text-4xl font-medium tracking-tighter">
              <span>
                {user.first_name} {user.last_name}
              </span>
            </p>
          </div>
          {/* Balance in ${currency} */}
          <div className="rounded-2xl p-8 flex flex-col gap-2 bg-lightlightGray border border-border w-full lg:w-fit">
            <p className="text-xl text-text font-light">
              Balance in {selectedCurrency}:
            </p>
            <div className="text-darkBlack text-4xl font-medium tracking-tighter">
              {cryptoData.bitcoin && getCovertedPrice()}
              {/* TODO: Convert the price component */}
              {/* <ConvertedPrice /> */}
            </div>
          </div>
          {/* Balance in BTC */}
          <div className="rounded-2xl p-8 flex flex-col gap-2 bg-lightlightGray border border-border w-full lg:w-fit">
            <p className="text-xl text-text font-light">Balance in BTC:</p>
            <p className="text-darkBlack text-4xl font-medium tracking-tighter">
              {user.balance} BTC
            </p>
          </div>
        </div>
        {/* right side */}
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-fit">
          <Link
            href="/dashboard/deposit"
            className="flex gap-4 items-center bg-primary rounded-full py-6 justify-center px-8 w-full lg:w-fit text-darkBlack font-medium text-xl duration-300 transition-all hover:bg-yellow"
          >
            Deposit{" "}
            <Image
              src="/assets/icons/plus-dark.svg"
              height={16}
              width={16}
              alt="Deposit"
            />
          </Link>
          <Link
            href="/dashboard/withdraw"
            className="flex gap-4 items-center bg-transparent border w-full lg:w-fit justify-center border-darkBlack rounded-full py-6 px-8 text-darkBlack font-medium text-xl duration-300 transition-all hover:bg-darkBlack/20 hover:text-darkBlack hover:border-darkBlack/0"
          >
            Withdraw
            <Image
              src="/assets/icons/minus-dark.svg"
              height={16}
              width={16}
              alt="Withdraw"
            />
          </Link>
          <Link
            href="/dashboard/trade"
            className="flex gap-4 items-center bg-darkBlack w-full lg:w-fit justify-center rounded-full py-6 px-8 text-white font-medium text-xl duration-300 transition-all hover:opacity-70"
          >
            New trade
            <Image
              src="/assets/icons/plus-light.svg"
              height={16}
              width={16}
              alt="Trade"
            />
          </Link>
        </div>
      </div>
      {/* tables */}
      <div className="px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
        {/* deposit table */}
        <div className="flex flex-col gap-[10px] col-span-2 lg:col-span-1">
          <h3 className="font-medium tracking-tighter text-4xl">Deposits</h3>
          <table className="table-auto w-full rounded-lg border border-border">
            <thead className="text-left">
              <tr className="bg-lightlightGray">
                <th className="p-4 font-medium text-xl">Amount inserted</th>
                <th className="hidden md:table-cell font-medium text-xl">
                  Date
                </th>
                <th className="font-medium text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.id} className="border-b border-border">
                  <td className="p-4 text-lg">BTC {deposit.amount}</td>
                  <td className="hidden md:table-cell text-lg">
                    {format(parseISO(deposit.created_date), "d LLLL, yyyy")}
                  </td>
                  <td>
                    <span
                      className={`text-lg flex w-fit gap-1.5
                      ${
                        deposit.status === "pending"
                          ? "bg-[#E7E9E5] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      } ${
                        deposit.status === "completed"
                          ? "bg-[#D3FFCE] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      } ${
                        deposit.status === "declined"
                          ? "bg-[#FFCED3] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      }`}
                    >
                      {deposit.status === "completed" ? (
                        <Image
                          src="/assets/icons/check.svg"
                          height={20}
                          width={20}
                          alt="Completed"
                        />
                      ) : deposit.status === "pending" ? (
                        <Image
                          src="/assets/icons/pending.svg"
                          height={20}
                          width={20}
                          alt="Pending"
                        />
                      ) : (
                        <Image
                          src="/assets/icons/xmark.svg"
                          height={20}
                          width={20}
                          alt="Declined"
                        />
                      )}
                      {deposit.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* withdraw table */}
        <div className="flex flex-col gap-[10px] col-span-2 lg:col-span-1">
          <h3 className="font-medium tracking-tighter text-4xl">Withdraw</h3>
          <table className="table-auto w-full rounded-lg border border-border">
            <thead className="text-left">
              <tr className="bg-lightlightGray">
                <th className="p-4 font-medium text-xl">Amount inserted</th>
                <th className="hidden md:table-cell font-medium text-xl">
                  Date
                </th>
                <th className="font-medium text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Active</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Active</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Active</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* trade table */}
        <div className="flex flex-col gap-[10px] col-span-2">
          <h3 className="font-medium tracking-tighter text-4xl">Trades</h3>
          <table className="table-auto w-full rounded-lg border border-border">
            <thead className="text-left">
              <tr className="bg-lightlightGray">
                <th className="p-4 font-medium text-xl">Amount inserted</th>
                <th className="hidden md:table-cell font-medium text-xl">
                  Date
                </th>
                <th className="font-medium text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Active</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Active</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Active</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:table-cell text-lg">
                  03 December, 2023
                </td>
                <td className="text-lg">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
