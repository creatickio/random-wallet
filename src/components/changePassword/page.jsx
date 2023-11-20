"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword({ email }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState();
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState();
  const [disabled, setDisabled] = useState(true);

  // Disable submission if passwords do not match or are empty
  useEffect(() => {
    if (password === newPassword && password !== "" && newPassword !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, newPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const supabase = createClientComponentClient();
    try {
      await supabase.auth.updateUser({ password: newPassword });

      if (error) throw error;

      setUpdatedSuccessfully("Password updated successfully!");
      toast.success("Password updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      setError(error.message);
      toast.error(`${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-left flex flex-col gap-6">
      <ToastContainer />
      {/* Email */}
      <div className="flex flex-col w-full">
        <label htmlFor="email">
          Email <span className="text-[#C21515]">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          disabled
          placeholder="Enter your email"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* Current Password */}
      <div className="flex flex-col w-full">
        <label htmlFor="password">
          New Password <span className="text-[#C21515]">*</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your new password"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* New Password */}
      <div className="flex flex-col w-full">
        <label htmlFor="newPassword">
          Repeat New Password <span className="text-[#C21515]">*</span>
        </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          required
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="Repeat your new password"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
        <p>{passwordError}</p>
      </div>
      <button
        type="submit"
        className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        Change password
      </button>
      {error && <p>{error}</p>}
      {updatedSuccessfully !== "" && (
        <p className="text-center text-green-500">{updatedSuccessfully}</p>
      )}
    </form>
  );
}
