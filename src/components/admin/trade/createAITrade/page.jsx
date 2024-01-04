import Image from "next/image";
import React from "react";

function CreateAITrade() {
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

export default CreateAITrade;
