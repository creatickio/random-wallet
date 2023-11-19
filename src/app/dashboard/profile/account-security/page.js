import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function AccountSecurity() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("profile").select();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }

  console.log(data[0].first_name);
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
            className="bg-lightlightGray flex flex-col gap-0 p-8 rounded-2xl w-fit cursor-pointer duration-300 transition-all hover:bg-lightGray"
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
            className="bg-primary flex flex-col gap-0 p-8 rounded-2xl w-fit cursor-pointer duration-300 transition-all"
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
          <h1>Welcome to your Acount Details</h1>
        </div>
      </div>
    </div>
  );
}
