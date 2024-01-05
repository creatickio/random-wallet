"use client";
import AdminNav from "@/components/admin/nav/page";
import { usePathname, useParams } from "next/navigation";
import { Dialog, Switch, Menu, Transition, Tab } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { parseISO, format, set } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import CreateStandardTrade from "@/components/admin/trade/createStandardTrade/page";
import CreateLeverageTrade from "@/components/admin/trade/createLeverageTrade/page";
import CreateAITrade from "@/components/admin/trade/createAITrade/page";

export default function Profile() {
  // fetch the id
  const router = useParams();
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
  const [trades, setTrades] = useState([]);

  // withdraw data
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [currentWithdrawStatus, setCurrentWithdrawStatus] = useState();
  const [currentWithdrawId, setCurrentWithdrawId] = useState();
  const [newWithdrawStatus, setNewWithdrawStatus] = useState("");
  const [currentWithdrawAmount, setCurrentWithdrawAmount] = useState();
  const [addWithdrawAmount, setAddWithdrawAmount] = useState();
  const [addWithdrawAddress, setAddWithdrawAddress] = useState();

  function closeWithdrawModal() {
    setIsWithdrawModalOpen(false);
  }
  function openWithdrawModal() {
    setIsWithdrawModalOpen(true);
  }

  async function createNewWithdraw(e) {
    // e.preventDefault();
    const supabase = createClientComponentClient();
    const updates = {
      profile: router.id,
      amount: addWithdrawAmount,
      withdraw_address: addWithdrawAddress,
    };

    const { error } = await supabase.from("withdraw").upsert(updates);

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
      toast.success("Withdraw created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsWithdrawModalOpen(false);
      // Update balance on success withdraw
      const newBalance = balance - addWithdrawAmount;
      const updates = {
        id: router.id,
        balance: newBalance,
      };
      const { error: error3 } = await supabase.from("profile").upsert(updates);
    }
  }

  // Change status of the withdraw
  async function changeWithdrawStatus() {
    console.log("Current Withdraw Status", currentWithdrawStatus);
    console.log("Current Withdraw Id", currentWithdrawId);
    console.log("New Withdraw Status", newWithdrawStatus);
    console.log("Current Withdraw Amount", currentWithdrawAmount);

    const supabase = createClientComponentClient();
    const updates = {
      id: currentWithdrawId,
      status: newWithdrawStatus,
    };

    const { error } = await supabase.from("withdraw").upsert(updates);

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
      const { data: withdraw } = await supabase
        .from("withdraw")
        .select("*")
        .eq("profile", router.id);

      setWithdraws(withdraw);

      if (newWithdrawStatus === "declined") {
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("id", router.id)
          .single();

        const newBalance = balance + currentWithdrawAmount;
        const updates = {
          id: router.id,
          balance: newBalance,
        };
        const { error: error3 } = await supabase
          .from("profile")
          .upsert(updates);
        setBalance(newBalance);
      } else if (
        (currentWithdrawStatus === "declined" &&
          newWithdrawStatus === "pending") ||
        (currentWithdrawStatus === "declined" &&
          newWithdrawStatus === "completed")
      ) {
        const lowBalance = balance - currentWithdrawAmount;
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

  // deposit data
  const [currentDepositStatus, setCurrentDepositStatus] = useState();
  const [currentDepositId, setCurrentDepositId] = useState();
  const [newDepositStatus, setNewDepositStatus] = useState("");
  const [currentDepositAmount, setCurrentDepositAmount] = useState();
  const [addDepositAmount, setAddDepositAmount] = useState();

  // deposit modal state
  let [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  function closeDepositModal() {
    setIsDepositModalOpen(false);
  }
  function openDepositModal() {
    setIsDepositModalOpen(true);
  }

  async function createNewDeposit(e) {
    // e.preventDefault();
    const supabase = createClientComponentClient();
    const updates = {
      profile: router.id,
      amount: addDepositAmount,
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
      toast.success("Deposit added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsDepositModalOpen(false);
    }
  }

  let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

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

      const { data: trades } = await supabase
        .from("trade")
        .select("*")
        .eq("profile", session.user.id);

      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", router.id)
        .single();

      const user = data;
      setWithdraws(withdraws);
      setDeposits(deposits);
      setTrades(trades);
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

  const [btcPrice, setBtcPrice] = useState();

  // convert btc to ${currency}
  useEffect(() => {
    async function convertBtcToCurrency() {
      const cryptoFetch = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`
      );
      const cryptoData = await cryptoFetch.json();
      const btcPrice = cryptoData.bitcoin;
      return setBtcPrice(btcPrice);
    }
    convertBtcToCurrency();
  }, [currency]);

  console.log(btcPrice);

  function getCovertedPrice() {
    if (currency === "EUR") {
      return (
        <div className="flex gap-2">
          <span>€</span>
          <span>{(balance * btcPrice.eur).toLocaleString()}</span>
        </div>
      );
    } else if (currency === "CHF") {
      return (
        <div className="flex gap-2">
          <span>₣</span>
          <span>{(balance * btcPrice.chf).toLocaleString()}</span>
        </div>
      );
    } else if (currency === "GBP") {
      return (
        <div className="flex gap-2">
          <span>£</span>
          <span>{(balance * btcPrice.gbp).toLocaleString()}</span>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2">
          <span>$</span>
          <span>{(balance * btcPrice.usd).toLocaleString()}</span>
        </div>
      );
    }
  }

  // trade functionality
  let [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  function closeTradeModal() {
    setIsTradeModalOpen(false);
  }

  function openTradeModal() {
    setIsTradeModalOpen(true);
  }

  // update balance and trades list
  async function updateBalanceAndTrades() {
    const supabase = createClientComponentClient();
    const { data: trades } = await supabase
      .from("trade")
      .select("*")
      .eq("profile", router.id);

    const { data: profile } = await supabase
      .from("profile")
      .select("*")
      .eq("id", router.id)
      .single();

    setTrades(trades);
    setBalance(profile.balance);
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
          <h2 className="font-regular flex gap-[10px] text-5xl text-darkBlack tracking-tighter">
            Balance in {currency}{" "}
            <span className="font-bold">{btcPrice && getCovertedPrice()}</span>
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
                {/* TODO: Add the functionality to delete the profile */}
                <button
                  className="bg-darkBlack text-white py-4 px-6  flex items-center justify-center rounded-full duration-300 transition-all hover:bg-darkGray"
                  disabled={loading}
                  onClick={openDeleteModal}
                >
                  {loading ? "Loading ..." : "Delete profile"}
                </button>
                <div className="flex gap-4">
                  {/* Disable user has been depricated because there's no option in supabase */}
                  {/* <button
                    className="bg-gray py-4 px-6  flex items-center justify-center rounded-full duration-300 transition-all hover:bg-lightGray"
                    disabled={loading}
                  >
                    {loading ? "Loading ..." : "Disable user"}
                  </button> */}
                  <button
                    className="bg-primary py-4 px-6 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading ..." : "Save changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="w-6/12">
            {/* tables */}
            <div className="pl-8 grid grid-cols-1 lg:grid-cols-2 gap-16 py-8">
              {/* deposit table */}
              <div className="flex flex-col gap-[10px] col-span-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium tracking-tighter text-4xl">
                    Deposits
                  </h3>
                  <button
                    onClick={openDepositModal}
                    className="flex gap-4 items-center bg-darkBlack w-full lg:w-fit justify-center rounded-full py-6 px-8 text-white font-medium text-xl duration-300 transition-all hover:opacity-70"
                  >
                    New deposit
                    <Image
                      src="/assets/icons/plus-light.svg"
                      height={16}
                      width={16}
                      alt="Trade"
                    />
                  </button>
                </div>
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
                      {deposits
                        .sort(
                          (a, b) =>
                            new Date(b.created_date) - new Date(a.created_date)
                        )
                        .map((deposit) => (
                          <tr
                            key={deposit.id}
                            className="border-b border-border"
                          >
                            <td className="p-4 text-lg">
                              BTC {deposit.amount}
                            </td>
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
                                                  setNewDepositStatus(
                                                    "pending"
                                                  );
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
                                                  setNewDepositStatus(
                                                    "declined"
                                                  );
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
                                                  setNewDepositStatus(
                                                    "completed"
                                                  )
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
                                                  setNewDepositStatus(
                                                    "declined"
                                                  )
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
                                                  setNewDepositStatus(
                                                    "completed"
                                                  )
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
                <div className="flex justify-between items-center">
                  <h3 className="font-medium tracking-tighter text-4xl">
                    Withdraws
                  </h3>
                  <button
                    onClick={openWithdrawModal}
                    className="flex gap-4 items-center bg-darkBlack w-full lg:w-fit justify-center rounded-full py-6 px-8 text-white font-medium text-xl duration-300 transition-all hover:opacity-70"
                  >
                    New withdraw
                    <Image
                      src="/assets/icons/plus-light.svg"
                      height={16}
                      width={16}
                      alt="Trade"
                    />
                  </button>
                </div>
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
                      {withdraws
                        .sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((withdraw) => (
                          <tr
                            key={withdraw.id}
                            className="border-b border-border"
                          >
                            <td className="p-4 text-lg">
                              BTC {withdraw.amount}
                            </td>
                            <td className="hidden md:table-cell text-lg">
                              {format(
                                parseISO(withdraw.created_at),
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
                                    onClick={() => {
                                      setCurrentWithdrawStatus(withdraw.status);
                                      setCurrentWithdrawId(withdraw.id);
                                      setCurrentWithdrawAmount(withdraw.amount);
                                    }}
                                  >
                                    {withdraw.status}
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
                                      {withdraw.status === "completed" && (
                                        <>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <button
                                                onClick={() =>
                                                  changeWithdrawStatus()
                                                }
                                                onMouseEnter={() => {
                                                  setNewWithdrawStatus(
                                                    "pending"
                                                  );
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
                                                  changeWithdrawStatus()
                                                }
                                                onMouseEnter={() => {
                                                  setNewWithdrawStatus(
                                                    "declined"
                                                  );
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
                                      {withdraw.status === "pending" && (
                                        <>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <button
                                                onClick={() =>
                                                  changeWithdrawStatus()
                                                }
                                                onMouseEnter={() =>
                                                  setNewWithdrawStatus(
                                                    "completed"
                                                  )
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
                                                  changeWithdrawStatus()
                                                }
                                                onMouseEnter={() =>
                                                  setNewWithdrawStatus(
                                                    "declined"
                                                  )
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
                                      {withdraw.status === "declined" && (
                                        <>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <button
                                                onClick={() =>
                                                  changeWithdrawStatus()
                                                }
                                                onMouseEnter={() =>
                                                  setNewWithdrawStatus(
                                                    "completed"
                                                  )
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
                                                  changeWithdrawStatus()
                                                }
                                                onMouseEnter={() =>
                                                  setNewWithdrawStatus(
                                                    "pending"
                                                  )
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
                    There&apos;s no withdrawals made yet
                  </div>
                )}
              </div>
              {/* trade table */}
              <div className="flex flex-col gap-[10px] col-span-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium tracking-tighter text-4xl">
                    Trades
                  </h3>
                  <button
                    onClick={() => setIsTradeModalOpen(true)}
                    className="flex gap-4 items-center bg-darkBlack w-full lg:w-fit justify-center rounded-full py-6 px-8 text-white font-medium text-xl duration-300 transition-all hover:opacity-70"
                  >
                    New trade
                    <Image
                      src="/assets/icons/plus-light.svg"
                      height={16}
                      width={16}
                      alt="Trade"
                    />
                  </button>
                </div>
                {trades.length > 0 ? (
                  <table className="table-auto w-full rounded-lg border border-border">
                    <thead className="text-left">
                      <tr className="bg-lightlightGray">
                        <th className="p-4 font-medium text-xl">
                          Amount inserted
                        </th>
                        <th className="hidden md:table-cell font-medium text-xl">
                          Date
                        </th>
                        <th className="font-medium text-xl">Trade option</th>
                        <th className="font-medium text-xl">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trades
                        .sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((trade) => (
                          <tr key={trade.id} className="border-b border-border">
                            <td className="p-4 text-lg">
                              <Link
                                href={`/dashboard/trade/${trade.id}`}
                                className="block"
                              >
                                BTC {trade.amount}
                              </Link>
                            </td>
                            <td className="hidden md:table-cell text-lg capitalize">
                              <Link
                                href={`/dashboard/trade/${trade.id}`}
                                className="block"
                              >
                                {format(
                                  parseISO(trade.created_at),
                                  "d LLLL, yyyy"
                                )}
                              </Link>
                            </td>
                            <td className="text-lg capitalize">
                              <Link
                                href={`/dashboard/trade/${trade.id}`}
                                className="block"
                              >
                                {" "}
                                {trade.trade_option === "ai" ? (
                                  <span className="uppercase">
                                    {trade.trade_option}
                                  </span>
                                ) : (
                                  trade.trade_option
                                )}
                              </Link>
                            </td>
                            <td className="w-[120px]">
                              <Link href={`/dashboard/trade/${trade.id}`}>
                                <span
                                  className={`text-lg flex w-fit gap-1.5
                      ${
                        trade.trade_status === "close"
                          ? "bg-[#E7E9E5] px-4 py-1 rounded-lg text-darkBlack capitalize"
                          : ""
                      } ${
                                    trade.trade_status === "open"
                                      ? "bg-[#D3FFCE] px-4 py-1 rounded-lg text-darkBlack capitalize"
                                      : ""
                                  }`}
                                >
                                  {trade.trade_status === "open" ? (
                                    <Image
                                      src="/assets/icons/check.svg"
                                      height={20}
                                      width={20}
                                      alt="Completed"
                                    />
                                  ) : trade.trade_status === "close" ? (
                                    <Image
                                      src="/assets/icons/pending.svg"
                                      height={20}
                                      width={20}
                                      alt="Pending"
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {trade.trade_status}
                                </span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 border border-border text-xl text-center rounded-lg">
                    There&apos;s no trades made yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Deposit Modal */}
      <Transition appear show={isDepositModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDepositModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center bg-lightlightGray p-4 rounded-2xl">
                    <p className="text-2xl">Add new deposit</p>
                    <div
                      onClick={closeDepositModal}
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
                    <form
                      onSubmit={createNewDeposit}
                      className="flex flex-col gap-8"
                    >
                      <div className="flex flex-col gap-[10px]">
                        <p className="text-xl font-bold text-darkBlack">
                          Deposit amount
                        </p>
                        <p className="text-sm">
                          Enter the BTC amount for deposit
                        </p>
                        <input
                          className="w-full p-4 border border-border rounded-[4px]"
                          type="number"
                          required
                          onChange={(e) => setAddDepositAmount(e.target.value)}
                          placeholder="BTC amount"
                        />
                      </div>
                      {/* Divider */}
                      <div className="w-full bg-gray h-px"></div>
                      {/* proceed withdraw */}
                      <button className="text-darkBlack bg-primary font-medium text-xl rounded-full p-4 flex items-center justify-center gap-4 duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed ">
                        Add deposit
                        <Image
                          src="/assets/icons/arrow-right.svg"
                          height={16}
                          width={16}
                          alt="Arrow Right"
                        />
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Withdraw Modal */}
      <Transition appear show={isWithdrawModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeWithdrawModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center bg-lightlightGray p-4 rounded-2xl">
                    <p className="text-2xl">Add new withdraw</p>
                    <div
                      onClick={closeWithdrawModal}
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
                    <form
                      onSubmit={createNewWithdraw}
                      className="flex flex-col gap-8"
                    >
                      <div className="flex flex-col gap-[10px]">
                        <p className="text-xl font-bold text-darkBlack">
                          Withdraw amount
                        </p>
                        {/* amount row */}
                        <div className="flex flex-col gap-2">
                          <p className="text-sm">
                            Enter the BTC amount to withdraw
                          </p>
                          <div className="flex gap-[10px]">
                            <input
                              className="w-full p-4 border border-border rounded-[4px] appearance-none"
                              type="number"
                              min="0.1"
                              max={balance}
                              step={0.1}
                              placeholder="BTC amount"
                              value={addWithdrawAmount}
                              onChange={(e) =>
                                setAddWithdrawAmount(e.target.value)
                              }
                            />{" "}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setAddWithdrawAmount(balance);
                              }}
                              className="bg-lightlightGray duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px] disabled:bg-lightlightGray disabled:cursor-not-allowed"
                            >
                              MAX
                              <Image
                                src="/assets/icons/dollar-sign-yellow.svg"
                                height={16}
                                width={16}
                                alt="Dollar Icon"
                              />
                            </button>
                          </div>
                          {/* Amount error */}
                          {/* <p className="text-red-600">Error here</p> */}
                        </div>
                        <div>
                          <p className="text-sm">Enter the BTC address</p>
                          <input
                            className="w-full p-4 border border-border rounded-[4px]"
                            type="text"
                            required
                            value={
                              !addWithdrawAddress
                                ? btcAddress
                                : addWithdrawAddress
                            }
                            onChange={(e) =>
                              setAddWithdrawAddress(e.target.value)
                            }
                            placeholder="BTC address"
                          />
                        </div>
                      </div>
                      {/* Divider */}
                      <div className="w-full bg-gray h-px"></div>
                      {/* proceed withdraw */}
                      <button className="text-darkBlack bg-primary font-medium text-xl rounded-full p-4 flex items-center justify-center gap-4 duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed ">
                        Withdraw
                        <Image
                          src="/assets/icons/arrow-right.svg"
                          height={16}
                          width={16}
                          alt="Arrow Right"
                        />
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete a user Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl flex flex-col gap-8 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-center items-center bg-lightlightGray p-4 rounded-2xl text-center">
                    <p className="text-2xl text-center">
                      Are you sure you want to delete this account?
                    </p>
                  </div>
                  {/* Divider */}
                  <div className="w-full bg-gray h-px"></div>
                  <div className="flex items-center gap-4 justify-center">
                    {/* don't delete account */}
                    <button className="text-darkBlack bg-gray font-medium text-xl rounded-full p-4 flex items-center justify-center gap-1 duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed ">
                      <span className="font-bold">NO</span> - Close this window
                    </button>
                    {/* delete account */}
                    <button className="text-darkBlack bg-primary font-medium text-xl rounded-full p-4 flex items-center justify-center gap-1 duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed ">
                      <span className="font-bold">YES</span> - Delete Account
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Trade Modal */}
      <Transition appear show={isTradeModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeTradeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl flex flex-col gap-8 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center bg-lightlightGray p-4 rounded-2xl">
                    <p className="text-2xl text-center">Add new trade</p>
                    <div
                      onClick={closeTradeModal}
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
                  {/* Divider */}
                  <div className="w-full bg-gray h-px"></div>
                  <div className="-mb-6 text-darkBlack">
                    <p className="text-xl font-bold">Choose trading option</p>
                    <p className="text-sm">
                      Select one trading option to do the trade
                    </p>
                  </div>
                  <Tab.Group>
                    <Tab.List className="grid grid-cols-3 gap-4">
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "bg-primary text-darkBlack py-6 rounded font-bold text-2xl focus-visible:outline-none"
                                : "bg-lightlightGray text-darkBlack py-6 rounded font-bold text-2xl focus-visible:outline-none"
                            }
                          >
                            Standard
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "bg-primary text-darkBlack py-6 rounded font-bold text-2xl focus-visible:outline-none"
                                : "bg-lightlightGray text-darkBlack py-6 rounded font-bold text-2xl focus-visible:outline-none"
                            }
                          >
                            AI
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "bg-primary text-darkBlack py-6 rounded font-bold text-2xl focus-visible:outline-none"
                                : "bg-lightlightGray text-darkBlack py-6 rounded font-bold text-2xl focus-visible:outline-none"
                            }
                          >
                            Leverage
                          </button>
                        )}
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <CreateStandardTrade
                          onSuccess={() => {
                            closeTradeModal(), updateBalanceAndTrades();
                          }}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <CreateAITrade />
                      </Tab.Panel>
                      <Tab.Panel>
                        <CreateLeverageTrade />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
