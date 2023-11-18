"use client";
import Logo from "@/components/logo/page";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import menuDashboard from "@/data/menuDashboard.json";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardNav({ firstName, lastName }) {
  const currentRoute = usePathname();
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex justify-between items-center border-b border-border px-8">
      <Logo />
      <ul className="flex gap-8 py-10 -mb-[3px]">
        {menuDashboard.map((item, i) => (
          <li key={i}>
            <Link
              href={item.link}
              className={
                currentRoute === item.link
                  ? "font-bold border-b border-darkBlack py-10"
                  : "py-10"
              }
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        <div className="bg-gray text-darkBlack py-2 px-4 rounded-2xl">
          <p className="font-light text-xs">Welcome back</p>
          <p className="text-base font-medium">
            {firstName} {lastName}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-yellow rounded-2xl px-6 py-4 flex gap-4 items-center justify-center duration-300 transition-all hover:bg-primary"
        >
          Logout
          <Image
            src="/assets/icons/signout.svg"
            height={16}
            width={16}
            alt="Sign Out"
          />
        </button>
      </div>
    </div>
  );
}
