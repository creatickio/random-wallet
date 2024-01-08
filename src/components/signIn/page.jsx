"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo/page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userIP, setUserIP] = useState("");
  const [loading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setUserIP(data.ip);
      });
  }, []);

  useEffect(() => {
    const supabase = createClientComponentClient();
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("admin")
          .select("*")
          .eq("id", session.user.id);
        // check if admin
        if (data.length) {
          router.push("/admin");
        }

        if (!data.length) {
          router.push("/dashboard");
        }
      }
    };
    getSession();
  }, [router]);

  async function handleSignIn(e) {
    e.preventDefault();
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setIsLoading(true);
    if (error) {
      console.log("Error signing in:", error.message);
    } else {
      const userLogs = {
        email: email,
        ip_address: userIP,
      };
      const { error } = await supabase.from("user_logs").upsert(userLogs);
      if (error) {
        console.log("Error inserting user logs:", error.message);
      } else {
        console.log("User Logs published successfully!");
      }

      console.log("Signed in successfully!");
      router.push("/dashboard");
    }
  }
  return (
    <>
      <div className="px-8 pt-8 flex lg:justify-start justify-center w-full">
        <Logo />
      </div>
      <div className="w-full flex flex-col h-full items-center justify-center px-4 md:px-12 lg:px-24 gap-16">
        <div className="w-full lg:text-left text-center">
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
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-slate-200 p-4 rounded-lg"
            />
          </div>
          {/* Checkbox */}
          <Link href="#" className="underline font-light">
            Forgot password?
          </Link>
          <button
            onClick={handleSignIn}
            className="bg-[#202020] rounded-full text-lg font-medium text-white w-full p-4 hover:opacity-90 transition"
          >
            {loading ? "Loading..." : "Sign In"}
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
    </>
  );
}

export default SignIn;
