"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LiveChart from "../chart/page";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js"; // Import Chart.js

ChartJS.register(...registerables); // Register all available scales and plugins

function TradeViewComp() {
  let [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [id, setId] = useState("");
  const [leverageOptions, setLeverageOptions] = useState(null);
  const [profile, setProfile] = useState("");
  const [tradeOption, setTradeOption] = useState("");
  const [tradeStatus, setTradeStatus] = useState("");
  const [percentage, setPercentage] = useState();
  const [outcome, setOutcome] = useState();

  console.log("Trade Option: ", tradeOption);
  console.log("Leverage Options: ", leverageOptions);
  // console.log("Min Value: ", minValue);
  // console.log("Max Value: ", maxValue);

  const router = useParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("trade")
        .select("*")
        .eq("id", router.id);
      const tradeInfo = data[0];
      setAmount(tradeInfo.amount);
      setCreatedAt(tradeInfo.created_at);
      setId(tradeInfo.id);
      setLeverageOptions(tradeInfo.leverage_options);
      setProfile(tradeInfo.profile);
      setTradeOption(tradeInfo.trade_option);
      setTradeStatus(tradeInfo.trade_status);
      setPercentage(tradeInfo.percentage);
      setOutcome(tradeInfo.outcome);
    }
    fetchData();
  }, [supabase, router.id]);

  //   Close Modal Function
  function closeModal() {
    setIsOpen(false);
  }
  // Open Modal Function
  function openModal() {
    setIsOpen(true);
  }

  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();

  // Chart minimum and maximum
  useEffect(() => {
    if (leverageOptions) {
      if (leverageOptions === "x2") {
        setMinValue(-100);
        setMaxValue(200);
      } else if (leverageOptions === "x5") {
        setMinValue(-100);
        setMaxValue(500);
      } else {
        setMinValue(-100);
        setMaxValue(1000);
      }
    } else {
      if (tradeOption === "standard") {
        setMinValue(-10);
        setMaxValue(10);
      } else if (tradeOption === "ai") {
        setMinValue(-50);
        setMaxValue(100);
      }
    }
  }, [leverageOptions, tradeOption, minValue, maxValue]);

  // Chart functionality
  // const [data, setData] = useState({
  //   labels: Array.from({ length: 10 }, (_, i) => i + 1),
  //   datasets: [
  //     {
  //       label: "Live Chart",
  //       data: Array.from(
  //         { length: 10 },
  //         () => Math.random() * (maxValue - minValue) + minValue
  //       ),
  //       backgroundColor: "#FFD100",
  //       borderColor: "#FFD100",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setData((prevData) => {
  //       let newData = { ...prevData };
  //       let lastPoint =
  //         newData.datasets[0].data[newData.datasets[0].data.length - 1];

  //       // Check if minValue and maxValue are available
  //       if (minValue !== undefined && maxValue !== undefined) {
  //         let nextPoint = lastPoint + Math.random() * 40 - 20;
  //         if (nextPoint < minValue) nextPoint = minValue;
  //         if (nextPoint > maxValue) nextPoint = maxValue;

  //         newData.datasets[0].data.shift();
  //         newData.datasets[0].data.push(nextPoint);
  //       }

  //       return newData;
  //     });
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [minValue, maxValue]);

  return (
    <div className="max-w-[1172px] mx-auto flex flex-col gap-8 md:gap-16 pt-8">
      <h2 className="text-[32px] md:text-[64px] text-center md:text-left font-medium tracking-tighter text-darkBlack">
        View the{" "}
        <span className="font-bold border-b-4 border-primary capitalize">
          {tradeOption === "ai" ? (
            <span className="uppercase">{tradeOption}</span>
          ) : (
            tradeOption
          )}
        </span>{" "}
        trade
      </h2>
      <div className="flex flex-col md:flex-row justify-between gap-11">
        <div className="flex gap-[10px] flex-col w-full h-fit">
          <div className="bg-[#F4F4F4] w-full h-full rounded-2xl p-8 flex flex-col gap-8">
            {/* amount row */}
            <div className="flex flex-col gap-2">
              <p className="text-lg">Amount:</p>
              <div className="flex gap-[10px]">
                <input
                  className="w-full p-4 border border-border rounded-[4px] appearance-none disabled:bg-darkBlack/20 disabled:border-[#BBBBBB]"
                  type="text"
                  min="0.1"
                  step={0.1}
                  disabled={true}
                  value={`${amount} BTC`}
                />{" "}
                <button
                  disabled
                  className="bg-[#BBBBBB] duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px] disabled:bg-darkBlack/20 disabled:border-[#BBBBBB] disabled:cursor-not-allowed"
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
            </div>

            {/* amount to earn row */}
            {tradeOption === "leverage" ? (
              <div className="flex flex-col gap-2">
                <p className="text-lg">Set the amount to earn:</p>
                <div className="grid grid-cols-3 gap-1 w-full rounded-[4px] border border-border p-1">
                  <div
                    className={
                      leverageOptions === "x2"
                        ? "w-full text-center border border-border duration-300 transition-all bg-green-300 rounded-[4px] py-3 font-semibold cursor-pointer"
                        : "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                    }
                  >
                    x2
                  </div>
                  <div
                    className={
                      leverageOptions === "x5"
                        ? "w-full text-center border border-border duration-300 transition-all bg-green-300 rounded-[4px] py-3 font-semibold cursor-pointer"
                        : "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                    }
                  >
                    x5
                  </div>
                  <div
                    className={
                      leverageOptions === "x10"
                        ? "w-full text-center border border-border duration-300 transition-all bg-green-300 rounded-[4px] py-3 font-semibold cursor-pointer"
                        : "w-full text-center border border-border duration-300 transition-all bg-border rounded-[4px] py-3 font-semibold cursor-pointer"
                    }
                  >
                    x10
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <button
              className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-lightGray disabled:cursor-not-allowed"
              type="button"
              onClick={openModal}
              disabled={tradeStatus === "close"}
            >
              {tradeStatus === "close" ? "Trade is closed" : "Stop the trade"}
            </button>
          </div>
          {tradeStatus === "open" && (
            <div className="bg-[#F4F4F4] w-full h-full rounded-2xl p-8 flex flex-col gap-8">
              <LiveChart minValue={minValue} maxValue={maxValue} />
            </div>
          )}

          {tradeStatus === "close" && (
            <div className="bg-[#F4F4F4] w-full h-full rounded-2xl p-8 flex flex-row gap-8">
              {/* Percentage */}
              <div className="inline-flex border border-border rounded-[4px] w-full bg-white justify-between">
                <p className="p-4">
                  {outcome > 0 ? "Percentage gain" : "Percentage lost"}
                </p>
                <p className="p-4 font-bold bg-border">
                  {percentage ? `${percentage} %` : "0.0 %"}
                </p>
              </div>
              {/* Outcome */}
              <div className="inline-flex border border-border rounded-[4px] w-full bg-white justify-between">
                <p className="p-4">
                  {outcome > 0 ? "Total gain" : "Total lost"}
                </p>
                <p className="p-4 font-bold bg-border">
                  {outcome ? `${outcome.toFixed(4)} BTC` : "0.0 BTC"}
                </p>
              </div>
            </div>
          )}
          {/* Modal */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    <Dialog.Panel className="flex flex-col gap-8 w-full max-w-[719px] transform overflow-hidden rounded-2xl bg-white p-6 align-middle items-center shadow-xl transition-all text-center">
                      <h3 className="text-2xl p-4 rounded-2xl bg-lightlightGray w-full">
                        You are not authorized to perform this action
                      </h3>
                      <div className="w-full h-px bg-gray"></div>
                      <button
                        type="button"
                        className="bg-primary px-6 py-4 rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-lightGray disabled:cursor-not-allowed w-fit"
                        onClick={closeModal}
                      >
                        Close this window
                      </button>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
        {/* tips row */}
        <div className="flex flex-col gap-2 w-full md:w-4/12 shrink-0">
          <p className="text-lg">Tips:</p>
          <ul className="bg-[#F4F4F4] p-8 flex flex-col gap-8 rounded-2xl text-lg">
            <li className="flex gap-[10px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
              If you have deposited please pay attention to the text message
              site letters and emails we send to you.
            </li>
            <li className="flex gap-[10px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
              Coins will be deposited after 1 network confirmation.
            </li>
            <li className="flex gap-[10px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
              Until 2 confirmations are made an equivalent amount of your assets
              will be temporarily unavailable for withdraw.
            </li>
            <li className="flex gap-[10px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#0CAF60] shrink-0 mt-2"></div>
              <span>
                You could check the blockchain records and deposit status at{" "}
                <span className="font-bold">Deposit Records.</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TradeViewComp;
