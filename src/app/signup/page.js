"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClientComponentClient();

  async function SignUpNewUser(e) {
    e.preventDefault();
    const { data: user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "/dashboard",
        data: {
          first_name: name,
          last_name: surname,
        },
      },
    });
    console.log(error);
    console.log(user);
  }

  return (
    <div className="flex">
      {/* Form */}
      <div className="w-6/12 flex flex-col items-center justify-center px-24 gap-16">
        <div className="w-full">
          <h1 className="text-4xl font-medium text-[#202020]">
            Create an account
          </h1>
          <p className="text-xl font-light text-[#3C4049]">
            Get started now by creating a new account.
          </p>
        </div>
        <form onSubmit={SignUpNewUser} className="w-full flex flex-col gap-6">
          {/* First name last name */}
          <div className="flex gap-2 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName">
                First name <span className="text-[#C21515]">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border border-slate-200 p-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="lastName">
                Last name <span className="text-[#C21515]">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Enter your surname"
                className="border border-slate-200 p-4 rounded-lg"
              />
            </div>
          </div>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-slate-200 p-4 rounded-lg"
            />
          </div>
          {/* Checkbox */}
          <div className="flex items-start gap-2">
            <input type="checkbox" id="tos" className="mt-1" />
            <label htmlFor="tos">
              By creating an account, I agree to Random-Wallet`s{" "}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
              . <span className="text-[#C21515]">*</span>
            </label>
          </div>
          <button className="bg-[#202020] rounded-full text-lg font-medium text-white w-full p-4 hover:opacity-90 transition">
            Create account
          </button>
        </form>
        {/* Already have an account - Login */}
        <p className="font-light text-[#202020] ">
          Already have an account?{" "}
          <Link href="/signin" className="font-bold underline">
            Login
          </Link>
        </p>
      </div>
      {/* Image on the right side */}
      <div className="w-6/12 bg-slate-200 h-screen"></div>
    </div>
  );
}

export default Signup;
