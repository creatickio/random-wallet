"use client";
import AdminNav from "@/components/admin/nav/page";
import { Switch } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  // store the data
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [btcAddress, setBtcAddress] = useState();
  const [address, setAddress] = useState();
  const [zipCode, setZipCode] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [currency, setCurrency] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [depositEnabled, setDepositEnabled] = useState();
  const [withdrawEnabled, setWithdrawEnabled] = useState();
  const [tradeEnabled, setTradeEnabled] = useState();
  const [userVerifiedEnabled, setUserVerifiedEnabled] = useState();
  const [loading, setLoading] = useState(false);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState();
  const [error, setError] = useState(null);
  // fetch the id
  const pathname = window.location.pathname;
  const id = pathname.split("/").pop();

  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", id)
        .single();
      const user = data;
      console.log(user);
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
      setDepositEnabled(user.depositEnabled);
      setWithdrawEnabled(user.withdrawEnabled);
      setTradeEnabled(user.tradeEnabled);
      setUserVerifiedEnabled(user.isVerified);
    }
    fetchData();
  }, []);

  //   update the data
  async function updateProfile(event) {
    event.preventDefault();
    const supabase = createClientComponentClient();
    setLoading(true);

    const updates = {
      id: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      btcAddress: btcAddress,
      phone_number: phoneNumber,
      currency: currency,
      country: country,
      city: city,
      address: address,
      zip_code: zipCode,
      isVerified: userVerifiedEnabled,
      depositEnabled: depositEnabled,
      withdrawEnabled: withdrawEnabled,
      tradeEnabled: tradeEnabled,
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
      setUpdatedSuccessfully("Profile updated successfully");
      toast.success("Profile updated successfully!", {
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
    <div className="flex flex-col gap-2 p-2">
      <AdminNav />
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* head */}
        <div className="flex flex-row justify-between items-center gap-40 py-8">
          <div className="w-fit shrink-0">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              All accounts
            </h2>
            <p className="font-light text-xl text-text">
              Manage accounts and their data here.
            </p>
          </div>
          <div className="w-full relative flex items-center">
            <Image
              src="/assets/icons/search.svg"
              height={16}
              width={16}
              alt="search"
              className="absolute left-8"
            />
            <input
              type="text"
              placeholder="Search users ..."
              className="w-full py-6 pl-16 pr-32 border border-border rounded-full text-xl text-darkBlack placeholder-darkBlack"
            />
            <button className="py-3 px-4 rounded-full bg-[#D8D8D8] text-darkGray absolute right-6 duration-300 transition-all hover:bg-gray">
              Search
            </button>
          </div>
          <button className="flex items-center justify-center shrink-0 px-8 py-6 gap-4 text-white bg-darkBlack rounded-full duration-300 transition-all hover:bg-darkGray">
            Add new account{" "}
            <Image
              src="/assets/icons/plus-light.svg"
              width={16}
              height={16}
              alt="plus icon"
            />
          </button>
        </div>
        {/* A table of accounts */}
        <div className="flex gap-[10px]">
          <div className="w-6/12">
            {/* Form */}
            <form
              onSubmit={(event) => updateProfile(event)}
              className="text-left flex flex-col gap-6"
            >
              <ToastContainer />
              {/* First name last name */}
              <div className="flex flex-col gap-6 md:flex-row w-full">
                <div className="flex flex-col w-full">
                  <label className="sr-only" htmlFor="firstName">
                    First Name <span className="text-[#C21515]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={firstName || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your name"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="sr-only" htmlFor="lastName">
                    Last Name <span className="text-[#C21515]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your surname"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="flex flex-col gap-6 md:flex-row w-full">
                <div className="flex flex-col w-full">
                  <label className="sr-only" htmlFor="email">
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
                  <label className="sr-only" htmlFor="btcAddress">
                    BTC Address
                  </label>
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
              </div>
              {/* Phone Number and Currency */}
              <div className="flex flex-col gap-6 md:flex-row w-full">
                <div className="flex flex-col w-full">
                  <label className="sr-only" htmlFor="phoneNumber">
                    Phone Number
                  </label>
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
                  <label className="sr-only" htmlFor="currency">
                    Currency
                  </label>
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
                  <label className="sr-only" htmlFor="country">
                    Country
                  </label>
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
                  <label className="sr-only" htmlFor="city">
                    City
                  </label>
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
                  <label className="sr-only" htmlFor="address">
                    Address
                  </label>
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
                  <label className="sr-only" htmlFor="zipCode">
                    ZIP Code
                  </label>
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
              <div className="w-full h-px bg-[#F0F0F0]"></div>
              {/* Account Settings */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Account settings</h3>
                <p className="text-sm">
                  Company BTC address assigned to this user
                </p>
                {/* BTC Address */}
                <div className="flex flex-col w-full">
                  <label className="sr-only" htmlFor="btcAddress">
                    BTC Address
                  </label>
                  <input
                    type="text"
                    name="btcAddress"
                    id="btcAddress"
                    placeholder="Enter the BTC address for this user"
                    className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              {/* Toggle buttons */}
              <div className="flex justify-between">
                {/* Deposit Toggle */}
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="depositToggle" className="text-sm">
                    Deposit
                  </label>
                  <Switch
                    checked={depositEnabled}
                    onChange={setDepositEnabled}
                    className={`${
                      depositEnabled
                        ? "bg-border border-transparent"
                        : "bg-white border-border"
                    }
          relative inline-flex h-[46px] w-[102px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        depositEnabled
                          ? "translate-x-16 translate-y-[6px] bg-primary"
                          : "translate-x-1 translate-y-[6px] bg-[#D9D9D9]"
                      }
            pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-primary shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                {/* Withdraw Toggle */}
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="withdrawToggle" className="text-sm">
                    Withdraw
                  </label>
                  <Switch
                    checked={withdrawEnabled}
                    onChange={setWithdrawEnabled}
                    className={`${
                      withdrawEnabled
                        ? "bg-border border-transparent"
                        : "bg-white border-border"
                    }
          relative inline-flex h-[46px] w-[102px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        withdrawEnabled
                          ? "translate-x-16 translate-y-[6px] bg-primary"
                          : "translate-x-1 translate-y-[6px] bg-[#D9D9D9]"
                      }
            pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-primary shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                {/* Trade Toggle */}
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="tradeToggle" className="text-sm">
                    Trade
                  </label>
                  <Switch
                    checked={tradeEnabled}
                    onChange={setTradeEnabled}
                    className={`${
                      tradeEnabled
                        ? "bg-border border-transparent"
                        : "bg-white border-border"
                    }
          relative inline-flex h-[46px] w-[102px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        tradeEnabled
                          ? "translate-x-16 translate-y-[6px] bg-primary"
                          : "translate-x-1 translate-y-[6px] bg-[#D9D9D9]"
                      }
            pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-primary shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                {/* User Verification Toggle */}
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="userVerificationToggle" className="text-sm">
                    User Verification
                  </label>
                  <Switch
                    checked={userVerifiedEnabled}
                    onChange={setUserVerifiedEnabled}
                    className={`${
                      userVerifiedEnabled
                        ? "bg-border border-transparent"
                        : "bg-white border-border"
                    }
          relative inline-flex h-[46px] w-[102px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        userVerifiedEnabled
                          ? "translate-x-16 translate-y-[6px] bg-primary"
                          : "translate-x-1 translate-y-[6px] bg-[#D9D9D9]"
                      }
            pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-primary shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
              </div>
              <div className="w-full h-px bg-[#F0F0F0]"></div>
              {/* Action buttons */}
              <div className="flex justify-between">
                <button
                  className="bg-darkBlack text-white py-4 px-6  flex items-center justify-center rounded-full duration-300 transition-all hover:bg-darkGray"
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Delete profile"}
                </button>
                <div className="flex gap-4">
                  <button
                    className="bg-gray py-4 px-6  flex items-center justify-center rounded-full duration-300 transition-all hover:bg-lightGray"
                    disabled={loading}
                  >
                    {loading ? "Loading ..." : "Disable user"}
                  </button>
                  <button
                    className="bg-primary py-4 px-6 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading ..." : "Save changes"}
                  </button>
                </div>
              </div>
              {/* {error && <p>{error}</p>}
              {updatedSuccessfully !== "" && (
                <p className="text-center text-green-500">
                  {updatedSuccessfully}
                </p>
              )} */}
            </form>
          </div>
          <div className="w-6/12">
            {/* tables */}
            <div className="px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
              {/* deposit table */}
              <div className="flex flex-col gap-[10px] col-span-2">
                <h3 className="font-medium tracking-tighter text-4xl">
                  Deposits
                </h3>
                <table className="table-auto w-full rounded-lg border border-border">
                  <thead className="text-left">
                    <tr className="bg-lightlightGray">
                      <th className="p-4 font-medium text-xl">
                        Amount inserted
                      </th>
                      <th className="hidden md:table-cell font-medium text-xl">
                        Date
                      </th>
                      <th className="font-medium text-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Completed</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Completed</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Completed</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* withdraw table */}
              <div className="flex flex-col gap-[10px] col-span-2">
                <h3 className="font-medium tracking-tighter text-4xl">
                  Withdraw
                </h3>
                <table className="table-auto w-full rounded-lg border border-border">
                  <thead className="text-left">
                    <tr className="bg-lightlightGray">
                      <th className="p-4 font-medium text-xl">
                        Amount inserted
                      </th>
                      <th className="hidden md:table-cell font-medium text-xl">
                        Date
                      </th>
                      <th className="font-medium text-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Active</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Active</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Active</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* trade table */}
              <div className="flex flex-col gap-[10px] col-span-2">
                <h3 className="font-medium tracking-tighter text-4xl">
                  Trades
                </h3>
                <table className="table-auto w-full rounded-lg border border-border">
                  <thead className="text-left">
                    <tr className="bg-lightlightGray">
                      <th className="p-4 font-medium text-xl">
                        Amount inserted
                      </th>
                      <th className="hidden md:table-cell font-medium text-xl">
                        Date
                      </th>
                      <th className="font-medium text-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Active</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Active</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Active</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-lg">BTC 0.002</td>
                      <td className="hidden md:table-cell text-lg">
                        03 December, 2023
                      </td>
                      <td className="text-lg">Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
