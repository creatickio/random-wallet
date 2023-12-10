"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AccountDetailsComp() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [btcAddress, setBtcAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [currency, setCurrency] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [zipCode, setZipCode] = useState();
  const [loading, setLoading] = useState(false);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      9;
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", session.user.id);

      console.log("data", data);
      const user = data[0];
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setBtcAddress(user.btcAddress);
      setPhoneNumber(user.phone_number);
      setCurrency(user.currency);
      setCountry(user.country);
      setCity(user.city);
      setAddress(user.address);
      setZipCode(user.zipCode);
    }
    fetchData();
  }, []);

  //   update the data
  async function updateProfile(event) {
    event.preventDefault();
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setLoading(true);

    const updates = {
      id: session.user.id,
      btcAddress: btcAddress,
      phone_number: phoneNumber,
      currency: currency,
      country: country,
      city: city,
      address: address,
      zip_code: zipCode,
    };

    const { error } = await supabase.from("profile").upsert(updates);

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
      setUpdatedSuccessfully("Your profile has been updated successfully");
      toast.success("Your profile has been updated successfully!", {
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
      onSubmit={(event) => updateProfile(event)}
      className="text-left flex flex-col gap-6"
    >
      <ToastContainer />
      {/* First name last name */}
      <div className="flex flex-col gap-6 md:flex-row w-full">
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">
            First Name <span className="text-[#C21515]">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            value={firstName}
            disabled
            placeholder="Enter your name"
            className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="lastName">
            Last Name <span className="text-[#C21515]">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            disabled
            value={lastName}
            placeholder="Enter your surname"
            className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
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
          value={email}
          disabled
          placeholder="Enter your email"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* BTC Address */}
      <div className="flex flex-col w-full">
        <label htmlFor="btcAddress">BTC Address</label>
        <input
          type="text"
          name="btcAddress"
          id="btcAddress"
          value={btcAddress || ""}
          onChange={(e) => setBtcAddress(e.target.value)}
          placeholder="Enter your btc address"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* Phone Number and Currency */}
      <div className="flex flex-col gap-6 md:flex-row w-full">
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
        <div className="flex flex-col w-full">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={currency || "EUR"}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed uppercase"
          >
            <option value="EUR">Euro</option>
            <option value="CHF">Swiss Franc</option>
            <option value="USD">United States Dollar</option>
            <option value="GBP">Pound Sterling</option>
          </select>
        </div>
      </div>
      {/* Country and City */}
      <div className="flex flex-col gap-6 md:flex-row w-full">
        <div className="flex flex-col w-full">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={country || ""}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
          >
            <option selected value="null">
              Choose a country
            </option>
            <option value="Germany">Germany</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Austria">Austria</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="England">England</option>
            <option value="Ireland">Ireland</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
          />
        </div>
      </div>
      {/* Address and ZIP code */}
      <div className="flex flex-col gap-6 md:flex-row w-full">
        <div className="flex flex-col w-full">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="zipCode">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            value={zipCode || ""}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter your zip code"
            className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
          />
        </div>
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

export default AccountDetailsComp;
