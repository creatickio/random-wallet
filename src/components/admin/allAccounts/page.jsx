"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllAccounts() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  console.log(searchResults);
  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();
      const { data } = await supabase.from("profile").select("*");
      setUsers(data);

      const { data: users } = await supabase
        .from("profile")
        .select("*")
        .textSearch("first_name", search);
      setSearchResults(users);
    }
    fetchData();
  }, [setSearchResults, search]);
  return (
    <div>
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
            onChange={(e) => setSearch(e.target.value)}
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
      {/* table */}
      {search ? (
        <>
          {searchResults.length > 0 ? (
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
                    {searchResults.map((user) => (
                      <tr key={user.id} className="border-b border-border">
                        <td className="p-4 text-lg">
                          {user.first_name || "NULL"}
                        </td>
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
          ) : (
            <div className="p-6 border border-border text-xl text-center rounded-lg">
              No results found in this search. Try changing the search query!
            </div>
          )}
        </>
      ) : (
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
      )}
    </div>
  );
}
