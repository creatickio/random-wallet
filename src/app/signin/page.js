import Image from "next/image";
import SignIn from "@/components/signIn/page";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { redirect } from "next/navigation";

export default async function Signin() {
  const supabase = createServerComponentClient({ cookies });
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
      redirect("/admin");
    }

    if (!data.length) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex">
      {/* Form */}
      <div className="lg:w-6/12 w-full h-screen flex flex-col justify-between">
        <SignIn />
      </div>
      {/* Image on the right side */}
      <div className="w-6/12 bg-slate-200 h-screen relative hidden lg:flex">
        <Image
          src="/assets/sign-in-bg.svg"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
