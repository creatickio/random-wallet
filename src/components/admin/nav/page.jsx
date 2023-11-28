"use client";
import Logo from "@/components/logo/page";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

import menuAdmin from "@/data/menuAdmin.json";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AdminNav({ firstName, lastName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentRoute = usePathname();
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <div
        className={
          mobileMenuOpen
            ? "flex justify-between items-center border-b-0 p-4 md:px-8 md:py-6 lg:py-0"
            : "flex justify-between items-center border-b border-border p-4 md:px-8 md:py-6 lg:py-0"
        }
      >
        <Logo />
        <ul className="hidden lg:flex flex-row gap-8 py-10 -mb-[3px]">
          {menuAdmin.map((item, i) => (
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
          <div className="hidden md:flex flex-col items-center justify-center bg-gray text-darkBlack py-2 px-4 rounded-2xl">
            <p className="text-base font-bold uppercase">Admin</p>
          </div>
          {/* mobile icon */}
          <div
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border flex items-center justify-center w-[60px] h-[60px] border-border lg:hidden"
          >
            {mobileMenuOpen ? (
              <Image
                src="/assets/icons/xmark.svg"
                alt="Mobile Menu"
                height={24}
                width={30}
              />
            ) : (
              <Image
                src="/assets/icons/bars.svg"
                alt="Mobile Menu"
                height={24}
                width={30}
              />
            )}
          </div>
          <button
            onClick={handleSignOut}
            className="bg-yellow rounded-2xl px-6 py-4 hidden lg:flex gap-4 items-center justify-center duration-300 transition-all hover:bg-primary"
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
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="p-6 rounded-lg bg-gray flex lg:hidden flex-col items-center gap-5">
          <ul className="flex flex-col items-center gap-4 lg:hidden w-full">
            {menuAdmin.map((item, i) => (
              <li key={i} className="w-full text-center">
                <Link
                  href={item.link}
                  className={
                    currentRoute === item.link ? "w-full font-bold" : "w-full"
                  }
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSignOut}
            className="w-full bg-yellow rounded-2xl px-6 py-4 lg:hidden flex gap-4 items-center justify-center duration-300 transition-all hover:bg-primary"
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
      )}
    </>
  );
}
