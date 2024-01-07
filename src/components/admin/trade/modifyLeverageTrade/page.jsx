import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

function ModifyLeverageTrade({ selectedTradeID, selectedUserTradeID }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [btcAddress, setBtcAddress] = useState("");

  const [amount, setAmount] = useState();
  const [tradeOption, setTradeOption] = useState("");
  const [leverageOption, setLeverageOption] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [outcome, setOutcome] = useState();
  const [total, setTotal] = useState();

  console.log("Leverage Option:", leverageOption);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchTrade() {
      const { data } = await supabase
        .from("trade")
        .select("*")
        .eq("id", selectedTradeID);
      console.log("Trade:", data);
      setAmount(data[0].amount);
      setTradeOption(data[0].trade_option);
      setLeverageOption(data[0].leverage_options);
    }
    fetchTrade();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", selectedUserTradeID);
      setFirstName(data[0].first_name);
      setLastName(data[0].last_name);
      setEmail(data[0].email);
      setBtcAddress(data[0].btcAddress);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    // Calculate outcome and total whenever percentage changes
    const calculateValues = () => {
      const percentageValue = (percentage / 100) * amount + amount - amount;
      setOutcome(percentageValue);
      // Calculate the difference between amount and outcome
      const difference = amount + percentageValue;
      setTotal(difference); // Update total with the difference
    };

    // Trigger calculation initially and whenever percentage changes
    calculateValues();
  }, [amount, percentage]);

  return (
    <div className="flex flex-col gap-8">
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-[10px]">
          <p className="text-xl font-bold text-darkBlack">Account details</p>

          <div className="flex gap-[10px]">
            <input
              className="w-full p-4 border border-border rounded-[4px]"
              type="text"
              required
              value={firstName}
              placeholder="First name"
            />
            <input
              className="w-full p-4 border border-border rounded-[4px]"
              type="text"
              required
              value={lastName}
              placeholder="Last name"
            />
          </div>
          <div className="flex gap-[10px]">
            <input
              className="w-full p-4 border border-border rounded-[4px]"
              type="email"
              required
              value={email}
              placeholder="Email"
            />
            <input
              className="w-full p-4 border border-border rounded-[4px]"
              type="text"
              required
              value={btcAddress}
              placeholder="Bitcoin Address"
            />
          </div>
          <div className="flex gap-[10px]">
            <input
              className="w-full p-4 border border-border rounded-[4px]"
              type="text"
              required
              value={`${amount} BTC`}
              placeholder="Amount"
            />
            <input
              className="w-full p-4 border border-border rounded-[4px] capitalize"
              type="text"
              required
              value={`${tradeOption} trade`}
              placeholder="Trade Option"
            />
          </div>
          {/* Divider */}
          <div className="w-full bg-gray h-px my-6"></div>

          {/* Settings */}
          <div>
            <p className="text-xl font-bold text-darkBlack">Settings</p>
            <p className="text-sm">
              Enter the amount in plus or minus and stop the trade.
            </p>
          </div>

          <div className="flex gap-[10px]">
            {/* Entered */}
            <div className="inline-flex border border-border rounded-[4px]">
              <p className="p-4">Entered</p>
              <p className="p-4 font-bold bg-border">{amount} BTC</p>
            </div>
            {/* Outcome */}
            <div className="inline-flex border border-border rounded-[4px]">
              <p className="p-4">Outcome</p>
              <p className="p-4 font-bold bg-border">
                {outcome ? `${outcome.toFixed(4)} BTC` : "0.0 BTC"}
              </p>
            </div>
            {/* Total */}
            <div className="inline-flex border border-border rounded-[4px]">
              <p className="p-4">Total</p>
              <p className="p-4 font-bold bg-border">
                {total ? `${total.toFixed(4)} BTC` : "0.0 BTC"}
              </p>
            </div>
          </div>

          {/* Slider functionality */}
          <div className="flex gap-6 items-center">
            <div class="relative w-full">
              <label for="labels-range-input" class="sr-only">
                Labels range
              </label>
              <input
                id="labels-range-input"
                type="range"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                min="-100"
                max={
                  leverageOption === "x2"
                    ? "200"
                    : leverageOption === "x5"
                    ? "500"
                    : "1000"
                }
                step="0.1"
                class="w-full h-px mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer bg-darkBlack [&::-webkit-slider-thumb]:bg-primary"
              />
              <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-[7px]">
                -100%
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-[7px]">
                {leverageOption === "x2"
                  ? "+200%"
                  : leverageOption === "x5"
                  ? "+500%"
                  : "+1000%"}
              </span>
            </div>
            <input
              type="text"
              value={percentage}
              className="w-32 p-4 border border-border rounded-[4px]"
              onChange={(e) => {
                setPercentage(e.target.value);
              }}
            />
            <button className="bg-primary py-4 px-6 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow">
              Stop
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModifyLeverageTrade;
