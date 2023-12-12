"use client";
import AdminNav from "@/components/admin/nav/page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { parseISO, format } from "date-fns";

export default function DepositAdmin() {
  const [deposits, setDeposits] = useState([]);
  const [users, setUsers] = useState([]);
  console.log(deposits);
  console.log(users);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getDeposits() {
      const { data } = await supabase.from("deposits").select("*");
      const { data: users } = await supabase.from("profile").select("*");
      setDeposits(data);
      setUsers(users);
    }
    getDeposits();
  }, [supabase]);
  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AdminNav />
        <div className="w-full px-4 md:px-6 lg:px-8">
          {/* head */}
          <div className="flex flex-col gap-2 py-8">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              Deposit
            </h2>
            <p className="font-light text-xl text-text">
              Manage all deposits in this list here.
            </p>
          </div>
          {/* table */}
          {deposits.length > 0 ? (
            <table className="table-auto w-full rounded-lg border border-border">
              <thead className="text-left">
                <tr className="bg-lightlightGray">
                  <th className="p-4 font-medium text-xl">First name</th>
                  <th className="font-medium text-xl">Last name</th>
                  <th className="font-medium text-xl">Email</th>
                  <th className="font-medium text-xl">Amount</th>
                  <th className="font-medium text-xl">Issued date</th>
                  <th className="font-medium text-xl">Status</th>
                </tr>
              </thead>
              <tbody>
                {deposits
                  .sort(
                    (a, b) =>
                      new Date(b.created_date) - new Date(a.created_date)
                  )
                  .map((deposit) => (
                    <tr key={deposit.id} className="border-b border-border">
                      <td className="p-4 text-lg">
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === deposit.profile ? user.first_name : ""}
                          </p>
                        ))}
                      </td>
                      <td className="text-lg">
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === deposit.profile ? user.last_name : ""}
                          </p>
                        ))}
                      </td>
                      <td className="text-lg">
                        {users.map((user) => (
                          <p key={user.id}>
                            {user.id === deposit.profile ? user.email : ""}
                          </p>
                        ))}
                      </td>
                      <td className="text-lg">BTC {deposit.amount}</td>
                      <td className="text-lg">
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
