import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function AccountVerification() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("profile").select();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }

  const user = data[0];
  const isVerified = user.isVerified;

  return (
    <div className="flex flex-col gap-2 p-2">
      <DashboardNav firstName={user.first_name} lastName={user.last_name} />
      <div className="px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center py-8">
          <Link
            href="/dashboard/profile/account-details"
            className="bg-lightlightGray flex flex-col gap-0 p-8 rounded-2xl w-full text-center md:text-left md:w-fit cursor-pointer duration-300 transition-all hover:bg-lightGray"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-3xl lg:text-4xl">
              Account Details
            </h2>
            <p className="font-light text-text text-base lg:text-xl">
              Manage your account data
            </p>
          </Link>
          <Link
            href="/dashboard/profile/account-verification"
            className="bg-primary flex flex-col gap-0 p-8 rounded-2xl w-full text-center md:text-left md:w-fit cursor-pointer duration-300 transition-all"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-3xl lg:text-4xl">
              Account Verification
            </h2>
            <p className="font-light text-text text-base lg:text-xl">
              Manage your account verification status
            </p>
          </Link>
          <Link
            href="/dashboard/profile/account-security"
            className="bg-lightlightGray flex flex-col gap-0 p-8 rounded-2xl w-full text-center md:text-left md:w-fit cursor-pointer duration-300 transition-all hover:bg-lightGray"
          >
            <h2 className="text-darkBlack font-medium tracking-tighter text-3xl lg:text-4xl">
              Account Security
            </h2>
            <p className="font-light text-text text-base lg:text-xl">
              Manage your account security
            </p>
          </Link>
        </div>

        {/* Content */}
        <div className="max-w-[1068px] mx-auto text-darkBlack flex flex-col gap-2">
          {/* verification status */}
          <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
            <h3 className="font-bold text-2xl">Account verification status</h3>
            <div className="bg-primary rounded-2xl flex gap-0 flex-col py-8 px-6">
              <p className="font-medium text-lg">Your account is currently</p>
              <p className="font-bold text-xl uppercase">
                {isVerified ? "Verified" : "Not verified"}
              </p>
            </div>
          </div>

          {/* verification details */}
          {!isVerified && (
            <div className="bg-[#F4F4F4] p-16 rounded-2xl flex flex-col gap-16">
              <p className="font-medium text-2xl">
                Please send an email to{" "}
                <Link
                  href="mailto:support@random-wallet.io"
                  className="underline"
                >
                  support@random-wallet.io
                </Link>{" "}
                to get your account verified.
              </p>
              <div className="flex flex-col gap-4">
                <p className="text-xl">
                  Please ensure to include in the attachments as the following:
                </p>
                <ul className="text-lg list-disc pl-4">
                  <li>Passport / ID document / Drivers license</li>
                  <li>
                    A photo of you holding the identification document and
                    showing your face
                  </li>
                  <li>
                    A document where we can verify your address{" "}
                    <span className="italic">
                      ex: electricity bill, phone bill
                    </span>
                    ex: electricity bill, phone bill
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* note */}
          <p className="text-center italic text-xl">
            Note: Information you provide is used for verification process only
          </p>
        </div>
      </div>
    </div>
  );
}
