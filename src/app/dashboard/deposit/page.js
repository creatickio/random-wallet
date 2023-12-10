import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { parseISO, format } from "date-fns";
import UserDeposit from "@/components/userDeposit/page";

export default async function Deposit() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }

  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session.user.id);
  const { data: deposits } = await supabase
    .from("deposits")
    .select("*")
    .eq("profile", session.user.id);

  const user = data[0];

  return (
    <div className="p-2">
      <DashboardNav firstName={user.first_name} lastName={user.last_name} />
      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-2">
        {/* left */}
        <div className="w-full lg:w-6/12">
          {/* head */}
          <div className="flex flex-col gap-2 px-4 py-8 md:p-8">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              Create Deposit
            </h2>
            <p className="font-light text-xl text-text">
              Find useful information on depositing funds to your account.
            </p>
          </div>
          <UserDeposit />
        </div>
        {/* right */}
        <div className="w-full lg:w-6/12">
          {/* head */}
          <div className="flex flex-col gap-2 p-8 pl-2">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              Review Deposits
            </h2>
            <p className="font-light text-xl text-text">
              Review all deposits made previously to your account.
            </p>
          </div>
          {/* table */}
          {deposits.length > 0 ? (
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
              </tbody>
            </table>
          ) : (
            <div className="p-6 border border-border text-xl text-center rounded-lg">
              There&apos;s no deposits made yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
