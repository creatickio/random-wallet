"use client";
import Image from "next/image";
import React, { useState } from "react";

function FAQ({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start text-left gap-2 duration-300 transition-all">
      {/* question */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 w-full justify-between cursor-pointer"
      >
        <div className="h-[46px] w-[46px] bg-lightlightGray rounded-full flex items-center justify-center flex-shrink-0">
          <Image
            src="/assets/icons/question.svg"
            alt="question"
            height={16}
            width={16}
          />
        </div>
        <h4 className="text-darkBlack text-xl font-bold w-full">{question}</h4>
        <Image
          src="/assets/icons/chevron-up.svg"
          alt="Chevron Up"
          height={16}
          width={16}
          className={
            open
              ? "rotate-0 duration-300 transition-all"
              : "rotate-180 duration-300 transition-all"
          }
        />
      </div>
      {/* Answer */}
      {open && (
        <p className="ml-16 font-light text-text text-base duration-300 transition-all">
          {answer}
        </p>
      )}
    </div>
  );
}

export default FAQ;
