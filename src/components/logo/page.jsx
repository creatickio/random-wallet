import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-[10px] py-[14px] px-4 bg-gray border-[#EBECEE] rounded-lg transition duration-300 hover:bg-gray/70"
    >
      <Image
        src="/assets/icons/logo-icon.svg"
        alt="logo"
        height={32}
        width={32}
      />
      Random-Wallet
    </Link>
  );
}

export default Logo;
