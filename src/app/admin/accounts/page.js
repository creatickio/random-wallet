import AllAccounts from "@/components/admin/allAccounts/page";
import AdminNav from "@/components/admin/nav/page";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";

export default async function AccountsAdmin() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // console.log("session", session.user.id);

  const { data } = await supabase
    .from("admin")
    .select("*")
    .eq("id", session.user.id);

  // console.log("data", data);
  if (!data.length) {
    redirect("/dashboard");
  }

  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AdminNav />
        <div className="w-full px-4 md:px-6 lg:px-8">
          <AllAccounts />
        </div>
      </div>
    </div>
  );
}
