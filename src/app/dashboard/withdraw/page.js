import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { parseISO, format } from "date-fns";
import UserWithdraw from "@/components/userWithdraw/page";

export default async function Withdraw() {
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

  const { data: withdraws } = await supabase
    .from("withdraw")
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
              Initiate Withdraw
            </h2>
            <p className="font-light text-xl text-text">
              Find useful information on withdrawing funds from your account.
            </p>
          </div>
          {/* content */}
          <UserWithdraw />
        </div>
        {/* right */}
        <div className="w-full lg:w-6/12">
          {/* head */}
          <div className="flex flex-col gap-2 p-8 pl-2">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              Review Withdraws
            </h2>
            <p className="font-light text-xl text-text">
              Review all withdraws made previously to your account.
            </p>
          </div>
          {/* table */}
          {withdraws.length > 0 ? (
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
                {withdraws
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((withdraw) => (
                    <tr key={withdraw.id} className="border-b border-border">
                      <td className="p-4 text-lg">BTC {withdraw.amount}</td>
                      <td className="hidden md:table-cell text-lg">
                        {format(parseISO(withdraw.created_at), "d LLLL, yyyy")}
                      </td>
                      <td>
                        <span
                          className={`text-lg flex w-fit gap-1.5
                      ${
                        withdraw.status === "pending"
                          ? "bg-[#E7E9E5] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      } ${
                            withdraw.status === "completed"
                              ? "bg-[#D3FFCE] px-4 py-1 rounded-lg text-darkBlack capitalize"
                              : ""
                          } ${
                            withdraw.status === "declined"
                              ? "bg-[#FFCED3] px-4 py-1 rounded-lg text-darkBlack capitalize"
                              : ""
                          }`}
                        >
                          {withdraw.status === "completed" ? (
                            <Image
                              src="/assets/icons/check.svg"
                              height={20}
                              width={20}
                              alt="Completed"
                            />
                          ) : withdraw.status === "pending" ? (
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
                          {withdraw.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 border border-border text-xl text-center rounded-lg">
              There&apos;s no withdrawals made yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
