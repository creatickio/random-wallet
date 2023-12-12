import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserSignUp({ closeModal }) {
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
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          first_name: name,
          last_name: surname,
        },
      },
    });
    if (error) {
      console.log("Error signing up:", error.message);
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      console.log("Signed up successfully!");
      toast.success("User created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-center bg-lightlightGray p-4 rounded-2xl">
        <p className="text-2xl">Add new Account</p>
        <div
          onClick={closeModal}
          className="w-8 h-8 rounded-[10px] bg-darkBlack flex items-center justify-center cursor-pointer"
        >
          <Image
            src="/assets/icons/xmark-white.svg"
            height={32}
            width={32}
            alt="close"
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-8">
        <form onSubmit={SignUpNewUser} className="flex flex-col gap-8">
          <div className="flex flex-col gap-[10px]">
            <p className="text-xl font-bold text-darkBlack">Account details</p>

            <div className="flex gap-[10px]">
              <input
                className="w-full p-4 border border-border rounded-[4px]"
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="First name"
              />
              <input
                className="w-full p-4 border border-border rounded-[4px]"
                type="text"
                required
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Last name"
              />
            </div>
            <input
              className="w-full p-4 border border-border rounded-[4px]"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="w-full p-4 border border-border rounded-[4px]"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          {/* Divider */}
          <div className="w-full bg-gray h-px"></div>
          {/* proceed withdraw */}
          <button
            disabled={
              name === "" || surname === "" || email === "" || password === ""
            }
            className="text-darkBlack bg-primary font-medium text-xl rounded-full p-6 flex items-center justify-center gap-4 duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed "
          >
            Create account
            <Image
              src="/assets/icons/arrow-right.svg"
              height={16}
              width={16}
              alt="Arrow Right"
            />
          </button>
        </form>
      </div>
    </>
  );
}

export default UserSignUp;
