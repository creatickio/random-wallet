import AdminNav from "@/components/admin/nav/page";
import Image from "next/image";
import React from "react";

function AdminPage() {
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
              <tr className="border-b border-border">
                <td className="p-4 text-lg">asdasd</td>
                <td className="text-lg">asdasd</td>
                <td className="text-lg">asdasd</td>
                <td className="text-lg">BTC </td>
                <td className="text-lg">BTC </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
