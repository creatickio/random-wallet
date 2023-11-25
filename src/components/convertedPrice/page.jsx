"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

export default function ConvertedPrice() {
  const [balance, setBalance] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [btcPrice, setBtcPrice] = useState(null);
  //   console.log(balance);
  //   console.log(currency);
  console.log(btcPrice);

  /* TODO:  1. Fetch the crypto price
            2. Wait for the crypto data and covert to json
            3. Set the btcPrice to $btcPrice
  */
  async function cryptoFetch() {
    const cryptoData = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`
    );
    console.log(cryptoData);
  }
  cryptoFetch();

  useEffect(() => {
    async function fetchBalance() {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from("profile")
        .select("balance, currency")
        .single();

      if (error) {
        console.error(error);
      } else {
        setBalance(data.balance);
        setCurrency(data.currency);
      }
    }

    fetchBalance();
  }, []);

  function getCovertedPrice() {
    if (currency === "EUR") {
      return (
        <div className="flex gap-2">
          <span>€</span>
          <span>{cryptoData.bitcoin.eur.toLocaleString()}</span>
        </div>
      );
    } else if (currency === "CHF") {
      return (
        <div className="flex gap-2">
          <span>₣</span>
          <span>{cryptoData.bitcoin.chf.toLocaleString()}</span>
        </div>
      );
    } else if (currency === "GBP") {
      return (
        <div className="flex gap-2">
          <span>£</span>
          <span>{cryptoData.bitcoin.gbp.toLocaleString()}</span>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2">
          <span>$</span>
          <span>{cryptoData.bitcoin.usd.toLocaleString()}</span>
        </div>
      );
    }
  }

  return <h1>hi</h1>;
}
