import AdminNav from "@/components/admin/nav/page";
import React from "react";

export default function TradeAdmin() {
  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AdminNav />
        {/* head */}
        <div className="flex flex-col gap-2 p-8 rounded-2xl bg-lightlightGray">
          <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
            Trades
          </h2>
          <p className="font-light text-xl text-text">
            See and manage all trades in one place.
          </p>
        </div>
        <div className="w-full px-4 md:px-6 lg:px-8">
          {/* active trades */}
          <div className="flex flex-col gap-2 py-8">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              Active trades
            </h2>
            <p className="font-light text-xl text-text">
              See and manage all trades in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
