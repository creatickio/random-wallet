"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useUser } from "@supabase/auth-helpers-nextjs";

export default function Dashboard({ user }) {
  async function sessionCheck() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        initialSession: session,
        user: session.user,
      },
    };
  }

  // useEffect(() => {
  //   async function fetchSession() {
  //     const { data: session, error } = await supabase.auth.getUser();
  //     if (error) console.log(error);
  //     else setSession(session);
  //   }
  // }, []);

  console.log(user);
  return (
    <div>
      <h1>Welcome to your dashboard, {user}!</h1>
    </div>
  );
}

// // Get the signed-in user's profile
// const { data: profile, error } = await supabase
//   .from("profiles")
//   .select("*")
//   .eq("id", user.id)
//   .single();

// if (error) {
//   return {
//     notFound: true,
//   };
// }
