"use client";
import AdminNav from "@/components/admin/nav/page";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { parseISO, format } from "date-fns";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

function AdminPage() {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");
  const [userLogs, setUserLogs] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  console.log("User Logs:", userLogs);
  console.log("Accounts:", accounts);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();
      const { data } = await supabase.from("profile").select("*");
      setAccounts(data);

      const { data: users } = await supabase
        .from("profile")
        .select("*")
        .textSearch("first_name", search);
      setSearchResults(users);
    }
    fetchData();
  }, [setSearchResults, search]);

  useEffect(() => {
    async function getData() {
      let { data: user_logs, error } = await supabase
        .from("user_logs")
        .select("*");

      setUserLogs(user_logs);
    }
    getData();
  }, [supabase]);

  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AdminNav />
        <div className="w-full px-4 md:px-6 lg:px-8">
          {/* head */}
          <div className="flex flex-row justify-between items-center gap-40 py-8">
            <div className="w-fit shrink-0">
              <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
                Active accounts
              </h2>
              <p className="font-light text-xl text-text">
                Logged in accounts are visible here.
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
          </div>
          {/* TODO: Search Input with suggestions */}
          {/* <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1 mb-10">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Image
                  src="/assets/icons/search.svg"
                  height={16}
                  width={16}
                  alt="search"
                  className="absolute top-8 left-8"
                />
                <Combobox.Input
                  className="w-full py-6 pl-16 pr-32 border border-border rounded-full text-xl text-darkBlack placeholder-darkBlack"
                  displayValue={(person) => person.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {filteredPeople.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-primary text-darkBlack"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-darkBlack" : "text-darkBlack"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox> */}
          {/* table */}
          <table className="table-auto w-full rounded-lg border border-border">
            <thead className="text-left">
              <tr className="bg-lightlightGray">
                <th className="p-4 font-medium text-xl">First name</th>
                <th className="font-medium text-xl">Last name</th>
                <th className="font-medium text-xl">Email</th>
                <th className="font-medium text-xl">Last login</th>
                <th className="font-medium text-xl">IP address</th>
              </tr>
            </thead>
            <tbody>
              {userLogs.map((user) => (
                <tr key={user.id} className="border-b border-border">
                  <td className="p-4 text-lg">
                    {accounts.map((account) => (
                      <p key={account.id}>
                        {user.email === account.email ? account.first_name : ""}
                      </p>
                    ))}
                  </td>
                  <td className="text-lg">
                    {accounts.map((account) => (
                      <p key={account.id}>
                        {user.email === account.email ? account.last_name : ""}
                      </p>
                    ))}
                  </td>
                  <td className="text-lg">{user.email}</td>
                  <td className="text-lg">
                    {format(
                      parseISO(user.last_login),
                      "d LLLL, yyyy, HH:mm:ss"
                    )}
                  </td>
                  <td className="text-lg">{user.ip_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
