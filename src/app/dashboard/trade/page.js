import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Trade() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session.user.id);

  if (!session) {
    redirect("/signin");
  }

  const user = data[0];
  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <DashboardNav firstName={user.first_name} lastName={user.last_name} />
        <div className="w-full px-4 md:px-6 lg:px-8">
          {/* head */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 py-8">
              <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
                Trade
              </h2>
              <p className="font-light text-xl text-text">
                Review your recent trades here.
              </p>
            </div>
            {/* right side */}
            <div className="flex flex-col md:flex-row gap-4 w-full lg:w-fit">
              <Link
                href="/dashboard/deposit"
                className="flex gap-4 items-center bg-primary rounded-full py-6 justify-center px-8 w-full lg:w-fit text-darkBlack font-medium text-xl duration-300 transition-all hover:bg-yellow"
              >
                Deposit{" "}
                <Image
                  src="/assets/icons/plus-dark.svg"
                  height={16}
                  width={16}
                  alt="Deposit"
                />
              </Link>
              <Link
                href="/dashboard/withdraw"
                className="flex gap-4 items-center bg-transparent border w-full lg:w-fit justify-center border-darkBlack rounded-full py-6 px-8 text-darkBlack font-medium text-xl duration-300 transition-all hover:bg-darkBlack/20 hover:text-darkBlack hover:border-darkBlack/0"
              >
                Withdraw
                <Image
                  src="/assets/icons/minus-dark.svg"
                  height={16}
                  width={16}
                  alt="Withdraw"
                />
              </Link>
              <Link
                href="/dashboard/trade/newtrade"
                className="flex gap-4 items-center bg-darkBlack w-full lg:w-fit justify-center rounded-full py-6 px-8 text-white font-medium text-xl duration-300 transition-all hover:opacity-70"
              >
                New trade
                <Image
                  src="/assets/icons/plus-light.svg"
                  height={16}
                  width={16}
                  alt="Trade"
                />
              </Link>
            </div>
          </div>
          {/* table */}
          <table className="table-auto w-full rounded-lg border border-border">
            <thead className="text-left">
              <tr className="bg-lightlightGray">
                <th className="p-4 font-medium text-xl">Amount inserted</th>
                <th className="font-medium text-xl">Trade option</th>
                <th className="font-medium text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">test</td>
                <td className="text-lg">test</td>
                <td className="text-lg">test</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
