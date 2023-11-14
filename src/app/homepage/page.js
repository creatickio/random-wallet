import React from "react";
import Nav from "@/components/nav/page";
import Link from "next/link";
import { supabase } from "../supabaseClient";
import Image from "next/image";
import Nossr from "@/components/crypto/nossr";
import Ticker from "@/components/crypto/ticker";
import { whychooseusData } from "@/data/whychooseusData";

export default async function Homepage() {
  let { data: settings, error } = await supabase.from("settings").select("*");

  console.log(settings);
  return (
    <div className="flex flex-col gap-2 p-2">
      <Nav />
      {/* Hero section */}
      <div
        className="w-full bg-gray rounded-lg border border-border text-center py-32 relative overflow-hidden"
        style={{ backgroundImage: `url('/assets/dotted-svg.svg')` }}
      >
        <div className="max-w-screen-lg mx-auto z-50">
          <p className="text-[#3C4049] font-light text-base mb-2">
            55,000+ Active Users
          </p>
          <h1 className="text-darkBlack font-medium text-7xl leading-tight tracking-tighter">
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
              className="bg-yellow flex gap-4 rounded-full px-8 py-4 w-fit hover:bg-primary transition duration-300"
            >
              Register now{" "}
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron-right"
                width={10}
                height={16}
              />
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
      <div className="py-[150px] flex flex-col gap-16 items-center justify-center text-center rounded-lg border border-border">
        {/* head */}
        <div className="max-w-4xl">
          <h2 className="text-darkBlack font-medium text-[64px] leading-tight tracking-tight">
            Discover{" "}
            <span className="bg-yellow py-2 px-3 rounded-md">real-time</span>{" "}
            crypto data
          </h2>
          <p className="text-2xl font-light leading-tight text-text mt-6">
            Empower your crypto journey with real-time cryptocurrency data: Gain
            a competitive edge and stay ahead of market trends
          </p>
        </div>

        {/* List of cryptos */}
        <div className="w-full px-28">
          <Nossr>
            <Ticker />
          </Nossr>
        </div>
      </div>

      {/* About us */}
      <div className="border border-border rounded-lg pb-[150px]">
        {/* top */}
        <div
          className="flex flex-col justify-between items-center pt-[150px] pb-[210px] bg-gray px-[100px] relative"
          style={{ backgroundImage: `url('/assets/dotted-svg.svg')` }}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 w-6/12">
              <p className="text-base text-text font-light">Our Story</p>
              <h2 className="text-darkBlack font-medium text-[64px] leading-tight tracking-tight">
                Crafting
                <span className="bg-yellow py-2 px-3 mx-2 rounded-md">
                  excellence
                </span>
                in cryptocurrency services
              </h2>
            </div>
            <div className="flex flex-col gap-6 w-6/12 text-2xl font-light text-text">
              <p>
                Discover the heart and soul of Random-Wallet: How our passion
                for cryptocurrency drove us to create a platform for your
                financial success
              </p>
            </div>
          </div>
          <div className="h-auto px-[100px] w-full absolute -bottom-52">
            <Image
              src="/assets/btc-image.png"
              alt="btc-image"
              height={388}
              width={1000}
              layout="responsive"
            />
          </div>
        </div>

        {/* bottom */}
        <div className="flex justify-between mt-72 px-[100px]">
          <div className="flex flex-col gap-2 w-6/12">
            <p className="text-base text-text font-light">Who we are</p>
            <h2 className="text-darkBlack font-medium text-[64px] leading-tight tracking-tight">
              About
              <span className="bg-yellow py-2 px-3 ml-2 rounded-md">us</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6 w-6/12 text-2xl font-light text-text">
            <p>
              At Random-Wallet, we are more than just a cryptocurrency platform;
              we are a passionate community of blockchain enthusiasts dedicated
              to your financial success. Our journey began with a simple yet
              profound belief - that cryptocurrency has the potential to reshape
              the financial landscape and provide opportunities for all. This
              belief, coupled with our collective experience and expertise in
              the crypto industry, became the driving force behind
              Random-Wallet.
            </p>
            <p>
              We understand that the world of cryptocurrency can be both
              exciting and intimidating, which is why we are committed to making
              it accessible and secure for everyone. Our platform is built on
              cutting-edge technology, ensuring seamless and secure trading
              experiences. We prioritize user-centric design, putting our users
              first in everything we do. Whether you&apos;re a seasoned trader
              or just starting, we provide the tools and resources you need to
              thrive in the crypto market.
            </p>
            <p>
              Transparency and security are at the core of our values.
              Random-Wallet is more than just a platform; it&apos;s a promise of
              trust. Your security is our top priority, and our dedicated
              support team is available 24/7 to assist you in your crypto
              journey. Join us in the exciting world of digital assets, and let
              us help you unlock your financial potential. Together, we can
              explore the possibilities and opportunities that cryptocurrency
              offers, while ensuring your investments are in safe hands. Welcome
              to Random-Wallet - where your financial success begins.
            </p>
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <div className="py-[150px] flex flex-col gap-16 items-center justify-center text-center rounded-lg border border-border">
        {/* head */}
        <div className="flex flex-col gap-2">
          <p className="text-base text-text font-light">
            Experience the Random-Wallet Advantage
          </p>
          <h2 className="text-darkBlack font-medium text-[64px] leading-tight tracking-tight">
            Why
            <span className="bg-yellow py-2 px-3 mx-3 rounded-md">
              choose us?
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 px-24 gap-6">
          {whychooseusData.map((item, i) => (
            <div
              className="p-10 rounded-2xl shadow-sm border border-border text-center flex flex-col items-center gap-3"
              key={i}
            >
              <div className="w-14 h-14 rounded-full bg-lightlightGray flex items-center justify-center mb-5">
                <Image
                  src={item.icon}
                  height={24}
                  width={24}
                  alt={item.title}
                />
              </div>
              <h3 className="font-medium text-[32px] text-darkBlack tracking-tight">
                {item.title}
              </h3>
              <p className="text-text text-xl font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
