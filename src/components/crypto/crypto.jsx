/* eslint-disable @next/next/no-img-element */
import React, { memo } from "react";

import Loader from "./Loader";
import Status from "./Status";
import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";

function Crypto({ crypto }) {
  const colorClassName = crypto.prevPrice
    ? crypto.price > crypto.prevPrice
      ? "text-green-600 text-[21px] font-light"
      : "text-red-500 text-[21px] font-light"
    : "text-darkBlack text-[21px] font-light";
  return (
    <div className="max-w p-12 bg-lightlightGray text-darkBlack border border-border rounded-xl">
      {/* top */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          {/* Crypto icon */}
          <Image
            src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${crypto.iconCode}.png`}
            alt=""
            width={69}
            height={69}
            className="w-[69px] h-[69px] rounded-3xl"
          />
          {/* Crypto name and price */}
          <div className="flex flex-col items-start">
            <h5 className="text-darkBlack text-[27px] font-medium">
              {crypto.name}
            </h5>
            {crypto.price ? (
              <>
                <span className={colorClassName} title={`${crypto.price}`}>
                  {formatPrice(crypto.price)}
                </span>
              </>
            ) : (
              <div className="flex gap-1">
                <span>Price is loading</span>
              </div>
            )}
          </div>
        </div>
        {/* explorer link */}
        <Link
          className="flex items-center justify-center bg-lightGray w-[70px] h-[70px] rounded-xl"
          href={crypto.explorer}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/assets/icons/explorer.svg"
            alt="Explorer"
            width={24}
            height={24}
          />
        </Link>
      </div>

      {crypto.price ? (
        <>
          <div className="mt-12">
            <Status label="24h High" value={formatPrice(crypto.highPrice)} />
            <Status label="24h Low" value={formatPrice(crypto.lowPrice)} />
            <Status label="Market" value={crypto.symbol} />
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center h-24">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default memo(Crypto);
