"use client";
import AdminNav from "@/components/admin/nav/page";
import { usePathname, useParams } from "next/navigation";
import { Switch, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { parseISO, format, set } from "date-fns";
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
  const [balance, setBalance] = useState();
  const [companyBtcAddress, setCompanyBtcAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [depositEnabled, setDepositEnabled] = useState();
  const [withdrawEnabled, setWithdrawEnabled] = useState();
  const [tradeEnabled, setTradeEnabled] = useState();
  const [userVerifiedEnabled, setUserVerifiedEnabled] = useState();
  const [loading, setLoading] = useState(false);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState();
  const [error, setError] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  // deposit data
  const [currentDepositStatus, setCurrentDepositStatus] = useState();
  const [currentDepositId, setCurrentDepositId] = useState();
  const [newDepositStatus, setNewDepositStatus] = useState("");
  const [currentDepositAmount, setCurrentDepositAmount] = useState();

  // fetch the id
  const router = useParams();

  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { data: deposits } = await supabase
        .from("deposits")
        .select("*")
        .eq("profile", router.id);

      const { data: withdraws } = await supabase
        .from("withdraw")
        .select("*")
        .eq("profile", router.id);
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", router.id)
        .single();

      const user = data;
      setWithdraws(withdraws);
      setDeposits(deposits);
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
      setBalance(user.balance);
      setCompanyBtcAddress(user.company_btc_address);
      setDepositEnabled(user.depositEnabled);
      setWithdrawEnabled(user.withdrawEnabled);
      setTradeEnabled(user.tradeEnabled);
      setUserVerifiedEnabled(user.isVerified);
    }
    fetchData();
  }, [router.id]);

  //   update the data
  async function updateProfile(event) {
    event.preventDefault();
    const supabase = createClientComponentClient();
    setLoading(true);

    const updates = {
      id: router.id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      btcAddress: btcAddress,
      phone_number: phoneNumber,
      currency: currency,
      country: country,
      city: city,
      address: address,
      company_btc_address: companyBtcAddress,
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

  // Change status of the deposit
  async function changeDepositStatus() {
    console.log("Current Deposit Status", currentDepositStatus);
    console.log("Current Deposit Id", currentDepositId);
    console.log("New Deposit Status", newDepositStatus);
    console.log("Current Deposit Amount", currentDepositAmount);

    const supabase = createClientComponentClient();
    const updates = {
      id: currentDepositId,
      status: newDepositStatus,
    };

    const { error } = await supabase.from("deposits").upsert(updates);

    if (error) {
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
      toast.success("Status updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const { data: deposits } = await supabase
        .from("deposits")
        .select("*")
        .eq("profile", router.id);

      setDeposits(deposits);

      if (newDepositStatus === "completed") {
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("id", router.id)
          .single();

        const newBalance = balance + currentDepositAmount;
        const updates = {
          id: router.id,
          balance: newBalance,
        };
        const { error: error3 } = await supabase
          .from("profile")
          .upsert(updates);
        setBalance(newBalance);
      } else if (
        (currentDepositStatus === "completed" &&
          newDepositStatus === "pending") ||
        (currentDepositStatus === "completed" &&
          newDepositStatus === "declined")
      ) {
        const lowBalance = balance - currentDepositAmount;
        const updates = {
          id: router.id,
          balance: lowBalance,
        };
        const { error: error2 } = await supabase
          .from("profile")
          .upsert(updates);
        setBalance(lowBalance);
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <AdminNav />
      {/* head */}
      <div className="flex flex-row justify-between items-center gap-10 py-8 bg-lightlightGray rounded-2xl px-8">
        <div className="w-6/12 shrink-0">
          <h2 className="font-regular text-5xl text-darkBlack tracking-tighter flex gap-[10px]">
            Balance in BTC <span className="font-bold">{balance} BTC</span>
          </h2>
        </div>
        <div className="w-6/12 shrink-0">
          <h2 className="font-regular text-5xl text-darkBlack tracking-tighter">
            Balance in Euro
          </h2>
        </div>
      </div>
      <div className="w-full px-4 md:px-6 lg:px-8">
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
                    value={companyBtcAddress}
                    onChange={(e) => setCompanyBtcAddress(e.target.value)}
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
                {/* table */}
                {deposits.length > 0 ? (
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
                      {deposits.map((deposit) => (
                        <tr key={deposit.id} className="border-b border-border">
                          <td className="p-4 text-lg">BTC {deposit.amount}</td>
                          <td className="hidden md:table-cell text-lg">
                            {format(
                              parseISO(deposit.created_date),
                              "d LLLL, yyyy"
                            )}
                          </td>
                          <td>
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button
                                  className={`text-lg flex items-center gap-1.5
                      ${
                        deposit.status === "pending"
                          ? "bg-[#E7E9E5] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      } ${
                                    deposit.status === "completed"
                                      ? "bg-[#D3FFCE] px-4 py-1 rounded-lg text-darkBlack capitalize"
                                      : ""
                                  } ${
                                    deposit.status === "declined"
                                      ? "bg-[#FFCED3] px-4 py-1 rounded-lg text-darkBlack capitalize"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setCurrentDepositStatus(deposit.status);
                                    setCurrentDepositId(deposit.id);
                                    setCurrentDepositAmount(deposit.amount);
                                  }}
                                >
                                  {deposit.status}
                                  <ChevronDownIcon
                                    className="-mr-1 ml-2 h-5 w-5 text-darkBlack hover:text-violet-100"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg z-50 ring-1 ring-black/5 focus:outline-none">
                                  <div className="px-1 py-1">
                                    {deposit.status === "completed" && (
                                      <>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                changeDepositStatus()
                                              }
                                              onMouseEnter={() => {
                                                setNewDepositStatus("pending");
                                              }}
                                              className={`${
                                                active
                                                  ? "bg-primary text-darkBlack"
                                                  : "text-gray-900"
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Pending
                                            </button>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                changeDepositStatus()
                                              }
                                              onMouseEnter={() => {
                                                setNewDepositStatus("declined");
                                              }}
                                              className={`${
                                                active
                                                  ? "bg-primary text-darkBlack"
                                                  : "text-gray-900"
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Declined
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </>
                                    )}
                                    {deposit.status === "pending" && (
                                      <>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                changeDepositStatus()
                                              }
                                              onMouseEnter={() =>
                                                setNewDepositStatus("completed")
                                              }
                                              className={`${
                                                active
                                                  ? "bg-primary text-darkBlack"
                                                  : "text-gray-900"
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Completed
                                            </button>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                changeDepositStatus()
                                              }
                                              onMouseEnter={() =>
                                                setNewDepositStatus("declined")
                                              }
                                              className={`${
                                                active
                                                  ? "bg-primary text-darkBlack"
                                                  : "text-gray-900"
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Declined
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </>
                                    )}
                                    {deposit.status === "declined" && (
                                      <>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                changeDepositStatus()
                                              }
                                              onMouseEnter={() =>
                                                setNewDepositStatus("completed")
                                              }
                                              className={`${
                                                active
                                                  ? "bg-primary text-darkBlack"
                                                  : "text-gray-900"
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Completed
                                            </button>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                changeDepositStatus()
                                              }
                                              onMouseEnter={() =>
                                                setNewDepositStatus("pending")
                                              }
                                              className={`${
                                                active
                                                  ? "bg-primary text-darkBlack"
                                                  : "text-gray-900"
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Pending
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </>
                                    )}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 border border-border text-xl text-center rounded-lg">
                    There&apos;s no deposits made yet
                  </div>
                )}
              </div>
              {/* withdraw table */}
              <div className="flex flex-col gap-[10px] col-span-2">
                <h3 className="font-medium tracking-tighter text-4xl">
                  Withdraw
                </h3>
                {/* table */}
                {withdraws.length > 0 ? (
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
                      {withdraws.map((withdraw) => (
                        <tr
                          key={withdraw.id}
                          className="border-b border-border"
                        >
                          <td className="p-4 text-lg">BTC {withdraw.amount}</td>
                          <td className="hidden md:table-cell text-lg">
                            {format(
                              parseISO(withdraw.created_at),
                              "d LLLL, yyyy"
                            )}
                          </td>
                          <td>
                            <span
                              className={`text-lg flex w-fit gap-1.5
                      ${
                        withdraw.status === "pending"
                          ? "bg-[#E7E9E5] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      } ${
                                withdraw.status === "completed"
                                  ? "bg-[#D3FFCE] px-4 py-1 rounded-lg text-darkBlack capitalize"
                                  : ""
                              } ${
                                withdraw.status === "declined"
                                  ? "bg-[#FFCED3] px-4 py-1 rounded-lg text-darkBlack capitalize"
                                  : ""
                              }`}
                            >
                              {withdraw.status === "completed" ? (
                                <Image
                                  src="/assets/icons/check.svg"
                                  height={20}
                                  width={20}
                                  alt="Completed"
                                />
                              ) : withdraw.status === "pending" ? (
                                <Image
                                  src="/assets/icons/pending.svg"
                                  height={20}
                                  width={20}
                                  alt="Pending"
                                />
                              ) : (
                                <Image
                                  src="/assets/icons/xmark.svg"
                                  height={20}
                                  width={20}
                                  alt="Declined"
                                />
                              )}
                              {withdraw.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 border border-border text-xl text-center rounded-lg">
                    There&apos;s no withdrawals made yet
                  </div>
                )}
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
