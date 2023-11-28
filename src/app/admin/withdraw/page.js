import AdminNav from "@/components/admin/nav/page";
import React from "react";

function Withdraw() {
  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AdminNav />
        <div className="w-full px-4 md:px-6 lg:px-8">
          {/* head */}
          <div className="flex flex-col gap-2 py-8">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              Withdrawals
            </h2>
            <p className="font-light text-xl text-text">
              Manage all withdrawals in this list here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
