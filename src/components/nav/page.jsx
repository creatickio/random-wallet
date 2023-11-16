import Image from "next/image";
import Link from "next/link";
import React from "react";

// Internal imports
import menuLinks from "@/data/menuLinks.json";
import Logo from "../logo/page";

function Nav() {
  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-col text-center lg:text-left lg:flex-row items-center justify-center bg-primary font-light text-darkBlack rounded-lg p-4 gap-1">
        <p>
          Registrations are now open. Go ahead and create your account.
          We&apos;ll be right there to help you.
        </p>{" "}
        <Link href="/signup" className="underline">
          Register Now
        </Link>
      </div>
      {/* Navigation */}
      <div className="flex justify-between py-2 md:py-6 md:px-4 items-center">
        {/* Logo */}
        <Logo />
        {/* Menu */}
        {/* mobile icon */}
        <div className="rounded-lg border flex items-center justify-center w-[60px] h-[60px] border-border md:hidden">
          <Image
            src="/assets/icons/bars.svg"
            alt="Mobile Menu"
            height={24}
            width={30}
          />
        </div>
        <ul className="lg:flex gap-8 hidden">
          {menuLinks.map((item, i) => (
            <li key={i}>
              <Link
                className="hover:text-primary transition duration-300 h-full"
                href={item.link}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        {/* Buttons */}
        <ul className="hidden md:flex gap-4">
          <li>
            <Link
              href="/signin"
              className="border-darkBlack border rounded-full py-4 px-6 transition duration-300 hover:bg-darkBlack hover:text-white"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
              className="bg-primary rounded-full py-4 px-6 text-black hover:bg-yellow transition duration-300"
            >
              Register for free
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
