import ChangePassword from "@/components/changePassword/page";
import DashboardNav from "@/components/dashboard/nav/page";
import { EnrollMFA, UnenrollMFA } from "@/components/multiFactorAuth/page";

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
        {/* 2FA entrollment */}
        <div className="max-w-[1068px] mx-auto">
          <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 text-left py-4 px-6 text-base font-normal uppercase text-darkBlack bg-darkBlack/20 rounded-t-[4px]">
                <p>Type</p>
                <p>Status</p>
                <p></p>
              </div>
              <div className="grid grid-cols-3 items-center text-left p-6 border border-[#BBBBBB] rounded-b-[4px]">
                <p>Authenticator App</p>
                <p>Not Configured</p>
                <button
                  type="submit"
                  className="bg-primary py-4 px-6 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed w-full"
                >
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Change Password */}
        <div className="max-w-[1068px] mx-auto mt-2">
          <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
            <ChangePassword email={data[0].email} />
          </div>
        </div>
      </div>
    </div>
  );
}
