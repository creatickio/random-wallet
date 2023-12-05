"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllAccounts() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();
      const { data } = await supabase.from("profile").select("*");
      setUsers(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-[10px] col-span-2 lg:col-span-1">
        <table className="table-auto w-full rounded-lg border border-border">
          <thead className="text-left">
            <tr className="bg-lightlightGray">
              <th className="p-4 font-medium text-xl">First name</th>
              <th className="font-medium text-xl">Last name</th>
              <th className="font-medium text-xl">Email</th>
              <th className="font-medium text-xl">Date created</th>
              <th className="font-medium text-xl">Last login</th>
              <th className="font-medium text-xl">Balance</th>
              <th className="font-medium text-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border">
                <td className="p-4 text-lg">{user.first_name || "NULL"}</td>
                <td className="text-lg">{user.last_name || "NULL"}</td>
                <td className="text-lg">{user.email || "NULL"}</td>
                <td className="text-lg">03 December, 2023</td>
                <td className="text-lg">03 December, 2023</td>
                <td className="text-lg">{user.balance} BTC</td>
                <td className="text-lg">
                  <button
                    onClick={() =>
                      router.push(`/admin/accounts/${user.id}`, {
                        shallow: false,
                      })
                    }
                    className=" bg-[#D8D8D8] p-2 rounded-lg flex gap-1 items-center justify-center"
                  >
                    <Image
                      src="/assets/icons/pen-to-square.svg"
                      height={25}
                      width={25}
                      alt="Modify"
                    />
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
