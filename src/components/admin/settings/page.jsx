"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
  const [companyName, setCompanyName] = useState();
  const [defaultBtc, setDefaultBtc] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();
      const { data } = await supabase.from("settings").select();
      const settings = data[0];
      setCompanyName(settings.company_name);
      setDefaultBtc(settings.default_btc_address);
      setPhoneNumber(settings.phone_number);
      setLocation(settings.location);
      setEmail(settings.email);
    }
    fetchData();
  }, []);

  //   update the data
  async function updateSettings(event) {
    event.preventDefault();
    const supabase = createClientComponentClient();
    const { data } = await supabase.from("settings").select();
    console.log(data);
    setLoading(true);

    const updates = {
      id: 1,
      company_name: companyName,
      default_btc_address: defaultBtc,
      phone_number: phoneNumber,
      location: location,
      email: email,
    };

    const { error } = await supabase.from("settings").upsert(updates);

    if (error) {
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
    } else {
      setLoading(false);
      setUpdatedSuccessfully("Settings updated successfully");
      toast.success("Settings updated successfully!", {
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
    <form
      onSubmit={(event) => updateSettings(event)}
      className="text-left flex flex-col gap-6"
    >
      <ToastContainer />
      {/* Company Name */}
      <div className="flex flex-col w-full">
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter the company name"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* BTC Address */}
      <div className="flex flex-col w-full">
        <label htmlFor="btcAddress">Default BTC Address</label>
        <input
          type="text"
          name="btcAddress"
          id="btcAddress"
          value={defaultBtc || ""}
          onChange={(e) => setDefaultBtc(e.target.value)}
          placeholder="Enter your btc address"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* Phone Number and Currency */}
      <div className="flex flex-col w-full">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={phoneNumber || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col w-full">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={location || ""}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your address"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* Email */}
      <div className="flex flex-col w-full">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter the email address"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      <button
        className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading ..." : "Save changes"}
      </button>
      {error && <p>{error}</p>}
      {updatedSuccessfully !== "" && (
        <p className="text-center text-green-500">{updatedSuccessfully}</p>
      )}
    </form>
  );
}

export default Settings;
