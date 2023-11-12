import React from "react";
import Nav from "@/components/nav/page";
import Link from "next/link";
import { supabase } from "../supabaseClient";
import Image from "next/image";

export default async function Homepage() {
  let { data: settings, error } = await supabase.from("settings").select("*");

  console.log(settings);
  return (
    <div className="p-2">
      <Nav />
      {/* Hero section */}
      <div
        className="w-full p-2 bg-gray rounded-lg text-center py-32 relative overflow-hidden"
        style={{ backgroundImage: `url('/assets/dotted-svg.svg')` }}
      >
        <div className="max-w-screen-lg mx-auto z-50">
          <p className="text-[#3C4049] font-light text-base mb-2">
            55,000+ Active Users
          </p>
          <h1 className="text-darkBlack font-medium text-7xl leading-tight">
            Create your own{" "}
            <span className="bg-yellow py-2 px-3 rounded-md">
              crypto wallet
            </span>{" "}
            and take control of your assets.
          </h1>
          <p className="text-2xl font-light leading-tight text-text mt-8">
            Unlock the world of crypto trading with Random-Wallet: Your trusted
            partner for secure, convenient, and proficient cryptocurrency
            investments
          </p>
          <div className="mt-8 flex gap-2 flex-col items-center">
            <Link
              href="/signup"
              className="bg-yellow rounded-full px-8 py-4 w-fit hover:bg-primary transition duration-300"
            >
              Register now
            </Link>
            <p className="text-[#585D69] font-light text-xs">
              Sign up process takes 2 minutes.
            </p>
          </div>
        </div>

        {/* Illustrations */}
        <div className="z-10">
          {/* Income and Expenses */}
          <Image
            src="/assets/illustrations/incomeandexpenses.svg"
            alt="Income and Expense"
            width={264}
            height={222}
            className="absolute top-[43px] left-2"
          />

          {/* Goals */}
          <Image
            src="/assets/illustrations/goals.svg"
            alt="Income and Expense"
            width={264}
            height={167}
            className="absolute bottom-[78px] -left-2"
          />

          {/* Total Revenue */}
          <Image
            src="/assets/illustrations/totalrevenue.svg"
            alt="Income and Expense"
            width={264}
            height={153}
            className="absolute top-[36px] -right-2"
          />

          {/* Balance */}
          <Image
            src="/assets/illustrations/balance.svg"
            alt="Income and Expense"
            width={264}
            height={223}
            className="absolute bottom-[51px] right-[33px]"
          />
        </div>
      </div>

      {/* Discover real-time crypto data */}
    </div>
  );
}
