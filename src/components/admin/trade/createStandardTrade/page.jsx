import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateStandardTrade({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState();
  const [amountError, setAmountError] = useState("");

  const supabase = createClientComponentClient();
  const router = useParams();

  // fetch user's balance
  useEffect(() => {
    async function fetchData() {
      const { data: user } = await supabase
        .from("profile")
        .select("*")
        .eq("id", router.id)
        .single();
      setBalance(user.balance);
    }
    fetchData();
  }, [supabase]);

  //   Create Standard Trade
  async function createStandardTrade(event) {
    event.preventDefault();
    const { data: user } = await supabase
      .from("profile")
      .select("*")
      .eq("id", router.id);
    setBalance(user.balance);

    const updates = {
      profile: router.id,
      trade_status: "open",
      trade_option: "standard",
      amount: amount,
    };

    const { error } = await supabase.from("trade").insert(updates);

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
      toast.success("Standard Trade started successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const newBalance = balance - amount;
      const balanceUpdate = {
        id: router.id,
        balance: newBalance,
      };
      const { error: error3 } = await supabase
        .from("profile")
        .upsert(balanceUpdate);
      setBalance(newBalance);
      onSuccess();
    }
  }

  useEffect(() => {
    if (amount < 0.1 || amount > balance || amount === "") {
      setAmountError(`Please write an amount between 0,1 and ${balance} BTC`);
    } else {
      setAmountError("");
    }
  }, [amount, balance]);

  return (
    <div>
      <div className="mb-[10px] text-darkBlack">
        <p className="text-xl font-bold">BTC amount</p>
        <p className="text-sm">
          Add the BTC amount you want to start the trade with
        </p>
      </div>
      <div className="flex gap-[10px]">
        <input
          className="w-full p-4 border border-border rounded-[4px]"
          type="number"
          min="0.1"
          max={balance}
          step={0.1}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />{" "}
        <button
          onClick={() => setAmount(balance)}
          className="bg-lightlightGray duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px] disabled:bg-lightlightGray disabled:cursor-not-allowed"
        >
          MAX
        </button>
      </div>
      {/* Amount error */}
      {amountError && <p className="text-red-600">{amountError}</p>}
      {/* Divider */}
      <div className="w-full bg-gray h-px mt-8 mb-6"></div>
      <button
        onClick={createStandardTrade}
        disabled={amountError}
        className="bg-primary py-4 px-6 w-full flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-lightGray disabled:cursor-not-allowed"
        type="submit"
      >
        Start new trade
      </button>
    </div>
  );
}

export default CreateStandardTrade;
