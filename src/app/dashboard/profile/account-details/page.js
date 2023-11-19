import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function AccountDetails() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("profile").select();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }
  console.log(data);
  // information stored in database
  return (
    <div className="flex flex-col gap-2 p-2">
      <DashboardNav
        firstName={data[0].first_name}
        lastName={data[0].last_name}
      />
      <div className="px-8">
        <div className="flex gap-4 items-center justify-center py-8">
          <Link
            href="/dashboard/profile/account-details"
            className="bg-primary flex flex-col gap-0 p-8 rounded-2xl w-fit cursor-pointer duration-300 transition-all"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-4xl">
              Account Details
            </h2>
            <p className="font-light text-text text-xl">
              Manage your account data
            </p>
          </Link>
          <Link
            href="/dashboard/profile/account-verification"
            className="bg-lightlightGray flex flex-col gap-0 p-8 rounded-2xl w-fit cursor-pointer duration-300 transition-all hover:bg-lightGray"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-4xl">
              Account Verification
            </h2>
            <p className="font-light text-text text-xl">
              Manage your account verification status
            </p>
          </Link>
          <Link
            href="/dashboard/profile/account-security"
            className="bg-lightlightGray flex flex-col gap-0 p-8 rounded-2xl w-fit cursor-pointer duration-300 transition-all hover:bg-lightGray"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-4xl">
              Account Security
            </h2>
            <p className="font-light text-text text-xl">
              Manage your account security
            </p>
          </Link>
        </div>
        {/* Content */}
        <div className="w-8/12 mx-auto">
          <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
            <form className="text-left flex flex-col gap-6">
              {/* First name last name */}
              <div className="flex flex-col gap-6 md:flex-row w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="firstName">
                    First Name <span className="text-[#C21515]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={data[0].first_name}
                    disabled
                    placeholder="Enter your name"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="lastName">
                    Last Name <span className="text-[#C21515]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    disabled
                    value={data[0].last_name}
                    placeholder="Enter your surname"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="flex flex-col w-full">
                <label htmlFor="email">
                  Email <span className="text-[#C21515]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={data[0].email}
                  disabled
                  placeholder="Enter your email"
                  className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                />
              </div>
              {/* BTC Address */}
              <div className="flex flex-col w-full">
                <label htmlFor="btcAddress">BTC Address</label>
                <input
                  type="text"
                  name="btcAddress"
                  id="btcAddress"
                  required
                  placeholder="Enter your btc address"
                  className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                />
              </div>
              {/* Phone Number and Currency */}
              <div className="flex flex-col gap-6 md:flex-row w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="currency">Currency</label>
                  <select
                    id="currency"
                    name="currency"
                    value="CHF"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed uppercase"
                  >
                    <option value="EUR">Euro</option>
                    <option value="CHF">Swiss Franc</option>
                    <option value="USD">United States Dollar</option>
                    <option value="GBP">Pound Sterling</option>
                  </select>
                </div>
              </div>
              {/* Country and City */}
              <div className="flex flex-col gap-6 md:flex-row w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  >
                    <option selected value="null">
                      Choose a country
                    </option>
                    <option value="Germany">Germany</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Austria">Austria</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="England">England</option>
                    <option value="Ireland">Ireland</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter your city"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              {/* Address and ZIP code */}
              <div className="flex flex-col gap-6 md:flex-row w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    placeholder="Enter your zip code"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <button className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
