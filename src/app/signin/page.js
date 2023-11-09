import Link from "next/link";
import React from "react";

function Signin() {
  return (
    <div className="flex">
      {/* Form */}
      <div className="w-6/12 flex flex-col items-center justify-center px-24 gap-16">
        <div className="w-full">
          <h1 className="text-4xl font-medium text-[#202020]">Welcome back</h1>
          <p className="text-xl font-light text-[#3C4049]">
            Enter your Random-Wallet account details.
          </p>
        </div>
        <form className="w-full flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col w-full">
            <label htmlFor="email">
              Email <span className="text-[#C21515]">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              className="border border-slate-200 p-4 rounded-lg"
            />
          </div>
          {/* Password */}
          <div className="flex flex-col w-full">
            <label htmlFor="password">
              Password <span className="text-[#C21515]">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              className="border border-slate-200 p-4 rounded-lg"
            />
          </div>
          {/* Checkbox */}
          <Link href="#" className="underline font-light">
            Forgot password?
          </Link>

          <button className="bg-[#202020] rounded-full text-lg font-medium text-white w-full p-4 hover:opacity-90 transition">
            Sign in
          </button>
        </form>
        {/* Already have an account - Login */}
        <p className="font-light text-[#202020] ">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold underline">
            Register here
          </Link>
        </p>
      </div>
      {/* Image on the right side */}
      <div className="w-6/12 bg-slate-200 h-screen"></div>
    </div>
  );
}

export default Signin;
