import AdminNav from "@/components/admin/nav/page";
import Settings from "@/components/admin/settings/page";
import React from "react";

function SettingsAdmin() {
  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AdminNav />
        <div className="w-full max-w-[820px] mx-auto px-4 md:px-6 lg:px-0">
          {/* head */}
          <div className="flex flex-col gap-2 py-8">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              General settings
            </h2>
            <p className="font-light text-xl text-text">
              Manage general data about the company.
            </p>
          </div>
          {/* form */}
          <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsAdmin;
