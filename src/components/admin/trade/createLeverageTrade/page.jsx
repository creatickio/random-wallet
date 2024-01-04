import Image from "next/image";
import React, { useState } from "react";

function CreateLeverageTrade() {
  const [network, setNetwork] = useState("x2");

  return (
    <div>
      <div className=" text-darkBlack">
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
          step={0.1}
        />{" "}
        <button className="bg-lightlightGray duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px] disabled:bg-lightlightGray disabled:cursor-not-allowed">
          MAX
        </button>
      </div>

      {/* amount to earn row */}

      <div className="flex flex-col gap-2 mt-8">
        <div className=" text-darkBlack">
          <p className="text-xl font-bold">Profitable amount</p>
          <p className="text-sm">Set the amount to be profitable</p>
        </div>
        <div className="grid grid-cols-3 gap-[10px] w-full text-2xl">
          <div
            onClick={() => setNetwork("x2")}
            className={
              network === "x2"
                ? "w-full text-center duration-300 transition-all bg-primary rounded-[4px] py-3 font-semibold cursor-pointer"
                : "w-full text-center duration-300 transition-all bg-lightlightGray rounded-[4px] py-3 font-semibold cursor-pointer"
            }
          >
            x2
          </div>
          <div
            onClick={() => setNetwork("x5")}
            className={
              network === "x5"
                ? "w-full text-center duration-300 transition-all bg-primary rounded-[4px] py-3 font-semibold cursor-pointer"
                : "w-full text-center duration-300 transition-all bg-lightlightGray rounded-[4px] py-3 font-semibold cursor-pointer"
            }
          >
            x5
          </div>
          <div
            onClick={() => setNetwork("x10")}
            className={
              network === "x10"
                ? "w-full text-center duration-300 transition-all bg-primary rounded-[4px] py-3 font-semibold cursor-pointer"
                : "w-full text-center duration-300 transition-all bg-lightlightGray rounded-[4px] py-3 font-semibold cursor-pointer"
            }
          >
            x10
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full bg-gray h-px mt-8 mb-6"></div>
      <button
        className="bg-primary py-4 px-6 w-full flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow"
        type="submit"
      >
        Start new trade
      </button>
    </div>
  );
}

export default CreateLeverageTrade;
