import DashboardNav from "@/components/dashboard/nav/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function Deposit() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("profile").select();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }
  const user = data[0];
  return (
    <div className="p-2">
      <DashboardNav firstName={user.first_name} lastName={user.last_name} />
      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-2">
        {/* left */}
        <div className="w-full lg:w-6/12">
          {/* head */}
          <div className="flex flex-col gap-2 px-4 py-8 md:p-8">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              Create Deposit
            </h2>
            <p className="font-light text-xl text-text">
              Find useful information on depositing funds to your account.
            </p>
          </div>
          {/* content */}
          <div className="px-4 py-8 md:p-8 flex flex-col gap-6 border border-border rounded-lg text-darkBlack">
            {/* coin row */}
            <div className="flex flex-col gap-2">
              <p className="text-lg">Coin:</p>
              <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex text-white font-semibold items-center px-6 py-3 bg-darkBlack rounded gap-[10px]">
                    <Image
                      src="/assets/icons/btc.svg"
                      height={32}
                      width={32}
                      alt="Bitcoin"
                    />
                    Bitcoin
                  </div>
                  <p className="text-xs">BTC</p>
                </div>
                <div className="font-semibold">
                  <span>Total Balance:</span>
                  <span>0.0121285425 BTC</span>
                </div>
              </div>
            </div>
            {/* deposit row */}
            <div className="flex flex-col gap-2">
              <p className="text-lg">Deposit Network:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full rounded-[4px] border border-border p-1">
                <div className="w-full text-center border border-border bg-border rounded-[4px] py-3 font-semibold">
                  BTC
                </div>
                <div className="w-full text-center border border-border rounded-[4px] py-3 font-semibold">
                  BEP2
                </div>
                <div className="w-full text-center border border-border rounded-[4px] py-3 font-semibold">
                  BEP20 (BSC)
                </div>
                <div className="w-full text-center border border-border rounded-[4px] py-3 font-semibold">
                  RRC20
                </div>
              </div>
            </div>
            {/* btc address row */}
            <div className="flex flex-col gap-2">
              <p className="text-lg">BTC Address:</p>
              <div className="flex gap-[10px]">
                <input
                  className="w-full p-4 border border-border rounded-[4px]"
                  type="text"
                  value="bc1qXY2kGdygjrsqtzE2n0yrf2XY3"
                />{" "}
                <button className="bg-lightlightGray duration-300 transition-all rounded-[4px] font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px]">
                  Copy{" "}
                  <Image
                    src="/assets/icons/copy.svg"
                    height={16}
                    width={16}
                    alt="Copy Icon"
                  />
                </button>
              </div>
              <div className="flex flex-col items-center md:flex-row gap-8 mt-8">
                <Image
                  src="/assets/icons/btc-qrcode.svg"
                  height={260}
                  width={260}
                  alt="Bitcoin address qr code"
                />
                <div className="bg-[#F4F4F4] flex flex-col gap-8 items-left justify-center p-8 rounded-2xl">
                  <div className="w-[50px] h-[50px] bg-darkBlack/20 rounded-full flex items-center justify-center">
                    <Image
                      src="/assets/icons/info.svg"
                      height={16}
                      width={6}
                      alt="Information"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">
                      Send only BTC to this address!
                    </h3>
                    <p className="text-lg">
                      Sending coin or token other than BTC to this Address may
                      result in the loss of your deposit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* tips row */}
            <div className="flex flex-col gap-2">
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
                  Until 2 confirmations are made an equivalent amount of your
                  assets will be temporarily unavailable for withdraw.
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
        {/* right */}
        <div className="w-full lg:w-6/12">
          {/* head */}
          <div className="flex flex-col gap-2 p-8 pl-2">
            <h2 className="font-medium text-4xl text-darkBlack tracking-tighter">
              Review Deposits
            </h2>
            <p className="font-light text-xl text-text">
              Review all deposits made previously to your account.
            </p>
          </div>
          {/* table */}
          <table className="table-auto w-full rounded-lg border border-border">
            <thead className="text-left">
              <tr className="bg-lightlightGray">
                <th className="p-4 font-medium text-xl">Amount inserted</th>
                <th className="hidden md:block font-medium text-xl">Date</th>
                <th className="font-medium text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-lg">BTC 0.002</td>
                <td className="hidden md:block text-lg">03 December, 2023</td>
                <td className="text-lg">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
