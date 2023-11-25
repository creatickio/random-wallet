import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ConvertedPrice from "@/components/convertedPrice/page";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("profile").select();
  const {
    data: { session },
  } = await supabase.auth.getSession();

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
          <span>{cryptoData.bitcoin.eur.toLocaleString()}</span>
        </div>
      );
    } else if (selectedCurrency === "CHF") {
      return (
        <div className="flex gap-2">
          <span>₣</span>
          <span>{cryptoData.bitcoin.chf.toLocaleString()}</span>
        </div>
      );
    } else if (selectedCurrency === "GBP") {
      return (
        <div className="flex gap-2">
          <span>£</span>
          <span>{cryptoData.bitcoin.gbp.toLocaleString()}</span>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2">
          <span>$</span>
          <span>{cryptoData.bitcoin.usd.toLocaleString()}</span>
        </div>
      );
    }
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <DashboardNav firstName={user.first_name} lastName={user.last_name} />
      {/* header */}
      <div className="px-8 flex flex-row justify-between items-center">
        {/* left side */}
        <div className="flex gap-4">
          {/* Welcome message */}
          <div className="rounded-2xl p-8 flex flex-col gap-2 bg-lightlightGray border border-border w-fit">
            <p className="text-xl text-text font-light">Welcome</p>
            <p className="text-darkBlack text-4xl font-medium tracking-tighter">
              <span>
                {user.first_name} {user.last_name}
              </span>
            </p>
          </div>
          {/* Balance in ${currency} */}
          <div className="rounded-2xl p-8 flex flex-col gap-2 bg-lightlightGray border border-border w-fit">
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
          <div className="rounded-2xl p-8 flex flex-col gap-2 bg-lightlightGray border border-border w-fit">
            <p className="text-xl text-text font-light">Balance in BTC:</p>
            <p className="text-darkBlack text-4xl font-medium tracking-tighter">
              {user.balance} BTC
            </p>
          </div>
        </div>
        {/* right side */}
        <div className="flex gap-4">
          <Link
            href="/dashboard/deposit"
            className="flex gap-4 items-center bg-primary rounded-full py-6 px-8 text-darkBlack font-medium text-xl duration-300 transition-all hover:bg-yellow"
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
            className="flex gap-4 items-center bg-transparent border border-darkBlack rounded-full py-6 px-8 text-darkBlack font-medium text-xl duration-300 transition-all hover:bg-darkBlack/20 hover:text-darkBlack hover:border-darkBlack/0"
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
            className="flex gap-4 items-center bg-darkBlack rounded-full py-6 px-8 text-white font-medium text-xl duration-300 transition-all hover:opacity-70"
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
      <div className="px-8">
        <h1>
          Welcome to your dashboard, {data[0].first_name} {data[0].last_name}!
        </h1>
      </div>
    </div>
  );
}
