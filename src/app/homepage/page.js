import React from "react";
import Nav from "@/components/nav/page";
import Link from "next/link";
import { supabase } from "../supabaseClient";
import Image from "next/image";
import Nossr from "@/components/crypto/nossr";
import Ticker from "@/components/crypto/ticker";
import FAQ from "@/components/faq/page";

// Import data
import { whychooseusData } from "@/data/whychooseusData";
import { faqData } from "@/data/faqData";
import { howitworksData } from "@/data/howitworksData";

export default async function Homepage() {
  let { data: settings, error } = await supabase.from("settings").select("*");

  console.log(settings[0]);
  return (
    <div className="flex flex-col gap-2 p-2 scroll-smooth">
      <Nav />
      {/* Hero section */}
      <div
        className="w-full bg-gray rounded-lg border border-border text-center px-8 py-16 md:py-44 lg:py-32 relative overflow-hidden"
        style={{ backgroundImage: `url('/assets/dotted-svg.svg')` }}
      >
        <div className="max-w-screen-lg mx-auto z-50 md:px-8 lg:px-0 relative">
          <p className="text-[#3C4049] font-light text-base mb-2">
            55,000+ Active Users
          </p>
          <h1 className="text-darkBlack font-medium text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            Create your own{" "}
            <span className="bg-yellow py-2 px-3 rounded-md">
              crypto wallet
            </span>{" "}
            and take control of your assets.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light leading-tight text-text mt-8">
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
        <div className="hidden md:block z-10">
          {/* Income and Expenses */}
          <Image
            src="/assets/illustrations/incomeandexpenses.svg"
            alt="Income and Expense"
            width={264}
            height={222}
            className="absolute md:-top-[96px] md:-left-[25px] lg:top-[43px] lg:left-2"
          />

          {/* Goals */}
          <Image
            src="/assets/illustrations/goals.svg"
            alt="Income and Expense"
            width={264}
            height={167}
            className="absolute md:bottom-[33px] md:-left-6 lg:bottom-[78px] lg:-left-2"
          />

          {/* Total Revenue */}
          <Image
            src="/assets/illustrations/totalrevenue.svg"
            alt="Income and Expense"
            width={264}
            height={153}
            className="absolute md:-top-[36px] md:-right-[194px] lg:top-[36px] lg:-right-2"
          />

          {/* Balance */}
          <Image
            src="/assets/illustrations/balance.svg"
            alt="Income and Expense"
            width={264}
            height={223}
            className="absolute md:bottom-[51px] md:-right-[106px] lg:bottom-[51px] lg:right-[33px]"
          />
        </div>
      </div>

      {/* Discover real-time crypto data */}
      <div className="py-16 md:py-[100px] lg:py-[150px] flex flex-col gap-16 items-center justify-center text-center rounded-lg border border-border">
        {/* head */}
        <div className="max-w-4xl px-8 lg:px-0">
          <h2 className="text-darkBlack font-medium text-[40px] md:text-5xl lg:text-[64px] leading-tight tracking-tight">
            Discover{" "}
            <span className="bg-yellow py-2 px-3 rounded-md">real-time</span>{" "}
            crypto data
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-light leading-tight text-text mt-6 md:w-10/12 md:mx-auto lg:w-full">
            Empower your crypto journey with real-time cryptocurrency data: Gain
            a competitive edge and stay ahead of market trends
          </p>
        </div>

        {/* List of cryptos */}
        <div className="w-full px-2 md:px-8 lg:px-28">
          <Nossr>
            <Ticker />
          </Nossr>
        </div>
      </div>

      {/* About us */}
      <div
        className="border border-border rounded-lg pb-16 md:pb-[100px] lg:pb-[150px]"
        id="aboutus"
      >
        {/* top */}
        <div
          className="flex flex-col justify-between items-center pt-16 pb-[194px] md:pt-[100px] md:pb-[226px] lg:pt-[150px] lg:pb-[210px] bg-gray px-8 md:px-[100px] relative"
          style={{ backgroundImage: `url('/assets/dotted-svg.svg')` }}
        >
          <div className="flex flex-col gap-6 lg:flex-row justify-between items-center w-full">
            <div className="flex flex-col gap-2 w-full lg:w-6/12">
              <p className="text-base text-text font-light">Our Story</p>
              <h2 className="text-darkBlack font-medium text-[40px] md:text-5xl lg:text-[64px] leading-tight tracking-tight">
                Crafting
                <span className="bg-yellow py-2 px-3 mx-2 rounded-md">
                  excellence
                </span>
                <br className="block md:hidden" />
                in cryptocurrency services
              </h2>
            </div>
            <div className="flex flex-col gap-6 w-full lg:w-6/12 md:text-xl lg:text-2xl font-light text-text">
              <p>
                Discover the heart and soul of Random-Wallet: How our passion
                for cryptocurrency drove us to create a platform for your
                financial success
              </p>
            </div>
          </div>
          <div className="h-[300px] md:h-[388px] rounded-3xl lg:h-[388px] overflow-hidden w-11/12 md:w-10/12 lg:w-11/12 absolute -bottom-40 md:-bottom-52">
            <Image
              src="/assets/btc-image.png"
              alt="btc-image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* bottom */}
        <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between mt-56 md:mt-72 px-8 md:px-[100px]">
          <div className="flex flex-col gap-2 md:w-full lg:w-6/12">
            <p className="text-base text-text font-light">Who we are</p>
            <h2 className="text-darkBlack font-medium text-[40px] md:text-5xl lg:text-[64px] leading-tight tracking-tight">
              About
              <span className="bg-yellow py-2 px-3 ml-2 rounded-md">us</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6 text-lg md:w-full lg:w-6/12 md:text-xl lg:text-2xl font-light text-text">
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
      <div
        className="py-16 px-4 md:py-[100px] lg:py-[150px] flex flex-col gap-16 items-center justify-center text-center rounded-lg border border-border"
        id="whychooseus"
      >
        {/* head */}
        <div className="flex flex-col gap-2">
          <p className="text-base text-text font-light">
            Experience the Random-Wallet Advantage
          </p>
          <h2 className="text-darkBlack font-medium text-[40px] tracking-tighter md:text-5xl lg:text-[64px] leading-tight md:tracking-tight">
            Why
            <span className="bg-yellow py-2 px-3 mx-3 rounded-md">
              choose us?
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:px-8 lg:px-24 gap-6">
          {whychooseusData.map((item, i) => (
            <div
              className="p-8 md:p-10 rounded-2xl shadow-sm border border-border text-center flex flex-col items-center gap-3"
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
              <h3 className="font-medium text-[28px] lg:text-[32px] text-darkBlack tracking-tight">
                {item.title}
              </h3>
              <p className="text-text text-base md:text-lg lg:text-xl font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div
        className="flex flex-col md:flex-col lg:flex-row gap-28 justify-between py-16 md:py-[100px] lg:py-[150px] bg-gray px-8 md:px-8 lg:px-[100px] relative rounded-lg"
        id="howitworks"
        style={{ backgroundImage: `url('/assets/dotted-svg.svg')` }}
      >
        {/* left */}
        <div className="flex flex-col justify-between md:w-full gap-11 lg:w-5/12 lg:gap-0">
          {/* head */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-2 md:gap-4 lg:gap-2">
              <p className="text-base text-text font-light">
                Getting started with Random-Wallet
              </p>
              <h2 className="text-darkBlack font-medium text-[40px] md:text-5xl lg:text-[64px] leading-tight tracking-tight">
                How
                <span className="bg-yellow py-2 px-3 mx-3 rounded-md ml-1 lg:block lg:w-fit lg:-ml-2">
                  it works?
                </span>
              </h2>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-text">
              Mastering the art of cryptocurrency trading: A step-by-step guide
              to navigating the Random-Wallet platform and executing profitable
              trades
            </p>
          </div>
          {/* button */}
          <Link
            href="/signup"
            className="bg-darkBlack text-white flex gap-4 rounded-full px-8 py-4 w-fit hover:bg-darkGray transition duration-300"
          >
            Register now{" "}
            <Image
              src="/assets/icons/chevron-right-white.svg"
              alt="chevron-right"
              width={10}
              height={16}
            />
          </Link>
        </div>

        {/* right */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8 md:w-full lg:w-7/12">
          {howitworksData.map((item, i) => (
            <div key={i} className="flex flex-col gap-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-darkBlack font-bold text-[28px]">
                {i + 1}
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-xl md:text-2xl text-darkBlack font-medium">
                  {item.title}
                </h5>
                <p className="text-base md:text-lg text-text font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact our friendly team */}
      <div
        className="py-16 px-4 md:py-[100px] lg:py-[150px] flex flex-col gap-16 items-center justify-center text-center rounded-lg border border-border"
        id="contactus"
      >
        {/* head */}
        <div className="flex flex-col gap-2">
          <p className="text-base text-text font-light">
            Let us know how we can help
          </p>
          <h2 className="text-darkBlack font-medium text-[40px] tracking-tighter md:text-5xl lg:text-[64px] leading-tight md:tracking-tight">
            Contact our
            <span className="bg-yellow py-2 px-3 mx-3 rounded-md block w-fit md:inline">
              friendly team
            </span>
          </h2>
        </div>
        {/* three contact options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full md:px-8 lg:px-[150px] gap-6">
          {/* Item */}
          <div className="border border-border rounded-2xl flex flex-col items-start gap-8 p-8 md:p-10 shadow-sm w-full">
            <div className="h-14 w-14 rounded-full bg-lightlightGray flex items-center justify-center">
              <Image
                src="/assets/icons/location-dot.svg"
                height={24}
                width={24}
                alt="Location"
              />
            </div>
            <div className="flex flex-col gap-3 items-start">
              <h3 className="text-2xl lg:text-[32px] font-medium text-darkBlack tracking-tight">
                Visit us
              </h3>
              <p className="text-base lg:text-xl font-light text-text">
                Visit our office HQ.
              </p>
            </div>
            <Link
              href={`https://www.google.com/maps/place/${settings[0].location}`}
              target="_blank"
              className="text-base lg:text-xl text-text font-bold underline"
            >
              {settings[0].location}
            </Link>
          </div>
          {/* Item */}
          <div className="border border-border rounded-2xl flex flex-col items-start gap-8 p-10 shadow-sm w-full">
            <div className="h-14 w-14 rounded-full bg-lightlightGray flex items-center justify-center">
              <Image
                src="/assets/icons/envelope.svg"
                height={24}
                width={24}
                alt="Email"
              />
            </div>
            <div className="flex flex-col gap-3 items-start">
              <h3 className="text-2xl lg:text-[32px] font-medium text-darkBlack tracking-tight">
                Send us an email
              </h3>
              <p className="text-base lg:text-xl font-light text-text">
                We&apos;re here to help.
              </p>
            </div>
            <Link
              href={`mailto:${settings[0].email}`}
              target="_blank"
              className="text-base lg:text-xl text-text font-bold underline"
            >
              {settings[0].email}
            </Link>
          </div>
          {/* Item */}
          <div className="border border-border rounded-2xl flex flex-col items-start gap-8 p-10 shadow-sm w-full md:col-span-2 lg:col-span-1">
            <div className="h-14 w-14 rounded-full bg-lightlightGray flex items-center justify-center">
              <Image
                src="/assets/icons/phone.svg"
                height={24}
                width={24}
                alt="Phone"
              />
            </div>
            <div className="flex flex-col gap-3 items-start">
              <h3 className="text-2xl lg:text-[32px] font-medium text-darkBlack tracking-tight">
                Call us
              </h3>
              <p className="text-base lg:text-xl font-light text-text">
                Mon-Fri from 8am to 5pm
              </p>
            </div>
            <Link
              href={`tel:${settings[0].phone_number}`}
              target="_blank"
              className="text-base lg:text-xl text-text font-bold underline"
            >
              {settings[0].phone_number}
            </Link>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div
          className="w-full flex flex-col gap-16 items-center pt-8 md:pt-16"
          id="faq"
        >
          <h3 className="font-medium text-darkBlack text-[32px] md:text-4xl lg:text-[40px] tracking-tight">
            Frequently asked questions
          </h3>
          {/* FAQ */}
          <div className="md:w-10/12 lg:w-5/12 flex flex-col gap-6">
            {faqData.map((item, i) => (
              <FAQ key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="flex flex-row items-center px-4 py-16 md:gap-0 lg:gap-28 md:justify-center lg:justify-between md:py-[100px] lg:py-[150px] md:px-8 lg:px-[100px] md:my-[50px] bg-gray md:mx-8 lg:mx-[150px] relative rounded-lg md:rounded-3xl"
        id="howitworks"
        style={{ backgroundImage: `url('/assets/dotted-svg.svg')` }}
      >
        {/* left */}
        <div className="flex flex-col justify-between items-center text-center gap-16 md:gap-8 md:w-full md:text-center md:items-center lg:items-start lg:text-left lg:w-6/12">
          {/* head */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-base text-text font-light">
                Invest for the future
              </p>
              <h2 className="text-darkBlack font-medium text-[40px] tracking-tighter md:text-5xl lg:text-[64px] lg:tracking-tighter md:leading-snug">
                Get the most out of your
                <span className="bg-yellow py-2 px-3 mx-3 rounded-md">
                  investments
                </span>
              </h2>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-text">
              Begin your journey to financial success in the cryptocurrency
              market. Join Random-Wallet today and access real-time data, expert
              resources, and a user-friendly platform. Click &apos;Register
              now&apos; and unlock the potential of digital assets with a
              trusted partner by your side.
            </p>
          </div>
          {/* button */}
          <Link
            href="/signup"
            className="bg-darkBlack text-white flex gap-4 rounded-full px-8 py-4 w-fit hover:bg-darkGray transition duration-300"
          >
            Register now{" "}
            <Image
              src="/assets/icons/chevron-right-white.svg"
              alt="chevron-right"
              width={10}
              height={16}
            />
          </Link>
        </div>

        {/* right */}
        <div className="hidden lg:block lg:w-6/12">
          <Image
            src="/assets/cryptos-desktop.svg"
            width={540}
            height={420}
            alt="List of cryptos"
            className="hidden lg:block"
          />
        </div>
      </div>

      {/* footer */}
      <footer className="py-[50px] bg-darkBlack text-white rounded-lg flex flex-col gap-[50px] px-6 md:px-8 lg:px-[150px] text-sm">
        {/* top */}
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="py-4 px-8 bg-darkBlack border border-border font-medium text-lg flex items-center justify-center w-fit rounded-lg">
            {settings[0].company_name}
          </div>
          <h4 className="text-4xl md:w-full lg:w-5/12 text-center">
            Create your own crypto wallet and take control of your assets.
          </h4>
        </div>

        {/* bottom */}
        <div className="pt-[50px] border-t border-white/10 flex flex-col md:flex-col gap-[10px] md:gap-[10px] lg:flex-row lg:gap-0 justify-between items-center">
          <p>{settings[0].company_name} © 2023. All rights reserved.</p>

          {/* contact info */}
          <ul className="flex flex-col gap-2 items-center md:flex-row md:gap-8">
            <li>
              <Link
                href={`tel: ${settings[0].phone_number}`}
                className="rounded-full bg-white/5 border border-white/10 py-3 px-4 flex flex-row items-center gap-2 w-fit"
              >
                <Image
                  src="/assets/icons/phone-white.svg"
                  alt="Phone"
                  height={16}
                  width={16}
                />
                {settings[0].phone_number}
              </Link>
            </li>
            <li>
              <Link
                href={`mailto:${settings[0].email}`}
                className="rounded-full bg-white/5 border border-white/10 py-3 px-4 flex flex-row items-center gap-2 w-fit"
              >
                <Image
                  src="/assets/icons/envelope-white.svg"
                  alt="Email"
                  height={16}
                  width={16}
                />
                {settings[0].email}
              </Link>
            </li>
            <li>
              <Link
                href={`https://www.google.com/maps/place/${settings[0].location}`}
                className="rounded-full bg-white/5 border border-white/10 py-3 px-4 flex flex-row items-center gap-2 w-fit"
              >
                <Image
                  src="/assets/icons/location-dot-white.svg"
                  alt="Location"
                  height={14}
                  width={14}
                />
                {settings[0].location}
              </Link>
            </li>
          </ul>

          {/* TOS links */}
          <ul className="flex gap-4">
            <li className="underline">
              <Link href="/tos">Terms of Services</Link>
            </li>
            <li className="underline">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
