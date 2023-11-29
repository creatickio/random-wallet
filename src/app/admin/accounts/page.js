import AllAccounts from "@/components/admin/allAccounts/page";
import AdminNav from "@/components/admin/nav/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AccountsAdmin() {
  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AdminNav />
        <div className="w-full px-4 md:px-6 lg:px-8">
          {/* head */}
          <div className="flex flex-row justify-between items-center gap-40 py-8">
            <div className="w-fit shrink-0">
              <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
                All accounts
              </h2>
              <p className="font-light text-xl text-text">
                Manage accounts and their data here.
              </p>
            </div>
            <div className="w-full relative flex items-center">
              <Image
                src="/assets/icons/search.svg"
                height={16}
                width={16}
                alt="search"
                className="absolute left-8"
              />
              <input
                type="text"
                placeholder="Search users ..."
                className="w-full py-6 pl-16 pr-32 border border-border rounded-full text-xl text-darkBlack placeholder-darkBlack"
              />
              <button className="py-3 px-4 rounded-full bg-[#D8D8D8] text-darkGray absolute right-6 duration-300 transition-all hover:bg-gray">
                Search
              </button>
            </div>
            <button className="flex items-center justify-center shrink-0 px-8 py-6 gap-4 text-white bg-darkBlack rounded-full duration-300 transition-all hover:bg-darkGray">
              Add new account{" "}
              <Image
                src="/assets/icons/plus-light.svg"
                width={16}
                height={16}
                alt="plus icon"
              />
            </button>
          </div>
          {/* A table of accounts */}
          <AllAccounts />
        </div>
      </div>
    </div>
  );
}
